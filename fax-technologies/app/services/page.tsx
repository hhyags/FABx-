"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

const services = [
  {
    num: "01",
    title: "Autonomous AI Agents",
    tag: "Agentic Systems",
    desc: "Multi-agent workflows with contextual memory, human-in-the-loop fallback rules, and custom tool-calling integrations.",
    deliverables: ["Role-based agent routing", "Hallucination-safe safeguards", "Sub-second response times"],
  },
  {
    num: "02",
    title: "RAG & Vector Pipelines",
    tag: "Data Engineering",
    desc: "Enterprise data ingestion, chunking, vector embedding storage, and hybrid semantic search for knowledge bases.",
    deliverables: ["Document parsing (PDF/CSV/Docs)", "Pinecone / Qdrant vector DB", "Real-time sync pipelines"],
  },
  {
    num: "03",
    title: "Full-Stack Web Applications",
    tag: "Product Engineering",
    desc: "Production Next.js 15 apps, real-time dashboards, ERP systems, and cloud infrastructure engineered to scale.",
    deliverables: ["TypeScript & React Server Components", "TailwindCSS & Shadcn UI", "PostgreSQL & Prisma / Supabase"],
  },
  {
    num: "04",
    title: "BRD & Code Audits",
    tag: "Technical Discipline",
    desc: "Rigorous Business Requirements Documentation (BRD), 18-point UX/performance audits, and system architecture blueprints.",
    deliverables: ["Detailed technical specification", "SVG Architecture Diagrams", "Milestone delivery schedule"],
  },
];

export default function ServicesPage() {
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
            Services
          </motion.p>
          <motion.h1
            variants={revealUp}
            className="text-editorial text-white mb-6"
          >
            What We Build.
          </motion.h1>
          <motion.p variants={revealUp} className="text-body-lg text-white/40">
            We don&apos;t sell general consulting or fluff decks — we architect,
            document, and ship production software systems.
          </motion.p>
        </motion.div>

        {/* Services List */}
        <div className="grid gap-0 mb-24">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-1 gap-6 border-t border-white/[0.06] py-12 md:grid-cols-[60px_220px_1fr] md:items-start md:gap-8"
            >
              {/* Number */}
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/20 transition-colors group-hover:text-[hsl(192,82%,46%)]">
                {service.num}
              </span>

              {/* Title & Tag */}
              <div>
                <h3 className="font-display text-title font-semibold text-white mb-1">
                  {service.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
                  {service.tag}
                </span>
              </div>

              {/* Description & Deliverables */}
              <div>
                <p className="text-body text-white/40 leading-relaxed mb-4">{service.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/25"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center md:p-16">
          <h3 className="font-display text-headline font-semibold text-white mb-4">
            Have a custom requirement?
          </h3>
          <p className="mx-auto mb-8 max-w-xl text-body text-white/40">
            Whether you need a 3-week prototype sprint or an enterprise RAG pipeline,
            we align scope before line one of code.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-display text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-glow"
          >
            Discuss Your Project
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
