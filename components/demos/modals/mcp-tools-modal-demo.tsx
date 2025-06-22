'use client';

import React from 'react';
import { X } from 'lucide-react';

interface MCPToolsModalDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MCPToolsModalDemo({ isOpen, onClose }: MCPToolsModalDemoProps) {
  if (!isOpen) return null;

  // Mock data for built-in MCP servers based on the production app
  const mockTools = [
    {
      server: 'zapier',
      tools: [
        { name: 'create_zap', description: 'Create a new Zap automation between apps', enabled: true },
        { name: 'list_zaps', description: 'List all your existing Zaps', enabled: true },
        { name: 'trigger_zap', description: 'Manually trigger a specific Zap', enabled: true },
        { name: 'search_apps', description: 'Search available Zapier apps and triggers', enabled: true }
      ]
    },
    {
      server: 'n8n',
      tools: [
        { name: 'create_workflow', description: 'Create a new n8n workflow', enabled: true },
        { name: 'execute_workflow', description: 'Execute an existing workflow', enabled: true },
        { name: 'list_workflows', description: 'List all available workflows', enabled: true },
        { name: 'get_workflow_status', description: 'Check the status of workflow executions', enabled: true }
      ]
    }
  ];

  // Server display info matching the production app
  const getServerDisplayInfo = (serverId: string) => {
    const serverMap: Record<string, { name: string; icon: string; color: string }> = {
      'zapier': { name: 'Zapier', icon: '⚡', color: 'text-purple-600 dark:text-purple-400' },
      'n8n': { name: 'N8N Tools', icon: '🔗', color: 'text-blue-600 dark:text-blue-400' }
    };
    
    return serverMap[serverId] || { 
      name: serverId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
      icon: '🔧', 
      color: 'text-neutral-800 dark:text-neutral-200' 
    };
  };

  return (
    <div 
      className="fixed inset-0 bg-black/20 dark:bg-black/50 z-50 backdrop-blur-[1px] flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-neutral-800 shadow-lg rounded-lg max-w-md w-full mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-[#FF6417] dark:hover:bg-[#FF8A4D] hover:text-white dark:hover:text-white shadow-md transition-all duration-200 focus:outline-none cursor-pointer z-[100]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="px-6 py-6 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mt-3">Available MCP Tools</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            ChatRAG can use tools provided by specialized servers using Model Context Protocol.
            <span className="text-blue-600 dark:text-blue-400 hover:underline ml-1 cursor-pointer">Learn more</span>
          </p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 space-y-6">
          {mockTools.map(({ server, tools }) => {
            const serverInfo = getServerDisplayInfo(server);
            const enabledTools = tools.filter(t => t.enabled !== false);
            
            return (
              <div key={server} className="space-y-2">
                <h3 className={`text-sm font-medium ${serverInfo.color} mb-2 flex items-center gap-2`}>
                  <span>{serverInfo.icon}</span>
                  <span>{serverInfo.name}</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    ({enabledTools.length} tool{enabledTools.length !== 1 ? 's' : ''})
                  </span>
                </h3>
                <div className="grid gap-2">
                  {tools.map((tool) => (
                    <div 
                      key={tool.name} 
                      className={`group relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 p-3 transition-colors ${
                        tool.enabled !== false 
                          ? 'hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer' 
                          : 'opacity-60 bg-neutral-50 dark:bg-neutral-900/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {tool.name}
                          </h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            {tool.description}
                          </p>
                        </div>
                        {tool.enabled === false && (
                          <span className="text-xs text-red-500 dark:text-red-400 font-medium">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Demo badge */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm text-blue-600 dark:text-blue-400">
            This is a demo showing built-in MCP servers. With ChatRAG you can connect to any MCP server.
          </div>

          {/* Refresh button */}
          <div className="flex justify-center pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => {
                // Demo action
                console.log('Demo: Refresh MCP tools');
              }}
              className="px-4 py-2 text-sm bg-purple-600 dark:bg-purple-500 text-white rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center gap-2"
            >
              Refresh Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}