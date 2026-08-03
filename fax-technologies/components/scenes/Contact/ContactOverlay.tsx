"use client";

import { Terminal, Send, CheckCircle2, Power, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useActionState, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

const initialState = { success: false, message: "" };

export function ContactOverlay() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [osShutdown, setOsShutdown] = useState(false);

  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col justify-between px-6 pt-40 pb-20 md:px-12 md:pt-52"
    >
      <div className="container-editorial relative z-10 w-full my-auto space-y-16">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.p variants={fadeIn} className="text-overline mb-4 text-[hsl(192,82%,46%)] font-mono">
            CHAPTER 09 — INTERACTIVE TERMINAL DISPATCH
          </motion.p>
          <motion.h2 variants={revealUp} className="text-editorial text-white">
            Ready to Engineer <br />
            <span className="text-[hsl(192,82%,46%)]">Your Next Product?</span>
          </motion.h2>
          <motion.p variants={revealUp} className="mt-4 text-body-lg text-white/50 font-sans max-w-xl mx-auto">
            Execute the project submission command inside the terminal prompt below.
          </motion.p>
        </motion.div>

        {/* Interactive Terminal Window */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/15 bg-[#0a0c10]/95 p-6 md:p-8 backdrop-blur-2xl font-mono text-xs shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="size-4 text-[hsl(192,82%,46%)]" />
              <span className="font-bold text-white">WARP TERMINAL &gt; create-project</span>
            </div>
            <span className="text-[10px] text-white/40">FABX OS TERMINAL PROMPT</span>
          </div>

          {state.success ? (
            <div className="space-y-4 py-8 text-center">
              <CheckCircle2 className="size-10 text-emerald-400 mx-auto" />
              <div className="text-emerald-400 font-bold text-base">$ Project Received!</div>
              <div className="text-white/60 text-xs">We&apos;ll engineer something amazing. Response within 24 hours.</div>
              <button
                onClick={() => setOsShutdown(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs text-white hover:bg-white/10"
              >
                <Power className="size-3.5 text-rose-400" />
                <span>Shutdown OS Session</span>
              </button>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              <div className="space-y-1 text-white/70">
                <span className="text-emerald-400 font-bold">$ create-project --interactive</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-[10px] text-white/40 uppercase mb-1">
                    [1] Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:border-[hsl(192,82%,46%)] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[10px] text-white/40 uppercase mb-1">
                    [2] Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:border-[hsl(192,82%,46%)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] text-white/40 uppercase mb-1">
                  [3] Project Scope & Business Goals *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Describe your AI agent, enterprise platform, or cloud software scope..."
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:border-[hsl(192,82%,46%)] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white py-3.5 font-display text-xs font-bold text-black hover:bg-white/90 transition-all"
              >
                {isPending ? "Executing Dispatch..." : "Execute Submit Project Command"}
                <Send className="size-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Final OS Shutdown Overlay Modal */}
        <AnimatePresence>
          {osShutdown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] p-6 text-center font-mono"
            >
              <div className="space-y-6 max-w-md">
                <div className="size-3 rounded-full bg-rose-500 mx-auto animate-ping" />
                <div className="text-white font-bold text-lg">FABX OS SHUTDOWN COMPLETE</div>
                <div className="text-xs text-white/40 leading-relaxed">
                  Session ended. Logs archived. Ready to engineer your next product.
                </div>
                <button
                  onClick={() => setOsShutdown(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-xs font-bold text-black hover:bg-white/90"
                >
                  <span>Reboot System (Start a Project)</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
