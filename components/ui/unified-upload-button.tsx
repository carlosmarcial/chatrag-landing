import { Plus, FileText, ImageUp } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface UnifiedUploadButtonProps {
  disabled?: boolean;
  onTempDocUpload?: (doc: any) => void;
  onProcessingStateChange?: (state: { isProcessing: boolean, name?: string, error?: string }) => void;
}

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const SUPPORTED_DOC_TYPES = ['.pdf', '.doc', '.docx', '.txt'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function UnifiedUploadButton({ disabled, onTempDocUpload, onProcessingStateChange }: UnifiedUploadButtonProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // Detect dark mode from the parent element
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const checkDarkMode = () => {
      // Check if we're in a dark context by looking for 'dark' class in parent elements
      let element = dropdownRef.current?.parentElement;
      while (element) {
        if (element.classList.contains('dark')) {
          setIsDarkMode(true);
          return;
        }
        element = element.parentElement;
      }
      setIsDarkMode(false);
    };
    
    // Check on mount and whenever the dropdown opens
    checkDarkMode();
    
    // Also check periodically for theme changes
    const interval = setInterval(checkDarkMode, 100);
    
    return () => clearInterval(interval);
  }, [isOpen]);
  
  const dropdownBgColor = isDarkMode ? '#2F2F2F' : '#EFE1D5';
  const hoverColor = isDarkMode ? '#424242' : '#E5D6C9';
  const textColor = isDarkMode ? '#E6E6E6' : '#444';
  const iconColor = isDarkMode ? '#9E9E9E' : '#444';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Demo mode - just close dropdown and clear input, don't do anything else
    setIsOpen(false);
    e.target.value = '';
    console.log('Demo: Image upload triggered but no actual upload in landing page');
  };

  const handleTempDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Demo mode - just close dropdown and clear input, don't do anything else
    setIsOpen(false);
    e.target.value = '';
    console.log('Demo: Document upload triggered but no actual upload in landing page');
  };

  return (
    <>
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept={SUPPORTED_IMAGE_TYPES.join(',')}
        disabled={disabled}
      />
      <input
        type="file"
        ref={docInputRef}
        onChange={handleTempDocUpload}
        className="hidden"
        accept={SUPPORTED_DOC_TYPES.join(',')}
        disabled={disabled}
      />
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "dropdown-trigger inline-flex h-9 w-9 items-center justify-center rounded-xl bg-transparent border-[0.5px] border-[#D4C0B6] dark:border-gray-600 p-2 hover:bg-[#FFE0D0] dark:hover:bg-[#424242] transition-colors group relative mr-0.5",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="h-5 w-5 text-gray-900 dark:text-[#9E9E9E]" />
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[calc(100%+4px)] px-2 py-1 text-xs font-medium text-white dark:text-[#E6E6E6] bg-[#FF6417] dark:bg-[#1A1A1A] rounded-md opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-200 whitespace-nowrap">
            Upload files
          </div>
        </button>
        
        {isOpen && (
          <div 
            className="absolute top-full left-0 mt-1 w-64 rounded-xl z-[70] shadow-lg border border-[#D4C0B6]/20 dark:border-gray-600/20"
            style={{
              backgroundColor: 'transparent',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: 0,
              overflow: 'hidden',
              borderRadius: '12px'
            }}
          >
            <div style={{ 
              padding: '8px',
              backgroundColor: dropdownBgColor
            }}>
              <div
                onClick={() => imageInputRef.current?.click()}
                onMouseEnter={() => setHoveredItem('image')}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center gap-2 cursor-pointer text-sm w-full"
                style={{
                  backgroundColor: hoveredItem === 'image' ? hoverColor : 'transparent',
                  padding: '12px 16px',
                  margin: '2px 0',
                  borderRadius: '8px',
                  color: textColor
                }}
              >
                <ImageUp className="h-[18px] w-[18px] flex-shrink-0" style={{ color: iconColor }} />
                <span>Upload image</span>
              </div>
              
              <div
                onClick={() => docInputRef.current?.click()}
                onMouseEnter={() => setHoveredItem('document')}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center gap-2 cursor-pointer text-sm w-full"
                style={{
                  backgroundColor: hoveredItem === 'document' ? hoverColor : 'transparent',
                  padding: '12px 16px',
                  margin: '2px 0',
                  borderRadius: '8px',
                  color: textColor
                }}
              >
                <FileText className="h-[18px] w-[18px] flex-shrink-0" style={{ color: iconColor }} />
                <span>Upload temporary document</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 