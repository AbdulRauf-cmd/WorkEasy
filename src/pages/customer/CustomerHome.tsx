import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import TierBadge from '../../components/TierBadge';
import LanguageSwitch from '../../components/LanguageSwitch';
import { 
  Wrench, 
  Zap, 
  Sparkles, 
  Hammer, 
  ShieldCheck, 
  ChevronRight, 
  MapPin, 
  Search, 
  Trees, 
  KeyRound,
  Lock,
  Disc3,
  Flame
} from 'lucide-react';

const categories = [
  { id: 'Tyre Puncture', name: 'Tyre Puncture & Roadside', sub: 'Tubeless, tube & stepney swap', icon: Disc3, tier: 1, highlight: '⚡ 8-15m Dispatch' },
  { id: 'Plumbing', name: 'Plumbing', sub: 'Pipes, taps & leaks', icon: Wrench, tier: 2 },
  { id: 'Electrical', name: 'Electrical', sub: 'Wiring & switches', icon: Zap, tier: 2 },
  { id: 'Cleaning', name: 'Home Cleaning', sub: 'Deep clean & sanitization', icon: Sparkles, tier: 1 },
  { id: 'Appliance Repair', name: 'Appliances', sub: 'AC, fridge & washer', icon: Hammer, tier: 2 },
  { id: 'Gardening', name: 'Gardening', sub: 'Lawn & landscaping', icon: Trees, tier: 1 },
  { id: 'Custom Service', name: 'Custom Service', sub: 'Carpentry, repairs & tasks', icon: Hammer, tier: 2 },
];

export const CustomerHome: React.FC = () => {
  const navigate = useNavigate();
  const { state, t, loc } = useApp();
  const { currentJob, customer } = state;

  const categories = [
    { id: 'Tyre Puncture', name: t('roadsideHelp'), sub: t('roadsideHelpSub'), icon: Disc3, tier: 1, highlight: '⚡ 8-15m Dispatch' },
    { id: 'Plumbing', name: t('plumbing'), sub: t('plumbingSub'), icon: Wrench, tier: 2 },
    { id: 'Electrical', name: t('electrical'), sub: t('electricalSub'), icon: Zap, tier: 2 },
    { id: 'Cleaning', name: t('cleaning'), sub: t('cleaningSub'), icon: Sparkles, tier: 1 },
    { id: 'Appliance Repair', name: t('appliances'), sub: t('appliancesSub'), icon: Hammer, tier: 2 },
    { id: 'Gardening', name: t('gardening'), sub: t('gardeningSub'), icon: Trees, tier: 1 },
    { id: 'Custom Service', name: t('customService'), sub: t('customServiceSub'), icon: Hammer, tier: 2 },
  ];

  return (
    <AnimatedPage className="pb-16 px-4 pt-4 bg-slate-50 min-h-screen">
      {/* Location & Account Top Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 cursor-pointer">
          <MapPin size={16} className="text-slate-900" />
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-900 tracking-tight">{t('locationArea')}</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </div>
            <span className="text-[10px] text-slate-500 font-normal block leading-tight">Tamil Nadu, 641002</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-semibold text-xs flex items-center justify-center">
            {customer.avatar || 'PS'}
          </div>
        </div>
      </div>

      {/* Modern Search Bar */}
      <div 
        onClick={() => navigate('/post-job')}
        className="bg-white rounded-xl border border-slate-200/90 px-3.5 py-2.5 flex items-center gap-2.5 text-slate-400 mb-4 cursor-pointer shadow-2xs hover:border-slate-300 transition-colors"
      >
        <Search size={16} className="text-slate-400" />
        <span className="text-xs text-slate-500 font-normal">{t('searchPlaceholder')}</span>
      </div>

      {/* ACTIVE LIVE BOOKING (If present) */}
      {currentJob && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[11px] font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('activeBooking')}
            </span>
            <button 
              onClick={() => navigate('/job-details')}
              className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
            >
              <span>{t('track')}</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div
            onClick={() => navigate('/job-details')}
            className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
          >
            {currentJob.status === 'worker_arrived' && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium px-2.5 py-1 rounded-lg mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1 font-semibold">
                  <KeyRound size={13} className="text-amber-700" /> {t('workerOnWay')}
                </span>
                <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-amber-300">
                  PIN: {currentJob.arrivalOtp || '4829'}
                </span>
              </div>
            )}

            {currentJob.bulkOption === 'contractor' && (
              <div className="bg-slate-900 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <ShieldCheck size={13} className="text-amber-400" /> {t('licensedTeam')} ({currentJob.workerCount || 3})
                </span>
                <span className="font-semibold text-slate-300 text-[10px]">
                  {currentJob.contractorName || 'Supervised'}
                </span>
              </div>
            )}

            {currentJob.bulkOption === 'skill_pool' && (
              <div className="bg-blue-50 border border-blue-200 text-blue-950 text-[11px] font-medium px-2.5 py-1 rounded-lg mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1 font-semibold text-blue-900">
                  <Sparkles size={13} className="text-blue-600" /> {t('skilledGroup')} ({currentJob.workerCount || 3})
                </span>
                <span className="font-bold text-blue-700 text-[10px]">
                  ✓ {t('synchronizedSquad')}
                </span>
              </div>
            )}

            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xs text-slate-900">{loc(currentJob.title)}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {loc(currentJob.service)} · {loc(currentJob.date)}, {loc(currentJob.time)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900">₹{currentJob.budget}</span>
                {currentJob.workerCount && currentJob.workerCount > 1 && (
                  <span className="block text-[9px] text-slate-500 font-medium">Bulk ({currentJob.workerCount})</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-[11px]">
              <TierBadge tier={currentJob.tier || 1} size="sm" />
              <span className="text-slate-600 font-medium capitalize">
                {t('status')}: {loc(currentJob.status)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SERVICES DIRECTORY */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2 px-0.5">
          <h2 className="text-xs font-bold text-slate-900 tracking-tight">{t('browseServices')}</h2>
          <span className="text-[11px] text-slate-400">{t('fixedUpfrontPricing')}</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/post-job?service=${cat.id}`)}
                className="bg-white p-3 rounded-xl border border-slate-200/90 text-left hover:border-slate-300 hover:shadow-2xs transition-all flex flex-col justify-between h-28 group active:scale-98"
              >
                <div className="flex justify-between items-start w-full">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <IconComponent size={16} strokeWidth={2} />
                  </div>
                  <div className="flex items-center gap-1">
                    {cat.highlight && (
                      <span className="text-[9px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded">
                        {cat.highlight}
                      </span>
                    )}
                    <TierBadge tier={cat.tier as 1 | 2 | 3} size="sm" />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-xs text-slate-900 tracking-tight">{cat.name}</h3>
                  <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">{cat.sub}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ANTI-DISINTERMEDIATION PRIVACY & SAFETY POLICY */}
      <div className="bg-slate-900 text-white rounded-xl p-3.5 shadow-2xs">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
            <Lock size={14} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>{t('escrowTrustTitle')}</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-normal mt-0.5">
              {t('policyNote')}
            </p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
export default CustomerHome;
