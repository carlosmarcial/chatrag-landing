import React, { useState, useRef, useEffect } from 'react';
import { Box } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CollapsibleButton } from './collapsible-button';

interface ThreeDGenerationButtonProps {
  disabled?: boolean;
  hasDocumentContext?: boolean;
  onThreeDGenerate: (
    textureSize?: number,
    meshSimplify?: number,
    ssSamplingSteps?: number,
    texturedMesh?: boolean,
    useContext?: boolean,
    imageFiles?: File[]
  ) => void;
  isActive?: boolean;
}

// Default settings for 3D generation
const textureSizeOptions = [
  { label: '1024', value: 1024 },
  { label: '2048', value: 2048 },
  { label: '4096', value: 4096 },
];

const meshSimplifyOptions = [
  { label: 'Low (0.7)', value: 0.7 },
  { label: 'Medium (0.9)', value: 0.9 },
  { label: 'High (1.0)', value: 1.0 },
];

const stepOptions = [
  { label: '20 steps', value: 20 },
  { label: '38 steps', value: 38 },
  { label: '50 steps', value: 50 },
];

export function ThreeDGenerationButton({
  disabled = false,
  hasDocumentContext = false,
  onThreeDGenerate,
  isActive = false,
}: ThreeDGenerationButtonProps) {
  const [isConfigured, setIsConfigured] = useState(isActive);
  const [isHovered, setIsHovered] = useState(false);
  const [wasRecentlyActive, setWasRecentlyActive] = useState(false);

  // Update isConfigured when isActive prop changes
  useEffect(() => {
    if (isActive !== isConfigured) {
      setIsConfigured(isActive);
    }
  }, [isActive, isConfigured]);

  // Track when active state changes
  useEffect(() => {
    if (isConfigured) {
      setWasRecentlyActive(true);
    } else if (!isHovered) {
      // Only reset when not hovering
      setWasRecentlyActive(false);
    }
  }, [isConfigured, isHovered]);

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

  const handleButtonClick = () => {
    if (isConfigured) {
      // If already configured, toggle off
      setIsConfigured(false);
      return;
    }

    // Create a file input element (allow multiple images)
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.multiple = true;
    fileInput.style.display = 'none';
    
    // Add a change event listener
    fileInput.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length) {
        const files: File[] = Array.from(target.files);
        
        // Demo mode - don't actually activate the button or pass real data
        console.log('Demo: 3D generation triggered but no actual processing in landing page');
        console.log('Selected files:', files.map(f => f.name));
        
        // Don't call onThreeDGenerate with real parameters
        // Don't set isConfigured to true
      }
      
      // Remove the input element after use
      document.body.removeChild(fileInput);
    });
    
    // Append to body and trigger click
    document.body.appendChild(fileInput);
    fileInput.click();
  };

  // Determine if we should show the expanded button
  const showExpandedWithActive = isConfigured;
  // Determine if we should show the expanded button for hover after deactivation
  const showManualExpanded = !isConfigured && isHovered && wasRecentlyActive;

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showExpandedWithActive ? (
        // Custom active button - only used when active
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
            <Box className="h-5 w-5 text-[#E6E6E6]" />
            
                          <span className="text-sm font-light whitespace-nowrap text-[#E6E6E6]">
                Generate 3D
              </span>
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
            <Box className="h-5 w-5 text-[#E53935] dark:text-[#F44336]" />
            
                          <span className="text-sm font-light whitespace-nowrap text-gray-700 dark:text-[#9E9E9E]">
                Generate 3D
              </span>
          </div>
        </button>
      ) : (
        // Use CollapsibleButton for all other states
        <CollapsibleButton
          icon={<Box className="h-5 w-5 text-[#E53935] dark:text-[#F44336]" />}
          text="Generate 3D"
          tooltipText="Generate 3D"
          onClick={handleButtonClick}
          isActive={false}
          disabled={disabled}
        />
      )}
    </div>
  );
} 