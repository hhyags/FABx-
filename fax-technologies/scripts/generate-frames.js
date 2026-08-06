import fs from "fs";
import path from "path";

const framesDir = path.join(process.cwd(), "public", "frames");

if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

const TOTAL_FRAMES = 240;

function pad4(n) {
  return String(n).padStart(4, "0");
}

for (let i = 1; i <= TOTAL_FRAMES; i++) {
  const progress = i / TOTAL_FRAMES;
  const angle = progress * Math.PI * 4;

  const cx = 640 + Math.sin(angle) * 140;
  const cy = 360 + Math.cos(angle * 0.5) * 70;
  const radius = 150 + Math.sin(progress * Math.PI * 2) * 50;

  const r1 = 220 + Math.sin(angle) * 90;
  const r2 = 220 - Math.sin(angle) * 90;
  const r3 = 220 + Math.cos(angle) * 90;

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070c18"/>
      <stop offset="50%" stop-color="#0f1930"/>
      <stop offset="100%" stop-color="#040810"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Clean Background -->
  <rect width="1280" height="720" fill="url(#bgGrad)"/>

  <!-- High-Tech Cyber Grid -->
  <g stroke="rgba(14,165,233,0.18)" stroke-width="1.5">
    ${Array.from({ length: 16 }, (_, idx) => `<line x1="${idx * 85}" y1="0" x2="${idx * 85}" y2="720"/>`).join("")}
    ${Array.from({ length: 10 }, (_, idx) => `<line x1="0" y1="${idx * 72}" x2="1280" y2="${idx * 72}"/>`).join("")}
  </g>

  <!-- Animated Core Vectors -->
  <g filter="url(#glow)">
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="#0ea5e9" stroke-width="4" stroke-dasharray="20 10"/>
    <circle cx="${cx}" cy="${cy}" r="${radius * 0.6}" fill="rgba(14,165,233,0.18)" stroke="#22d3ee" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="20" fill="#38bdf8"/>

    <!-- Orbital Nodes -->
    <circle cx="${cx + Math.cos(angle) * r1}" cy="${cy + Math.sin(angle) * r1}" r="12" fill="#0ea5e9"/>
    <circle cx="${cx - Math.cos(angle * 1.5) * r2}" cy="${cy + Math.sin(angle * 1.5) * r2}" r="14" fill="#10b981"/>
    <circle cx="${cx + Math.sin(angle * 0.8) * r3}" cy="${cy - Math.cos(angle * 0.8) * r3}" r="10" fill="#f59e0b"/>

    <!-- Connecting Vectors -->
    <line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle) * r1}" y2="${cy + Math.sin(angle) * r1}" stroke="rgba(14,165,233,0.8)" stroke-width="2.5" stroke-dasharray="6 6"/>
    <line x1="${cx}" y1="${cy}" x2="${cx - Math.cos(angle * 1.5) * r2}" y2="${cy + Math.sin(angle * 1.5) * r2}" stroke="rgba(16,185,129,0.8)" stroke-width="2.5" stroke-dasharray="6 6"/>
  </g>
</svg>`;

  fs.writeFileSync(path.join(framesDir, `frame_${pad4(i)}.svg`), svgContent);
  fs.writeFileSync(path.join(framesDir, `frame_${pad4(i)}.jpg`), svgContent);
}

console.log(`Successfully generated ${TOTAL_FRAMES} clean frames (.svg & .jpg) in public/frames/`);
