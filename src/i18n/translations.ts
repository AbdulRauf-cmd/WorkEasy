export type Language = 'en' | 'ta' | 'hi';

export interface Translations {
  // Navigation & Common
  home: string;
  orders: string;
  activity: string;
  profile: string;
  wallet: string;
  back: string;
  continue: string;
  confirm: string;
  cancel: string;
  save: string;
  skip: string;
  done: string;
  verified: string;
  call: string;
  chat: string;
  track: string;
  status: string;
  fixedPrice: string;
  total: string;
  language: string;

  // Role Switcher
  roleCustomer: string;
  roleWorker: string;
  roleAdmin: string;
  demoMode: string;

  // Home Screen
  greeting: string;
  locationArea: string;
  searchPlaceholder: string;
  activeBooking: string;
  workerOnWay: string;
  browseServices: string;
  fixedUpfrontPricing: string;
  escrowTrustTitle: string;
  escrowTrustDesc: string;
  policyNote: string;

  // Services
  plumbing: string;
  plumbingSub: string;
  electrical: string;
  electricalSub: string;
  cleaning: string;
  cleaningSub: string;
  gardening: string;
  gardeningSub: string;
  appliances: string;
  appliancesSub: string;
  roadsideHelp: string;
  roadsideHelpSub: string;
  customService: string;
  customServiceSub: string;

  // Post Job Flow
  postJobTitle: string;
  stepOf: string;
  stepCategory: string;
  stepDetails: string;
  stepFareDispatch: string;
  stepSummary: string;
  whatNeedsFixing: string;
  taskDescription: string;
  addPhotoOptional: string;
  whoBringsParts: string;
  iHaveParts: string;
  workerBringsParts: string;
  standardCatalogRate: string;
  partsNeeded: string;
  quantity: string;
  
  // Workforce Mode
  workforceRequirement: string;
  oneWorker: string;
  oneWorkerDesc: string;
  teamOfWorkers: string;
  teamOfWorkersDesc: string;
  selectCrewSize: string;
  workersCount: string;
  licensedTeam: string;
  licensedTeamDesc: string;
  skilledGroup: string;
  skilledGroupDesc: string;

  // Auto-Dispatch (Replacing manual worker selection)
  autoDispatchTitle: string;
  autoDispatchBadge: string;
  autoDispatchDesc: string;
  fairRotationGuarantee: string;
  bgVerifiedBadge: string;
  skillCertifiedBadge: string;
  zeroBiddingBadge: string;
  scheduleService: string;
  nowIn20m: string;
  laterToday: string;
  fareBreakdown: string;
  baseLaborCharge: string;
  transitAllowance: string;
  replacementParts: string;
  platformCommission: string;
  zeroCommissionNote: string;
  totalEscrowAmount: string;
  moneySafeNote: string;
  confirmAndDispatch: string;

  // Roadside
  twoWheeler: string;
  fourWheeler: string;
  flatTyreRepair: string;
  tubePatch: string;
  stepneySwap: string;
  airRefill: string;
  expressDispatch: string;

  // Live Tracking & PIN
  bookingNumber: string;
  liveStatus: string;
  arrivalPinTitle: string;
  arrivalPinNote: string;
  serviceTimeline: string;
  assignedPartner: string;
  onSiteLead: string;
  synchronizedSquad: string;
  extensionRequested: string;
  extensionApproved: string;
  approveExtension: string;

  // Verification & Before/After
  checkTheWork: string;
  beforeWork: string;
  afterWork: string;
  workLooksGoodPay: string;
  reportProblem: string;

  // Rating & Tip
  jobFinished: string;
  rateExperience: string;
  tagPolite: string;
  tagOnTime: string;
  tagClean: string;
  addTipOptional: string;
  tipGuarantee: string;
  submitFeedback: string;

  // Quality Guarantee
  qualityGuaranteeTitle: string;
  guaranteeActiveDays: string;
  option1SameWorker: string;
  option1Desc: string;
  option2NewWorker: string;
  option2Desc: string;
  option3Refund: string;
  option3Desc: string;
  submitClaim: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    home: 'Home',
    orders: 'Orders',
    activity: 'Activity',
    profile: 'Profile',
    wallet: 'Wallet',
    back: 'Back',
    continue: 'Continue',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    skip: 'Skip',
    done: 'Done',
    verified: 'Verified',
    call: 'Call',
    chat: 'Chat',
    track: 'Track',
    status: 'Status',
    fixedPrice: 'Fixed Price',
    total: 'Total',
    language: 'Language',

    roleCustomer: 'Customer',
    roleWorker: 'Partner',
    roleAdmin: 'Admin',
    demoMode: 'Demo Role',

    greeting: 'Good morning, Priya 👋',
    locationArea: 'RS Puram, Coimbatore',
    searchPlaceholder: 'Search "tap leak", "switch", "cleaning"...',
    activeBooking: 'Active Booking',
    workerOnWay: 'Professional on the way',
    browseServices: 'Browse Services',
    fixedUpfrontPricing: 'Fixed upfront pricing',
    escrowTrustTitle: 'Money Safe Escrow',
    escrowTrustDesc: 'Your payment is held safely and only released to the worker after you inspect and approve.',
    policyNote: 'Direct off-platform cash transactions void your 4-day quality guarantee. Always book on WorkEasy.',

    plumbing: 'Plumbing',
    plumbingSub: 'Pipes, taps & leaks',
    electrical: 'Electrical',
    electricalSub: 'Wiring & switches',
    cleaning: 'Home Cleaning',
    cleaningSub: 'Deep clean & sanitization',
    gardening: 'Gardening',
    gardeningSub: 'Lawn & landscaping',
    appliances: 'Appliance Repair',
    appliancesSub: 'AC, fridge & washer',
    roadsideHelp: 'Roadside Help',
    roadsideHelpSub: 'Tyre puncture & air refill',
    customService: 'Custom Service',
    customServiceSub: 'Carpentry & handyman tasks',

    postJobTitle: 'Book a Service',
    stepOf: 'Step',
    stepCategory: 'Category',
    stepDetails: 'Task & Materials',
    stepFareDispatch: 'Fare & Dispatch',
    stepSummary: 'Summary',
    whatNeedsFixing: 'What needs fixing?',
    taskDescription: 'Describe the task in detail',
    addPhotoOptional: 'Add Photo of Issue (Optional)',
    whoBringsParts: 'Who brings the replacement parts?',
    iHaveParts: 'I have parts',
    workerBringsParts: 'Worker brings parts',
    standardCatalogRate: '+ Standard catalog rate',
    partsNeeded: 'Parts Needed',
    quantity: 'Quantity',

    workforceRequirement: 'Workforce Requirement',
    oneWorker: 'One Solo Professional',
    oneWorkerDesc: 'Ideal for standard repairs, single tap leaks, or switchboards.',
    teamOfWorkers: 'A Team of Workers',
    teamOfWorkersDesc: 'For heavy deep cleaning, full renovations, or commercial jobs.',
    selectCrewSize: 'Select Crew Size:',
    workersCount: 'Workers',
    licensedTeam: 'Licensed Contractor Squad',
    licensedTeamDesc: 'Supervised commercial team with heavy machinery & on-site lead.',
    skilledGroup: 'Cooperative Skill Pool',
    skilledGroupDesc: 'Synchronized certified specialists. 100% of labor goes directly to workers.',

    autoDispatchTitle: 'Automatic Fair Dispatch',
    autoDispatchBadge: 'Non-Discriminatory Rotation',
    autoDispatchDesc: 'WorkEasy automatically assigns the nearest certified professional through our fair round-robin algorithm. No bidding wars, no price markups.',
    fairRotationGuarantee: 'Fair Opportunity Allocation',
    bgVerifiedBadge: 'Govt ID & KYC Verified',
    skillCertifiedBadge: 'Trade Certified & Audited',
    zeroBiddingBadge: 'Fixed Upfront Ride-Hailing Rate',
    scheduleService: 'When do you need service?',
    nowIn20m: 'Now (Express 15-20m)',
    laterToday: 'Later Today / Scheduled',
    fareBreakdown: 'Guaranteed Fare Breakdown',
    baseLaborCharge: 'Base Labor Charge',
    transitAllowance: 'Distance Transit Allowance',
    replacementParts: 'Replacement Parts',
    platformCommission: 'Platform Commission',
    zeroCommissionNote: '₹0 (100% directly to worker)',
    totalEscrowAmount: 'Total Guaranteed Escrow',
    moneySafeNote: '🔒 Your money is safe in escrow until you inspect the work and share your confirmation.',
    confirmAndDispatch: 'Confirm & Auto-Dispatch Worker',

    twoWheeler: '2-Wheeler (Bike)',
    fourWheeler: '4-Wheeler (Car)',
    flatTyreRepair: 'Flat Tyre Repair (Tubeless Strip)',
    tubePatch: 'Tube Puncture Patch / Replace',
    stepneySwap: 'Stepney Wheel Swap',
    airRefill: 'Emergency Air Pressure Refill',
    expressDispatch: 'Express Roadside Dispatch (8-15 mins)',

    bookingNumber: 'Booking',
    liveStatus: 'Live Order Status',
    arrivalPinTitle: 'YOUR 4-DIGIT ARRIVAL CODE',
    arrivalPinNote: '⚠️ Share this PIN with the worker ONLY AFTER they arrive at your location.',
    serviceTimeline: 'Service Timeline',
    assignedPartner: 'Assigned Professional',
    onSiteLead: 'On-Site Lead Supervisor',
    synchronizedSquad: 'Synchronized Squad Roster',
    extensionRequested: 'Partner Requested Time Extension',
    extensionApproved: 'Extension Approved ✓',
    approveExtension: 'Acknowledge & Approve Extension',

    checkTheWork: 'Check The Work & Release Payment',
    beforeWork: 'BEFORE WORK',
    afterWork: 'AFTER WORK',
    workLooksGoodPay: 'Work Looks Good — Release Payment',
    reportProblem: 'Something not right? Flag Quality Fault',

    jobFinished: 'Service Completed & Paid!',
    rateExperience: 'How was your experience?',
    tagPolite: '👍 Polite',
    tagOnTime: '⏱️ On Time',
    tagClean: '🧹 Left Clean',
    addTipOptional: 'Add a Tip for Partner (Optional)',
    tipGuarantee: '💚 100% of your tip goes straight to the partner.',
    submitFeedback: 'Submit Rating & Feedback',

    qualityGuaranteeTitle: '2 to 4 Days Quality Guarantee',
    guaranteeActiveDays: 'Covered for 3 more days (Day 2 of 4)',
    option1SameWorker: 'Option 1: Free Same-Partner Revisit',
    option1Desc: 'Original partner returns to adjust and fix the issue at ₹0 extra cost.',
    option2NewWorker: 'Option 2: Rebook New Specialist (55% Rebate)',
    option2Desc: 'Dispatch a different accredited senior master craftsman at subsidized rate.',
    option3Refund: 'Option 3: Escrow Settlement & Refund',
    option3Desc: 'Receive direct cooperative refund to your wallet without rebooking.',
    submitClaim: 'Submit Resolution Claim',
  },

  ta: {
    home: 'முகப்பு',
    orders: 'ஆர்டர்கள்',
    activity: 'செயல்பாடு',
    profile: 'சுயவிவரம்',
    wallet: 'பணப்பை',
    back: 'பின்செல்',
    continue: 'தொடரவும்',
    confirm: 'உறுதி செய்',
    cancel: 'ரத்து செய்',
    save: 'சேமி',
    skip: 'தவிர்',
    done: 'முடிந்தது',
    verified: 'சரிபார்க்கப்பட்டது',
    call: 'அழை',
    chat: 'செய்தி',
    track: 'கண்காணி',
    status: 'நிலை',
    fixedPrice: 'நிலையான கட்டணம்',
    total: 'மொத்தம்',
    language: 'மொழி',

    roleCustomer: 'வாடிக்கையாளர்',
    roleWorker: 'தொழிலாளி',
    roleAdmin: 'நிர்வாகம்',
    demoMode: 'டெமோ பங்கு',

    greeting: 'வணக்கம், பிரியா 👋',
    locationArea: 'ஆர்.எஸ். புரம், கோயம்புத்தூர்',
    searchPlaceholder: 'குழாய் கசிவு, சுவிட்ச், கிளீனிங் தேடவும்...',
    activeBooking: 'செயலில் உள்ள முன்பதிவு',
    workerOnWay: 'தொழிலாளி வந்துகொண்டிருக்கிறார்',
    browseServices: 'சேவைகளைத் தேர்வு செய்க',
    fixedUpfrontPricing: 'முன்கூட்டியே நிர்ணயிக்கப்பட்ட கட்டணம்',
    escrowTrustTitle: 'பணம் பாதுகாப்பானது (எஸ்க்ரோ)',
    escrowTrustDesc: 'வேலை முழுமையாக முடிந்து நீங்கள் சரிபார்த்த பின்னரே தொழிலாளிக்கு பணம் விடுவிக்கப்படும்.',
    policyNote: 'வெளியில் பணப் பரிமாற்றம் செய்தால் 4 நாள் உத்தரவாதம் செல்லாது. எப்போதும் WorkEasy மூலம் புக் செய்யவும்.',

    plumbing: 'பிளம்பிங்',
    plumbingSub: 'குழாய்கள், கசிவு பழுது',
    electrical: 'எலக்ட்ரிக்கல்',
    electricalSub: 'வயரிங் மற்றும் சுவிட்சுகள்',
    cleaning: 'வீட்டு சுத்தம்',
    cleaningSub: 'ஆழ்ந்த துப்புரவு & சுத்தம்',
    gardening: 'தோட்டக்கலை',
    gardeningSub: 'புல்வெளி பராமரிப்பு',
    appliances: 'மின்சாதனம் பழுது',
    appliancesSub: 'ஏசி, பிரிட்ஜ் & வாஷிங் மெஷின்',
    roadsideHelp: 'பயண உதவி / பஞ்சர்',
    roadsideHelpSub: 'டயர் பஞ்சர் & உடனடி காற்று',
    customService: 'இதர உதவிகள்',
    customServiceSub: 'மரவேலை மற்றும் கைவினை வேலைகள்',

    postJobTitle: 'சேவை முன்பதிவு',
    stepOf: 'படி',
    stepCategory: 'வகை',
    stepDetails: 'வேலை & பொருட்கள்',
    stepFareDispatch: 'கட்டணம் & ஒதுக்கீடு',
    stepSummary: 'சுருக்கம்',
    whatNeedsFixing: 'என்ன பழுது சரிசெய்ய வேண்டும்?',
    taskDescription: 'தேவையான வேலையை விவரிக்கவும்',
    addPhotoOptional: 'பிரச்சனையின் புகைப்படம் (விருப்பத்தேர்வு)',
    whoBringsParts: 'மாற்றுப் பொருட்களை யார் கொண்டு வருவது?',
    iHaveParts: 'என்னிடம் பொருட்கள் உள்ளன',
    workerBringsParts: 'தொழிலாளி வாங்கி வருவார்',
    standardCatalogRate: '+ நிலையான பட்டியல் விலை',
    partsNeeded: 'தேவைப்படும் பொருட்கள்',
    quantity: 'எண்ணிக்கை',

    workforceRequirement: 'தொழிலாளர் தேவை',
    oneWorker: 'ஒரு தனி நிபுணர்',
    oneWorkerDesc: 'சாதாரண பழுது, குழாய் கசிவு, சுவிட்ச் வேலைகளுக்கு ஏற்றது.',
    teamOfWorkers: 'குழுவாக தொழிலாளர்கள்',
    teamOfWorkersDesc: 'முழு வீடு சுத்தம், புனரமைப்பு அல்லது பெரிய வேலைகளுக்கு.',
    selectCrewSize: 'குழு அளவு தேர்வு:',
    workersCount: 'தொழிலாளர்கள்',
    licensedTeam: 'உரிமம் பெற்ற ஒப்பந்தக் குழு',
    licensedTeamDesc: 'மேற்பார்வையாளர் மற்றும் கனரக கருவிகளுடன் கூடிய தொழில்முறை குழு.',
    skilledGroup: 'கூட்டுறவு நிபுணர் குழு',
    skilledGroupDesc: 'ஒன்றிணைக்கப்பட்ட சான்றளிக்கப்பட்ட தொழிலாளர்கள். 100% கூலி தொழிலாளர்களுக்கே.',

    autoDispatchTitle: 'தானியங்கி நியாயமான ஒதுக்கீடு',
    autoDispatchBadge: 'சுழற்சி முறை ஒதுக்கீடு',
    autoDispatchDesc: 'WorkEasy எங்கள் நியாயமான ரவுண்ட்-ராபின் அல்காரிதம் மூலம் அருகிலுள்ள சிறந்த சான்றளிக்கப்பட்ட நிபுணரை தானாக ஒதுக்குகிறது. தரகர் கமிஷன் அல்லது பேரம் பேசுதல் இல்லை.',
    fairRotationGuarantee: 'நியாயமான வாய்ப்பு ஒதுக்கீடு',
    bgVerifiedBadge: 'அரசு அடையாள & KYC சரிபார்ப்பு',
    skillCertifiedBadge: 'தொழில் திறன் சான்றிதழ் பெற்றது',
    zeroBiddingBadge: 'நிலையான முன்கூட்டிய கட்டணம்',
    scheduleService: 'சேவை எப்போது தேவை?',
    nowIn20m: 'இப்போதே (15-20 நிமிடங்களில்)',
    laterToday: 'இன்று பின்னர் / குறிப்பிட்ட நேரம்',
    fareBreakdown: 'உறுதிசெய்யப்பட்ட கட்டண விபரம்',
    baseLaborCharge: 'அடிப்படை உழைப்புக் கட்டணம்',
    transitAllowance: 'பயண தொலைவுப் படி',
    replacementParts: 'மாற்றுப் பொருட்கள்',
    platformCommission: 'பிளாட்பார்ம் கமிஷன்',
    zeroCommissionNote: '₹0 (100% தொழிலாளருக்கு நேரடியாக)',
    totalEscrowAmount: 'மொத்த எஸ்க்ரோ கட்டணம்',
    moneySafeNote: '🔒 நீங்கள் வேலையை சரிபார்த்து ஒப்புதல் அளிக்கும் வரை உங்கள் பணம் பாதுகாப்பாக இருக்கும்.',
    confirmAndDispatch: 'உறுதி செய்து தொழிலாளரை வரவழைக்க',

    twoWheeler: 'இருசக்கர வாகனம் (பைக்)',
    fourWheeler: 'நான்கு சக்கர வாகனம் (கார்)',
    flatTyreRepair: 'டியூப்லெஸ் டயர் பஞ்சர் ஒட்டுதல்',
    tubePatch: 'டியூப் பஞ்சர் சரிசெய்தல் / மாற்றுதல்',
    stepneySwap: 'ஸ்பேர் வீல் (ஸ்டெப்னி) மாற்றுதல்',
    airRefill: 'அவசர காற்று நிரப்புதல்',
    expressDispatch: 'அவசர விரைவு உதவி (8-15 நிமிடங்கள்)',

    bookingNumber: 'முன்பதிவு',
    liveStatus: 'நேரலை நிலை',
    arrivalPinTitle: 'உங்கள் 4-இலக்க ரகசிய பின் (PIN)',
    arrivalPinNote: '⚠️ தொழிலாளி உங்கள் இருப்பிடத்திற்கு வந்த பிறகே இந்த பின்னை அவரிடம் பகிரவும்.',
    serviceTimeline: 'வேலை முன்னேற்றம்',
    assignedPartner: 'ஒதுக்கப்பட்ட தொழிலாளி',
    onSiteLead: 'தள மேற்பார்வையாளர்',
    synchronizedSquad: 'ஒன்றிணைக்கப்பட்ட குழு பட்டியல்',
    extensionRequested: 'தொழிலாளி கூடுதல் நேரம் கோரியுள்ளார்',
    extensionApproved: 'கூடுதல் நேரம் அனுமதிக்கப்பட்டது ✓',
    approveExtension: 'கூடுதல் நேரத்தை அங்கீகரிக்கவும்',

    checkTheWork: 'வேலையைச் சரிபார்த்து கட்டணம் செலுத்தவும்',
    beforeWork: 'வேலைக்கு முன்',
    afterWork: 'வேலைக்கு பின்',
    workLooksGoodPay: 'வேலை நன்றாக உள்ளது — பணம் செலுத்துக',
    reportProblem: 'சரியாக இல்லையா? குறை பதிவு செய்',

    jobFinished: 'வேலை முடிந்தது & பணம் செலுத்தப்பட்டது!',
    rateExperience: 'உங்கள் அனுபவம் எப்படி இருந்தது?',
    tagPolite: '👍 கண்ணியமானவர்',
    tagOnTime: '⏱️ சரியான நேரம்',
    tagClean: '🧹 சுத்தமாக முடித்தார்',
    addTipOptional: 'கூடுதல் டிப்ஸ் (விருப்பத்தேர்வு)',
    tipGuarantee: '💚 நீங்கள் கொடுக்கும் டிப்ஸ் 100% தொழிலாளருக்கே செல்கிறது.',
    submitFeedback: 'மதிப்பீடு சமர்ப்பிக்கவும்',

    qualityGuaranteeTitle: '2 முதல் 4 நாட்கள் தர உத்தரவாதம்',
    guaranteeActiveDays: 'இன்னும் 3 நாட்களுக்கு பாதுகாப்பு உண்டு',
    option1SameWorker: 'விருப்பம் 1: அதே தொழிலாளி இலவச மறுபார்வை',
    option1Desc: 'அதே தொழிலாளி மீண்டும் வந்து எந்த கூடுதல் கட்டணமும் இன்றி சரிசெய்வார்.',
    option2NewWorker: 'விருப்பம் 2: புதிய நிபுணர் (55% தள்ளுபடி)',
    option2Desc: 'வேறொரு மூத்த நிபுணரை மானியக் கட்டணத்தில் வரவழைக்கவும்.',
    option3Refund: 'விருப்பம் 3: பணத்தை திரும்பப் பெற்று முடிக்க',
    option3Desc: 'கூட்டுறவு நிதியிலிருந்து உங்கள் பணப்பைக்கு பணம் திரும்பப் பெறப்படும்.',
    submitClaim: 'உத்தரவாதக் கோரிக்கையை அனுப்பு',
  },

  hi: {
    home: 'होम',
    orders: 'ऑर्डर्स',
    activity: 'गतिविधि',
    profile: 'प्रोफाइल',
    wallet: 'वॉलेट',
    back: 'पीछे',
    continue: 'आगे बढ़ें',
    confirm: 'पुष्टि करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    skip: 'छोड़ें',
    done: 'पूर्ण',
    verified: 'सत्यापित',
    call: 'कॉल करें',
    chat: 'मैसेज',
    track: 'ट्रैक करें',
    status: 'स्थिति',
    fixedPrice: 'निश्चित किराया',
    total: 'कुल',
    language: 'भाषा',

    roleCustomer: 'ग्राहक',
    roleWorker: 'पार्टनर',
    roleAdmin: 'एडमिन',
    demoMode: 'डेमो रोल',

    greeting: 'नमस्ते, प्रिया 👋',
    locationArea: 'आर.एस. पुरम, कोयंबटूर',
    searchPlaceholder: 'सर्च करें "नल लीकेज", "स्विच", "सफाई"...',
    activeBooking: 'सक्रिय बुकिंग',
    workerOnWay: 'कारीगर रास्ते में है',
    browseServices: 'सेवाएं चुनें',
    fixedUpfrontPricing: 'पहले से तय पारदर्शी किराया',
    escrowTrustTitle: 'पैसा सुरक्षित है (एस्क्रो)',
    escrowTrustDesc: 'आपका पैसा सुरक्षित रहता है और आपके काम देखकर मंजूरी देने के बाद ही कारीगर को दिया जाता है।',
    policyNote: 'ऑफ-प्लेटफॉर्म नकद लेनदेन से 4-दिन की गारंटी समाप्त हो जाएगी। हमेशा WorkEasy पर बुक करें।',

    plumbing: 'प्लंबिंग',
    plumbingSub: 'पाइप, नल और लीकेज मरम्मत',
    electrical: 'इलेक्ट्रिकल',
    electricalSub: 'वायरिंग और स्विच रिपेयर',
    cleaning: 'घर की सफाई',
    cleaningSub: 'डीप क्लीनिंग और स्वच्छता',
    gardening: 'बागवानी',
    gardeningSub: 'लॉन व पौधों की देखभाल',
    appliances: 'उपकरण मरम्मत',
    appliancesSub: 'एसी, फ्रिज व वॉशिंग मशीन',
    roadsideHelp: 'सड़क पर सहायता / पंचर',
    roadsideHelpSub: 'टायर पंचर और हवा भरना',
    customService: 'अन्य कार्य',
    customServiceSub: 'बढ़ईगीरी व मरम्मत कार्य',

    postJobTitle: 'सेवा बुक करें',
    stepOf: 'कदम',
    stepCategory: 'श्रेणी',
    stepDetails: 'काम और सामग्री',
    stepFareDispatch: 'किराया व आवंटन',
    stepSummary: 'विवरण',
    whatNeedsFixing: 'क्या मरम्मत करवानी है?',
    taskDescription: 'काम का विवरण लिखें',
    addPhotoOptional: 'समस्या का फोटो जोड़ें (वैकल्पिक)',
    whoBringsParts: 'सामान कौन लाएगा?',
    iHaveParts: 'मेरे पास सामान है',
    workerBringsParts: 'कारीगर लेकर आएगा',
    standardCatalogRate: '+ मानक कैटलॉग मूल्य',
    partsNeeded: 'आवश्यक पार्ट्स',
    quantity: 'मात्रा',

    workforceRequirement: 'आवश्यक कारीगर',
    oneWorker: 'एक स्वतंत्र कुशल कारीगर',
    oneWorkerDesc: 'नल रिपेयर, स्विच बदलने या छोटे कामों के लिए उत्तम।',
    teamOfWorkers: 'कारीगरों की टीम',
    teamOfWorkersDesc: 'बड़ी सफाई, नवीनीकरण या व्यावसायिक कार्यों के लिए।',
    selectCrewSize: 'टीम का आकार चुनें:',
    workersCount: 'कारीगर',
    licensedTeam: 'लाइसेंस प्राप्त ठेकेदार टीम',
    licensedTeamDesc: 'ऑन-साइट सुपरवाइजर व भारी मशीनों के साथ प्रबंधित टीम।',
    skilledGroup: 'सहकारी कुशल कारीगर समूह',
    skilledGroupDesc: 'प्रमाणित कारीगरों का समूह। 100% मजदूरी सीधे कारीगरों को।',

    autoDispatchTitle: 'स्वचालित निष्पक्ष आवंटन',
    autoDispatchBadge: 'बिना भेदभाव रोटेशन',
    autoDispatchDesc: 'WorkEasy हमारे निष्पक्ष राउंड-रॉबिन एल्गोरिदम द्वारा निकटतम प्रमाणित कारीगर को स्वचालित रूप से आवंटित करता है। कोई दलाली या मोलभाव नहीं।',
    fairRotationGuarantee: 'समान अवसर आवंटन',
    bgVerifiedBadge: 'आधार व पुलिस रिकॉर्ड सत्यापित',
    skillCertifiedBadge: 'ट्रेड स्किल प्रमाणित',
    zeroBiddingBadge: 'पहले से तय पारदर्शी दर',
    scheduleService: 'सेवा कब चाहिए?',
    nowIn20m: 'अभी (15-20 मिनट में)',
    laterToday: 'आज बाद में / निर्धारित समय',
    fareBreakdown: 'किराया विवरण (गारंटीकृत दर)',
    baseLaborCharge: 'मानक मजदूरी',
    transitAllowance: 'दूरी यात्रा भत्ता',
    replacementParts: 'पार्ट्स / सामग्री',
    platformCommission: 'प्लेटफॉर्म कमीशन',
    zeroCommissionNote: '₹0 (100% सीधे कारीगर को)',
    totalEscrowAmount: 'कुल सुरक्षित एस्क्रो राशि',
    moneySafeNote: '🔒 आपका पैसा काम देखकर पुष्टि करने तक सुरक्षित रहता है।',
    confirmAndDispatch: 'पुष्टि करें और कारीगर बुलाएं',

    twoWheeler: '2-पहिया (बाइक/स्कूटर)',
    fourWheeler: '4-पहिया (कार/एसयूवी)',
    flatTyreRepair: 'ट्यूबलेस टायर पंचर मरम्मत',
    tubePatch: 'ट्यूब पंचर पैच / बदलना',
    stepneySwap: 'स्टेपनी पहिया बदलना',
    airRefill: 'आपातकालीन उच्च दबाव हवा',
    expressDispatch: 'आपातकालीन सहायता (8-15 मिनट में)',

    bookingNumber: 'बुकिंग',
    liveStatus: 'लाइव स्थिति',
    arrivalPinTitle: 'आपका 4-अंकों का आगमन कोड',
    arrivalPinNote: '⚠️ यह कोड कारीगर के आपके दरवाजे पर पहुंचने के बाद ही उसे बताएं।',
    serviceTimeline: 'कार्य प्रगति टाइमलाइन',
    assignedPartner: 'आवंटित कारीगर',
    onSiteLead: 'ऑन-साइट सुपरवाइजर',
    synchronizedSquad: 'समन्वित टीम रोस्टर',
    extensionRequested: 'कारीगर ने अतिरिक्त समय मांगा है',
    extensionApproved: 'अतिरिक्त समय स्वीकृत ✓',
    approveExtension: 'अतिरिक्त समय स्वीकार करें',

    checkTheWork: 'काम जांचें और भुगतान रिलीज करें',
    beforeWork: 'काम से पहले',
    afterWork: 'काम के बाद',
    workLooksGoodPay: 'काम बढ़िया है — भुगतान करें',
    reportProblem: 'कोई समस्या है? शिकायत दर्ज करें',

    jobFinished: 'काम पूरा हुआ और भुगतान हो गया!',
    rateExperience: 'आपका अनुभव कैसा रहा?',
    tagPolite: '👍 विनम्र',
    tagOnTime: '⏱️ समय पर',
    tagClean: '🧹 साफ-सुथरा काम',
    addTipOptional: 'कारीगर के लिए टिप (वैकल्पिक)',
    tipGuarantee: '💚 आपकी 100% टिप सीधे कारीगर को मिलती है।',
    submitFeedback: 'रेटिंग सबमिट करें',

    qualityGuaranteeTitle: '2 से 4 दिन की गुणवत्ता गारंटी',
    guaranteeActiveDays: '3 और दिनों के लिए सुरक्षित (दिन 2/4)',
    option1SameWorker: 'विकल्प 1: उसी कारीगर का निःशुल्क दौरा',
    option1Desc: 'वही कारीगर बिना किसी अतिरिक्त शुल्क के समस्या ठीक करेगा।',
    option2NewWorker: 'विकल्प 2: नया सीनियर कारीगर (55% छूट)',
    option2Desc: 'सब्सिडी वाली दर पर अन्य वरिष्ठ मास्टर कारीगर को भेजा जाएगा।',
    option3Refund: 'विकल्प 3: रिफंड और समाधान',
    option3Desc: 'सहकारी फंड से सीधे आपके वॉलेट में राशि वापस की जाएगी।',
    submitClaim: 'गारंटी क्लेम सबमिट करें',
  },
};

export const getTranslation = (lang: Language, key: keyof Translations): string => {
  const dict = translations[lang] || translations.en;
  return dict[key] || translations.en[key] || (key as string);
};
