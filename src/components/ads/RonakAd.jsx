import React from 'react';
import { FaWhatsapp, FaCrown, FaClock, FaShieldAlt, FaRupeeSign } from 'react-icons/fa';

// DATA CONFIGURATION
const BRAND = {
  name: "RONAK BHAI KHAIWAL",
  tagline: "इमानदारी हमारी पहचान", // Honesty is our identity
  rates: [
    { label: "Jodi Rate", value: "10 के 950" }, // UPDATED to 950
    { label: "Haruf Rate", value: "100 के 950" } // UPDATED to 950
  ],
  phone: "+91 8130035485", // Replace with actual number
  timings: [
    { name: "DELHI BAZAR", time: "03:00 PM" },
    { name: "SHRI GANESH", time: "04:30 PM" },
    { name: "FARIDABAD", time: "06:00 PM" },
    { name: "GHAZIABAD", time: "09:20 PM" },
    { name: "GALI", time: "11:20 PM" },
    { name: "DISAWAR", time: "02:20 AM" },
  ],
  footerText: "रिजल्ट आने के 10 मिनट के अंदर आपकी पेमेंट कर दी जाएगी"
};

export default function RonakAd({ type = "box" }) {
  
  const handleClick = () => {
    window.location.href = `https://wa.me/${BRAND.phone.replace(/[^0-9]/g, '')}`;
  };

  // ==========================================
  // STYLE 1: LONG BANNER (Desktop/Mobile Strip)
  // ==========================================
  if (type === "full") {
    return (
      <div onClick={handleClick} className="w-[96%] md:w-full max-w-5xl mx-auto my-4 cursor-pointer group">
        <div className="relative overflow-hidden rounded-xl border border-yellow-600/50 bg-gray-900 shadow-2xl">
          
          {/* Animated Gold Gradient Border/Glow */}
          <div className="absolute inset-0 bg-linear-to-r from-yellow-700/20 via-black to-yellow-700/20 opacity-50"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-4 gap-4">
            
            {/* LEFT: Branding */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-fit">
              <div className="flex items-center gap-2">
                <FaCrown className="text-yellow-400 text-2xl animate-bounce" />
                <h2 className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-600 font-black text-2xl md:text-3xl uppercase tracking-tighter">
                  {BRAND.name}
                </h2>
              </div>
              <p className="text-gray-400 text-xs md:text-sm tracking-widest uppercase font-bold mt-1 border-b border-gray-700 pb-1">
                {BRAND.tagline}
              </p>
            </div>

            {/* MIDDLE: Rates (Highlighted) */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 bg-black/40 p-2 md:p-3 rounded-lg border border-white/5 w-full md:w-auto justify-center">
              {BRAND.rates.map((rate, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-gray-400 text-[10px] uppercase">{rate.label}</span>
                  <span className="text-white font-black text-lg md:text-2xl text-shadow-glow">
                    ₹{rate.value}
                  </span>
                </div>
              ))}
            </div>

            {/* RIGHT: CTA Button */}
            <div className="w-full md:w-auto">
              <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all transform group-hover:scale-105">
                <FaWhatsapp className="text-2xl" />
                <span className="uppercase tracking-wider">Play Now</span>
              </button>
            </div>
          </div>

          {/* Scrolling Ticker for Timings (To save space in long view) */}
          <div className="bg-yellow-900/30 border-t border-yellow-600/20 py-1 overflow-hidden relative">
            <div className="animate-marquee whitespace-nowrap flex gap-8 px-4">
              {[...BRAND.timings, ...BRAND.timings].map((t, i) => ( // Duplicated for seamless loop
                <span key={i} className="text-yellow-200/80 text-xs font-mono font-bold flex items-center gap-1">
                  <FaClock className="text-[10px]" /> {t.name}: {t.time}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // STYLE 2: BOX CARD (Flyer Style)
  // ==========================================
  if (type === "box") {
    return (
      <div onClick={handleClick} className="w-full max-w-md mx-auto my-4 cursor-pointer group">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900 border-2 border-yellow-600 shadow-2xl">
          
          {/* Header Section */}
          <div className="bg-linear-to-b from-gray-800 to-gray-900 p-5 text-center border-b border-gray-700 relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-yellow-400 via-red-500 to-yellow-400"></div>
             <FaCrown className="text-yellow-500 text-3xl mx-auto mb-2 drop-shadow-lg" />
             <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">
               {BRAND.name.split(' ')[0]} <span className="text-yellow-500">{BRAND.name.split(' ').slice(1).join(' ')}</span>
             </h1>
             <p className="text-gray-400 text-xs uppercase tracking-[0.3em]">{BRAND.tagline}</p>
          </div>

          {/* Rates Section (The 950 Update) */}
          <div className="p-4 bg-black/50">
            <div className="flex gap-3">
              {BRAND.rates.map((rate, idx) => (
                <div key={idx} className="flex-1 bg-linear-to-br from-gray-800 to-black border border-yellow-700/30 rounded-lg p-3 text-center shadow-lg group-hover:border-yellow-500 transition-colors">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">{rate.label}</p>
                  <p className="text-yellow-400 font-black text-xl md:text-2xl">₹{rate.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timings List */}
          <div className="px-5 py-2">
            <h3 className="text-center text-gray-500 text-[10px] uppercase tracking-widest mb-3">- Market Timings -</h3>
            <div className="space-y-2">
              {BRAND.timings.map((market, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-800 pb-1 last:border-0 hover:bg-white/5 px-2 rounded transition-colors">
                  <div className="flex items-center gap-2">
                    {/* Varied icons for visual interest */}
                    <span className="text-lg">{index % 2 === 0 ? '🕉️' : '💰'}</span> 
                    <span className="text-white font-bold text-sm uppercase">{market.name}</span>
                  </div>
                  <span className="text-yellow-500 font-mono font-bold text-sm bg-yellow-900/20 px-2 rounded">
                    {market.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer / Trust Section */}
          <div className="bg-gray-800 p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-green-400 mb-3 text-xs font-bold bg-green-900/20 py-1 rounded border border-green-800">
               <FaShieldAlt /> 100% SECURE & FAST PAYMENT
            </div>
            
            <p className="text-gray-400 text-[10px] mb-3 leading-relaxed px-4">
              {BRAND.footerText}
            </p>

            <button className="w-full bg-green-600 hover:bg-green-500 text-white font-black text-lg py-3 rounded-xl shadow-lg flex items-center justify-center gap-3 animate-pulse">
              <FaWhatsapp className="text-3xl" />
              CHAT ON WHATSAPP
            </button>
            <p className="text-gray-500 text-[9px] mt-2 uppercase tracking-widest">
               Apka Vishwas Hi Hamari Kamai Hai
            </p>
          </div>

        </div>
      </div>
    );
  }
}