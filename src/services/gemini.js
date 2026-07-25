import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
let genAI = null;

if (apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.warn('Gemini client init notice: Using clinical fallback engine.', err);
  }
}

const SYSTEM_INSTRUCTION = `
You are Haven, a compassionate, trauma-informed, non-judgmental AI recovery companion specializing in addiction recovery and crisis de-escalation.
Your tone must be serene, empathetic, encouraging, and clear.
Keep responses low-cognitive-load, concise (2-4 sentences for voice), and focused on immediate grounding or practical self-care.
`;

/**
 * 1. Daily Encouragement Generator (Home Page)
 */
export async function generateDailyEncouragement({ userProfile, checkInLogs, riskAssessment }) {
  const streak = userProfile?.streakDays || 42;
  const mood = userProfile?.currentMoodScore || 8;
  const risk = riskAssessment?.level || 'Low';

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${SYSTEM_INSTRUCTION}\nGenerate a personalized daily encouragement message for Velan. Current Streak: ${streak} days, Serenity Score: ${mood}/10, Risk Level: ${risk}. Output exactly one warm, highly motivating 2-3 sentence paragraph.`;
      const res = await model.generateContent(prompt);
      return res.response.text();
    } catch (e) {
      console.warn('Daily encouragement fallback:', e);
    }
  }

  // Personalized Fallback
  return `Good afternoon Velan. Your 42-day recovery momentum is a beautiful testament to your resilience. Yesterday was a solid check-in, and today let's take a deep breath and focus on one simple step forward.`;
}

/**
 * 2. Personalized Emergency Recovery Response (Safe Space)
 */
export async function generateSafeSpaceRecoveryResponse({ name = 'Velan', streakDays = 42, riskScore = 18 }) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${SYSTEM_INSTRUCTION}\nVelan (42 days clean) has indicated they are not okay. Act as a compassionate recovery coach. Generate a response containing: 1) Calming acknowledgment, 2) Immediate grounding advice, 3) Practical next step, 4) Motivational encouragement. Limit to 3 sentences.`;
      const res = await model.generateContent(prompt);
      return res.response.text();
    } catch (e) {
      console.warn('Safe space fallback:', e);
    }
  }

  return `Velan, I hear you, and it is completely okay to not be okay right now. Let's start by feeling your feet firmly on the floor. Take a long, slow breath in, and then out. Your only task right now is this single breath. You have got this, and Janani is ready to support you.`;
}

/**
 * 3. Caregiver AI Script & Guidance Generator
 */
export async function generateCaregiverGuidance(streakDays, topic) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${SYSTEM_INSTRUCTION}\nGenerate caregiver advice for Janani supporting Velan who has a ${streakDays} day recovery streak. Topic: ${topic}. Respond in a JSON format with keys: "begin", "avoid", "action" outlining concrete guidance.`;
      const res = await model.generateContent(prompt);
      const data = JSON.parse(res.response.text());
      return {
        begin: data.begin,
        avoid: data.avoid,
        action: data.action
      };
    } catch (e) {
      console.warn('Caregiver fallback:', e);
    }
  }

  return {
    begin: `"Hi Velan, I'm so proud of your 42 days. I'm here if you want to talk, take a walk, or just sit quietly—no pressure at all."`,
    avoid: `Avoid asking: "Did you have cravings today?" or surveillance questions like "Are you sure you're okay?"`,
    action: `Prepare a hot beverage, dim lights to reduce cognitive stimulation, and practice presence over investigation.`
  };
}

/**
 * 4. Recovery Insights Generator (After Daily Check-in)
 */
export async function generateCheckInInsights(checkIn) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${SYSTEM_INSTRUCTION}\nAnalyze Velan's checkin: Mood: ${checkIn.mood}/10, Sleep: ${checkIn.sleep}h, Triggers: ${checkIn.triggers.join(', ')}. Generate a brief JSON response with keys: "moodSummary", "progressAnalysis", "recoveryScoreExplanation", "riskExplanation", "recommendedAction".`;
      const res = await model.generateContent(prompt);
      return JSON.parse(res.response.text());
    } catch (e) {
      console.warn('Insights fallback:', e);
    }
  }

  const triggersDesc = checkIn.triggers.length > 0 
    ? `identifying triggers: ${checkIn.triggers.join(', ')}`
    : 'no active HALT triggers reported';

  return {
    moodSummary: `Your mood is stable at ${checkIn.mood}/10 with ${checkIn.sleep}h of sleep.`,
    progressAnalysis: `Highly self-aware session, ${triggersDesc}.`,
    recoveryScoreExplanation: `Your Recovery Score remains solid because you logged check-ins consistently.`,
    relapseRiskExplanation: `Relapse Risk is Low (18%) due to optimal sleep and steady mood tracking.`,
    recommendedAction: `Complete today's Daily Mission: Practice 3 minutes of breathing before sleep.`
  };
}

/**
 * 5. Education Hub Q&A and PDF Explanation
 */
export async function answerEducationQuery(documentText, question) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${SYSTEM_INSTRUCTION}\nExplain topic or answer question: "${question}". Document context: "${documentText}". Simplify clinical terms for Velan.`;
      const res = await model.generateContent(prompt);
      return res.response.text();
    } catch (e) {
      // ignore
    }
  }

  const qLower = question.toLowerCase();
  if (qLower.includes('craving')) {
    return `Cravings are temporary surge signals in the brain's reward center. They peak in 10-15 minutes. By surfing the wave and utilizing sensory grounding, you disarm the automatic behavior loop.`;
  }
  if (qLower.includes('withdrawal')) {
    return `Withdrawal involves the nervous system adapting back to equilibrium. It can feel like physical anxiety or fatigue. Prioritize hydration, sleep, and gentle box breathing.`;
  }
  if (qLower.includes('loved one') || qLower.includes('family') || qLower.includes('caregiver')) {
    return `Caregivers like Janani can offer the best support by establishing emotional safety, positive reinforcement, and active non-judgmental listening.`;
  }

  return `Cravings and triggers are temporary neural spikes. By acknowledging them without judgment and taking a slow breath, you rewire your brain's automatic habits.`;
}

/**
 * 6. AI Voice Companion Conversation
 */
export async function generateVoiceResponse(transcript, contextHistory = []) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      // Build conversation history prompt context
      const historyText = contextHistory
        .map(m => `${m.role === 'user' ? 'Velan' : 'Haven'}: "${m.text}"`)
        .join('\n');

      const prompt = `${SYSTEM_INSTRUCTION}
Below is the conversation history with Velan (42 days clean) and the current user input.
Please generate a supportive, compassionate, and context-appropriate response. Keep it concise (2-3 sentences max) for audio conversion.

Conversation History:
${historyText}

Current User Input: "${transcript}"
Haven:`;

      const res = await model.generateContent(prompt);
      return res.response.text().trim();
    } catch (e) {
      console.warn('Gemini Voice API fallback:', e);
    }
  }

  const lower = transcript.toLowerCase();
  
  // 1. Cravings & Urges
  if (lower.includes('craving') || lower.includes('urge') || lower.includes('want to drink') || lower.includes('want to use')) {
    return "I hear you Velan, and it takes immense courage to speak that aloud. A craving is just a wave of physical sensation—it peaks and recedes. Let's take three deep breaths together. You are safe, and you are not alone.";
  }
  
  // 2. Slipping/Relapse
  if (lower.includes('relapsed') || lower.includes('slip') || lower.includes('messed up') || lower.includes('drank')) {
    return "Please breathe Velan. A slip does not erase your 42 days of hard work and neural healing. Recovery is not a straight line. What matters right now is taking one small step to protect yourself today.";
  }
  
  // 3. Anxiety/Panic
  if (lower.includes('anxious') || lower.includes('panic') || lower.includes('overwhelmed') || lower.includes('scared')) {
    return "Let's ground your senses right now Velan. Feel your feet firmly pressed against the floor. Tell me three things you can physically see or feel around you right now.";
  }
  
  // 4. Tired/Lonely/Sad
  if (lower.includes('tired') || lower.includes('lonely') || lower.includes('sad') || lower.includes('depressed')) {
    return "Thank you for sharing that with me Velan. Physical fatigue and emotional isolation are natural triggers. How about drinking a glass of cool water and resting for 15 minutes?";
  }

  // 5. Greetings
  if (lower.includes('hello') || lower.includes('hi ') || lower.includes('hey') || lower.includes('good morning') || lower.includes('good afternoon')) {
    return "Hello Velan! I'm here with you. How are you feeling today, and how can I best support your recovery journey right now?";
  }

  // 6. Support/Thanks
  if (lower.includes('thank') || lower.includes('thanks') || lower.includes('grateful')) {
    return "You are so welcome Velan. Supporting your recovery is what I'm here for. Let's continue taking it one breath at a time.";
  }

  // 7. Generic / Dynamic Sentence Builder (Ensures fallback response is never identical or static)
  const dynamicResponses = [
    `I hear you, Velan. That is a valid perspective. Tell me more about what is going on for you today.`,
    `Thank you for sharing that, Velan. Remember that we are taking this one day, one moment at a time. What feels most supportive right now?`,
    `I'm listening closely, Velan. How are you holding up physically? Let's check in on your sleep or triggers if you would like.`,
    `I understand, Velan. Your peace of mind is our priority today. Would you like to try a brief grounding exercise, or just talk?`
  ];
  
  // Select a response based on the length of transcript to keep it deterministic but varied
  const index = transcript.length % dynamicResponses.length;
  return dynamicResponses[index];
}

/**
 * 7. One-Tap Crisis Action Plan Generator
 */
export async function generateCrisisActionPlan(category) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${SYSTEM_INSTRUCTION}\nVelan tapped crisis button: "${category}". Generate 3-step immediate action plan with reassurance.`;
      const res = await model.generateContent(prompt);
      const text = res.response.text();
      return {
        reassurance: "Your feelings are completely valid Velan. Urge-surfing will help you ride this out safely.",
        steps: text.split('\n').filter(s => s.trim().length > 0).slice(0, 3)
      };
    } catch (e) {
      console.warn('Crisis plan fallback:', e);
    }
  }

  const plans = {
    craving: {
      reassurance: "Cravings typically peak within 10 to 15 minutes Velan. Urge-surfing will help you ride this out safely.",
      steps: [
        "Drink a full glass of cold water slowly to stimulate your vagus nerve.",
        "Change your physical environment—step outside or move to a different room.",
        "Practice 4-4-4-4 box breathing using the pulsating orb."
      ]
    },
    relapse: {
      reassurance: "First, extend compassion to yourself Velan. Self-blame worsens cravings. You are taking the right step by reaching out.",
      steps: [
        "Remove any remaining triggers or alcohol/substances from your immediate reach.",
        "Contact Janani or call the 988 Helpline.",
        "Drink water and rest in a calm, safe environment."
      ]
    },
    panic: {
      reassurance: "Panic is uncomfortable Velan, but it is not dangerous and it will pass.",
      steps: [
        "Press your feet firmly into the ground and roll your shoulders back.",
        "Follow the 5-4-3-2-1 grounding exercise.",
        "Slow your exhalations—make each exhale longer than your inhale."
      ]
    },
    family_help: {
      reassurance: "Supporting a loved one in recovery requires gentle boundaries and steady calm Janani.",
      steps: [
        "Approach Velan with zero judgment and soft tone.",
        "Ask open questions: 'I am here for you. How can I support your peace right now?'",
        "If safety is at risk, utilize the Emergency SOS script."
      ]
    }
  };

  return plans[category] || plans.craving;
}

/**
 * 8. Emergency SOS Script Generator
 */
export async function generateSosEmergencyScript(locationInfo = 'current location') {
  return `EMERGENCY DISPATCH SCRIPT:\n"Hello, I am calling for emergency support. I am assisting Velan who is experiencing an acute medical or recovery crisis at ${locationInfo}. Janani has been notified. Please send first responders trained in mental health/substance support."`;
}

export const generateEmergencySosScript = generateSosEmergencyScript;
