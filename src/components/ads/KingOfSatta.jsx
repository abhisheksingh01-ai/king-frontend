import React from 'react';
import { FaWhatsapp, FaPhoneAlt, FaCrown, FaUnlockAlt, FaShieldAlt } from 'react-icons/fa';

export default function KingOfSatta() {
  
  // Replace this with your actual phone number
  const PHONE_NUMBER = "+918130035485"; 

  const handleCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`;
  };

  return (
    // Changed max-w-md to max-w-5xl and added flex-col md:flex-row for side-by-side layout
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col md:flex-row gap-6 items-stretch justify-center bg-gray-100 min-h-screen">
      
      {/* ==============================================
          CARD 1: CEO COMPANY MANAGER (Premium Gold/White)
          Added flex-1 to take equal width
         ============================================== */}
      <div className="flex-1 w-full bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-500 flex flex-col">
        
        {/* Header */}
        <div className="bg-linear-to-r from-yellow-600 via-yellow-500 to-yellow-600 p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <FaCrown className="text-white text-2xl animate-bounce" />
            <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider drop-shadow-md">
              King Of Satta
            </h1>
            <FaCrown className="text-white text-2xl animate-bounce" />
          </div>
        </div>

        <div className="p-5 text-center space-y-4 grow flex flex-col justify-between">
          
          <div>
            {/* Sub-Header: Locations */}
            <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-200 mb-4">
              <p className="text-gray-800 font-bold text-sm md:text-base leading-tight">
                गली • दिशावर • गाजियाबाद • फरीदाबाद
              </p>
              <p className="text-red-600 font-black text-lg mt-1 uppercase animate-pulse">
                🔥 सिंगल जोड़ी होगी 🔥
              </p>
            </div>

            {/* Main Body Content */}
            <div className="space-y-3 text-gray-700 text-sm font-medium leading-relaxed">
              <p>
                <span className="bg-green-100 text-green-800 px-1 rounded font-bold">10000% गारंटी से पास</span> क्योंकि हमारे पास होती है <span className="font-bold text-black">डेट फिक्स लीक जोड़ी</span> जिससे आप खेलकर अपने सारे कर्ज से मुक्त हो सकते हो।
              </p>
              
              <div className="flex items-center justify-center gap-2 text-blue-800 bg-blue-50 p-2 rounded-lg border border-blue-100">
                <FaShieldAlt />
                <span className="text-xs md:text-sm">सिर्फ ईमानदार कस्टमर ही कॉल करें</span>
              </div>

              <p className="italic text-gray-600 text-xs">
                "जो लोग मोटा गेम खेलते हो, डेली प्रॉफिट करवाएंगे गारंटी से। जल्द ही गेम बुक करवाएं!"
              </p>
            </div>

            {/* Role Title */}
            <div className="mt-4">
              <h3 className="text-lg md:text-xl font-black text-gray-900 uppercase tracking-tighter border-b-2 border-gray-200 inline-block pb-1">
                Gali Dishawar CEO <br/> <span className="text-yellow-600">Company Manager</span>
              </h3>
              <p className="text-2xl font-black text-gray-800 mt-1 tracking-widest">XXXX</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 mt-2">
            <button 
              onClick={handleCall}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-2 rounded-full flex items-center justify-center gap-1 shadow-lg transition-transform hover:scale-105 text-sm md:text-base"
            >
              <FaPhoneAlt className="animate-wiggle" /> CALL NOW
            </button>
            <button 
              onClick={handleWhatsApp}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-2 rounded-full flex items-center justify-center gap-1 shadow-lg transition-transform hover:scale-105 text-sm md:text-base"
            >
              <FaWhatsapp className="text-xl" /> CHAT
            </button>
          </div>

        </div>
      </div>

      {/* ==============================================
          CARD 2: SATTA OPNER (Urgent Red/Dark)
          Added flex-1 to take equal width
         ============================================== */}
      <div className="flex-1 w-full bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-red-600 flex flex-col">
        
        {/* Blinking Live Badge */}
        <div className="absolute top-3 right-3 z-10">
           <span className="flex h-3 w-3 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
           </span>
        </div>

        <div className="p-6 text-center space-y-5 grow flex flex-col justify-between">
          
          <div>
            {/* Header Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-red-600 p-3 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                <FaUnlockAlt className="text-white text-2xl" />
              </div>
            </div>

            {/* Main Text */}
            <div className="space-y-2">
              <h2 className="text-white font-black text-xl uppercase leading-snug">
                सिंगल लीक जोड़ी <span className="text-red-500 block mt-1">DATE फिक्स</span>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed border-t border-gray-700 pt-3 mt-2">
                डायरेक्ट सट्टा ब्रांच से लीक गेम। गेम पास की <span className="text-yellow-400 font-bold">फुल गारंटी है 101%</span> लीक एंड कन्फर्म।
              </p>
            </div>

            {/* Call to Action Text */}
            <div className="bg-white/10 p-3 rounded-lg border border-white/5 mt-4">
              <p className="text-white text-sm font-semibold italic">
                "जो भाई कहते हैं कि हमारी गेम पास नहीं होती वो जरूर संपर्क करें!"
              </p>
            </div>

            {/* Footer Role */}
            <div className="mt-4">
              <h3 className="text-2xl font-black text-blue-400 uppercase tracking-widest text-shadow-glow">
                SATTA OPNER
              </h3>
              <p className="text-xl font-black text-white mt-1 tracking-widest">XXXX</p>
            </div>
          </div>

          {/* Large Call Button */}
          <button 
             onClick={handleCall}
             className="w-full bg-linear-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-3 animate-pulse mt-4"
          >
            <FaPhoneAlt /> CALL NOW FOR LEAK
          </button>

        </div>
      </div>

    </div>
  );
}