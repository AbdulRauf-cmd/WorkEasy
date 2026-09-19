import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { useApp } from '../context/AppContext';
import { Check, KeyRound, Wrench, ShieldCheck } from 'lucide-react';
import TierBadge from '../components/TierBadge';
import LanguageSwitch from '../components/LanguageSwitch';

const Activity: React.FC = () => {
  const { state, t, loc } = useApp();
  
  return (
    <AnimatedPage className="pb-16 pt-3 px-4 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">{t('activityHistoryTitle')}</h1>
          <p className="text-xs text-slate-500">{t('liveAuditLog')}</p>
        </div>
        <LanguageSwitch />
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
        {state.currentJob ? (
          <div className="relative border-l border-slate-200 ml-2.5 pl-4 space-y-4 py-1">
            {/* Step 1: Posted */}
            <div className="relative">
              <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center">
                <Check size={10} strokeWidth={2.5} />
              </div>
              <p className="font-semibold text-xs text-slate-900">{t('timelineBookingPlaced')}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {loc(state.currentJob.title)} · {t('total')}: ₹{state.currentJob.budget}
              </p>
            </div>
            
            {/* Step 2: Classified */}
            {['classified', 'matched', 'accepted', 'worker_arrived', 'in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center">
                  <Check size={10} strokeWidth={2.5} />
                </div>
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-xs text-slate-900">{t('stepSkillAudit')}</p>
                  <TierBadge tier={state.currentJob.tier || 2} size="sm" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{t('stepSkillAuditDetail')}</p>
              </div>
            )}

            {/* Step 3: Worker Matched */}
            {['matched', 'accepted', 'worker_arrived', 'in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center">
                  <Check size={10} strokeWidth={2.5} />
                </div>
                <p className="font-semibold text-xs text-slate-900">{t('timelinePartnerAssigned')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t('autoDispatchDesc')}</p>
              </div>
            )}

            {/* Step 4: Worker Accepted */}
            {['accepted', 'worker_arrived', 'in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center">
                  <Check size={10} strokeWidth={2.5} />
                </div>
                <p className="font-semibold text-xs text-slate-900">{t('timelineBookingConfirmed')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t('workerOnWay')}</p>
              </div>
            )}

            {/* Step 5: Worker Arrived & OTP */}
            {['worker_arrived', 'in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-amber-500 text-white rounded-full flex items-center justify-center">
                  <KeyRound size={9} />
                </div>
                <p className="font-semibold text-xs text-slate-900">{t('timelinePartnerArrived')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Start PIN: <strong className="font-mono text-slate-900">{state.currentJob.arrivalOtp || '4829'}</strong>
                </p>
              </div>
            )}

            {/* Step 6: In Progress */}
            {['in_progress', 'completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  <Wrench size={9} />
                </div>
                <p className="font-semibold text-xs text-slate-900">{t('timelineServiceInProgress')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t('timelineServiceInProgressDetail')}</p>
              </div>
            )}

            {/* Step 7: Completed & Verified */}
            {['completed', 'verified'].includes(state.currentJob.status) && (
              <div className="relative">
                <div className="absolute -left-[21px] top-0.5 w-4 h-4 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                  <ShieldCheck size={9} />
                </div>
                <p className="font-semibold text-xs text-slate-900">{t('timelineServiceCompleted')}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t('timelinePaymentReleasedDetail')}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-400">
            <p className="text-xs">{t('noPastBookingsYet')}</p>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};
export default Activity;
