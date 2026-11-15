"use client";

import React from "react";
import {
  Crown,
  Landmark,
  Palmtree,
  Wheat,
  Sparkles,
  BookOpen,
  Music,
  Shield,
  Coffee,
  MountainSnow,
  Moon,
  Sun,
  Gem,
  Flame,
  Compass,
  Feather,
  Trees,
  Waves,
  Medal,
  Hammer,
  Flower2,
  Sunrise,
  Wind,
  SunMedium,
  Target,
  Heart,
  TreePine,
  Castle,
  CloudRain,
  Building2,
  Mountain,
  DraftingCompass,
  Anchor,
  Ship,
  Fish,
  Lamp,
} from "lucide-react";

interface MotifIconProps {
  stateId: string;
  className?: string;
  color?: string;
}

/**
 * 36 Distinct, Non-Repeating Cultural Icons for All 28 States & 8 Union Territories
 */
export const STATE_ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  // 28 Indian States (1-28)
  "rajasthan": Crown,                          // Land of Kings, Forts & Royalty
  "tamil-nadu": Landmark,                      // Dravidian Gopurams & Temple Architecture
  "kerala": Palmtree,                          // Tropical Backwaters & Coconut Groves
  "punjab": Wheat,                             // Granary of India & Baisakhi Golden Harvest
  "gujarat": Sparkles,                         // Garba Raas, Mirrorwork & Diamond Hub
  "west-bengal": BookOpen,                     // Literature, Tagore & Arts
  "karnataka": Music,                          // Carnatic Music, Veena & Classical Heritage
  "maharashtra": Shield,                       // Maratha Hill Forts & Chhatrapati Shivaji Legacy
  "assam": Coffee,                             // World-Famous Assam Tea Gardens
  "jammu-and-kashmir": MountainSnow,           // Himalayan Snow & Chinar Valleys
  "jammu-kashmir": MountainSnow,               // Alias
  "uttar-pradesh": Moon,                       // Sangam, Classical Awadh & Braj Heritage
  "odisha": Sun,                               // Konark Sun Temple & Puri Jagannath
  "andhra-pradesh": Gem,                       // Golconda Diamonds & Kuchipudi Heritage
  "telangana": Flame,                          // Kakatiya Torches & Bathukamma Floral Spirit
  "madhya-pradesh": Compass,                   // Geographic & Monumental Heart of India
  "bihar": Feather,                            // Nalanda University & Ancient Scribes
  "himachal-pradesh": Trees,                   // Himalayan Deodar & Pine Forest Valleys
  "goa": Waves,                                // Arabian Sea Sands & Mandovi Waves
  "haryana": Medal,                            // Wrestling Champions & Kurukshetra
  "jharkhand": Hammer,                         // Chota Nagpur Artisans & Mineral Plateau
  "chhattisgarh": Flower2,                     // Bastar Floral Traditions & Dhokra Art
  "uttarakhand": Sunrise,                      // Devbhoomi Dawn over Himalayan Summits
  "sikkim": Wind,                              // Himalayan Winds & Monastery Prayer Flags
  "arunachal-pradesh": SunMedium,              // Land of Dawn-Lit Mountains (First Sunrise)
  "nagaland": Target,                          // Naga Warrior Traditions & Hornbill Archery
  "manipur": Heart,                            // Classical Raas Dance & Loktak Lake
  "mizoram": TreePine,                         // Blue Mountain Peaks & Bamboo Hills
  "tripura": Castle,                           // Neermahal Water Palace & Manikya Dynasty
  "meghalaya": CloudRain,                      // Abode of Clouds & Living Root Bridges

  // 8 Union Territories (29-36)
  "delhi": Building2,                          // National Capital & Red Fort Monoliths
  "ladakh": Mountain,                          // High Altitude Passes & Moonland Monasteries
  "chandigarh": DraftingCompass,               // Le Corbusier Modernist City Grid
  "puducherry": Anchor,                        // French Maritime Quarters & Promenade
  "andaman-and-nicobar": Ship,                 // Bay of Bengal Maritime Archipelago
  "lakshadweep": Fish,                         // Coral Reefs, Lagoons & Marine Life
  "dadra-and-nagar-haveli-and-daman-and-diu": Lamp, // Diu Portuguese Lighthouse & Forts
  "dadra-nagar-haveli-daman-diu": Lamp,        // Alias
};

export function MotifIcon({ stateId, className = "w-4 h-4", color }: MotifIconProps) {
  const IconComponent = STATE_ICON_MAP[stateId] || Landmark;
  return <IconComponent className={className} style={color ? { color } : undefined} />;
}

export default MotifIcon;
