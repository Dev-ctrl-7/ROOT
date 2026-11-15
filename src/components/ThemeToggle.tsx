"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme/context";

export function ThemeToggle() {
  const { theme, setTheme, isMounted } = useTheme();

  const isDark = isMounted ? theme === "dark" : false;

  return (
    <div
      role="group"
      aria-label="Theme mode toggle"
      className="inline-flex items-center p-0.5 rounded-full border border-[#C59B27]/30 dark:border-[#C59B27]/40 bg-[#FAF8F5] dark:bg-[#1A1613] shadow-xs select-none"
    >
      {/* Light Mode Icon Button */}
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Switch to light mode"
        title="Light Mode"
        className={`p-1.5 rounded-full transition-all duration-200 flex items-center justify-center ${
          !isDark
            ? "bg-[#FAF5EE] text-[#5B0E1B] shadow-xs scale-105"
            : "text-[#8C7E72] hover:text-[#5B0E1B] dark:text-[#A89886] dark:hover:text-[#FAF5EE]"
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      {/* Dark Mode Icon Button */}
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Switch to dark mode"
        title="Dark Mode"
        className={`p-1.5 rounded-full transition-all duration-200 flex items-center justify-center ${
          isDark
            ? "bg-[#2A1E16] text-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.3)] scale-105"
            : "text-[#8C7E72] hover:text-[#5B0E1B] dark:text-[#A89886] dark:hover:text-[#FAF5EE]"
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default ThemeToggle;
