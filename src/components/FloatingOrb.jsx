import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingOrb() {
  return (
    <motion.div
      initial={{ y: 0, x: 0 }}
      animate={{ 
        y: [0, -14, 0],
        x: [0, 4, 0]
      }}
      transition={{
        duration: 9.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className="relative flex items-center justify-center w-52 h-52 select-none group"
    >
      {/* 1. Volumetric Backing Lighting Halos (Shifting, breathing colors) */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/22 via-purple-600/18 to-blue-500/15 filter blur-[28px] group-hover:scale-110 group-hover:from-cyan-400/35 transition-all duration-1000 animate-pulse-slow" />
      <div className="absolute w-[80%] h-[80%] rounded-full bg-radial-[circle,rgba(0,229,255,0.18)_0%,transparent_75%] mix-blend-color-dodge filter blur-[15px] pointer-events-none z-0" />

      {/* 2. High-Precision SVG HUD & Rotating Energy Rings */}
      <svg className="absolute w-full h-full z-10 pointer-events-none overflow-visible" viewBox="0 0 120 120">
        <defs>
          <filter id="neonOrbGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="hologramCore" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="rgba(0, 229, 255, 0.70)" />
            <stop offset="40%" stopColor="rgba(168, 85, 247, 0.35)" />
            <stop offset="85%" stopColor="rgba(6, 12, 45, 0.90)" />
            <stop offset="100%" stopColor="rgba(1, 1, 6, 0.98)" />
          </radialGradient>
        </defs>

        {/* --- HUD Static Ticks & Degree Markings --- */}
        {/* Compass Crosshair */}
        <line x1="60" y1="5" x2="60" y2="115" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.35" strokeDasharray="3 3" />
        <line x1="5" y1="60" x2="115" y2="60" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.35" strokeDasharray="3 3" />
        
        {/* Metric circular tick markings */}
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.35" strokeDasharray="1 5" />
        
        {/* HUD Degree Ticks */}
        <path d="M 60 4 L 60 7 M 60 113 L 60 116 M 4 60 L 7 60 M 113 60 L 116 60" stroke="rgba(0, 229, 255, 0.3)" strokeWidth="0.5" />
        <text x="60" y="11" fill="rgba(34, 211, 238, 0.45)" fontSize="2.8" fontFamily="monospace" textAnchor="middle">00°</text>
        <text x="110" y="61" fill="rgba(34, 211, 238, 0.45)" fontSize="2.8" fontFamily="monospace" textAnchor="start">90°</text>
        <text x="60" y="111" fill="rgba(34, 211, 238, 0.45)" fontSize="2.8" fontFamily="monospace" textAnchor="middle">180°</text>
        <text x="10" y="61" fill="rgba(34, 211, 238, 0.45)" fontSize="2.8" fontFamily="monospace" textAnchor="end">270°</text>

        {/* --- Rotating Energy Ring A: Dotted HUD Track (Slow Clockwise) --- */}
        <motion.circle
          cx="60"
          cy="60"
          r="51"
          fill="none"
          stroke="rgba(0, 229, 255, 0.22)"
          strokeWidth="0.6"
          strokeDasharray="4 14 12 14"
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ originX: '60px', originY: '60px' }}
        />

        {/* --- Rotating Energy Ring B: Technical Segmented Gear (Fast Counter-Clockwise) --- */}
        <motion.circle
          cx="60"
          cy="60"
          r="43"
          fill="none"
          stroke="rgba(168, 85, 247, 0.28)"
          strokeWidth="0.5"
          strokeDasharray="24 8 2 8 8 8"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: '60px', originY: '60px' }}
        />

        {/* --- Rotating Energy Ring C: Segments (Fast Clockwise) --- */}
        <motion.circle
          cx="60"
          cy="60"
          r="38"
          fill="none"
          stroke="rgba(79, 124, 255, 0.35)"
          strokeWidth="0.45"
          strokeDasharray="8 60 16 12"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ originX: '60px', originY: '60px' }}
        />

        {/* --- Tilted Concentric Cosmic Ellipse Loop (Plane perspective) --- */}
        <motion.ellipse
          cx="60"
          cy="60"
          rx="48"
          ry="14"
          fill="none"
          stroke="rgba(0, 229, 255, 0.15)"
          strokeWidth="0.5"
          strokeDasharray="6 6"
          transform="rotate(30 60 60)"
          animate={{ rotate: [30, 390] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ originX: '60px', originY: '60px' }}
        />
      </svg>

      {/* 3. Glassmorphic Core Container & Futuristic Neural Micro-Reactor */}
      <motion.div
        animate={{ 
          scale: [1, 1.04, 1],
          boxShadow: [
            "inset 0 0 20px rgba(0, 229, 255, 0.55), 0 0 15px rgba(0, 229, 255, 0.1)",
            "inset 0 0 32px rgba(168, 85, 247, 0.65), 0 0 28px rgba(168, 85, 247, 0.25)",
            "inset 0 0 20px rgba(0, 229, 255, 0.55), 0 0 15px rgba(0, 229, 255, 0.1)"
          ]
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center relative cursor-pointer overflow-hidden backdrop-blur-xl z-20"
        style={{
          background: 'url(#hologramCore), radial-gradient(circle at 35% 35%, rgba(0, 229, 255, 0.6) 0%, rgba(168, 85, 247, 0.3) 45%, rgba(1, 1, 8, 0.95) 100%)',
        }}
      >
        {/* Hologram glass lens reflection sheen */}
        <div className="absolute top-1.5 left-3 w-10 h-5 bg-white/22 rounded-full filter blur-[1.8px] transform -rotate-12 pointer-events-none select-none" />

        {/* Dynamic scanning latitude laser sweep (Micro sensor line) */}
        <motion.div 
          animate={{ top: ['5%', '92%', '5%'] }}
          transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1 right-1 h-[1.2px] bg-cyan-300 shadow-[0_0_8px_#22D3EE] z-10 pointer-events-none"
        />

        {/* --- REFINED futuristic neural energy core (Nested rotating octahedron) --- */}
        <div className="w-10 h-10 relative flex items-center justify-center pointer-events-none select-none">
          {/* Inner containment halo */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/25 animate-ping" style={{ animationDuration: '3s' }} />

          {/* Glowing central core nucleus */}
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_6px_#00E5FF] z-20"
          />

          {/* Outer rotating crystal shell 1 */}
          <motion.svg 
            className="absolute w-full h-full z-10 opacity-80" 
            viewBox="0 0 20 20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {/* Spinning octahedron vector mesh representing AST compiler crystal */}
            <polygon points="10,1 17,10 10,19 3,10" fill="none" stroke="#00E5FF" strokeWidth="0.45" filter="url(#neonOrbGlow)" />
            <polygon points="10,1 15,10 10,19 5,10" fill="none" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="0.35" />
            <line x1="10" y1="1" x2="10" y2="19" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.3" />
            <line x1="3" y1="10" x2="17" y2="10" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.3" />
          </motion.svg>

          {/* Outer rotating crystal shell 2 (Reverse tilt rotation) */}
          <motion.svg 
            className="absolute w-[80%] h-[80%] z-5 opacity-70" 
            viewBox="0 0 20 20"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <polygon points="10,1 17,10 10,19 3,10" fill="none" stroke="#4F7CFF" strokeWidth="0.4" transform="rotate(45 10 10)" />
          </motion.svg>
        </div>

        {/* Internal ambient plasma sparks */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.2)_0%,transparent_75%)] animate-[pulse_2.2s_infinite]" />
      </motion.div>

      {/* 4. High-precision Swarming Holographic Satellites */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full pointer-events-none z-30"
      >
        {/* Sat A: Active Compiler node spark */}
        <div 
          className="absolute top-[8%] left-[50%] -translate-x-1/2 w-2 h-2 rounded-full bg-white border border-cyan-400 shadow-[0_0_8px_#00E5FF,0_0_3px_#FFFFFF]"
          style={{ transform: 'translateY(-50%)' }}
        />
        
        {/* Sat B: Violet parser satellite */}
        <div className="absolute bottom-[23%] left-[12%] w-1.5 h-1.5 rounded-full bg-purple-400 border border-purple-500/50 shadow-[0_0_6px_#A855F7]" />
        
        {/* Sat C: High-velocity micro metrics tracker */}
        <div className="absolute bottom-[36%] right-[8%] w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_4px_#00E5FF]" />
      </motion.div>
    </motion.div>
  );
}
