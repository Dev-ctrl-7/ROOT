import { Suspense } from "react";
import { JourneyBackHome } from "@/components/JourneyBackHome";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "A Journey Back Home | ROOTS — The Soul of India",
  description:
    "An intimate 5-chapter passage across the soil, hearth, sacred rituals, childhood memories, and personal keepsakes of India's 28 states and 8 union territories.",
};

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0C0A09] text-[#1C1814] dark:text-[#F5EFEB] flex flex-col justify-between">
      <Navigation />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <span className="w-8 h-8 border-2 border-[#C59B27]/40 border-t-[#C59B27] rounded-full animate-spin" />
            </div>
          }
        >
          <JourneyBackHome />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
