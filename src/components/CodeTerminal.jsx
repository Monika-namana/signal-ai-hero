import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Terminal } from 'lucide-react';

export default function CodeTerminal({ phase: propPhase, setPhase: propSetPhase }) {
  const [localPhase, setLocalPhase] = useState('buggy');
  const phase = propPhase !== undefined ? propPhase : localPhase;
  const setPhase = propSetPhase !== undefined ? propSetPhase : setLocalPhase;

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'buggy') return 'scanning';
        if (prev === 'scanning') return 'optimized';
        return 'buggy';
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [setPhase]);

  const buggyCode = `def find_duplicates(arr):
    # O(N^2) Quadratic Search
    duplicates = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                if arr[i] not in duplicates:
                    duplicates.append(arr[i])
    return duplicates`;

  const optimizedCode = `def find_duplicates(arr):
    # O(N) Hash Table Lookup - Optimized
    seen = set()
    duplicates = set()
    for item in arr:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    return list(duplicates)`;

  // Retro-phosphor token styling helpers
  const renderBuggyLine = (line, idx) => {
    let styleClass = 'text-slate-300';
    if (line.includes('def') || line.includes('return') || line.includes('for') || line.includes('if') || line.includes('not in')) {
      styleClass = 'text-cyan-300 font-semibold drop-shadow-[0_0_4px_rgba(6,182,212,0.45)]';
    } else if (line.includes('#')) {
      styleClass = 'text-rose-400/85 italic font-medium drop-shadow-[0_0_3px_rgba(244,63,94,0.3)]';
    } else if (line.includes('duplicates')) {
      styleClass = 'text-purple-300 drop-shadow-[0_0_3px_rgba(168,85,247,0.3)]';
    }
    
    return (
      <div key={idx} className="flex leading-5 sm:leading-6">
        <span className="w-6 text-right pr-3 select-none text-slate-600 font-sans text-[10px]">{idx + 1}</span>
        <span className={styleClass}>{line}</span>
      </div>
    );
  };

  const renderOptimizedLine = (line, idx) => {
    let styleClass = 'text-slate-300';
    if (line.includes('def') || line.includes('return') || line.includes('for') || line.includes('if') || line.includes('else:')) {
      styleClass = 'text-cyan-300 font-semibold drop-shadow-[0_0_4px_rgba(6,182,212,0.45)]';
    } else if (line.includes('#')) {
      styleClass = 'text-emerald-400 italic font-semibold drop-shadow-[0_0_4px_rgba(16,185,129,0.4)]';
    } else if (line.includes('set()') || line.includes('list(')) {
      styleClass = 'text-purple-300 font-medium drop-shadow-[0_0_3px_rgba(168,85,247,0.35)]';
    } else if (line.includes('seen') || line.includes('duplicates')) {
      styleClass = 'text-slate-200';
    }

    return (
      <div key={idx} className="flex leading-5 sm:leading-6">
        <span className="w-6 text-right pr-3 select-none text-slate-600 font-sans text-[10px]">{idx + 1}</span>
        <span className={styleClass}>{line}</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl glass rounded-xl overflow-hidden border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.65)] flex flex-col font-mono text-[11px] sm:text-xs text-slate-300 relative group sheen-container">
      
      {/* Specular premium gradient header line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-80" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/65 border-b border-white/5 select-none">
        <div className="flex items-center space-x-2">
          {/* OS Window dots */}
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/20 shadow-[0_0_6px_rgba(239,68,68,0.2)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40 border border-yellow-500/20 shadow-[0_0_6px_rgba(234,179,8,0.15)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 border border-green-500/20 shadow-[0_0_6px_rgba(34,197,94,0.2)]" />
        </div>
        <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 font-sans tracking-[0.12em] font-bold uppercase">
          <Terminal size={11} className="text-cyan-400/80 animate-pulse" />
          <span>Antigravity Compiler // v2.4</span>
        </div>
        <div className="w-8" />
      </div>

      {/* Developer IDE File Tabs */}
      <div className="flex bg-slate-950/35 border-b border-white/5 text-[10px] font-sans font-semibold select-none">
        <button
          onClick={() => setPhase('buggy')}
          className={`px-4.5 py-2.5 border-r border-white/5 flex items-center space-x-2 transition-all ${
            phase === 'buggy'
              ? 'bg-slate-900/45 text-cyan-400 border-b-2 border-cyan-400/80 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#F43F5E]" />
          <span>find_duplicates.py</span>
        </button>
        <button
          onClick={() => setPhase('optimized')}
          className={`px-4.5 py-2.5 border-r border-white/5 flex items-center space-x-2 transition-all ${
            phase === 'optimized'
              ? 'bg-slate-900/45 text-emerald-400 border-b-2 border-emerald-400/80 font-bold'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]" />
          <span>duplicates_fast.py</span>
        </button>
      </div>

      {/* Code Editor Body with visual glitch/flash on phase transitions */}
      <motion.div 
        key={phase}
        initial={{ filter: 'brightness(1.8) contrast(1.1)', scale: 0.995 }}
        animate={{ filter: 'brightness(1) contrast(1)', scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="p-5 sm:p-6 min-h-[210px] sm:min-h-[230px] bg-slate-950/70 relative overflow-hidden flex flex-col justify-between scanline-glow"
      >
        
        {/* Volumetric CRT laser scanner line */}
        {phase === 'scanning' && (
          <motion.div
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00E5FF,0_0_4px_#FFFFFF] z-10 pointer-events-none"
          />
        )}

        <AnimatePresence mode="wait">
          {phase === 'buggy' && (
            <motion.div
              key="buggy-code"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="flex-grow whitespace-pre font-mono"
            >
              {buggyCode.split('\n').map((line, idx) => renderBuggyLine(line, idx))}
            </motion.div>
          )}

          {phase === 'scanning' && (
            <motion.div
              key="scanning-code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col items-center justify-center space-y-4 py-8 select-none"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 w-12 h-12 rounded-full border border-cyan-400/20 animate-ping" />
                <RefreshCw size={32} className="text-cyan-400 animate-spin" style={{ animationDuration: '1.8s' }} />
                <Sparkles size={14} className="text-cyan-300 absolute -top-1.5 -right-1.5 animate-bounce" />
              </div>
              <div className="space-y-0.5 text-center">
                <p className="font-sans font-bold text-xs tracking-wider text-white uppercase text-glow">Analyzing AST & Complexity</p>
                <p className="text-[10px] text-slate-500 font-sans font-semibold tracking-wide">Refactoring loops • Set-lookup injection • Memory optimize</p>
              </div>
            </motion.div>
          )}

          {phase === 'optimized' && (
            <motion.div
              key="optimized-code"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="flex-grow whitespace-pre font-mono"
            >
              {optimizedCode.split('\n').map((line, idx) => renderOptimizedLine(line, idx))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lower compiler status widget */}
        <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-sans text-slate-500 font-bold tracking-wide">
          <div className="flex items-center space-x-2">
            {phase === 'buggy' ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold uppercase tracking-widest text-[8px] shadow-[0_0_8px_rgba(244,63,94,0.1)]">
                Inefficient
              </span>
            ) : phase === 'scanning' ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 font-bold uppercase tracking-widest text-[8px] animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.1)]">
                Refactoring
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-widest text-[8px] shadow-[0_0_8px_rgba(16,185,129,0.1)]">
                O(N) Optimal
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div>
              Complexity: <span className={phase === 'optimized' ? 'text-emerald-400 font-bold drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]' : 'text-rose-400/90 font-medium'}>{phase === 'optimized' ? 'O(N)' : 'O(N²)'}</span>
            </div>
            <div>
              Est. Time: <span className={phase === 'optimized' ? 'text-emerald-400 font-bold drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]' : 'text-rose-400/90 font-medium'}>{phase === 'optimized' ? '12ms' : '420ms'}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
