import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  ShieldCheck, 
  X, 
  Lock, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  callerName: string;
  calleeName: string;
  calleeRole: string;
  maskedNumber: string;
}

export default function MaskedCallModal({
  isOpen,
  onClose,
  callerName,
  calleeName,
  calleeRole,
  maskedNumber,
}: Props) {
  const { t } = useApp();
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer: any;
    if (callState === 'connected') {
      timer = setInterval(() => {
        setCallDuration((d) => d + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callState]);

  useEffect(() => {
    if (!isOpen) {
      setCallState('idle');
      setCallDuration(0);
      setIsMuted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startSimulatedCall = () => {
    setCallState('connecting');
    setTimeout(() => {
      setCallState('connected');
    }, 1500);
  };

  const endCall = () => {
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Security Badge */}
        <div className="bg-slate-900 text-white p-4 relative text-center">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-slate-400 hover:text-white p-1 rounded-full transition"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          
          <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/30 mb-2">
            <Lock size={10} />
            <span>{t('maskedCallSafetyBadge')}</span>
          </div>

          <h3 className="text-sm font-bold tracking-tight">{t('maskedCallTitle')}</h3>
          <p className="text-[11px] text-slate-300 mt-0.5">{t('maskedCallSubtitle')}</p>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4">
          {callState === 'idle' && (
            <>
              {/* Caller & Callee Relay Diagram */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center justify-between">
                <div className="text-center w-24">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center mx-auto mb-1">
                    {callerName.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 truncate">{callerName}</p>
                  <p className="text-[9px] text-slate-500">Real Number Hidden</p>
                </div>

                <div className="flex-1 flex flex-col items-center px-1">
                  <div className="w-full flex items-center justify-center">
                    <div className="h-0.5 flex-1 bg-emerald-400"></div>
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mx-1">
                      <ShieldCheck size={14} />
                    </div>
                    <div className="h-0.5 flex-1 bg-emerald-400"></div>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-700 mt-1 uppercase tracking-tight">VoIP Relay</span>
                </div>

                <div className="text-center w-24">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-1">
                    {calleeName.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 truncate">{calleeName}</p>
                  <p className="text-[9px] text-slate-500">{calleeRole}</p>
                </div>
              </div>

              {/* Masked Virtual Line Card */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-tight block">
                  {t('maskedCallVirtualNumber')}
                </span>
                <span className="text-sm font-extrabold text-slate-900 tracking-wider font-mono block mt-0.5">
                  {maskedNumber}
                </span>
                <span className="text-[10px] text-emerald-700 mt-0.5 block">
                  (WorkEasy Virtual Number — No direct phone exchange)
                </span>
              </div>

              {/* Privacy Disclosure */}
              <p className="text-[11px] text-slate-500 leading-relaxed text-center px-1">
                {t('maskedCallPrivacyNote')}
              </p>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={startSimulatedCall}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
                >
                  <PhoneCall size={14} />
                  <span>{t('maskedCallStartBtn')}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
                >
                  {t('maskedCallClose')}
                </button>
              </div>
            </>
          )}

          {callState === 'connecting' && (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-pulse">
                <PhoneCall size={28} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">{t('maskedCallConnecting')}</h4>
              <p className="text-xs text-slate-500 font-mono">{maskedNumber}</p>
            </div>
          )}

          {callState === 'connected' && (
            <div className="py-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Phone size={28} />
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900">{calleeName}</h4>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                  Secure Call in Progress • {formatSeconds(callDuration)}
                </p>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Virtual Line: {maskedNumber}</p>
              </div>

              {/* Call in-flight controls */}
              <div className="flex justify-center gap-4 py-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3 rounded-full border transition ${
                    isMuted ? 'bg-red-100 border-red-300 text-red-700' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <button
                  onClick={endCall}
                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md transition active:scale-95"
                  title="End Call"
                >
                  <PhoneOff size={18} />
                </button>
              </div>
            </div>
          )}

          {callState === 'ended' && (
            <div className="py-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
                <PhoneOff size={22} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Call Ended</h4>
              <p className="text-[11px] text-slate-500">Duration: {formatSeconds(callDuration)} • Line Disconnected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
