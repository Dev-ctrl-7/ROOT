"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { FoodAcrossIndia } from "@/components/FoodAcrossIndia";
import { Footer } from "@/components/Footer";
import { TransformationInspectorModal } from "@/components/TransformationInspectorModal";

export default function CuisinePage() {
  const router = useRouter();
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  const handleSelectState = (stateId: string) => {
    router.push(`/exhibition/${stateId}`);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1814] dark:text-[#F5EFEB] pt-16 lg:pt-8 transition-colors duration-300">
      <Navigation onOpenInspector={() => setInspectorOpen(true)} />

      <FoodAcrossIndia onSelectState={handleSelectState} />

      <Footer onOpenInspector={() => setInspectorOpen(true)} />

      <TransformationInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
      />
    </main>
  );
}
