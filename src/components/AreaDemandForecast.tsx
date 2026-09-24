import React, { useState } from 'react';
import { TrendingUp, MapPin, Users, AlertTriangle, ArrowRight, ShieldCheck, Flame, Clock, BarChart2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AreaForecast {
  id: string;
  name: string;
  demandIndex: number; // 0 to 100
  status: 'high' | 'moderate' | 'normal';
  expectedJobs: number;
  availableWorkers: number;
  surgeReason: string;
  peakHours: string;
  tradeBreakdown: { skill: string; percentage: number; color: string }[];
  hourlyDemand: { hour: string; level: number }[];
  dispatchTip: string;
}

const FORECAST_DATA: AreaForecast[] = [
  {
    id: 'rspuram',
    name: 'RS Puram',
    demandIndex: 94,
    status: 'high',
    expectedJobs: 46,
    availableWorkers: 12,
    surgeReason: 'High residential tap/plumbing maintenance & festive sanitization',
    peakHours: '08:30 AM - 11:30 AM & 05:00 PM - 08:30 PM',
    tradeBreakdown: [
      { skill: 'Plumbing', percentage: 46, color: 'bg-emerald-500' },
      { skill: 'Electrical', percentage: 28, color: 'bg-amber-500' },
      { skill: 'Cleaning', percentage: 16, color: 'bg-blue-500' },
      { skill: 'Appliance', percentage: 10, color: 'bg-purple-500' },
    ],
    hourlyDemand: [
      { hour: '06-09', level: 40 },
      { hour: '09-12', level: 95 },
      { hour: '12-15', level: 45 },
      { hour: '15-18', level: 65 },
      { hour: '18-21', level: 88 },
    ],
    dispatchTip: 'Recommend rebalancing 4 Tier-2 plumbers from Saravanampatti to RS Puram to eliminate 15-minute wait time.',
  },
  {
    id: 'gandhipuram',
    name: 'Gandhipuram',
    demandIndex: 88,
    status: 'high',
    expectedJobs: 38,
    availableWorkers: 10,
    surgeReason: 'Commercial complex electrical switchgear & shop plumbing overhaul',
    peakHours: '09:00 AM - 01:00 PM',
    tradeBreakdown: [
      { skill: 'Electrical', percentage: 50, color: 'bg-amber-500' },
      { skill: 'Plumbing', percentage: 30, color: 'bg-emerald-500' },
      { skill: 'Cleaning', percentage: 20, color: 'bg-blue-500' },
    ],
    hourlyDemand: [
      { hour: '06-09', level: 30 },
      { hour: '09-12', level: 90 },
      { hour: '12-15', level: 60 },
      { hour: '15-18', level: 75 },
      { hour: '18-21', level: 70 },
    ],
    dispatchTip: 'Demand peaked around 100-Ft road commercial zones. Pre-dispatch electrical pairs for immediate dispatch.',
  },
  {
    id: 'peelamedu',
    name: 'Peelamedu / TIDEL',
    demandIndex: 78,
    status: 'moderate',
    expectedJobs: 29,
    availableWorkers: 16,
    surgeReason: 'Apartment community deep cleaning & washing machine drainage check',
    peakHours: '07:30 AM - 10:30 AM & 06:00 PM - 09:00 PM',
    tradeBreakdown: [
      { skill: 'Cleaning', percentage: 38, color: 'bg-blue-500' },
      { skill: 'Plumbing', percentage: 32, color: 'bg-emerald-500' },
      { skill: 'Appliance', percentage: 30, color: 'bg-purple-500' },
    ],
    hourlyDemand: [
      { hour: '06-09', level: 60 },
      { hour: '09-12', level: 78 },
      { hour: '12-15', level: 35 },
      { hour: '15-18', level: 50 },
      { hour: '18-21', level: 82 },
    ],
    dispatchTip: 'Supply is balanced. Partners can accept scheduled evening slots with zero idle waiting.',
  },
  {
    id: 'saibaba',
    name: 'Saibaba Colony',
    demandIndex: 72,
    status: 'moderate',
    expectedJobs: 24,
    availableWorkers: 11,
    surgeReason: 'Domestic garden pruning and motor starter replacements',
    peakHours: '07:00 AM - 10:00 AM & 04:30 PM - 07:00 PM',
    tradeBreakdown: [
      { skill: 'Gardening', percentage: 40, color: 'bg-emerald-600' },
      { skill: 'Electrical', percentage: 35, color: 'bg-amber-500' },
      { skill: 'Plumbing', percentage: 25, color: 'bg-emerald-500' },
    ],
    hourlyDemand: [
      { hour: '06-09', level: 55 },
      { hour: '09-12', level: 70 },
      { hour: '12-15', level: 30 },
      { hour: '15-18', level: 65 },
      { hour: '18-21', level: 60 },
    ],
    dispatchTip: 'Gardening requests concentrated in morning. Shift available gardeners to afternoon appliance repair.',
  },
  {
    id: 'saravanampatti',
    name: 'Saravanampatti',
    demandIndex: 58,
    status: 'normal',
    expectedJobs: 18,
    availableWorkers: 15,
    surgeReason: 'Tech park residential clusters routine checks',
    peakHours: '06:00 PM - 09:00 PM',
    tradeBreakdown: [
      { skill: 'Plumbing', percentage: 35, color: 'bg-emerald-500' },
      { skill: 'Electrical', percentage: 35, color: 'bg-amber-500' },
      { skill: 'Cleaning', percentage: 30, color: 'bg-blue-500' },
    ],
    hourlyDemand: [
      { hour: '06-09', level: 25 },
      { hour: '09-12', level: 50 },
      { hour: '12-15', level: 30 },
      { hour: '15-18', level: 45 },
      { hour: '18-21', level: 68 },
    ],
    dispatchTip: 'Surplus workforce availability. Idle partners are being offered optional dispatch rebalance to RS Puram.',
  },
];

interface Props {
  compact?: boolean;
  onAreaSelect?: (areaName: string) => void;
}

export const AreaDemandForecast: React.FC<Props> = ({ compact = false, onAreaSelect }) => {
  const { t, loc } = useApp();
  const [selectedAreaId, setSelectedAreaId] = useState<string>('rspuram');

  const selectedArea = FORECAST_DATA.find((a) => a.id === selectedAreaId) || FORECAST_DATA[0];

  const handleSelectArea = (id: string, name: string) => {
    setSelectedAreaId(id);
    if (onAreaSelect) onAreaSelect(name);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Widget Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>{t('demandForecastingTitle')}</span>
              <span className="text-[9px] bg-emerald-500/30 text-emerald-300 font-mono px-1.5 py-0.2 rounded border border-emerald-500/40">
                AI Dispatch
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {t('demandForecastingSubtitle')}
            </p>
          </div>
        </div>

        {/* 0% Surge Exploitation Guarantee */}
        <div className="hidden sm:block text-right">
          <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            Fixed Coop Rates (0% Surge Gouging)
          </span>
        </div>
      </div>

      {/* Localities Pills Selector */}
      <div className="p-3 bg-slate-50 border-b border-slate-200/80 overflow-x-auto hide-scrollbar flex items-center gap-1.5">
        {FORECAST_DATA.map((area) => {
          const isSelected = area.id === selectedAreaId;
          return (
            <button
              key={area.id}
              onClick={() => handleSelectArea(area.id, area.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{loc(area.name)}</span>
              {area.status === 'high' ? (
                <span className="flex items-center gap-0.5 text-[10px] text-rose-500 font-mono">
                  <Flame size={11} className="fill-rose-500 text-rose-500" />
                  {area.demandIndex}%
                </span>
              ) : area.status === 'moderate' ? (
                <span className="text-[10px] text-amber-500 font-mono font-semibold">
                  ⚡{area.demandIndex}%
                </span>
              ) : (
                <span className="text-[10px] text-emerald-500 font-mono font-semibold">
                  ● {area.demandIndex}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Forecast Body for Selected Area */}
      <div className="p-4 space-y-3.5 text-xs text-slate-700">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-3 gap-2">
          {/* Metric 1: Surge Index */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-center">
            <span className="text-[10px] text-slate-500 font-medium block mb-0.5">{t('areaDemandSurge')}</span>
            <div className="flex items-center justify-center gap-1">
              <span className={`text-base font-black font-mono ${
                selectedArea.status === 'high' ? 'text-rose-600' : selectedArea.status === 'moderate' ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {selectedArea.demandIndex}%
              </span>
              {selectedArea.status === 'high' && <Flame size={14} className="text-rose-600 fill-rose-500" />}
            </div>
            <span className="text-[9px] font-bold text-slate-500 uppercase mt-0.5 block">
              {selectedArea.status === 'high' ? 'High Surge' : selectedArea.status === 'moderate' ? 'Moderate' : 'Stable'}
            </span>
          </div>

          {/* Metric 2: Expected Jobs */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-center">
            <span className="text-[10px] text-slate-500 font-medium block mb-0.5">{t('forecastedJobsToday')}</span>
            <span className="text-base font-black text-slate-900 font-mono">
              ~{selectedArea.expectedJobs}
            </span>
            <span className="text-[9px] text-emerald-700 font-semibold block mt-0.5">
              +24% vs. avg
            </span>
          </div>

          {/* Metric 3: Active Supply */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-center">
            <span className="text-[10px] text-slate-500 font-medium block mb-0.5">{t('activeSupplyNear')}</span>
            <span className="text-base font-black text-slate-900 font-mono">
              {selectedArea.availableWorkers}
            </span>
            <span className="text-[9px] text-slate-500 font-medium block mt-0.5">
              Verified Partners
            </span>
          </div>
        </div>

        {/* Peak Window & Surge Root Cause */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-950 flex items-center gap-1.5">
              <Clock size={13} className="text-amber-700" />
              <span>{t('peakDemandHours')}:</span>
            </span>
            <span className="font-mono font-bold text-amber-900 text-[11px]">
              {selectedArea.peakHours}
            </span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            <strong>Cause:</strong> {selectedArea.surgeReason}.
          </p>
        </div>

        {/* Hour-by-Hour Demand Bar Graph */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1">
              <BarChart2 size={13} className="text-slate-600" />
              <span>Hourly Load Distribution (24h AI Model)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Coimbatore Cluster</span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2">
            <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
              {selectedArea.hourlyDemand.map((slot, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-full bg-slate-200 rounded-full h-16 flex items-end justify-center p-0.5">
                    <div
                      className={`w-full rounded-full transition-all duration-500 ${
                        slot.level >= 85 ? 'bg-rose-500' : slot.level >= 65 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ height: `${slot.level}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-slate-700">{slot.hour}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{slot.level}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* In-Demand Skill Breakdown */}
        <div>
          <span className="text-xs font-bold text-slate-900 uppercase tracking-tight block mb-1.5">
            {t('topDemandedSkills')} in {loc(selectedArea.name)}
          </span>

          <div className="space-y-1.5">
            {selectedArea.tradeBreakdown.map((trade, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="w-20 font-semibold text-slate-800 text-[11px] truncate">
                  {loc(trade.skill)}
                </span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${trade.color} rounded-full transition-all duration-500`}
                    style={{ width: `${trade.percentage}%` }}
                  />
                </div>
                <span className="w-9 text-right font-mono font-bold text-slate-700 text-[11px]">
                  {trade.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cooperative Rebalance Recommendation Directive */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-2.5">
          <ShieldCheck size={16} className="text-blue-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-950 text-xs block">
              {t('rebalanceRecommendation')}
            </span>
            <p className="text-[11px] text-blue-800 mt-0.5 leading-relaxed">
              {selectedArea.dispatchTip}
            </p>
          </div>
        </div>

        {/* Transparent Customer Pricing & Cooperative Commission Notice */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-900 block">{t('workerCommissionZero')}</span>
            <span className="text-[10px] text-slate-500">{t('workerCommissionZeroDetail')}</span>
          </div>
          <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
            0% Fee
          </span>
        </div>
      </div>
    </div>
  );
};

export default AreaDemandForecast;
