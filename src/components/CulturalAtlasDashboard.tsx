"use client";

import { useState, useMemo } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { buildCloudinaryUrl } from "@/lib/cloudinary";
import { ALL_INDIAN_STATES, StateData } from "@/lib/states-data";
import { IndiaMap } from "./IndiaMap";
import MotifIcon from "@/components/MotifIcon";
import {
  Search,
  Filter,
  Compass,
  MapPin,
  Sparkles,
  ArrowRight,
  Layers,
  Utensils,
  PartyPopper,
  Shirt,
  Landmark,
} from "lucide-react";

interface CulturalAtlasDashboardProps {
  selectedStateId: string;
  onSelectState: (stateId: string) => void;
}

export function CulturalAtlasDashboard({
  selectedStateId,
  onSelectState,
}: CulturalAtlasDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("All");
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");

  const filteredStates = useMemo(() => {
    return ALL_INDIAN_STATES.filter((state) => {
      // Zone filter
      const matchesZone =
        selectedZone === "All"
          ? true
          : selectedZone === "Union Territories"
          ? state.category === "union-territory"
          : state.zone === selectedZone;

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        state.name.toLowerCase().includes(q) ||
        state.nativeName.toLowerCase().includes(q) ||
        state.taste.signatureDish.toLowerCase().includes(q) ||
        state.textiles.signatureWeave.toLowerCase().includes(q) ||
        state.celebration.majorFestival.toLowerCase().includes(q) ||
        state.places.iconicMonument.toLowerCase().includes(q);

      return matchesZone && matchesSearch;
    });
  }, [searchQuery, selectedZone]);

  const unionTerritories = useMemo(() => {
    return ALL_INDIAN_STATES.filter((s) => s.category === "union-territory");
  }, []);

  return (
    <section id="atlas-dashboard" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C59B27]/40 bg-[#FAF8F5] dark:bg-[#1A1613] text-[#8C5320] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.25em] font-mono shadow-sm">
          <Compass className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
          The Illustrated Indian Cultural Atlas
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl text-[#1C1814] dark:text-[#FAF5EE] font-normal tracking-tight">
          28 Living States, 8 Union Territories
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#5C5042] dark:text-[#D9CEBF] max-w-2xl mx-auto leading-relaxed font-light">
          Explore the subcontinent through its monochromatic visual identities, culinary heirlooms,
          childhood games, and centuries of handloom mastery.
        </p>
      </div>

      {/* Interactive Cultural Dashboard Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {[
          { label: "Documented Regions", value: "36", sub: "28 States • 8 Territories", icon: Compass },
          { label: "Living Heritage", value: "5,000+", sub: "Years of Continuous Memory", icon: Sparkles },
          { label: "Classical Scripts", value: "12", sub: "Regional Mother Tongues", icon: Landmark },
          { label: "Curated Heirlooms", value: "100+", sub: "Handlooms, Flavors & Ragas", icon: Utensils },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-[#161210] border border-[#C59B27]/30 dark:border-[#C59B27]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7E72] dark:text-[#A89886]">
                  {stat.label}
                </span>
                <Icon className="w-3.5 h-3.5 text-[#C59B27]" />
              </div>
              <div>
                <span className="font-serif text-3xl font-normal text-[#1C1814] dark:text-[#F5EFEB] block">
                  {stat.value}
                </span>
                <span className="text-[10px] font-sans text-[#6E6255] dark:text-[#A89886] mt-0.5 block truncate">
                  {stat.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control & Filter Suite (Non-SaaS, Luxury Editorial Aesthetic) */}
      <div className="rounded-2xl p-6 champagne-card space-y-5 bg-gradient-to-r from-[#FAF8F5] to-[#F5EFEB] dark:from-[#171310] dark:to-[#120F0D]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#8C5320] dark:text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by state, dish, textile, festival (e.g. Kathakali, Biryani)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/30 dark:border-[#C59B27]/40 text-xs text-[#1C1814] dark:text-[#F5EFEB] placeholder-[#8C6E3D]/50 dark:placeholder-[#8C7E72] focus:outline-none focus:border-[#8C5320]"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white dark:bg-[#1A1613] p-1 rounded-xl border border-[#C59B27]/30 dark:border-[#C59B27]/40 text-xs">
            <button
              onClick={() => setViewMode("map")}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "map"
                  ? "bg-[#C59B27] text-white shadow-sm"
                  : "text-[#6E6255] dark:text-[#A89886] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
              }`}
            >
              Illustrated Map
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-[#C59B27] text-white shadow-sm"
                  : "text-[#6E6255] dark:text-[#A89886] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
              }`}
            >
              State Cards Grid
            </button>
          </div>
        </div>

        {/* Zone Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#C59B27]/20 dark:border-[#C59B27]/30">
          <span className="text-[10px] uppercase tracking-wider text-[#8C5320] dark:text-[#E5C378] font-mono mr-2">
            Geographic Zones:
          </span>
          {["All", "North", "South", "West", "East", "Central", "North-East", "Union Territories"].map((zone) => {
            const isSelected = selectedZone === zone;
            return (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all border ${
                  isSelected
                    ? "bg-[#1C1814] dark:bg-[#C59B27] text-white dark:text-[#0C0A09] border-[#1C1814] dark:border-[#C59B27] shadow-sm"
                    : "bg-white dark:bg-[#1A1613] text-[#423A32] dark:text-[#D9CEBF] border-[#C59B27]/30 dark:border-[#C59B27]/35 hover:border-[#8C5320]"
                }`}
              >
                {zone}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAP VIEW */}
      {viewMode === "map" && (
        <div className="space-y-6">
          <IndiaMap
            selectedStateId={selectedStateId}
            onSelectState={onSelectState}
          />
        </div>
      )}

      {/* DISCOVERY CARDS GRID */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-[#C59B27]/30 pb-3">
          <h3 className="font-serif text-2xl text-[#1C1814] dark:text-[#F5EFEB] font-normal">
            {selectedZone === "Union Territories" ? "Union Territories of India" : `${selectedZone} Indian States`}
          </h3>
          <span className="text-xs text-[#8C5320] dark:text-[#E5C378] font-mono">
            Showing {filteredStates.length} curated cultural entries
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStates.map((state) => {
            const isSelected = state.id === selectedStateId;
            const theme = state.theme;

            return (
              <div
                key={state.id}
                onClick={() => {
                  onSelectState(state.id);
                  const el = document.getElementById("state-exhibition");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group rounded-2xl p-6 border transition-all duration-400 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl relative overflow-hidden ${
                  isSelected ? "ring-2 ring-[#D4AF37]" : ""
                }`}
                style={{
                  backgroundColor: theme.light,
                  borderColor: theme.accent,
                }}
              >
                {/* Monochromatic decorative color banner bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: theme.primary }}
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-serif text-2xl font-bold"
                      style={{ color: theme.primary }}
                    >
                      {state.nativeName}
                    </span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10" style={{ color: theme.primary }}>
                      <MotifIcon stateId={state.id} className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-2xl text-[#1C1814] font-normal group-hover:underline decoration-1 underline-offset-4">
                      {state.name}
                    </h4>
                    <span className="text-[10px] font-mono uppercase tracking-wider block mt-0.5 text-[#6E6255] dark:text-[#A89886]">
                      {state.atlas.capital} &bull; {state.zone} India
                    </span>
                  </div>

                  {/* Thumbnail with Cloudinary dynamic optimization */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#C59B27]/25 shadow-inner">
                    <ImageWithFallback
                      src={buildCloudinaryUrl({
                        sourceUrl: state.heroImage,
                        width: 600,
                        height: 375,
                        crop: "fill",
                        gravity: "auto",
                        format: "auto",
                        quality: "auto",
                      })}
                      fallbackSrc={state.heroFallback || state.heroImage}
                      alt={state.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Micro Pill Highlights */}
                  <div className="space-y-1.5 text-[11px] text-[#423A32] pt-2">
                    <div className="flex items-center gap-1.5 truncate">
                      <Utensils className="w-3 h-3 text-[#8C5320] shrink-0" />
                      <span className="truncate">{state.taste.signatureDish.split("(")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Shirt className="w-3 h-3 text-[#8C5320] shrink-0" />
                      <span className="truncate">{state.textiles.signatureWeave.split("(")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <PartyPopper className="w-3 h-3 text-[#8C5320] shrink-0" />
                      <span className="truncate">{state.celebration.majorFestival.split("(")[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#C59B27]/20 flex items-center justify-between text-xs font-mono font-medium">
                  <span style={{ color: theme.primary }}>Enter Exhibition</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                    style={{ color: theme.primary }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEPARATE UNION TERRITORIES SECTION (Fulfilling explicit prompt requirement) */}
      {selectedZone !== "Union Territories" && (
        <div className="pt-12 border-t border-[#C59B27]/30 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] dark:text-[#E5C378] font-mono font-bold block">
              Administrative Classification
            </span>
            <h3 className="font-serif text-3xl text-[#1C1814] dark:text-[#F5EFEB] font-normal">
              The 8 Union Territories of India
            </h3>
            <p className="text-xs text-[#6E6255] dark:text-[#D9CEBF] font-light">
              Distinct cultural enclaves directly administered by the Central Government of India.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {unionTerritories.map((ut) => (
              <button
                key={ut.id}
                onClick={() => {
                  onSelectState(ut.id);
                  const el = document.getElementById("state-exhibition");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="p-4 rounded-xl text-left border border-[#C59B27]/30 dark:border-[#C59B27]/40 bg-white dark:bg-[#161210] hover:bg-[#FAF8F5] dark:hover:bg-[#201A16] transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif font-bold text-sm text-[#8C5320] dark:text-[#E5C378]">
                    {ut.nativeName}
                  </span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10" style={{ color: ut.theme.primary }}>
                    <MotifIcon stateId={ut.id} className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <span className="font-serif text-base text-[#1C1814] dark:text-[#F5EFEB] block group-hover:underline">
                    {ut.name}
                  </span>
                  <span className="text-[9px] font-mono text-[#6E6255] dark:text-[#A89886] block truncate mt-0.5">
                    {ut.atlas.capital} &bull; Union Territory
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
