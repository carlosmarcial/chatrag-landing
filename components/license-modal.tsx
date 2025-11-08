"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LicenseModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
          License
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">ChatRAG Commercial License</DialogTitle>
          <DialogDescription>
            Version 1.0, January 2025
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(85vh-120px)] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <p className="font-semibold mb-2">Copyright (c) 2025 ChatRAG</p>
              <p className="text-muted-foreground mb-4">TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION</p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">1. DEFINITIONS</h3>
              <div className="space-y-2 text-muted-foreground">
                <p><strong className="text-foreground">&quot;License&quot;</strong> shall mean the terms and conditions for use, reproduction, and distribution as defined by this document.</p>
                <p><strong className="text-foreground">&quot;Licensor&quot;</strong> shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.</p>
                <p><strong className="text-foreground">&quot;You&quot;</strong> (or &quot;Your&quot;) shall mean an individual or Legal Entity exercising permissions granted by this License.</p>
                <p><strong className="text-foreground">&quot;Source&quot;</strong> form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.</p>
                <p><strong className="text-foreground">&quot;Work&quot;</strong> shall mean the ChatRAG software and associated documentation files covered by this License.</p>
                <p><strong className="text-foreground">&quot;Derivative Work&quot;</strong> shall mean any work that is based on or derived from the Work.</p>
                <p><strong className="text-foreground">&quot;Commercial Use&quot;</strong> shall mean use of the Work for commercial advantage or monetary compensation.</p>
                <p><strong className="text-foreground">&quot;Boilerplate Product&quot;</strong> shall mean any starter kit, template, boilerplate, scaffold, or similar product intended for use by developers as a foundation for building applications.</p>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">2. GRANT OF RIGHTS</h3>
              <p className="text-muted-foreground mb-2">Subject to the terms and conditions of this License, Licensor hereby grants You a worldwide, non-exclusive, non-transferable license to:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Use the Work to build and deploy chatbot applications for yourself or your organization</li>
                <li>Use the Work to build and deploy chatbot applications for your clients</li>
                <li>Modify the Work for your own use or for your clients&apos; use</li>
                <li>Use the Work for Commercial Use within deployed applications</li>
                <li>Create Derivative Works for internal use or client deployments</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">3. RESTRICTIONS</h3>
              <p className="text-muted-foreground mb-2">You may NOT:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Sell, resell, license, sublicense, distribute, or otherwise transfer the Work or Derivative Works as a Boilerplate Product, UNLESS the Derivative Work is substantially modified as defined in Section 3.1 below</li>
                <li>Use the Work to create competing boilerplate products, templates, or starter kits that are substantially similar to ChatRAG</li>
                <li>Redistribute the Work or Derivative Works in a manner that enables others to use it as a development foundation without substantial modification</li>
                <li>Remove or alter any proprietary notices or labels on the Work</li>
                <li>Use the Work to compete with ChatRAG by offering it as a service or product to other developers in substantially the same form</li>
              </ul>

              <h4 className="font-bold text-base mt-4 mb-3">3.1 SUBSTANTIAL MODIFICATION EXCEPTION</h4>
              <p className="text-muted-foreground mb-2">You MAY sell or distribute a Derivative Work as a boilerplate product if it meets ALL of the following criteria:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4 mb-3">
                <li>The Derivative Work adds significant new functionality, features, or capabilities that were not present in the original Work</li>
                <li>The Derivative Work is architecturally or functionally distinct from ChatRAG in a way that demonstrates substantial creative effort and value addition</li>
                <li>The Derivative Work is not marketed or positioned primarily as &quot;ChatRAG&quot; or a fork/clone of ChatRAG</li>
                <li>The Derivative Work serves a materially different use case or target market than ChatRAG</li>
                <li>The core value proposition of the Derivative Work differs substantially from that of ChatRAG</li>
              </ul>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="font-semibold text-foreground">Examples of substantial modifications that would qualify:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Adding industry-specific features (e.g., medical compliance, legal case management)</li>
                  <li>Integrating with different core technologies (e.g., different AI frameworks, databases)</li>
                  <li>Creating a specialized vertical solution (e.g., e-commerce chatbot platform, education platform)</li>
                  <li>Significant architectural changes that transform the fundamental approach</li>
                </ul>

                <p className="font-semibold text-foreground mt-3">Examples that would NOT qualify as substantial modification:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Simply rebranding ChatRAG with a different name/logo</li>
                  <li>Minor UI changes or styling updates</li>
                  <li>Adding 1-2 small features while keeping the core unchanged</li>
                  <li>Translating to a different programming language without adding significant new value</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">4. PERMITTED COMMERCIAL USE</h3>
              <p className="text-muted-foreground mb-2">You MAY:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Charge end-users for access to applications built with the Work</li>
                <li>Sell chatbot services built using the Work</li>
                <li>Offer consulting services for implementing the Work</li>
                <li>Deploy unlimited instances of the Work for commercial purposes</li>
                <li>White-label applications built with the Work for your clients</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">5. ATTRIBUTION</h3>
              <p className="text-muted-foreground">You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works.</p>
              <p className="text-muted-foreground mt-2">If the Work includes a &quot;NOTICE&quot; text file, any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file.</p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">6. NO TRADEMARK LICENSE</h3>
              <p className="text-muted-foreground">This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work.</p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">7. DISCLAIMER OF WARRANTY</h3>
              <p className="text-muted-foreground">THE WORK IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE WORK OR THE USE OR OTHER DEALINGS IN THE WORK.</p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">8. LIMITATION OF LIABILITY</h3>
              <p className="text-muted-foreground">IN NO EVENT AND UNDER NO LEGAL THEORY, WHETHER IN TORT (INCLUDING NEGLIGENCE), CONTRACT, OR OTHERWISE, SHALL THE LICENSOR BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER ARISING AS A RESULT OF THIS LICENSE OR OUT OF THE USE OR INABILITY TO USE THE WORK.</p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">9. TERMINATION</h3>
              <p className="text-muted-foreground">This License and the rights granted hereunder will terminate automatically upon any breach by You of the terms of this License. Upon termination, You shall cease all use of the Work and destroy all copies.</p>
            </section>

            <section>
              <h3 className="font-bold text-base mb-3">10. GENERAL</h3>
              <p className="text-muted-foreground mb-2">If any provision of this License is invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the remainder of the terms of this License.</p>
              <p className="text-muted-foreground">This License constitutes the entire agreement between the parties with respect to the Work licensed here.</p>
            </section>

            <section className="border-t pt-4">
              <p className="text-sm text-muted-foreground italic">For inquiries about this license or commercial licensing options, please contact: <a href="mailto:hello@chatrag.ai" className="text-primary hover:underline">hello@chatrag.ai</a></p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
