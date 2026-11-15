"use client";

import React from "react";
import { useSidebar } from "@/lib/sidebar/context";

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, isMounted } = useSidebar();

  // Before hydration, default to open margin to match SSR
  const openClass = !isMounted || isOpen ? "lg:pl-64 xl:pl-72" : "lg:pl-0";

  return (
    <div
      className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${openClass}`}
    >
      {children}
    </div>
  );
}

export default MainContentWrapper;
