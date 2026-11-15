"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { EditorialHero } from "@/components/EditorialHero";
import { VoicesOfIndia } from "@/components/VoicesOfIndia";
import { Footer } from "@/components/Footer";
import { TransformationInspectorModal } from "@/components/TransformationInspectorModal";
import {
  Compass,
  BookOpen,
  Clock,
  Utensils,
  Award,
  Mail,
  Sparkles,
  ArrowRight,
  Landmark,
  ShieldCheck,
} from "lucide-react";

const MUSEUM_WINGS = [
  {
    href: "/atlas",
    title: "Cartographic Cultural Atlas",
    subtitle: "28 States & 8 Union Territories",
    description: "Interactive surveyed vector boundaries, sacred rivers, coordinates, and instant territorial search.",
    image: "https://res.cloudinary.com/tecwmb40/image/fetch/s--9f987a0A--/c_fill,f_auto,g_auto,h_500,q_auto,w_800/https://i.pinimg.com/originals/cc/5f/db/cc5fdb858a5d2fb16f083627d2cc5dab.png?_a=BAMAROWQ0",
    icon: Compass,
    badge: "Interactive Map",
    accent: "#5B0E1B",
  },
  {
    href: "/exhibition",
    title: "Monochromatic State Galleries",
    subtitle: "8 Living Cultural Pillars",
    description: "Deep dive into each territory's signature taste, handlooms, celebrations, architecture, and games.",
    image: "https://res.cloudinary.com/tecwmb40/image/fetch/s--2g_bWwK---/c_fill,f_auto,g_auto,h_500,q_auto,w_800/https://i.pinimg.com/originals/27/c8/8c/27c88c13e546101408075eabd1fc2e79.jpg?_a=BAMAROWQ0",
    icon: BookOpen,
    badge: "Exhibitions",
    accent: "#7A2E16",
  },
  {
    href: "/time-machine",
    title: "Cultural Time Machine",
    subtitle: "5,000 Years of Memory",
    description: "Traverse the Vedic dawn, Sangam poetics, Chola granite marvels, courtly miniatures, and modern revival.",
    image: "https://res.cloudinary.com/tecwmb40/image/fetch/s--s523z_fM--/c_fill,f_auto,g_auto,h_500,q_auto,w_800/https://i.pinimg.com/originals/bb/20/fa/bb20fa83de10e5d7939f0a8e9a72a1c1.jpg?_a=BAMAROWQ0",
    icon: Clock,
    badge: "Chronology",
    accent: "#8B6508",
  },
  {
    href: "/cuisine",
    title: "Food Across India",
    subtitle: "Gastronomic Terroirs",
    description: "Explore slow-cooked curries, heirloom temple prasadam, breakfast traditions, and signature ingredients.",
    image: "https://res.cloudinary.com/tecwmb40/image/fetch/s--65iE6k3q--/c_fill,f_auto,g_auto,h_500,q_auto,w_800/https://i.pinimg.com/originals/95/32/68/953268fd949058c5a44751edeb7d5394.jpg?_a=BAMAROWQ0",
    icon: Utensils,
    badge: "Culinary",
    accent: "#0A4642",
  },
  {
    href: "/archive-lens",
    title: "Granite & Silver Halide",
    subtitle: "Temporal Archive Lens",
    description: "Slide across centuries comparing 19th-century albumen archaeological plates with contemporary worship.",
    image: "https://res.cloudinary.com/tecwmb40/image/fetch/s--tOZENoai--/c_fill,f_auto,g_auto,h_500,q_auto,w_800/https://i.pinimg.com/originals/94/2f/cb/942fcb3edb34bce390710a00f497e447.jpg?_a=BAMAROWQ0",
    icon: Award,
    badge: "Temporal Lens",
    accent: "#5B0E1B",
  },
  {
    href: "/postcard",
    title: "Custom Postcard Atelier",
    subtitle: "Craft, Stamp & Send via Mail",
    description: "Snap or choose a photo, pick a postal stamp from all 36 territories, write a letter, and mail it via Cloudinary.",
    image: "https://res.cloudinary.com/tecwmb40/image/fetch/s---qHJZXIR--/c_fill,f_auto,g_auto,h_500,q_auto,w_800/https://i.pinimg.com/originals/c1/16/f8/c116f85d0a3c5b283e9576cb447983d7.jpg?_a=BAMAROWQ0",
    icon: Mail,
    badge: "Interactive Studio",
    accent: "#C59B27",
  },
  {
    href: "/letter",
    title: "A Letter From Home",
    subtitle: "The Surprise Archive",
    description: "Break the ancient 3D royal wax seal to read an intimate epistle carrying the petrichor of home.",
    image: "https://res.cloudinary.com/tecwmb40/image/fetch/s--fFb2xdwB--/c_fill,f_auto,g_auto,h_500,q_auto,w_800/https://i.pinimg.com/736x/bc/d6/6c/bcd66c341d101b2bef9b639ccddc2d5a.jpg?_a=BAMAROWQ0",
    icon: Sparkles,
    badge: "Epistle Archive",
    accent: "#5B0E1B",
  },
  {
    href: "/passport",
    title: "My Cultural Passport",
    subtitle: "Visitor Explorer Logbook",
    description: "Collect digital territorial stamps for every region you explore and track your percentage of India discovered.",
    image: "https://res.cloudinary.com/tecwmb40/image/fetch/s--MW8Gohtv--/c_fill,f_auto,g_auto,h_500,q_auto,w_800/https://i.pinimg.com/originals/ad/a6/3e/ada63e95dd1664300f3440769160bb12.jpg?_a=BAMAROWQ0",
    icon: ShieldCheck,
    badge: "Consular Passbook",
    accent: "#7A2E16",
  },
];

export default function Home() {
  const [inspectorOpen, setInspectorOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1814] dark:text-[#F5EFEB] selection:bg-[#C59B27] selection:text-[#FAF8F5] relative overflow-x-hidden transition-colors duration-300">
      {/* Editorial Navigation Bar */}
      <Navigation onOpenInspector={() => setInspectorOpen(true)} />

      {/* 1. Grand Editorial Hero with Sandstone Arch & Taj Mahal */}
      <EditorialHero />

      {/* 2. Organized Museum Wings Directory */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C59B27]/40 bg-white dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#E5C378] text-[10px] uppercase tracking-[0.25em] font-mono shadow-xs">
            <Landmark className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
            Permanent Exhibition Wings
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1814] dark:text-[#F5EFEB] font-normal tracking-tight">
            Explore the Museum by Wing
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6E6255] dark:text-[#A89886] max-w-xl mx-auto leading-relaxed font-light">
            Each hall is dedicated to a distinct facet of India&apos;s living heritage. Select a wing below to begin your focused journey.
          </p>
        </div>

        {/* Wings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MUSEUM_WINGS.map((wing) => {
            const Icon = wing.icon;

            return (
              <Link
                key={wing.href}
                href={wing.href}
                className="group rounded-2xl bg-white dark:bg-[#151210] border border-[#C59B27]/25 dark:border-[#C59B27]/35 p-5 shadow-xs hover:shadow-xl hover:border-[#C59B27] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-[#C59B27]/20 dark:border-[#C59B27]/30">
                    <Image
                      src={wing.image}
                      alt={wing.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {wing.badge}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7E72] dark:text-[#A89886] block">
                      {wing.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-normal text-[#1C1814] dark:text-[#F5EFEB] group-hover:text-[#5B0E1B] dark:group-hover:text-[#D4AF37] transition-colors leading-tight">
                      {wing.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#54483C] dark:text-[#D9CEBF] font-sans leading-relaxed line-clamp-3">
                    {wing.description}
                  </p>
                </div>

                {/* Entry Action */}
                <div className="mt-5 pt-3 border-t border-[#C59B27]/15 dark:border-[#C59B27]/25 flex items-center justify-between text-xs font-serif uppercase tracking-wider text-[#5B0E1B] dark:text-[#E5C378] group-hover:text-[#7A1D26] dark:group-hover:text-[#F0D597]">
                  <span>Enter Wing</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Voices & Resonances of India (Acoustic Foyer Feature) */}
      <VoicesOfIndia />

      {/* 4. Museum Colophon & Footer */}
      <Footer onOpenInspector={() => setInspectorOpen(true)} />

      {/* Cloudinary Transformation Inspector Modal */}
      <TransformationInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
      />
    </main>
  );
}
