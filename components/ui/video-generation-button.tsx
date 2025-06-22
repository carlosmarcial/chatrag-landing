import React, { useState, useRef, useEffect } from 'react';
import { Video, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMockLanguage } from '@/lib/mock-language-provider';
import { CollapsibleButton } from './collapsible-button';
import { motion } from 'framer-motion';

interface VideoGenerationButtonProps {
  disabled?: boolean;
  hasDocumentContext?: boolean;
  onVideoGenerate: (prompt: string, aspectRatio?: string, resolution?: string, frameCount?: number, useContext?: boolean) => void;
  hasText?: boolean;
  isActive?: boolean;
}

const aspectRatioOptions = [
  { label: 'Landscape (16:9)', value: '16:9' },
  { label: 'Portrait (9:16)', value: '9:16' },
  { label: 'Square (1:1)', value: '1:1' },
];

const resolutionOptions = [
  { label: '480p', value: '480p' },
  { label: '580p', value: '580p' },
  { label: '720p', value: '720p' },
];

const durationOptions = [
  { label: '5 seconds', value: 5 },
  { label: '10 seconds', value: 10 },
];

export function VideoGenerationButton({
  disabled = false,
  hasDocumentContext = false,
  onVideoGenerate,
  hasText = false,
  isActive = false,
}: VideoGenerationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [useContext, setUseContext] = useState(false);
  const [isConfigured, setIsConfigured] = useState(isActive);
  const [isHovered, setIsHovered] = useState(false);
  const [wasRecentlyActive, setWasRecentlyActive] = useState(false);
  const [isMenuAction, setIsMenuAction] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // New state variables for video options
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatioOptions[0]);
  const [selectedResolution, setSelectedResolution] = useState(resolutionOptions[2]); // Default to 720p
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);

  const { t } = useMockLanguage();

  // Update isConfigured when isActive prop changes
  useEffect(() => {
    if (isActive !== isConfigured) {
      setIsConfigured(isActive);
      
      // Close the dropdown if we're toggling off from parent
      if (!isActive && isOpen) {
        setIsOpen(false);
      }
    }
  }, [isActive, isConfigured, isOpen]);

  // Track when active state changes
  useEffect(() => {
    if (isConfigured) {
      setWasRecentlyActive(true);
    } else if (!isHovered) {
      // Only reset when not hovering
      setWasRecentlyActive(false);
    }
  }, [isConfigured, isHovered]);

  // Special handling for menu actions to prevent flickering
  useEffect(() => {
    if (isMenuAction) {
      const timeout = setTimeout(() => {
        setIsMenuAction(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isMenuAction]);

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
    if (wasRecentlyActive && !isConfigured) {
      setWasRecentlyActive(false);
    }
  };

  // Toggle the dropdown and configuration
  const handleButtonClick = () => {
    // Toggle the button state - if it's already configured, clicking should disable it
    if (isConfigured) {
      setIsConfigured(false);
      setIsOpen(false);
      // Tell parent to disable video generation - explicitly pass undefined for all parameters
      onVideoGenerate('configure-only', undefined, undefined, undefined, false);
    } else {
      setIsConfigured(true);
      // Don't open the menu automatically when activating the button
      // Only set video config, don't generate yet
      notifyParentOfConfig();
    }
  };

  // When hasText is true and user clicks the button
  const handleGenerateWithCurrentText = () => {
    if (hasText) {
      // Close the dropdown first
      setIsOpen(false);
      // Only activate video mode, actual generation happens on send
      setIsConfigured(true);
      // Don't send 'current-text-placeholder', this should be handled in the parent
      onVideoGenerate('configure-only', 
        selectedAspectRatio.value, 
        selectedResolution.value, 
        selectedDuration.value, 
        useContext
      );
    } else {
      // Just toggle the dropdown if no text is present
      handleButtonClick();
    }
  };

  // Send current configuration to parent without triggering generation
  const notifyParentOfConfig = () => {
    // Send empty string as prompt to indicate this is just a configuration update
    onVideoGenerate('configure-only', 
      selectedAspectRatio.value, 
      selectedResolution.value, 
      selectedDuration.value, 
      useContext
    );
  };

  // Handle the aspect ratio button click
  const handleAspectRatioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleContextToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsMenuAction(true);
    const newValue = !useContext;
    setUseContext(newValue);
    
    // Always ensure the button stays in configured/active state
    if (!isConfigured) {
      setIsConfigured(true);
    }
    
    // Only update configuration, don't generate yet
    onVideoGenerate('configure-only', 
      selectedAspectRatio.value, 
      selectedResolution.value, 
      selectedDuration.value, 
      newValue
    );
  };

  const handleAspectRatioSelect = (e: React.MouseEvent, option: typeof aspectRatioOptions[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsMenuAction(true);
    setSelectedAspectRatio(option);
    
    // Always ensure the button stays in configured/active state
    if (!isConfigured) {
      setIsConfigured(true);
    }
    
    // Only update configuration, don't generate yet
    onVideoGenerate('configure-only', 
      option.value, 
      selectedResolution.value, 
      selectedDuration.value, 
      useContext
    );
  };

  const handleResolutionSelect = (e: React.MouseEvent, option: typeof resolutionOptions[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsMenuAction(true);
    setSelectedResolution(option);
    
    // Always ensure the button stays in configured/active state
    if (!isConfigured) {
      setIsConfigured(true);
    }
    
    // Only update configuration, don't generate yet
    onVideoGenerate('configure-only', 
      selectedAspectRatio.value, 
      option.value, 
      selectedDuration.value, 
      useContext
    );
  };

  const handleDurationSelect = (e: React.MouseEvent, option: typeof durationOptions[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsMenuAction(true);
    setSelectedDuration(option);
    
    // Always ensure the button stays in configured/active state
    if (!isConfigured) {
      setIsConfigured(true);
    }
    
    // Only update configuration, don't generate yet
    onVideoGenerate('configure-only', 
      selectedAspectRatio.value, 
      selectedResolution.value, 
      option.value, 
      useContext
    );
  };
  
  // Determine if we should show the expanded button with ratio
  const showExpandedWithRatio = isConfigured;
  // Determine if we should show the expanded button (without ratio) for hover after deactivation
  const showManualExpanded = !isConfigured && isHovered && wasRecentlyActive;

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
            <Video className="h-5 w-5 text-[#E6E6E6]" />
            
            <span className="text-sm font-medium whitespace-nowrap text-[#E6E6E6]">
              {useContext ? "Video + Context" : t('videoGenerate')}
            </span>
            
            <div 
              onClick={handleAspectRatioClick}
              className="flex items-center cursor-pointer ml-1"
            >
              <div className="flex items-center px-1 py-0 rounded-full border border-white/40 hover:bg-white/10">
                <span className="text-[10px] text-[#E6E6E6]">{selectedAspectRatio.value}</span>
                <ChevronDown className="h-2.5 w-2.5 ml-0.5 text-[#E6E6E6]" />
              </div>
            </div>
          </div>
        </button>
      ) : showManualExpanded ? (
        // Manually expanded inactive button - for hover after deactivation
        <button
          type="button"
          onClick={hasText ? handleGenerateWithCurrentText : handleButtonClick}
          disabled={disabled}
          className={cn(
            "relative inline-flex h-9 items-center justify-center rounded-xl transition-colors border-[0.5px] overflow-hidden mr-0.25",
            "bg-transparent border-[#D4C0B6] dark:border-gray-600 hover:bg-[#FFE0D0] dark:bg-transparent dark:hover:bg-[#424242]",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex items-center px-3 gap-1">
            <Video className="h-5 w-5 text-[#FF6417] dark:text-[#FF6417]" />
            
            <span className="text-sm font-medium whitespace-nowrap text-gray-700 dark:text-[#9E9E9E]">
              {useContext ? "Video + Context" : t('videoGenerate')}
            </span>
          </div>
        </button>
      ) : (
        // Use CollapsibleButton for all other states
        <CollapsibleButton
          icon={<Video className="h-5 w-5 text-[#FF6417] dark:text-[#FF6417]" />}
          text={useContext ? "Video + Context" : t('videoGenerate')}
          onClick={hasText ? handleGenerateWithCurrentText : handleButtonClick}
          isActive={false}
          disabled={disabled}
        />
      )}

      {/* Menu as an absolutely positioned overlay */}
      {isOpen && (
        <motion.div 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute left-0 bottom-[calc(100%+10px)] z-[100] w-64 rounded-xl bg-white dark:bg-[#2F2F2F] shadow-lg border border-gray-200 dark:border-gray-700 p-3"
          style={{ pointerEvents: 'auto' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Video Generation Settings
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-2">
                {aspectRatioOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => handleAspectRatioSelect(e, option)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-colors",
                      selectedAspectRatio.value === option.value
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
                Resolution
              </label>
              <div className="grid grid-cols-3 gap-2">
                {resolutionOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => handleResolutionSelect(e, option)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg transition-colors",
                      selectedResolution.value === option.value
                        ? "bg-[#FF6417] text-white dark:bg-[#E55000]"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Duration</h3>
              <div className="grid grid-cols-2 gap-2">
                {durationOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => handleDurationSelect(e, option)}
                    className={cn(
                      'px-2 py-1.5 rounded-lg text-sm',
                      selectedDuration.value === option.value
                        ? 'bg-[#FF6417] text-white'
                        : 'bg-[#1F2937] text-gray-300'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
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
                  useContext 
                    ? "bg-[#FF6417] dark:bg-[#E55000]" 
                    : "border border-gray-300 dark:border-gray-600"
                )}>
                  {useContext && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 