import { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

const hasValidKey = 
  Boolean(API_KEY) && 
  API_KEY.length > 10 && 
  !API_KEY.includes('MY_GOOGLE_MAPS_KEY') && 
  !API_KEY.includes('YOUR_API_KEY');

interface LocationMapProps {
  latitude: number;
  longitude: number;
  locationName: string;
}

function MapHandler({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.panTo({ lat: latitude, lng: longitude });
      map.setZoom(12);
    }
  }, [map, latitude, longitude]);
  return null;
}

export default function LocationMap({ latitude, longitude, locationName }: LocationMapProps) {
  if (!hasValidKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#050505] p-8 text-center font-sans relative overflow-hidden border border-white/5">
        <div className="max-w-md space-y-8 relative z-10">
          <div className="w-16 h-16 bg-white/5 rounded-sm flex items-center justify-center text-red-500 mx-auto border border-white/5">
            <Globe size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white tracking-tighter uppercase">Interface Locked</h2>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">
              A valid <span className="text-white font-bold">Google Maps API Key</span> is required.
            </p>
          </div>
          
          <div className="text-left bg-black border border-white/5 p-6 space-y-4">
            <p className="text-label text-emerald-500">Security Protocols:</p>
            <ol className="list-decimal list-inside text-[10px] text-slate-500 space-y-3 font-mono uppercase tracking-tight">
              <li>Visit <a href="https://console.cloud.google.com/google/maps-apis/credentials" target="_blank" rel="noreferrer" className="text-white underline hover:text-emerald-400">Cloud Console</a></li>
              <li>Enable <span className="text-white">Maps JavaScript API</span></li>
              <li>Add <span className="text-white">GOOGLE_MAPS_PLATFORM_KEY</span> to Secrets</li>
            </ol>
          </div>
          
          <div className="pt-4 text-[9px] text-slate-700 font-mono uppercase tracking-[0.2em]">
            Status: Unauthorized_Access_Vector
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={12}
          mapId="TERRALOGIC_MAP"
          className="h-full w-full"
        >
          <AdvancedMarker position={{ lat: latitude, lng: longitude }} title={locationName}>
            <Pin background="#10b981" glyphColor="#fff" borderColor="#000" />
          </AdvancedMarker>
          <MapHandler latitude={latitude} longitude={longitude} />
        </Map>
      </APIProvider>
    </div>
  );
}
