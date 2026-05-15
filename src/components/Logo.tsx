import React from 'react';

export default function Logo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center bg-white rounded-sm transition-transform group-hover:scale-110`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-2/3 h-2/3 text-black"
      >
        {/* Globe Outline */}
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        
        {/* Terrain/Logic lines */}
        <path d="M2 12h20" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M12 2v20" strokeWidth="1" strokeDasharray="2 2" />
        
        {/* Tactical Diamond */}
        <path
          d="M12 7l3 5-3 5-3-5z"
          fill="#10b981"
          stroke="#10b981"
          strokeWidth="1"
        />
        
        {/* Data points */}
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="18" cy="8" r="0.5" fill="#10b981" />
        <circle cx="6" cy="16" r="0.5" fill="#10b981" />
      </svg>
    </div>
  );
}
