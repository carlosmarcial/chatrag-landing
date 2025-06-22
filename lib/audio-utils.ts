// Mock audio utilities for demo purposes

export const startRecording = async (): Promise<MediaRecorder> => {
  console.log('[Demo AudioUtils] Starting recording (mock)');
  
  // Create a mock MediaRecorder
  const mockMediaRecorder = {
    start: () => console.log('[Demo AudioUtils] Mock recording started'),
    stop: () => console.log('[Demo AudioUtils] Mock recording stopped'),
    stream: {
      getTracks: () => [{
        stop: () => console.log('[Demo AudioUtils] Mock track stopped')
      }]
    }
  } as any;
  
  return mockMediaRecorder;
};

export const stopRecording = async (mediaRecorder: MediaRecorder): Promise<Blob> => {
  console.log('[Demo AudioUtils] Stopping recording (mock)');
  
  // Return a mock audio blob
  return new Blob(['mock audio data'], { type: 'audio/wav' });
};

export const speechToText = async (audioBlob: Blob): Promise<string> => {
  console.log('[Demo AudioUtils] Converting speech to text (mock)');
  
  // Return a mock transcription
  return "This is a demo transcription of your voice input.";
}; 