"use client";

import { useState, useEffect, useCallback } from "react";
import {
  History,
  Sparkles,
  Calendar,
  BookOpen,
  SlidersHorizontal,
  MapPin,
  Palette,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Link as LinkIcon,
  Upload,
  Image as ImageIcon,
  Compass,
  AlertTriangle,
  Info,
} from "lucide-react";
import { VERIFIED_THEN_NOW_COMPARISONS, VerifiedThenNowComparison } from "@/lib/heritage-media-registry";
import { buildCloudinaryUrl, getCloudName } from "@/lib/cloudinary";
import { ImageWithFallback } from "./ImageWithFallback";

// Defined Cloudinary Archival Color Gradient Presets (for laboratory exploration)
interface GradientPreset {
  id: string;
  name: string;
  era: string;
  effectCode: string;
  primaryColor: string;
  secondaryColor: string;
  tintHex: string;
  sepia: number;
  description: string;
}

const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: "albumen_sepia",
    name: "Albumen Halide Sepia",
    era: "1860s–1880s",
    effectCode: "e_sepia:85,e_tint:55:7A5835,e_vignette:35",
    primaryColor: "#7A5835",
    secondaryColor: "#E8D5B5",
    tintHex: "7A5835",
    sepia: 85,
    description: "19th-century egg-white albumen silver print with warm amber highlights & oxidized silver shadows.",
  },
  {
    id: "cyanotype_blue",
    name: "Cyanotype Sun-Print",
    era: "1880s–1900s",
    effectCode: "e_saturation:-60,e_tint:70:0F2B48,e_vignette:30",
    primaryColor: "#0F2B48",
    secondaryColor: "#89B5DE",
    tintHex: "0F2B48",
    sepia: 0,
    description: "Prussian blue ferricyanide solar print popularized for early British ASI architectural surveys.",
  },
  {
    id: "silver_gelatin",
    name: "Silver Gelatin Platinum",
    era: "1900s–1920s",
    effectCode: "e_saturation:-100,e_contrast:28,e_vignette:35",
    primaryColor: "#222222",
    secondaryColor: "#D6D6D6",
    tintHex: "222222",
    sepia: 0,
    description: "Monochromatic platinum-palladium plate with velvety charcoal blacks and pure neutral mid-tones.",
  },
  {
    id: "amber_ochre",
    name: "Amber Ochre Halide",
    era: "1920s–1940s",
    effectCode: "e_tint:65:B8860B,e_contrast:15,e_vignette:25",
    primaryColor: "#B8860B",
    secondaryColor: "#F4D06F",
    tintHex: "B8860B",
    sepia: 40,
    description: "Warm gold-toned print accentuating ancient sandstone carvings and sunlit temple ramparts.",
  },
  {
    id: "royal_burgundy",
    name: "Royal Burgundy Velvet",
    era: "Heritage Court",
    effectCode: "e_tint:55:5B0E1B,e_contrast:20,e_vignette:30",
    primaryColor: "#5B0E1B",
    secondaryColor: "#E6A5AF",
    tintHex: "5B0E1B",
    sepia: 25,
    description: "Imperial Indian court archival wash with deep pomegranate shadows and gilded highlights.",
  },
  {
    id: "monsoon_verdigris",
    name: "Monsoon Verdigris",
    era: "1960s Archival",
    effectCode: "e_tint:55:0A4642,e_contrast:15,e_vignette:25",
    primaryColor: "#0A4642",
    secondaryColor: "#7EC4BE",
    tintHex: "0A4642",
    sepia: 20,
    description: "Aged temple bronze patina and monsoon moss wash capturing ancient riverfront stonework.",
  },
];

// Curated Moodboard Collection for Halide Studio Exploration
const CURATED_EXPLORATION_PLATES = [
  {
    id: "varanasi-aarti",
    title: "Varanasi Twilight Ghats & Oil Lamps",
    location: "Varanasi, Uttar Pradesh",
    yearThen: "1875 CE Reference",
    yearNow: "Contemporary",
    url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "Smoky twilight over sacred river steps illuminated by towering brass Ganga Aarti lamps.",
    source: "Contemporary Heritage Reference • Benares Riverfront",
    significance: "Continuous evening river worship practiced for over three millennia along Mother Ganga.",
  },
  {
    id: "jaipur-jharokha",
    title: "Amer Palace Sunlit Jharokhas",
    location: "Jaipur, Rajasthan",
    yearThen: "1885 CE Reference",
    yearNow: "Contemporary",
    url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "Pierced pink sandstone honeycomb casements filtering warm desert sunlight into royal courts.",
    source: "Contemporary Heritage Reference • Rajputana Palaces",
    significance: "Intricate sandstone jaali screens providing natural cooling and veiled privacy.",
  },
  {
    id: "kerala-backwaters",
    title: "Vembanad Backwaters & Palms",
    location: "Alleppey, Kerala",
    yearThen: "1905 CE Reference",
    yearNow: "Contemporary",
    url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "Traditional wooden Kettuvallam houseboats gliding through emerald canals under monsoon skies.",
    source: "Contemporary Heritage Reference • Malabar Waters",
    significance: "Coir-bound Anjili wood craft preserved without nails across generations of boatbuilders.",
  },
  {
    id: "kashmir-dal-lake",
    title: "Dal Lake Shikara in Mountain Mist",
    location: "Srinagar, Kashmir",
    yearThen: "1895 CE Reference",
    yearNow: "Contemporary",
    url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "Ornate carved cedar shikara cutting through tranquil lotus blooms beneath snowcapped peaks.",
    source: "Contemporary Heritage Reference • Himalayan Valleys",
    significance: "Aquatic culture of floating vegetable markets and cedarwood houseboats dating to Mughal times.",
  },
];

export function ArchiveLens() {
  // Mode: "verified_monuments" (Strict Documentary) | "halide_studio" (Cloudinary Creative Halide Engine)
  const [activeTab, setActiveTab] = useState<"verified_monuments" | "halide_studio">("verified_monuments");

  // Active Verified Comparison
  const [activeComparisonId, setActiveComparisonId] = useState<string>("madurai-gopuram-archive");

  // Halide Studio Sub-mode: "moodboard" | "custom_url" | "upload"
  const [studioSourceMode, setStudioSourceMode] = useState<"moodboard" | "custom_url" | "upload">("moodboard");
  const [activeMoodboardId, setActiveMoodboardId] = useState<string>("varanasi-aarti");
  const [customImageUrl, setCustomImageUrl] = useState<string>("");
  const [customImageTitle, setCustomImageTitle] = useState<string>("Custom Heritage Plate");
  const [appliedCustomUrl, setAppliedCustomUrl] = useState<string | null>(null);
  const [customUrlError, setCustomUrlError] = useState<string>("");

  // Comparison Slider State (0 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Cloudinary Gradient States (for Studio mode)
  const [selectedGradient, setSelectedGradient] = useState<GradientPreset>(GRADIENT_PRESETS[0]);
  const [gradientIntensity, setGradientIntensity] = useState<number>(65);
  const [vignetteAmount, setVignetteAmount] = useState<number>(35);
  const [contrastBoost, setContrastBoost] = useState<number>(15);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [signedStudioUrl, setSignedStudioUrl] = useState<string>("");

  const cloudName = getCloudName();

  // Active verified comparison record
  const currentComparison =
    VERIFIED_THEN_NOW_COMPARISONS.find((c) => c.id === activeComparisonId) ||
    VERIFIED_THEN_NOW_COMPARISONS[0];

  // Cloudinary effect string for studio mode
  const effectParts: string[] = [];
  if (selectedGradient.id === "cyanotype_blue") {
    effectParts.push("e_saturation:-60");
  } else if (selectedGradient.id === "silver_gelatin") {
    effectParts.push("e_saturation:-100");
  } else if (selectedGradient.sepia > 0) {
    effectParts.push(`e_sepia:${selectedGradient.sepia}`);
  }
  if (selectedGradient.tintHex) {
    effectParts.push(`e_tint:${gradientIntensity}:${selectedGradient.tintHex}`);
  }
  if (vignetteAmount > 0) {
    effectParts.push(`e_vignette:${vignetteAmount}`);
  }
  if (contrastBoost !== 0) {
    effectParts.push(`e_contrast:${contrastBoost}`);
  }
  const cloudinaryEffectString = effectParts.join(",");

  // Sign Cloudinary URLs for studio mode when applicable
  useEffect(() => {
    let isMounted = true;
    if (activeTab === "halide_studio") {
      let targetUrl = appliedCustomUrl;
      if (!targetUrl && studioSourceMode === "moodboard") {
        const item = CURATED_EXPLORATION_PLATES.find((p) => p.id === activeMoodboardId);
        targetUrl = item?.url || null;
      }
      if (targetUrl && targetUrl.startsWith("http")) {
        const effectTransform = cloudinaryEffectString ? `,${cloudinaryEffectString}` : "";
        const transform = `f_auto,q_auto,c_fill,g_auto,w_1400,h_875${effectTransform}`;
        fetch(
          `/api/cloudinary/sign-fetch?transformation=${encodeURIComponent(transform)}&sourceUrl=${encodeURIComponent(
            targetUrl
          )}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (isMounted && data.url) setSignedStudioUrl(data.url);
          })
          .catch(() => {});
      }
    }
    return () => {
      isMounted = false;
    };
  }, [activeTab, studioSourceMode, activeMoodboardId, appliedCustomUrl, cloudinaryEffectString]);

  // Keyboard accessibility handler for comparison slider
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        setSliderPosition((prev) => Math.max(0, prev - 5));
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        setSliderPosition((prev) => Math.min(100, prev + 5));
      } else if (e.key === "Home") {
        setSliderPosition(0);
      } else if (e.key === "End") {
        setSliderPosition(100);
      }
    },
    []
  );

  const handleCopyCloudinaryUrl = () => {
    const url =
      signedStudioUrl ||
      `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_fill,g_auto,w_1400,h_875,${cloudinaryEffectString}/${currentComparison.historicalRecord.cloudinaryPublicId}`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const url = customImageUrl.trim();
    if (!url) return;
    setCustomUrlError("");
    if (url.includes("pin.it") || (url.includes("pinterest.com") && !url.includes("i.pinimg.com"))) {
      setCustomUrlError("pin_page_detected");
      return;
    }
    setAppliedCustomUrl(url);
    setSliderPosition(50);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAppliedCustomUrl(event.target.result as string);
          setCustomImageTitle(file.name.replace(/\.[^/.]+$/, ""));
          setSliderPosition(50);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Determine active display URLs based on current tab
  const isDocumentaryMode = activeTab === "verified_monuments";

  const displayNowUrl = isDocumentaryMode
    ? currentComparison.contemporaryRecord.localPath
    : studioSourceMode === "moodboard"
    ? CURATED_EXPLORATION_PLATES.find((p) => p.id === activeMoodboardId)?.url || CURATED_EXPLORATION_PLATES[0].url
    : appliedCustomUrl || CURATED_EXPLORATION_PLATES[0].url;

  const displayThenUrl = isDocumentaryMode
    ? currentComparison.historicalRecord.localPath
    : signedStudioUrl ||
      buildCloudinaryUrl({
        sourceUrl: displayNowUrl,
        width: 1400,
        height: 875,
        crop: "fill",
        gravity: "auto",
        format: "auto",
        quality: "auto",
        effect: cloudinaryEffectString,
      });

  const displayNowLabel = isDocumentaryMode
    ? `NOW: ${currentComparison.contemporaryRecord.captureDate}`
    : "NOW: Original Reference";

  const displayThenLabel = isDocumentaryMode
    ? `THEN: ${currentComparison.historicalRecord.captureDate}`
    : `THEN: ${selectedGradient.name}`;

  return (
    <section
      id="archive-lens"
      className="py-12 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8 border-t border-[#C59B27]/25 transition-colors duration-300"
    >
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 bg-white/90 dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.25em] font-mono shadow-xs">
          <History className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
          Temporal Archive Lens &bull; Verified Historical Surveys
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal tracking-tight">
          Granite, Glass Plates & Living Centuries
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] font-light max-w-2xl mx-auto leading-relaxed">
          Slide across time. Inspect verified 19th-century photographic surveys from the British Library, Metropolitan
          Museum of Art, and ASI Archives, directly aligned with contemporary viewpoints of the exact same monuments.
        </p>
      </div>

      {/* Primary Wing Switcher: Verified Documentary Surveys vs. Halide Process Studio */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#FAF5EE] dark:bg-[#1A1613] rounded-2xl border border-[#C59B27]/25 max-w-xl mx-auto shadow-2xs">
        <button
          onClick={() => {
            setActiveTab("verified_monuments");
            setSliderPosition(50);
          }}
          className={`py-2 px-5 rounded-xl text-xs font-serif uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === "verified_monuments"
              ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
              : "text-[#6E6255] dark:text-[#A89886] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
          <span>Verified Archival Surveys ({VERIFIED_THEN_NOW_COMPARISONS.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("halide_studio");
            setSliderPosition(50);
          }}
          className={`py-2 px-5 rounded-xl text-xs font-serif uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeTab === "halide_studio"
              ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
              : "text-[#6E6255] dark:text-[#A89886] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
          }`}
        >
          <Palette className="w-4 h-4 text-[#C59B27]" />
          <span>Cloudinary Halide Studio</span>
        </button>
      </div>

      {/* 1. Verified Monument Selector Tabs */}
      {isDocumentaryMode && (
        <div className="space-y-3 max-w-4xl mx-auto">
          <div className="flex items-center justify-between px-2 text-[11px] font-mono text-[#8C7E72] dark:text-[#A89886]">
            <span className="flex items-center gap-1.5 font-bold text-[#5B0E1B] dark:text-[#E5C378] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Verified Authentic Comparisons
            </span>
            <span>Select landmark to inspect provenance & alignment</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {VERIFIED_THEN_NOW_COMPARISONS.map((comp) => {
              const isSelected = comp.id === activeComparisonId;
              return (
                <button
                  key={comp.id}
                  onClick={() => {
                    setActiveComparisonId(comp.id);
                    setSliderPosition(50);
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 border flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#5B0E1B] text-[#FAF8F5] border-[#5B0E1B] shadow-md shadow-[#5B0E1B]/20 font-semibold"
                      : "bg-white dark:bg-[#1A1613] text-[#6E6255] dark:text-[#A89886] border-[#C59B27]/25 hover:border-[#C59B27] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{comp.historicalRecord.captureDate}</span>
                  <span className="font-serif truncate max-w-[170px] sm:max-w-none">{comp.title.split("(")[0]}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                    Verified
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Halide Studio Controls (Secondary Laboratory Mode) */}
      {!isDocumentaryMode && (
        <div className="space-y-4 max-w-4xl mx-auto p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/30 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C59B27]/20 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
                Cloudinary Archival Halide Studio
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStudioSourceMode("moodboard")}
                className={`px-3 py-1 text-[11px] font-mono rounded-lg transition-all ${
                  studioSourceMode === "moodboard"
                    ? "bg-[#5B0E1B] text-white"
                    : "bg-[#FAF5EE] dark:bg-[#201C18] text-[#6E6255] dark:text-[#A89886]"
                }`}
              >
                Curated Plates
              </button>
              <button
                onClick={() => setStudioSourceMode("custom_url")}
                className={`px-3 py-1 text-[11px] font-mono rounded-lg transition-all ${
                  studioSourceMode === "custom_url"
                    ? "bg-[#5B0E1B] text-white"
                    : "bg-[#FAF5EE] dark:bg-[#201C18] text-[#6E6255] dark:text-[#A89886]"
                }`}
              >
                Paste URL
              </button>
              <button
                onClick={() => setStudioSourceMode("upload")}
                className={`px-3 py-1 text-[11px] font-mono rounded-lg transition-all ${
                  studioSourceMode === "upload"
                    ? "bg-[#5B0E1B] text-white"
                    : "bg-[#FAF5EE] dark:bg-[#201C18] text-[#6E6255] dark:text-[#A89886]"
                }`}
              >
                Upload File
              </button>
            </div>
          </div>

          {studioSourceMode === "moodboard" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CURATED_EXPLORATION_PLATES.map((item) => {
                const isSelected = activeMoodboardId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveMoodboardId(item.id);
                      setSliderPosition(50);
                    }}
                    className={`group relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all text-left ${
                      isSelected
                        ? "border-[#5B0E1B] dark:border-[#D4AF37] ring-2 ring-[#C59B27]/50 shadow-md"
                        : "border-transparent opacity-80 hover:opacity-100 hover:border-[#C59B27]/40 shadow-xs"
                    }`}
                  >
                    <ImageWithFallback
                      src={item.url}
                      alt={item.title}
                      fill
                      sizes="220px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                      <p className="text-[10px] font-serif font-bold leading-tight truncate">{item.title}</p>
                      <p className="text-[8px] font-mono text-[#E4C987] truncate">{item.location}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {studioSourceMode === "custom_url" && (
            <form onSubmit={handleApplyCustomUrl} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => {
                    setCustomImageUrl(e.target.value);
                    setCustomUrlError("");
                  }}
                  placeholder="Paste direct image link (e.g. https://...)"
                  required
                  className="flex-1 px-3.5 py-2 rounded-xl border border-[#C59B27]/30 bg-[#FAF8F5] dark:bg-[#120F0D] text-xs text-[#1C1814] dark:text-[#F5EFEB] focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-xs font-serif uppercase tracking-wider whitespace-nowrap shadow-xs"
                >
                  Load Image
                </button>
              </div>
              {customUrlError === "pin_page_detected" && (
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Direct image URL required. Right-click the image and choose &ldquo;Copy Image Address&rdquo;.
                </p>
              )}
            </form>
          )}

          {studioSourceMode === "upload" && (
            <div className="p-4 border-2 border-dashed border-[#C59B27]/40 rounded-xl text-center space-y-2">
              <Upload className="w-6 h-6 text-[#C59B27] mx-auto" />
              <p className="text-xs text-[#6E6255] dark:text-[#A89886]">
                Upload any image to process through 19th-century chemical color gradients.
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B0E1B] text-white text-xs font-serif uppercase cursor-pointer">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Select File</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          )}

          {/* Gradient Presets */}
          <div className="space-y-2 pt-2 border-t border-[#C59B27]/20">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] dark:text-[#A89886] block">
              Archival Chemical Process:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {GRADIENT_PRESETS.map((preset) => {
                const isSelected = selectedGradient.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedGradient(preset);
                      setSignedStudioUrl("");
                    }}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-[#5B0E1B] dark:border-[#D4AF37] ring-2 ring-[#C59B27]/40 bg-[#FAF5EE] dark:bg-[#201C18]"
                        : "border-[#C59B27]/20 hover:border-[#C59B27]/50 bg-white dark:bg-[#14110E]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{
                          background: `linear-gradient(135deg, ${preset.primaryColor}, ${preset.secondaryColor})`,
                        }}
                      />
                      <span className="text-[8px] font-mono text-[#8C7E72] dark:text-[#A89886]">{preset.era}</span>
                    </div>
                    <div className="text-[10px] font-serif font-bold text-[#1C1814] dark:text-[#F5EFEB] truncate">
                      {preset.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Lightbox Comparison Stage */}
      <div className="rounded-3xl border border-[#C59B27]/30 dark:border-[#C59B27]/20 bg-[#FAF5EE] dark:bg-[#14110E] p-4 sm:p-6 lg:p-7 shadow-xl space-y-6">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden select-none border border-[#C59B27]/30 shadow-inner bg-[#2A1B14]">
          {/* Layer 1: NOW (Contemporary Living Image - 100% full width, never resizes) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <ImageWithFallback
              src={displayNowUrl}
              fallbackSrc={displayNowUrl}
              alt={`${isDocumentaryMode ? currentComparison.title : customImageTitle} - Contemporary View`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />
            {/* Tag Badge Top Right */}
            <div className="absolute top-4 right-4 bg-[#1C1814]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 text-[11px] font-mono text-[#F4EDE3] flex items-center gap-1.5 z-10 shadow-lg">
              <Calendar className="w-3 h-3 text-[#C59B27]" />
              {displayNowLabel}
            </div>
            <div className="absolute bottom-4 right-4 bg-[#1C1814]/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#E5D8C5] z-10 hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C59B27]" />
              {isDocumentaryMode ? currentComparison.location : "Contemporary Living Frame"}
            </div>
          </div>

          {/* Layer 2: THEN (Archival Plate - Image never resizes, clipped via CSS clip-path) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <ImageWithFallback
              key={`${activeComparisonId}-${displayThenUrl}`}
              src={displayThenUrl}
              fallbackSrc={displayThenUrl}
              alt={`${isDocumentaryMode ? currentComparison.title : customImageTitle} - Historical Archival`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />

            {/* Tag Badge Top Left */}
            <div className="absolute top-4 left-4 bg-[#5B0E1B]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C59B27]/50 text-[11px] font-mono text-[#FAF5EE] flex items-center gap-1.5 z-10 shadow-lg">
              <Calendar className="w-3 h-3 text-[#D4AF37]" />
              {displayThenLabel}
              {isDocumentaryMode && (
                <span className="text-[9px] text-emerald-300 font-bold ml-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                  {currentComparison.historicalRecord.mediaType.replace("_", " ").toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Divider Line & Touch Ergonomic Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#C59B27] z-20 pointer-events-none shadow-[0_0_12px_rgba(197,155,39,0.7)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#FAF8F5] dark:bg-[#1A1613] border-2 border-[#C59B27] shadow-xl flex items-center justify-center text-[#5B0E1B] dark:text-[#E5C378] transition-transform hover:scale-110">
              <SlidersHorizontal className="w-4 h-4 rotate-90 text-[#5B0E1B] dark:text-[#D4AF37]" />
            </div>
          </div>

          {/* Full-Surface Accessible Range Input with Keyboard Support */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            onKeyDown={handleKeyDown}
            aria-label="Archive then and now split comparison slider"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none focus:outline-none"
          />
        </div>

        {/* Sub-bar: Instructions & Slider Percentage */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs font-mono text-[#6E6255] dark:text-[#A89886]">
          <div className="flex items-center gap-2">
            <span>Drag slider horizontally or use arrow keys (← / →)</span>
            <span className="hidden sm:inline text-[#C59B27]">&bull;</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">
              {sliderPosition < 10
                ? "Showing 100% Contemporary Photography"
                : sliderPosition > 90
                ? "Showing 100% Historical Archival Plate"
                : `Split Comparison (${sliderPosition}% Archival / ${100 - sliderPosition}% Modern)`}
            </span>
          </div>

          <div className="flex items-center gap-2 font-semibold text-[#8C5320] dark:text-[#D4AF37]">
            <span>{Math.round(sliderPosition)}% Historical</span>
            <span>&bull;</span>
            <span>{Math.round(100 - sliderPosition)}% Contemporary</span>
          </div>
        </div>

        {/* Archival Provenance & Verification Card */}
        {isDocumentaryMode && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-[#1A1613] p-5 sm:p-7 rounded-2xl border border-[#C59B27]/25 dark:border-[#C59B27]/20 shadow-xs">
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[#5B0E1B] dark:text-[#E5C378] font-mono font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Historical Provenance</span>
                <span>&bull; {currentComparison.location}</span>
                <span className="text-[10px] font-mono font-normal normal-case px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  {currentComparison.historicalRecord.license}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#1C1814] dark:text-[#F5EFEB] font-normal leading-tight">
                {currentComparison.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#423A32] dark:text-[#D5C7B8] font-light leading-relaxed">
                {currentComparison.historicalContext}
              </p>

              {/* Viewpoint Analysis */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#120F0D] border border-[#C59B27]/20 text-xs text-[#5B0E1B] dark:text-[#E5C378] space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold block text-[#8C7E72] dark:text-[#A89886]">
                  Viewpoint Alignment Analysis:
                </span>
                <p className="font-sans text-[11px] leading-relaxed text-[#382F27] dark:text-[#D5C7B8]">
                  {currentComparison.viewpointAnalysis}
                </p>
              </div>

              {/* Metadata Citation Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#8C5320] dark:text-[#D4AF37] font-sans pt-2 border-t border-[#C59B27]/15">
                <span>
                  <strong className="text-[#1C1814] dark:text-[#F5EFEB]">Photographer:</strong>{" "}
                  {currentComparison.historicalRecord.photographer}
                </span>
                <span>
                  <strong className="text-[#1C1814] dark:text-[#F5EFEB]">Archive:</strong>{" "}
                  {currentComparison.historicalRecord.archiveInstitution}
                </span>
                <a
                  href={currentComparison.historicalRecord.originalSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#5B0E1B] dark:text-[#E5C378] hover:underline"
                >
                  <span>Verified Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="md:col-span-4 p-5 rounded-xl bg-[#FAF5EE] dark:bg-[#14110E] border border-[#C59B27]/30 dark:border-[#C59B27]/20 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-mono font-bold block mb-1.5">
                  Architectural Significance
                </span>
                <p className="text-xs text-[#382F27] dark:text-[#D5C7B8] italic font-serif leading-relaxed">
                  &ldquo;{currentComparison.architecturalSignificance}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#C59B27]/20 space-y-1 text-[10px] font-mono text-[#8C7E72] dark:text-[#A89886]">
                <div className="flex items-center justify-between">
                  <span>Cloudinary Delivery:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">f_auto, q_auto, c_fill</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Verification Status:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">100% Authentic</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Halide Studio Provenance Card */}
        {!isDocumentaryMode && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/25 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7E72] dark:text-[#A89886] block">
                Active Transformation Pipeline:
              </span>
              <code className="text-xs font-mono text-[#5B0E1B] dark:text-[#E5C378] block">
                f_auto,q_auto,c_fill,g_auto,{cloudinaryEffectString || "e_sepia:85"}
              </code>
            </div>

            <button
              onClick={handleCopyCloudinaryUrl}
              className="px-4 py-2 rounded-xl border border-[#C59B27]/40 bg-[#FAF8F5] dark:bg-[#1A1613] hover:bg-[#FAF5EE] text-[#5B0E1B] dark:text-[#E5C378] text-xs font-mono flex items-center gap-1.5 shadow-2xs transition-all shrink-0"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? "Transformation Copied!" : "Copy Cloudinary URL"}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ArchiveLens;
