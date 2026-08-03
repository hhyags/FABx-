"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ALL_PROJECTS } from "@/lib/data/projects";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";

const categories = ["All Work", "AI/Agentic", "Dashboard", "Portfolio & Stock"];

function WorkContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All Work";

  const setCategory = (cat: string) => {
    if (cat === "All Work") {
      router.push("/work");
    } else {
      router.push(`/work?category=${encodeURIComponent(cat)}`);
    }
  };

  const filteredProjects = ALL_PROJECTS.filter(
    (p) => activeCategory === "All Work" || p.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-transparent text-white pt-32 pb-24 px-6">
      <div className="container-editorial">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.p variants={fadeIn} className="text-overline mb-6">
            Work Index
          </motion.p>
          <motion.h1 variants={revealUp} className="text-editorial text-white mb-6">
            Selected Projects.
          </motion.h1>
        </motion.div>

        {/* Filter Pills */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-5 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-white text-black font-semibold"
                  : "border border-white/[0.08] text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="grid gap-0">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/work/${project.id}`}
                className="group grid grid-cols-1 gap-4 border-t border-white/[0.06] py-10 transition-all duration-500 hover:bg-white/[0.015] md:grid-cols-[120px_1fr_40px] md:items-center md:gap-8 md:px-4 md:py-12"
              >
                {/* Meta */}
                <div className="flex gap-4 md:flex-col md:gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(192,82%,46%)]">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
                    {project.timeToDeliver}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-display text-headline font-semibold text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-body text-white/30 transition-colors duration-500 group-hover:text-white/45">
                    {project.shortDesc}
                  </p>
                  {project.honestScopeNote && (
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/15 italic">
                      {project.honestScopeNote}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <ArrowUpRight className="hidden size-5 text-white/15 transition-all duration-300 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:block" />
              </Link>
            </motion.div>
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] text-white pt-32 text-center font-mono text-xs text-white/30">
          Loading...
        </div>
      }
    >
      <WorkContent />
    </Suspense>
  );
}
