"use client";

import React from "react";
import { Sun, Flame, Sparkles } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

export function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useTheme();

  const isDark = isMounted ? theme === "dark" : false;

  return (
    <button
      onClick={toggleTheme}
      suppressHydrationWarning
      aria-label={isDark ? "Switch to Warm Ivory Light Mode" : "Switch to Festive Diya Night Mode"}
      title={isDark ? "Active: Festive Diya & Fireworks Night (Click for Light Mode)" : "Active: Warm Sunlit Ivory (Click for Festive Diya Night)"}
      className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-2 transition-all duration-300 select-none ${
        isDark
          ? "border-[#D4AF37]/60 bg-[#1F1712] text-[#E5C378] hover:border-[#E5C378] hover:bg-[#2A1E16] shadow-[0_0_15px_rgba(212,175,55,0.25)]"
          : "border-[#C59B27]/35 bg-white text-[#5B0E1B] hover:border-[#C59B27] hover:bg-[#FAF5EE] shadow-xs"
      }`}
    >
      {isDark ? (
        <>
          {/* Diya SVG Icon with Flickering Flame */}
          <div className="relative flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse fill-amber-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-200 absolute -top-0.5 animate-ping opacity-75" />
          </div>
          <span className="text-[10px] uppercase tracking-wider font-mono text-[#E5C378] whitespace-nowrap">
            दीपक • Diya Night
          </span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-[#C59B27] transition-transform duration-300 hover:rotate-45" />
          <span className="text-[10px] uppercase tracking-wider font-mono text-[#5B0E1B] whitespace-nowrap">
            Sunlit Ivory
          </span>
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
