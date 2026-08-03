"use client";

import Link from "next/link";
import { Menu, X, Terminal, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimelineController } from "@/lib/experience/engine/TimelineController";

const navItems = [
  { href: "#hero", label: "AI Core", layer: "01" },
  { href: "#engineering", label: "Engineering", layer: "02" },
  { href: "#products", label: "Products", layer: "03" },
  { href: "#process", label: "Pipeline", layer: "04" },
  { href: "#contact", label: "Terminal", layer: "05" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLayer, setActiveLayer] = useState("AI Core");

  useEffect(() => {
    const updateNav = () => {
      setScrolled(window.scrollY > 40);
      const progress = TimelineController.getProgress();
      if (progress < 0.2) setActiveLayer("AI Core");
      else if (progress < 0.45) setActiveLayer("Engineering");
      else if (progress < 0.70) setActiveLayer("Products");
      else if (progress < 0.85) setActiveLayer("Pipeline");
      else setActiveLayer("Terminal");
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <ScrollProgressBar />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-cinematic",
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-2xl border-b border-white/[0.08]"
            : "bg-transparent"
        )}
      >
        <div className="container-editorial flex h-16 items-center justify-between md:h-18">
          {/* Logo & System Command Identifier */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-white transition-opacity hover:opacity-80"
            >
              <Terminal className="size-4 text-[hsl(192,82%,46%)]" />
              <span>FABX OS</span>
            </Link>

            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400 sm:flex">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM ONLINE 99.9%</span>
            </div>
          </div>

          {/* Command Center Layer Navigator */}
          <nav
            aria-label="Command Center navigation"
            className="hidden items-center gap-8 md:flex"
          >
            {navItems.map((item) => {
              const isActive = activeLayer === item.label;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 font-mono text-xs transition-colors duration-300",
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/40 hover:text-white/80"
                  )}
                >
                  <span className="text-[10px] text-[hsl(192,82%,46%)]">{item.layer}.</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="size-1 rounded-full bg-[hsl(192,82%,46%)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Terminal Launcher Trigger */}
          <div className="hidden items-center md:flex">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-xs font-medium text-white transition-all duration-300 hover:border-[hsl(192,82%,46%)] hover:bg-white/10"
            >
              <Cpu className="size-3.5 text-[hsl(192,82%,46%)] transition-transform group-hover:rotate-45" />
              <span>Deploy Project</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex size-10 items-center justify-center text-white/60 transition-colors hover:text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Command Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] flex flex-col justify-between bg-[#050505]/98 px-8 py-24 backdrop-blur-3xl md:hidden"
          >
            <div className="space-y-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-400 flex items-center gap-2 mb-4">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>FABX OS COMMAND CENTER</span>
              </div>
              <nav className="flex flex-col gap-5">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 font-mono text-2xl font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    <span className="text-sm text-[hsl(192,82%,46%)]">{item.layer}.</span>
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="border-t border-white/10 pt-6 font-mono text-xs text-white/40">
              FABX OS v4.2 • Autonomous AI Engineering Platform
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-white/5">
      <div
        className="h-full bg-[hsl(192,82%,46%)] transition-[width] duration-150 ease-out shadow-[0_0_12px_hsl(192,82%,46%)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
