import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, Job, JobStatus, Role, ServiceType, MentorshipSession, Worker, Tier, ContractorTeam, BulkOptionType, Language } from '../types';
import { mockCustomer, mockWorkers, initialWarrantyJob, initialPastJob, mockMentorshipSessions, mockContractorTeams } from '../data/mockData';
import { classifyTier } from '../utils/tierClassification';
import { getTranslation, Translations, localizeText, localizeJob } from '../i18n/translations';

interface AppContextType extends AppState {
  setRole: (role: Role) => void;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
  loc: (text: string | undefined | null) => string;
  localizeJob: (job: Job | null | undefined) => Job | null;
  postJob: (jobData: Partial<Job>) => void;
  classifyJob: () => void;
  matchWorker: () => void;
  acceptJob: () => void;
  markArrived: () => void;
  startJob: () => void;
  verifyArrivalOtp: (otp: string) => boolean;
  completeJob: () => void;
  verifyJob: () => void;
  rateJob: (rating: number, feedback: string, tip?: number) => void;
  addTipToJob: (amount: number) => void;
  requestMentorship: (apprenticeId: string, mentorId: string, skill: ServiceType) => void;
  logMentorshipHours: (sessionId: string, hours: number) => void;
  upgradeApprenticeTier: (workerId: string) => void;
  requestExtension: (additionalTime: string, reason: string) => void;
  approveExtension: () => void;
  raiseWarrantyQuery: (jobId: string, issue: string, dayOfClaim?: number) => void;
  rebookSameWorkerFree: (originalJobId: string) => void;
  rebookWarrantyJob: (originalJobId: string, newWorkerId: string, discountedBudget: number) => void;
  closeWarrantyWithoutRebooking: (originalJobId: string) => void;
  resetDemo: () => void;
}

const defaultState: AppState = {
  role: 'customer',
  language: 'en',
  currentJob: initialWarrantyJob,
  jobs: [initialWarrantyJob, initialPastJob],
  workers: mockWorkers,
  contractorTeams: mockContractorTeams,
  mentorshipSessions: mockMentorshipSessions,
  customer: mockCustomer,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('workeasy_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          language: parsed.language || 'en',
          workers: parsed.workers || mockWorkers,
          contractorTeams: parsed.contractorTeams || mockContractorTeams,
          mentorshipSessions: parsed.mentorshipSessions || mockMentorshipSessions,
        };
      } catch (e) {
        console.error('Failed to parse state from localStorage', e);
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('workeasy_state', JSON.stringify(state));
  }, [state]);

  const updateJob = (updates: Partial<Job>) => {
    setState((prev) => {
      if (!prev.currentJob) return prev;
      const updatedJob = { ...prev.currentJob, ...updates };
      return {
        ...prev,
        currentJob: updatedJob,
        jobs: prev.jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)),
      };
    });
  };

  const setRole = (role: Role) => setState((prev) => ({ ...prev, role }));

  const postJob = (jobData: Partial<Job>) => {
    const serviceName = (jobData.service as ServiceType) || 'Plumbing';
    const computedTier = jobData.tier || classifyTier(serviceName, `${jobData.title || ''} ${jobData.description || ''}`);

    const newJob: Job = {
      id: `job_${Date.now()}`,
      service: serviceName,
      title: jobData.title || 'Custom Service Request',
      description: jobData.description || '',
      location: jobData.location || mockCustomer.location,
      date: jobData.date || 'Today',
      time: jobData.time || '10:00 AM',
      budget: jobData.budget || 486,
      baseLaborFee: jobData.baseLaborFee,
      distanceFee: jobData.distanceFee,
      materialOption: jobData.materialOption || 'customer_provides',
      materialCost: jobData.materialCost || 0,
      tier: computedTier,
      status: 'posted',
      arrivalOtp: '4829',
      customerId: mockCustomer.id,
      workerId: jobData.workerId,
      workerCount: jobData.workerCount || 1,
      bulkOption: jobData.bulkOption,
      contractorTeamId: jobData.contractorTeamId,
      contractorName: jobData.contractorName,
      pooledWorkerIds: jobData.pooledWorkerIds,
      pooledWorkers: jobData.pooledWorkers,
      vehicleType: jobData.vehicleType,
      punctureType: jobData.punctureType,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      currentJob: newJob,
      jobs: [...prev.jobs, newJob],
    }));
  };

  const classifyJob = () => {
    if (state.currentJob) {
      const computedTier = classifyTier(
        state.currentJob.service, 
        `${state.currentJob.title} ${state.currentJob.description}`
      );
      updateJob({
        tier: computedTier,
        status: 'classified'
      });
    }
  };

  const matchWorker = () => {
    if (state.currentJob) {
      const jobTier = state.currentJob.tier || 1;
      const isBulk = (state.currentJob.workerCount || 1) > 1;

      if (isBulk && state.currentJob.bulkOption === 'contractor') {
        const matchingContractor = 
          state.contractorTeams.find(c => c.id === state.currentJob?.contractorTeamId) ||
          state.contractorTeams.find(c => c.skill === state.currentJob?.service) ||
          state.contractorTeams[0];

        updateJob({
          status: 'matched',
          contractorTeamId: matchingContractor.id,
          contractorName: matchingContractor.name,
          workerId: matchingContractor.id,
        });
        return;
      }

      if (isBulk && state.currentJob.bulkOption === 'skill_pool') {
        const requiredCount = state.currentJob.workerCount || 2;
        const matchingWorkers = state.workers.filter(
          w => (w.skill === state.currentJob?.service || w.tier >= jobTier)
        ).slice(0, requiredCount);

        const pooled = matchingWorkers.length >= requiredCount 
          ? matchingWorkers 
          : state.workers.slice(0, requiredCount);

        updateJob({
          status: 'matched',
          workerId: pooled[0]?.id || state.workers[0].id,
          pooledWorkerIds: pooled.map(w => w.id),
          pooledWorkers: pooled,
        });
        return;
      }

      // Solo single-worker booking - Automatic Fair Round-Robin matching
      const eligibleWorkers = state.workers.filter(
        (w) => w.skill === state.currentJob?.service && w.tier >= jobTier
      ).sort((a, b) => a.distance - b.distance);
      
      const eligibleWorker = eligibleWorkers[0] || state.workers.find((w) => w.tier >= jobTier) || state.workers[0];

      updateJob({
        status: 'matched',
        workerId: eligibleWorker.id,
      });
    }
  };

  const acceptJob = () => updateJob({ status: 'accepted' });
  const markArrived = () => updateJob({ status: 'worker_arrived' });
  const startJob = () => updateJob({ status: 'in_progress' });
  const verifyArrivalOtp = (otp: string): boolean => {
    const validOtp = state.currentJob?.arrivalOtp || '4829';
    if (otp.trim() === validOtp.trim()) {
      updateJob({ status: 'in_progress' });
      return true;
    }
    return false;
  };
  const completeJob = () => {
    updateJob({ 
      status: 'completed',
      completedAt: new Date().toISOString()
    });
  };
  const verifyJob = () => {
    updateJob({ 
      status: 'verified',
      completedAt: new Date().toISOString()
    });
  };

  const addTipToJob = (amount: number) => {
    updateJob({ tip: amount });
  };

  const rateJob = (rating: number, feedback: string, tip?: number) => {
    updateJob({ 
      rating, 
      feedback,
      ...(tip !== undefined ? { tip } : {})
    });
  };

  // Mentorship & Apprenticeship Actions
  const requestMentorship = (apprenticeId: string, mentorId: string, skill: ServiceType) => {
    setState((prev) => {
      const apprentice = prev.workers.find((w) => w.id === apprenticeId);
      const mentor = prev.workers.find((w) => w.id === mentorId);
      if (!apprentice || !mentor) return prev;

      const newSession: MentorshipSession = {
        id: `ms_${Date.now()}`,
        apprenticeId,
        apprenticeName: apprentice.name,
        mentorId,
        mentorName: mentor.name,
        skill,
        hoursLogged: 4, // initial on-site induction hours
        totalGoalHours: 30,
        status: 'active',
        recentJobsShadowed: ['Orientation & Safety Protocol Walkthrough'],
      };

      const nextTier: Tier = apprentice.tier < 3 ? ((apprentice.tier + 1) as Tier) : 3;
      const updatedWorkers = prev.workers.map((w) => {
        if (w.id === apprenticeId) {
          return {
            ...w,
            activeMentorId: mentorId,
            mentorName: `${mentor.name} (Level ${mentor.tier} Master)`,
            apprenticeshipHours: (w.apprenticeshipHours || 0) + 4,
            apprenticeshipGoalHours: 30,
            targetTier: nextTier,
          };
        }
        return w;
      });

      return {
        ...prev,
        workers: updatedWorkers,
        mentorshipSessions: [newSession, ...prev.mentorshipSessions.filter((s) => s.apprenticeId !== apprenticeId)],
      };
    });
  };

  const logMentorshipHours = (sessionId: string, hours: number) => {
    setState((prev) => {
      const session = prev.mentorshipSessions.find((s) => s.id === sessionId);
      if (!session) return prev;

      const newHours = Math.min(session.totalGoalHours, session.hoursLogged + hours);
      const isCertified = newHours >= session.totalGoalHours;

      const updatedSessions = prev.mentorshipSessions.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            hoursLogged: newHours,
            status: isCertified ? ('certified' as const) : ('in_progress' as const),
            recentJobsShadowed: [`Live On-Site Task Shadowing (+${hours} hrs)`, ...(s.recentJobsShadowed || [])],
          };
        }
        return s;
      });

      const updatedWorkers = prev.workers.map((w) => {
        if (w.id === session.apprenticeId) {
          return {
            ...w,
            apprenticeshipHours: newHours,
            tier: isCertified && w.tier < 3 ? ((w.tier + 1) as Tier) : w.tier,
          };
        }
        return w;
      });

      return {
        ...prev,
        workers: updatedWorkers,
        mentorshipSessions: updatedSessions,
      };
    });
  };

  const upgradeApprenticeTier = (workerId: string) => {
    setState((prev) => {
      const updatedWorkers = prev.workers.map((w) => {
        if (w.id === workerId && w.tier < 3) {
          const newTier = (w.tier + 1) as Tier;
          return {
            ...w,
            tier: newTier,
            skillVerified: true,
            apprenticeshipHours: 30,
          };
        }
        return w;
      });

      return {
        ...prev,
        workers: updatedWorkers,
      };
    });
  };

  const requestExtension = (additionalTime: string, reason: string) => {
    if (!state.currentJob) return;
    updateJob({
      extensionRequest: {
        additionalTime,
        reason,
        requestedAt: new Date().toISOString(),
        status: 'pending',
      },
    });
  };

  const approveExtension = () => {
    if (!state.currentJob?.extensionRequest) return;
    updateJob({
      extensionRequest: {
        ...state.currentJob.extensionRequest,
        status: 'approved',
      },
    });
  };

  const raiseWarrantyQuery = (jobId: string, issue: string, dayOfClaim: number = 2) => {
    setState((prev) => {
      const targetJob = prev.jobs.find((j) => j.id === jobId) || prev.currentJob;
      if (!targetJob) return prev;

      const workerId = targetJob.workerId || 'w1';
      const targetWorker = prev.workers.find((w) => w.id === workerId);
      const workerName = targetWorker?.name || 'Ramesh Kumar';

      const updatedJob: Job = {
        ...targetJob,
        warrantyClaim: {
          id: `claim_${Date.now()}`,
          raisedAt: new Date().toISOString(),
          issue,
          dayOfClaim,
          originalWorkerId: workerId,
          workerName,
          status: 'open_options',
        },
      };

      return {
        ...prev,
        currentJob: prev.currentJob?.id === targetJob.id ? updatedJob : prev.currentJob,
        jobs: prev.jobs.map((j) => (j.id === targetJob.id ? updatedJob : j)),
      };
    });
  };

  // Rebooking Option 1: Complimentary same-worker revisit (₹0)
  const rebookSameWorkerFree = (originalJobId: string) => {
    setState((prev) => {
      const origJob = prev.jobs.find((j) => j.id === originalJobId) || prev.currentJob;
      if (!origJob) return prev;

      const newJobId = `job_warranty_free_${Date.now()}`;
      const newJob: Job = {
        id: newJobId,
        service: origJob.service,
        title: `[Complimentary Warranty Revisit] ${origJob.title}`,
        description: `Cooperative warranty revisit with original partner. Issue: ${origJob.warrantyClaim?.issue || 'Workmanship adjustment'}. Labor Fee: ₹0 (Cooperative Covered).`,
        location: origJob.location,
        date: 'Today',
        time: 'Express Revisit (within 60m)',
        budget: 0,
        baseLaborFee: 0,
        distanceFee: 0,
        materialOption: 'customer_provides',
        materialCost: 0,
        tier: origJob.tier,
        status: 'matched',
        arrivalOtp: '4829',
        customerId: origJob.customerId,
        workerId: origJob.workerId, // Same original worker
        createdAt: new Date().toISOString(),
      };

      const updatedOrigJob: Job = {
        ...origJob,
        warrantyClaim: origJob.warrantyClaim
          ? {
              ...origJob.warrantyClaim,
              resolutionType: 'same_worker_free',
              status: 'rebooked',
              newJobId,
            }
          : undefined,
      };

      return {
        ...prev,
        currentJob: newJob,
        jobs: [newJob, ...prev.jobs.map((j) => (j.id === origJob.id ? updatedOrigJob : j))],
      };
    });
  };

  // Rebooking Option 2: Rebook another certified worker with subsidized lesser budget
  const rebookWarrantyJob = (originalJobId: string, newWorkerId: string, discountedBudget: number) => {
    setState((prev) => {
      const origJob = prev.jobs.find((j) => j.id === originalJobId) || prev.currentJob;
      if (!origJob) return prev;

      const newJobId = `job_warranty_${Date.now()}`;
      const newJob: Job = {
        id: newJobId,
        service: origJob.service,
        title: `[Warranty Re-service] ${origJob.title}`,
        description: `Cooperative warranty corrective dispatch. Original Issue: ${origJob.warrantyClaim?.issue || 'Quality adjustment required'}. Subsidized warranty rate.`,
        location: origJob.location,
        date: 'Today',
        time: 'Express Dispatch (within 45m)',
        budget: discountedBudget,
        baseLaborFee: discountedBudget,
        distanceFee: 0,
        materialOption: 'customer_provides',
        materialCost: 0,
        tier: origJob.tier,
        status: 'matched',
        arrivalOtp: '4829',
        customerId: origJob.customerId,
        workerId: newWorkerId,
        createdAt: new Date().toISOString(),
      };

      const updatedOrigJob: Job = {
        ...origJob,
        warrantyClaim: origJob.warrantyClaim
          ? {
              ...origJob.warrantyClaim,
              resolutionType: 'alternate_worker_subsidized',
              status: 'rebooked',
              newJobId,
            }
          : undefined,
      };

      return {
        ...prev,
        currentJob: newJob,
        jobs: [newJob, ...prev.jobs.map((j) => (j.id === origJob.id ? updatedOrigJob : j))],
      };
    });
  };

  // Rebooking Option 3: Move on & close warranty query without booking again
  const closeWarrantyWithoutRebooking = (originalJobId: string) => {
    setState((prev) => {
      const origJob = prev.jobs.find((j) => j.id === originalJobId) || prev.currentJob;
      if (!origJob) return prev;

      const updatedOrigJob: Job = {
        ...origJob,
        warrantyClaim: origJob.warrantyClaim
          ? {
              ...origJob.warrantyClaim,
              resolutionType: 'closed_refunded',
              status: 'closed_refunded',
            }
          : undefined,
      };

      return {
        ...prev,
        currentJob: prev.currentJob?.id === origJob.id ? updatedOrigJob : prev.currentJob,
        jobs: prev.jobs.map((j) => (j.id === origJob.id ? updatedOrigJob : j)),
      };
    });
  };

  const setLanguage = (language: Language) => {
    setState((prev) => ({ ...prev, language }));
  };

  const t = (key: keyof Translations): string => {
    return getTranslation(state.language || 'en', key);
  };

  const resetDemo = () => {
    localStorage.removeItem('workeasy_state');
    setState(defaultState);
  };

  const loc = (text: string | undefined | null) => localizeText(text, state.language);
  const localizeJobHelper = (job: Job | null | undefined) => localizeJob(job, state.language);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setRole,
        setLanguage,
        t,
        loc,
        localizeJob: localizeJobHelper,
        postJob,
        classifyJob,
        matchWorker,
        acceptJob,
        markArrived,
        startJob,
        verifyArrivalOtp,
        completeJob,
        verifyJob,
        rateJob,
        addTipToJob,
        requestMentorship,
        logMentorshipHours,
        upgradeApprenticeTier,
        requestExtension,
        approveExtension,
        raiseWarrantyQuery,
        rebookSameWorkerFree,
        rebookWarrantyJob,
        closeWarrantyWithoutRebooking,
        resetDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const useApp = () => {
  const ctx = useAppContext();
  const { 
    role, 
    language,
    currentJob, 
    jobs, 
    workers, 
    contractorTeams,
    mentorshipSessions,
    customer, 
    setRole, 
    setLanguage,
    t,
    loc,
    localizeJob,
    postJob, 
    classifyJob, 
    matchWorker, 
    acceptJob, 
    markArrived, 
    startJob, 
    verifyArrivalOtp, 
    completeJob, 
    verifyJob, 
    rateJob, 
    addTipToJob, 
    requestMentorship, 
    logMentorshipHours, 
    upgradeApprenticeTier, 
    requestExtension, 
    approveExtension, 
    raiseWarrantyQuery, 
    rebookSameWorkerFree, 
    rebookWarrantyJob, 
    closeWarrantyWithoutRebooking, 
    resetDemo 
  } = ctx;

  return {
    state: { role, language, currentJob, jobs, workers, contractorTeams, mentorshipSessions, customer },
    setRole,
    setLanguage,
    t,
    loc,
    localizeJob,
    postJob,
    classifyJob,
    matchWorker,
    acceptJob,
    markArrived,
    startJob,
    verifyArrivalOtp,
    completeJob,
    verifyJob,
    rateJob,
    addTipToJob,
    requestMentorship,
    logMentorshipHours,
    upgradeApprenticeTier,
    requestExtension,
    approveExtension,
    raiseWarrantyQuery,
    rebookSameWorkerFree,
    rebookWarrantyJob,
    closeWarrantyWithoutRebooking,
    resetDemo,
  };
};

