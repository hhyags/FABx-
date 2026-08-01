export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/90 py-12 text-white/60">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>© {new Date().getFullYear()} FABX Technologies Inc. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-white/50">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          <span className="text-white/30">•</span>
          <span className="text-cyan-400">Architected for 60 FPS Digital Storytelling</span>
        </div>
      </div>
    </footer>
  );
}
