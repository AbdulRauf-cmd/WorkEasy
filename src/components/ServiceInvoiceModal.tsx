import React from 'react';
import { X, ShieldCheck, CheckCircle2, Heart, ReceiptText, MapPin, User, Wrench, Sparkles } from 'lucide-react';
import { Job, Worker } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  worker?: Worker;
  tip?: number;
}

export const ServiceInvoiceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  job,
  worker,
  tip = 0,
}) => {
  const { t, loc } = useApp();

  if (!isOpen) return null;

  const basePrice = job.budget || 450;
  const laborCharge = Math.round(basePrice * 0.78);
  const materialsPrecisionFee = basePrice - laborCharge;
  const totalAmount = basePrice + (tip || 0);
  const invoiceId = `INV-${job.id.slice(-4).toUpperCase()}-2026`;
  const bookingDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200/90 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <ReceiptText size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">{t('invoiceTitle')}</h2>
              <span className="text-[10px] text-slate-500 font-mono">#{invoiceId}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition active:scale-95"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 text-xs text-slate-700">
          {/* Status & Escrow Settlement Badge */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900 text-xs">
                  {job.status === 'verified' ? t('paymentSettled') : t('escrowSecured')}
                </p>
                <p className="text-[10px] text-emerald-800">
                  {job.status === 'verified' 
                    ? t('releasedDirectlyToWorker') 
                    : t('heldSafelyUntilCustomerApproval')}
                </p>
              </div>
            </div>
            <span className="text-sm font-extrabold text-slate-900 font-mono">
              ₹{totalAmount}
            </span>
          </div>

          {/* Service Partner & Customer Summary */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                  {worker?.avatar || 'RK'}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-xs">{loc(worker?.name || 'Ramesh Kumar')}</p>
                  <p className="text-[10px] text-slate-500">{loc(worker?.skill || job.service)} • Level {worker?.tier || job.tier} Certified</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                ✓ Verified Partner
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1 text-slate-500">
                <MapPin size={12} className="text-slate-400" /> {t('serviceLocation')}:
              </span>
              <span className="font-semibold text-slate-800">{loc(job.location || 'Coimbatore')}</span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1 text-slate-500">
                <User size={12} className="text-slate-400" /> {t('bookingDate')}:
              </span>
              <span className="font-semibold text-slate-800">{bookingDate} • {job.time || '10:00 AM'}</span>
            </div>
          </div>

          {/* Swiggy-style Itemized Service Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <Wrench size={13} className="text-slate-700" />
                {t('itemizedServiceProvided')}
              </h3>
              <span className="text-[10px] text-slate-500 font-medium">Standard Rate Card</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-2xs">
              {/* Item 1 */}
              <div className="p-3 flex items-start justify-between">
                <div className="pr-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-bold text-slate-900 text-xs">{loc(job.title || 'Tap Leakage Repair')}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 pl-3">
                    {loc(job.description || 'Diagnosis, dismantling, valve seating & primary precision labor')}
                  </p>
                </div>
                <span className="font-mono font-bold text-slate-900 text-xs shrink-0">₹{laborCharge}</span>
              </div>

              {/* Item 2 */}
              <div className="p-3 flex items-start justify-between">
                <div className="pr-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="font-bold text-slate-900 text-xs">
                      {job.service === 'Plumbing' 
                        ? 'PTFE Gasket & Sealant Application' 
                        : job.service === 'Electrical' 
                        ? 'Safety Switch Terminal Tuning' 
                        : 'Precision Inspection & Testing'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 pl-3">
                    Pressure integrity audit & leak-proof joint testing
                  </p>
                </div>
                <span className="font-mono font-bold text-slate-900 text-xs shrink-0">₹{materialsPrecisionFee}</span>
              </div>

              {/* Subtotal */}
              <div className="p-2.5 bg-slate-50 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">{t('serviceItemTotal')}</span>
                <span className="font-mono font-bold text-slate-900">₹{basePrice}</span>
              </div>
            </div>
          </div>

          {/* Swiggy-Style Bill Details Breakdown */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-2">
              {t('billDetails')}
            </h3>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/90 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>{t('serviceLaborTotal')}</span>
                <span className="font-mono">₹{basePrice}</span>
              </div>

              {/* 0% Commission Guarantee */}
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <span>{t('platformCommission')}</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">Co-op Model</span>
                </span>
                <span>
                  <del className="text-slate-400 text-[10px] mr-1">₹90</del>
                  <strong className="text-emerald-700 font-bold">FREE (₹0)</strong>
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>48-Hour Re-Work Guarantee</span>
                <span className="text-emerald-700 font-semibold">{t('includedFree')}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>GST & Government Taxes</span>
                <span className="text-slate-500">{t('includedFree')} (0%)</span>
              </div>

              {tip > 0 && (
                <div className="flex items-center justify-between text-slate-700 font-semibold pt-1 border-t border-slate-200">
                  <span className="flex items-center gap-1 text-rose-700">
                    <Heart size={12} className="fill-rose-500" />
                    <span>{t('partnerTip')} (100% to {loc(worker?.name || 'Partner')})</span>
                  </span>
                  <span className="font-mono text-slate-900">₹{tip}</span>
                </div>
              )}

              {/* Total Final Paid */}
              <div className="pt-2.5 border-t border-slate-300/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block">{t('totalPaid')}</span>
                  <span className="text-[10px] text-slate-500">{t('paidViaEscrowUPI')}</span>
                </div>
                <span className="text-base font-black text-slate-900 font-mono">
                  ₹{totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* 48-Hour Warranty & Support Notice */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-[11px] text-amber-950">
            <ShieldCheck size={16} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">{t('warrantyCoverageActive')}</span>
              <p className="text-[10px] text-amber-800 mt-0.5 leading-relaxed">
                {t('warrantyCoverageNotice')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Close CTA */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-xs transition active:scale-98"
          >
            {t('closeInvoice')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceInvoiceModal;
