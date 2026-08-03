"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

const initialState = { success: false, message: "" };

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <div className="min-h-screen bg-transparent text-white pt-32 pb-24 px-6">
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mb-16"
        >
          <motion.p variants={fadeIn} className="text-overline mb-6">
            Get in Touch
          </motion.p>
          <motion.h1
            variants={revealUp}
            className="text-editorial text-white mb-6"
          >
            Let&apos;s Build Software That Ships.
          </motion.h1>
          <motion.p variants={revealUp} className="text-body-lg text-white/40">
            Have a project in mind? We partner with founders and enterprises to deliver
            AI systems, custom platforms, and data pipelines.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-title font-semibold text-white mb-2">
                Direct Contact
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Response time: under 24 hours.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-white/50">
                <Mail className="size-4 text-[hsl(192,82%,46%)]" />
                <span className="font-mono text-[11px]">hello@fabxinnovations.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <MapPin className="size-4 text-[hsl(192,82%,46%)]" />
                <span className="font-mono text-[11px]">India</span>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(192,82%,46%)] mb-2">
                Guaranteed Discipline
              </div>
              <p className="text-xs text-white/35 leading-relaxed">
                Every project includes BRD documentation, clean system architecture, and milestone-based code delivery.
              </p>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10">
            {state.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <CheckCircle2 className="size-12 text-emerald-400 mx-auto" />
                <h3 className="font-display text-xl font-semibold">Message Received</h3>
                <p className="text-white/50 max-w-md mx-auto text-sm">{state.message}</p>
              </motion.div>
            ) : (
              <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Full Name"
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[hsl(192,82%,46%)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[hsl(192,82%,46%)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="projectScope" className="block font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                    Project Scope
                  </label>
                  <select
                    id="projectScope"
                    name="projectScope"
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white focus:border-[hsl(192,82%,46%)] focus:outline-none transition-colors"
                  >
                    <option value="ai-agent">Autonomous AI Agent / RAG Pipeline</option>
                    <option value="full-stack">Full-Stack Web Application / ERP</option>
                    <option value="dashboard">Custom Analytics Dashboard</option>
                    <option value="audit">Code & Architecture Audit</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your timeline, core requirements, and target outcomes..."
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[hsl(192,82%,46%)] focus:outline-none transition-colors"
                  />
                </div>

                {state.message && !state.success && (
                  <p className="text-xs font-mono text-rose-400">{state.message}</p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-display text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-glow disabled:opacity-50"
                >
                  {isPending ? "Sending..." : "Submit Inquiry"}
                  <Send className="size-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
