import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/header/Navbar";
import HeaderStrip from "../components/header/HeaderStrip";
import HighlightBanner from "../components/header/HighlightBanner";
import ResultBoard from "../components/header/ResultBoard";
import ResultsTable from "../components/main/ResultsTable";
import WhatsAppButton from "../components/main/WhatsAppButton";
import GameChartTable from "../components/main/GameChartTable";
import Ads from "../components/ads/Ads"; // Your existing bottom ads

// Import the new Realistic Banner Component
import BannerAd from "../components/ads/BannerAd";

export default function Home() {
  const location = useLocation();

  const resultsRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/satta-king") {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (location.pathname === "/chart") {
      chartRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <HeaderStrip />
      
      <HighlightBanner />
      <ResultBoard />

      {/* --- REALISTIC AD 1: Full Width Banner --- */}
      <BannerAd index={0} type="full" />
      {/* ----------------------------------------- */}

      <div ref={resultsRef}>
        <ResultsTable />
      </div>

      {/* --- REALISTIC ADS 2 & 3: Side-by-Side Grid --- */}
      <div className="max-w-5xl mx-auto px-2 my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BannerAd index={1} type="box" />
          <BannerAd index={2} type="box" />
        </div>
      </div>
      {/* ----------------------------------------------- */}

      <div ref={chartRef}>
        <GameChartTable />
      </div>

      {/* --- REALISTIC AD 4: Another Full Width Banner --- */}
      <BannerAd index={0} type="full" />
      {/* ----------------------------------------- */}
      
      <Ads/>
      <WhatsAppButton />
    </>
  );
}