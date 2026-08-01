import { ArrowLeft, CheckCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_PROJECTS, getProjectById } from "@/lib/data/projects";

export async function generateStaticParams() {
  return ALL_PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs text-white/60 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to All Work
        </Link>

        {/* Case Study Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 mb-3">
            <span className="px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/20">{project.category}</span>
            <span>•</span>
            <span>{project.client}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">{project.shortDesc}</p>
        </div>

        {/* Outcome / Metric Callout */}
        <div className="p-8 rounded-3xl border border-cyan-400/30 bg-gradient-to-r from-cyan-950/20 via-black to-brand-purple/20 mb-16 flex items-center justify-between">
          <div>
            <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-1">Project Outcome</div>
            <div className="font-display text-3xl font-bold text-white">{project.metric || project.timeToDeliver}</div>
          </div>
          <div className="font-mono text-xs text-white/60 border border-white/10 px-4 py-2 rounded-full bg-white/5">
            {project.timeToDeliver}
          </div>
        </div>

        {/* 1. Problem Statement */}
        <div className="space-y-4 mb-16">
          <h3 className="font-display text-2xl font-semibold text-white">01. The Problem</h3>
          <p className="text-base text-white/70 leading-relaxed p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
            {project.problem}
          </p>
        </div>

        {/* 2. What We Built */}
        <div className="space-y-4 mb-16">
          <h3 className="font-display text-2xl font-semibold text-white">02. What We Built</h3>
          <p className="text-base text-white/70 leading-relaxed p-6 rounded-2xl border border-white/10 bg-white/[0.02] mb-6">
            {project.whatWeBuilt}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.deliverables.map((item) => (
              <div key={item} className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 font-mono text-xs text-white/80">
                <CheckCircle className="size-4 text-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Honest Scope Note (Required Differentiator) */}
        <div className="space-y-4 mb-16">
          <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-widest">
            <ShieldAlert className="size-4" /> 03. Honest Scope Retrospective
          </div>
          <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 text-amber-200/90 text-sm leading-relaxed italic">
            &quot;{project.honestScopeNote}&quot;
          </div>
        </div>

        {/* 4. Clean SVG Architecture Diagram */}
        <div className="space-y-4 mb-16">
          <h3 className="font-display text-2xl font-semibold text-white">04. System Architecture</h3>
          <div className="p-8 rounded-3xl border border-white/10 bg-black/60 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {project.architectureNodes.map((node, idx) => (
                <div key={node} className="flex items-center gap-4">
                  <div className="px-5 py-3 rounded-xl border border-cyan-400/40 bg-cyan-950/30 font-mono text-xs text-cyan-300 font-bold">
                    {node}
                  </div>
                  {idx < project.architectureNodes.length - 1 && (
                    <span className="text-white/30 text-lg">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Case Study Navigation */}
        <div className="border-t border-white/10 pt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors"
          >
            Explore More Work <ArrowLeft className="size-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
