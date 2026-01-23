import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/header/Navbar";
import HeaderStrip from "../components/header/HeaderStrip";
import HighlightBanner from "../components/header/HighlightBanner";
import WhatsAppButton from "../components/main/WhatsAppButton";
import Ads from "../components/ads/Ads"; 


// Import the new Realistic Banner Component
import BannerAd from "../components/ads/BannerAd";
import GameResultsTable from "../components/main/GameResultsTable";
import LiveResultCards from "../components/main/LiveResultCards";
import RecentResultsWidget from "../components/main/RecentResultsWidget";
import RateAds from "../components/ads/RateAds";
import RonakAd from "../components/ads/RonakAd";
import KingOfSatta from "../components/ads/KingOfSatta";
import ChoudharySahabCard from "../components/ads/ChoudharySahabCard";




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

      <RonakAd/>

      <RateAds index={0} type="full" />

      <RecentResultsWidget/>

      
      <div ref={resultsRef}>
        <LiveResultCards/>
      </div>


      <KingOfSatta/>

      <div ref={chartRef}>
        <GameResultsTable/>
      </div>

      <RateAds index={0} type="full" />

      <ChoudharySahabCard/>
      
      {/* <Ads/> */}
      <WhatsAppButton />
    </>
  );
}