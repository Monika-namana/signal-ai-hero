import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralGrid from './components/NeuralGrid';
import CodeTerminal from './components/CodeTerminal';
import FloatingGlassCard from './components/FloatingGlassCard';
import FloatingOrb from './components/FloatingOrb';
import { 
  ArrowRight, 
  Play, 
  AlertTriangle, 
  Zap, 
  Activity,
  Sparkles,
  Command,
  X,
  Terminal as TermIcon,
  RefreshCw,
  Sliders
} from 'lucide-react';

export default function App() {
  const [demoActive, setDemoActive] = useState(false);
  const [terminalPhase, setTerminalPhase] = useState('buggy');
  const [cursorCoords, setCursorCoords] = useState({ x: -250, y: -250 });
  const [cursorHovering, setCursorHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Live Simulator states for the Watch Demo Modal
  const [simulatedLogs, setSimulatedLogs] = useState([]);
  const [simPhase, setSimPhase] = useState('idle'); // 'idle' | 'running'
  const logEndRef = useRef(null);

  const simulationEvents = [
    { text: "INITIALIZING ANTIGRAVITY ENGINE PROTOCOL v2.4...", type: "system" },
    { text: "CONNECTING TO SIGNAL CLUSTER SYNAPSES... ACTIVE", type: "system" },
    { text: "ANALYZING TARGET CODEBASE: find_duplicates.py", type: "info" },
    { text: "BUILDING ABSTRACT SYNTAX TREE (AST) GRAPH...", type: "info" },
    { text: "CRITICAL ALERT: Quadratic runtime O(N²) detected inside nested loops", type: "warning" },
    { text: "TELEMETRY LOG: Core iteration duration = 420.0ms", type: "warning" },
    { text: "OPTIMIZER: Spawning cognitive refactoring subagents...", type: "system" },
    { text: "INJECTING STATIC RESOLUTION: Set-Lookup table strategy", type: "success" },
    { text: "RECONSTRUCTING PARSED NODE SUBTREE MAP...", type: "info" },
    { text: "COMPILING OPTIMIZED WASM BUNDLE ASSEMBLY...", type: "info" },
    { text: "OPTIMAL REACHED: duplicates_fast.py generated successfully", type: "success" },
    { text: "SPEED METRIC: Complexity reduced O(N²) -> O(N)", type: "success" },
    { text: "SPEED METRIC: Execution latency reduced 420ms -> 12ms (35.0x speed factor)", type: "success" },
    { text: "DIAGNOSTIC COMPLETE. Antigravity compiler sandbox: STEADY.", type: "success" }
  ];

  // Run simulated logs stream inside the modal
  useEffect(() => {
    if (!demoActive) {
      setSimulatedLogs([]);
      setSimPhase('idle');
      return;
    }

    setSimPhase('running');
    let logIndex = 0;
    setSimulatedLogs([{ timestamp: getTimestamp(), ...simulationEvents[0] }]);

    const interval = setInterval(() => {
      logIndex++;
      if (logIndex < simulationEvents.length) {
        setSimulatedLogs((prev) => [
          ...prev,
          { timestamp: getTimestamp(), ...simulationEvents[logIndex] }
        ]);
      } else {
        clearInterval(interval);
        setSimPhase('idle');
      }
    }, 1400);

    return () => clearInterval(interval);
  }, [demoActive]);

  // Scroll logs container to bottom on update
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [simulatedLogs]);

  // Mouse Move listener for absolute cinematic spotlight alignment and 3D depth tilts
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorCoords({ x: e.clientX, y: e.clientY });
      setCursorHovering(true);
      
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    const handleMouseLeave = () => setCursorHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  function getTimestamp() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  }

  // Compute dynamic speed and styles for SVG laser lines based on current compilation state
  const speedMult = terminalPhase === 'scanning' ? 0.32 : terminalPhase === 'optimized' ? 1.0 : 2.2;
  const laserOpacity = terminalPhase === 'scanning' ? 0.85 : terminalPhase === 'optimized' ? 0.50 : 0.30;
  const laserStrokeWidth = terminalPhase === 'scanning' ? 0.55 : terminalPhase === 'optimized' ? 0.35 : 0.25;

  // Dynamic atmospheric spotlight background style based on compiler phase
  const spotlightBgClass = 
    terminalPhase === 'scanning'
      ? 'bg-radial-[circle,rgba(0,229,255,0.085)_0%,rgba(79,124,255,0.02)_50%,transparent_100%]'
      : terminalPhase === 'optimized'
      ? 'bg-radial-[circle,rgba(16,185,129,0.075)_0%,rgba(34,211,238,0.015)_50%,transparent_100%]'
      : 'bg-radial-[circle,rgba(168,85,247,0.07)_0%,rgba(79,124,255,0.02)_50%,transparent_100%]';

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-between text-slate-100 overflow-hidden bg-[#010106]">
      
      {/* 1. Trailing Interactive Atmosphere Halo Spotlight */}
      {cursorHovering && (
        <div 
          className={`pointer-events-none fixed w-[450px] h-[450px] rounded-full mix-blend-color-dodge filter blur-[45px] z-40 transition-all duration-700 ${spotlightBgClass}`}
          style={{
            left: cursorCoords.x - 225,
            top: cursorCoords.y - 225,
          }}
        />
      )}

      {/* Background Volumetric Neural Grid & Parallax Stars */}
      <NeuralGrid />

      {/* Cinematic Ambient Backdrop Lighting Halos (Pulsing colors, widescreen focus) */}
      <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#162E93] opacity-20 filter blur-[150px] pointer-events-none z-0 animate-pulse-slow animate-[pulse-slow_12s_infinite]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[55%] h-[55%] rounded-full bg-[#4F7CFF] opacity-10 filter blur-[180px] pointer-events-none z-0 animate-pulse-slow animate-[pulse-slow_15s_infinite]" style={{ animationDelay: '-4s' }} />
      <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-[#A855F7] opacity-08 filter blur-[140px] pointer-events-none z-0 animate-pulse-slow animate-[pulse-slow_18s_infinite]" style={{ animationDelay: '-8s' }} />

      {/* Top Header - Premium SaaS Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between z-20 relative select-none">
        <div className="flex items-center space-x-2.5 group cursor-pointer">
          <div className="relative flex items-center justify-center w-9.5 h-9.5 rounded-xl glass border-cyan-500/20 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.35)]">
            <Command className="w-4.5 h-4.5 text-white group-hover:text-cyan-400 transition-colors animate-pulse" />
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <span className="font-display font-bold text-lg tracking-[0.08em] text-white">
            SIGNAL<span className="text-cyan-400 font-light">//AI</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
          <a href="#features" className="hover:text-white transition-colors relative group py-1">
            <span>Features</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
          </a>
          <a href="#compiler" className="hover:text-white transition-colors relative group py-1">
            <span>Playground</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
          </a>
          <a href="#docs" className="hover:text-white transition-colors relative group py-1">
            <span>Docs</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
          </a>
          <a href="#pricing" className="hover:text-white transition-colors relative group py-1">
            <span>Pricing</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:inline-flex items-center space-x-2 text-[9px] uppercase font-mono tracking-[0.14em] px-3.5 py-2 rounded-lg glass border-cyan-500/10 hover:bg-white/5 hover:border-cyan-400/25 transition-all text-slate-400 hover:text-cyan-300 font-medium"
          >
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
            <span>Sandbox v2.4</span>
          </a>
          <button className="relative group px-5 py-2.5 rounded-xl overflow-hidden font-semibold text-[10px] tracking-[0.16em] uppercase transition-all shadow-[0_4px_25px_rgba(79,124,255,0.12)]">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#162E93] to-cyan-500 transition-all" />
            <span className="absolute inset-0 w-full h-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-white flex items-center space-x-1.5">
              <span>Launch Console</span>
              <ArrowRight size={12} />
            </span>
          </button>
        </div>
      </header>

      {/* Main Fullscreen Hero Section Grid */}
      <main className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-18 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center z-10 relative">
        
        {/* Left Side: Copy, Buttons, SaaS Metrics */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.15
              }
            }
          }}
          className="lg:col-span-5 flex flex-col items-start text-left space-y-9 relative"
        >
          
          {/* Antigravity Badge */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full glass border-cyan-500/10 text-xs font-medium text-slate-300 shadow-[0_0_15px_rgba(34,211,238,0.05)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-cyan-400/90 font-semibold">Antigravity Core // Active</span>
          </motion.div>

          {/* Typography Scales (Headings Oswald, Body Open Sans) */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className="space-y-5"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[74px] font-bold tracking-tight text-white leading-[1.02] uppercase font-display select-none">
              Code Smarter.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-[#4F7CFF] text-glow font-bold">
                Fix Faster.
              </span>
            </h1>
            
            <p className="max-w-[420px] text-sm sm:text-[15px] text-slate-400 leading-relaxed font-sans font-medium">
              An AI coding assistant helping developers debug, optimize, and understand complex syntax graphs in real time.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button className="relative group px-8 py-4 rounded-xl overflow-hidden font-semibold text-[11px] uppercase tracking-[0.16em] text-center shadow-[0_8px_35px_rgba(34,211,238,0.18)] transition-all active:scale-[0.98]">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#162E93] via-cyan-500 to-[#4F7CFF] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] group-hover:scale-105 transition-transform" />
              <span className="relative text-white flex items-center justify-center space-x-2">
                <span>Start Building Free</span>
                <Sparkles size={14} className="animate-pulse" />
              </span>
            </button>

            <button 
              onClick={() => setDemoActive(true)}
              className="px-8 py-4 rounded-xl font-semibold text-[11px] uppercase tracking-[0.16em] bg-white/4 hover:bg-white/8 border border-white/5 hover:border-cyan-500/20 transition-all text-slate-200 flex items-center justify-center space-x-2 group active:scale-[0.98]"
            >
              <Play size={12} className="fill-slate-200 text-slate-200 group-hover:scale-110 transition-transform group-hover:text-cyan-400 group-hover:fill-cyan-400" />
              <span>Watch Demo</span>
            </button>
          </motion.div>

          {/* Developer-Focused Metrics (Highly premium SaaS alignment) */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
            }}
            className="pt-8 border-t border-white/5 w-full"
          >
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-mono mb-4 font-semibold">Active Syntactic Core // Logs</p>
            <div className="grid grid-cols-3 gap-3.5 sm:gap-6 select-none">
              <div>
                <p className="font-display text-[21px] xs:text-2xl sm:text-[26px] font-bold text-slate-100 tracking-wide">15k+</p>
                <p className="text-[9px] font-medium text-slate-500 uppercase tracking-[0.14em] font-mono leading-none">Dev Sandboxes</p>
                
                {/* Visual Sandbox Equalizer */}
                <div className="mt-3 flex items-end space-x-1 h-[12px]">
                  {[1.2, 2.0, 0.8, 1.6, 2.4].map((speed, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ['25%', '90%', '25%'] }}
                      transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`w-[2px] rounded-full ${
                        i % 3 === 0 ? 'bg-cyan-400/70 shadow-[0_0_4px_rgba(34,211,238,0.3)]' : 
                        i % 3 === 1 ? 'bg-purple-400/60 shadow-[0_0_4px_rgba(168,85,247,0.3)]' : 
                        'bg-[#4F7CFF]/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <p className="font-display text-[21px] xs:text-2xl sm:text-[26px] font-bold text-emerald-300 tracking-wide drop-shadow-[0_0_10px_rgba(52,211,153,0.12)]">99.8%</p>
                <p className="text-[9px] font-medium text-slate-500 uppercase tracking-[0.14em] font-mono leading-none">AST Accuracy</p>
                
                {/* Visual Sparkline Wave */}
                <div className="mt-3 flex items-center h-[12px] w-full">
                  <svg className="w-16 h-3 overflow-visible" viewBox="0 0 60 12">
                    <path
                      d="M 0 6 Q 15 0 30 6 T 60 6"
                      fill="none"
                      stroke="rgba(16, 185, 129, 0.18)"
                      strokeWidth="0.85"
                    />
                    <motion.path
                      d="M 0 6 Q 15 0 30 6 T 60 6"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="0.95"
                      strokeLinecap="round"
                      className="animate-signal-flow"
                      style={{
                        strokeDasharray: '3, 40',
                        animationDuration: '2.4s',
                        filter: 'drop-shadow(0 0 3px rgba(16, 185, 129, 0.6))'
                       }}
                    />
                  </svg>
                </div>
              </div>
              
              <div>
                <p className="font-display text-[21px] xs:text-2xl sm:text-[26px] font-bold text-cyan-300 tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.12)]">12ms</p>
                <p className="text-[9px] font-medium text-slate-500 uppercase tracking-[0.14em] font-mono leading-none">Wasm Latency</p>
                
                {/* Fast horizontal latency tracker sparkline */}
                <div className="mt-3.5 flex items-center h-[12px] w-full">
                  <div className="w-16 h-[4px] rounded-full bg-slate-950/80 border border-white/5 relative overflow-hidden">
                    <motion.div
                      animate={{ left: ['-100%', '200%'] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#00E5FF]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Right Side: Futuristic visual with strict 3D Perspective viewport */}
        <div 
          className="lg:col-span-7 flex flex-col lg:flex-row items-center justify-center relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[620px] py-8 lg:py-0 select-none"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d'
          }}
        >
          
          {/* Volumetric Backlight Spot shifting dynamically in color and brightness based on compiler phase */}
          <div className={`absolute w-[82%] h-[82%] rounded-full filter blur-[110px] z-0 transition-all duration-1000 ${
            terminalPhase === 'scanning' ? 'bg-[#00E5FF]/18 scale-110 opacity-90' :
            terminalPhase === 'optimized' ? 'bg-[#10B981]/12 scale-100 opacity-60' :
            'bg-[#162E93]/20 scale-95 opacity-50'
          }`} />

          {/* Upgraded Glowing SVG Laser Transmission Channels (Midground plane) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="purpleLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="0.85" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="cyanLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="0.85" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="emeraldLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="0.85" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Fading path gradients based on coordinate flow direction */}
              <linearGradient id="gradientPathA" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#A855F7" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradientPathOrb" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#22D3EE" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradientPathB" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#10B981" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradientPathC" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#22D3EE" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Path to Card A (Purple / Refactor Log) */}
            <path d="M 42 42 Q 28 35 22 22" fill="none" stroke="url(#gradientPathA)" strokeWidth="0.25" />
            <path d="M 42 42 Q 28 35 22 22" fill="none" stroke="#A855F7" strokeWidth={laserStrokeWidth} opacity={laserOpacity} filter="url(#purpleLaserGlow)" />
            <path 
              d="M 42 42 Q 28 35 22 22" 
              fill="none" 
              stroke="#E9D5FF" 
              strokeWidth="0.45" 
              strokeLinecap="round"
              className="animate-signal-flow" 
              style={{ strokeDasharray: '10, 160', animationDuration: `${3.6 * speedMult}s` }} 
            />
            {/* Target node glowing halo */}
            <circle cx="22" cy="22" r="1.8" fill="rgba(168, 85, 247, 0.15)" filter="url(#purpleLaserGlow)" />
            <circle cx="22" cy="22" r="0.55" fill="#FFFFFF" />

            {/* Path to Floating Orb (Cyan / Central Brain) */}
            <path d="M 58 38 Q 70 28 80 15" fill="none" stroke="url(#gradientPathOrb)" strokeWidth="0.25" />
            <path d="M 58 38 Q 70 28 80 15" fill="none" stroke="#22D3EE" strokeWidth={laserStrokeWidth} opacity={laserOpacity} filter="url(#cyanLaserGlow)" />
            <path 
              d="M 58 38 Q 70 28 80 15" 
              fill="none" 
              stroke="#E0F7FA" 
              strokeWidth="0.45" 
              strokeLinecap="round"
              className="animate-signal-flow" 
              style={{ strokeDasharray: '10, 160', animationDuration: `${2.8 * speedMult}s` }} 
            />
            <circle cx="80" cy="15" r="1.8" fill="rgba(34, 211, 238, 0.15)" filter="url(#cyanLaserGlow)" />
            <circle cx="80" cy="15" r="0.55" fill="#FFFFFF" />

            {/* Path to Card B (Emerald / Optimization Index) */}
            <path d="M 58 60 Q 70 70 76 78" fill="none" stroke="url(#gradientPathB)" strokeWidth="0.25" />
            <path d="M 58 60 Q 70 70 76 78" fill="none" stroke="#10B981" strokeWidth={laserStrokeWidth} opacity={laserOpacity} filter="url(#emeraldLaserGlow)" />
            <path 
              d="M 58 60 Q 70 70 76 78" 
              fill="none" 
              stroke="#D1FAE5" 
              strokeWidth="0.45" 
              strokeLinecap="round"
              className="animate-signal-flow" 
              style={{ strokeDasharray: '10, 160', animationDuration: `${4.0 * speedMult}s` }} 
            />
            <circle cx="76" cy="78" r="1.8" fill="rgba(16, 185, 129, 0.15)" filter="url(#emeraldLaserGlow)" />
            <circle cx="76" cy="78" r="0.55" fill="#FFFFFF" />

            {/* Path to Card C (Cyan / Latency Logger) */}
            <path d="M 42 60 Q 28 70 22 80" fill="none" stroke="url(#gradientPathC)" strokeWidth="0.25" />
            <path d="M 42 60 Q 28 70 22 80" fill="none" stroke="#22D3EE" strokeWidth={laserStrokeWidth} opacity={laserOpacity} filter="url(#cyanLaserGlow)" />
            <path 
              d="M 42 60 Q 28 70 22 80" 
              fill="none" 
              stroke="#E0F7FA" 
              strokeWidth="0.45" 
              strokeLinecap="round"
              className="animate-signal-flow" 
              style={{ strokeDasharray: '10, 160', animationDuration: `${4.5 * speedMult}s` }} 
            />
            <circle cx="22" cy="80" r="1.8" fill="rgba(34, 211, 238, 0.15)" filter="url(#cyanLaserGlow)" />
            <circle cx="22" cy="80" r="0.55" fill="#FFFFFF" />
          </svg>

          {/* Floating Holographic Orb (Centered & Stacked on mobile, Absolute on desktop) */}
          <div 
            className="relative lg:absolute lg:top-[1%] lg:right-[-4%] xl:right-[-8%] mx-auto lg:mx-0 mb-6 lg:mb-0 z-20 scale-90 sm:scale-95 lg:scale-100"
            style={{
              transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 15px)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingOrb />
          </div>

          {/* 3D-Tilt Centerpiece wrapper (Handles stereoscopic Y/X tilts on cursor move) */}
          <motion.div 
            style={{
              transform: `rotateY(${mousePos.x * 4.5}deg) rotateX(${mousePos.y * -4.5}deg) translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0px)`,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: "spring", stiffness: 90, damping: 25 }}
            className="w-full max-w-[530px] px-3.5 sm:px-0 relative z-10"
          >
            <CodeTerminal phase={terminalPhase} setPhase={setTerminalPhase} />
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* LEVEL -2 & -1: DEEP BACKGROUND DEPTH OF FIELD CARDS (z-index 5) */}
          {/* ------------------------------------------------------------- */}
          
          {/* Background Card D: Wasm compilation stack (autofocus on hover) */}
          <div
            className="absolute top-[3%] left-[30%] z-5 hidden lg:block"
            style={{
              transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, -150px) scale(0.95)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingGlassCard 
              className="max-w-[130px]"
              scale={0.70}
              blur={2.2}
              baseOpacity={0.45}
              delay={0.8}
              duration={7}
              yOffset={[0, -5, 0]}
              xOffset={[0, 1, 0]}
              rotateOffset={[0, 0.4, 0]}
              glowColor="blue"
            >
              <div className="flex flex-col space-y-1.5 text-left font-mono">
                <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-wider select-none">JIT WASM Stack</span>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
                  <span className="text-[9px] text-[#4F7CFF] font-bold font-mono">Heap: OK</span>
                </div>
                <div className="text-[7px] text-slate-600 font-sans leading-tight">
                  <p>0xAF38 • JIT compile</p>
                  <p>Telemetry: Steady</p>
                </div>
              </div>
            </FloatingGlassCard>
          </div>

          {/* Background Card E: Memory cache hitting */}
          <div
            className="absolute bottom-[3%] right-[32%] z-5 hidden lg:block"
            style={{
              transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * -24}px, -180px) scale(0.90)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingGlassCard 
              className="max-w-[130px]"
              scale={0.65}
              blur={2.8}
              baseOpacity={0.4}
              delay={2.4}
              duration={8.5}
              yOffset={[0, 5, 0]}
              xOffset={[0, -1, 0]}
              rotateOffset={[0, -0.4, 0]}
              glowColor="purple"
            >
              <div className="flex flex-col space-y-1.5 text-left font-mono">
                <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-wider select-none">L2 Token Cache</span>
                <span className="text-[10px] font-bold text-purple-400 font-mono">98.2% Hit</span>
                <div className="w-14 h-1.2 rounded-full bg-slate-950 overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
            </FloatingGlassCard>
          </div>

          {/* NEW Background Card H: Tokenizer Matrix */}
          <div
            className="absolute top-[18%] left-[12%] z-5 hidden lg:block"
            style={{
              transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, -120px) scale(0.97)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingGlassCard 
              className="max-w-[135px]"
              scale={0.75}
              blur={1.8}
              baseOpacity={0.50}
              delay={1.2}
              duration={7.8}
              yOffset={[0, 4, 0]}
              xOffset={[0, 2, 0]}
              rotateOffset={[0, -0.3, 0]}
              glowColor="blue"
            >
              <div className="flex flex-col space-y-1 text-left font-mono">
                <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-wider select-none">Tokenizer Matrix</span>
                <span className="text-[9px] text-cyan-400 font-bold font-mono">2048 Vec</span>
                <div className="text-[6.5px] text-slate-600 font-sans leading-none space-y-0.5">
                  <p>Dims: [128, 512]</p>
                  <p>Norm: L2 Stable</p>
                </div>
              </div>
            </FloatingGlassCard>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* LEVEL 0: STANDARD MIDGROUND MOUNTED CARDS                     */}
          {/* ------------------------------------------------------------- */}



          {/* Card A: Debug Log Alert (Top-Left, floating independently) */}
          <div
            className="absolute top-[8%] left-[-4%] md:left-[1%] z-20 hidden lg:block"
            style={{
              transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 30px) scale(1.0)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingGlassCard 
              className="max-w-[170px] sm:max-w-[195px]"
              delay={0.5}
              duration={7.5}
              yOffset={[0, -6, 0]}
              xOffset={[0, -2, 0]}
              rotateOffset={[0, 0.6, 0]}
              glowColor="purple"
            >
              <div className="flex items-start space-x-2.5">
                <div className="w-6.5 h-6.5 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.15)]">
                  <AlertTriangle size={12} className="text-purple-400" />
                </div>
                <div className="space-y-0.5 text-left select-none">
                  <p className="font-mono text-[8px] text-purple-400/90 uppercase tracking-widest font-bold">Refactor Log</p>
                  <p className="text-[10px] font-bold text-purple-200">Checking Bounds</p>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10B981]" />
                    <span className="text-[8px] text-emerald-400 font-mono font-semibold">State: Stable</span>
                  </div>
                </div>
              </div>
            </FloatingGlassCard>
          </div>

          {/* Card B: Optimization stats (Bottom-Right, independent curves) */}
          <div
            className="absolute bottom-[2%] right-[-4%] md:right-[4%] z-20 hidden lg:block"
            style={{
              transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 45px) scale(1.0)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingGlassCard 
              className="max-w-[190px] sm:max-w-[215px]"
              delay={1.8}
              duration={8.5}
              yOffset={[0, 6, 0]}
              xOffset={[0, 2, 0]}
              rotateOffset={[0, -0.6, 0]}
              glowColor="emerald"
            >
              <div className="flex flex-col space-y-2.5">
                <div className="flex items-center justify-between select-none">
                  <div className="flex items-center space-x-2">
                    <div className="w-5.5 h-5.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                      <Zap size={11} className="text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-200">Optimize Index</span>
                  </div>
                  <span className="text-[8px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded shadow-[0_0_6px_rgba(16,185,129,0.1)]">+34%</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] text-slate-500 font-mono font-semibold">
                    <span>Runtime speed</span>
                    <span className="text-emerald-400 font-bold text-glow">96%</span>
                  </div>
                  <div className="w-full h-1.2 rounded-full bg-slate-950 overflow-hidden border border-white/5">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full shadow-[0_0_8px_#10B981]" style={{ width: '96%' }} />
                  </div>
                </div>
              </div>
            </FloatingGlassCard>
          </div>

          {/* Card C: Core Uptime Latency (Bottom-Left) */}
          <div
            className="absolute bottom-[6%] left-[-4%] md:left-[3%] z-20 hidden lg:block"
            style={{
              transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 20px) scale(1.0)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingGlassCard 
              className="max-w-[155px] sm:max-w-[170px]"
              delay={1.0}
              duration={9.5}
              yOffset={[0, -7, 0]}
              xOffset={[0, 2, 0]}
              rotateOffset={[0, 0.7, 0]}
              glowColor="cyan"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-full border border-dashed border-cyan-500/35 flex items-center justify-center flex-shrink-0 animate-[spin_12s_linear_infinite] shadow-[0_0_8px_rgba(6,182,212,0.1)]">
                  <Activity size={11} className="text-cyan-400 animate-pulse" />
                </div>
                <div className="text-left select-none space-y-0.5">
                  <p className="font-mono text-[8px] text-cyan-400/90 uppercase tracking-widest font-bold">Latency Log</p>
                  <div className="flex items-baseline space-x-0.5">
                    <span className="text-xs font-display font-bold text-white tracking-wide">12ms</span>
                    <span className="text-[8px] text-slate-500 font-mono font-semibold">stable</span>
                  </div>
                </div>
              </div>
            </FloatingGlassCard>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* LEVEL +1 & +2: FOREGROUND DEPTH-OF-FIELD POP CARDS (z-index 40) */}
          {/* ------------------------------------------------------------- */}

          {/* Foreground Card F: Extreme left pop element (Highly blurred code tag) */}
          <div
            className="absolute top-[58%] left-[-16%] md:left-[-6%] z-40 hidden lg:block pointer-events-none select-none"
            style={{
              transform: `translate3d(${mousePos.x * 45}px, ${mousePos.y * 45}px, 180px) scale(1.15)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingGlassCard
              className="max-w-[155px]"
              scale={1.35}
              blur={4.5}
              baseOpacity={0.75}
              delay={1.4}
              duration={6.5}
              yOffset={[0, -9, 0]}
              xOffset={[0, 3, 0]}
              glowColor="cyan"
            >
              <div className="flex items-center space-x-2 p-0.5">
                <div className="w-6.5 h-6.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Sliders size={12} className="text-cyan-400 animate-pulse" />
                </div>
                <div className="text-left font-mono">
                  <p className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest">import sys</p>
                  <p className="text-[9px] font-bold text-white leading-none">Sys Refactor</p>
                </div>
              </div>
            </FloatingGlassCard>
          </div>

          {/* Foreground Card G: Extreme right pop element (Highly blurred AST token) */}
          <div
            className="absolute top-[12%] right-[-14%] md:right-[-4%] z-40 hidden lg:block pointer-events-none select-none"
            style={{
              transform: `translate3d(${mousePos.x * -50}px, ${mousePos.y * -50}px, 200px) scale(1.2)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingGlassCard
              className="max-w-[135px]"
              scale={1.25}
              blur={5.2}
              baseOpacity={0.70}
              delay={0.2}
              duration={5.8}
              yOffset={[0, 8, 0]}
              xOffset={[0, -2, 0]}
              glowColor="purple"
            >
              <div className="flex items-center space-x-2.5 p-0.5">
                <div className="w-6 h-6 rounded-full border border-purple-500/35 flex items-center justify-center">
                  <Sparkles size={11} className="text-purple-400 animate-pulse" />
                </div>
                <div className="text-left font-mono leading-none">
                  <p className="text-[7px] font-bold text-purple-400 uppercase tracking-widest">AST Tree</p>
                  <p className="text-[9.5px] font-bold text-white tracking-wide">15k nodes</p>
                </div>
              </div>
            </FloatingGlassCard>
          </div>

          {/* NEW Foreground Card I: Optimizer Vector */}
          <div
            className="absolute bottom-[18%] right-[-10%] z-40 hidden lg:block pointer-events-none select-none"
            style={{
              transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * -35}px, 150px) scale(1.1)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
            <FloatingGlassCard
              className="max-w-[150px]"
              scale={1.15}
              blur={4.2}
              baseOpacity={0.75}
              delay={0.6}
              duration={6.2}
              yOffset={[0, -5, 0]}
              xOffset={[0, -3, 0]}
              glowColor="purple"
            >
              <div className="flex items-center space-x-2 p-0.5 font-mono">
                <div className="w-6 h-6 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Sparkles size={11} className="text-purple-400 animate-pulse" />
                </div>
                <div className="text-left font-mono leading-none">
                  <p className="text-[7.5px] font-bold text-purple-400 uppercase tracking-widest">optimizer.fit()</p>
                  <p className="text-[9.5px] font-bold text-white tracking-wide">Loss: 0.002</p>
                </div>
              </div>
            </FloatingGlassCard>
          </div>

        </div>

      </main>

      {/* Footer - Minimalist & Sleek */}
      <footer className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-bold tracking-wide text-slate-500 z-20 relative select-none">
        <p>© 2026 Signal AI Inc. Developed under Antigravity Protocol.</p>
        <div className="flex space-x-8 mt-4 sm:mt-0">
          <a href="#privacy" className="hover:text-slate-300 transition-colors uppercase tracking-wider">Privacy</a>
          <a href="#terms" className="hover:text-slate-300 transition-colors uppercase tracking-wider">Terms</a>
          <a href="#status" className="hover:text-slate-300 transition-colors flex items-center space-x-1.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22D3EE]" />
            <span className="text-cyan-400 font-mono tracking-widest uppercase font-bold">Systems Active</span>
          </a>
        </div>
      </footer>

      {/* Interactive Watch Demo Simulator Modal */}
      <AnimatePresence>
        {demoActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDemoActive(false)}
            className="fixed inset-0 w-full h-full z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl glass rounded-2xl border border-cyan-500/20 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden relative flex flex-col h-[520px] sm:h-[560px] sheen-container"
            >
              {/* Header border shine */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-80" />

              {/* Title Bar */}
              <div className="flex items-center justify-between px-6 py-4.5 bg-slate-950/50 border-b border-white/5 select-none">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                    <TermIcon size={14} className="text-cyan-400 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-display font-bold text-white tracking-wider uppercase">Signal AI // Telemetry Simulator</p>
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Active AST Optimization Console</p>
                  </div>
                </div>
                <button 
                  onClick={() => setDemoActive(false)}
                  className="w-7.5 h-7.5 rounded-lg border border-white/5 hover:border-white/10 flex items-center justify-center bg-white/3 hover:bg-white/7 transition-all text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Two Column Console Layout */}
              <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-slate-950/40">
                
                {/* Left Column: Live Streaming Terminal Logs */}
                <div className="lg:col-span-7 flex flex-col h-full overflow-hidden border-r border-white/5 p-4 sm:p-5 relative font-mono text-[10px] sm:text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-[9px] text-slate-500 font-sans tracking-widest font-bold uppercase select-none">
                    <span>Active Telemetry Logs Stream</span>
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${simPhase === 'running' ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`} />
                      <span>{simPhase === 'running' ? 'Compiling' : 'Steady'}</span>
                    </div>
                  </div>

                  {/* Logs Scroller */}
                  <div className="flex-grow overflow-y-auto space-y-2 pr-2 text-left scrollbar">
                    {simulatedLogs.map((log, idx) => {
                      const colorMap = {
                        system: 'text-cyan-300 drop-shadow-[0_0_3px_rgba(6,182,212,0.25)]',
                        warning: 'text-rose-400 font-semibold drop-shadow-[0_0_3px_rgba(244,63,94,0.25)]',
                        success: 'text-emerald-400 font-semibold drop-shadow-[0_0_3px_rgba(16,185,129,0.3)]',
                        info: 'text-slate-300'
                      };
                      return (
                        <div key={idx} className="flex items-start space-x-2 leading-relaxed">
                          <span className="text-slate-600 select-none">[{log.timestamp}]</span>
                          <span className={colorMap[log.type] || 'text-slate-300'}>{log.text}</span>
                        </div>
                      );
                    })}
                    <div ref={logEndRef} />
                  </div>
                </div>

                {/* Right Column: Holographic AST node visualizer simulation */}
                <div className="lg:col-span-5 hidden lg:flex flex-col h-full p-5 justify-between relative select-none">
                  
                  {/* Title */}
                  <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                    <Sliders size={12} className="text-cyan-400" />
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">Syntax Analysis Tree</span>
                  </div>

                  {/* Dynamic Abstract Syntax Tree Node graph mock */}
                  <div className="flex-grow flex items-center justify-center relative">
                    <svg className="w-52 h-52 opacity-80" viewBox="0 0 100 100">
                      {/* Connections */}
                      <path d="M 50 15 L 25 40 M 50 15 L 75 40 M 25 40 L 15 70 M 25 40 L 38 70 M 75 40 L 62 70 M 75 40 L 85 70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      
                      {simPhase === 'running' && (
                        <motion.path 
                          d="M 50 15 L 25 40 M 50 15 L 75 40 M 25 40 L 15 70 M 25 40 L 38 70 M 75 40 L 62 70 M 75 40 L 85 70" 
                          fill="none" 
                          stroke="#00E5FF" 
                          strokeWidth="1.2" 
                          className="animate-signal-flow"
                          style={{ strokeDasharray: '3, 6' }}
                        />
                      )}

                      {/* AST Root Node */}
                      <circle cx="50" cy="15" r="5" fill="#010106" stroke="#22D3EE" strokeWidth="1.5" className="animate-pulse" />
                      <text x="50" y="16" fill="#FFFFFF" fontSize="4" textAnchor="middle" fontWeight="bold">ROOT</text>

                      {/* Inner branch level */}
                      <circle cx="25" cy="40" r="4.5" fill="#010106" stroke="#A855F7" strokeWidth="1.2" />
                      <text x="25" y="41" fill="#FFFFFF" fontSize="3.2" textAnchor="middle">LOOP</text>
                      
                      <circle cx="75" cy="40" r="4.5" fill="#010106" stroke={simPhase === 'running' ? '#00E5FF' : '#10B981'} strokeWidth="1.2" />
                      <text x="75" y="41" fill="#FFFFFF" fontSize="3.2" textAnchor="middle">{simPhase === 'running' ? 'COMP' : 'SET'}</text>

                      {/* Leaves Level */}
                      <circle cx="15" cy="70" r="3.5" fill="#010106" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                      <circle cx="38" cy="70" r="3.5" fill="#010106" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                      
                      <circle cx="62" cy="70" r="3.5" fill="#010106" stroke={simPhase === 'running' ? 'rgba(255,255,255,0.2)' : '#10B981'} strokeWidth="0.8" />
                      <circle cx="85" cy="70" r="3.5" fill="#010106" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                    </svg>

                    {/* Volumetric backdrop lighting inside modal */}
                    <div className="absolute w-[80%] h-[80%] rounded-full bg-[#162E93]/8 filter blur-[40px] pointer-events-none z-0" />
                  </div>

                  {/* Summary telemetry */}
                  <div className="border-t border-white/5 pt-3.5 space-y-2 text-left">
                    <div className="flex justify-between text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                      <span>Refactor Score</span>
                      <span className="text-emerald-400 font-bold">Excellent</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                      <span>Diagnostics status</span>
                      <span className="text-cyan-400 font-bold">All tests pass</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Status bar */}
              <div className="bg-slate-950/70 border-t border-white/5 px-6 py-4 flex items-center justify-between select-none">
                <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <Activity size={12} className="text-cyan-400 animate-pulse" />
                  <span>Interactive Compiler Sandbox // Online</span>
                </div>
                <button
                  onClick={() => setDemoActive(false)}
                  className="px-4.5 py-2.5 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 bg-cyan-950/10 text-cyan-400 text-[10px] uppercase font-bold tracking-widest transition-all hover:bg-cyan-500/5"
                >
                  Terminate Simulation
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Keyframe Styles injected directly for Tailwind animated gradient */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

    </div>
  );
}
