import React, { useState, useEffect } from 'react';
import { Hammer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CollapsibleButton } from './collapsible-button';
import { MCPToolsModalDemo } from '../demos/modals/mcp-tools-modal-demo';

interface McpToolsButtonProps {
  disabled?: boolean;
  onMcpToolsToggle: (isActive: boolean) => void;
  isActive?: boolean;
}

export function McpToolsButton({
  disabled = false,
  onMcpToolsToggle,
  isActive = false,
}: McpToolsButtonProps) {
  const [isConfigured, setIsConfigured] = useState(isActive);
  const [isHovered, setIsHovered] = useState(false);
  const [wasRecentlyActive, setWasRecentlyActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Update isConfigured when isActive prop changes
  useEffect(() => {
    if (isActive !== isConfigured) {
      console.log('[McpToolsButton] Props updated:', { isActive, isConfigured });
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

  const handleButtonClick = () => {
    // Just open the modal, don't change the active state
    setShowModal(true);
    console.log('[McpToolsButton] Modal opened');
    
    // Don't toggle the active state - MCP Tools button should not stay active
    // This matches the production behavior where it's just a modal trigger
  };

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

  // Determine if we should show the expanded button
  const showExpandedWithActive = isConfigured;
  // Determine if we should show the expanded button for hover after deactivation
  const showManualExpanded = !isConfigured && isHovered && wasRecentlyActive;

  return (
    <div 
      className="relative ml-0.25"
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
            <Hammer className="h-5 w-5 text-[#E6E6E6]" />
            
                          <span className="text-sm font-light whitespace-nowrap text-[#E6E6E6]">
                MCP tools
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
                          <Hammer className="h-5 w-5 text-[#9C27B0] dark:text-[#BA68C8]" />
            
                          <span className="text-sm font-light whitespace-nowrap text-gray-700 dark:text-[#9E9E9E]">
                MCP tools
              </span>
          </div>
        </button>
      ) : (
        // Use CollapsibleButton for all other states
        <CollapsibleButton
                      icon={<Hammer className="h-5 w-5 text-[#9C27B0] dark:text-[#BA68C8]" />}
          text="MCP tools"
          tooltipText="MCP tools"
          onClick={handleButtonClick}
          isActive={false}
          disabled={disabled}
        />
      )}
      
      {/* MCP Tools Modal */}
      <MCPToolsModalDemo
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
} 