/**
 * Careers: the Business Development Executive role.
 * Everything a candidate reads on /careers lives here, so terms change in one place.
 */

export const role = {
  slug: "business-development-executive",
  title: "Business Development Executive",
  team: "Sales team",
  location: "Anywhere in Bangladesh",
  pay: "25% commission on every deal you close",
  type: "Commission only",
  summary:
    "Open doors for Xegency across Bangladesh. You find the businesses that need better software, websites and AI — and you start the conversation that turns into a project.",
};

/** The numbers, stated plainly. */
export const terms = [
  { label: "Your share", value: "25%", note: "of every deal you close, paid when the client pays" },
  { label: "Calls", value: "50", note: "outreach calls a day" },
  { label: "Meetings", value: "5", note: "face-to-face pitches a day" },
  { label: "Joining fee", value: "None", note: "we never ask you for money, ever" },
];

/** What a deal is worth to the person who closes it. Illustrative project sizes. */
export const earnings = [
  { deal: "Business website", size: "৳60,000", yours: "৳15,000" },
  { deal: "Custom dashboard or system", size: "৳2,00,000", yours: "৳50,000" },
  { deal: "AI agent or full platform", size: "৳5,00,000", yours: "৳1,25,000" },
];

export const day = [
  {
    title: "Find",
    body: "Build your own list of businesses: factories, showrooms, clinics, shops, exporters. We help you choose who to call.",
  },
  {
    title: "Call",
    body: "Fifty calls a day. Short, polite, useful: who you are, what we've built for companies like theirs, and a request for 15 minutes.",
  },
  {
    title: "Meet",
    body: "Five face-to-face meetings a day. Sit with the owner or manager, understand how they work, and show them work we've already shipped.",
  },
  {
    title: "Hand over",
    body: "When they're interested, bring Xegency in. We scope it, price it and build it. You stay the client's person and earn your 25%.",
  },
];

export const gives = [
  "A real portfolio to show: systems built for BEXIMCO, Square, PRAN, Ha-Meem, Royal Enfield and BMW",
  "A pitch deck, call scripts and answers to the questions owners ask",
  "Training in your first week, and help in every meeting you ask for",
  "Commission paid within 7 days of each client payment, with a written record of every deal",
  "An experience letter and a reference after three months of active work",
  "A path to a team lead role for people who close deals consistently",
];

export const fits = [
  "You can talk to a business owner with confidence and respect",
  "Your Bangla is clear and you can read and write basic English",
  "You can meet business owners in your area",
  "You have a smartphone with WhatsApp",
  "You keep going after a no. Most calls are a no",
];

export const steps = [
  { title: "Apply", time: "2 minutes", body: "Answer a few quick questions on this page. No CV needed." },
  { title: "Phone call", time: "within 3 days", body: "A 10-minute call to get to know you and answer your questions." },
  { title: "Interview", time: "30 minutes", body: "You pitch Xegency to us as if we were a factory owner. We give you feedback." },
  { title: "Trial week", time: "7 days", body: "Training, then real calls with our support. You earn commission on anything you close." },
];

export const careerFaqs = [
  {
    q: "Is there any fee, deposit or training charge?",
    a: "No. Xegency never asks candidates or team members for money: not for training, ID cards, materials or anything else. If anyone asks you to pay in our name, it isn't us. Report it to rifat@xegency.com.",
  },
  {
    q: "Is there a fixed salary?",
    a: "No. This role is commission only: 25% of the value of every deal you close, paid within 7 days of the client paying us. We say this up front so you can decide with the full picture.",
  },
  {
    q: "What counts as a deal I closed?",
    a: "A client you brought to us who signs and pays for a project. We record the lead in your name the day you send it to us, so there is never a question about whose client it is.",
  },
  {
    q: "Do I need sales experience?",
    a: "No. Experience helps, but we care more about how you speak to people and whether you keep going. The interview is a short pitch, not a test of your CV.",
  },
  {
    q: "Do I need to understand software or AI?",
    a: "No. You need to understand businesses: what slows them down and what costs them money. We train you on what we build and join any meeting that gets technical.",
  },
  {
    q: "Can students apply?",
    a: "Yes, if you can meet the daily targets: 50 calls and 5 face-to-face meetings. Many good salespeople start while they are studying.",
  },
];

/* --------------------------------------------------------- form options */

export const statusOptions = [
  "Student",
  "Working, looking for a change",
  "Between jobs",
  "Freelancer / self-employed",
];

export const experienceOptions = [
  "None yet",
  "Under 1 year",
  "1–3 years",
  "3+ years",
];

export const areaOptions = [
  "Dhaka",
  "Gazipur",
  "Narayanganj",
  "Chattogram",
  "Cumilla",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

export const sourceOptions = ["Facebook group", "Friend or family", "LinkedIn", "Xegency website"];

export const yesNo = ["Yes", "Not sure", "No"];

export const englishOptions = ["Basic", "Comfortable", "Fluent"];

/* --------------------------------------------------- recruiting pipeline */

export const stages = [
  { key: "new", label: "New" },
  { key: "called", label: "Phone call" },
  { key: "interview", label: "Interview" },
  { key: "trial", label: "Trial week" },
  { key: "hired", label: "On the team" },
  { key: "rejected", label: "Not now" },
] as const;

export type StageKey = (typeof stages)[number]["key"];
