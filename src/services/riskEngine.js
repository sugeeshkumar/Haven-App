/**
 * Predictive Relapse Risk Engine
 * Calculates relapse risk index (0-100%) based on clinical HALT factors,
 * sleep deficits, mood trends, and streak resilience.
 */

export function calculateRelapseRisk({ mood, sleepHours, triggers = [], streakDays = 1 }) {
  let baseScore = 15; // Baseline healthy score

  // 1. Mood Impact (Score 1-10)
  if (mood <= 3) {
    baseScore += 30;
  } else if (mood <= 5) {
    baseScore += 18;
  } else if (mood >= 8) {
    baseScore -= 5;
  }

  // 2. Sleep Deficit Impact (< 7 hrs increases risk)
  if (sleepHours < 5) {
    baseScore += 25;
  } else if (sleepHours < 6.5) {
    baseScore += 12;
  } else if (sleepHours >= 8) {
    baseScore -= 5;
  }

  // 3. HALT Triggers Weighting
  const triggerWeights = {
    Hungry: 10,
    Angry: 15,
    Lonely: 18,
    Tired: 12,
    Stress: 14,
    Craving: 25,
    SocialPressure: 20
  };

  triggers.forEach(t => {
    if (triggerWeights[t]) {
      baseScore += triggerWeights[t];
    } else {
      baseScore += 8;
    }
  });

  // 4. Streak Buffer (Longer streak creates psychological momentum)
  const streakBonus = Math.min(15, Math.floor(streakDays / 7) * 2);
  baseScore -= streakBonus;

  // Clamp score between 5% and 95%
  const finalScore = Math.max(5, Math.min(95, Math.round(baseScore)));

  // Triage level & advice
  let level = 'Low';
  let color = 'emerald';
  let advice = 'Your recovery momentum is strong. Maintain your morning routine and evening box breathing.';

  if (finalScore >= 55) {
    level = 'High Risk';
    color = 'coral';
    advice = 'High stress or vulnerability detected. Tap "One Tap Crisis Help" or speak with your AI Companion immediately.';
  } else if (finalScore >= 30) {
    level = 'Moderate';
    color = 'amber';
    advice = 'Vulnerability elevated today. Focus on rest, hydration, and an extra grounding exercise.';
  }

  return {
    score: finalScore,
    level,
    color,
    advice,
    factors: {
      haltCount: triggers.length,
      sleepDeficit: sleepHours < 7,
      lowMood: mood <= 5
    }
  };
}
