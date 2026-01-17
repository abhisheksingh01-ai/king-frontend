import React from 'react';
import { FaWhatsapp, FaTelegramPlane, FaPhoneAlt } from 'react-icons/fa'; // Ensure you have react-icons installed

/* ---------- DUMMY CONFIG ---------- */
const AD_SPOTS = [
  {
    id: 1,
    title: "VISHNU BHAI ONLINE",
    subtitle: "MOST TRUSTED KHAIWAL",
    desc: "Fastest Payment • 100% Honest • 24/7 Support",
    contact: "+91 98765 43210",
    color: "from-green-600 to-green-900", // Whatsapp Theme
    icon: <FaWhatsapp className="text-2xl" />,
    link: "#",
    badge: "VERIFIED"
  },
  {
    id: 2,
    title: "MAHAKAL BOOK",
    subtitle: "INDIA'S NO.1 BOOK",
    desc: "Play Unlimited • Automatic Deposit • Instant Withdrawal",
    contact: "@mahakal_admin",
    color: "from-blue-600 to-blue-900", // Telegram Theme
    icon: <FaTelegramPlane className="text-2xl" />,
    link: "#",
    badge: "VIP"
  },
  {
    id: 3,
    title: "ROYAL GAMES",
    subtitle: "PLAY & WIN BIG",
    desc: "Jodi rate 950/10 • Haruf rate 950/100",
    contact: "+91 12345 67890",
    color: "from-yellow-600 to-yellow-900", // Gold Theme
    icon: <FaPhoneAlt className="text-xl" />,
    link: "#",
    badge: "PREMIUM"
  }
];

export default function Ads() {
  return (
    <div className="w-full bg-[#050505] py-8 px-4">
      

      {/* Ads Grid - Mobile: 1 Col, Tablet: 2 Col, Laptop: 3 Col */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {AD_SPOTS.map((ad) => (
          <div 
            key={ad.id}
            className="group relative w-full"
          >
            {/* 1. Animated Border Gradient */}
            <div className={`absolute -inset-0.5 bg-linear-to-r ${ad.color} rounded-2xl opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition duration-500`}></div>
            
            {/* 2. Main Card Content */}
            <div className="relative h-full bg-[#0a0a0a] rounded-2xl p-6 border border-white/5 flex flex-col items-center text-center overflow-hidden">
              
              {/* Shine Effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-white/5 to-transparent pointer-events-none"></div>

              {/* Badge (Top Right) */}
              <div className="absolute top-0 right-0 bg-white/10 backdrop-blur-md px-3 py-1 rounded-bl-xl border-b border-l border-white/10">
                 <span className="text-[9px] font-bold text-white tracking-widest uppercase">
                   {ad.badge}
                 </span>
              </div>

              {/* Icon Circle */}
              <div className={`
                w-14 h-14 rounded-full flex items-center justify-center mb-4
                bg-linear-to-br ${ad.color} shadow-[0_0_20px_rgba(0,0,0,0.5)]
                group-hover:scale-110 transition-transform duration-300
              `}>
                <div className="text-white drop-shadow-md">
                  {ad.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-black text-white italic uppercase tracking-wider mb-1">
                {ad.title}
              </h3>
              <p className={`text-transparent bg-clip-text bg-linear-to-r ${ad.color} font-bold text-xs tracking-widest uppercase mb-3`}>
                {ad.subtitle}
              </p>
              
              <div className="w-full h-px bg-white/10 mb-3"></div>

              <p className="text-gray-400 text-xs leading-relaxed mb-5">
                {ad.desc}
              </p>

              {/* Call To Action Button */}
              <a 
                href={ad.link} 
                className={`
                  w-full py-3 rounded-lg font-bold text-sm tracking-widest text-white
                  bg-linear-to-r ${ad.color} 
                  shadow-[0_4px_15px_rgba(0,0,0,0.4)]
                  active:scale-95 transition-all hover:brightness-110
                  flex items-center justify-center gap-2
                `}
              >
                <span>CONTACT NOW</span>
                <span className="text-xs opacity-70">→</span>
              </a>

            </div>
          </div>
        ))}

      </div>

      {/* "Place Your Ad" Placeholder */}
      <div className="max-w-6xl mx-auto mt-6">
        <div className="w-full border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center bg-white/2 hover:bg-white/4 transition cursor-pointer">
          <p className="text-white/40 font-bold text-xs uppercase tracking-widest">
            Want to promote your game here?
          </p>
          <p className="text-yellow-500 font-bold text-sm mt-1">
            CONTACT ADMIN @ +91 00000 00000
          </p>
        </div>
      </div>

    </div>
  );
}