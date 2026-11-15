"use client";

import { useState, useMemo } from "react";
import { ALL_INDIAN_STATES, StateData } from "@/lib/states-data";
import mapPathsData from "@/lib/india-map-paths.json";
import { Sparkles, MapPin, ArrowRight, Search, ZoomIn, ZoomOut, RotateCcw, Compass, Filter } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { useTheme } from "@/lib/theme/context";

interface IndiaMapProps {
  selectedStateId: string;
  onSelectState: (stateId: string) => void;
}

interface MapFeature {
  id: string;
  name: string;
  pathD: string;
  centroid: [number, number] | number[];
}

const MAP_PATHS = mapPathsData as unknown as Record<string, MapFeature>;

const STATE_ABBRS: Record<string, string> = {
  "arunachal-pradesh": "AR",
  "assam": "AS",
  "chandigarh": "CH",
  "karnataka": "KA",
  "manipur": "MN",
  "meghalaya": "ML",
  "mizoram": "MZ",
  "nagaland": "NL",
  "punjab": "PB",
  "rajasthan": "RJ",
  "sikkim": "SK",
  "tripura": "TR",
  "uttarakhand": "UK",
  "telangana": "TG",
  "bihar": "BR",
  "kerala": "KL",
  "madhya-pradesh": "MP",
  "andaman-and-nicobar": "AN",
  "gujarat": "GJ",
  "lakshadweep": "LD",
  "odisha": "OD",
  "dadra-and-nagar-haveli-and-daman-and-diu": "DN",
  "ladakh": "LA",
  "jammu-and-kashmir": "JK",
  "chhattisgarh": "CG",
  "delhi": "DL",
  "goa": "GA",
  "haryana": "HR",
  "himachal-pradesh": "HP",
  "jharkhand": "JH",
  "tamil-nadu": "TN",
  "uttar-pradesh": "UP",
  "west-bengal": "WB",
  "andhra-pradesh": "AP",
  "puducherry": "PY",
  "maharashtra": "MH",
};

const ZONES = [
  "All",
  "North",
  "South",
  "East",
  "West",
  "Central",
  "North-East",
  "Union Territories",
] as const;

export function IndiaMap({ selectedStateId, onSelectState }: IndiaMapProps) {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeState = useMemo(() => {
    const id = hoveredStateId || selectedStateId;
    if (!id) return null;
    return ALL_INDIAN_STATES.find((s) => s.id === id) || null;
  }, [hoveredStateId, selectedStateId]);

  // Filter states by zone and search query
  const filteredStates = useMemo(() => {
    return ALL_INDIAN_STATES.filter((state) => {
      const matchesZone =
        selectedZone === "All"
          ? true
          : selectedZone === "Union Territories"
          ? state.category === "union-territory"
          : state.zone === selectedZone;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        state.name.toLowerCase().includes(q) ||
        state.nativeName.toLowerCase().includes(q) ||
        state.atlas.capital.toLowerCase().includes(q) ||
        state.livingHeritage.traditionalCraft.toLowerCase().includes(q) ||
        state.taste.signatureDish.toLowerCase().includes(q);

      return matchesZone && matchesSearch;
    });
  }, [selectedZone, searchQuery]);

  const filteredIds = useMemo(() => {
    return new Set(filteredStates.map((s) => s.id));
  }, [filteredStates]);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(0.85, prev + delta), 2.2));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="w-full rounded-3xl champagne-card p-6 sm:p-10 relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FAF6F0] to-[#F5EFEB] border border-[#C59B27]/25 shadow-xl">
      {/* Background Indian Arch Motif Watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 10 C 60 10, 20 45, 20 90 L 20 190 L 180 190 L 180 90 C 180 45, 140 10, 100 10 Z" />
        </svg>
      </div>

      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#C59B27]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-[#C59B27]/10 text-[#5B0E1B] border border-[#C59B27]/30 mb-2">
            <Compass className="w-3.5 h-3.5 text-[#C59B27]" />
            Cartographic Cultural Atlas • 28 States & 8 Union Territories
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2C241E] tracking-tight">
            Explore India Through Living Heritage
          </h2>
        </div>

        {/* Search input */}
        <div className="relative min-w-[260px] sm:min-w-[320px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7E72]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state, capital, craft or dish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm bg-white/90 dark:bg-[#1A1613] border border-[#C59B27]/30 dark:border-[#C59B27]/40 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50 placeholder:text-[#9E8E80] dark:placeholder:text-[#8C7E72] text-[#2C241E] dark:text-[#F5EFEB] shadow-sm font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C7E72] hover:text-[#2C241E]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Zone Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none border-b border-[#C59B27]/15">
        <Filter className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mr-1" />
        <span className="text-xs font-mono uppercase tracking-wider text-[#6E6255] mr-2 shrink-0">
          Zone:
        </span>
        {ZONES.map((zone) => {
          const isSelected = selectedZone === zone;
          const count =
            zone === "All"
              ? ALL_INDIAN_STATES.length
              : zone === "Union Territories"
              ? ALL_INDIAN_STATES.filter((s) => s.category === "union-territory").length
              : ALL_INDIAN_STATES.filter((s) => s.zone === zone).length;

          return (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-1.5 rounded-full text-xs font-sans tracking-wide shrink-0 transition-all duration-200 border ${
                isSelected
                  ? "bg-[#5B0E1B] text-white border-[#5B0E1B] dark:bg-[#C59B27] dark:text-[#0C0A09] dark:border-[#C59B27] shadow-sm font-medium"
                  : "bg-white/70 dark:bg-[#1A1613] text-[#54483C] dark:text-[#D9CEBF] border-[#C59B27]/25 dark:border-[#C59B27]/35 hover:border-[#C59B27] hover:bg-white dark:hover:bg-[#251F1A]"
              }`}
            >
              {zone} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Grid: Map Canvas + Dossier Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
        {/* Left Side: Authentic Surveyed SVG Map Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[580px] aspect-[800/880] rounded-2xl border border-[#C59B27]/30 dark:border-[#C59B27]/40 p-2 sm:p-4 bg-gradient-to-b from-[#FFFDF9] to-[#F7F2EA] dark:from-[#181411] dark:to-[#100D0B] shadow-inner overflow-hidden">
            
            {/* Map Controls Overlay (Zoom & Reset) */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 bg-white/90 dark:bg-[#1C1714]/90 backdrop-blur-sm p-1.5 rounded-xl border border-[#C59B27]/30 dark:border-[#C59B27]/40 shadow-md">
              <button
                onClick={() => handleZoom(0.2)}
                title="Zoom In"
                aria-label="Zoom In"
                className="p-2 text-[#5B0E1B] dark:text-[#E5C378] hover:bg-[#FAF8F5] dark:hover:bg-[#251F1A] rounded-lg transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleZoom(-0.2)}
                title="Zoom Out"
                aria-label="Zoom Out"
                className="p-2 text-[#5B0E1B] dark:text-[#E5C378] hover:bg-[#FAF8F5] dark:hover:bg-[#251F1A] rounded-lg transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset View"
                aria-label="Reset View"
                className="p-2 text-[#5B0E1B] dark:text-[#E5C378] hover:bg-[#FAF8F5] dark:hover:bg-[#251F1A] rounded-lg transition-colors border-t border-[#C59B27]/20 dark:border-[#C59B27]/35"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Micro instruction badge */}
            <div className="absolute bottom-3 left-4 z-10 text-[10px] uppercase tracking-widest text-[#6E6255] dark:text-[#A89886] font-mono flex items-center gap-1.5 bg-white/80 dark:bg-[#1A1613]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#C59B27]/20 dark:border-[#C59B27]/35">
              <span className="w-2 h-2 rounded-full bg-[#C59B27] animate-pulse"></span>
              Click any region to enter exhibition
            </div>

            {/* SVG India Map with Surveyed Boundaries */}
            <svg
              viewBox="0 0 800 880"
              className="w-full h-full filter drop-shadow-sm select-none"
              style={{
                transform: `scale(${zoomLevel}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: "center center",
                transition: "transform 0.25s ease-out",
                overflow: "visible",
              }}
            >
              <defs>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0.77  0 1 0 0 0.6  0 0 1 0 0.15  0 0 0 1 0"
                  />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Render all 36 Authentic Regions */}
              {Object.entries(MAP_PATHS).map(([stateId, feature]) => {
                const stateData = ALL_INDIAN_STATES.find((s) => s.id === stateId);
                const isSelected = selectedStateId === stateId;
                const isHovered = hoveredStateId === stateId;
                const matchesFilter = filteredIds.has(stateId);
                const theme = stateData?.theme;
                const abbr = STATE_ABBRS[stateId] || feature.name.substring(0, 2).toUpperCase();

                // Dynamic editorial color calculation
                let fillColor = isDark ? "#221C18" : "#FAF4EC";
                if (isSelected) {
                  fillColor = theme?.primary || "#5B0E1B";
                } else if (isHovered) {
                  fillColor = theme?.secondary || "#8C1D2F";
                } else if (!matchesFilter) {
                  fillColor = isDark ? "#14100D" : "#F0EBE3";
                }

                const strokeColor = isSelected
                  ? "#D4AF37"
                  : isHovered
                  ? "#C59B27"
                  : matchesFilter
                  ? "rgba(197, 155, 39, 0.45)"
                  : "rgba(197, 155, 39, 0.2)";

                const opacity = matchesFilter ? 1 : 0.35;

                return (
                  <g
                    key={stateId}
                    className="cursor-pointer transition-opacity duration-200"
                    opacity={opacity}
                    onMouseEnter={() => setHoveredStateId(stateId)}
                    onMouseLeave={() => setHoveredStateId(null)}
                    onClick={() => {
                      onSelectState(stateId);
                      const el = document.getElementById("state-exhibition");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {/* State Silhouette Boundary Path */}
                    <path
                      d={feature.pathD}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 1.8 : 0.9}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      className="transition-colors duration-200"
                      filter={isSelected ? "url(#goldGlow)" : undefined}
                    >
                      <title>{`${feature.name} (${stateData?.nativeName || ""})`}</title>
                    </path>

                    {/* Regional Centroid Label Marker */}
                    {feature.centroid && feature.centroid[0] > 0 && (
                      <g
                        transform={`translate(${feature.centroid[0]}, ${feature.centroid[1]})`}
                        className="pointer-events-none"
                      >
                        <circle
                          r={isSelected ? 10 : 7}
                          fill={isSelected ? "#D4AF37" : theme?.primary || "#C59B27"}
                          stroke="#FAF8F5"
                          strokeWidth={isSelected ? 1.5 : 1}
                        />
                        <text
                          y={3}
                          textAnchor="middle"
                          fontSize={isSelected ? "8" : "6.5"}
                          fontWeight="bold"
                          fill="#FFFFFF"
                          fontFamily="sans-serif"
                        >
                          {abbr}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Side: Curatorial State Dossier Card */}
        <div className="lg:col-span-5 space-y-6">
          {activeState ? (
            <div
              className="p-6 sm:p-8 rounded-2xl border transition-all duration-500 shadow-xl relative overflow-hidden"
              style={{
                backgroundColor: activeState.theme.light,
                borderColor: activeState.theme.accent,
              }}
            >
              {/* Top Badge: Zone & Category */}
              <div className="flex items-center justify-between pb-3 border-b border-[#C59B27]/25">
                <span className="text-xs font-mono uppercase tracking-widest text-[#6E6255]">
                  {activeState.category === "union-territory"
                    ? "Union Territory"
                    : `${activeState.zone} India`}
                </span>
                <span className="text-xs font-mono text-[#8C7E72]">
                  {activeState.atlas.capital} • {activeState.atlas.coordinates}
                </span>
              </div>

              {/* State Title & Native Name */}
              <div className="pt-4 pb-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3
                    className="font-serif text-3xl sm:text-4xl font-normal tracking-tight"
                    style={{ color: activeState.theme.primary }}
                  >
                    {activeState.name}
                  </h3>
                  <span className="font-serif text-xl text-[#7A6A58] opacity-80">
                    {activeState.nativeName}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#8C7E72] mt-0.5">
                  Script: {activeState.nativeScript} • Palette: {activeState.theme.paletteName}
                </p>
              </div>

              {/* Epoch & Curatorial Statement */}
              <p className="text-xs font-mono text-[#C59B27] uppercase tracking-wider mb-2">
                {activeState.epoch}
              </p>
              <p className="text-sm text-[#423A32] font-serif italic leading-relaxed mb-4">
                &ldquo;{activeState.introduction}&rdquo;
              </p>

              {/* Preview Photo */}
              <div className="relative w-full h-36 rounded-xl overflow-hidden mb-5 border border-[#C59B27]/30 shadow-md">
                <ImageWithFallback
                  src={activeState.heroImage}
                  fallbackSrc={activeState.heroFallback}
                  alt={activeState.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-sans tracking-wide">
                    Signature Dish: {activeState.taste.signatureDish}
                  </span>
                </div>
              </div>

              {/* Curated Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2 pb-4 border-t border-[#C59B27]/20">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8C7E72] block">
                    Living Craft
                  </span>
                  <span className="font-sans text-[#2C241E] font-medium line-clamp-1">
                    {activeState.livingHeritage.traditionalCraft}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8C7E72] block">
                    Art Form
                  </span>
                  <span className="font-sans text-[#2C241E] font-medium line-clamp-1">
                    {activeState.livingHeritage.artForm}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8C7E72] block">
                    Major Rivers
                  </span>
                  <span className="font-sans text-[#2C241E] font-medium line-clamp-1">
                    {activeState.atlas.majorRivers.join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8C7E72] block">
                    Sacred Pinnacle
                  </span>
                  <span className="font-sans text-[#2C241E] font-medium line-clamp-1">
                    {activeState.livingHeritage.architecturalPinnacle}
                  </span>
                </div>
              </div>

              {/* Action Button: Enter Exhibition */}
              <button
                onClick={() => {
                  onSelectState(activeState.id);
                  const el = document.getElementById("state-exhibition");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3.5 px-6 rounded-xl text-white font-serif text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:brightness-110"
                style={{ backgroundColor: activeState.theme.primary }}
              >
                <span>Immerse in {activeState.name} Exhibition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-2xl border border-[#C59B27]/30 dark:border-[#C59B27]/40 bg-white/90 dark:bg-[#161210]/95 shadow-xl relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#C59B27]/25">
                <span className="text-xs font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
                  Living Cartography of India
                </span>
                <span className="text-xs font-mono text-[#8C7E72] dark:text-[#A89886]">
                  36 Territories
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl font-normal text-[#1C1814] dark:text-[#F5EFEB] tracking-tight">
                  Select Any Territory
                </h3>
                <p className="text-xs font-mono text-[#C59B27] uppercase tracking-wider mt-1">
                  Hover or click on the map to inspect
                </p>
              </div>

              <p className="text-sm text-[#423A32] dark:text-[#D9CEBF] font-serif italic leading-relaxed">
                &ldquo;India is an ancient continuum of 28 states and 8 union territories. Touch any land on the atlas to explore its monochromatic soul, handlooms, sacred flavors, and architectural marvels.&rdquo;
              </p>

              <div className="space-y-2 pt-2 border-t border-[#C59B27]/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] dark:text-[#A89886] block">
                  Quick State Entries:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: "tamil-nadu", name: "Tamil Nadu", native: "தமிழ்நாடு", capital: "Chennai" },
                    { id: "kerala", name: "Kerala", native: "കേരളം", capital: "Thiruvananthapuram" },
                    { id: "rajasthan", name: "Rajasthan", native: "राजस्थान", capital: "Jaipur" },
                    { id: "punjab", name: "Punjab", native: "ਪੰਜਾਬ", capital: "Chandigarh" },
                    { id: "west-bengal", name: "West Bengal", native: "পশ্চিমবঙ্গ", capital: "Kolkata" },
                    { id: "ladakh", name: "Ladakh", native: "ལ་དྭགས", capital: "Leh" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectState(item.id);
                        const el = document.getElementById("state-exhibition");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1613] hover:bg-[#FAF5EE] dark:hover:bg-[#251F1A] border border-[#C59B27]/25 dark:border-[#C59B27]/35 text-left transition-all group"
                    >
                      <span className="font-serif font-medium text-[#1C1814] dark:text-[#F5EFEB] block group-hover:text-[#5B0E1B] dark:group-hover:text-[#D4AF37]">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#8C7E72] dark:text-[#A89886] block">
                        {item.native} • {item.capital}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default IndiaMap;
