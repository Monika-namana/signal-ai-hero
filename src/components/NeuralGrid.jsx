import React, { useEffect, useState } from 'react';

export default function NeuralGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mousePixels, setMousePixels] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });

      const px = (e.clientX / window.innerWidth) * 100;
      const py = (e.clientY / window.innerHeight) * 100;
      setMousePixels({ x: px, y: py });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Neural network nodes coordinates
  const nodes = [
    { id: 1, cx: 12, cy: 25, r: 4 },
    { id: 2, cx: 32, cy: 18, r: 6 },
    { id: 3, cx: 48, cy: 30, r: 8 },
    { id: 4, cx: 22, cy: 42, r: 5 },
    { id: 5, cx: 14, cy: 68, r: 7 },
    { id: 6, cx: 38, cy: 80, r: 5 },
    { id: 7, cx: 68, cy: 22, r: 9 },
    { id: 8, cx: 88, cy: 12, r: 4 },
    { id: 9, cx: 58, cy: 58, r: 7 },
    { id: 10, cx: 82, cy: 45, r: 6 },
    { id: 11, cx: 92, cy: 78, r: 8 },
    { id: 12, cx: 66, cy: 88, r: 5 },
  ];

  const links = [
    { from: 1, to: 2, curve: 'left' },
    { from: 2, to: 3, curve: 'right' },
    { from: 1, to: 4, curve: 'right' },
    { from: 4, to: 5, curve: 'left' },
    { from: 5, to: 6, curve: 'right' },
    { from: 3, to: 6, curve: 'left' },
    { from: 3, to: 7, curve: 'left' },
    { from: 7, to: 8, curve: 'right' },
    { from: 7, to: 9, curve: 'right' },
    { from: 9, to: 10, curve: 'left' },
    { from: 10, to: 8, curve: 'left' },
    { from: 10, to: 11, curve: 'right' },
    { from: 9, to: 12, curve: 'right' },
    { from: 6, to: 12, curve: 'left' },
    { from: 11, to: 12, curve: 'left' },
  ];

  // Foreground particles (Near Space, Parallax 0.38x)
  const [particles] = useState(() => 
    Array.from({ length: 22 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      color: idx % 3 === 0 ? 'rgba(0, 229, 255, 0.35)' : idx % 3 === 1 ? 'rgba(79, 124, 255, 0.3)' : 'rgba(168, 85, 247, 0.25)', // Softened Cyan, Blue, Purple
      speed: Math.random() * 20 + 35, // Premium slower drift
      delay: Math.random() * -45,
    }))
  );

  // Background stars (Deep Space, Parallax 0.03x)
  const [bgStars] = useState(() =>
    Array.from({ length: 40 }).map((_, idx) => ({
      id: idx,
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r: Math.random() * 0.5 + 0.15,
      opacity: Math.random() * 0.3 + 0.05, // Quiet, delicate stars
      duration: `${Math.random() * 10 + 6}s`,
    }))
  );

  // Midground stars (Parallax 0.12x)
  const [midStars] = useState(() =>
    Array.from({ length: 20 }).map((_, idx) => ({
      id: idx,
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.35 + 0.1, // Delicate midground shimmer
      duration: `${Math.random() * 7 + 4}s`,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#010106]">
      
      {/* 1. Cinematic Widescreen Vignette & Space Overlay */}
      <div className="absolute inset-0 vignette-overlay z-10" />
      <div className="absolute inset-0 bg-grid opacity-15 z-0" />

      {/* 2. Soft Breathing Cinematic Nebulas (Rich color depth) */}
      {/* Nebula A (Deep Sapphire Blue) */}
      <div 
        className="absolute w-[950px] h-[950px] rounded-full mix-blend-screen animate-pulse-slow transition-transform duration-700 ease-out z-0 opacity-45 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 28, 99, 0.15) 0%, rgba(6, 12, 45, 0.03) 65%, transparent 100%)',
          left: '8%',
          top: '-10%',
          transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -16}px)`,
        }}
      />
      {/* Nebula B (Electric Violet) */}
      <div 
        className="absolute w-[850px] h-[850px] rounded-full mix-blend-screen animate-pulse-slow transition-transform duration-700 ease-out z-0 opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.07) 0%, rgba(20, 10, 60, 0.02) 60%, transparent 100%)',
          right: '8%',
          bottom: '10%',
          transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 22}px)`,
          animationDelay: '-4s',
        }}
      />
      {/* Nebula C (Cyan Cosmic Glow) */}
      <div 
        className="absolute w-[900px] h-[900px] rounded-full mix-blend-screen animate-pulse-slow transition-transform duration-700 ease-out z-0 opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, rgba(5, 40, 60, 0.01) 70%, transparent 100%)',
          left: '40%',
          top: '25%',
          transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
          animationDelay: '-8s',
        }}
      />

      {/* 3. Deep-Space Far Stars Layer (Background, Parallax 0.03x) */}
      <svg className="absolute inset-0 w-full h-full opacity-45 z-1" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g style={{ transform: `translate(${mousePos.x * 0.03}%, ${mousePos.y * 0.03}%)` }}>
          {bgStars.map((star) => (
            <circle
              key={`bg-star-${star.id}`}
              cx={`${star.cx}%`}
              cy={`${star.cy}%`}
              r={star.r}
              fill="#FFFFFF"
              style={{
                animation: `pulse-slow ${star.duration} infinite ease-in-out`,
                opacity: star.opacity,
              }}
            />
          ))}
        </g>
      </svg>

      {/* 4. Midground Layer (Stars & Rotating Cosmic Orbits, Parallax 0.12x) */}
      <svg className="absolute inset-0 w-full h-full opacity-65 z-2" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g style={{ transform: `translate(${mousePos.x * 0.12}%, ${mousePos.y * 0.12}%)` }}>
          
          {/* Micro-stars */}
          {midStars.map((star) => (
            <circle
              key={`mid-star-${star.id}`}
              cx={`${star.cx}%`}
              cy={`${star.cy}%`}
              r={star.r}
              fill="#FFFFFF"
              style={{
                animation: `pulse-slow ${star.duration} infinite ease-in-out`,
                opacity: star.opacity,
              }}
            />
          ))}

          {/* Majestic Holographic Concentric Orbital Rings (Perspective space ellipses) */}
          {/* Orbit A */}
          <ellipse
            cx="50"
            cy="50"
            rx="38"
            ry="11"
            fill="none"
            stroke="rgba(0, 229, 255, 0.07)"
            strokeWidth="0.25"
            strokeDasharray="6 8"
            transform="rotate(-25 50 50)"
          />
          {/* Orbit B */}
          <ellipse
            cx="50"
            cy="50"
            rx="56"
            ry="16"
            fill="none"
            stroke="rgba(79, 124, 255, 0.06)"
            strokeWidth="0.2"
            strokeDasharray="16 12 4 12"
            transform="rotate(-25 50 50)"
          />
          {/* Orbit C */}
          <ellipse
            cx="50"
            cy="50"
            rx="75"
            ry="22"
            fill="none"
            stroke="rgba(168, 85, 247, 0.05)"
            strokeWidth="0.15"
            strokeDasharray="8 6 12 6"
            transform="rotate(-25 50 50)"
          />
        </g>
      </svg>

      {/* 5. Interactive Mouse-following Spotlight Mask (Atmospheric Color Dodge) */}
      <svg className="absolute inset-0 w-full h-full z-2 mix-blend-color-dodge transition-opacity duration-1000" style={{ opacity: isHovered ? 0.6 : 0 }}>
        <defs>
          <radialGradient id="cursorSpotlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 229, 255, 0.28)" />
            <stop offset="35%" stopColor="rgba(79, 124, 255, 0.12)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>
        <circle 
          cx={`${mousePixels.x}%`} 
          cy={`${mousePixels.y}%`} 
          r="24" 
          fill="url(#cursorSpotlight)" 
        />
      </svg>

      {/* 6. Glowing Neural Syntactic Synapses (Parallax 0.22x) */}
      <svg className="absolute inset-0 w-full h-full opacity-80 z-3" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
            <stop offset="35%" stopColor="#00E5FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="purpleNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="1" />
            <stop offset="35%" stopColor="#A855F7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </radialGradient>

          {/* Saturated laser glows */}
          <filter id="laserCyan" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="laserPurple" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g style={{ transform: `translate(${mousePos.x * 0.22}%, ${mousePos.y * 0.22}%)` }}>
          {/* Curved Optical Fiber Connections */}
          {links.map((link, idx) => {
            const fromNode = nodes.find(n => n.id === link.from);
            const toNode = nodes.find(n => n.id === link.to);
            
            if (!fromNode || !toNode) return null;

            const mx = (fromNode.cx + toNode.cx) / 2;
            const my = (fromNode.cy + toNode.cy) / 2;
            const curveOffset = link.curve === 'left' ? -3.2 : 3.2;
            const qx = mx + (toNode.cy - fromNode.cy) * 0.09 * curveOffset;
            const qy = my + (fromNode.cx - toNode.cx) * 0.09 * curveOffset;

            const pathD = `M ${fromNode.cx} ${fromNode.cy} Q ${qx} ${qy} ${toNode.cx} ${toNode.cy}`;
            const isPurple = idx % 3 === 0;

            return (
              <g key={`path-${idx}`}>
                {/* 1. Base Layer (Wide, faint ambient neon aura) */}
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke={isPurple ? "rgba(168, 85, 247, 0.01)" : "rgba(0, 229, 255, 0.01)"} 
                  strokeWidth="0.8" 
                />
                {/* 2. Core Glow Layer (Medium glowing conduit) */}
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke={isPurple ? "rgba(168, 85, 247, 0.08)" : "rgba(0, 229, 255, 0.06)"} 
                  strokeWidth="0.3" 
                  filter={isPurple ? "url(#laserPurple)" : "url(#laserCyan)"}
                />
                {/* 3. Intense Core Signal Path (Thin, traveling laser spark) */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isPurple ? "#C084FC" : "#22D3EE"}
                  strokeWidth="0.25"
                  strokeLinecap="round"
                  className="animate-signal-flow"
                  style={{
                    opacity: 0.75,
                    strokeDasharray: '4, 100', // Premium single energy droplet
                    animationDuration: idx % 2 === 0 ? '5s' : '7.5s', // Elegant slower movement
                    animationDelay: `${idx * 0.35}s`
                  }}
                />
              </g>
            );
          })}

          {/* Highly Polished Core Nodes */}
          {nodes.map((node) => {
            const isPurple = node.id % 3 === 0;
            return (
              <g key={`node-${node.id}`}>
                {/* Outer breathing halo */}
                <circle
                  cx={`${node.cx}%`}
                  cy={`${node.cy}%`}
                  r={node.r * 2.5}
                  fill={isPurple ? "url(#purpleNodeGlow)" : "url(#nodeGlow)"}
                  className="opacity-40 animate-pulse"
                  style={{ animationDuration: `${node.id % 2 === 0 ? 3.5 : 5.5}s` }}
                />
                {/* Micro outer edge rim */}
                <circle cx={`${node.cx}%`}
                  cy={`${node.cy}%`}
                  r={node.r * 0.7}
                  fill="#010106"
                  stroke={isPurple ? "#A855F7" : "#00E5FF"}
                  strokeWidth="0.45"
                />
                {/* Super bright interior pixel */}
                <circle cx={`${node.cx}%`}
                  cy={`${node.cy}%`}
                  r={node.r * 0.22}
                  fill="#FFFFFF"
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* 7. Foreground Drifting Particles (Near Space, Parallax 0.38x) */}
      <div 
        className="absolute inset-0 z-4 transition-transform duration-700 ease-out pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 28}px, ${mousePos.y * 28}px)` }}
      >
        {particles.map((p) => (
          <div
            key={`particle-${p.id}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}, 0 0 4px rgba(255, 255, 255, 0.4)`,
              animation: `driftUp ${p.speed}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Drifting particle keyframes */}
      <style>{`
        @keyframes driftUp {
          0% {
            transform: translateY(105vh) translateX(0px);
            opacity: 0;
          }
          8% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-5vh) translateX(40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
