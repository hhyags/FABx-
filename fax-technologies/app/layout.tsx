import type { Metadata, Viewport } from "next";
import { inter, jetBrainsMono, spaceGrotesk } from "@/app/fonts";
import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navigation";
import { Providers } from "@/components/providers/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "FABX Technologies — Building Intelligent Digital Products That Scale",
  description:
    "FABX Technologies architects AI-powered software, enterprise platforms, autonomous agent workflows, and modern digital ecosystems for fast-growing enterprises.",
  keywords: [
    "FABX Technologies",
    "AI Development",
    "Enterprise Software",
    "Autonomous AI Agents",
    "Cloud Architecture",
    "Digital Products",
  ],
  openGraph: {
    title: "FABX Technologies — Building Intelligent Digital Products That Scale",
    description:
      "FABX Technologies architects AI-powered software, enterprise platforms, autonomous agent workflows, and modern digital ecosystems.",
    url: "https://fabx.tech",
    siteName: "FABX Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FABX Technologies",
    description: "Building Intelligent Digital Products That Scale.",
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
      <body className="bg-[#050505] text-white selection:bg-brand-purple selection:text-white">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
