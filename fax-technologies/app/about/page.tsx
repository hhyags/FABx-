"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

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
    <div className="min-h-screen bg-transparent text-white pt-32 pb-24 px-6">
      <div className="container-editorial">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mb-24"
        >
          <motion.p variants={fadeIn} className="text-overline mb-6">
            About FABX Innovations
          </motion.p>
          <motion.h1
            variants={revealUp}
            className="text-editorial text-white mb-6"
          >
            We Ship Real Software.
          </motion.h1>
          <motion.p variants={revealUp} className="text-body-lg text-white/40">
            FABX Innovations was founded on a simple principle: software agencies should
            be judged by delivered software and documentation discipline, not decorative fluff.
          </motion.p>
        </motion.div>

        {/* Credibility Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-24">
          {[
            { value: "100+", label: "Gen AI Club Members" },
            { value: "4", label: "Delivered Client Products" },
            { value: "100%", label: "Documentation Discipline" },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-white/[0.06] py-10 pr-8 md:border-l md:border-t-0 md:py-0 md:pl-8 md:first:border-l-0"
            >
              <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[hsl(192,82%,46%)] leading-none">
                {item.value}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Roster */}
        <div className="mb-24">
          <h2 className="text-overline mb-6">The Team</h2>
          <h3 className="font-display text-headline font-semibold text-white mb-12">
            Engineering Team
          </h3>
          <div className="grid gap-0">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-1 gap-4 border-t border-white/[0.06] py-8 md:grid-cols-[48px_180px_1fr] md:items-center md:gap-8 md:py-10"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-white/[0.06] font-display text-sm font-semibold text-white/60">
                  {member.name[0]}
                </div>
                <div>
                  <h4 className="font-display text-base font-semibold text-white">{member.name}</h4>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[hsl(192,82%,46%)]">{member.role}</div>
                </div>
                <p className="text-sm text-white/35 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
            <div className="border-t border-white/[0.06]" />
          </div>
        </div>

        {/* Delivery Methodology */}
        <div className="mb-24">
          <h2 className="text-overline mb-6">Methodology</h2>
          <h3 className="font-display text-headline font-semibold text-white mb-4">
            Our Delivery Process
          </h3>
          <p className="max-w-xl text-body text-white/40 mb-12">
            Most client friction comes from vague scope. We solve this with BRD discipline before line one of code.
          </p>

          <div className="grid gap-0">
            {methodology.map((m, idx) => (
              <motion.div
                key={m.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 gap-4 border-t border-white/[0.06] py-10 md:grid-cols-[60px_1fr_1.5fr] md:items-start md:gap-8"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-[hsl(192,82%,46%)]">{m.step}</span>
                <h4 className="font-display text-title font-semibold text-white">{m.title}</h4>
                <p className="text-body text-white/40 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
            <div className="border-t border-white/[0.06]" />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-display text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-glow"
          >
            Start Your Project With Us
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
