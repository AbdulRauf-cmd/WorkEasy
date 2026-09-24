import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import TierBadge from '../../components/TierBadge';
import AreaDemandForecast from '../../components/AreaDemandForecast';
import { Lock, Navigation, TrendingUp } from 'lucide-react';

const WorkerHome: React.FC = () => {
  const { state, acceptJob, t, loc } = useApp();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const handleAcceptJob = () => {
    acceptJob();
    navigate('/worker/active-job');
  };

  return (
    <AnimatedPage className="pb-16 px-4 pt-4 bg-slate-50 min-h-screen">
      {/* Partner Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{t('workerHub')}</span>
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">
            {loc('Ramesh Kumar')}
          </h1>
        </div>

        {/* Online / Offline Status Toggle */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 transition-all ${
              isOnline 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-slate-200 text-slate-600'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-600' : 'bg-slate-400'}`} />
            <span>{isOnline ? t('onlineStatus') : t('offlineStatus')}</span>
          </button>
        </div>
      </div>

      {/* Metrics Card */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs mb-4">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <TierBadge tier={2} size="sm" />
            <span className="text-xs text-slate-600 font-medium">{t('plumbing')}</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            {t('verified')}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2.5 text-center">
          <div>
            <span className="text-sm font-bold text-slate-900 block">₹900</span>
            <span className="text-[10px] text-slate-400 font-medium">{t('todaysPayout')}</span>
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 block">4.8 ★</span>
            <span className="text-[10px] text-slate-400 font-medium">{t('ratingLabel')}</span>
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 block">47</span>
            <span className="text-[10px] text-slate-400 font-medium">{t('completedJobsLabel')}</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 text-center">
          <p className="text-[10px] text-emerald-700 font-medium">
            {t('zeroCommissionKeep100')}
          </p>
        </div>
      </div>

      {/* ACTIVE IN-PROGRESS JOB BANNER */}
      {state.currentJob && ['accepted', 'worker_arrived', 'in_progress'].includes(state.currentJob.status) && (
        <div
          className="bg-slate-900 text-white rounded-xl p-3.5 shadow-sm mb-4 flex items-center justify-between cursor-pointer"
          onClick={() => navigate('/worker/active-job')}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-tight text-emerald-400">
              {t('activeAssignment')}
            </span>
            <h3 className="font-semibold text-xs text-white mt-0.5">{loc(state.currentJob.title)}</h3>
            <p className="text-[11px] text-slate-400">{loc(state.customer.name)} · ₹{state.currentJob.budget}</p>
          </div>
          <button className="bg-white text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs active:scale-95 transition">
            {t('continueActiveAssignment')}
          </button>
        </div>
      )}

      {/* AVAILABLE DISPATCH REQUESTS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-xs font-bold text-slate-900 tracking-tight">{t('availableDispatchRequests')}</h2>
          <span className="text-[10px] text-slate-400">{t('roundRobinQueue')}</span>
        </div>

        {/* Dynamic Matched Request (from state) */}
        {state.currentJob && state.currentJob.status === 'matched' && (
          <div className="bg-white rounded-xl p-4 border-2 border-slate-900 shadow-xs">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-tight">
                  {t('autoDispatchTitle')}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-1.5">{loc(state.currentJob.title)}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{loc(state.customer.name)} · {loc(state.currentJob.location)}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-900">₹{state.currentJob.budget}</span>
                <span className="text-[10px] text-slate-400 block">{t('fixedPrice')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 my-2.5 text-xs text-slate-500">
              <TierBadge tier={state.currentJob.tier || 2} size="sm" />
              <span>·</span>
              <span className="flex items-center gap-1">
                <Navigation size={12} className="text-slate-400" /> 2.4 km
              </span>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg mb-3 border border-slate-100">
              "{state.currentJob.description}"
            </p>

            <button
              onClick={handleAcceptJob}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg text-xs transition active:scale-98 shadow-xs"
            >
              {t('acceptDispatchBtn')} (₹{state.currentJob.budget})
            </button>
          </div>
        )}

        {/* Other Regular Job */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs">
          <div className="flex justify-between items-start mb-1.5">
            <div>
              <h3 className="font-semibold text-xs text-slate-900">Garden Maintenance & Hedge Trimming</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Meera Nair · RS Puram, Coimbatore</p>
            </div>
            <span className="text-xs font-bold text-slate-900">₹300</span>
          </div>

          <div className="flex items-center gap-2 mb-2.5">
            <TierBadge tier={1} size="sm" />
            <span className="text-[11px] text-slate-400">1.8 km</span>
          </div>

          <button
            onClick={() => alert("Simulated: You accepted this job.")}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 rounded-lg text-xs transition active:scale-98"
          >
            {t('acceptDispatchBtn')}
          </button>
        </div>

        {/* Competency Gate Locked Job */}
        <div className="bg-slate-100/70 rounded-xl p-3.5 border border-dashed border-slate-300 opacity-75">
          <div className="flex justify-between items-start mb-1.5">
            <div className="flex items-center gap-1.5">
              <h3 className="font-medium text-xs text-slate-700">Commercial Gas Pipe Inspection</h3>
              <span className="text-[10px] bg-rose-50 text-rose-800 font-semibold px-1.5 py-0.2 rounded border border-rose-200 flex items-center gap-1">
                <Lock size={10} /> Tier 3 Required
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">₹1,200</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <TierBadge tier={3} size="sm" />
            <span className="text-[11px] text-slate-400">Commercial Sector</span>
          </div>

          <p className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200">
            Prerequisite: Level 3 Gas Certification. Complete the cooperative tutoring apprenticeship to unlock.
          </p>
        </div>
      </div>

      {/* LOCALITY DEMAND FORECAST & SURGE HEATMAP */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2 px-0.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={14} className="text-slate-800" />
            <h2 className="text-xs font-bold text-slate-900 tracking-tight">{t('demandForecastingTitle')}</h2>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {t('workerCommissionZero')}
          </span>
        </div>
        <AreaDemandForecast />
      </div>
    </AnimatedPage>
  );
};

export default WorkerHome;
