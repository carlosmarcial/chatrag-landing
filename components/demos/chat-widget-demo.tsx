'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Globe, Video, Palette, Check, ChevronDown, ImageIcon, MessageCircle, X, Minimize2, Play, Square, Settings2, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Types for generation settings
interface VideoGenerationSettings {
  isActive: boolean;
  aspectRatio: string;
  resolution: string;
  frameCount: number;
  useContext: boolean;
}

interface ImageGenerationSettings {
  isActive: boolean;
  size: string;
  numOutputs: number;
  useContext: boolean;
  sourceImage?: File;
}

// New props interface for floating widget functionality
interface ChatWidgetDemoProps {
  // Floating widget props
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  primaryColor?: string;
  title?: string;
  showDemoBadge?: boolean;
  isVisible?: boolean;
  animationState?: 'hidden' | 'appearing' | 'visible' | 'disappearing';
  
  // Inline demo props
  className?: string;
}

// Collapsible Button Component (matching real ChatRAG)
interface CollapsibleButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: (e: React.MouseEvent) => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}

function CollapsibleButton({
  icon,
  text,
  onClick,
  isActive = false,
  disabled = false,
  className,
}: CollapsibleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showText = isHovered;

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex h-9 items-center justify-center rounded-xl transition-colors group border-[0.5px] mr-0.25 ${
        isActive
          ? "bg-[#FF6417] border-[#FF6417] hover:bg-[#E55000]"
          : "bg-transparent border-[#D4C0B6] hover:bg-[#FFE0D0]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
    >
      {/* Icon container - always visible */}
      <motion.div
        className="flex items-center justify-center"
        initial={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
        animate={{ 
          paddingLeft: showText ? "0.5rem" : "0.5rem", 
          paddingRight: showText ? "0.25rem" : "0.5rem" 
        }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        <span className={`flex items-center justify-center ${
          isActive ? "text-[#E6E6E6]" : ""
        }`}>
          {icon}
        </span>
      </motion.div>

      {/* Text container - visible on hover */}
      <motion.div
        className="overflow-hidden"
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: showText ? "auto" : 0,
          opacity: showText ? 1 : 0
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <span className={`text-sm font-medium whitespace-nowrap pr-3 ${
          isActive ? "text-[#E6E6E6]" : "text-gray-700"
        }`}>
          {text}
        </span>
      </motion.div>
    </motion.button>
  );
}

// Web Search Button Component
function WebSearchButton({ 
  isActive, 
  onToggle 
}: { 
  isActive: boolean; 
  onToggle: () => void; 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [wasRecentlyActive, setWasRecentlyActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      setWasRecentlyActive(true);
    } else if (!isHovered) {
      setWasRecentlyActive(false);
    }
  }, [isActive, isHovered]);

  const showExpandedWithActive = isActive;
  const showManualExpanded = !isActive && isHovered && wasRecentlyActive;

  return (
    <div 
      className="relative ml-0.25"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showExpandedWithActive ? (
        <button
          type="button"
          onClick={onToggle}
          className="relative inline-flex h-9 items-center justify-center rounded-xl transition-colors border-[0.5px] overflow-hidden mr-0.25 bg-[#FF6417] border-[#FF6417] hover:bg-[#E55000]"
        >
          <div className="flex items-center px-3 gap-1">
            <Globe className="h-5 w-5 text-[#4B9BFF]" />
            <span className="text-sm font-medium whitespace-nowrap text-[#E6E6E6]">
              Web Search
            </span>
          </div>
        </button>
      ) : showManualExpanded ? (
        <button
          type="button"
          onClick={onToggle}
          className="relative inline-flex h-9 items-center justify-center rounded-xl transition-colors border-[0.5px] overflow-hidden mr-0.25 bg-transparent border-[#D4C0B6] hover:bg-[#FFE0D0]"
        >
          <div className="flex items-center px-3 gap-1">
            <Globe className="h-5 w-5 text-[#4B9BFF]" />
            <span className="text-sm font-medium whitespace-nowrap text-gray-700">
              Web Search
            </span>
          </div>
        </button>
      ) : (
        <CollapsibleButton
          icon={<Globe className="h-5 w-5 text-[#4B9BFF]" />}
          text="Web Search"
          onClick={onToggle}
          isActive={false}
        />
      )}
    </div>
  );
}

// Video Generation Button Component
function VideoGenerationButton({ 
  settings, 
  onSettingsChange 
}: { 
  settings: VideoGenerationSettings; 
  onSettingsChange: (settings: VideoGenerationSettings) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [wasRecentlyActive, setWasRecentlyActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (settings.isActive) {
      setWasRecentlyActive(true);
    } else if (!isHovered && !isOpen) {
      setWasRecentlyActive(false);
    }
  }, [settings.isActive, isHovered, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleButtonClick = () => {
    if (!settings.isActive) {
      onSettingsChange({
        ...settings,
        isActive: true,
      });
    }
    setIsOpen(!isOpen);
  };

  const handleAspectRatioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAspectRatioSelect = (e: React.MouseEvent, option: typeof aspectRatioOptions[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSettingsChange({
      ...settings,
      aspectRatio: option.value,
      isActive: true,
    });
  };

  const handleResolutionSelect = (e: React.MouseEvent, option: typeof resolutionOptions[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSettingsChange({
      ...settings,
      resolution: option.value,
      isActive: true,
    });
  };

  const handleDurationSelect = (e: React.MouseEvent, option: typeof durationOptions[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSettingsChange({
      ...settings,
      frameCount: option.value,
      isActive: true,
    });
  };

  const handleContextToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSettingsChange({
      ...settings,
      useContext: !settings.useContext,
      isActive: true,
    });
  };

  const showExpandedWithActive = settings.isActive;
  const showManualExpanded = !settings.isActive && isHovered && wasRecentlyActive;

  return (
    <div 
      ref={dropdownRef}
      className="relative ml-0.25"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showExpandedWithActive ? (
        <button
          type="button"
          onClick={handleButtonClick}
          className="relative inline-flex h-9 items-center justify-center rounded-xl transition-colors border-[0.5px] overflow-hidden mr-0.25 bg-[#FF6417] border-[#FF6417] hover:bg-[#E55000]"
        >
          <div className="flex items-center px-3 gap-1">
            <Video className="h-5 w-5 text-[#E6E6E6]" />
            <span className="text-sm font-medium whitespace-nowrap text-[#E6E6E6]">
              Video ({settings.aspectRatio})
            </span>
            <ChevronDown className="h-4 w-4 text-[#E6E6E6]" />
          </div>
        </button>
      ) : showManualExpanded ? (
        <button
          type="button"
          onClick={handleButtonClick}
          className="relative inline-flex h-9 items-center justify-center rounded-xl transition-colors border-[0.5px] overflow-hidden mr-0.25 bg-transparent border-[#D4C0B6] hover:bg-[#FFE0D0]"
        >
          <div className="flex items-center px-3 gap-1">
            <Video className="h-5 w-5 text-[#FF6417]" />
            <span className="text-sm font-medium whitespace-nowrap text-gray-700">
              Video
            </span>
            <ChevronDown className="h-4 w-4 text-gray-700" />
          </div>
        </button>
      ) : (
        <CollapsibleButton
          icon={<Video className="h-5 w-5 text-[#FF6417]" />}
          text="Video"
          onClick={handleButtonClick}
          isActive={settings.isActive}
        />
      )}

      {isOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 bottom-[calc(100%+10px)] z-[100] w-64 rounded-xl bg-white shadow-lg border border-gray-200 p-3"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Aspect Ratio</label>
              <div className="space-y-1">
                {aspectRatioOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => handleAspectRatioSelect(e, option)}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded-lg transition-colors ${
                      settings.aspectRatio === option.value
                        ? 'bg-[#FF6417] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Resolution</label>
              <div className="space-y-1">
                {resolutionOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => handleResolutionSelect(e, option)}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded-lg transition-colors ${
                      settings.resolution === option.value
                        ? 'bg-[#FF6417] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Duration</label>
              <div className="space-y-1">
                {durationOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => handleDurationSelect(e, option)}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded-lg transition-colors ${
                      settings.frameCount === option.value
                        ? 'bg-[#FF6417] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={handleContextToggle}
                className="flex items-center justify-between w-full px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span>Use document context</span>
                <div className={`w-4 h-4 rounded border ${
                  settings.useContext 
                    ? 'bg-[#FF6417] border-[#FF6417]' 
                    : 'border-gray-300'
                } flex items-center justify-center`}>
                  {settings.useContext && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Image Generation Button Component
function ImageGenerationButton({ 
  settings, 
  onSettingsChange 
}: { 
  settings: ImageGenerationSettings; 
  onSettingsChange: (settings: ImageGenerationSettings) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [wasRecentlyActive, setWasRecentlyActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeOptions = [
    { label: 'Square (1:1)', value: '1:1' },
    { label: 'Portrait (2:3)', value: '2:3' },
    { label: 'Landscape (3:2)', value: '3:2' },
    { label: 'Widescreen (16:9)', value: '16:9' },
  ];

  const outputOptions = [1, 2, 3, 4];

  useEffect(() => {
    if (settings.isActive) {
      setWasRecentlyActive(true);
    } else if (!isHovered && !isOpen) {
      setWasRecentlyActive(false);
    }
  }, [settings.isActive, isHovered, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleButtonClick = () => {
    if (!settings.isActive) {
      onSettingsChange({
        ...settings,
        isActive: true,
      });
    }
    setIsOpen(!isOpen);
  };

  const handleRatioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSettingsChange({
        ...settings,
        sourceImage: file,
        isActive: true,
      });
    }
  };

  const handleSizeSelect = (e: React.MouseEvent, option: typeof sizeOptions[0]) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSettingsChange({
      ...settings,
      size: option.value,
      isActive: true,
    });
  };

  const handleNumOutputsSelect = (e: React.MouseEvent, num: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSettingsChange({
      ...settings,
      numOutputs: num,
      isActive: true,
    });
  };

  const handleContextToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSettingsChange({
      ...settings,
      useContext: !settings.useContext,
      isActive: true,
    });
  };

  const handleImageUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleClearSourceImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    onSettingsChange({
      ...settings,
      sourceImage: undefined,
      isActive: true,
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const showExpandedWithActive = settings.isActive;
  const showManualExpanded = !settings.isActive && isHovered && wasRecentlyActive;

  return (
    <div 
      ref={dropdownRef}
      className="relative ml-0.25"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showExpandedWithActive ? (
        <button
          type="button"
          onClick={handleButtonClick}
          className="relative inline-flex h-9 items-center justify-center rounded-xl transition-colors border-[0.5px] overflow-hidden mr-0.25 bg-[#FF6417] border-[#FF6417] hover:bg-[#E55000]"
        >
          <div className="flex items-center px-3 gap-1">
            <ImageIcon className="h-5 w-5 text-[#E6E6E6]" />
            <span className="text-sm font-medium whitespace-nowrap text-[#E6E6E6]">
              Image ({settings.size})
            </span>
            <ChevronDown className="h-4 w-4 text-[#E6E6E6]" />
          </div>
        </button>
      ) : showManualExpanded ? (
        <button
          type="button"
          onClick={handleButtonClick}
          className="relative inline-flex h-9 items-center justify-center rounded-xl transition-colors border-[0.5px] overflow-hidden mr-0.25 bg-transparent border-[#D4C0B6] hover:bg-[#FFE0D0]"
        >
          <div className="flex items-center px-3 gap-1">
            <ImageIcon className="h-5 w-5 text-[#FF6417]" />
            <span className="text-sm font-medium whitespace-nowrap text-gray-700">
              Image
            </span>
            <ChevronDown className="h-4 w-4 text-gray-700" />
          </div>
        </button>
      ) : (
        <CollapsibleButton
          icon={<ImageIcon className="h-5 w-5 text-[#FF6417]" />}
          text="Image"
          onClick={handleButtonClick}
          isActive={settings.isActive}
        />
      )}

      {isOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 bottom-[calc(100%+10px)] z-[100] w-64 rounded-xl bg-white shadow-lg border border-gray-200 p-3"
          style={{ pointerEvents: 'auto' }}
        >
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Source Image (Optional)</label>
              <div className="space-y-2">
                {settings.sourceImage ? (
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-xs text-gray-600 truncate flex-1">
                      {settings.sourceImage.name}
                    </span>
                    <button
                      type="button"
                      onClick={handleClearSourceImage}
                      className="ml-2 text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleImageUploadClick}
                    className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#FF6417] hover:bg-orange-50 transition-colors text-xs text-gray-600"
                  >
                    Click to upload image
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Size</label>
              <div className="space-y-1">
                {sizeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={(e) => handleSizeSelect(e, option)}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded-lg transition-colors ${
                      settings.size === option.value
                        ? 'bg-[#FF6417] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Number of outputs</label>
              <div className="grid grid-cols-4 gap-1">
                {outputOptions.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={(e) => handleNumOutputsSelect(e, num)}
                    className={`px-2 py-1.5 text-xs rounded-lg transition-colors ${
                      settings.numOutputs === num
                        ? 'bg-[#FF6417] text-white'
                        : 'hover:bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={handleContextToggle}
                className="flex items-center justify-between w-full px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span>Use document context</span>
                <div className={`w-4 h-4 rounded border ${
                  settings.useContext 
                    ? 'bg-[#FF6417] border-[#FF6417]' 
                    : 'border-gray-300'
                } flex items-center justify-center`}>
                  {settings.useContext && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ChatWidgetDemo(props: ChatWidgetDemoProps = {}) {
  const {
    position = 'bottom-right',
    primaryColor = '#FF6417',
    title = 'ChatRAG Assistant',
    showDemoBadge = false,
    isVisible = true,
    animationState = 'visible',
    className
  } = props;

  // Determine if this is a floating widget or inline demo
  const isFloatingWidget = position !== undefined || isVisible !== undefined || animationState !== undefined;

  const [message, setMessage] = useState('');
  const [isWebSearchActive, setIsWebSearchActive] = useState(false);
  const [videoSettings, setVideoSettings] = useState<VideoGenerationSettings>({
    isActive: false,
    aspectRatio: '16:9',
    resolution: '720p',
    frameCount: 5,
    useContext: false,
  });
  const [imageSettings, setImageSettings] = useState<ImageGenerationSettings>({
    isActive: false,
    size: '1:1',
    numOutputs: 1,
    useContext: false,
    sourceImage: undefined,
  });

  // Floating widget state
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string, isStreaming?: boolean}>>([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup streaming timeout on unmount
  React.useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  const streamText = (fullText: string) => {
    setIsStreaming(true);
    
    // Add empty message that we'll stream into
    setChatMessages(prev => [...prev, { 
      role: 'assistant', 
      content: '', 
      isStreaming: true 
    }]);

    let currentIndex = 0;
    
    const streamNextChar = () => {
      if (currentIndex < fullText.length) {
        currentIndex++;
        const currentText = fullText.substring(0, currentIndex);
        
        setChatMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.isStreaming) {
            return [
              ...newMessages.slice(0, -1),
              { ...lastMessage, content: currentText }
            ];
          }
          return newMessages;
        });
        
        streamingTimeoutRef.current = setTimeout(streamNextChar, 30);
      } else {
        // Streaming complete
        setIsStreaming(false);
        setChatMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.isStreaming) {
            return [
              ...newMessages.slice(0, -1),
              { ...lastMessage, isStreaming: false }
            ];
          }
          return newMessages;
        });
      }
    };
    
    streamingTimeoutRef.current = setTimeout(streamNextChar, 30);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isStreaming) {
      // Add user message
      const userMessage = message.trim();
      setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      setMessage('');
      
      // Add demo response with streaming effect after a short delay
      setTimeout(() => {
        streamText('This is a demo version. With ChatRAG you can get this up and running in no time with your API keys from OpenRouter and/or OpenAI.');
      }, 1000);
    }
  };

  const getActiveIndicators = () => {
    const indicators = [];
    if (isWebSearchActive) indicators.push('🔍 Web Search');
    if (videoSettings.isActive) indicators.push(`🎥 Video (${videoSettings.aspectRatio})`);
    if (imageSettings.isActive) indicators.push(`🎨 Image (${imageSettings.size})`);
    return indicators;
  };

  const getPositionClasses = () => {
    const baseClasses = 'fixed';
    switch (position) {
      case 'bottom-right':
        return `${baseClasses} bottom-6 right-6`;
      case 'bottom-left':
        return `${baseClasses} bottom-6 left-6`;
      case 'top-right':
        return `${baseClasses} top-6 right-6`;
      case 'top-left':
        return `${baseClasses} top-6 left-6`;
      default:
        return `${baseClasses} bottom-6 right-6`;
    }
  };

  // Floating widget render
  if (isFloatingWidget) {
    return (
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Add global CSS for blinking cursor */}
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes chatrag-blink {
                  0%, 50% { opacity: 1; }
                  51%, 100% { opacity: 0; }
                }
              `
            }} />
            <motion.div
              className={getPositionClasses()}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: animationState === 'visible' || animationState === 'appearing' ? 1 : 0,
                scale: animationState === 'visible' || animationState === 'appearing' ? 1 : 0.8,
                y: animationState === 'visible' || animationState === 'appearing' ? 0 : 20
              }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                zIndex: 999999
              }}
            >
              {/* Chat bubble trigger - always visible like real widget */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center"
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? '−' : '💬'}
              </motion.button>

              {/* Chat widget - exactly like real widget */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'fixed',
                    width: '320px',
                    height: '480px',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    zIndex: 999999,
                    ...(position === 'bottom-right' && { bottom: '90px', right: '10px' }),
                    ...(position === 'bottom-left' && { bottom: '90px', left: '24px' }),
                    ...(position === 'top-right' && { top: '90px', right: '24px' }),
                    ...(position === 'top-left' && { top: '90px', left: '24px' })
                  }}
                >
                  {/* Header - exactly like real widget */}
                  <div 
                    style={{
                      backgroundColor: primaryColor,
                      color: 'white',
                      padding: '16px',
                      fontWeight: '600',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{title}</span>
                    <button
                      onClick={() => setIsOpen(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        padding: '0',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>


                  {/* Messages container - exactly like real widget */}
                  <div 
                    style={{
                      flex: '1',
                      overflowY: 'auto',
                      padding: '16px',
                      background: '#f8f9fa'
                    }}
                  >
                    {chatMessages.map((msg, index) => (
                      <div key={index} style={{ marginBottom: '12px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div style={{
                          maxWidth: '80%',
                          padding: '12px 16px',
                          borderRadius: '18px',
                          fontSize: '14px',
                          lineHeight: '1.4',
                          backgroundColor: msg.role === 'user' ? primaryColor : 'white',
                          color: msg.role === 'user' ? 'white' : '#333',
                          border: msg.role === 'user' ? 'none' : '1px solid #eee',
                          borderBottomLeftRadius: msg.role === 'user' ? '18px' : '4px',
                          borderBottomRightRadius: msg.role === 'user' ? '4px' : '18px'
                        }}>
                          {msg.content}
                          {msg.isStreaming && (
                            <span style={{
                              display: 'inline-block',
                              width: '2px',
                              height: '14px',
                              backgroundColor: '#333',
                              marginLeft: '2px',
                              animation: 'chatrag-blink 1s infinite'
                            }} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input container - exactly like real widget */}
                  <div style={{
                    padding: '16px',
                    borderTop: '1px solid #e2e8f0',
                    background: 'white'
                  }}>
                    <form onSubmit={handleSubmit}>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'flex-end'
                      }}>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type a message..."
                          style={{
                            flex: '1',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '12px',
                            resize: 'none',
                            fontFamily: 'inherit',
                            fontSize: '14px',
                            maxHeight: '120px',
                            minHeight: '44px',
                            outline: 'none',
                            backgroundColor: 'white',
                            color: '#333',
                            overflowY: 'hidden'
                          }}
                          className="placeholder:text-gray-500"
                          rows={1}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmit(e);
                            }
                          }}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            const newHeight = Math.min(target.scrollHeight, 120);
                            target.style.height = newHeight + 'px';
                            
                            // Only show scrollbar when content actually exceeds maxHeight
                            if (target.scrollHeight > 120) {
                              target.style.overflowY = 'auto';
                            } else {
                              target.style.overflowY = 'hidden';
                            }
                          }}
                        />
                        <button
                          type="submit"
                          disabled={!message.trim()}
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '8px',
                            backgroundColor: message.trim() ? primaryColor : '#ccc',
                            color: 'white',
                            border: 'none',
                            fontSize: '18px',
                            cursor: message.trim() ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'opacity 0.2s'
                          }}
                        >
                          ↗
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Inline demo render (existing functionality)
  return (
    <div className={cn("w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden", className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">ChatRAG Demo</h3>
        <p className="text-sm text-gray-600">Experience the real ChatRAG interface with inline dropdowns</p>
        
        {/* Active indicators */}
        {getActiveIndicators().length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {getActiveIndicators().map((indicator, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full border border-orange-200"
              >
                {indicator}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="h-96 p-4 bg-gray-50 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex justify-start">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200 max-w-xs">
              <p className="text-sm text-gray-700">Hello! I'm ChatRAG. Try activating the generation tools below and see how they work just like the real product.</p>
            </div>
          </div>
          
          {message && (
            <div className="flex justify-end">
              <div className="bg-orange-500 text-white rounded-lg px-4 py-2 max-w-xs">
                <p className="text-sm">{message}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <WebSearchButton 
                isActive={isWebSearchActive} 
                onToggle={() => setIsWebSearchActive(!isWebSearchActive)} 
              />
              <VideoGenerationButton 
                settings={videoSettings} 
                onSettingsChange={setVideoSettings} 
              />
              <ImageGenerationButton 
                settings={imageSettings} 
                onSettingsChange={setImageSettings} 
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Message Input */}
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send a message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 