import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import TierBadge from '../../components/TierBadge';
import { Plus, KeyRound } from 'lucide-react';

const CustomerJobs: React.FC = () => {
  const { state, t, loc } = useApp();
  const navigate = useNavigate();

  return (
    <AnimatedPage className="pb-16 pt-3 px-4 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-base font-bold text-slate-900 tracking-tight">{t('orders')}</h1>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => navigate('/post-job')}
            className="text-xs font-semibold text-slate-900 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1 shadow-2xs hover:bg-slate-50 transition active:scale-95"
          >
            <Plus size={14} /> {t('bookAService')}
          </button>
        </div>
      </div>

      {state.currentJob ? (
        <div className="mb-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block mb-1.5">
            {t('activeBooking')}
          </span>
          <div 
            onClick={() => navigate('/job-details')}
            className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs cursor-pointer hover:border-slate-300 transition"
          >
            {state.currentJob.status === 'worker_arrived' && (
              <div className="bg-amber-50 text-amber-900 text-[11px] font-semibold px-2.5 py-1 rounded-md mb-2 flex items-center justify-between border border-amber-200">
                <span className="flex items-center gap-1">
                  <KeyRound size={12} className="text-amber-700" /> Start PIN: {state.currentJob.arrivalOtp || '4829'}
                </span>
                <span className="text-[10px] underline">{t('track')} →</span>
              </div>
            )}

            <div className="flex justify-between items-start mb-1.5">
              <div>
                <h3 className="font-semibold text-xs text-slate-900">{loc(state.currentJob.title)}</h3>
                <span className="text-[11px] text-slate-500">{loc(state.currentJob.service)}</span>
              </div>
              <span className="text-xs font-bold text-slate-900">₹{state.currentJob.budget}</span>
            </div>
            
            <p className="text-xs text-slate-600 mb-2.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
              {loc(state.currentJob.description)}
            </p>
            
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[11px]">
              <TierBadge tier={state.currentJob.tier || 1} size="sm" />
              <span className="text-slate-500 font-medium capitalize">
                {t('status')}: {loc(state.currentJob.status)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-5 text-center p-6 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-xs text-slate-500">{t('noActiveBookingDesc')}</p>
          <button 
            onClick={() => navigate('/post-job')}
            className="mt-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
          >
            {t('bookAService')}
          </button>
        </div>
      )}

      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block mb-2">
          {t('activityHistoryTitle')}
        </span>
        <div className="space-y-2">
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xs text-slate-900">{loc('Ceiling Fan Sparking & Bearing Noise')}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{loc('Arjun Raj')} · {loc('Electrical')}</p>
              </div>
              <span className="text-xs font-bold text-slate-900">₹350</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-2 flex justify-between items-center border-t border-slate-100 pt-1.5">
              <span>{t('timelineServiceCompleted')}</span>
              <span className="text-emerald-700 font-medium">✓ {t('timelinePaymentReleased')}</span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xs text-slate-900">{loc('Full House Deep Cleaning')}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{loc('Meena Devi')} · {loc('Cleaning')}</p>
              </div>
              <span className="text-xs font-bold text-slate-900">₹1,200</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-2 flex justify-between items-center border-t border-slate-100 pt-1.5">
              <span>{t('timelineServiceCompleted')}</span>
              <span className="text-emerald-700 font-medium">✓ {t('timelinePaymentReleased')}</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
export default CustomerJobs;
