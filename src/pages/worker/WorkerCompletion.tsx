import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import { Camera, Clock, ChevronRight } from 'lucide-react';

const WorkerCompletion: React.FC = () => {
  const { state, completeJob, t } = useApp();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    completeJob();
    setSubmitted(true);
  };

  return (
    <AnimatedPage className="pb-16 pt-4 px-4 bg-slate-50 min-h-screen flex flex-col items-center">
      {!submitted ? (
        <div className="w-full max-w-sm flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-base font-bold text-slate-900 tracking-tight">{t('markTaskComplete')}</h1>
            <p className="text-xs text-slate-500">{t('inspectCompletedWork')}</p>
          </div>

          {/* Job Details Card */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs mb-3.5 space-y-2.5">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
              <span className="text-slate-500">{t('serviceCategoryLabel')}</span>
              <span className="font-semibold text-slate-900">{state.currentJob?.title || 'Tap Leakage Repair'}</span>
            </div>

            <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
              <span className="text-slate-500">{t('roleCustomer')}</span>
              <span className="font-semibold text-slate-900">{state.customer.name}</span>
            </div>

            <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100">
              <span className="text-slate-500">{t('verified')} PIN</span>
              <span className="font-mono font-bold text-slate-900">✓ {state.currentJob?.arrivalOtp || '4829'}</span>
            </div>

            <div className="flex justify-between items-center text-xs pt-1 font-bold text-slate-900">
              <span>{t('settlementAmount')}</span>
              <span className="text-sm font-bold text-emerald-700">₹{state.currentJob?.budget || 450}</span>
            </div>
          </div>

          {/* Photo attachment */}
          <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <Camera size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">{t('captureAfterPhoto')}</p>
                <p className="text-[10px] text-emerald-700 font-medium">Worksite photo attached</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {t('done')}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl text-xs shadow-xs flex items-center justify-center gap-1.5 transition active:scale-98 mt-auto"
          >
            <span>{t('markTaskComplete')}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm text-center flex flex-col items-center pt-8 flex-1">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <Clock size={24} />
          </div>
          
          <h2 className="text-base font-bold text-slate-900 tracking-tight mb-1">{t('timelineServiceCompleted')}</h2>
          <p className="text-xs text-slate-500 mb-6 max-w-xs leading-normal">
            {state.customer.name} received notification. Payout ₹{state.currentJob?.budget || 450} {t('timelinePaymentReleasedDetail')}.
          </p>

          <div className="space-y-2 w-full mt-auto">
            <button
              onClick={() => navigate('/worker/active-job')}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs shadow-xs transition active:scale-98"
            >
              {t('activeAssignment')}
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-2.5 bg-white text-slate-700 border border-slate-200 font-medium rounded-xl text-xs hover:bg-slate-50 transition active:scale-98"
            >
              {t('home')}
            </button>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default WorkerCompletion;
