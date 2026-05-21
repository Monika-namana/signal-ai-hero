import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingGlassCard({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 6, 
  yOffset = [0, -12, 0], 
  xOffset = [0, 4, 0], 
  rotateOffset = [0, 1.5, 0],
  glowColor = 'cyan', // 'cyan' | 'blue' | 'purple' | 'emerald'
  scale = 1,
  blur = 0,
  baseOpacity = 1,
  style = {},
  ...props
}) {
  
  // Hologram color maps for premium border rim lights, corner brackets, and backing glows
  const colors = {
    cyan: {
      border: 'border-cyan-500/12 hover:border-cyan-400/35',
      bracket: 'border-cyan-400/80',
      glow: 'shadow-[0_8px_35px_rgba(6,182,212,0.08)] hover:shadow-[0_15px_45px_rgba(6,182,212,0.22)]',
      backing: 'bg-cyan-500/3',
      rim: 'rgba(34, 211, 238, 0.08)'
    },
    blue: {
      border: 'border-[#4F7CFF]/12 hover:border-[#4F7CFF]/40',
      bracket: 'border-[#4F7CFF]/90',
      glow: 'shadow-[0_8px_35px_rgba(79,124,255,0.08)] hover:shadow-[0_15px_45px_rgba(79,124,255,0.22)]',
      backing: 'bg-[#4F7CFF]/3',
      rim: 'rgba(79, 124, 255, 0.08)'
    },
    purple: {
      border: 'border-purple-500/12 hover:border-purple-400/35',
      bracket: 'border-purple-400/80',
      glow: 'shadow-[0_8px_35px_rgba(168,85,247,0.08)] hover:shadow-[0_15px_45px_rgba(168,85,247,0.22)]',
      backing: 'bg-purple-500/3',
      rim: 'rgba(168, 85, 247, 0.08)'
    },
    emerald: {
      border: 'border-emerald-500/12 hover:border-emerald-400/35',
      bracket: 'border-emerald-400/80',
      glow: 'shadow-[0_8px_35px_rgba(16,185,129,0.08)] hover:shadow-[0_15px_45px_rgba(16,185,129,0.22)]',
      backing: 'bg-emerald-500/3',
      rim: 'rgba(16, 185, 129, 0.08)'
    }
  };

  const scheme = colors[glowColor] || colors.blue;

  return (
    <motion.div
      initial={{ 
        y: 0, 
        x: 0, 
        rotate: 0, 
        scale: scale,
        opacity: baseOpacity,
        filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)'
      }}
      animate={{ 
        y: yOffset,
        x: xOffset,
        rotate: rotateOffset
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: [0.445, 0.05, 0.55, 0.95], // Premium, highly natural cubic-bezier levitation physics
        delay: delay
      }}
      whileHover={{ 
        scale: scale * 1.04,
        opacity: 1,
        filter: 'blur(0px)', // Autofocus camera lens effect on hover!
        transition: { duration: 0.35, ease: "easeOut" }
      }}
      style={style}
      className={`glass rounded-xl p-5 border ${scheme.border} ${scheme.glow} backdrop-blur-3xl relative transition-all duration-500 group sheen-container ${className}`}
      {...props}
    >
      {/* 1. Subtle inner rim light overlay for localized glow reinforcement */}
      <div 
        className="absolute inset-px rounded-[11px] pointer-events-none"
        style={{
          boxShadow: `inset 0 0 12px ${scheme.rim}`,
        }}
      />
      
      {/* 2. Backing technical layout pattern grids */}
      <div className={`absolute inset-0 ${scheme.backing} opacity-25 mix-blend-screen pointer-events-none`} />
      
      {/* 3. Specular glass reflection layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.05] pointer-events-none" />

      {/* 4. Highly detailed hologram card corner brackets */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 rounded-tl-[3px] ${scheme.bracket} transition-all duration-300 group-hover:scale-110`} />
      <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 rounded-tr-[3px] ${scheme.bracket} transition-all duration-300 group-hover:scale-110`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 rounded-bl-[3px] ${scheme.bracket} transition-all duration-300 group-hover:scale-110`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 rounded-br-[3px] ${scheme.bracket} transition-all duration-300 group-hover:scale-110`} />

      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
