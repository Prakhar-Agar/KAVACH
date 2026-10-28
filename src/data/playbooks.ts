/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Incident Playbooks Data Store
 * All guidance is rule-based, deterministic, and fully bilingual (English & Hindi).
 * Contains no external AI or server dependencies.
 */

export type CategoryKey =
  | 'blackmail'
  | 'ncii_threat'
  | 'impersonation'
  | 'stalking'
  | 'harassment'
  | 'account_compromise'
  | 'not_sure';

export interface BilingualText {
  en: string;
  hi: string;
}

export interface CategoryDefinition {
  key: CategoryKey;
  title: BilingualText;
  description: BilingualText;
  iconName: string;
}

export interface FollowUpQuestion {
  id: string;
  question: BilingualText;
  hint?: BilingualText;
  options: {
    id: string;
    label: BilingualText;
  }[];
}

export interface PlaybookItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  actionUrl?: string;
  actionRoute?: string;
  actionLabel?: BilingualText;
}

export interface PlatformLockdownGuide {
  platform: string;
  note: BilingualText;
  officialHelpUrl: string;
  steps: {
    title: BilingualText;
    detail: BilingualText;
  }[];
}

export interface Playbook {
  category: CategoryKey;
  summary: BilingualText;
  doNow: PlaybookItem[];
  doNotDo: PlaybookItem[];
  whenReady: PlaybookItem[];
  relevantLockdowns: string[]; // platform names: 'whatsapp' | 'instagram' | 'telegram' | 'google'
}

export const PLAYBOOK_METADATA = {
  lastReviewed: {
    en: 'October 2026',
    hi: 'अक्टूबर 2026',
  },
  disclaimer: {
    en: 'Guidance is general information, not legal advice. Verify with official sources.',
    hi: 'यह मार्गदर्शन केवल सामान्य जानकारी है, कानूनी सलाह नहीं। आधिकारिक स्रोतों से पुष्टि अवश्य करें।',
  },
  memoryNotice: {
    en: 'Your answers are not saved or sent anywhere. Closing this page clears them.',
    hi: 'आपके उत्तर कहीं भी सहेजे या भेजे नहीं जाते हैं। इस पृष्ठ को बंद करने पर वे मिट जाते हैं।',
  },
};

export const CATEGORIES: CategoryDefinition[] = [
  {
    key: 'blackmail',
    title: {
      en: 'Blackmail / Sextortion',
      hi: 'ब्लैकमेल या सेक्स्टॉर्शन (Sextortion)',
    },
    description: {
      en: 'Someone is threatening to share private images, chats, or videos unless you pay money or follow their demands.',
      hi: 'कोई व्यक्ति पैसे माँगने या अपनी बात मनवाने के लिए आपकी निजी तस्वीरें, चैट या वीडियो सार्वजनिक करने की धमकी दे रहा है।',
    },
    iconName: 'ShieldAlert',
  },
  {
    key: 'ncii_threat',
    title: {
      en: 'Intimate Image or Deepfake Shared / Threatened',
      hi: 'निजी तस्वीर या डीपफेक (Deepfake) साझा होना या धमकी',
    },
    description: {
      en: 'A non-consensual real image, morphed photo, or AI deepfake has been posted online or you are being threatened with it.',
      hi: 'आपकी सहमति के बिना कोई असली तस्वीर, एडिटेड फ़ोटो या AI डीपफेक इंटरनेट पर डाल दिया गया है या डालने की धमकी दी गई है।',
    },
    iconName: 'CameraOff',
  },
  {
    key: 'impersonation',
    title: {
      en: 'Fake Profile / Impersonation',
      hi: 'फ़र्ज़ी प्रोफ़ाइल या पहचान की चोरी (Impersonation)',
    },
    description: {
      en: 'Someone has created an account in your name, using your pictures or contact information to deceive or defame you.',
      hi: 'किसी ने आपके नाम, तस्वीरों या फ़ोन नंबर का इस्तेमाल करके फ़र्ज़ी खाता बनाया है ताकि आपको बदनाम किया जा सके।',
    },
    iconName: 'UserX',
  },
  {
    key: 'stalking',
    title: {
      en: 'Cyber-Stalking or Persistent Threats',
      hi: 'साइबर-स्टॉकिंग या लगातार धमकियाँ (Cyber-Stalking)',
    },
    description: {
      en: 'Someone is persistently monitoring your digital activity, sending repeated threatening messages, or tracking your location.',
      hi: 'कोई व्यक्ति लगातार आपके ऑनलाइन खातों पर नज़र रख रहा है, बार-बार डराने वाले संदेश भेज रहा है या आपकी लोकेशन ट्रैक कर रहा है।',
    },
    iconName: 'Eye',
  },
  {
    key: 'harassment',
    title: {
      en: 'Harassment or Abusive Messages',
      hi: 'ऑनलाइन प्रताड़ना या अभद्र संदेश (Harassment)',
    },
    description: {
      en: 'Receiving vulgar, insulting, or abusive comments, direct messages, or coordinated trolling across social platforms.',
      hi: 'सोशल मीडिया पर अश्लील, अपमानजनक संदेश, गालियाँ या संगठित रूप से परेशान करने वाली टिप्पणियाँ मिलना।',
    },
    iconName: 'MessageSquareWarning',
  },
  {
    key: 'account_compromise',
    title: {
      en: 'Someone Got Into My Account',
      hi: 'खाता हैक होना या अनाधिकृत लॉगिन (Hacked Account)',
    },
    description: {
      en: 'Unfamiliar login notices, changed passwords, unapproved messages sent from your profile, or locked out of your account.',
      hi: 'अनजान डिवाइस से लॉगिन की सूचना, बदला हुआ पासवर्ड, आपकी प्रोफ़ाइल से अनचाहे संदेश जाना या खाते से बाहर हो जाना।',
    },
    iconName: 'KeyRound',
  },
  {
    key: 'not_sure',
    title: {
      en: "I'm Not Sure",
      hi: 'मुझे ठीक से समझ नहीं आ रहा (मार्गदर्शन चाहिए)',
    },
    description: {
      en: "Something feels unsafe or uncomfortable online, but you aren't sure which category applies to your situation.",
      hi: 'इंटरनेट पर कुछ गलत या असुरक्षित महसूस हो रहा है, लेकिन समझ नहीं आ रहा कि यह किस श्रेणी में आता है।',
    },
    iconName: 'HelpCircle',
  },
];

export const CATEGORY_FOLLOW_UPS: Record<CategoryKey, FollowUpQuestion[]> = {
  blackmail: [
    {
      id: 'money_demanded',
      question: {
        en: 'Has the person demanded money, gift cards, or UPI payments?',
        hi: 'क्या उस व्यक्ति ने पैसे, गिफ्ट कार्ड या UPI के ज़रिए भुगतान की माँग की है?',
      },
      hint: {
        en: 'Paying money rarely stops extortion; perpetrators almost always demand more.',
        hi: 'पैसे देने से ब्लैकमेल रुकता नहीं है; वे आमतौर पर और अधिक पैसे माँगने लगते हैं।',
      },
      options: [
        { id: 'yes', label: { en: 'Yes, money was demanded', hi: 'हाँ, पैसे माँगे गए हैं' } },
        { id: 'no', label: { en: 'No, they demanded other things or obedience', hi: 'नहीं, अन्य बातें या दबाव डाला गया है' } },
        { id: 'unsure', label: { en: 'Not sure / Prefer not to say', hi: 'निश्चित नहीं / नहीं बताना चाहते' } },
      ],
    },
    {
      id: 'content_spread',
      question: {
        en: 'To your knowledge, has any content already been shared publicly or with your contacts?',
        hi: 'आपकी जानकारी में, क्या कोई सामग्री पहले ही सार्वजनिक कर दी गई है या आपके परिचितों को भेजी गई है?',
      },
      options: [
        { id: 'already_shared', label: { en: 'Yes, it has been shared already', hi: 'हाँ, पहले ही साझा कर दी गई है' } },
        { id: 'threat_only', label: { en: 'No, so far it is only a threat', hi: 'नहीं, अभी केवल धमकी दी गई है' } },
        { id: 'unsure', label: { en: 'I am not sure', hi: 'मुझे पक्का पता नहीं है' } },
      ],
    },
  ],
  ncii_threat: [
    {
      id: 'platform_visible',
      question: {
        en: 'Do you have a live link or visible post of the content online?',
        hi: 'क्या आपके पास उस सामग्री का इंटरनेट लिंक (URL) या पोस्ट उपलब्ध है?',
      },
      hint: {
        en: 'Save the exact profile link and post URL before taking any other action.',
        hi: 'कोई भी कदम उठाने से पहले प्रोफ़ाइल का सीधा लिंक और पोस्ट का URL सुरक्षित रख लें।',
      },
      options: [
        { id: 'yes_url', label: { en: 'Yes, I know the exact link / account', hi: 'हाँ, मेरे पास सीधा लिंक या खाता है' } },
        { id: 'no_url', label: { en: 'No, only saw screenshots or messages', hi: 'नहीं, केवल स्क्रीनशॉट या संदेश देखे हैं' } },
        { id: 'unsure', label: { en: 'I am not sure', hi: 'मुझे पक्का पता नहीं है' } },
      ],
    },
    {
      id: 'is_morphed',
      question: {
        en: 'Is the image an authentic photograph, or an AI-generated deepfake / morphed edit?',
        hi: 'क्या यह असली तस्वीर है, अथवा AI द्वारा निर्मित डीपफेक या एडिटेड तस्वीर है?',
      },
      options: [
        { id: 'morphed', label: { en: 'Morphed / AI Deepfake edit', hi: 'एडिटेड या AI डीपफेक (Deepfake)' } },
        { id: 'authentic', label: { en: 'Authentic private image', hi: 'वास्तविक निजी तस्वीर' } },
        { id: 'unsure', label: { en: 'I am not sure', hi: 'मुझे पक्का पता नहीं है' } },
      ],
    },
  ],
  impersonation: [
    {
      id: 'account_access_imp',
      question: {
        en: 'Is the fake profile contacting your friends, family, or colleagues?',
        hi: 'क्या वह फ़र्ज़ी खाता आपके दोस्तों, परिवार या सहयोगियों से संपर्क कर रहा है?',
      },
      options: [
        { id: 'contacting_others', label: { en: 'Yes, sending messages to my contacts', hi: 'हाँ, मेरे परिचितों को संदेश भेज रहा है' } },
        { id: 'passive', label: { en: 'No, but the profile is publicly visible', hi: 'नहीं, लेकिन प्रोफ़ाइल सार्वजनिक रूप से दिख रही है' } },
        { id: 'unsure', label: { en: 'I do not know yet', hi: 'मुझे अभी जानकारी नहीं है' } },
      ],
    },
  ],
  stalking: [
    {
      id: 'offline_risk',
      question: {
        en: 'Has the person referenced your real-time physical location, daily routine, or workplace?',
        hi: 'क्या उस व्यक्ति ने आपकी वास्तविक लोकेशन, दैनिक दिनचर्या या कार्यस्थल का ज़िक्र किया है?',
      },
      hint: {
        en: 'If there is any possibility of physical tracking, prioritize your immediate physical safety first.',
        hi: 'यदि शारीरिक रूप से पीछा किए जाने का अंदेशा हो, तो अपनी तात्कालिक सुरक्षा को प्राथमिकता दें।',
      },
      options: [
        { id: 'knows_location', label: { en: 'Yes, they know where I am or my schedule', hi: 'हाँ, उन्हें मेरी जगह या दिनचर्या का पता है' } },
        { id: 'online_only', label: { en: 'No, contact has remained purely online so far', hi: 'नहीं, अब तक केवल ऑनलाइन माध्यम से ही संपर्क है' } },
        { id: 'unsure', label: { en: 'I am not sure', hi: 'मुझे पक्का पता नहीं है' } },
      ],
    },
  ],
  harassment: [
    {
      id: 'known_perpetrator',
      question: {
        en: 'Is the harassment coming from someone you recognize, or an anonymous account?',
        hi: 'क्या यह प्रताड़ना किसी जाने-पहचाने व्यक्ति से आ रही है, या किसी अज्ञात खाते से?',
      },
      options: [
        { id: 'anonymous', label: { en: 'Anonymous / Unknown person', hi: 'अज्ञात व्यक्ति (Anonymous)' } },
        { id: 'known', label: { en: 'Someone I know or suspect in real life', hi: 'कोई परिचित या जिस पर संदेह है' } },
        { id: 'multiple', label: { en: 'Multiple coordinated accounts / Group', hi: 'कई खाते मिलकर ऐसा कर रहे हैं' } },
      ],
    },
  ],
  account_compromise: [
    {
      id: 'still_logged_in',
      question: {
        en: 'Can you still log in to your account right now on at least one device?',
        hi: 'क्या आप अभी भी किसी एक फ़ोन या कंप्यूटर पर अपने खाते में लॉगिन कर पा रहे हैं?',
      },
      options: [
        { id: 'yes_logged_in', label: { en: 'Yes, I am still logged in', hi: 'हाँ, मैं अभी भी लॉगिन हूँ' } },
        { id: 'locked_out', label: { en: 'No, password changed / locked out', hi: 'नहीं, पासवर्ड बदल दिया गया है / बाहर कर दिया गया है' } },
        { id: 'unsure', label: { en: 'Not sure', hi: 'निश्चित नहीं' } },
      ],
    },
  ],
  not_sure: [
    {
      id: 'primary_concern',
      question: {
        en: 'What is causing you the most stress or worry right now?',
        hi: 'इस समय आपको सबसे अधिक चिंता या परेशानी किस बात से हो रही है?',
      },
      options: [
        { id: 'threats_stress', label: { en: 'Threats or fear of private photos leaking', hi: 'धमकियाँ या निजी तस्वीरें सामने आने का डर' } },
        { id: 'account_stress', label: { en: 'Someone spying on or controlling my accounts', hi: 'खातों में किसी की अनचाही निगरानी या दखल' } },
        { id: 'messages_stress', label: { en: 'Disturbing messages or unwanted calls', hi: 'डराने वाले संदेश या अनचाहे कॉल' } },
      ],
    },
  ],
};

export const PLATFORM_LOCKDOWNS: Record<string, PlatformLockdownGuide> = {
  whatsapp: {
    platform: 'WhatsApp',
    note: {
      en: "Menu names change. Check the platform's own help page for the latest steps.",
      hi: 'मेन्यू के नाम बदल सकते हैं। ताज़ा जानकारी के लिए प्लेटफॉर्म के सहायता पृष्ठ को देखें।',
    },
    officialHelpUrl: 'https://faq.whatsapp.com',
    steps: [
      {
        title: {
          en: 'Turn on Two-Step Verification',
          hi: 'टू-स्टेप वेरिफिकेशन (Two-Step Verification) चालू करें',
        },
        detail: {
          en: 'Open WhatsApp Settings > Account > Two-Step Verification > Turn On. Choose a 6-digit PIN only you know and add a recovery email.',
          hi: 'WhatsApp सेटिंग्स > अकाउंट > टू-स्टेप वेरिफिकेशन > चालू करें। 6 अंकों का ऐसा पिन चुनें जो सिर्फ़ आपको पता हो और अपना ईमेल जोड़ें।',
        },
      },
      {
        title: {
          en: 'Log out of all unknown Linked Devices',
          hi: 'अज्ञात लिंक किए गए उपकरणों (Linked Devices) से लॉग आउट करें',
        },
        detail: {
          en: 'Go to Settings > Linked Devices. Review the list of active sessions. If you see any browser or device you do not recognize, tap it and select Log Out.',
          hi: 'सेटिंग्स > लिंक किए गए उपकरण (Linked Devices) में जाएँ। यदि कोई अनजान कंप्यूटर या ब्राउज़र दिखे, तो तुरंत "लॉग आउट" चुनें।',
        },
      },
      {
        title: {
          en: 'Lock Down Privacy Settings',
          hi: 'प्राइवेसी सेटिंग्स को सुरक्षित करें',
        },
        detail: {
          en: 'Go to Settings > Privacy. Change Last Seen, Profile Photo, About, and Groups to "My Contacts" or "Nobody" to prevent unknown harassers from inspecting your details.',
          hi: 'सेटिंग्स > प्राइवेसी में जाएँ। लास्ट सीन, प्रोफ़ाइल फ़ोटो और ग्रुप में जोड़ने की अनुमति को "मेरे संपर्क" (My Contacts) पर सेट करें।',
        },
      },
    ],
  },
  instagram: {
    platform: 'Instagram',
    note: {
      en: "Menu names change. Check the platform's own help page for the latest steps.",
      hi: 'मेन्यू के नाम बदल सकते हैं। ताज़ा जानकारी के लिए प्लेटफॉर्म के सहायता पृष्ठ को देखें।',
    },
    officialHelpUrl: 'https://help.instagram.com',
    steps: [
      {
        title: {
          en: 'Change Password & Log Out Other Devices',
          hi: 'पासवर्ड बदलें और अन्य उपकरणों से लॉग आउट करें',
        },
        detail: {
          en: 'Go to Settings > Accounts Center > Password and Security > Change Password. Check "Log out of other devices" so unauthorized users are evicted immediately.',
          hi: 'सेटिंग्स > अकाउंट सेंटर > पासवर्ड और सुरक्षा > पासवर्ड बदलें पर जाएँ। "अन्य सभी उपकरणों से लॉग आउट करें" का विकल्प चुनें।',
        },
      },
      {
        title: {
          en: 'Enable Two-Factor Authentication (2FA)',
          hi: 'टू-फ़ैक्टर ऑथेंटिकेशन (2FA) चालू करें',
        },
        detail: {
          en: 'Accounts Center > Password and Security > Two-Factor Authentication. Use an Authenticator App (like Google Authenticator) or SMS codes.',
          hi: 'पासवर्ड और सुरक्षा > टू-फ़ैक्टर ऑथेंटिकेशन में जाएँ और SMS अथवा ऑथेंटिकेटर ऐप के ज़रिए इसे सक्रिय करें।',
        },
      },
      {
        title: {
          en: 'Review Login Activity',
          hi: 'लॉगिन गतिविधि (Login Activity) की जाँच करें',
        },
        detail: {
          en: 'Accounts Center > Password and Security > Where you\'re logged in. Evict any location or device you do not recognize.',
          hi: 'आप कहाँ लॉगिन हैं (Where you are logged in) में जाकर अनजान शहरों या उपकरणों को तुरंत हटाएँ।',
        },
      },
    ],
  },
  telegram: {
    platform: 'Telegram',
    note: {
      en: "Menu names change. Check the platform's own help page for the latest steps.",
      hi: 'मेन्यू के नाम बदल सकते हैं। ताज़ा जानकारी के लिए प्लेटफॉर्म के सहायता पृष्ठ को देखें।',
    },
    officialHelpUrl: 'https://telegram.org/faq',
    steps: [
      {
        title: {
          en: 'Terminate All Other Sessions',
          hi: 'अन्य सभी सत्र (Active Sessions) समाप्त करें',
        },
        detail: {
          en: 'Open Telegram Settings > Devices (or Privacy and Security > Active Sessions). Tap "Terminate all other sessions".',
          hi: 'Telegram सेटिंग्स > डिवाइसेस में जाएँ और "अन्य सभी सत्र समाप्त करें" (Terminate all other sessions) पर टैप करें।',
        },
      },
      {
        title: {
          en: 'Set Two-Step Cloud Password',
          hi: 'टू-स्टेप क्लाउड पासवर्ड सेट करें',
        },
        detail: {
          en: 'Settings > Privacy and Security > Two-Step Verification. Set an additional password required when logging in on new devices.',
          hi: 'सेटिंग्स > प्राइवेसी और सुरक्षा > टू-स्टेप वेरिफिकेशन में जाकर एक अतिरिक्त गुप्त पासवर्ड जोड़ें।',
        },
      },
      {
        title: {
          en: 'Hide Phone Number & Forwarded Messages',
          hi: 'फ़ोन नंबर और फ़ॉरवर्ड किए गए संदेशों को छिपाएँ',
        },
        detail: {
          en: 'Settings > Privacy and Security. Set "Phone Number" visibility to "Nobody" and "Who can find me by my number" to "My Contacts".',
          hi: 'प्राइवेसी और सुरक्षा में जाकर "फ़ोन नंबर" को "कोई नहीं" (Nobody) पर सेट करें ताकि अजनबी आपका नंबर न देख सकें।',
        },
      },
    ],
  },
  google: {
    platform: 'Google',
    note: {
      en: "Menu names change. Check the platform's own help page for the latest steps.",
      hi: 'मेन्यू के नाम बदल सकते हैं। ताज़ा जानकारी के लिए प्लेटफॉर्म के सहायता पृष्ठ को देखें।',
    },
    officialHelpUrl: 'https://support.google.com/accounts',
    steps: [
      {
        title: {
          en: 'Perform Google Security Checkup',
          hi: 'Google सुरक्षा जाँच (Security Checkup) करें',
        },
        detail: {
          en: 'Visit myaccount.google.com/security. Change your password to a strong phrase with 14+ characters.',
          hi: 'myaccount.google.com/security पर जाएँ और अपना मुख्य पासवर्ड बदलें।',
        },
      },
      {
        title: {
          en: 'Review Signed-In Devices',
          hi: 'साइन-इन किए गए उपकरणों की जाँच करें',
        },
        detail: {
          en: 'Under "Your devices", click "Manage all devices". Sign out of any unrecognized phone, laptop, or browser.',
          hi: '"आपके उपकरण" अनुभाग में जाकर सभी अज्ञात फ़ोनों या कंप्यूटरों से तुरंत साइन आउट करें।',
        },
      },
      {
        title: {
          en: 'Revoke Unknown Third-Party Apps',
          hi: 'अनजान ऐप्स की पहुँच समाप्त करें',
        },
        detail: {
          en: 'Under "Third-party apps with account access", remove any unknown or suspicious apps that can read your Gmail or Drive data.',
          hi: '"थर्ड-पार्टी ऐप्स" में जाकर उन सभी संदिग्ध ऐप्स को हटाएँ जिन्हें आपके खाते की अनुमति मिली हुई है।',
        },
      },
    ],
  },
};

export const PLAYBOOKS: Record<CategoryKey, Playbook> = {
  blackmail: {
    category: 'blackmail',
    summary: {
      en: 'Immediate containment plan for sextortion or digital blackmail. Protects your emotional clarity, prevents extortion escalation, and preserves evidence.',
      hi: 'ब्लैकमेल या सेक्स्टॉर्शन से निपटने की तात्कालिक कार्ययोजना। यह आपके साक्ष्य सुरक्षित रखती है और दबाव को रोकने में मदद करती है।',
    },
    doNow: [
      {
        id: 'stop_communication',
        title: {
          en: 'Do not respond, negotiate, or engage in arguments',
          hi: 'बातचीत, बहस या सौदेबाज़ी तुरंत बंद करें',
        },
        description: {
          en: 'Extortionists feed on emotional panic. Stop replying immediately. Silence limits their leverage.',
          hi: 'ब्लैकमेल करने वाले घबराहट का फ़ायदा उठाते हैं। तुरंत उत्तर देना बंद करें। मौन रहने से उनका दबाव कम होता है।',
        },
      },
      {
        id: 'do_not_pay',
        title: {
          en: 'Never send money or compromise further',
          hi: 'कभी भी पैसे न भेजें और न ही कोई नई फ़ोटो भेजें',
        },
        description: {
          en: 'Paying money confirms you are vulnerable and almost always causes demands to increase.',
          hi: 'पैसे देने से समस्या समाप्त नहीं होती बल्कि वे और अधिक पैसों की माँग करने लगते हैं।',
        },
      },
      {
        id: 'preserve_first',
        title: {
          en: 'Preserve evidence before blocking or deleting',
          hi: 'ब्लॉक करने या मिटाने से पहले साक्ष्य सहेजें',
        },
        description: {
          en: 'Take clear screenshots showing the full chat, username, phone number, payment ID, and timestamp. Do not crop.',
          hi: 'पूरी चैट, यूज़रनेम, फ़ोन नंबर, UPI/भुगतान आईडी और समय सहित स्पष्ट स्क्रीनशॉट लें। स्क्रीनशॉट को काटें (crop) नहीं।',
        },
        actionRoute: '/preserve',
        actionLabel: {
          en: 'Open Evidence Preserver',
          hi: 'साक्ष्य संचय (Preserve) खोलें',
        },
      },
      {
        id: 'lockdown_accounts',
        title: {
          en: 'Lock down social profiles and contact lists',
          hi: 'सोशल प्रोफ़ाइल और संपर्क सूची को तुरंत प्राइवेट करें',
        },
        description: {
          en: 'Set your Instagram and social accounts to Private. Hide your follower/following list so the blackmailer cannot inspect your friends.',
          hi: 'अपने सोशल मीडिया खातों को प्राइवेट करें ताकि ब्लैकमेलर आपके दोस्तों और परिजनों की सूची न देख सके।',
        },
      },
    ],
    doNotDo: [
      {
        id: 'dnd_delete_chat',
        title: {
          en: 'Do NOT delete chats, messages, or call logs',
          hi: 'चैट, धमकी भरे संदेश या कॉल हिस्ट्री न मिटाएँ',
        },
        description: {
          en: 'Deleting threatening messages destroys the primary legal evidence needed by the cyber police to trace the offender.',
          hi: 'संदेश मिटाने से साइबर पुलिस के लिए आरोपी तक पहुँचना मुश्किल हो जाता है। यह आपका सबसे मुख्य कानूनी सबूत है।',
        },
      },
      {
        id: 'dnd_send_media',
        title: {
          en: 'Do NOT send more images or apologies',
          hi: 'माफ़ी न माँगना और न ही कोई अन्य तस्वीर भेजना',
        },
        description: {
          en: 'Apologizing or negotiating gives the perpetrator more material to use against you.',
          hi: 'माफ़ी माँगने या अतिरिक्त तस्वीरें भेजने से आरोपी को और अधिक परेशान करने का अवसर मिलता है।',
        },
      },
    ],
    whenReady: [
      {
        id: 'report_portal',
        title: {
          en: 'File an official report on cybercrime.gov.in (1930)',
          hi: 'cybercrime.gov.in (1930) पर आधिकारिक शिकायत दर्ज करें',
        },
        description: {
          en: 'Report under the specialized "Report Crime Against Women / Child" section. This routes the complaint to your state Cyber Crime Cell.',
          hi: 'पोर्टल पर महिलाओं के विरुद्ध अपराध वाले अनुभाग में शिकायत दर्ज करें। यह शिकायत सीधे आपके राज्य के साइबर सेल को जाती है।',
        },
        actionUrl: 'https://cybercrime.gov.in',
        actionLabel: {
          en: 'Open Official Portal',
          hi: 'आधिकारिक पोर्टल खोलें',
        },
      },
      {
        id: 'draft_complaint',
        title: {
          en: 'Prepare a structured complaint draft',
          hi: 'औपचारिक कानूनी शिकायत का प्रारूप तैयार करें',
        },
        description: {
          en: 'Use Kavach to draft a ready-to-submit Hindi or English complaint citing Section 66E/67A IT Act and Section 77/78 BNS 2023.',
          hi: 'कवच की मदद से भारतीय कानूनों (IT Act एवं BNS) की धाराओं के साथ तैयार शिकायत प्रारूप प्राप्त करें।',
        },
        actionRoute: '/report',
        actionLabel: {
          en: 'Draft Complaint',
          hi: 'शिकायत प्रारूप तैयार करें',
        },
      },
    ],
    relevantLockdowns: ['whatsapp', 'instagram', 'google'],
  },
  ncii_threat: {
    category: 'ncii_threat',
    summary: {
      en: 'Triage plan for non-consensual intimate imagery (NCII) or morphed deepfakes. Focuses on rapid evidence capture and statutory 24-hour takedown rules.',
      hi: 'निजी तस्वीरों या मॉर्फ्ड डीपफेक के प्रसार को रोकने की कार्ययोजना। 24 घंटे की कानूनी समय-सीमा में सामग्री हटाने पर केंद्रित।',
    },
    doNow: [
      {
        id: 'capture_urls',
        title: {
          en: 'Record post URLs and profile links immediately',
          hi: 'पोस्ट का सीधा लिंक (URL) और प्रोफ़ाइल लिंक तुरंत सहेजें',
        },
        description: {
          en: 'Copy the direct browser link to the post, image, or group. Screenshots alone cannot always pinpoint the exact hosting server.',
          hi: 'उस पोस्ट, फ़ोटो या ग्रुप का सीधा लिंक कॉपी कर लें। केवल स्क्रीनशॉट से कभी-कभी मुख्य सर्वर का पता लगाना कठिन होता है।',
        },
      },
      {
        id: 'preserve_local',
        title: {
          en: 'Compute local evidence hashes in your browser',
          hi: 'अपने ब्राउज़र में स्थानीय साक्ष्य हैश तैयार करें',
        },
        description: {
          en: 'Save proof with exact timestamps and SHA-256 cryptographic digests so tampering cannot be claimed later.',
          hi: 'समय और SHA-256 क्रिप्टोग्राफ़िक हैश के साथ साक्ष्य सुरक्षित करें ताकि बाद में छेड़छाड़ का आरोप न लग सके।',
        },
        actionRoute: '/preserve',
        actionLabel: {
          en: 'Preserve Evidence',
          hi: 'साक्ष्य संचय (Preserve) खोलें',
        },
      },
      {
        id: 'statutory_takedown_notice',
        title: {
          en: 'Trigger the 24-hour intermediary takedown rule',
          hi: '24 घंटे के अंदर सामग्री हटाने के नियम (Rule 3(2)(b)) का उपयोग करें',
        },
        description: {
          en: 'Under Indian IT Rules 2021, platforms must remove non-consensual sexually explicit content within 24 hours of notification.',
          hi: 'भारतीय सूचना प्रौद्योगिकी नियमों के तहत सभी सोशल मीडिया प्लेटफॉर्म 24 घंटे के भीतर ऐसी सामग्री हटाने के लिए कानूनी रूप से बाध्य हैं।',
        },
      },
    ],
    doNotDo: [
      {
        id: 'dnd_share_further',
        title: {
          en: 'Do NOT circulate the image to friends or groups to ask for advice',
          hi: 'सलाह लेने के लिए उस तस्वीर को अन्य दोस्तों या ग्रुपों में न भेजें',
        },
        description: {
          en: 'Forwarding the intimate media further increases digital footprint and copies across messaging servers.',
          hi: 'तस्वीर को दूसरों को भेजने से वह अनजाने में और अधिक लोगों तक पहुँच सकती है।',
        },
      },
      {
        id: 'dnd_confront_publicly',
        title: {
          en: 'Do NOT engage in public comment wars on the abusive post',
          hi: 'उस पोस्ट पर सार्वजनिक रूप से बहस या कमेंट न करें',
        },
        description: {
          en: 'Commenting increases platform engagement algorithms, drawing more visibility to the offensive post.',
          hi: 'कमेंट करने से सोशल मीडिया एल्गोरिदम उस पोस्ट को और अधिक लोगों को दिखाने लगता है।',
        },
      },
    ],
    whenReady: [
      {
        id: 'report_grievance_officer',
        title: {
          en: "Submit takedown notice to Platform Grievance Officer & 1930",
          hi: 'प्लेटफॉर्म के ग्रीवेंस ऑफिसर और 1930 पर रिपोर्ट दर्ज करें',
        },
        description: {
          en: 'Use the platform in-app reporting button (report as non-consensual imagery) and file a complaint on cybercrime.gov.in.',
          hi: 'ऐप में रिपोर्ट विकल्प का उपयोग करें और cybercrime.gov.in पर शिकायत दर्ज करें।',
        },
        actionUrl: 'https://cybercrime.gov.in',
        actionLabel: {
          en: 'File on Cybercrime Portal',
          hi: 'साइबर अपराध पोर्टल पर जाएँ',
        },
      },
      {
        id: 'track_deadlines',
        title: {
          en: 'Track statutory 24-hour takedown deadline in Kavach',
          hi: '24 घंटे की कानूनी समय-सीमा को ट्रैक करें',
        },
        description: {
          en: 'Record your submission timestamp to track platform compliance deadlines.',
          hi: 'अपनी शिकायत दर्ज करने का समय कवच में नोट करें ताकि समय-सीमा पर नज़र रखी जा सके।',
        },
        actionRoute: '/track',
        actionLabel: {
          en: 'Track Report Deadlines',
          hi: 'समय-सीमा ट्रैक करें',
        },
      },
    ],
    relevantLockdowns: ['instagram', 'whatsapp', 'telegram'],
  },
  impersonation: {
    category: 'impersonation',
    summary: {
      en: 'Containment plan for fake profiles, stolen pictures, and identity spoofing. Focuses on proving original ownership and rapid platform reporting.',
      hi: 'फ़र्ज़ी प्रोफ़ाइल और पहचान की चोरी से निपटने की कार्ययोजना। मूल पहचान साबित करने और खाता बंद कराने पर केंद्रित।',
    },
    doNow: [
      {
        id: 'warn_contacts',
        title: {
          en: 'Alert your inner circle with a short, neutral statement',
          hi: 'एक संक्षिप्त संदेश के ज़रिए अपने परिचितों को सावधान करें',
        },
        description: {
          en: 'Post a story or status: "Someone has created a fake profile using my photos. Do not accept requests or send money." Do not link directly to the fake profile.',
          hi: 'अपने स्टेटस पर लिखें: "किसी ने मेरी फ़ोटो से फ़र्ज़ी खाता बनाया है। कोई अनुरोध स्वीकार न करें।" फ़र्ज़ी खाते का सीधा लिंक न डालें।',
        },
      },
      {
        id: 'preserve_fake_profile',
        title: {
          en: 'Capture exact profile URL and bio details',
          hi: 'फ़र्ज़ी प्रोफ़ाइल का सही URL और विवरण सहेजें',
        },
        description: {
          en: 'Copy the permanent profile link (e.g. instagram.com/handle) and screenshot the bio, picture, and any posts.',
          hi: 'फ़र्ज़ी खाते का मुख्य वेब लिंक कॉपी करें और उसकी बायो व फ़ोटो का स्क्रीनशॉट लेकर रखें।',
        },
        actionRoute: '/preserve',
        actionLabel: {
          en: 'Preserve Evidence',
          hi: 'साक्ष्य संचय (Preserve) खोलें',
        },
      },
    ],
    doNotDo: [
      {
        id: 'dnd_message_fake_account',
        title: {
          en: 'Do NOT message the fake account to plead or argue',
          hi: 'फ़र्ज़ी खाते पर विनती करने या बहस करने के लिए संदेश न भेजें',
        },
        description: {
          en: 'Confronting the imposter often prompts them to block you, making it harder for you to gather proof.',
          hi: 'बहस करने से आरोपी आपको ब्लॉक कर सकता है, जिससे आपके लिए सबूत जुटाना कठिन हो जाएगा।',
        },
      },
    ],
    whenReady: [
      {
        id: 'report_impersonation',
        title: {
          en: 'Report for Impersonation via the platform help center',
          hi: 'प्लेटफॉर्म पर पहचान की चोरी (Impersonation) की रिपोर्ट करें',
        },
        description: {
          en: 'Use the official reporting flow ("They are pretending to be me"). Platforms typically require a government ID upload to verify your real identity.',
          hi: 'प्लेटफॉर्म के "यह मेरी पहचान चुरा रहे हैं" विकल्प से रिपोर्ट करें। इसके लिए वे आपकी पहचान की पुष्टि माँग सकते हैं।',
        },
      },
      {
        id: 'draft_bns_complaint',
        title: {
          en: 'Draft formal complaint under Section 66D IT Act (Cheating by Impersonation)',
          hi: 'IT Act की धारा 66D (पहचान चुराकर धोखाधड़ी) के तहत शिकायत तैयार करें',
        },
        description: {
          en: 'Generate a structured grievance for local police stations and the National Cyber Crime Portal.',
          hi: 'कवच की मदद से स्थानीय पुलिस और राष्ट्रीय पोर्टल के लिए औपचारिक शिकायत तैयार करें।',
        },
        actionRoute: '/report',
        actionLabel: {
          en: 'Draft Complaint',
          hi: 'शिकायत प्रारूप तैयार करें',
        },
      },
    ],
    relevantLockdowns: ['instagram', 'whatsapp'],
  },
  stalking: {
    category: 'stalking',
    summary: {
      en: 'Safety and evidentiary protocol for cyber-stalking and persistent digital harassment. Prioritizes physical safety and systematic tracking logs.',
      hi: 'साइबर-स्टॉकिंग और लगातार पीछा किए जाने के विरुद्ध सुरक्षा उपाय। शारीरिक सुरक्षा और सबूतों के व्यवस्थित रिकॉर्ड पर केंद्रित।',
    },
    doNow: [
      {
        id: 'review_location_sharing',
        title: {
          en: 'Disable location sharing across all apps and devices',
          hi: 'सभी ऐप्स और डिवाइस पर लोकेशन शेयरिंग तुरंत बंद करें',
        },
        description: {
          en: 'Check Google Maps (Location Sharing), Apple "Find My", Snapchat Snap Map, and WhatsApp live location. Ensure no background sharing is active.',
          hi: 'Google Maps, WhatsApp लाइव लोकेशन और अन्य ऐप्स में जाकर देखें कि आपकी लोकेशन किसी के साथ शेयर तो नहीं हो रही।',
        },
      },
      {
        id: 'maintain_incident_log',
        title: {
          en: 'Record a systematic log of every encounter',
          hi: 'हर घटना और संदेश की तारीख व समय का रिकॉर्ड रखें',
        },
        description: {
          en: 'Stalking requires establishing a pattern of persistent unwanted behavior. Screenshot every contact attempt without replying.',
          hi: 'स्टॉकिंग (Stalking) साबित करने के लिए लगातार किए गए प्रयासों का क्रम दिखाना होता है। बिना उत्तर दिए हर संदेश का स्क्रीनशॉट लें।',
        },
        actionRoute: '/preserve',
        actionLabel: {
          en: 'Preserve Evidence',
          hi: 'साक्ष्य संचय (Preserve) खोलें',
        },
      },
    ],
    doNotDo: [
      {
        id: 'dnd_isolate',
        title: {
          en: 'Do NOT keep this completely to yourself',
          hi: 'इस बात को पूरी तरह अपने तक सीमित न रखें',
        },
        description: {
          en: 'Inform a trusted friend, family member, or the 181 Women Helpline. Having a safety confidant reduces risk.',
          hi: 'किसी विश्वसनीय मित्र, परिजन या 181 महिला हेल्पलाइन को अवश्य सूचित करें। किसी का साथ होना आपकी सुरक्षा बढ़ाता है।',
        },
      },
    ],
    whenReady: [
      {
        id: 'police_zero_fir',
        title: {
          en: 'Approach nearest Cyber Cell or file a Zero-FIR (Section 78 BNS 2023)',
          hi: 'नजदीकी साइबर सेल में जाएँ या शून्य एफआईआर (Zero FIR) दर्ज कराएं',
        },
        description: {
          en: 'Section 78 of Bharatiya Nyaya Sanhita, 2023 specifically criminalizes monitoring the internet or electronic communications of a woman.',
          hi: 'BNS 2023 की धारा 78 के तहत किसी महिला की ऑनलाइन गतिविधियों पर लगातार नज़र रखना एक दंडनीय अपराध है।',
        },
        actionRoute: '/help',
        actionLabel: {
          en: 'View Legal Rights & Help',
          hi: 'कानूनी अधिकार एवं सहायता देखें',
        },
      },
    ],
    relevantLockdowns: ['google', 'whatsapp', 'instagram'],
  },
  harassment: {
    category: 'harassment',
    summary: {
      en: 'Containment plan for abusive messages, hate comments, or online threats. Establishes healthy boundaries while preserving actionable proof.',
      hi: 'अभद्र संदेशों, गालियों या ऑनलाइन प्रताड़ना से निपटने की कार्ययोजना। साक्ष्य सुरक्षित रखते हुए अवांछित तत्वों को दूर करना।',
    },
    doNow: [
      {
        id: 'capture_then_restrict',
        title: {
          en: 'Screenshot messages with full sender handles before blocking',
          hi: 'ब्लॉक करने से पहले भेजने वाले के हैंडल सहित पूरा स्क्रीनशॉट लें',
        },
        description: {
          en: 'Ensure the sender\'s username, profile photo, and full message text with timestamp are visible.',
          hi: 'स्क्रीनशॉट में भेजने वाले का यूज़रनेम, समय और पूरा संदेश स्पष्ट रूप से दिखना चाहिए।',
        },
        actionRoute: '/preserve',
        actionLabel: {
          en: 'Preserve Evidence',
          hi: 'साक्ष्य संचय (Preserve) खोलें',
        },
      },
      {
        id: 'use_platform_filters',
        title: {
          en: 'Enable Hidden Words and comment filtering tools',
          hi: 'छिपे हुए शब्द (Hidden Words) और कमेंट फ़िल्टर चालू करें',
        },
        description: {
          en: 'In Instagram/social settings, turn on "Hide offensive comments" and "Advanced comment filtering" to block abusive keywords automatically.',
          hi: 'सेटिंग्स में जाकर आपत्तिजनक शब्दों और अभद्र टिप्पणियों को अपने आप छिपाने वाले फ़िल्टर चालू करें।',
        },
      },
    ],
    doNotDo: [
      {
        id: 'dnd_engage_trolls',
        title: {
          en: 'Do NOT reply to abusive trolls or provoke escalation',
          hi: 'गालियाँ देने वालों को जवाब न दें और न ही उनसे उलझें',
        },
        description: {
          en: 'Abusers seek an emotional reaction. Denying them a response deprives them of attention and stops viral escalation.',
          hi: 'अभद्र व्यवहार करने वाले आपकी प्रतिक्रिया चाहते हैं। उत्तर न देने से उनका मनोबल टूटता है।',
        },
      },
    ],
    whenReady: [
      {
        id: 'report_platform_police',
        title: {
          en: 'Report user to platform and lodge complaint on cybercrime.gov.in',
          hi: 'प्लेटफॉर्म पर रिपोर्ट करें और cybercrime.gov.in पर शिकायत दर्ज करें',
        },
        description: {
          en: 'Persistent abuse violates Section 79 BNS 2023 (acts intended to insult the modesty of a woman) and Section 67 IT Act.',
          hi: 'लगातार अभद्र भाषा का प्रयोग BNS 2023 की धारा 79 और IT Act की धारा 67 के तहत दंडनीय है।',
        },
        actionRoute: '/report',
        actionLabel: {
          en: 'Draft Complaint',
          hi: 'शिकायत प्रारूप तैयार करें',
        },
      },
    ],
    relevantLockdowns: ['instagram', 'whatsapp'],
  },
  account_compromise: {
    category: 'account_compromise',
    summary: {
      en: 'Rapid recovery and security lockdown protocol for hacked, breached, or unauthorized accounts. Regains custody and prevents further identity theft.',
      hi: 'हैक या अनाधिकृत लॉगिन वाले खातों को तुरंत वापस पाने और सुरक्षित करने की कार्ययोजना।',
    },
    doNow: [
      {
        id: 'immediate_password_reset',
        title: {
          en: 'Change primary email password first from a secure device',
          hi: 'सबसे पहले अपने मुख्य ईमेल का पासवर्ड किसी सुरक्षित फ़ोन से बदलें',
        },
        description: {
          en: 'If an attacker has access to your recovery email, they can reset all your other social passwords. Secure your email account first.',
          hi: 'यदि हमलावर के पास आपके ईमेल की पहुँच है, तो वह अन्य सभी पासवर्ड बदल सकता है। सबसे पहले ईमेल सुरक्षित करें।',
        },
      },
      {
        id: 'evict_sessions',
        title: {
          en: 'Log out of all unknown active sessions and devices',
          hi: 'अन्य सभी अज्ञात सत्रों (Active Sessions) से लॉग आउट करें',
        },
        description: {
          en: 'In WhatsApp (Linked Devices), Instagram (Where you\'re logged in), or Google (Your Devices), terminate all sessions.',
          hi: 'सेटिंग्स में जाकर अनजान उपकरणों और कंप्यूटरों को तुरंत लॉग आउट करें।',
        },
      },
      {
        id: 'turn_on_2fa',
        title: {
          en: 'Activate Two-Factor Authentication (2FA) immediately',
          hi: 'टू-फ़ैक्टर ऑथेंटिकेशन (2FA) तुरंत चालू करें',
        },
        description: {
          en: 'Add an extra layer of protection using an authenticator app or SMS code so a password alone is not enough to log in.',
          hi: 'SMS या ऑथेंटिकेटर ऐप के ज़रिए 2FA चालू करें ताकि केवल पासवर्ड से कोई लॉगिन न कर सके।',
        },
      },
    ],
    doNotDo: [
      {
        id: 'dnd_click_recovery_links',
        title: {
          en: 'Do NOT click links in unsolicited "password reset" emails or SMS',
          hi: 'अनजान ईमेल या SMS में आए किसी भी लिंक पर क्लिक न करें',
        },
        description: {
          en: 'Phishing messages often imitate official security alerts to steal your new password. Navigate directly to the app or website settings.',
          hi: 'धोखेबाज़ अक्सर सुरक्षा अलर्ट जैसा दिखने वाला फ़र्ज़ी लिंक भेजते हैं। केवल सीधे ऐप की सेटिंग्स में जाकर ही पासवर्ड बदलें।',
        },
      },
    ],
    whenReady: [
      {
        id: 'account_recovery_appeal',
        title: {
          en: 'Submit an official account recovery request with platform support',
          hi: 'प्लेटफॉर्म सहायता केंद्र पर आधिकारिक खाता बहाली (Recovery) अनुरोध भेजें',
        },
        description: {
          en: 'If locked out, use the official recovery pages (e.g. instagram.com/hacked) to verify identity via selfie video or phone OTP.',
          hi: 'यदि आप खाते से बाहर हो चुके हैं, तो आधिकारिक रिकवरी पेज पर जाकर अपनी पहचान सत्यापित करें।',
        },
        actionUrl: 'https://instagram.com/hacked',
        actionLabel: {
          en: 'Instagram Recovery Page',
          hi: 'Instagram रिकवरी पेज',
        },
      },
    ],
    relevantLockdowns: ['google', 'instagram', 'whatsapp', 'telegram'],
  },
  not_sure: {
    category: 'not_sure',
    summary: {
      en: 'General stabilization and assessment guide. Helps you regain control, secure core channels, and determine the safest path forward.',
      hi: 'सामान्य सुरक्षा और स्थिति समझने की कार्ययोजना। स्थिति को नियंत्रित करने और सुरक्षित कदम तय करने में सहायक।',
    },
    doNow: [
      {
        id: 'pause_and_breathe',
        title: {
          en: 'Take a breath — you do not have to make irreversible decisions right now',
          hi: 'शांत रहें — आपको इस समय कोई भी जल्दबाजी में निर्णय लेने की आवश्यकता नहीं है',
        },
        description: {
          en: 'Digital harassment relies on triggering panic. Step back from the screen for a few minutes. You are in control of your response.',
          hi: 'ऑनलाइन उत्पीड़न अक्सर आपको डराने के लिए किया जाता है। कुछ मिनट स्क्रीन से दूर होकर शांत मन से सोचें।',
        },
      },
      {
        id: 'capture_everything',
        title: {
          en: 'Preserve everything before taking any public action',
          hi: 'कोई भी कदम उठाने से पहले सभी संदेशों और स्क्रीनशॉट को सहेजें',
        },
        description: {
          en: 'Take screenshots with visible timestamps and URLs. Do not delete anything until you have saved cryptographic proof in Kavach.',
          hi: 'तारीख और समय सहित स्क्रीनशॉट लें। जब तक साक्ष्य सहेज न लें, तब तक कुछ भी न मिटाएँ।',
        },
        actionRoute: '/preserve',
        actionLabel: {
          en: 'Preserve Evidence',
          hi: 'साक्ष्य संचय (Preserve) खोलें',
        },
      },
      {
        id: 'lock_main_accounts',
        title: {
          en: 'Secure your primary email and phone settings',
          hi: 'अपने मुख्य ईमेल और फ़ोन सेटिंग्स को सुरक्षित करें',
        },
        description: {
          en: 'Turn on two-step verification on WhatsApp and Google. This prevents unauthorized takeovers across all services.',
          hi: 'WhatsApp और Google पर टू-स्टेप वेरिफिकेशन चालू करें ताकि कोई अन्य व्यक्ति आपके खातों में न घुस सके।',
        },
      },
    ],
    doNotDo: [
      {
        id: 'dnd_panic_erase',
        title: {
          en: 'Do NOT panic-erase your accounts or delete suspicious chats',
          hi: 'घबराहट में अपने खाते डिलीट न करें और न ही चैट मिटाएँ',
        },
        description: {
          en: 'Deleting entire accounts makes it harder to gather evidence, prove your identity, or trace threats later.',
          hi: 'खाता हटाने से बाद में पुलिस या जांच अधिकारियों के लिए साक्ष्य जुटाना मुश्किल हो जाता है।',
        },
      },
    ],
    whenReady: [
      {
        id: 'call_counselor',
        title: {
          en: 'Speak with a confidential counselor on the 181 Women Helpline',
          hi: '181 महिला हेल्पलाइन पर किसी गोपनीय परामर्शदाता से बात करें',
        },
        description: {
          en: 'Trained female counselors can help you assess your local options calmly and connect you with free legal support.',
          hi: 'प्रशिक्षित महिला परामर्शदाता आपको शांत मन से सही कदम उठाने और निःशुल्क कानूनी सहायता पाने में मदद करती हैं।',
        },
        actionRoute: '/help',
        actionLabel: {
          en: 'View Helpline Details',
          hi: 'हेल्पलाइन विवरण देखें',
        },
      },
    ],
    relevantLockdowns: ['whatsapp', 'google', 'instagram'],
  },
};
