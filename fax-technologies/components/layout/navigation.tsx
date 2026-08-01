"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#birth", label: "Intelligence" },
  { href: "#network", label: "Neural Network" },
  { href: "#engineering", label: "Engineering" },
  { href: "#products", label: "Products" },
  { href: "#impact", label: "Impact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 transition-colors duration-500",
        isHome && !scrolled ? "bg-transparent" : "bg-black/80 backdrop-blur-xl border-b border-white/10"
      )}
    >
      <div
        className={cn(
          "container mx-auto my-3 flex h-14 items-center justify-between gap-4 transition-all duration-500 rounded-full border border-white/10 bg-white/[0.05] px-6 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        )}
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-gradient-to-tr from-brand-purple to-cyan-400 font-display text-xs font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            FX
          </span>
          <span className="font-display text-sm font-semibold tracking-normal text-white">
            FABX <span className="text-white/50 font-normal">Technologies</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-full text-xs font-mono tracking-wider uppercase transition-colors"
            >
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <MagneticButton
            strength={0.25}
            size="sm"
            className="rounded-full bg-white text-black font-medium hover:bg-white/90 text-xs px-5 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <a href="#contact" className="flex items-center gap-1.5">
              Contact <ArrowRight className="size-3.5" />
            </a>
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
