import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa"; 

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the popup every time the component mounts (Page Refresh)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // 1-second delay for better effect

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleWhatsApp = () => {
    // Replace with your actual WhatsApp number
    window.location.href = "https://wa.me/6397135299?text=Hello+Admin+I+Want+Game";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center px-4">
      
      {/* Dark Overlay/Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose} 
      ></div>

      {/* Popup Card */}
      <div className="relative w-full max-w-sm bg-[#0a0a0a] border border-yellow-500/50 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.2)] overflow-hidden animate-bounce-in">
        
        {/* Top Decoration Line */}
        <div className="h-1 w-full bg-linear-to-r from-yellow-500 via-red-500 to-yellow-500"></div>

        {/* Close Button (X) */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white bg-white/5 hover:bg-red-600/80 rounded-full p-2 transition-all duration-300 z-10"
        >
          <FaTimes size={16} />
        </button>

        {/* Content Area */}
        <div className="p-6 text-center flex flex-col items-center">
          
          {/* Badge */}
          <span className="bg-linear-to-r from-red-600 to-red-800 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-4 shadow-lg animate-pulse">
            Special Offer
          </span>

          {/* Headline */}
          <h2 className="text-2xl font-black text-white uppercase italic tracking-wide mb-2">
            Khawal <span className="text-yellow-400">Admin</span>
          </h2>

          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            Get 100% Fix Game direct from company. <br/>
            <span className="text-yellow-500 font-bold">Single Jodi & Haruf available.</span>
            <br/> Don't miss this chance!
          </p>

          {/* WhatsApp Button */}
          <button 
            onClick={handleWhatsApp}
            className="w-full group relative flex items-center justify-center gap-3 bg-linear-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <FaWhatsapp size={24} className="animate-bounce" />
            <span className="tracking-widest">CHAT ON WHATSAPP</span>
          </button>

          {/* Footer Text */}
          <p className="mt-4 text-[10px] text-gray-500 uppercase tracking-widest">
            100% Trusted & Verified
          </p>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-in {
          animation: popIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
      `}</style>
    </div>
  );
}