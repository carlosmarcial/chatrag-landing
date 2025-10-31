"use client";

import { Upload, MessageSquare, Settings, Share2, User, CreditCard, MessageCircle } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  videoSrc: string;
  icon: React.ReactNode;
  reverse?: boolean;
}

const features: Feature[] = [
  {
    title: "Upload Documents Instantly",
    description: "Drop your PDFs, Word docs, Excel files, and more into the dashboard. ChatRAG automatically parses, chunks, and embeds your documents into the vector database—no manual configuration needed. From upload to chatbot-ready knowledge in seconds.",
    videoSrc: "/videos-features/upload-docs.mp4",
    icon: <Upload className="w-6 h-6" />,
    reverse: false,
  },
  {
    title: "Intelligent Conversations",
    description: "Powered by a high-performance RAG pipeline that uses LlamaCloud for intelligent parsing and chunking, OpenAI embeddings for precise semantic search, and a Supabase HNSW vector index for ultra-fast retrieval. The codebase is continuously updated to adopt the latest, most powerful and efficient RAG techniques, delivering contextual, reliable answers in real time.",
    videoSrc: "/videos-features/placeholder-chat.mp4",
    icon: <MessageSquare className="w-6 h-6" />,
    reverse: true,
  },
  {
    title: "Configure Without Code",
    description: "Customize your chatbot's behavior, appearance, and personality through an intuitive dashboard. Modify system prompts, upload logos, change colors, and configure API keys—all without touching a single line of code.",
    videoSrc: "/videos-features/placeholder-config.mp4",
    icon: <Settings className="w-6 h-6" />,
    reverse: false,
  },
  {
    title: "Accounts & Saved Chats",
    description: "Let users sign up and log in with built-in auth. Each account securely stores full chat history so conversations persist across sessions and devices.",
    videoSrc: "/videos-features/placeholder-config.mp4",
    icon: <User className="w-6 h-6" />,
    reverse: true,
  },
  {
    title: "Monetize with Stripe & Polar",
    description: "Connect Stripe and Polar in minutes to charge for access to your custom chatbots—so you or your clients can monetize knowledge bases quickly with subscriptions or one-time purchases.",
    videoSrc: "/videos-features/placeholder-config.mp4",
    icon: <CreditCard className="w-6 h-6" />,
    reverse: false,
  },
  {
    title: "WhatsApp Integration",
    description: "Beyond the web app and embeddable chat widget, connect your chatbot to any WhatsApp number—no WhatsApp Business account required. Go live fast and meet users where they already chat.",
    videoSrc: "/videos-features/placeholder-chat.mp4",
    icon: <MessageCircle className="w-6 h-6" />,
    reverse: true,
  },
  {
    title: "Built-In Pro Features",
    description: "Share a link, embed a widget, or ship a full web app—then scale globally. Packed with power features out of the box: image, video, and 3D generation; MCP tool integrations; web search combined with RAG; executable Artifacts that visualize code; OpenAI speech-to-text plus ElevenLabs TTS/STT; and a web UI localized in 14+ languages for a truly global audience.",
    videoSrc: "/videos-features/placeholder-deploy.mp4",
    icon: <Share2 className="w-6 h-6" />,
    reverse: false,
  },
];

export function FeaturesShowcase() {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            <span className="animate-pulse-glow-light">ChatRAG</span> in action
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From uploading documents to deploying your AI chatbot, everything happens in minutes, not months.
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-32">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 lg:gap-16 items-center`}
            >
              {/* Video */}
              <div className="flex-1 w-full max-w-md">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                    style={{ aspectRatio: "1100 / 1080" }}
                  >
                    <source src={feature.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 w-full space-y-6">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-icon-border flex-shrink-0">
                    <div className="gradient-icon">{feature.icon}</div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
