'use client';

import React, { useState } from 'react';
import { ArrowUp, X, FileText, Paperclip, Globe, Palette, Video, Box, Mic, AudioLines } from 'lucide-react';

// Import demo modals
import { ImageGenModalDemo } from './modals/image-gen-modal-demo';
import { VideoGenModalDemo } from './modals/video-gen-modal-demo';
import { ThreeDGenModalDemo } from './modals/three-d-modal-demo';

interface ChatInputDemoProps {
  className?: string;
}

export function ChatInputDemo({ className }: ChatInputDemoProps) {
  const [input, setInput] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);

  const renderButton = (icon: React.ReactNode, label: string, onClick: () => void, isActive = false) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 group relative ${
          isActive 
            ? "bg-[#FF6417] text-white hover:bg-[#E55000]"
            : "bg-[#FF6417] hover:bg-[#E55000] dark:bg-[#E6E6E6] dark:hover:bg-[#D4D4D4] disabled:opacity-50 disabled:cursor-not-allowed"
        }`}
        aria-label={label}
      >
        {icon}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+4px)] px-2 py-1 text-xs font-medium text-white dark:text-[#E6E6E6] bg-[#FF6417] dark:bg-[#1A1A1A] rounded-md opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-200">
          {label}
        </div>
      </button>
    );
  };

  const renderSubmitButton = () => {
    const isDisabled = !input.trim();
    
    return (
      <button
        type="submit"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 group relative ${
          isDisabled
            ? "bg-[#FFF0E8] dark:bg-[#2A2A2A] hover:bg-[#FFE0D0] dark:hover:bg-[#333333]"
            : "bg-[#FF6417] hover:bg-[#E55000] dark:bg-[#E6E6E6] dark:hover:bg-[#D4D4D4]"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={isDisabled}
        aria-label="Send message"
      >
        <ArrowUp className={`h-5 w-5 ${
          isDisabled 
            ? "text-gray-700 dark:text-gray-400" 
            : "text-white dark:text-[#1A1A1A]"
        }`} />
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+4px)] px-2 py-1 text-xs font-medium text-white dark:text-[#E6E6E6] bg-[#FF6417] dark:bg-[#1A1A1A] rounded-md opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-200">
          Send message
        </div>
      </button>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <form
          className={`relative rounded-3xl bg-[#EFE1D5] dark:bg-[#2F2F2F] p-1 w-full border border-[#D4C0B6]/20 dark:border-gray-600/20 ${
            className || ''
          }`}
        >
          <div className="relative px-2">
            <div className="flex items-end gap-2 p-2">
              {/* Textarea */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message..."
                className="flex-1 resize-none bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 min-h-[2.5rem] max-h-32 py-2 px-3 rounded-xl"
                rows={1}
                disabled
              />
              
              {/* Tool buttons */}
              <div className="flex items-center gap-1">
                {renderButton(
                  <FileText className="h-5 w-5 text-white dark:text-[#1A1A1A]" />,
                  "Upload file",
                  () => {}
                )}
                
                {renderButton(
                  <Mic className="h-5 w-5 text-white dark:text-[#1A1A1A]" />,
                  "Voice input",
                  () => {}
                )}
                
                {renderButton(
                  <Globe className="h-5 w-5 text-white dark:text-[#1A1A1A]" />,
                  "Web search",
                  () => {}
                )}
                
                {renderButton(
                  <Palette className="h-5 w-5 text-white dark:text-[#1A1A1A]" />,
                  "Generate image",
                  () => setShowImageModal(true)
                )}
                
                {renderButton(
                  <Video className="h-5 w-5 text-white dark:text-[#1A1A1A]" />,
                  "Generate video",
                  () => setShowVideoModal(true)
                )}
                
                {renderButton(
                  <Box className="h-5 w-5 text-white dark:text-[#1A1A1A]" />,
                  "Generate 3D",
                  () => setShow3DModal(true)
                )}
                
                {renderSubmitButton()}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Demo Modals */}
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
    </div>
  );
} 