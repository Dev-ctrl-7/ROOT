"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
      }
    } catch {
      // localStorage may fail in restricted/SSR environments
    }
  }, []);

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

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    const defaultMeta = SUPPORTED_LANGUAGES[0];
    return {
      language: "en" as SupportedLanguage,
      currentLangMeta: defaultMeta,
      t: TRANSLATIONS.en,
      setLanguage: () => {},
      rootGlyph: "R",
      rootWord: "Roots",
    };
  }
  return context;
}
