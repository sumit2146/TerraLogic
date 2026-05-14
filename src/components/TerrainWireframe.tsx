import { motion } from 'framer-motion';

export default function TerrainWireframe() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-700">
      <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grid-grad-v2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Horizontal Lines */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.path
            key={`h-${i}`}
            d={`M 0 ${i * 16} Q 400 ${i * 16 - 8 + Math.sin(i) * 15} 800 ${i * 16}`}
            stroke="url(#grid-grad-v2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.8,
              d: [
                `M 0 ${i * 16} Q 400 ${i * 16 - 8 + Math.sin(i) * 15} 800 ${i * 16}`,
                `M 0 ${i * 16} Q 400 ${i * 16 + 8 + Math.cos(i) * 15} 800 ${i * 16}`,
                `M 0 ${i * 16} Q 400 ${i * 16 - 8 + Math.sin(i) * 15} 800 ${i * 16}`
              ]
            }}
            transition={{ 
              duration: 6 + Math.random() * 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}

        {/* Vertical Lines */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.path
            key={`v-${i}`}
            d={`M ${i * 16} 0 Q ${i * 16 + 8} 200 ${i * 16} 400`}
            stroke="url(#grid-grad-v2)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.4,
              d: [
                `M ${i * 16} 0 Q ${i * 16 + 8 + Math.sin(i) * 8} 200 ${i * 16} 400`,
                `M ${i * 16} 0 Q ${i * 16 - 8 + Math.cos(i) * 8} 200 ${i * 16} 400`,
                `M ${i * 16} 0 Q ${i * 16 + 8 + Math.sin(i) * 8} 200 ${i * 16} 400`
              ]
            }}
            transition={{ 
              duration: 9 + Math.random() * 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </svg>
      
      {/* HUD Scanning Line */}
      <motion.div 
        className="absolute inset-x-0 h-[1px] bg-emerald-500/20"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
