"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ArchiveLens } from "@/components/ArchiveLens";
import { CloudinaryAIHeritageLab } from "@/components/CloudinaryAIHeritageLab";
import { Footer } from "@/components/Footer";
import { TransformationInspectorModal } from "@/components/TransformationInspectorModal";

export default function ArchiveLensPage() {
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1814] dark:text-[#F5EFEB] pt-16 lg:pt-8 transition-colors duration-300">
      <Navigation onOpenInspector={() => setInspectorOpen(true)} />

      <ArchiveLens />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-16">
        <CloudinaryAIHeritageLab />
      </div>

      <Footer onOpenInspector={() => setInspectorOpen(true)} />

      <TransformationInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
      />
    </main>
  );
}
