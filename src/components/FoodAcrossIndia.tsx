"use client";

import { useState, useMemo } from "react";
import { ALL_INDIAN_STATES, StateData } from "@/lib/states-data";
import { Utensils, Search, Sparkles, Coffee, Heart, ArrowRight, Leaf, Waves } from "lucide-react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { buildCloudinaryUrl } from "@/lib/cloudinary";

interface FoodAcrossIndiaProps {
  onSelectState: (stateId: string) => void;
}

export function FoodAcrossIndia({ onSelectState }: FoodAcrossIndiaProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "vegetarian" | "coastal" | "sweets">("all");

  const filteredItems = useMemo(() => {
    return ALL_INDIAN_STATES.filter((state) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        state.name.toLowerCase().includes(q) ||
        state.taste.signatureDish.toLowerCase().includes(q) ||
        state.taste.famousSweet.toLowerCase().includes(q) ||
        state.taste.traditionalBreakfast.toLowerCase().includes(q) ||
        state.taste.iconicIngredients.some((i) => i.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (activeFilter === "coastal") {
        return ["kerala", "goa", "odisha", "west-bengal", "andhra-pradesh", "tamil-nadu", "maharashtra", "gujarat", "andaman-and-nicobar", "lakshadweep"].includes(state.id);
      }
      if (activeFilter === "vegetarian") {
        return ["gujarat", "rajasthan", "haryana", "uttar-pradesh", "madhya-pradesh", "karnataka", "tamil-nadu", "punjab"].includes(state.id);
      }
      if (activeFilter === "sweets") {
        return true;
      }
      return true;
    });
  }, [searchQuery, activeFilter]);

  return (
    <section id="culinary-explorer" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-[#C59B27]/25">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 bg-[#FAF8F5] dark:bg-[#1C1713] text-[#8C5320] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.25em] font-mono shadow-xs">
          <Utensils className="w-3.5 h-3.5 text-[#C59B27]" />
          Gastronomic Cartography of India
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal tracking-tight">
          Food Across India
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#D9CEBF] max-w-xl mx-auto leading-relaxed font-light">
          From slow-simmered brass handis to temple prasadam and banana-leaf feasts across 36 regional terroirs.
        </p>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7E72]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or spices (e.g. Saffron, Cardamom, Biryani)..."
              className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-white border border-[#C59B27]/30 focus:outline-none focus:ring-2 focus:ring-[#C59B27]/50 text-[#2C241E] shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all ${
                activeFilter === "all"
                  ? "bg-[#5B0E1B] text-white font-medium"
                  : "bg-white/80 hover:bg-white text-[#423A32] border border-[#C59B27]/20"
              }`}
            >
              All Feasts ({ALL_INDIAN_STATES.length})
            </button>
            <button
              onClick={() => setActiveFilter("vegetarian")}
              className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all flex items-center gap-1 ${
                activeFilter === "vegetarian"
                  ? "bg-[#5B0E1B] text-white font-medium"
                  : "bg-white/80 hover:bg-white text-[#423A32] border border-[#C59B27]/20"
              }`}
            >
              <Leaf className="w-3 h-3 text-emerald-600" />
              Vegetarian Traditions
            </button>
            <button
              onClick={() => setActiveFilter("coastal")}
              className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all flex items-center gap-1 ${
                activeFilter === "coastal"
                  ? "bg-[#5B0E1B] text-white font-medium"
                  : "bg-white/80 hover:bg-white text-[#423A32] border border-[#C59B27]/20"
              }`}
            >
              <Waves className="w-3 h-3 text-cyan-700" />
              Coastal Seafood
            </button>
          </div>
        </div>
      </div>

      {/* Culinary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.slice(0, 12).map((state) => {
          const cuisineImageUrl = buildCloudinaryUrl({
            sourceUrl: state.taste.heroImage || state.heroImage,
            width: 700,
            height: 450,
            crop: "fill",
            gravity: "auto",
            format: "auto",
            quality: "auto",
          });

          return (
            <div
              key={state.id}
              className="group rounded-2xl bg-white border border-[#C59B27]/25 p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Image */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-[#C59B27]/20">
                  <ImageWithFallback
                    src={cuisineImageUrl}
                    fallbackSrc={state.taste.heroImage || state.heroFallback || state.heroImage}
                    alt={state.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full">
                    {state.name} &bull; {state.nativeName}
                  </div>
                </div>

              {/* Title & Signature Dish */}
              <div className="space-y-1 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] block">
                  Signature Dish
                </span>
                <h4 className="font-serif text-lg font-semibold text-[#1C1814] leading-tight">
                  {state.taste.signatureDish}
                </h4>
              </div>

              {/* Traditional Breakfast & Sweet */}
              <div className="space-y-2 text-xs text-[#54483C] pb-3 border-t border-[#C59B27]/15 pt-3">
                <div className="flex items-start gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-medium">Breakfast:</strong> {state.taste.traditionalBreakfast}
                  </span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#5B0E1B] shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-medium">Heirloom Sweet:</strong> {state.taste.famousSweet}
                  </span>
                </div>
              </div>

              {/* Iconic Ingredients Badges */}
              <div className="flex flex-wrap gap-1 pt-2">
                {state.taste.iconicIngredients.slice(0, 4).map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#5B0E1B] border border-[#C59B27]/25"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Jump to State Exhibition */}
            <button
              onClick={() => {
                onSelectState(state.id);
                const el = document.getElementById("state-exhibition");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-4 w-full py-2 rounded-xl text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 text-[#5B0E1B] hover:bg-[#5B0E1B] hover:text-white border border-[#5B0E1B]/30 transition-all"
            >
              <span>Explore {state.name} Kitchen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          );
        })}
      </div>
    </section>
  );
}

export default FoodAcrossIndia;
