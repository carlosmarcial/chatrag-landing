import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Image, Video, Box, Info, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Media Generation - ChatRAG Documentation",
  description: "Configure AI image, video, and 3D model generation in ChatRAG using Replicate, Fal.ai, and other providers.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/media-generation',
  },
  openGraph: {
    title: 'Media Generation - ChatRAG Documentation',
    description: 'Configure AI image, video, and 3D model generation in ChatRAG using Replicate, Fal.ai, and other providers.',
    url: 'https://www.chatrag.ai/docs/media-generation',
    siteName: 'ChatRAG',
    type: 'article',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function MediaGenerationPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Media Generation</h1>
        <p className="text-xl text-muted-foreground">
          Generate images, videos, and 3D models directly from chat conversations using state-of-the-art AI models.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Multi-Modal Capabilities</AlertTitle>
        <AlertDescription>
          ChatRAG supports text-to-image, image-to-image, text-to-video, image-to-video, and text-to-3D generation through multiple providers.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Image Generation */}
        <section className="border-l-4 border-blue-500 pl-6">
          <div className="flex items-center mb-4">
            <Image className="w-6 h-6 mr-2 text-blue-500" />
            <h2 className="text-2xl font-bold tracking-tight">Image Generation</h2>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Enable Image Generation</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_IMAGE_GENERATION_ENABLED=true
IMAGE_GENERATION_PROVIDER=fal  # or "openai" or "replicate"`}</code>
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">FAL.ai</h3>
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Recommended</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Fast, high-quality image generation with multiple models
                </p>
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                  <code>{`FAL_API_KEY=...
FAL_IMAGE_MODEL=fal-ai/bytedance/seedream/v4/text-to-image
FAL_IMAGE_TO_IMAGE_MODEL=fal-ai/bytedance/seedream/v4/edit`}</code>
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">OpenAI DALL-E</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  High-quality, prompt-faithful generations
                </p>
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                  <code>{`OPENAI_API_KEY=...
OPENAI_IMAGE_MODEL=gpt-image-1`}</code>
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Replicate</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Access to Stable Diffusion and other models
                </p>
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                  <code>REPLICATE_API_TOKEN=...</code>
                </pre>
              </div>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Supported Features</AlertTitle>
              <AlertDescription className="text-sm">
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Text-to-image generation</li>
                  <li>Image-to-image editing</li>
                  <li>Style transfer</li>
                  <li>Automatic storage in Supabase</li>
                  <li>Inline display in chat</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Video Generation */}
        <section className="border-l-4 border-purple-500 pl-6">
          <div className="flex items-center mb-4">
            <Video className="w-6 h-6 mr-2 text-purple-500" />
            <h2 className="text-2xl font-bold tracking-tight">Video Generation</h2>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Enable Video Generation</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_VIDEO_GENERATION_ENABLED=true
VIDEO_GENERATION_PROVIDER=fal  # Default: FAL.ai
USE_REPLICATE_PROVIDER=false   # Set to true for Replicate`}</code>
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">FAL.ai Video Models</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  State-of-the-art video generation
                </p>
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                  <code>{`FAL_API_KEY=...
FAL_VIDEO_TEXT_MODEL=fal-ai/veo3/fast
FAL_VIDEO_IMAGE_MODEL=fal-ai/veo3/image-to-video`}</code>
                </pre>
                <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                  <li>• Text-to-video</li>
                  <li>• Image-to-video animation</li>
                  <li>• Fast generation times</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Alternative Providers</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Switch to Replicate for more options
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Runway ML models</li>
                  <li>• Luma AI</li>
                  <li>• Kling AI</li>
                  <li>• Custom model support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Generation */}
        <section className="border-l-4 border-green-500 pl-6">
          <div className="flex items-center mb-4">
            <Box className="w-6 h-6 mr-2 text-green-500" />
            <h2 className="text-2xl font-bold tracking-tight">3D Model Generation</h2>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Enable 3D Generation</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`NEXT_PUBLIC_3D_GENERATION_ENABLED=true
FAL_3D_MODEL=fal-ai/trellis  # Default Trellis model
USE_REPLICATE_PROVIDER=false # Or use Replicate alternative`}</code>
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Trellis (FAL.ai)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  High-quality 3D model generation from text
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Text-to-3D</li>
                  <li>• GLB/GLTF export</li>
                  <li>• Interactive 3D viewer</li>
                  <li>• Texture generation</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Meshy AI (Alternative)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Professional-grade 3D models
                </p>
                <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                  <code>REPLICATE_3D_MODEL=...</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Storage Configuration */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Storage Configuration</h2>
          <p className="text-muted-foreground mb-4">
            Generated media is automatically stored in Supabase Storage buckets:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">chat-images</h3>
              <p className="text-sm text-muted-foreground">
                Stores all generated images from chat conversations
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">chat-videos</h3>
              <p className="text-sm text-muted-foreground">
                Stores generated video files with metadata
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">3d-models</h3>
              <p className="text-sm text-muted-foreground">
                Stores 3D model files (GLB/GLTF format)
              </p>
            </div>
          </div>

          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Buckets are automatically created by the <code className="bg-muted px-1 py-0.5 rounded">supabase/complete_setup.sql</code> script with proper access policies.
            </AlertDescription>
          </Alert>
        </section>

        {/* Usage Examples */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Usage in Chat</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Generate Images</h3>
              <p className="text-sm text-muted-foreground mb-2">Example prompts:</p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                <li>"Generate an image of a sunset over mountains"</li>
                <li>"Create a logo for a tech startup"</li>
                <li>"Draw a cartoon character with blue hair"</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Generate Videos</h3>
              <p className="text-sm text-muted-foreground mb-2">Example prompts:</p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                <li>"Create a video of waves crashing on a beach"</li>
                <li>"Animate this image [upload]"</li>
                <li>"Generate a timelapse of a city at night"</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Generate 3D Models</h3>
              <p className="text-sm text-muted-foreground mb-2">Example prompts:</p>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                <li>"Create a 3D model of a coffee mug"</li>
                <li>"Generate a 3D spaceship design"</li>
                <li>"Make a 3D model of a modern chair"</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Best Practices</h2>

          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Start with FAL.ai</p>
                <p className="text-sm text-muted-foreground">
                  FAL.ai offers the best balance of speed, quality, and cost for most use cases
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Monitor API Costs</p>
                <p className="text-sm text-muted-foreground">
                  Media generation can be expensive. Set up usage alerts in your provider dashboard
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Optimize Storage</p>
                <p className="text-sm text-muted-foreground">
                  Configure Supabase Storage lifecycle policies to archive or delete old media
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Use Detailed Prompts</p>
                <p className="text-sm text-muted-foreground">
                  More detailed prompts yield better results. Include style, mood, colors, and composition details
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold">Test Generation Times</p>
                <p className="text-sm text-muted-foreground">
                  Different models have different generation times. Test to find the right speed/quality balance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration Reference */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Complete Configuration Reference</h2>

          <div className="border rounded-lg p-4">
            <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
              <code>{`# Enable Features
NEXT_PUBLIC_IMAGE_GENERATION_ENABLED=true
NEXT_PUBLIC_VIDEO_GENERATION_ENABLED=true
NEXT_PUBLIC_3D_GENERATION_ENABLED=true

# Providers
IMAGE_GENERATION_PROVIDER=fal
VIDEO_GENERATION_PROVIDER=fal
USE_REPLICATE_PROVIDER=false

# FAL.ai Configuration
FAL_API_KEY=your_fal_api_key
FAL_IMAGE_MODEL=fal-ai/bytedance/seedream/v4/text-to-image
FAL_IMAGE_TO_IMAGE_MODEL=fal-ai/bytedance/seedream/v4/edit
FAL_VIDEO_TEXT_MODEL=fal-ai/veo3/fast
FAL_VIDEO_IMAGE_MODEL=fal-ai/veo3/image-to-video
FAL_3D_MODEL=fal-ai/trellis

# OpenAI (optional)
OPENAI_API_KEY=your_openai_key
OPENAI_IMAGE_MODEL=gpt-image-1

# Replicate (optional)
REPLICATE_API_TOKEN=your_replicate_token
REPLICATE_3D_MODEL=custom_model_id

# Storage (created automatically)
# Buckets: chat-images, chat-videos, 3d-models`}</code>
            </pre>
          </div>
        </section>
      </div>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/authentication" className="text-primary hover:underline flex items-center">
            ← Previous: Authentication
          </a>
          <a href="/docs/mcp-integration" className="text-primary hover:underline flex items-center">
            Next: MCP Integration →
          </a>
        </div>
      </div>
    </div>
  );
}
