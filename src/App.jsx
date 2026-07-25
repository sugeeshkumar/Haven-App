import React from 'react';
import { useAuth } from './context/AuthContext';
import { useRecovery } from './context/RecoveryContext';

// Layout Views & Living Environment
import { LivingBackground } from './components/layout/LivingBackground';
import { Header } from './components/layout/Header';
import { NavigationBar } from './components/layout/NavigationBar';

// Redesigned Emotional Hero Component
import { HavenOrbHero } from './components/journey/HavenOrbHero';

// Journey Components
import { LivingTreeSvg } from './components/journey/LivingTreeSvg';
import { PredictiveRiskCard } from './components/journey/PredictiveRiskCard';
import { DailyMissionCard } from './components/journey/DailyMissionCard';
import { StreakStatsCard } from './components/journey/StreakStatsCard';
import { FutureMeWidget } from './components/journey/FutureMeWidget';

// Caregiver Dashboard Component
import { CaregiverDashboard } from './components/caregiver/CaregiverDashboard';

// Modals & Overlays
import { SafeSpaceModal } from './components/safespace/SafeSpaceModal';
import { VoiceOverlay } from './components/voice/VoiceOverlay';
import { CrisisModal } from './components/crisis/CrisisModal';
import { DailyCheckInModal } from './components/checkin/DailyCheckInModal';
import { EducationHubModal } from './components/education/EducationHubModal';
import { EmergencySosModal } from './components/sos/EmergencySosModal';

export default function App() {
  const { role, userProfile } = useAuth();
  const { riskAssessment } = useRecovery();

  const isPatient = role === 'patient';
  const showFutureMe = isPatient && (riskAssessment?.level === 'Low' || riskAssessment?.level === 'Moderate');

  return (
    <LivingBackground>
      
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="max-[#0B0F19] max-w-4xl mx-auto px-4 pt-4 pb-32">
        {isPatient ? (
          /* Redesigned Emotional Home Screen */
          <div className="space-y-10">
            
            {/* 1. Primary Emotional Hero Section */}
            <HavenOrbHero />

            {/* Divider with subtle glowing line */}
            <div className="relative flex items-center justify-center py-2">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="absolute px-4 py-1 text-xs font-semibold text-slate-400 bg-[#0B0F19] rounded-full border border-white/10">
                Today's Status & Journey
              </span>
            </div>

            {/* 2. Today's Encouragement & Risk Overview */}
            <div className="space-y-5">
              <DailyMissionCard />
              <PredictiveRiskCard />
              <LivingTreeSvg streakDays={userProfile.streakDays} compact={true} />
              {showFutureMe && <FutureMeWidget />}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-400 mb-2 px-1">Recovery Milestones & Metrics</div>
                <StreakStatsCard />
              </div>
            </div>

          </div>
        ) : (
          /* Caregiver Portal View */
          <CaregiverDashboard />
        )}
      </main>

      {/* Navigation Bar */}
      <NavigationBar />

      {/* Global Modals & Overlays */}
      <SafeSpaceModal />
      <VoiceOverlay />
      <CrisisModal />
      <DailyCheckInModal />
      <EducationHubModal />
      <EmergencySosModal />

    </LivingBackground>
  );
}
