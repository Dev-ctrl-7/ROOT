"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { CustomPostcardStudio } from "@/components/CustomPostcardStudio";
import { Footer } from "@/components/Footer";
import { TransformationInspectorModal } from "@/components/TransformationInspectorModal";

export default function PostcardPage() {
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1814] dark:text-[#F5EFEB] pt-16 lg:pt-8 transition-colors duration-300">
      <Navigation onOpenInspector={() => setInspectorOpen(true)} />

      <CustomPostcardStudio onOpenInspector={() => setInspectorOpen(true)} />

      <Footer onOpenInspector={() => setInspectorOpen(true)} />

      <TransformationInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
      />
    </main>
  );
}
