/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'hi';

export interface Translations {
  // Document and Metadata
  documentTitle: string;
  appName: string;
  appWordmark: string;
  tagline: string;

  // Header & Navigation
  navHome: string;
  navRespond: string;
  navPreserve: string;
  navReport: string;
  navTrack: string;
  navHelp: string;
  navPrivacy: string;
  mainNavAria: string;
  switchToEnglish: string;
  switchToHindi: string;

  // Quick Exit
  quickExit: string;
  quickExitShort: string;
  quickExitNotice: string;
  quickExitDetails: string;
  quickExitModalTitle: string;
  quickExitModalBody: string;
  quickExitKeyboardTitle: string;
  quickExitKeyboardText: string;
  quickExitModalAction: string;
  quickExitCancel: string;
  quickExitEscHint: string;
  close: string;

  // Emergency Footer
  emergencyDisclaimer: string;
  officialPortalLink: string;
  helpline112Title: string;
  helpline112Desc: string;
  helpline181Title: string;
  helpline181Desc: string;
  helpline1930Title: string;
  helpline1930Desc: string;
  footerIsolationTitle: string;
  footerIsolationText: string;
  footerZeroTrackers: string;
  footerDisclaimerText: string;

  // Home Page
  heroBadge: string;
  heroBadgeNoUploads: string;
  heroBadgeShaOnly: string;
  heroTitle: string;
  heroSubtitle: string;
  homeSafetyNoticeTitle: string;
  homeSafetyNoticeText: string;
  homeFourStepsTitle: string;
  homeFourStepsSubtitle: string;
  modeRespondTitle: string;
  modeRespondSubtitle: string;
  modeRespondDesc: string;
  modeRespondTag: string;
  modePreserveTitle: string;
  modePreserveSubtitle: string;
  modePreserveDesc: string;
  modePreserveTag: string;
  modeReportTitle: string;
  modeReportSubtitle: string;
  modeReportDesc: string;
  modeReportTag: string;
  modeTrackTitle: string;
  modeTrackSubtitle: string;
  modeTrackDesc: string;
  modeTrackTag: string;
  openMode: string;
  previewTag: string;
  helpCardTitle: string;
  helpCardDesc: string;
  privacyCardTitle: string;
  privacyCardDesc: string;
  learnMore: string;
  homePrivacyStandardTitle: string;
  homePrivacyStandard1Title: string;
  homePrivacyStandard1Desc: string;
  homePrivacyStandard2Title: string;
  homePrivacyStandard2Desc: string;
  homePrivacyStandard3Title: string;
  homePrivacyStandard3Desc: string;

  // Common UI Actions
  backToHome: string;
  stepBack: string;
  stepNext: string;
  stepSkip: string;
  continueBtn: string;
  resetAll: string;
  completed: string;
  progressText: string;
  externalLinkText: string;

  // Mode Placeholder Shells (Preserve, Report, Track)
  comingSoonTitle: string;
  comingSoonBadge: string;
  comingSoonNotice: string;
  zeroNetworkNotice: string;
  moduleScopeTitle: string;
  plannedFeaturesTitle: string;
  applicableLawTitle: string;
  hermeticPrivacyTitle: string;
  hermeticPrivacyDesc: string;
  modePreserveFeature1Title: string;
  modePreserveFeature1Desc: string;
  modePreserveFeature2Title: string;
  modePreserveFeature2Desc: string;
  modePreserveFeature3Title: string;
  modePreserveFeature3Desc: string;
  modePreserveLegal: string;
  modeReportFeature1Title: string;
  modeReportFeature1Desc: string;
  modeReportFeature2Title: string;
  modeReportFeature2Desc: string;
  modeReportFeature3Title: string;
  modeReportFeature3Desc: string;
  modeReportLegal: string;
  modeTrackFeature1Title: string;
  modeTrackFeature1Desc: string;
  modeTrackFeature2Title: string;
  modeTrackFeature2Desc: string;
  modeTrackFeature3Title: string;
  modeTrackFeature3Desc: string;
  modeTrackLegal: string;

  // Respond Mode (Triage & Playbook Flow)
  respondFlowBadge: string;
  respondFlowTitle: string;
  respondFlowSubtitle: string;
  respondStep1Title: string;
  respondStep1Subtitle: string;
  respondStep1SelectionNote: string;
  respondStep2Title: string;
  respondStep2Subtitle: string;
  dangerAlertHeading: string;
  dangerAlertBody: string;
  dangerCall112Btn: string;
  dangerProceedSafeBtn: string;
  dangerRecheckYesBtn: string;
  dangerRecheckNoBtn: string;
  respondStep3Title: string;
  respondStep3Subtitle: string;
  respondStep4Title: string;
  respondStep4Subtitle: string;
  doNowTab: string;
  doNotDoTab: string;
  whenReadyTab: string;
  platformLockdownTitle: string;
  checklistProgressTitle: string;
  checklistAllDone: string;
  changeCategoryBtn: string;
  continueToPreserve: string;
  continueToReport: string;
  continueToTrack: string;
  helplinesAlwaysAvailable: string;

  // Privacy Page
  privacyBadge: string;
  privacyTitle: string;
  privacySubtitle: string;
  privacyStaysDeviceTitle: string;
  privacyStaysDeviceSubtitle: string;
  privacyStaysDeviceDesc: string;
  privacyDeviceCard1Title: string;
  privacyDeviceCard1Desc: string;
  privacyDeviceCard2Title: string;
  privacyDeviceCard2Desc: string;
  privacyDeviceCard3Title: string;
  privacyDeviceCard3Desc: string;
  privacyCryptoTitle: string;
  privacyCryptoSubtitle: string;
  privacyCryptoDesc: string;
  privacyWhatProvesTitle: string;
  privacyWhatDoesNotProveTitle: string;
  privacyProves1Title: string;
  privacyProves1Desc: string;
  privacyProves2Title: string;
  privacyProves2Desc: string;
  privacyProves3Title: string;
  privacyProves3Desc: string;
  privacyNotProves1Title: string;
  privacyNotProves1Desc: string;
  privacyNotProves2Title: string;
  privacyNotProves2Desc: string;
  privacyNotProves3Title: string;
  privacyNotProves3Desc: string;
  privacyNotProves4Title: string;
  privacyNotProves4Desc: string;
  privacyPrinciplesHeading: string;
  privacyPrinciplesSubheading: string;
  privacyCodeVerificationTitle: string;
  privacyCodeVerificationDesc: string;

  // Help Page
  helpBadge: string;
  helpTitle: string;
  helpSubtitle: string;
  helpVerificationNotice: string;
  helpDirectHelplinesTitle: string;
  helpOfficialPortalsTitle: string;
  helpPortalNcrpTitle: string;
  helpPortalNcrpDesc: string;
  helpPortalNcwTitle: string;
  helpPortalNcwDesc: string;
  helpLegalRightsTitle: string;
  helpLegalRightsSubtitle: string;
  helpRight1Title: string;
  helpRight1Statute: string;
  helpRight1Body: string;
  helpRight2Title: string;
  helpRight2Statute: string;
  helpRight2Body: string;
  helpRight3Title: string;
  helpRight3Statute: string;
  helpRight3Body: string;
  helpRight4Title: string;
  helpRight4Statute: string;
  helpRight4Body: string;
  helpChecklistTitle: string;
  helpChecklist1: string;
  helpChecklist2: string;
  helpChecklist3: string;

  // Preserve & Verify Mode
  preserveTabHash: string;
  preserveTabVerify: string;
  preserveHeaderBadge: string;
  preserveTitle: string;
  preserveSubtitle: string;
  preserveDropTitle: string;
  preserveDropSubtitle: string;
  preserveDropFormats: string;
  preserveSampleBtn: string;
  preserveMemoryNotice: string;
  preserveFileSizeError: string;
  preserveFileReadError: string;
  preserveHashingInProgress: string;
  preserveItemsCount: string;
  preserveFileNameLabel: string;
  preserveExcludeFileName: string;
  preserveOriginalCapturedLabel: string;
  preserveOriginalCapturedHelper: string;
  preserveFileLastModifiedLabel: string;
  preserveFileLastModifiedNote: string;
  preserveSourceTypeLabel: string;
  preserveSourceTypeScreenshot: string;
  preserveSourceTypeChat: string;
  preserveSourceTypeWeb: string;
  preserveSourceTypeOther: string;
  preserveSourceRefLabel: string;
  preserveExcludeSourceRef: string;
  preserveNoteLabel: string;
  preserveIncludeNote: string;
  preserveRemoveItem: string;
  preserveShowPreview: string;
  preserveHidePreview: string;
  preserveClickToUnblur: string;
  preservePreviewNotice: string;
  preserveExportTitle: string;
  preserveExportDesc: string;
  preserveDownloadJsonBtn: string;
  preservePrintPdfBtn: string;
  preserveCopiedToast: string;
  preserveCopyHash: string;
  preserveManifestLimitationsTitle: string;
  preserveManifestLimitationsText: string;
  preserveUnsavedLeaveWarning: string;
  verifyTitle: string;
  verifySubtitle: string;
  verifyMethodCurrent: string;
  verifyMethodImport: string;
  verifySelectCurrentItem: string;
  verifyImportManifestBtn: string;
  verifyDropTargetFile: string;
  verifyCheckingIntegrity: string;
  verifyMatchTitle: string;
  verifyMatchDesc: string;
  verifyMismatchTitle: string;
  verifyMismatchDesc: string;
  verifyInvalidManifest: string;
  verifyPrivacyLink: string;
  preserveSha256FingerprintLabel: string;
  preserveHashedTimestampLabel: string;
  preserveIncidentRefLabel: string;
  preserveIncidentRefPlaceholder: string;
  verifyExpectedLabel: string;
  verifyComputedLabel: string;
  verifyTargetRefLabel: string;
  verifySelectedFileLabel: string;
  verifySelectFileBtn: string;
  verifyNoSessionItems: string;
  verifyLoadedManifestNotice: string;
  guidanceCatGeneral: string;
  guidanceCatBlackmail: string;
  guidanceCatNcii: string;
  guidanceCatImpersonation: string;
  guidanceCatStalking: string;
  reportHeaderBadge: string;
  reportTitle: string;
  reportSubtitle: string;
  reportStep1Badge: string;
  reportStep1Title: string;
  reportStep1Desc: string;
  reportDocTypePolice: string;
  reportDocTypePoliceDesc: string;
  reportDocTypeTakedown: string;
  reportDocTypeTakedownDesc: string;
  reportDocLangLabel: string;
  reportDocLangEn: string;
  reportDocLangHi: string;
  reportStep2Badge: string;
  reportStep2Title: string;
  reportStep2Desc: string;
  reportComplainantNotice: string;
  reportNameLabel: string;
  reportNamePlaceholder: string;
  reportContactLabel: string;
  reportContactPlaceholder: string;
  reportLocationLabel: string;
  reportLocationPlaceholder: string;
  reportStep3Badge: string;
  reportStep3Title: string;
  reportStep3Desc: string;
  reportCategoryLabel: string;
  reportCategoryNotSure: string;
  reportDateTimeLabel: string;
  reportDateTimePlaceholder: string;
  reportDateTimeHelper: string;
  reportPlatformLabel: string;
  reportPlatformPlaceholder: string;
  reportSuspectLabel: string;
  reportSuspectPlaceholder: string;
  reportDescriptionLabel: string;
  reportDescriptionGuidance: string;
  reportDescriptionPlaceholder: string;
  reportIntimateLabel: string;
  reportIntimateYes: string;
  reportIntimateNo: string;
  reportIntimateNotSure: string;
  reportMoneyLabel: string;
  reportMoneyYes: string;
  reportMoneyNo: string;
  reportMoneyAmountLabel: string;
  reportMoneyAmountPlaceholder: string;
  reportStep4Badge: string;
  reportStep4Title: string;
  reportStep4Desc: string;
  reportAddTimelineRowBtn: string;
  reportTimelineDateHeader: string;
  reportTimelineEventHeader: string;
  reportTimelineActionHeader: string;
  reportTimelineRemoveRow: string;
  reportTimelineEmptyNotice: string;
  reportStep5Badge: string;
  reportStep5Title: string;
  reportStep5Desc: string;
  reportEvidenceAdvisoryNote: string;
  reportEvidenceSelectSession: string;
  reportEvidenceNoSessionItems: string;
  reportEvidenceImportManifestBtn: string;
  reportEvidenceSelectedCount: string;
  reportStep6Badge: string;
  reportStep6Title: string;
  reportStep6Desc: string;
  reportPlaceholderCountBadge: string;
  reportNoPlaceholdersLeft: string;
  reportRegenerateWarningTitle: string;
  reportRegenerateWarningDesc: string;
  reportRegenerateConfirmBtn: string;
  reportRegenerateCancelBtn: string;
  reportResetDraftBtn: string;
  reportProvisionsPanelTitle: string;
  reportProvisionsPanelDesc: string;
  reportProvisionsCheckboxLabel: string;
  reportProvisionsUnverifiedBadge: string;
  reportRedactionPanelTitle: string;
  reportRedactionPanelDesc: string;
  reportRedactionCustomWordLabel: string;
  reportRedactionCustomWordPlaceholder: string;
  reportRedactionAddWordBtn: string;
  reportRedactionWarningNotice: string;
  reportVersionFullTab: string;
  reportVersionRedactedTab: string;
  reportVersionFullDesc: string;
  reportVersionRedactedDesc: string;
  reportExportCopyBtn: string;
  reportExportTxtBtn: string;
  reportExportPdfBtn: string;
  reportCopiedToast: string;
  reportPlaceholderModalTitle: string;
  reportPlaceholderModalDesc: string;
  reportPlaceholderModalProceedBtn: string;
  reportPlaceholderModalReviewBtn: string;
  reportWhereToSubmitTitle: string;
  reportWhereToSubmitDesc: string;
  reportWhereToSubmitPortalLink: string;
  reportWhereToSubmitZeroFirLink: string;
  reportWhereToSubmitDisclaimer: string;

  // Track Mode (Phase 5)
  reportProceedToTrackBtn: string;
  trackModeBadge: string;
  trackModeTitle: string;
  trackModeSubtitle: string;
  trackModeScopeDesc: string;
  trackPrivacyBanner: string;
  trackZeroStorageNotice: string;
  trackAddRecordBtn: string;
  trackStartTimerBtn: string;
  trackSampleDataBtn: string;
  trackSampleDataLoadedToast: string;
  trackExportBtn: string;
  trackImportBtn: string;
  trackClearBtn: string;
  trackClearConfirmTitle: string;
  trackClearConfirmDesc: string;
  trackConfirmClearBtn: string;
  trackTimersSectionTitle: string;
  trackTimersSectionSubtitle: string;
  trackNoTimersNotice: string;
  trackTimerActiveBadge: string;
  trackTimerWarningBadge: string;
  trackTimerExpiredBadge: string;
  trackTimerCompletedBadge: string;
  trackTimerRemaining: string;
  trackTimerHours: string;
  trackTimerMinutes: string;
  trackTimerSeconds: string;
  trackTimerOverdueBy: string;
  trackTimerMarkResolvedBtn: string;
  trackTimerEscalateBtn: string;
  trackTimerDeleteBtn: string;
  trackAddTimerModalTitle: string;
  trackAddTimerSelectType: string;
  trackAddTimerPreset24h: string;
  trackAddTimerPreset24hNcii: string;
  trackAddTimerPreset24hAck: string;
  trackAddTimerPreset72h: string;
  trackAddTimerPreset72hRemoval: string;
  trackAddTimerPreset15d: string;
  trackAddTimerPresetCustom: string;
  trackTimerPersonalReminderNotice: string;
  trackTimerPlatformReceiptNotice: string;
  trackUnverifiedLegalBadge: string;
  generalLegalNotice: string;
  clearEverythingNow: string;
  clearEverythingModalTitle: string;
  clearEverythingModalBody: string;
  clearEverythingConfirmBtn: string;
  clearEverythingSuccessToast: string;
  demoRunBtn: string;
  demoBannerTitle: string;
  demoBannerDesc: string;
  demoExitBtn: string;
  tourStartBtn: string;
  tourModalTitle: string;
  tourStep1Title: string;
  tourStep1Desc: string;
  tourStep2Title: string;
  tourStep2Desc: string;
  tourStep3Title: string;
  tourStep3Desc: string;
  tourStep4Title: string;
  tourStep4Desc: string;
  tourStep5Title: string;
  tourStep5Desc: string;
  tourStep6Title: string;
  tourStep6Desc: string;
  tourNextBtn: string;
  tourPrevBtn: string;
  tourFinishBtn: string;
  tourSkipBtn: string;
  trackAddTimerLinkRecord: string;
  trackAddTimerNoRecordLink: string;
  trackAddTimerCustomHoursLabel: string;
  trackAddTimerCustomTitleLabel: string;
  trackAddTimerSubmitBtn: string;
  trackAddTimerCancelBtn: string;
  trackLedgerSectionTitle: string;
  trackLedgerSectionSubtitle: string;
  trackFilterAll: string;
  trackFilterSubmitted: string;
  trackFilterUnderInvestigation: string;
  trackFilterActionTaken: string;
  trackSearchPlaceholder: string;
  trackNoRecordsNotice: string;
  trackRefNumberLabel: string;
  trackSubmissionTypeLabel: string;
  trackSubmittedDateLabel: string;
  trackStatusLabel: string;
  trackOfficerLabel: string;
  trackContactLabel: string;
  trackNotesLabel: string;
  trackAddNoteBtn: string;
  trackAddNotePlaceholder: string;
  trackSaveNoteBtn: string;
  trackDeleteRecordBtn: string;
  trackEditRecordBtn: string;
  trackCopiedRefToast: string;
  trackStatusDrafted: string;
  trackStatusSubmitted: string;
  trackStatusAcknowledged: string;
  trackStatusUnderInvestigation: string;
  trackStatusContentRemoved: string;
  trackStatusEscalated: string;
  trackStatusClosed: string;
  trackAuthNcrp: string;
  trackAuthPolice: string;
  trackAuthPlatform: string;
  trackAuthNcw: string;
  trackAuthGac: string;
  trackAuthOther: string;
  trackRecordModalAddTitle: string;
  trackRecordModalEditTitle: string;
  trackRecordModalAuthorityLabel: string;
  trackRecordModalTitleLabel: string;
  trackRecordModalTitlePlaceholder: string;
  trackRecordModalRefLabel: string;
  trackRecordModalRefPlaceholder: string;
  trackRecordModalDateLabel: string;
  trackRecordModalStatusLabel: string;
  trackRecordModalOfficerLabel: string;
  trackRecordModalOfficerPlaceholder: string;
  trackRecordModalContactLabel: string;
  trackRecordModalContactPlaceholder: string;
  trackRecordModalCategoryLabel: string;
  trackRecordModalNotesLabel: string;
  trackRecordModalNotesPlaceholder: string;
  trackRecordModalSaveBtn: string;
  trackRecordModalCancelBtn: string;
  trackEscalationSectionTitle: string;
  trackEscalationSectionSubtitle: string;
  trackEscalationViewStepsBtn: string;
  trackEscalationCopyNoticeBtn: string;
  trackEscalationNoticeCopiedToast: string;
  trackEscalationCloseBtn: string;
  trackExportModalTitle: string;
  trackExportJsonBtn: string;
  trackExportJsonDesc: string;
  trackExportTxtBtn: string;
  trackExportTxtDesc: string;
  trackExportPdfBtn: string;
  trackExportPdfDesc: string;
  trackImportModalTitle: string;
  trackImportModalDesc: string;
  trackImportUploadBtn: string;
  trackImportSuccessToast: string;
  trackImportErrorToast: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    documentTitle: 'Kavach — Cyber-Abuse Response & Reporting Companion',
    appName: 'Kavach',
    appWordmark: 'Kavach',
    tagline: 'Cyber-Abuse Response & Reporting Companion for Women in India',

    navHome: 'Home',
    navRespond: 'Respond',
    navPreserve: 'Preserve',
    navReport: 'Draft Complaint',
    navTrack: 'Track Report',
    navHelp: 'Emergency Help',
    navPrivacy: 'Privacy & Cryptography',
    mainNavAria: 'Main Navigation',
    switchToEnglish: 'Switch interface language to English',
    switchToHindi: 'Switch interface language to Hindi',

    quickExit: 'Quick Exit (Esc)',
    quickExitShort: 'Exit (Esc)',
    quickExitNotice: 'Leaves page instantly. Cannot erase local browser history.',
    quickExitDetails: 'Quick Exit Security Details',
    quickExitModalTitle: 'Safety Alert: Quick Exit',
    quickExitModalBody:
      'Clicking Quick Exit immediately redirects this tab to Google Search to conceal this screen. However, web browsers retain visited URLs in your device history. For maximum safety, use Private/Incognito mode or manually clear history afterwards.',
    quickExitKeyboardTitle: 'Keyboard Safety Shortcut:',
    quickExitKeyboardText: 'Pressing the Escape key at any time immediately leaves this page and switches to Google.',
    quickExitModalAction: 'Leave Site Now',
    quickExitCancel: 'Return Safely',
    quickExitEscHint: 'Press Esc for Quick Exit',
    close: 'Close',

    emergencyDisclaimer: 'Emergency Helplines (Verify before use — Available 24x7 across India)',
    officialPortalLink: 'Visit National Cyber Crime Reporting Portal (cybercrime.gov.in)',
    helpline112Title: '112 — National Emergency',
    helpline112Desc: 'Police, medical, or imminent physical threat',
    helpline181Title: '181 — Women Helpline',
    helpline181Desc: 'Toll-free 24/7 counseling, shelter, and legal support',
    helpline1930Title: '1930 — Cybercrime Helpline',
    helpline1930Desc: 'Citizen financial and cyber abuse reporting helpline',
    footerIsolationTitle: 'Device Isolation Guarantee:',
    footerIsolationText:
      'Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host.',
    footerZeroTrackers: 'Zero trackers · No telemetry · No external logs',
    footerDisclaimerText: 'Kavach is an assistive legal and cyber-safety toolkit. It does not replace official police FIR filings or legal counsel.',

    heroBadge: 'Zero Data Retention',
    heroBadgeNoUploads: 'Zero Remote Uploads',
    heroBadgeShaOnly: 'Client-Side SHA-256 Only',
    heroTitle: 'Confidential Cyber-Abuse Response & Reporting Companion',
    heroSubtitle:
      'A calm, secure tool for women in India dealing with online harassment, non-consensual imagery, blackmail, or cyber-stalking. Your evidence stays on your device.',
    homeSafetyNoticeTitle: 'Your Safety First:',
    homeSafetyNoticeText:
      'Files and screenshots selected on Kavach remain strictly on your device. We do not store personal details, and we do not use tracking scripts. You can use this tool safely to prepare reports before visiting a police station or filing online.',
    homeFourStepsTitle: 'Four Steps of Action',
    homeFourStepsSubtitle: 'Select a mode to begin',
    modeRespondTitle: 'Respond',
    modeRespondSubtitle: 'First-Hour Safety Playbook',
    modeRespondDesc:
      'Classify the incident and follow immediate step-by-step containment instructions. Secure accounts, prevent escalation, and preserve emotional clarity without panic.',
    modeRespondTag: 'Immediate Crisis / First Hour',
    modePreserveTitle: 'Preserve Evidence',
    modePreserveSubtitle: 'Local Browser Manifest & Hashing',
    modePreserveDesc:
      'Generate verifiable SHA-256 cryptographic fingerprints of screenshots and chats locally. No media files or images are ever uploaded to any server or AI model.',
    modePreserveTag: 'Browser SHA-256 Hashing',
    modeReportTitle: 'Draft Complaint',
    modeReportSubtitle: 'Editable Hindi & English Legal Grievance',
    modeReportDesc:
      'Generate structured, ready-to-file complaint drafts tailored to Indian law (IT Act 2000 & BNS 2023) for cybercrime.gov.in or your local Cyber Police station.',
    modeReportTag: 'IT Act & BNS 2023 Formats',
    modeTrackTitle: 'Track Report',
    modeTrackSubtitle: 'Statutory Deadlines & Follow-ups',
    modeTrackDesc:
      'Monitor Rule 3(2)(b) statutory takedown deadlines (24-hour mandatory window for non-consensual imagery) and keep an offline log of submission acknowledgments.',
    modeTrackTag: '24-Hour Statutory Takedowns',
    openMode: 'Open Mode',
    previewTag: 'Foundation Preview',
    helpCardTitle: 'Emergency Help & Legal Rights in India',
    helpCardDesc:
      'Understanding police Zero-FIR rights in India, when to dial 112 vs 181 vs 1930, and official helplines.',
    privacyCardTitle: 'Client-Side Privacy & Cryptographic Verification',
    privacyCardDesc:
      'Clear breakdown of why files never upload, how local SHA-256 works, and what hashing does and does not prove.',
    learnMore: 'Learn More',
    homePrivacyStandardTitle: 'Kavach Privacy & Integrity Standard',
    homePrivacyStandard1Title: 'No Remote File Storage',
    homePrivacyStandard1Desc:
      'Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host.',
    homePrivacyStandard2Title: 'Cryptographic Fingerprinting',
    homePrivacyStandard2Desc: 'Local SHA-256 digests create an unforgeable record of evidence integrity.',
    homePrivacyStandard3Title: 'Zero Third-Party Telemetry',
    homePrivacyStandard3Desc: 'No advertising pixels, telemetry cookies, or behavioral trackers.',

    backToHome: 'Return to Home',
    stepBack: 'Back',
    stepNext: 'Next Step',
    stepSkip: 'Skip This Question',
    continueBtn: 'Continue',
    resetAll: 'Start Over',
    completed: 'Completed',
    progressText: 'Progress',
    externalLinkText: 'Open external link',

    comingSoonTitle: 'Module Architecture In Foundation Phase',
    comingSoonBadge: 'Phase 1 Shell Active',
    comingSoonNotice:
      'Foundation shell is active. Full interactive functionality is scheduled for implementation in upcoming modules.',
    zeroNetworkNotice: 'Zero network requests in this mode',
    moduleScopeTitle: 'Module Architecture & Scope',
    plannedFeaturesTitle: 'Specification & Technical Features',
    applicableLawTitle: 'Applicable Indian Legal Framework:',
    hermeticPrivacyTitle: 'Hermetic Privacy Guarantee:',
    hermeticPrivacyDesc:
      'When active, this module processes all data locally on your device using client-side Web Crypto and localStorage/memory.',
    modePreserveFeature1Title: '100% In-Browser Cryptographic Digestion',
    modePreserveFeature1Desc:
      "Uses the browser's native Web Crypto API (crypto.subtle.digest) to compute SHA-256 fingerprints. No images, videos, or documents are ever transmitted to any remote server.",
    modePreserveFeature2Title: 'Standardized Evidence Manifest Export',
    modePreserveFeature2Desc:
      'Generates a downloadable, tamper-evident JSON/PDF manifest containing cryptographic hashes, file metadata, capture timestamps, and contextual references.',
    modePreserveFeature3Title: 'Integrity vs. Authenticity Guidance',
    modePreserveFeature3Desc:
      'Provides clear legal guidance explaining that SHA-256 proves file integrity against modification, but does not substitute for 65B/63 certification under Indian evidence law.',
    modePreserveLegal:
      'Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 65B of the Indian Evidence Act, 1872) governs the admissibility of electronic records in Indian courts. Hashing ensures a transparent chain of digital custody.',
    modeReportFeature1Title: 'Bilingual Structured Complaint Drafting',
    modeReportFeature1Desc:
      'Generates formal grievance documents ready for submission to the National Cyber Crime Reporting Portal (cybercrime.gov.in) or local police stations.',
    modeReportFeature2Title: 'Statutory Section Mapping',
    modeReportFeature2Desc:
      'Automatically links incidents to Sections 66E, 67, 67A of the IT Act 2000, and Sections 77 (Voyeurism), 78 (Stalking), and 79 (Outraging modesty) of Bharatiya Nyaya Sanhita (BNS) 2023.',
    modeReportFeature3Title: 'Privacy-Preserving Redaction Tool',
    modeReportFeature3Desc:
      'Enables users to review and redact sensitive personal identifiers before copying or exporting the draft.',
    modeReportLegal:
      'Women have the statutory right under Indian law to lodge a "Zero-FIR" at any police station across India, regardless of where the cyber offence was committed or where the victim resides.',
    modeTrackFeature1Title: '24-Hour & 72-Hour Statutory Countdown Timers',
    modeTrackFeature1Desc:
      'Monitors the mandatory 24-hour intermediary takedown deadline for intimate imagery and the 72-hour window for general cyber grievances.',
    modeTrackFeature2Title: 'Private Local Acknowledgment Ledger',
    modeTrackFeature2Desc:
      'Securely records National Cyber Crime Portal (cybercrime.gov.in) acknowledgment tokens and police station diary numbers (GD/DD entries).',
    modeTrackFeature3Title: 'Escalation & Follow-Up Templates',
    modeTrackFeature3Desc:
      'Pre-formatted reminder notices addressed to Chief Grievance Officers and state Cyber Crime Cells when platforms fail to respond within legal deadlines.',
    modeTrackLegal:
      'Failure by social media intermediaries to take down non-consensual intimate imagery within 24 hours can strip them of "safe harbor" protection under Section 79 of the IT Act.',

    respondFlowBadge: 'Phase 2 Active',
    respondFlowTitle: 'First-Hour Safety & Containment Playbook',
    respondFlowSubtitle:
      'Calm, structured steps to protect your accounts, preserve evidence, and stop extortion without panicking.',
    respondStep1Title: 'Step 1: What is happening?',
    respondStep1Subtitle:
      'Select the category that best matches your situation. You can change this selection at any time. Categories are suggestions for guidance, not formal legal findings.',
    respondStep1SelectionNote: 'Selected category:',
    respondStep2Title: 'Step 2: Immediate Danger Check',
    respondStep2Subtitle: 'Let us check your physical safety first before taking digital steps.',
    dangerAlertHeading: 'Immediate Emergency Assistance',
    dangerAlertBody:
      'If you or someone near you is in immediate physical danger, please contact local emergency authorities right away. Your life and physical well-being come before all digital or social media issues.',
    dangerCall112Btn: 'Call 112 (Police Emergency)',
    dangerProceedSafeBtn: 'I am in a safe location — Proceed to digital plan',
    dangerRecheckYesBtn: 'Yes, I am in physical danger',
    dangerRecheckNoBtn: 'No, I am physically safe right now',
    respondStep3Title: 'Step 3: Quick Context Assessment',
    respondStep3Subtitle:
      'Answer up to 2 short questions to tailor your first-hour checklist. Every question is skippable. Never enter passwords or personal names.',
    respondStep4Title: 'Step 4: Your First-Hour Action Plan',
    respondStep4Subtitle:
      'Review your prioritized checklist below. Check off items as you complete them. Your answers and progress remain in your device memory only.',
    doNowTab: 'Do Now (Immediate Containment)',
    doNotDoTab: 'Do NOT Do (Protect Evidence)',
    whenReadyTab: 'When Ready (Reporting & Follow-up)',
    platformLockdownTitle: 'Platform Account Lockdown Guides',
    checklistProgressTitle: 'First-Hour Action Progress:',
    checklistAllDone: 'All high-priority containment steps completed!',
    changeCategoryBtn: 'Change Incident Category',
    continueToPreserve: 'Preserve Evidence (Local Hash)',
    continueToReport: 'Draft Formal Complaint',
    continueToTrack: 'Track Report Status',
    helplinesAlwaysAvailable: 'Emergency helplines are available 24x7 in the footer below.',

    privacyBadge: 'Privacy Constitution',
    privacyTitle: 'Client-Side Privacy & Cryptographic Verification',
    privacySubtitle:
      'Transparency first: exactly how Kavach safeguards your identity, what SHA-256 hashing proves, and what it does not prove.',
    privacyStaysDeviceTitle: 'What Stays on Your Device',
    privacyStaysDeviceSubtitle: 'Hermetic client-side execution',
    privacyStaysDeviceDesc:
      'Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host. Cryptographic hashing and complaint generation run locally in browser memory.',
    privacyDeviceCard1Title: 'Screenshots & Media',
    privacyDeviceCard1Desc:
      "Images and videos remain entirely in your browser's private memory. They are never sent over the network.",
    privacyDeviceCard2Title: 'Incident Narratives',
    privacyDeviceCard2Desc:
      'Complaint descriptions and chat excerpts are formatted locally. No AI API receives text without your explicit line-by-line approval.',
    privacyDeviceCard3Title: 'Personal Identity',
    privacyDeviceCard3Desc:
      'Your name, contact numbers, and addresses are never transmitted to any telemetry or database storage.',
    privacyCryptoTitle: 'Truth in Cryptography & Evidence Law',
    privacyCryptoSubtitle: 'Setting realistic legal expectations',
    privacyCryptoDesc:
      "Kavach computes a 256-bit Secure Hash Algorithm (SHA-256) digest directly in your web browser using the standard crypto.subtle.digest('SHA-256', arrayBuffer) API. It is vital to understand the precise legal and technical boundaries of what this hash represents.",
    privacyWhatProvesTitle: 'What Web Crypto SHA-256 Proves',
    privacyWhatDoesNotProveTitle: 'What Hashing Does NOT Prove',
    privacyProves1Title: 'Exact Bit-Level Integrity',
    privacyProves1Desc:
      'Proves mathematically that not a single pixel, character, or byte of the file has been altered or tampered with since the hash was generated.',
    privacyProves2Title: 'State at Point-in-Time',
    privacyProves2Desc:
      'Provides a verifiable cryptographic timestamp showing that this specific file existed in your possession at the time of manifest export.',
    privacyProves3Title: 'Zero Leakage Verification',
    privacyProves3Desc:
      'Can be shared with lawyers, cyber forensics officers, or court authorities to verify your files without exposing sensitive media to third parties.',
    privacyNotProves1Title: 'Does NOT Prove Authenticity or Authorship',
    privacyNotProves1Desc:
      'A hash cannot prove who created the image, who drafted the message, or whether an image was created using AI or Photoshop. It only proves file state.',
    privacyNotProves2Title: 'Does NOT Replace Section 65B / 63 BSA Certification',
    privacyNotProves2Desc:
      'Under Indian evidence law (Bharatiya Sakshya Adhiniyam 2023, Sec 63 / Indian Evidence Act Sec 65B), electronic records require a signed declaration regarding lawful device custody.',
    privacyNotProves3Title: 'Does NOT Automatically Submit a Police Complaint',
    privacyNotProves3Desc:
      'Computing a hash or exporting a manifest is a preparatory evidentiary step; it does not notify police or register an FIR until you formally file it.',
    privacyNotProves4Title: 'Does NOT Guarantee Absolute Anonymity',
    privacyNotProves4Desc:
      'While Kavach does not track you or record your IP, your internet service provider (ISP) and browser history retain traces of visited websites unless manually purged.',
    privacyPrinciplesHeading: 'The 8 Non-Negotiable Privacy Principles of Kavach',
    privacyPrinciplesSubheading: 'Documented in /docs/privacy-principles.md and enforced in every iteration.',
    privacyCodeVerificationTitle: 'Local Hashing Implementation Verification',
    privacyCodeVerificationDesc:
      'The code below demonstrates the exact browser-native cryptographic hashing implementation planned for Mode 02 (Preserve Evidence). No third-party network libraries or external APIs are invoked.',

    helpBadge: 'Official Resources',
    helpTitle: 'Emergency Help & Legal Rights in India',
    helpSubtitle:
      'Verified helplines, police zero-FIR rights, and support organizations for women facing online abuse in India.',
    helpVerificationNotice:
      'Helplines are maintained by respective state governments and Central Ministries. While 112, 181, and 1930 operate nationally, response routing depends on local telecom towers. Verify local operational hours for district-level cyber cells.',
    helpDirectHelplinesTitle: 'Direct Emergency Helplines',
    helpOfficialPortalsTitle: 'Official Government Reporting Portals',
    helpPortalNcrpTitle: 'National Cyber Crime Reporting Portal',
    helpPortalNcrpDesc:
      'Official Government of India portal for reporting cyber offences, with a specialized confidential channel for crimes against women.',
    helpPortalNcwTitle: 'National Commission for Women (NCW)',
    helpPortalNcwDesc:
      'Dedicated 24x7 helpline for women facing domestic and cyber violence. Online complaint registration available.',
    helpLegalRightsTitle: 'Your Statutory Rights Under Indian Law',
    helpLegalRightsSubtitle: 'Protections under IT Act 2000, BNSS 2023, and Intermediary Rules',
    helpRight1Title: 'Right to File a Zero-FIR',
    helpRight1Statute: 'Section 173 BNSS 2023 (formerly Section 154 CrPC)',
    helpRight1Body:
      'A police station CANNOT refuse to register an FIR on the grounds of territorial jurisdiction. If an offence against a woman is reported, police must record a "Zero-FIR" and subsequently transfer it to the relevant jurisdictional station.',
    helpRight2Title: 'Mandatory 24-Hour NCII Removal',
    helpRight2Statute: 'Rule 3(2)(b), IT (Intermediary Guidelines) Rules, 2021',
    helpRight2Body:
      'Social media intermediaries (Instagram, Meta, X, YouTube, Telegram) are legally mandated by Indian statutory rules to remove or disable access to non-consensual sexually explicit imagery within 24 hours of notification.',
    helpRight3Title: 'Statement Recorded by Woman Police Officer',
    helpRight3Statute: 'Section 26 & 164 CrPC / BNSS Equivalent',
    helpRight3Body:
      'When reporting crimes involving sexual harassment, voyeurism, or assault, a woman has the statutory right to have her statement recorded by a woman police officer or in the presence of a woman facilitator.',
    helpRight4Title: 'Confidentiality of Victim Identity',
    helpRight4Statute: 'Section 72 BNS 2023 (formerly Section 228A IPC)',
    helpRight4Body:
      'Disclosing the name or any matter which may reveal the identity of a victim of sexual offences without judicial authorization is a punishable criminal offence.',
    helpChecklistTitle: 'Practical Checklist Before Filing a Report',
    helpChecklist1:
      'Preserve Original Screenshots: Ensure screenshots include the complete browser address bar, profile handle, phone number, and system date/time.',
    helpChecklist2:
      'Do Not Alter Evidence Files: Do not crop, resize, or rename screenshots before generating hashes, as this modifies file bitstreams.',
    helpChecklist3:
      'Note Exact Profile URLs: Perpetrators frequently change display names; record the permanent profile URL or account ID.',

    preserveTabHash: 'Preserve & Hash Evidence',
    preserveTabVerify: 'Verify Evidence Integrity',
    preserveHeaderBadge: 'Mode 02 · In-Browser Forensic Hashing',
    preserveTitle: 'Evidence Preservation & Integrity Vault',
    preserveSubtitle:
      'Generate immutable SHA-256 cryptographic fingerprints of your screenshots and files. Everything is calculated locally on your device; files are never uploaded to any server or AI service.',
    preserveDropTitle: 'Drop evidence files here, or click to browse',
    preserveDropSubtitle: 'Supports screenshots, documents, audio, and videos up to 100 MB per file',
    preserveDropFormats: 'PNG, JPG, MP4, PDF, TXT, M4A, etc.',
    preserveSampleBtn: 'Try with a sample file',
    preserveMemoryNotice:
      'In-Memory Only: All files and calculated fingerprints exist only in this browser tab memory. If you refresh or close this tab, data is discarded. Export your manifest to keep a permanent record.',
    preserveFileSizeError: 'File exceeds the 100 MB limit. Please compress or clip long screen recordings locally before hashing.',
    preserveFileReadError: 'Unable to read file contents on this device. Please check permissions.',
    preserveHashingInProgress: 'Calculating SHA-256 cryptographic fingerprint in browser memory...',
    preserveItemsCount: 'Preserved Evidence Items',
    preserveFileNameLabel: 'File Name',
    preserveExcludeFileName: 'Exclude file name from exported manifest (redact)',
    preserveOriginalCapturedLabel: 'Original Capture Date & Time (Optional)',
    preserveOriginalCapturedHelper: 'When this incident took place or when you captured this evidence',
    preserveFileLastModifiedLabel: 'File System Last Modified',
    preserveFileLastModifiedNote: 'Unreliable: depends on local device clock and file transfer apps',
    preserveSourceTypeLabel: 'Source Channel',
    preserveSourceTypeScreenshot: 'Screenshot',
    preserveSourceTypeChat: 'Chat Export / Message',
    preserveSourceTypeWeb: 'Web Page / Post URL',
    preserveSourceTypeOther: 'Other Source',
    preserveSourceRefLabel: 'Source Reference (Account, Phone, or URL)',
    preserveExcludeSourceRef: 'Exclude source reference from export (redact)',
    preserveNoteLabel: 'Context / Private Note (Optional)',
    preserveIncludeNote: 'Include this note in the exported manifest',
    preserveRemoveItem: 'Remove Item',
    preserveShowPreview: 'Show Preview',
    preserveHidePreview: 'Hide Preview',
    preserveClickToUnblur: 'Sensitive Content: Click to view preview',
    preservePreviewNotice: 'Previews are generated in local memory and blurred by default for your comfort.',
    preserveExportTitle: 'Export Evidence Manifest',
    preserveExportDesc:
      'Download a structured JSON manifest containing the SHA-256 fingerprints, timestamps, and metadata, or print an evidentiary summary sheet for police or legal submission.',
    preserveDownloadJsonBtn: 'Download Manifest (JSON)',
    preservePrintPdfBtn: 'Print / Save as PDF',
    preserveCopiedToast: 'SHA-256 hash copied to clipboard',
    preserveCopyHash: 'Copy SHA-256 Hash',
    preserveManifestLimitationsTitle: 'Evidentiary Limitations & Notice',
    preserveManifestLimitationsText:
      'A cryptographic hash verifies that a specific file has not been altered since the moment of calculation. It does not prove the authenticity of the underlying content, the identity of the perpetrator, legal admissibility under Section 63 BSA / Section 65B IT Act, or that an official report has been filed.',
    preserveUnsavedLeaveWarning:
      'You have preserved evidence items in this tab that have not been exported. Leaving this page will permanently clear them from memory.',
    verifyTitle: 'Verify Evidence Integrity',
    verifySubtitle:
      'Compare an evidence file against a previously recorded SHA-256 fingerprint to verify whether its contents are intact and unmodified.',
    verifyMethodCurrent: 'Check Item from Current Session',
    verifyMethodImport: 'Import External Manifest (JSON)',
    verifySelectCurrentItem: 'Select preserved item to verify against:',
    verifyImportManifestBtn: 'Select JSON Manifest to Load',
    verifyDropTargetFile: 'Select or drop the file to verify against the fingerprint',
    verifyCheckingIntegrity: 'Reading file and calculating SHA-256 fingerprint...',
    verifyMatchTitle: 'Fingerprint Match: Unaltered Content',
    verifyMatchDesc:
      'This file’s contents match the recorded fingerprint. The exact sequence of bytes is identical to when the hash was originally calculated.',
    verifyMismatchTitle: 'Fingerprint Mismatch: Different Content',
    verifyMismatchDesc:
      'This file is different from the one that was recorded. Even a tiny change (such as cropping, re-saving, compression by WhatsApp, or editing) changes the SHA-256 fingerprint completely.',
    verifyInvalidManifest: 'Invalid manifest file. Please select a valid Kavach evidence JSON manifest.',
    verifyPrivacyLink: 'Read our Privacy & Cryptographic Principles',
    preserveSha256FingerprintLabel: 'SHA-256 Fingerprint',
    preserveHashedTimestampLabel: 'Hashed Timestamp (Local / UTC):',
    preserveIncidentRefLabel: 'Incident Reference / Title (Optional)',
    preserveIncidentRefPlaceholder: 'e.g. NCRP Complaint Prep / Police Visit',
    verifyExpectedLabel: 'Expected:',
    verifyComputedLabel: 'Computed for selected file:',
    verifyTargetRefLabel: 'Target Reference Fingerprint',
    verifySelectedFileLabel: 'Selected file:',
    verifySelectFileBtn: 'Select File to Verify',
    verifyNoSessionItems: 'No items preserved in current session. Please preserve files first or import a JSON manifest.',
    verifyLoadedManifestNotice: 'Loaded manifest with {count} entries.',
    guidanceCatGeneral: 'General Forensic Capture',
    guidanceCatBlackmail: 'Blackmail / Extortion',
    guidanceCatNcii: 'Intimate Image Threat',
    guidanceCatImpersonation: 'Fake Profile / Impersonation',
    guidanceCatStalking: 'Cyber-Stalking / Harassment',
    reportHeaderBadge: 'Mode 03 · Incident Complaint Drafter',
    reportTitle: 'Complaint & Takedown Request Drafter',
    reportSubtitle:
      'Draft a formal, structured complaint for the police (cybercrime.gov.in) or an urgent platform takedown notice. All processing is deterministic and private on your device. Kavach never submits complaints for you.',
    reportStep1Badge: 'Step 1 of 6 · Document Type',
    reportStep1Title: 'Select Document Type & Drafting Language',
    reportStep1Desc: 'Choose whether you are preparing an official police complaint or an urgent platform grievance notice.',
    reportDocTypePolice: 'Police / Cybercrime Complaint',
    reportDocTypePoliceDesc: 'Formal complaint for National Cyber Crime Reporting Portal (cybercrime.gov.in) or any local police station (Zero FIR).',
    reportDocTypeTakedown: 'Platform Takedown Request',
    reportDocTypeTakedownDesc: 'Urgent notice sent directly to the social media platform resident grievance officer requesting content removal.',
    reportDocLangLabel: 'Draft Output Language:',
    reportDocLangEn: 'English',
    reportDocLangHi: 'Hindi',
    reportStep2Badge: 'Step 2 of 6 · Complainant Details',
    reportStep2Title: 'About the Complainant (Optional)',
    reportStep2Desc: 'Enter your details if you want them in the draft, or leave them blank to fill in by hand later. Nothing is saved or sent.',
    reportComplainantNotice: 'You can leave this blank and fill it in by hand later. Nothing is saved or sent.',
    reportNameLabel: 'Your Full Name (Optional)',
    reportNamePlaceholder: 'Leave blank or enter name',
    reportContactLabel: 'Phone Number / Email Address (Optional)',
    reportContactPlaceholder: 'Phone number or email address',
    reportLocationLabel: 'City, State, or Local Police Station (Optional)',
    reportLocationPlaceholder: 'City or police jurisdiction',
    reportStep3Badge: 'Step 3 of 6 · Incident Details',
    reportStep3Title: 'What Happened & Who Was Involved',
    reportStep3Desc: 'Provide factual context. Missing details will become placeholders you can fill in later.',
    reportCategoryLabel: 'Incident Category',
    reportCategoryNotSure: 'I am not sure / Multiple Categories',
    reportDateTimeLabel: 'Approximate Date & Time',
    reportDateTimePlaceholder: 'e.g. Last night around 9 PM, or between 15-20 October',
    reportDateTimeHelper: 'Free text — describe in your own words when this took place.',
    reportPlatformLabel: 'Platform or Communication Channel',
    reportPlatformPlaceholder: 'e.g. WhatsApp, Instagram, Telegram, SMS, Email',
    reportSuspectLabel: 'Suspect Identifiers (Handle, URL, Phone, or UPI ID)',
    reportSuspectPlaceholder: 'e.g. Profile link, username, phone, or payment handle',
    reportDescriptionLabel: 'Description of the Incident (In Your Own Words)',
    reportDescriptionGuidance: 'Describe what was said or done. You do not need to describe any intimate image in detail. Refer to it by its evidence number instead.',
    reportDescriptionPlaceholder: 'State what happened clearly in your own words...',
    reportIntimateLabel: 'Was intimate or sexually explicit content shared, threatened, or edited?',
    reportIntimateYes: 'Yes — Intimate/sexual content was involved',
    reportIntimateNo: 'No — Intimate content was not involved',
    reportIntimateNotSure: 'Not Sure / Uncertain',
    reportMoneyLabel: 'Was money demanded or paid (extortion)?',
    reportMoneyYes: 'Yes — Money was demanded or paid',
    reportMoneyNo: 'No — No financial demand',
    reportMoneyAmountLabel: 'Amount Demanded or Paid (Optional)',
    reportMoneyAmountPlaceholder: 'e.g. Amount demanded',
    reportStep4Badge: 'Step 4 of 6 · Incident Timeline',
    reportStep4Title: 'Chronological Timeline of Events',
    reportStep4Desc: 'Build a chronological sequence of events. Having dates and times helps the investigating officer track the sequence.',
    reportAddTimelineRowBtn: 'Add Timeline Event',
    reportTimelineDateHeader: 'Date / Time',
    reportTimelineEventHeader: 'What Happened',
    reportTimelineActionHeader: 'Action',
    reportTimelineRemoveRow: 'Remove',
    reportTimelineEmptyNotice: 'No timeline events added yet. Click "Add Timeline Event" or proceed to include the overall approximate date.',
    reportStep5Badge: 'Step 5 of 6 · Evidence Records',
    reportStep5Title: 'Attach Evidence Fingerprints',
    reportStep5Desc: 'Include cryptographic fingerprints from your preserved evidence. Files are never uploaded; only SHA-256 hashes are listed in the draft.',
    reportEvidenceAdvisoryNote: 'Keep your original files safe. Hand them over only to the investigating officer or official channel, never by uploading them here.',
    reportEvidenceSelectSession: 'Select items preserved in current session:',
    reportEvidenceNoSessionItems: 'No items found in active session. You can import an exported Kavach manifest JSON, or preserve files in Mode 02.',
    reportEvidenceImportManifestBtn: 'Import Kavach Manifest (JSON)',
    reportEvidenceSelectedCount: 'Evidence items included in draft',
    reportStep6Badge: 'Step 6 of 6 · Review, Redact & Export',
    reportStep6Title: 'Review Draft, Redact Sensitive Data & Export',
    reportStep6Desc: 'Review your complete draft, verify legal suggestions, inspect redactions, and export the official or redacted copy.',
    reportPlaceholderCountBadge: '{count} placeholders still to fill',
    reportNoPlaceholdersLeft: 'All placeholders filled! Ready for review.',
    reportRegenerateWarningTitle: 'Overwrite Custom Edits?',
    reportRegenerateWarningDesc: 'You have made manual edits to the draft text. Regenerating will replace your custom edits with the template output. Are you sure you want to proceed?',
    reportRegenerateConfirmBtn: 'Yes, Regenerate Draft',
    reportRegenerateCancelBtn: 'Keep My Edits',
    reportResetDraftBtn: 'Regenerate Draft from Form Data',
    reportProvisionsPanelTitle: 'Provisions you can ask the police or a lawyer about',
    reportProvisionsPanelDesc: 'These are suggestions for a qualified person to verify. This is not legal advice.',
    reportProvisionsCheckboxLabel: 'Include suggested provisions in my draft',
    reportProvisionsUnverifiedBadge: 'Not yet verified by a legal professional',
    reportRedactionPanelTitle: 'Client-Side Redaction & Output Versions',
    reportRedactionPanelDesc: 'Choose what to conceal when sharing with trusted helpers. Official police submissions should keep suspect handles and URLs.',
    reportRedactionCustomWordLabel: 'Add words or names to hide (e.g. school name, colleague):',
    reportRedactionCustomWordPlaceholder: 'Enter word and click Add',
    reportRedactionAddWordBtn: 'Add Word',
    reportRedactionWarningNotice: 'Automatic redaction cannot catch everything. Read the text yourself before sharing. A school name, a nickname, or a unique username can still identify you.',
    reportVersionFullTab: 'Official Full Version (For Police / Grievance Officer)',
    reportVersionRedactedTab: 'Redacted Copy (For Trusted Helpers / Advocates)',
    reportVersionFullDesc: 'Contains all details including perpetrator handles, URLs, and payment IDs for official investigation.',
    reportVersionRedactedDesc: 'Replaces selected personal details with [REDACTED] to protect your identity when seeking peer support.',
    reportExportCopyBtn: 'Copy to Clipboard',
    reportExportTxtBtn: 'Download Text (.txt)',
    reportExportPdfBtn: 'Print / Save as PDF',
    reportCopiedToast: 'Draft copied to clipboard!',
    reportPlaceholderModalTitle: 'Unresolved Placeholders in Draft',
    reportPlaceholderModalDesc: 'Your draft still contains unresolved bracketed placeholders (such as {placeholders}). You can export now and write them by hand, or return to edit.',
    reportPlaceholderModalProceedBtn: 'Proceed with Export Anyway',
    reportPlaceholderModalReviewBtn: 'Return and Edit Draft',
    reportWhereToSubmitTitle: 'Where and How to Submit Your Complaint',
    reportWhereToSubmitDesc: 'Kavach does not submit complaints. You submit this yourself through an official channel.',
    reportWhereToSubmitPortalLink: 'Submit online at National Cyber Crime Reporting Portal (cybercrime.gov.in)',
    reportWhereToSubmitZeroFirLink: 'Learn about your Zero FIR rights at any local police station',
    reportWhereToSubmitDisclaimer: 'Kavach is a client-side assistive drafting companion. It does not file complaints, issue police FIRs, or provide legal representation.',

    // Track Mode (Phase 5)
    reportProceedToTrackBtn: 'Track This Complaint in Tracker',
    trackModeBadge: 'MODE 04 / TRACK',
    trackModeTitle: 'Complaint & Deadline Tracker',
    trackModeSubtitle: 'Record report submissions, monitor statutory deadlines, and follow up safely',
    trackModeScopeDesc: 'Track complaints filed on cybercrime.gov.in, police stations (FIR / Zero FIR), or platforms. Monitor mandatory 24-hour and 72-hour statutory removal windows.',
    trackPrivacyBanner: 'In-Memory Tab Privacy: All tracking numbers, dates, and notes exist only in your current browser session. Nothing is ever sent to any server or saved to your device automatically.',
    trackZeroStorageNotice: 'Zero storage retention. Export your encrypted ledger or summary sheet before closing this window.',
    trackAddRecordBtn: 'Add Complaint Record',
    trackStartTimerBtn: 'Start Statutory Timer',
    trackSampleDataBtn: 'Try with Sample Record',
    trackSampleDataLoadedToast: 'Loaded synthetic demo tracking records and statutory timers!',
    trackExportBtn: 'Export Ledger',
    trackImportBtn: 'Import Ledger',
    trackClearBtn: 'Clear Ledger',
    trackClearConfirmTitle: 'Clear All Tracking Records in Memory?',
    trackClearConfirmDesc: 'This will delete all tracking records and countdown timers held in memory. If you have not exported your ledger, this data will be lost.',
    trackConfirmClearBtn: 'Yes, Clear All',
    trackTimersSectionTitle: 'Statutory Countdown Timers',
    trackTimersSectionSubtitle: 'Track compliance reminder windows under the IT Rules 2021',
    trackNoTimersNotice: 'No active countdown timers. Start a 24-hour NCII removal timer or grievance acknowledgment timer to track reminders.',
    trackTimerActiveBadge: 'Active Countdown',
    trackTimerWarningBadge: 'Deadline Approaching (< 4h)',
    trackTimerExpiredBadge: 'Statutory Window Expired — Time to Escalate',
    trackTimerCompletedBadge: 'Completed / Action Taken',
    trackTimerRemaining: 'Remaining',
    trackTimerHours: 'h',
    trackTimerMinutes: 'm',
    trackTimerSeconds: 's',
    trackTimerOverdueBy: 'Overdue by',
    trackTimerMarkResolvedBtn: 'Mark Completed',
    trackTimerEscalateBtn: 'View Escalation Steps',
    trackTimerDeleteBtn: 'Delete Timer',
    trackAddTimerModalTitle: 'Start Statutory Countdown Timer',
    trackAddTimerSelectType: 'Select statutory timer preset:',
    trackAddTimerPreset24h: '24-Hour NCII Removal Window (Rule 3(2)(b))',
    trackAddTimerPreset24hNcii: '24-Hour NCII Removal Window (Rule 3(2)(b))',
    trackAddTimerPreset24hAck: '24-Hour Grievance Acknowledgment (Rule 3(2)(a))',
    trackAddTimerPreset72h: '72-Hour Removal Request Window (Other Content)',
    trackAddTimerPreset72hRemoval: '72-Hour Removal Request Window (Other Content)',
    trackAddTimerPreset15d: '15-Day Grievance Resolution Window (Rule 3(2)(a))',
    trackAddTimerPresetCustom: 'Custom Reminder Duration',
    trackTimerPersonalReminderNotice: 'A Kavach timer is a personal reminder, not proof that a valid complaint was received.',
    trackTimerPlatformReceiptNotice: 'from the time the platform received your complaint',
    trackUnverifiedLegalBadge: 'Not yet verified by a legal professional. Check the current rules before relying on this.',
    generalLegalNotice: 'Legal information on Kavach is general and has not yet been reviewed by a lawyer. Verify before relying on it.',
    clearEverythingNow: 'Clear everything now',
    clearEverythingModalTitle: 'Clear all in-memory data?',
    clearEverythingModalBody: 'This will immediately wipe all preserved evidence, tracking records, complaint drafts, and respond answers from this browser tab. This cannot be undone.',
    clearEverythingConfirmBtn: 'Clear Everything',
    clearEverythingSuccessToast: 'All in-memory data has been completely wiped.',
    demoRunBtn: 'Demo with fictional data',
    demoBannerTitle: 'Demo: fictional data',
    demoBannerDesc: 'Viewing coherent sample data across all modes. Nothing is saved or sent.',
    demoExitBtn: 'Exit demo and clear',
    tourStartBtn: 'Guided Tour',
    tourModalTitle: 'Kavach Guided Tour',
    tourStep1Title: 'Quick Exit & Helplines',
    tourStep1Desc: 'Press Esc at any moment or click the red Quick Exit button to immediately leave this site. 24/7 emergency helplines (112, 181, 1930) are always accessible in the footer.',
    tourStep2Title: 'Bilingual English & Hindi',
    tourStep2Desc: 'Switch smoothly between English and natural, everyday Hindi at any time using the header language toggle. All playbooks, drafts, and tools are 100% bilingual.',
    tourStep3Title: 'Respond: First-Hour Crisis Triage',
    tourStep3Desc: 'Assess immediate danger, choose from 7 cyber-abuse categories, and receive clear Do Now, Do Not Do, and platform lockdown checklists.',
    tourStep4Title: 'Preserve: Cryptographic Evidence Vault',
    tourStep4Desc: 'Compute tamper-evident SHA-256 hashes locally in your browser using the Web Crypto API without uploading files anywhere, and export a canonical manifest.',
    tourStep5Title: 'Report: Structured Police & Takedown Drafter',
    tourStep5Desc: 'Generate deterministic complaints following the strict 7-section police format, complete with client-side entity redaction to conceal personal PII.',
    tourStep6Title: 'Track: Statutory Timers & Escalations',
    tourStep6Desc: 'Manage complaint reference numbers, track statutory deadlines (24h NCII removal, 72h removal), view escalation paths if police or platforms fail to act, and export your portable ledger.',
    tourNextBtn: 'Next',
    tourPrevBtn: 'Previous',
    tourFinishBtn: 'Got it',
    tourSkipBtn: 'Skip Tour',
    trackAddTimerLinkRecord: 'Link to a complaint record (optional):',
    trackAddTimerNoRecordLink: 'None (Standalone timer)',
    trackAddTimerCustomHoursLabel: 'Custom duration (in hours):',
    trackAddTimerCustomTitleLabel: 'Custom reminder label:',
    trackAddTimerSubmitBtn: 'Start Timer',
    trackAddTimerCancelBtn: 'Cancel',
    trackLedgerSectionTitle: 'Complaint Submission Ledger',
    trackLedgerSectionSubtitle: 'In-memory log of your police, cyber cell, platform, and NCW submissions',
    trackFilterAll: 'All Records',
    trackFilterSubmitted: 'Submitted',
    trackFilterUnderInvestigation: 'Under Investigation',
    trackFilterActionTaken: 'Action Taken / Closed',
    trackSearchPlaceholder: 'Search by reference number, authority, or notes...',
    trackNoRecordsNotice: 'No complaint records logged in this session yet. Click "Add Complaint Record" or "Try with Sample Record" to begin.',
    trackRefNumberLabel: 'Reference / Ack No:',
    trackSubmissionTypeLabel: 'Authority / Platform:',
    trackSubmittedDateLabel: 'Submitted On:',
    trackStatusLabel: 'Current Status:',
    trackOfficerLabel: 'Officer in Charge:',
    trackContactLabel: 'Official Contact:',
    trackNotesLabel: 'Follow-up Diary & Notes:',
    trackAddNoteBtn: 'Add Note',
    trackAddNotePlaceholder: 'Add a new dated follow-up note (e.g. called IO, visited cyber cell, received ticket)...',
    trackSaveNoteBtn: 'Save Note',
    trackDeleteRecordBtn: 'Delete Record',
    trackEditRecordBtn: 'Edit Details',
    trackCopiedRefToast: 'Reference number copied to clipboard!',
    trackStatusDrafted: 'Draft Prepared',
    trackStatusSubmitted: 'Submitted',
    trackStatusAcknowledged: 'Acknowledged',
    trackStatusUnderInvestigation: 'Under Investigation',
    trackStatusContentRemoved: 'Content Removed / Action Taken',
    trackStatusEscalated: 'Escalated',
    trackStatusClosed: 'Closed / FIR Registered',
    trackAuthNcrp: 'National Cyber Crime Reporting Portal (NCRP)',
    trackAuthPolice: 'Police Station / Cyber Crime Police Station',
    trackAuthPlatform: 'Platform Grievance Officer',
    trackAuthNcw: 'National Commission for Women (NCW)',
    trackAuthGac: 'Grievance Appellate Committee (GAC)',
    trackAuthOther: 'Other Authority / Court',
    trackRecordModalAddTitle: 'Add Complaint Submission Record',
    trackRecordModalEditTitle: 'Edit Complaint Record',
    trackRecordModalAuthorityLabel: 'Submission Authority / Channel:',
    trackRecordModalTitleLabel: 'Authority or Platform Name:',
    trackRecordModalTitlePlaceholder: 'e.g. New Delhi Cyber Police Station or Instagram Grievance Office',
    trackRecordModalRefLabel: 'Acknowledgment / FIR / Ticket Number:',
    trackRecordModalRefPlaceholder: 'e.g. 2026/NCRP/984210, FIR No. 42/2026, or META-GRV-84920',
    trackRecordModalDateLabel: 'Date & Time Submitted:',
    trackRecordModalStatusLabel: 'Current Status:',
    trackRecordModalOfficerLabel: 'Investigating Officer / Contact Person (optional):',
    trackRecordModalOfficerPlaceholder: 'e.g. Inspector R. Sharma or Support Specialist',
    trackRecordModalContactLabel: 'Officer Phone or Email (optional):',
    trackRecordModalContactPlaceholder: 'e.g. cybercell@delhipolice.gov.in or 011-23456789',
    trackRecordModalCategoryLabel: 'Incident Category:',
    trackRecordModalNotesLabel: 'Initial Note or Notes:',
    trackRecordModalNotesPlaceholder: 'e.g. Handed physical complaint with SHA-256 hashes; officer promised inquiry within 48h.',
    trackRecordModalSaveBtn: 'Save to Memory',
    trackRecordModalCancelBtn: 'Cancel',
    trackEscalationSectionTitle: 'Statutory Follow-Up & Escalation Guides',
    trackEscalationSectionSubtitle: 'Exact legal procedures when platforms delay takedowns or police refuse registration',
    trackEscalationViewStepsBtn: 'View Escalation Steps & Sample Notice',
    trackEscalationCopyNoticeBtn: 'Copy Escalation Notice',
    trackEscalationNoticeCopiedToast: 'Escalation notice copied to clipboard!',
    trackEscalationCloseBtn: 'Close Guide',
    trackExportModalTitle: 'Export Tracking Ledger & Summary',
    trackExportJsonBtn: 'Download Structured JSON (.json)',
    trackExportJsonDesc: 'Saves full ledger and timers as a file you can re-import later to continue tracking across sessions without cloud storage.',
    trackExportTxtBtn: 'Download Text Summary (.txt)',
    trackExportTxtDesc: 'Human-readable summary of all submissions, reference numbers, officer notes, and deadlines.',
    trackExportPdfBtn: 'Print / Save as PDF',
    trackExportPdfDesc: 'Formatted paper-ready summary sheet to carry to the police station or lawyer.',
    trackImportModalTitle: 'Import Previously Exported Ledger',
    trackImportModalDesc: 'Select a previously saved kavach-tracking-ledger-*.json file to restore your tracking records and timers in memory.',
    trackImportUploadBtn: 'Select JSON File',
    trackImportSuccessToast: 'Successfully restored tracking records and timers into memory!',
    trackImportErrorToast: 'Import failed: invalid or corrupt JSON file.',
  },
  hi: {
    documentTitle: 'कवच — महिलाओं के लिए साइबर-उत्पीड़न सहायता एवं रिपोर्टिंग साथी',
    appName: 'कवच (Kavach)',
    appWordmark: 'कवच',
    tagline: 'भारत में महिलाओं के लिए साइबर-उत्पीड़न सहायता एवं रिपोर्टिंग साथी',

    navHome: 'मुख्य पृष्ठ',
    navRespond: 'प्रतिक्रिया (Respond)',
    navPreserve: 'साक्ष्य संचय (Preserve)',
    navReport: 'शिकायत प्रारूप (Report)',
    navTrack: 'ट्रैकिंग (Track)',
    navHelp: 'सहायता एवं हेल्पलाइन',
    navPrivacy: 'गोपनीयता एवं साक्ष्य नियम',
    mainNavAria: 'मुख्य नेविगेशन',
    switchToEnglish: 'इंटरफ़ेस भाषा अंग्रेजी में बदलें',
    switchToHindi: 'इंटरफ़ेस भाषा हिंदी में बदलें',

    quickExit: 'तुरंत बाहर निकलें (Esc)',
    quickExitShort: 'निकास (Esc)',
    quickExitNotice: 'तुरंत गूगल पर ले जाता है। यह ब्राउज़र इतिहास नहीं मिटा सकता।',
    quickExitDetails: 'त्वरित निकास सुरक्षा विवरण',
    quickExitModalTitle: 'सुरक्षा सूचना: त्वरित निकास (Quick Exit)',
    quickExitModalBody:
      'त्वरित निकास पर क्लिक करने से यह स्क्रीन तुरंत गूगल सर्च पर स्थानांतरित हो जाएगी ताकि कोई अन्य इसे न देख सके। ध्यान रहे कि ब्राउज़र इतिहास में यह पृष्ठ दर्ज रह सकता है। अधिकतम सुरक्षा के लिए इनकॉग्निटो मोड का उपयोग करें अथवा बाद में इतिहास साफ करें।',
    quickExitKeyboardTitle: 'कीबोर्ड सुरक्षा शॉर्टकट:',
    quickExitKeyboardText: 'कीबोर्ड पर Escape कुंजी दबाने से यह पृष्ठ तुरंत बंद होकर गूगल पर चला जाता है।',
    quickExitModalAction: 'अभी साइट छोड़ें',
    quickExitCancel: 'सुरक्षित लौटें',
    quickExitEscHint: 'त्वरित निकास के लिए Esc दबाएँ',
    close: 'बंद करें',

    emergencyDisclaimer: 'आपातकालीन हेल्पलाइन (उपयोग से पूर्व सत्यापित करें — पूरे भारत में 24 घंटे उपलब्ध)',
    officialPortalLink: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल पर जाएँ (cybercrime.gov.in)',
    helpline112Title: '112 — राष्ट्रीय आपातकालीन सेवा',
    helpline112Desc: 'पुलिस, चिकित्सा या तात्कालिक शारीरिक खतरे हेतु',
    helpline181Title: '181 — महिला हेल्पलाइन',
    helpline181Desc: 'निःशुल्क 24 घंटे परामर्श, आश्रय एवं कानूनी सहायता',
    helpline1930Title: '1930 — साइबर अपराध हेल्पलाइन',
    helpline1930Desc: 'नागरिक साइबर अपराध एवं वित्तीय धोखाधड़ी हेल्पलाइन',
    footerIsolationTitle: 'डिवाइस गोपनीयता आश्वासन:',
    footerIsolationText:
      'कवच आपकी साक्ष्य फ़ाइलें, उत्तर या शिकायत ड्राफ्ट कहीं भी नहीं भेजता है। आपका ब्राउज़र केवल होस्ट से ऐप लोड करता है।',
    footerZeroTrackers: 'शून्य ट्रैकर · कोई टेलीमेट्री नहीं · कोई बाहरी लॉग नहीं',
    footerDisclaimerText: 'कवच एक कानूनी एवं साइबर सुरक्षा सहायक उपकरण है। यह पुलिस प्राथमिकी (FIR) अथवा आधिकारिक कानूनी सलाह का विकल्प नहीं है।',

    heroBadge: 'शून्य डेटा भंडारण',
    heroBadgeNoUploads: 'शून्य रिमोट अपलोड',
    heroBadgeShaOnly: 'केवल ब्राउज़र में SHA-256',
    heroTitle: 'सुरक्षित, निजी साइबर-उत्पीड़न सहायता एवं रिपोर्टिंग साथी',
    heroSubtitle:
      'ऑनलाइन उत्पीड़न, अनधिकृत तस्वीरें/वीडियो, ब्लैकमेल या साइबर-स्टॉकिंग से प्रभावित महिलाओं के लिए एक शांत और सुरक्षित माध्यम। आपके साक्ष्य केवल आपके डिवाइस पर रहते हैं।',
    homeSafetyNoticeTitle: 'आपकी सुरक्षा सर्वोपरि:',
    homeSafetyNoticeText:
      'कवच पर चुनी गई फ़ाइलें और स्क्रीनशॉट पूरी तरह से आपके डिवाइस पर ही रहते हैं। हम आपकी निजी जानकारी कभी जमा नहीं करते हैं और न ही किसी ट्रैकर का उपयोग करते हैं। पुलिस स्टेशन जाने या ऑनलाइन शिकायत करने से पहले आप यहाँ सुरक्षित तैयारी कर सकते हैं।',
    homeFourStepsTitle: 'कार्रवाई के चार चरण',
    homeFourStepsSubtitle: 'आरंभ करने के लिए कोई विकल्प चुनें',
    modeRespondTitle: 'प्रतिक्रिया (Respond)',
    modeRespondSubtitle: 'पहले घंटे की सुरक्षा कार्ययोजना',
    modeRespondDesc:
      'घटना की श्रेणी पहचानें और पहले घंटे की आवश्यक सुरक्षा सावधानियां अपनाएं। खाते सुरक्षित करें और बिना घबराए सही कदम उठाएं।',
    modeRespondTag: 'तात्कालिक संकट / पहला घंटा',
    modePreserveTitle: 'साक्ष्य संचय (Preserve)',
    modePreserveSubtitle: 'डिवाइस पर स्थानीय SHA-256 हैशिंग',
    modePreserveDesc:
      'अपने ब्राउज़र में ही स्क्रीनशॉट और चैट का क्रिप्टोग्राफ़िक SHA-256 डाइजेस्ट तैयार करें। कोई भी फ़ोटो या फ़ाइल किसी सर्वर पर नहीं भेजी जाती।',
    modePreserveTag: 'ब्राउज़र में SHA-256 हैशिंग',
    modeReportTitle: 'शिकायत प्रारूप (Report)',
    modeReportSubtitle: 'संपादनीय हिंदी एवं अंग्रेजी कानूनी शिकायत',
    modeReportDesc:
      'भारतीय सूचना प्रौद्योगिकी अधिनियम 2000 और BNS 2023 की धाराओं के साथ तैयार कानूनी शिकायत का प्रारूप प्राप्त करें, जिसे cybercrime.gov.in या पुलिस स्टेशन में दिया जा सके।',
    modeReportTag: 'IT Act एवं BNS 2023 प्रारूप',
    modeTrackTitle: 'ट्रैकिंग (Track)',
    modeTrackSubtitle: 'कानूनी समय-सीमा एवं स्थिति निगरानी',
    modeTrackDesc:
      'आईटी नियमों के तहत अनिवार्य समय-सीमाओं (तस्वीर हटाने के लिए 24 घंटे की बाध्यता) और पुलिस शिकायत रसीद संख्या का सुरक्षित ऑफलाइन रिकॉर्ड रखें।',
    modeTrackTag: '24 घंटे में सामग्री हटाने का नियम',
    openMode: 'मोड खोलें',
    previewTag: 'आधारभूत पूर्वावलोकन',
    helpCardTitle: 'भारत में आपातकालीन सहायता और कानूनी अधिकार',
    helpCardDesc:
      'सत्यापित हेल्पलाइन नंबर, शून्य एफआईआर (Zero FIR) अधिकार और भारत में ऑनलाइन उत्पीड़न से निपटने के लिए आवश्यक सहायता।',
    privacyCardTitle: 'स्थानीय गोपनीयता और क्रिप्टोग्राफ़िक प्रमाणिकता',
    privacyCardDesc:
      'पारदर्शिता सर्वोपरि: कवच आपकी पहचान कैसे सुरक्षित रखता है, SHA-256 हैश क्या सिद्ध करता है और क्या नहीं।',
    learnMore: 'विस्तार से जानें',
    homePrivacyStandardTitle: 'कवच गोपनीयता एवं सत्यनिष्ठा मानक',
    homePrivacyStandard1Title: 'कोई सर्वर फ़ाइल भंडारण नहीं',
    homePrivacyStandard1Desc:
      'कवच आपकी साक्ष्य फ़ाइलें, उत्तर या शिकायत ड्राफ्ट कहीं भी नहीं भेजता है। आपका ब्राउज़र केवल होस्ट से ऐप लोड करता है।',
    homePrivacyStandard2Title: 'क्रिप्टोग्राफ़िक फ़िंगरप्रिंटिंग',
    homePrivacyStandard2Desc: 'स्थानीय SHA-256 डाइजेस्ट साक्ष्यों के साथ छेड़छाड़ न होने का पक्का प्रमाण बनाते हैं।',
    homePrivacyStandard3Title: 'शून्य थर्ड-पार्टी टेलीमेट्री',
    homePrivacyStandard3Desc: 'कोई विज्ञापन पिक्सेल, ट्रैकिंग कुकीज़ या व्यवहारिक निगरानी नहीं।',

    backToHome: 'मुख्य पृष्ठ पर लौटें',
    stepBack: 'पीछे जाएँ',
    stepNext: 'अगला चरण',
    stepSkip: 'यह प्रश्न छोड़ें',
    continueBtn: 'आगे बढ़ें',
    resetAll: 'पुनः आरंभ करें',
    completed: 'पूर्ण',
    progressText: 'प्रगति',
    externalLinkText: 'बाहरी लिंक खोलें',

    comingSoonTitle: 'यह मॉड्यूल आधारभूत चरण में सक्रिय है',
    comingSoonBadge: 'चरण 1 सक्रिय',
    comingSoonNotice:
      'आधारभूत ढांचा सक्रिय है। आगामी चरणों में इसकी संपूर्ण इंटरएक्टिव कार्यक्षमता जोड़ी जाएगी।',
    zeroNetworkNotice: 'इस मोड में कोई नेटवर्क अनुरोध नहीं भेजा जाता',
    moduleScopeTitle: 'मॉड्यूल रूपरेखा एवं दायरा',
    plannedFeaturesTitle: 'विशिष्टताएँ एवं तकनीकी सुविधाएँ',
    applicableLawTitle: 'लागू भारतीय कानूनी रूपरेखा:',
    hermeticPrivacyTitle: 'सुरक्षित स्थानीय गोपनीयता की गारंटी:',
    hermeticPrivacyDesc:
      'यह मॉड्यूल सभी जानकारियों को केवल आपके डिवाइस पर ही Web Crypto और स्थानीय मेमोरी के माध्यम से प्रोसेस करता है।',
    modePreserveFeature1Title: '100% ब्राउज़र में क्रिप्टोग्राफ़िक प्रोसेसिंग',
    modePreserveFeature1Desc:
      'ब्राउज़र के मूल Web Crypto API (crypto.subtle.digest) का उपयोग करके SHA-256 हैश तैयार करता है। कोई भी फ़ाइल कभी किसी सर्वर पर नहीं भेजी जाती।',
    modePreserveFeature2Title: 'मानकीकृत साक्ष्य मेनिफेस्ट निर्यात',
    modePreserveFeature2Desc:
      'डाउनलोड करने योग्य JSON/PDF मेनिफेस्ट तैयार करता है जिसमें क्रिप्टोग्राफ़िक हैश, फ़ाइल का प्रकार, समय और स्रोत विवरण दर्ज होते हैं।',
    modePreserveFeature3Title: 'अखंडता बनाम प्रामाणिकता का मार्गदर्शन',
    modePreserveFeature3Desc:
      'स्पष्ट कानूनी जानकारी देता है कि SHA-256 फ़ाइल में बदलाव न होने को सिद्ध करता है, किंतु यह भारतीय साक्ष्य अधिनियम की धारा 65B/63 के प्रमाणपत्र का स्थान नहीं लेता।',
    modePreserveLegal:
      'भारतीय साक्ष्य अधिनियम, 2023 (BNS/BSA) की धारा 63 (पूर्व में 65B) अदालतों में इलेक्ट्रॉनिक साक्ष्यों की स्वीकार्यता तय करती है। हैशिंग डिजिटल साक्ष्यों की सुरक्षा सुनिश्चित करती है।',
    modeReportFeature1Title: 'द्विभाषी संरचित कानूनी शिकायत प्रारूप',
    modeReportFeature1Desc:
      'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (cybercrime.gov.in) अथवा स्थानीय पुलिस स्टेशन में जमा करने हेतु औपचारिक शिकायत पत्र तैयार करता है।',
    modeReportFeature2Title: 'कानूनी धाराओं का स्वतः मिलान',
    modeReportFeature2Desc:
      'घटना के आधार पर IT Act 2000 की धारा 66E, 67, 67A तथा BNS 2023 की धारा 77 (ताक-झांक), 78 (पीछा करना) और 79 (शील भंग) की धाराओं को जोड़ता है।',
    modeReportFeature3Title: 'गोपनीयता सुरक्षा एवं संपादन उपकरण',
    modeReportFeature3Desc:
      'शिकायत पत्र की प्रतिलिपि बनाने से पहले संवेदनशील व्यक्तिगत जानकारी को छिपाने अथवा संपादित करने की सुविधा देता है।',
    modeReportLegal:
      'भारतीय कानून के तहत महिलाओं को किसी भी पुलिस स्टेशन में शून्य एफआईआर (Zero FIR) दर्ज कराने का वैधानिक अधिकार प्राप्त है, चाहे अपराध कहीं भी हुआ हो।',
    modeTrackFeature1Title: '24 घंटे एवं 72 घंटे की कानूनी उलटी गिनती',
    modeTrackFeature1Desc:
      'निजी तस्वीरों को हटाने हेतु 24 घंटे की अनिवार्य समय-सीमा और अन्य साइबर शिकायतों हेतु 72 घंटे की समय-सीमा पर नज़र रखता है।',
    modeTrackFeature2Title: 'निजी स्थानीय शिकायत रसीद बही',
    modeTrackFeature2Desc:
      'राष्ट्रीय साइबर अपराध पोर्टल (cybercrime.gov.in) की पावती संख्या और पुलिस रोजनामचा प्रविष्टियों (GD/DD) को केवल आपके ब्राउज़र में सुरक्षित रखता है।',
    modeTrackFeature3Title: 'अनुवर्ती कार्रवाई एवं स्मरण पत्र प्रारूप',
    modeTrackFeature3Desc:
      'यदि सोशल मीडिया प्लेटफॉर्म समय पर सामग्री न हटाए, तो उनके मुख्य ग्रीवेंस ऑफिसर और राज्य साइबर सेल को भेजने हेतु अनुवर्ती पत्र का प्रारूप देता है।',
    modeTrackLegal:
      'सोशल मीडिया प्लेटफॉर्म यदि 24 घंटे के भीतर आपत्तिजनक सामग्री नहीं हटाते हैं, तो वे IT Act की धारा 79 के तहत मिलने वाली कानूनी सुरक्षा खो देते हैं।',

    respondFlowBadge: 'चरण 2 सक्रिय',
    respondFlowTitle: 'पहले घंटे की सुरक्षा एवं रोकथाम कार्ययोजना',
    respondFlowSubtitle:
      'बिना घबराए अपने खातों को सुरक्षित करने, साक्ष्य सहेजने और ब्लैकमेल को रोकने के शांत और व्यवस्थित कदम।',
    respondStep1Title: 'चरण 1: क्या समस्या आ रही है?',
    respondStep1Subtitle:
      'अपनी स्थिति से सबसे मेल खाती श्रेणी चुनें। आप इसे कभी भी बदल सकते हैं। यह श्रेणी केवल मार्गदर्शन के लिए है, कोई औपचारिक कानूनी निर्णय नहीं।',
    respondStep1SelectionNote: 'चुनी गई श्रेणी:',
    respondStep2Title: 'चरण 2: तात्कालिक शारीरिक सुरक्षा जाँच',
    respondStep2Subtitle: 'डिजिटल कदम उठाने से पहले यह सुनिश्चित करें कि आप शारीरिक रूप से सुरक्षित हैं।',
    dangerAlertHeading: 'तात्कालिक आपातकालीन सहायता',
    dangerAlertBody:
      'यदि आप या आपके आसपास कोई व्यक्ति तात्कालिक शारीरिक खतरे में है, तो कृपया तुरंत पुलिस आपातकालीन नंबर पर कॉल करें। आपका जीवन और शारीरिक सुरक्षा किसी भी डिजिटल परेशानी से पहले आती है।',
    dangerCall112Btn: '112 पर कॉल करें (पुलिस आपातकालीन सेवा)',
    dangerProceedSafeBtn: 'मैं सुरक्षित स्थान पर हूँ — डिजिटल योजना पर आगे बढ़ें',
    dangerRecheckYesBtn: 'हाँ, मुझे शारीरिक खतरा है',
    dangerRecheckNoBtn: 'नहीं, मैं इस समय सुरक्षित हूँ',
    respondStep3Title: 'चरण 3: संक्षिप्त स्थिति मूल्यांकन',
    respondStep3Subtitle:
      'कार्ययोजना को अधिक उपयोगी बनाने के लिए 2 छोटे प्रश्नों के उत्तर दें। हर प्रश्न को छोड़ना संभव है। पासवर्ड या निजी नाम कभी दर्ज न करें।',
    respondStep4Title: 'चरण 4: आपकी पहले घंटे की कार्ययोजना',
    respondStep4Subtitle:
      'नीचे दी गई प्राथमिकता सूची को ध्यान से पढ़ें। कार्य पूरा होने पर टिक लगाते जाएँ। आपकी प्रगति केवल आपके डिवाइस पर रहती है।',
    doNowTab: 'अभी करें (तात्कालिक सुरक्षा)',
    doNotDoTab: 'यह बिल्कुल न करें (साक्ष्य रक्षा)',
    whenReadyTab: 'तैयार होने पर (रिपोर्टिंग)',
    platformLockdownTitle: 'सोशल मीडिया खाता सुरक्षा मार्गदर्शिका',
    checklistProgressTitle: 'पहले घंटे के कदमों की प्रगति:',
    checklistAllDone: 'सभी महत्वपूर्ण सुरक्षा कदम पूरे हो चुके हैं!',
    changeCategoryBtn: 'घटना की श्रेणी बदलें',
    continueToPreserve: 'साक्ष्य संचय करें (SHA-256 हैश)',
    continueToReport: 'शिकायत प्रारूप तैयार करें',
    continueToTrack: 'रिपोर्ट की स्थिति ट्रैक करें',
    helplinesAlwaysAvailable: 'आपातकालीन हेल्पलाइन नीचे दिए गए फुटर में 24 घंटे उपलब्ध हैं।',

    privacyBadge: 'गोपनीयता संविधान',
    privacyTitle: 'स्थानीय गोपनीयता और क्रिप्टोग्राफ़िक प्रमाणिकता',
    privacySubtitle:
      'पारदर्शिता सर्वोपरि: कवच आपकी पहचान कैसे सुरक्षित रखता है, SHA-256 हैश क्या सिद्ध करता है और क्या नहीं।',
    privacyStaysDeviceTitle: 'आपके डिवाइस पर क्या सुरक्षित रहता है',
    privacyStaysDeviceSubtitle: 'पूरी तरह स्थानीय ब्राउज़र प्रोसेसिंग',
    privacyStaysDeviceDesc:
      'कवच आपकी साक्ष्य फ़ाइलें, उत्तर या शिकायत ड्राफ्ट कहीं भी नहीं भेजता है। आपका ब्राउज़र केवल होस्ट से ऐप लोड करता है। क्रिप्टोग्राफ़िक हैशिंग और शिकायत निर्माण स्थानीय ब्राउज़र मेमोरी में चलता है।',
    privacyDeviceCard1Title: 'स्क्रीनशॉट और मीडिया फ़ाइलें',
    privacyDeviceCard1Desc:
      'फ़ोटो और वीडियो केवल आपके ब्राउज़र की निजी मेमोरी में रहते हैं। वे कभी इंटरनेट पर नहीं भेजे जाते।',
    privacyDeviceCard2Title: 'घटना का विवरण',
    privacyDeviceCard2Desc:
      'शिकायत का विवरण आपके फ़ोन/कंप्यूटर पर ही तैयार होता है। आपकी अनुमति के बिना कोई भी शब्द बाहर नहीं जाता।',
    privacyDeviceCard3Title: 'व्यक्तिगत पहचान',
    privacyDeviceCard3Desc:
      'आपका नाम, फ़ोन नंबर या पता किसी भी बाहरी डेटाबेस या ट्रैकर पर नहीं भेजा जाता।',
    privacyCryptoTitle: 'क्रिप्टोग्राफ़ी और साक्ष्य कानून की वास्तविकता',
    privacyCryptoSubtitle: 'कानूनी सीमाओं को सही रूप से समझना',
    privacyCryptoDesc:
      'कवच आपके ब्राउज़र में सीधे crypto.subtle.digest मानक का उपयोग करके 256-बिट SHA-256 हैश बनाता है। यह समझना आवश्यक है कि यह हैश कानूनी रूप से क्या साबित करता है और क्या नहीं।',
    privacyWhatProvesTitle: 'SHA-256 हैश क्या साबित करता है',
    privacyWhatDoesNotProveTitle: 'हैशिंग क्या साबित नहीं करती है',
    privacyProves1Title: 'फ़ाइल में बिना किसी बदलाव का पक्का प्रमाण',
    privacyProves1Desc:
      'गणितीय रूप से सिद्ध करता है कि हैश बनने के बाद फ़ाइल के एक भी पिक्सेल, अक्षर या बाइट में कोई बदलाव या छेड़छाड़ नहीं हुई है।',
    privacyProves2Title: 'निश्चित समय पर अस्तित्व का प्रमाण',
    privacyProves2Desc:
      'यह दर्शाता है कि मेनिफेस्ट निर्यात करते समय यह सटीक फ़ाइल आपके पास उपलब्ध थी।',
    privacyProves3Title: 'बिना फ़ोटो दिखाए साक्ष्य सत्यापन',
    privacyProves3Desc:
      'वकीलों या साइबर पुलिस को निजी तस्वीरें दिखाए बिना यह साबित किया जा सकता है कि आपके पास सुरक्षित साक्ष्य मौजूद हैं।',
    privacyNotProves1Title: 'यह साबित नहीं करता कि फ़ोटो किसने बनाई',
    privacyNotProves1Desc:
      'हैश यह नहीं बता सकता कि तस्वीर मूल रूप से किसने खींची, संदेश किसने लिखा, या फ़ोटो AI से बनाई गई है या नहीं। यह सिर्फ़ फ़ाइल की स्थिति दिखाता है।',
    privacyNotProves2Title: 'यह धारा 65B/63 के प्रमाणपत्र का विकल्प नहीं है',
    privacyNotProves2Desc:
      'भारतीय साक्ष्य कानून (BNS/BSA 2023 धारा 63 / साक्ष्य अधिनियम 65B) के तहत डिजिटल साक्ष्यों के साथ डिवाइस के स्वामी का हस्ताक्षरित प्रमाणपत्र आवश्यक होता है।',
    privacyNotProves3Title: 'यह अपने आप पुलिस शिकायत दर्ज नहीं करता',
    privacyNotProves3Desc:
      'हैश बनाना केवल सबूत जुटाने का कदम है; जब तक आप स्वयं औपचारिक शिकायत दर्ज नहीं करते, पुलिस को सूचना नहीं मिलती।',
    privacyNotProves4Title: 'यह पूर्ण इंटरनेट गुमनामी की गारंटी नहीं देता',
    privacyNotProves4Desc:
      'कवच आपको ट्रैक नहीं करता, लेकिन आपके इंटरनेट सेवा प्रदाता (ISP) और ब्राउज़र इतिहास में देखी गई साइटों का विवरण रह सकता है।',
    privacyPrinciplesHeading: 'कवच के 8 गैर-परक्राम्य गोपनीयता सिद्धांत',
    privacyPrinciplesSubheading: 'ये सिद्धांत /docs/privacy-principles.md में दर्ज हैं और हर बदलाव में लागू रहते हैं।',
    privacyCodeVerificationTitle: 'स्थानीय हैशिंग कोड का सत्यापन',
    privacyCodeVerificationDesc:
      'नीचे दिया गया कोड वह तरीका दिखाता है जिससे ब्राउज़र में फ़ाइलों का SHA-256 हैश निकाला जाता है। इसमें किसी सर्वर की सहायता नहीं ली जाती।',

    helpBadge: 'आधिकारिक संसाधन',
    helpTitle: 'भारत में आपातकालीन सहायता और कानूनी अधिकार',
    helpSubtitle:
      'सत्यापित हेल्पलाइन नंबर, शून्य एफआईआर (Zero FIR) अधिकार और भारत में ऑनलाइन उत्पीड़न से निपटने के लिए आवश्यक सहायता।',
    helpVerificationNotice:
      'हेल्पलाइन नंबर संबंधित राज्य सरकारों और केंद्रीय मंत्रालयों द्वारा संचालित हैं। 112, 181 और 1930 पूरे भारत में सक्रिय हैं। जिले के स्तर पर साइबर सेल के कार्य समय की पुष्टि अवश्य कर लें।',
    helpDirectHelplinesTitle: 'सीधी आपातकालीन हेल्पलाइन',
    helpOfficialPortalsTitle: 'आधिकारिक सरकारी रिपोर्टिंग पोर्टल',
    helpPortalNcrpTitle: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल',
    helpPortalNcrpDesc:
      'साइबर अपराधों की शिकायत हेतु भारत सरकार का आधिकारिक पोर्टल, जिसमें महिलाओं के विरुद्ध अपराध की गोपनीय रिपोर्टिंग का विशेष अनुभाग है।',
    helpPortalNcwTitle: 'राष्ट्रीय महिला आयोग (NCW)',
    helpPortalNcwDesc:
      'घरेलू एवं साइबर हिंसा से पीड़ित महिलाओं के लिए 24 घंटे हेल्पलाइन। ऑनलाइन शिकायत पंजीकरण की सुविधा उपलब्ध।',
    helpLegalRightsTitle: 'भारतीय कानून के तहत आपके वैधानिक अधिकार',
    helpLegalRightsSubtitle: 'IT Act 2000, BNSS 2023 और इंटरमीडियरी नियमों के तहत कानूनी सुरक्षा',
    helpRight1Title: 'शून्य एफआईआर (Zero FIR) दर्ज कराने का अधिकार',
    helpRight1Statute: 'धारा 173 BNSS 2023 (पूर्व में धारा 154 CrPC)',
    helpRight1Body:
      'कोई भी पुलिस स्टेशन अधिकार क्षेत्र न होने के आधार पर FIR दर्ज करने से मना नहीं कर सकता। महिलाओं के विरुद्ध अपराध की स्थिति में पुलिस को शून्य एफआईआर दर्ज करनी होगी और बाद में संबंधित थाने को भेजनी होगी।',
    helpRight2Title: '24 घंटे के भीतर आपत्तिजनक सामग्री हटाने का नियम',
    helpRight2Statute: 'नियम 3(2)(b), सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश) नियम, 2021',
    helpRight2Body:
      'सोशल मीडिया प्लेटफॉर्म (Instagram, Meta, X, YouTube, Telegram) सूचना मिलने के 24 घंटे के भीतर बिना सहमति वाली अश्लील सामग्री हटाने के लिए कानूनी रूप से बाध्य हैं।',
    helpRight3Title: 'महिला पुलिस अधिकारी द्वारा बयान दर्ज करना',
    helpRight3Statute: 'धारा 26 एवं 164 CrPC / BNSS समतुल्य',
    helpRight3Body:
      'यौन उत्पीड़न, ताक-झांक या छेड़छाड़ के मामलों में महिला को यह अधिकार है कि उसका बयान किसी महिला पुलिस अधिकारी की उपस्थिति में दर्ज किया जाए।',
    helpRight4Title: 'पीड़िता की पहचान की गोपनीयता',
    helpRight4Statute: 'धारा 72 BNS 2023 (पूर्व में धारा 228A IPC)',
    helpRight4Body:
      'अदालत की पूर्व अनुमति के बिना यौन अपराधों से पीड़ित महिला का नाम या पहचान उजागर करना कानूनन दंडनीय अपराध है।',
    helpChecklistTitle: 'रिपोर्ट दर्ज कराने से पहले आवश्यक सावधानियां',
    helpChecklist1:
      'मूल स्क्रीनशॉट सुरक्षित रखें: सुनिश्चित करें कि स्क्रीनशॉट में पूरा वेब पता (URL), यूज़रनेम, फ़ोन नंबर और तारीख/समय साफ दिखाई दे रहे हों।',
    helpChecklist2:
      'फ़ाइलों में फेरबदल न करें: हैश निकालने से पहले स्क्रीनशॉट को काटें (crop) या रीनेम न करें, क्योंकि इससे फ़ाइल की संरचना बदल जाती है।',
    helpChecklist3:
      'प्रोफ़ाइल का स्थायी लिंक सहेजें: आरोपी अक्सर अपने नाम बदल लेते हैं; इसलिए उनके खाते का स्थायी वेब लिंक (URL) या आईडी ज़रूर नोट कर लें।',

    preserveTabHash: 'साक्ष्य सुरक्षित करें एवं हैश निकालें',
    preserveTabVerify: 'साक्ष्य सत्यता की जांच (Verify)',
    preserveHeaderBadge: 'मोड 02 · ब्राउज़र में सुरक्षित फॉरेंसिक हैशिंग',
    preserveTitle: 'साक्ष्य संचय एवं अखंडता तिजोरी',
    preserveSubtitle:
      'अपने स्क्रीनशॉट और फ़ाइलों का अपरिवर्तनीय SHA-256 डिजिटल फिंगरप्रिंट तैयार करें। सब कुछ आपके डिवाइस पर ही संसाधित होता है; कोई भी फ़ाइल किसी सर्वर पर नहीं भेजी जाती।',
    preserveDropTitle: 'साक्ष्य फ़ाइलें यहाँ खींचकर लाएँ, या चुनने के लिए क्लिक करें',
    preserveDropSubtitle: 'स्क्रीनशॉट, दस्तावेज़, ऑडियो और वीडियो (प्रति फ़ाइल अधिकतम 100 MB)',
    preserveDropFormats: 'PNG, JPG, MP4, PDF, TXT, M4A आदि',
    preserveSampleBtn: 'नमूना फ़ाइल के साथ आज़माएँ',
    preserveMemoryNotice:
      'केवल अस्थायी मेमोरी: सभी फ़ाइलें और फिंगरप्रिंट केवल इस ब्राउज़र टैब की मेमोरी में रहते हैं। टैब बंद करने पर वे स्वतः मिट जाते हैं। स्थायी रिकॉर्ड हेतु घोषणापत्र डाउनलोड करें।',
    preserveFileSizeError: 'फ़ाइल 100 MB की सीमा से अधिक है। कृपया लंबी स्क्रीन रिकॉर्डिंग को छोटा करके पुनः प्रयास करें।',
    preserveFileReadError: 'डिवाइस पर फ़ाइल पढ़ने में समस्या आई। कृपया अनुमतियों की जांच करें।',
    preserveHashingInProgress: 'ब्राउज़र में SHA-256 फिंगरप्रिंट तैयार किया जा रहा है...',
    preserveItemsCount: 'संचित साक्ष्य सूची',
    preserveFileNameLabel: 'फ़ाइल का नाम',
    preserveExcludeFileName: 'निर्यात किए जाने वाले घोषणापत्र से नाम छिपाएँ (redact)',
    preserveOriginalCapturedLabel: 'घटना या रिकॉर्डिंग की मूल तारीख व समय (वैकल्पिक)',
    preserveOriginalCapturedHelper: 'यह घटना कब हुई थी अथवा आपने साक्ष्य कब कैप्चर किया था',
    preserveFileLastModifiedLabel: 'फ़ाइल सिस्टम की अंतिम संशोधन तिथि',
    preserveFileLastModifiedNote: 'अविश्वसनीय: यह डिवाइस की घड़ी और फ़ाइल शेयरिंग ऐप पर निर्भर करता है',
    preserveSourceTypeLabel: 'साक्ष्य का स्रोत',
    preserveSourceTypeScreenshot: 'स्क्रीनशॉट (Screenshot)',
    preserveSourceTypeChat: 'चैट संदेश / बातचीत',
    preserveSourceTypeWeb: 'वेबसाइट / पोस्ट लिंक (URL)',
    preserveSourceTypeOther: 'अन्य स्रोत',
    preserveSourceRefLabel: 'स्रोत संदर्भ (खाता, फ़ोन नंबर या लिंक)',
    preserveExcludeSourceRef: 'निर्यात से स्रोत संदर्भ छिपाएँ (redact)',
    preserveNoteLabel: 'संदर्भ / निजी टिप्पणी (वैकल्पिक)',
    preserveIncludeNote: 'इस टिप्पणी को घोषणापत्र में शामिल करें',
    preserveRemoveItem: 'साक्ष्य हटाएं',
    preserveShowPreview: 'पूर्वावलोकन देखें',
    preserveHidePreview: 'पूर्वावलोकन छिपाएँ',
    preserveClickToUnblur: 'संवेदनशील सामग्री: पूर्वावलोकन देखने के लिए क्लिक करें',
    preservePreviewNotice: 'आपकी सुविधा के लिए पूर्वावलोकन शुरुआत में धुंधला रखा गया है।',
    preserveExportTitle: 'साक्ष्य घोषणापत्र प्राप्त करें',
    preserveExportDesc:
      'सभी फ़िंगरप्रिंट, समय-मुहर और विवरण युक्त JSON फ़ाइल डाउनलोड करें, या पुलिस/वकील को देने हेतु प्रिंट/PDF सहेजें।',
    preserveDownloadJsonBtn: 'घोषणापत्र डाउनलोड करें (JSON)',
    preservePrintPdfBtn: 'प्रिंट करें / PDF के रूप में सहेजें',
    preserveCopiedToast: 'SHA-256 हैश कॉपी कर लिया गया है',
    preserveCopyHash: 'SHA-256 हैश कॉपी करें',
    preserveManifestLimitationsTitle: 'साक्ष्य सीमाएं एवं वैधानिक सूचना',
    preserveManifestLimitationsText:
      'डिजिटल हैश केवल यह प्रमाणित करता है कि गणना के बाद फ़ाइल की सामग्री में कोई बदलाव नहीं हुआ है। यह सामग्री की सत्यता, आरोपी की पहचान, धारा 63 BSA / 65B IT Act के तहत कानूनी स्वीकार्यता या शिकायत दर्ज होने का दावा नहीं करता।',
    preserveUnsavedLeaveWarning:
      'आपके पास बिना सहेजे गए साक्ष्य मौजूद हैं। इस पृष्ठ को छोड़ने पर वे मेमोरी से पूरी तरह मिट जाएँगे।',
    verifyTitle: 'साक्ष्य अखंडता की जांच (Verify)',
    verifySubtitle:
      'किसी भी फ़ाइल की तुलना पूर्व में दर्ज SHA-256 फिंगरप्रिंट से करें और जांचें कि उसकी सामग्री में कोई फेरबदल हुआ है या नहीं।',
    verifyMethodCurrent: 'वर्तमान सत्र की फ़ाइल से मिलान करें',
    verifyMethodImport: 'बाहरी घोषणापत्र (JSON) आयात करें',
    verifySelectCurrentItem: 'जांच हेतु संचित साक्ष्य चुनें:',
    verifyImportManifestBtn: 'JSON घोषणापत्र चुनें',
    verifyDropTargetFile: 'फिंगरप्रिंट से मिलान हेतु फ़ाइल चुनें या यहाँ लाएँ',
    verifyCheckingIntegrity: 'फ़ाइल का SHA-256 फिंगरप्रिंट निकाला जा रहा है...',
    verifyMatchTitle: 'फिंगरप्रिंट पूर्णतः समान: अप्रभावित सामग्री',
    verifyMatchDesc:
      'इस फ़ाइल की सामग्री पहले दर्ज किए गए डिजिटल फिंगरप्रिंट से पूरी तरह मेल खाती है। बाइट-दर-बाइट कोई बदलाव नहीं हुआ है।',
    verifyMismatchTitle: 'फिंगरप्रिंट में अंतर: सामग्री परिवर्तित है',
    verifyMismatchDesc:
      'यह फ़ाइल पहले दर्ज की गई फ़ाइल से भिन्न है। यदि फ़ाइल को थोड़ा भी काटा (crop) गया हो, दोबारा सहेजा गया हो या WhatsApp पर भेजा गया हो, तो फिंगरप्रिंट पूरी तरह बदल जाता है।',
    verifyInvalidManifest: 'अमान्य घोषणापत्र फ़ाइल। कृपया कवच द्वारा जारी वैध JSON फ़ाइल चुनें।',
    verifyPrivacyLink: 'हमारे गोपनीयता एवं क्रिप्टोग्राफ़िक नियम पढ़ें',
    preserveSha256FingerprintLabel: 'SHA-256 डिजिटल फिंगरप्रिंट',
    preserveHashedTimestampLabel: 'हैश समय-मुहर (स्थानीय / UTC):',
    preserveIncidentRefLabel: 'घटना संदर्भ / शीर्षक (वैकल्पिक)',
    preserveIncidentRefPlaceholder: 'जैसे NCRP शिकायत तैयारी / पुलिस रिपोर्ट',
    verifyExpectedLabel: 'अपेक्षित फिंगरप्रिंट:',
    verifyComputedLabel: 'चुनी गई फ़ाइल का फिंगरप्रिंट:',
    verifyTargetRefLabel: 'लक्ष्य संदर्भ फिंगरप्रिंट',
    verifySelectedFileLabel: 'चुनी गई फ़ाइल:',
    verifySelectFileBtn: 'जांच हेतु फ़ाइल चुनें',
    verifyNoSessionItems: 'वर्तमान सत्र में कोई साक्ष्य नहीं है। पहले साक्ष्य संचय करें या JSON घोषणापत्र आयात करें।',
    verifyLoadedManifestNotice: '{count} प्रविष्टियों वाला घोषणापत्र लोड किया गया।',
    guidanceCatGeneral: 'सामान्य फॉरेंसिक साक्ष्य संचय',
    guidanceCatBlackmail: 'ब्लैकमेल एवं सेक्स्टॉर्शन',
    guidanceCatNcii: 'अंतरंग तस्वीर या वीडियो की धमकी',
    guidanceCatImpersonation: 'फ़र्ज़ी प्रोफ़ाइल एवं प्रतिरूपण',
    guidanceCatStalking: 'साइबर-स्टॉकिंग एवं ऑनलाइन पीछा',
    reportHeaderBadge: 'मोड 03 · औपचारिक शिकायत प्रारूप (drafting)',
    reportTitle: 'शिकायत एवं सामग्री हटाने का प्रारूप',
    reportSubtitle:
      'पुलिस (cybercrime.gov.in) या सोशल मीडिया मध्यवर्ती के लिए औपचारिक शिकायत तैयार करें। सभी प्रक्रियाएँ आपके डिवाइस पर निजी रूप से होती हैं। कवच कभी कोई शिकायत सीधे जमा नहीं करता।',
    reportStep1Badge: 'चरण 1 / 6 · दस्तावेज़ का प्रकार',
    reportStep1Title: 'दस्तावेज़ का प्रकार एवं भाषा चुनें',
    reportStep1Desc: 'चुनें कि क्या आप पुलिस शिकायत तैयार कर रही हैं अथवा सोशल मीडिया प्लेटफ़ॉर्म के लिए नोटिस।',
    reportDocTypePolice: 'पुलिस / साइबर अपराध शिकायत',
    reportDocTypePoliceDesc: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (cybercrime.gov.in) अथवा स्थानीय पुलिस स्टेशन (शून्य एफआईआर) हेतु।',
    reportDocTypeTakedown: 'सामग्री हटाने का नोटिस (Takedown)',
    reportDocTypeTakedownDesc: 'सोशल मीडिया प्लेटफ़ॉर्म के रेज़िडेंट ग्रीवेंस अधिकारी को आपत्तिजनक सामग्री हटाने हेतु सीधा नोटिस।',
    reportDocLangLabel: 'प्रारूप की भाषा:',
    reportDocLangEn: 'अंग्रेजी (English)',
    reportDocLangHi: 'हिंदी',
    reportStep2Badge: 'चरण 2 / 6 · शिकायतकर्ता का विवरण',
    reportStep2Title: 'शिकायतकर्ता का विवरण (वैकल्पिक)',
    reportStep2Desc: 'यदि आप चाहती हैं तो अपना विवरण भरें, अथवा इसे खाली छोड़ दें और बाद में हाथ से लिखें। कुछ भी सहेजा या भेजा नहीं जाता।',
    reportComplainantNotice: 'आप इसे खाली छोड़ सकती हैं और बाद में हाथ से लिख सकती हैं। कुछ भी सहेजा या भेजा नहीं जाता।',
    reportNameLabel: 'आपका पूरा नाम (वैकल्पिक)',
    reportNamePlaceholder: 'खाली छोड़ें अथवा नाम दर्ज करें',
    reportContactLabel: 'फ़ोन नंबर / ईमेल पता (वैकल्पिक)',
    reportContactPlaceholder: 'फ़ोन नंबर या ईमेल पता',
    reportLocationLabel: 'शहर, राज्य अथवा स्थानीय थाना क्षेत्र (वैकल्पिक)',
    reportLocationPlaceholder: 'शहर या थाना क्षेत्र',
    reportStep3Badge: 'चरण 3 / 6 · घटना का ब्योरा',
    reportStep3Title: 'क्या हुआ और कौन शामिल था',
    reportStep3Desc: 'तथ्यात्मक जानकारी दें। जो जानकारी नहीं भरेंगी, वह बाद में भरने के लिए कोष्ठक में दिखाई देगी।',
    reportCategoryLabel: 'घटना की श्रेणी',
    reportCategoryNotSure: 'मुझे पक्का पता नहीं है / कई श्रेणियां',
    reportDateTimeLabel: 'घटना की अनुमानित तारीख व समय',
    reportDateTimePlaceholder: 'जैसे कल रात लगभग 9 बजे, अथवा 15-20 अक्टूबर के बीच',
    reportDateTimeHelper: 'स्वतंत्र पाठ — अपने शब्दों में बताएं कि यह घटना कब हुई थी।',
    reportPlatformLabel: 'प्लेटफ़ॉर्म अथवा संचार माध्यम',
    reportPlatformPlaceholder: 'जैसे WhatsApp, Instagram, Telegram, SMS, ईमेल',
    reportSuspectLabel: 'आरोपी की पहचान (लिंक, यूज़रनेम, फ़ोन या UPI आईडी)',
    reportSuspectPlaceholder: 'प्रोफ़ाइल लिंक, यूज़रनेम, फ़ोन या UPI आईडी',
    reportDescriptionLabel: 'घटना का विवरण (अपने शब्दों में)',
    reportDescriptionGuidance: 'वर्णन करें कि क्या कहा गया या क्या किया गया। आपको किसी अंतरंग तस्वीर का विस्तार से वर्णन करने की आवश्यकता नहीं है। उसके स्थान पर साक्ष्य संख्या का उल्लेख करें।',
    reportDescriptionPlaceholder: 'घटना का स्पष्ट विवरण अपने शब्दों में लिखें...',
    reportIntimateLabel: 'क्या अंतरंग या आपत्तिजनक सामग्री साझा की गई, धमकी दी गई या एडिट की गई?',
    reportIntimateYes: 'हाँ — अंतरंग या व्यक्तिगत सामग्री शामिल थी',
    reportIntimateNo: 'नहीं — अंतरंग सामग्री शामिल नहीं थी',
    reportIntimateNotSure: 'पक्का नहीं / अनिश्चित',
    reportMoneyLabel: 'क्या पैसों की माँग की गई या भुगतान किया गया (जबरन वसूली)?',
    reportMoneyYes: 'हाँ — पैसों की माँग की गई',
    reportMoneyNo: 'नहीं — पैसों की कोई माँग नहीं थी',
    reportMoneyAmountLabel: 'माँगी गई या दी गई रकम (वैकल्पिक)',
    reportMoneyAmountPlaceholder: 'माँगी गई रकम',
    reportStep4Badge: 'चरण 4 / 6 · घटना का कालक्रम',
    reportStep4Title: 'घटनाओं का कालक्रम (क्रोनोलॉजिकल टाइमलाइन)',
    reportStep4Desc: 'घटनाओं का क्रमबद्ध विवरण जोड़ें। तारीख और समय का क्रम जांच अधिकारी को मामले को समझने में सहायता करता है।',
    reportAddTimelineRowBtn: 'घटना क्रम जोड़ें',
    reportTimelineDateHeader: 'तारीख / समय',
    reportTimelineEventHeader: 'क्या घटित हुआ',
    reportTimelineActionHeader: 'कार्यवाही',
    reportTimelineRemoveRow: 'हटाएं',
    reportTimelineEmptyNotice: 'अभी कोई घटना क्रम नहीं जोड़ा गया। "घटना क्रम जोड़ें" पर क्लिक करें अथवा समग्र तारीख के साथ आगे बढ़ें।',
    reportStep5Badge: 'चरण 5 / 6 · साक्ष्य विवरण',
    reportStep5Title: 'डिजिटल साक्ष्य फिंगरप्रिंट जोड़ें',
    reportStep5Desc: 'संचित साक्ष्यों के क्रिप्टोग्राफ़िक फिंगरप्रिंट शामिल करें। फ़ाइलें कभी अपलोड नहीं की जातीं; केवल SHA-256 हैश प्रारूप में जुड़ते हैं।',
    reportEvidenceAdvisoryNote: 'अपनी मूल फ़ाइलें सुरक्षित रखें। उन्हें केवल जांच अधिकारी या आधिकारिक चैनल को सौंपें, यहाँ कभी अपलोड न करें।',
    reportEvidenceSelectSession: 'वर्तमान सत्र में सुरक्षित साक्ष्य चुनें:',
    reportEvidenceNoSessionItems: 'वर्तमान सत्र में कोई साक्ष्य नहीं मिला। आप बाहरी घोषणापत्र आयात कर सकती हैं अथवा मोड 02 में साक्ष्य सुरक्षित कर सकती हैं।',
    reportEvidenceImportManifestBtn: 'कवच घोषणापत्र (JSON) आयात करें',
    reportEvidenceSelectedCount: 'प्रारूप में शामिल साक्ष्य',
    reportStep6Badge: 'चरण 6 / 6 · समीक्षा, संपादन एवं निर्यात',
    reportStep6Title: 'प्रारूप की समीक्षा, गोपनीयता संपादन एवं निर्यात',
    reportStep6Desc: 'अपने प्रारूप की समीक्षा करें, कानूनी सुझाव देखें, पहचान छिपाने के विकल्प चुनें और आधिकारिक अथवा गोपनीय प्रति प्राप्त करें।',
    reportPlaceholderCountBadge: '{count} स्थान अभी भरने शेष हैं',
    reportNoPlaceholdersLeft: 'सभी आवश्यक स्थान भर दिए गए हैं! प्रारूप तैयार है।',
    reportRegenerateWarningTitle: 'किए गए बदलाव बदलें?',
    reportRegenerateWarningDesc: 'आपने प्रारूप में अपने हाथ से बदलाव किए हैं। पुनः तैयार करने पर आपके किए गए बदलाव हट जाएँगे। क्या आप आगे बढ़ना चाहती हैं?',
    reportRegenerateConfirmBtn: 'हाँ, प्रारूप पुनः तैयार करें',
    reportRegenerateCancelBtn: 'मेरे बदलाव रखें',
    reportResetDraftBtn: 'फ़ॉर्म के आधार पर पुनः तैयार करें',
    reportProvisionsPanelTitle: 'कानूनी प्रावधान जिन पर आप पुलिस या वकील से विचार करने को कह सकती हैं',
    reportProvisionsPanelDesc: 'ये किसी योग्य व्यक्ति द्वारा जांचने हेतु सुझाव हैं। यह कानूनी सलाह नहीं है।',
    reportProvisionsCheckboxLabel: 'मेरे प्रारूप में सुझाए गए कानूनी प्रावधान शामिल करें',
    reportProvisionsUnverifiedBadge: 'अभी किसी कानूनी विशेषज्ञ द्वारा सत्यापित नहीं',
    reportRedactionPanelTitle: 'ब्राउज़र में संपादन एवं दो संस्करण',
    reportRedactionPanelDesc: 'विश्वासपात्र सहायकों से साझा करते समय अपनी पहचान छिपाएँ। आधिकारिक पुलिस शिकायत में आरोपी के हैंडल और लिंक रहने दें।',
    reportRedactionCustomWordLabel: 'छिपाने के लिए अतिरिक्त शब्द या नाम जोड़ें (जैसे स्कूल का नाम, सहकर्मी):',
    reportRedactionCustomWordPlaceholder: 'शब्द लिखें और जोड़ें पर क्लिक करें',
    reportRedactionAddWordBtn: 'शब्द जोड़ें',
    reportRedactionWarningNotice: 'स्वचालित संपादन सब कुछ नहीं पकड़ सकता। साझा करने से पहले स्वयं अवश्य पढ़ें। स्कूल का नाम, उपनाम या विशिष्ट यूज़रनेम आपकी पहचान उजागर कर सकता है।',
    reportVersionFullTab: 'आधिकारिक पूर्ण प्रति (पुलिस / शिकायत अधिकारी हेतु)',
    reportVersionRedactedTab: 'संपादित गोपनीय प्रति (सहायकों / सलाहकारों हेतु)',
    reportVersionFullDesc: 'आधिकारिक जांच हेतु आरोपी के सभी हैंडल, लिंक और भुगतान विवरण सुरक्षित रखता है।',
    reportVersionRedactedDesc: 'सहायता लेते समय आपकी पहचान सुरक्षित रखने हेतु व्यक्तिगत जानकारी को [REDACTED] से बदल देता है।',
    reportExportCopyBtn: 'क्लिपबोर्ड पर कॉपी करें',
    reportExportTxtBtn: 'टेक्स्ट फ़ाइल डाउनलोड करें (.txt)',
    reportExportPdfBtn: 'प्रिंट करें / PDF के रूप में सहेजें',
    reportCopiedToast: 'प्रारूप क्लिपबोर्ड पर कॉपी हो गया!',
    reportPlaceholderModalTitle: 'प्रारूप में शेष खाली स्थान',
    reportPlaceholderModalDesc: 'आपके प्रारूप में अभी भी कोष्ठक वाले खाली स्थान मौजूद हैं (जैसे {placeholders})। आप इसे अभी डाउनलोड करके बाद में हाथ से लिख सकती हैं, या वापस जाकर संपादन कर सकती हैं।',
    reportPlaceholderModalProceedBtn: 'फिर भी डाउनलोड / कॉपी करें',
    reportPlaceholderModalReviewBtn: 'वापस जाकर प्रारूप पूरा करें',
    reportWhereToSubmitTitle: 'अपनी शिकायत कहाँ और कैसे दर्ज कराएं',
    reportWhereToSubmitDesc: 'कवच शिकायत दर्ज नहीं करता। आप इसे आधिकारिक माध्यम से स्वयं दर्ज कराती हैं।',
    reportWhereToSubmitPortalLink: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल पर ऑनलाइन दर्ज कराएं (cybercrime.gov.in)',
    reportWhereToSubmitZeroFirLink: 'किसी भी पुलिस थाने में शून्य एफआईआर के अधिकार जानें',
    reportWhereToSubmitDisclaimer: 'कवच एक क्लाइंट-साइड शिकायत प्रारूप सहायक है। यह पुलिस रिपोर्ट दर्ज नहीं करता और न ही कानूनी प्रतिनिधित्व प्रदान करता है।',

    // Track Mode (Phase 5)
    reportProceedToTrackBtn: 'इस शिकायत को ट्रैकर में दर्ज करें',
    trackModeBadge: 'मोड 04 / ट्रैकिंग',
    trackModeTitle: 'शिकायत एवं समय सीमा ट्रैकर',
    trackModeSubtitle: 'दर्ज शिकायतें रिकॉर्ड करें, कानूनी समय सीमा की निगरानी करें और सुरक्षित कदम उठाएं',
    trackModeScopeDesc: 'cybercrime.gov.in, पुलिस थाने (FIR / Zero FIR) अथवा सोशल मीडिया पर दर्ज शिकायतों का रिकॉर्ड रखें। 24 घंटे और 72 घंटे की अनिवार्य निष्कासन समय सीमा की निगरानी करें।',
    trackPrivacyBanner: 'टैब मेमोरी गोपनीयता: आपके सभी संदर्भ नंबर, तारीखें और टिप्पणियां केवल आपके वर्तमान ब्राउज़र सत्र में रहती हैं। कोई भी जानकारी किसी सर्वर पर नहीं भेजी जाती।',
    trackZeroStorageNotice: 'डिवाइस पर कोई डेटा स्थायी रूप से नहीं रखा जाता। विंडो बंद करने से पहले अपना लेज़र या सारांश पत्र डाउनलोड कर लें।',
    trackAddRecordBtn: 'शिकायत रिकॉर्ड जोड़ें',
    trackStartTimerBtn: 'कानूनी टाइमर शुरू करें',
    trackSampleDataBtn: 'नमूने का रिकॉर्ड आज़माएं',
    trackSampleDataLoadedToast: 'नमूना ट्रैकिंग रिकॉर्ड एवं कानूनी टाइमर लोड किए गए!',
    trackExportBtn: 'लेज़र निर्यात करें',
    trackImportBtn: 'लेज़र आयात करें',
    trackClearBtn: 'लेज़र साफ करें',
    trackClearConfirmTitle: 'मेमोरी में सहेजे सभी रिकॉर्ड हटाएं?',
    trackClearConfirmDesc: 'यह मेमोरी में मौजूद सभी शिकायत रिकॉर्ड और टाइमर मिटा देगा। यदि आपने लेज़र निर्यात नहीं किया है, तो यह डेटा खो जाएगा।',
    trackConfirmClearBtn: 'हाँ, सब साफ करें',
    trackTimersSectionTitle: 'वैधानिक उल्टी गिनती टाइमर',
    trackTimersSectionSubtitle: 'आईटी नियम 2021 के अंतर्गत अनुस्मारक समय सीमाओं की निगरानी',
    trackNoTimersNotice: 'कोई सक्रिय टाइमर नहीं है। समय सीमा ट्रैक करने के लिए 24 घंटे का अंतरंग सामग्री निष्कासन टाइमर या शिकायत पावती टाइमर शुरू करें।',
    trackTimerActiveBadge: 'सक्रिय उल्टी गिनती',
    trackTimerWarningBadge: 'समय सीमा निकट (< 4 घंटे)',
    trackTimerExpiredBadge: 'वैधानिक समय सीमा समाप्त — आगे कदम उठाएं',
    trackTimerCompletedBadge: 'संपन्न / कार्रवाई पूरी',
    trackTimerRemaining: 'शेष समय',
    trackTimerHours: 'घंटे',
    trackTimerMinutes: 'मिनट',
    trackTimerSeconds: 'सेकंड',
    trackTimerOverdueBy: 'समय सीमा समाप्त हुए',
    trackTimerMarkResolvedBtn: 'पूर्ण चिह्नित करें',
    trackTimerEscalateBtn: 'अगले कानूनी कदम देखें',
    trackTimerDeleteBtn: 'टाइमर हटाएं',
    trackAddTimerModalTitle: 'नया कानूनी टाइमर शुरू करें',
    trackAddTimerSelectType: 'वैधानिक समय सीमा चुनें:',
    trackAddTimerPreset24h: '24 घंटे की अंतरंग सामग्री निष्कासन समय सीमा (नियम 3(2)(b))',
    trackAddTimerPreset24hNcii: '24 घंटे की अंतरंग सामग्री निष्कासन समय सीमा (नियम 3(2)(b))',
    trackAddTimerPreset24hAck: '24 घंटे की शिकायत पावती (नियम 3(2)(a))',
    trackAddTimerPreset72h: '72 घंटे की अन्य सामग्री निष्कासन समय सीमा',
    trackAddTimerPreset72hRemoval: '72 घंटे की अन्य सामग्री निष्कासन समय सीमा',
    trackAddTimerPreset15d: '15 दिन की पूर्ण शिकायत निस्तारण समय सीमा (नियम 3(2)(a))',
    trackAddTimerPresetCustom: 'कस्टम अनुस्मारक अवधि',
    trackTimerPersonalReminderNotice: 'कवच टाइमर एक व्यक्तिगत अनुस्मारक है, यह इस बात का प्रमाण नहीं है कि वैध शिकायत प्राप्त हुई थी।',
    trackTimerPlatformReceiptNotice: 'प्लेटफॉर्म द्वारा आपकी शिकायत प्राप्त करने के समय से',
    trackUnverifiedLegalBadge: 'कानूनी पेशेवर द्वारा अभी तक सत्यापित नहीं किया गया है। इस पर निर्भर रहने से पहले वर्तमान नियमों की जांच करें।',
    generalLegalNotice: 'कवच पर कानूनी जानकारी सामान्य है और अभी तक किसी वकील द्वारा इसकी समीक्षा नहीं की गई है। इस पर भरोसा करने से पहले सत्यापन करें।',
    clearEverythingNow: 'सब कुछ अभी मिटाएं',
    clearEverythingModalTitle: 'क्या आप सभी डेटा मिटाना चाहते हैं?',
    clearEverythingModalBody: 'यह इस ब्राउज़र टैब से सभी संरक्षित साक्ष्य, ट्रैकिंग रिकॉर्ड, शिकायत ड्राफ्ट और उत्तर तुरंत मिटा देगा। इसे पूर्ववत नहीं किया जा सकता है।',
    clearEverythingConfirmBtn: 'सब कुछ मिटाएं',
    clearEverythingSuccessToast: 'सभी डेटा पूरी तरह से मिटा दिया गया है।',
    demoRunBtn: 'काल्पनिक डेटा के साथ डेमो',
    demoBannerTitle: 'डेमो: काल्पनिक डेटा',
    demoBannerDesc: 'सभी मोड में काल्पनिक डेटा देख रहे हैं। कुछ भी सहेजा या भेजा नहीं जा रहा है।',
    demoExitBtn: 'डेमो से बाहर निकलें और डेटा मिटाएं',
    tourStartBtn: 'मार्गदर्शित टूर',
    tourModalTitle: 'कवच मार्गदर्शित टूर',
    tourStep1Title: 'त्वरित निकास एवं हेल्पलाइन',
    tourStep1Desc: 'किसी भी क्षण Esc दबाएं या लाल Quick Exit बटन पर क्लिक करके तुरंत इस साइट से बाहर निकलें। 24/7 आपातकालीन हेल्पलाइन (112, 181, 1930) फुटर में हमेशा उपलब्ध हैं।',
    tourStep2Title: 'द्विभाषी अंग्रेज़ी एवं हिंदी',
    tourStep2Desc: 'शीर्ष हेडर टॉगल से किसी भी समय अंग्रेज़ी और सरल, सहज हिंदी के बीच बदलें। सभी प्लेबुक, ड्राफ्ट और टूल्स 100% द्विभाषी हैं।',
    tourStep3Title: 'Respond: पहले घंटे का सुरक्षा प्लेबुक',
    tourStep3Desc: 'तात्कालिक खतरे का आकलन करें, 7 साइबर अपराध श्रेणियों में से चुनें, और क्या करें, क्या न करें तथा प्लेटफॉर्म सुरक्षा चेकलिस्ट प्राप्त करें।',
    tourStep4Title: 'Preserve: सुरक्षित साक्ष्य वॉल्ट',
    tourStep4Desc: 'फ़ाइलों को कहीं भी अपलोड किए बिना वेब क्रिप्टो एपीआई का उपयोग करके अपने ब्राउज़र में स्थानीय रूप से SHA-256 हैश तैयार करें और मैनिफेस्ट डाउनलोड करें।',
    tourStep5Title: 'Report: औपचारिक शिकायत एवं निष्कासन ड्राफ्टर',
    tourStep5Desc: 'व्यक्तिगत पहचान छिपाने के लिए क्लाइंट-साइड रिडक्शन के साथ, 7-भागों वाले पुलिस प्रारूप में शिकायत ड्राफ्ट तैयार करें।',
    tourStep6Title: 'Track: कानूनी समय सीमा एवं अनुवर्ती कदम',
    tourStep6Desc: 'शिकायत संदर्भ संख्या प्रबंधित करें, कानूनी समय सीमा (24 घंटे अंतरंग सामग्री निष्कासन, 72 घंटे अन्य सामग्री) ट्रैक करें, और पोर्टेबल लेज़र निर्यात करें।',
    tourNextBtn: 'आगे',
    tourPrevBtn: 'पीछे',
    tourFinishBtn: 'समझ गए',
    tourSkipBtn: 'टूर छोड़ें',
    trackAddTimerLinkRecord: 'किसी दर्ज शिकायत से जोड़ें (वैकल्पिक):',
    trackAddTimerNoRecordLink: 'कोई नहीं (स्वतंत्र टाइमर)',
    trackAddTimerCustomHoursLabel: 'अवधि (घंटों में):',
    trackAddTimerCustomTitleLabel: 'अनुस्मारक का नाम:',
    trackAddTimerSubmitBtn: 'टाइमर शुरू करें',
    trackAddTimerCancelBtn: 'रद्द करें',
    trackLedgerSectionTitle: 'शिकायत पंजीकरण लेज़र',
    trackLedgerSectionSubtitle: 'पुलिस, साइबर सेल, सोशल मीडिया और NCW में दर्ज शिकायतों का इन-मेमोरी रिकॉर्ड',
    trackFilterAll: 'सभी रिकॉर्ड',
    trackFilterSubmitted: 'दर्ज',
    trackFilterUnderInvestigation: 'जांच जारी',
    trackFilterActionTaken: 'कार्रवाई संपन्न / बंद',
    trackSearchPlaceholder: 'संदर्भ नंबर, संस्था या टिप्पणी से खोजें...',
    trackNoRecordsNotice: 'इस सत्र में अभी कोई शिकायत दर्ज नहीं है। शुरू करने के लिए "शिकायत रिकॉर्ड जोड़ें" या "नमूने का रिकॉर्ड आज़माएं" पर क्लिक करें।',
    trackRefNumberLabel: 'संदर्भ / पावती संख्या:',
    trackSubmissionTypeLabel: 'संस्था / माध्यम:',
    trackSubmittedDateLabel: 'दर्ज करने की तारीख:',
    trackStatusLabel: 'वर्तमान स्थिति:',
    trackOfficerLabel: 'जांच अधिकारी / प्रभारी:',
    trackContactLabel: 'अधिकारी संपर्क:',
    trackNotesLabel: 'अनुवर्ती डायरी एवं विवरण:',
    trackAddNoteBtn: 'टिप्पणी जोड़ें',
    trackAddNotePlaceholder: 'नई दिनांकित टिप्पणी लिखें (जैसे IO को फोन किया, साइबर सेल गए, टिकट मिला)...',
    trackSaveNoteBtn: 'टिप्पणी सहेजें',
    trackDeleteRecordBtn: 'रिकॉर्ड हटाएं',
    trackEditRecordBtn: 'विवरण बदलें',
    trackCopiedRefToast: 'संदर्भ संख्या क्लिपबोर्ड पर कॉपी हो गई!',
    trackStatusDrafted: 'प्रारूप तैयार',
    trackStatusSubmitted: 'दर्ज किया गया',
    trackStatusAcknowledged: 'पावती प्राप्त',
    trackStatusUnderInvestigation: 'जांच जारी',
    trackStatusContentRemoved: 'सामग्री हटाई गई / कार्रवाई संपन्न',
    trackStatusEscalated: 'आगे भेजा गया',
    trackStatusClosed: 'बंद / FIR दर्ज',
    trackAuthNcrp: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (NCRP)',
    trackAuthPolice: 'पुलिस थाना / साइबर अपराध थाना',
    trackAuthPlatform: 'सोशल मीडिया शिकायत अधिकारी',
    trackAuthNcw: 'राष्ट्रीय महिला आयोग (NCW)',
    trackAuthGac: 'शिकायत अपीलीय समिति (GAC)',
    trackAuthOther: 'अन्य प्राधिकरण / न्यायालय',
    trackRecordModalAddTitle: 'नया शिकायत रिकॉर्ड जोड़ें',
    trackRecordModalEditTitle: 'शिकायत रिकॉर्ड संपादित करें',
    trackRecordModalAuthorityLabel: 'शिकायत दर्ज करने का माध्यम:',
    trackRecordModalTitleLabel: 'थाने या प्लेटफॉर्म का नाम:',
    trackRecordModalTitlePlaceholder: 'जैसे नई दिल्ली साइबर थाना या Instagram Grievance Office',
    trackRecordModalRefLabel: 'पावती / FIR / शिकायत टिकट संख्या:',
    trackRecordModalRefPlaceholder: 'जैसे 2026/NCRP/984210, FIR 42/2026, या META-GRV-84920',
    trackRecordModalDateLabel: 'दर्ज करने की तारीख एवं समय:',
    trackRecordModalStatusLabel: 'वर्तमान स्थिति:',
    trackRecordModalOfficerLabel: 'जांच अधिकारी या संपर्क व्यक्ति (वैकल्पिक):',
    trackRecordModalOfficerPlaceholder: 'जैसे इंस्पेक्टर आर. शर्मा या सपोर्ट विशेषज्ञ',
    trackRecordModalContactLabel: 'अधिकारी का फोन या ईमेल (वैकल्पिक):',
    trackRecordModalContactPlaceholder: 'जैसे cybercell@delhipolice.gov.in या 011-23456789',
    trackRecordModalCategoryLabel: 'घटना की श्रेणी:',
    trackRecordModalNotesLabel: 'प्रारंभिक टिप्पणी या विवरण:',
    trackRecordModalNotesPlaceholder: 'जैसे SHA-256 हैश के साथ लिखित शिकायत दी; अधिकारी ने 48 घंटे में जांच का आश्वासन दिया।',
    trackRecordModalSaveBtn: 'मेमोरी में सहेजें',
    trackRecordModalCancelBtn: 'रद्द करें',
    trackEscalationSectionTitle: 'वैधानिक अनुवर्ती एवं अपील मार्गदर्शन',
    trackEscalationSectionSubtitle: 'जब प्लेटफॉर्म सामग्री न हटाए या पुलिस शिकायत न ले, तब उठाए जाने वाले कानूनी कदम',
    trackEscalationViewStepsBtn: 'कदम एवं नोटिस प्रारूप देखें',
    trackEscalationCopyNoticeBtn: 'अपील नोटिस कॉपी करें',
    trackEscalationNoticeCopiedToast: 'अपील नोटिस क्लिपबोर्ड पर कॉपी हो गया!',
    trackEscalationCloseBtn: 'मार्गदर्शन बंद करें',
    trackExportModalTitle: 'ट्रैकिंग लेज़र एवं सारांश निर्यात',
    trackExportJsonBtn: 'संरचित JSON फ़ाइल डाउनलोड करें (.json)',
    trackExportJsonDesc: 'पूरे लेज़र और टाइमर को एक सुरक्षित फ़ाइल के रूप में सहेजें जिसे आप बाद में बिना सर्वर के पुनः लोड कर सकती हैं।',
    trackExportTxtBtn: 'टेक्स्ट सारांश डाउनलोड करें (.txt)',
    trackExportTxtDesc: 'सभी संदर्भ नंबरों, तारीखों, अधिकारी विवरण और टाइमर की पढ़ने योग्य सरल फ़ाइल।',
    trackExportPdfBtn: 'प्रिंट करें / PDF के रूप में सहेजें',
    trackExportPdfDesc: 'पुलिस थाने या अधिवक्ता के पास ले जाने हेतु तैयार संरचित सारांश पत्र।',
    trackImportModalTitle: 'पहले सहेजा गया लेज़र आयात करें',
    trackImportModalDesc: 'अपने पिछले सत्र का kavach-tracking-ledger-*.json फ़ाइल चुनें ताकि मेमोरी में आपके रिकॉर्ड और टाइमर बहाल हो सकें।',
    trackImportUploadBtn: 'JSON फ़ाइल चुनें',
    trackImportSuccessToast: 'ट्रैकिंग रिकॉर्ड एवं टाइमर मेमोरी में सफलतापूर्वक बहाल हो गए!',
    trackImportErrorToast: 'आयात विफल: अमान्य या दूषित JSON फ़ाइल।',
  },
};
