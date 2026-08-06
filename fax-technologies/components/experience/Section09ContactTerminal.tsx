"use client";

import { motion } from "motion/react";
import { Terminal, Send, CheckCircle2, RotateCcw, CornerDownLeft } from "lucide-react";
import { useState } from "react";

const initiationSteps = [
  { key: "type", question: "1. Select Project Type:", options: ["AI Agents / Multi-Agent Systems", "SaaS Platform", "Enterprise ERP / CRM", "Full-Stack Web & Mobile App"] },
  { key: "goal", question: "2. Primary Business Goal:", options: ["Automate Business Processes", "Build New AI Product", "Scale Infrastructure", "Modernize Legacy Software"] },
  { key: "timeline", question: "3. Target Launch Timeline:", options: ["Immediate (< 1 Month)", "1 - 3 Months", "3 - 6 Months", "Flexible Enterprise"] },
  { key: "budget", question: "4. Estimated Investment Range:", options: ["$15k - $30k", "$30k - $75k", "$75k - $150k+", "Custom Enterprise Quote"] },
];

export function Section09ContactTerminal() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactEmail, setContactEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (opt: string) => {
    const currentStep = initiationSteps[stepIdx];
    setAnswers((prev) => ({ ...prev, [currentStep.key]: opt }));
    if (stepIdx < initiationSteps.length - 1) {
      setStepIdx((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setStepIdx(0);
    setAnswers({});
    setContactEmail("");
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmail.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="fabx-story-section bg-[#050505] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] font-mono text-xs text-cyan-400">
            <Terminal className="size-3.5" />
            <span>CHAPTER 09 — PROJECT INITIATION TERMINAL</span>
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-bold tracking-tight text-white">
            Initiate Your Engineering Sprint.
          </h2>
          <p className="text-white/50 text-base font-sans">
            Answer a few system prompts to configure your custom project scope.
          </p>
        </div>

        {/* CLI Terminal Container */}
        <div className="fabx-terminal-box p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>FABX_CLI v4.2 • INTERACTIVE SPREADSHEET</span>
            </span>
            <div className="flex items-center gap-4">
              <span>STEP {Math.min(stepIdx + 1, 4)} / 4</span>
              {Object.keys(answers).length > 0 && (
                <button
                  onClick={handleReset}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  title="Reset Terminal"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset Prompt</span>
                </button>
              )}
            </div>
          </div>

          {!submitted ? (
            <div className="space-y-6 font-mono text-xs sm:text-sm">
              {/* Previous selected answers summary */}
              {Object.entries(answers).map(([key, val]) => (
                <div key={key} className="space-y-1 text-white/50">
                  <div className="text-cyan-400">$ prompt.{key} --selected</div>
                  <div className="text-emerald-400 pl-4 font-bold">✓ {val}</div>
                </div>
              ))}

              {stepIdx < initiationSteps.length && (
                <div className="space-y-4 pt-2">
                  <div className="text-white font-bold flex items-center gap-2">
                    <span className="text-cyan-400">$</span>
                    <span>{initiationSteps[stepIdx].question}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4">
                    {initiationSteps[stepIdx].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt)}
                        className="p-3 text-left rounded-xl border border-white/10 bg-white/[0.02] hover:bg-cyan-500/10 hover:border-cyan-400 text-white/80 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span>{opt}</span>
                        <CornerDownLeft className="size-3.5 text-white/30 group-hover:text-cyan-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Email Form Step after options */}
              {Object.keys(answers).length === initiationSteps.length && (
                <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-white/10">
                  <div className="text-white font-bold flex items-center gap-2">
                    <span className="text-cyan-400">$</span>
                    <span>5. Enter Work Email for System Dispatch:</span>
                  </div>
                  <div className="flex gap-2 pl-4">
                    <input
                      type="email"
                      required
                      placeholder="engineer@company.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-cyan-300 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Submit</span>
                      <Send className="size-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6 font-mono"
            >
              <CheckCircle2 className="size-12 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-white">PROJECT DISPATCH CONFIRMED</h3>
              <p className="text-sm text-white/50 max-w-md mx-auto">
                System telemetry sent to FABX engineering team. We will inspect your specifications and respond within 12 hours.
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl border border-white/15 bg-white/5 text-cyan-400 font-bold hover:bg-white/10 transition-all text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Configure Another Project</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
