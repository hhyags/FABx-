import Link from "next/link";

const services = [
  "AI Products",
  "Enterprise Software",
  "SaaS Platforms",
  "CRM & ERP",
  "AI Agents",
  "Business Automation",
];

const company = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#050505]">
      <div className="container-editorial py-16 md:py-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-lg font-semibold tracking-tight text-white"
            >
              FABX
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/30">
              AI Engineering & Digital Product Studio.
              We design, engineer, and build intelligent software.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/35 transition-colors hover:text-white/60">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
              Company
            </h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/35 transition-colors duration-300 hover:text-white/60"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
              Connect
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@fabxinnovations.com"
                  className="text-sm text-white/35 transition-colors duration-300 hover:text-white/60"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/35 transition-colors duration-300 hover:text-white/60"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/35 transition-colors duration-300 hover:text-white/60"
                >
                  Twitter / X
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/20">
            © {new Date().getFullYear()} FABX Innovations. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/20 transition-colors hover:text-white/40"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/20 transition-colors hover:text-white/40"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
