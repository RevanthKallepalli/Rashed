// All site content lives here, so text and prices can be edited without touching components.

export const img = (name) => `${import.meta.env.BASE_URL}images/${name}`;

export const CONTACT = {
  phone: '+91 83411 92208',
  phoneRaw: '918341192208',
  email: 'mrfitnessandnutrition@gmail.com',
  instagram: 'm01Rashed',
};

// Every booking button opens WhatsApp chat with +91 83411 92208, with a message pre-filled.
export const WA_DEFAULT = "Hi Rashed, I'd like to book a consultation.";
export const waLink = (text = WA_DEFAULT) =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(text)}`;

export const MARQUEE = [
  'Mr. Telangana ×4', 'Mr. Hyderabad ×3', 'WPC State Gold 2025', 'Mr. Karimnagar ×2',
  'Misri Classic', 'Deccan Classic', 'Stallion Classic', 'Master Classic',
];

export const STATS = [
  { label: 'Years coaching', value: 8, suffix: '+', text: 'Transforming clients since before the first state title.' },
  { label: 'Certifications', value: 12, text: 'Training, nutrition, special population, CPR and AED.' },
  { label: 'Competition results', value: 24, text: 'Bodybuilding stages and powerlifting platforms, 2018 to 2025.' },
  { label: 'Mr. Telangana', value: 4, prefix: '×', text: '2018, 2019, 2020 and 2021.' },
];

export const WHY = [
  { icon: 'target', title: 'Certified & experienced', text: 'Twelve certifications and eight years on the gym floor.' },
  { icon: 'bar', title: 'Athlete-level planning', text: 'Programming built with the discipline of contest prep.' },
  { icon: 'trend', title: 'Proven results', text: 'Documented client transformations, tracked week by week.' },
  { icon: 'heart', title: 'Supportive & custom', text: 'Plans shaped around real routines, food habits and history.' },
  { icon: 'chat', title: 'Quick check-ins', text: 'Available on WhatsApp for fast answers and progress photos.' },
  { icon: 'shield', title: 'Sustainable results', text: 'Trusted by clients for change that lasts past the plan.' },
];

export const POSES = [
  { src: 'pose-1.jpg', tag: 'Front · arms overhead', title: 'Abdominal detail', alt: 'Front pose, arms overhead' },
  { src: 'pose-2.jpg', tag: 'Front · angled', title: 'Midsection & serratus', alt: 'Angled front pose, arms overhead' },
  { src: 'pose-3.jpg', tag: 'Front · relaxed', title: 'Full front', alt: 'Front relaxed pose, hands on hips' },
  { src: 'pose-4.jpg', tag: 'Back · relaxed', title: 'Back width', alt: 'Back pose' },
  { src: 'pose-5.jpg', tag: 'Back · detail', title: 'Back density', alt: 'Back pose, close' },
];

export const CERTS = [
  { name: 'Advanced Personal Training', cat: 'training', kg: '25', text: 'Program design, progression and coaching for one-to-one clients.' },
  { name: 'Advanced Functional Training', cat: 'training', kg: '25', text: 'Movement quality, mobility and strength that carries into daily life.' },
  { name: 'Cult Fitness Trainer Level 1', cat: 'training', kg: '20', text: 'Certified floor coaching standards, level one.' },
  { name: 'Cult Fitness Trainer Level 2', cat: 'training', kg: '20', text: 'Advanced coaching standards, level two.' },
  { name: 'Boss Fitness Peak Week', cat: 'training', kg: '15', text: 'Final-week contest preparation: water, carbs and presentation.' },
  { name: 'Humble Beast Workshop', cat: 'training', kg: '15', text: "Iqbal Syed's workshop on training and physique development." },
  { name: 'Female Fitness', cat: 'specialist', kg: '10', text: 'Training and nutrition adapted for women, including hormonal health.' },
  { name: 'Special Population', cat: 'specialist', kg: '10', text: 'Safe programming for seniors, injuries, PCOD/PCOS and thyroid clients.' },
  { name: 'Nutrition', cat: 'nutrition', kg: '5', text: 'Calorie and macro planning for fat loss, muscle gain and health.' },
  { name: 'Supplementation', cat: 'nutrition', kg: '5', text: 'Evidence-led advice on what to take, and what to skip.' },
  { name: 'CPR', cat: 'safety', kg: '2.5', text: 'Cardiopulmonary resuscitation, ready on the gym floor.' },
  { name: 'AED', cat: 'safety', kg: '2.5', text: 'Automated external defibrillator use in an emergency.' },
];

export const CERT_FILTERS = ['all', 'training', 'specialist', 'nutrition', 'safety'];

export const GOALS = [
  { k: 'Fat loss', t: 'Online', d: 'A calorie deficit that does not feel like one. Training keeps muscle on while the diet plan trims fat, with weekly weigh-ins and photo check-ins to adjust the numbers.', inc: ['Custom diet plan, 2–3 options per meal', 'Home or gym workout plan', 'Weekly check-ins and progress tracking', 'WhatsApp support'], focus: ['Steady weekly fat loss', 'Strength maintained', 'Habits that hold after the plan'], tags: ['Online', 'Home / Gym'] },
  { k: 'Muscle gain', t: 'Online', d: 'Progressive overload on a planned split, matched with a surplus large enough to grow and controlled enough to stay lean.', inc: ['Hypertrophy-focused training split', 'Surplus diet plan with meal swaps', 'Weekly strength and measurement review', 'Technique feedback on video'], focus: ['Lean mass gain', 'Rising working weights', 'Improved shape and proportion'], tags: ['Online', 'Gym based'] },
  { k: 'General fitness', t: 'Online', d: 'Stronger, fitter and more energetic for work and life. Balanced strength, conditioning and mobility in sessions that fit a busy calendar.', inc: ['Full-body strength and conditioning', 'Simple, flexible nutrition plan', 'Weekly check-ins', 'Home or gym options'], focus: ['Energy and stamina', 'Better posture and mobility', 'Consistent routine'], tags: ['Online', 'Home / Gym'] },
  { k: 'PCOD / PCOS', t: 'Special population', d: "Fat-loss plans written for PCOD and PCOS, combining strength training and a structured diet. Plans work alongside the client's doctor, never in place of medical care.", inc: ['Strength-led training plan', 'Structured diet with meal options', 'Gentle, sustainable progression', 'Weekly check-ins'], focus: ['Fat loss', 'Consistent energy', 'Routine that fits the cycle'], tags: ['Special population', 'Female fitness'] },
  { k: 'Thyroid', t: 'Special population', d: "Weight management planned around a thyroid condition: realistic targets, steady progression and close monitoring, alongside the client's medical treatment.", inc: ['Customised calorie targets', 'Strength and low-impact cardio', 'Close weekly monitoring', 'Adjustments as progress changes'], focus: ['Gradual weight management', 'Strength and energy', 'Sustainable habits'], tags: ['Special population'] },
  { k: 'Injury-safe fat loss', t: 'Special population', d: 'Fat loss with injury prevention built into every session. Exercise selection works around past injuries and builds the supporting muscles back up.', inc: ['Joint-friendly exercise selection', 'Functional strength and mobility', 'Diet plan for fat loss', 'Load managed week by week'], focus: ['Fat loss without flare-ups', 'Stronger supporting muscles', 'Confidence under the bar'], tags: ['Special population', 'Functional'] },
  { k: 'Senior fitness', t: 'Special population', d: 'Low-impact functional fitness for older adults: balance, strength and mobility for everyday independence, delivered at a safe, steady pace.', inc: ['Low-impact functional training', 'Balance and mobility work', 'Simple, nutritious diet guidance', 'CPR and AED certified coach'], focus: ['Everyday strength', 'Balance and fall prevention', 'Joint mobility'], tags: ['Special population', 'Low impact'] },
];

// Example day for the meal-swap demo (illustrative, not a client's real plan).
export const MEALS = [
  { n: 'Breakfast', t: '7:30 am', m: '450 kcal · P 35 · C 50 · F 12', o: ['Oats with whey, banana and peanut butter', 'Moong dal chilla with hung curd', 'Egg-white bhurji with 2 multigrain rotis'] },
  { n: 'Lunch', t: '1:30 pm', m: '600 kcal · P 45 · C 70 · F 15', o: ['Grilled chicken, jeera rice and dal', 'Paneer bhurji, rice and sabzi', 'Rajma chawal with salad and curd'] },
  { n: 'Snack', t: '5:00 pm', m: '250 kcal · P 20 · C 25 · F 8', o: ['Greek yogurt with berries', 'Roasted chana and buttermilk', 'Sprouts chaat with lemon'] },
  { n: 'Dinner', t: '8:30 pm', m: '550 kcal · P 40 · C 55 · F 17', o: ['Grilled fish, sautéed veg and roti', 'Tofu stir-fry with brown rice', 'Chicken tikka with salad and roti'] },
];

export const TRANSFORMATIONS = [
  { h: 'Back development', p: 'Width and detail through the lats and upper back.' },
  { h: 'Upper body recomposition', p: 'Fat down, chest and shoulders built up.' },
  { h: 'Lean to defined', p: 'From soft midsection to visible abs.' },
  { h: 'Full transformation', p: 'Major fat loss and a completely new physique.' },
].map((t, i) => ({ ...t, before: `client-${i + 1}-before.jpg`, after: `client-${i + 1}-after.jpg` }));

// [title, category, isPowerlifting]
export const RECORD = [
  ['2018', [['Mr. Telangana', 'Bodybuilding', 0]]],
  ['2019', [['Mr. Telangana', 'Bodybuilding', 0], ['Mr. Karimnagar', 'Bodybuilding', 0]]],
  ['2020', [['Mr. Telangana', 'Bodybuilding', 0], ['Mr. Hyderabad', 'Bodybuilding', 0]]],
  ['2021', [['Mr. Telangana', 'Bodybuilding', 0], ['Mr. Karimnagar', 'Bodybuilding', 0], ['Mr. Hyderabad', 'Bodybuilding', 0], ['Misri Classic', 'Bodybuilding', 0], ['Shafi Sami', 'Bodybuilding', 0], ['Hardwork Classic', 'Bodybuilding', 0]]],
  ['2023', [['Mr. Hyderabad', 'Bodybuilding', 0], ['A.R. Classic', 'Bodybuilding', 0]]],
  ['2024', [['WPC Bench Press', 'Overall winner', 1], ['One Fitness Gym Bench Press', 'Powerlifting', 1], ['Misri Classic', 'Bodybuilding', 0], ['Master Classic', 'Bodybuilding', 0], ['Mr. South India', 'Selections', 0], ['Mr. Telangana Iron Man Classic', 'Top 8', 0], ['A.R. Classic', 'Bodybuilding', 0], ['Deccan Classic', 'Bodybuilding', 0], ['Stallion Classic', 'Bodybuilding', 0]]],
  ['2025', [['WPC State Powerlifting Championship', 'Gold medalist', 1], ['Shafi Sami Classic', 'Powerlifting · overall title', 1]]],
];

export const ONLINE_PLANS = [
  { id: 'diet', mode: 'Online · one-time', title: 'Diet plan', items: ['Customised to goal and preferences', '2–3 options for every meal', 'Same calories whichever option is chosen'], cta: 'Ask about diet plan', plan: 'Diet Plan' },
  { id: 'online', mode: 'Most complete', title: '1 month online training', featured: true, items: ['Workout plan, home or gym based', 'Diet plan with meal options', 'Full consultation throughout the month', 'Weekly check-ins and progress tracking'], cta: 'Ask about online training', plan: '1 Month Online Training' },
  { id: 'workout', mode: 'Online · one-time', title: 'Workout plan', items: ['Home or gym based', 'Goal-specific: fat loss, muscle gain, fitness', 'Progression built in'], cta: 'Ask about workout plan', plan: 'Workout Plan' },
];

export const PT_DAYS = { 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 2, 3, 4] };
export const ptPlan = (n) => `Personal Training, ${n} sessions/week`;

export const PLAN_OPTIONS = [
  'Not sure yet, need advice',
  ...ONLINE_PLANS.map((p) => p.plan),
  ptPlan(3), ptPlan(4), ptPlan(5),
];

