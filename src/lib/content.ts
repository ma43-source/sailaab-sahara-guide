export type Lang = "ur" | "en";

export const t = {
  appName: { ur: "سیلاب سہارا", en: "Sailaab Sahara" },
  subtitle: { ur: "Flood Relief Rights Navigator", en: "Flood Relief Rights Navigator" },
  tagline: {
    ur: "سمجھنا آسان — سیلاب امداد کے بارے میں سادہ رہنمائی",
    en: "Samajhna Aasan — Understanding your flood relief options, made simple",
  },
  disclaimerBanner: {
    ur: "یہ ایک آزاد طالبِ علم کا منصوبہ ہے، جس کا NDMA، PDMA یا حکومتِ پاکستان سے کوئی تعلق نہیں۔ یہ صرف عمومی رہنمائی فراہم کرتا ہے، قانونی مشورہ نہیں۔ تفصیلات ہمیشہ اپنے مقامی PDMA/DDMA دفتر سے تصدیق کریں۔",
    en: "This is an independent student project, not affiliated with NDMA, PDMA, or the Government of Pakistan. It provides general guidance only, not legal advice. Always confirm details with your local PDMA/DDMA office.",
  },
  tabGuide: { ur: "رہنمائی", en: "Get guidance" },
  tabResources: { ur: "معلومات", en: "Resources" },
  formLabel: {
    ur: "اپنی صورتحال اپنے الفاظ میں لکھیں",
    en: "Describe your situation in your own words",
  },
  formHelp: {
    ur: "براہِ کرم شناختی کارڈ نمبر، فون نمبر یا مکمل گھر کا پتہ نہ لکھیں۔ صرف ضلع یا علاقے کا نام کافی ہے۔",
    en: "Please do not enter your CNIC number, phone number, or exact home address. District or area name is enough.",
  },
  placeholder: {
    ur: "مثال: مظفرگڑھ میں میرا گھر پانی سے متاثر ہوا، فصل تباہ ہو گئی، اور میرے پاس شناختی کارڈ کی کاپی نہیں ہے۔",
    en: "Example: My house in Muzaffargarh was damaged, I lost my crops, and I don't have a CNIC copy.",
  },
  submit: { ur: "رہنمائی حاصل کریں", en: "Get guidance" },
  loading: { ur: "آپ کی صورتحال دیکھی جا رہی ہے…", en: "Reviewing your situation…" },
  again: { ur: "نئی صورتحال لکھیں", en: "Start over" },
  emergency: { ur: "پہلے یہ کریں", en: "Do this first" },
  secEligibility: { ur: "آپ کس مدد کے اہل ہو سکتے ہیں", en: "What you may be eligible for" },
  secDocuments: { ur: "کن کاغذات کی ضرورت ہو گی", en: "Documents you'll likely need" },
  secSteps: { ur: "اگلے اقدامات", en: "Steps to take" },
  resourcesTitle: { ur: "عمومی معلومات", en: "General resources" },
  resourcesNote: {
    ur: "یہ عام عوامی معلومات ہیں، کسی سرکاری لائیو فیڈ سے حاصل نہیں کی گئیں۔ تفصیل کے لیے متعلقہ مقامی دفتر سے رابطہ کریں۔",
    en: "This is general public information, not sourced from a live government feed. Contact the relevant local office for details.",
  },
  langLabel: { ur: "زبان", en: "Language" },
  errorTitle: { ur: "کچھ مسئلہ ہوا", en: "Something went wrong" },
  provinceLabel: { ur: "صوبہ (اختیاری)", en: "Province (optional)" },
  districtLabel: { ur: "ضلع (اختیاری)", en: "District (optional)" },
  districtPlaceholder: { ur: "مثال: مظفرگڑھ", en: "e.g. Muzaffargarh" },
  provinceAny: { ur: "منتخب نہیں", en: "Not selected" },
} as const;

export const provinces: Array<Record<Lang, string>> = [
  { ur: "پنجاب", en: "Punjab" },
  { ur: "سندھ", en: "Sindh" },
  { ur: "خیبر پختونخوا", en: "Khyber Pakhtunkhwa" },
  { ur: "بلوچستان", en: "Balochistan" },
  { ur: "گلگت بلتستان", en: "Gilgit-Baltistan" },
  { ur: "آزاد جموں و کشمیر", en: "Azad Jammu & Kashmir" },
  { ur: "اسلام آباد", en: "Islamabad" },
];

export const resources: Array<{
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  action: Record<Lang, string>;
}> = [
  {
    title: { ur: "NDMA / PDMA ہنگامی امداد", en: "NDMA / PDMA emergency relief" },
    desc: {
      ur: "خیمے، خوراک، صاف پانی اور فوری نقصان کی امداد جو ضلعی انتظامیہ کے ذریعے دی جاتی ہے۔",
      en: "Tents, food, clean water and immediate damage relief distributed through district administration.",
    },
    action: {
      ur: "اپنے مقامی PDMA یا DDMA دفتر سے رابطہ کریں۔",
      en: "Contact your local PDMA or DDMA office.",
    },
  },
  {
    title: { ur: "BISP سیلاب نقد ادائیگی", en: "BISP flood cash payments" },
    desc: {
      ur: "بے نظیر انکم سپورٹ پروگرام کے ذریعے متاثرہ گھرانوں کے لیے نقد امداد کے مراکز۔",
      en: "Cash assistance for affected households through Benazir Income Support Programme centres.",
    },
    action: {
      ur: "قریبی BISP تحصیل دفتر یا کیمپ سائٹ سے معلوم کریں۔",
      en: "Ask at the nearest BISP tehsil office or campsite.",
    },
  },
  {
    title: { ur: "فصل کے نقصان کا معاوضہ", en: "Crop damage compensation" },
    desc: {
      ur: "زرعی زمین اور فصل کے نقصان کا سروے پٹواری اور محکمہ زراعت کے ذریعے ہوتا ہے۔",
      en: "Farmland and crop loss is surveyed by the patwari and the agriculture department.",
    },
    action: {
      ur: "اپنے علاقے کے پٹواری یا محکمہ زراعت کے دفتر میں نقصان درج کروائیں۔",
      en: "Register your loss with your local patwari or agriculture department office.",
    },
  },
  {
    title: { ur: "انشورنس کے دعوے", en: "Insurance claims" },
    desc: {
      ur: "اگر گھر، مویشی یا فصل کی انشورنس یا زرعی قرض موجود ہے تو دعویٰ ہو سکتا ہے۔",
      en: "If a home, livestock, crop policy or agri-loan cover exists, a claim may be possible.",
    },
    action: {
      ur: "اپنے بینک یا انشورنس کمپنی کی مقامی برانچ سے رابطہ کریں۔",
      en: "Contact your bank or insurance company's local branch.",
    },
  },
];
