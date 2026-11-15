"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { StateExhibitionView } from "@/components/StateExhibitionView";
import { Footer } from "@/components/Footer";
import { TransformationInspectorModal } from "@/components/TransformationInspectorModal";
import { ALL_INDIAN_STATES, getStateById } from "@/lib/states-data";
import { BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ExhibitionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ExhibitionDetailPage({ params }: ExhibitionDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  const stateData = getStateById(resolvedParams.id) || getStateById("tamil-nadu") || ALL_INDIAN_STATES[0];

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1814] dark:text-[#F5EFEB] pt-16 lg:pt-8 transition-colors duration-300">
      <Navigation onOpenInspector={() => setInspectorOpen(true)} />

      {/* State Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-2">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161210] border border-[#C59B27]/30 dark:border-[#C59B27]/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/atlas"
              className="inline-flex items-center gap-1.5 text-xs font-serif text-[#5B0E1B] dark:text-[#E5C378] hover:text-[#7A1D26] px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1F1A16] border border-[#C59B27]/25 dark:border-[#C59B27]/40"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Atlas</span>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C59B27]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
                {stateData.name} ({stateData.nativeName})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-[#8C7E72]">
              Switch Territory:
            </span>
            <select
              value={stateData.id}
              onChange={(e) => router.push(`/exhibition/${e.target.value}`)}
              className="px-3 py-1.5 rounded-xl border border-[#C59B27]/40 bg-[#FAF8F5] text-xs font-serif text-[#1C1814] focus:outline-none"
            >
              <optgroup label="States (28)">
                {ALL_INDIAN_STATES.filter((s) => s.category === "state").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nativeName})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Union Territories (8)">
                {ALL_INDIAN_STATES.filter((s) => s.category === "union-territory").map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nativeName})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <StateExhibitionView
        stateData={stateData}
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
