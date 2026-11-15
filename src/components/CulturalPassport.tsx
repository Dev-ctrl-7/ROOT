"use client";

import { useState, useEffect } from "react";
import { ALL_INDIAN_STATES } from "@/lib/states-data";
import { Award, CheckCircle, Sparkles, MapPin, Compass, RotateCcw } from "lucide-react";
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
        // Start completely clean with 0 default stamps
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
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#C59B27", "#5B0E1B", "#FAF8F5"],
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
      <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#1C1412] via-[#2A1D1A] to-[#1C1412] p-8 sm:p-12 text-[#FAF5EE] border-2 border-[#C59B27]/40 shadow-2xl relative overflow-hidden">
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

        {/* 36 Stamps Grid */}
        <div className="pt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Territorial Stamps ({stampedCount} Stamped)
            </span>
            {stampedCount > 0 && (
              <button
                onClick={handleResetPassport}
                className="text-[11px] font-mono text-[#E7DDCC]/60 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Passport
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ALL_INDIAN_STATES.map((state) => {
              const isStamped = stampedStateIds.includes(state.id);

              return (
                <div
                  key={state.id}
                  onClick={() => toggleStamp(state.id)}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all duration-300 relative select-none flex flex-col items-center justify-between min-h-[92px] ${
                    isStamped
                      ? "bg-[#C59B27]/15 border-[#D4AF37] shadow-inner"
                      : "bg-white/5 border-white/10 hover:border-[#C59B27]/40 hover:bg-white/10"
                  }`}
                >
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#E7DDCC]/60 truncate w-full">
                    {state.zone}
                  </span>

                  <div className="my-1">
                    <span className="font-serif text-xs font-medium text-white block truncate">
                      {state.name}
                    </span>
                    <span className="font-serif text-[10px] text-[#D4AF37] block opacity-85">
                      {state.nativeName}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isStamped
                        ? "bg-[#D4AF37] text-[#1C1412] font-bold"
                        : "text-[#E7DDCC]/40 border border-white/10"
                    }`}
                  >
                    {isStamped ? "✓ Stamped" : "+ Stamp"}
                  </span>
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
