# Kavach Hindi Translation & Cultural Appropriateness Review Sheet

This sheet catalogs all user-facing bilingual UI strings in **Kavach (कवच)**.

### Cultural & Trauma-Informed Quality Standard:
1. **Calm, supportive, non-intimidating tone**: Clear and respectful phrasing that empowers users under severe stress.
2. **Everyday spoken Hindi (सरल व्यावहारिक हिंदी)**: Avoid heavy Sanskritized or archaic bureaucratic terms.
3. **No raw machine translation**: Ensure natural Hindi grammar, syntax, and word order.
4. **Permitted Latin terms**: Acronyms and technical standards (e.g. SHA-256, URL, PDF, JSON, WhatsApp, FIR, Zero FIR, IT Act, BNS, BNSS) are shown with bracketed transliteration or bilingual clarity where appropriate (e.g. `शून्य प्राथमिकी (Zero FIR)`).

---

## 1. Global, Header & Navigation (12 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `documentTitle` | Kavach — Cyber-Abuse Response & Reporting Companion | कवच — महिलाओं के लिए साइबर-उत्पीड़न सहायता एवं रिपोर्टिंग साथी | [ ] Verified |
| `appName` | Kavach | कवच (Kavach) | [ ] Verified |
| `appWordmark` | Kavach | कवच | [ ] Verified |
| `tagline` | Cyber-Abuse Response & Reporting Companion for Women in India | भारत में महिलाओं के लिए साइबर-उत्पीड़न सहायता एवं रिपोर्टिंग साथी | [ ] Verified |
| `navHome` | Home | मुख्य पृष्ठ | [ ] Verified |
| `navRespond` | Respond | प्रतिक्रिया (Respond) | [ ] Verified |
| `navPreserve` | Preserve | साक्ष्य संचय (Preserve) | [ ] Verified |
| `navReport` | Draft Complaint | शिकायत प्रारूप (Report) | [ ] Verified |
| `navTrack` | Track Report | ट्रैकिंग (Track) | [ ] Verified |
| `navHelp` | Emergency Help | सहायता एवं हेल्पलाइन | [ ] Verified |
| `navPrivacy` | Privacy & Cryptography | गोपनीयता एवं साक्ष्य नियम | [ ] Verified |
| `applicableLawTitle` | Applicable Indian Legal Framework: | लागू भारतीय कानूनी रूपरेखा: | [ ] Verified |

## 2. Quick Exit & Privacy (54 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `quickExit` | Quick Exit (Esc) | तुरंत बाहर निकलें (Esc) | [ ] Verified |
| `quickExitShort` | Exit (Esc) | निकास (Esc) | [ ] Verified |
| `quickExitNotice` | Leaves page instantly. Cannot erase local browser history. | तुरंत गूगल पर ले जाता है। यह ब्राउज़र इतिहास नहीं मिटा सकता। | [ ] Verified |
| `quickExitDetails` | Quick Exit Security Details | त्वरित निकास सुरक्षा विवरण | [ ] Verified |
| `quickExitModalTitle` | Safety Alert: Quick Exit | सुरक्षा सूचना: त्वरित निकास (Quick Exit) | [ ] Verified |
| `quickExitModalBody` | Clicking Quick Exit immediately redirects this tab to Google Search to conceal this screen. However, web browsers retain visited URLs in your device history. For maximum safety, use Private/Incognito mode or manually clear history afterwards. | त्वरित निकास पर क्लिक करने से यह स्क्रीन तुरंत गूगल सर्च पर स्थानांतरित हो जाएगी ताकि कोई अन्य इसे न देख सके। ध्यान रहे कि ब्राउज़र इतिहास में यह पृष्ठ दर्ज रह सकता है। अधिकतम सुरक्षा के लिए इनकॉग्निटो मोड का उपयोग करें अथवा बाद में इतिहास साफ करें। | [ ] Verified |
| `quickExitKeyboardTitle` | Keyboard Safety Shortcut: | कीबोर्ड सुरक्षा शॉर्टकट: | [ ] Verified |
| `quickExitKeyboardText` | Pressing the Escape key at any time immediately leaves this page and switches to Google. | कीबोर्ड पर Escape कुंजी दबाने से यह पृष्ठ तुरंत बंद होकर गूगल पर चला जाता है। | [ ] Verified |
| `quickExitModalAction` | Leave Site Now | अभी साइट छोड़ें | [ ] Verified |
| `quickExitCancel` | Return Safely | सुरक्षित लौटें | [ ] Verified |
| `quickExitEscHint` | Press Esc for Quick Exit | त्वरित निकास के लिए Esc दबाएँ | [ ] Verified |
| `footerIsolationTitle` | Device Isolation Guarantee: | डिवाइस गोपनीयता आश्वासन: | [ ] Verified |
| `footerIsolationText` | Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host. | कवच आपकी साक्ष्य फ़ाइलें, उत्तर या शिकायत ड्राफ्ट कहीं भी नहीं भेजता है। आपका ब्राउज़र केवल होस्ट से ऐप लोड करता है। | [ ] Verified |
| `footerZeroTrackers` | Zero trackers · No telemetry · No external logs | शून्य ट्रैकर · कोई टेलीमेट्री नहीं · कोई बाहरी लॉग नहीं | [ ] Verified |
| `footerDisclaimerText` | Kavach is an assistive legal and cyber-safety toolkit. It does not replace official police FIR filings or legal counsel. | कवच एक कानूनी एवं साइबर सुरक्षा सहायक उपकरण है। यह पुलिस प्राथमिकी (FIR) अथवा आधिकारिक कानूनी सलाह का विकल्प नहीं है। | [ ] Verified |
| `privacyCardTitle` | Client-Side Privacy & Cryptographic Verification | स्थानीय गोपनीयता और क्रिप्टोग्राफ़िक प्रमाणिकता | [ ] Verified |
| `privacyCardDesc` | Clear breakdown of why files never upload, how local SHA-256 works, and what hashing does and does not prove. | पारदर्शिता सर्वोपरि: कवच आपकी पहचान कैसे सुरक्षित रखता है, SHA-256 हैश क्या सिद्ध करता है और क्या नहीं। | [ ] Verified |
| `hermeticPrivacyTitle` | Hermetic Privacy Guarantee: | सुरक्षित स्थानीय गोपनीयता की गारंटी: | [ ] Verified |
| `hermeticPrivacyDesc` | When active, this module processes all data locally on your device using client-side Web Crypto and localStorage/memory. | यह मॉड्यूल सभी जानकारियों को केवल आपके डिवाइस पर ही Web Crypto और स्थानीय मेमोरी के माध्यम से प्रोसेस करता है। | [ ] Verified |
| `privacyBadge` | Privacy Constitution | गोपनीयता संविधान | [ ] Verified |
| `privacyTitle` | Client-Side Privacy & Cryptographic Verification | स्थानीय गोपनीयता और क्रिप्टोग्राफ़िक प्रमाणिकता | [ ] Verified |
| `privacySubtitle` | Transparency first: exactly how Kavach safeguards your identity, what SHA-256 hashing proves, and what it does not prove. | पारदर्शिता सर्वोपरि: कवच आपकी पहचान कैसे सुरक्षित रखता है, SHA-256 हैश क्या सिद्ध करता है और क्या नहीं। | [ ] Verified |
| `privacyStaysDeviceTitle` | What Stays on Your Device | आपके डिवाइस पर क्या सुरक्षित रहता है | [ ] Verified |
| `privacyStaysDeviceSubtitle` | Hermetic client-side execution | पूरी तरह स्थानीय ब्राउज़र प्रोसेसिंग | [ ] Verified |
| `privacyStaysDeviceDesc` | Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host. Cryptographic hashing and complaint generation run locally in browser memory. | कवच आपकी साक्ष्य फ़ाइलें, उत्तर या शिकायत ड्राफ्ट कहीं भी नहीं भेजता है। आपका ब्राउज़र केवल होस्ट से ऐप लोड करता है। क्रिप्टोग्राफ़िक हैशिंग और शिकायत निर्माण स्थानीय ब्राउज़र मेमोरी में चलता है। | [ ] Verified |
| `privacyDeviceCard1Title` | Screenshots & Media | स्क्रीनशॉट और मीडिया फ़ाइलें | [ ] Verified |
| `privacyDeviceCard1Desc` | Images and videos remain entirely in your browser's private memory. They are never sent over the network. | फ़ोटो और वीडियो केवल आपके ब्राउज़र की निजी मेमोरी में रहते हैं। वे कभी इंटरनेट पर नहीं भेजे जाते। | [ ] Verified |
| `privacyDeviceCard2Title` | Incident Narratives | घटना का विवरण | [ ] Verified |
| `privacyDeviceCard2Desc` | Complaint descriptions and chat excerpts are formatted locally. No AI API receives text without your explicit line-by-line approval. | शिकायत का विवरण आपके फ़ोन/कंप्यूटर पर ही तैयार होता है। आपकी अनुमति के बिना कोई भी शब्द बाहर नहीं जाता। | [ ] Verified |
| `privacyDeviceCard3Title` | Personal Identity | व्यक्तिगत पहचान | [ ] Verified |
| `privacyDeviceCard3Desc` | Your name, contact numbers, and addresses are never transmitted to any telemetry or database storage. | आपका नाम, फ़ोन नंबर या पता किसी भी बाहरी डेटाबेस या ट्रैकर पर नहीं भेजा जाता। | [ ] Verified |
| `privacyCryptoTitle` | Truth in Cryptography & Evidence Law | क्रिप्टोग्राफ़ी और साक्ष्य कानून की वास्तविकता | [ ] Verified |
| `privacyCryptoSubtitle` | Setting realistic legal expectations | कानूनी सीमाओं को सही रूप से समझना | [ ] Verified |
| `privacyCryptoDesc` | Kavach computes a 256-bit Secure Hash Algorithm (SHA-256) digest directly in your web browser using the standard crypto.subtle.digest('SHA-256', arrayBuffer) API. It is vital to understand the precise legal and technical boundaries of what this hash represents. | कवच आपके ब्राउज़र में सीधे crypto.subtle.digest मानक का उपयोग करके 256-बिट SHA-256 हैश बनाता है। यह समझना आवश्यक है कि यह हैश कानूनी रूप से क्या साबित करता है और क्या नहीं। | [ ] Verified |
| `privacyWhatProvesTitle` | What Web Crypto SHA-256 Proves | SHA-256 हैश क्या साबित करता है | [ ] Verified |
| `privacyWhatDoesNotProveTitle` | What Hashing Does NOT Prove | हैशिंग क्या साबित नहीं करती है | [ ] Verified |
| `privacyProves1Title` | Exact Bit-Level Integrity | फ़ाइल में बिना किसी बदलाव का पक्का प्रमाण | [ ] Verified |
| `privacyProves1Desc` | Proves mathematically that not a single pixel, character, or byte of the file has been altered or tampered with since the hash was generated. | गणितीय रूप से सिद्ध करता है कि हैश बनने के बाद फ़ाइल के एक भी पिक्सेल, अक्षर या बाइट में कोई बदलाव या छेड़छाड़ नहीं हुई है। | [ ] Verified |
| `privacyProves2Title` | State at Point-in-Time | निश्चित समय पर अस्तित्व का प्रमाण | [ ] Verified |
| `privacyProves2Desc` | Provides a verifiable cryptographic timestamp showing that this specific file existed in your possession at the time of manifest export. | यह दर्शाता है कि मेनिफेस्ट निर्यात करते समय यह सटीक फ़ाइल आपके पास उपलब्ध थी। | [ ] Verified |
| `privacyProves3Title` | Zero Leakage Verification | बिना फ़ोटो दिखाए साक्ष्य सत्यापन | [ ] Verified |
| `privacyProves3Desc` | Can be shared with lawyers, cyber forensics officers, or court authorities to verify your files without exposing sensitive media to third parties. | वकीलों या साइबर पुलिस को निजी तस्वीरें दिखाए बिना यह साबित किया जा सकता है कि आपके पास सुरक्षित साक्ष्य मौजूद हैं। | [ ] Verified |
| `privacyNotProves1Title` | Does NOT Prove Authenticity or Authorship | यह साबित नहीं करता कि फ़ोटो किसने बनाई | [ ] Verified |
| `privacyNotProves1Desc` | A hash cannot prove who created the image, who drafted the message, or whether an image was created using AI or Photoshop. It only proves file state. | हैश यह नहीं बता सकता कि तस्वीर मूल रूप से किसने खींची, संदेश किसने लिखा, या फ़ोटो AI से बनाई गई है या नहीं। यह सिर्फ़ फ़ाइल की स्थिति दिखाता है। | [ ] Verified |
| `privacyNotProves2Title` | Does NOT Replace Section 65B / 63 BSA Certification | यह धारा 65B/63 के प्रमाणपत्र का विकल्प नहीं है | [ ] Verified |
| `privacyNotProves2Desc` | Under Indian evidence law (Bharatiya Sakshya Adhiniyam 2023, Sec 63 / Indian Evidence Act Sec 65B), electronic records require a signed declaration regarding lawful device custody. | भारतीय साक्ष्य कानून (BNS/BSA 2023 धारा 63 / साक्ष्य अधिनियम 65B) के तहत डिजिटल साक्ष्यों के साथ डिवाइस के स्वामी का हस्ताक्षरित प्रमाणपत्र आवश्यक होता है। | [ ] Verified |
| `privacyNotProves3Title` | Does NOT Automatically Submit a Police Complaint | यह अपने आप पुलिस शिकायत दर्ज नहीं करता | [ ] Verified |
| `privacyNotProves3Desc` | Computing a hash or exporting a manifest is a preparatory evidentiary step; it does not notify police or register an FIR until you formally file it. | हैश बनाना केवल सबूत जुटाने का कदम है; जब तक आप स्वयं औपचारिक शिकायत दर्ज नहीं करते, पुलिस को सूचना नहीं मिलती। | [ ] Verified |
| `privacyNotProves4Title` | Does NOT Guarantee Absolute Anonymity | यह पूर्ण इंटरनेट गुमनामी की गारंटी नहीं देता | [ ] Verified |
| `privacyNotProves4Desc` | While Kavach does not track you or record your IP, your internet service provider (ISP) and browser history retain traces of visited websites unless manually purged. | कवच आपको ट्रैक नहीं करता, लेकिन आपके इंटरनेट सेवा प्रदाता (ISP) और ब्राउज़र इतिहास में देखी गई साइटों का विवरण रह सकता है। | [ ] Verified |
| `privacyPrinciplesHeading` | The 8 Non-Negotiable Privacy Principles of Kavach | कवच के 8 गैर-परक्राम्य गोपनीयता सिद्धांत | [ ] Verified |
| `privacyPrinciplesSubheading` | Documented in /docs/privacy-principles.md and enforced in every iteration. | ये सिद्धांत /docs/privacy-principles.md में दर्ज हैं और हर बदलाव में लागू रहते हैं। | [ ] Verified |
| `privacyCodeVerificationTitle` | Local Hashing Implementation Verification | स्थानीय हैशिंग कोड का सत्यापन | [ ] Verified |
| `privacyCodeVerificationDesc` | The code below demonstrates the exact browser-native cryptographic hashing implementation planned for Mode 02 (Preserve Evidence). No third-party network libraries or external APIs are invoked. | नीचे दिया गया कोड वह तरीका दिखाता है जिससे ब्राउज़र में फ़ाइलों का SHA-256 हैश निकाला जाता है। इसमें किसी सर्वर की सहायता नहीं ली जाती। | [ ] Verified |

## 3. Emergency Helplines & Official Portals (39 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `emergencyDisclaimer` | Emergency Helplines (Verify before use — Available 24x7 across India) | आपातकालीन हेल्पलाइन (उपयोग से पूर्व सत्यापित करें — पूरे भारत में 24 घंटे उपलब्ध) | [ ] Verified |
| `officialPortalLink` | Visit National Cyber Crime Reporting Portal (cybercrime.gov.in) | राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल पर जाएँ (cybercrime.gov.in) | [ ] Verified |
| `helpline112Title` | 112 — National Emergency | 112 — राष्ट्रीय आपातकालीन सेवा | [ ] Verified |
| `helpline112Desc` | Police, medical, or imminent physical threat | पुलिस, चिकित्सा या तात्कालिक शारीरिक खतरे हेतु | [ ] Verified |
| `helpline181Title` | 181 — Women Helpline | 181 — महिला हेल्पलाइन | [ ] Verified |
| `helpline181Desc` | Toll-free 24/7 counseling, shelter, and legal support | निःशुल्क 24 घंटे परामर्श, आश्रय एवं कानूनी सहायता | [ ] Verified |
| `helpline1930Title` | 1930 — Cybercrime Helpline | 1930 — साइबर अपराध हेल्पलाइन | [ ] Verified |
| `helpline1930Desc` | Citizen financial and cyber abuse reporting helpline | नागरिक साइबर अपराध एवं वित्तीय धोखाधड़ी हेल्पलाइन | [ ] Verified |
| `helpCardTitle` | Emergency Help & Legal Rights in India | भारत में आपातकालीन सहायता और कानूनी अधिकार | [ ] Verified |
| `helpCardDesc` | Understanding police Zero-FIR rights in India, when to dial 112 vs 181 vs 1930, and official helplines. | सत्यापित हेल्पलाइन नंबर, शून्य एफआईआर (Zero FIR) अधिकार और भारत में ऑनलाइन उत्पीड़न से निपटने के लिए आवश्यक सहायता। | [ ] Verified |
| `helplinesAlwaysAvailable` | Emergency helplines are available 24x7 in the footer below. | आपातकालीन हेल्पलाइन नीचे दिए गए फुटर में 24 घंटे उपलब्ध हैं। | [ ] Verified |
| `helpBadge` | Official Resources | आधिकारिक संसाधन | [ ] Verified |
| `helpTitle` | Emergency Help & Legal Rights in India | भारत में आपातकालीन सहायता और कानूनी अधिकार | [ ] Verified |
| `helpSubtitle` | Verified helplines, police zero-FIR rights, and support organizations for women facing online abuse in India. | सत्यापित हेल्पलाइन नंबर, शून्य एफआईआर (Zero FIR) अधिकार और भारत में ऑनलाइन उत्पीड़न से निपटने के लिए आवश्यक सहायता। | [ ] Verified |
| `helpVerificationNotice` | Helplines are maintained by respective state governments and Central Ministries. While 112, 181, and 1930 operate nationally, response routing depends on local telecom towers. Verify local operational hours for district-level cyber cells. | हेल्पलाइन नंबर संबंधित राज्य सरकारों और केंद्रीय मंत्रालयों द्वारा संचालित हैं। 112, 181 और 1930 पूरे भारत में सक्रिय हैं। जिले के स्तर पर साइबर सेल के कार्य समय की पुष्टि अवश्य कर लें। | [ ] Verified |
| `helpDirectHelplinesTitle` | Direct Emergency Helplines | सीधी आपातकालीन हेल्पलाइन | [ ] Verified |
| `helpOfficialPortalsTitle` | Official Government Reporting Portals | आधिकारिक सरकारी रिपोर्टिंग पोर्टल | [ ] Verified |
| `helpPortalNcrpTitle` | National Cyber Crime Reporting Portal | राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल | [ ] Verified |
| `helpPortalNcrpDesc` | Official Government of India portal for reporting cyber offences, with a specialized confidential channel for crimes against women. | साइबर अपराधों की शिकायत हेतु भारत सरकार का आधिकारिक पोर्टल, जिसमें महिलाओं के विरुद्ध अपराध की गोपनीय रिपोर्टिंग का विशेष अनुभाग है। | [ ] Verified |
| `helpPortalNcwTitle` | National Commission for Women (NCW) | राष्ट्रीय महिला आयोग (NCW) | [ ] Verified |
| `helpPortalNcwDesc` | Dedicated 24x7 helpline for women facing domestic and cyber violence. Online complaint registration available. | घरेलू एवं साइबर हिंसा से पीड़ित महिलाओं के लिए 24 घंटे हेल्पलाइन। ऑनलाइन शिकायत पंजीकरण की सुविधा उपलब्ध। | [ ] Verified |
| `helpLegalRightsTitle` | Your Statutory Rights Under Indian Law | भारतीय कानून के तहत आपके वैधानिक अधिकार | [ ] Verified |
| `helpLegalRightsSubtitle` | Protections under IT Act 2000, BNSS 2023, and Intermediary Rules | IT Act 2000, BNSS 2023 और इंटरमीडियरी नियमों के तहत कानूनी सुरक्षा | [ ] Verified |
| `helpRight1Title` | Right to File a Zero-FIR | शून्य एफआईआर (Zero FIR) दर्ज कराने का अधिकार | [ ] Verified |
| `helpRight1Statute` | Section 173 BNSS 2023 (formerly Section 154 CrPC) | धारा 173 BNSS 2023 (पूर्व में धारा 154 CrPC) | [ ] Verified |
| `helpRight1Body` | A police station CANNOT refuse to register an FIR on the grounds of territorial jurisdiction. If an offence against a woman is reported, police must record a "Zero-FIR" and subsequently transfer it to the relevant jurisdictional station. | कोई भी पुलिस स्टेशन अधिकार क्षेत्र न होने के आधार पर FIR दर्ज करने से मना नहीं कर सकता। महिलाओं के विरुद्ध अपराध की स्थिति में पुलिस को शून्य एफआईआर दर्ज करनी होगी और बाद में संबंधित थाने को भेजनी होगी। | [ ] Verified |
| `helpRight2Title` | Mandatory 24-Hour NCII Removal | 24 घंटे के भीतर आपत्तिजनक सामग्री हटाने का नियम | [ ] Verified |
| `helpRight2Statute` | Rule 3(2)(b), IT (Intermediary Guidelines) Rules, 2021 | नियम 3(2)(b), सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश) नियम, 2021 | [ ] Verified |
| `helpRight2Body` | Social media intermediaries (Instagram, Meta, X, YouTube, Telegram) are legally mandated by Indian statutory rules to remove or disable access to non-consensual sexually explicit imagery within 24 hours of notification. | सोशल मीडिया प्लेटफॉर्म (Instagram, Meta, X, YouTube, Telegram) सूचना मिलने के 24 घंटे के भीतर बिना सहमति वाली अश्लील सामग्री हटाने के लिए कानूनी रूप से बाध्य हैं। | [ ] Verified |
| `helpRight3Title` | Statement Recorded by Woman Police Officer | महिला पुलिस अधिकारी द्वारा बयान दर्ज करना | [ ] Verified |
| `helpRight3Statute` | Section 26 & 164 CrPC / BNSS Equivalent | धारा 26 एवं 164 CrPC / BNSS समतुल्य | [ ] Verified |
| `helpRight3Body` | When reporting crimes involving sexual harassment, voyeurism, or assault, a woman has the statutory right to have her statement recorded by a woman police officer or in the presence of a woman facilitator. | यौन उत्पीड़न, ताक-झांक या छेड़छाड़ के मामलों में महिला को यह अधिकार है कि उसका बयान किसी महिला पुलिस अधिकारी की उपस्थिति में दर्ज किया जाए। | [ ] Verified |
| `helpRight4Title` | Confidentiality of Victim Identity | पीड़िता की पहचान की गोपनीयता | [ ] Verified |
| `helpRight4Statute` | Section 72 BNS 2023 (formerly Section 228A IPC) | धारा 72 BNS 2023 (पूर्व में धारा 228A IPC) | [ ] Verified |
| `helpRight4Body` | Disclosing the name or any matter which may reveal the identity of a victim of sexual offences without judicial authorization is a punishable criminal offence. | अदालत की पूर्व अनुमति के बिना यौन अपराधों से पीड़ित महिला का नाम या पहचान उजागर करना कानूनन दंडनीय अपराध है। | [ ] Verified |
| `helpChecklistTitle` | Practical Checklist Before Filing a Report | रिपोर्ट दर्ज कराने से पहले आवश्यक सावधानियां | [ ] Verified |
| `helpChecklist1` | Preserve Original Screenshots: Ensure screenshots include the complete browser address bar, profile handle, phone number, and system date/time. | मूल स्क्रीनशॉट सुरक्षित रखें: सुनिश्चित करें कि स्क्रीनशॉट में पूरा वेब पता (URL), यूज़रनेम, फ़ोन नंबर और तारीख/समय साफ दिखाई दे रहे हों। | [ ] Verified |
| `helpChecklist2` | Do Not Alter Evidence Files: Do not crop, resize, or rename screenshots before generating hashes, as this modifies file bitstreams. | फ़ाइलों में फेरबदल न करें: हैश निकालने से पहले स्क्रीनशॉट को काटें (crop) या रीनेम न करें, क्योंकि इससे फ़ाइल की संरचना बदल जाती है। | [ ] Verified |
| `helpChecklist3` | Note Exact Profile URLs: Perpetrators frequently change display names; record the permanent profile URL or account ID. | प्रोफ़ाइल का स्थायी लिंक सहेजें: आरोपी अक्सर अपने नाम बदल लेते हैं; इसलिए उनके खाते का स्थायी वेब लिंक (URL) या आईडी ज़रूर नोट कर लें। | [ ] Verified |

## 4. Mode 01: First-Hour Response (Respond) (16 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `modeRespondTitle` | Respond | प्रतिक्रिया (Respond) | [ ] Verified |
| `modeRespondSubtitle` | First-Hour Safety Playbook | पहले घंटे की सुरक्षा कार्ययोजना | [ ] Verified |
| `modeRespondDesc` | Classify the incident and follow immediate step-by-step containment instructions. Secure accounts, prevent escalation, and preserve emotional clarity without panic. | घटना की श्रेणी पहचानें और पहले घंटे की आवश्यक सुरक्षा सावधानियां अपनाएं। खाते सुरक्षित करें और बिना घबराए सही कदम उठाएं। | [ ] Verified |
| `modeRespondTag` | Immediate Crisis / First Hour | तात्कालिक संकट / पहला घंटा | [ ] Verified |
| `respondFlowBadge` | Phase 2 Active | चरण 2 सक्रिय | [ ] Verified |
| `respondFlowTitle` | First-Hour Safety & Containment Playbook | पहले घंटे की सुरक्षा एवं रोकथाम कार्ययोजना | [ ] Verified |
| `respondFlowSubtitle` | Calm, structured steps to protect your accounts, preserve evidence, and stop extortion without panicking. | बिना घबराए अपने खातों को सुरक्षित करने, साक्ष्य सहेजने और ब्लैकमेल को रोकने के शांत और व्यवस्थित कदम। | [ ] Verified |
| `respondStep1Title` | Step 1: What is happening? | चरण 1: क्या समस्या आ रही है? | [ ] Verified |
| `respondStep1Subtitle` | Select the category that best matches your situation. You can change this selection at any time. Categories are suggestions for guidance, not formal legal findings. | अपनी स्थिति से सबसे मेल खाती श्रेणी चुनें। आप इसे कभी भी बदल सकते हैं। यह श्रेणी केवल मार्गदर्शन के लिए है, कोई औपचारिक कानूनी निर्णय नहीं। | [ ] Verified |
| `respondStep1SelectionNote` | Selected category: | चुनी गई श्रेणी: | [ ] Verified |
| `respondStep2Title` | Step 2: Immediate Danger Check | चरण 2: तात्कालिक शारीरिक सुरक्षा जाँच | [ ] Verified |
| `respondStep2Subtitle` | Let us check your physical safety first before taking digital steps. | डिजिटल कदम उठाने से पहले यह सुनिश्चित करें कि आप शारीरिक रूप से सुरक्षित हैं। | [ ] Verified |
| `respondStep3Title` | Step 3: Quick Context Assessment | चरण 3: संक्षिप्त स्थिति मूल्यांकन | [ ] Verified |
| `respondStep3Subtitle` | Answer up to 2 short questions to tailor your first-hour checklist. Every question is skippable. Never enter passwords or personal names. | कार्ययोजना को अधिक उपयोगी बनाने के लिए 2 छोटे प्रश्नों के उत्तर दें। हर प्रश्न को छोड़ना संभव है। पासवर्ड या निजी नाम कभी दर्ज न करें। | [ ] Verified |
| `respondStep4Title` | Step 4: Your First-Hour Action Plan | चरण 4: आपकी पहले घंटे की कार्ययोजना | [ ] Verified |
| `respondStep4Subtitle` | Review your prioritized checklist below. Check off items as you complete them. Your answers and progress remain in your device memory only. | नीचे दी गई प्राथमिकता सूची को ध्यान से पढ़ें। कार्य पूरा होने पर टिक लगाते जाएँ। आपकी प्रगति केवल आपके डिवाइस पर रहती है। | [ ] Verified |

## 5. Mode 02: Evidence Preservation (Preserve) (84 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `modePreserveTitle` | Preserve Evidence | साक्ष्य संचय (Preserve) | [ ] Verified |
| `modePreserveSubtitle` | Local Browser Manifest & Hashing | डिवाइस पर स्थानीय SHA-256 हैशिंग | [ ] Verified |
| `modePreserveDesc` | Generate verifiable SHA-256 cryptographic fingerprints of screenshots and chats locally. No media files or images are ever uploaded to any server or AI model. | अपने ब्राउज़र में ही स्क्रीनशॉट और चैट का क्रिप्टोग्राफ़िक SHA-256 डाइजेस्ट तैयार करें। कोई भी फ़ोटो या फ़ाइल किसी सर्वर पर नहीं भेजी जाती। | [ ] Verified |
| `modePreserveTag` | Browser SHA-256 Hashing | ब्राउज़र में SHA-256 हैशिंग | [ ] Verified |
| `modePreserveFeature1Title` | 100% In-Browser Cryptographic Digestion | 100% ब्राउज़र में क्रिप्टोग्राफ़िक प्रोसेसिंग | [ ] Verified |
| `modePreserveFeature1Desc` | Uses the browser's native Web Crypto API (crypto.subtle.digest) to compute SHA-256 fingerprints. No images, videos, or documents are ever transmitted to any remote server. | ब्राउज़र के मूल Web Crypto API (crypto.subtle.digest) का उपयोग करके SHA-256 हैश तैयार करता है। कोई भी फ़ाइल कभी किसी सर्वर पर नहीं भेजी जाती। | [ ] Verified |
| `modePreserveFeature2Title` | Standardized Evidence Manifest Export | मानकीकृत साक्ष्य मेनिफेस्ट निर्यात | [ ] Verified |
| `modePreserveFeature2Desc` | Generates a downloadable, tamper-evident JSON/PDF manifest containing cryptographic hashes, file metadata, capture timestamps, and contextual references. | डाउनलोड करने योग्य JSON/PDF मेनिफेस्ट तैयार करता है जिसमें क्रिप्टोग्राफ़िक हैश, फ़ाइल का प्रकार, समय और स्रोत विवरण दर्ज होते हैं। | [ ] Verified |
| `modePreserveFeature3Title` | Integrity vs. Authenticity Guidance | अखंडता बनाम प्रामाणिकता का मार्गदर्शन | [ ] Verified |
| `modePreserveFeature3Desc` | Provides clear legal guidance explaining that SHA-256 proves file integrity against modification, but does not substitute for 65B/63 certification under Indian evidence law. | स्पष्ट कानूनी जानकारी देता है कि SHA-256 फ़ाइल में बदलाव न होने को सिद्ध करता है, किंतु यह भारतीय साक्ष्य अधिनियम की धारा 65B/63 के प्रमाणपत्र का स्थान नहीं लेता। | [ ] Verified |
| `modePreserveLegal` | Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (formerly Section 65B of the Indian Evidence Act, 1872) governs the admissibility of electronic records in Indian courts. Hashing ensures a transparent chain of digital custody. | भारतीय साक्ष्य अधिनियम, 2023 (BNS/BSA) की धारा 63 (पूर्व में 65B) अदालतों में इलेक्ट्रॉनिक साक्ष्यों की स्वीकार्यता तय करती है। हैशिंग डिजिटल साक्ष्यों की सुरक्षा सुनिश्चित करती है। | [ ] Verified |
| `preserveTabHash` | Preserve & Hash Evidence | साक्ष्य सुरक्षित करें एवं हैश निकालें | [ ] Verified |
| `preserveTabVerify` | Verify Evidence Integrity | साक्ष्य सत्यता की जांच (Verify) | [ ] Verified |
| `preserveHeaderBadge` | Mode 02 · In-Browser Forensic Hashing | मोड 02 · ब्राउज़र में सुरक्षित फॉरेंसिक हैशिंग | [ ] Verified |
| `preserveTitle` | Evidence Preservation & Integrity Vault | साक्ष्य संचय एवं अखंडता तिजोरी | [ ] Verified |
| `preserveSubtitle` | Generate immutable SHA-256 cryptographic fingerprints of your screenshots and files. Everything is calculated locally on your device; files are never uploaded to any server or AI service. | अपने स्क्रीनशॉट और फ़ाइलों का अपरिवर्तनीय SHA-256 डिजिटल फिंगरप्रिंट तैयार करें। सब कुछ आपके डिवाइस पर ही संसाधित होता है; कोई भी फ़ाइल किसी सर्वर पर नहीं भेजी जाती। | [ ] Verified |
| `preserveDropTitle` | Drop evidence files here, or click to browse | साक्ष्य फ़ाइलें यहाँ खींचकर लाएँ, या चुनने के लिए क्लिक करें | [ ] Verified |
| `preserveDropSubtitle` | Supports screenshots, documents, audio, and videos up to 100 MB per file | स्क्रीनशॉट, दस्तावेज़, ऑडियो और वीडियो (प्रति फ़ाइल अधिकतम 100 MB) | [ ] Verified |
| `preserveDropFormats` | PNG, JPG, MP4, PDF, TXT, M4A, etc. | PNG, JPG, MP4, PDF, TXT, M4A आदि | [ ] Verified |
| `preserveSampleBtn` | Try with a sample file | नमूना फ़ाइल के साथ आज़माएँ | [ ] Verified |
| `preserveMemoryNotice` | In-Memory Only: All files and calculated fingerprints exist only in this browser tab memory. If you refresh or close this tab, data is discarded. Export your manifest to keep a permanent record. | केवल अस्थायी मेमोरी: सभी फ़ाइलें और फिंगरप्रिंट केवल इस ब्राउज़र टैब की मेमोरी में रहते हैं। टैब बंद करने पर वे स्वतः मिट जाते हैं। स्थायी रिकॉर्ड हेतु घोषणापत्र डाउनलोड करें। | [ ] Verified |
| `preserveFileSizeError` | File exceeds the 100 MB limit. Please compress or clip long screen recordings locally before hashing. | फ़ाइल 100 MB की सीमा से अधिक है। कृपया लंबी स्क्रीन रिकॉर्डिंग को छोटा करके पुनः प्रयास करें। | [ ] Verified |
| `preserveFileReadError` | Unable to read file contents on this device. Please check permissions. | डिवाइस पर फ़ाइल पढ़ने में समस्या आई। कृपया अनुमतियों की जांच करें। | [ ] Verified |
| `preserveHashingInProgress` | Calculating SHA-256 cryptographic fingerprint in browser memory... | ब्राउज़र में SHA-256 फिंगरप्रिंट तैयार किया जा रहा है... | [ ] Verified |
| `preserveItemsCount` | Preserved Evidence Items | संचित साक्ष्य सूची | [ ] Verified |
| `preserveFileNameLabel` | File Name | फ़ाइल का नाम | [ ] Verified |
| `preserveExcludeFileName` | Exclude file name from exported manifest (redact) | निर्यात किए जाने वाले घोषणापत्र से नाम छिपाएँ (redact) | [ ] Verified |
| `preserveOriginalCapturedLabel` | Original Capture Date & Time (Optional) | घटना या रिकॉर्डिंग की मूल तारीख व समय (वैकल्पिक) | [ ] Verified |
| `preserveOriginalCapturedHelper` | When this incident took place or when you captured this evidence | यह घटना कब हुई थी अथवा आपने साक्ष्य कब कैप्चर किया था | [ ] Verified |
| `preserveFileLastModifiedLabel` | File System Last Modified | फ़ाइल सिस्टम की अंतिम संशोधन तिथि | [ ] Verified |
| `preserveFileLastModifiedNote` | Unreliable: depends on local device clock and file transfer apps | अविश्वसनीय: यह डिवाइस की घड़ी और फ़ाइल शेयरिंग ऐप पर निर्भर करता है | [ ] Verified |
| `preserveSourceTypeLabel` | Source Channel | साक्ष्य का स्रोत | [ ] Verified |
| `preserveSourceTypeScreenshot` | Screenshot | स्क्रीनशॉट (Screenshot) | [ ] Verified |
| `preserveSourceTypeChat` | Chat Export / Message | चैट संदेश / बातचीत | [ ] Verified |
| `preserveSourceTypeWeb` | Web Page / Post URL | वेबसाइट / पोस्ट लिंक (URL) | [ ] Verified |
| `preserveSourceTypeOther` | Other Source | अन्य स्रोत | [ ] Verified |
| `preserveSourceRefLabel` | Source Reference (Account, Phone, or URL) | स्रोत संदर्भ (खाता, फ़ोन नंबर या लिंक) | [ ] Verified |
| `preserveExcludeSourceRef` | Exclude source reference from export (redact) | निर्यात से स्रोत संदर्भ छिपाएँ (redact) | [ ] Verified |
| `preserveNoteLabel` | Context / Private Note (Optional) | संदर्भ / निजी टिप्पणी (वैकल्पिक) | [ ] Verified |
| `preserveIncludeNote` | Include this note in the exported manifest | इस टिप्पणी को घोषणापत्र में शामिल करें | [ ] Verified |
| `preserveRemoveItem` | Remove Item | साक्ष्य हटाएं | [ ] Verified |
| `preserveShowPreview` | Show Preview | पूर्वावलोकन देखें | [ ] Verified |
| `preserveHidePreview` | Hide Preview | पूर्वावलोकन छिपाएँ | [ ] Verified |
| `preserveClickToUnblur` | Sensitive Content: Click to view preview | संवेदनशील सामग्री: पूर्वावलोकन देखने के लिए क्लिक करें | [ ] Verified |
| `preservePreviewNotice` | Previews are generated in local memory and blurred by default for your comfort. | आपकी सुविधा के लिए पूर्वावलोकन शुरुआत में धुंधला रखा गया है। | [ ] Verified |
| `preserveExportTitle` | Export Evidence Manifest | साक्ष्य घोषणापत्र प्राप्त करें | [ ] Verified |
| `preserveExportDesc` | Download a structured JSON manifest containing the SHA-256 fingerprints, timestamps, and metadata, or print an evidentiary summary sheet for police or legal submission. | सभी फ़िंगरप्रिंट, समय-मुहर और विवरण युक्त JSON फ़ाइल डाउनलोड करें, या पुलिस/वकील को देने हेतु प्रिंट/PDF सहेजें। | [ ] Verified |
| `preserveDownloadJsonBtn` | Download Manifest (JSON) | घोषणापत्र डाउनलोड करें (JSON) | [ ] Verified |
| `preservePrintPdfBtn` | Print / Save as PDF | प्रिंट करें / PDF के रूप में सहेजें | [ ] Verified |
| `preserveCopiedToast` | SHA-256 hash copied to clipboard | SHA-256 हैश कॉपी कर लिया गया है | [ ] Verified |
| `preserveCopyHash` | Copy SHA-256 Hash | SHA-256 हैश कॉपी करें | [ ] Verified |
| `preserveManifestLimitationsTitle` | Evidentiary Limitations & Notice | साक्ष्य सीमाएं एवं वैधानिक सूचना | [ ] Verified |
| `preserveManifestLimitationsText` | A cryptographic hash verifies that a specific file has not been altered since the moment of calculation. It does not prove the authenticity of the underlying content, the identity of the perpetrator, legal admissibility under Section 63 BSA / Section 65B IT Act, or that an official report has been filed. | डिजिटल हैश केवल यह प्रमाणित करता है कि गणना के बाद फ़ाइल की सामग्री में कोई बदलाव नहीं हुआ है। यह सामग्री की सत्यता, आरोपी की पहचान, धारा 63 BSA / 65B IT Act के तहत कानूनी स्वीकार्यता या शिकायत दर्ज होने का दावा नहीं करता। | [ ] Verified |
| `preserveUnsavedLeaveWarning` | You have preserved evidence items in this tab that have not been exported. Leaving this page will permanently clear them from memory. | आपके पास बिना सहेजे गए साक्ष्य मौजूद हैं। इस पृष्ठ को छोड़ने पर वे मेमोरी से पूरी तरह मिट जाएँगे। | [ ] Verified |
| `verifyTitle` | Verify Evidence Integrity | साक्ष्य अखंडता की जांच (Verify) | [ ] Verified |
| `verifySubtitle` | Compare an evidence file against a previously recorded SHA-256 fingerprint to verify whether its contents are intact and unmodified. | किसी भी फ़ाइल की तुलना पूर्व में दर्ज SHA-256 फिंगरप्रिंट से करें और जांचें कि उसकी सामग्री में कोई फेरबदल हुआ है या नहीं। | [ ] Verified |
| `verifyMethodCurrent` | Check Item from Current Session | वर्तमान सत्र की फ़ाइल से मिलान करें | [ ] Verified |
| `verifyMethodImport` | Import External Manifest (JSON) | बाहरी घोषणापत्र (JSON) आयात करें | [ ] Verified |
| `verifySelectCurrentItem` | Select preserved item to verify against: | जांच हेतु संचित साक्ष्य चुनें: | [ ] Verified |
| `verifyImportManifestBtn` | Select JSON Manifest to Load | JSON घोषणापत्र चुनें | [ ] Verified |
| `verifyDropTargetFile` | Select or drop the file to verify against the fingerprint | फिंगरप्रिंट से मिलान हेतु फ़ाइल चुनें या यहाँ लाएँ | [ ] Verified |
| `verifyCheckingIntegrity` | Reading file and calculating SHA-256 fingerprint... | फ़ाइल का SHA-256 फिंगरप्रिंट निकाला जा रहा है... | [ ] Verified |
| `verifyMatchTitle` | Fingerprint Match: Unaltered Content | फिंगरप्रिंट पूर्णतः समान: अप्रभावित सामग्री | [ ] Verified |
| `verifyMatchDesc` | This file’s contents match the recorded fingerprint. The exact sequence of bytes is identical to when the hash was originally calculated. | इस फ़ाइल की सामग्री पहले दर्ज किए गए डिजिटल फिंगरप्रिंट से पूरी तरह मेल खाती है। बाइट-दर-बाइट कोई बदलाव नहीं हुआ है। | [ ] Verified |
| `verifyMismatchTitle` | Fingerprint Mismatch: Different Content | फिंगरप्रिंट में अंतर: सामग्री परिवर्तित है | [ ] Verified |
| `verifyMismatchDesc` | This file is different from the one that was recorded. Even a tiny change (such as cropping, re-saving, compression by WhatsApp, or editing) changes the SHA-256 fingerprint completely. | यह फ़ाइल पहले दर्ज की गई फ़ाइल से भिन्न है। यदि फ़ाइल को थोड़ा भी काटा (crop) गया हो, दोबारा सहेजा गया हो या WhatsApp पर भेजा गया हो, तो फिंगरप्रिंट पूरी तरह बदल जाता है। | [ ] Verified |
| `verifyInvalidManifest` | Invalid manifest file. Please select a valid Kavach evidence JSON manifest. | अमान्य घोषणापत्र फ़ाइल। कृपया कवच द्वारा जारी वैध JSON फ़ाइल चुनें। | [ ] Verified |
| `verifyPrivacyLink` | Read our Privacy & Cryptographic Principles | हमारे गोपनीयता एवं क्रिप्टोग्राफ़िक नियम पढ़ें | [ ] Verified |
| `preserveSha256FingerprintLabel` | SHA-256 Fingerprint | SHA-256 डिजिटल फिंगरप्रिंट | [ ] Verified |
| `preserveHashedTimestampLabel` | Hashed Timestamp (Local / UTC): | हैश समय-मुहर (स्थानीय / UTC): | [ ] Verified |
| `preserveIncidentRefLabel` | Incident Reference / Title (Optional) | घटना संदर्भ / शीर्षक (वैकल्पिक) | [ ] Verified |
| `preserveIncidentRefPlaceholder` | e.g. NCRP Complaint Prep / Police Visit | जैसे NCRP शिकायत तैयारी / पुलिस रिपोर्ट | [ ] Verified |
| `verifyExpectedLabel` | Expected: | अपेक्षित फिंगरप्रिंट: | [ ] Verified |
| `verifyComputedLabel` | Computed for selected file: | चुनी गई फ़ाइल का फिंगरप्रिंट: | [ ] Verified |
| `verifyTargetRefLabel` | Target Reference Fingerprint | लक्ष्य संदर्भ फिंगरप्रिंट | [ ] Verified |
| `verifySelectedFileLabel` | Selected file: | चुनी गई फ़ाइल: | [ ] Verified |
| `verifySelectFileBtn` | Select File to Verify | जांच हेतु फ़ाइल चुनें | [ ] Verified |
| `verifyNoSessionItems` | No items preserved in current session. Please preserve files first or import a JSON manifest. | वर्तमान सत्र में कोई साक्ष्य नहीं है। पहले साक्ष्य संचय करें या JSON घोषणापत्र आयात करें। | [ ] Verified |
| `verifyLoadedManifestNotice` | Loaded manifest with {count} entries. | {count} प्रविष्टियों वाला घोषणापत्र लोड किया गया। | [ ] Verified |
| `guidanceCatGeneral` | General Forensic Capture | सामान्य फॉरेंसिक साक्ष्य संचय | [ ] Verified |
| `guidanceCatBlackmail` | Blackmail / Extortion | ब्लैकमेल एवं सेक्स्टॉर्शन | [ ] Verified |
| `guidanceCatNcii` | Intimate Image Threat | अंतरंग तस्वीर या वीडियो की धमकी | [ ] Verified |
| `guidanceCatImpersonation` | Fake Profile / Impersonation | फ़र्ज़ी प्रोफ़ाइल एवं प्रतिरूपण | [ ] Verified |
| `guidanceCatStalking` | Cyber-Stalking / Harassment | साइबर-स्टॉकिंग एवं ऑनलाइन पीछा | [ ] Verified |

## 6. Mode 03: Complaint Drafting (Report) (113 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `modeReportTitle` | Draft Complaint | शिकायत प्रारूप (Report) | [ ] Verified |
| `modeReportSubtitle` | Editable Hindi & English Legal Grievance | संपादनीय हिंदी एवं अंग्रेजी कानूनी शिकायत | [ ] Verified |
| `modeReportDesc` | Generate structured, ready-to-file complaint drafts tailored to Indian law (IT Act 2000 & BNS 2023) for cybercrime.gov.in or your local Cyber Police station. | भारतीय सूचना प्रौद्योगिकी अधिनियम 2000 और BNS 2023 की धाराओं के साथ तैयार कानूनी शिकायत का प्रारूप प्राप्त करें, जिसे cybercrime.gov.in या पुलिस स्टेशन में दिया जा सके। | [ ] Verified |
| `modeReportTag` | IT Act & BNS 2023 Formats | IT Act एवं BNS 2023 प्रारूप | [ ] Verified |
| `modeReportFeature1Title` | Bilingual Structured Complaint Drafting | द्विभाषी संरचित कानूनी शिकायत प्रारूप | [ ] Verified |
| `modeReportFeature1Desc` | Generates formal grievance documents ready for submission to the National Cyber Crime Reporting Portal (cybercrime.gov.in) or local police stations. | राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (cybercrime.gov.in) अथवा स्थानीय पुलिस स्टेशन में जमा करने हेतु औपचारिक शिकायत पत्र तैयार करता है। | [ ] Verified |
| `modeReportFeature2Title` | Statutory Section Mapping | कानूनी धाराओं का स्वतः मिलान | [ ] Verified |
| `modeReportFeature2Desc` | Automatically links incidents to Sections 66E, 67, 67A of the IT Act 2000, and Sections 77 (Voyeurism), 78 (Stalking), and 79 (Outraging modesty) of Bharatiya Nyaya Sanhita (BNS) 2023. | घटना के आधार पर IT Act 2000 की धारा 66E, 67, 67A तथा BNS 2023 की धारा 77 (ताक-झांक), 78 (पीछा करना) और 79 (शील भंग) की धाराओं को जोड़ता है। | [ ] Verified |
| `modeReportFeature3Title` | Privacy-Preserving Redaction Tool | गोपनीयता सुरक्षा एवं संपादन उपकरण | [ ] Verified |
| `modeReportFeature3Desc` | Enables users to review and redact sensitive personal identifiers before copying or exporting the draft. | शिकायत पत्र की प्रतिलिपि बनाने से पहले संवेदनशील व्यक्तिगत जानकारी को छिपाने अथवा संपादित करने की सुविधा देता है। | [ ] Verified |
| `modeReportLegal` | Women have the statutory right under Indian law to lodge a "Zero-FIR" at any police station across India, regardless of where the cyber offence was committed or where the victim resides. | भारतीय कानून के तहत महिलाओं को किसी भी पुलिस स्टेशन में शून्य एफआईआर (Zero FIR) दर्ज कराने का वैधानिक अधिकार प्राप्त है, चाहे अपराध कहीं भी हुआ हो। | [ ] Verified |
| `reportHeaderBadge` | Mode 03 · Incident Complaint Drafter | मोड 03 · औपचारिक शिकायत प्रारूप (drafting) | [ ] Verified |
| `reportTitle` | Complaint & Takedown Request Drafter | शिकायत एवं सामग्री हटाने का प्रारूप | [ ] Verified |
| `reportSubtitle` | Draft a formal, structured complaint for the police (cybercrime.gov.in) or an urgent platform takedown notice. All processing is deterministic and private on your device. Kavach never submits complaints for you. | पुलिस (cybercrime.gov.in) या सोशल मीडिया मध्यवर्ती के लिए औपचारिक शिकायत तैयार करें। सभी प्रक्रियाएँ आपके डिवाइस पर निजी रूप से होती हैं। कवच कभी कोई शिकायत सीधे जमा नहीं करता। | [ ] Verified |
| `reportStep1Badge` | Step 1 of 6 · Document Type | चरण 1 / 6 · दस्तावेज़ का प्रकार | [ ] Verified |
| `reportStep1Title` | Select Document Type & Drafting Language | दस्तावेज़ का प्रकार एवं भाषा चुनें | [ ] Verified |
| `reportStep1Desc` | Choose whether you are preparing an official police complaint or an urgent platform grievance notice. | चुनें कि क्या आप पुलिस शिकायत तैयार कर रही हैं अथवा सोशल मीडिया प्लेटफ़ॉर्म के लिए नोटिस। | [ ] Verified |
| `reportDocTypePolice` | Police / Cybercrime Complaint | पुलिस / साइबर अपराध शिकायत | [ ] Verified |
| `reportDocTypePoliceDesc` | Formal complaint for National Cyber Crime Reporting Portal (cybercrime.gov.in) or any local police station (Zero FIR). | राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (cybercrime.gov.in) अथवा स्थानीय पुलिस स्टेशन (शून्य एफआईआर) हेतु। | [ ] Verified |
| `reportDocTypeTakedown` | Platform Takedown Request | सामग्री हटाने का नोटिस (Takedown) | [ ] Verified |
| `reportDocTypeTakedownDesc` | Urgent notice sent directly to the social media platform resident grievance officer requesting content removal. | सोशल मीडिया प्लेटफ़ॉर्म के रेज़िडेंट ग्रीवेंस अधिकारी को आपत्तिजनक सामग्री हटाने हेतु सीधा नोटिस। | [ ] Verified |
| `reportDocLangLabel` | Draft Output Language: | प्रारूप की भाषा: | [ ] Verified |
| `reportDocLangEn` | English | अंग्रेजी (English) | [ ] Verified |
| `reportDocLangHi` | Hindi | हिंदी | [ ] Verified |
| `reportStep2Badge` | Step 2 of 6 · Complainant Details | चरण 2 / 6 · शिकायतकर्ता का विवरण | [ ] Verified |
| `reportStep2Title` | About the Complainant (Optional) | शिकायतकर्ता का विवरण (वैकल्पिक) | [ ] Verified |
| `reportStep2Desc` | Enter your details if you want them in the draft, or leave them blank to fill in by hand later. Nothing is saved or sent. | यदि आप चाहती हैं तो अपना विवरण भरें, अथवा इसे खाली छोड़ दें और बाद में हाथ से लिखें। कुछ भी सहेजा या भेजा नहीं जाता। | [ ] Verified |
| `reportComplainantNotice` | You can leave this blank and fill it in by hand later. Nothing is saved or sent. | आप इसे खाली छोड़ सकती हैं और बाद में हाथ से लिख सकती हैं। कुछ भी सहेजा या भेजा नहीं जाता। | [ ] Verified |
| `reportNameLabel` | Your Full Name (Optional) | आपका पूरा नाम (वैकल्पिक) | [ ] Verified |
| `reportNamePlaceholder` | Leave blank or enter name | खाली छोड़ें अथवा नाम दर्ज करें | [ ] Verified |
| `reportContactLabel` | Phone Number / Email Address (Optional) | फ़ोन नंबर / ईमेल पता (वैकल्पिक) | [ ] Verified |
| `reportContactPlaceholder` | Phone number or email address | फ़ोन नंबर या ईमेल पता | [ ] Verified |
| `reportLocationLabel` | City, State, or Local Police Station (Optional) | शहर, राज्य अथवा स्थानीय थाना क्षेत्र (वैकल्पिक) | [ ] Verified |
| `reportLocationPlaceholder` | City or police jurisdiction | शहर या थाना क्षेत्र | [ ] Verified |
| `reportStep3Badge` | Step 3 of 6 · Incident Details | चरण 3 / 6 · घटना का ब्योरा | [ ] Verified |
| `reportStep3Title` | What Happened & Who Was Involved | क्या हुआ और कौन शामिल था | [ ] Verified |
| `reportStep3Desc` | Provide factual context. Missing details will become placeholders you can fill in later. | तथ्यात्मक जानकारी दें। जो जानकारी नहीं भरेंगी, वह बाद में भरने के लिए कोष्ठक में दिखाई देगी। | [ ] Verified |
| `reportCategoryLabel` | Incident Category | घटना की श्रेणी | [ ] Verified |
| `reportCategoryNotSure` | I am not sure / Multiple Categories | मुझे पक्का पता नहीं है / कई श्रेणियां | [ ] Verified |
| `reportDateTimeLabel` | Approximate Date & Time | घटना की अनुमानित तारीख व समय | [ ] Verified |
| `reportDateTimePlaceholder` | e.g. Last night around 9 PM, or between 15-20 October | जैसे कल रात लगभग 9 बजे, अथवा 15-20 अक्टूबर के बीच | [ ] Verified |
| `reportDateTimeHelper` | Free text — describe in your own words when this took place. | स्वतंत्र पाठ — अपने शब्दों में बताएं कि यह घटना कब हुई थी। | [ ] Verified |
| `reportPlatformLabel` | Platform or Communication Channel | प्लेटफ़ॉर्म अथवा संचार माध्यम | [ ] Verified |
| `reportPlatformPlaceholder` | e.g. WhatsApp, Instagram, Telegram, SMS, Email | जैसे WhatsApp, Instagram, Telegram, SMS, ईमेल | [ ] Verified |
| `reportSuspectLabel` | Suspect Identifiers (Handle, URL, Phone, or UPI ID) | आरोपी की पहचान (लिंक, यूज़रनेम, फ़ोन या UPI आईडी) | [ ] Verified |
| `reportSuspectPlaceholder` | e.g. Profile link, username, phone, or payment handle | प्रोफ़ाइल लिंक, यूज़रनेम, फ़ोन या UPI आईडी | [ ] Verified |
| `reportDescriptionLabel` | Description of the Incident (In Your Own Words) | घटना का विवरण (अपने शब्दों में) | [ ] Verified |
| `reportDescriptionGuidance` | Describe what was said or done. You do not need to describe any intimate image in detail. Refer to it by its evidence number instead. | वर्णन करें कि क्या कहा गया या क्या किया गया। आपको किसी अंतरंग तस्वीर का विस्तार से वर्णन करने की आवश्यकता नहीं है। उसके स्थान पर साक्ष्य संख्या का उल्लेख करें। | [ ] Verified |
| `reportDescriptionPlaceholder` | State what happened clearly in your own words... | घटना का स्पष्ट विवरण अपने शब्दों में लिखें... | [ ] Verified |
| `reportIntimateLabel` | Was intimate or sexually explicit content shared, threatened, or edited? | क्या अंतरंग या आपत्तिजनक सामग्री साझा की गई, धमकी दी गई या एडिट की गई? | [ ] Verified |
| `reportIntimateYes` | Yes — Intimate/sexual content was involved | हाँ — अंतरंग या व्यक्तिगत सामग्री शामिल थी | [ ] Verified |
| `reportIntimateNo` | No — Intimate content was not involved | नहीं — अंतरंग सामग्री शामिल नहीं थी | [ ] Verified |
| `reportIntimateNotSure` | Not Sure / Uncertain | पक्का नहीं / अनिश्चित | [ ] Verified |
| `reportMoneyLabel` | Was money demanded or paid (extortion)? | क्या पैसों की माँग की गई या भुगतान किया गया (जबरन वसूली)? | [ ] Verified |
| `reportMoneyYes` | Yes — Money was demanded or paid | हाँ — पैसों की माँग की गई | [ ] Verified |
| `reportMoneyNo` | No — No financial demand | नहीं — पैसों की कोई माँग नहीं थी | [ ] Verified |
| `reportMoneyAmountLabel` | Amount Demanded or Paid (Optional) | माँगी गई या दी गई रकम (वैकल्पिक) | [ ] Verified |
| `reportMoneyAmountPlaceholder` | e.g. Amount demanded | माँगी गई रकम | [ ] Verified |
| `reportStep4Badge` | Step 4 of 6 · Incident Timeline | चरण 4 / 6 · घटना का कालक्रम | [ ] Verified |
| `reportStep4Title` | Chronological Timeline of Events | घटनाओं का कालक्रम (क्रोनोलॉजिकल टाइमलाइन) | [ ] Verified |
| `reportStep4Desc` | Build a chronological sequence of events. Having dates and times helps the investigating officer track the sequence. | घटनाओं का क्रमबद्ध विवरण जोड़ें। तारीख और समय का क्रम जांच अधिकारी को मामले को समझने में सहायता करता है। | [ ] Verified |
| `reportAddTimelineRowBtn` | Add Timeline Event | घटना क्रम जोड़ें | [ ] Verified |
| `reportTimelineDateHeader` | Date / Time | तारीख / समय | [ ] Verified |
| `reportTimelineEventHeader` | What Happened | क्या घटित हुआ | [ ] Verified |
| `reportTimelineActionHeader` | Action | कार्यवाही | [ ] Verified |
| `reportTimelineRemoveRow` | Remove | हटाएं | [ ] Verified |
| `reportTimelineEmptyNotice` | No timeline events added yet. Click "Add Timeline Event" or proceed to include the overall approximate date. | अभी कोई घटना क्रम नहीं जोड़ा गया। "घटना क्रम जोड़ें" पर क्लिक करें अथवा समग्र तारीख के साथ आगे बढ़ें। | [ ] Verified |
| `reportStep5Badge` | Step 5 of 6 · Evidence Records | चरण 5 / 6 · साक्ष्य विवरण | [ ] Verified |
| `reportStep5Title` | Attach Evidence Fingerprints | डिजिटल साक्ष्य फिंगरप्रिंट जोड़ें | [ ] Verified |
| `reportStep5Desc` | Include cryptographic fingerprints from your preserved evidence. Files are never uploaded; only SHA-256 hashes are listed in the draft. | संचित साक्ष्यों के क्रिप्टोग्राफ़िक फिंगरप्रिंट शामिल करें। फ़ाइलें कभी अपलोड नहीं की जातीं; केवल SHA-256 हैश प्रारूप में जुड़ते हैं। | [ ] Verified |
| `reportEvidenceAdvisoryNote` | Keep your original files safe. Hand them over only to the investigating officer or official channel, never by uploading them here. | अपनी मूल फ़ाइलें सुरक्षित रखें। उन्हें केवल जांच अधिकारी या आधिकारिक चैनल को सौंपें, यहाँ कभी अपलोड न करें। | [ ] Verified |
| `reportEvidenceSelectSession` | Select items preserved in current session: | वर्तमान सत्र में सुरक्षित साक्ष्य चुनें: | [ ] Verified |
| `reportEvidenceNoSessionItems` | No items found in active session. You can import an exported Kavach manifest JSON, or preserve files in Mode 02. | वर्तमान सत्र में कोई साक्ष्य नहीं मिला। आप बाहरी घोषणापत्र आयात कर सकती हैं अथवा मोड 02 में साक्ष्य सुरक्षित कर सकती हैं। | [ ] Verified |
| `reportEvidenceImportManifestBtn` | Import Kavach Manifest (JSON) | कवच घोषणापत्र (JSON) आयात करें | [ ] Verified |
| `reportEvidenceSelectedCount` | Evidence items included in draft | प्रारूप में शामिल साक्ष्य | [ ] Verified |
| `reportStep6Badge` | Step 6 of 6 · Review, Redact & Export | चरण 6 / 6 · समीक्षा, संपादन एवं निर्यात | [ ] Verified |
| `reportStep6Title` | Review Draft, Redact Sensitive Data & Export | प्रारूप की समीक्षा, गोपनीयता संपादन एवं निर्यात | [ ] Verified |
| `reportStep6Desc` | Review your complete draft, verify legal suggestions, inspect redactions, and export the official or redacted copy. | अपने प्रारूप की समीक्षा करें, कानूनी सुझाव देखें, पहचान छिपाने के विकल्प चुनें और आधिकारिक अथवा गोपनीय प्रति प्राप्त करें। | [ ] Verified |
| `reportPlaceholderCountBadge` | {count} placeholders still to fill | {count} स्थान अभी भरने शेष हैं | [ ] Verified |
| `reportNoPlaceholdersLeft` | All placeholders filled! Ready for review. | सभी आवश्यक स्थान भर दिए गए हैं! प्रारूप तैयार है। | [ ] Verified |
| `reportRegenerateWarningTitle` | Overwrite Custom Edits? | किए गए बदलाव बदलें? | [ ] Verified |
| `reportRegenerateWarningDesc` | You have made manual edits to the draft text. Regenerating will replace your custom edits with the template output. Are you sure you want to proceed? | आपने प्रारूप में अपने हाथ से बदलाव किए हैं। पुनः तैयार करने पर आपके किए गए बदलाव हट जाएँगे। क्या आप आगे बढ़ना चाहती हैं? | [ ] Verified |
| `reportRegenerateConfirmBtn` | Yes, Regenerate Draft | हाँ, प्रारूप पुनः तैयार करें | [ ] Verified |
| `reportRegenerateCancelBtn` | Keep My Edits | मेरे बदलाव रखें | [ ] Verified |
| `reportResetDraftBtn` | Regenerate Draft from Form Data | फ़ॉर्म के आधार पर पुनः तैयार करें | [ ] Verified |
| `reportProvisionsPanelTitle` | Provisions you can ask the police or a lawyer about | कानूनी प्रावधान जिन पर आप पुलिस या वकील से विचार करने को कह सकती हैं | [ ] Verified |
| `reportProvisionsPanelDesc` | These are suggestions for a qualified person to verify. This is not legal advice. | ये किसी योग्य व्यक्ति द्वारा जांचने हेतु सुझाव हैं। यह कानूनी सलाह नहीं है। | [ ] Verified |
| `reportProvisionsCheckboxLabel` | Include suggested provisions in my draft | मेरे प्रारूप में सुझाए गए कानूनी प्रावधान शामिल करें | [ ] Verified |
| `reportProvisionsUnverifiedBadge` | Not yet verified by a legal professional | अभी किसी कानूनी विशेषज्ञ द्वारा सत्यापित नहीं | [ ] Verified |
| `reportRedactionPanelTitle` | Client-Side Redaction & Output Versions | ब्राउज़र में संपादन एवं दो संस्करण | [ ] Verified |
| `reportRedactionPanelDesc` | Choose what to conceal when sharing with trusted helpers. Official police submissions should keep suspect handles and URLs. | विश्वासपात्र सहायकों से साझा करते समय अपनी पहचान छिपाएँ। आधिकारिक पुलिस शिकायत में आरोपी के हैंडल और लिंक रहने दें। | [ ] Verified |
| `reportRedactionCustomWordLabel` | Add words or names to hide (e.g. school name, colleague): | छिपाने के लिए अतिरिक्त शब्द या नाम जोड़ें (जैसे स्कूल का नाम, सहकर्मी): | [ ] Verified |
| `reportRedactionCustomWordPlaceholder` | Enter word and click Add | शब्द लिखें और जोड़ें पर क्लिक करें | [ ] Verified |
| `reportRedactionAddWordBtn` | Add Word | शब्द जोड़ें | [ ] Verified |
| `reportRedactionWarningNotice` | Automatic redaction cannot catch everything. Read the text yourself before sharing. A school name, a nickname, or a unique username can still identify you. | स्वचालित संपादन सब कुछ नहीं पकड़ सकता। साझा करने से पहले स्वयं अवश्य पढ़ें। स्कूल का नाम, उपनाम या विशिष्ट यूज़रनेम आपकी पहचान उजागर कर सकता है। | [ ] Verified |
| `reportVersionFullTab` | Official Full Version (For Police / Grievance Officer) | आधिकारिक पूर्ण प्रति (पुलिस / शिकायत अधिकारी हेतु) | [ ] Verified |
| `reportVersionRedactedTab` | Redacted Copy (For Trusted Helpers / Advocates) | संपादित गोपनीय प्रति (सहायकों / सलाहकारों हेतु) | [ ] Verified |
| `reportVersionFullDesc` | Contains all details including perpetrator handles, URLs, and payment IDs for official investigation. | आधिकारिक जांच हेतु आरोपी के सभी हैंडल, लिंक और भुगतान विवरण सुरक्षित रखता है। | [ ] Verified |
| `reportVersionRedactedDesc` | Replaces selected personal details with [REDACTED] to protect your identity when seeking peer support. | सहायता लेते समय आपकी पहचान सुरक्षित रखने हेतु व्यक्तिगत जानकारी को [REDACTED] से बदल देता है। | [ ] Verified |
| `reportExportCopyBtn` | Copy to Clipboard | क्लिपबोर्ड पर कॉपी करें | [ ] Verified |
| `reportExportTxtBtn` | Download Text (.txt) | टेक्स्ट फ़ाइल डाउनलोड करें (.txt) | [ ] Verified |
| `reportExportPdfBtn` | Print / Save as PDF | प्रिंट करें / PDF के रूप में सहेजें | [ ] Verified |
| `reportCopiedToast` | Draft copied to clipboard! | प्रारूप क्लिपबोर्ड पर कॉपी हो गया! | [ ] Verified |
| `reportPlaceholderModalTitle` | Unresolved Placeholders in Draft | प्रारूप में शेष खाली स्थान | [ ] Verified |
| `reportPlaceholderModalDesc` | Your draft still contains unresolved bracketed placeholders (such as {placeholders}). You can export now and write them by hand, or return to edit. | आपके प्रारूप में अभी भी कोष्ठक वाले खाली स्थान मौजूद हैं (जैसे {placeholders})। आप इसे अभी डाउनलोड करके बाद में हाथ से लिख सकती हैं, या वापस जाकर संपादन कर सकती हैं। | [ ] Verified |
| `reportPlaceholderModalProceedBtn` | Proceed with Export Anyway | फिर भी डाउनलोड / कॉपी करें | [ ] Verified |
| `reportPlaceholderModalReviewBtn` | Return and Edit Draft | वापस जाकर प्रारूप पूरा करें | [ ] Verified |
| `reportWhereToSubmitTitle` | Where and How to Submit Your Complaint | अपनी शिकायत कहाँ और कैसे दर्ज कराएं | [ ] Verified |
| `reportWhereToSubmitDesc` | Kavach does not submit complaints. You submit this yourself through an official channel. | कवच शिकायत दर्ज नहीं करता। आप इसे आधिकारिक माध्यम से स्वयं दर्ज कराती हैं। | [ ] Verified |
| `reportWhereToSubmitPortalLink` | Submit online at National Cyber Crime Reporting Portal (cybercrime.gov.in) | राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल पर ऑनलाइन दर्ज कराएं (cybercrime.gov.in) | [ ] Verified |
| `reportWhereToSubmitZeroFirLink` | Learn about your Zero FIR rights at any local police station | किसी भी पुलिस थाने में शून्य एफआईआर के अधिकार जानें | [ ] Verified |
| `reportWhereToSubmitDisclaimer` | Kavach is a client-side assistive drafting companion. It does not file complaints, issue police FIRs, or provide legal representation. | कवच एक क्लाइंट-साइड शिकायत प्रारूप सहायक है। यह पुलिस रिपोर्ट दर्ज नहीं करता और न ही कानूनी प्रतिनिधित्व प्रदान करता है। | [ ] Verified |
| `reportProceedToTrackBtn` | Track This Complaint in Tracker | इस शिकायत को ट्रैकर में दर्ज करें | [ ] Verified |

## 7. Mode 04: Incident Tracking & Timers (Track) (130 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `modeTrackTitle` | Track Report | ट्रैकिंग (Track) | [ ] Verified |
| `modeTrackSubtitle` | Statutory Deadlines & Follow-ups | कानूनी समय-सीमा एवं स्थिति निगरानी | [ ] Verified |
| `modeTrackDesc` | Monitor Rule 3(2)(b) statutory takedown deadlines (24-hour mandatory window for non-consensual imagery) and keep an offline log of submission acknowledgments. | आईटी नियमों के तहत अनिवार्य समय-सीमाओं (तस्वीर हटाने के लिए 24 घंटे की बाध्यता) और पुलिस शिकायत रसीद संख्या का सुरक्षित ऑफलाइन रिकॉर्ड रखें। | [ ] Verified |
| `modeTrackTag` | 24-Hour Statutory Takedowns | 24 घंटे में सामग्री हटाने का नियम | [ ] Verified |
| `modeTrackFeature1Title` | 24-Hour & 72-Hour Statutory Countdown Timers | 24 घंटे एवं 72 घंटे की कानूनी उलटी गिनती | [ ] Verified |
| `modeTrackFeature1Desc` | Monitors the mandatory 24-hour intermediary takedown deadline for intimate imagery and the 72-hour window for general cyber grievances. | निजी तस्वीरों को हटाने हेतु 24 घंटे की अनिवार्य समय-सीमा और अन्य साइबर शिकायतों हेतु 72 घंटे की समय-सीमा पर नज़र रखता है। | [ ] Verified |
| `modeTrackFeature2Title` | Private Local Acknowledgment Ledger | निजी स्थानीय शिकायत रसीद बही | [ ] Verified |
| `modeTrackFeature2Desc` | Securely records National Cyber Crime Portal (cybercrime.gov.in) acknowledgment tokens and police station diary numbers (GD/DD entries). | राष्ट्रीय साइबर अपराध पोर्टल (cybercrime.gov.in) की पावती संख्या और पुलिस रोजनामचा प्रविष्टियों (GD/DD) को केवल आपके ब्राउज़र में सुरक्षित रखता है। | [ ] Verified |
| `modeTrackFeature3Title` | Escalation & Follow-Up Templates | अनुवर्ती कार्रवाई एवं स्मरण पत्र प्रारूप | [ ] Verified |
| `modeTrackFeature3Desc` | Pre-formatted reminder notices addressed to Chief Grievance Officers and state Cyber Crime Cells when platforms fail to respond within legal deadlines. | यदि सोशल मीडिया प्लेटफॉर्म समय पर सामग्री न हटाए, तो उनके मुख्य ग्रीवेंस ऑफिसर और राज्य साइबर सेल को भेजने हेतु अनुवर्ती पत्र का प्रारूप देता है। | [ ] Verified |
| `modeTrackLegal` | Failure by social media intermediaries to take down non-consensual intimate imagery within 24 hours can strip them of "safe harbor" protection under Section 79 of the IT Act. | सोशल मीडिया प्लेटफॉर्म यदि 24 घंटे के भीतर आपत्तिजनक सामग्री नहीं हटाते हैं, तो वे IT Act की धारा 79 के तहत मिलने वाली कानूनी सुरक्षा खो देते हैं। | [ ] Verified |
| `trackModeBadge` | MODE 04 / TRACK | मोड 04 / ट्रैकिंग | [ ] Verified |
| `trackModeTitle` | Complaint & Deadline Tracker | शिकायत एवं समय सीमा ट्रैकर | [ ] Verified |
| `trackModeSubtitle` | Record report submissions, monitor statutory deadlines, and follow up safely | दर्ज शिकायतें रिकॉर्ड करें, कानूनी समय सीमा की निगरानी करें और सुरक्षित कदम उठाएं | [ ] Verified |
| `trackModeScopeDesc` | Track complaints filed on cybercrime.gov.in, police stations (FIR / Zero FIR), or platforms. Monitor mandatory 24-hour and 72-hour statutory removal windows. | cybercrime.gov.in, पुलिस थाने (FIR / Zero FIR) अथवा सोशल मीडिया पर दर्ज शिकायतों का रिकॉर्ड रखें। 24 घंटे और 72 घंटे की अनिवार्य निष्कासन समय सीमा की निगरानी करें। | [ ] Verified |
| `trackPrivacyBanner` | In-Memory Tab Privacy: All tracking numbers, dates, and notes exist only in your current browser session. Nothing is ever sent to any server or saved to your device automatically. | टैब मेमोरी गोपनीयता: आपके सभी संदर्भ नंबर, तारीखें और टिप्पणियां केवल आपके वर्तमान ब्राउज़र सत्र में रहती हैं। कोई भी जानकारी किसी सर्वर पर नहीं भेजी जाती। | [ ] Verified |
| `trackZeroStorageNotice` | Zero storage retention. Export your encrypted ledger or summary sheet before closing this window. | डिवाइस पर कोई डेटा स्थायी रूप से नहीं रखा जाता। विंडो बंद करने से पहले अपना लेज़र या सारांश पत्र डाउनलोड कर लें। | [ ] Verified |
| `trackAddRecordBtn` | Add Complaint Record | शिकायत रिकॉर्ड जोड़ें | [ ] Verified |
| `trackStartTimerBtn` | Start Statutory Timer | कानूनी टाइमर शुरू करें | [ ] Verified |
| `trackSampleDataBtn` | Try with Sample Record | नमूने का रिकॉर्ड आज़माएं | [ ] Verified |
| `trackSampleDataLoadedToast` | Loaded synthetic demo tracking records and statutory timers! | नमूना ट्रैकिंग रिकॉर्ड एवं कानूनी टाइमर लोड किए गए! | [ ] Verified |
| `trackExportBtn` | Export Ledger | लेज़र निर्यात करें | [ ] Verified |
| `trackImportBtn` | Import Ledger | लेज़र आयात करें | [ ] Verified |
| `trackClearBtn` | Clear Ledger | लेज़र साफ करें | [ ] Verified |
| `trackClearConfirmTitle` | Clear All Tracking Records in Memory? | मेमोरी में सहेजे सभी रिकॉर्ड हटाएं? | [ ] Verified |
| `trackClearConfirmDesc` | This will delete all tracking records and countdown timers held in memory. If you have not exported your ledger, this data will be lost. | यह मेमोरी में मौजूद सभी शिकायत रिकॉर्ड और टाइमर मिटा देगा। यदि आपने लेज़र निर्यात नहीं किया है, तो यह डेटा खो जाएगा। | [ ] Verified |
| `trackConfirmClearBtn` | Yes, Clear All | हाँ, सब साफ करें | [ ] Verified |
| `trackTimersSectionTitle` | Statutory Countdown Timers | वैधानिक उल्टी गिनती टाइमर | [ ] Verified |
| `trackTimersSectionSubtitle` | Track compliance reminder windows under the IT Rules 2021 | आईटी नियम 2021 के अंतर्गत अनुस्मारक समय सीमाओं की निगरानी | [ ] Verified |
| `trackNoTimersNotice` | No active countdown timers. Start a 24-hour NCII removal timer or grievance acknowledgment timer to track reminders. | कोई सक्रिय टाइमर नहीं है। समय सीमा ट्रैक करने के लिए 24 घंटे का अंतरंग सामग्री निष्कासन टाइमर या शिकायत पावती टाइमर शुरू करें। | [ ] Verified |
| `trackTimerActiveBadge` | Active Countdown | सक्रिय उल्टी गिनती | [ ] Verified |
| `trackTimerWarningBadge` | Deadline Approaching (< 4h) | समय सीमा निकट (< 4 घंटे) | [ ] Verified |
| `trackTimerExpiredBadge` | Statutory Window Expired — Time to Escalate | वैधानिक समय सीमा समाप्त — आगे कदम उठाएं | [ ] Verified |
| `trackTimerCompletedBadge` | Completed / Action Taken | संपन्न / कार्रवाई पूरी | [ ] Verified |
| `trackTimerRemaining` | Remaining | शेष समय | [ ] Verified |
| `trackTimerHours` | h | घंटे | [ ] Verified |
| `trackTimerMinutes` | m | मिनट | [ ] Verified |
| `trackTimerSeconds` | s | सेकंड | [ ] Verified |
| `trackTimerOverdueBy` | Overdue by | समय सीमा समाप्त हुए | [ ] Verified |
| `trackTimerMarkResolvedBtn` | Mark Completed | पूर्ण चिह्नित करें | [ ] Verified |
| `trackTimerEscalateBtn` | View Escalation Steps | अगले कानूनी कदम देखें | [ ] Verified |
| `trackTimerDeleteBtn` | Delete Timer | टाइमर हटाएं | [ ] Verified |
| `trackAddTimerModalTitle` | Start Statutory Countdown Timer | नया कानूनी टाइमर शुरू करें | [ ] Verified |
| `trackAddTimerSelectType` | Select statutory timer preset: | वैधानिक समय सीमा चुनें: | [ ] Verified |
| `trackAddTimerPreset24h` | 24-Hour NCII Removal Window (Rule 3(2)(b)) | 24 घंटे की अंतरंग सामग्री निष्कासन समय सीमा (नियम 3(2)(b)) | [ ] Verified |
| `trackAddTimerPreset24hNcii` | 24-Hour NCII Removal Window (Rule 3(2)(b)) | 24 घंटे की अंतरंग सामग्री निष्कासन समय सीमा (नियम 3(2)(b)) | [ ] Verified |
| `trackAddTimerPreset24hAck` | 24-Hour Grievance Acknowledgment (Rule 3(2)(a)) | 24 घंटे की शिकायत पावती (नियम 3(2)(a)) | [ ] Verified |
| `trackAddTimerPreset72h` | 72-Hour Removal Request Window (Other Content) | 72 घंटे की अन्य सामग्री निष्कासन समय सीमा | [ ] Verified |
| `trackAddTimerPreset72hRemoval` | 72-Hour Removal Request Window (Other Content) | 72 घंटे की अन्य सामग्री निष्कासन समय सीमा | [ ] Verified |
| `trackAddTimerPreset15d` | 15-Day Grievance Resolution Window (Rule 3(2)(a)) | 15 दिन की पूर्ण शिकायत निस्तारण समय सीमा (नियम 3(2)(a)) | [ ] Verified |
| `trackAddTimerPresetCustom` | Custom Reminder Duration | कस्टम अनुस्मारक अवधि | [ ] Verified |
| `trackTimerPersonalReminderNotice` | A Kavach timer is a personal reminder, not proof that a valid complaint was received. | कवच टाइमर एक व्यक्तिगत अनुस्मारक है, यह इस बात का प्रमाण नहीं है कि वैध शिकायत प्राप्त हुई थी। | [ ] Verified |
| `trackTimerPlatformReceiptNotice` | from the time the platform received your complaint | प्लेटफॉर्म द्वारा आपकी शिकायत प्राप्त करने के समय से | [ ] Verified |
| `trackUnverifiedLegalBadge` | Not yet verified by a legal professional. Check the current rules before relying on this. | कानूनी पेशेवर द्वारा अभी तक सत्यापित नहीं किया गया है। इस पर निर्भर रहने से पहले वर्तमान नियमों की जांच करें। | [ ] Verified |
| `trackAddTimerLinkRecord` | Link to a complaint record (optional): | किसी दर्ज शिकायत से जोड़ें (वैकल्पिक): | [ ] Verified |
| `trackAddTimerNoRecordLink` | None (Standalone timer) | कोई नहीं (स्वतंत्र टाइमर) | [ ] Verified |
| `trackAddTimerCustomHoursLabel` | Custom duration (in hours): | अवधि (घंटों में): | [ ] Verified |
| `trackAddTimerCustomTitleLabel` | Custom reminder label: | अनुस्मारक का नाम: | [ ] Verified |
| `trackAddTimerSubmitBtn` | Start Timer | टाइमर शुरू करें | [ ] Verified |
| `trackAddTimerCancelBtn` | Cancel | रद्द करें | [ ] Verified |
| `trackLedgerSectionTitle` | Complaint Submission Ledger | शिकायत पंजीकरण लेज़र | [ ] Verified |
| `trackLedgerSectionSubtitle` | In-memory log of your police, cyber cell, platform, and NCW submissions | पुलिस, साइबर सेल, सोशल मीडिया और NCW में दर्ज शिकायतों का इन-मेमोरी रिकॉर्ड | [ ] Verified |
| `trackFilterAll` | All Records | सभी रिकॉर्ड | [ ] Verified |
| `trackFilterSubmitted` | Submitted | दर्ज | [ ] Verified |
| `trackFilterUnderInvestigation` | Under Investigation | जांच जारी | [ ] Verified |
| `trackFilterActionTaken` | Action Taken / Closed | कार्रवाई संपन्न / बंद | [ ] Verified |
| `trackSearchPlaceholder` | Search by reference number, authority, or notes... | संदर्भ नंबर, संस्था या टिप्पणी से खोजें... | [ ] Verified |
| `trackNoRecordsNotice` | No complaint records logged in this session yet. Click "Add Complaint Record" or "Try with Sample Record" to begin. | इस सत्र में अभी कोई शिकायत दर्ज नहीं है। शुरू करने के लिए "शिकायत रिकॉर्ड जोड़ें" या "नमूने का रिकॉर्ड आज़माएं" पर क्लिक करें। | [ ] Verified |
| `trackRefNumberLabel` | Reference / Ack No: | संदर्भ / पावती संख्या: | [ ] Verified |
| `trackSubmissionTypeLabel` | Authority / Platform: | संस्था / माध्यम: | [ ] Verified |
| `trackSubmittedDateLabel` | Submitted On: | दर्ज करने की तारीख: | [ ] Verified |
| `trackStatusLabel` | Current Status: | वर्तमान स्थिति: | [ ] Verified |
| `trackOfficerLabel` | Officer in Charge: | जांच अधिकारी / प्रभारी: | [ ] Verified |
| `trackContactLabel` | Official Contact: | अधिकारी संपर्क: | [ ] Verified |
| `trackNotesLabel` | Follow-up Diary & Notes: | अनुवर्ती डायरी एवं विवरण: | [ ] Verified |
| `trackAddNoteBtn` | Add Note | टिप्पणी जोड़ें | [ ] Verified |
| `trackAddNotePlaceholder` | Add a new dated follow-up note (e.g. called IO, visited cyber cell, received ticket)... | नई दिनांकित टिप्पणी लिखें (जैसे IO को फोन किया, साइबर सेल गए, टिकट मिला)... | [ ] Verified |
| `trackSaveNoteBtn` | Save Note | टिप्पणी सहेजें | [ ] Verified |
| `trackDeleteRecordBtn` | Delete Record | रिकॉर्ड हटाएं | [ ] Verified |
| `trackEditRecordBtn` | Edit Details | विवरण बदलें | [ ] Verified |
| `trackCopiedRefToast` | Reference number copied to clipboard! | संदर्भ संख्या क्लिपबोर्ड पर कॉपी हो गई! | [ ] Verified |
| `trackStatusDrafted` | Draft Prepared | प्रारूप तैयार | [ ] Verified |
| `trackStatusSubmitted` | Submitted | दर्ज किया गया | [ ] Verified |
| `trackStatusAcknowledged` | Acknowledged | पावती प्राप्त | [ ] Verified |
| `trackStatusUnderInvestigation` | Under Investigation | जांच जारी | [ ] Verified |
| `trackStatusContentRemoved` | Content Removed / Action Taken | सामग्री हटाई गई / कार्रवाई संपन्न | [ ] Verified |
| `trackStatusEscalated` | Escalated | आगे भेजा गया | [ ] Verified |
| `trackStatusClosed` | Closed / FIR Registered | बंद / FIR दर्ज | [ ] Verified |
| `trackAuthNcrp` | National Cyber Crime Reporting Portal (NCRP) | राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (NCRP) | [ ] Verified |
| `trackAuthPolice` | Police Station / Cyber Crime Police Station | पुलिस थाना / साइबर अपराध थाना | [ ] Verified |
| `trackAuthPlatform` | Platform Grievance Officer | सोशल मीडिया शिकायत अधिकारी | [ ] Verified |
| `trackAuthNcw` | National Commission for Women (NCW) | राष्ट्रीय महिला आयोग (NCW) | [ ] Verified |
| `trackAuthGac` | Grievance Appellate Committee (GAC) | शिकायत अपीलीय समिति (GAC) | [ ] Verified |
| `trackAuthOther` | Other Authority / Court | अन्य प्राधिकरण / न्यायालय | [ ] Verified |
| `trackRecordModalAddTitle` | Add Complaint Submission Record | नया शिकायत रिकॉर्ड जोड़ें | [ ] Verified |
| `trackRecordModalEditTitle` | Edit Complaint Record | शिकायत रिकॉर्ड संपादित करें | [ ] Verified |
| `trackRecordModalAuthorityLabel` | Submission Authority / Channel: | शिकायत दर्ज करने का माध्यम: | [ ] Verified |
| `trackRecordModalTitleLabel` | Authority or Platform Name: | थाने या प्लेटफॉर्म का नाम: | [ ] Verified |
| `trackRecordModalTitlePlaceholder` | e.g. New Delhi Cyber Police Station or Instagram Grievance Office | जैसे नई दिल्ली साइबर थाना या Instagram Grievance Office | [ ] Verified |
| `trackRecordModalRefLabel` | Acknowledgment / FIR / Ticket Number: | पावती / FIR / शिकायत टिकट संख्या: | [ ] Verified |
| `trackRecordModalRefPlaceholder` | e.g. 2026/NCRP/984210, FIR No. 42/2026, or META-GRV-84920 | जैसे 2026/NCRP/984210, FIR 42/2026, या META-GRV-84920 | [ ] Verified |
| `trackRecordModalDateLabel` | Date & Time Submitted: | दर्ज करने की तारीख एवं समय: | [ ] Verified |
| `trackRecordModalStatusLabel` | Current Status: | वर्तमान स्थिति: | [ ] Verified |
| `trackRecordModalOfficerLabel` | Investigating Officer / Contact Person (optional): | जांच अधिकारी या संपर्क व्यक्ति (वैकल्पिक): | [ ] Verified |
| `trackRecordModalOfficerPlaceholder` | e.g. Inspector R. Sharma or Support Specialist | जैसे इंस्पेक्टर आर. शर्मा या सपोर्ट विशेषज्ञ | [ ] Verified |
| `trackRecordModalContactLabel` | Officer Phone or Email (optional): | अधिकारी का फोन या ईमेल (वैकल्पिक): | [ ] Verified |
| `trackRecordModalContactPlaceholder` | e.g. cybercell@delhipolice.gov.in or 011-23456789 | जैसे cybercell@delhipolice.gov.in या 011-23456789 | [ ] Verified |
| `trackRecordModalCategoryLabel` | Incident Category: | घटना की श्रेणी: | [ ] Verified |
| `trackRecordModalNotesLabel` | Initial Note or Notes: | प्रारंभिक टिप्पणी या विवरण: | [ ] Verified |
| `trackRecordModalNotesPlaceholder` | e.g. Handed physical complaint with SHA-256 hashes; officer promised inquiry within 48h. | जैसे SHA-256 हैश के साथ लिखित शिकायत दी; अधिकारी ने 48 घंटे में जांच का आश्वासन दिया। | [ ] Verified |
| `trackRecordModalSaveBtn` | Save to Memory | मेमोरी में सहेजें | [ ] Verified |
| `trackRecordModalCancelBtn` | Cancel | रद्द करें | [ ] Verified |
| `trackEscalationSectionTitle` | Statutory Follow-Up & Escalation Guides | वैधानिक अनुवर्ती एवं अपील मार्गदर्शन | [ ] Verified |
| `trackEscalationSectionSubtitle` | Exact legal procedures when platforms delay takedowns or police refuse registration | जब प्लेटफॉर्म सामग्री न हटाए या पुलिस शिकायत न ले, तब उठाए जाने वाले कानूनी कदम | [ ] Verified |
| `trackEscalationViewStepsBtn` | View Escalation Steps & Sample Notice | कदम एवं नोटिस प्रारूप देखें | [ ] Verified |
| `trackEscalationCopyNoticeBtn` | Copy Escalation Notice | अपील नोटिस कॉपी करें | [ ] Verified |
| `trackEscalationNoticeCopiedToast` | Escalation notice copied to clipboard! | अपील नोटिस क्लिपबोर्ड पर कॉपी हो गया! | [ ] Verified |
| `trackEscalationCloseBtn` | Close Guide | मार्गदर्शन बंद करें | [ ] Verified |
| `trackExportModalTitle` | Export Tracking Ledger & Summary | ट्रैकिंग लेज़र एवं सारांश निर्यात | [ ] Verified |
| `trackExportJsonBtn` | Download Structured JSON (.json) | संरचित JSON फ़ाइल डाउनलोड करें (.json) | [ ] Verified |
| `trackExportJsonDesc` | Saves full ledger and timers as a file you can re-import later to continue tracking across sessions without cloud storage. | पूरे लेज़र और टाइमर को एक सुरक्षित फ़ाइल के रूप में सहेजें जिसे आप बाद में बिना सर्वर के पुनः लोड कर सकती हैं। | [ ] Verified |
| `trackExportTxtBtn` | Download Text Summary (.txt) | टेक्स्ट सारांश डाउनलोड करें (.txt) | [ ] Verified |
| `trackExportTxtDesc` | Human-readable summary of all submissions, reference numbers, officer notes, and deadlines. | सभी संदर्भ नंबरों, तारीखों, अधिकारी विवरण और टाइमर की पढ़ने योग्य सरल फ़ाइल। | [ ] Verified |
| `trackExportPdfBtn` | Print / Save as PDF | प्रिंट करें / PDF के रूप में सहेजें | [ ] Verified |
| `trackExportPdfDesc` | Formatted paper-ready summary sheet to carry to the police station or lawyer. | पुलिस थाने या अधिवक्ता के पास ले जाने हेतु तैयार संरचित सारांश पत्र। | [ ] Verified |
| `trackImportModalTitle` | Import Previously Exported Ledger | पहले सहेजा गया लेज़र आयात करें | [ ] Verified |
| `trackImportModalDesc` | Select a previously saved kavach-tracking-ledger-*.json file to restore your tracking records and timers in memory. | अपने पिछले सत्र का kavach-tracking-ledger-*.json फ़ाइल चुनें ताकि मेमोरी में आपके रिकॉर्ड और टाइमर बहाल हो सकें। | [ ] Verified |
| `trackImportUploadBtn` | Select JSON File | JSON फ़ाइल चुनें | [ ] Verified |
| `trackImportSuccessToast` | Successfully restored tracking records and timers into memory! | ट्रैकिंग रिकॉर्ड एवं टाइमर मेमोरी में सफलतापूर्वक बहाल हो गए! | [ ] Verified |
| `trackImportErrorToast` | Import failed: invalid or corrupt JSON file. | आयात विफल: अमान्य या दूषित JSON फ़ाइल। | [ ] Verified |

## 8. Demo Scenario & Guided Tour (27 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `clearEverythingNow` | Clear everything now | सब कुछ अभी मिटाएं | [ ] Verified |
| `clearEverythingModalTitle` | Clear all in-memory data? | क्या आप सभी डेटा मिटाना चाहते हैं? | [ ] Verified |
| `clearEverythingModalBody` | This will immediately wipe all preserved evidence, tracking records, complaint drafts, and respond answers from this browser tab. This cannot be undone. | यह इस ब्राउज़र टैब से सभी संरक्षित साक्ष्य, ट्रैकिंग रिकॉर्ड, शिकायत ड्राफ्ट और उत्तर तुरंत मिटा देगा। इसे पूर्ववत नहीं किया जा सकता है। | [ ] Verified |
| `clearEverythingConfirmBtn` | Clear Everything | सब कुछ मिटाएं | [ ] Verified |
| `clearEverythingSuccessToast` | All in-memory data has been completely wiped. | सभी डेटा पूरी तरह से मिटा दिया गया है। | [ ] Verified |
| `demoRunBtn` | Demo with fictional data | काल्पनिक डेटा के साथ डेमो | [ ] Verified |
| `demoBannerTitle` | Demo: fictional data | डेमो: काल्पनिक डेटा | [ ] Verified |
| `demoBannerDesc` | Viewing coherent sample data across all modes. Nothing is saved or sent. | सभी मोड में काल्पनिक डेटा देख रहे हैं। कुछ भी सहेजा या भेजा नहीं जा रहा है। | [ ] Verified |
| `demoExitBtn` | Exit demo and clear | डेमो से बाहर निकलें और डेटा मिटाएं | [ ] Verified |
| `tourStartBtn` | Guided Tour | मार्गदर्शित टूर | [ ] Verified |
| `tourModalTitle` | Kavach Guided Tour | कवच मार्गदर्शित टूर | [ ] Verified |
| `tourStep1Title` | Quick Exit & Helplines | त्वरित निकास एवं हेल्पलाइन | [ ] Verified |
| `tourStep1Desc` | Press Esc at any moment or click the red Quick Exit button to immediately leave this site. 24/7 emergency helplines (112, 181, 1930) are always accessible in the footer. | किसी भी क्षण Esc दबाएं या लाल Quick Exit बटन पर क्लिक करके तुरंत इस साइट से बाहर निकलें। 24/7 आपातकालीन हेल्पलाइन (112, 181, 1930) फुटर में हमेशा उपलब्ध हैं। | [ ] Verified |
| `tourStep2Title` | Bilingual English & Hindi | द्विभाषी अंग्रेज़ी एवं हिंदी | [ ] Verified |
| `tourStep2Desc` | Switch smoothly between English and natural, everyday Hindi at any time using the header language toggle. All playbooks, drafts, and tools are 100% bilingual. | शीर्ष हेडर टॉगल से किसी भी समय अंग्रेज़ी और सरल, सहज हिंदी के बीच बदलें। सभी प्लेबुक, ड्राफ्ट और टूल्स 100% द्विभाषी हैं। | [ ] Verified |
| `tourStep3Title` | Respond: First-Hour Crisis Triage | Respond: पहले घंटे का सुरक्षा प्लेबुक | [ ] Verified |
| `tourStep3Desc` | Assess immediate danger, choose from 7 cyber-abuse categories, and receive clear Do Now, Do Not Do, and platform lockdown checklists. | तात्कालिक खतरे का आकलन करें, 7 साइबर अपराध श्रेणियों में से चुनें, और क्या करें, क्या न करें तथा प्लेटफॉर्म सुरक्षा चेकलिस्ट प्राप्त करें। | [ ] Verified |
| `tourStep4Title` | Preserve: Cryptographic Evidence Vault | Preserve: सुरक्षित साक्ष्य वॉल्ट | [ ] Verified |
| `tourStep4Desc` | Compute tamper-evident SHA-256 hashes locally in your browser using the Web Crypto API without uploading files anywhere, and export a canonical manifest. | फ़ाइलों को कहीं भी अपलोड किए बिना वेब क्रिप्टो एपीआई का उपयोग करके अपने ब्राउज़र में स्थानीय रूप से SHA-256 हैश तैयार करें और मैनिफेस्ट डाउनलोड करें। | [ ] Verified |
| `tourStep5Title` | Report: Structured Police & Takedown Drafter | Report: औपचारिक शिकायत एवं निष्कासन ड्राफ्टर | [ ] Verified |
| `tourStep5Desc` | Generate deterministic complaints following the strict 7-section police format, complete with client-side entity redaction to conceal personal PII. | व्यक्तिगत पहचान छिपाने के लिए क्लाइंट-साइड रिडक्शन के साथ, 7-भागों वाले पुलिस प्रारूप में शिकायत ड्राफ्ट तैयार करें। | [ ] Verified |
| `tourStep6Title` | Track: Statutory Timers & Escalations | Track: कानूनी समय सीमा एवं अनुवर्ती कदम | [ ] Verified |
| `tourStep6Desc` | Manage complaint reference numbers, track statutory deadlines (24h NCII removal, 72h removal), view escalation paths if police or platforms fail to act, and export your portable ledger. | शिकायत संदर्भ संख्या प्रबंधित करें, कानूनी समय सीमा (24 घंटे अंतरंग सामग्री निष्कासन, 72 घंटे अन्य सामग्री) ट्रैक करें, और पोर्टेबल लेज़र निर्यात करें। | [ ] Verified |
| `tourNextBtn` | Next | आगे | [ ] Verified |
| `tourPrevBtn` | Previous | पीछे | [ ] Verified |
| `tourFinishBtn` | Got it | समझ गए | [ ] Verified |
| `tourSkipBtn` | Skip Tour | टूर छोड़ें | [ ] Verified |

## 9. General Legal Notices & Badges (9 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `heroBadge` | Zero Data Retention | शून्य डेटा भंडारण | [ ] Verified |
| `heroBadgeNoUploads` | Zero Remote Uploads | शून्य रिमोट अपलोड | [ ] Verified |
| `heroBadgeShaOnly` | Client-Side SHA-256 Only | केवल ब्राउज़र में SHA-256 | [ ] Verified |
| `homeSafetyNoticeTitle` | Your Safety First: | आपकी सुरक्षा सर्वोपरि: | [ ] Verified |
| `homeSafetyNoticeText` | Files and screenshots selected on Kavach remain strictly on your device. We do not store personal details, and we do not use tracking scripts. You can use this tool safely to prepare reports before visiting a police station or filing online. | कवच पर चुनी गई फ़ाइलें और स्क्रीनशॉट पूरी तरह से आपके डिवाइस पर ही रहते हैं। हम आपकी निजी जानकारी कभी जमा नहीं करते हैं और न ही किसी ट्रैकर का उपयोग करते हैं। पुलिस स्टेशन जाने या ऑनलाइन शिकायत करने से पहले आप यहाँ सुरक्षित तैयारी कर सकते हैं। | [ ] Verified |
| `comingSoonBadge` | Phase 1 Shell Active | चरण 1 सक्रिय | [ ] Verified |
| `comingSoonNotice` | Foundation shell is active. Full interactive functionality is scheduled for implementation in upcoming modules. | आधारभूत ढांचा सक्रिय है। आगामी चरणों में इसकी संपूर्ण इंटरएक्टिव कार्यक्षमता जोड़ी जाएगी। | [ ] Verified |
| `zeroNetworkNotice` | Zero network requests in this mode | इस मोड में कोई नेटवर्क अनुरोध नहीं भेजा जाता | [ ] Verified |
| `generalLegalNotice` | Legal information on Kavach is general and has not yet been reviewed by a lawyer. Verify before relying on it. | कवच पर कानूनी जानकारी सामान्य है और अभी तक किसी वकील द्वारा इसकी समीक्षा नहीं की गई है। इस पर भरोसा करने से पहले सत्यापन करें। | [ ] Verified |

## 10. Miscellaneous & Accessibility (46 keys)

| Translation Key | English (Source) | Hindi (लक्ष्य अनुवाद) | Reviewer Status |
|---|---|---|:---:|
| `mainNavAria` | Main Navigation | मुख्य नेविगेशन | [ ] Verified |
| `switchToEnglish` | Switch interface language to English | इंटरफ़ेस भाषा अंग्रेजी में बदलें | [ ] Verified |
| `switchToHindi` | Switch interface language to Hindi | इंटरफ़ेस भाषा हिंदी में बदलें | [ ] Verified |
| `close` | Close | बंद करें | [ ] Verified |
| `heroTitle` | Confidential Cyber-Abuse Response & Reporting Companion | सुरक्षित, निजी साइबर-उत्पीड़न सहायता एवं रिपोर्टिंग साथी | [ ] Verified |
| `heroSubtitle` | A calm, secure tool for women in India dealing with online harassment, non-consensual imagery, blackmail, or cyber-stalking. Your evidence stays on your device. | ऑनलाइन उत्पीड़न, अनधिकृत तस्वीरें/वीडियो, ब्लैकमेल या साइबर-स्टॉकिंग से प्रभावित महिलाओं के लिए एक शांत और सुरक्षित माध्यम। आपके साक्ष्य केवल आपके डिवाइस पर रहते हैं। | [ ] Verified |
| `homeFourStepsTitle` | Four Steps of Action | कार्रवाई के चार चरण | [ ] Verified |
| `homeFourStepsSubtitle` | Select a mode to begin | आरंभ करने के लिए कोई विकल्प चुनें | [ ] Verified |
| `openMode` | Open Mode | मोड खोलें | [ ] Verified |
| `previewTag` | Foundation Preview | आधारभूत पूर्वावलोकन | [ ] Verified |
| `learnMore` | Learn More | विस्तार से जानें | [ ] Verified |
| `homePrivacyStandardTitle` | Kavach Privacy & Integrity Standard | कवच गोपनीयता एवं सत्यनिष्ठा मानक | [ ] Verified |
| `homePrivacyStandard1Title` | No Remote File Storage | कोई सर्वर फ़ाइल भंडारण नहीं | [ ] Verified |
| `homePrivacyStandard1Desc` | Kavach does not send your evidence files, answers, or drafts anywhere. Your browser loads the app itself from the host. | कवच आपकी साक्ष्य फ़ाइलें, उत्तर या शिकायत ड्राफ्ट कहीं भी नहीं भेजता है। आपका ब्राउज़र केवल होस्ट से ऐप लोड करता है। | [ ] Verified |
| `homePrivacyStandard2Title` | Cryptographic Fingerprinting | क्रिप्टोग्राफ़िक फ़िंगरप्रिंटिंग | [ ] Verified |
| `homePrivacyStandard2Desc` | Local SHA-256 digests create an unforgeable record of evidence integrity. | स्थानीय SHA-256 डाइजेस्ट साक्ष्यों के साथ छेड़छाड़ न होने का पक्का प्रमाण बनाते हैं। | [ ] Verified |
| `homePrivacyStandard3Title` | Zero Third-Party Telemetry | शून्य थर्ड-पार्टी टेलीमेट्री | [ ] Verified |
| `homePrivacyStandard3Desc` | No advertising pixels, telemetry cookies, or behavioral trackers. | कोई विज्ञापन पिक्सेल, ट्रैकिंग कुकीज़ या व्यवहारिक निगरानी नहीं। | [ ] Verified |
| `backToHome` | Return to Home | मुख्य पृष्ठ पर लौटें | [ ] Verified |
| `stepBack` | Back | पीछे जाएँ | [ ] Verified |
| `stepNext` | Next Step | अगला चरण | [ ] Verified |
| `stepSkip` | Skip This Question | यह प्रश्न छोड़ें | [ ] Verified |
| `continueBtn` | Continue | आगे बढ़ें | [ ] Verified |
| `resetAll` | Start Over | पुनः आरंभ करें | [ ] Verified |
| `completed` | Completed | पूर्ण | [ ] Verified |
| `progressText` | Progress | प्रगति | [ ] Verified |
| `externalLinkText` | Open external link | बाहरी लिंक खोलें | [ ] Verified |
| `comingSoonTitle` | Module Architecture In Foundation Phase | यह मॉड्यूल आधारभूत चरण में सक्रिय है | [ ] Verified |
| `moduleScopeTitle` | Module Architecture & Scope | मॉड्यूल रूपरेखा एवं दायरा | [ ] Verified |
| `plannedFeaturesTitle` | Specification & Technical Features | विशिष्टताएँ एवं तकनीकी सुविधाएँ | [ ] Verified |
| `dangerAlertHeading` | Immediate Emergency Assistance | तात्कालिक आपातकालीन सहायता | [ ] Verified |
| `dangerAlertBody` | If you or someone near you is in immediate physical danger, please contact local emergency authorities right away. Your life and physical well-being come before all digital or social media issues. | यदि आप या आपके आसपास कोई व्यक्ति तात्कालिक शारीरिक खतरे में है, तो कृपया तुरंत पुलिस आपातकालीन नंबर पर कॉल करें। आपका जीवन और शारीरिक सुरक्षा किसी भी डिजिटल परेशानी से पहले आती है। | [ ] Verified |
| `dangerCall112Btn` | Call 112 (Police Emergency) | 112 पर कॉल करें (पुलिस आपातकालीन सेवा) | [ ] Verified |
| `dangerProceedSafeBtn` | I am in a safe location — Proceed to digital plan | मैं सुरक्षित स्थान पर हूँ — डिजिटल योजना पर आगे बढ़ें | [ ] Verified |
| `dangerRecheckYesBtn` | Yes, I am in physical danger | हाँ, मुझे शारीरिक खतरा है | [ ] Verified |
| `dangerRecheckNoBtn` | No, I am physically safe right now | नहीं, मैं इस समय सुरक्षित हूँ | [ ] Verified |
| `doNowTab` | Do Now (Immediate Containment) | अभी करें (तात्कालिक सुरक्षा) | [ ] Verified |
| `doNotDoTab` | Do NOT Do (Protect Evidence) | यह बिल्कुल न करें (साक्ष्य रक्षा) | [ ] Verified |
| `whenReadyTab` | When Ready (Reporting & Follow-up) | तैयार होने पर (रिपोर्टिंग) | [ ] Verified |
| `platformLockdownTitle` | Platform Account Lockdown Guides | सोशल मीडिया खाता सुरक्षा मार्गदर्शिका | [ ] Verified |
| `checklistProgressTitle` | First-Hour Action Progress: | पहले घंटे के कदमों की प्रगति: | [ ] Verified |
| `checklistAllDone` | All high-priority containment steps completed! | सभी महत्वपूर्ण सुरक्षा कदम पूरे हो चुके हैं! | [ ] Verified |
| `changeCategoryBtn` | Change Incident Category | घटना की श्रेणी बदलें | [ ] Verified |
| `continueToPreserve` | Preserve Evidence (Local Hash) | साक्ष्य संचय करें (SHA-256 हैश) | [ ] Verified |
| `continueToReport` | Draft Formal Complaint | शिकायत प्रारूप तैयार करें | [ ] Verified |
| `continueToTrack` | Track Report Status | रिपोर्ट की स्थिति ट्रैक करें | [ ] Verified |

---

## Professional Translation Reviewer Sign-Off

- **Reviewer Name**: ___________________________
- **Organization / Credentials**: ___________________________
- **Date Reviewed**: ___________________________
- **Quality Score (1-5)**: ______
- **Linguistic / Trauma-Informed Comments**:
  _________________________________________________________________
  _________________________________________________________________
