'use client';

import React, { useState } from 'react';
import { Video, X, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoGenModalDemoProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate?: (settings: VideoGenerationSettings) => void;
}

interface VideoGenerationSettings {
  aspectRatio: string;
  resolution: string;
  duration: number;
  useContext: boolean;
}

const aspectRatioOptions = [
  { label: 'Landscape (16:9)', value: '16:9' },
  { label: 'Portrait (9:16)', value: '9:16' },
  { label: 'Square (1:1)', value: '1:1' },
];

const resolutionOptions = [
  { label: '480p', value: '480p' },
  { label: '720p', value: '720p' },
  { label: '1080p', value: '1080p' },
];

const durationOptions = [
  { label: '5 seconds', value: 5 },
  { label: '10 seconds', value: 10 },
];

export function VideoGenModalDemo({ isOpen, onClose, onGenerate }: VideoGenModalDemoProps) {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatioOptions[0]);
  const [selectedResolution, setSelectedResolution] = useState(resolutionOptions[1]); // Default to 720p
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);
  const [useDocumentContext, setUseDocumentContext] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    
    const settings: VideoGenerationSettings = {
      aspectRatio: selectedAspectRatio.value, 
      resolution: selectedResolution.value, 
      duration: selectedDuration.value,
      useContext: useDocumentContext 
    };
    
    console.log('Generating video with:', settings);
    
    // Call the callback if provided
    if (onGenerate) {
      onGenerate(settings);
    }
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
    }, 3000);
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isGenerating) {
      onClose();
    }
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isGenerating) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isGenerating, onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative bg-white dark:bg-[#2F2F2F] p-6 rounded-2xl w-[480px] max-w-[90vw] border border-gray-200 dark:border-gray-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
          onClick={onClose}
          aria-label="Close modal"
          disabled={isGenerating}
        >
          <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>
        
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#FF6417] rounded-xl flex items-center justify-center">
              <Video className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Video Generation Settings
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configure your video generation parameters
          </p>
        </div>

        <div className="space-y-6">
          {/* Aspect Ratio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-3 gap-2">
              {aspectRatioOptions.map((option) => (
                <button 
                  key={option.value}
                  onClick={() => setSelectedAspectRatio(option)}
                  disabled={isGenerating}
                  className={cn(
                    "p-3 border rounded-xl text-sm font-medium transition-all duration-200",
                    selectedAspectRatio.value === option.value
                      ? "bg-[#FF6417] text-white border-[#FF6417] shadow-md scale-105"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#FF6417] dark:hover:border-[#FF6417]",
                    isGenerating && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resolution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Resolution
            </label>
            <div className="grid grid-cols-3 gap-2">
              {resolutionOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedResolution(option)}
                  disabled={isGenerating}
                  className={cn(
                    "p-3 border rounded-xl text-sm font-medium transition-all duration-200",
                    selectedResolution.value === option.value
                      ? "bg-[#FF6417] text-white border-[#FF6417] shadow-md scale-105"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#FF6417] dark:hover:border-[#FF6417]",
                    isGenerating && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Duration
            </label>
            <div className="grid grid-cols-2 gap-2">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDuration(option)}
                  disabled={isGenerating}
                  className={cn(
                    "p-3 border rounded-xl text-sm font-medium transition-all duration-200",
                    selectedDuration.value === option.value
                      ? "bg-[#FF6417] text-white border-[#FF6417] shadow-md scale-105"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#FF6417] dark:hover:border-[#FF6417]",
                    isGenerating && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Use Context Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Use document context
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Include conversation context in generation
              </p>
            </div>
            <button 
              onClick={() => setUseDocumentContext(!useDocumentContext)}
              disabled={isGenerating}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                useDocumentContext 
                  ? "bg-[#FF6417]" 
                  : "bg-gray-200 dark:bg-gray-700",
                isGenerating && "opacity-50 cursor-not-allowed"
              )}
            >
              <span 
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform",
                  useDocumentContext ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose}
            disabled={isGenerating}
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-1 px-4 py-2.5 bg-[#FF6417] hover:bg-[#E55000] text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Generating...
              </>
            ) : (
              'Generate Video'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Export the settings interface for use in other components
export type { VideoGenerationSettings }; 