import React from 'react';
import { Worker } from '../types';
import { Star, MapPin, CheckCircle2 } from 'lucide-react';
import TierBadge from './TierBadge';
import { useApp } from '../context/AppContext';

interface Props {
  worker: Worker;
  budget?: number;
  showActions?: boolean;
  onAccept?: () => void;
}

export default function WorkerCard({ worker, budget, showActions, onAccept }: Props) {
  const { t } = useApp();
  const initials = worker.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs">
      <div className="flex gap-3">
        {/* Partner Avatar with ID Badge */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm tracking-tight">
            {initials}
          </div>
          {worker.verified && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
            </div>
          )}
        </div>
        
        {/* Partner Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-slate-900 text-sm truncate">{worker.name}</h3>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-0.5 font-semibold text-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {worker.rating.toFixed(1)}
                </span>
                <span className="text-slate-300">·</span>
                <span>{worker.completedJobs} {t('completedJobsLabel')}</span>
                <span className="text-slate-300">·</span>
                <span>{worker.experience}y exp</span>
              </div>
            </div>
            
            {budget && (
              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-slate-900">₹{budget}</span>
                <span className="block text-[10px] text-slate-400 font-normal">{t('fixedPrice')}</span>
              </div>
            )}
          </div>
          
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
            <TierBadge tier={worker.tier} size="sm" />
            
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{worker.distance || '2.4'} km away</span>
            </div>
          </div>
        </div>
      </div>
      
      {showActions && onAccept && (
        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <button 
            onClick={onAccept}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg transition-colors text-xs flex items-center justify-center gap-1.5 active:scale-98"
          >
            <span>Assign & Confirm Booking</span>
          </button>
        </div>
      )}
    </div>
  );
}
