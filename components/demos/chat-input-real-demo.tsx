'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Square, AudioLines, Settings2 } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';
import { useMobileDetection } from '@/hooks/use-mobile-detection';
import { WebSearchButton } from '@/components/ui/web-search-button';
import { ImageGenerationButton } from '@/components/ui/image-generation-button';
import { VideoGenerationButton } from '@/components/ui/video-generation-button';
import { ThreeDGenerationButton } from '@/components/ui/three-d-generation-button';
import { McpToolsButton } from '@/components/ui/mcp-tools-button';
import { UnifiedUploadButton } from '@/components/ui/unified-upload-button';

// Import demo modals for enhanced UX
import { ImageGenModalDemo } from './modals/image-gen-modal-demo';
import { VideoGenModalDemo } from './modals/video-gen-modal-demo';
import { ThreeDGenModalDemo } from './modals/three-d-modal-demo';
import { MobileToolsModalDemo } from './modals/mobile-tools-modal-demo';

interface ChatInputRealDemoProps {
  className?: string;
}

export function ChatInputRealDemo({ className }: ChatInputRealDemoProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [isImageGenActive, setIsImageGenActive] = useState(false);
  const [isVideoGenActive, setIsVideoGenActive] = useState(false);
  const [isThreeDGenActive, setIsThreeDGenActive] = useState(false);
  const [isMcpToolsActive, setIsMcpToolsActive] = useState(false);
  const [sourceImage, setSourceImage] = useState<File | undefined>();
  const [isProcessingDoc, setIsProcessingDoc] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mobile detection
  const { isMobile, isTablet, isSmallMobile } = useMobileDetection();

  // Modal states for enhanced interaction
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);
  const [showMobileToolsModal, setShowMobileToolsModal] = useState(false);

  const hasText = message.trim().length > 0;
  const hasDocumentContext = false; // Mock for demo
  const parentIsLoading = isLoading || isProcessingDoc;

  // Simplified for demo - no active tool indicators needed

  // Handle mobile tool selection (simplified for demo)
  const handleMobileToolSelect = (toolId: string) => {
    console.log('[ChatInputRealDemo] Mobile tool selected:', toolId);
    // For demo purposes, just close the modal
    setShowMobileToolsModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasText || parentIsLoading) return;

    setIsLoading(true);
    console.log('Form submitted with:', {
      message,
      isWebSearchEnabled,
      isImageGenActive,
      isVideoGenActive,
      isThreeDGenActive,
      isMcpToolsActive,
      sourceImage: sourceImage?.name
    });

    // Mock API call
    setTimeout(() => {
      setMessage('');
      setIsLoading(false);
    }, 2000);
  };

  const handleWebSearchToggle = (useSearch: boolean) => {
    console.log('[ChatInputRealDemo] Web search toggled:', useSearch);
    setIsWebSearchEnabled(useSearch);
    
    // Deactivate other tools when web search is activated
    if (useSearch) {
      setIsImageGenActive(false);
      setIsVideoGenActive(false);
      setIsThreeDGenActive(false);
      setIsMcpToolsActive(false);
    }
  };

  const handleImageGenerate = (prompt: string, size: string, numOutputs: number, useContext?: boolean, sourceImg?: File) => {
    console.log('[ChatInputRealDemo] Image generate:', { prompt, size, numOutputs, useContext, sourceImg });
    if (prompt === '' && size === '' && numOutputs === 0) {
      setIsImageGenActive(false);
    } else {
      setIsImageGenActive(true);
      
      // Deactivate other tools when image generation is activated
      setIsWebSearchEnabled(false);
      setIsVideoGenActive(false);
      setIsThreeDGenActive(false);
      setIsMcpToolsActive(false);
    }
  };

  // Enhanced handlers for modal integration
  const handleImageGenerateWithModal = (prompt: string, size: string, numOutputs: number, useContext?: boolean, sourceImg?: File) => {
    handleImageGenerate(prompt, size, numOutputs, useContext, sourceImg);
    // For demo purposes, show modal on certain interactions (e.g., double-click or long press on mobile)
    if (prompt === 'show-modal') {
      setShowImageModal(true);
    }
  };

  const handleVideoGenerate = (prompt: string, aspectRatio?: string, resolution?: string, frameCount?: number, useContext?: boolean) => {
    console.log('[ChatInputRealDemo] Video generate:', { prompt, aspectRatio, resolution, frameCount, useContext });
    if (prompt === 'configure-only' && aspectRatio === undefined) {
      setIsVideoGenActive(false);
    } else {
      setIsVideoGenActive(true);
      
      // Deactivate other tools when video generation is activated
      setIsWebSearchEnabled(false);
      setIsImageGenActive(false);
      setIsThreeDGenActive(false);
      setIsMcpToolsActive(false);
    }
  };

  const handleVideoGenerateWithModal = (prompt: string, aspectRatio?: string, resolution?: string, frameCount?: number, useContext?: boolean) => {
    handleVideoGenerate(prompt, aspectRatio, resolution, frameCount, useContext);
    if (prompt === 'show-modal') {
      setShowVideoModal(true);
    }
  };

  const handleThreeDGenerate = (textureSize?: number, meshSimplify?: number, ssSamplingSteps?: number, texturedMesh?: boolean, useContext?: boolean, imageFiles?: File[]) => {
    console.log('[ChatInputRealDemo] 3D generate:', { textureSize, meshSimplify, ssSamplingSteps, texturedMesh, useContext, imageFiles });
    if (textureSize === undefined) {
      setIsThreeDGenActive(false);
    } else {
      setIsThreeDGenActive(true);
      
      // Deactivate other tools when 3D generation is activated
      setIsWebSearchEnabled(false);
      setIsImageGenActive(false);
      setIsVideoGenActive(false);
      setIsMcpToolsActive(false);
    }
  };

  const handleThreeDGenerateWithModal = (textureSize?: number, meshSimplify?: number, ssSamplingSteps?: number, texturedMesh?: boolean, useContext?: boolean, imageFiles?: File[]) => {
    handleThreeDGenerate(textureSize, meshSimplify, ssSamplingSteps, texturedMesh, useContext, imageFiles);
    if (textureSize === -1) { // Special trigger value for modal
      setShow3DModal(true);
    }
  };

  const handleMcpToolsToggle = (isActive: boolean) => {
    console.log('[ChatInputRealDemo] MCP tools toggled:', isActive);
    setIsMcpToolsActive(isActive);
    
    // Deactivate other tools when MCP tools is activated
    if (isActive) {
      setIsWebSearchEnabled(false);
      setIsImageGenActive(false);
      setIsVideoGenActive(false);
      setIsThreeDGenActive(false);
    }
  };

  const handleSourceImageSelect = (file: File | null) => {
    console.log('[ChatInputRealDemo] Source image selected:', file?.name);
    setSourceImage(file || undefined);
  };

  const handleTempDocUpload = (doc: any) => {
    console.log('[ChatInputRealDemo] Temp doc uploaded:', doc);
  };

  const handleProcessingStateChange = (state: { isProcessing: boolean, name?: string, error?: string }) => {
    console.log('[ChatInputRealDemo] Processing state changed:', state);
    setIsProcessingDoc(state.isProcessing);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleStop = () => {
    console.log('[ChatInputRealDemo] Stop clicked');
    setIsLoading(false);
  };

  const handleButtonClick = () => {
    if (hasText && !parentIsLoading) {
      handleSubmit({ preventDefault: () => {} } as any);
    }
  };

  // Mobile Tools Button component
  const renderMobileToolsButton = () => {
    return (
      <button
        type="button"
        onClick={() => setShowMobileToolsModal(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 group relative bg-transparent border border-[#D4C0B6] dark:border-gray-600 hover:bg-[#FFE0D0] dark:hover:bg-[#424242]"
        aria-label="Other Tools"
        disabled={parentIsLoading || isProcessingDoc}
      >
        <Settings2 className="h-5 w-5 text-gray-700 dark:text-[#9E9E9E]" />
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+4px)] px-2 py-1 text-xs font-medium text-white dark:text-[#E6E6E6] bg-[#FF6417] dark:bg-[#1A1A1A] rounded-md opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-200">
          Other Tools
        </div>
      </button>
    );
  };

  // Mobile Active Tool Indicator removed for simplified demo

  // Render the send/mic button exactly like the real product
  const renderButton = () => {
    const isDisabled = parentIsLoading || isProcessingDoc;
    const showMicButton = !parentIsLoading && !hasText && !isProcessingDoc;
    
    if (showMicButton) {
      // Mic button when no text (audio input)
      return (
        <button
          type="button"
          onClick={() => console.log('Voice recording would start')}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 group relative",
            "bg-[#FF6417] hover:bg-[#E55000] dark:bg-[#E6E6E6] dark:hover:bg-[#D4D4D4]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          disabled={isProcessingDoc}
          aria-label="Use voice"
        >
          <AudioLines className="h-5 w-5 text-white dark:text-[#1A1A1A]" />
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+4px)] px-2 py-1 text-xs font-medium text-white dark:text-[#E6E6E6] bg-[#FF6417] dark:bg-[#1A1A1A] rounded-md opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-200">
            Use voice
          </div>
        </button>
      );
    }
    
    // Send button when text is present or loading
    return (
      <button
        type={parentIsLoading ? "button" : "submit"}
        onClick={parentIsLoading ? handleStop : handleButtonClick}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 group relative",
          parentIsLoading
            ? "bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
            : isDisabled || !hasText
              ? "bg-[#FFF0E8] dark:bg-[#2A2A2A] hover:bg-[#FFE0D0] dark:hover:bg-[#333333]"
              : "bg-[#FF6417] hover:bg-[#E55000] dark:bg-[#E6E6E6] dark:hover:bg-[#D4D4D4]",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        disabled={!parentIsLoading && (isDisabled || !hasText)}
        aria-label={parentIsLoading ? "Stop generating" : "Send prompt"}
      >
        {parentIsLoading ? (
          <Square className="h-5 w-5 text-white" />
        ) : (
          <ArrowUp className={cn(
            "h-5 w-5",
            isDisabled || !hasText
              ? "text-gray-700 dark:text-gray-400" 
              : "text-white dark:text-[#1A1A1A]"
          )} />
        )}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+4px)] px-2 py-1 text-xs font-medium text-white dark:text-[#E6E6E6] bg-[#FF6417] dark:bg-[#1A1A1A] rounded-md opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-200 whitespace-nowrap">
          {parentIsLoading ? "Stop generating" : "Send prompt"}
        </div>
      </button>
    );
  };

  // Simple CSS styles for the demo (no complex positioning)
  const mobileStyles = `
    @keyframes chatrag-blink {
      0%, 60% { opacity: 1; }
      61%, 100% { opacity: 0; }
    }

    /* Fix textarea overlap with buttons on mobile */
    @media (max-width: 1024px) {
      .chat-input-container textarea {
        padding-bottom: 60px !important; /* Reserve space for button row */
      }
    }
  `;

  return (
    <div className={cn("chat-input-container", className)}>
      {/* Add mobile-specific CSS styles */}
      <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />
      
      <div style={{ background: 'transparent' }}>
        <div className="flex justify-center pt-0 pb-0 md:px-4">
          <form
            onSubmit={handleSubmit}
            className={cn(
              'relative rounded-3xl bg-[#EFE1D5] dark:bg-[#2F2F2F] p-1 md:p-1 w-full md:max-w-[52rem] border border-[#D4C0B6]/20 dark:border-gray-600/20',
              'md:rounded-3xl rounded-2xl', // Different radius for mobile
              isProcessingDoc && 'opacity-70'
            )}
          >
            <div className="relative px-2 md:px-1 sm:px-1.5">
              <div className="flex flex-col">
                <div className="flex items-start gap-2 mb-2 md:mb-16 md:items-center">
                  <div className="flex-1 max-h-[350px] min-h-[48px] md:min-h-auto relative">
                    <TextareaAutosize
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setIsTextareaFocused(true)}
                      onBlur={() => setIsTextareaFocused(false)}
                      placeholder="Ask anything"
                      rows={1}
                      className={cn(
                        "w-full resize-none bg-transparent px-3 md:px-3 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
                        "max-h-[350px] overflow-y-auto scrollbar scrollbar-w-3",
                        "py-3 md:py-2 leading-relaxed md:leading-6",
                        "text-base md:text-sm" // Larger text on mobile, smaller on desktop
                      )}
                    />
                    {/* Blinking caret when textarea is empty and not focused */}
                    {!message.trim() && !isTextareaFocused && (
                      <div 
                        className="absolute left-3 md:left-3 pointer-events-none"
                        style={{
                          top: '0.75rem', // Fine-tuned to match text baseline position
                          height: '1rem', // Match actual font size (16px base, 14px md)
                          width: '1px', // Match browser caret width
                          backgroundColor: 'white',
                          animation: 'chatrag-blink 1.2s infinite',
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 py-1 px-1 sm:px-1.5 rounded-b-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <UnifiedUploadButton
                      onTempDocUpload={handleTempDocUpload}
                      onProcessingStateChange={handleProcessingStateChange}
                      disabled={parentIsLoading}
                    />
                    
                    <div className="w-0.5"></div> {/* Smaller spacer */}

                    {/* Mobile Layout - Show Tools button only */}
                    {isMobile && (
                      <>
                        {renderMobileToolsButton()}
                      </>
                    )}

                    {/* Desktop Layout - Show individual buttons */}
                    {!isMobile && (
                      <>
                        <WebSearchButton
                          onWebSearchToggle={handleWebSearchToggle}
                          isActive={isWebSearchEnabled}
                          disabled={parentIsLoading || isProcessingDoc}
                        />
                        <ImageGenerationButton
                          onImageGenerate={handleImageGenerate}
                          hasText={hasText}
                          hasDocumentContext={hasDocumentContext}
                          isActive={isImageGenActive}
                          sourceImage={sourceImage}
                          onSourceImageSelect={handleSourceImageSelect}
                          disabled={parentIsLoading || isProcessingDoc}
                        />
                        <VideoGenerationButton
                          onVideoGenerate={handleVideoGenerate}
                          hasText={hasText}
                          hasDocumentContext={hasDocumentContext}
                          isActive={isVideoGenActive}
                          disabled={parentIsLoading || isProcessingDoc}
                        />
                        <ThreeDGenerationButton
                          onThreeDGenerate={handleThreeDGenerate}
                          hasDocumentContext={hasDocumentContext}
                          isActive={isThreeDGenActive}
                          disabled={parentIsLoading || isProcessingDoc}
                        />
                        <McpToolsButton
                          onMcpToolsToggle={handleMcpToolsToggle}
                          isActive={isMcpToolsActive}
                          disabled={parentIsLoading || isProcessingDoc}
                        />
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {renderButton()}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Enhanced Modal Integration for Alternative UX */}
      <ImageGenModalDemo 
        isOpen={showImageModal} 
        onClose={() => setShowImageModal(false)} 
      />
      <VideoGenModalDemo 
        isOpen={showVideoModal} 
        onClose={() => setShowVideoModal(false)} 
      />
      <ThreeDGenModalDemo 
        isOpen={show3DModal} 
        onClose={() => setShow3DModal(false)} 
      />
      
      {/* Mobile Tools Modal */}
      <MobileToolsModalDemo
        isOpen={showMobileToolsModal}
        onClose={() => setShowMobileToolsModal(false)}
        onToolSelect={handleMobileToolSelect}
        onImageGenerate={() => setShowImageModal(true)}
        onVideoGenerate={() => setShowVideoModal(true)}
        on3DGenerate={() => setShow3DModal(true)}
      />
    </div>
  );
} 