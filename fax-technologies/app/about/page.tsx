"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { revealUp } from "@/lib/animation/motion";

const team = [
  { name: "Surya", role: "Product & Business Lead", bio: "Client relations, BRD discipline, and commercial scope alignment." },
  { name: "Azam", role: "Full-Stack & Systems Engineer", bio: "Next.js architecture, API integrations, and database design." },
  { name: "Charan", role: "AI & RAG Pipeline Lead", bio: "Vector embeddings, LLM orchestration, and autonomous agent logic." },
  { name: "Lead Architect", role: "Graphics & 3D Specialist", bio: "React Three Fiber canvas engine, GSAP scroll dynamics, and WebGL physics." },
];

const methodology = [
  { step: "01", title: "BRD & Scope Definition", desc: "Detailed Business Requirements Document defining exact inputs, outputs, and constraints before coding." },
  { step: "02", title: "Milestone-Based Build", desc: "Iterative production sprints with clean commit history, snapshot previews, and type safety." },
  { step: "03", title: "Delivery & Documentation", desc: "Complete source handoff, deployment guide, and honest scope retrospective." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={revealUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
            About FAX Technologies
          </p>
          <h1 className="font-display text-4xl sm:text-7xl font-bold tracking-tight text-white mb-6">
            We Ship Real Software.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            FAX Technologies was founded on a simple principle: software agencies should be judged by delivered software and documentation discipline, not decorative fluff.
          </p>
        </motion.div>

        {/* Gen AI Club Credibility Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl text-center">
            <div className="font-display text-5xl font-bold text-cyan-400 mb-2">100+</div>
            <div className="font-mono text-xs uppercase text-white/60">Gen AI Club Members</div>
          </div>
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl text-center">
            <div className="font-display text-5xl font-bold text-brand-purple mb-2">4</div>
            <div className="font-mono text-xs uppercase text-white/60">Delivered Client Products</div>
          </div>
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl text-center">
            <div className="font-display text-5xl font-bold text-emerald-400 mb-2">100%</div>
            <div className="font-mono text-xs uppercase text-white/60">Documentation Discipline</div>
          </div>
        </div>

        {/* Team Roster */}
        <div className="mb-24">
          <h2 className="font-display text-3xl font-bold mb-10 text-center">The Engineering Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
              >
                <div className="size-12 rounded-full bg-gradient-to-tr from-brand-purple to-cyan-400 grid place-items-center font-display text-lg font-bold mb-4 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                  {member.name[0]}
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">{member.name}</h3>
                <div className="font-mono text-xs text-cyan-400 mb-3">{member.role}</div>
                <p className="text-xs text-white/60 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delivery Methodology */}
        <div className="mb-24">
          <h2 className="font-display text-3xl font-bold mb-4 text-center">Our Delivery Methodology</h2>
          <p className="text-center text-sm text-white/60 max-w-xl mx-auto mb-12">
            Most client friction comes from vague scope. We solve this with BRD discipline before line one of code.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodology.map((m, idx) => (
              <motion.div
                key={m.step}
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
              >
                <div className="font-mono text-xs text-cyan-400 font-bold mb-3">{m.step}</div>
                <h3 className="font-display text-xl font-semibold mb-2">{m.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <MagneticButton size="lg" className="rounded-full bg-white text-black font-semibold px-8 py-6">
            <Link href="/contact" className="flex items-center gap-2">
              Start Your Project With Us <ArrowRight className="size-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
