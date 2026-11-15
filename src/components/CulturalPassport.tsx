"use client";

import { useState, useEffect } from "react";
import { ALL_INDIAN_STATES } from "@/lib/states-data";
import { Award, RotateCcw } from "lucide-react";
import { STATE_ICON_MAP } from "@/components/MotifIcon";
import confetti from "canvas-confetti";

const PASSPORT_STORAGE_KEY = "roots_cultural_passport_stamps_v2";

interface CulturalPassportProps {
  onSelectState: (stateId: string) => void;
}

export function CulturalPassport({ onSelectState }: CulturalPassportProps) {
  const [stampedStateIds, setStampedStateIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      // Clean up legacy storage key that held default pre-stamped states
      localStorage.removeItem("roots_cultural_passport_stamps");

      const saved = localStorage.getItem(PASSPORT_STORAGE_KEY);
      if (saved) {
        setStampedStateIds(JSON.parse(saved));
      } else {
        // Start clean
        setStampedStateIds([]);
        localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify([]));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleStamp = (stateId: string) => {
    let next: string[];
    const isStamped = stampedStateIds.includes(stateId);

    if (isStamped) {
      next = stampedStateIds.filter((id) => id !== stateId);
    } else {
      next = [...stampedStateIds, stateId];
      // Celebrate new stamp
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.8 },
        colors: ["#C59B27", "#5B0E1B", "#FAF8F5", "#D4AF37"],
      });
    }

    setStampedStateIds(next);
    try {
      localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleResetPassport = () => {
    setStampedStateIds([]);
    try {
      localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify([]));
    } catch {
      // ignore
    }
  };

  const totalCount = ALL_INDIAN_STATES.length;
  const stampedCount = stampedStateIds.length;
  const percentage = Math.round((stampedCount / totalCount) * 100);

  return (
    <section id="cultural-passport" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-[#C59B27]/25">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 bg-[#FAF8F5] dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.25em] font-mono shadow-xs">
          <Award className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
          Visitor Living Archive Journal
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal tracking-tight">
          My Cultural Passport
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] max-w-xl mx-auto leading-relaxed font-light">
          Collect digital consular stamps for every region you explore across the museum. Stored securely in your browser.
        </p>
      </div>

      {/* Passport Credential Card */}
      <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#1C1412] via-[#2A1D1A] to-[#1C1412] p-6 sm:p-10 lg:p-12 text-[#FAF5EE] border-2 border-[#C59B27]/40 shadow-2xl relative overflow-hidden">
        {/* Background Emblem */}
        <div className="absolute right-0 top-0 w-80 h-80 opacity-[0.06] pointer-events-none select-none">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M100 20 L 120 70 L 180 80 L 135 120 L 150 180 L 100 150 L 50 180 L 65 120 L 20 80 L 80 70 Z" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#C59B27]/25">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] block">
              Official Cultural Passbook &bull; Republic of India
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#FAF5EE] mt-1">
              National Digital Heritage Passport
            </h3>
            <p className="text-xs text-[#E7DDCC]/70 font-mono mt-1">
              Bearer: Cultural Traveler &bull; Issued at: ROOTS Museum, 2026
            </p>
          </div>

          {/* Progress Gauge */}
          <div className="bg-[#FAF5EE]/10 backdrop-blur-xs p-4 rounded-2xl border border-[#C59B27]/30 flex flex-col items-center min-w-[170px]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
              Exploration Progress
            </span>
            <span className="font-serif text-3xl font-bold text-white mt-1">
              {stampedCount} / {totalCount}
            </span>
            <div className="w-full h-2 rounded-full bg-white/20 mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C59B27] to-[#D4AF37] rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#D4AF37] mt-1">{percentage}% Discovered</span>
          </div>
        </div>

        {/* 36 Stamps Matrix Grid */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Territorial Stamps ({stampedCount} Stamped &bull; Click to Flip)
            </span>
            {stampedCount > 0 && (
              <button
                onClick={handleResetPassport}
                className="text-[11px] font-mono text-[#E7DDCC]/60 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Passport
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {ALL_INDIAN_STATES.map((state) => {
              const isStamped = stampedStateIds.includes(state.id);
              const StateIcon = STATE_ICON_MAP[state.id] || Award;

              // Format clean display name for unusually long territory titles
              const isLongTitle = state.name.length > 20;

              return (
                <div
                  key={state.id}
                  className="group relative h-[134px] w-full"
                  style={{ perspective: "1000px" }}
                >
                  <div
                    onClick={() => toggleStamp(state.id)}
                    className="relative w-full h-full rounded-2xl cursor-pointer select-none"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isStamped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    title={`${state.name} — Click to ${isStamped ? "Unstamp" : "Stamp"}`}
                  >
                    {/* FRONT FACE (Unstamped) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#C59B27]/50 transition-all p-3 flex flex-col justify-between items-center text-center overflow-hidden shadow-xs"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#E7DDCC]/60 truncate w-full">
                        {state.zone}
                      </span>

                      <div className="my-auto w-full px-0.5">
                        <span
                          className={`font-serif font-medium text-white block ${
                            isLongTitle
                              ? "text-[10px] leading-tight line-clamp-2"
                              : "text-xs leading-snug truncate"
                          }`}
                        >
                          {state.name}
                        </span>
                        <span className="font-serif text-[10px] text-[#D4AF37] block truncate opacity-85 mt-0.5">
                          {state.nativeName}
                        </span>
                      </div>

                      <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[#E7DDCC]/45 border border-white/10 bg-white/5 group-hover:border-[#C59B27]/40 group-hover:text-[#D4AF37] transition-colors">
                        + Stamp
                      </span>
                    </div>

                    {/* BACK FACE (Stamped — Consular Seal with Distinct Non-Repeating Icon) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#261B15] via-[#332219] to-[#1C1410] p-2.5 flex flex-col items-center justify-between text-center overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {/* Decorative vintage postal stamp border */}
                      <div className="absolute inset-1 border border-dashed border-[#D4AF37]/35 rounded-xl pointer-events-none" />

                      {/* Header Micro-banner */}
                      <div className="relative z-10 flex items-center justify-between w-full px-1 text-[8px] font-mono tracking-widest text-[#D4AF37]">
                        <span>OFFICIAL</span>
                        <span>2026</span>
                      </div>

                      {/* Center: Unique Cultural State Icon Seal */}
                      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full px-0.5">
                        <div className="w-8 h-8 rounded-full border border-[#D4AF37] bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shadow-sm mb-1">
                          <StateIcon className="w-4 h-4" />
                        </div>
                        <span
                          className={`font-serif font-bold text-white block truncate w-full ${
                            isLongTitle ? "text-[10px] leading-tight" : "text-[11px] leading-snug"
                          }`}
                        >
                          {state.name}
                        </span>
                        <span className="font-serif text-[9px] text-[#D4AF37] block truncate w-full opacity-90">
                          {state.nativeName}
                        </span>
                      </div>

                      {/* Bottom Stamped Badge */}
                      <div className="relative z-10 pb-0.5">
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#D4AF37] text-[#1C1412] font-extrabold flex items-center gap-1 shadow-xs">
                          <span>✓</span> STAMPED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CulturalPassport;
