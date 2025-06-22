'use client';

import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ChatInputRealDemo } from '../demos/chat-input-real-demo';

export function ChatWidgetsSection() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <section id="ui" className="pt-4 pb-8 md:pt-6 md:pb-12">
      <div className="container mx-auto px-4">
        {/* Simple Header - Positioned higher in the section */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          <div className="bg-[#212121] rounded-lg p-6 mb-6 max-w-sm mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-0 text-[#FCEFE4]">Chatbot UI's</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Deploy either a complete chatbot solution like ChatGPT, with a recent chats sidebar, user settings dashboard, AI image, video and 3D generation, or embed as a floating chat widget on any website. Both function as intelligent AI assistants powered by your data.
          </p>
        </div>

        {/* Chat Input Demo with Theme Toggle */}
        <div className="max-w-4xl mx-auto mt-24 md:mt-32 mb-24 md:mb-32">
          <div className="text-center mb-8 relative">
            {/* Theme Toggle Button */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <span className={`text-sm font-medium transition-colors ${!isDarkMode ? 'text-gray-900' : 'text-gray-400'}`}>
                Light
              </span>
              <button
                onClick={toggleTheme}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6417] focus:ring-offset-2
                  ${isDarkMode ? 'bg-[#FF6417]' : 'bg-gray-200'}
                `}
                role="switch"
                aria-checked={isDarkMode}
                aria-label="Toggle theme"
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform flex items-center justify-center
                    ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}
                  `}
                >
                  {isDarkMode ? (
                    <Moon className="h-2.5 w-2.5 text-[#FF6417]" />
                  ) : (
                    <Sun className="h-2.5 w-2.5 text-yellow-500" />
                  )}
                </span>
              </button>
              <span className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-900' : 'text-gray-400'}`}>
                Dark
              </span>
            </div>
          </div>
          
          {/* Chat Input with Dynamic Theme */}
          <div 
            className={`
              transition-all duration-500 ease-in-out rounded-3xl p-12 md:p-16 
              ${isDarkMode 
                ? 'bg-[#212121] border border-gray-600/20' 
                : 'bg-[#FFF1E5] border border-[#FFE0D0]'
              }
            `}
          >
            <h3 className={`text-2xl md:text-3xl font-semibold text-center px-4 mb-8 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              What can I help with?
            </h3>
            <div className={isDarkMode ? 'dark' : ''}>
              <ChatInputRealDemo className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 