import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { useApp } from '../context/AppContext';
import { Clock3, Check, KeyRound, Wrench, ShieldCheck } from 'lucide-react';
import TierBadge from '../components/TierBadge';

const Activity: React.FC = () => {
  const { state } = useApp();
  
  return (
    <AnimatedPage className="pb-16 pt-4 px-4 bg-slate-50 min-h-screen">
      <div className="mb-3">
        <h1 className="text-base font-bold text-slate-900 tracking-tight">Audit & Activity Log</h1>
        <p className="text-xs text-slate-500">Real-time cooperative event stream</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
        {state.currentJob ? (
          <div className="relative border-l border-slate-200 ml-2.5 pl-4 space-y-4 py-1">
            {/* Step 1: Posted */}
            <div className="relative">
              <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center">
                <Check size={10} strokeWidth={2.5} />
              </div>
              <p className="font-semibold text-xs text-slate-900">Service Request Created</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {state.currentJob.title} · Fixed Escrow: ₹{state.currentJob.budget}
              </p>
            </div>
            
            {/* Step 2: Classified */}
            {['classified', 'matched', 'accepted', 'worker_arrived', 'in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center">
                  <Check size={10} strokeWidth={2.5} />
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-xs text-slate-900">Skill Level Audited</p>
                  <TierBadge tier={state.currentJob.tier || 2} size="sm" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Classified according to cooperative technical guidelines.</p>
              </div>
            )}

            {/* Step 3: Worker Matched */}
            {['matched', 'accepted', 'worker_arrived', 'in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center">
                  <Check size={10} strokeWidth={2.5} />
                </div>
                <p className="font-semibold text-xs text-slate-900">Partner Assigned</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Ramesh Kumar dispatched via rotation algorithm.</p>
              </div>
            )}

            {/* Step 4: Worker Accepted */}
            {['accepted', 'worker_arrived', 'in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center">
                  <Check size={10} strokeWidth={2.5} />
                </div>
                <p className="font-semibold text-xs text-slate-900">Partner En Route</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Dispatch acknowledged and verified.</p>
              </div>
            )}

            {/* Step 5: Worker Arrived & OTP */}
            {['worker_arrived', 'in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-amber-500 text-white rounded-full flex items-center justify-center">
                  <KeyRound size={9} />
                </div>
                <p className="font-semibold text-xs text-slate-900">Arrival & Security Handshake</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Start PIN generated: <strong className="font-mono text-slate-900">{state.currentJob.arrivalOtp || '4829'}</strong>
                </p>
              </div>
            )}

            {/* Step 6: In Progress */}
            {['in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  <Wrench size={9} />
                </div>
                <p className="font-semibold text-xs text-slate-900">PIN Verified & Work Started</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Professional is actively working on site.</p>
              </div>
            )}

            {/* Step 7: Completed & Verified */}
            {['completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                  <ShieldCheck size={9} />
                </div>
                <p className="font-semibold text-xs text-slate-900">Service Finished & Inspected</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Completion sign-off completed.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-400">
            <Clock3 size={24} className="mx-auto mb-1.5 opacity-40" />
            <p className="text-xs">No active order events.</p>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Activity;
