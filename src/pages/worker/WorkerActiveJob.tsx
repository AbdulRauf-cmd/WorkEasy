import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import TierBadge from '../../components/TierBadge';
import StatusTimeline from '../../components/StatusTimeline';
import LanguageSwitch from '../../components/LanguageSwitch';
import MaskedCallModal from '../../components/MaskedCallModal';
import { 
  MapPin, 
  Phone, 
  KeyRound, 
  AlertCircle, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Radio,
  Lock
} from 'lucide-react';
import { 
  DEFAULT_CUSTOMER_COORDS, 
  calculateDistanceMeters, 
  Coordinates 
} from '../../utils/geoUtils';

const WorkerActiveJob: React.FC = () => {
  const { state, markArrived, verifyArrivalOtp, requestExtension, t } = useApp();
  const navigate = useNavigate();
  const job = state.currentJob;

  // Extension request state
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [extensionTime, setExtensionTime] = useState('+45 mins');
  const [extensionReason, setExtensionReason] = useState('Adhesive / Sealant requires curing before pressure test');

  // Masked Call Modal state (Rapido style)
  const [showMaskedCallModal, setShowMaskedCallModal] = useState(false);

  // Geo-Coordinates & OTP Proximity State
  const customerCoords = job?.customerCoordinates || DEFAULT_CUSTOMER_COORDS;
  const [isOtpSimulatedOnSite, setIsOtpSimulatedOnSite] = useState(true);

  const workerCoords: Coordinates = isOtpSimulatedOnSite
    ? { lat: 11.016930, lng: 76.955920 } // ~18m away
    : { lat: 11.042100, lng: 76.983200 }; // ~3.2km away

  const otpDistanceMeters = calculateDistanceMeters(workerCoords, customerCoords);
  const isOtpWithinGeoFence = otpDistanceMeters <= 100;

  // OTP inputs state
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (job?.status === 'worker_arrived') {
      inputRefs[0].current?.focus();
    }
  }, [job?.status]);

  if (!job) {
    return (
      <AnimatedPage className="p-6 pt-16 flex flex-col items-center justify-center min-h-[70vh] text-center bg-slate-50">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400">
          <AlertCircle size={24} />
        </div>
        <h2 className="text-base font-bold text-slate-900 mb-1">{t('noActiveBooking')}</h2>
        <p className="text-xs text-slate-500 mb-4">{t('noActiveBookingDesc')}</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-slate-900 text-white font-semibold px-4 py-2.5 rounded-lg text-xs active:scale-95 transition"
        >
          {t('availableDispatchRequests')}
        </button>
      </AnimatedPage>
    );
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 4).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 4) newOtp[i] = d;
      });
      setOtp(newOtp);
      setOtpError('');
      if (digits.length === 4) {
        inputRefs[3].current?.focus();
      }
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setOtpError('');

    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleAutofillDemoOtp = () => {
    const validOtp = (job.arrivalOtp || '4829').split('');
    setOtp(validOtp);
    setOtpError('');
  };

  const handleVerifyOtp = () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      setOtpError('Please enter all 4 digits of customer PIN');
      return;
    }

    // Strict Geo-Fence Verification upon PIN Entry
    if (!isOtpWithinGeoFence) {
      setOtpError(`${t('pinGeoFailed')} (${otpDistanceMeters}m away from customer site)`);
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const isValid = verifyArrivalOtp(fullOtp);
      setIsVerifying(false);
      if (!isValid) {
        setOtpError('Invalid PIN code. Please confirm with the customer.');
      }
    }, 450);
  };

  const customerMaskedPhone = state.customer.maskedPhone || '+91 080-6922-8492 Ext 704';

  return (
    <AnimatedPage className="pb-16 pt-3 px-4 bg-slate-50 min-h-screen">
      {/* Top Header with Language Switch */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
          {t('activeAssignment')}
        </span>
        <LanguageSwitch />
      </div>

      {/* Top Details Card */}
      <div className="bg-white rounded-xl shadow-2xs border border-slate-200/90 p-4 mb-3.5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-sm font-bold text-slate-900 mt-0.5">{job.title}</h1>
            <span className="text-[10px] text-slate-500 font-mono block">Order #{job.id.slice(-4).toUpperCase()}</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-900">₹{job.budget}</span>
            <span className="block text-[10px] text-slate-400 font-normal">{t('fixedPrice')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <TierBadge tier={job.tier || 2} size="sm" />
          <span className="text-[11px] text-slate-500 font-medium">{t('zeroCommissionKeep100')}</span>
        </div>
        
        {/* Customer Location & Masked Contact Card (Rapido style) */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 space-y-2 text-xs text-slate-600 mb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">{state.customer.name}</p>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin size={12} className="text-slate-400" /> {job.location} ({otpDistanceMeters}m away)
              </p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Lock size={9} /> {customerMaskedPhone}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setShowMaskedCallModal(true)}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 transition shadow-2xs active:scale-95"
                title="Call Customer via Secure Relay"
              >
                <Phone size={12} /> {t('call')}
              </button>
              <button 
                onClick={() => alert(`Opening GPS navigation to ${job.location}...`)}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-1 transition"
              >
                <Navigation size={12} /> Map
              </button>
            </div>
          </div>

          <p className="pt-1.5 text-slate-500 border-t border-slate-200/60 italic text-[11px]">
            "{job.description}"
          </p>
        </div>

        {/* Live Timeline */}
        <div className="pt-2 border-t border-slate-100">
          <StatusTimeline currentStatus={job.status} />
        </div>
      </div>

      {/* DYNAMIC ACTION WORKFLOW */}
      <div className="space-y-3">
        {/* STEP 1: EN ROUTE -> MARK ARRIVED */}
        {job.status === 'accepted' && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="mb-3">
              <h3 className="text-xs font-bold text-slate-900">{t('navigatingToCustomer')}</h3>
              <p className="text-[11px] text-slate-500">Tap below once you have arrived at {state.customer.name}'s door.</p>
            </div>

            <button
              onClick={() => markArrived()}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg text-xs shadow-xs transition active:scale-98"
            >
              {t('arrivedAtCustomerSite')}
            </button>
          </div>
        )}

        {/* STEP 2: ARRIVED -> ENTER CUSTOMER PIN (CROSS-CHECKED WITH GEO COORDINATES) */}
        {job.status === 'worker_arrived' && (
          <div className="bg-white p-4 rounded-xl border-2 border-slate-900 shadow-xs">
            <div className="mb-2">
              <div className="flex items-center gap-1.5 mb-1">
                <KeyRound size={15} className="text-slate-900" />
                <h3 className="font-bold text-xs text-slate-900">{t('enterStartPin')}</h3>
              </div>
              <p className="text-[11px] text-slate-500">{t('sharePinToStart')}</p>
            </div>

            {/* Geo-Fence Check Indicator inside PIN Screen */}
            <div className={`p-2.5 rounded-lg border mb-3 text-xs transition-colors ${
              isOtpWithinGeoFence 
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                : 'bg-red-50/70 border-red-200 text-red-900'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} className={isOtpWithinGeoFence ? 'text-emerald-700' : 'text-red-600'} />
                  <span className="text-[11px] font-bold">
                    {isOtpWithinGeoFence ? t('pinGeoVerified') : t('geoFenceFailed')}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  {otpDistanceMeters}m
                </span>
              </div>
              <p className="text-[10px] leading-tight opacity-90">
                {isOtpWithinGeoFence 
                  ? `Worker is physically verified on-site (${otpDistanceMeters}m from customer door). PIN unlock authorized.`
                  : t('pinGeoFailed')}
              </p>

              {/* Simulation Toggle for Demo Testing */}
              <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[9px] text-slate-500 font-medium">GPS Simulation:</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOtpSimulatedOnSite(true);
                      setOtpError('');
                    }}
                    className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                      isOtpSimulatedOnSite 
                        ? 'bg-emerald-700 text-white' 
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    On-Site (18m)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOtpSimulatedOnSite(false)}
                    className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                      !isOtpSimulatedOnSite 
                        ? 'bg-red-700 text-white' 
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    Off-Site (3.2 km)
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Digit Boxes */}
            <div className="my-2">
              <div className="flex justify-center gap-2 mb-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-11 text-center text-lg font-bold rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-slate-900 outline-none transition-all font-mono"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-[11px] font-semibold text-red-600 text-center flex items-center justify-center gap-1 my-1">
                  <AlertCircle size={12} className="shrink-0" /> {otpError}
                </p>
              )}
            </div>

            {/* Quick Demo Autofill */}
            <div className="flex justify-center mb-3">
              <button
                type="button"
                onClick={handleAutofillDemoOtp}
                className="text-[10px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition"
              >
                Autofill PIN ({job.arrivalOtp || '4829'})
              </button>
            </div>

            {/* Submit Button */}
            <button
              disabled={isVerifying}
              onClick={handleVerifyOtp}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold py-3 rounded-lg text-xs shadow-xs transition active:scale-98"
            >
              {isVerifying ? 'Verifying Coordinates & PIN...' : t('verifyPinAndStart')}
            </button>
          </div>
        )}

        {/* STEP 3: IN PROGRESS -> MARK COMPLETED & REQUEST MORE TIME */}
        {job.status === 'in_progress' && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-tight">
                  {t('timelineServiceInProgress')}
                </span>
                <h3 className="font-semibold text-xs text-slate-900 mt-1">{job.title}</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">PIN & Geo Verified ✓</span>
            </div>

            {/* EXTENSION STATUS BANNER (If requested) */}
            {job.extensionRequest && (
              <div className={`p-3 rounded-lg border text-xs ${
                job.extensionRequest.status === 'approved'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}>
                <div className="flex items-center justify-between font-bold mb-0.5">
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {t('extensionRequested')}: {job.extensionRequest.status === 'approved' ? 'Approved ✓' : 'Pending ⏳'}
                  </span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-current">
                    {job.extensionRequest.additionalTime}
                  </span>
                </div>
                <p className="text-[11px] opacity-90">
                  Reason: "{job.extensionRequest.reason}"
                </p>
              </div>
            )}

            <p className="text-[11px] text-slate-500">
              {t('timelineServiceCompletedDetail')}
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => navigate('/worker/completion')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg text-xs shadow-xs transition active:scale-98"
              >
                {t('markTaskComplete')}
              </button>

              {/* REQUEST EXTENSION BUTTON */}
              {!job.extensionRequest && (
                <button
                  onClick={() => setShowExtensionModal(true)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Clock size={13} />
                  <span>{t('requestTimeExtension')}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: COMPLETED -> AWAITING VERIFICATION */}
        {job.status === 'completed' && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-center">
            <p className="font-semibold text-xs text-amber-900">{t('timelineServiceCompleted')}</p>
            <p className="text-[11px] text-amber-700 mt-0.5">
              ₹{job.budget} {t('timelinePaymentReleasedDetail')}
            </p>
          </div>
        )}

        {/* STEP 5: VERIFIED */}
        {job.status === 'verified' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-center">
            <CheckCircle2 size={20} className="text-emerald-600 mx-auto mb-1" />
            <p className="font-semibold text-xs text-emerald-900">{t('timelinePaymentReleased')}</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">₹{job.budget} deposited directly.</p>
          </div>
        )}
      </div>

      {/* EXTENSION REQUEST MODAL */}
      {showExtensionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-end justify-center p-4">
          <div className="bg-white rounded-2xl p-5 shadow-2xl max-w-sm w-full border border-slate-200 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-slate-900" />
                <h3 className="text-xs font-bold text-slate-900">{t('requestTimeExtension')}</h3>
              </div>
              <button 
                onClick={() => setShowExtensionModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">
                  Additional Time Needed:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['+15 mins', '+30 mins', '+45 mins'].map((tm) => (
                    <button
                      key={tm}
                      type="button"
                      onClick={() => setExtensionTime(tm)}
                      className={`py-2 rounded-lg text-xs font-semibold border transition ${
                        extensionTime === tm
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {tm}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-1">
                  Technical Reason:
                </label>
                <textarea
                  value={extensionReason}
                  onChange={(e) => setExtensionReason(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-slate-900 resize-none"
                />
              </div>

              <button
                onClick={() => {
                  requestExtension(extensionTime, extensionReason);
                  setShowExtensionModal(false);
                }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs active:scale-98 transition"
              >
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rapido-Style Masked Call Modal */}
      <MaskedCallModal
        isOpen={showMaskedCallModal}
        onClose={() => setShowMaskedCallModal(false)}
        callerName="Ramesh Kumar (Partner)"
        calleeName={state.customer.name}
        calleeRole="Customer"
        maskedNumber={customerMaskedPhone}
      />
    </AnimatedPage>
  );
};

export default WorkerActiveJob;
