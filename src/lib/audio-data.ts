/**
 * ROOTS — The Soul of India
 * Authentic Indian Musical Instruments Audio Dataset
 *
 * Replaces synthetic Web Audio oscillator approximations with authentic, verified
 * recordings of traditional Indian classical and ceremonial instruments.
 */

export interface AuthenticInstrument {
  id: string;
  name: string;
  nativeName: string;
  region: string;
  tradition: string;
  description: string;
  cloudinaryPublicId: string;
  recordingTitle: string;
  performer: string;
  source: string;
  license: string;
  licenseUrl: string;
  durationSeconds: number;
  formattedDuration: string;
  audioSrc: string;
  baseColor: string;
  buttonActionLabel: string;
}

export const AUTHENTIC_INSTRUMENTS: AuthenticInstrument[] = [
  {
    id: "nadaswaram",
    name: "Nadaswaram",
    nativeName: "நாதஸ்வரம்",
    region: "Tamil Nadu & South India",
    tradition: "Mangala Isai & Temple Ceremonies",
    description:
      "The premier double-reed acoustic wind instrument of South India, crafted from seasoned aacha wood with a flaring brass bell. Traditionally sounded at dawn and dusk across Dravidian temple gopurams.",
    cloudinaryPublicId: "roots/audio/instruments/nadaswaram",
    recordingTitle: "Temple Deeparadhana Mangala Isai",
    performer: "Vis M & Traditional Tamil Temple Musicians",
    source: "Wikimedia Commons Cultural Audio Archive (File:Thakil & Nadaswaram during temple Deeparadhana.ogg)",
    license: "CC BY 4.0 International",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    durationSeconds: 615,
    formattedDuration: "10:15",
    audioSrc: "/audio/instruments/nadaswaram.mp3",
    baseColor: "#8C5320",
    buttonActionLabel: "Listen to Authentic Performance",
  },
  {
    id: "sitar",
    name: "Sitar",
    nativeName: "सितार",
    region: "Northern & Central India",
    tradition: "Hindustani Classical Ragas",
    description:
      "A classical long-necked plucked lute carved from seasoned teakwood with a gourd resonator, curved movable brass frets, and sympathetic resonant strings generating shimmering overtones.",
    cloudinaryPublicId: "roots/audio/instruments/sitar",
    recordingTitle: "Raag Yaman Alap & Jod Recital",
    performer: "Tito Dutta (Classical Sitar Recitalist)",
    source: "Wikimedia Commons Heritage Collection (File:Sitar sample yaman.ogg)",
    license: "CC BY-SA 3.0 Unported",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    durationSeconds: 103,
    formattedDuration: "1:43",
    audioSrc: "/audio/instruments/sitar.mp3",
    baseColor: "#5B0E1B",
    buttonActionLabel: "Listen to Authentic Performance",
  },
  {
    id: "veena",
    name: "Saraswati Veena",
    nativeName: "ವೀಣೆ / வீணை",
    region: "Karnataka, Andhra Pradesh & Tamil Nadu",
    tradition: "Carnatic Classical Chamber Concerts",
    description:
      "The sacred 24-fretted lute of Goddess Saraswati, sculpted from seasoned jackfruit wood (Palagai) with brass dragon head (Yali) carving and beeswax fretboard.",
    cloudinaryPublicId: "roots/audio/instruments/veena",
    recordingTitle: "Viriboni Varnam in Bhairavi Ragam (Ata Talam)",
    performer: "Smt. Pushpa Srivatsan (Carnatic Veena Vidushi)",
    source: "Wikimedia Commons Classical Archive (File:Viriboni, rendered on the Veena.ogg)",
    license: "Creative Commons Zero 1.0 (Public Domain Dedication)",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    durationSeconds: 813,
    formattedDuration: "13:33",
    audioSrc: "/audio/instruments/veena.mp3",
    baseColor: "#9E5C31",
    buttonActionLabel: "Listen to Authentic Performance",
  },
  {
    id: "bansuri",
    name: "Bansuri (Indian Bamboo Flute)",
    nativeName: "बांसुरी",
    region: "Northern India & Pan-Subcontinent",
    tradition: "Pastoral Devotion & Classical Dhrupad",
    description:
      "A seamless transverse flute fashioned from a single joint of Assam bamboo with six fingerholes, tuned naturally to natural breath with microtonal glides (meend).",
    cloudinaryPublicId: "roots/audio/instruments/bansuri",
    recordingTitle: "Hindustani Meditation on E Bass Flute",
    performer: "Traditional Indian Bansuri Master",
    source: "Wikimedia Commons Acoustic Sample Archive (File:Bansuri sample E bass.ogg)",
    license: "Public Domain Dedication",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    durationSeconds: 99,
    formattedDuration: "1:39",
    audioSrc: "/audio/instruments/bansuri.mp3",
    baseColor: "#0A4642",
    buttonActionLabel: "Listen to Authentic Performance",
  },
  {
    id: "shehnai",
    name: "Shehnai",
    nativeName: "शहनाई",
    region: "Uttar Pradesh (Varanasi & Awadh)",
    tradition: "Ganga Ghat Celebrations & Auspicious Rituals",
    description:
      "A quadruple-reed conical oboe of North India, traditionally sounded from royal naubat khanas and the dawn ghats of Varanasi, immortalized worldwide by Ustad Bismillah Khan.",
    cloudinaryPublicId: "roots/audio/instruments/shehnai",
    recordingTitle: "Classical Shehnai Thumri in Raag Kafi",
    performer: "B. M. Devalankar (Classical Shehnai Virtuoso)",
    source: "Internet Archive Historical 78 RPM Indian Classical Collection (a_20230916_20230916_1550)",
    license: "Historic Public Domain (Indian Copyright Act 1957 Section 27, recordings >60 years)",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    durationSeconds: 178,
    formattedDuration: "2:58",
    audioSrc: "/audio/instruments/shehnai.mp3",
    baseColor: "#C59B27",
    buttonActionLabel: "Listen to Authentic Performance",
  },
  {
    id: "mridangam",
    name: "Mridangam",
    nativeName: "மிருதங்கம்",
    region: "South India (Carnatic Classical)",
    tradition: "Thani Avarthanam & Percussion Ensembles",
    description:
      "The divine primary rhythmic instrument of South Indian classical music. A two-headed barrel drum carved from jackwood with goat and calf skins, loaded with black iron-paste satham for pitch resonance.",
    cloudinaryPublicId: "roots/audio/instruments/mridangam",
    recordingTitle: "Thani Avarthanam in Mishra Chappu Tala",
    performer: "Vishwaprasanna (Carnatic Mridangam Artist)",
    source: "Internet Archive Carnatic Tala Archive (Vishwaprasanna_2016-11-08_Taniavartanam_Mishra_Chappu)",
    license: "Creative Commons Attribution-NonCommercial-NoDerivs 3.0 (CC BY-NC-ND 3.0)",
    licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/3.0/",
    durationSeconds: 379,
    formattedDuration: "6:19",
    audioSrc: "/audio/instruments/mridangam.mp3",
    baseColor: "#7A2E16",
    buttonActionLabel: "Play Rhythmic Solo",
  },
];
