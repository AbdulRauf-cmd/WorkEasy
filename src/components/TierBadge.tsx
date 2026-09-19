import React from 'react';
import { Tier } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg';
}

export default function TierBadge({ tier, size = 'md' }: Props) {
  const { t } = useApp();

  const getBadgeConfig = () => {
    switch (tier) {
      case 1:
        return {
          label: t('tierBasic'),
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
          dot: 'bg-emerald-600',
        };
      case 2:
        return {
          label: t('tierSkilled'),
          bg: 'bg-amber-50 text-amber-900 border-amber-200/80',
          dot: 'bg-amber-600',
        };
      case 3:
        return {
          label: t('tierSpecialized'),
          bg: 'bg-rose-50 text-rose-900 border-rose-200/80',
          dot: 'bg-rose-600',
        };
      default:
        return {
          label: `Tier ${tier}`,
          bg: 'bg-slate-100 text-slate-800 border-slate-200',
          dot: 'bg-slate-500',
        };
    }
  };

  const config = getBadgeConfig();

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-medium tracking-tight',
    md: 'text-[11px] px-2.5 py-0.5 font-semibold tracking-tight',
    lg: 'text-xs px-3 py-1 font-semibold',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border ${sizeClasses[size]} ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
}
