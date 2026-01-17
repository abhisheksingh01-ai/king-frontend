import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/header/Navbar";
import HeaderStrip from "../components/header/HeaderStrip";
import HighlightBanner from "../components/header/HighlightBanner";
import ResultBoard from "../components/header/ResultBoard";
import ResultsTable from "../components/main/ResultsTable";
import WhatsAppButton from "../components/main/WhatsAppButton";
import GameChartTable from "../components/main/GameChartTable";

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

      <div ref={resultsRef}>
        <ResultsTable />
      </div>

      <div ref={chartRef}>
        <GameChartTable />
      </div>

      <WhatsAppButton />
    </>
  );
}
