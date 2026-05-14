import React, { useCallback, useState } from 'react';
import { Upload, FileImage, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export default function UploadZone({ onUpload, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  }, [onUpload]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`relative h-96 w-full border border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-8 group cursor-pointer overflow-hidden ${
        isDragging 
          ? 'border-emerald-500 bg-emerald-500/5' 
          : 'border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/20'
      } ${isLoading ? 'pointer-events-none' : ''}`}
      onClick={() => !isLoading && document.getElementById('file-upload')?.click()}
    >
      {/* Background Pulse during drag */}
      <AnimatePresence>
        {isDragging && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onFileSelect}
      />

      {isLoading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-emerald-500/20 rounded-full" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full"
            />
          </div>
          <p className="text-[10px] font-mono tracking-widest text-emerald-500 uppercase animate-pulse">
            Extracting Signal_Metadata...
          </p>
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
              <Upload size={20} />
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              {isDragging ? 'Release to Scan' : 'Drop Intelligence Mesh'}
            </p>
            <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">
              Supports JPEG, PNG, WEBP (MAX 10MB)
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 mt-2">
            <ShieldCheck size={10} className="text-emerald-500" />
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
        </>
      )}
    </div>
  );
}
