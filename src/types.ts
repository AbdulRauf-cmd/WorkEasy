export type Role = 'customer' | 'worker' | 'admin';

export type Tier = 1 | 2 | 3;

export type ServiceType = 
  | 'Plumbing' 
  | 'Electrical' 
  | 'Cleaning' 
  | 'Gardening' 
  | 'Appliance Repair' 
  | 'Gas-related' 
  | 'Specialized Care'
  | 'Tyre Puncture'
  | 'Custom Service'
  | (string & {});

export type JobStatus = 
  | 'posted'
  | 'classified'
  | 'matched'
  | 'accepted'
  | 'worker_arrived'
  | 'in_progress'
  | 'completed'
  | 'verified';

export interface MentorshipSession {
  id: string;
  apprenticeId: string;
  apprenticeName: string;
  mentorId: string;
  mentorName: string;
  skill: ServiceType;
  hoursLogged: number;
  totalGoalHours: number;
  status: 'active' | 'certified' | 'in_progress';
  recentJobsShadowed?: string[];
}

export interface Worker {
  id: string;
  name: string;
  skill: ServiceType;
  tier: Tier;
  verified: boolean;
  experience: number;
  completedJobs: number;
  rating: number;
  distance: number;
  avatar: string;
  cooperativeMember: boolean;
  identityVerified: boolean;
  skillVerified: boolean;
  penalties?: number;
  penaltyStrikes?: number;
  isMentor?: boolean;
  mentorTier?: Tier;
  activeMentorId?: string;
  mentorName?: string;
  apprenticeshipHours?: number;
  apprenticeshipGoalHours?: number;
  targetTier?: Tier;
}

export type MaterialOption = 'customer_provides' | 'worker_procures';

export interface ExtensionRequest {
  additionalTime: string;
  reason: string;
  requestedAt: string;
  status: 'pending' | 'approved';
}

export interface WarrantyClaim {
  id: string;
  raisedAt: string;
  issue: string;
  dayOfClaim: number; // strictly within 2 to 4 days post-completion
  originalWorkerId: string;
  workerName: string;
  resolutionType?: 'same_worker_free' | 'alternate_worker_subsidized' | 'closed_refunded';
  status: 'open_options' | 'rebooked' | 'closed_refunded';
  newJobId?: string;
}

export type BulkOptionType = 'contractor' | 'skill_pool';

export interface ContractorTeam {
  id: string;
  name: string;
  leadName: string;
  skill: ServiceType;
  tier: Tier;
  crewCapacity: number;
  rating: number;
  completedProjects: number;
  distance: number;
  avatar: string;
  includesEquipment: boolean;
  supervisorPresent: boolean;
  verifiedLicense: boolean;
  baseSupervisorRate: number;
  perWorkerRate: number;
}

export interface Job {
  id: string;
  service: ServiceType;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  budget: number;
  baseLaborFee?: number;
  distanceFee?: number;
  materialOption?: MaterialOption;
  materialCost?: number;
  tier: Tier;
  status: JobStatus;
  customerId: string;
  workerId?: string;
  workerCount?: number;
  bulkOption?: BulkOptionType;
  contractorTeamId?: string;
  contractorName?: string;
  pooledWorkerIds?: string[];
  pooledWorkers?: Worker[];
  arrivalOtp?: string;
  rating?: number;
  feedback?: string;
  tip?: number;
  vehicleType?: '2_wheeler' | '4_wheeler';
  punctureType?: 'tubeless_strip' | 'tube_patch' | 'stepney_swap' | 'air_refill';
  createdAt: string;
  completedAt?: string;
  extensionRequest?: ExtensionRequest;
  warrantyClaim?: WarrantyClaim;
}

export type Language = 'en' | 'ta' | 'hi';

export interface Customer {
  id: string;
  name: string;
  location: string;
  avatar: string;
}

export interface AppState {
  role: Role;
  language: Language;
  currentJob: Job | null;
  jobs: Job[];
  workers: Worker[];
  contractorTeams: ContractorTeam[];
  mentorshipSessions: MentorshipSession[];
  customer: Customer;
}


