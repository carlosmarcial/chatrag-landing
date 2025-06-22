'use client';

import React, { useState } from 'react';
import { Palette, X, Upload, Check, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGenModalDemoProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate?: (settings: ImageGenerationSettings) => void;
}

interface ImageGenerationSettings {
  size: string;
  numOutputs: number;
  useContext: boolean;
  sourceImage?: File;
}

const sizeOptions = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Portrait (2:3)', value: '2:3' }, 
  { label: 'Landscape (3:2)', value: '3:2' },
  { label: 'Wide (16:9)', value: '16:9' },
];

const numOutputsOptions = [1, 2, 3, 4];

export function ImageGenModalDemo({ isOpen, onClose, onGenerate }: ImageGenModalDemoProps) {
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [selectedNumOutputs, setSelectedNumOutputs] = useState(1);
  const [useDocumentContext, setUseDocumentContext] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    const settings: ImageGenerationSettings = {
      size: selectedSize.value, 
      numOutputs: selectedNumOutputs, 
      useContext: useDocumentContext,
      sourceImage: uploadedImage || undefined
    };
    
    console.log('Generating image with:', settings);
    
    // Call the callback if provided
    if (onGenerate) {
      onGenerate(settings);
    }
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
    }, 2000);
  };

  const handleClearImage = () => {
    setUploadedImage(null);
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
            <div className="w-10 h-10 bg-[#FFB000] rounded-xl flex items-center justify-center">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Image Generation Settings
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configure your image generation parameters
          </p>
        </div>

        <div className="space-y-6">
          {/* Aspect Ratio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sizeOptions.map((option) => (
                <button 
                  key={option.value}
                  onClick={() => setSelectedSize(option)}
                  disabled={isGenerating}
                  className={cn(
                    "p-3 border rounded-xl text-sm font-medium transition-all duration-200",
                    selectedSize.value === option.value
                      ? "bg-[#FFB000] text-white border-[#FFB000] shadow-md scale-105"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#FFB000] dark:hover:border-[#FFB000]",
                    isGenerating && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Number of Images
            </label>
            <div className="grid grid-cols-4 gap-2">
              {numOutputsOptions.map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedNumOutputs(num)}
                  disabled={isGenerating}
                  className={cn(
                    "p-3 border rounded-xl text-sm font-medium transition-all duration-200",
                    selectedNumOutputs === num
                      ? "bg-[#FFB000] text-white border-[#FFB000] shadow-md scale-105"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-[#FFB000] dark:hover:border-[#FFB000]",
                    isGenerating && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Source Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Source Image (Optional)
            </label>
            {uploadedImage ? (
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFB000] rounded-lg flex items-center justify-center">
                    <Image className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block truncate max-w-[200px]">
                      {uploadedImage.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(uploadedImage.size / 1024)} KB
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleClearImage}
                  disabled={isGenerating}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50 px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isGenerating}
                />
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-[#FFB000] dark:hover:border-[#FFB000] transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </label>
            )}
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
                  ? "bg-[#FFB000]" 
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
            className="flex-1 px-4 py-2.5 bg-[#FFB000] hover:bg-[#E09600] text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Export the settings interface for use in other components
export type { ImageGenerationSettings }; 