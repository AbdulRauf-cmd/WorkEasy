import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  KeyRound, 
  Copy, 
  Check, 
  Phone, 
  MessageSquare, 
  AlertCircle, 
  MapPin, 
  Clock, 
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  UserCheck,
  Star,
  CheckCircle2,
  XCircle,
  ReceiptText,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import TierBadge from '../../components/TierBadge';
import StatusTimeline from '../../components/StatusTimeline';
import WorkerCard from '../../components/WorkerCard';
import MaskedCallModal from '../../components/MaskedCallModal';
import DemoRouteMap from '../../components/DemoRouteMap';
import ServiceInvoiceModal from '../../components/ServiceInvoiceModal';
import { Worker, ContractorTeam } from '../../types';

export const CustomerJobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { 
    state, 
    approveExtension, 
    raiseWarrantyQuery, 
    rebookSameWorkerFree, 
    rebookWarrantyJob, 
    closeWarrantyWithoutRebooking,
    t,
    loc
  } = useApp();
  const { currentJob, workers } = state;
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [showWarrantyModal, setShowWarrantyModal] = useState(false);
  const [warrantyDay, setWarrantyDay] = useState(2);
  const [warrantyIssue, setWarrantyIssue] = useState('Tap started leaking again after 2 days of service');
  const [customWarrantyText, setCustomWarrantyText] = useState('');
  const [selectedAltWorkerId, setSelectedAltWorkerId] = useState<string>('');
  
  // Masked calling state (Secure Virtual Number)
  const [showMaskedCallModal, setShowMaskedCallModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [calleeInfo, setCalleeInfo] = useState({
    name: 'Ramesh Kumar',
    role: 'Certified Partner',
    maskedNumber: '+91 080-6922-4829 Ext 118',
  });

  const handleCallPartner = (name: string, role: string, maskedNum?: string) => {
    setCalleeInfo({
      name,
      role,
      maskedNumber: maskedNum || '+91 080-6922-4829 Ext 118',
    });
    setShowMaskedCallModal(true);
  };

  if (!currentJob) {
    return (
      <AnimatedPage className="p-6 pt-16 text-center bg-slate-50 min-h-screen">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
          <AlertCircle size={24} />
        </div>
        <h2 className="text-base font-bold text-slate-900 mb-1">{t('noActiveBooking')}</h2>
        <p className="text-xs text-slate-500 mb-4">{t('noActiveBookingDesc')}</p>
        <button 
          onClick={() => navigate('/post-job')} 
          className="bg-slate-900 text-white font-semibold px-4 py-2.5 rounded-lg text-xs active:scale-95 transition"
        >
          {t('bookAService')}
        </button>
      </AnimatedPage>
    );
  }

  const worker = workers.find(w => w.id === currentJob.workerId) || workers[0];
  const otpDigits = (currentJob.arrivalOtp || '4829').split('');

  // Alternative certified workers (excluding original worker)
  const alternativeWorkers = workers.filter(w => w.id !== worker?.id && w.tier >= (currentJob.tier || 1));
  const activeAltWorker = alternativeWorkers.find(w => w.id === selectedAltWorkerId) || alternativeWorkers[0] || workers[1];

  const handleCopyOtp = () => {
    navigator.clipboard?.writeText(currentJob.arrivalOtp || '4829');
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const handleRaiseWarranty = () => {
    const finalIssue = customWarrantyText.trim() || warrantyIssue;
    raiseWarrantyQuery(currentJob.id, finalIssue, warrantyDay);
    setShowWarrantyModal(false);
  };

  const discountedRebookFare = Math.round(currentJob.budget * 0.45); // Subsidized 55% discount

  return (
    <AnimatedPage className="min-h-screen bg-slate-50 flex flex-col pb-16">
      {/* Top App Bar */}
      <div className="bg-white pt-4 pb-3 px-4 sticky top-0 z-20 border-b border-slate-200/80 flex items-center justify-between shadow-2xs">
        <button 
          onClick={() => navigate('/')} 
          className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="text-center">
          <h1 className="text-xs font-bold text-slate-900">{t('bookingNumber')} #{currentJob.id.slice(-4).toUpperCase()}</h1>
          <span className="text-[10px] text-slate-500 font-medium">{t('liveStatus')}</span>
        </div>
        <div className="w-8" />
      </div>

      <div className="p-4 space-y-3.5">
        {/* LIVE WORKER ROUTE TRACKING MAP (When confirmed/en-route/arrived) */}
        {['matched', 'accepted', 'worker_arrived'].includes(currentJob.status) && (
          <DemoRouteMap
            workerName={worker?.name || 'Ramesh Kumar'}
            workerSkill={worker?.skill || currentJob.service}
            customerLocation={currentJob.location || 'Coimbatore'}
            distanceKm={worker?.distance || 2.4}
            compact={false}
          />
        )}

        {/* WORKER TIME EXTENSION REQUEST BANNER */}
        {currentJob.extensionRequest && (
          <div className={`p-4 rounded-xl border-2 shadow-2xs ${
            currentJob.extensionRequest.status === 'pending'
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-tight flex items-center gap-1.5">
                <Clock size={14} className={currentJob.extensionRequest.status === 'pending' ? 'text-amber-700' : 'text-emerald-700'} />
                {currentJob.extensionRequest.status === 'pending' ? t('extensionRequested') : t('extensionApproved')}
              </span>
              <span className="text-[11px] font-bold bg-white px-2 py-0.5 rounded border border-current">
                {currentJob.extensionRequest.additionalTime}
              </span>
            </div>

            <p className="text-xs text-slate-700 mb-2.5 leading-relaxed">
              <strong className="text-slate-900">{loc(worker?.name)}</strong> requested additional time: 
              <span className="italic ml-1">"{currentJob.extensionRequest.reason}"</span>
            </p>

            {currentJob.extensionRequest.status === 'pending' && (
              <button
                onClick={approveExtension}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs active:scale-98 transition flex items-center justify-center gap-1"
              >
                <Check size={13} />
                <span>{t('approveExtension')}</span>
              </button>
            )}
          </div>
        )}

        {/* START PIN CARD (Highlighted when partner arrives) */}
        {currentJob.status === 'worker_arrived' && (
          <div className="bg-white rounded-xl p-4 border-2 border-amber-400 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-tight flex items-center gap-1">
                <KeyRound size={14} className="text-amber-700" />
                {t('partnerArrivedDestination')}
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">
                {t('actionRequired')}
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-normal">
              {t('sharePinToStart')} (<strong className="text-slate-900">{loc(worker?.name)}</strong>)
            </p>

            {/* Clean PIN boxes */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">PIN:</span>
                {otpDigits.map((digit, i) => (
                  <span 
                    key={i} 
                    className="w-8 h-9 rounded-md bg-white border border-slate-300 text-slate-900 font-mono font-bold text-xl flex items-center justify-center shadow-2xs"
                  >
                    {digit}
                  </span>
                ))}
              </div>
              
              <button
                onClick={handleCopyOtp}
                className="px-2.5 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-1 text-slate-700 transition"
              >
                {copiedOtp ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copiedOtp ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
              Do not share this PIN over telephone or prior to arrival.
            </p>
          </div>
        )}

        {/* WORK COMPLETED PROMPT */}
        {currentJob.status === 'completed' && (
          <div className="bg-slate-900 text-white rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {t('timelineServiceCompleted')}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">
                  {t('inspectCompletedWork')}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {t('moneySafeNote')}
                </p>
              </div>

              <div className="text-right shrink-0 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1.5 rounded-lg">
                <span className="text-[9px] text-slate-400 block uppercase font-medium">{t('settlementAmount')}</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">₹{currentJob.budget}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/verify')}
              className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 px-4 rounded-xl text-xs shadow-xs active:scale-98 transition flex items-center justify-center gap-2 text-center"
            >
              <span>{t('workLooksGoodPay')}</span>
              <ArrowRight size={14} className="text-slate-900 shrink-0" />
            </button>
          </div>
        )}

        {/* 2 TO 4 DAYS QUALITY WARRANTY SECTION */}
        {['completed', 'verified'].includes(currentJob.status) && (
          <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-slate-900" />
                {t('qualityGuaranteeTitle')}
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                {t('guaranteeActiveDays')}
              </span>
            </div>

            {/* If no warranty query raised yet */}
            {!currentJob.warrantyClaim && (
              <div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {t('policyNote')}
                </p>
                <button
                  onClick={() => setShowWarrantyModal(true)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition active:scale-98 flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <AlertTriangle size={13} className="text-amber-400" />
                  <span>{t('reportProblem')}</span>
                </button>
              </div>
            )}

            {/* If Warranty Claim Raised: Show 3 Rebooking Options */}
            {currentJob.warrantyClaim && (
              <div className="space-y-3 pt-1">
                {/* Fault Summary Notice */}
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs space-y-1 text-slate-800">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1 text-slate-900">
                      <AlertTriangle size={13} className="text-amber-600" />
                      Quality Fault Logged (Day {currentJob.warrantyClaim.dayOfClaim || 2} of 4)
                    </span>
                    <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                      Guarantee Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Observed Issue: "{currentJob.warrantyClaim.issue}"
                  </p>
                </div>

                {/* 3 Rebooking Options Selection */}
                {currentJob.warrantyClaim.status === 'open_options' && (
                  <div className="space-y-3 pt-1">
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-tight block">
                      Select Rebooking Resolution:
                    </span>

                    {/* REBOOK OPTION 1: Free Same-Partner Revisit */}
                    <div className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Option 1: Complimentary Revisit with Same Partner
                          </span>
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            ₹0 (Free Warranty Inspection & Rectification)
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                          Free
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Original partner <strong>{worker?.name}</strong> will return to your location to adjust and fix the issue at no additional labor cost.
                      </p>
                      <button
                        onClick={() => rebookSameWorkerFree(currentJob.id)}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition active:scale-98 flex items-center justify-center gap-1"
                      >
                        <RotateCcw size={12} />
                        <span>Book Free Same-Partner Revisit (₹0)</span>
                      </button>
                    </div>

                    {/* REBOOK OPTION 2: Rebook Alternate Certified Specialist (3 choices at subsidized rate) */}
                    <div className="p-3 rounded-xl border-2 border-slate-900 bg-slate-50/70 space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Option 2: Rebook Alternate Certified Specialist
                          </span>
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            Subsidized Rate: ₹{discountedRebookFare} (55% Cooperative Rebate)
                          </span>
                        </div>
                        <span className="text-[10px] bg-slate-900 text-white font-bold px-1.5 py-0.5 rounded">
                          Recommended
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 leading-tight">
                        Choose among 3 nearby accredited certified partners for fresh diagnostic & corrective service:
                      </p>

                      {/* 3 Replacement Worker Choices */}
                      <div className="space-y-1.5 pt-1">
                        {alternativeWorkers.slice(0, 3).map((altW) => (
                          <div 
                            key={altW.id}
                            onClick={() => setSelectedAltWorkerId(altW.id)}
                            className={`p-2.5 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition ${
                              activeAltWorker.id === altW.id 
                                ? 'border-slate-900 bg-white shadow-2xs font-semibold' 
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-800">
                                {altW.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className="text-slate-900">{altW.name}</span>
                                  <TierBadge tier={altW.tier} size="sm" />
                                </div>
                                <span className="text-[10px] text-slate-400 block font-normal">
                                  {altW.distance} km away · {altW.rating}★ · {altW.completedJobs} jobs
                                </span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-900">₹{discountedRebookFare}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => rebookWarrantyJob(currentJob.id, activeAltWorker.id, discountedRebookFare)}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs active:scale-98 transition flex items-center justify-center gap-1"
                      >
                        <UserCheck size={13} />
                        <span>Dispatch {activeAltWorker.name} (₹{discountedRebookFare})</span>
                      </button>
                    </div>

                    {/* REBOOK OPTION 3: Escrow Settlement & Close (Move On) */}
                    <div className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Option 3: Settle Escrow & Close (Move On)
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Receive cooperative refund without booking another partner.
                        </span>
                      </div>

                      <button
                        onClick={() => closeWarrantyWithoutRebooking(currentJob.id)}
                        className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition active:scale-98 shrink-0 ml-2"
                      >
                        Close & Refund
                      </button>
                    </div>
                  </div>
                )}

                {/* If rebooked */}
                {currentJob.warrantyClaim.status === 'rebooked' && (
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>
                      {currentJob.warrantyClaim.resolutionType === 'same_worker_free'
                        ? 'Complimentary revisit active with original partner.'
                        : 'Subsidized corrective re-service active with replacement partner.'}
                    </span>
                  </div>
                )}

                {/* If closed without rebooking */}
                {currentJob.warrantyClaim.status === 'closed_refunded' && (
                  <div className="bg-slate-100 border border-slate-200 p-2.5 rounded-lg text-xs text-slate-700 flex items-center gap-2">
                    <Check size={16} className="text-slate-600 shrink-0" />
                    <span>Quality query resolved. Escrow settled with customer.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Booking Summary Card */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">{loc(currentJob.service)}</span>
              <h2 className="text-sm font-bold text-slate-900 mt-0.5">{loc(currentJob.title)}</h2>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-900">₹{currentJob.budget}</span>
              <span className="block text-[10px] text-slate-400">{loc('Fixed Rate')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2.5">
            <TierBadge tier={currentJob.tier || 1} size="sm" />
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <MapPin size={12} className="text-slate-400" /> {loc(currentJob.location)}
            </span>
          </div>

          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3">
            {loc(currentJob.description)}
          </p>

        {/* Itemized Guaranteed Fare Breakdown */}
          <div className="pt-2.5 border-t border-slate-100 space-y-1.5 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block mb-1">
              {loc('Fare Breakdown (Standardized Cooperative Rates)')}
            </span>
            {currentJob.bulkOption === 'contractor' ? (
              <>
                <div className="flex justify-between text-slate-500">
                  <span>Contractor Supervision & Machinery ({currentJob.contractorName || 'Licensed Contractor'})</span>
                  <span>₹{currentJob.contractorTeamId ? (state.contractorTeams?.find((t: ContractorTeam) => t.id === currentJob.contractorTeamId)?.baseSupervisorRate || 350) : 350}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Crew Labor ({currentJob.workerCount || 2} Specialists)</span>
                  <span>₹{currentJob.baseLaborFee || (currentJob.budget - 350 - (currentJob.distanceFee || 60))}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Heavy Equipment & Transport Transit</span>
                  <span>₹{currentJob.distanceFee || 60}</span>
                </div>
              </>
            ) : currentJob.bulkOption === 'skill_pool' ? (
              <>
                <div className="flex justify-between text-slate-500">
                  <span>Pooled Synchronized Labor ({currentJob.workerCount || 2} Individual Specialists)</span>
                  <span>₹{currentJob.baseLaborFee || (currentJob.budget - (currentJob.distanceFee || 70))}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Pooled Multi-Point Transit Allowance</span>
                  <span>₹{currentJob.distanceFee || 70}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between text-slate-500">
                  <span>Standard Labor (Level {currentJob.tier || 2})</span>
                  <span>₹{currentJob.baseLaborFee || (currentJob.budget - (currentJob.distanceFee || 36) - (currentJob.materialCost || 0))}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Distance Transit Allowance ({worker?.distance || 2.4} km @ ₹15/km)</span>
                  <span>₹{currentJob.distanceFee || Math.round((worker?.distance || 2.4) * 15)}</span>
                </div>
              </>
            )}
            
            <div className="flex justify-between text-slate-500">
              <span>Replacement Parts / Materials</span>
              <span className="font-medium text-slate-800">
                {currentJob.materialOption === 'worker_procures' ? `₹${currentJob.materialCost || 150} (Partner Supplied)` : '₹0 (Customer Provided)'}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>{t('workerCommissionZero')}</span>
              <span className="text-emerald-700 font-bold">₹0 (0% taken)</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>{t('customerPlatformFee')}</span>
              <span className="font-semibold text-slate-800">
                ₹{currentJob.customerFee || Math.round(currentJob.budget * 0.03)} (3%)
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs font-bold text-slate-900">
              <span>Total Guaranteed Escrow</span>
              <span>₹{currentJob.budget}</span>
            </div>

            {/* View Detailed Swiggy-Style Invoice */}
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="w-full mt-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-98"
            >
              <ReceiptText size={14} className="text-slate-700" />
              <span>{t('viewReceipt')}</span>
            </button>
          </div>
        </div>

        {/* WORKFORCE DETAILS (CONTRACTOR SQUAD / SKILL POOL / SOLO WORKER) */}
        {currentJob.bulkOption === 'contractor' ? (
          /* OPTION 1: CONTRACTOR SQUAD DISPLAY */
          <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-slate-900" />
                <h3 className="font-bold text-slate-900 text-xs tracking-tight">
                  Contractor Squad (Option 1)
                </h3>
              </div>
              <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">
                {currentJob.workerCount || 3} Worker Crew
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {currentJob.contractorName || 'Kongu Industrial Electrical Crew'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Lead Contractor: <strong className="text-slate-800">{state.contractorTeams?.find((t: ContractorTeam) => t.id === currentJob.contractorTeamId)?.leadName || 'Er. Sundaramurthy'}</strong>
                  </p>
                </div>
                <span className="text-xs font-bold bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-800">
                  4.9 ★
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                  <span className="text-slate-400 block text-[10px]">Supervision:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Check size={12} className="text-emerald-600" /> On-site Master Lead
                  </span>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-200/70">
                  <span className="text-slate-400 block text-[10px]">Equipment:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Check size={12} className="text-emerald-600" /> Industrial Machinery
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                <span>✓ Government Licensed & Insured Contractor</span>
                <span className="text-emerald-700 font-semibold">Verified Squad</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleCallPartner(currentJob.contractorName || 'Er. Sundaramurthy', 'Lead Contractor', '+91 080-6922-4829 Ext 501')}
                className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-98 shadow-2xs"
              >
                <Phone size={13} /> Call Crew Lead
              </button>
              <button 
                onClick={() => alert(`Opening group dispatch chat with ${currentJob.contractorName}...`)}
                className="py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-50 transition active:scale-98"
              >
                <MessageSquare size={13} /> Crew Chat
              </button>
            </div>
          </div>
        ) : currentJob.bulkOption === 'skill_pool' ? (
          /* OPTION 2: SKILL POOLING SQUAD DISPLAY */
          <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-xs tracking-tight flex items-center gap-1.5">
                  <UserCheck size={16} className="text-slate-900" />
                  Cooperative Skill Pool ({currentJob.workerCount || 3} Specialists)
                </h3>
                <span className="text-[10px] text-slate-400 block">Synchronized multi-worker dispatch</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                100% Direct to Workers
              </span>
            </div>

            {/* Pooled Workers Roster */}
            <div className="space-y-2">
              {(currentJob.pooledWorkers && currentJob.pooledWorkers.length > 0 
                ? currentJob.pooledWorkers 
                : workers.slice(0, currentJob.workerCount || 3)
              ).map((pw, idx) => (
                <div key={pw.id || idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      {pw.avatar || pw.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900">{pw.name}</span>
                        {idx === 0 && (
                          <span className="text-[9px] bg-slate-200 text-slate-700 px-1 py-0.2 rounded font-semibold">
                            Primary Lead
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {pw.skill} · {pw.rating}★ · {pw.distance} km away
                      </span>
                    </div>
                  </div>
                  <TierBadge tier={pw.tier} size="sm" />
                </div>
              ))}
            </div>

            <div className="bg-blue-50/70 border border-blue-200/70 p-2.5 rounded-lg text-[11px] text-blue-900 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-blue-700 shrink-0" />
              <span>All specialists are synchronized on the same job timeline and start PIN.</span>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleCallPartner((currentJob.pooledWorkers?.[0] || workers[0])?.name, 'Primary Squad Lead', '+91 080-6922-4829 Ext 202')}
                className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-98 shadow-2xs"
              >
                <Phone size={13} /> Call Lead Worker
              </button>
              <button 
                onClick={() => alert(`Opening group dispatch chat with pooled team...`)}
                className="py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-50 transition active:scale-98"
              >
                <MessageSquare size={13} /> Pool Chat
              </button>
            </div>
          </div>
        ) : worker ? (
          /* SOLO WORKER DISPLAY */
          <div>
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <h3 className="font-bold text-slate-900 text-xs tracking-tight">{t('assignedPartner')}</h3>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-100">
                {t('verified')}
              </span>
            </div>
            
            <WorkerCard worker={worker} />
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button 
                onClick={() => handleCallPartner(worker.name, 'Assigned Partner', worker.maskedPhone || '+91 080-6922-4829 Ext 118')}
                className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-98 shadow-2xs"
              >
                <Phone size={13} /> {t('callPartner')}
              </button>
              <button 
                onClick={() => alert(`Opening chat with ${worker.name}...`)}
                className="py-2 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 hover:bg-slate-50 transition active:scale-98"
              >
                <MessageSquare size={13} /> {t('chatPartner')}
              </button>
            </div>
            
            {/* WorkEasy Masked Line Notice */}
            <div className="flex items-center justify-between mt-2 px-2 py-1 bg-emerald-50/70 border border-emerald-200/60 rounded-lg text-[10px] text-emerald-800">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck size={11} className="text-emerald-600" />
                {t('maskedCallSafetyBadge')}: Real numbers hidden
              </span>
              <span className="font-mono font-bold">
                {worker.maskedPhone || '+91 080-6922-4829 Ext 118'}
              </span>
            </div>
          </div>
        ) : null}

        {/* Real-time Order Progress */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs">
          <h3 className="font-bold text-slate-900 text-xs tracking-tight mb-3">{t('serviceTimeline')}</h3>
          <StatusTimeline currentStatus={currentJob.status} />
        </div>
      </div>

      {/* RAISE WARRANTY QUALITY QUERY MODAL (2 TO 4 DAYS) */}
      {showWarrantyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-end justify-center p-4">
          <div className="bg-white rounded-2xl p-5 shadow-2xl max-w-sm w-full border border-slate-200 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <AlertTriangle size={16} className="text-amber-600" />
                <h3 className="text-xs font-bold text-slate-900">Flag Quality Fault (2 to 4 Days)</h3>
              </div>
              <button 
                onClick={() => setShowWarrantyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">
              Quality faults can be reported strictly between <strong>Day 2 and Day 4</strong> post-service. Submitting this will present you with 3 cooperative resolution options.
            </p>

            <div className="space-y-3 mb-4">
              {/* Day of Observation (2 to 4 days) */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block mb-1.5">
                  Observed On (Within Guarantee Window):
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { day: 2, label: 'Day 2' },
                    { day: 3, label: 'Day 3' },
                    { day: 4, label: 'Day 4' },
                  ].map((d) => (
                    <button
                      key={d.day}
                      type="button"
                      onClick={() => setWarrantyDay(d.day)}
                      className={`py-2 rounded-lg border text-xs font-semibold text-center transition ${
                        warrantyDay === d.day
                          ? 'border-slate-900 bg-slate-900 text-white shadow-2xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block mb-1.5">
                  Select Observed Issue:
                </label>
                <div className="space-y-1.5">
                  {[
                    'Tap started leaking again after 2 days of service',
                    'Joint sealant loosened and dripping water',
                    'Switchboard sparking or loose wiring connection',
                    'Fittings came loose or inadequate installation'
                  ].map((issue) => (
                    <button
                      key={issue}
                      type="button"
                      onClick={() => setWarrantyIssue(issue)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition ${
                        warrantyIssue === issue 
                          ? 'border-slate-900 bg-slate-50 text-slate-900 font-semibold shadow-2xs' 
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block mb-1">
                  Additional Notes (Optional):
                </label>
                <textarea
                  value={customWarrantyText}
                  onChange={(e) => setCustomWarrantyText(e.target.value)}
                  rows={2}
                  placeholder="Describe specific symptoms or location of fault..."
                  className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-slate-900"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowWarrantyModal(false)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRaiseWarranty}
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition shadow-xs"
              >
                Submit & View 3 Rebooking Options
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WorkEasy Masked Call Modal */}
      <MaskedCallModal
        isOpen={showMaskedCallModal}
        onClose={() => setShowMaskedCallModal(false)}
        callerName={`${state.customer.name} (Customer)`}
        calleeName={calleeInfo.name}
        calleeRole={calleeInfo.role}
        maskedNumber={calleeInfo.maskedNumber}
      />

      {/* Swiggy-Style Detailed Service Invoice Modal */}
      <ServiceInvoiceModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        job={currentJob}
        worker={worker}
      />
    </AnimatedPage>
  );
};
export default CustomerJobDetails;
