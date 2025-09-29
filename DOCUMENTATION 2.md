# ChatRAG Documentation

> **For Developers:** This guide gets you from repository access to a fully working ChatRAG instance. Watch the companion videos for visual walkthroughs, then use this guide for reference and troubleshooting.

## Prerequisites

Before starting, ensure you have:

- **Node.js 18+** and npm installed
- **Git** for repository access
- **API Keys** ready (we'll configure these during setup):
  - Supabase account (free tier works)
  - OpenAI API key (required for embeddings)
  - OpenRouter API key (for 100+ AI models)
  - LlamaCloud API key (for document processing)

## Quick Start

```bash
# 1) Clone your private repository
#    Use the private URL you received after purchase
#    (Replace <YOUR_PRIVATE_REPO_URL> below)

git clone <YOUR_PRIVATE_REPO_URL>
cd chatrag

# 2) Install dependencies
npm install

# 3) Start the app (creates .env.local on first run with a complete baseline template)
#    Keep this running at http://localhost:3000
npm run dev

# 4) In a second terminal, start the Config UI
#    Open http://localhost:3333 to configure keys and features
npm run config

# 5) In the Config UI, add Supabase URL/keys, OpenAI, OpenRouter, and LlamaCloud.
#    Click Save, then restart the dev server to pick up changes:
#    (Ctrl+C in the dev terminal, then run `npm run dev` again)
```

Note: When .env.local is auto-created, it includes a complete baseline template of supported settings. You will still need to provide your own credentials (Supabase keys, OpenAI, OpenRouter, LlamaCloud, etc.). The fastest way is to open the Config UI and fill them visually; your entries are written back to .env.local.

## Database Setup (Supabase)

ChatRAG requires a properly configured Supabase database with vector search capabilities. This section is crucial for a working installation.

### 1. Create Supabase Project

1. Visit [supabase.com](https://supabase.com) and create a new project
2. Choose a region close to your users
3. Wait for the project to initialize (~2 minutes)

### 2. Configure Database Schema

ChatRAG includes a complete database setup file that creates all required tables, indexes, and security policies.

1. **Open SQL Editor** in your Supabase dashboard
2. **Copy the entire contents** of `supabase/complete_setup.sql` from your repository
3. **Paste and execute** the SQL in the editor

Note: Run this once per project. The script enables pgvector, creates HNSW indexes, tables, storage buckets, functions, and RLS policies.

Cloud vs self‑hosted:
- ChatRAG is optimized for Supabase Cloud (managed service), which is the easiest path and recommended.
- Supabase is open-source and can run self-hosted (VPS/private/on‑prem). Ensure your Postgres has the pgvector extension with HNSW support available, then execute the same complete_setup.sql in your instance.
- Storage buckets and RLS policies are included in the script; confirm your self-hosted environment supports these features.

This creates:
- **14 production tables** with Row Level Security (RLS)
- **HNSW vector indexes** (15-28x faster than traditional RAG)
- **Storage buckets** for images, videos, and 3D models
- **Database functions** for semantic search
- **Security policies** for multi-tenant isolation

### 3. Get Supabase Credentials

From your Supabase project settings:

```bash
# Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Project Settings → API → Service Role (keep this secret)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 4. Verify Database Setup

Test your database connection:

```bash
# After adding Supabase credentials to config
npm run dev

# Check browser console for any database errors
# Verify at http://localhost:3000 - you should see the chat interface
```

## Document Processing & Management

Once your database and credentials are set, you can add documents that power RAG. ChatRAG supports two easy ways to manage documents:

1) In-App Document Dashboard (recommended for end users)
- Where: Main app at http://localhost:3000
- Toggle visibility with NEXT_PUBLIC_HIDE_DOCUMENT_DASHBOARD=false
- To allow users to upload/manage files, set NEXT_PUBLIC_READ_ONLY_DOCUMENTS_ENABLED=false
- Users must be authenticated via Supabase Auth and will only see their own content (enforced by RLS)

2) Visual Config UI → Document Processing (admin workflows)
- Where: http://localhost:3333 (npm run config)
- Purpose: Admin-oriented upload, reprocessing, status, and configuration controls
- Requires SUPABASE_SERVICE_ROLE_KEY set in .env.local (server-only secret) to perform admin operations

Supported formats
- PDF, DOCX, TXT, HTML, RTF, EPUB

What happens on upload
- LlamaCloud parses/extracts content and intelligently chunks it
- OpenAI generates 1536‑dimensional embeddings for each chunk
- Chunks are inserted into the document_chunks table with HNSW vector index for fast search

Admin accounts (for Config UI and document administration)
- Open Config UI → Admin
- Add Admin: Enter the user’s email
- The email must match an existing Supabase user (sign up in the main app first or create via Supabase Auth Admin)
- Requires SUPABASE_SERVICE_ROLE_KEY in .env.local

Tips
- For user uploads, keep NEXT_PUBLIC_READ_ONLY_DOCUMENTS_ENABLED=false
- For strictly admin‑managed datasets, set NEXT_PUBLIC_READ_ONLY_DOCUMENTS_ENABLED=true
- Storage buckets and RLS policies are created by supabase/complete_setup.sql and isolate user data by default

Verification
- Upload a sample PDF
- Ask the chatbot about a unique sentence in that PDF
- The response should reference the uploaded content; if not, confirm your System Prompt contains {{context}}

## System Prompt Configuration

The system prompt controls how the AI uses your documents. Configure it in the visual dashboard; this section proxies to the app at http://localhost:3000, so keep the app running while editing.

Prompt structure
- Pre‑Context: Global instructions, tone, guardrails, format guidelines
- Context: Injected automatically at runtime into {{context}} with retrieved document chunks
- Post‑Context: Follow‑up rules (e.g., cite documents, refuse out‑of‑scope queries, format answers)

Critical requirement
- Your prompt must include {{context}} exactly. Without it, RAG will not work.

Templates (all include Context: {{context}})
- helpful, professional, educational, technical
- chatragSales, customerSupport, researchAssistant
- codeAssistant, legalAnalyst, medicalInformation
- whatsappConversational (optimized for WhatsApp: concise, conversational, low‑latency)

Best practices
- Keep Pre‑Context concise and explicit about how to use the Context
- In Post‑Context, instruct how to cite or reference documents and how to respond when the answer is not found
- If using WhatsApp, start with the whatsappConversational template and keep responses brief

Saving & applying
- Click Save in the System Prompt section
- Restart the dev server to guarantee the latest .env.local is loaded (Ctrl+C, then npm run dev)

Troubleshooting
- If documents are found but not used, verify {{context}} is present and unencoded
- Use scripts/rag/decode-rag-prompt.js to check what’s stored in .env.local

## Essential API Keys

Configure these API keys through the visual config UI at `http://localhost:3333`:

### OpenAI (Required)
```bash
# Required for document embeddings and reasoning models
OPENAI_API_KEY=your-openai-api-key

# Recommended embedding model for best performance
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

### OpenRouter (Recommended)
```bash
# Access to 100+ AI models from multiple providers
OPENROUTER_API_KEY=your-openrouter-api-key
```

### LlamaCloud (Required for Document Processing)
```bash
# Required for PDF/DOCX processing and RAG functionality
# Get from https://cloud.llamaindex.ai
NEXT_PUBLIC_LLAMA_CLOUD_API_KEY=your-llamacloud-api-key
```

### Minimum required to run (local)

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (server-only secret; never expose in the browser)
- OPENAI_API_KEY (required for embeddings)
- One chat model provider: either OPENROUTER_API_KEY (recommended) or direct OpenAI models

Notes:
- Values are stored in .env.local by the Config UI and read by Next.js on startup.
- Variables prefixed with NEXT_PUBLIC_ are exposed to the browser; all others remain server-side.

## Configuration UI Guide

The visual configuration UI (`npm run config`) provides a web interface for all settings:

### 1. Access the Config UI

Important: For the RAG System Prompt editor to work, keep the app running in another terminal (the Config UI proxies to http://localhost:3000).

```bash
npm run config
# Opens http://localhost:3333
```

### 2. Essential Configuration Sections

**API Keys Tab:**
- Add your Supabase, OpenAI, OpenRouter, and LlamaCloud credentials
- Keys are automatically validated when saved

**Features Tab:**
- Enable/disable RAG, image generation, video generation
- Configure WhatsApp integration
- Toggle MCP tools

**Branding Tab:**
- Customize app name, logo, and colors
- Set welcome messages and UI preferences

**RAG System Prompt:**
- **Critical:** Must include `{{context}}` placeholder
- Pre-configured templates available
- Test different prompts for your use case

**Admin Access (optional but recommended):**
- Add at least one admin user in the Admin section of the Config UI
- The email must match an existing Supabase user; sign up via the main app if needed
- Requires SUPABASE_SERVICE_ROLE_KEY to be set

### 3. Save and Restart

After configuration:
1. Click "Save Settings" in the config UI
2. Restart your development server: `Ctrl+C` then `npm run dev`

## Essential Features Configuration

### RAG (Retrieval-Augmented Generation)

ChatRAG's RAG system provides document-based AI responses with HNSW-optimized vector search.

**Required Settings:**
```bash
# System prompt MUST include {{context}} placeholder
RAG_SYSTEM_PROMPT=You are an AI assistant.

Context:
{{context}}

Answer based on the context above...
```

**Performance Settings (defaults are optimized):**
```bash
RAG_ADAPTIVE_RETRIEVAL=true    # Intelligent retrieval strategy
RAG_MULTI_PASS=true           # Multi-stage document search
RAG_FINAL_RESULT_COUNT=25     # Number of chunks to retrieve
```

### AI Models

ChatRAG supports multiple providers:

**OpenRouter (Recommended):**
- 100+ models from OpenAI, Anthropic, Google, Meta
- Competitive pricing and unified API
- Reasoning models: o1, o3, Claude 3.7+, DeepSeek R1

**Direct Provider APIs:**
- OpenAI: GPT-4, GPT-3.5, DALL-E
- Anthropic: Claude 3.5 Sonnet, Claude 3.5 Haiku
- Google: Gemini Pro, Gemini Flash

### Document Processing

Upload and process documents for RAG:

**Supported Formats:**
- PDF, DOCX, TXT, HTML, RTF, EPUB

**Processing Pipeline:**
1. Upload via web interface
2. LlamaCloud extracts and chunks content
3. OpenAI generates embeddings
4. Stored with HNSW vector index for fast search

## Verification

Test your ChatRAG installation:

### 1. Basic Chat Functionality
- Visit `http://localhost:3000`
- Send a test message
- Verify AI response appears

### 2. Document Upload (RAG)
- Upload a test document (PDF/DOCX)
- Wait for processing completion
- Ask questions about the document content
- Verify AI references the uploaded information

### 3. Configuration Persistence
- Restart the server: `Ctrl+C` then `npm run dev`
- Verify settings persist after restart
- Check `.env.local` file contains your API keys

## Troubleshooting

### Common Issues

**"RAG not using documents":**
- Ensure `{{context}}` exists in RAG_SYSTEM_PROMPT
- Check document processing completed successfully
- Verify OpenAI embedding model is configured

**"Database connection failed":**
- Verify Supabase credentials are correct
- Ensure `complete_setup.sql` was executed successfully
- Check Supabase project is not paused

**"API key invalid":**
- Verify API keys are correctly formatted
- Check for extra spaces or missing characters
- Ensure keys have necessary permissions

**"Configuration not saving":**
- Check Supabase service role key is set
- Verify admin_settings table exists in database
- Restart server after configuration changes

### Debug Commands

```bash
# Check environment variables
cat .env.local

# Test database connection
npm run dev
# Check browser console for database errors

# Verify RAG system prompt
node -e "console.log(process.env.RAG_SYSTEM_PROMPT)"
```

## Advanced Configuration

### Media Generation (Images, Video, 3D)

- Enable features in Config UI → Features
  - NEXT_PUBLIC_IMAGE_GENERATION_ENABLED=true
  - NEXT_PUBLIC_VIDEO_GENERATION_ENABLED=true
  - NEXT_PUBLIC_3D_GENERATION_ENABLED=true
- Providers and keys
  - Images: IMAGE_GENERATION_PROVIDER=openai|fal|replicate (default fal); requires OPENAI_API_KEY or FAL_API_KEY or REPLICATE_API_TOKEN
  - Video: Default Fal.ai; set USE_REPLICATE_PROVIDER=true to switch to Replicate
  - 3D: Default Fal.ai Trellis; USE_REPLICATE_PROVIDER=true for Replicate fallback
- Models (env)
  - OPENAI_IMAGE_MODEL=gpt-image-1
  - FAL_IMAGE_MODEL, FAL_IMAGE_TO_IMAGE_MODEL
  - FAL_VIDEO_TEXT_MODEL, FAL_VIDEO_IMAGE_MODEL (+ fast variants)
  - FAL_3D_MODEL (default fal-ai/trellis) or REPLICATE_3D_MODEL
- Storage
  - Generated media stored in Supabase buckets: chat-images, chat-videos, 3d-models

### Authentication

- Toggle: NEXT_PUBLIC_AUTH_ENABLED=true
- Site URL: NEXT_PUBLIC_SITE_URL=http://localhost:3000 (dev) and production URL on deploy
- Providers
  - Supabase Auth supports email/password, magic links, GitHub OAuth, etc.
  - For GitHub: set NEXT_PUBLIC_GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET (and configure in Supabase Auth → Providers)
- Admin access
  - In Config UI → Admin, add admin emails (must be existing Supabase users)

### Branding & UI

- App identity
  - NEXT_PUBLIC_APP_NAME, NEXT_PUBLIC_SITE_TITLE, NEXT_PUBLIC_FAVICON_URL
- Header logo
  - NEXT_PUBLIC_HEADER_LOGO_TYPE=text|image
  - NEXT_PUBLIC_HEADER_LOGO_TEXT or NEXT_PUBLIC_HEADER_LOGO_URL
- AI reply avatar
  - NEXT_PUBLIC_AI_RESPONSE_LOGO_URL, NEXT_PUBLIC_AI_RESPONSE_LOGO_BORDER, NEXT_PUBLIC_AI_RESPONSE_LOGO_SIZE
- Welcome copy
  - NEXT_PUBLIC_WELCOME_TEXT, NEXT_PUBLIC_WELCOME_TEXT_MODE, NEXT_PUBLIC_WELCOME_TEXT_GRADIENT
  - NEXT_PUBLIC_WELCOME_MESSAGES (array) and translations
- UI tweaks
  - NEXT_PUBLIC_CHAT_INPUT_TEXT_SIZE

### Suggestions

- Toggle: NEXT_PUBLIC_SHOW_SUGGESTIONS=true
- Configure: NEXT_PUBLIC_SUGGESTION_GROUPS=[...] (JSON)
- Tip: Use the Suggestion helpers in the Config UI to quickly generate on-brand prompts per group.

### Language & Localization

- Users can change the chatbot language in User Settings (in-app); UI strings and tone adapt accordingly.
- Built-in languages include English, Spanish, Portuguese, French, German, Italian, Dutch, Japanese, Korean, Chinese, Hindi, Arabic, Russian. You can extend the list.
- To add a new language via your AI assistant (Claude Code or Cursor), prompt example:

```text
Add support for language: Turkish (tr-TR). Steps:
- Update language options in the Config UI and any locale constants
- Provide translations for welcome text, suggestions, labels
- Ensure direction and fonts render correctly if needed
- Verify date/number formats
```

- Advanced: Use the translation tools in Config UI (System Prompts → Translate) to prefill localized prompts.

### Embed Widget

- Toggle: NEXT_PUBLIC_EMBED_ENABLED=true
- Basic settings
  - NEXT_PUBLIC_EMBED_TITLE, NEXT_PUBLIC_EMBED_PRIMARY_COLOR, NEXT_PUBLIC_EMBED_POSITION (bottom-right, etc.)
  - NEXT_PUBLIC_EMBED_AUTO_OPEN, NEXT_PUBLIC_EMBED_GREETING
  - NEXT_PUBLIC_EMBED_ALLOWED_DOMAINS='*' or a comma-separated allowlist
- Auth
  - EMBED_REQUIRE_AUTH=false|true to require signed users for embedded chat

### Audio (TTS/STT)

- Provider selection: NEXT_PUBLIC_VOICE_PROVIDER=openai|elevenlabs
- Text-to-Speech
  - OpenAI requires OPENAI_API_KEY; model tts-1 is used by default
  - ElevenLabs: ELEVENLABS_API_KEY plus optional voice parameters (ELEVENLABS_VOICE_ID, ELEVENLABS_MODEL_ID, etc.)
- Speech-to-Text
  - OpenAI Whisper (OPENAI_API_KEY) or ElevenLabs (if configured)
- UX
  - NEXT_PUBLIC_TTS_DISABLED, NEXT_PUBLIC_STT_DISABLED, NEXT_PUBLIC_AUDIO_AUTOPLAY

### Email

- Default: RESEND_API_KEY for transactional emails
- Optional custom SMTP
  - NEXT_PUBLIC_CUSTOM_SMTP_ENABLED=true
  - NEXT_PUBLIC_SMTP_FROM_NAME, NEXT_PUBLIC_SMTP_FROM_EMAIL
- Ensure domain/DNS is configured with your email provider

### WhatsApp

- Toggle: NEXT_PUBLIC_WHATSAPP_ENABLED=true
- Provider selection: WHATSAPP_PROVIDER=koyeb|flyio
- Provider endpoints/keys: KOYEB_BAILEYS_URL / FLYIO_BAILEYS_URL (+ optional API keys)
- Webhook: WHATSAPP_WEBHOOK_URL and WHATSAPP_WEBHOOK_SECRET
- AI settings: WHATSAPP_DEFAULT_MODEL, WHATSAPP_MAX_TOKENS
- Extras: WHATSAPP_ENABLE_MCP=true to allow MCP tools in WhatsApp; WHATSAPP_ENABLE_WEB_SEARCH=true for web search
- Flow: Start connection → scan QR → send/receive messages → manage via API endpoints (/api/whatsapp/*)

### MCP (Model Context Protocol)

- Toggle: NEXT_PUBLIC_MCP_SYSTEM_ENABLED=true (plus NEXT_PUBLIC_MCP_TOOLS_LIST_ENABLED to show tools list)
- Built-in server: Zapier MCP
  - Configure in Config UI → MCP → Zapier
  - Set MCP_ZAPIER_ENDPOINT to your Zapier MCP endpoint URL
  - Optional: NEXT_PUBLIC_MCP_YOLO_MODE_ENABLED=true to auto-approve tools (use carefully)
- Custom servers
  - Add via Config UI → MCP → Add Server (HTTP/SSE; supports Bearer/API key/Basic auth)
  - Enable per-surface (Chat/Embed)
  - Discover Tools button to enumerate available tools
- What you can do with Zapier MCP (examples)
  - Gmail: find email, draft reply, send reply
  - Google Calendar: find event
  - Google Drive: upload file
- Approval flow
  - By default, tool calls require approval; YOLO mode auto-approves

### WhatsApp Integration

ChatRAG supports WhatsApp messaging via Baileys with dual provider support:

**Providers:**
- **Koyeb**: Cloud platform with free tier
- **Fly.io**: Edge computing platform

**Setup:**
1. Deploy Baileys instance to chosen provider
2. Configure webhook URL in ChatRAG
3. Connect via QR code scan

### MCP (Model Context Protocol)

Connect external tools and services:

**Supported Integrations:**
- Zapier (Gmail, Calendar, Drive)
- Custom MCP servers
- API tool execution with approval flows

**Configuration:**
```bash
NEXT_PUBLIC_MCP_SYSTEM_ENABLED=true
MCP_ZAPIER_ENDPOINT=your-zapier-mcp-url
```

### Multi-Modal Generation

**Image Generation:**
- DALL-E 3 (OpenAI)
- Flux models (Fal.ai)
- Stable Diffusion (Replicate)

**Video Generation:**
- Runway ML
- Luma AI
- Kling AI

**3D Model Generation:**
- Meshy AI
- Trellis models

## Deployment (Vercel)

Config UI is a local tool for development. For production, set environment variables in your hosting provider (e.g., Vercel) and deploy the Next.js app.

- Create a new Vercel project from your GitHub repository
- In Project Settings → Environment Variables, set at minimum:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY (server-only secret)
  - OPENAI_API_KEY
  - OPENROUTER_API_KEY (or configure direct provider variables)
  - NEXT_PUBLIC_SITE_URL=https://your-domain.com
- Recommended: After configuring locally via the visual Config UI, copy/paste the contents of your finalized .env.local into Vercel’s Environment Variables (Dashboard or Vercel CLI). This mirrors your working dev setup in production.
- Build and deploy (Node 18+; Next.js 15 is supported out of the box on Vercel)
- If using Supabase Auth, update Auth → URL Configuration in Supabase to include your production domain

Notes:
- Do not deploy config-server.js; the Config UI runs locally only. Manage production env vars via the Vercel dashboard or a secure secret manager.
- ChatRAG is tested on Vercel. It should also work on other Next.js-compatible platforms and self-hosting solutions (e.g., Coolify, Docker/PM2 on a VPS), provided environment variables are set and Node 18+ is available.

## Next Steps

1. **Customize Branding:** Update logos, colors, and app name
2. **Configure Models:** Select optimal AI models for your use case
3. **Upload Documents:** Build your knowledge base for RAG
4. **Deploy Production:** Follow deployment guides for Vercel (recommended)
5. **Monitor Usage:** Set up analytics and user management

## Support Resources

- **Configuration UI:** `http://localhost:3333`
- **Main Application:** `http://localhost:3000`
- **GitHub Issues:** Report bugs and feature requests
- **Community Discord:** Connect with other ChatRAG developers

---

> **Pro Tip:** Keep both `npm run config` (port 3333) and `npm run dev` (port 3000) running simultaneously for real-time configuration and testing.