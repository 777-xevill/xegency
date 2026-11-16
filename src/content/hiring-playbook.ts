/**
 * The recruiting playbook shown in the /hiring dashboard: Facebook posts,
 * WhatsApp messages, call script, interview scorecard and the trial week.
 * {link} and {name} are filled in by the dashboard.
 */

export const careersUrl = "https://www.xegency.com/careers";

export const postBn = `📢 নিয়োগ বিজ্ঞপ্তি: Business Development Executive, Xegency (ঢাকা)

Xegency একটি সফটওয়্যার ও AI এজেন্সি। আমরা BEXIMCO, Square, PRAN, Ha-Meem, Royal Enfield ও BMW-এর মতো প্রতিষ্ঠানের জন্য সিস্টেম তৈরি করেছি। এখন আমাদের সেলস টিমে নতুন সদস্য নিচ্ছি।

💰 আয়: প্রতিটি ডিলের ২৫% কমিশন
(কমিশন-ভিত্তিক, কোনো ফিক্সড বেতন নেই, আয়ের কোনো সীমাও নেই)
উদাহরণ: ৳২,০০,০০০ টাকার প্রজেক্ট = আপনার আয় ৳৫০,০০০

📋 কাজ:
• প্রতিদিন ৫০টি কল
• প্রতিদিন ৫টি সরাসরি মিটিং (ঢাকার মধ্যে)
• ব্যবসার মালিক ও ম্যানেজারদের কাছে আমাদের কাজ তুলে ধরা

✅ যা লাগবে:
• পরিষ্কার বাংলা, বেসিক ইংরেজি
• আত্মবিশ্বাসের সাথে কথা বলার দক্ষতা
• স্মার্টফোন ও WhatsApp
• অভিজ্ঞতা জরুরি নয়, ট্রেনিং আমরা দেব। শিক্ষার্থীরাও আবেদন করতে পারেন।

🚫 কোনো রেজিস্ট্রেশন ফি, জামানত বা ট্রেনিং ফি নেই। কেউ Xegency-এর নামে টাকা চাইলে সেটা আমরা নই।

👉 আবেদন করুন (৫ মিনিট, CV লাগবে না):
{link}`;

export const postEn = `📢 Hiring: Business Development Executive, Xegency (Dhaka)

Xegency is a software and AI agency. We've built systems for BEXIMCO, Square, PRAN, Ha-Meem, Royal Enfield and BMW, and we're growing our sales team.

💰 Pay: 25% commission on every deal you close
(Commission only, no fixed salary, no cap on earnings)
Example: a ৳2,00,000 project = ৳50,000 for you

📋 The work:
• 50 calls a day
• 5 face-to-face meetings a day, inside Dhaka
• Presenting our work to business owners and managers

✅ You need:
• Clear Bangla and basic English
• Confidence talking to people
• A smartphone with WhatsApp
• No experience required. We train you. Students welcome.

🚫 No registration fee, deposit or training fee. If anyone asks for money in Xegency's name, it isn't us.

👉 Apply in 5 minutes, no CV needed:
{link}`;

export const commentReply = `ধন্যবাদ! আবেদন করতে এই লিংকে যান (৫ মিনিট লাগবে): {link}
ইনবক্সে CV পাঠানোর দরকার নেই, ফর্মটাই যথেষ্ট।`;

export const groupSearches = [
  "Jobs in Dhaka",
  "Job Circular BD",
  "Part Time Job Dhaka",
  "Sales and Marketing Jobs Bangladesh",
  "Fresher Jobs Bangladesh",
  "Student Part Time Job BD",
  "University job groups (DU, NSU, BRAC, AIUB, EWU, IUB, UIU)",
];

export const postingRules = [
  "Add ?src=<group-name> to the link for each group, so the dashboard shows which groups bring the best people.",
  "Post in each group once a week at most. Admins remove repeated posts and may ban the account.",
  "Best time to post is 8–10 pm, Saturday to Thursday.",
  "Read each group's rules first. Some only allow job posts on certain days.",
  "Reply to every comment within a few hours with the comment reply below. Don't move it to inbox.",
  "Post from a profile that shows Xegency as your workplace. It makes the post more trustworthy.",
];

export type StageMessage = { stage: string; label: string; text: string };

/** WhatsApp messages, one per move through the pipeline. */
export const whatsapp: StageMessage[] = [
  {
    stage: "new",
    label: "Book the phone call",
    text: `আসসালামু আলাইকুম {name}, আমি Xegency থেকে রিফাত বলছি। Business Development Executive পদে আপনার আবেদন পেয়েছি, ধন্যবাদ। আজ বা কাল ১০ মিনিট ফোনে কথা বলা যাবে? কোন সময়টা আপনার সুবিধা?`,
  },
  {
    stage: "called",
    label: "Invite to interview",
    text: `{name}, কথা বলে ভালো লাগলো। আপনাকে ৩০ মিনিটের একটি ইন্টারভিউতে আমন্ত্রণ জানাচ্ছি।
ইন্টারভিউতে আপনি আমাদের সামনে Xegency-কে পিচ করবেন, ধরে নিন আমরা একটা গার্মেন্টস ফ্যাক্টরির মালিক। প্রস্তুতির জন্য www.xegency.com/work দেখে নিন।
সময়: ___
স্থান/লিংক: ___`,
  },
  {
    stage: "interview",
    label: "Offer the trial week",
    text: `অভিনন্দন {name}! আপনাকে Xegency-এর ট্রায়াল উইকে স্বাগতম।
শুরু: ___ তারিখ, সকাল ১০টা
প্রথম দিন ট্রেনিং, তারপর আমাদের সাপোর্টে আসল কল ও মিটিং। এই সপ্তাহে কোনো ডিল ক্লোজ করলে তার ২৫% কমিশন আপনার।
মনে রাখবেন, কোনো ধাপেই আমরা কোনো টাকা নিই না।`,
  },
  {
    stage: "trial",
    label: "Welcome to the team",
    text: `{name}, আপনি এখন অফিশিয়ালি Xegency সেলস টিমের সদস্য। 🎉
প্রতিটি লিড যেদিন পাবেন সেদিনই লিড শিটে আপনার নামে লিখে রাখবেন, তাহলে কমিশন নিয়ে কখনো প্রশ্ন উঠবে না। স্বাগতম!`,
  },
  {
    stage: "rejected",
    label: "Polite no",
    text: `{name}, Xegency-তে আবেদন করার জন্য ধন্যবাদ। এই মুহূর্তে আমরা অন্য প্রার্থীদের নিয়ে এগোচ্ছি। ভবিষ্যতে নতুন সুযোগ এলে আপনাকে জানাবো। শুভকামনা রইলো।`,
  },
];

export const callScript = [
  "Introduce yourself and Xegency in one line, and confirm they have 10 minutes.",
  "\"Tell me about yourself in one minute.\" Listen for how clearly and confidently they speak.",
  "\"This is commission only, 25% per deal, no salary. Does that work for you right now?\" Ask this early. A hesitant answer is fine. A no ends the call politely.",
  "\"Can you do 50 calls and 5 meetings every day?\" Ask what else takes their time: classes, a job, family.",
  "\"Who do you know who runs a business?\" A strong network is a big plus.",
  "Answer their questions. Repeat that there is never a fee.",
  "If they're a good fit, book the interview before you hang up.",
];

export const scorecard = [
  { key: "communication", label: "Communication", hint: "Clear, polite, easy to follow" },
  { key: "confidence", label: "Confidence and energy", hint: "Would an owner give them 15 minutes?" },
  { key: "business", label: "Business sense", hint: "Talks about the client's problems, not our tech" },
  { key: "pitch", label: "Pitch quality", hint: "The role-play: opening, questions, close" },
  { key: "reliability", label: "Availability", hint: "Can actually do 50 calls + 5 meetings a day" },
];

export const trialWeek = [
  { day: "Day 1", body: "Training: our portfolio, what we sell, price ranges, the call script, the lead sheet." },
  { day: "Day 2", body: "Build a list of 100 target businesses in their area. Review it together." },
  { day: "Day 3–6", body: "50 calls and 5 meetings a day. Join their first two meetings. Review at 6 pm every day." },
  { day: "Day 7", body: "Review the numbers: calls, meetings, interested leads. Decide together: join the team or part as friends." },
];
