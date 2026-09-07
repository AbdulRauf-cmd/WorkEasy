import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import TierBadge from '../../components/TierBadge';
import { CheckCircle2, MapPin, Lock, ChevronRight, Navigation, ShieldCheck, Star } from 'lucide-react';

const WorkerHome: React.FC = () => {
  const { state, acceptJob } = useApp();
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
            <span>Coimbatore Hub</span>
          </div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">
            Partner: Ramesh Kumar
          </h1>
        </div>

        {/* Online / Offline Status Toggle */}
        <button 
          onClick={() => setIsOnline(!isOnline)}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            isOnline 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-slate-200 text-slate-600'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-600' : 'bg-slate-400'}`} />
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </button>
      </div>

      {/* Metrics Card */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-2xs mb-4">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <TierBadge tier={2} size="sm" />
            <span className="text-xs text-slate-600 font-medium">Plumbing Specialist</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            KYC Verified
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2.5 text-center">
          <div>
            <span className="text-sm font-bold text-slate-900 block">₹900</span>
            <span className="text-[10px] text-slate-400 font-medium">Today's Payout</span>
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 block">4.8 ★</span>
            <span className="text-[10px] text-slate-400 font-medium">Rating</span>
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 block">47</span>
            <span className="text-[10px] text-slate-400 font-medium">Completed</span>
          </div>
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
              Active Assignment
            </span>
            <h3 className="font-semibold text-xs text-white mt-0.5">{state.currentJob.title}</h3>
            <p className="text-[11px] text-slate-400">{state.customer.name} · ₹{state.currentJob.budget}</p>
          </div>
          <button className="bg-white text-slate-900 font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs active:scale-95 transition">
            Continue →
          </button>
        </div>
      )}

      {/* AVAILABLE DISPATCH REQUESTS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-xs font-bold text-slate-900 tracking-tight">Available Dispatch Requests</h2>
          <span className="text-[10px] text-slate-400">Round-Robin Queue</span>
        </div>

        {/* Dynamic Matched Request (from state) */}
        {state.currentJob && state.currentJob.status === 'matched' && (
          <div className="bg-white rounded-xl p-4 border-2 border-slate-900 shadow-xs">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-tight">
                  Direct Dispatch
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-1.5">{state.currentJob.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{state.customer.name} · {state.currentJob.location}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-900">₹{state.currentJob.budget}</span>
                <span className="text-[10px] text-slate-400 block">Est. Payout</span>
              </div>
            </div>

            <div className="flex items-center gap-2 my-2.5 text-xs text-slate-500">
              <TierBadge tier={state.currentJob.tier || 2} size="sm" />
              <span>·</span>
              <span className="flex items-center gap-1">
                <Navigation size={12} className="text-slate-400" /> 2.4 km away
              </span>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg mb-3 border border-slate-100">
              "{state.currentJob.description}"
            </p>

            <button
              onClick={handleAcceptJob}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-lg text-xs transition active:scale-98 shadow-xs"
            >
              Accept Booking (₹{state.currentJob.budget})
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
            <span className="text-[11px] text-slate-400">1.8 km away</span>
          </div>

          <button
            onClick={() => alert("Simulated: You accepted this job.")}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 rounded-lg text-xs transition active:scale-98"
          >
            Accept Booking
          </button>
        </div>

        {/* TUTORING & SHADOWING OPPORTUNITY CARD */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-4 shadow-sm space-y-2.5">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">
                Cooperative Tutoring Invitation
              </span>
            </div>
            <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">
              +4 Hours Credit
            </span>
          </div>

          <div>
            <h3 className="font-bold text-xs text-white">Shadow Master Arjun Raj on 3-Phase Industrial Panel</h3>
            <p className="text-[11px] text-slate-300 mt-0.5">
              On-site accompaniment at Gandhipuram. Earn 4 hours towards your Level 2 certification.
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-700/80 text-[10px] text-slate-400">
            <span>Stipend: ₹150 allowance</span>
            <button 
              onClick={() => alert("Tutoring session confirmed! You are registered to shadow Master Arjun Raj at 2:30 PM. 4 hours will be credited upon job sign-off.")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition active:scale-95 shadow-2xs"
            >
              Join Shadowing Visit
            </button>
          </div>
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
    </AnimatedPage>
  );
};

export default WorkerHome;
