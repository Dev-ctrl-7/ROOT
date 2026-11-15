"use client";

import React from "react";
import {
  Landmark,
  Palmtree,
  Wheat,
  Sparkles,
  Shield,
  Music,
  BookOpen,
  Sun,
  Leaf,
  Mountain,
  MountainSnow,
  Trees,
  Waves,
  Anchor,
  Fish,
  Flower2,
  Compass,
  Flame,
  Feather,
  CloudRain,
  Sunrise,
  Crown,
} from "lucide-react";

interface MotifIconProps {
  stateId: string;
  className?: string;
  color?: string;
}

const STATE_ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "rajasthan": Crown,
  "tamil-nadu": Landmark,
  "kerala": Palmtree,
  "punjab": Wheat,
  "gujarat": Sparkles,
  "maharashtra": Shield,
  "karnataka": Music,
  "west-bengal": BookOpen,
  "odisha": Sun,
  "assam": Leaf,
  "ladakh": Mountain,
  "jammu-kashmir": MountainSnow,
  "himachal-pradesh": Trees,
  "uttarakhand": Mountain,
  "goa": Waves,
  "andaman-and-nicobar": Palmtree,
  "lakshadweep": Waves,
  "delhi": Landmark,
  "puducherry": Flower2,
  "chandigarh": Compass,
  "andhra-pradesh": Sun,
  "telangana": Landmark,
  "bihar": Sun,
  "madhya-pradesh": Feather,
  "uttar-pradesh": Landmark,
  "haryana": Wheat,
  "chhattisgarh": Trees,
  "jharkhand": Flame,
  "sikkim": MountainSnow,
  "tripura": Landmark,
  "meghalaya": CloudRain,
  "manipur": Sparkles,
  "mizoram": Trees,
  "nagaland": Feather,
  "arunachal-pradesh": Sunrise,
  "dadra-nagar-haveli-daman-diu": Waves,
};

export function MotifIcon({ stateId, className = "w-4 h-4", color }: MotifIconProps) {
  const IconComponent = STATE_ICON_MAP[stateId] || Landmark;
  return <IconComponent className={className} style={color ? { color } : undefined} />;
}

export default MotifIcon;
