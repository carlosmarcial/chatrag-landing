"use client";

import { Upload, MessageSquare, Settings, Share2 } from "lucide-react";

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
    description: "Your chatbot understands context and delivers accurate answers from your uploaded knowledge base. Powered by OpenAI and OpenRouter, it provides human-like responses that keep your users engaged and satisfied.",
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
    title: "Deploy Anywhere",
    description: "Share your chatbot with a single link or embed it on any website. Your AI assistant works seamlessly across desktop and mobile, providing consistent experiences for all your users.",
    videoSrc: "/videos-features/placeholder-deploy.mp4",
    icon: <Share2 className="w-6 h-6" />,
    reverse: true,
  },
];

export function FeaturesShowcase() {
  return (
    <section className="pt-8 pb-12 md:pt-12 md:pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            See <span className="animate-pulse-glow-light">ChatRAG</span> in action
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From uploading documents to deploying your AI chatbot—everything happens in minutes, not months.
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
                  <h3 className="text-3xl lg:text-4xl font-bold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
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
