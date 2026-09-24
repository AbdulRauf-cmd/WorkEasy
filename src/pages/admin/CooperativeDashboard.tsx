import React, { useState } from 'react';
import AnimatedPage from '../../components/AnimatedPage';
import TierBadge from '../../components/TierBadge';
import { Users, Briefcase, CheckSquare, CheckCircle2, ShieldCheck, RefreshCw, Award, Globe, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import LanguageSwitch from '../../components/LanguageSwitch';
import AreaDemandForecast from '../../components/AreaDemandForecast';

const CooperativeDashboard: React.FC = () => {
  const { t } = useApp();
  const [reviewed, setReviewed] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<'approve' | 'reject' | null>(null);

  const handleReview = (status: 'approve' | 'reject') => {
    setReviewStatus(status);
    setReviewed(true);
  };

  const resetReview = () => {
    setReviewed(false);
    setReviewStatus(null);
  };

  return (
    <AnimatedPage className="pb-16 pt-4 px-4 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Console</span>
          <h1 className="text-base font-bold text-slate-900 tracking-tight mt-0.5">{t('cooperativeGovernance')}</h1>
        </div>

        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
          <ShieldCheck size={16} />
        </div>
      </div>

      {/* Language Switch Card */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-2xs mb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-slate-700" />
          <span className="text-xs font-bold text-slate-900">{t('languageSelection')}</span>
        </div>
        <LanguageSwitch />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs text-center">
          <span className="text-sm font-bold text-slate-900 block">4</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('activePartnersMetric')}</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs text-center">
          <span className="text-sm font-bold text-slate-900 block">1</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('activeBooking')}</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs text-center">
          <span className="text-sm font-bold text-emerald-700 block">₹18,450</span>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('totalEscrowHeldMetric')}</span>
        </div>
      </div>

      {/* Platform Pricing & Commission Model (3% Customer, 0% Worker) */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-700" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Cooperative Revenue & Commission Model</h2>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
            0% Worker Cut
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mb-3">
          WorkEasy charges a transparent 3% platform & escrow fee from customers while deducting 0% from workers. Partners keep 100% of their base labor earnings.
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-500 font-semibold block">Customer Platform Fee</span>
            <span className="text-sm font-bold text-slate-900 font-mono">3% <span className="text-[10px] text-slate-500 font-normal">(e.g. ₹14 / ₹450)</span></span>
            <p className="text-[10px] text-slate-500 mt-1">Covers escrow insurance, payment gateway, and customer dispute guarantee.</p>
          </div>
          <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200">
            <span className="text-[10px] text-emerald-800 font-semibold block">Worker Commission</span>
            <span className="text-sm font-bold text-emerald-700 font-mono">0% <span className="text-[10px] text-emerald-700 font-normal">(Zero deduction)</span></span>
            <p className="text-[10px] text-emerald-800 mt-1">100% of labor payout released directly to worker cooperative accounts.</p>
          </div>
        </div>
      </div>

      {/* COIMBATORE AREA DEMAND FORECASTING & FLEET REBALANCING */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={14} className="text-slate-900" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
              Locality Demand Forecasting
            </h2>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Real-time Surge Telemetry</span>
        </div>
        <AreaDemandForecast />
      </div>

      {/* PARTNER CREDENTIALING QUEUE */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
            Partner Verification Queue
          </h2>
          {reviewed && (
            <button onClick={resetReview} className="text-[10px] text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-0.5">
              <RefreshCw size={10} /> Reset
            </button>
          )}
        </div>

        {!reviewed ? (
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-xs text-slate-900">Lakshmi Narayanan</h3>
                <p className="text-[11px] text-slate-500">Applicant: Level 1 Home Cleaning</p>
              </div>
              <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] px-2 py-0.5 rounded font-semibold">
                Pending
              </span>
            </div>
            
            <div className="space-y-1 mb-3 bg-slate-50 p-2.5 rounded-lg text-xs text-slate-600 border border-slate-200/60">
              <p className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-600" /> Aadhaar KYC Document Verified
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-emerald-600" /> Skill Assessment Score: 94%
              </p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleReview('reject')}
                className="flex-1 py-2 border border-slate-200 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-50 transition active:scale-98"
              >
                Reject
              </button>
              <button 
                onClick={() => handleReview('approve')}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg shadow-xs transition active:scale-98"
              >
                Approve & Accredit
              </button>
            </div>
          </div>
        ) : (
          <div className={`p-3 rounded-xl border text-center shadow-2xs ${
            reviewStatus === 'approve' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <p className="font-semibold text-xs">
              {reviewStatus === 'approve' 
                ? '✓ Lakshmi N. accredited with Level 1 Partner ID' 
                : 'Application rejected.'}
            </p>
          </div>
        )}
      </div>

      {/* DISPATCH TELEMETRY AUDIT */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Fair Dispatch Queue</h2>
          <span className="text-[10px] text-emerald-700 font-semibold">100% Round-Robin</span>
        </div>
        
        <p className="text-[11px] text-slate-500 mb-2">Automated algorithmic rotation prevents monopolization.</p>

        <div className="space-y-1 bg-slate-50 rounded-lg p-2 text-xs font-mono border border-slate-200/60">
          <div className="flex justify-between py-0.5 border-b border-slate-200"><span className="text-slate-500">Order #101 (Cleaning)</span><span className="text-slate-800">→ Meena Devi</span></div>
          <div className="flex justify-between py-0.5 border-b border-slate-200"><span className="text-slate-500">Order #102 (Gardening)</span><span className="text-slate-800">→ Suresh Babu</span></div>
          <div className="flex justify-between py-0.5 border-b border-slate-200"><span className="text-slate-500">Order #103 (Plumbing)</span><span className="font-bold text-slate-900">→ Ramesh Kumar (Active)</span></div>
          <div className="flex justify-between py-0.5"><span className="text-slate-500">Order #104 (Electrical)</span><span className="text-slate-800">→ Arjun Raj</span></div>
        </div>
      </div>

      {/* 2 TO 4 DAYS QUALITY ASSURANCE & WARRANTY AUDIT */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
            <Award size={14} className="text-slate-900" />
            2 to 4 Days Quality Assurance Audit
          </h2>
          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-1.5 py-0.2 rounded border border-emerald-200">
            Cooperative Guard
          </span>
        </div>
        
        <p className="text-[11px] text-slate-500 mb-2">Monitors post-service faults flagged between Day 2 and Day 4 with 3 resolution paths.</p>

        <div className="space-y-1.5">
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-xs">
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold text-slate-900">Tap Leakage Fault (Observed Day 2)</span>
              <span className="text-emerald-700 font-bold text-[11px]">Option 2: Rebooked (₹200)</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Original Partner: Ramesh Kumar · Subsidized replacement dispatched: Karthik Sundaram (55% cooperative subsidy).
            </p>
          </div>
        </div>
      </div>

      {/* COOPERATIVE TUTORING & APPRENTICESHIP REGISTRY */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
            <Award size={14} className="text-slate-900" />
            Tutoring & Apprenticeship Registry
          </h2>
          <span className="text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.2 rounded">
            2 Active Pairings
          </span>
        </div>
        
        <p className="text-[11px] text-slate-500 mb-2.5">Supervises low-level workers shadowing master craftsmen for verified competency upgrade.</p>

        <div className="space-y-2">
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-900">Suresh Babu (L1) → Ramesh Kumar (L2 Tutor)</span>
              <span className="text-[10px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded font-bold text-slate-700">
                22 / 30 hrs (73%)
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              Target: Level 2 Plumbing Competency. Last Shadowed: Water Meter Flange Installation.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-900">Meena Devi (L1) → Arjun Raj (L3 Master)</span>
              <span className="text-[10px] font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded font-bold text-slate-700">
                14 / 30 hrs (47%)
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              Target: Level 2 Electrical Competency. Last Shadowed: 3-Phase Distribution Box Setup.
            </p>
          </div>
        </div>
      </div>

      {/* BULK DISPATCH & SKILL POOLING OPERATIONS */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
            <Users size={14} className="text-slate-900" />
            Bulk Workforce & Skill Pooling Hub
          </h2>
          <span className="text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.2 rounded">
            2 Modalities Active
          </span>
        </div>
        
        <p className="text-[11px] text-slate-500 mb-2.5">
          Manages both licensed contractor squads (Option 1) and cooperative algorithmic multi-worker skill pools (Option 2).
        </p>

        <div className="space-y-2.5">
          {/* Contractor Teams Summary */}
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <ShieldCheck size={13} className="text-slate-900" /> Option 1: Licensed Contractor Squads
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                4 Registered Crews
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mb-2">
              Supervised commercial crews with heavy equipment for industrial and large-scale jobs.
            </p>
            <div className="space-y-1">
              {[
                { name: 'Kovai Master Pro Cleaners', lead: 'K. Rajendran', cap: 'Up to 8 crew', skill: 'Cleaning', rating: 4.9 },
                { name: 'Kongu Industrial Electrical Crew', lead: 'Er. Sundaramurthy', cap: 'Up to 6 crew', skill: 'Electrical', rating: 4.9 },
                { name: 'Apex Commercial Plumbing Squad', lead: 'M. Senthil', cap: 'Up to 5 crew', skill: 'Plumbing', rating: 4.8 },
              ].map((team, idx) => (
                <div key={idx} className="bg-white p-2 rounded-md border border-slate-200/70 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-900">{team.name}</span>
                    <span className="text-slate-400 block text-[10px]">Lead: {team.lead} · {team.cap}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                    {team.rating} ★
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Pooling Engine Summary */}
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Users size={13} className="text-blue-700" /> Option 2: Algorithmic Skill Pooling
              </span>
              <span className="text-[10px] text-blue-800 font-bold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                Synchronized
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mb-1.5">
              Aggregates individual certified workers of identical skill into synchronized dispatch units with 100% labor earnings directly to members.
            </p>
            <div className="bg-white p-2 rounded-md border border-slate-200/70 text-[10px] text-slate-600 space-y-0.5 font-mono">
              <div>✓ Multi-point proximity clustering (max radius 4.5 km)</div>
              <div>✓ Unified customer start OTP synchronization</div>
              <div>✓ Primary communication lead auto-assignment</div>
            </div>
          </div>
        </div>
      </div>

      {/* PARTNERS ROSTER */}
      <div>
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-2 px-0.5">
          Accredited Partners Roster
        </h2>

        <div className="space-y-2">
          {[
            { name: 'Ramesh Kumar', skill: 'Plumbing', tier: 2 as const, rating: 4.8, jobs: 47 },
            { name: 'Meena Devi', skill: 'Cleaning', tier: 1 as const, rating: 4.7, jobs: 62 },
            { name: 'Arjun Raj', skill: 'Electrical', tier: 3 as const, rating: 4.9, jobs: 93 },
            { name: 'Suresh Babu', skill: 'Gardening', tier: 1 as const, rating: 4.6, jobs: 38 }
          ].map((worker, i) => (
            <div key={i} className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
              <div>
                <p className="font-semibold text-xs text-slate-900 flex items-center gap-1">
                  {worker.name} <CheckCircle2 size={12} className="text-emerald-600" />
                </p>
                <p className="text-[10px] text-slate-500">{worker.skill} · {worker.rating}★ ({worker.jobs} bookings)</p>
              </div>
              <TierBadge tier={worker.tier} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CooperativeDashboard;
