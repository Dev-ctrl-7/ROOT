"use client";

import Link from "next/link";
import { Heart, Sparkles, Compass, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface FooterProps {
  onOpenInspector: () => void;
}

export function Footer({ onOpenInspector }: FooterProps) {
  const { t, rootGlyph } = useLanguage();

  return (
    <footer className="bg-[#1C1412] border-t border-[#C59B27]/30 pt-20 pb-14 px-4 sm:px-8 lg:px-12 text-[#E7DDCC]">
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand & Editorial Colophon */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full border border-[#C59B27]/40 flex items-center justify-center bg-[#2B1B18] shadow-sm">
                <span className="text-[#D4AF37] font-serif text-sm font-semibold">{rootGlyph}</span>
              </div>
              <div>
                <span className="font-serif text-xl tracking-[0.2em] text-[#FAF5EE]">
                  {t.siteTitle}
                </span>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#C59B27] font-mono">
                  {t.tagline} &bull; Digital Memory Museum
                </span>
              </div>
            </div>

            <p className="font-serif italic text-base text-[#D4AF37] max-w-md">
              &ldquo;{t.subTagline}&rdquo;
            </p>

            <p className="text-xs text-[#E7DDCC]/70 leading-relaxed max-w-md font-light">
              {t.footer.museumTagline}. Built with Next.js, Cloudinary transformations, surveyed GeoJSON cartography, and living cultural curation.
            </p>
          </div>

          {/* Quick Exhibition Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono font-bold">
              Museum Galleries
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E7DDCC]/75">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  Museum Foyer &amp; Atrium
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="hover:text-[#D4AF37] transition-colors">
                  Interactive Cultural Atlas (36 Regions)
                </Link>
              </li>
              <li>
                <Link href="/exhibition" className="hover:text-[#D4AF37] transition-colors">
                  Monochromatic State Galleries
                </Link>
              </li>
              <li>
                <Link href="/time-machine" className="hover:text-[#D4AF37] transition-colors">
                  Cultural Time Machine (5,000 Years)
                </Link>
              </li>
              <li>
                <Link href="/cuisine" className="hover:text-[#D4AF37] transition-colors">
                  Food Across India (Regional Cuisine)
                </Link>
              </li>
              <li>
                <Link href="/archive-lens" className="hover:text-[#D4AF37] transition-colors">
                  Granite &amp; Silver Halide (Archive Lens)
                </Link>
              </li>
              <li>
                <Link href="/postcard" className="hover:text-[#D4AF37] transition-colors">
                  Custom Postcard Studio &amp; Atelier
                </Link>
              </li>
              <li>
                <Link href="/letter" className="hover:text-[#D4AF37] transition-colors">
                  A Letter From Home (Epistle Archive)
                </Link>
              </li>
              <li>
                <Link href="/passport" className="hover:text-[#D4AF37] transition-colors">
                  My Cultural Passport
                </Link>
              </li>
            </ul>
          </div>

          {/* Cloudinary Architecture & Heritage Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono font-bold">
              Curatorial Engine
            </h4>
            <p className="text-xs text-[#E7DDCC]/70 leading-relaxed">
              Real-time image optimization, sepia temporal overlays, and high-definition art delivery powered by Cloudinary.
            </p>
            <button
              onClick={onOpenInspector}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs rounded-xl bg-[#2B1B18] border border-[#C59B27]/40 text-[#D4AF37] hover:bg-[#3D2521] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inspect Cloudinary Pipeline</span>
            </button>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="border-t border-[#C59B27]/20 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E7DDCC]/60 font-mono gap-4">
          <p>{t.footer.copyright}</p>
          <p className="flex items-center gap-1.5">
            <span>{t.footer.madeWithLove}</span>
            <Heart className="w-3.5 h-3.5 text-[#C59B27] fill-[#C59B27]" />
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
