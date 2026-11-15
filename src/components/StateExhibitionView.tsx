"use client";

import { useState } from "react";
import { StateData } from "@/lib/states-data";
import { buildCloudinaryUrl, buildStatePostcardUrl } from "@/lib/cloudinary";
import { ImageWithFallback } from "./ImageWithFallback";
import MotifIcon from "@/components/MotifIcon";
import {
  Sparkles,
  Utensils,
  Gamepad2,
  Shirt,
  PartyPopper,
  Landmark,
  Feather,
  MapPin,
  Download,
  Send,
  SlidersHorizontal,
  Compass,
  ArrowRight,
  ChevronRight,
  Quote,
} from "lucide-react";
import confetti from "canvas-confetti";

interface StateExhibitionViewProps {
  stateData: StateData;
  onOpenInspector: () => void;
}

export function StateExhibitionView({ stateData, onOpenInspector }: StateExhibitionViewProps) {
  const [activeTab, setActiveTab] = useState<
    "intro" | "taste" | "games" | "textiles" | "celebration" | "places" | "living" | "postcard"
  >("intro");

  // Postcard Studio state within the state page
  const [recipient, setRecipient] = useState<string>("To someone longing for home,");
  const [message, setMessage] = useState<string>(
    `Sending you the aroma of ${stateData.taste.iconicIngredients[0]} and the melody of ${stateData.celebration.folkMusic.split(" ")[0]} from ${stateData.name}.`
  );
  const [sender, setSender] = useState<string>("With affection, A Traveler");
  const [postcardFilter, setPostcardFilter] = useState<"monochromatic" | "sepia" | "golden" | "natural">("monochromatic");
  const [sentPostcard, setSentPostcard] = useState<boolean>(false);

  const theme = stateData.theme;

  // Cloudinary Monochromatic Transformed Hero
  const transformedHeroUrl = buildCloudinaryUrl({
    sourceUrl: stateData.heroImage,
    width: 1600,
    height: 900,
    crop: "fill",
    gravity: "auto",
    format: "auto",
    quality: "auto",
    tintHex: theme.cloudinaryTint,
  });

  // Cloudinary Gallery Transformations for Cultural Pillars
  const transformedTasteUrl = buildCloudinaryUrl({
    sourceUrl: stateData.taste.heroImage,
    width: 1000,
    height: 750,
    crop: "fill",
    gravity: "auto",
    format: "auto",
    quality: "auto",
  });

  const transformedTextilesUrl = buildCloudinaryUrl({
    sourceUrl: stateData.textiles.heroImage,
    width: 1000,
    height: 750,
    crop: "fill",
    gravity: "auto",
    format: "auto",
    quality: "auto",
  });

  const transformedCelebrationUrl = buildCloudinaryUrl({
    sourceUrl: stateData.celebration.heroImage,
    width: 1000,
    height: 750,
    crop: "fill",
    gravity: "auto",
    format: "auto",
    quality: "auto",
  });

  const transformedPlacesUrl = buildCloudinaryUrl({
    sourceUrl: stateData.places.heroImage,
    width: 1000,
    height: 750,
    crop: "fill",
    gravity: "auto",
    format: "auto",
    quality: "auto",
  });

  // Cloudinary Postcard URL
  const statePostcardUrl = buildStatePostcardUrl({
    imageUrl: stateData.places.heroImage,
    stateName: stateData.name,
    nativeStateName: stateData.nativeName,
    recipient,
    message,
    sender,
    tintHex: postcardFilter === "monochromatic" ? theme.cloudinaryTint : undefined,
    filter: postcardFilter,
  });

  const handleSendPostcard = () => {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: [theme.primary, theme.accent, "#FAF8F5", "#D4AF37"],
    });
    setSentPostcard(true);
    setTimeout(() => setSentPostcard(false), 4000);
  };

  const handleDownloadPostcard = () => {
    const link = document.createElement("a");
    link.href = statePostcardUrl;
    link.target = "_blank";
    link.download = `roots-${stateData.id}-postcard.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="state-exhibition"
      className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-16"
      style={{
        color: "#1C1814",
      }}
    >
      {/* 1. STATE INTRODUCTION & MASTHEAD */}
      <div
        className="rounded-3xl p-8 sm:p-12 lg:p-16 border relative overflow-hidden shadow-2xl transition-all duration-700"
        style={{
          backgroundColor: theme.light,
          borderColor: theme.accent,
        }}
      >
        {/* Decorative background vector motif */}
        <div className="absolute top-4 right-6 w-48 h-48 opacity-[0.06] pointer-events-none select-none flex items-center justify-end">
          <MotifIcon stateId={stateData.id} className="w-40 h-40" color={theme.primary} />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span
              className="px-3.5 py-1.5 rounded-full font-semibold uppercase tracking-widest text-white shadow-sm"
              style={{ backgroundColor: theme.primary }}
            >
              {stateData.zone} India
            </span>
            <span className="text-[#8C5320]">&bull;</span>
            <span className="font-semibold text-[#8C5320] uppercase tracking-wider">
              Capital: {stateData.atlas.capital}
            </span>
            <span className="text-[#8C5320]">&bull;</span>
            <span className="text-[#6E6255]">{stateData.epoch}</span>
          </div>

          <div className="space-y-2">
            <span
              className="font-serif text-4xl sm:text-5xl font-bold block"
              style={{ color: theme.primary }}
            >
              {stateData.nativeName}
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#1C1814] font-normal tracking-tight">
              {stateData.name}
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#423A32] font-light leading-relaxed max-w-3xl">
            {stateData.introduction}
          </p>

          <div
            className="border-l-2 pl-4 py-1.5 italic font-serif text-sm sm:text-base bg-white/70 rounded-r-lg pr-4"
            style={{ borderColor: theme.accent, color: "#1C1814" }}
          >
            <Quote className="w-4 h-4 inline mr-2 opacity-70" style={{ color: theme.primary }} />
            {stateData.curatorQuote}
            <span
              className="block mt-1 text-xs not-italic font-sans font-medium"
              style={{ color: theme.primary }}
            >
              — {stateData.curatorAuthor}
            </span>
          </div>
        </div>

        {/* State Cloudinary Hero Image Banner */}
        <div className="mt-10 relative aspect-[21/9] rounded-2xl overflow-hidden border border-[#C59B27]/30 shadow-2xl group">
          <ImageWithFallback
            src={transformedHeroUrl}
            fallbackSrc={stateData.heroFallback || stateData.heroImage}
            alt={stateData.name}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85" />

          {/* Cloudinary Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 text-[10px] font-mono text-[#1C1814] flex items-center gap-1.5 shadow-md">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: theme.primary }}
            />
            <span>Cloudinary Monochromatic Filter: e_tint:60:{theme.cloudinaryTint}, f_auto, q_auto</span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs font-mono">
            <span>Capital: {stateData.atlas.capital}</span>
            <span>Coordinates: {stateData.atlas.coordinates}</span>
          </div>
        </div>
      </div>

      {/* 2. EIGHT CULTURAL PILLARS NAVIGATOR */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-[#C59B27]/25 pb-4 overflow-x-auto gap-2">
          {[
            { id: "intro", label: "Overview", icon: Compass },
            { id: "taste", label: "The Taste of Home", icon: Utensils },
            { id: "games", label: "Traditional Games", icon: Gamepad2 },
            { id: "textiles", label: "Woven in Tradition", icon: Shirt },
            { id: "celebration", label: "Spirit of Celebration", icon: PartyPopper },
            { id: "places", label: "Places That Tell Stories", icon: Landmark },
            { id: "living", label: "Living Heritage", icon: Feather },
            { id: "postcard", label: "Cloudinary Postcard Studio", icon: Send },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all duration-300 border ${
                  isSelected
                    ? "text-white shadow-md border-transparent"
                    : "bg-[#FAF8F5] text-[#423A32] border-[#C59B27]/30 hover:border-[#C59B27] hover:bg-white"
                }`}
                style={{
                  backgroundColor: isSelected ? theme.primary : undefined,
                  borderColor: isSelected ? theme.primary : undefined,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* PILLAR 1: OVERVIEW & ILLUSTRATED ATLAS */}
        {activeTab === "intro" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fade-in">
            <div className="md:col-span-6 space-y-6">
              <div className="p-8 rounded-2xl champagne-card space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                  Cultural Topography
                </span>
                <h3 className="font-serif text-2xl text-[#1C1814] font-normal">
                  Rivers, Ranges & Sacred Coordinates
                </h3>

                <div className="space-y-3 text-xs text-[#423A32]">
                  <div>
                    <strong className="text-[#1C1814]">Major Lifeline Rivers:</strong>{" "}
                    {stateData.atlas.majorRivers.join(", ")}
                  </div>
                  <div>
                    <strong className="text-[#1C1814]">Mountain Systems:</strong>{" "}
                    {stateData.atlas.mountainRanges.join(", ")}
                  </div>
                  <div>
                    <strong className="text-[#1C1814]">Official Language:</strong>{" "}
                    {stateData.livingHeritage.regionalLanguage}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C59B27]/20">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-2">
                    Key Historical Epochs:
                  </span>
                  <p className="text-xs text-[#423A32] leading-relaxed font-light">
                    {stateData.epoch}
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-2xl champagne-card space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                  Oral Tradition & Folklore
                </span>
                <h3 className="font-serif text-xl text-[#1C1814] font-normal">
                  The Living Voice
                </h3>
                <p className="text-xs text-[#423A32] leading-relaxed font-serif italic border-l-2 pl-4 border-[#C59B27]">
                  &ldquo;{stateData.livingHeritage.oralLegend}&rdquo;
                </p>
              </div>
            </div>

            <div className="md:col-span-6 space-y-4">
              <div className="p-8 rounded-2xl champagne-card space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                  Highlighted Landmarks
                </span>
                <h3 className="font-serif text-2xl text-[#1C1814] font-normal">
                  Centuries Carved in Stone
                </h3>

                <div className="space-y-4">
                  {stateData.atlas.culturalLandmarks.map((landmark, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/70 border border-[#C59B27]/20 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-serif font-bold text-sm text-[#1C1814]">{landmark.name}</span>
                        <span className="text-[10px] text-[#8C5320] font-mono">{landmark.coordinates}</span>
                      </div>
                      <p className="text-xs text-[#423A32] font-light leading-relaxed">
                        {landmark.significance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 2: THE TASTE OF HOME */}
        {activeTab === "taste" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="md:col-span-6 space-y-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                Pillar 02 &bull; The Taste of Home
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1814] font-normal">
                {stateData.taste.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#423A32] leading-relaxed font-light">
                {stateData.taste.foodStory}
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Signature Regional Dish
                  </span>
                  <span className="font-serif text-base font-bold text-[#1C1814] block">
                    {stateData.taste.signatureDish}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Famous Traditional Sweet
                  </span>
                  <span className="font-serif text-base font-bold text-[#1C1814] block">
                    {stateData.taste.famousSweet}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Quintessential Breakfast
                  </span>
                  <span className="font-serif text-base font-bold text-[#1C1814] block">
                    {stateData.taste.traditionalBreakfast}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-2">
                  Iconic Kitchen Ingredients:
                </span>
                <div className="flex flex-wrap gap-2">
                  {stateData.taste.iconicIngredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white border border-[#C59B27]/30 text-[#1C1814]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C59B27]/30 shadow-2xl group">
                <ImageWithFallback
                  src={transformedTasteUrl}
                  fallbackSrc={stateData.taste.heroImage}
                  alt={stateData.taste.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white italic font-serif">
                  {stateData.taste.heroCaption}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 3: GAMES WE GREW UP WITH */}
        {activeTab === "games" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="md:col-span-6 space-y-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                Pillar 03 &bull; Games We Grew Up With
              </span>
              <div className="space-y-1">
                <span className="text-xl font-serif text-[#8C5320]">{stateData.games.localName}</span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1814] font-normal">
                  {stateData.games.name}
                </h3>
              </div>

              <div className="inline-block px-3 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-white border border-[#C59B27]/30 text-[#8C5320]">
                Category: {stateData.games.category}
              </div>

              <div className="p-6 rounded-2xl champagne-card space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block">
                  Board & Playing Equipment
                </span>
                <p className="text-xs text-[#1C1814] font-medium">
                  {stateData.games.boardType}
                </p>

                <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block pt-2">
                  Rules of Play
                </span>
                <p className="text-xs text-[#423A32] leading-relaxed font-light">
                  {stateData.games.instructions}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 border border-[#C59B27]/20 text-xs text-[#423A32]">
                <strong className="text-[#1C1814]">Cultural Significance:</strong>{" "}
                {stateData.games.culturalSignificance}
              </div>
            </div>

            <div className="md:col-span-6">
              {/* Illustrated Traditional Game Board Graphic */}
              <div className="rounded-2xl p-8 border border-[#C59B27]/30 bg-gradient-to-br from-[#FAF8F5] to-[#F5EFEB] shadow-xl flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#8C5320] font-mono">
                  Traditional Game Board Architecture
                </span>

                <div className="w-56 h-56 rounded-xl border-4 border-double border-[#C59B27] p-4 flex items-center justify-center bg-white shadow-inner relative">
                  {stateData.games.illustratedBoardSvgType === "mancala" ? (
                    <div className="grid grid-cols-7 gap-2 w-full">
                      {Array.from({ length: 14 }).map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-[#FAF5EE] border border-[#C59B27] flex items-center justify-center text-[8px] font-mono text-[#8C5320]">
                          4
                        </div>
                      ))}
                    </div>
                  ) : stateData.games.illustratedBoardSvgType === "cross_circle" ? (
                    <div className="w-36 h-36 relative border border-[#C59B27]">
                      <div className="absolute inset-0 m-auto w-12 h-12 border border-[#C59B27] bg-[#FAF5EE] flex items-center justify-center text-[9px] font-mono text-[#8C5320]">
                        HOME
                      </div>
                      <div className="absolute top-0 bottom-0 left-0 right-0 border-t border-b border-l border-r border-[#C59B27]/40"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-1 w-32 h-32 border border-[#C59B27] p-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="border border-[#C59B27]/40 bg-[#FAF8F5]"></div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-xs font-serif italic text-[#423A32]">
                  Authentic heritage game board passed down through generations
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 4: WOVEN IN TRADITION */}
        {activeTab === "textiles" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="md:col-span-6 space-y-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                Pillar 04 &bull; Woven in Tradition
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1814] font-normal">
                {stateData.textiles.signatureWeave}
              </h3>
              <p className="text-xs sm:text-sm text-[#423A32] leading-relaxed font-light">
                {stateData.textiles.historicalOrigins}
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Traditional Attire
                  </span>
                  <span className="font-serif text-base font-bold text-[#1C1814] block">
                    {stateData.textiles.traditionalAttire}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Heirloom Jewelry
                  </span>
                  <span className="font-serif text-base font-bold text-[#1C1814] block">
                    {stateData.textiles.heirloomJewelry}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Master Craft Technique
                  </span>
                  <p className="text-xs text-[#423A32] leading-relaxed">
                    {stateData.textiles.craftTechnique}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C59B27]/30 shadow-2xl group">
                <ImageWithFallback
                  src={transformedTextilesUrl}
                  fallbackSrc={stateData.textiles.heroImage}
                  alt={stateData.textiles.signatureWeave}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white italic font-serif">
                  {stateData.textiles.heroCaption}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 5: THE SPIRIT OF CELEBRATION */}
        {activeTab === "celebration" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="md:col-span-6 space-y-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                Pillar 05 &bull; The Spirit of Celebration
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1814] font-normal">
                {stateData.celebration.majorFestival}
              </h3>
              <p className="text-xs sm:text-sm text-[#423A32] leading-relaxed font-light">
                {stateData.celebration.celebrationRitual}
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Classical / Folk Dance Form
                  </span>
                  <span className="font-serif text-base font-bold text-[#1C1814] block">
                    {stateData.celebration.danceForm}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Folk Music & Traditional Instruments
                  </span>
                  <p className="text-xs text-[#423A32] leading-relaxed">
                    {stateData.celebration.folkMusic}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C59B27]/30 shadow-2xl group">
                <ImageWithFallback
                  src={transformedCelebrationUrl}
                  fallbackSrc={stateData.celebration.heroImage}
                  alt={stateData.celebration.majorFestival}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white italic font-serif">
                  {stateData.celebration.heroCaption}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 6: PLACES THAT TELL STORIES */}
        {activeTab === "places" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="md:col-span-6 space-y-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                Pillar 06 &bull; Places That Tell Stories
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1814] font-normal">
                {stateData.places.iconicMonument}
              </h3>
              <p className="text-xs sm:text-sm text-[#423A32] leading-relaxed font-light">
                {stateData.places.architecturalStyle}
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Natural Wonder
                  </span>
                  <span className="font-serif text-base font-bold text-[#1C1814] block">
                    {stateData.places.naturalWonder}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white/80 border border-[#C59B27]/25">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Hidden Heritage Sanctuary
                  </span>
                  <p className="text-xs text-[#423A32] leading-relaxed">
                    {stateData.places.hiddenHeritage}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C59B27]/30 shadow-2xl group">
                <ImageWithFallback
                  src={transformedPlacesUrl}
                  fallbackSrc={stateData.places.heroImage}
                  alt={stateData.places.iconicMonument}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-white italic font-serif">
                  {stateData.places.heroCaption}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 7: LIVING HERITAGE */}
        {activeTab === "living" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fade-in">
            <div className="md:col-span-6 space-y-4">
              <div className="p-8 rounded-2xl champagne-card space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                  GI-Tagged Craft Mastery
                </span>
                <h4 className="font-serif text-2xl text-[#1C1814]">
                  {stateData.livingHeritage.traditionalCraft}
                </h4>
              </div>

              <div className="p-8 rounded-2xl champagne-card space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                  Visual Art Tradition
                </span>
                <h4 className="font-serif text-2xl text-[#1C1814]">
                  {stateData.livingHeritage.artForm}
                </h4>
              </div>
            </div>

            <div className="md:col-span-6 space-y-4">
              <div className="p-8 rounded-2xl champagne-card space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                  Architectural Pinnacle
                </span>
                <p className="text-sm text-[#423A32] leading-relaxed font-light">
                  {stateData.livingHeritage.architecturalPinnacle}
                </p>
              </div>

              <div className="p-8 rounded-2xl champagne-card space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block">
                  Living Oral Legend
                </span>
                <p className="text-sm text-[#423A32] leading-relaxed font-serif italic border-l-2 pl-4 border-[#C59B27]">
                  &ldquo;{stateData.livingHeritage.oralLegend}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 8: CLOUDINARY POSTCARD STUDIO */}
        {activeTab === "postcard" && (
          <div className="p-8 rounded-3xl border border-[#C59B27]/30 bg-[#FAF8F5] shadow-2xl animate-fade-in">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C5320] font-mono font-bold block mb-2">
                Cloudinary Cultural Bureau
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1814]">
                Send a Postcard from {stateData.name}
              </h3>
              <p className="text-xs text-[#6E6255] mt-1 font-light">
                Synthesized dynamically via Cloudinary edge text overlay & monochromatic filters
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Input Form */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Recipient Dedication
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C59B27]/30 text-xs text-[#1C1814] focus:outline-none focus:border-[#8C5320]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    A Memory of {stateData.name}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={140}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C59B27]/30 text-xs text-[#1C1814] focus:outline-none focus:border-[#8C5320] resize-none font-serif"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Your Signature
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    maxLength={30}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#C59B27]/30 text-xs text-[#1C1814] focus:outline-none focus:border-[#8C5320]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8C5320] font-mono block mb-1">
                    Cloudinary Transformation Filter
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: "monochromatic", label: `Monochromatic (${theme.paletteName.split("&")[0]})` },
                      { id: "golden", label: "Golden Hour (e_sat)" },
                      { id: "sepia", label: "Sepia 70 (e_sepia)" },
                      { id: "natural", label: "Natural (f_auto)" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setPostcardFilter(f.id as typeof postcardFilter)}
                        className={`p-2 rounded-lg text-left text-[11px] border transition-all ${
                          postcardFilter === f.id
                            ? "bg-white font-semibold shadow-sm"
                            : "bg-white/50 text-[#6E6255] border-[#C59B27]/20"
                        }`}
                        style={{
                          borderColor: postcardFilter === f.id ? theme.primary : undefined,
                          color: postcardFilter === f.id ? theme.primary : undefined,
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleDownloadPostcard}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold text-white shadow-md flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Postcard
                  </button>
                  <button
                    onClick={handleSendPostcard}
                    className="py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold text-[#1C1814] border border-[#C59B27] bg-white hover:bg-[#FAF8F5] flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send
                  </button>
                </div>

                {sentPostcard && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Postcard stamped with {stateData.name}&apos;s seal of memory!
                  </div>
                )}
              </div>

              {/* Right: Rendered Postcard */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-[#C59B27]/40 shadow-2xl">
                  <ImageWithFallback
                    src={statePostcardUrl}
                    fallbackSrc={stateData.places.heroImage}
                    alt={`Postcard of ${stateData.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />

                  {/* Stamp top right */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-dashed border-[#D4AF37] flex flex-col items-center justify-center text-[7px] font-mono text-[#D4AF37] uppercase rotate-[-12deg] bg-black/40">
                      <span>POST</span>
                      <span className="font-bold">INDIA</span>
                    </div>

                    <div className="w-12 h-16 bg-[#FAF5EE] text-[#1C1814] p-1 rounded-sm shadow-md flex flex-col justify-between border border-dashed border-[#8C5320] rotate-[3deg] select-none">
                      <div className="text-[6px] font-serif uppercase tracking-wider font-bold text-center">
                        {stateData.name}
                      </div>
                      <div className="flex items-center justify-center py-0.5">
                        <MotifIcon stateId={stateData.id} className="w-5 h-5" color={theme.primary} />
                      </div>
                      <div className="text-[5px] font-mono text-center text-[#8C5320]">
                        HERITAGE
                      </div>
                    </div>
                  </div>

                  {/* Postcard text bottom */}
                  <div className="absolute bottom-4 left-6 right-6 z-10 space-y-1 text-white">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono block">
                      POSTCARD FROM {stateData.name.toUpperCase()}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold">{recipient}</h4>
                    <p className="font-serif italic text-xs sm:text-sm text-[#EFE8DC] leading-relaxed max-w-xl">
                      &ldquo;{message}&rdquo;
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-sans font-medium text-[#D4AF37]">— {sender}</span>
                      <span className="text-[9px] text-white/60 font-mono">Cloudinary Edge Synthesis</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-right">
                  <button
                    onClick={onOpenInspector}
                    className="text-[11px] font-mono text-[#8C5320] hover:text-[#1C1814] underline underline-offset-2"
                  >
                    Inspect Cloudinary Dynamic Text Overlay Pipeline &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
