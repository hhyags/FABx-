"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Database, LayoutGrid, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { revealUp } from "@/lib/animation/motion";

const services = [
  {
    icon: Bot,
    title: "Autonomous AI Agents",
    tag: "Agentic Systems",
    desc: "Multi-agent workflows with contextual memory, human-in-the-loop fallback rules, and custom tool-calling integrations.",
    deliverables: ["Role-based agent routing", "Hallucination-safe safeguards", "Sub-second response times"],
  },
  {
    icon: Database,
    title: "RAG & Vector Pipelines",
    tag: "Data Engineering",
    desc: "Enterprise data ingestion, chunking, vector embedding storage, and hybrid semantic search for knowledge bases.",
    deliverables: ["Document parsing (PDF/CSV/Docs)", "Pinecone / Qdrant vector DB", "Real-time sync pipelines"],
  },
  {
    icon: LayoutGrid,
    title: "Full-Stack Web Applications",
    tag: "Product Engineering",
    desc: "Production Next.js 15 apps, real-time dashboards, ERP systems, and cloud infrastructure engineered to scale.",
    deliverables: ["TypeScript & React Server Components", "TailwindCSS & Shadcn UI", "PostgreSQL & Prisma / Supabase"],
  },
  {
    icon: ShieldCheck,
    title: "BRD & Code Audits",
    tag: "Technical Discipline",
    desc: "Rigorous Business Requirements Documentation (BRD), 18-point UX/performance audits, and system architecture blueprints.",
    deliverables: ["Detailed technical specification", "SVG Architecture Diagrams", "Milestone delivery schedule"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={revealUp}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-cyan mb-3">
            Services & Scope Fit
          </p>
          <h1 className="font-display text-4xl sm:text-7xl font-bold tracking-tight text-white mb-6">
            What FAX Technologies Builds.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            We don&apos;t sell general consulting or fluff decks — we architect, document, and ship production software systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-cyan-400/40 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <service.icon className="size-8 text-cyan-400" />
                <span className="font-mono text-xs text-white/50 border border-white/10 px-3 py-1 rounded-full bg-white/5">
                  {service.tag}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed mb-6">{service.desc}</p>
              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="font-mono text-xs text-cyan-400 uppercase mb-2">Key Deliverables</div>
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-2 font-mono text-xs text-white/60">
                    <span className="size-1.5 rounded-full bg-cyan-400" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Calm Conversion Band */}
        <div className="p-10 rounded-3xl border border-white/15 bg-gradient-to-r from-brand-purple/20 via-black to-cyan-950/30 text-center space-y-6">
          <h3 className="font-display text-3xl font-bold">Have a custom requirement?</h3>
          <p className="text-white/70 max-w-xl mx-auto">
            Whether you need a 3-week prototype sprint or an enterprise RAG pipeline, we align scope before line one of code.
          </p>
          <MagneticButton size="lg" className="rounded-full bg-white text-black font-semibold px-8 py-6">
            <Link href="/contact" className="flex items-center gap-2">
              Discuss Your Project <ArrowRight className="size-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
