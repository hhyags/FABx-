"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Send, Sparkles } from "lucide-react";
import React, { useState } from "react";

const wizardSteps = [
  { id: 1, title: "What are you building?", options: ["Autonomous AI Agent / RAG Pipeline", "Enterprise SaaS / Full-Stack Web App", "Custom Analytics & Dashboard", "System Architecture & BRD Audit"] },
  { id: 2, title: "What problem are you solving?", options: ["Automating Manual Workflows", "Scaling Database & API Throughput", "Improving UX & Conversion Speed", "Modernizing Infrastructure"] },
  { id: 3, title: "Target Timeline", options: ["Urgent Prototype (2-3 Weeks)", "Standard Build Sprint (4-6 Weeks)", "Enterprise Rollout (2-3 Months)"] },
];

export function ContactOverlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSelect = (option: string) => {
    setSelections((prev) => ({ ...prev, [currentStep]: option }));
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center px-6 py-40 md:px-12 md:py-52 bg-[#050505] text-white"
    >
      <div className="max-w-4xl mx-auto z-10 w-full space-y-12">
        <div className="text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">
            CHAPTER 09 — PROJECT INITIATION
          </p>
          <h2 className="font-display text-4xl sm:text-7xl font-bold">
            Start Your Build.
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            Interactive project initiation wizard. Define your scope before line one of code.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="p-8 sm:p-12 rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <CheckCircle2 className="size-16 text-emerald-400 mx-auto" />
              <h3 className="font-display text-3xl font-bold">Project Scope Received</h3>
              <p className="text-white/70 max-w-md mx-auto">
                Thank you {name || "Client"}! We have received your project requirements and will reach out within 24 hours.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {/* Step Progress Dots */}
              <div className="flex items-center justify-between font-mono text-xs text-cyan-400 border-b border-white/10 pb-4">
                <span>STEP 0{currentStep + 1} OF 04</span>
                <span>{currentStep === wizardSteps.length ? "CONTACT DETAILS" : wizardSteps[currentStep].title}</span>
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {currentStep < wizardSteps.length ? (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display text-2xl font-semibold">
                      {wizardSteps[currentStep].title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wizardSteps[currentStep].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSelect(option)}
                          className={`p-5 rounded-2xl border font-mono text-xs text-left transition-all ${
                            selections[currentStep] === option
                              ? "border-cyan-400 bg-cyan-950/40 text-white font-bold"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="final-step"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <h3 className="font-display text-2xl font-semibold">Enter Direct Contact Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-xs text-white/60 mb-2">YOUR NAME *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Surya / Client Name"
                          className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-xs text-white/60 mb-2">EMAIL ADDRESS *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="client@company.com"
                          className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                    >
                      Submit Project Initiation <Send className="size-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
