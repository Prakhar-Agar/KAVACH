/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Capture Guidance Data Store
 * Provides category-matched, evidentiary best practices for preserving digital evidence in India.
 */

import { CategoryKey } from './playbooks';

export interface BilingualString {
  en: string;
  hi: string;
}

export interface CaptureTip {
  title: BilingualString;
  detail: BilingualString;
  isWarning?: boolean;
}

export interface CategoryGuidance {
  category: CategoryKey | 'general';
  heading: BilingualString;
  subheading: BilingualString;
  tips: CaptureTip[];
}

export const CAPTURE_GUIDANCE: Record<string, CategoryGuidance> = {
  general: {
    category: 'general',
    heading: {
      en: 'How to Capture Verifiable Evidence',
      hi: 'प्रमाणिक डिजिटल साक्ष्य कैसे सुरक्षित करें',
    },
    subheading: {
      en: 'Follow these essential forensic practices before uploading or hashing your files.',
      hi: 'फ़ाइलों को हैश करने अथवा सुरक्षित करने से पहले इन मूलभूत सावधानियों का पालन करें।',
    },
    tips: [
      {
        title: {
          en: 'Capture Full Screenshots with Context',
          hi: 'पूरा स्क्रीनशॉट लें जिसमें संदर्भ स्पष्ट हो',
        },
        detail: {
          en: 'Include the complete browser address bar (URL), sender handle, mobile network time, and battery/date bar. Context proves when and where the incident occurred.',
          hi: 'स्क्रीनशॉट में ब्राउज़र का पूरा वेब पता (URL), भेजने वाले का यूज़रनेम, फ़ोन का समय और तारीख स्पष्ट दिखनी चाहिए।',
        },
      },
      {
        title: {
          en: 'Screen Recording for Disappearing Content',
          hi: 'गायब होने वाले संदेशों के लिए स्क्रीन रिकॉर्डिंग करें',
        },
        detail: {
          en: 'If messages or stories are set to disappear or expire (e.g. Instagram vanishing mode, WhatsApp view-once), use device screen recording to document them.',
          hi: 'यदि संदेश या स्टोरी गायब होने वाली है (जैसे WhatsApp व्यू-वन्स या Instagram वैनिश मोड), तो फ़ोन की स्क्रीन रिकॉर्डिंग का उपयोग करें।',
        },
      },
      {
        title: {
          en: 'Keep the Original — Never Crop or Re-Save',
          hi: 'मूल फ़ाइल सुरक्षित रखें — कभी भी काटें (crop) या एडिट न करें',
        },
        detail: {
          en: 'Cropping or filtering an image alters its underlying bitstream and changes its SHA-256 fingerprint entirely. Hash the raw original.',
          hi: 'फ़ोटो को काटने, फ़िल्टर लगाने या रीनेम करने से उसका डिजिटल फ़िंगरप्रिंट बदल जाता है। हमेशा मूल फ़ाइल का ही हैश निकालें।',
        },
        isWarning: true,
      },
      {
        title: {
          en: 'Preserve Transaction & Payment Demands',
          hi: 'भुगतान की माँग और UPI विवरण सुरक्षित रखें',
        },
        detail: {
          en: 'Always screenshot QR codes, UPI IDs (VPA), phone numbers, or bank account numbers provided by the perpetrator.',
          hi: 'आरोपी द्वारा भेजे गए QR कोड, UPI आईडी, बैंक खाता संख्या या फ़ोन नंबर का स्पष्ट स्क्रीनशॉट अवश्य लें।',
        },
      },
    ],
  },

  blackmail: {
    category: 'blackmail',
    heading: {
      en: 'Evidence Capture Guide: Blackmail & Extortion',
      hi: 'साक्ष्य संचय मार्गदर्शिका: ब्लैकमेल एवं सेक्स्टॉर्शन (Sextortion)',
    },
    subheading: {
      en: 'Preserve financial demands, threats, and account identifiers before blocking.',
      hi: 'आरोपी को ब्लॉक करने से पहले धमकियों, पैसों की माँग और बैंक/UPI पहचान का प्रमाण सहेजें।',
    },
    tips: [
      {
        title: {
          en: 'Record Demanded Amounts and Payment Handles',
          hi: 'माँगी गई रकम और UPI/खाता आईडी सहेजें',
        },
        detail: {
          en: 'Screenshot the exact extortion demand messages, UPI handles (e.g. name@okhdfcbank), QR codes, or cryptocurrency wallets. Cyber police can freeze linked accounts.',
          hi: 'पैसे माँगने वाले संदेशों, UPI हैंडल, QR कोड या खाता विवरण का पूरा स्क्रीनशॉट लें। साइबर पुलिस इसके आधार पर खाते फ़्रीज़ करा सकती है।',
        },
      },
      {
        title: {
          en: 'Capture Sender Profile and Phone Number',
          hi: 'भेजने वाले की प्रोफ़ाइल और फ़ोन नंबर का स्क्रीनशॉट लें',
        },
        detail: {
          en: 'Tap on the profile or contact information in WhatsApp/Instagram and screenshot the phone number, user ID, and bio before blocking.',
          hi: 'ब्लॉक करने से पहले WhatsApp या Instagram में प्रोफ़ाइल पर टैप करके फ़ोन नंबर और प्रोफ़ाइल आईडी का स्क्रीनशॉट लें।',
        },
      },
      {
        title: {
          en: 'Hash Original Files, Not Forwarded Compressed Copies',
          hi: 'मूल फ़ाइल का हैश निकालें, फ़ॉरवर्ड की गई संकुचित फ़ाइल का नहीं',
        },
        detail: {
          en: 'Messaging apps compress and re-encode images when forwarded. Use the original received media or direct device screenshot.',
          hi: 'फ़ॉरवर्ड करने पर ऐप्स फ़ोटो को कंप्रेस कर देते हैं जिससे हैश बदल जाता है। सीधे मूल स्क्रीनशॉट का उपयोग करें।',
        },
        isWarning: true,
      },
    ],
  },

  ncii_threat: {
    category: 'ncii_threat',
    heading: {
      en: 'Evidence Capture Guide: Intimate Imagery & Deepfakes',
      hi: 'साक्ष्य संचय मार्गदर्शिका: निजी तस्वीरें एवं डीपफेक (Deepfake)',
    },
    subheading: {
      en: 'Document public and private distribution to support 24-hour statutory takedowns.',
      hi: '24 घंटे में सामग्री हटवाने के कानूनी अधिकार हेतु पोस्ट के लिंक और विवरण सहेजें।',
    },
    tips: [
      {
        title: {
          en: 'Copy Direct Permanent Post URLs',
          hi: 'पोस्ट का स्थायी सीधा वेब लिंक (URL) कॉपी करें',
        },
        detail: {
          en: 'Copy the direct browser link to the offending post, image, or reel (e.g., https://instagram.com/p/...). Takedown notices require the exact URI.',
          hi: 'उस पोस्ट, फ़ोटो या रील का सीधा वेब लिंक कॉपी करें। सोशल मीडिया से सामग्री हटाने हेतु सटीक लिंक अनिवार्य होता है।',
        },
      },
      {
        title: {
          en: 'Preserve Group / Channel Information',
          hi: 'ग्रुप अथवा टेलीग्राम चैनल का विवरण सहेजें',
        },
        detail: {
          en: 'If distributed in a Telegram channel or WhatsApp group, screenshot the group info page showing group name, creator number, and member count.',
          hi: 'यदि फ़ोटो किसी ग्रुप या चैनल में साझा की गई है, तो ग्रुप का नाम, एडमिन का नंबर और सदस्यों की संख्या का स्क्रीनशॉट लें।',
        },
      },
      {
        title: {
          en: 'Never Re-Circulate or Forward to Friends',
          hi: 'सलाह के लिए भी तस्वीर को अन्य ग्रुपों में न भेजें',
        },
        detail: {
          en: 'Re-forwarding intimate media creates additional server copies. Store the file locally in private storage only.',
          hi: 'तस्वीर को दूसरों को भेजने से वह अनजाने में और अधिक लोगों तक पहुँच सकती है। फ़ाइल को केवल अपने डिवाइस पर रखें।',
        },
        isWarning: true,
      },
    ],
  },

  impersonation: {
    category: 'impersonation',
    heading: {
      en: 'Evidence Capture Guide: Impersonation & Fake Profiles',
      hi: 'साक्ष्य संचय मार्गदर्शिका: फ़र्ज़ी प्रोफ़ाइल (Impersonation)',
    },
    subheading: {
      en: 'Establish proof that someone is using your identity to deceive others.',
      hi: 'यह सिद्ध करने के लिए प्रमाण सहेजें कि कोई आपकी पहचान चुराकर दूसरों को धोखा दे रहा है।',
    },
    tips: [
      {
        title: {
          en: 'Screenshot the Fake Profile Bio & Posts',
          hi: 'फ़र्ज़ी प्रोफ़ाइल की बायो और पोस्ट का स्क्रीनशॉट लें',
        },
        detail: {
          en: 'Capture the username, bio text, follower count, and posts showcasing your stolen photos. Record the exact profile URL.',
          hi: 'फ़र्ज़ी खाते का यूज़रनेम, बायो, फ़ॉलोअर्स की संख्या और चुराई गई तस्वीरों का स्क्रीनशॉट लें। प्रोफ़ाइल का लिंक अवश्य रखें।',
        },
      },
      {
        title: {
          en: 'Preserve Messages Sent to Contacts',
          hi: 'परिचितों को भेजे गए संदेशों के स्क्रीनशॉट मँगवाएँ',
        },
        detail: {
          en: 'Ask friends or family who were contacted by the fake profile to send full screenshots of the chat with date and time visible.',
          hi: 'यदि फ़र्ज़ी खाते ने आपके परिचितों को संदेश भेजे हैं, तो उनसे चैट का पूरा स्क्रीनशॉट लेकर साक्ष्य में शामिल करें।',
        },
      },
    ],
  },

  stalking: {
    category: 'stalking',
    heading: {
      en: 'Evidence Capture Guide: Cyber-Stalking & Harassment',
      hi: 'साक्ष्य संचय मार्गदर्शिका: साइबर-स्टॉकिंग एवं प्रताड़ना (Stalking)',
    },
    subheading: {
      en: 'Build a chronological chain of persistent unwanted contacts.',
      hi: 'लगातार किए गए अवांछित संपर्कों का क्रमवार साक्ष्य रिकॉर्ड तैयार करें।',
    },
    tips: [
      {
        title: {
          en: 'Document Every Contact Attempt Chronologically',
          hi: 'हर संपर्क प्रयास का तारीख और समय सहित रिकॉर्ड रखें',
        },
        detail: {
          en: 'Legal stalking provisions (Section 78 BNS 2023) require demonstrating repeated, persistent monitoring. Screenshot call logs and messages without replying.',
          hi: 'स्टॉकिंग सिद्ध करने के लिए बार-बार किए गए प्रयासों का क्रम दिखाना आवश्यक होता है। बिना जवाब दिए सभी कॉल्स और संदेशों का स्क्रीनशॉट लें।',
        },
      },
      {
        title: {
          en: 'Record Multi-Platform Activity',
          hi: 'विभिन्न सोशल मीडिया प्लेटफॉर्म के साक्ष्य एक साथ सहेजें',
        },
        detail: {
          en: 'If the stalker contacts you across LinkedIn, Instagram, WhatsApp, and email, preserve evidence from all platforms in one manifest.',
          hi: 'यदि कोई व्यक्ति कई प्लेटफॉर्म (जैसे Instagram, LinkedIn और WhatsApp) पर पीछा कर रहा है, तो सभी के साक्ष्य एक ही मेनिफेस्ट में जोड़ें।',
        },
      },
    ],
  },
};
