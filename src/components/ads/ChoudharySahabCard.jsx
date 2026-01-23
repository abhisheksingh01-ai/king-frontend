import React from 'react';
import { FaWhatsapp, FaPhoneAlt, FaCrown, FaBomb, FaGlobeAmericas, FaHandPointDown, FaCheckCircle, FaGift } from 'react-icons/fa';

export default function ChoudharySahabCard() {
  
  // Replace with actual number
  const PHONE_NUMBER = "+918130035485"; 

  const handleCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 md:p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      
      {/* MAIN CARD CONTAINER */}
      <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border-[6px] border-red-600 relative">
        
        {/* Top Decorative Badge */}
        <div className="bg-red-600 text-white text-center py-2 font-bold uppercase tracking-widest text-xs">
           ⚠️ Only For Serious Players ⚠️
        </div>

        {/* HEADER: LEAK LEAK LEAK */}
        <div className="text-center pt-6 pb-2 px-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaCrown className="text-yellow-500 text-2xl animate-bounce" />
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
              लीक - लीक - लीक
            </h1>
            <FaCrown className="text-yellow-500 text-2xl animate-bounce" />
          </div>
          
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-3 inline-block shadow-sm">
            <h2 className="text-xl font-black text-red-600 flex items-center gap-2 justify-center leading-none">
              💥 लीक जोड़ी में होगा धमाका <FaBomb className="text-black animate-pulse" />
            </h2>
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className="px-5 py-2 space-y-5 text-center">
          
          {/* Game List & Guarantee */}
          <div className="text-gray-800 font-bold text-lg leading-snug">
            <p>गली • दिसावर • फरीदाबाद • गाजियाबाद</p>
            <p className="mt-2 text-base font-medium bg-gray-50 border border-gray-200 p-2 rounded-lg">
              चारों गेम में जोड़ी में गेम पास होगी <br/>
              <span className="text-green-600 font-black text-xl bg-green-50 px-2 rounded">101% गारंटी के साथ 👍</span>
            </p>
          </div>

          {/* Aggressive Challenge Text */}
          <div className="bg-red-50 border-l-4 border-red-600 p-3 text-left rounded-r-lg shadow-sm">
            <p className="text-gray-900 font-bold text-sm leading-relaxed">
              "गेम किसी का बाप भी नहीं काट सकता! गेम काटने वाले को मुँह माँगा इनाम।" 
              <span className="inline-block ml-2 align-middle text-green-600 text-lg"><FaGift /> 💵</span>
            </p>
          </div>

          {/* WhatsApp Instruction 1 */}
          <div className="flex items-center justify-center gap-2 bg-green-600 text-white p-2 rounded-lg shadow-md transform hover:scale-105 transition-transform cursor-pointer" onClick={handleWhatsApp}>
            <FaCheckCircle className="text-yellow-300" />
            <p className="font-bold text-sm">आज की लीक जोड़ी लेने के लिए व्हाट्सएप करें</p>
            <FaCheckCircle className="text-yellow-300" />
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-blue-700 font-black text-lg">
            <FaGlobeAmericas className="animate-spin-slow" />
            <span>सट्टा हेड ब्रांच ऑफिस <span className="text-red-600 decoration-wavy underline decoration-red-300">100% गारंटी</span></span>
          </div>

          {/* Proof / Live Demo Section */}
          <div className="relative bg-gray-900 text-white p-4 rounded-xl border-2 border-dashed border-red-500 shadow-inner">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Important Notice
            </div>
            <p className="text-sm font-medium leading-relaxed mt-1">
              🛑 <span className="text-yellow-400 font-bold">प्रूफ चेक करके ही ले!</span> अपनी लीक जोड़ी वीडियो में <span className="text-red-400 font-bold underline">लाइव डेमो</span> मिलेगा गेम खुलने से पहले। 🛑
            </p>
          </div>

          {/* Final Call To Action with Fingers */}
          <div className="space-y-2">
            <div className="flex justify-center gap-4 text-yellow-600 text-xl animate-bounce">
              <FaHandPointDown /><FaHandPointDown /><FaHandPointDown />
            </div>
            <p className="font-black text-blue-900 text-lg uppercase leading-tight">
              आज की <span className="text-red-600 text-2xl">💥 लीक जोड़ी 💥</span> लेने के लिए <br/>
              <span className="bg-yellow-200 px-1 text-black">नम्बर को सेव</span> करके मेसिज करें
            </p>
            <p className="text-xs text-gray-500 font-bold">(प्रूफ चेक करके गेम ले)</p>
          </div>

        </div>

        {/* FOOTER NAME */}
        <div className="bg-linear-to-r from-red-50 to-white py-4 mt-2 text-center border-t border-red-100">
           <h3 className="text-2xl font-black text-red-700 uppercase drop-shadow-sm flex items-center justify-center gap-2">
             🤴 चौधरी साहब 🤴
           </h3>
           <p className="text-gray-400 font-bold tracking-[0.3em] text-xs">CHOUDHARY SAHAB</p>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="p-4 bg-gray-50 flex gap-3 border-t border-gray-200">
          <button 
            onClick={handleCall}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 text-sm md:text-base"
          >
            <FaPhoneAlt className="animate-wiggle" /> CALL NOW
          </button>
          <button 
            onClick={handleWhatsApp}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 text-sm md:text-base"
          >
            <FaWhatsapp className="text-xl" /> WHATSAPP
          </button>
        </div>

      </div>
    </div>
  );
}