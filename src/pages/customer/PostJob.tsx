import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Wrench, 
  Zap, 
  Sparkles, 
  Sprout, 
  Hammer, 
  Check, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Layers, 
  Package, 
  ShoppingBag, 
  Star, 
  CheckCircle2, 
  Info,
  Navigation,
  Disc3, 
  Bike, 
  Car, 
  Users, 
  Building2, 
  Network, 
  Plus, 
  Minus, 
  UserCheck, 
  Shield 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import AnimatedPage from '../../components/AnimatedPage';
import { ServiceType, MaterialOption, Worker, BulkOptionType, ContractorTeam } from '../../types';
import TierBadge from '../../components/TierBadge';
import { classifyTier, calculateDynamicFare, calculateBulkFare, TIER_BASE_RATES, calculateTransitFee } from '../../utils/tierClassification';

const services = [
  { id: 'Plumbing' as ServiceType, name: 'Plumbing', icon: Wrench, defaultTitle: 'Tap Leakage Repair', defaultDesc: 'Kitchen faucet is dripping continuously. Replacement washer needed.', baseRate: 450, defaultMaterialCost: 150, materialName: 'Brass Washer & Sealant' },
  { id: 'Electrical' as ServiceType, name: 'Electrical', icon: Zap, defaultTitle: 'Switchboard Replacement', defaultDesc: 'Master bedroom main switchboard socket malfunction.', baseRate: 400, defaultMaterialCost: 180, materialName: 'Modular Switch & Socket' },
  { id: 'Cleaning' as ServiceType, name: 'Home Cleaning', icon: Sparkles, defaultTitle: 'Full House Deep Cleaning', defaultDesc: '2BHK complete floor, kitchen, and bathroom sanitization.', baseRate: 850, defaultMaterialCost: 250, materialName: 'Eco Chemicals & Consumables' },
  { id: 'Gardening' as ServiceType, name: 'Gardening', icon: Sprout, defaultTitle: 'Lawn Mowing & Maintenance', defaultDesc: 'Front lawn hedge trimming and weed removal.', baseRate: 350, defaultMaterialCost: 120, materialName: 'Plant Fertilizer & Seeds' },
  { id: 'Appliance Repair' as ServiceType, name: 'Appliance Care', icon: Hammer, defaultTitle: 'AC General Service', defaultDesc: 'Split AC filter cleanup and refrigerant pressure check.', baseRate: 650, defaultMaterialCost: 300, materialName: 'Refrigerant & Filter Spare' },
  { id: 'Tyre Puncture' as ServiceType, name: 'Tyre Puncture & Roadside', icon: Disc3, defaultTitle: 'Tubeless Tyre Puncture Repair', defaultDesc: 'Rear tyre puncture on bike / car. Emergency on-site roadside repair.', baseRate: 150, defaultMaterialCost: 60, materialName: 'Heavy-duty Puncture Strips & Valve' },
  { id: 'Custom Service' as ServiceType, name: 'Custom / Other', icon: Layers, defaultTitle: 'Custom Handyman Task', defaultDesc: 'Door lock installation, furniture assembly, or custom maintenance.', baseRate: 500, defaultMaterialCost: 200, materialName: 'Custom Hardware & Screws' },
];

export const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, postJob, t } = useApp();
  
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceType>('Plumbing');
  const [title, setTitle] = useState('Tap Leakage Repair');
  const [description, setDescription] = useState('Kitchen faucet is dripping continuously. Replacement washer needed.');
  const [location, setLocation] = useState('RS Puram, Coimbatore');
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('Morning (09:00 - 12:00)');
  const [materialOption, setMaterialOption] = useState<MaterialOption>('customer_provides');
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('');

  // Bulk Workforce State
  const [workerCount, setWorkerCount] = useState<number>(1);
  const [bulkOption, setBulkOption] = useState<BulkOptionType>('contractor');
  const [selectedContractorId, setSelectedContractorId] = useState<string>('');
  
  // Tyre Puncture specific options
  const [vehicleType, setVehicleType] = useState<'2_wheeler' | '4_wheeler'>('2_wheeler');
  const [punctureType, setPunctureType] = useState<'tubeless_strip' | 'tube_patch' | 'stepney_swap' | 'air_refill'>('tubeless_strip');

  const currentServiceConfig = services.find(s => s.id === service) || services[0];
  const materialCost = currentServiceConfig.defaultMaterialCost || 150;
  const computedTier = classifyTier(service, `${title} ${description}`);

  useEffect(() => {
    const s = searchParams.get('service') as ServiceType;
    if (s) {
      setService(s);
      const srv = services.find(x => x.id === s);
      if (srv) {
        setTitle(srv.defaultTitle);
        setDescription(srv.defaultDesc);
        if (s === 'Tyre Puncture') {
          setTime('Express Dispatch (8-15 mins)');
        }
      } else {
        setTitle('Custom Service Request');
        setDescription('');
      }
    }
  }, [searchParams]);

  // Find eligible nearby workers matching the service or tier
  const eligibleWorkers = state.workers.filter(w => {
    if (w.skill === service) return true;
    if (service === 'Custom Service' && w.tier >= computedTier) return true;
    return w.tier >= computedTier;
  }).sort((a, b) => a.distance - b.distance);

  const activeWorkerList = eligibleWorkers.length > 0 ? eligibleWorkers : state.workers.slice(0, 3);
  const activeSelectedWorker = activeWorkerList.find(w => w.id === selectedWorkerId) || activeWorkerList[0];

  // Eligible contractor teams matching the service or fallback
  const matchingContractors = (state.contractorTeams || []).filter((c: ContractorTeam) => c.skill === service);
  const availableContractors = matchingContractors.length > 0 ? matchingContractors : (state.contractorTeams || []);
  const activeSelectedContractor = availableContractors.find((c: ContractorTeam) => c.id === selectedContractorId) || availableContractors[0];

  // Auto-select initial contractor if none set
  useEffect(() => {
    if (activeSelectedContractor && !selectedContractorId) {
      setSelectedContractorId(activeSelectedContractor.id);
    }
  }, [activeSelectedContractor, selectedContractorId]);

  // Skill pool crew generated for bulk pooling
  const pooledWorkersSquad = activeWorkerList.slice(0, Math.min(workerCount, activeWorkerList.length));

  // Dynamic Base Rate calculation
  let baseLabor = currentServiceConfig.baseRate || TIER_BASE_RATES[activeSelectedWorker?.tier || computedTier] || 450;
  if (service === 'Tyre Puncture') {
    if (punctureType === 'tubeless_strip') baseLabor = vehicleType === '2_wheeler' ? 150 : 200;
    if (punctureType === 'tube_patch') baseLabor = vehicleType === '2_wheeler' ? 180 : 250;
    if (punctureType === 'stepney_swap') baseLabor = 220;
    if (punctureType === 'air_refill') baseLabor = 80;
  }

  const workerDistance = activeSelectedWorker?.distance || 1.8;

  // Compute fares based on solo vs bulk options
  const isBulk = workerCount > 1;
  const soloFare = calculateDynamicFare(
    baseLabor,
    workerDistance,
    materialOption,
    service === 'Tyre Puncture' ? (punctureType === 'stepney_swap' || punctureType === 'air_refill' ? 0 : 50) : materialCost
  );

  const bulkFare = calculateBulkFare(
    workerCount,
    bulkOption === 'contractor' ? (activeSelectedContractor?.perWorkerRate || baseLabor) : baseLabor,
    bulkOption,
    activeSelectedContractor?.distance || 2.4,
    materialOption,
    materialCost,
    activeSelectedContractor?.baseSupervisorRate || 300
  );

  const totalBudget = isBulk ? bulkFare.total : soloFare.total;

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handlePost = async () => {
    await postJob({
      title: isBulk ? `[Bulk ${workerCount}x ${bulkOption === 'contractor' ? 'Contractor Crew' : 'Pooled Squad'}] ${title}` : title,
      description,
      service: service as ServiceType,
      budget: totalBudget,
      baseLaborFee: isBulk ? bulkFare.laborTotal : soloFare.baseLaborRate,
      distanceFee: isBulk ? bulkFare.transitTotal : soloFare.transitFee,
      materialOption,
      materialCost: materialOption === 'worker_procures' ? (isBulk ? bulkFare.partsFee : soloFare.partsFee) : 0,
      workerId: isBulk ? (bulkOption === 'contractor' ? activeSelectedContractor?.id : pooledWorkersSquad[0]?.id) : undefined,
      workerCount,
      bulkOption: isBulk ? bulkOption : undefined,
      contractorTeamId: isBulk && bulkOption === 'contractor' ? activeSelectedContractor?.id : undefined,
      contractorName: isBulk && bulkOption === 'contractor' ? activeSelectedContractor?.name : undefined,
      pooledWorkerIds: isBulk && bulkOption === 'skill_pool' ? pooledWorkersSquad.map(w => w.id) : undefined,
      pooledWorkers: isBulk && bulkOption === 'skill_pool' ? pooledWorkersSquad : undefined,
      tier: computedTier,
      vehicleType: service === 'Tyre Puncture' ? vehicleType : undefined,
      punctureType: service === 'Tyre Puncture' ? punctureType : undefined,
    });
    navigate('/job-classification');
  };

  const steps = [t('stepCategory'), t('stepDetails'), t('stepFareDispatch'), t('stepSummary')];

  return (
    <AnimatedPage className="min-h-screen bg-slate-50 pb-16 flex flex-col">
      {/* Header */}
      <div className="bg-white pt-4 pb-3 px-4 sticky top-0 z-10 border-b border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={step === 1 ? () => navigate(-1) : handleBack} 
            className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft size={16} />
          </button>
          
          <div className="text-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight block">
              Step {step} of 4
            </span>
            <h2 className="text-xs font-bold text-slate-900">{steps[step - 1]}</h2>
          </div>

          <div className="w-7" />
        </div>

        {/* Step progress line */}
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-0.5 flex-1 rounded-full transition-colors ${
                i < step ? 'bg-slate-900' : 'bg-slate-200'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        {/* STEP 1: SERVICE CATEGORY */}
        {step === 1 && (
          <div className="flex flex-col flex-1">
            <div className="mb-3">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">{t('selectServiceCategory')}</h2>
              <p className="text-xs text-slate-500">{t('standardCoopRates')}</p>
            </div>

            <div className="space-y-2 flex-1">
              {services.map((s) => {
                const IconComponent = s.icon;
                const isSelected = service === s.id;
                const tier = classifyTier(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setService(s.id);
                      setTitle(s.defaultTitle);
                      setDescription(s.defaultDesc);
                      setStep(2);
                    }}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected 
                        ? 'border-slate-900 bg-white shadow-xs' 
                        : 'border-slate-200/80 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-slate-900">{s.name}</span>
                          <TierBadge tier={tier} size="sm" />
                        </div>
                        <span className="text-[11px] text-slate-500 mt-0.5 block">{s.defaultTitle}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 block">{t('fromRate')} ₹{s.baseRate}</span>
                      <span className="text-[10px] text-slate-400">{t('baseLaborLabel')}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: ISSUE DESCRIPTION & MATERIALS SELECTION */}
        {step === 2 && (
          <div className="flex flex-col flex-1">
            <div className="mb-3">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">{t('taskAndMaterials')}</h2>
              <p className="text-xs text-slate-500">{t('specifyRequirements')}</p>
            </div>

            <div className="space-y-3 flex-1">
              {/* TYRE PUNCTURE DEDICATED SELECTION */}
              {service === 'Tyre Puncture' ? (
                <div className="space-y-3">
                  {/* Vehicle Type Selector */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-tight mb-2">
                      {t('vehicleType')}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setVehicleType('2_wheeler');
                          setTitle('2-Wheeler Tyre Puncture Repair');
                        }}
                        className={`p-3 rounded-xl border-2 text-left flex items-center gap-2.5 transition ${
                          vehicleType === '2_wheeler'
                            ? 'border-slate-900 bg-slate-50 shadow-2xs font-bold text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          vehicleType === '2_wheeler' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <Bike size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{t('twoWheeler')}</span>
                          <span className="text-[10px] text-slate-400 font-normal">Bike / Scooter</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setVehicleType('4_wheeler');
                          setTitle('4-Wheeler Car Tyre Puncture Repair');
                        }}
                        className={`p-3 rounded-xl border-2 text-left flex items-center gap-2.5 transition ${
                          vehicleType === '4_wheeler'
                            ? 'border-slate-900 bg-slate-50 shadow-2xs font-bold text-slate-900'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          vehicleType === '4_wheeler' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <Car size={18} />
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{t('fourWheeler')}</span>
                          <span className="text-[10px] text-slate-400 font-normal">Car / SUV</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Puncture Service Sub-type Selector */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-tight mb-2">
                      Required Roadside Service
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'tubeless_strip', name: 'Tubeless Puncture Strip Repair', desc: 'Fast sealant strip insertion on-site', rate: vehicleType === '2_wheeler' ? 150 : 200 },
                        { id: 'tube_patch', name: 'Tube Puncture Patch / Replace', desc: 'Wheel demount, tube inspection & hot patch', rate: vehicleType === '2_wheeler' ? 180 : 250 },
                        { id: 'stepney_swap', name: 'Stepney Spare Wheel Replacement', desc: 'Hydraulic jack wheel swap with spare tyre', rate: 220 },
                        { id: 'air_refill', name: 'Emergency Air Pressure Refill', desc: 'Portable high-pressure compressor inflation', rate: 80 },
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setPunctureType(item.id as any);
                            setTitle(`${item.name} (${vehicleType === '2_wheeler' ? '2-Wheeler' : '4-Wheeler'})`);
                          }}
                          className={`p-2.5 rounded-lg border-2 cursor-pointer transition flex items-center justify-between ${
                            punctureType === item.id
                              ? 'border-slate-900 bg-slate-50/70 shadow-2xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-900 block">{item.name}</span>
                            <span className="text-[10px] text-slate-500">{item.desc}</span>
                          </div>
                          <span className="text-xs font-bold text-slate-900">₹{item.rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular Task Title for other services */
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-tight">
                      Task Title
                    </label>
                    <TierBadge tier={computedTier} size="sm" />
                  </div>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="e.g. Switch Replacement / Tap Repair"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-slate-900 outline-none text-xs font-semibold text-slate-900" 
                  />
                </div>
              )}

              {/* WORKFORCE REQUIREMENT: SOLO VS BULK SQUAD */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-tight flex items-center gap-1.5">
                    <Users size={14} className="text-slate-900" />
                    Workforce Requirement
                  </label>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isBulk ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isBulk ? `Bulk Workforce (${workerCount} Workers)` : 'Solo Professional (1)'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-2.5">
                  <button
                    type="button"
                    onClick={() => setWorkerCount(1)}
                    className={`p-2.5 rounded-lg border text-left transition ${
                      !isBulk
                        ? 'border-slate-900 bg-slate-50 font-bold text-slate-900 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs block">Solo Worker</span>
                    <span className="text-[10px] text-slate-400 font-normal">Standard 1-person task</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWorkerCount(3)}
                    className={`p-2.5 rounded-lg border text-left transition ${
                      isBulk
                        ? 'border-slate-900 bg-slate-50 font-bold text-slate-900 shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs block">Bulk Crew</span>
                    <span className="text-[10px] text-slate-400 font-normal">Multi-person project</span>
                  </button>
                </div>

                {/* If Bulk is selected: Stepper & TWO BULK OPTIONS */}
                {isBulk && (
                  <div className="space-y-3 pt-2.5 border-t border-slate-100 animate-fadeIn">
                    {/* Stepper */}
                    <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Required Crew Size</span>
                        <span className="text-[10px] text-slate-500">Number of field technicians needed</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setWorkerCount(c => Math.max(2, c - 1))}
                          className="w-7 h-7 rounded-md bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold active:scale-95"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-slate-900 font-mono">
                          {workerCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setWorkerCount(c => Math.min(8, c + 1))}
                          className="w-7 h-7 rounded-md bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold active:scale-95"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    {/* TWO REQUIRED BULK DISPATCH OPTIONS */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tight mb-1.5">
                        Select Bulk Model:
                      </label>

                      <div className="space-y-2">
                        {/* OPTION 1: Contractor Team */}
                        <div
                          onClick={() => setBulkOption('contractor')}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-start gap-2.5 ${
                            bulkOption === 'contractor'
                              ? 'border-slate-900 bg-slate-50/70 shadow-2xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            bulkOption === 'contractor' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            <Building2 size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">
                                Option 1: Licensed Contractor & Crew
                              </span>
                              <span className="text-[9px] bg-slate-900 text-white font-bold px-1.5 py-0.2 rounded">
                                Supervised
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                              Dedicated Master Contractor manages their own vetted squad with on-site supervision & heavy machinery.
                            </p>
                          </div>
                        </div>

                        {/* OPTION 2: Cooperative Skill Pooling */}
                        <div
                          onClick={() => setBulkOption('skill_pool')}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-start gap-2.5 ${
                            bulkOption === 'skill_pool'
                              ? 'border-slate-900 bg-slate-50/70 shadow-2xs'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            bulkOption === 'skill_pool' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            <Network size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">
                                Option 2: Cooperative Skill Pool
                              </span>
                              <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-1.5 py-0.2 rounded">
                                Aggregated Squad
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                              WorkEasy automatically aggregates {workerCount} independent certified local workers of matching trade into a single coordinated squad.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* MATERIALS & PARTS SELECTION */}
              {service !== 'Tyre Puncture' && (
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-tight mb-2">
                  {t('materialsReplacementParts')}
                </label>

                <div className="space-y-2">
                  {/* Option 1: Customer provides */}
                  <div 
                    onClick={() => setMaterialOption('customer_provides')}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start justify-between ${
                      materialOption === 'customer_provides'
                        ? 'border-slate-900 bg-slate-50/70 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                        materialOption === 'customer_provides' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Package size={15} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          {t('iWillProvideParts')}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                          {t('iWillProvidePartsDesc')}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <span className="text-xs font-bold text-emerald-700">{t('partsFeeZero')}</span>
                      <span className="text-[10px] text-slate-400">Parts fee</span>
                    </div>
                  </div>

                  {/* Option 2: Worker procures */}
                  <div 
                    onClick={() => setMaterialOption('worker_procures')}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start justify-between ${
                      materialOption === 'worker_procures'
                        ? 'border-slate-900 bg-slate-50/70 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                        materialOption === 'worker_procures' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <ShoppingBag size={15} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          {t('partnerProcuresParts')}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                          {t('partnerProcuresPartsDesc')}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-2">
                      <span className="text-xs font-bold text-slate-900">+₹{materialCost}</span>
                      <span className="text-[10px] text-slate-400 block">Est. parts</span>
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Specific Requirements */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-tight mb-1">
                  {t('specificRequirements')}
                </label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={2} 
                  placeholder="Specify model numbers, dimensions, or exact material notes..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-slate-900 outline-none text-xs text-slate-900 resize-none" 
                />
              </div>

              {/* Service Address */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-slate-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-tight block">{t('addressLabel')}</span>
                    <span className="text-xs font-semibold text-slate-900">{location}</span>
                  </div>
                </div>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">{t('change')}</span>
              </div>
            </div>

            <button 
              onClick={handleNext} 
              disabled={!title.trim()} 
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl font-semibold text-xs transition active:scale-98 shadow-xs mt-3"
            >
              Continue to {isBulk ? (bulkOption === 'contractor' ? 'Contractor Teams' : 'Skill Pool Squad') : 'Available Partners & Fares'}
            </button>
          </div>
        )}

        {/* STEP 3: SCHEDULE & WORKFORCE / CONTRACTOR FLEET */}
        {step === 3 && (
          <div className="flex flex-col flex-1">
            <div className="mb-3">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {isBulk 
                  ? (bulkOption === 'contractor' ? 'Contractor Teams & Squad Pricing' : `Skill Pool Squad (${workerCount} Pooled Workers)`) 
                  : 'Available Partners & Fares'}
              </h2>
              <p className="text-xs text-slate-500">
                {isBulk 
                  ? (bulkOption === 'contractor' ? 'Licensed crew leads with managed squads & supervision' : 'Aggregated independent certified workers with pooled transit allowance')
                  : 'Transparent rates calculated by distance and skill level'}
              </p>
            </div>

            <div className="space-y-3.5 flex-1">
              {/* Date & Time Selection */}
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-tight mb-1">{t('scheduleDate')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'Today', label: t('today') },
                      { id: 'Tomorrow', label: t('tomorrow') },
                    ].map((d) => (
                      <button 
                        key={d.id} 
                        onClick={() => setDate(d.id)} 
                        className={`py-2 rounded-lg border text-xs font-semibold transition-all ${
                          date === d.id 
                            ? 'border-slate-900 bg-slate-900 text-white shadow-2xs' 
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-tight mb-1">{t('timeWindow')}</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'Morning (09:00 - 12:00)', label: '09:00 - 12:00' }, 
                      { id: 'Afternoon (12:00 - 15:00)', label: '12:00 - 15:00' }, 
                      { id: 'Evening (16:00 - 19:00)', label: '16:00 - 19:00' }
                    ].map((t) => (
                      <button 
                        key={t.id} 
                        onClick={() => setTime(t.id)} 
                        className={`py-2 px-1 rounded-lg border text-center text-[11px] transition-all truncate ${
                          time === t.id 
                            ? 'border-slate-900 bg-slate-900 text-white font-semibold shadow-2xs' 
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CASE 1: BULK OPTION 1 - CONTRACTOR TEAMS LIST */}
              {isBulk && bulkOption === 'contractor' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-tight flex items-center gap-1">
                      <Building2 size={13} className="text-slate-900" />
                      Available Licensed Contractor Squads ({availableContractors.length})
                    </label>
                    <span className="text-[10px] text-slate-400">Managed Crew</span>
                  </div>

                  <div className="space-y-2">
                    {availableContractors.map((c: ContractorTeam) => {
                      const isSelected = activeSelectedContractor?.id === c.id;
                      const cFare = calculateBulkFare(
                        workerCount,
                        c.perWorkerRate,
                        'contractor',
                        c.distance,
                        materialOption,
                        materialCost,
                        c.baseSupervisorRate
                      );

                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedContractorId(c.id)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-slate-900 bg-white shadow-xs' 
                              : 'border-slate-200 bg-white/80 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2.5">
                              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {c.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-xs text-slate-900">{c.name}</span>
                                  <TierBadge tier={c.tier} size="sm" />
                                </div>
                                <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                                  Lead: {c.leadName}
                                </p>
                                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-1">
                                  <span className="flex items-center gap-0.5 font-bold text-slate-800">
                                    <Star size={11} className="fill-amber-400 text-amber-400" />
                                    {c.rating}
                                  </span>
                                  <span>·</span>
                                  <span>{c.completedProjects} Projects</span>
                                  <span>·</span>
                                  <span>{c.distance} km</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-sm font-black text-slate-900 block">
                                ₹{cFare.total}
                              </span>
                              <span className="text-[10px] text-slate-400 block leading-tight">
                                {workerCount} Crew + Lead
                              </span>
                            </div>
                          </div>

                          {/* Inclusions checklist */}
                          <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-2 gap-1 text-[10px] text-slate-600">
                            <span className="flex items-center gap-1 font-medium text-emerald-800">
                              <Check size={12} className="text-emerald-600" /> On-site supervisor
                            </span>
                            <span className="flex items-center gap-1 font-medium text-emerald-800">
                              <Check size={12} className="text-emerald-600" /> Commercial machinery
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CASE 2: BULK OPTION 2 - COOPERATIVE SKILL POOL ROSTER */}
              {isBulk && bulkOption === 'skill_pool' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-tight flex items-center gap-1">
                      <Network size={13} className="text-emerald-700" />
                      Aggregated Skill Pool ({pooledWorkersSquad.length} Verified Specialists)
                    </label>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                      Synchronized Squad
                    </span>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-slate-900 p-3.5 shadow-xs space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Cooperative Aggregated Crew
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {workerCount} Independent {service} Specialists dispatched as a unit
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900 block">₹{bulkFare.total}</span>
                        <span className="text-[10px] text-emerald-700 font-semibold">100% to Workers</span>
                      </div>
                    </div>

                    {/* Pooled Workers List */}
                    <div className="space-y-1.5">
                      {pooledWorkersSquad.map((pw: Worker, idx: number) => (
                        <div key={pw.id} className="bg-slate-50 rounded-lg p-2 flex items-center justify-between text-xs border border-slate-200/70">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                              {pw.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="font-bold text-slate-900">{pw.name}</span>
                                <span className="text-[10px] text-slate-400">({idx === 0 ? 'Point of Contact' : 'Specialist'})</span>
                              </div>
                              <span className="text-[10px] text-slate-500">{pw.distance} km · {pw.rating}★ · {pw.completedJobs} jobs</span>
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-slate-800 font-mono">₹{baseLabor}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-slate-500 bg-slate-100/80 p-2 rounded border border-slate-200 flex items-center gap-1">
                      <Shield size={12} className="text-emerald-700 shrink-0" />
                      All pooled workers are verified cooperative members coordinated through a unified start PIN.
                    </p>
                  </div>
                </div>
              )}

              {/* CASE 3: AUTOMATIC FAIR DISPATCH (When workerCount === 1) */}
              {!isBulk && (
                <div className="space-y-3">
                  <div className="bg-white rounded-xl border-2 border-slate-900 p-4 shadow-2xs">
                    {/* Header with icon & badge */}
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-start gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Zap size={18} className="text-amber-400 fill-amber-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-xs font-bold text-slate-900">{t('autoDispatchTitle')}</h3>
                            <span className="text-[9px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.5 rounded border border-slate-200">
                              {t('autoDispatchBadge')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            {t('autoDispatchDesc')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Fair Rotation Trust Badges */}
                    <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                        <UserCheck size={14} className="text-emerald-600 mx-auto mb-1" />
                        <span className="text-[10px] font-bold text-slate-800 block leading-tight">
                          {t('bgVerifiedBadge')}
                        </span>
                        <span className="text-[9px] text-slate-400">Govt ID + Police</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                        <ShieldCheck size={14} className="text-blue-600 mx-auto mb-1" />
                        <span className="text-[10px] font-bold text-slate-800 block leading-tight">
                          {t('skillCertifiedBadge')}
                        </span>
                        <span className="text-[9px] text-slate-400">Tier {computedTier} Tested</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                        <CheckCircle2 size={14} className="text-amber-600 mx-auto mb-1" />
                        <span className="text-[10px] font-bold text-slate-800 block leading-tight">
                          {t('zeroBiddingBadge')}
                        </span>
                        <span className="text-[9px] text-slate-400">0% Commission</span>
                      </div>
                    </div>

                    {/* Upfront Standardized Rate Preview */}
                    <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-4 -mb-4 p-3.5 rounded-b-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">
                          {t('fixedPrice')}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-slate-900">₹{soloFare.total}</span>
                          <span className="text-[10px] text-emerald-700 font-semibold">100% to partner</span>
                        </div>
                      </div>
                      <div className="text-right text-[10px] text-slate-500">
                        <span>Labor ₹{soloFare.baseLaborRate} + Transit ₹{soloFare.transitFee}</span>
                        {materialOption === 'worker_procures' && (
                          <span className="block text-slate-600">+ Parts ₹{soloFare.partsFee}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STANDARDIZED FARE DISCLAIMER */}
              <div className="bg-slate-100/90 rounded-xl p-3 border border-slate-200/80 flex items-start gap-2 text-[11px] text-slate-600">
                <Info size={15} className="text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold block mb-0.5">
                    {isBulk 
                      ? (bulkOption === 'contractor' ? 'Contractor Supervised Guarantee' : 'Cooperative Pooled Dispatch Guarantee') 
                      : t('autoDispatchTitle')}
                  </strong>
                  <p className="leading-tight text-slate-500">
                    {isBulk 
                      ? (bulkOption === 'contractor' 
                          ? `Total fare includes licensed contractor supervision fee (₹${activeSelectedContractor?.baseSupervisorRate || 300}) and standardized wages for ${workerCount} crew members.`
                          : `Total fare aggregates ${workerCount} certified specialists at standardized tier wages with pooled transit reimbursement. 0% platform wage cut.`)
                      : `${t('autoDispatchDesc')} (${workerDistance} km transit @ ₹15/km).`}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleNext} 
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition active:scale-98 shadow-xs mt-3 flex items-center justify-center gap-1.5"
            >
              <span>{t('reviewBooking')} (₹{totalBudget})</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* STEP 4: REVIEW & CONFIRM */}
        {step === 4 && (
          <div className="flex flex-col flex-1">
            <div className="mb-3">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">{t('bookingSummaryTitle')}</h2>
              <p className="text-xs text-slate-500">{t('inspectFareSummary')}</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/90 p-4 space-y-3 flex-1 shadow-2xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs text-slate-500">{t('serviceCategoryLabel')}</span>
                <div className="flex items-center gap-1.5">
                  <TierBadge tier={computedTier} size="sm" />
                  <span className="font-semibold text-xs text-slate-900">{service}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs text-slate-500">{t('workforceModelLabel')}</span>
                <span className="font-bold text-xs text-slate-900 text-right">
                  {isBulk 
                    ? (bulkOption === 'contractor' 
                        ? `🏢 Contractor Squad (${workerCount} Crew + Supervisor)` 
                        : `🌐 Skill Pool (${workerCount} Aggregated Specialists)`) 
                    : '👤 Solo Professional (1 Worker)'}
                </span>
              </div>

              {/* Assigned Partner / Contractor / Pooled Squad */}
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs text-slate-500">
                  {isBulk ? (bulkOption === 'contractor' ? 'Contractor Squad' : 'Pooled Crew Roster') : t('assignedPartner')}
                </span>
                <div className="text-right">
                  <span className="font-semibold text-xs text-slate-900 block">
                    {isBulk 
                      ? (bulkOption === 'contractor' 
                          ? activeSelectedContractor?.name 
                          : `${pooledWorkersSquad.map(w => w.name.split(' ')[0]).join(', ')}`)
                      : t('autoDispatchTitle')}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {isBulk 
                      ? (bulkOption === 'contractor' ? `Lead: ${activeSelectedContractor?.leadName}` : `${workerCount} Certified Independent Partners`)
                      : t('fairRotationGuarantee')}
                  </span>
                </div>
              </div>

              {/* Material Option Row */}
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs text-slate-500">Materials & Parts</span>
                <span className={`font-semibold text-xs ${
                  materialOption === 'worker_procures' ? 'text-blue-700' : 'text-slate-900'
                }`}>
                  {materialOption === 'worker_procures' ? '🛍️ Procured by Partner' : '📦 Provided by Customer'}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs text-slate-500">Location</span>
                <span className="font-semibold text-xs text-slate-900">{location}</span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <span className="text-xs text-slate-500">Schedule</span>
                <span className="font-semibold text-xs text-slate-900">{date}, {time.split(' ')[0]}</span>
              </div>

              {/* Itemized bill */}
              <div className="pt-1 space-y-1.5 text-xs">
                {isBulk ? (
                  <>
                    <div className="flex justify-between text-slate-500">
                      <span>Base Labor ({workerCount} Specialists)</span>
                      <span>₹{bulkFare.laborTotal}</span>
                    </div>
                    {bulkOption === 'contractor' && (
                      <div className="flex justify-between text-slate-500">
                        <span>Contractor Supervision & Equipment Fee</span>
                        <span>₹{bulkFare.supervisorFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500">
                      <span>Transit Allowance ({bulkOption === 'contractor' ? 'Crew Van' : `${workerCount} Pooled Partners`})</span>
                      <span>₹{bulkFare.transitTotal}</span>
                    </div>
                    {materialOption === 'worker_procures' && (
                      <div className="flex justify-between text-slate-500">
                        <span>{t('replacementParts')}</span>
                        <span>₹{bulkFare.partsFee}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-slate-500">
                      <span>{t('baseLaborCharge')}</span>
                      <span>₹{soloFare.baseLaborRate}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>{t('transitAllowance')} ({workerDistance} km)</span>
                      <span>₹{soloFare.transitFee}</span>
                    </div>
                    {materialOption === 'worker_procures' && (
                      <div className="flex justify-between text-slate-500">
                        <span>{t('replacementParts')}</span>
                        <span>₹{soloFare.partsFee}</span>
                      </div>
                    )}
                  </>
                )}
                
                <div className="flex justify-between text-slate-500">
                  <span>{t('platformCommission')}</span>
                  <span className="text-emerald-700 font-medium">{t('zeroCommissionNote')}</span>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 text-sm font-bold text-slate-900">
                  <span>{t('totalEscrowAmount')}</span>
                  <span className="text-base font-extrabold text-slate-900">₹{totalBudget}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handlePost} 
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs mt-4 transition active:scale-98 shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>{t('confirmAndDispatch')} (₹{totalBudget})</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};
export default PostJob;
