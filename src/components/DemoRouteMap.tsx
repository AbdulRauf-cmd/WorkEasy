import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Bike, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  workerName: string;
  workerSkill: string;
  customerLocation: string;
  distanceKm?: number;
  compact?: boolean;
}

export const DemoRouteMap: React.FC<Props> = ({
  workerName,
  workerSkill,
  customerLocation,
  distanceKm = 2.4,
  compact = false,
}) => {
  const { t, loc } = useApp();
  const [progress, setProgress] = useState(0.25); // 0 (origin) to 1 (destination)
  const [isSimulating, setIsSimulating] = useState(true);

  // Smooth movement simulation along route
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 0.95) return 0.2; // loop back for continuous demo
        return prev + 0.05;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Route path coordinates in SVG viewBox (400 x 220)
  // Origin (Gandhipuram Hub): (60, 45)
  // Waypoint 1: (150, 60)
  // Waypoint 2: (210, 130)
  // Destination (Customer): (340, 175)
  
  // Interpolated worker marker position based on progress
  const getCoordinates = (p: number) => {
    if (p < 0.35) {
      const segP = p / 0.35;
      return {
        x: 60 + segP * (150 - 60),
        y: 45 + segP * (60 - 45),
      };
    } else if (p < 0.7) {
      const segP = (p - 0.35) / 0.35;
      return {
        x: 150 + segP * (210 - 150),
        y: 60 + segP * (130 - 60),
      };
    } else {
      const segP = (p - 0.7) / 0.3;
      return {
        x: 210 + segP * (340 - 210),
        y: 130 + segP * (175 - 130),
      };
    }
  };

  const markerPos = getCoordinates(progress);
  const remainingDist = Math.max(0.2, Number((distanceKm * (1 - progress * 0.8)).toFixed(1))).toFixed(1);
  const etaMinutes = Math.max(2, Math.round(Number(remainingDist) * 3.5));

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-800 text-white relative">
      {/* Map Header Overlay */}
      <div className="p-3 bg-slate-900/90 backdrop-blur-xs flex items-center justify-between border-b border-slate-800 z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Navigation size={12} className="animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{loc(workerName)}</span>
              <span className="text-[10px] text-emerald-400 font-normal">({loc(workerSkill)})</span>
            </h4>
            <p className="text-[10px] text-slate-400">
              {t('dispatchingFrom')}: <strong className="text-slate-200">Gandhipuram Hub</strong>
            </p>
          </div>
        </div>

        {/* Floating ETA Badge */}
        <div className="text-right">
          <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full inline-block font-mono">
            ~{etaMinutes} min ({remainingDist} km)
          </span>
          <span className="text-[9px] text-slate-400 block mt-0.5">{t('onTheWay')}</span>
        </div>
      </div>

      {/* SVG Canvas Map Display */}
      <div className={`relative bg-[#0f172a] ${compact ? 'h-44' : 'h-52'} overflow-hidden select-none`}>
        <svg viewBox="0 0 400 220" className="w-full h-full">
          {/* Subtle Map Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.75" />
            </pattern>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <rect width="400" height="220" fill="url(#grid)" />

          {/* Simulated Roads / City Layout */}
          <path d="M 0 50 Q 120 70 200 40 T 400 60" fill="none" stroke="#334155" strokeWidth="8" opacity="0.4" />
          <path d="M 50 0 L 150 220" fill="none" stroke="#334155" strokeWidth="6" opacity="0.3" />
          <path d="M 210 0 L 210 220" fill="none" stroke="#334155" strokeWidth="7" opacity="0.3" />
          <path d="M 120 220 Q 250 140 400 180" fill="none" stroke="#334155" strokeWidth="8" opacity="0.4" />

          {/* Road Labels */}
          <text x="75" y="32" fill="#64748b" fontSize="8" fontWeight="600">Cross Cut Rd</text>
          <text x="215" y="95" fill="#64748b" fontSize="8" fontWeight="600">Avinashi Road</text>
          <text x="280" y="160" fill="#64748b" fontSize="8" fontWeight="600">Peelamedu Main</text>

          {/* Route Guideline (Grey Background Track) */}
          <path
            d="M 60 45 Q 110 55 150 60 T 210 130 T 340 175"
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Active Highlighted Route Path */}
          <path
            d="M 60 45 Q 110 55 150 60 T 210 130 T 340 175"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            strokeDasharray="6 4"
            strokeLinecap="round"
            className="animate-pulse"
          />

          {/* ORIGIN PIN: Gandhipuram Worker Hub */}
          <g transform="translate(60, 45)">
            <circle r="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <circle r="5" fill="#10b981" />
            <text x="-25" y="-14" fill="#a7f3d0" fontSize="8.5" fontWeight="bold">Gandhipuram</text>
          </g>

          {/* DESTINATION PIN: Customer Doorstep */}
          <g transform="translate(340, 175)">
            <circle r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <circle r="6" fill="#38bdf8" />
            <text x="-32" y="24" fill="#bae6fd" fontSize="8.5" fontWeight="bold">
              {loc(customerLocation)}
            </text>
          </g>

          {/* LIVE MOVING WORKER MARKER */}
          <g transform={`translate(${markerPos.x}, ${markerPos.y})`}>
            {/* Pulsing Radar Ring */}
            <circle r="16" fill="#10b981" opacity="0.25">
              <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Center Bike Circle */}
            <circle r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <text x="-4" y="3.5" fill="#ffffff" fontSize="9" fontWeight="bold">🛵</text>
          </g>
        </svg>

        {/* Live GPS Telemetry Overlay Pill */}
        <div className="absolute bottom-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs border border-slate-700/80 rounded-lg px-2 py-1 flex items-center gap-1.5 text-[9px] text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono">GPS: 11.0168° N, 76.9558° E</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-300 font-semibold">{t('speedNormal')} (28 km/h)</span>
        </div>

        {/* Simulation Toggle */}
        <button
          onClick={() => setIsSimulating(!isSimulating)}
          className="absolute bottom-2.5 right-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded text-[9px] font-semibold border border-slate-700 flex items-center gap-1 transition"
          title="Toggle Movement Animation"
        >
          <Compass size={10} className={isSimulating ? 'text-emerald-400' : 'text-slate-500'} />
          <span>{isSimulating ? 'Live Tracking' : 'Paused'}</span>
        </button>
      </div>

      {/* Footer Banner */}
      <div className="px-3 py-2 bg-slate-950 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800">
        <div className="flex items-center gap-1 text-slate-300">
          <Bike size={13} className="text-emerald-400" />
          <span>{loc(workerName)} {t('enRouteCustomer')}</span>
        </div>
        <span className="text-slate-500 text-[9px] font-medium">WorkEasy Fleet Relay</span>
      </div>
    </div>
  );
};

export default DemoRouteMap;
