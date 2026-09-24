import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';

export const CustomerVerification: React.FC = () => {
  const navigate = useNavigate();
  const { state, verifyJob, t, loc } = useApp();
  const worker = state.workers.find(w => w.id === state.currentJob?.workerId) || state.workers[0];

  const handleVerify = () => {
    verifyJob();
    navigate('/job-complete');
  };

  const handleReport = () => {
    alert("Issue reported. A cooperative grievance officer has been assigned to review.");
  };

  if (!state.currentJob) return null;

  return (
    <AnimatedPage className="min-h-screen bg-slate-50 flex flex-col p-4 pt-4 pb-16">
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto mb-2.5">
            <CheckCircle2 size={24} />
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">{t('serviceSignOffTitle')}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{t('inspectCompletedWork')}</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs space-y-3 mb-4">
          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
            <span className="text-slate-500">{t('serviceCategoryLabel')}</span>
            <span className="font-semibold text-slate-900">{loc(state.currentJob.title)}</span>
          </div>

          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
            <span className="text-slate-500">{t('assignedPartner')}</span>
            <span className="font-semibold text-slate-900">{loc(worker.name)}</span>
          </div>

          <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
            <span className="text-slate-500">{t('verified')} PIN</span>
            <span className="font-mono font-bold text-slate-900">✓ {state.currentJob.arrivalOtp || '4829'}</span>
          </div>

          {/* Checklist */}
          <div className="pt-1 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{t('taskExecutedSpec')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{t('worksiteCleaned')}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-900">
            <span>{t('settlementAmount')}</span>
            <span className="text-sm font-bold">₹{state.currentJob.budget}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mt-auto">
          <button
            onClick={handleVerify}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs shadow-xs transition active:scale-98"
          >
            {t('approveWorkReleasePayment')}
          </button>
          
          <button
            onClick={handleReport}
            className="w-full py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl font-medium text-xs hover:bg-slate-50 transition active:scale-98"
          >
            {t('reportIncompleteService')}
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
};
export default CustomerVerification;
