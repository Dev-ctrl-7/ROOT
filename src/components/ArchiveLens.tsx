"use client";

import { useState, useEffect } from "react";
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
  RotateCw,
  ExternalLink,
  Link as LinkIcon,
  Upload,
  Image as ImageIcon,
  Compass,
  AlertTriangle,
} from "lucide-react";
import { ARCHIVE_COMPARISONS } from "@/lib/cultural-data";
import { buildCloudinaryUrl, getCloudName } from "@/lib/cloudinary";
import { ImageWithFallback } from "./ImageWithFallback";

// Defined Cloudinary Archival Color Gradient Presets
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
  cssGradient: string;
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
    cssGradient: "linear-gradient(135deg, rgba(122,88,53,0.7) 0%, rgba(232,213,181,0.3) 100%)",
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
    cssGradient: "linear-gradient(135deg, rgba(15,43,72,0.75) 0%, rgba(137,181,222,0.3) 100%)",
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
    cssGradient: "linear-gradient(135deg, rgba(30,30,30,0.8) 0%, rgba(200,200,200,0.2) 100%)",
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
    cssGradient: "linear-gradient(135deg, rgba(184,134,11,0.7) 0%, rgba(244,208,111,0.25) 100%)",
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
    cssGradient: "linear-gradient(135deg, rgba(91,14,27,0.75) 0%, rgba(230,165,175,0.25) 100%)",
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
    cssGradient: "linear-gradient(135deg, rgba(10,70,66,0.7) 0%, rgba(126,196,190,0.25) 100%)",
  },
];

// Curated Pinterest Aesthetic Moodboard Collection
const PINTEREST_AESTHETIC_MOODBOARD = [
  {
    id: "varanasi-aarti",
    title: "Varanasi Twilight Ghats & Oil Lamps",
    location: "Varanasi, Uttar Pradesh",
    yearThen: "1875 CE",
    yearNow: "Present Day",
    url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "Smoky twilight over sacred river steps illuminated by towering brass Ganga Aarti lamps.",
    source: "Pinterest Heritage Moodboard • Benares Riverfront",
    significance: "Continuous evening river worship practiced for over three millennia along Mother Ganga.",
  },
  {
    id: "jaipur-jharokha",
    title: "Amer Palace Sunlit Jharokhas",
    location: "Jaipur, Rajasthan",
    yearThen: "1885 CE",
    yearNow: "Present Day",
    url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "Pierced pink sandstone honeycomb casements filtering warm desert sunlight into royal courts.",
    source: "Pinterest Architectural Archive • Rajputana Palaces",
    significance: "Intricate sandstone jaali screens providing natural cooling and veiled privacy.",
  },
  {
    id: "meenakshi-pillars",
    title: "Meenakshi 1,000-Pillar Stone Hall",
    location: "Madurai, Tamil Nadu",
    yearThen: "1868 CE",
    yearNow: "Present Day",
    url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "Monolithic granite pillars carved with mythical Yalis in incense-scented sacred shadows.",
    source: "Pinterest Heritage Aesthetic • Ancient Dravidian Temples",
    significance: "Acoustic musical stone pillars engineered with remarkable geometric precision in 1569 CE.",
  },
  {
    id: "kerala-backwaters",
    title: "Vembanad Backwaters & Palms",
    location: "Alleppey, Kerala",
    yearThen: "1905 CE",
    yearNow: "Present Day",
    url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "Traditional wooden Kettuvallam houseboats gliding through emerald canals under monsoon skies.",
    source: "Pinterest Visual Poetry • Malabar Waters",
    significance: "Coir-bound Anjili wood craft preserved without nails across generations of boatbuilders.",
  },
  {
    id: "hampi-stone-chariot",
    title: "Hampi Vittala Stone Chariot",
    location: "Hampi, Karnataka",
    yearThen: "1880 CE",
    yearNow: "Present Day",
    url: "https://raw.githubusercontent.com/Dev-ctrl-7/ROOT/state-images/pinterest-cloudinary/public/images/states/karnataka/hampi-stone-chariot.jpg",
    curatorNote: "15th-century Vijayanagara granite chariot framed by boulder-strewn hills at sunset.",
    source: "Pinterest Archaeology • Vijayanagara Empire",
    significance: "Monolithic chariot shrine featuring rotating granite stone wheels that once turned on stone axles.",
  },
  {
    id: "kashmir-dal-lake",
    title: "Dal Lake Shikara in Mountain Mist",
    location: "Srinagar, Kashmir",
    yearThen: "1895 CE",
    yearNow: "Present Day",
    url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "Ornate carved cedar shikara cutting through tranquil lotus blooms beneath snowcapped peaks.",
    source: "Pinterest Aesthetic • Himalayan Valleys",
    significance: "Aquatic culture of floating vegetable markets and cedarwood houseboats dating to Mughal times.",
  },
  {
    id: "amritsar-golden",
    title: "Harmandir Sahib Golden Reflection",
    location: "Amritsar, Punjab",
    yearThen: "1890 CE",
    yearNow: "Present Day",
    url: "https://raw.githubusercontent.com/Dev-ctrl-7/ROOT/state-images/pinterest-cloudinary/public/images/states/punjab/harmandir-sahib.jpg",
    curatorNote: "Pure gold repoussé sanctum reflecting in the sacred Amrit Sarovar holy pool at dusk.",
    source: "Pinterest Spiritual Light • Golden Epics",
    significance: "500 kg of pure gold leaf gilding and continuous 24-hour Guru Granth Sahib hymn recitation.",
  },
  {
    id: "thanjavur-vimana",
    title: "Brihadisvara Monolith Vimana",
    location: "Thanjavur, Tamil Nadu",
    yearThen: "1892 CE",
    yearNow: "Present Day",
    url: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?q=85&w=1400&auto=format&fit=crop",
    curatorNote: "216-foot granite spire built by Raja Raja Chola I soaring into dramatic sunset clouds.",
    source: "Pinterest Classical India • Living Chola Temples",
    significance: "An 80-tonne single granite capstone raised atop the vimana using an inclined earthen ramp.",
  },
];

export function ArchiveLens() {
  // Source Mode: "monuments" | "pinterest_board" | "custom_url" | "upload"
  const [sourceMode, setSourceMode] = useState<"monuments" | "pinterest_board" | "custom_url" | "upload">(
    "monuments"
  );

  // Active Monument Comparison
  const [activeComparisonId, setActiveComparisonId] = useState<string>("madurai-gopuram-archive");

  // Active Pinterest Moodboard Selection
  const [activeMoodboardId, setActiveMoodboardId] = useState<string>("varanasi-aarti");

  // Custom User Image States (Pinterest link or Uploaded file)
  const [customImageUrl, setCustomImageUrl] = useState<string>("");
  const [customImageTitle, setCustomImageTitle] = useState<string>("My Aesthetic Heritage Photo");
  const [customImageLocation, setCustomImageLocation] = useState<string>("India");
  const [appliedCustomUrl, setAppliedCustomUrl] = useState<string | null>(null);
  const [customUrlError, setCustomUrlError] = useState<string>("");

  // Comparison Slider State
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100

  // Cloudinary Gradient States
  const [selectedGradient, setSelectedGradient] = useState<GradientPreset>(GRADIENT_PRESETS[0]);
  const [gradientIntensity, setGradientIntensity] = useState<number>(65); // 20 to 100
  const [vignetteAmount, setVignetteAmount] = useState<number>(35); // 0 to 60
  const [contrastBoost, setContrastBoost] = useState<number>(15); // -20 to 40
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [showGradientControls, setShowGradientControls] = useState<boolean>(true);
  const [signedThenUrl, setSignedThenUrl] = useState<string>("");
  const [signedNowUrl, setSignedNowUrl] = useState<string>("");

  const cloudName = getCloudName();

  // Resolve current image pair based on active mode
  let currentTitle = "";
  let currentLocation = "";
  let currentYearThen = "1868 CE";
  let currentYearNow = "Present Day";
  let currentHistoricalContext = "";
  let currentArchivalSource = "";
  let currentSignificance = "";
  let currentInstitution = "";
  let currentPhotographer = "";
  let currentLegalRights = "";
  let currentIsVisualInterpretation = false;
  let baseNowUrl = "";
  let baseThenUrl = "";

  if (sourceMode === "monuments") {
    const comp = ARCHIVE_COMPARISONS.find((c) => c.id === activeComparisonId) || ARCHIVE_COMPARISONS[0];
    currentTitle = comp.title;
    currentLocation = comp.location;
    currentYearThen = comp.yearThen;
    currentYearNow = comp.yearNow;
    currentHistoricalContext = comp.historicalContext;
    currentArchivalSource = comp.archivalSource;
    currentSignificance = comp.significance;
    currentInstitution = comp.institutionProvenance || "";
    currentPhotographer = comp.photographer || "";
    currentLegalRights = comp.legalRights || "";
    currentIsVisualInterpretation = Boolean(comp.isVisualInterpretation);
    baseNowUrl = comp.imageNowFallback;
    baseThenUrl = comp.imageThenFallback;
  } else if (sourceMode === "pinterest_board") {
    const pin = PINTEREST_AESTHETIC_MOODBOARD.find((p) => p.id === activeMoodboardId) || PINTEREST_AESTHETIC_MOODBOARD[0];
    currentTitle = pin.title;
    currentLocation = pin.location;
    currentYearThen = pin.yearThen;
    currentYearNow = pin.yearNow;
    currentHistoricalContext = pin.curatorNote;
    currentArchivalSource = pin.source;
    currentSignificance = pin.significance;
    currentInstitution = "Curated Indian Visual Culture Archive";
    currentLegalRights = "Contemporary Reference / Open Culture";
    currentIsVisualInterpretation = true;
    baseNowUrl = pin.url;
    baseThenUrl = pin.url;
  } else {
    // Custom URL or Upload
    const userImg = appliedCustomUrl || PINTEREST_AESTHETIC_MOODBOARD[0].url;
    currentTitle = customImageTitle;
    currentLocation = customImageLocation;
    currentYearThen = "1880s Archival Plate";
    currentYearNow = "Living Photography";
    currentHistoricalContext =
      "User-selected aesthetic photograph processed through Cloudinary's dynamic color gradient and vintage plate engine.";
    currentArchivalSource = "Curated Pinterest / Custom Image Upload";
    currentSignificance = "Contrast original contemporary living colors with vintage 19th-century photographic processes.";
    currentInstitution = "User Contributed / External Reference";
    currentLegalRights = "Fair Use Cultural Exploration";
    currentIsVisualInterpretation = true;
    baseNowUrl = userImg;
    baseThenUrl = userImg;
  }

  // Build authentic Cloudinary color gradient transformation string
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

  // Cloudinary transformed "Then" historical plate
  const thenImageUrl = buildCloudinaryUrl({
    sourceUrl: baseThenUrl,
    width: 1400,
    height: 875,
    crop: "fill",
    gravity: "auto",
    format: "auto",
    quality: "auto",
    effect: cloudinaryEffectString,
  });

  // Cloudinary transformed "Now" contemporary living photography
  const nowImageUrl = buildCloudinaryUrl({
    sourceUrl: baseNowUrl,
    width: 1400,
    height: 875,
    crop: "fill",
    gravity: "auto",
    format: "auto",
    quality: "auto",
  });

  // Reset signed URLs on subject change and sign remote URLs via server API
  useEffect(() => {
    let isMounted = true;
    setSignedThenUrl("");
    setSignedNowUrl("");

    const effectTransform = cloudinaryEffectString ? `,${cloudinaryEffectString}` : "";
    const thenTransform = `f_auto,q_auto,c_fill,g_auto,w_1400,h_875${effectTransform}`;
    const nowTransform = `f_auto,q_auto,c_fill,g_auto,w_1400,h_875`;

    if (baseThenUrl && baseThenUrl.startsWith("http")) {
      fetch(
        `/api/cloudinary/sign-fetch?transformation=${encodeURIComponent(
          thenTransform
        )}&sourceUrl=${encodeURIComponent(baseThenUrl)}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data.url) setSignedThenUrl(data.url);
        })
        .catch(() => {});
    }

    if (baseNowUrl && baseNowUrl.startsWith("http")) {
      fetch(
        `/api/cloudinary/sign-fetch?transformation=${encodeURIComponent(
          nowTransform
        )}&sourceUrl=${encodeURIComponent(baseNowUrl)}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && data.url) setSignedNowUrl(data.url);
        })
        .catch(() => {});
    }

    return () => {
      isMounted = false;
    };
  }, [baseThenUrl, baseNowUrl, cloudinaryEffectString]);

  const fullCloudinaryUrl = signedThenUrl || `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto,c_fill,g_auto,w_1400,h_875,${cloudinaryEffectString}/${encodeURIComponent(
    baseThenUrl
  )}`;

  const handleCopyCloudinaryUrl = () => {
    navigator.clipboard.writeText(fullCloudinaryUrl);
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

  return (
    <section
      id="archive-lens"
      className="py-12 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8 border-t border-[#C59B27]/25 transition-colors duration-300"
    >
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 bg-white/90 dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.25em] font-mono shadow-xs">
          <History className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
          Temporal Archive Lens &bull; Cloudinary Gradient Engine
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal tracking-tight">
          Granite, Silver Halide & Color Gradients
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] font-light max-w-xl mx-auto leading-relaxed">
          Slide across centuries. Choose aesthetic photographs from our Pinterest moodboards, paste your own Pinterest link, or explore classical 19th-century ASI historical surveys through Cloudinary&apos;s adaptive gradient & tint engine.
        </p>
      </div>

      {/* Main Mode Selection Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#FAF5EE] dark:bg-[#1A1613] rounded-2xl border border-[#C59B27]/25 max-w-3xl mx-auto shadow-2xs">
        <button
          onClick={() => setSourceMode("pinterest_board")}
          className={`py-2 px-4 rounded-xl text-xs font-serif uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            sourceMode === "pinterest_board"
              ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
              : "text-[#6E6255] dark:text-[#A89886] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Pinterest Aesthetic Moodboard</span>
        </button>

        <button
          onClick={() => setSourceMode("custom_url")}
          className={`py-2 px-4 rounded-xl text-xs font-serif uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            sourceMode === "custom_url"
              ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
              : "text-[#6E6255] dark:text-[#A89886] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Paste Pinterest Link</span>
        </button>

        <button
          onClick={() => setSourceMode("upload")}
          className={`py-2 px-4 rounded-xl text-xs font-serif uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            sourceMode === "upload"
              ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
              : "text-[#6E6255] dark:text-[#A89886] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
          }`}
        >
          <Upload className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Upload Image</span>
        </button>

        <button
          onClick={() => setSourceMode("monuments")}
          className={`py-2 px-4 rounded-xl text-xs font-serif uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            sourceMode === "monuments"
              ? "bg-[#5B0E1B] text-white shadow-xs font-medium"
              : "text-[#6E6255] dark:text-[#A89886] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>Classical ASI Surveys</span>
        </button>
      </div>

      {/* Mode Sub-Panels */}
      {/* 1. Pinterest Aesthetic Moodboard Picker */}
      {sourceMode === "pinterest_board" && (
        <div className="space-y-3 max-w-6xl mx-auto">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
              Curated Pinterest-Aesthetic Moodboard (8 Visual Plates)
            </span>
            <span className="text-[11px] font-mono text-[#8C7E72] dark:text-[#A89886]">
              Select a frame to grade with Cloudinary gradients
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {PINTEREST_AESTHETIC_MOODBOARD.map((item) => {
              const isSelected = activeMoodboardId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMoodboardId(item.id);
                    setSliderPosition(50);
                  }}
                  className={`group relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all text-left ${
                    isSelected
                      ? "border-[#5B0E1B] dark:border-[#D4AF37] ring-2 ring-[#C59B27]/50 scale-[1.03] shadow-md"
                      : "border-transparent opacity-80 hover:opacity-100 hover:border-[#C59B27]/40 shadow-xs"
                  }`}
                >
                  <ImageWithFallback
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="160px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 text-white">
                    <p className="text-[10px] font-serif font-bold leading-tight truncate">{item.title}</p>
                    <p className="text-[8px] font-mono text-[#E4C987] truncate">{item.location.split(",")[0]}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Paste Pinterest / Web Image URL */}
      {sourceMode === "custom_url" && (
        <form
          onSubmit={handleApplyCustomUrl}
          className="p-5 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/30 dark:border-[#C59B27]/20 shadow-xs max-w-3xl mx-auto space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
              Paste Pinterest Image URL
            </span>
            <span className="text-[10px] font-mono text-[#8C7E72] dark:text-[#A89886]">
              Direct image link from Pinterest or web
            </span>
          </div>

          <p className="text-xs text-[#6E6255] dark:text-[#A89886] font-sans leading-relaxed">
            Open any pin on Pinterest, <strong>right-click the image</strong>, choose <strong>&ldquo;Copy Image Address&rdquo;</strong> (e.g. <code className="text-[11px] font-mono text-[#5B0E1B] dark:text-[#E5C378]">https://i.pinimg.com/...</code>), and paste it below.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => {
                setCustomImageUrl(e.target.value);
                setCustomUrlError("");
              }}
              placeholder="Paste Pinterest image link (e.g. https://i.pinimg.com/...)"
              required
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#C59B27]/30 bg-[#FAF8F5] dark:bg-[#120F0D] text-xs text-[#1C1814] dark:text-[#F5EFEB] placeholder-[#8C7E72] dark:placeholder-[#7A6E63] focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Pinterest Image</span>
            </button>
          </div>

          {customUrlError === "pin_page_detected" && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Pinterest Page Link Detected (`pin.it`)</span>
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                Pinterest share links (like <code className="font-mono font-semibold">pin.it</code>) are webpage links rather than direct image files.
              </p>
              <div className="space-y-1.5 text-[11px] text-amber-900 dark:text-amber-200">
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-[#5B0E1B] dark:text-[#E5C378]">&bull;</span>
                  <span>
                    <strong>Option 1 (Copy Image Address)</strong>: Open the pin on Pinterest, <strong>right-click (or tap & hold) directly on the picture</strong>, and choose <strong>&ldquo;Copy Image Address&rdquo;</strong> (it starts with <code className="font-mono">https://i.pinimg.com/...</code>).
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-[#5B0E1B] dark:text-[#E5C378]">&bull;</span>
                  <span>
                    <strong>Option 2 (Easiest)</strong>: Save/download the picture from Pinterest, then click <strong>&ldquo;Upload Image&rdquo;</strong> to pick it directly from your computer or phone!
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSourceMode("upload");
                  setCustomUrlError("");
                }}
                className="w-full py-1.5 rounded-lg bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-[11px] font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Switch to Upload Image from Device</span>
              </button>
            </div>
          )}

          {appliedCustomUrl && (
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Active custom photo loaded into Cloudinary Gradient Engine</span>
            </div>
          )}
        </form>
      )}

      {/* 3. Upload from Device */}
      {sourceMode === "upload" && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1613] border-2 border-dashed border-[#C59B27]/40 dark:border-[#C59B27]/30 text-center max-w-xl mx-auto space-y-3">
          <Upload className="w-8 h-8 text-[#C59B27] mx-auto" />
          <div className="space-y-1">
            <h4 className="font-serif text-base text-[#1C1814] dark:text-[#F5EFEB] font-medium">
              Upload Any Saved Pinterest Heritage Image
            </h4>
            <p className="text-xs text-[#6E6255] dark:text-[#A89886] font-sans">
              Choose an image saved from Pinterest from your device to grade with 19th-century photographic processes.
            </p>
          </div>
          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5B0E1B] hover:bg-[#7A1D26] text-white text-xs font-serif uppercase tracking-wider cursor-pointer shadow-sm transition-all">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Select Image File</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      )}

      {/* 4. Classical ASI Monument Selector */}
      {sourceMode === "monuments" && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto">
          {ARCHIVE_COMPARISONS.map((comp) => {
            const isSelected = comp.id === activeComparisonId;
            return (
              <button
                key={comp.id}
                onClick={() => {
                  setActiveComparisonId(comp.id);
                  setSliderPosition(50);
                }}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 border flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#5B0E1B] text-[#FAF8F5] border-[#5B0E1B] shadow-md shadow-[#5B0E1B]/20 font-semibold"
                    : "bg-white dark:bg-[#1A1613] text-[#6E6255] dark:text-[#A89886] border-[#C59B27]/25 hover:border-[#C59B27] hover:text-[#1C1814] dark:hover:text-[#F5EFEB]"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{comp.yearThen} vs Now:</span>
                <span className="font-serif truncate max-w-[150px] sm:max-w-none">
                  {comp.title.split("Temple")[0] || comp.title}
                </span>
                {comp.isVisualInterpretation && (
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    Interpretation
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Interactive Lightbox Comparison Stage */}
      <div className="rounded-3xl border border-[#C59B27]/30 dark:border-[#C59B27]/20 bg-[#FAF5EE] dark:bg-[#14110E] p-4 sm:p-6 lg:p-7 shadow-xl space-y-6">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden select-none border border-[#C59B27]/30 shadow-inner bg-[#2A1B14]">
          {/* Layer 1: NOW (Contemporary Living Image - 100% full width, never resizes) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <ImageWithFallback
              src={signedNowUrl || nowImageUrl}
              fallbackSrc={baseNowUrl}
              alt={`${currentTitle} - Contemporary`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            {/* Tag Badge Top Right */}
            <div className="absolute top-4 right-4 bg-[#1C1814]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 text-[11px] font-mono text-[#F4EDE3] flex items-center gap-1.5 z-10 shadow-lg">
              <Calendar className="w-3 h-3 text-[#C59B27]" />
              NOW: {currentYearNow}
            </div>
            <div className="absolute bottom-4 right-4 bg-[#1C1814]/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#E5D8C5] z-10 hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C59B27]" />
              {currentLocation}
            </div>
          </div>

          {/* Layer 2: THEN (Archival Plate with Cloudinary API Color Gradient - Image never resizes, only the filter line clips across) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <ImageWithFallback
              key={signedThenUrl || `${selectedGradient.id}-${gradientIntensity}-${vignetteAmount}-${contrastBoost}-${baseThenUrl}`}
              src={baseThenUrl.startsWith("/") ? baseThenUrl : (signedThenUrl || thenImageUrl)}
              fallbackSrc={baseThenUrl}
              alt={`${currentTitle} - Historical Archival`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />

            {/* Tag Badge Top Left */}
            <div className="absolute top-4 left-4 bg-[#5B0E1B]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C59B27]/50 text-[11px] font-mono text-[#FAF5EE] flex items-center gap-1.5 z-10 shadow-lg">
              <Calendar className="w-3 h-3 text-[#D4AF37]" />
              THEN: {currentYearThen}
              {currentIsVisualInterpretation && (
                <span className="text-[9px] text-amber-300 font-bold ml-1 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                  Visual Interpretation
                </span>
              )}
              <span className="text-[9px] text-[#E4C987] hidden sm:inline">
                &bull; {selectedGradient.name}
              </span>
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

          {/* Full-Surface Accessible Range Input */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            aria-label="Archive then and now split slider"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none"
          />
        </div>

        {/* Sub-bar: Instructions & Slider Percentage */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs font-mono text-[#6E6255] dark:text-[#A89886]">
          <div className="flex items-center gap-2">
            <span>Drag slider horizontally to reveal temporal change</span>
            <span className="hidden sm:inline text-[#C59B27]">&bull;</span>
            <button
              onClick={() => setShowGradientControls(!showGradientControls)}
              className="text-[#5B0E1B] dark:text-[#E5C378] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>{showGradientControls ? "Hide Gradient Controls" : "Customize Cloudinary Gradient"}</span>
            </button>
          </div>

          <div className="font-semibold text-[#8C5320] dark:text-[#D4AF37]">
            {Math.round(sliderPosition)}% Historical Plate / {Math.round(100 - sliderPosition)}% Living Color
          </div>
        </div>

        {/* Cloudinary Color Gradient Studio Controls */}
        {showGradientControls && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#C59B27]/30 dark:border-[#C59B27]/20 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C59B27]/15 dark:border-[#C59B27]/10 pb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#C59B27]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-bold">
                  Cloudinary Color Gradient & Archival Halide Studio
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8C7E72] dark:text-[#A89886]">
                Transforming historical plate via Cloudinary URL Engine
              </span>
            </div>

            {/* Gradient Preset Pills */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] dark:text-[#A89886] block">
                Archival Gradient Presets:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {GRADIENT_PRESETS.map((preset) => {
                  const isSelected = selectedGradient.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedGradient(preset);
                        setSignedThenUrl("");
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? "border-[#5B0E1B] dark:border-[#D4AF37] ring-2 ring-[#C59B27]/40 bg-[#FAF5EE] dark:bg-[#201C18]"
                          : "border-[#C59B27]/20 hover:border-[#C59B27]/50 bg-white dark:bg-[#14110E]"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <div
                          className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                          style={{
                            background: `linear-gradient(135deg, ${preset.primaryColor}, ${preset.secondaryColor})`,
                          }}
                        />
                        <span className="text-[9px] font-mono text-[#8C7E72] dark:text-[#A89886]">
                          {preset.era}
                        </span>
                      </div>
                      <div className="text-[11px] font-serif font-bold text-[#1C1814] dark:text-[#F5EFEB] truncate">
                        {preset.name}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#6E6255] dark:text-[#A89886] font-sans italic pt-0.5">
                {selectedGradient.description}
              </p>
            </div>

            {/* Live Parameter Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#C59B27]/15 dark:border-[#C59B27]/10">
              {/* Gradient Strength */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#423A32] dark:text-[#D5C7B8]">
                  <span>Gradient Tint Strength:</span>
                  <span className="font-bold text-[#5B0E1B] dark:text-[#E5C378]">
                    {gradientIntensity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={gradientIntensity}
                  onChange={(e) => setGradientIntensity(Number(e.target.value))}
                  className="w-full accent-[#5B0E1B] cursor-pointer"
                />
              </div>

              {/* Vignette Shading */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#423A32] dark:text-[#D5C7B8]">
                  <span>Vignette Edge Falloff:</span>
                  <span className="font-bold text-[#5B0E1B] dark:text-[#E5C378]">
                    {vignetteAmount}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={vignetteAmount}
                  onChange={(e) => setVignetteAmount(Number(e.target.value))}
                  className="w-full accent-[#5B0E1B] cursor-pointer"
                />
              </div>

              {/* Halide Contrast */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#423A32] dark:text-[#D5C7B8]">
                  <span>Halide Contrast:</span>
                  <span className="font-bold text-[#5B0E1B] dark:text-[#E5C378]">
                    {contrastBoost > 0 ? `+${contrastBoost}` : contrastBoost}
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="40"
                  value={contrastBoost}
                  onChange={(e) => setContrastBoost(Number(e.target.value))}
                  className="w-full accent-[#5B0E1B] cursor-pointer"
                />
              </div>
            </div>

            {/* Cloudinary Live Transformation URL Pipeline */}
            <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#120F0D] border border-[#C59B27]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5 truncate pr-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C7E72] dark:text-[#A89886] block">
                  Cloudinary Transformation URL Pipeline:
                </span>
                <code className="text-[11px] font-mono text-[#5B0E1B] dark:text-[#E5C378] truncate block">
                  e_{cloudinaryEffectString},f_auto,q_auto
                </code>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyCloudinaryUrl}
                  className="px-3 py-1.5 rounded-lg border border-[#C59B27]/30 bg-white dark:bg-[#1A1613] hover:bg-[#FAF5EE] dark:hover:bg-[#25201C] text-[#5B0E1B] dark:text-[#E5C378] text-[11px] font-mono flex items-center gap-1 shadow-2xs transition-all"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? "URL Copied!" : "Copy URL"}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Archival Provenance & Inscription Context */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-[#1A1613] p-5 sm:p-7 rounded-2xl border border-[#C59B27]/25 dark:border-[#C59B27]/20 shadow-xs">
          <div className="md:col-span-8 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[#5B0E1B] dark:text-[#E5C378] font-mono font-bold">
              <BookOpen className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
              <span>
                {currentIsVisualInterpretation
                  ? "Historical Visual Interpretation"
                  : "Verified Archival Provenance"}
              </span>
              <span>&bull; {currentLocation}</span>
              {currentLegalRights && (
                <span className="text-[10px] font-mono font-normal normal-case px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  {currentLegalRights}
                </span>
              )}
            </div>
            <h3 className="font-serif text-lg text-[#1C1814] dark:text-[#F5EFEB] font-medium">
              {currentTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#423A32] dark:text-[#D5C7B8] font-light leading-relaxed">
              {currentHistoricalContext}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8C5320] dark:text-[#D4AF37] font-sans pt-1 border-t border-[#C59B27]/15">
              {currentPhotographer && (
                <span>
                  <strong className="text-[#1C1814] dark:text-[#F5EFEB]">Photographer:</strong> {currentPhotographer}
                </span>
              )}
              {currentInstitution && (
                <span>
                  <strong className="text-[#1C1814] dark:text-[#F5EFEB]">Archive:</strong> {currentInstitution}
                </span>
              )}
              <span>
                <strong className="text-[#1C1814] dark:text-[#F5EFEB]">Source Citation:</strong> {currentArchivalSource}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 p-5 rounded-xl bg-[#FAF5EE] dark:bg-[#14110E] border border-[#C59B27]/30 dark:border-[#C59B27]/20 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-widest text-[#5B0E1B] dark:text-[#E5C378] font-mono font-bold block mb-1">
              Enduring Significance
            </span>
            <p className="text-xs text-[#382F27] dark:text-[#D5C7B8] italic font-serif leading-relaxed">
              &ldquo;{currentSignificance}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArchiveLens;
