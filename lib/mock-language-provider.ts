// Mock language provider for demo purposes

export const useMockLanguage = () => {
  const mockTranslations = {
    // Common chat input translations
    'messagePlaceholder': 'Send a message...',
    'sendPrompt': 'Send prompt',
    'stopGenerating': 'Stop generating',
    'useVoice': 'Use voice',
    'stopRecording': 'Stop recording',
    'processing': 'Processing...',
    'generate3DModel': 'Generate 3D model from image',
    'threeDModel': '3D model',
    'errorProcessingDocument': 'Error processing document',
    'processingDocument': 'Processing document...',
    'documentReady': 'Document ready',
    
    // Button tooltips
    'webSearch': 'Web search',
    'imageGenerate': 'Generate Image',
    'videoGenerate': 'Generate Video',
    'imageGeneration': 'Image generation',
    'videoGeneration': 'Video generation',
    'threeDGeneration': '3D generation',
    'mcpTools': 'MCP tools',
    'uploadFile': 'Upload file',
    
    // Common UI text
    'write': 'Write',
    'plan': 'Plan', 
    'design': 'Design',
    'writeSummary': 'Write a summary',
    'writeEmail': 'Write an email',
    'writeBlog': 'Write a blog post',
    'writeSocial': 'Write social media content',
    'planMarketing': 'Plan a marketing campaign',
    'planBusiness': 'Plan a business strategy',
    'planProduct': 'Plan a product launch',
    'planLearning': 'Plan a learning path',
    'designLogo': 'Design a logo',
    'designHero': 'Design a hero section',
    'designLanding': 'Design a landing page',
    'designSocial': 'Design social media graphics',
  };
  
  const t = (key: string): string => {
    return mockTranslations[key as keyof typeof mockTranslations] || key;
  };
  
  return { t };
}; 