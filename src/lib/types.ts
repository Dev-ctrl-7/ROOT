export interface SensoryProfile {
  scent: {
    title: string;
    description: string;
  };
  sound: {
    title: string;
    description: string;
  };
  taste: {
    title: string;
    description: string;
  };
  touch: {
    title: string;
    description: string;
  };
}

export interface PillarStory {
  title: string;
  subtitle: string;
  description: string;
  tactileDetail: string;
  imagePublicId: string;
  imageFallback: string;
  caption: string;
  cloudinaryCropGravity?: string;
}

export interface RegionChapter {
  id: string;
  name: string;
  tamilName: string;
  tagline: string;
  epoch: string;
  location: string;
  geoCoordinates: string;
  heroPublicId: string;
  heroFallback: string;
  heroQuote: string;
  quoteAuthor: string;
  overview: string;
  sensory: SensoryProfile;
  architecture: PillarStory;
  culinary: PillarStory;
  craft: PillarStory;
  livingMemory: {
    title: string;
    recordedYear: string;
    storyteller: string;
    narrative: string;
  };
}

export interface ArchiveLensComparison {
  id: string;
  regionId: string;
  title: string;
  location: string;
  yearThen: string;
  yearNow: string;
  historicalContext: string;
  archivalSource: string;
  imageThenPublicId: string;
  imageThenFallback: string;
  imageNowPublicId: string;
  imageNowFallback: string;
  significance: string;
}

export interface PostcardPreset {
  id: string;
  title: string;
  regionId: string;
  regionName: string;
  postmarkCity: string;
  imagePublicId: string;
  imageFallback: string;
  defaultMessage: string;
  defaultRecipient: string;
  stampLabel: string;
}

export type PostcardFilterType = "heritage_sepia" | "golden_hour" | "temple_dusk" | "monochrome" | "none";

export interface PostcardState {
  recipient: string;
  sender: string;
  message: string;
  regionId: string;
  selectedPresetId: string;
  customImageUrl?: string;
  filter: PostcardFilterType;
  cropAspect: "postcard" | "square" | "story";
}
