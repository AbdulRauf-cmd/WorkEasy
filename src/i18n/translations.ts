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
  change: string;
  today: string;
  tomorrow: string;

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
  selectServiceCategory: string;
  standardCoopRates: string;
  fromRate: string;
  baseLaborLabel: string;
  taskAndMaterials: string;
  specifyRequirements: string;
  vehicleType: string;
  twoWheelerBike: string;
  fourWheelerCar: string;
  punctureServiceType: string;
  materialsReplacementParts: string;
  iWillProvideParts: string;
  iWillProvidePartsDesc: string;
  partnerProcuresParts: string;
  partnerProcuresPartsDesc: string;
  partsFeeZero: string;
  specificRequirements: string;
  addressLabel: string;
  scheduleDate: string;
  timeWindow: string;
  bookingSummaryTitle: string;
  inspectFareSummary: string;
  workforceModelLabel: string;
  serviceCategoryLabel: string;
  confirmAndDispatchPartner: string;
  reviewBooking: string;

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
  noActiveBooking: string;
  noActiveBookingDesc: string;
  bookAService: string;
  partnerArrivedDestination: string;
  actionRequired: string;
  sharePinToStart: string;
  activeServiceInProgress: string;
  callPartner: string;
  chatPartner: string;
  viewVerificationChecklist: string;

  // Verification & Before/After
  checkTheWork: string;
  beforeWork: string;
  afterWork: string;
  workLooksGoodPay: string;
  reportProblem: string;
  serviceSignOffTitle: string;
  inspectCompletedWork: string;
  taskExecutedSpec: string;
  worksiteCleaned: string;
  settlementAmount: string;
  approveWorkReleasePayment: string;
  reportIncompleteService: string;

  // Rating & Tip
  jobFinished: string;
  rateExperience: string;
  tagPolite: string;
  tagOnTime: string;
  tagClean: string;
  addTipOptional: string;
  tipGuarantee: string;
  submitFeedback: string;
  paymentReleasedTitle: string;
  tipAddedNote: string;
  backToHome: string;

  // Quality Guarantee & Warranty
  qualityGuaranteeTitle: string;
  guaranteeActiveDays: string;
  option1SameWorker: string;
  option1Desc: string;
  option2NewWorker: string;
  option2Desc: string;
  option3Refund: string;
  option3Desc: string;
  submitClaim: string;
  warrantyQueryModalTitle: string;
  freeRevisitBtn: string;
  subsidizedRebookBtn: string;
  directRefundBtn: string;
  closeWarrantyModal: string;

  // Classification Screen
  matchingCertifiedPro: string;
  auditingSafetyAvailability: string;
  stepBookingRegistered: string;
  stepBookingRegisteredDetail: string;
  stepSkillAudit: string;
  stepSkillAuditDetail: string;
  stepAccreditationTier: string;
  stepAccreditationTierDetail: string;
  stepPartnerAllocation: string;
  stepPartnerAllocationDetail: string;

  // Matched Partner Screen
  partnerAssignedTitle: string;
  partnerPreparingDispatch: string;
  verificationSafetySummary: string;
  verifiedPartnerItem: string;
  verifiedPartnerItemDesc: string;
  certifiedSkillItem: string;
  certifiedSkillItemDesc: string;
  transparentDispatchItem: string;
  transparentDispatchItemDesc: string;
  trackLiveBookingBtn: string;

  // Timeline & Tiers
  timelineBookingPlaced: string;
  timelineBookingPlacedDetail: string;
  timelinePartnerAssigned: string;
  timelinePartnerAssignedDetail: string;
  timelineBookingConfirmed: string;
  timelineBookingConfirmedDetail: string;
  timelinePartnerArrived: string;
  timelinePartnerArrivedDetail: string;
  timelineServiceInProgress: string;
  timelineServiceInProgressDetail: string;
  timelineServiceCompleted: string;
  timelineServiceCompletedDetail: string;
  timelinePaymentReleased: string;
  timelinePaymentReleasedDetail: string;
  tierBasic: string;
  tierSkilled: string;
  tierSpecialized: string;

  // Worker Screens
  workerHub: string;
  onlineStatus: string;
  offlineStatus: string;
  todaysPayout: string;
  ratingLabel: string;
  completedJobsLabel: string;
  activeAssignment: string;
  continueActiveAssignment: string;
  availableDispatchRequests: string;
  roundRobinQueue: string;
  acceptDispatchBtn: string;
  declineDispatchBtn: string;
  navigatingToCustomer: string;
  arrivedAtCustomerSite: string;
  enterStartPin: string;
  verifyPinAndStart: string;
  requestTimeExtension: string;
  captureBeforePhoto: string;
  captureAfterPhoto: string;
  markTaskComplete: string;
  payoutSummary: string;
  zeroCommissionKeep100: string;

  // Profile & Activity
  customerProfileTitle: string;
  accountSettings: string;
  cooperativeId: string;
  languageSelection: string;
  emergencySos: string;
  activityHistoryTitle: string;
  noPastBookingsYet: string;
  viewReceipt: string;

  // Admin / Cooperative Dashboard
  cooperativeGovernance: string;
  activePartnersMetric: string;
  totalEscrowHeldMetric: string;
  fairRotationRate: string;
  zeroCommissionSaved: string;
  liveAuditLog: string;

  // Masked Phone Calling (Rapido style)
  maskedCallTitle: string;
  maskedCallSubtitle: string;
  maskedCallPrivacyNote: string;
  maskedCallConnecting: string;
  maskedCallVirtualNumber: string;
  maskedCallStartBtn: string;
  maskedCallClose: string;
  maskedCallSafetyBadge: string;
  virtualLine: string;

  // Geo-verification & Live Camera
  geoVerifiedDoorstep: string;
  geoDistanceMeters: string;
  geoFencePassed: string;
  geoFenceFailed: string;
  geoFenceAlertOffsite: string;
  cameraLiveOnlyNote: string;
  galleryDisabledNote: string;
  takeLivePhotoBtn: string;
  retakePhotoBtn: string;
  photoGeoStamped: string;
  pinGeoVerified: string;
  pinGeoFailed: string;
  testSimulateOnsite: string;
  testSimulateOffsite: string;
  watermarkVerified: string;
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
    change: 'Change',
    today: 'Today',
    tomorrow: 'Tomorrow',

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
    selectServiceCategory: 'Select service category',
    standardCoopRates: 'Standard cooperative labor rates based on skill level',
    fromRate: 'From',
    baseLaborLabel: 'Base Labor',
    taskAndMaterials: 'Task & Material Selection',
    specifyRequirements: 'Specify requirements and who supplies replacement parts',
    vehicleType: 'Vehicle Type',
    twoWheelerBike: '2-Wheeler (Motorbike / Scooter)',
    fourWheelerCar: '4-Wheeler (Car / SUV)',
    punctureServiceType: 'Puncture Service Type',
    materialsReplacementParts: 'Materials & Replacement Parts',
    iWillProvideParts: 'I will provide materials (Labor Only)',
    iWillProvidePartsDesc: 'You provide the parts (switch, tap, valve). Partner brings tools only.',
    partnerProcuresParts: 'Partner procures materials (Labor + Parts)',
    partnerProcuresPartsDesc: 'Partner buys & brings certified replacement parts at standard catalog price.',
    partsFeeZero: '₹0 extra',
    specificRequirements: 'Specific Requirements / Dimensions',
    addressLabel: 'Service Address',
    scheduleDate: 'Service Date',
    timeWindow: 'Time Window',
    bookingSummaryTitle: 'Booking Summary',
    inspectFareSummary: 'Inspect transparent fare breakdown and workforce dispatch',
    workforceModelLabel: 'Workforce Model',
    serviceCategoryLabel: 'Service Category',
    confirmAndDispatchPartner: 'Confirm & Dispatch Partner',
    reviewBooking: 'Review Booking',

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
    noActiveBooking: 'No Active Booking',
    noActiveBookingDesc: 'You have no live service appointments in progress.',
    bookAService: 'Book a Service',
    partnerArrivedDestination: 'Partner Arrived at Destination',
    actionRequired: 'Action Required',
    sharePinToStart: 'Share this start PIN with partner to begin work',
    activeServiceInProgress: 'Service in Progress',
    callPartner: 'Call Partner',
    chatPartner: 'Chat Message',
    viewVerificationChecklist: 'View Sign-off Checklist',

    checkTheWork: 'Check The Work & Release Payment',
    beforeWork: 'BEFORE WORK',
    afterWork: 'AFTER WORK',
    workLooksGoodPay: 'Work Looks Good — Release Payment',
    reportProblem: 'Something not right? Flag Quality Fault',
    serviceSignOffTitle: 'Service Sign-Off',
    inspectCompletedWork: 'Please inspect the completed work',
    taskExecutedSpec: 'Task executed according to specifications',
    worksiteCleaned: 'Worksite cleaned & restored',
    settlementAmount: 'Settlement Amount',
    approveWorkReleasePayment: 'Approve Work & Release Payment',
    reportIncompleteService: 'Report Incomplete Service',

    jobFinished: 'Service Completed & Paid!',
    rateExperience: 'How was your experience?',
    tagPolite: '👍 Polite',
    tagOnTime: '⏱️ On Time',
    tagClean: '🧹 Left Clean',
    addTipOptional: 'Add a Tip for Partner (Optional)',
    tipGuarantee: '💚 100% of your tip goes straight to the partner.',
    submitFeedback: 'Submit Rating & Feedback',
    paymentReleasedTitle: 'Payment Released to Partner',
    tipAddedNote: 'Your cooperative bonus has been added to their wallet.',
    backToHome: 'Back to Home',

    qualityGuaranteeTitle: '2 to 4 Days Quality Guarantee',
    guaranteeActiveDays: 'Covered for 3 more days (Day 2 of 4)',
    option1SameWorker: 'Option 1: Free Same-Partner Revisit',
    option1Desc: 'Original partner returns to adjust and fix the issue at ₹0 extra cost.',
    option2NewWorker: 'Option 2: Rebook New Specialist (55% Rebate)',
    option2Desc: 'Dispatch a different accredited senior master craftsman at subsidized rate.',
    option3Refund: 'Option 3: Escrow Settlement & Refund',
    option3Desc: 'Receive direct cooperative refund to your wallet without rebooking.',
    submitClaim: 'Submit Resolution Claim',
    warrantyQueryModalTitle: 'Cooperative Guarantee Resolution',
    freeRevisitBtn: 'Request Free Revisit (₹0)',
    subsidizedRebookBtn: 'Book Senior Specialist (55% Off)',
    directRefundBtn: 'Instant Escrow Refund',
    closeWarrantyModal: 'Close & Dismiss',

    matchingCertifiedPro: 'Matching Certified Professional',
    auditingSafetyAvailability: 'Auditing safety requirements & partner availability',
    stepBookingRegistered: 'Booking Registered',
    stepBookingRegisteredDetail: 'Task recorded in local cooperative registry',
    stepSkillAudit: 'Skill Qualification Audit',
    stepSkillAuditDetail: 'Classifying technical safety requirements',
    stepAccreditationTier: 'Accreditation Tier Assigned',
    stepAccreditationTierDetail: 'Mandatory certification gate verified',
    stepPartnerAllocation: 'Partner Allocation',
    stepPartnerAllocationDetail: 'Selecting available partner via fair rotation',

    partnerAssignedTitle: 'Partner Assigned',
    partnerPreparingDispatch: 'Your service professional is preparing for dispatch',
    verificationSafetySummary: 'Verification & Safety Summary',
    verifiedPartnerItem: 'Verified Partner',
    verifiedPartnerItemDesc: 'Government ID & police background verification completed',
    certifiedSkillItem: 'Certified Technical Skill',
    certifiedSkillItemDesc: 'Plumbing & Trade certification audited by cooperative',
    transparentDispatchItem: 'Transparent Dispatch',
    transparentDispatchItemDesc: 'Assigned through non-discriminatory rotation algorithm',
    trackLiveBookingBtn: 'Track Live Booking & View PIN',

    timelineBookingPlaced: 'Booking Placed',
    timelineBookingPlacedDetail: 'Service request submitted',
    timelinePartnerAssigned: 'Partner Assigned',
    timelinePartnerAssignedDetail: 'Verified professional selected',
    timelineBookingConfirmed: 'Booking Confirmed',
    timelineBookingConfirmedDetail: 'Partner en route to location',
    timelinePartnerArrived: 'Partner Arrived (PIN Verification)',
    timelinePartnerArrivedDetail: 'Verification required to begin work',
    timelineServiceInProgress: 'Service in Progress',
    timelineServiceInProgressDetail: 'Work actively being performed',
    timelineServiceCompleted: 'Service Completed',
    timelineServiceCompletedDetail: 'Partner submitted final sign-off',
    timelinePaymentReleased: 'Payment Released',
    timelinePaymentReleasedDetail: 'Quality verified & payment settled',
    tierBasic: 'Basic (Level 1)',
    tierSkilled: 'Skilled (Level 2)',
    tierSpecialized: 'Specialized (Level 3)',

    workerHub: 'Coimbatore Hub',
    onlineStatus: 'Online',
    offlineStatus: 'Offline',
    todaysPayout: "Today's Payout",
    ratingLabel: 'Rating',
    completedJobsLabel: 'Completed',
    activeAssignment: 'Active Assignment',
    continueActiveAssignment: 'Continue →',
    availableDispatchRequests: 'Available Dispatch Requests',
    roundRobinQueue: 'Round-Robin Fair Queue',
    acceptDispatchBtn: 'Accept Assignment',
    declineDispatchBtn: 'Decline',
    navigatingToCustomer: 'Navigating to Customer Location',
    arrivedAtCustomerSite: 'I Have Arrived at Location',
    enterStartPin: 'Enter Customer 4-Digit Start PIN',
    verifyPinAndStart: 'Verify PIN & Begin Work',
    requestTimeExtension: 'Request 30m Time Extension',
    captureBeforePhoto: 'Take Before-Work Photo',
    captureAfterPhoto: 'Take After-Work Photo',
    markTaskComplete: 'Submit Task for Customer Review',
    payoutSummary: 'Daily Earnings Breakdown',
    zeroCommissionKeep100: '0% platform cut — You keep 100% of your labor earnings.',

    customerProfileTitle: 'User Profile & Settings',
    accountSettings: 'Account Settings',
    cooperativeId: 'Cooperative Member ID',
    languageSelection: 'Language / மொழி / भाषा',
    emergencySos: 'Emergency Safety Hotline (24x7)',
    activityHistoryTitle: 'Activity & Booking History',
    noPastBookingsYet: 'No past booking records yet.',
    viewReceipt: 'View Full Invoice',

    cooperativeGovernance: 'Cooperative Oversight & Fair Dispatch',
    activePartnersMetric: 'Active Certified Partners',
    totalEscrowHeldMetric: 'Total Escrow Protected',
    fairRotationRate: 'Fair Rotation Compliance',
    zeroCommissionSaved: 'Saved in Zero Commissions',
    liveAuditLog: 'Live Algorithmic Allocation Stream',

    // Masked Phone Calling (Rapido style)
    maskedCallTitle: 'Secure Masked Call',
    maskedCallSubtitle: 'WorkEasy Encrypted Relay (Rapido-style)',
    maskedCallPrivacyNote: 'Your real phone number remains 100% hidden and confidential. Calls are connected through our secure virtual proxy line with automatic fraud detection and safety monitoring.',
    maskedCallConnecting: 'Connecting through secure proxy...',
    maskedCallVirtualNumber: 'Virtual Relay Line',
    maskedCallStartBtn: 'Call via Virtual Proxy',
    maskedCallClose: 'Cancel Call',
    maskedCallSafetyBadge: 'Private & Encrypted',
    virtualLine: 'Masked Virtual Line',

    // Geo-verification & Live Camera
    geoVerifiedDoorstep: 'Doorstep Location Verified',
    geoDistanceMeters: 'Distance to Customer',
    geoFencePassed: 'Geo-fence Verified (On-Site)',
    geoFenceFailed: 'Geo-fence Check Failed (Off-Site)',
    geoFenceAlertOffsite: 'You must be physically present within 100 meters of the customer\'s site to perform this action.',
    cameraLiveOnlyNote: 'Live Camera Capture Enforced',
    galleryDisabledNote: 'Gallery attachment is strictly disabled to prevent fraud. You must capture a live photo on-site.',
    takeLivePhotoBtn: 'Snap Live Photo (On-Site)',
    retakePhotoBtn: 'Retake Live Photo',
    photoGeoStamped: 'Geo-Stamped & Watermarked',
    pinGeoVerified: 'Arrival PIN & Location Verified',
    pinGeoFailed: 'Location Mismatch: Cannot verify PIN while away from customer premises',
    testSimulateOnsite: 'Simulate On-Site (14m)',
    testSimulateOffsite: 'Simulate Off-Site (2.4 km)',
    watermarkVerified: 'Tamper-Proof Geo Verification',
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
    change: 'மாற்று',
    today: 'இன்று',
    tomorrow: 'நாளை',

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
    selectServiceCategory: 'சேவை வகையைத் தேர்ந்தெடுக்கவும்',
    standardCoopRates: 'திறன் நிலையின் அடிப்படையிலான நிலையான கூட்டுறவு கட்டணம்',
    fromRate: 'தொடக்கக் கட்டணம்',
    baseLaborLabel: 'அடிப்படை உழைப்பு',
    taskAndMaterials: 'வேலை & பொருட்கள் தேர்வு',
    specifyRequirements: 'வேலையை விவரித்து, மாற்றுப் பொருட்கள் யார் வழங்குவது எனக் குறிப்பிடவும்',
    vehicleType: 'வாகன வகை',
    twoWheelerBike: 'இருசக்கர வாகனம் (பைக் / ஸ்கூட்டர்)',
    fourWheelerCar: 'நான்கு சக்கர வாகனம் (கார் / எஸ்யூவி)',
    punctureServiceType: 'பஞ்சர் சேவை வகை',
    materialsReplacementParts: 'பொருட்கள் மற்றும் உதிரிபாகங்கள்',
    iWillProvideParts: 'பொருட்களை நானே வழங்குவேன் (வேலை மட்டும்)',
    iWillProvidePartsDesc: 'பொருட்களை நீங்கள் வழங்க வேண்டும். தொழிலாளி கருவிகளை மட்டுமே கொண்டு வருவார்.',
    partnerProcuresParts: 'தொழிலாளியே வாங்கி வருவார் (வேலை + பொருட்கள்)',
    partnerProcuresPartsDesc: 'தொழிலாளி சான்றளிக்கப்பட்ட பாகங்களை நிலையான விலையில் வாங்கி வருவார்.',
    partsFeeZero: '₹0 கூடுதல்',
    specificRequirements: 'குறிப்பிட்ட தேவைகள் / விவரங்கள்',
    addressLabel: 'சேவை முகவரி',
    scheduleDate: 'சேவை தேதி',
    timeWindow: 'நேர இடைவெளி',
    bookingSummaryTitle: 'முன்பதிவு சுருக்கம்',
    inspectFareSummary: 'வெளிப்படையான கட்டண விபரம் மற்றும் தொழிலாளர் ஒதுக்கீடு',
    workforceModelLabel: 'தொழிலாளர் வகை',
    serviceCategoryLabel: 'சேவை வகை',
    confirmAndDispatchPartner: 'உறுதி செய்து தொழிலாளரை வரவழைக்க',
    reviewBooking: 'முன்பதிவைச் சரிபார்க்கவும்',

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
    noActiveBooking: 'செயலில் முன்பதிவு இல்லை',
    noActiveBookingDesc: 'தற்போது எந்தவொரு நேரலை சேவையும் நிலுவையில் இல்லை.',
    bookAService: 'சேவையை முன்பதிவு செய்க',
    partnerArrivedDestination: 'தொழிலாளி உங்கள் இருப்பிடத்திற்கு வந்துவிட்டார்',
    actionRequired: 'உடனடி நடவடிக்கை தேவை',
    sharePinToStart: 'வேலையைத் தொடங்க இந்த ரகசிய பின்னை தொழிலாளரிடம் பகிரவும்',
    activeServiceInProgress: 'வேலை நடைபெற்று வருகிறது',
    callPartner: 'அழைக்கவும்',
    chatPartner: 'செய்தி அனுப்பவும்',
    viewVerificationChecklist: 'சரிபார்ப்புப் பட்டியலைக் காண்க',

    checkTheWork: 'வேலையைச் சரிபார்த்து கட்டணம் செலுத்தவும்',
    beforeWork: 'வேலைக்கு முன்',
    afterWork: 'வேலைக்கு பின்',
    workLooksGoodPay: 'வேலை நன்றாக உள்ளது — பணம் செலுத்துக',
    reportProblem: 'சரியாக இல்லையா? குறை பதிவு செய்',
    serviceSignOffTitle: 'சேவை சரிபார்ப்பு & ஒப்புதல்',
    inspectCompletedWork: 'தயவுசெய்து முடிக்கப்பட்ட வேலையை ஆய்வு செய்யவும்',
    taskExecutedSpec: 'கூறியபடி வேலை சரியாக செய்யப்பட்டுள்ளது',
    worksiteCleaned: 'வேலை செய்த இடம் சுத்தமாக விடப்பட்டுள்ளது',
    settlementAmount: 'வழங்கப்படும் தொகை',
    approveWorkReleasePayment: 'வேலையை ஏற்று பணத்தை விடுவிக்கவும்',
    reportIncompleteService: 'குறைபாட்டைப் புகாரளிக்கவும்',

    jobFinished: 'வேலை முடிந்தது & பணம் செலுத்தப்பட்டது!',
    rateExperience: 'உங்கள் அனுபவம் எப்படி இருந்தது?',
    tagPolite: '👍 கண்ணியமானவர்',
    tagOnTime: '⏱️ சரியான நேரம்',
    tagClean: '🧹 சுத்தமாக முடித்தார்',
    addTipOptional: 'கூடுதல் டிப்ஸ் (விருப்பத்தேர்வு)',
    tipGuarantee: '💚 நீங்கள் கொடுக்கும் டிப்ஸ் 100% தொழிலாளருக்கே செல்கிறது.',
    submitFeedback: 'மதிப்பீடு சமர்ப்பிக்கவும்',
    paymentReleasedTitle: 'தொழிலாளிக்கு பணம் விடுவிக்கப்பட்டது',
    tipAddedNote: 'உங்கள் கூடுதல் போனஸ் தொழிலாளியின் கணக்கில் சேர்க்கப்பட்டது.',
    backToHome: 'முகப்புக்குத் திரும்பு',

    qualityGuaranteeTitle: '2 முதல் 4 நாட்கள் தர உத்தரவாதம்',
    guaranteeActiveDays: 'இன்னும் 3 நாட்களுக்கு பாதுகாப்பு உண்டு',
    option1SameWorker: 'விருப்பம் 1: அதே தொழிலாளி இலவச மறுபார்வை',
    option1Desc: 'அதே தொழிலாளி மீண்டும் வந்து எந்த கூடுதல் கட்டணமும் இன்றி சரிசெய்வார்.',
    option2NewWorker: 'விருப்பம் 2: புதிய நிபுணர் (55% தள்ளுபடி)',
    option2Desc: 'வேறொரு மூத்த நிபுணரை மானியக் கட்டணத்தில் வரவழைக்கவும்.',
    option3Refund: 'விருப்பம் 3: பணத்தை திரும்பப் பெற்று முடிக்க',
    option3Desc: 'கூட்டுறவு நிதியிலிருந்து உங்கள் பணப்பைக்கு பணம் திரும்பப் பெறப்படும்.',
    submitClaim: 'உத்தரவாதக் கோரிக்கையை அனுப்பு',
    warrantyQueryModalTitle: 'கூட்டுறவு உத்தரவாத தீர்வு',
    freeRevisitBtn: 'இலவச மறுபார்வை கோரவும் (₹0)',
    subsidizedRebookBtn: 'மூத்த நிபுணரை புக் செய்க (55% தள்ளுபடி)',
    directRefundBtn: 'உடனடி எஸ்க்ரோ ரீஃபண்ட்',
    closeWarrantyModal: 'மூடுக',

    matchingCertifiedPro: 'சான்றளிக்கப்பட்ட நிபுணர் ஒதுக்கீடு',
    auditingSafetyAvailability: 'பாதுகாப்புத் தேவைகள் & தொழிலாளர் இருப்பு சரிபார்க்கப்படுகிறது',
    stepBookingRegistered: 'முன்பதிவு பதிவு செய்யப்பட்டது',
    stepBookingRegisteredDetail: 'உள்ளூர் கூட்டுறவுப் பதிவேட்டில் பணி குறிக்கப்பட்டது',
    stepSkillAudit: 'திறன் தகுதி தணிக்கை',
    stepSkillAuditDetail: 'தொழில்நுட்ப பாதுகாப்புத் தேவைகளை வகைப்படுத்துதல்',
    stepAccreditationTier: 'அங்கீகார நிலை நிர்ணயிக்கப்பட்டது',
    stepAccreditationTierDetail: 'கட்டாயச் சான்றிதழ் சரிபார்க்கப்பட்டது',
    stepPartnerAllocation: 'தொழிலாளி ஒதுக்கீடு',
    stepPartnerAllocationDetail: 'சுழற்சி முறையில் சிறந்த நிபுணர் ஒதுக்கப்படுகிறார்',

    partnerAssignedTitle: 'தொழிலாளி ஒதுக்கப்பட்டார்',
    partnerPreparingDispatch: 'தொழிலாளி புறப்படத் தயாராகிறார்',
    verificationSafetySummary: 'சரிபார்ப்பு & பாதுகாப்புச் சுருக்கம்',
    verifiedPartnerItem: 'சரிபார்க்கப்பட்ட தொழிலாளி',
    verifiedPartnerItemDesc: 'அரசு அடையாள அட்டை & காவல் துறைப் பின்னணி சரிபார்க்கப்பட்டது',
    certifiedSkillItem: 'சான்றளிக்கப்பட்ட தொழில்நுட்பத் திறன்',
    certifiedSkillItemDesc: 'கூட்டுறவால் தணிக்கை செய்யப்பட்ட தொழில் சான்றிதழ்',
    transparentDispatchItem: 'வெளிப்படையான ஒதுக்கீடு',
    transparentDispatchItemDesc: 'பாகுபாடற்ற சுழற்சி முறை அல்காரிதம் மூலம் நியமிக்கப்பட்டார்',
    trackLiveBookingBtn: 'நேரலையாகக் கண்காணிக்க & பின்னைப் பார்க்க',

    timelineBookingPlaced: 'முன்பதிவு செய்யப்பட்டது',
    timelineBookingPlacedDetail: 'சேவைக் கோரிக்கை சமர்ப்பிக்கப்பட்டது',
    timelinePartnerAssigned: 'தொழிலாளி ஒதுக்கப்பட்டார்',
    timelinePartnerAssignedDetail: 'சரிபார்க்கப்பட்ட நிபுணர் தேர்வு செய்யப்பட்டார்',
    timelineBookingConfirmed: 'முன்பதிவு உறுதியானது',
    timelineBookingConfirmedDetail: 'தொழிலாளி உங்கள் இடத்தை நோக்கி வருகிறார்',
    timelinePartnerArrived: 'தொழிலாளி வந்தார் (பின் சரிபார்ப்பு)',
    timelinePartnerArrivedDetail: 'வேலையைத் தொடங்க சரிபார்ப்பு அவசியம்',
    timelineServiceInProgress: 'வேலை நடைபெறுகிறது',
    timelineServiceInProgressDetail: 'பணி தீவிரமாக மேற்கொள்ளப்படுகிறது',
    timelineServiceCompleted: 'வேலை முடிந்தது',
    timelineServiceCompletedDetail: 'தொழிலாளி இறுதி ஒப்புதலைச் சமர்ப்பித்தார்',
    timelinePaymentReleased: 'பணம் வழங்கப்பட்டது',
    timelinePaymentReleasedDetail: 'தரம் சரிபார்க்கப்பட்டு பணம் விடுவிக்கப்பட்டது',
    tierBasic: 'அடிப்படை (நிலை 1)',
    tierSkilled: 'திறமையான (நிலை 2)',
    tierSpecialized: 'சிறப்பு நிபுணர் (நிலை 3)',

    workerHub: 'கோயம்புத்தூர் மையம்',
    onlineStatus: 'ஆன்லைன்',
    offlineStatus: 'ஆஃப்லைன்',
    todaysPayout: 'இன்றைய வருமானம்',
    ratingLabel: 'மதிப்பீடு',
    completedJobsLabel: 'முடித்தவை',
    activeAssignment: 'செயலில் உள்ள பணி',
    continueActiveAssignment: 'தொடரவும் →',
    availableDispatchRequests: 'கிடைக்கக்கூடிய பணிக் கோரிக்கைகள்',
    roundRobinQueue: 'நியாயமான சுழற்சி வரிசை',
    acceptDispatchBtn: 'பணியை ஏற்கவும்',
    declineDispatchBtn: 'நிராகரி',
    navigatingToCustomer: 'வாடிக்கையாளர் இருப்பிடத்திற்குச் செல்லுதல்',
    arrivedAtCustomerSite: 'நான் இருப்பிடத்தை அடைந்துவிட்டேன்',
    enterStartPin: 'வாடிக்கையாளரின் 4-இலக்க பின்னை உள்ளிடவும்',
    verifyPinAndStart: 'பின்னைச் சரிபார்த்து பணியைத் தொடங்கவும்',
    requestTimeExtension: '30 நிமிட கூடுதல் நேரம் கோரவும்',
    captureBeforePhoto: 'வேலைக்கு முந்தைய புகைப்படம் எடுக்கவும்',
    captureAfterPhoto: 'வேலைக்கு பிந்தைய புகைப்படம் எடுக்கவும்',
    markTaskComplete: 'பணியை ஒப்புதலுக்கு அனுப்பவும்',
    payoutSummary: 'தினசரி வருமான விவரம்',
    zeroCommissionKeep100: '0% கமிஷன் — உங்கள் உழைப்பின் 100% வருமானம் உங்களுக்கே.',

    customerProfileTitle: 'பயனர் சுயவிவரம் & அமைப்புகள்',
    accountSettings: 'கணக்கு அமைப்புகள்',
    cooperativeId: 'கூட்டுறவு உறுப்பினர் எண்',
    languageSelection: 'மொழி / Language / भाषा',
    emergencySos: 'அவசர உதவி எண் (24x7)',
    activityHistoryTitle: 'செயல்பாடு & முன்பதிவு வரலாறு',
    noPastBookingsYet: 'முந்தைய பதிவுகள் எதுவும் இல்லை.',
    viewReceipt: 'முழு ரசீதைப் பார்க்கவும்',

    cooperativeGovernance: 'கூட்டுறவு நிர்வாகம் & நியாயமான ஒதுக்கீடு',
    activePartnersMetric: 'செயலில் உள்ள சான்றளிக்கப்பட்ட தொழிலாளர்கள்',
    totalEscrowHeldMetric: 'பாதுகாக்கப்பட்ட எஸ்க்ரோ நிதி',
    fairRotationRate: 'சுழற்சி முறை இணக்கம்',
    zeroCommissionSaved: 'கமிஷன் இல்லாததால் மிச்சமான தொகை',
    liveAuditLog: 'நேரலை ஒதுக்கீட்டுப் பதிவு',

    // Masked Phone Calling (Rapido style)
    maskedCallTitle: 'பாதுகாப்பான மறைக்கப்பட்ட அழைப்பு',
    maskedCallSubtitle: 'WorkEasy மறைகுறியாக்கப்பட்ட ரிலே (ராபிடோ பாணி)',
    maskedCallPrivacyNote: 'உங்கள் உண்மையான தொலைபேசி எண் 100% ரகசியமாக வைக்கப்படும். பாதுகாப்பு மற்றும் மோசடி தடுப்புக்காக மெய்நிகர் பிராக்ஸி வழியாக அழைப்புகள் இணைக்கப்படுகின்றன.',
    maskedCallConnecting: 'பாதுகாப்பான பிராக்ஸி வழியாக இணைக்கிறது...',
    maskedCallVirtualNumber: 'மெய்நிகர் ரிலே எண்',
    maskedCallStartBtn: 'மெய்நிகர் எண் மூலம் அழை',
    maskedCallClose: 'ரத்து செய்',
    maskedCallSafetyBadge: 'ரகசியம் மற்றும் பாதுகாப்பானது',
    virtualLine: 'மறைக்கப்பட்ட மெய்நிகர் எண்',

    // Geo-verification & Live Camera
    geoVerifiedDoorstep: 'வாடிக்கையாளர் முகவரி சரிபார்க்கப்பட்டது',
    geoDistanceMeters: 'வாடிக்கையாளருக்கான தூரம்',
    geoFencePassed: 'இருப்பிடம் சரிபார்க்கப்பட்டது (தளத்தில்)',
    geoFenceFailed: 'இருப்பிட சரிபார்ப்பு தோல்வி (வெளியில்)',
    geoFenceAlertOffsite: 'இந்த செயலைச் செய்ய நீங்கள் வாடிக்கையாளரின் இடத்திலிருந்து 100 மீட்டருக்குள் இருக்க வேண்டும்.',
    cameraLiveOnlyNote: 'நேரடி கேமரா புகைப்படம் மட்டுமே அனுமதிக்கப்படும்',
    galleryDisabledNote: 'மோசடிகளைத் தவிர்க்க கேலரி படங்கள் முடக்கப்பட்டுள்ளன. தளத்தில் இருந்தே நேரடி புகைப்படம் எடுக்க வேண்டும்.',
    takeLivePhotoBtn: 'நேரடி புகைப்படம் எடு (தளத்தில்)',
    retakePhotoBtn: 'மீண்டும் புகைப்படம் எடு',
    photoGeoStamped: 'இருப்பிட முத்திரை பதிக்கப்பட்டது',
    pinGeoVerified: 'வருகை PIN & இருப்பிடம் சரிபார்க்கப்பட்டது',
    pinGeoFailed: 'இருப்பிட முரண்பாடு: வாடிக்கையாளர் இடத்திற்கு வெளியே இருந்து PIN சரிபார்க்க முடியாது',
    testSimulateOnsite: 'தளத்தில் இருத்தல் (14 மீ)',
    testSimulateOffsite: 'வெளியில் இருத்தல் (2.4 கி.மீ)',
    watermarkVerified: 'சரிபார்க்கப்பட்ட பாதுகாப்பான புவி-முத்திரை',
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
    change: 'बदलें',
    today: 'आज',
    tomorrow: 'कल',

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
    selectServiceCategory: 'सेवा श्रेणी चुनें',
    standardCoopRates: 'कौशल स्तर के अनुसार मानक सहकारी मजदूरी दरें',
    fromRate: 'शुरुआती दर',
    baseLaborLabel: 'मानक मजदूरी',
    taskAndMaterials: 'काम और सामग्री चयन',
    specifyRequirements: 'आवश्यकताएं बताएं और सामग्री कौन लाएगा चुनें',
    vehicleType: 'वाहन का प्रकार',
    twoWheelerBike: '2-पहिया (बाइक / स्कूटर)',
    fourWheelerCar: '4-पहिया (कार / एसयूवी)',
    punctureServiceType: 'पंचर सेवा का प्रकार',
    materialsReplacementParts: 'सामग्री और स्पेयर पार्ट्स',
    iWillProvideParts: 'सामान मैं दूंगा (केवल मजदूरी)',
    iWillProvidePartsDesc: 'पार्ट्स आप उपलब्ध कराएंगे। कारीगर केवल उपकरण लाएगा।',
    partnerProcuresParts: 'कारीगर सामान लेकर आएगा (मजदूरी + पार्ट्स)',
    partnerProcuresPartsDesc: 'कारीगर मानक कैटलॉग दर पर प्रमाणित पार्ट्स खरीद कर लाएगा।',
    partsFeeZero: '₹0 अतिरिक्त',
    specificRequirements: 'विशेष निर्देश / विवरण',
    addressLabel: 'सेवा का पता',
    scheduleDate: 'सेवा की तारीख',
    timeWindow: 'समय स्लॉट',
    bookingSummaryTitle: 'बुकिंग सारांश',
    inspectFareSummary: 'पारदर्शी किराया विवरण और कारीगर आवंटन जांचें',
    workforceModelLabel: 'कारीगर मॉडल',
    serviceCategoryLabel: 'सेवा श्रेणी',
    confirmAndDispatchPartner: 'पुष्टि करें और कारीगर बुलाएं',
    reviewBooking: 'बुकिंग की समीक्षा करें',

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
    noActiveBooking: 'कोई सक्रिय बुकिंग नहीं है',
    noActiveBookingDesc: 'वर्तमान में कोई सेवा प्रगति में नहीं है।',
    bookAService: 'सेवा बुक करें',
    partnerArrivedDestination: 'कारीगर आपके पते पर पहुंच गया है',
    actionRequired: 'कार्रवाई आवश्यक',
    sharePinToStart: 'काम शुरू करने के लिए यह पिन कारीगर को बताएं',
    activeServiceInProgress: 'सेवा प्रगति पर है',
    callPartner: 'कॉल करें',
    chatPartner: 'मैसेज भेजें',
    viewVerificationChecklist: 'सत्यापन चेकलिस्ट देखें',

    checkTheWork: 'काम जांचें और भुगतान रिलीज करें',
    beforeWork: 'काम से पहले',
    afterWork: 'काम के बाद',
    workLooksGoodPay: 'काम बढ़िया है — भुगतान करें',
    reportProblem: 'कोई समस्या है? शिकायत दर्ज करें',
    serviceSignOffTitle: 'सेवा सत्यापन व स्वीकृति',
    inspectCompletedWork: 'कृपया पूरे किए गए काम का निरीक्षण करें',
    taskExecutedSpec: 'निर्देशानुसार काम पूरा किया गया है',
    worksiteCleaned: 'कार्यस्थल को साफ-सुथरा कर दिया गया है',
    settlementAmount: 'भुगतान राशि',
    approveWorkReleasePayment: 'काम स्वीकार करें और भुगतान जारी करें',
    reportIncompleteService: 'अधूरे काम की रिपोर्ट करें',

    jobFinished: 'काम पूरा हुआ और भुगतान हो गया!',
    rateExperience: 'आपका अनुभव कैसा रहा?',
    tagPolite: '👍 विनम्र',
    tagOnTime: '⏱️ समय पर',
    tagClean: '🧹 साफ-सुथरा काम',
    addTipOptional: 'कारीगर के लिए टिप (वैकल्पिक)',
    tipGuarantee: '💚 आपकी 100% टिप सीधे कारीगर को मिलती है।',
    submitFeedback: 'रेटिंग सबमिट करें',
    paymentReleasedTitle: 'कारीगर को भुगतान जारी कर दिया गया',
    tipAddedNote: 'आपका अतिरिक्त बोनस कारीगर के वॉलेट में जोड़ दिया गया है।',
    backToHome: 'होम पर वापस जाएं',

    qualityGuaranteeTitle: '2 से 4 दिन की गुणवत्ता गारंटी',
    guaranteeActiveDays: '3 और दिनों के लिए सुरक्षित (दिन 2/4)',
    option1SameWorker: 'विकल्प 1: उसी कारीगर का निःशुल्क दौरा',
    option1Desc: 'वही कारीगर बिना किसी अतिरिक्त शुल्क के समस्या ठीक करेगा।',
    option2NewWorker: 'विकल्प 2: नया सीनियर कारीगर (55% छूट)',
    option2Desc: 'सब्सिडी वाली दर पर अन्य वरिष्ठ मास्टर कारीगर को भेजा जाएगा।',
    option3Refund: 'विकल्प 3: रिफंड और समाधान',
    option3Desc: 'सहकारी फंड से सीधे आपके वॉलेट में राशि वापस की जाएगी।',
    submitClaim: 'गारंटी क्लेम सबमिट करें',
    warrantyQueryModalTitle: 'सहकारी गारंटी समाधान',
    freeRevisitBtn: 'निःशुल्क दौरा मांगें (₹0)',
    subsidizedRebookBtn: 'सीनियर कारीगर बुक करें (55% छूट)',
    directRefundBtn: 'तुरंत एस्क्रो रिफंड',
    closeWarrantyModal: 'बंद करें',

    matchingCertifiedPro: 'प्रमाणित कारीगर का मिलान',
    auditingSafetyAvailability: 'सुरक्षा आवश्यकताओं और कारीगर की उपलब्धता की जांच',
    stepBookingRegistered: 'बुकिंग पंजीकृत',
    stepBookingRegisteredDetail: 'कार्य स्थानीय सहकारी रजिस्टर में दर्ज',
    stepSkillAudit: 'कौशल योग्यता ऑडिट',
    stepSkillAuditDetail: 'तकनीकी सुरक्षा आवश्यकताओं का वर्गीकरण',
    stepAccreditationTier: 'मान्यता स्तर निर्धारित',
    stepAccreditationTierDetail: 'अनिवार्य प्रमाणीकरण सत्यापित',
    stepPartnerAllocation: 'कारीगर आवंटन',
    stepPartnerAllocationDetail: 'निष्पक्ष रोटेशन द्वारा उपलब्ध कारीगर का चयन',

    partnerAssignedTitle: 'कारीगर आवंटित',
    partnerPreparingDispatch: 'आपके कारीगर प्रस्थान की तैयारी कर रहे हैं',
    verificationSafetySummary: 'सत्यापन एवं सुरक्षा सारांश',
    verifiedPartnerItem: 'सत्यापित कारीगर',
    verifiedPartnerItemDesc: 'सरकारी पहचान पत्र एवं पुलिस रिकॉर्ड सत्यापन पूर्ण',
    certifiedSkillItem: 'प्रमाणित तकनीकी कौशल',
    certifiedSkillItemDesc: 'सहकारी समिति द्वारा सत्यापित ट्रेड सर्टिफिकेशन',
    transparentDispatchItem: 'पारदर्शी आवंटन',
    transparentDispatchItemDesc: 'बिना भेदभाव के रोटेशन एल्गोरिदम द्वारा आवंटित',
    trackLiveBookingBtn: 'लाइव बुकिंग ट्रैक करें और पिन देखें',

    timelineBookingPlaced: 'बुकिंग दर्ज',
    timelineBookingPlacedDetail: 'सेवा अनुरोध सबमिट किया गया',
    timelinePartnerAssigned: 'कारीगर आवंटित',
    timelinePartnerAssignedDetail: 'सत्यापित कारीगर चुना गया',
    timelineBookingConfirmed: 'बुकिंग पुष्ट',
    timelineBookingConfirmedDetail: 'कारीगर आपके स्थान के लिए रवाना',
    timelinePartnerArrived: 'कारीगर पहुंचा (पिन सत्यापन)',
    timelinePartnerArrivedDetail: 'काम शुरू करने के लिए सत्यापन आवश्यक',
    timelineServiceInProgress: 'सेवा प्रगति पर',
    timelineServiceInProgressDetail: 'काम सक्रिय रूप से किया जा रहा है',
    timelineServiceCompleted: 'काम पूरा हुआ',
    timelineServiceCompletedDetail: 'कारीगर ने अंतिम साइन-ऑफ सबमिट किया',
    timelinePaymentReleased: 'भुगतान जारी',
    timelinePaymentReleasedDetail: 'गुणवत्ता सत्यापित और भुगतान निपटाया गया',
    tierBasic: 'बुनियादी (स्तर 1)',
    tierSkilled: 'कुशल (स्तर 2)',
    tierSpecialized: 'विशेषज्ञ (स्तर 3)',

    workerHub: 'कोयंबटूर हब',
    onlineStatus: 'ऑनलाइन',
    offlineStatus: 'ऑफ़लाइन',
    todaysPayout: 'आज की कमाई',
    ratingLabel: 'रेटिंग',
    completedJobsLabel: 'पूरे कार्य',
    activeAssignment: 'सक्रिय असाइनमेंट',
    continueActiveAssignment: 'आगे बढ़ें →',
    availableDispatchRequests: 'उपलब्ध प्रेषण अनुरोध',
    roundRobinQueue: 'निष्पक्ष राउंड-रॉबिन कतार',
    acceptDispatchBtn: 'काम स्वीकार करें',
    declineDispatchBtn: 'अस्वीकार',
    navigatingToCustomer: 'ग्राहक के स्थान पर नेविगेट कर रहे हैं',
    arrivedAtCustomerSite: 'मैं स्थान पर पहुंच गया हूं',
    enterStartPin: 'ग्राहक का 4-अंकों का स्टार्ट पिन दर्ज करें',
    verifyPinAndStart: 'पिन सत्यापित करें और काम शुरू करें',
    requestTimeExtension: '30 मिनट अतिरिक्त समय मांगें',
    captureBeforePhoto: 'काम से पहले की फोटो लें',
    captureAfterPhoto: 'काम के बाद की फोटो लें',
    markTaskComplete: 'ग्राहक समीक्षा के लिए सबमिट करें',
    payoutSummary: 'दैनिक आय विवरण',
    zeroCommissionKeep100: '0% कमीशन — आपकी मेहनत की 100% कमाई आपकी।',

    customerProfileTitle: 'उपयोगकर्ता प्रोफ़ाइल और सेटिंग्स',
    accountSettings: 'खाता सेटिंग्स',
    cooperativeId: 'सहकारी सदस्य आईडी',
    languageSelection: 'भाषा / மொழி / Language',
    emergencySos: 'आपातकालीन सहायता हेल्पलाइन (24x7)',
    activityHistoryTitle: 'गतिविधि और बुकिंग इतिहास',
    noPastBookingsYet: 'अभी तक कोई पुराना रिकॉर्ड नहीं है।',
    viewReceipt: 'पूरा चालान देखें',

    cooperativeGovernance: 'सहकारी शासन और निष्पक्ष आवंटन',
    activePartnersMetric: 'सक्रिय प्रमाणित कारीगर',
    totalEscrowHeldMetric: 'सुरक्षित एस्क्रो राशि',
    fairRotationRate: 'निष्पक्ष रोटेशन अनुपालन',
    zeroCommissionSaved: 'कमीशन न कटने से बचत',
    liveAuditLog: 'लाइव आवंटन स्ट्रीम',

    // Masked Phone Calling (Rapido style)
    maskedCallTitle: 'सुरक्षित नकाबपोश (मास्क्ड) कॉल',
    maskedCallSubtitle: 'WorkEasy एन्क्रिप्टेड रिले (रैपिडो स्टाइल)',
    maskedCallPrivacyNote: 'आपका असली फोन नंबर 100% गोपनीय रहता है। सुरक्षा और गोपनीयता के लिए कॉल सुरक्षित वर्चुअल प्रॉक्सी के माध्यम से कनेक्ट किए जाते हैं।',
    maskedCallConnecting: 'सुरक्षित प्रॉक्सी से कनेक्ट हो रहा है...',
    maskedCallVirtualNumber: 'वर्चुअल रिले लाइन',
    maskedCallStartBtn: 'वर्चुअल नंबर से कॉल करें',
    maskedCallClose: 'रद्द करें',
    maskedCallSafetyBadge: 'निजी और सुरक्षित',
    virtualLine: 'मास्क्ड वर्चुअल लाइन',

    // Geo-verification & Live Camera
    geoVerifiedDoorstep: 'ग्राहक का स्थान सत्यापित',
    geoDistanceMeters: 'ग्राहक से दूरी',
    geoFencePassed: 'जियो-फेंस सत्यापित (कार्यस्थल पर)',
    geoFenceFailed: 'जियो-फेंस विफल (स्थान से बाहर)',
    geoFenceAlertOffsite: 'यह कार्य करने के लिए आपको ग्राहक के पते के 100 मीटर के भीतर उपस्थित होना अनिवार्य है।',
    cameraLiveOnlyNote: 'केवल लाइव कैमरा फोटो अनिवार्य',
    galleryDisabledNote: 'धोखाधड़ी रोकने के लिए गैलरी फोटो अपलोड बंद है। केवल कार्यस्थल पर लाइव फोटो लें।',
    takeLivePhotoBtn: 'लाइव फोटो खींचें (साइट पर)',
    retakePhotoBtn: 'दोबारा फोटो लें',
    photoGeoStamped: 'जियो-स्टैम्प और वाटरमार्क सत्यापित',
    pinGeoVerified: 'आगमन पिन और स्थान सत्यापित',
    pinGeoFailed: 'स्थान गलत: ग्राहक के पते से दूर होने पर पिन सत्यापित नहीं किया जा सकता',
    testSimulateOnsite: 'साइट पर स्थिति (14 मी)',
    testSimulateOffsite: 'साइट से बाहर स्थिति (2.4 किमी)',
    watermarkVerified: 'छेड़छाड़-मुक्त जियो सत्यापन',
  },
};

export const getTranslation = (lang: Language, key: keyof Translations): string => {
  const dict = translations[lang] || translations.en;
  return dict[key] || translations.en[key] || (key as string);
};
