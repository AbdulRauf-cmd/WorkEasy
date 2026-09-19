import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import TierBadge from '../../components/TierBadge';
import LanguageSwitch from '../../components/LanguageSwitch';
import { Check, Loader2 } from 'lucide-react';

export const JobClassification: React.FC = () => {
  const navigate = useNavigate();
  const { state, classifyJob, matchWorker, t } = useApp();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runSequence = async () => {
      // 1. Request posted
      await new Promise(r => setTimeout(r, 400));
      setStep(1);
      
      // 2. Checking requirements
      await new Promise(r => setTimeout(r, 550));
      setStep(2);
      classifyJob();
      
      // 3. Tier identified
      await new Promise(r => setTimeout(r, 550));
      setStep(3);
      
      // 4. Finding workers
      await new Promise(r => setTimeout(r, 650));
      setStep(4);
      matchWorker();

      // Complete
      await new Promise(r => setTimeout(r, 1000));
      navigate('/matched-worker');
    };

    runSequence();
  }, [classifyJob, matchWorker, navigate]);

  const items = [
    { label: t('stepBookingRegistered'), detail: t('stepBookingRegisteredDetail') },
    { label: t('stepSkillAudit'), detail: t('stepSkillAuditDetail') },
    { label: t('stepAccreditationTier'), detail: t('stepAccreditationTierDetail') },
    { label: t('stepPartnerAllocation'), detail: t('stepPartnerAllocationDetail') },
  ];

  return (
    <AnimatedPage className="min-h-screen bg-slate-50 flex flex-col justify-center px-4 py-8">
      <div className="max-w-sm mx-auto w-full">
        {/* Language Switch */}
        <div className="flex justify-end mb-3">
          <LanguageSwitch />
        </div>

        {/* Loading Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Loader2 size={20} className="animate-spin" />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">{t('matchingCertifiedPro')}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{t('auditingSafetyAvailability')}</p>
        </div>

        {/* Verification Checklist */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs space-y-3 mb-4">
          {items.map((item, idx) => {
            const isDone = step > idx;
            const isCurrent = step === idx;

            return (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                      <Check size={12} strokeWidth={2.5} />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border border-blue-600 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center" />
                  )}
                </div>

                <div>
                  <span className={`text-xs font-semibold block leading-tight ${isDone || isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {item.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Level Qualification Card */}
        {step >= 3 && (
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-center shadow-2xs">
            <div className="flex justify-center mb-2">
              <TierBadge tier={state.currentJob?.tier || 2} size="md" />
            </div>
            <p className="text-xs font-medium text-slate-700">
              {t('stepAccreditationTierDetail')}
            </p>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};
export default JobClassification;
