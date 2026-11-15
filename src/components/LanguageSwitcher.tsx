"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/i18n/types";
import { Globe, Check, ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage, currentLangMeta } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-serif tracking-wide bg-[#FAF8F5] hover:bg-white dark:bg-[#1A1613] dark:hover:bg-[#251F1A] text-[#2C241E] dark:text-[#FAF5EE] border border-[#C59B27]/30 dark:border-[#C59B27]/50 shadow-xs hover:border-[#C59B27] transition-all"
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
        <span className="font-medium">{currentLangMeta.nativeName}</span>
        <span className="w-4 h-4 rounded-full bg-[#5B0E1B] dark:bg-[#C59B27] text-[#D4AF37] dark:text-[#0C0A09] text-[10px] flex items-center justify-center font-bold">
          {currentLangMeta.rootGlyph}
        </span>
        <ChevronDown className={`w-3 h-3 text-[#8C7E72] dark:text-[#A89886] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#FFFDF9] dark:bg-[#181411] border border-[#C59B27]/30 dark:border-[#C59B27]/40 shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-[#8C7E72] dark:text-[#A89886] border-b border-[#C59B27]/15 dark:border-[#C59B27]/25">
            Select Language • 12 Indian Scripts
          </div>
          <div className="max-h-72 overflow-y-auto py-1 scrollbar-thin">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as SupportedLanguage);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? "bg-[#5B0E1B]/10 dark:bg-[#C59B27]/20 text-[#5B0E1B] dark:text-[#E5C378] font-semibold"
                      : "text-[#423A32] dark:text-[#D9CEBF] hover:bg-[#F5EFEB] dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#FAF4EC] border border-[#C59B27]/30 text-[#5B0E1B] text-xs flex items-center justify-center font-bold">
                      {lang.rootGlyph}
                    </span>
                    <div>
                      <div className="font-serif text-sm leading-tight text-[#2C241E]">
                        {lang.nativeName}
                      </div>
                      <div className="text-[10px] font-sans text-[#8C7E72] leading-tight">
                        {lang.name} • &ldquo;{lang.rootWord}&rdquo;
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#5B0E1B]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
