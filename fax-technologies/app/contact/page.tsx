"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { revealUp } from "@/lib/animation/motion";

const initialState = { success: false, message: "" };

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={revealUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-cyan mb-3">
            Contact FAX Technologies
          </p>
          <h1 className="font-display text-4xl sm:text-7xl font-bold tracking-tight text-white mb-6">
            Let&apos;s Build Software That Ships.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            Have a project in mind? We partner with founders and enterprises to deliver AI systems, custom platforms, and data pipelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8 p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <div>
              <h3 className="font-display text-xl font-semibold mb-2">Direct Contact</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Response time: under 24 hours.
              </p>
            </div>

            <div className="space-y-4 text-sm font-mono">
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="size-4 text-cyan-400" />
                <span>contact@fax.tech</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="size-4 text-cyan-400" />
                <span>Gen AI Club Hub • India</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
                Guaranteed Discipline
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Every project includes BRD documentation, clean SVG system architecture, and milestone-based code delivery.
              </p>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
            {state.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <CheckCircle2 className="size-16 text-emerald-400 mx-auto" />
                <h3 className="font-display text-2xl font-bold">Message Received</h3>
                <p className="text-white/70 max-w-md mx-auto">{state.message}</p>
              </motion.div>
            ) : (
              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs text-white/70 uppercase mb-2">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Surya / Client Name"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-xs text-white/70 uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="client@company.com"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="projectScope" className="block font-mono text-xs text-white/70 uppercase mb-2">
                    Project Scope
                  </label>
                  <select
                    id="projectScope"
                    name="projectScope"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="ai-agent">Autonomous AI Agent / RAG Pipeline</option>
                    <option value="full-stack">Full-Stack Web Application / ERP</option>
                    <option value="dashboard">Custom Analytics Dashboard</option>
                    <option value="audit">Code & Architecture Audit</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-white/70 uppercase mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your timeline, core requirements, and target outcomes..."
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {state.message && !state.success && (
                  <p className="text-xs font-mono text-rose-400">{state.message}</p>
                )}

                <MagneticButton
                  type="submit"
                  disabled={isPending}
                  size="lg"
                  className="w-full rounded-full bg-white text-black font-semibold hover:bg-white/90 py-6 text-base shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  {isPending ? "Sending Inquiry..." : "Submit Project Inquiry"} <Send className="size-4" />
                </MagneticButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
