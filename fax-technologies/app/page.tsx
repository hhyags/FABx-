import { FabxHeroSection } from "@/components/hero/FabxHeroSection";
import { FabxCinematicJourney } from "@/components/experience/FabxCinematicJourney";

export default function HomePage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen">
      <FabxHeroSection />
      <FabxCinematicJourney />
    </main>
  );
}
