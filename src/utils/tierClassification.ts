import { ServiceType, Tier } from '../types';

const tierMap: Record<string, Tier> = {
  'Cleaning': 1,
  'Gardening': 1,
  'Tyre Puncture': 1,
  'Plumbing': 2,
  'Appliance Repair': 2,
  'Electrical': 2,
  'Gas-related': 3,
  'Specialized Care': 3,
};

export function classifyTier(service: string, textContext: string = ''): Tier {
  if (tierMap[service]) {
    return tierMap[service];
  }

  const combinedText = `${service} ${textContext}`.toLowerCase();

  // Tier 3 keywords (Specialized / High Hazard)
  if (
    combinedText.includes('gas') ||
    combinedText.includes('pipeline') ||
    combinedText.includes('high voltage') ||
    combinedText.includes('structural') ||
    combinedText.includes('hazardous') ||
    combinedText.includes('chemical') ||
    combinedText.includes('roofing') ||
    combinedText.includes('solar')
  ) {
    return 3;
  }

  // Tier 2 keywords (Skilled Trade)
  if (
    combinedText.includes('repair') ||
    combinedText.includes('plumb') ||
    combinedText.includes('electric') ||
    combinedText.includes('wire') ||
    combinedText.includes('carpenter') ||
    combinedText.includes('carpentry') ||
    combinedText.includes('wood') ||
    combinedText.includes('lock') ||
    combinedText.includes('drill') ||
    combinedText.includes('ac') ||
    combinedText.includes('appliance') ||
    combinedText.includes('masonry') ||
    combinedText.includes('welding') ||
    combinedText.includes('paint')
  ) {
    return 2;
  }

  // Tier 1 keywords (Basic / Roadside Assistance / Maintenance)
  if (
    combinedText.includes('puncture') ||
    combinedText.includes('tyre') ||
    combinedText.includes('tire') ||
    combinedText.includes('tubeless') ||
    combinedText.includes('stepney') ||
    combinedText.includes('air pump') ||
    combinedText.includes('cleaning') ||
    combinedText.includes('garden')
  ) {
    return 1;
  }

  // Default to Tier 1 for general/routine custom tasks
  return 1;
}

export function getTierLabel(tier: Tier): string {
  switch (tier) {
    case 1: return 'Level 1 · Standard';
    case 2: return 'Level 2 · Certified';
    case 3: return 'Level 3 · Master';
    default: return `Level ${tier}`;
  }
}

export function getTierColor(tier: Tier): string {
  switch (tier) {
    case 1: return 'text-emerald-800';
    case 2: return 'text-amber-900';
    case 3: return 'text-rose-900';
  }
}

export function getTierBgColor(tier: Tier): string {
  switch (tier) {
    case 1: return 'bg-emerald-50 border-emerald-200/80';
    case 2: return 'bg-amber-50 border-amber-200/80';
    case 3: return 'bg-rose-50 border-rose-200/80';
  }
}

export function getTierDotColor(tier: Tier): string {
  switch (tier) {
    case 1: return 'bg-emerald-600';
    case 2: return 'bg-amber-600';
    case 3: return 'bg-rose-600';
  }
}

export const serviceIcons: Record<string, string> = {
  'Plumbing': '🔧',
  'Electrical': '⚡',
  'Cleaning': '🧹',
  'Gardening': '🌱',
  'Appliance Repair': '🔨',
  'Gas-related': '🔥',
  'Specialized Care': '🏥',
  'Tyre Puncture': '🛞',
  'Custom Service': '🛠️',
};

export const TIER_BASE_RATES: Record<Tier, number> = {
  1: 300,
  2: 450,
  3: 700,
};

export function calculateTransitFee(distanceKm: number): number {
  return Math.round(distanceKm * 15); // ₹15 per km transit allowance
}

export function calculateDynamicFare(
  baseLaborRate: number,
  distanceKm: number,
  materialOption: 'customer_provides' | 'worker_procures' = 'customer_provides',
  materialCost: number = 0
) {
  const transitFee = calculateTransitFee(distanceKm);
  const partsFee = materialOption === 'worker_procures' ? materialCost : 0;
  const total = baseLaborRate + transitFee + partsFee;
  return {
    baseLaborRate,
    transitFee,
    partsFee,
    total,
  };
}

export function calculateBulkFare(
  workerCount: number,
  baseRatePerWorker: number,
  bulkOption: 'contractor' | 'skill_pool',
  avgDistanceKm: number = 2.4,
  materialOption: 'customer_provides' | 'worker_procures' = 'customer_provides',
  materialCost: number = 0,
  contractorSupervisorFee: number = 300
) {
  const laborTotal = baseRatePerWorker * workerCount;
  const supervisorFee = bulkOption === 'contractor' ? contractorSupervisorFee : 0;
  const transitTotal = Math.round(avgDistanceKm * 15 * (bulkOption === 'contractor' ? 1.5 : workerCount * 0.75));
  const partsFee = materialOption === 'worker_procures' ? materialCost : 0;
  const total = laborTotal + supervisorFee + transitTotal + partsFee;

  return {
    workerCount,
    laborTotal,
    supervisorFee,
    transitTotal,
    partsFee,
    total,
  };
}

