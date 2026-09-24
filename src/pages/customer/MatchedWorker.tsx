import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import WorkerCard from '../../components/WorkerCard';
import { Lock } from 'lucide-react';

export const MatchedWorker: React.FC = () => {
  const navigate = useNavigate();
  const { state, t } = useApp();
  const worker = state.workers.find(w => w.id === state.currentJob?.workerId) || state.workers[0];

  const highlights = [
    { label: t('verifiedPartnerItem'), desc: t('verifiedPartnerItemDesc') },
    { label: t('certifiedSkillItem'), desc: t('certifiedSkillItemDesc') },
    { label: t('transparentDispatchItem'), desc: t('transparentDispatchItemDesc') },
  ];

  return (
    <AnimatedPage className="min-h-screen bg-slate-50 flex flex-col p-4 pb-16 pt-4">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-tight">
            {t('timelineBookingConfirmed')}
          </span>
        </div>

        <div className="mb-3">
          <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">{t('partnerAssignedTitle')}</h1>
          <p className="text-xs text-slate-500">{t('partnerPreparingDispatch')}</p>
        </div>

        {/* Assigned Partner Profile Card */}
        {worker && (
          <div className="mb-3">
            <WorkerCard worker={worker} budget={state.currentJob?.budget || 450} />
            <div className="mt-2 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5 flex items-center justify-between text-[11px] text-emerald-800">
              <span className="flex items-center gap-1 font-medium">
                <Lock size={12} className="text-emerald-700" />
                {t('maskedCallSafetyBadge')}
              </span>
              <span className="font-mono font-bold">{worker.maskedPhone || '+91 080-6922-4829 Ext 118'}</span>
            </div>
          </div>
        )}

        {/* Credential Rationale */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs mb-6">
          <h3 className="text-xs font-bold text-slate-900 tracking-tight mb-3 flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-slate-900" />
            {t('verificationSafetySummary')}
          </h3>

          <div className="space-y-3">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-900 block leading-tight">{item.label}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proceed CTA */}
        <button
          onClick={() => navigate('/job-details')}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs shadow-xs flex items-center justify-center gap-1.5 mt-auto active:scale-98 transition"
        >
          <span>{t('trackLiveBookingBtn')}</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </AnimatedPage>
  );
};
export default MatchedWorker;
