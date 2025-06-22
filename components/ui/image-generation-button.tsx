import { useState, useRef, useEffect } from 'react';
import { Palette, Check, ChevronDown, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMockLanguage } from '@/lib/mock-language-provider';
import { CollapsibleButton } from './collapsible-button';
import { motion } from 'framer-motion';

interface ImageGenerationButtonProps {
  disabled?: boolean;
  onImageGenerate: (prompt: string, size: string, numOutputs: number, useContext?: boolean, sourceImage?: File) => void;
  hasText?: boolean;
  hasDocumentContext?: boolean;
  isActive?: boolean;
  sourceImage?: File;
  onSourceImageSelect?: (file: File | null) => void;
}

const sizeOptions = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Portrait (2:3)', value: '2:3' },
  { label: 'Landscape (3:2)', value: '3:2' },
  { label: 'Wide (16:9)', value: '16:9' },
];

const numOutputsOptions = [1, 2, 3, 4];

export function ImageGenerationButton({
  disabled = false,
  onImageGenerate,
  hasText = false,
  hasDocumentContext = false,
  isActive = false,
  sourceImage = undefined,
  onSourceImageSelect,
}: ImageGenerationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [selectedNumOutputs, setSelectedNumOutputs] = useState(1);
  const [useDocumentContext, setUseDocumentContext] = useState(false);
  const [isMenuAction, setIsMenuAction] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [wasRecentlyActive, setWasRecentlyActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useMockLanguage();

  // Track when active state changes
  useEffect(() => {
    if (isActive) {
      setWasRecentlyActive(true);
    } else if (!isHovered) {
      // Only reset when not hovering
      setWasRecentlyActive(false);
    }
  }, [isActive, isHovered]);

  // Special handling for menu actions to prevent flickering
  useEffect(() => {
    if (isMenuAction) {
      const timeout = setTimeout(() => {
        setIsMenuAction(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isMenuAction]);

  // Track when isActive changes to handle edge cases
  useEffect(() => {
    if (!isActive && isMenuAction) {
      onImageGenerate('', selectedSize.value, selectedNumOutputs, useDocumentContext, sourceImage);
    }
  }, [isActive, isMenuAction, selectedSize.value, selectedNumOutputs, useDocumentContext, onImageGenerate, sourceImage]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mouse enter/leave handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // If we were recently active but now inactive, and mouse leaves,
    // reset wasRecentlyActive so the button can fully collapse
    if (wasRecentlyActive && !isActive) {
      setWasRecentlyActive(false);
    }
  };

  // This is for the main button click - toggle activation state
  const handleButtonClick = () => {
    if (!isMenuAction) {
      if (!isActive) {
        // Activate
        onImageGenerate('', selectedSize.value, selectedNumOutputs, useDocumentContext, sourceImage);
      } else {
        // Deactivate - but keep wasRecentlyActive true if still hovering
        onImageGenerate('', '', 0, false, undefined);
        if (isOpen) {
          setIsOpen(false);
        }
      }
    }
  };

  // Open/close the menu without toggling the button state
  const handleRatioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Handle size option changes
  const handleSizeSelect = (e: React.MouseEvent, option: typeof sizeOptions[0]) => {
    e.preventDefault();
    e.stopPropagation();

    setIsMenuAction(true);
    setSelectedSize(option);

    if (isActive) {
      requestAnimationFrame(() => {
        onImageGenerate('', option.value, selectedNumOutputs, useDocumentContext, sourceImage);
      });
    }
  };

  // Handle number of outputs changes
  const handleNumOutputsSelect = (e: React.MouseEvent, num: number) => {
    e.preventDefault();
    e.stopPropagation();

    setIsMenuAction(true);
    setSelectedNumOutputs(num);

    if (isActive) {
      requestAnimationFrame(() => {
        onImageGenerate('', selectedSize.value, num, useDocumentContext, sourceImage);
      });
    }
  };

  // Handle context toggle
  const handleContextToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsMenuAction(true);
    const newValue = !useDocumentContext;
    setUseDocumentContext(newValue);

    if (isActive) {
      requestAnimationFrame(() => {
        onImageGenerate('', selectedSize.value, selectedNumOutputs, newValue, sourceImage);
      });
    }
  };
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    
    const file = e.target.files?.[0];
    if (file && onSourceImageSelect) {
      console.log('Image-generation-button: File selected:', file.name, file.size);
      
      // Call the onSourceImageSelect callback to update the parent component
      onSourceImageSelect(file);
      
      // If active, also update the image generation settings
      if (isActive) {
        requestAnimationFrame(() => {
          onImageGenerate('', selectedSize.value, selectedNumOutputs, useDocumentContext, file);
        });
      } else {
        // If not active, activate with this image
        requestAnimationFrame(() => {
          onImageGenerate('configure-only', selectedSize.value, selectedNumOutputs, useDocumentContext, file);
        });
      }
    }
    
    // Reset file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle clicking the image upload button
  const handleImageUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle clearing the source image
  const handleClearSourceImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onSourceImageSelect) {
      onSourceImageSelect(null);
      
      if (isActive) {
        requestAnimationFrame(() => {
          onImageGenerate('', selectedSize.value, selectedNumOutputs, useDocumentContext, undefined);
        });
      }
    }
  };
  
  // Determine if we should show the expanded button with ratio
  const showExpandedWithRatio = isActive;
  // Determine if we should show the expanded button (without ratio) for hover after deactivation
  const showManualExpanded = !isActive && isHovered && wasRecentlyActive;

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      {showExpandedWithRatio ? (
        // Custom active button with ratio selector - only used when active
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled}
          className={cn(
            "relative inline-flex h-9 items-center justify-center rounded-xl transition-colors border-[0.5px] overflow-hidden mr-0.25",
            "bg-[#FF6417] border-[#FF6417] dark:bg-[#212121] dark:border-[#212121] hover:bg-[#E55000] dark:hover:bg-[#1A1A1A]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex items-center px-3 gap-1">
            <Palette className="h-5 w-5 text-[#E6E6E6]" />
            
            <span className="text-sm font-medium whitespace-nowrap text-[#E6E6E6]">
              {useDocumentContext ? "Image + Context" : sourceImage ? "Edit Image" : t('imageGenerate')}
            </span>
            
            <div 
              onClick={handleRatioClick}
              className="flex items-center cursor-pointer ml-1"
            >
              <div className="flex items-center px-1 py-0 rounded-full border border-white/40 hover:bg-white/10">
                <span className="text-[10px] text-[#E6E6E6]">{selectedSize.value}</span>
                <ChevronDown className="h-2.5 w-2.5 ml-0.5 text-[#E6E6E6]" />
              </div>
            </div>
          </div>
        </button>
      ) : showManualExpanded ? (
        // Manually expanded inactive button - for hover after deactivation
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled}
          className={cn(
            "relative inline-flex h-9 items-center justify-center rounded-xl transition-colors border-[0.5px] overflow-hidden mr-0.25",
            "bg-transparent border-[#D4C0B6] dark:border-gray-600 hover:bg-[#FFE0D0] dark:bg-transparent dark:hover:bg-[#424242]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex items-center px-3 gap-1">
            <Palette className="h-5 w-5 text-[#FFB000] dark:text-[#FFB000]" />
            
            <span className="text-sm font-medium whitespace-nowrap text-gray-700 dark:text-[#9E9E9E]">
              {useDocumentContext ? "Image + Context" : sourceImage ? "Edit Image" : t('imageGenerate')}
            </span>
          </div>
        </button>
      ) : (
        // Use CollapsibleButton for all other states
        <CollapsibleButton
          icon={<Palette className="h-5 w-5 text-[#FFB000] dark:text-[#FFB000]" />}
          text={useDocumentContext ? "Image + Context" : sourceImage ? "Edit Image" : t('imageGenerate')}
          onClick={handleButtonClick}
          isActive={false}
          disabled={disabled}
        />
      )}

      {/* Menu as an absolutely positioned overlay */}
      {isOpen && (
        <motion.div 
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 bottom-[calc(100%+10px)] z-[100] w-64 rounded-xl bg-white dark:bg-[#2F2F2F] shadow-lg border border-gray-200 dark:border-gray-700 p-3"
          style={{ pointerEvents: 'auto' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {sizeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => handleSizeSelect(e, option)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-colors",
                      selectedSize.value === option.value
                        ? "bg-[#FF6417] text-white dark:bg-[#E55000]"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Number of Images
              </label>
              <div className="grid grid-cols-4 gap-2">
                {numOutputsOptions.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={(e) => handleNumOutputsSelect(e, num)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-colors",
                      selectedNumOutputs === num
                        ? "bg-[#FF6417] text-white dark:bg-[#E55000]"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Source Image
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleImageUploadClick}
                  className={cn(
                    "flex items-center justify-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors",
                    "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 w-full"
                  )}
                >
                  <ImageIcon className="h-4 w-4" />
                  {sourceImage ? 'Change Image' : 'Upload Image'}
                </button>
                
                {sourceImage && (
                  <button
                    type="button"
                    onClick={handleClearSourceImage}
                    className="px-3 py-1.5 text-sm rounded-lg transition-colors bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {sourceImage && (
                <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {sourceImage.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {Math.round(sourceImage.size / 1024)} KB
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={handleContextToggle}
                className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Use document context
                </span>
                <div className={cn(
                  "w-5 h-5 rounded flex items-center justify-center transition-colors",
                  useDocumentContext 
                    ? "bg-[#FF6417] dark:bg-[#E55000]" 
                    : "border border-gray-300 dark:border-gray-600"
                )}>
                  {useDocumentContext && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 