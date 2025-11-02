import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brain, Info, CheckCircle2, Zap, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "RAG System - ChatRAG Documentation",
  description: "Understanding ChatRAG's high-performance RAG system with HNSW vector search",
};

export default function RAGSystemPage() {
  return (
    <div className="mx-auto w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">RAG System</h1>
        <p className="text-xl text-muted-foreground">
          ChatRAG's Retrieval-Augmented Generation system provides document-based AI responses with HNSW-optimized vector search.
        </p>
      </div>

      <Alert>
        <Zap className="h-4 w-4" />
        <AlertTitle>15-28x Faster Performance</AlertTitle>
        <AlertDescription>
          ChatRAG uses HNSW (Hierarchical Navigable Small World) vector indexes for semantic search,
          providing 15-28x faster performance compared to traditional IVFFlat indexes.
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* How RAG Works */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">How RAG Works</h2>
          <p className="text-muted-foreground mb-4">
            Retrieval-Augmented Generation combines the power of large language models with your specific document knowledge.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold mr-3 flex-shrink-0">1</span>
                <h3 className="font-semibold">Document Upload</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                Upload documents (PDF, DOCX, TXT, etc.) through the interface
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm font-bold mr-3 flex-shrink-0">2</span>
                <h3 className="font-semibold">Processing & Chunking</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                LlamaCloud parses and intelligently chunks documents into semantic segments
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white text-sm font-bold mr-3 flex-shrink-0">3</span>
                <h3 className="font-semibold">Embedding Generation</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                OpenAI generates 1536-dimensional vector embeddings for each chunk
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm font-bold mr-3 flex-shrink-0">4</span>
                <h3 className="font-semibold">Vector Storage</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                Embeddings stored in Supabase with HNSW indexes for fast retrieval
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm font-bold mr-3 flex-shrink-0">5</span>
                <h3 className="font-semibold">Query & Retrieval</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                User queries converted to vectors and matched against stored embeddings
              </p>
            </div>

            <div className="border-l-4 border-primary pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-sm font-bold mr-3 flex-shrink-0">6</span>
                <h3 className="font-semibold">Context Injection</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                Relevant chunks injected into <code className="bg-muted px-1 py-0.5 rounded">{`{{context}}`}</code> placeholder
              </p>
            </div>

            <div className="border-l-4 border-gray-500 pl-4 py-2">
              <div className="flex items-start mb-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-500 text-white text-sm font-bold mr-3 flex-shrink-0">7</span>
                <h3 className="font-semibold">AI Response</h3>
              </div>
              <p className="text-sm text-muted-foreground ml-9">
                LLM generates response based on retrieved context and system prompt
              </p>
            </div>
          </div>
        </section>

        {/* HNSW Vector Search */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">HNSW Vector Search</h2>
          <p className="text-muted-foreground mb-4">
            ChatRAG uses state-of-the-art HNSW indexing for lightning-fast semantic search.
          </p>

          <div className="bg-muted p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-lg">Performance Comparison</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Metric</th>
                    <th className="text-left py-2 px-3">Traditional RAG (IVFFlat)</th>
                    <th className="text-left py-2 px-3">ChatRAG (HNSW)</th>
                    <th className="text-left py-2 px-3">Improvement</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">Single Query</td>
                    <td className="py-2 px-3">100-500ms</td>
                    <td className="py-2 px-3 font-bold text-green-600">&lt;50ms</td>
                    <td className="py-2 px-3">15-28x faster</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">10 Concurrent Users</td>
                    <td className="py-2 px-3">800-2000ms</td>
                    <td className="py-2 px-3 font-bold text-green-600">&lt;100ms</td>
                    <td className="py-2 px-3">20x faster</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3 font-medium">100k Documents</td>
                    <td className="py-2 px-3">1-3 seconds</td>
                    <td className="py-2 px-3 font-bold text-green-600">&lt;200ms</td>
                    <td className="py-2 px-3">15x faster</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Accuracy</td>
                    <td className="py-2 px-3">95%</td>
                    <td className="py-2 px-3 font-bold text-green-600">98%</td>
                    <td className="py-2 px-3">+3%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Alert className="mt-4">
              <TrendingUp className="h-4 w-4" />
              <AlertTitle>Index Parameters</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 text-xs mt-2">
                  <li><strong>m=64:</strong> Number of connections per layer</li>
                  <li><strong>ef_construction=200:</strong> Size of dynamic candidate list</li>
                  <li><strong>Dimensions:</strong> 1536 (OpenAI text-embedding-3-small)</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* RAG Configuration */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">RAG Configuration</h2>
          <p className="text-muted-foreground mb-4">
            ChatRAG provides 60+ configuration settings to fine-tune RAG performance.
          </p>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Essential Settings</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`# System prompt MUST include {{context}}
RAG_SYSTEM_PROMPT=You are an AI assistant.

Context:
{{context}}

Answer based on the context above...

# Performance settings
RAG_ADAPTIVE_RETRIEVAL=true
RAG_MULTI_PASS=true
RAG_FINAL_RESULT_COUNT=25`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Retrieval Parameters</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`RAG_INITIAL_MATCH_COUNT=60
RAG_SIMILARITY_THRESHOLD=0.45
RAG_MIN_CONFIDENCE=0.7
RAG_ADJACENT_CHUNKS=true
RAG_ADJACENCY_WINDOW=2`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Advanced Features</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`RAG_QUERY_ENHANCEMENT=false
RAG_RERANKING=true
RAG_RERANKING_STRATEGY=hybrid
RAG_MMR_LAMBDA=0.85
RAG_DIVERSITY_WEIGHT=0.15
RAG_CACHE_ENABLED=true`}</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Performance Modes</h3>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>{`RAG_PERFORMANCE_MODE=accurate  # or "fast" or "balanced"
RAG_MAX_RETRIEVAL_PASSES=2
RAG_COMPLETENESS_CONFIDENCE=0.7`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Supported Document Types */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Supported Document Types</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="border rounded-lg p-3 text-center">
              <p className="font-semibold">PDF</p>
              <p className="text-xs text-muted-foreground">Portable Document Format</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <p className="font-semibold">DOCX</p>
              <p className="text-xs text-muted-foreground">Microsoft Word</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <p className="font-semibold">TXT</p>
              <p className="text-xs text-muted-foreground">Plain Text</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <p className="font-semibold">HTML</p>
              <p className="text-xs text-muted-foreground">Web Pages</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <p className="font-semibold">RTF</p>
              <p className="text-xs text-muted-foreground">Rich Text Format</p>
            </div>
            <div className="border rounded-lg p-3 text-center">
              <p className="font-semibold">EPUB</p>
              <p className="text-xs text-muted-foreground">E-books</p>
            </div>
          </div>
        </section>

        {/* RAG Testing */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Testing & Diagnostics</h2>
          <p className="text-muted-foreground mb-4">
            ChatRAG includes diagnostic scripts to verify and troubleshoot your RAG system.
          </p>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Check RAG Flow</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Verify the complete RAG pipeline is working correctly
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>node scripts/rag/check-rag-flow.js</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Decode RAG Prompt</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Inspect what's stored in your system prompt configuration
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>node scripts/rag/decode-rag-prompt.js</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Test RAG System</h3>
              <p className="text-sm text-muted-foreground mb-2">
                End-to-end testing of document retrieval
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>node scripts/rag/test-rag-system.js</code>
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Reprocess Documents</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Rebuild document index with updated settings
              </p>
              <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
                <code>node scripts/rag/reprocess-documents.js</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Key RAG Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Adaptive Retrieval
              </h3>
              <p className="text-sm text-muted-foreground">
                Intelligent retrieval strategy that adjusts based on query complexity
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Multi-Pass Search
              </h3>
              <p className="text-sm text-muted-foreground">
                Multiple retrieval passes for better coverage and accuracy
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Adjacent Chunks
              </h3>
              <p className="text-sm text-muted-foreground">
                Retrieves surrounding context for better continuity
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Semantic Chunking
              </h3>
              <p className="text-sm text-muted-foreground">
                Intelligent document splitting based on semantic boundaries
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Hybrid Reranking
              </h3>
              <p className="text-sm text-muted-foreground">
                Combines multiple scoring methods for optimal results
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Result Caching
              </h3>
              <p className="text-sm text-muted-foreground">
                Smart caching for improved performance on repeated queries
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Best Practices</h2>
          <div className="space-y-3 text-muted-foreground">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Always Include {'{{context}}'}</p>
                <p className="text-sm">This placeholder is required in your system prompt for RAG to function</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Use text-embedding-3-small</p>
                <p className="text-sm">This embedding model offers the best balance of speed, cost, and accuracy</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Start with Default Settings</p>
                <p className="text-sm">The default RAG configuration is optimized for most use cases</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Monitor Chunk Sizes</p>
                <p className="text-sm">Default 2500 characters with 992 overlap works well for most documents</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Test After Changes</p>
                <p className="text-sm">Always verify RAG is working after modifying configuration</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">RAG Architecture Components</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <ul className="list-disc list-inside space-y-1 text-sm mt-2">
            <li><strong>Enhanced RAG Retrieval:</strong> Multi-stage document search (13KB)</li>
            <li><strong>Adaptive Retrieval:</strong> Intelligent strategy selection (25KB)</li>
            <li><strong>Optimized Search:</strong> HNSW vector search (11KB)</li>
            <li><strong>Semantic Chunker:</strong> Smart document splitting (18KB)</li>
            <li><strong>Query Enhancer:</strong> Query optimization (11KB)</li>
            <li><strong>Reranker:</strong> Result scoring and ranking (13KB)</li>
            <li><strong>MMR Scorer:</strong> Maximal Marginal Relevance (6KB)</li>
            <li><strong>BM25 Scorer:</strong> Traditional keyword matching (5KB)</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Navigation */}
      <div className="border-t pt-6 mt-8">
        <div className="flex justify-between">
          <a href="/docs/system-prompt" className="text-primary hover:underline flex items-center">
            ← Previous: System Prompt
          </a>
          <a href="/docs/document-processing" className="text-primary hover:underline flex items-center">
            Next: Document Processing →
          </a>
        </div>
      </div>
    </div>
  );
}
