import React from 'react';
import { FaWhatsapp, FaStar } from 'react-icons/fa';

const AD_CONTENT = [
  {
    title: "SHIVA BHAI ONLINE",
    subtitle: "INDIA'S MOST TRUSTED",
    text: "Open Rate 95/10 • Jodi Rate 950/10",
    phone: "+91 999-888-7777",
    color: "from-red-600 via-red-900 to-black",
    border: "border-red-500"
  },
  {
    title: "MAHADEV BOOK",
    subtitle: "INSTANT WITHDRAWAL",
    text: "100% Honest • 24/7 Service • No Fraud",
    phone: "+91 123-456-7890",
    color: "from-green-600 via-green-900 to-black",
    border: "border-green-500"
  },
  {
    title: "ROYAL KHAWAL",
    subtitle: "FIX GAME SPECIALIST",
    text: "Single Jodi & Haruf Available Here",
    phone: "+91 555-444-3333",
    color: "from-yellow-600 via-yellow-900 to-black",
    border: "border-yellow-500"
  }
];

export default function BannerAd({ index = 0, type = "full" }) {
  // Cycle through ads based on index
  const ad = AD_CONTENT[index % AD_CONTENT.length];

  const handleClick = () => {
    window.location.href = `https://wa.me/${ad.phone.replace(/[^0-9]/g, '')}`;
  };

  // STYLE 1: Full Width Leaderboard (Horizontal Strip)
  if (type === "full") {
    return (
      <div onClick={handleClick} className="w-full max-w-5xl mx-auto my-6 px-2 cursor-pointer group">
        <div className={`relative w-full overflow-hidden rounded-xl border-2 ${ad.border} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
          
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-linear-to-r ${ad.color} opacity-90`}></div>
          
          {/* Shine Animation */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-4 py-3 md:px-8 md:py-4">
            
            {/* Left: Title */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-2 md:mb-0">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400 animate-spin-slow" />
                <h3 className="text-white font-black text-lg md:text-2xl uppercase italic tracking-wider shadow-black drop-shadow-md">
                  {ad.title}
                </h3>
                <FaStar className="text-yellow-400 animate-spin-slow" />
              </div>
              <p className="text-yellow-300 font-bold text-[10px] md:text-xs tracking-[0.2em] bg-black/30 px-2 rounded">
                {ad.subtitle}
              </p>
            </div>

            {/* Middle: Details */}
            <div className="hidden md:block text-center">
              <p className="text-white font-bold text-sm">{ad.text}</p>
            </div>

            {/* Right: Button */}
            <div className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transition-transform transform group-hover:scale-105">
              <FaWhatsapp className="text-xl" />
              <span>CHAT NOW</span>
            </div>

          </div>
        </div>
        <div className="text-center">
           <span className="text-[9px] text-gray-600 uppercase tracking-widest">Advertisement</span>
        </div>
      </div>
    );
  }

  // STYLE 2: Small Grid Box (For side-by-side)
  if (type === "box") {
    return (
      <div onClick={handleClick} className="w-full cursor-pointer group">
        <div className={`relative h-full bg-linear-to-br ${ad.color} border-2 ${ad.border} rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all`}>
          <div className="absolute top-2 right-2 bg-white/20 px-2 py-0.5 rounded text-[8px] text-white font-bold">AD</div>
          
          <h3 className="text-white font-black text-xl uppercase mb-1 drop-shadow-md">{ad.title}</h3>
          <p className="text-yellow-300 text-[10px] font-bold tracking-widest mb-3">{ad.subtitle}</p>
          
          <div className="w-full bg-black/30 rounded-lg p-2 mb-3">
             <p className="text-gray-200 text-xs font-mono">{ad.phone}</p>
          </div>

          <button className="w-full bg-white text-black font-black text-xs py-2 rounded uppercase tracking-wider hover:bg-gray-200">
            Contact Admin
          </button>
        </div>
      </div>
    );
  }
}