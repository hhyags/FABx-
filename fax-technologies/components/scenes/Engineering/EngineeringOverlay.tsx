"use client";

import { motion } from "framer-motion";
import { Server, ShieldCheck, Database, Cloud, Cpu, HardDrive, BarChart3, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { revealUp, fadeIn, staggerContainer } from "@/lib/animation/motion";
import { AnimeTextReveal } from "@/components/ui/AnimeTextReveal";
import { AnimeCardHover } from "@/components/ui/AnimeCardHover";
import { MovingTypography } from "@/components/ui/moving-typography";
import { MotionWidget } from "@/components/ui/motion-widget";

const osServices = [
  { id: "api", icon: Server, title: "API Gateway", status: "200 OK", load: "1.2k req/s", delay: 0 },
  { id: "auth", icon: ShieldCheck, title: "Authentication", status: "OAuth2 Validated", load: "Sub-ms", delay: 0.1 },
  { id: "ai", icon: Cpu, title: "AI Engine", status: "LLM Active", load: "Tensor Core 98%", delay: 0.2 },
  { id: "db", icon: Database, title: "Database", status: "Qdrant + Postgres", statusColor: "text-emerald-400", load: "12.4M records", delay: 0.3 },
  { id: "cloud", icon: Cloud, title: "Cloud Mesh", status: "K8s Multi-Region", load: "99.99% Uptime", delay: 0.4 },
  { id: "storage", icon: HardDrive, title: "Storage", status: "Distributed S3", load: "AES-256 Encrypted", delay: 0.5 },
  { id: "analytics", icon: BarChart3, title: "Analytics", status: "Realtime Pipeline", load: "Kafka Streaming", delay: 0.6 },
];

export function EngineeringOverlay() {
  const [pulseIdx, setPulseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIdx((prev) => (prev + 1) % osServices.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="engineering"
      className="relative min-h-screen flex flex-col justify-center px-6 py-40 md:px-12 md:py-52 overflow-hidden"
    >
      {/* Background Kinetic Ticker */}
      <div className="absolute top-12 left-0 right-0 z-0">
        <MovingTypography text="AUTONOMOUS AGENTS • SUB-10MS VECTOR RAG • HIGH-THROUGHPUT SYSTEM ARCHITECTURE" speed={1.2} />
      </div>

      <div className="container-editorial relative z-10 w-full space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
          <motion.div
            className="lg:col-span-2 space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.p variants={fadeIn} className="text-overline text-[hsl(192,82%,46%)] font-mono">
              CHAPTER 02 — OS SYSTEM ARCHITECTURE
            </motion.p>

            <AnimeTextReveal
              text="Engineered for Scale."
              className="text-editorial text-white font-bold"
              as="h2"
              delay={100}
            />

            <motion.p variants={revealUp} className="text-body-lg text-white/50 font-sans max-w-xl">
              Inside the FABX Operating System: microservices communicate via low-latency event queues and automated pipeline meshes.
            </motion.p>
          </motion.div>

          {/* Smooth Spring Pop-up HUD Widget */}
          <div className="flex justify-start lg:justify-end">
            <MotionWidget />
          </div>
        </div>

        {/* Floating OS Service Windows Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {osServices.map((service, idx) => {
            const Icon = service.icon;
            const isPulsing = pulseIdx === idx;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: service.delay, duration: 0.6 }}
              >
                <AnimeCardHover
                  className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-2xl transition-all duration-500 ${
                    isPulsing
                      ? "border-[hsl(192,82%,46%)] bg-[#0d1520]/90 shadow-[0_0_30px_rgba(23,176,204,0.25)]"
                      : "border-white/10 bg-[#0a0b0e]/80 hover:border-white/20"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Icon className={`size-4 ${isPulsing ? "text-[hsl(192,82%,46%)]" : "text-white/60"}`} />
                      <span>{service.title}</span>
                    </div>
                    <span className={`size-2 rounded-full ${isPulsing ? "bg-[hsl(192,82%,46%)] animate-ping" : "bg-emerald-400"}`} />
                  </div>

                  {/* Body Details */}
                  <div className="mt-4 space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between text-white/50 text-[11px]">
                      <span>STATUS</span>
                      <span className="text-white font-semibold">{service.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/50 text-[11px]">
                      <span>THROUGHPUT</span>
                      <span className="text-emerald-400 font-mono">{service.load}</span>
                    </div>
                  </div>

                  {/* Data Pulse Bar */}
                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
                    <span>IPC CHANNEL</span>
                    <span className="flex items-center gap-1">
                      <Activity className="size-3 text-[hsl(192,82%,46%)]" />
                      <span>ACTIVE</span>
                    </span>
                  </div>
                </AnimeCardHover>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
