"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { StateExhibitionView } from "@/components/StateExhibitionView";
import { Footer } from "@/components/Footer";
import { TransformationInspectorModal } from "@/components/TransformationInspectorModal";
import { ALL_INDIAN_STATES, getStateById } from "@/lib/states-data";
import { BookOpen, MapPin, Sparkles } from "lucide-react";

export default function ExhibitionPage() {
  const [selectedStateId, setSelectedStateId] = useState<string>("tamil-nadu");
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  const currentState = getStateById(selectedStateId) || ALL_INDIAN_STATES[0];

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1814] dark:text-[#F5EFEB] pt-16 lg:pt-8 transition-colors duration-300">
      <Navigation onOpenInspector={() => setInspectorOpen(true)} />

      {/* State Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-2">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161210] border border-[#C59B27]/30 dark:border-[#C59B27]/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-[#C59B27]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
              Select Regional Gallery:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none">
            <select
              value={selectedStateId}
              onChange={(e) => setSelectedStateId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#C59B27]/40 bg-[#FAF8F5] dark:bg-[#1F1A16] text-xs font-serif text-[#1C1814] dark:text-[#F5EFEB] focus:outline-none"
            >
              <optgroup label="States (28)">
                {ALL_INDIAN_STATES.filter((s) => s.category === "state").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nativeName}) — {s.zone}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Union Territories (8)">
                {ALL_INDIAN_STATES.filter((s) => s.category === "union-territory").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nativeName}) — {s.atlas.capital}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <StateExhibitionView
        stateData={currentState}
        onOpenInspector={() => setInspectorOpen(true)}
      />

      <Footer onOpenInspector={() => setInspectorOpen(true)} />

      <TransformationInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
      />
    </main>
  );
}
