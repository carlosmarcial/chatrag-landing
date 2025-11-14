import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Info, CheckCircle2, Upload, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Document Processing - ChatRAG Documentation",
  description: "Upload and manage PDF, DOCX, and TXT documents for RAG-powered AI responses. Automatic chunking and vector embedding.",
  alternates: {
    canonical: 'https://www.chatrag.ai/docs/document-processing',
  },
  openGraph: {
    title: 'Document Processing - ChatRAG Documentation',
    description: 'Upload and manage PDF, DOCX, and TXT documents for RAG-powered AI responses. Automatic chunking and vector embedding.',
    url: 'https://www.chatrag.ai/docs/document-processing',
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

export default function DocumentProcessingPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Document Processing</h1>
        <p className="text-xl text-muted-foreground">
          Upload and manage documents that power ChatRAG's retrieval-augmented generation system.
        </p>
      </div>

      <Alert>
        <FileText className="h-4 w-4" />
        <AlertTitle>Two Ways to Manage Documents</AlertTitle>
        <AlertDescription>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li><strong>In-App Dashboard:</strong> For end users at http://localhost:3000</li>
            <li><strong>Config UI:</strong> For admin workflows at http://localhost:3333</li>
          </ol>
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Document Management Methods */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Document Management Methods</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-primary rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Upload className="w-6 h-6 mr-2 text-primary" />
                <h3 className="font-semibold text-lg">In-App Document Dashboard</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Recommended for end users
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Access at http://localhost:3000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>User-friendly upload interface</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Row Level Security (users see only their docs)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Requires authentication</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <p className="text-xs font-semibold mb-1">Configuration:</p>
                <pre className="text-xs overflow-x-auto">
                  <code>{`NEXT_PUBLIC_HIDE_DOCUMENT_DASHBOARD=false
NEXT_PUBLIC_READ_ONLY_DOCUMENTS_ENABLED=false`}</code>
                </pre>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Settings className="w-6 h-6 mr-2 text-blue-500" />
                <h3 className="font-semibold text-lg">Config UI Admin Tools</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                For admin-oriented workflows
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Access at http://localhost:3333</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Bulk operations and reprocessing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Advanced configuration controls</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>Requires SUPABASE_SERVICE_ROLE_KEY</span>
                </li>
              </ul>
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <p className="text-xs font-semibold mb-1">Access via:</p>
                <pre className="text-xs overflow-x-auto">
                  <code>npm run config</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Process */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Document Upload Process</h2>
          <p className="text-muted-foreground mb-4">
            What happens when you upload a document:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold mr-3 flex-shrink-0">1</span>
                <h3 className="font-semibold">File Upload</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                Document uploaded to Supabase Storage with secure access policies
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold mr-3 flex-shrink-0">2</span>
                <h3 className="font-semibold">LlamaCloud Parsing</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                LlamaCloud extracts text, tables, images, and metadata from the document
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-sm font-bold mr-3 flex-shrink-0">3</span>
                <h3 className="font-semibold">Intelligent Chunking</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                Content split into semantic chunks (default: 2500 chars with 992 overlap)
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm font-bold mr-3 flex-shrink-0">4</span>
                <h3 className="font-semibold">Embedding Generation</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                OpenAI generates 1536-dimensional embeddings for each chunk
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm font-bold mr-3 flex-shrink-0">5</span>
                <h3 className="font-semibold">Database Storage</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                Chunks stored in document_chunks table with HNSW vector index
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-bold mr-3 flex-shrink-0">6</span>
                <h3 className="font-semibold">Ready for Retrieval</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                Document immediately available for semantic search and RAG
              </p>
            </div>
          </div>
        </section>

        {/* Supported Formats */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Supported Document Formats</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-center">PDF</h3>
              <p className="text-xs text-center text-muted-foreground mt-1">
                Portable Document Format with OCR support
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-center">DOCX</h3>
              <p className="text-xs text-center text-muted-foreground mt-1">
                Microsoft Word documents
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold text-center">TXT</h3>
              <p className="text-xs text-center text-muted-foreground mt-1">
                Plain text files
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-center">HTML</h3>
              <p className="text-xs text-center text-muted-foreground mt-1">
                Web pages and HTML documents
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-center">RTF</h3>
              <p className="text-xs text-center text-muted-foreground mt-1">
                Rich Text Format
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-center">EPUB</h3>
              <p className="text-xs text-center text-muted-foreground mt-1">
                E-book format
              </p>
            </div>
          </div>
        </section>

        {/* LlamaCloud Configuration */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">LlamaCloud Configuration</h2>
          <p className="text-muted-foreground mb-4">
            Configure document parsing behavior through environment variables:
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Basic Configuration</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`LLAMA_CLOUD_API_KEY=llx-...
LLAMACLOUD_PARSING_MODE=balanced  # or "fast" or "premium"
LLAMACLOUD_CHUNK_STRATEGY=sentence
LLAMACLOUD_CHUNK_SIZE=2500
LLAMACLOUD_CHUNK_OVERLAP=992
LLAMACLOUD_MULTIMODAL_PARSING=true`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Advanced Parsing</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`LLAMACLOUD_PARSE_MODE=parse_page_with_agent
LLAMACLOUD_PARSE_MODEL=anthropic-sonnet-4.0
LLAMACLOUD_HIGH_RES_OCR=true
LLAMACLOUD_ADAPTIVE_LONG_TABLE=true
LLAMACLOUD_OUTLINED_TABLE_EXTRACTION=true
LLAMACLOUD_OUTPUT_TABLES_AS_HTML=true`}</code>
              </pre>
            </div>
          </div>

          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Parsing Modes</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                <li><strong>Fast:</strong> Quick processing, good for simple documents</li>
                <li><strong>Balanced:</strong> Recommended for most use cases</li>
                <li><strong>Premium:</strong> Maximum accuracy, slower processing</li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>

        {/* Admin Features */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Admin Features</h2>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Admin Access Control</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Designate admin users who can manage documents for all users:
              </p>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                <li>Open Config UI → Admin section</li>
                <li>Enter user's email address</li>
                <li>Email must match existing Supabase user</li>
                <li>Requires SUPABASE_SERVICE_ROLE_KEY</li>
              </ol>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Document Reprocessing</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Rebuild document index with updated settings:
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>node scripts/rag/reprocess-documents.js</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-2">
                Useful after changing chunking settings or upgrading embedding models
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Read-Only Mode</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Prevent users from uploading documents (admin-only dataset):
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>NEXT_PUBLIC_READ_ONLY_DOCUMENTS_ENABLED=true</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Verification */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Verification Steps</h2>
          <p className="text-muted-foreground mb-4">
            Verify your document processing is working correctly:
          </p>

          <div className="space-y-3">
            <div className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold mr-3 flex-shrink-0">1</span>
              <div>
                <p className="font-semibold">Upload a Test Document</p>
                <p className="text-sm text-muted-foreground">
                  Choose a PDF or DOCX with known content you can query
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold mr-3 flex-shrink-0">2</span>
              <div>
                <p className="font-semibold">Wait for Processing</p>
                <p className="text-sm text-muted-foreground">
                  Status will change from "Processing" to "Completed"
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold mr-3 flex-shrink-0">3</span>
              <div>
                <p className="font-semibold">Ask About Document Content</p>
                <p className="text-sm text-muted-foreground">
                  Query a specific fact from your uploaded document
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold mr-3 flex-shrink-0">4</span>
              <div>
                <p className="font-semibold">Verify AI Response</p>
                <p className="text-sm text-muted-foreground">
                  AI should reference uploaded content in its response
                </p>
              </div>
            </div>
          </div>

          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              If the AI doesn't use document content, verify your system prompt includes <code className="bg-muted px-1 py-0.5 rounded">{`{{context}}`}</code>
            </AlertDescription>
          </Alert>
        </section>

        {/* Storage & Security */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Storage & Security</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Storage Buckets</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Documents stored in Supabase Storage with automatic bucket creation:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Secure file storage</li>
                <li>• Automatic cleanup on deletion</li>
                <li>• CDN delivery for fast access</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Row Level Security (RLS)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Multi-tenant isolation ensures users only see their documents:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• User-based access control</li>
                <li>• Automatic policy enforcement</li>
                <li>• Admin override capability</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
        <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        <AlertTitle className="text-purple-900 dark:text-purple-100">Document Processing Pipeline</AlertTitle>
        <AlertDescription className="text-purple-800 dark:text-purple-200">
          <p className="text-sm mb-2">ChatRAG's document processing includes:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Document Processor:</strong> LlamaCloud integration (15KB)</li>
            <li><strong>Semantic Chunker:</strong> Intelligent splitting (18KB)</li>
            <li><strong>Upload Utils:</strong> File handling and validation</li>
            <li><strong>Storage Integration:</strong> Supabase Storage with RLS</li>
            <li><strong>Database Tables:</strong> documents, document_chunks with HNSW indexes</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/rag-system" className="text-primary hover:underline flex items-center">
            ← Previous: RAG System
          </a>
          <a href="/docs/ai-models" className="text-primary hover:underline flex items-center">
            Next: AI Models →
          </a>
        </div>
      </div>
    </div>
  );
}
