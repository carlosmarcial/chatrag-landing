'use client';

import React from 'react';
import { X, Globe, Palette, Video, Box, Hammer } from 'lucide-react';

interface MobileToolsModalDemoProps {
  isOpen: boolean;
  onClose: () => void;
  onToolSelect: (toolId: string) => void;
  onImageGenerate: () => void;
  onVideoGenerate: () => void;
  on3DGenerate: () => void;
}

interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  onClick: () => void;
}

export function MobileToolsModalDemo({
  isOpen,
  onClose,
  onToolSelect,
  onImageGenerate,
  onVideoGenerate,
  on3DGenerate,
}: MobileToolsModalDemoProps) {
  const tools: ToolItem[] = [
    {
      id: 'web-search',
      name: 'Web Search',
      description: 'Search the internet for current information',
      icon: <Globe className="h-6 w-6" />,
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
      onClick: () => onClose(), // Just close the modal for demo
    },
    {
      id: 'image-generation',
      name: 'Create Image',
      description: 'Generate images with AI',
      icon: <Palette className="h-6 w-6" />,
      bgColor: 'bg-purple-500',
      textColor: 'text-white',
      onClick: () => onClose(), // Just close the modal for demo
    },
    {
      id: 'video-generation',
      name: 'Create Video',
      description: 'Generate videos with AI',
      icon: <Video className="h-6 w-6" />,
      bgColor: 'bg-green-500',
      textColor: 'text-white',
      onClick: () => onClose(), // Just close the modal for demo
    },
    {
      id: '3d-generation',
      name: '3D Model',
      description: 'Create 3D models from images',
      icon: <Box className="h-6 w-6" />,
      bgColor: 'bg-orange-500',
      textColor: 'text-white',
      onClick: () => onClose(), // Just close the modal for demo
    },
    {
      id: 'mcp-tools',
      name: 'MCP Tools',
      description: 'Access specialized tools and integrations',
      icon: <Hammer className="h-6 w-6" />,
      bgColor: 'bg-indigo-500',
      textColor: 'text-white',
      onClick: () => onClose(), // Just close the modal for demo
    },
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[100]"
      onClick={handleBackdropClick}
    >
      <div
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#1A1A1A] rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Tools
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Tools Grid */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {tools.map((tool, index) => (
              <button
                key={tool.id}
                onClick={tool.onClick}
                className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md ${tool.bgColor}`}
                style={{ minHeight: '120px' }}
              >
                {/* Tool Icon */}
                <div className={`mb-3 ${tool.textColor}`}>
                  {tool.icon}
                </div>

                {/* Tool Name */}
                <h3 className={`font-medium text-sm mb-1 ${tool.textColor}`}>
                  {tool.name}
                </h3>

                {/* Tool Description */}
                <p className={`text-xs opacity-90 ${tool.textColor}`}>
                  {tool.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Safe area padding for mobile devices */}
        <div className="h-[env(safe-area-inset-bottom)] bg-white dark:bg-[#1A1A1A]" />
      </div>
    </div>
  );
}