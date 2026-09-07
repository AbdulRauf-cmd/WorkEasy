import React from 'react';
import { JobStatus } from '../types';
import { Check, Clock3 } from 'lucide-react';

interface Props {
  currentStatus: JobStatus;
}

interface StatusItem {
  id: JobStatus;
  label: string;
  detail: string;
}

const statusOrder: StatusItem[] = [
  { id: 'posted', label: 'Booking Placed', detail: 'Service request submitted' },
  { id: 'matched', label: 'Partner Assigned', detail: 'Verified professional selected' },
  { id: 'accepted', label: 'Booking Confirmed', detail: 'Partner en route to location' },
  { id: 'worker_arrived', label: 'Partner Arrived (PIN Verification)', detail: 'Verification required to begin work' },
  { id: 'in_progress', label: 'Service in Progress', detail: 'Work actively being performed' },
  { id: 'completed', label: 'Service Completed', detail: 'Partner submitted final sign-off' },
  { id: 'verified', label: 'Payment Released', detail: 'Quality verified & payment settled' },
];

export default function StatusTimeline({ currentStatus }: Props) {
  const currentIndex = statusOrder.findIndex(s => s.id === currentStatus);
  const normalizedIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="py-1">
      {statusOrder.map((status, index) => {
        const isCompleted = index < normalizedIndex || (currentStatus === 'verified' && index === statusOrder.length - 1);
        const isCurrent = index === normalizedIndex && currentStatus !== 'verified';
        const isLast = index === statusOrder.length - 1;

        return (
          <div key={status.id} className="relative flex gap-3">
            {/* Vertical connector line */}
            {!isLast && (
              <div 
                className={`absolute left-[11px] top-5 bottom-[-4px] w-0.5 transition-colors ${
                  isCompleted ? 'bg-slate-900' : 'bg-slate-200'
                }`} 
              />
            )}
            
            {/* Dot / Icon */}
            <div className="relative flex flex-col items-center mt-1 z-10">
              {isCompleted ? (
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                </div>
              ) : isCurrent ? (
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border border-slate-200 bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="pb-4 pt-0.5 flex-1">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold tracking-tight ${
                  isCompleted ? 'text-slate-900' : 
                  isCurrent ? 'text-blue-700 font-bold' : 
                  'text-slate-400 font-normal'
                }`}>
                  {status.label}
                </span>

                {isCurrent && (
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    In Progress
                  </span>
                )}
              </div>
              
              <p className={`text-[11px] mt-0.5 ${
                isCompleted ? 'text-slate-500' :
                isCurrent ? 'text-slate-600 font-medium' :
                'text-slate-400'
              }`}>
                {status.id === 'worker_arrived' && isCurrent 
                  ? 'Share 4-digit PIN with partner at your door'
                  : status.detail}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
