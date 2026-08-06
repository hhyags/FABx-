"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { MenuDrawer } from "@/components/layout/MenuDrawer";
import { ProductionDrawer } from "@/components/layout/ProductionDrawer";
import { FrameViewerModal } from "@/components/ui/FrameViewerModal";
import "@/styles/hero.css";

const cubicEase = [0.16, 1, 0.3, 1] as const;

export function FabxHeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const [frameOpen, setFrameOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="hero" className="fabx-hero-container">
      {/* 1. Fixed Navbar */}
      <motion.nav
        className="fabx-navbar"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: cubicEase }}
      >
        {/* Left Side */}
        <div className="fabx-nav-children fabx-nav-left">
          {/* Logo & Brand */}
          <div className="fabx-logo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="rotate(-35 12 12)">
                <rect x="5" y="7" width="14" height="4" rx="2" fill="#0ea5e9" />
                <rect x="5" y="13" width="14" height="4" rx="2" fill="#22d3ee" />
              </g>
            </svg>
            <span className="fabx-brand-text">FABX Tech</span>
          </div>

          {/* Menu Pill */}
          <button
            onClick={() => setMenuOpen(true)}
            className="fabx-menu-btn cursor-pointer"
            aria-label="Open Menu"
          >
            <span className="fabx-plus-circle">
              <Plus size={12} strokeWidth={3} />
            </span>
            <span>Menu</span>
          </button>

          {/* Tags Pill */}
          <div className="fabx-tags-pill">
            <span>Multi-Agent AI</span>
            <span className="fabx-tag-separator" />
            <span>Automation</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="fabx-nav-children">
          <div className="fabx-nav-right" onClick={() => setProdOpen(true)}>
            <button
              className="fabx-grid-btn cursor-pointer"
              aria-label="Production Systems"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3" cy="3" r="1.5" fill="#000000" />
                <circle cx="9" cy="3" r="1.5" fill="#000000" />
                <circle cx="3" cy="9" r="1.5" fill="#000000" />
                <circle cx="9" cy="9" r="1.5" fill="#000000" />
              </svg>
            </button>
            <button
              className="cursor-pointer hover:opacity-80 text-white"
            >
              Production Systems
            </button>
          </div>
        </div>
      </motion.nav>

      {/* 2. Background Video - Centered Static Container */}
      <div className="fabx-video-wrapper">
        <motion.div
          className="w-full h-full flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: cubicEase }}
        >
          <video
            className="fabx-video"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </div>

      {/* Spacer div to push footer down */}
      <div />

      {/* 3. Footer Content over Gradient */}
      <motion.footer
        className="fabx-footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.0, ease: cubicEase }}
      >
        {/* Left Block */}
        <div className="fabx-footer-left">
          {/* Subtitle */}
          <motion.div
            className="fabx-subtitle"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: cubicEase }}
          >
            <span className="fabx-dot" />
            <span>Applied AI, delivered end-to-end</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="fabx-heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: cubicEase }}
          >
            One Team, Zero / <br />
            Limits. Delivered.
          </motion.h1>

          {/* Buttons */}
          <motion.div
            className="fabx-buttons-group"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: cubicEase }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="fabx-btn-primary cursor-pointer"
            >
              See Our Work
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="fabx-btn-secondary cursor-pointer"
            >
              How We Build
            </button>
          </motion.div>
        </div>

        {/* Right Block — Tag Pills */}
        <div className="fabx-footer-right">
          <span className="fabx-footer-tag">Agentic AI</span>
          <span className="fabx-footer-tag">RAG</span>
          <span className="fabx-footer-tag">Generative AI</span>
        </div>
      </motion.footer>

      {/* Drawers & Modals */}
      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenFrameViewer={() => setFrameOpen(true)}
      />
      <ProductionDrawer
        isOpen={prodOpen}
        onClose={() => setProdOpen(false)}
      />
      <FrameViewerModal
        isOpen={frameOpen}
        onClose={() => setFrameOpen(false)}
      />
    </div>
  );
}
