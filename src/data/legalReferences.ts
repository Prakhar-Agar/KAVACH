/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kavach Legal Statutory References Rule Set
 * 
 * CRITICAL LEGAL ETHICS RULES:
 * 1. This rule set is reviewed and curated, NOT algorithmic AI deduction.
 * 2. It is provided strictly as suggestions for a qualified legal professional or police officer to review.
 * 3. Never claim or state as a finding that a crime "has been committed under" any section.
 * 4. Entries with verifiedBy = null display "Not yet verified by a legal professional".
 * 5. Strictly includes only the authorized sections from IT Act and BNS.
 */

import { CategoryKey } from './playbooks';

export interface BilingualText {
  en: string;
  hi: string;
}

export interface LegalProvision {
  id: string;
  act: string;
  section: string;
  title: BilingualText;
  description: BilingualText;
  categories: (CategoryKey | 'general' | 'not_sure')[];
  source: string;
  lastReviewed: string;
  verifiedBy: string | null;
}

export const LEGAL_PROVISIONS: LegalProvision[] = [
  {
    id: 'it_66c',
    act: 'Information Technology Act, 2000',
    section: 'Section 66C',
    title: {
      en: 'Identity Theft / Misuse of Credentials',
      hi: 'पहचान की चोरी एवं क्रेडेंशियल का दुरुपयोग',
    },
    description: {
      en: 'Fraudulent or dishonest use of another person’s electronic signature, password, or unique identification feature.',
      hi: 'किसी अन्य व्यक्ति के इलेक्ट्रॉनिक हस्ताक्षर, पासवर्ड या विशिष्ट पहचान का धोखाधड़ी या बेईमानी से उपयोग।',
    },
    categories: ['account_compromise', 'impersonation'],
    source: 'Section 66C, Information Technology Act, 2000',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'it_66d',
    act: 'Information Technology Act, 2000',
    section: 'Section 66D',
    title: {
      en: 'Cheating by Personation Using Computer Resource',
      hi: 'कंप्यूटर संसाधन द्वारा प्रतिरूपण करके धोखाधड़ी',
    },
    description: {
      en: 'Cheating by personating someone else using any communication device or computer resource.',
      hi: 'किसी संचार उपकरण या कंप्यूटर संसाधन के माध्यम से किसी अन्य व्यक्ति का रूप धारण कर धोखाधड़ी करना।',
    },
    categories: ['impersonation', 'blackmail'],
    source: 'Section 66D, Information Technology Act, 2000',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'it_66e',
    act: 'Information Technology Act, 2000',
    section: 'Section 66E',
    title: {
      en: 'Violation of Bodily Privacy',
      hi: 'शारीरिक निजता का उल्लंघन',
    },
    description: {
      en: 'Capturing, publishing, or transmitting images of private areas of any person without consent.',
      hi: 'सहमति के बिना किसी व्यक्ति के निजी अंगों की तस्वीरें खींचना, प्रकाशित करना या प्रसारित करना।',
    },
    categories: ['ncii_threat', 'harassment'],
    source: 'Section 66E, Information Technology Act, 2000',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'it_67',
    act: 'Information Technology Act, 2000',
    section: 'Section 67',
    title: {
      en: 'Publishing / Transmitting Obscene Material',
      hi: 'इलेक्ट्रॉनिक रूप में अश्लील सामग्री का प्रसारण',
    },
    description: {
      en: 'Publishing or transmitting in electronic form any material which is lascivious or appeals to prurient interest.',
      hi: 'इलेक्ट्रॉनिक रूप में किसी भी ऐसी सामग्री को प्रकाशित या प्रसारित करना जो अश्लील हो।',
    },
    categories: ['ncii_threat', 'harassment'],
    source: 'Section 67, Information Technology Act, 2000',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'it_67a',
    act: 'Information Technology Act, 2000',
    section: 'Section 67A',
    title: {
      en: 'Publishing / Transmitting Sexually Explicit Material',
      hi: 'यौन रूप से स्पष्ट (सेक्सुअली एक्सप्लेसिट) सामग्री का प्रसारण',
    },
    description: {
      en: 'Publishing or transmitting in electronic form material containing sexually explicit acts or conduct.',
      hi: 'इलेक्ट्रॉनिक रूप में स्पष्ट यौन कृत्य या आचरण से युक्त सामग्री को प्रकाशित या प्रसारित करना।',
    },
    categories: ['ncii_threat', 'blackmail'],
    source: 'Section 67A, Information Technology Act, 2000',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'bns_77',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 77',
    title: {
      en: 'Voyeurism (formerly Section 354C IPC)',
      hi: 'ताक-झांक (पूर्व में धारा 354C IPC)',
    },
    description: {
      en: 'Watching or capturing the image of a woman engaging in a private act, or disseminating such images without consent.',
      hi: 'किसी महिला को निजी पलों में देखना, उसकी तस्वीर खींचना, या सहमति के बिना ऐसी तस्वीरों का प्रसार करना।',
    },
    categories: ['ncii_threat', 'stalking'],
    source: 'Section 77, Bharatiya Nyaya Sanhita, 2023',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'bns_78',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 78',
    title: {
      en: 'Stalking & Cyber-Stalking (formerly Section 354D IPC)',
      hi: 'पीछा करना एवं साइबर-स्टॉकिंग (पूर्व में धारा 354D IPC)',
    },
    description: {
      en: 'Monitoring the use by a woman of the internet, email, or other electronic communication despite disinterest, causing distress.',
      hi: 'अनिच्छा जताने के बावजूद इंटरनेट, ईमेल या सोशल मीडिया पर किसी महिला की गतिविधियों पर नज़र रखना या संपर्क साधना।',
    },
    categories: ['stalking', 'harassment'],
    source: 'Section 78, Bharatiya Nyaya Sanhita, 2023',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'bns_79',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 79',
    title: {
      en: 'Word, Gesture, or Act Insulting Modesty of a Woman (formerly Section 509 IPC)',
      hi: 'महिला की गरिमा को ठेस पहुँचाने वाला शब्द, इशारा या कृत्य (पूर्व में धारा 509 IPC)',
    },
    description: {
      en: 'Uttering any word, making any sound or gesture, or exhibiting any object intending to insult the modesty of a woman.',
      hi: 'महिला की लज्जा या गरिमा को ठेस पहुँचाने के इरादे से किसी शब्द, ध्वनि, इशारे या संदेश का प्रयोग करना।',
    },
    categories: ['harassment', 'stalking', 'impersonation'],
    source: 'Section 79, Bharatiya Nyaya Sanhita, 2023',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'bns_308',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 308',
    title: {
      en: 'Extortion (formerly Section 383/384 IPC)',
      hi: 'जबरन वसूली / एक्सटॉर्शन (पूर्व में धारा 383/384 IPC)',
    },
    description: {
      en: 'Intentionally putting any person in fear of injury and dishonestly inducing them to deliver property or valuable security.',
      hi: 'किसी व्यक्ति को नुकसान के भय में डालकर जबरन पैसे, संपत्ति या गोपनीय सामग्री देने के लिए विवश करना।',
    },
    categories: ['blackmail'],
    source: 'Section 308, Bharatiya Nyaya Sanhita, 2023',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'bns_351',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 351',
    title: {
      en: 'Criminal Intimidation (formerly Section 503/506 IPC)',
      hi: 'आपराधिक धमकी / डराना (पूर्व में धारा 503/506 IPC)',
    },
    description: {
      en: 'Threatening another with injury to their person, reputation, or property to compel them to do an act against their will.',
      hi: 'किसी व्यक्ति को उसके शरीर, प्रतिष्ठा या संपत्ति को क्षति पहुँचाने की धमकी देकर उसकी इच्छा के विरुद्ध कार्य कराना।',
    },
    categories: ['blackmail', 'harassment', 'ncii_threat'],
    source: 'Section 351, Bharatiya Nyaya Sanhita, 2023',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
  {
    id: 'bns_319',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 319',
    title: {
      en: 'Cheating by Personation (formerly Section 416/419 IPC)',
      hi: 'प्रतिरूपण द्वारा धोखाधड़ी (पूर्व में धारा 416/419 IPC)',
    },
    description: {
      en: 'Cheating by pretending to be some other person, or knowingly substituting one person for another.',
      hi: 'कोई अन्य व्यक्ति होने का ढोंग करके या जानबूझकर किसी अन्य व्यक्ति के नाम का उपयोग करके धोखाधड़ी करना।',
    },
    categories: ['impersonation'],
    source: 'Section 319, Bharatiya Nyaya Sanhita, 2023',
    lastReviewed: '2026-10-28',
    verifiedBy: null,
  },
];
