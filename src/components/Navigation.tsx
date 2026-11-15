"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  Compass,
  Mail,
  Sparkles,
  BookOpen,
  Clock,
  Utensils,
  Award,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { ambientSound } from "@/lib/ambient-audio";
import { useLanguage } from "@/lib/i18n/context";
import { useSidebar } from "@/lib/sidebar/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

interface NavigationProps {
  onOpenInspector?: () => void;
}

export function Navigation({ onOpenInspector }: NavigationProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { isOpen, toggleSidebar } = useSidebar();
  const { t, rootGlyph } = useLanguage();
  const pathname = usePathname();

  const toggleSound = async () => {
    const active = await ambientSound.toggle();
    setIsPlayingAudio(active);
  };

  const navLinks = [
    { href: "/atlas", label: t.nav.atlas, icon: Compass, badge: "Surveyed" },
    { href: "/exhibition", label: t.nav.exhibition, icon: BookOpen, badge: "36 Regions" },
    { href: "/time-machine", label: t.nav.timeMachine, icon: Clock, badge: "5,000 Yrs" },
    { href: "/cuisine", label: t.nav.cuisine, icon: Utensils, badge: "Flavors" },
    { href: "/archive-lens", label: t.nav.archiveLens, icon: Award, badge: "1868—Now" },
    { href: "/postcard", label: t.nav.postcard, icon: Mail, badge: "Atelier" },
    { href: "/letter", label: t.nav.letter, icon: Sparkles, badge: "Wax Seal" },
    { href: "/passport", label: t.nav.passport, icon: Award, badge: "Passport" },
  ];

  return (
    <>
      {/* 1. FLOATING RE-OPEN BUTTON (Smoothly appears on desktop when sidebar is closed) */}
      <button
        onClick={toggleSidebar}
        title="Open Museum Menu (Expand Sidebar)"
        aria-label="Open Museum Menu"
        className={`fixed top-5 left-5 z-40 hidden lg:inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[#C59B27]/40 bg-[#FAF8F5]/95 dark:bg-[#120F0D]/95 backdrop-blur-md text-[#5B0E1B] dark:text-[#E5C378] shadow-lg hover:border-[#C59B27] hover:scale-105 transition-all duration-300 select-none ${
          isOpen
            ? "opacity-0 pointer-events-none -translate-x-6 scale-95"
            : "opacity-100 pointer-events-auto translate-x-0 scale-100"
        }`}
      >
        <PanelLeftOpen className="w-4 h-4 text-[#C59B27] dark:text-[#D4AF37]" />
        <div className="w-5 h-5 rounded-full border border-[#C59B27] flex items-center justify-center bg-[#FAF5EE] dark:bg-[#1A1613] text-[10px] font-serif font-bold text-[#5B0E1B] dark:text-[#D4AF37]">
          {rootGlyph}
        </div>
        <span className="text-xs font-serif uppercase tracking-wider font-semibold">
          Menu
        </span>
      </button>

      {/* 2. DESKTOP SIDEWISE MENUBAR (Collapsible & Openable) */}
      <aside
        className={`hidden lg:flex fixed top-0 left-0 bottom-0 w-64 xl:w-72 z-50 flex-col justify-between bg-[#FAF8F5]/98 dark:bg-[#120F0D]/98 backdrop-blur-md border-r border-[#C59B27]/25 dark:border-[#C59B27]/30 shadow-sm transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Museum Wings Navigation"
      >
        {/* Brand & Monogram Header with Close Toggle */}
        <div className="p-5 pb-4 border-b border-[#C59B27]/20 dark:border-[#C59B27]/25">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center space-x-3 focus:outline-none min-w-0">
              <div className="w-9 h-9 rounded-full border border-[#C59B27] flex items-center justify-center bg-[#FAF5EE] dark:bg-[#1A1613] group-hover:bg-[#5B0E1B] dark:group-hover:bg-[#C59B27] transition-all duration-300 shadow-xs shrink-0">
                <span className="text-[#5B0E1B] group-hover:text-[#D4AF37] dark:text-[#D4AF37] dark:group-hover:text-[#0C0A09] font-serif text-sm font-semibold transition-colors">
                  {rootGlyph}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-lg tracking-[0.2em] text-[#1C1814] dark:text-[#F5EFEB] font-normal leading-none group-hover:text-[#5B0E1B] dark:group-hover:text-[#D4AF37] transition-colors truncate">
                  {t.siteTitle}
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#8C5320] dark:text-[#C59B27] font-mono mt-0.5 truncate">
                  {t.tagline}
                </span>
              </div>
            </Link>

            {/* Close / Collapse Sidebar Button */}
            <button
              onClick={toggleSidebar}
              title="Close Menu (Collapse Sidebar)"
              aria-label="Collapse Sidebar Menu"
              className="p-1.5 rounded-lg border border-[#C59B27]/30 text-[#8C7E72] hover:text-[#5B0E1B] dark:hover:text-[#D4AF37] hover:border-[#C59B27] bg-[#FAF5EE] dark:bg-[#1A1613] transition-all shrink-0 hover:scale-105"
            >
              <PanelLeftClose className="w-4 h-4 text-[#C59B27] dark:text-[#D4AF37]" />
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#C59B27]/15 dark:border-[#C59B27]/20 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#8C7E72] dark:text-[#A89886] uppercase">
            <span>Living Museum</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] animate-pulse" />
          </div>
        </div>

        {/* Vertical Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C7E72] dark:text-[#A89886]">
            Museum Wings
          </div>

          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-sans tracking-wide transition-all duration-200 select-none ${
                  isActive
                    ? "bg-[#5B0E1B] text-white font-medium shadow-sm dark:bg-[#C59B27] dark:text-[#0C0A09]"
                    : "text-[#423A32] dark:text-[#D9CEBF] hover:text-[#5B0E1B] dark:hover:text-[#F5EFEB] hover:bg-[#5B0E1B]/8 dark:hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive
                        ? "text-[#D4AF37] dark:text-[#0C0A09]"
                        : "text-[#C59B27] dark:text-[#D4AF37] group-hover:scale-110"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full tracking-wider uppercase transition-colors shrink-0 ${
                    isActive
                      ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#0C0A09]"
                      : "text-[#8C7E72] dark:text-[#A89886] group-hover:text-[#5B0E1B] dark:group-hover:text-[#D4AF37]"
                  }`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Utility Cluster (Theme Toggle, Language Switcher, Ambient Audio) */}
        <div className="p-4 border-t border-[#C59B27]/20 dark:border-[#C59B27]/25 space-y-3 bg-[#FAF5EE]/50 dark:bg-[#0E0C0A]/60">
          <div className="flex items-center justify-between gap-2">
            {/* Theme Toggle (Festive Diya vs Sunlit Ivory) */}
            <ThemeToggle />

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* Procedural Soundscape Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isPlayingAudio ? "Mute ambient soundscape" : "Listen to ambient soundscape"}
            title={isPlayingAudio ? "Mute Ambient Sitar & Tanpura" : "Play Ambient Soundscape (Sitar & Tanpura)"}
            className={`w-full py-2 px-3 rounded-xl border text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
              isPlayingAudio
                ? "border-[#C59B27] bg-[#C59B27]/15 text-[#5B0E1B] dark:text-[#E5C378] shadow-xs"
                : "border-[#C59B27]/30 bg-white dark:bg-[#1A1613] text-[#6E6255] dark:text-[#A89886] hover:text-[#1C1814] dark:hover:text-[#F5EFEB] hover:border-[#C59B27]"
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37] animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#5B0E1B] dark:text-[#E5C378]">
                  Ambience On
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#6E6255] dark:text-[#8C7E72]" />
                <span className="text-[10px] uppercase tracking-wider font-mono">
                  Sitar Ambience
                </span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* 3. MOBILE TOP BAR (< lg screens) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#0C0A09]/95 backdrop-blur-md border-b border-[#C59B27]/25 dark:border-[#C59B27]/30 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full border border-[#C59B27] flex items-center justify-center bg-[#FAF5EE] dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#D4AF37] font-serif text-sm font-semibold">
            {rootGlyph}
          </div>
          <span className="font-serif text-lg tracking-[0.2em] text-[#1C1814] dark:text-[#F5EFEB]">
            {t.siteTitle}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 rounded-xl border border-[#C59B27]/30 bg-white dark:bg-[#1A1613] text-[#423A32] dark:text-[#D9CEBF]"
            aria-label="Open Sidewise Navigation Menu"
          >
            <Menu className="w-5 h-5 text-[#5B0E1B] dark:text-[#D4AF37]" />
          </button>
        </div>
      </header>

      {/* 4. MOBILE OFF-CANVAS SIDEWISE DRAWER */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fade-in"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Sliding drawer */}
          <div className="relative w-72 max-w-[80vw] bg-[#FAF8F5] dark:bg-[#120F0D] h-full shadow-2xl flex flex-col justify-between border-r border-[#C59B27]/30 z-10 animate-in slide-in-from-left duration-300">
            <div className="p-5 border-b border-[#C59B27]/20 dark:border-[#C59B27]/25 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full border border-[#C59B27] flex items-center justify-center bg-[#FAF5EE] dark:bg-[#1A1613] text-[#5B0E1B] dark:text-[#D4AF37] font-serif text-sm font-semibold">
                  {rootGlyph}
                </div>
                <span className="font-serif text-lg tracking-wider text-[#1C1814] dark:text-[#F5EFEB]">
                  {t.siteTitle}
                </span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-[#6E6255] hover:text-[#1C1814] dark:hover:text-[#FAF5EE]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-sans tracking-wide transition-all ${
                      isActive
                        ? "bg-[#5B0E1B] text-white font-medium shadow-sm dark:bg-[#C59B27] dark:text-[#0C0A09]"
                        : "text-[#423A32] dark:text-[#D9CEBF] hover:bg-[#FAF5EE] dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#D4AF37] dark:text-[#0C0A09]" : "text-[#C59B27]"}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#C59B27]/20 dark:border-[#C59B27]/25 space-y-3 bg-[#FAF5EE]/60 dark:bg-[#181411]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#8C7E72] dark:text-[#A89886]">Language</span>
                <LanguageSwitcher />
              </div>
              <button
                onClick={toggleSound}
                className="w-full py-2 px-3 rounded-xl border border-[#C59B27]/30 text-xs flex items-center justify-center gap-2 text-[#5B0E1B] dark:text-[#E5C378]"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#C59B27]" />
                <span className="font-mono text-[10px] uppercase">
                  {isPlayingAudio ? "Mute Ambience" : "Play Sitar Ambience"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
