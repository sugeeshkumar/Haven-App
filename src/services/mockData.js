export const INITIAL_USER_PROFILE = {
  id: 'usr_42',
  name: 'Velan',
  streakDays: 42,
  milestoneTitle: 'Monthly Pioneer',
  recoveryTrack: 'Substance Use Recovery (Alcohol & Opioids)',
  startDate: '2026-06-13',
  currentMoodScore: 8,
  energyScore: 7,
  sleepHours: 7.5,
  riskScore: 18, // 18% - Low Risk
  riskLevel: 'Low',
  riskExplanation: 'Consistent sleep (7.5h) & steady check-ins maintain strong stability.',
  dailyMission: {
    id: 'm_42',
    title: 'Mindful Evening De-escalation',
    description: 'Complete 4-4-4-4 box breathing for 3 minutes before bed.',
    completed: false,
    category: 'Grounding'
  },
  achievements: [
    { id: 'ach_1', name: '7-Day Catalyst', icon: 'Sparkles', unlockedAt: '2026-06-20' },
    { id: 'ach_2', name: '21-Day Habit Formed', icon: 'Zap', unlockedAt: '2026-07-04' },
    { id: 'ach_3', name: '30-Day Pioneer', icon: 'Award', unlockedAt: '2026-07-13' },
    { id: 'ach_4', name: 'HALT Master', icon: 'ShieldCheck', unlockedAt: '2026-07-20' }
  ]
};

export const INITIAL_CAREGIVER_PROFILE = {
  id: 'cg_101',
  name: 'Janani',
  relationship: 'Sister & Designated Caregiver',
  phone: '+1 (555) 234-5678',
  email: 'janani.caregiver@example.com',
  notificationPreferences: {
    crisisAlerts: true,
    weeklyDigest: true,
    relapseRiskWarnings: true
  }
};

export const INITIAL_CHECKIN_LOGS = [
  { id: 'c_1', date: '2026-07-24', mood: 8, energy: 7, sleep: 8, triggers: [], notes: 'Spent morning outdoors. Felt serene and clear.' },
  { id: 'c_2', date: '2026-07-23', mood: 7, energy: 6, sleep: 7, triggers: ['Tired'], notes: 'Late work meeting, slightly exhausted but grounded.' },
  { id: 'c_3', date: '2026-07-22', mood: 9, energy: 8, sleep: 8.5, triggers: [], notes: 'Attended recovery circle. Strong peer support.' },
  { id: 'c_4', date: '2026-07-21', mood: 6, energy: 5, sleep: 6, triggers: ['Lonely', 'Stress'], notes: 'Felt slight craving around dinner. Used box breathing.' },
  { id: 'c_5', date: '2026-07-20', mood: 8, energy: 8, sleep: 7.5, triggers: [], notes: 'Great workout. Mind felt quiet and energized.' },
];

export const EMERGENCY_CONTACTS = [
  { name: '988 Suicide & Crisis Lifeline', phone: '988', category: '24/7 Crisis Hotline', type: 'national' },
  { name: 'SAMHSA National Helpline', phone: '1-800-662-4357', category: 'Substance Abuse Help', type: 'national' },
  { name: 'Janani (Caregiver)', phone: '+1 (555) 234-5678', category: 'Primary Contact', type: 'personal' },
  { name: 'Dr. Robert Vance (Therapist)', phone: '+1 (555) 890-1234', category: 'Clinical Support', type: 'medical' }
];

export const EDUCATIONAL_GUIDES = [
  {
    id: 'guide_1',
    title: 'Understanding Cravings',
    category: 'Relapse Prevention',
    readingTime: '3 min',
    summary: 'Neurological craving loops are temporary waves. Learn to identify and ride the urge without acting.',
    content: `A craving is a temporary neurological signal in your brain reward pathway.
1. Cravings naturally peak in 10 to 15 minutes.
2. Accept the physical sensation without judgment.
3. Divert focus through box breathing or drinking cold water.`
  },
  {
    id: 'guide_2',
    title: 'Managing Withdrawal',
    category: 'Clinical Support',
    readingTime: '4 min',
    summary: 'How physical and psychological systems re-balance and adjust during detoxification.',
    content: `During withdrawal, the nervous system transitions back to neurochemical equilibrium.
- Physical anxiety and insomnia are common early signs.
- Prioritize daily sleep hygiene, consistent hydration, and non-judgmental guidance.`
  },
  {
    id: 'guide_3',
    title: 'Coping Strategies',
    category: 'Grounding',
    readingTime: '3 min',
    summary: 'Practical therapeutic grounding methods including the 5-4-3-2-1 sensory mechanism.',
    content: `Grounding exercises interrupt panic states immediately by redirecting focus.
- 5-4-3-2-1 technique resets your sensory perception.
- Cold water exposure or change of environment alters autonomic response.`
  },
  {
    id: 'guide_4',
    title: 'Building Healthy Routines',
    category: 'Daily Maintenance',
    readingTime: '5 min',
    summary: 'Establishing stable daily habits to restore balance and prevent sudden trigger vulnerability.',
    content: `Consistent routines insulate you from the physical triggers of recovery.
- Set a stable wake and sleep cycle to prevent fatigue trigger.
- Structure your morning with high-nutrition food and mild exercise.`
  },
  {
    id: 'guide_5',
    title: 'Preventing Relapse',
    category: 'Relapse Prevention',
    readingTime: '4 min',
    summary: 'The HALT model of identifying Hunger, Anger, Loneliness, and Tiredness before it creates risk.',
    content: `80% of sudden relapses stem from one of four physical or emotional states:
- Hungry: Consume protein/fluids immediately.
- Angry: Journal feelings or take 10 deep breaths.
- Lonely: Reach out to caregiver Janani or call 988.
- Tired: Rest for 15-20 minutes.`
  },
  {
    id: 'guide_6',
    title: 'Helping a Loved One Recover',
    category: 'Caregiver Support',
    readingTime: '4 min',
    summary: 'Compassionate accountability strategies for family caregivers and support networks.',
    content: `Caregivers like Janani can offer optimal recovery support:
- Ask supportive questions like "How can I support your peace today?"
- Avoid direct interrogations about cravings or suspicious monitoring.
- Respect Velan's journaling while keeping emergency SOS plans ready.`
  }
];
