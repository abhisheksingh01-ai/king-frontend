import React from 'react'

function HighlightBanner() {
  return (
    <div className="w-full relative overflow-hidden py-10">
      
      {/* 1. BACKGROUND LAYER (Replaces the flat bg-amber-300) */}
      <div className="absolute inset-0 w-full h-full bg-[#050505]">
        {/* Subtle Grid Pattern for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        
        {/* The "Golden Spotlight" - A soft glow behind the text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 md:w-150 h-75 bg-yellow-600/20 rounded-full blur-[80px] pointer-events-none"></div>
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 w-full flex justify-center px-4">
        
        <div className="relative group w-full max-w-xl">
          
          {/* Animated Gold Ring Glow (Pulsing) */}
          <div className="absolute -inset-px bg-linear-to-r from-yellow-700 via-yellow-400 to-yellow-700 rounded-full opacity-60 blur-md group-hover:opacity-100 transition duration-500 animate-pulse"></div>
          
          {/* Main Glassmorphism Box */}
          <div className="relative w-full bg-black/80 backdrop-blur-xl rounded-full border border-yellow-500/50 px-6 py-4 text-center shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)] flex flex-col items-center justify-center">
            
            {/* Top Line - Decorative SEO */}
            <div className="flex items-center gap-3 mb-1 opacity-80">
              <div className="h-px w-8 bg-linear-to-r from-transparent to-yellow-500"></div>
              <p className="text-yellow-100/70 font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase">
                Official Results
              </p>
              <div className="h-px w-8 bg-linear-to-l from-transparent to-yellow-500"></div>
            </div>

            {/* Main Title with "Shine" Animation */}
            <h2 className="relative text-2xl md:text-3xl font-black italic tracking-wider uppercase text-white">
              <span className="absolute inset-0 text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-white to-yellow-300 animate-[shimmer_2s_infinite] bg-[length:200%_100%]">
                SATTA KING
              </span>
              <span className="text-transparent bg-clip-text bg-linear-to-b from-yellow-300 to-yellow-700">
                SATTA KING
              </span>
            </h2>

             {/* Bottom Micro Text */}
             <p className="text-[10px] text-gray-500 font-bold tracking-widest mt-1">
               FASTEST LIVE UPDATES
             </p>

          </div>
        </div>
      </div>

      {/* Add this CSS in your global styles or index.css for the shimmer text to work */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

export default HighlightBanner