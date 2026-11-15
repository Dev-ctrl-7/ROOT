export type SupportedLanguage =
  | "en"
  | "ta"
  | "hi"
  | "te"
  | "kn"
  | "ml"
  | "bn"
  | "mr"
  | "gu"
  | "pa"
  | "or"
  | "as";

export interface LanguageMeta {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  rootGlyph: string; // The first letter or glyph of "Roots" in that language
  rootWord: string;  // The full word for "Roots"
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: "en", name: "English", nativeName: "English", rootGlyph: "R", rootWord: "Roots", region: "Pan-India / Global" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", rootGlyph: "வே", rootWord: "வேர்", region: "Tamil Nadu, Puducherry" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", rootGlyph: "ज", rootWord: "जड़", region: "North & Central India" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", rootGlyph: "వే", rootWord: "వేరు", region: "Andhra Pradesh, Telangana" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", rootGlyph: "ಬೇ", rootWord: "ಬೇರು", region: "Karnataka" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", rootGlyph: "വേ", rootWord: "വേര്", region: "Kerala, Lakshadweep" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", rootGlyph: "শি", rootWord: "শিকড়", region: "West Bengal, Tripura" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", rootGlyph: "मू", rootWord: "मूळ", region: "Maharashtra, Goa" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", rootGlyph: "મૂ", rootWord: "મૂળ", region: "Gujarat, Daman & Diu" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", rootGlyph: "ਜ", rootWord: "ਜੜ੍ਹ", region: "Punjab, Chandigarh, Delhi" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", rootGlyph: "ଚେ", rootWord: "ଚେର", region: "Odisha" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", rootGlyph: "শি", rootWord: "শিপা", region: "Assam" },
];

export interface TranslationDictionary {
  siteTitle: string;
  tagline: string;
  subTagline: string;
  nav: {
    atlas: string;
    exhibition: string;
    timeMachine: string;
    cuisine: string;
    festivals: string;
    crafts: string;
    archiveLens: string;
    postcard: string;
    letter: string;
    passport: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    statesCounter: string;
  };
  atlas: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    enterExhibition: string;
    zoneAll: string;
  };
  letter: {
    eyebrow: string;
    title: string;
    subtitle: string;
    sealTooltip: string;
    sealBrokenText: string;
    listenAudio: string;
    pauseAudio: string;
    selectStatePrompt: string;
    salutation: string;
    signoff: string;
    author: string;
  };
  footer: {
    madeWithLove: string;
    museumTagline: string;
    copyright: string;
  };
}
