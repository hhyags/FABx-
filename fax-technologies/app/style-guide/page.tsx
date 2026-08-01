import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Box, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Style Guide",
  description: "Design system foundation for the FAX Technologies website.",
};

const colors = [
  { name: "Background", className: "bg-background", value: "--background" },
  { name: "Surface", className: "bg-surface", value: "--surface" },
  { name: "Elevated", className: "bg-surface-elevated", value: "--surface-elevated" },
  { name: "Purple", className: "bg-brand-purple", value: "--brand-purple" },
  { name: "Cyan", className: "bg-brand-cyan", value: "--brand-cyan" },
  { name: "Foreground", className: "bg-foreground", value: "--foreground" },
];

const typeSamples = [
  {
    label: "Display",
    className: "font-display text-5xl font-semibold md:text-7xl",
    text: "Intelligent software, built with precision.",
  },
  {
    label: "Body",
    className: "max-w-2xl text-lg leading-8 text-muted-foreground",
    text: "The system uses Inter for readable product content and Space Grotesk for a confident editorial voice.",
  },
  {
    label: "Code",
    className: "font-mono text-sm text-brand-cyan",
    text: "const foundation = createSystem(tokens);",
  },
];

export default function StyleGuidePage() {
  return (
    <div className="container py-14 md:py-20">
      <section className="max-w-4xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-brand-cyan">
          Foundation
        </p>
        <h1 className="text-balance font-display text-5xl font-semibold tracking-normal md:text-7xl">
          FAX Technologies design system.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          A technical foundation for themes, typography, interface primitives, motion utilities, and
          3D infrastructure.
        </p>
      </section>

      <section id="tokens" className="mt-16 space-y-6">
        <SectionHeading
          icon={<Layers className="size-5" />}
          title="Tokens"
          description="CSS variables drive color, radius, surfaces, focus rings, and brand accents."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {colors.map((color) => (
            <Card key={color.name} className="overflow-hidden">
              <div className={`h-28 border-b border-border ${color.className}`} />
              <CardHeader>
                <CardTitle>{color.name}</CardTitle>
                <CardDescription className="font-mono">{color.value}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="typography" className="mt-16 space-y-6">
        <SectionHeading
          icon={<Sparkles className="size-5" />}
          title="Typography"
          description="Space Grotesk, Inter, and JetBrains Mono are configured through next/font."
        />
        <Card>
          <CardContent className="space-y-8 pt-6">
            {typeSamples.map((sample) => (
              <div key={sample.label} className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {sample.label}
                </p>
                <p className={sample.className}>{sample.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="components" className="mt-16 space-y-6">
        <SectionHeading
          icon={<ArrowRight className="size-5" />}
          title="Components"
          description="Reusable primitives are compatible with the shadcn/ui project structure."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                Primary, secondary, outline, ghost, and glass styles.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="glass">Glass</Button>
            </CardContent>
          </Card>
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Glass Surface</CardTitle>
              <CardDescription>
                A restrained glass treatment for navigation, panels, and controls.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                The component layer is intentionally small while the system foundation is still
                forming.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="motion" className="mt-16 space-y-6">
        <SectionHeading
          icon={<Sparkles className="size-5" />}
          title="Motion"
          description="Shared motion variants and GSAP helpers are ready for future scenes."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {["Fade", "Reveal", "Stagger"].map((item) => (
            <Card key={item}>
              <CardHeader>
                <CardTitle>{item}</CardTitle>
                <CardDescription>Reusable timing and easing utility.</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id="three" className="mt-16 space-y-6">
        <SectionHeading
          icon={<Box className="size-5" />}
          title="3D Infrastructure"
          description="Canvas provider, camera manager, lighting, and loading manager are prepared without scenes."
        />
        <Card>
          <CardContent className="grid gap-4 pt-6 md:grid-cols-4">
            {["CanvasProvider", "CameraManager", "LightingRig", "LoadingManager"].map((item) => (
              <div key={item} className="rounded-md border border-border bg-muted/40 p-4">
                <p className="font-mono text-sm text-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 grid size-9 place-items-center rounded-md border border-border bg-muted">
        {icon}
      </div>
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-normal">{title}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
