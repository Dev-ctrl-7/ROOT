"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { SupportedLanguage, SUPPORTED_LANGUAGES, LanguageMeta, TranslationDictionary } from "./types";
import { TRANSLATIONS } from "./translations";

interface LanguageContextType {
  language: SupportedLanguage;
  currentLangMeta: LanguageMeta;
  t: TranslationDictionary;
  setLanguage: (lang: SupportedLanguage) => void;
  rootGlyph: string;
  rootWord: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "roots_heritage_lang";

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    if (saved && TRANSLATIONS[saved]) {
      return saved;
    }
  } catch {
    // fallback
  }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const currentLangMeta = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find((l) => l.code === language) ||
      SUPPORTED_LANGUAGES[0]
    );
  }, [language]);

  const t = useMemo(() => {
    return TRANSLATIONS[language] || TRANSLATIONS.en;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      currentLangMeta,
      t,
      setLanguage,
      rootGlyph: currentLangMeta.rootGlyph,
      rootWord: currentLangMeta.rootWord,
    }),
    [language, currentLangMeta, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
