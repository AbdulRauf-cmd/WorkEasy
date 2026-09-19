import React, { useState } from 'react';
import AnimatedPage from '../../components/AnimatedPage';
import TierBadge from '../../components/TierBadge';
import { 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  Users, 
  BookOpen, 
  ChevronRight, 
  Sparkles,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ServiceType } from '../../types';
import LanguageSwitch from '../../components/LanguageSwitch';
import { Globe } from 'lucide-react';

export const WorkerProfile: React.FC = () => {
  const { state, requestMentorship, logMentorshipHours, upgradeApprenticeTier, t } = useApp();
  
  // Choose which worker profile to view for demonstration (Ramesh Kumar L2, Suresh Babu L1, Meena Devi L1)
  const [activeWorkerId, setActiveWorkerId] = useState<string>('w4'); // Suresh Babu L1 by default to showcase low-level tutoring
  const [showPairingModal, setShowPairingModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<ServiceType>('Plumbing');

  const currentWorker = state.workers.find(w => w.id === activeWorkerId) || state.workers[3];
  const masterMentors = state.workers.filter(w => w.isMentor && w.tier > currentWorker.tier);
  const activeSession = state.mentorshipSessions.find(s => s.apprenticeId === currentWorker.id);

  const hoursLogged = currentWorker.apprenticeshipHours || 22;
  const goalHours = currentWorker.apprenticeshipGoalHours || 30;
  const progressPercent = Math.min(100, Math.round((hoursLogged / goalHours) * 100));

  const handleSimulateShadowing = () => {
    if (activeSession) {
      logMentorshipHours(activeSession.id, 4);
    } else {
      // Fallback update
      alert("Simulated: Logged 4 hours of on-site task shadowing with Master Mentor.");
    }
  };

  const handleGraduate = () => {
    upgradeApprenticeTier(currentWorker.id);
    alert(`🎉 Congratulations! ${currentWorker.name} has completed 30 hours of verified tutoring and upgraded to Level ${currentWorker.tier + 1}!`);
  };

  return (
    <AnimatedPage className="pb-16 pt-4 px-4 bg-slate-50 min-h-screen">
      {/* Worker Persona Switcher for Demo */}
      <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200/80 mb-3 text-xs">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Active Persona:</span>
        <div className="flex gap-1">
          {[
            { id: 'w4', name: 'Suresh (L1 Apprentice)' },
            { id: 'w2', name: 'Meena (L1 Apprentice)' },
            { id: 'w1', name: 'Ramesh (L2 Tutor)' },
            { id: 'w3', name: 'Arjun (L3 Master)' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveWorkerId(p.id)}
              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition ${
                activeWorkerId === p.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Partner Header */}
      <div className="flex items-center gap-3.5 mb-3.5 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base">
          {currentWorker.avatar}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h1 className="text-sm font-bold text-slate-900">{currentWorker.name}</h1>
            <CheckCircle2 size={14} className="text-emerald-600" />
          </div>
          <p className="text-xs text-slate-500">{currentWorker.skill} · {t('workerHub')}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <TierBadge tier={currentWorker.tier} size="sm" />
            <span className="text-[10px] text-slate-400">Partner #{currentWorker.id.toUpperCase()}</span>
          </div>
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

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">{t('ratingLabel')}</span>
          <span className="font-bold text-slate-900 text-sm flex items-center justify-center gap-0.5">
            {currentWorker.rating} <Star size={12} className="text-amber-400 fill-amber-400" />
          </span>
          <span className="text-[10px] text-slate-400">Audited</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Experience</span>
          <span className="font-bold text-slate-900 text-sm block">{currentWorker.experience} Yrs</span>
          <span className="text-[10px] text-slate-400">{t('verified')}</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">{t('completedJobsLabel')}</span>
          <span className="font-bold text-slate-900 text-sm block">{currentWorker.completedJobs}</span>
          <span className="text-[10px] text-slate-400">{t('done')}</span>
        </div>
      </div>

      {/* COOPERATIVE TUTORING & APPRENTICESHIP UPSKILLING HUB */}
      <div className="bg-white rounded-xl border-2 border-slate-900 shadow-xs p-4 mb-3.5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <GraduationCap size={16} className="text-slate-900" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
              Cooperative Tutoring & Apprenticeship
            </h2>
          </div>
          <span className="text-[10px] bg-slate-900 text-white font-bold px-2 py-0.5 rounded">
            Upskill Program
          </span>
        </div>

        <p className="text-[11px] text-slate-600 leading-normal mb-3">
          Low-tier workers can accompany certified master craftsmen on live jobs to learn trade competencies safely and earn hours towards higher tier certification.
        </p>

        {/* Progress Tracker Card */}
        {currentWorker.tier < 3 ? (
          <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 mb-3 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900">
                Target: Level {currentWorker.tier + 1} Certification
              </span>
              <span className="font-mono font-bold text-slate-800">
                {hoursLogged} / {goalHours} hrs ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-slate-900 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>

            {/* Assigned Master Tutor */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Active Master Tutor:</span>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  <Users size={12} className="text-slate-600" />
                  {currentWorker.mentorName || 'Arjun Raj (Level 3 Master)'}
                </span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                On-Site Pairing Active
              </span>
            </div>

            {/* Actions: Log Tutoring Shadowing Hours or Graduate */}
            <div className="pt-1 flex gap-2">
              <button
                type="button"
                onClick={handleSimulateShadowing}
                className="flex-1 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-[11px] font-semibold transition active:scale-98 flex items-center justify-center gap-1"
              >
                <Plus size={12} />
                <span>Log Shadowing (+4h)</span>
              </button>

              {progressPercent >= 100 ? (
                <button
                  type="button"
                  onClick={handleGraduate}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold transition shadow-xs flex items-center justify-center gap-1"
                >
                  <Sparkles size={12} />
                  <span>Graduate to Tier {currentWorker.tier + 1}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPairingModal(true)}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-semibold transition shadow-xs flex items-center justify-center gap-1"
                >
                  <BookOpen size={12} />
                  <span>Pair with Master Mentor</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* High-Level Worker is a Certified Master Tutor */
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1">
                <Award size={14} className="text-emerald-700" /> Certified Master Tutor
              </span>
              <span className="text-[10px] bg-white border border-emerald-300 font-bold px-1.5 py-0.5 rounded">
                Tier 3 Master
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-tight">
              {currentWorker.name} is accredited by the cooperative to tutor Level 1 and Level 2 apprentices during complex assignments.
            </p>
            <div className="pt-1 border-t border-emerald-200/60 flex justify-between items-center text-[10px] text-emerald-900 font-medium">
              <span>Active Apprentices Supervised: 2</span>
              <span>Tutoring Stipend: ₹100/job extra</span>
            </div>
          </div>
        )}
      </div>

      {/* Verified Credentials */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-3.5 mb-3.5">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-2 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-slate-900" />
          Verified Credentials & Safety Standards
        </h2>
        <div className="space-y-1.5 text-xs text-slate-700">
          <p className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
            <span>Government Aadhaar Identity & Criminal Background Clear</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
            <span>Cooperative Technical Skill Certification (Level {currentWorker.tier})</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
            <span>Apprenticeship Trade Log Synchronized with Cooperative Registry</span>
          </p>
        </div>
      </div>

      {/* Fair Work Dispatch Telemetry */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs p-3.5 mb-3.5">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-1">Fair Work Allocation</h2>
        <p className="text-[11px] text-slate-500 mb-2">Automated round-robin job distribution log.</p>
        <div className="bg-slate-50 rounded-lg p-2 text-xs font-mono space-y-1 border border-slate-200/60">
          <div className="flex justify-between py-0.5 border-b border-slate-200"><span className="text-slate-500">Order #101</span><span className="text-slate-800">→ Meena (Cleaning)</span></div>
          <div className="flex justify-between py-0.5 border-b border-slate-200"><span className="text-slate-500">Order #102</span><span className="text-slate-800">→ Suresh (Gardening)</span></div>
          <div className="flex justify-between py-0.5"><span className="text-slate-500">Order #103</span><span className="font-bold text-slate-900">→ Ramesh (Plumbing)</span></div>
        </div>
      </div>

      {/* PAIR WITH MASTER TUTOR MODAL */}
      {showPairingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-end justify-center p-4">
          <div className="bg-white rounded-2xl p-5 shadow-2xl max-w-sm w-full border border-slate-200 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <GraduationCap size={16} className="text-slate-900" />
                <h3 className="text-xs font-bold text-slate-900">Select Master Mentor for Tutoring</h3>
              </div>
              <button 
                onClick={() => setShowPairingModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mb-3">
              Select a certified Master craftsman to shadow on real field service visits to earn accredited apprenticeship hours:
            </p>

            <div className="space-y-2 mb-4">
              {masterMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  onClick={() => {
                    requestMentorship(currentWorker.id, mentor.id, mentor.skill);
                    setShowPairingModal(false);
                    alert(`Paired with ${mentor.name}! You will receive notifications when ${mentor.name} accepts high-skill jobs for shadowing.`);
                  }}
                  className="p-3 rounded-xl border border-slate-200 hover:border-slate-900 bg-white cursor-pointer transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      {mentor.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900">{mentor.name}</span>
                        <TierBadge tier={mentor.tier} size="sm" />
                      </div>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {mentor.skill} Master · {mentor.experience} yrs exp · {mentor.rating}★
                      </span>
                    </div>
                  </div>

                  <button className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-bold">
                    Select
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPairingModal(false)}
              className="w-full py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-200 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default WorkerProfile;

