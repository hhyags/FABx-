"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ALL_PROJECTS, ProjectData } from "@/lib/data/projects";

const categories = ["All Work", "AI/Agentic", "Dashboard", "Portfolio & Stock"];

function WorkContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All Work";
  const reducedMotion = usePrefersReducedMotion();

  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);

  // Mouse motion values for Noomo-style cursor-follow thumbnail preview
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 350, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    mouseX.set(e.clientX + 16);
    mouseY.set(e.clientY + 16);
  };

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
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 relative overflow-hidden"
    >
      {/* Cursor-Follow Floating Preview Card */}
      {!reducedMotion && hoveredProject && (
        <motion.div
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="pointer-events-none fixed z-50 p-5 rounded-2xl border border-cyan-400/40 bg-black/80 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.25)] max-w-xs"
        >
          <div className="font-mono text-[10px] uppercase text-cyan-400 mb-1">
            {hoveredProject.category} • {hoveredProject.timeToDeliver}
          </div>
          <h4 className="font-display text-base font-bold text-white mb-2">{hoveredProject.title}</h4>
          <p className="text-xs text-white/70 line-clamp-2">{hoveredProject.shortDesc}</p>
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">
              Work Index & Delivered Software
            </p>
            <h1 className="font-display text-4xl sm:text-7xl font-bold tracking-tight text-white">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-cyan-400 to-white">Projects.</span>
            </h1>
          </div>

          {/* URL SearchParams Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full font-mono text-xs tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    : "border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-cyan-400/50 hover:bg-white/[0.06] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-4">
                  <span>{project.category}</span>
                  <span>{project.metric || project.timeToDeliver}</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-white mb-3 flex items-center justify-between">
                  {project.title}
                  <ArrowUpRight className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-cyan-400" />
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">{project.shortDesc}</p>
              </div>

              {/* Scope Honesty Tag */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="font-mono text-[10px] text-white/40 uppercase mb-1">Scope Guarantee</div>
                <p className="text-xs text-white/50 italic line-clamp-2">{project.honestScopeNote}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] text-white pt-32 text-center font-mono">Loading Work Index...</div>}>
      <WorkContent />
    </Suspense>
  );
}
