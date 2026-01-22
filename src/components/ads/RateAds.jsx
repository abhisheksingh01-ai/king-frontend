import React from 'react';
import { FaWhatsapp, FaStar } from 'react-icons/fa';

const AD_CONTENT = [
  {
    title: "ONLINE KHAIWAL RONY BHAI",
    subtitle: "FASTEST PAYMENT SERVICE",
    text: "जोड़ी रेट 10 के 950\nहारूप रेट 100 के 950",
    phone: "+91 8130035485",
    color: "from-black via-gray-900 to-black",
    border: "border-green-500",
    buttonColor: "bg-green-600 hover:bg-green-700",
    textColor: "text-green-400"
  }
];

export default function RateAds({ index = 0, type = "full" }) {
  const ad = AD_CONTENT[index % AD_CONTENT.length];

  const handleClick = () => {
    window.location.href = `https://wa.me/${ad.phone.replace(/[^0-9]/g, '')}`;
  };

  // STYLE 1: Full Width Leaderboard (Responsive Strip)
  if (type === "full") {
    return (
      // Mobile padding fix: w-[96%] taaki screen ke edges se na chipke
      <div onClick={handleClick} className="w-[96%] md:w-full max-w-5xl mx-auto my-4 md:my-6 cursor-pointer group">
        
        <div className={`relative w-full overflow-hidden rounded-xl border-2 ${ad.border} shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-black transition-all hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]`}>
          
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-linear-to-r ${ad.color} opacity-95`}></div>
          
          {/* Shine Animation */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          {/* Content Layout */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-3 py-4 md:px-8 md:py-4 gap-3 md:gap-0">
            
            {/* Left: Title & Subtitle */}
            {/* Fix: Mobile mein text center aur wrap allow kiya */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <FaStar className="text-yellow-400 text-sm md:text-lg animate-pulse shrink-0" />
                
                {/* Fix: text-lg (mobile) to text-2xl (desktop) aur whitespace-normal */}
                <h3 className="text-white font-black text-lg sm:text-xl md:text-2xl uppercase tracking-wider drop-shadow-md leading-tight">
                  {ad.title}
                </h3>
                
                <FaStar className="text-yellow-400 text-sm md:text-lg animate-pulse shrink-0" />
              </div>
              <p className="text-gray-300 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase bg-white/10 px-2 py-0.5 rounded inline-block">
                {ad.subtitle}
              </p>
            </div>
            <div className="text-center w-full md:w-auto bg-white/5 md:bg-transparent p-2 rounded-lg md:p-0 border border-white/10 md:border-none my-1 md:my-0">
              <p className={`font-bold text-lg md:text-xl leading-snug whitespace-pre-line ${ad.textColor}`}>
                {ad.text}
              </p>
            </div>
            <div className="w-full md:w-auto px-4 md:px-0">
                <div className={`flex justify-center items-center gap-2 ${ad.buttonColor} text-white px-6 py-2.5 rounded-full font-bold shadow-lg transition-transform transform group-hover:scale-105 border border-white/20 w-full md:w-auto`}>
                  <FaWhatsapp className="text-xl md:text-2xl" />
                  <span>WHATSAPP</span>
                </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}