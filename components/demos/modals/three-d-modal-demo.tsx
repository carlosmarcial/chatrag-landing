'use client';

import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThreeDModalDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThreeDGenModalDemo({ isOpen, onClose }: ThreeDModalDemoProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [useDocumentContext, setUseDocumentContext] = useState(false);
  const [texturedMesh, setTexturedMesh] = useState(true);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    console.log('Generating 3D model with context:', useDocumentContext, 'textured:', texturedMesh);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-[#EFE1D5] dark:bg-[#2F2F2F] p-6 rounded-2xl w-[400px] max-w-[90vw] border border-[#D4C0B6]/20 dark:border-gray-600/20">
        <button 
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-[#D4C0B6]/20 dark:hover:bg-gray-600/20 transition-colors" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Generate 3D Model
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload an image to convert to a 3D model
          </p>
        </div>

        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Source Image *
            </label>
            <div className="border-2 border-dashed border-[#D4C0B6] dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#FF6417] dark:hover:border-[#FF6417] transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                PNG, JPG up to 10MB
              </p>
            </div>
          </div>

          {/* Texture Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Texture Size
            </label>
            <select className="w-full p-2 border border-[#D4C0B6] dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option value="512">512px</option>
              <option value="1024">1024px</option>
              <option value="2048">2048px</option>
            </select>
          </div>

          {/* Mesh Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mesh Quality
            </label>
            <div className="space-y-2">
              <input 
                type="range" 
                min="0.5" 
                max="1" 
                step="0.1" 
                defaultValue="0.9"
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Textured Mesh Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Generate textured mesh
            </label>
            <button 
              onClick={() => setTexturedMesh(!texturedMesh)}
              disabled={isGenerating}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                texturedMesh ? "bg-[#FF6417]" : "bg-gray-200 dark:bg-gray-700",
                isGenerating && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform",
                texturedMesh ? "translate-x-6" : "translate-x-1"
              )} />
            </button>
          </div>

          {/* Use Context Toggle */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Use document context
            </label>
            <button 
              onClick={() => setUseDocumentContext(!useDocumentContext)}
              disabled={isGenerating}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                useDocumentContext ? "bg-[#FF6417]" : "bg-gray-200 dark:bg-gray-700",
                isGenerating && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform",
                useDocumentContext ? "translate-x-6" : "translate-x-1"
              )} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={onClose}
            disabled={isGenerating}
            className="flex-1 px-4 py-2 border border-[#D4C0B6] dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#D4C0B6]/10 dark:hover:bg-gray-600/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-1 px-4 py-2 bg-[#FF6417] hover:bg-[#E55000] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </button>
        </div>

        {/* Demo indicator - Enhanced */}
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Demo Mode - No actual generation
          </span>
        </div>
      </div>
    </div>
  );
} 