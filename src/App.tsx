import { useState, useEffect } from 'react';
import { Layers, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadZone from './components/UploadZone.tsx';
import AnalysisPanel from './components/AnalysisPanel.tsx';
import LocationMap from './components/Map.tsx';
import TerrainWireframe from './components/TerrainWireframe.tsx';
import GlobalBackground from './components/GlobalBackground.tsx';
import { estimateLocation, type GeolocationResult } from './lib/gemini.ts';

export default function App() {
  const [result, setResult] = useState<GeolocationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("Gemini API key is missing.");
      }
      const base64 = await fileToBase64(file);
      const output = await estimateLocation(base64, file.type);
      setResult(output);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = typeof reader.result === 'string' ? reader.result.split(',')[1] : '';
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden flex flex-col">
      {/* Background Depth Effects */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-emerald-500/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      {/* Header Bar */}
      <nav className="h-16 border-b border-white/5 px-8 flex items-center justify-between relative z-50 bg-[#050505]/40 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setResult(null)}>
            <div className="w-9 h-9 bg-white text-black flex items-center justify-center rounded-sm transition-transform group-hover:rotate-90">
              <Layers size={18} />
            </div>
            <h1 className="font-bold text-lg tracking-tighter text-white uppercase">Terra<span className="text-emerald-500">Logic</span></h1>
          </div>

        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 text-[10px] font-mono text-slate-500">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                NETWORK_ACTIVE
             </div>
             <span>{systemTime}</span>
          </div>

        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Controls & Analysis */}
        <div className={`w-full lg:w-1/2 border-r border-white/5 flex flex-col bg-[#080808] relative z-20 ${result ? 'overflow-y-auto custom-scrollbar' : 'overflow-hidden'}`}>
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="landing"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-title leading-[0.9]">Spatial<br/><span className="text-emerald-500/50">Discovery</span></h2>

                </div>

                <div className="space-y-8">
                  <div className="glass-panel p-6 relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                    <UploadZone onUpload={handleUpload} isLoading={isAnalyzing} />
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono"
                    >
                      [!] FAILED: {error}
                    </motion.div>
                  )}
                </div>


              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-10 space-y-8"
              >
                <button 
                  onClick={() => setResult(null)}
                  className="flex items-center gap-2 text-label hover:text-emerald-400 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Reset System
                </button>


                
                <AnalysisPanel result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Visualizer */}
        <div className="flex-1 relative bg-black/20">
          <div className="absolute inset-0 z-0 opacity-80">
            <GlobalBackground />
          </div>
          
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="absolute inset-0 z-10 p-8"
              >
                <div className="w-full h-full glass-panel rounded-lg overflow-hidden relative shadow-2xl">
                  <LocationMap 
                    latitude={result.latitude} 
                    longitude={result.longitude} 
                    locationName={result.locationName} 
                  />
                  <div className="absolute inset-0 pointer-events-none border border-white/5" />
                  <TerrainWireframe />
                  
                  <div className="absolute top-6 right-6 z-10">
                    <div className="glass-panel px-4 py-2 text-[10px] font-mono text-emerald-400">
                      SYNC: {result.latitude.toFixed(4)}, {result.longitude.toFixed(4)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

