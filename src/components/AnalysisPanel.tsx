import { MapPin, CheckCircle2, Mountain, Footprints } from 'lucide-react';
import { motion } from 'framer-motion';
import type { GeolocationResult } from '../lib/gemini';

interface AnalysisPanelProps {
  result: GeolocationResult;
}

export default function AnalysisPanel({ result }: AnalysisPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      {/* Header Info */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Identification Confirmed</span>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-4xl font-bold text-white tracking-tighter leading-none">
            {result.locationName}
          </h2>
          <p className="text-emerald-500 font-bold text-sm tracking-widest uppercase">
            {result.country}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-4 space-y-1">
             <div className="text-label text-[8px]">Coordinates</div>
             <div className="text-xs font-mono text-white tracking-tight">
                {result.latitude.toFixed(6)} / {result.longitude.toFixed(6)}
             </div>
          </div>
          <div className="glass-panel p-4 space-y-1">
             <div className="text-label text-[8px]">Confidence</div>
             <div className="text-xs font-mono text-emerald-400 tracking-tight">
                {result.confidence}% Final_Vector
             </div>
          </div>
        </div>
      </div>

      {/* Terrain Profile */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-white/5" />
          <h3 className="text-label flex items-center gap-2">
            <Mountain size={12} className="text-emerald-500" />
            Terrain_Profile
          </h3>
          <div className="h-[1px] w-4 bg-white/5" />
        </div>
        
        <div className="space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            {result.terrainAnalysis.topography}
          </p>
          <div className="flex flex-wrap gap-2">
            {result.terrainAnalysis.features.map((feature) => (
              <span key={feature} className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[9px] font-mono text-slate-400 uppercase">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics / Itinerary */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-white/5" />
          <h3 className="text-label flex items-center gap-2">
            <Footprints size={12} className="text-emerald-500" />
            Tactical_Route
          </h3>
          <div className="h-[1px] w-4 bg-white/5" />
        </div>

        <div className="space-y-4">
          {result.itinerary.map((step, index) => (
            <div key={index} className="flex gap-4 group">
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 text-[10px] font-mono group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                  {index + 1}
                </div>
                {index !== result.itinerary.length - 1 && (
                  <div className="w-[1px] flex-1 bg-white/5" />
                )}
              </div>
              <div className="pb-6 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-500">{step.time}</span>
                  <span className="text-xs font-bold text-white uppercase tracking-wide">{step.activity}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Signatures */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-white/5" />
          <h3 className="text-label flex items-center gap-2">
            <CheckCircle2 size={12} className="text-emerald-500" />
            Visual_Signatures
          </h3>
          <div className="h-[1px] w-4 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 gap-2">
          {result.visualClues.map((clue) => (
            <div key={clue} className="flex items-center gap-4 p-3 glass-panel group hover:border-emerald-500/30 transition-all">
              <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-emerald-500 transition-colors" />
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-tight">{clue}</p>
            </div>
          ))}
        </div>
      </section>
      
      <div className="pt-6">
        <button 
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${result.latitude},${result.longitude}`, '_blank')}
          className="w-full h-14 bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 group"
        >
          <MapPin size={16} />
          Extract to Maps Interface

        </button>
      </div>
    </motion.div>
  );
}
