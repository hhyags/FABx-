"use client";

import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { revealUp } from "@/lib/animation/motion";

export function ContactOverlay() {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl mx-auto z-10 w-full text-center">
        <motion.p
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3"
        >
          Scene 09 — Initiation
        </motion.p>

        <motion.h2
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="font-display text-4xl sm:text-7xl font-semibold text-white leading-none mb-6"
        >
          Ready to Build the Future?
        </motion.h2>

        <motion.p
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Transform your digital vision into an unforgettable product. Partner with FABX Technologies.
        </motion.p>

        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            size="lg"
            className="rounded-full bg-gradient-to-r from-brand-purple to-cyan-500 text-white font-medium px-8 py-6 text-base shadow-[0_0_40px_rgba(139,92,246,0.4)]"
          >
            Start Your Project <ArrowRight className="size-5" />
          </MagneticButton>
          <MagneticButton
            size="lg"
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 backdrop-blur-md text-white px-8 py-6 text-base hover:bg-white/10"
          >
            Book a Technical Briefing <Send className="size-4" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
