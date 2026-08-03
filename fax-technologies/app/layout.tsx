import type { Metadata, Viewport } from "next";
import { inter, jetBrainsMono, spaceGrotesk } from "@/app/fonts";
import { GlobalCanvas } from "@/components/experience/GlobalCanvas";
import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navigation";
import { Providers } from "@/components/providers/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "FABX Innovations — AI Engineering & Digital Product Studio",
  description:
    "FABX Innovations designs, engineers, and builds intelligent software — AI products, enterprise platforms, SaaS systems, and business automation for growing companies.",
  keywords: [
    "FABX Innovations",
    "AI Engineering",
    "Digital Product Studio",
    "AI Agents",
    "Enterprise Software",
    "SaaS Development",
    "CRM Development",
    "ERP Systems",
    "Business Automation",
  ],
  openGraph: {
    title: "FABX Innovations — AI Engineering & Digital Product Studio",
    description:
      "We design, engineer, and build intelligent software — AI products, enterprise platforms, and business automation.",
    url: "https://fabxinnovations.com",
    siteName: "FABX Innovations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FABX Innovations",
    description: "AI Engineering & Digital Product Studio.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-[#050505] text-white selection:bg-[hsl(192,82%,46%,0.3)] selection:text-white">
        <Providers>
          {/* Site-wide WebGL 3D Canvas Layer with 3D FABX logo */}
          <GlobalCanvas />

          <div className="relative z-10 flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
