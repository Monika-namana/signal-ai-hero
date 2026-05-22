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
  Sliders,
  GraduationCap,
  Code2,
  Award,
  Briefcase,
  Check,
  Database,
  Network,
  Layers,
  ShieldCheck
} from 'lucide-react';// Stylized SVG Partner Logos
const VoxelCloudLogo = () => (
  <div className="flex items-center space-x-2.5 group/logo cursor-pointer text-slate-500 hover:text-cyan-400 transition-colors duration-500">
    <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-3" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3 L28 10 L28 22 L16 29 L4 22 L4 10 Z" />
      <path d="M16 3 L16 15 L28 22" />
      <path d="M16 15 L4 22" />
    </svg>
    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500 group-hover/logo:text-slate-300 transition-colors duration-500">VOXEL CLOUD</span>
  </div>
);

const HelixAILogo = () => (
  <div className="flex items-center space-x-2.5 group/logo cursor-pointer text-slate-500 hover:text-purple-400 transition-colors duration-500">
    <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover/logo:scale-110" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 10 C 10 10, 12 22, 27.5 22" />
      <path d="M4.5 22 C 10 22, 12 10, 27.5 10" />
      <line x1="8" y1="12.5" x2="8" y2="19.5" />
      <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" />
      <line x1="24" y1="19.5" x2="24" y2="12.5" />
    </svg>
    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500 group-hover/logo:text-slate-300 transition-colors duration-500">HELIX AI</span>
  </div>
);

const QuantumLogicLogo = () => (
  <div className="flex items-center space-x-2.5 group/logo cursor-pointer text-slate-500 hover:text-[#4F7CFF] transition-colors duration-500">
    <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="16" r="11" strokeDasharray="3, 3" />
      <circle cx="16" cy="16" r="6" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500 group-hover/logo:text-slate-300 transition-colors duration-500">QUANTUM LOGIC</span>
  </div>
);

const CypherSecLogo = () => (
  <div className="flex items-center space-x-2.5 group/logo cursor-pointer text-slate-500 hover:text-emerald-400 transition-colors duration-500">
    <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover/logo:scale-110" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3 L27 7 L27 15 C27 21.5, 22.5 26.5, 16 29 C9.5 26.5, 5 21.5, 5 15 L5 7 Z" />
      <path d="M16 8 L16 24" />
    </svg>
    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500 group-hover/logo:text-slate-300 transition-colors duration-500">CYPHER SEC</span>
  </div>
);

const VertexCompilersLogo = () => (
  <div className="flex items-center space-x-2.5 group/logo cursor-pointer text-slate-500 hover:text-pink-400 transition-colors duration-500">
    <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-12" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3 L28 24 L4 24 Z" />
      <path d="M16 3 L16 24" />
    </svg>
    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500 group-hover/logo:text-slate-300 transition-colors duration-500">VERTEX COMPILERS</span>
  </div>
);

// --- Custom Tech Stack SVG Icons ---
const ReactIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="16" cy="16" rx="4" ry="11" transform="rotate(30 16 16)" />
    <ellipse cx="16" cy="16" rx="4" ry="11" transform="rotate(90 16 16)" />
    <ellipse cx="16" cy="16" rx="4" ry="11" transform="rotate(150 16 16)" />
    <circle cx="16" cy="16" r="1.8" fill="currentColor" />
  </svg>
);

const PythonIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4 H10 C8 4 7 5 7 8 V13 C7 15 8 16 10 16 H16 V18 C16 20 15 21 13 21 H9" />
    <path d="M16 28 H22 C24 28 25 27 25 24 V19 C25 17 24 16 22 16 H16 V14 C16 12 17 11 19 11 H23" />
    <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
    <circle cx="20.5" cy="24.5" r="1" fill="currentColor" />
  </svg>
);

const NodeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3 L27 9.5 L27 22.5 L16 29 L5 22.5 L5 9.5 Z" />
    <path d="M16 3 L16 16 L27 22.5" />
    <path d="M16 16 L5 22.5" />
    <circle cx="16" cy="9.5" r="1.5" fill="currentColor" />
    <circle cx="21.5" cy="19.25" r="1.5" fill="currentColor" />
    <circle cx="10.5" cy="19.25" r="1.5" fill="currentColor" />
  </svg>
);

const AwsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 21 C 5 21, 4 19.5, 4 17.5 C 4 15, 6 13, 9.5 13 C 9.5 9, 13.5 6.5, 17.5 7.5 C 21 8.5, 23.5 11.5, 23.5 14.5 C 26.5 14.5, 28 16.5, 28 18.5 C 28 20.5, 26 21, 24.5 21 Z" />
    <path d="M10 25 L22 25" strokeWidth="1.5" />
    <path d="M16 21 L16 28" strokeWidth="1.5" strokeDasharray="2, 2" />
  </svg>
);

const DockerIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="15" width="5" height="4" rx="0.5" />
    <rect x="13" y="15" width="5" height="4" rx="0.5" />
    <rect x="19" y="15" width="5" height="4" rx="0.5" />
    <rect x="10" y="10" width="5" height="4" rx="0.5" />
    <rect x="16" y="10" width="5" height="4" rx="0.5" />
    <rect x="13" y="5" width="5" height="4" rx="0.5" />
    <path d="M4 22 H28 C26.5 25, 23 27, 16 27 C9 27, 5.5 25, 4 22 Z" />
  </svg>
);

const MongoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3 C16 3, 23 9, 23 16 C23 22, 19 26, 16 29 C13 26, 9 22, 9 16 C9 9, 16 3, 16 3 Z" />
    <path d="M16 3 L16 29" strokeWidth="1.5" />
    <path d="M12.5 12 C14.5 14, 17.5 14, 19.5 12" />
    <path d="M11 18 C13 20, 19 20, 21 18" />
  </svg>
);

const TailwindIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 7 C7 7, 4 10, 4 15 C6.5 12.5, 9.5 11.5, 13 12 C17 12.5, 19.5 15, 22.5 18 C25.5 21, 28 21, 28 21" />
    <path d="M9.5 17 C6.5 17, 4 19, 4 23.5 C5.5 21.5, 7.5 20.5, 10 21 C13.5 21.5, 15.5 24, 18.5 26.5 C21.5 29, 24.5 27.5, 26.5 25.5" />
  </svg>
);

const AiMlIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="8" cy="16" r="2.5" />
    <circle cx="8" cy="24" r="2.5" />
    <circle cx="16" cy="12" r="2.5" />
    <circle cx="16" cy="20" r="2.5" />
    <circle cx="24" cy="8" r="2.5" />
    <circle cx="24" cy="16" r="2.5" />
    <circle cx="24" cy="24" r="2.5" />
    <line x1="10.5" y1="9" x2="13.5" y2="11" />
    <line x1="10.5" y1="15" x2="13.5" y2="13" />
    <line x1="10.5" y1="17" x2="13.5" y2="19" />
    <line x1="10.5" y1="23" x2="13.5" y2="21" />
    <line x1="18.5" y1="11" x2="21.5" y2="9" />
    <line x1="18.5" y1="13" x2="21.5" y2="15" />
    <line x1="18.5" y1="19" x2="21.5" y2="17" />
    <line x1="18.5" y1="21" x2="21.5" y2="23" />
    <line x1="8" y1="10.5" x2="8" y2="13.5" />
    <line x1="8" y1="18.5" x2="8" y2="21.5" />
    <line x1="24" y1="10.5" x2="24" y2="13.5" />
    <line x1="24" y1="18.5" x2="24" y2="21.5" />
  </svg>
);

const techStack = [
  {
    id: "aws",
    name: "AWS",
    icon: AwsIcon,
    glowColor: "from-orange-500 to-amber-500",
    glowLight: "rgba(249,115,22,0.45)",
    borderColor: "group-hover:border-orange-500/40",
    badgeColor: "text-orange-400 bg-orange-500/10",
    pos: { left: "88%", top: "50%", x: 880, y: 240 },
    stats: "SERVICES // SYNCED",
    status: "PROVISIONED // OK",
    description: "Cloud compilation mesh auto-provisions multi-region edge node networks with zero configuration overhead.",
    floatOffset: [0, -6, 0],
    floatDuration: 6.8,
    floatDelay: 0.1,
  },
  {
    id: "docker",
    name: "Docker",
    icon: DockerIcon,
    glowColor: "from-cyan-500 to-blue-500",
    glowLight: "rgba(6,182,212,0.45)",
    borderColor: "group-hover:border-cyan-500/40",
    badgeColor: "text-cyan-400 bg-cyan-500/10",
    pos: { left: "77%", top: "75%", x: 770, y: 360 },
    stats: "CONTAINER // LOCKED",
    status: "SANDBOX // SECURE",
    description: "Isolates execution pipelines inside lightweight, lightning-fast WASM sandboxes to prevent dependency pollution.",
    floatOffset: [0, 5, 0],
    floatDuration: 7.2,
    floatDelay: 0.4,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: MongoIcon,
    glowColor: "from-emerald-500 to-teal-500",
    glowLight: "rgba(16,185,129,0.45)",
    borderColor: "group-hover:border-emerald-500/40",
    badgeColor: "text-emerald-400 bg-emerald-500/10",
    pos: { left: "50%", top: "86%", x: 500, y: 413 },
    stats: "COLLECTION // ONLINE",
    status: "CLUSTER // ACTIVE",
    description: "Reactive persistence layer streams optimized document-model subtrees with ultra-low cursor latency.",
    floatOffset: [-4, 0, -4],
    floatDuration: 8.0,
    floatDelay: 0.7,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: TailwindIcon,
    glowColor: "from-sky-400 to-cyan-500",
    glowLight: "rgba(56,189,248,0.45)",
    borderColor: "group-hover:border-sky-500/40",
    badgeColor: "text-sky-400 bg-sky-500/10",
    pos: { left: "23%", top: "75%", x: 230, y: 360 },
    stats: "COMPILING // CSS",
    status: "AT-RULES // FLUSHED",
    description: "JIT utility compiler pipes style trees straight into high-performance atomic stylesheets on the fly.",
    floatOffset: [0, -5, 0],
    floatDuration: 6.4,
    floatDelay: 1.0,
  },
  {
    id: "ai-ml",
    name: "AI / ML Core",
    icon: AiMlIcon,
    glowColor: "from-purple-500 to-indigo-500",
    glowLight: "rgba(168,85,247,0.45)",
    borderColor: "group-hover:border-purple-500/40",
    badgeColor: "text-purple-400 bg-purple-500/10",
    pos: { left: "12%", top: "50%", x: 120, y: 240 },
    stats: "SYNAPSE // ACTIVE",
    status: "COGNITIVE // RUNNING",
    description: "Deep learning heuristics parse and restructure source nodes to optimize algorithms for sub-millisecond loads.",
    floatOffset: [0, 6, 0],
    floatDuration: 7.6,
    floatDelay: 1.3,
  },
  {
    id: "react",
    name: "React 19",
    icon: ReactIcon,
    glowColor: "from-cyan-400 to-blue-600",
    glowLight: "rgba(34,211,238,0.45)",
    borderColor: "group-hover:border-cyan-400/40",
    badgeColor: "text-cyan-400 bg-cyan-500/10",
    pos: { left: "23%", top: "25%", x: 230, y: 120 },
    stats: "VIRTUAL_DOM // ACTIVE",
    status: "FIBER_TREE // PARSED",
    description: "Sleek frontend compiler transforms reactive component declarations into lightning-fast server-rendered binaries.",
    floatOffset: [0, -7, 0],
    floatDuration: 6.0,
    floatDelay: 1.6,
  },
  {
    id: "python",
    name: "Python Core",
    icon: PythonIcon,
    glowColor: "from-yellow-500 to-cyan-500",
    glowLight: "rgba(234,179,8,0.45)",
    borderColor: "group-hover:border-yellow-500/40",
    badgeColor: "text-yellow-400 bg-yellow-500/10",
    pos: { left: "50%", top: "14%", x: 500, y: 67 },
    stats: "AST_COMPLEXITY // MIN",
    status: "PY_BYTECODE // GEN",
    description: "Cognitive refactoring subagents translate resource-heavy loops into hyper-optimized set queries.",
    floatOffset: [4, 0, 4],
    floatDuration: 8.4,
    floatDelay: 1.9,
  },
  {
    id: "node",
    name: "Node.js ESM",
    icon: NodeIcon,
    glowColor: "from-green-500 to-emerald-500",
    glowLight: "rgba(34,197,94,0.45)",
    borderColor: "group-hover:border-green-500/40",
    badgeColor: "text-green-400 bg-green-500/10",
    pos: { left: "77%", top: "25%", x: 770, y: 120 },
    stats: "V8_RUNTIME // ENGAGED",
    status: "EVENT_LOOP // STABLE",
    description: "Asynchronous I/O compiler engine pipelines database queries and network logs in high-frequency streams.",
    floatOffset: [0, 7, 0],
    floatDuration: 7.0,
    floatDelay: 2.2,
  }
];

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Compiler Engineer @ Helix AI",
    avatar: "AR",
    glowColor: "from-cyan-400 to-blue-600",
    avatarGlow: "border-cyan-500/30 text-cyan-400 bg-cyan-500/5",
    quote: "Signal AI's cognitive AST parsing engine completely re-wired how I think about compiler targets. In under 3 months, I built a sub-millisecond JIT compiler sandbox that secured my placement.",
    placement: "✓ 100% SALARY INCREMENT // PLACED",
    telemetry: "VERIFIED_COMPILATION // HASH_9F3E",
    stats: "LATENCY: 0.08ms // VIRTUAL_DOM",
    floatOffset: [0, -6, 0],
    duration: 6.5,
    delay: 0,
  },
  {
    id: 2,
    name: "Li Wei",
    role: "Autonomous Agent Researcher @ Voxel Cloud",
    avatar: "LW",
    glowColor: "from-purple-500 to-pink-500",
    avatarGlow: "border-purple-500/30 text-purple-400 bg-purple-500/5",
    quote: "The multi-agent orchestration grid taught me how to pipeline cognitive subagents for scalable cloud models. The AST loop refactoring tools helped me resolve memory leaks in O(N²) iterations.",
    placement: "✓ PLACED IN 12 DAYS // v2.4",
    telemetry: "ORCHESTRATION_OK // ACTIVE",
    stats: "COGNITIVE_CORES: 8/8 READY",
    floatOffset: [0, 6, 0],
    duration: 7.2,
    delay: 0.2,
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Senior WASM Architect @ Cypher Sec",
    avatar: "ER",
    glowColor: "from-emerald-400 to-teal-600",
    avatarGlow: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    quote: "Building WASM-targeted compiling sandboxes on top of AWS and Docker gave me concrete, production-ready portfolio systems. My hiring manager was stunned by the latency profiles I achieved.",
    placement: "✓ 240% PIPELINE VELOCITY // PRO",
    telemetry: "WASM_TARGETING // DEPLOYED",
    stats: "SANDBOX: ACTIVE // 12ms",
    floatOffset: [0, -5, 0],
    duration: 6.8,
    delay: 0.4,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] }
  }
};

export default function App() {
  const [demoActive, setDemoActive] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [hoveredQuote, setHoveredQuote] = useState(null);
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
          <a href="#tech" className="hover:text-white transition-colors relative group py-1">
            <span>Tech Stack</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
          </a>
          <a href="#compiler" className="hover:text-white transition-colors relative group py-1">
            <span>Playground</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
          </a>
          <a href="#pricing" className="hover:text-white transition-colors relative group py-1">
            <span>Pricing</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all group-hover:w-full" />
          </a>
          <a href="#testimonials" className="hover:text-white transition-colors relative group py-1">
            <span>Triumphs</span>
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
            <button className="relative group px-9 py-4 rounded-xl overflow-hidden font-bold font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 active:scale-[0.98] text-center shadow-[0_8px_35px_rgba(34,211,238,0.18)]">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#162E93] via-cyan-500 to-[#4F7CFF] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] group-hover:scale-105 transition-transform" />
              <span className="relative text-white flex items-center justify-center space-x-2">
                <span>Start Building Free</span>
                <Sparkles size={14} className="animate-pulse" />
              </span>
            </button>

            <button 
              onClick={() => setDemoActive(true)}
              className="px-9 py-4 rounded-xl font-bold font-mono text-[10px] tracking-[0.2em] uppercase bg-white/4 hover:bg-white/8 border border-white/5 hover:border-cyan-500/20 transition-all text-slate-200 flex items-center justify-center space-x-2 group active:scale-[0.98]"
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
            id="compiler"
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

      {/* Laser scanline divider above section */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent relative z-20" />

      {/* Futuristic Social Proof & Statistics Section */}
      <section className="py-28 md:py-40 relative bg-slate-950/10 w-full overflow-visible z-20">
        
        {/* Volumetric backdrop lighting inside the section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[65%] rounded-full bg-cyan-950/10 opacity-30 filter blur-[130px] pointer-events-none z-0 animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/4 w-[35%] h-[35%] rounded-full bg-purple-950/5 opacity-30 filter blur-[110px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '-3s' }} />

        {/* Section Heading with animation */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-20 px-6 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-cyan-400 font-bold">
              Trusted Network // Growth Analytics
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white font-display leading-[1.15] mb-4">
            Empowering The Next Era of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#4F7CFF] to-purple-400 text-glow font-bold">
              Software Engineering
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
            Signal AI fuels intelligence inside elite workflows. Our developer ecosystem bridges raw syntactic logic with blazing fast, high-performance compiler runtimes.
          </p>
        </motion.div>

        {/* Partner Logos Glass Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="max-w-6xl mx-auto px-6 mb-24 relative z-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-y-8 gap-x-12 md:gap-x-16 lg:gap-x-20 py-8 border-y border-white/5 bg-slate-950/20 backdrop-blur-md rounded-2xl px-8 select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
            <VoxelCloudLogo />
            <HelixAILogo />
            <QuantumLogicLogo />
            <CypherSecLogo />
            <VertexCompilersLogo />
          </div>
        </motion.div>

        {/* Milestone Statistics Cards Container */}
        <div className="max-w-6xl mx-auto px-6 relative">
          
          {/* Subtle Neural Connection Channels (visible on desktop only) */}
          <svg className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full h-32 pointer-events-none z-0 hidden lg:block overflow-visible" viewBox="0 0 1000 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="neuralGradPath" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
                <stop offset="20%" stopColor="#22D3EE" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#A855F7" stopOpacity="0.12" />
                <stop offset="80%" stopColor="#10B981" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Elegant wavy sine-wave background conduits */}
            <path d="M 50 60 C 200 15, 300 105, 500 60 C 700 15, 800 105, 950 60" fill="none" stroke="url(#neuralGradPath)" strokeWidth="0.8" />
            <path d="M 50 60 C 200 105, 300 15, 500 60 C 700 105, 800 15, 950 60" fill="none" stroke="url(#neuralGradPath)" strokeWidth="0.8" strokeDasharray="3,3" />

            {/* Glowing Wasm compiler spark packets using animate-signal-flow */}
            <path 
              d="M 50 60 C 200 15, 300 105, 500 60 C 700 15, 800 105, 950 60" 
              fill="none" 
              stroke="#22D3EE" 
              strokeWidth="1.2" 
              strokeLinecap="round"
              className="animate-signal-flow"
              style={{ animationDuration: '6s', strokeDasharray: '15, 220' }}
            />
            <path 
              d="M 50 60 C 200 105, 300 15, 500 60 C 700 105, 800 15, 950 60" 
              fill="none" 
              stroke="#A855F7" 
              strokeWidth="1.2" 
              strokeLinecap="round"
              className="animate-signal-flow"
              style={{ animationDuration: '7.5s', strokeDasharray: '15, 220', animationDelay: '1.8s' }}
            />
          </svg>

          {/* Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10"
          >
            
            {/* Card 1: 50K+ Active Students */}
            <motion.div variants={itemVariants} className="w-full flex">
              <FloatingGlassCard
                glowColor="cyan"
                yOffset={[0, -4, 0]}
                xOffset={[0, 1, 0]}
                rotateOffset={[0, 0.3, 0]}
                duration={6}
                delay={0}
                className="w-full"
              >
                <div className="flex flex-col h-full justify-between space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                      <GraduationCap size={16} className="text-cyan-400" />
                    </div>
                    <span className="text-[7.5px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
                      ALUMNI
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-display text-4xl sm:text-[38px] font-bold text-white leading-none tracking-tight select-none">
                      50K<span className="text-cyan-400 font-medium">+</span>
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 tracking-wide select-none">
                      Active Students
                    </p>
                    <p className="text-[9px] font-medium text-slate-500 leading-snug font-sans select-none">
                      Logged active AST sandbox compilations globally.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3.5 text-[8px] font-mono text-slate-500 select-none">
                    <span>SYNAPTIC CORE</span>
                    <span className="text-cyan-400 animate-pulse flex items-center space-x-1 font-bold">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      <span>ONLINE</span>
                    </span>
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

            {/* Card 2: 10K+ Projects Built */}
            <motion.div variants={itemVariants} className="w-full flex">
              <FloatingGlassCard
                glowColor="blue"
                yOffset={[0, 4, 0]}
                xOffset={[0, -1, 0]}
                rotateOffset={[0, -0.3, 0]}
                duration={6.8}
                delay={0.4}
                className="w-full"
              >
                <div className="flex flex-col h-full justify-between space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#4F7CFF]/10 border border-[#4F7CFF]/20 flex items-center justify-center shadow-[0_0_10px_rgba(79,124,255,0.15)]">
                      <Code2 size={16} className="text-[#4F7CFF]" />
                    </div>
                    <span className="text-[7.5px] font-mono text-[#4F7CFF] font-bold bg-[#4F7CFF]/10 px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
                      COMPILE
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-display text-4xl sm:text-[38px] font-bold text-white leading-none tracking-tight select-none">
                      10K<span className="text-[#4F7CFF] font-medium">+</span>
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 tracking-wide select-none">
                      Projects Built
                    </p>
                    <p className="text-[9px] font-medium text-slate-500 leading-snug font-sans select-none">
                      Production WASM bundles deployed under sandbox engines.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3.5 text-[8px] font-mono text-slate-500 select-none">
                    <span>WASM SANDBOX</span>
                    <span className="text-[#4F7CFF] flex items-center space-x-1 font-bold">
                      <span className="w-1 h-1 rounded-full bg-[#4F7CFF]" />
                      <span>STEADY</span>
                    </span>
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

            {/* Card 3: 95% Placement Rate */}
            <motion.div variants={itemVariants} className="w-full flex">
              <FloatingGlassCard
                glowColor="emerald"
                yOffset={[0, -4, 0]}
                xOffset={[0, 1, 0]}
                rotateOffset={[0, 0.3, 0]}
                duration={6.2}
                delay={0.8}
                className="w-full"
              >
                <div className="flex flex-col h-full justify-between space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                      <Award size={16} className="text-emerald-400" />
                    </div>
                    <span className="text-[7.5px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
                      SUCCESS
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-display text-4xl sm:text-[38px] font-bold text-white leading-none tracking-tight select-none">
                      95<span className="text-emerald-400 font-medium">%</span>
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 tracking-wide select-none">
                      Placement Rate
                    </p>
                    <p className="text-[9px] font-medium text-slate-500 leading-snug font-sans select-none">
                      Graduates launched straight into elite high-tier engineering labs.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3.5 text-[8px] font-mono text-slate-500 select-none">
                    <span>PLACEMENT LOGS</span>
                    <span className="text-emerald-400 flex items-center space-x-1 font-bold text-glow">
                      <span>95.4% MATCH</span>
                    </span>
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

            {/* Card 4: 120+ Hiring Partners */}
            <motion.div variants={itemVariants} className="w-full flex">
              <FloatingGlassCard
                glowColor="purple"
                yOffset={[0, 4, 0]}
                xOffset={[0, -1, 0]}
                rotateOffset={[0, -0.3, 0]}
                duration={7}
                delay={1.2}
                className="w-full"
              >
                <div className="flex flex-col h-full justify-between space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                      <Briefcase size={16} className="text-purple-400" />
                    </div>
                    <span className="text-[7.5px] font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
                      NETWORKS
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-display text-4xl sm:text-[38px] font-bold text-white leading-none tracking-tight select-none">
                      120<span className="text-purple-400 font-medium">+</span>
                    </h3>
                    <p className="text-xs font-semibold text-slate-300 tracking-wide select-none">
                      Hiring Partners
                    </p>
                    <p className="text-[9px] font-medium text-slate-500 leading-snug font-sans select-none">
                      Collaborating corporate systems hiring AST pipeline architects.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3.5 text-[8px] font-mono text-slate-500 select-none">
                    <span>PARTNER SYNC</span>
                    <span className="text-purple-400 flex items-center space-x-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                      <span>CONNECTED</span>
                    </span>
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

          </motion.div>
        </div>

      </section>

      {/* Laser scanline divider below section */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent relative z-20" />

      {/* Futuristic "How It Works" Section */}
      <section id="workflow" className="py-28 md:py-40 relative bg-[#010106]/40 w-full overflow-visible z-20">
        
        {/* Volumetric backdrop atmospheric light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] rounded-full bg-cyan-950/10 opacity-30 filter blur-[140px] pointer-events-none z-0 animate-pulse-slow" />
        
        {/* Step Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-24 px-6 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-cyan-400 font-bold">
              Autonomous Protocol // Pipeline
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white font-display leading-[1.15] mb-4">
            How Signal AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#4F7CFF] to-purple-400 text-glow font-bold">
              Refactors Code
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
            Watch our three-stage cognitive architecture parse syntax graphs, compile subtrees, and deploy high-performance optimized runtimes.
          </p>
        </motion.div>

        {/* 3-Step Workflow Container */}
        <div className="max-w-6xl mx-auto px-6 relative">
          
          {/* Sweeping Connected SVG Signal Paths */}
          <svg className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full h-32 pointer-events-none z-0 hidden lg:block overflow-visible" viewBox="0 0 1000 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity={hoveredStep === 1 ? 0.35 : 0.12} />
                <stop offset="50%" stopColor="#A855F7" stopOpacity={hoveredStep === 2 ? 0.35 : 0.12} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={hoveredStep === 3 ? 0.35 : 0.12} />
              </linearGradient>
            </defs>

            {/* Wavy Connected Tracks */}
            <path d="M 100 60 C 250 20, 350 100, 500 60 C 650 20, 750 100, 900 60" fill="none" stroke="url(#flowGrad)" strokeWidth="0.8" />
            <path d="M 100 60 C 250 100, 350 20, 500 60 C 650 100, 750 20, 900 60" fill="none" stroke="url(#flowGrad)" strokeWidth="0.8" strokeDasharray="3, 3" />

            {/* Glowing flowing pulse packets (speeds up dynamically on card hover) */}
            <path 
              d="M 100 60 C 250 20, 350 100, 500 60 C 650 20, 750 100, 900 60" 
              fill="none" 
              stroke="#22D3EE" 
              strokeWidth="1.2" 
              strokeLinecap="round"
              className="animate-signal-flow"
              style={{ 
                animationDuration: hoveredStep === 1 ? '1.8s' : '5s', 
                strokeDasharray: '12, 180',
                filter: hoveredStep === 1 ? 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.8))' : 'none'
              }}
            />
            
            <path 
              d="M 100 60 C 250 100, 350 20, 500 60 C 650 100, 750 20, 900 60" 
              fill="none" 
              stroke="#A855F7" 
              strokeWidth="1.2" 
              strokeLinecap="round"
              className="animate-signal-flow"
              style={{ 
                animationDuration: hoveredStep === 2 ? '2.0s' : '6s', 
                strokeDasharray: '12, 180', 
                animationDelay: '1.2s',
                filter: hoveredStep === 2 ? 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.8))' : 'none'
              }}
            />

            <path 
              d="M 100 60 C 250 20, 350 100, 500 60 C 650 20, 750 100, 900 60" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="1.2" 
              strokeLinecap="round"
              className="animate-signal-flow"
              style={{ 
                animationDuration: hoveredStep === 3 ? '1.8s' : '5.5s', 
                strokeDasharray: '12, 180', 
                animationDelay: '2.5s',
                filter: hoveredStep === 3 ? 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.8))' : 'none'
              }}
            />
          </svg>

          {/* Steps Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10"
          >
            
            {/* Step 1: Learn */}
            <motion.div 
              variants={itemVariants}
              className="w-full flex"
              onMouseEnter={() => setHoveredStep(1)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <FloatingGlassCard
                glowColor="cyan"
                yOffset={[0, -5, 0]}
                xOffset={[0, 1, 0]}
                rotateOffset={[0, 0.4, 0]}
                duration={6}
                delay={0}
                className={`w-full transition-all duration-300 ${hoveredStep === 1 ? 'border-cyan-500/30 shadow-[0_15px_45px_rgba(6,182,212,0.18)]' : ''}`}
              >
                <div className="flex flex-col space-y-6">
                  {/* Top Row with visual badge and icon */}
                  <div className="flex items-center justify-between select-none">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                      <Sliders size={18} className="text-cyan-400 animate-pulse" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.8 rounded-full uppercase tracking-wider">
                      Step 01 // LEARN
                    </span>
                  </div>

                  {/* Title and Descriptions */}
                  <div className="space-y-2 text-left select-none">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-display">
                      Ingest & Analyze
                    </h3>
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest leading-none font-semibold">
                      Semantic AST Parsing
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                      Signal AI parses your raw codebase in real time, building an Abstract Syntax Tree to chart recursive pathways and detect loop bottlenecks.
                    </p>
                  </div>

                  {/* Interactive parsed tree hologram widget */}
                  <div className="h-28 w-full bg-slate-950/80 rounded-lg border border-white/5 relative p-3 overflow-hidden font-mono text-[9px] text-slate-500">
                    <div className="space-y-1 select-none pointer-events-none relative z-10 text-left">
                      <div className="flex items-center justify-between text-[7px] border-b border-white/5 pb-1 mb-2 text-cyan-400 font-bold uppercase">
                        <span>AST_INGESTION.LOG</span>
                        <span className="animate-pulse">PARSING...</span>
                      </div>
                      <div className="text-cyan-400/80 font-bold">&gt; const ast = parser.parse(source);</div>
                      <div className="text-slate-600 pl-2">├── [Program]</div>
                      <div className="text-slate-600 pl-4 flex items-center space-x-1">
                        <span>├── [FunctionDeclaration]</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      </div>
                      <div className="text-slate-600 pl-6 text-[8px] text-purple-400/60 font-semibold">└── complexity: O(N²) DETECTED</div>
                      <div className="text-slate-700 pl-6">└── [BinaryExpression]</div>
                    </div>
                    <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                  </div>

                  {/* Telemetry bottom bar */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5 text-[8px] font-mono text-slate-500 select-none">
                    <span>PARSER STATUS</span>
                    <span className="text-cyan-400 flex items-center space-x-1 font-bold">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                      <span>AST READY</span>
                    </span>
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

            {/* Step 2: Build */}
            <motion.div 
              variants={itemVariants}
              className="w-full flex"
              onMouseEnter={() => setHoveredStep(2)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <FloatingGlassCard
                glowColor="purple"
                yOffset={[0, 5, 0]}
                xOffset={[0, -1, 0]}
                rotateOffset={[0, -0.4, 0]}
                duration={6.8}
                delay={0.3}
                className={`w-full transition-all duration-300 ${hoveredStep === 2 ? 'border-purple-500/30 shadow-[0_15px_45px_rgba(168,85,247,0.18)]' : ''}`}
              >
                <div className="flex flex-col space-y-6">
                  {/* Top Row */}
                  <div className="flex items-center justify-between select-none">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                      <TermIcon size={18} className="text-purple-400" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.8 rounded-full uppercase tracking-wider">
                      Step 02 // BUILD
                    </span>
                  </div>

                  {/* Title and Descriptions */}
                  <div className="space-y-2 text-left select-none">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-display">
                      Cognitive Refactor
                    </h3>
                    <p className="text-[10px] font-mono text-purple-400 uppercase tracking-widest leading-none font-semibold">
                      Subagent Optimization
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                      Our autonomous AI subagents execute safe, parallel logic refactorings inside local AST branches, transforming quadratic runtimes to linear models.
                    </p>
                  </div>

                  {/* Side-by-side refactoring diff widget */}
                  <div className="h-28 w-full bg-slate-950/80 rounded-lg border border-white/5 relative p-3 overflow-hidden font-mono text-[8px] text-slate-500">
                    <div className="flex items-center justify-between text-[7px] border-b border-white/5 pb-1 mb-2 text-purple-400 font-bold uppercase">
                      <span>SUBTREE_OPTIMIZER.SYS</span>
                      <span className="text-emerald-400 animate-pulse">REFACTORED</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-full select-none pointer-events-none text-left">
                      <div className="border border-red-500/10 bg-red-500/3 rounded p-1.5 relative overflow-hidden">
                        <div className="absolute top-1 right-1 text-[5px] font-bold text-red-500/60 uppercase">O(N²) Loop</div>
                        <div className="text-red-400/80 font-semibold mb-0.5">find_duplicates:</div>
                        <div className="text-slate-600 pl-1">for i in list:</div>
                        <div className="text-slate-600 pl-2">for j in list:</div>
                        <div className="text-red-500/50 line-through pl-3">if i == j:</div>
                        <div className="absolute inset-0 bg-radial-[circle,rgba(239,68,68,0.05)_0%,transparent_100%]" />
                      </div>
                      <div className="border border-emerald-500/10 bg-emerald-500/3 rounded p-1.5 relative overflow-hidden">
                        <div className="absolute top-1 right-1 text-[5px] font-bold text-emerald-500/60 uppercase">O(N) Hash</div>
                        <div className="text-emerald-400/80 font-semibold mb-0.5">dup_fast:</div>
                        <div className="text-emerald-500/70 pl-1">seen = set()</div>
                        <div className="text-emerald-500/70 pl-1">for i in list:</div>
                        <div className="text-emerald-400 pl-2">if i in seen:</div>
                        <div className="absolute inset-0 bg-radial-[circle,rgba(16,185,129,0.05)_0%,transparent_100%]" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                  </div>

                  {/* Telemetry bottom bar */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5 text-[8px] font-mono text-slate-500 select-none">
                    <span>OPTIMIZATION SYNC</span>
                    <span className="text-purple-400 flex items-center space-x-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded bg-purple-500/20 border border-purple-500/40 text-[6px] flex items-center justify-center font-bold px-0.5">L2</span>
                      <span>SYNC ACTIVE</span>
                    </span>
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

            {/* Step 3: Deploy */}
            <motion.div 
              variants={itemVariants}
              className="w-full flex"
              onMouseEnter={() => setHoveredStep(3)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <FloatingGlassCard
                glowColor="emerald"
                yOffset={[0, -5, 0]}
                xOffset={[0, 1, 0]}
                rotateOffset={[0, 0.4, 0]}
                duration={6.2}
                delay={0.6}
                className={`w-full transition-all duration-300 ${hoveredStep === 3 ? 'border-emerald-500/30 shadow-[0_15px_45px_rgba(16,185,129,0.18)]' : ''}`}
              >
                <div className="flex flex-col space-y-6">
                  {/* Top Row */}
                  <div className="flex items-center justify-between select-none">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                      <Zap size={18} className="text-emerald-400" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.8 rounded-full uppercase tracking-wider">
                      Step 03 // DEPLOY
                    </span>
                  </div>

                  {/* Title and Descriptions */}
                  <div className="space-y-2 text-left select-none">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-display">
                      WASM Targeting
                    </h3>
                    <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest leading-none font-semibold">
                      Sub-Millisecond Deploy
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                      Compiles optimized subtrees instantly to target WebAssembly binaries, enabling hyper-secure, blazing fast execution sandboxes in the cloud.
                    </p>
                  </div>

                  {/* Hexagon rotating compiler core hologram */}
                  <div className="h-28 w-full bg-slate-950/80 rounded-lg border border-white/5 relative p-3 overflow-hidden font-mono text-[9px] text-slate-500">
                    <div className="flex items-center justify-between text-[7px] border-b border-white/5 pb-1 mb-2 text-emerald-400 font-bold uppercase">
                      <span>WASM_JIT_COMPILER.IO</span>
                      <span className="text-cyan-400 animate-pulse">DEPLOYED</span>
                    </div>
                    <div className="flex items-center justify-between h-14 select-none pointer-events-none relative z-10 px-2 text-left">
                      <div className="relative flex items-center justify-center w-10 h-10">
                        <motion.svg 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          className="w-10 h-10 text-emerald-400/30" 
                          viewBox="0 0 32 32"
                        >
                          <path d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3, 3" />
                        </motion.svg>
                        <div className="absolute text-[8px] font-bold text-emerald-300">WASM</div>
                      </div>
                      <div className="text-[7.5px] text-slate-500 space-y-0.5 text-right font-mono">
                        <p className="text-emerald-400 font-bold font-mono">✓ CHECKSUM: PASS</p>
                        <p>SIZE: 12.4 KB</p>
                        <p className="text-cyan-400 font-bold font-mono">LATENCY: 12ms</p>
                        <p>SANDBOX: ACTIVE</p>
                      </div>
                    </div>
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                  </div>

                  {/* Telemetry bottom bar */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3.5 text-[8px] font-mono text-slate-500 select-none">
                    <span>DEPLOYED TARGET</span>
                    <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>COMPILATION OK</span>
                    </span>
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

          </motion.div>
        </div>

      </section>

      {/* Laser scanline divider below workflow section */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent relative z-20" />

      {/* Futuristic Tech Stack Section */}
      <section id="tech" className="py-28 md:py-40 relative w-full overflow-hidden z-20 border-t border-b border-white/[0.02]">
        
        {/* Atmospheric Cosmic Backdrop Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60%] h-[40%] rounded-full bg-cyan-950/10 opacity-40 filter blur-[140px] pointer-events-none z-0 animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-[30%] h-[30%] rounded-full bg-purple-950/10 opacity-30 filter blur-[120px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '-5s' }} />
        
        {/* Background Grid Pattern inside the section */}
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16 px-6 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-cyan-400 font-bold">
              DEVELOPER ECOSYSTEM // SYNAPSES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white font-display leading-[1.15] mb-4">
            Futuristic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#4F7CFF] to-purple-400 text-glow font-bold">
              Tech Stack
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
            Signal AI integrates seamlessly with the industry’s most powerful platforms, compiling and restructuring complex code patterns dynamically in real time.
          </p>
        </motion.div>

        {/* Outer container */}
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* MOBILE ONLY REFLOW LIST */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden"
          >
            {techStack.map((tech) => {
              const IconComp = tech.icon;
              return (
                <motion.div 
                  variants={itemVariants}
                  key={tech.id}
                  className="relative p-5 rounded-2xl glass border-white/5 bg-slate-950/40 text-left overflow-hidden group transition-all duration-300 hover:border-cyan-500/20 shadow-lg"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-transparent filter blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 group-hover:text-cyan-400 transition-colors shadow-inner">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white tracking-wide uppercase text-sm sm:text-base">
                          {tech.name}
                        </h4>
                        <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${tech.badgeColor} border border-white/5 uppercase tracking-wider`}>
                          Active
                        </span>
                      </div>
                      <p className="font-mono text-[9px] text-slate-500 font-medium">
                        {tech.stats}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 mt-4 leading-relaxed font-sans font-medium">
                    {tech.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* DESKTOP SPATIAL ORBITAL MAP */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="hidden md:block relative w-full h-[540px] select-none"
          >
            
            {/* Background SVG Grid and Connections */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0" 
              viewBox="0 0 1000 480" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {techStack.map((tech) => (
                  <linearGradient 
                    key={`gradient-${tech.id}`} 
                    id={`grad-${tech.id}`} 
                    x1="0%" y1="0%" x2="100%" y2="100%"
                  >
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                  </linearGradient>
                ))}
                
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Orbital Rings / Tracks (Ellipses matching card layout) */}
              <ellipse 
                cx="500" cy="240" rx="380" ry="180" 
                fill="none" 
                stroke="rgba(255,255,255,0.03)" 
                strokeWidth="1.5" 
                strokeDasharray="4, 12"
              />
              <ellipse 
                cx="500" cy="240" rx="270" ry="120" 
                fill="none" 
                stroke="rgba(255,255,255,0.02)" 
                strokeWidth="1.5" 
                strokeDasharray="3, 8"
              />
              <ellipse 
                cx="500" cy="240" rx="120" ry="70" 
                fill="none" 
                stroke="rgba(6,182,212,0.05)" 
                strokeWidth="1" 
                strokeDasharray="2, 6"
              />

              {/* Laser scanning rings radiating outwards */}
              <motion.ellipse
                cx="500" cy="240"
                initial={{ rx: 30, ry: 15, opacity: 0 }}
                animate={{ rx: [30, 480], ry: [15, 220], opacity: [0, 0.2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeOut" }}
                fill="none"
                stroke="rgba(6,182,212,0.2)"
                strokeWidth="1"
              />

              {/* Reactive Connected Neural Paths from core (500,240) to cards */}
              {techStack.map((tech) => {
                const isActive = hoveredTech === tech.id;
                
                return (
                  <g key={`path-group-${tech.id}`}>
                    {/* Underlying glow path */}
                    <path
                      d={`M 500 240 Q 500 ${tech.pos.y} ${tech.pos.x} ${tech.pos.y}`}
                      fill="none"
                      stroke={isActive ? `url(#grad-${tech.id})` : "rgba(255,255,255,0.04)"}
                      strokeWidth={isActive ? "2.5" : "1.2"}
                      className="transition-all duration-500"
                      filter={isActive ? "url(#glow)" : ""}
                    />
                    
                    {/* Glowing Spark Packets running on the path */}
                    <path
                      d={`M 500 240 Q 500 ${tech.pos.y} ${tech.pos.x} ${tech.pos.y}`}
                      fill="none"
                      stroke={isActive ? "#38bdf8" : "rgba(255,255,255,0.15)"}
                      strokeWidth={isActive ? "3" : "1.5"}
                      strokeLinecap="round"
                      strokeDasharray="8, 92"
                      style={{ filter: "drop-shadow(0 0 5px rgba(56, 189, 248, 0.8))" }}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="100;0"
                        dur={isActive ? "1.5s" : "4.5s"}
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                );
              })}
            </svg>

            {/* Central Compiler Reactor holographic console */}
            <motion.div 
              variants={itemVariants}
              className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-20 flex items-center justify-center"
            >
              
              {/* Rotating outer neon border loops */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/10 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-double border-purple-500/5 pointer-events-none"
              />

              {/* Reactor center glow halo */}
              <div className={`absolute w-44 h-44 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 filter blur-xl transition-all duration-500 ${hoveredTech ? 'scale-125 opacity-70' : 'opacity-40'}`} />

              {/* Actual Holographic Glass Terminal Core */}
              <div className={`relative w-[210px] h-[210px] rounded-3xl glass border-white/5 bg-slate-950/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col p-4 text-left font-mono transition-all duration-500 ${hoveredTech ? 'border-cyan-500/20 shadow-[0_0_35px_rgba(6,182,212,0.15)] scale-105' : ''}`}>
                
                {/* Micro Scanlines */}
                <div className="absolute inset-0 scanline-glow opacity-30 pointer-events-none z-10" />

                {/* Console header */}
                <div className="flex items-center justify-between text-[7px] border-b border-white/5 pb-1.5 mb-2 font-bold text-slate-500 uppercase">
                  <span>COMPILER_CORE // JIT</span>
                  <span className={`flex items-center space-x-1 transition-colors duration-300 ${hoveredTech ? 'text-cyan-400' : 'text-slate-500 animate-pulse'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${hoveredTech ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
                    <span>{hoveredTech ? 'CONNECTED' : 'IDLE'}</span>
                  </span>
                </div>

                {/* Console Main Details Frame */}
                {hoveredTech ? (() => {
                  const activeTech = techStack.find(t => t.id === hoveredTech);
                  return (
                    <div className="flex-1 flex flex-col justify-between text-[9px] relative z-10">
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-cyan-400 font-bold">&gt;</span>
                          <span className="text-white font-bold text-[10px] tracking-wide uppercase">{activeTech.name}</span>
                        </div>
                        <div className="text-[7.5px] text-slate-400 font-medium space-y-0.5">
                          <p className="text-cyan-400/90 font-bold">{activeTech.stats}</p>
                          <p className="text-purple-400/90 font-semibold">{activeTech.status}</p>
                          <p className="text-[7px] text-slate-500 font-mono">
                            JIT_MEM: 0x7FFA{Math.floor(Date.now() / 2000) % 9999 + 1000} // L2_CACHE
                          </p>
                        </div>
                      </div>
                      
                      {/* Live compilation log simulation */}
                      <p className="text-[8px] text-slate-400 leading-relaxed font-sans font-medium line-clamp-3 border-t border-white/5 pt-2">
                        {activeTech.description}
                      </p>
                    </div>
                  );
                })() : (
                  <div className="flex-1 flex flex-col justify-between text-[9px] relative z-10">
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-slate-500">&gt;</span>
                        <span className="text-slate-400 font-bold tracking-wide uppercase">SIGNAL SYSTEM</span>
                      </div>
                      <div className="text-[7.5px] text-slate-500 space-y-0.5 font-mono">
                        <p>CORES: 8/8 STATE_OK</p>
                        <p>STAGE: OPTIMIZER_L2</p>
                        <p className="animate-pulse text-cyan-400/50">WAITING FOR HANDSHAKE...</p>
                      </div>
                    </div>

                    <p className="text-[8px] text-slate-500 leading-relaxed font-sans font-semibold border-t border-white/5 pt-2">
                      Hover over any orbital developer module to connect compiler synapses and stream real-time compilation metrics.
                    </p>
                  </div>
                )}
                
                {/* Laser scanline overlay */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none z-10"
                />
              </div>
            </motion.div>

            {/* Orbiting Tech Cards */}
            {techStack.map((tech) => {
              const IconComp = tech.icon;
              const isActive = hoveredTech === tech.id;
              
              return (
                <motion.div
                  key={tech.id}
                  variants={itemVariants}
                  style={{
                    position: 'absolute',
                    left: tech.pos.left,
                    top: tech.pos.top,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="z-30"
                >
                  <motion.div
                    onMouseEnter={() => setHoveredTech(tech.id)}
                    onMouseLeave={() => setHoveredTech(null)}
                    animate={{
                      y: tech.floatOffset,
                      x: [0, tech.floatOffset[1]/2, 0],
                    }}
                    transition={{
                      y: {
                        duration: tech.floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: tech.floatDelay,
                      },
                      x: {
                        duration: tech.floatDuration * 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: tech.floatDelay,
                      }
                    }}
                    className="cursor-pointer group"
                  >
                    <div className={`relative px-5 py-4 w-48 rounded-2xl glass bg-slate-950/80 border-white/5 transition-all duration-500 text-left ${isActive ? 'border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.12)] scale-105 -translate-y-2' : 'hover:-translate-y-1'}`}>
                      
                      {/* Holographic corner accents */}
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/10 group-hover:border-cyan-400/30 transition-colors rounded-tl-md" />
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/10 group-hover:border-cyan-400/30 transition-colors rounded-tr-md" />
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/10 group-hover:border-cyan-400/30 transition-colors rounded-bl-md" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/10 group-hover:border-cyan-400/30 transition-colors rounded-br-md" />
                      
                      {/* Glowing highlight sphere inside the card */}
                      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${tech.glowColor} filter blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full pointer-events-none`} />

                      {/* Logo & Name */}
                      <div className="flex items-center space-x-3.5">
                        <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:bg-cyan-500/5 group-hover:border-cyan-500/20 text-slate-400 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`}>
                          <IconComp className="w-5.5 h-5.5" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-white tracking-wide uppercase text-xs">
                            {tech.name}
                          </h4>
                          <span className={`text-[7px] font-mono font-bold px-1.5 py-0.2 bg-white/5 text-slate-500 uppercase tracking-widest rounded-full ${isActive ? 'text-cyan-400/80 bg-cyan-400/5' : ''} transition-colors duration-300`}>
                            STABLE
                          </span>
                        </div>
                      </div>
                      
                      {/* Miniature stats telemetry under logo */}
                      <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-between text-[7px] font-mono text-slate-500 select-none">
                        <span>MODULE OK</span>
                        <span className={`transition-colors duration-300 ${isActive ? 'text-cyan-400 font-bold' : ''}`}>
                          {isActive ? 'STREAMING' : 'IDLE'}
                        </span>
                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

          </motion.div>

        </div>

      </section>

      {/* Laser scanline divider below tech stack section */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent relative z-20" />

      {/* Premium Features Section */}
      <section id="features" className="py-28 md:py-40 relative w-full overflow-hidden z-20">
        {/* Atmospheric Backlight Spots */}
        <div className="absolute top-1/3 left-1/4 w-[40%] h-[30%] rounded-full bg-cyan-950/10 opacity-30 filter blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[40%] h-[30%] rounded-full bg-purple-950/10 opacity-30 filter blur-[120px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '-4s' }} />

        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-24 px-6 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-cyan-400 font-bold">
              System Architecture // Advanced Utilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white font-display leading-[1.15] mb-4">
            EXPLOIT THE FULL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#4F7CFF] to-purple-400 text-glow font-bold">
              COMPILER EDGE
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
            Deploy cognitive multi-agent modules engineered to parse, scan, refactor, and supercharge your production stack.
          </p>
        </motion.div>

        {/* Features 2x2 Grid */}
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            
            {/* Feature 1: Real-time Cognitive Diagnostics */}
            <motion.div 
              variants={itemVariants}
              onMouseEnter={() => setHoveredFeature(1)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="w-full flex"
            >
              <FloatingGlassCard
                glowColor="cyan"
                yOffset={[0, -4, 0]}
                xOffset={[0, 0.5, 0]}
                rotateOffset={[0, 0.2, 0]}
                duration={7}
                delay={0}
                className={`w-full h-full transition-all duration-300 ${hoveredFeature === 1 ? 'border-cyan-500/30 shadow-[0_15px_40px_rgba(6,182,212,0.12)]' : ''}`}
              >
                <div className="flex flex-col h-full space-y-6 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                      <Activity size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">Cognitive Diagnostics</h3>
                      <p className="text-[9px] font-mono text-cyan-400/80 uppercase tracking-widest font-semibold">Continuous AST Scanning</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Continuous monitoring parses code block complexity, detecting potential recursion limits, structural bottlenecks, and memory leaks before execution.
                  </p>

                  {/* 6x6 Scanning Memory Cell Grid */}
                  <div className="h-32 w-full bg-slate-950/80 rounded-lg border border-white/5 relative p-3 overflow-hidden font-mono text-[9px]">
                    <div className="flex items-center justify-between text-[7px] border-b border-white/5 pb-1 mb-2 text-cyan-400 font-bold uppercase select-none">
                      <span>L3_CACHE_SCANNER.SYS</span>
                      <span className="animate-pulse">SCANNING ACTIVE</span>
                    </div>
                    
                    <div className="grid grid-cols-6 gap-1.5 h-16 w-full max-w-[200px] mx-auto select-none pointer-events-none mt-1">
                      {Array.from({ length: 18 }).map((_, idx) => {
                        // Alternate states for visual complexity
                        const isGlowing = idx % 5 === 0;
                        const isWarning = idx === 13;
                        return (
                          <motion.div 
                            key={idx}
                            animate={isGlowing ? { opacity: [0.3, 1, 0.3] } : {}}
                            transition={{ duration: 1.5 + (idx % 2), repeat: Infinity, ease: "easeInOut" }}
                            className={`rounded-sm border ${
                              isWarning 
                                ? 'bg-rose-500/20 border-rose-500/40' 
                                : isGlowing 
                                  ? 'bg-cyan-500/30 border-cyan-400/50 shadow-[0_0_6px_rgba(34,211,238,0.3)]' 
                                  : 'bg-slate-900 border-white/5'
                            }`}
                          />
                        );
                      })}
                    </div>
                    
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[7px] text-slate-500 select-none">
                      <span>MEM_HEAP: STABLE</span>
                      <span className="text-cyan-400 font-bold">HEAP_OK // 0.08ms</span>
                    </div>
                    <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

            {/* Feature 2: Multi-Agent Parallel Orchestration */}
            <motion.div 
              variants={itemVariants}
              onMouseEnter={() => setHoveredFeature(2)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="w-full flex"
            >
              <FloatingGlassCard
                glowColor="purple"
                yOffset={[0, 4, 0]}
                xOffset={[0, -0.5, 0]}
                rotateOffset={[0, -0.2, 0]}
                duration={8}
                delay={0.2}
                className={`w-full h-full transition-all duration-300 ${hoveredFeature === 2 ? 'border-purple-500/30 shadow-[0_15px_40px_rgba(168,85,247,0.12)]' : ''}`}
              >
                <div className="flex flex-col h-full space-y-6 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.15)]">
                      <Network size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">Multi-Agent Network</h3>
                      <p className="text-[9px] font-mono text-purple-400/80 uppercase tracking-widest font-semibold">Staggered subtree refactors</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Orchestrate multiple specialized micro-agents to run parallel refactorizations across disparate modules without locking resources.
                  </p>

                  {/* SVG Nodes diagram */}
                  <div className="h-32 w-full bg-slate-950/80 rounded-lg border border-white/5 relative p-3 overflow-hidden">
                    <div className="flex items-center justify-between text-[7px] font-mono border-b border-white/5 pb-1 mb-1 text-purple-400 font-bold uppercase select-none">
                      <span>AGENT_CLUSTER_MAP.NET</span>
                      <span className="text-emerald-400 font-bold animate-pulse">4 NODES SYNCED</span>
                    </div>

                    <div className="h-20 w-full relative flex items-center justify-center select-none pointer-events-none">
                      <svg className="w-24 h-20 overflow-visible" viewBox="0 0 100 80">
                        {/* Lines */}
                        <path d="M 50 40 L 20 20 M 50 40 L 80 20 M 50 40 L 20 60 M 50 40 L 80 60" fill="none" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="0.8" />
                        
                        {/* Moving particles */}
                        <circle cx="50" cy="40" r="1.5" fill="#A855F7" style={{ display: hoveredFeature === 2 ? 'block' : 'none' }}>
                          <animateMotion dur="1.2s" repeatCount="indefinite" path="M 50 40 L 20 20" />
                        </circle>
                        <circle cx="50" cy="40" r="1.5" fill="#A855F7" style={{ display: hoveredFeature === 2 ? 'block' : 'none' }}>
                          <animateMotion dur="1s" repeatCount="indefinite" path="M 50 40 L 80 20" />
                        </circle>
                        <circle cx="50" cy="40" r="1.5" fill="#A855F7" style={{ display: hoveredFeature === 2 ? 'block' : 'none' }}>
                          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 50 40 L 20 60" />
                        </circle>
                        <circle cx="50" cy="40" r="1.5" fill="#A855F7" style={{ display: hoveredFeature === 2 ? 'block' : 'none' }}>
                          <animateMotion dur="1.3s" repeatCount="indefinite" path="M 50 40 L 80 60" />
                        </circle>

                        {/* Central Hub */}
                        <circle cx="50" cy="40" r="5.5" fill="#010106" stroke="#A855F7" strokeWidth="1.5" className="animate-pulse" />
                        
                        {/* Satellite Nodes */}
                        <circle cx="20" cy="20" r="3.5" fill="#010106" stroke="#22D3EE" strokeWidth="1" />
                        <circle cx="80" cy="20" r="3.5" fill="#010106" stroke="#10B981" strokeWidth="1" />
                        <circle cx="20" cy="60" r="3.5" fill="#010106" stroke="#22D3EE" strokeWidth="1" />
                        <circle cx="80" cy="60" r="3.5" fill="#010106" stroke="#10B981" strokeWidth="1" />
                      </svg>
                    </div>

                    <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

            {/* Feature 3: WASM Direct-JIT Compiling */}
            <motion.div 
              variants={itemVariants}
              onMouseEnter={() => setHoveredFeature(3)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="w-full flex"
            >
              <FloatingGlassCard
                glowColor="emerald"
                yOffset={[0, -4, 0]}
                xOffset={[0, 0.5, 0]}
                rotateOffset={[0, 0.2, 0]}
                duration={7.5}
                delay={0.1}
                className={`w-full h-full transition-all duration-300 ${hoveredFeature === 3 ? 'border-emerald-500/30 shadow-[0_15px_40px_rgba(16,185,129,0.12)]' : ''}`}
              >
                <div className="flex flex-col h-full space-y-6 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                      <Layers size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">WASM Targeting JIT</h3>
                      <p className="text-[9px] font-mono text-emerald-400/80 uppercase tracking-widest font-semibold">Sub-millisecond binary deploys</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Compile optimized Abstract Syntax Trees straight into highly secure, sandboxed WebAssembly binaries for instant serverless execution.
                  </p>

                  {/* Typing logs widget */}
                  <div className="h-32 w-full bg-slate-950/80 rounded-lg border border-white/5 relative p-3 overflow-hidden font-mono text-[8px] text-slate-400">
                    <div className="flex items-center justify-between text-[7px] border-b border-white/5 pb-1 mb-2 text-emerald-400 font-bold uppercase select-none">
                      <span>WASM_JIT_STDOUT.LOG</span>
                      <span className="text-cyan-400 font-bold animate-pulse">COMPILATION SUCCESS</span>
                    </div>

                    <div className="space-y-1 text-left select-none pointer-events-none">
                      <div className="text-slate-500">&gt; signal compiler --target=wasm</div>
                      <div className="text-cyan-400/80">&gt; Analyzing local code trees... OK</div>
                      <div className="text-purple-400/80">&gt; Building WASM byte arrays... OK [12.4 KB]</div>
                      <div className="text-emerald-400 flex items-center space-x-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        <span>✓ WASM binary loaded successfully (11.2ms)</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

            {/* Feature 4: Intelligent Database Refactoring */}
            <motion.div 
              variants={itemVariants}
              onMouseEnter={() => setHoveredFeature(4)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="w-full flex"
            >
              <FloatingGlassCard
                glowColor="blue"
                yOffset={[0, 4, 0]}
                xOffset={[0, -0.5, 0]}
                rotateOffset={[0, -0.2, 0]}
                duration={8.5}
                delay={0.3}
                className={`w-full h-full transition-all duration-300 ${hoveredFeature === 4 ? 'border-[#4F7CFF]/30 shadow-[0_15px_40px_rgba(79,124,255,0.12)]' : ''}`}
              >
                <div className="flex flex-col h-full space-y-6 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_10px_rgba(79,124,255,0.15)]">
                      <Database size={18} className="text-[#4F7CFF]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">Database Optimizations</h3>
                      <p className="text-[9px] font-mono text-[#4F7CFF] uppercase tracking-widest font-semibold">Schema Query Caching</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Analyze relational structures and execution plans, auto-identifying query hazards, missing indices, and slow tables to patch instantly.
                  </p>

                  {/* Slow/Fast Query Comparison */}
                  <div className="h-32 w-full bg-slate-950/80 rounded-lg border border-white/5 relative p-3 overflow-hidden font-mono text-[8px] text-slate-400">
                    <div className="flex items-center justify-between text-[7px] border-b border-white/5 pb-1 mb-2 text-[#4F7CFF] font-bold uppercase select-none">
                      <span>DB_EXECUTION_PROFILER.IO</span>
                      <span className="text-cyan-400 font-bold uppercase">42x Speedup</span>
                    </div>

                    <div className="space-y-3.5 select-none pointer-events-none mt-1.5 text-left">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[7px] text-slate-500 font-bold">
                          <span>UNOPTIMIZED QUERY (SEQUENTIAL SCAN)</span>
                          <span className="text-rose-400">420ms</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/3">
                          <motion.div 
                            animate={{ width: hoveredFeature === 4 ? ['100%', '80%', '100%'] : '100%' }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="h-full bg-rose-500/60 rounded-full" 
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[7px] text-slate-500 font-bold">
                          <span>OPTIMIZED INDEX LOOKUP (REDIS CACHED)</span>
                          <span className="text-emerald-400">10ms</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/3">
                          <motion.div 
                            animate={{ width: hoveredFeature === 4 ? ['2.4%', '10%', '2.4%'] : '2.4%' }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="h-full bg-emerald-500/60 rounded-full" 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
                  </div>
                </div>
              </FloatingGlassCard>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Laser scanline divider below features section */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent relative z-20" />

      {/* Futuristic Pricing Plans Section */}
      <section id="pricing" className="py-28 md:py-40 relative w-full overflow-visible z-20 bg-[#010106]/20">
        
        {/* Volumetric backdrop atmospheric light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full bg-purple-950/5 opacity-30 filter blur-[150px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '-2s' }} />
 
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16 px-6 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-cyan-400 font-bold">
              Transparent Value // Scalable Compute
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white font-display leading-[1.15] mb-4">
            POWER ALIGNED TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#4F7CFF] to-purple-400 text-glow font-bold">
              YOUR PIPELINE
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
            Select an execution threshold tailored for autonomous compiling sandboxes or enterprise scaling pipelines.
          </p>
        </motion.div>
 
        {/* Billing Period Selector Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-20 relative z-10 select-none">
          <span className={`text-[10px] font-mono tracking-widest transition-colors duration-300 font-bold ${!isYearly ? 'text-cyan-400' : 'text-slate-500'}`}>MONTHLY</span>
          
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-7 rounded-full bg-slate-950 border border-white/10 p-1 flex items-center relative transition-all duration-300 hover:border-cyan-500/30 cursor-pointer"
          >
            <motion.div 
              animate={{ x: isYearly ? 26 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-4.5 h-4.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]" 
            />
          </button>
 
          <span className={`text-[10px] font-mono tracking-widest transition-colors duration-300 font-bold ${isYearly ? 'text-cyan-400' : 'text-slate-500'}`}>YEARLY</span>
          
          {/* Neon pill indicator */}
          <span className="font-mono text-[8px] font-extrabold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30 animate-pulse tracking-wide select-none">
            +20% YEARLY SAVINGS
          </span>
        </div>
 
        {/* Pricing Cards Grid */}
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            
            {/* Plan 1: Starter */}
            <motion.div variants={itemVariants} className="w-full flex">
              <FloatingGlassCard
                glowColor="cyan"
                yOffset={[0, -3, 0]}
                xOffset={[0, 0.4, 0]}
                rotateOffset={[0, 0.1, 0]}
                duration={6.5}
                delay={0}
                className="w-full flex flex-col justify-between border-white/5 hover:border-cyan-500/20"
              >
                <div className="flex flex-col space-y-6 text-left h-full justify-between">
                  <div className="space-y-6">
                    {/* Title Row */}
                    <div className="flex items-center justify-between select-none">
                      <span className="font-mono text-[9px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.8 rounded-full uppercase tracking-wider">
                        Tier 01 // DEV
                      </span>
                      <TermIcon size={14} className="text-slate-500" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-display">Starter</h3>
                      <p className="text-xs text-slate-400 font-medium">Explore autonomous compiler sandboxes.</p>
                    </div>
   
                    {/* Pricing Display */}
                    <div className="py-2.5 border-y border-white/5 flex items-baseline space-x-1">
                      <span className="text-3xl font-bold font-display text-white tracking-tight">$0</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">/ permanent</span>
                    </div>
   
                    {/* Features List */}
                    <ul className="space-y-3 text-xs text-slate-400 font-medium pt-2">
                      {[
                        "1 active subagent sandbox",
                        "20 compilation runs / month",
                        "Standard AST parsing (2.5s)",
                        "Global CDN targeting WASM",
                        "Standard discord community support"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <Check size={12} className="text-cyan-400 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
   
                  {/* CTA */}
                  <button className="w-full py-3 mt-8 rounded-lg border border-white/10 hover:border-cyan-500/30 bg-white/3 hover:bg-cyan-500/5 text-slate-300 hover:text-cyan-300 font-mono text-[9px] font-bold tracking-widest uppercase transition-all select-none cursor-pointer">
                    Access Starter Sandbox
                  </button>
                </div>
              </FloatingGlassCard>
            </motion.div>
 
            {/* Plan 2: Pro - RECOMMENDED */}
            <motion.div variants={itemVariants} className="relative group flex flex-col w-full">
              {/* Pulsing glow surround for Pro card */}
              <div className="absolute inset-0 -m-[1.5px] rounded-[17px] bg-gradient-to-b from-purple-500/30 via-[#4F7CFF]/20 to-cyan-500/30 blur-[2px] opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <FloatingGlassCard
                glowColor="purple"
                yOffset={[0, 4, 0]}
                xOffset={[0, -0.4, 0]}
                rotateOffset={[0, -0.1, 0]}
                duration={7.2}
                delay={0.2}
                className="w-full h-full flex flex-col justify-between border-purple-500/20 bg-purple-950/3 hover:border-purple-400/40 relative overflow-hidden"
              >
                {/* Visual cursor sheen highlights */}
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400 to-cyan-400 opacity-60 pointer-events-none" />
                
                <div className="flex flex-col space-y-6 text-left h-full justify-between relative z-10">
                  <div className="space-y-6">
                    {/* Title Row */}
                    <div className="flex items-center justify-between select-none">
                      <span className="font-mono text-[9px] font-extrabold text-purple-400 bg-purple-500/10 px-2.5 py-0.8 rounded-full uppercase tracking-wider border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                        Tier 02 // RECOMMENDED
                      </span>
                      <Zap size={14} className="text-purple-400 animate-pulse" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-display">Pro</h3>
                      <p className="text-xs text-slate-400 font-medium">Power optimization across active projects.</p>
                    </div>
   
                    {/* Pricing Display */}
                    <div className="py-2.5 border-y border-white/5 flex items-baseline space-x-1 overflow-hidden">
                      <div className="flex items-baseline space-x-0.5">
                        <span className="text-3xl font-bold font-display text-white tracking-tight">$</span>
                        <AnimatePresence mode="wait">
                          <motion.span 
                            key={isYearly ? 'yearly' : 'monthly'}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-3xl font-bold font-display text-white tracking-tight"
                          >
                            {isYearly ? '15' : '19'}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                        / month {isYearly ? '(billed annually)' : ''}
                      </span>
                    </div>
   
                    {/* Features List */}
                    <ul className="space-y-3 text-xs text-slate-300 font-medium pt-2">
                      {[
                        "5 parallel cognitive subagents",
                        "Unlimited compilation pipeline runs",
                        "High priority JIT compiling (12ms)",
                        "Safe structural AST loop refactoring",
                        "Database relational query indexing",
                        "Priority SLA developer support"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <Check size={12} className="text-purple-400 mt-0.5 shrink-0 shadow-[0_0_6px_rgba(168,85,247,0.4)]" />
                          <span className="font-semibold">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
   
                  {/* CTA */}
                  <button className="w-full py-3 mt-8 rounded-lg bg-gradient-to-r from-purple-500 via-[#4F7CFF] to-cyan-500 text-white font-mono text-[9px] font-bold tracking-widest uppercase transition-all hover:brightness-110 shadow-[0_4px_20px_rgba(168,85,247,0.3)] select-none cursor-pointer">
                    Upgrade to Pro
                  </button>
                </div>
              </FloatingGlassCard>
            </motion.div>
 
            {/* Plan 3: Ultimate */}
            <motion.div variants={itemVariants} className="w-full flex">
              <FloatingGlassCard
                glowColor="emerald"
                yOffset={[0, -3, 0]}
                xOffset={[0, 0.4, 0]}
                rotateOffset={[0, 0.1, 0]}
                duration={6.8}
                delay={0.4}
                className="w-full flex flex-col justify-between border-white/5 hover:border-emerald-500/20"
              >
                <div className="flex flex-col space-y-6 text-left h-full justify-between">
                  <div className="space-y-6">
                    {/* Title Row */}
                    <div className="flex items-center justify-between select-none">
                      <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.8 rounded-full uppercase tracking-wider">
                        Tier 03 // SCALE
                      </span>
                      <Sliders size={14} className="text-slate-500" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-display">Ultimate</h3>
                      <p className="text-xs text-slate-400 font-medium">Infinite compute pipelines & custom constraints.</p>
                    </div>
   
                    {/* Pricing Display */}
                    <div className="py-2.5 border-y border-white/5 flex items-baseline space-x-1 overflow-hidden">
                      <div className="flex items-baseline space-x-0.5">
                        <span className="text-3xl font-bold font-display text-white tracking-tight">$</span>
                        <AnimatePresence mode="wait">
                          <motion.span 
                            key={isYearly ? 'yearly' : 'monthly'}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-3xl font-bold font-display text-white tracking-tight"
                          >
                            {isYearly ? '69' : '89'}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                        / month {isYearly ? '(billed annually)' : ''}
                      </span>
                    </div>
   
                    {/* Features List */}
                    <ul className="space-y-3 text-xs text-slate-400 font-medium pt-2">
                      {[
                        "Unlimited parallel cognitive agents",
                        "Dedicated execution compile threads",
                        "Custom AST analyzer injectors",
                        "Full SOC2 diagnostic verification",
                        "Active Slack + 24/7 Phone SLA support"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <Check size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
   
                  {/* CTA */}
                  <button className="w-full py-3 mt-8 rounded-lg border border-white/10 hover:border-emerald-500/30 bg-white/3 hover:bg-emerald-500/5 text-slate-300 hover:text-emerald-300 font-mono text-[9px] font-bold tracking-widest uppercase transition-all select-none cursor-pointer">
                    Deploy Ultimate Network
                  </button>
                </div>
              </FloatingGlassCard>
            </motion.div>
 
          </motion.div>
        </div>
      </section>
 
      {/* Laser scanline divider below pricing section */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent relative z-20" />
 
      {/* Futuristic Testimonials Section */}
      <section id="testimonials" className="py-28 md:py-40 relative w-full overflow-hidden z-20 border-t border-white/[0.02]">
        
        {/* Atmospheric Cosmic Backdrop Glows */}
        <div className="absolute top-1/3 left-1/4 w-[40%] h-[30%] rounded-full bg-purple-950/10 opacity-30 filter blur-[120px] pointer-events-none z-0 animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[40%] h-[30%] rounded-full bg-cyan-950/10 opacity-30 filter blur-[120px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '-6s' }} />
        
        {/* Background Grid Pattern inside the section */}
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
 
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center mb-16 px-6 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-cyan-400 font-bold">
              STUDENT TRIUMPHS // ALUMNI TELEMETRY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white font-display leading-[1.15] mb-4">
            Developer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#4F7CFF] to-purple-400 text-glow font-bold">
              Success Stories
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
            Explore real-time telemetry from Signal AI graduates who compiled their training pathways and deployed into industry-leading systems.
          </p>
        </motion.div>
 
        {/* Floating Quotation Cards Container */}
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            
            {testimonials.map((item) => {
              const isHovered = hoveredQuote === item.id;
              
              return (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  className="flex flex-col relative"
                  onMouseEnter={() => setHoveredQuote(item.id)}
                  onMouseLeave={() => setHoveredQuote(null)}
                >
                  {/* Glowing hover backdrop capsule */}
                  <div className={`absolute inset-0 -m-[1.5px] rounded-[25px] bg-gradient-to-b ${item.glowColor} opacity-0 blur-[3px] group-hover:opacity-40 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-50' : ''}`} />
                  
                  <FloatingGlassCard
                    glowColor={item.id === 1 ? "cyan" : item.id === 2 ? "purple" : "emerald"}
                    yOffset={item.floatOffset}
                    xOffset={[0, 0.2, 0]}
                    rotateOffset={[0, 0.05, 0]}
                    duration={item.duration}
                    delay={item.delay}
                    className={`w-full h-full flex flex-col justify-between border-white/5 bg-slate-950/40 transition-all duration-500 ${isHovered ? 'border-cyan-500/20 shadow-[0_20px_45px_rgba(6,182,212,0.12)] scale-102 -translate-y-2' : ''}`}
                  >
                    <div className="flex flex-col space-y-6 text-left h-full justify-between relative">
                      
                      <div className="space-y-6">
                        
                        {/* Telemetry status bar */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-3 text-[7px] font-mono text-slate-500 select-none">
                          <span>ALUMNI_METRIC_OK</span>
                          <span className={`font-bold tracking-widest ${isHovered ? 'text-cyan-400' : ''}`}>
                            {item.telemetry}
                          </span>
                        </div>
 
                        {/* Profile Row */}
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-display font-black text-sm transition-all duration-500 ${item.avatarGlow} ${isHovered ? 'scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : ''}`}>
                            {item.avatar}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-white tracking-wide uppercase text-sm">{item.name}</h4>
                            <p className="font-mono text-[9px] text-slate-400 font-semibold tracking-wider">{item.role}</p>
                          </div>
                        </div>
 
                        {/* Quote Text */}
                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium italic relative">
                          <span className="text-slate-600 font-serif text-3xl absolute -top-4 -left-1">“</span>
                          <span className="relative z-10 pl-2">{item.quote}</span>
                        </p>
                        
                      </div>
 
                      {/* Placement statistics footer */}
                      <div className="border-t border-white/5 pt-4.5 space-y-2 mt-6 select-none font-mono">
                        <div className={`text-[8.5px] font-bold py-1 px-2.5 rounded-lg border border-white/5 inline-block ${item.id === 1 ? 'text-cyan-400 bg-cyan-500/5' : item.id === 2 ? 'text-purple-400 bg-purple-500/5' : 'text-emerald-400 bg-emerald-500/5'}`}>
                          {item.placement}
                        </div>
                        <div className="flex items-center justify-between text-[7px] text-slate-500 font-bold uppercase tracking-widest">
                          <span>{item.stats}</span>
                          <span className={isHovered ? 'text-cyan-400 animate-pulse' : ''}>
                            {isHovered ? '✓ LIVE_SYNCED' : 'STEADY'}
                          </span>
                        </div>
                      </div>
 
                    </div>
                  </FloatingGlassCard>
                </motion.div>
              );
            })}
 
          </motion.div>
        </div>
 
      </section>
 
      {/* Laser scanline divider below testimonials section */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent relative z-20" />

      {/* Cinematic Final CTA Section */}
      <section id="cta" className="py-28 md:py-40 relative w-full overflow-hidden z-20 border-t border-white/[0.01]">
        
        {/* Cinematic Backdrop Atmospheric Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[75%] rounded-full bg-gradient-to-tr from-purple-950/15 via-[#162E93]/10 to-cyan-950/15 opacity-40 filter blur-[140px] pointer-events-none z-0 animate-pulse-slow" />
        
        {/* Subtle circular grid track behind CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full pointer-events-none z-0 flex items-center justify-center">
          <div className="w-[450px] h-[450px] border border-white/[0.03] border-dashed rounded-full animate-[spin_120s_linear_infinite]" />
          <div className="absolute w-[300px] h-[300px] border border-cyan-500/[0.01] rounded-full" />
        </div>

        {/* Technical neural scanline grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-3 pointer-events-none z-0" />

        {/* Weightless Floating Cyber Particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[
            { left: "12%", top: "25%", size: 6, color: "bg-cyan-500/30", duration: 8, delay: 0 },
            { left: "85%", top: "30%", size: 8, color: "bg-purple-500/20", duration: 11, delay: 1 },
            { left: "20%", top: "75%", size: 5, color: "bg-blue-500/25", duration: 9, delay: 2 },
            { left: "78%", top: "65%", size: 7, color: "bg-cyan-400/25", duration: 12, delay: 0.5 },
            { left: "48%", top: "15%", size: 4, color: "bg-purple-400/30", duration: 7, delay: 1.5 },
          ].map((pt, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${pt.color}`}
              style={{
                left: pt.left,
                top: pt.top,
                width: pt.size,
                height: pt.size,
                filter: "blur(1px)",
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: pt.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: pt.delay,
              }}
            />
          ))}
        </div>

        {/* Content Wrapper */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          
          {/* Micro telemetry tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] mb-8"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-cyan-400 font-bold">SYSTEMS_ACTIVE // STABLE_VERSION_2.6</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white font-display leading-[1.15] mb-4"
          >
            Build the Future <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#4F7CFF] to-purple-400 text-glow font-bold">
              with AI
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-sans font-medium leading-relaxed mb-12"
          >
            Start coding smarter with your AI-powered development companion.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA: Start coding free */}
            <a 
              href="#compiler"
              className="relative group px-9 py-4 rounded-xl overflow-hidden font-bold font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 active:scale-[0.98] text-center shadow-[0_12px_45px_rgba(6,182,212,0.22)] cursor-pointer w-full sm:w-auto min-w-[210px] flex items-center justify-center"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#162E93] via-cyan-500 to-[#4F7CFF] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] group-hover:scale-105 transition-transform" />
              <span className="relative text-white flex items-center justify-center space-x-2">
                <span>Start Building Free</span>
                <Sparkles size={13} className="animate-pulse" />
              </span>
            </a>

            {/* Secondary CTA: Open interactive logs sim */}
            <button
              onClick={() => setDemoActive(true)}
              className="px-9 py-4 rounded-xl font-bold font-mono text-[10px] tracking-[0.2em] uppercase bg-white/4 hover:bg-white/8 border border-white/5 hover:border-cyan-500/20 transition-all text-slate-200 flex items-center justify-center space-x-2 group active:scale-[0.98] cursor-pointer w-full sm:w-auto min-w-[210px]"
            >
              <Play size={10} className="fill-slate-200 text-slate-200 group-hover:scale-110 transition-transform group-hover:text-cyan-400 group-hover:fill-cyan-400" />
              <span>Watch Live Demo</span>
            </button>
          </motion.div>

        </div>

        {/* Elegant bracket decals on top-left / bottom-right coordinates to structure spatial depth */}
        <div className="absolute top-10 left-10 w-6 h-6 border-t border-l border-white/[0.04] pointer-events-none select-none rounded-tl-md" />
        <div className="absolute bottom-10 right-10 w-6 h-6 border-b border-r border-white/[0.04] pointer-events-none select-none rounded-br-md" />

      </section>

      {/* Laser scanline divider below CTA section */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent relative z-20" />

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
