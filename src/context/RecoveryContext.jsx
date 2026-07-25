import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER_PROFILE, INITIAL_CHECKIN_LOGS, EMERGENCY_CONTACTS, EDUCATIONAL_GUIDES } from '../services/mockData';
import { calculateRelapseRisk } from '../services/riskEngine';
import confetti from 'canvas-confetti';

const RecoveryContext = createContext();

export function RecoveryProvider({ children }) {
  const [userState, setUserState] = useState(INITIAL_USER_PROFILE);
  const [checkInLogs, setCheckInLogs] = useState(INITIAL_CHECKIN_LOGS);
  const [emergencyContacts] = useState(EMERGENCY_CONTACTS);
  const [guides] = useState(EDUCATIONAL_GUIDES);

  // Active Modals & Triggers
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [selectedCrisisCategory, setSelectedCrisisCategory] = useState(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isSafeSpaceOpen, setIsSafeSpaceOpen] = useState(false);

  // Future Me Experience State
  const [futureMeMessage, setFutureMeMessage] = useState(
    "Hi Velan, this is you from a calm, grounded moment. Remember that cravings are just waves. They peak, and they always pass. You have Janani, you have me, and you have the strength to ride this out. One breath at a time."
  );

  // Calculated Risk
  const [riskAssessment, setRiskAssessment] = useState(() => 
    calculateRelapseRisk({
      mood: INITIAL_USER_PROFILE.currentMoodScore,
      sleepHours: INITIAL_USER_PROFILE.sleepHours,
      triggers: [],
      streakDays: INITIAL_USER_PROFILE.streakDays
    })
  );

  // Update Risk Assessment whenever check-in logs or userState changes
  useEffect(() => {
    const latestCheckin = checkInLogs[0] || {};
    const updatedRisk = calculateRelapseRisk({
      mood: latestCheckin.mood || userState.currentMoodScore,
      sleepHours: latestCheckin.sleep || userState.sleepHours,
      triggers: latestCheckin.triggers || [],
      streakDays: userState.streakDays
    });
    setRiskAssessment(updatedRisk);
  }, [checkInLogs, userState.streakDays, userState.currentMoodScore, userState.sleepHours]);

  const toggleMissionComplete = () => {
    setUserState(prev => {
      const nextCompleted = !prev.dailyMission.completed;
      if (nextCompleted) {
        // Trigger celebration particles
        try {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
        } catch (e) {
          // ignore
        }
      }
      return {
        ...prev,
        dailyMission: { ...prev.dailyMission, completed: nextCompleted }
      };
    });
  };

  const addCheckIn = (newEntry) => {
    const entry = {
      id: `c_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...newEntry
    };
    setCheckInLogs(prev => [entry, ...prev]);

    // Update user state mood & sleep
    setUserState(prev => ({
      ...prev,
      currentMoodScore: newEntry.mood,
      sleepHours: newEntry.sleep,
      energyScore: newEntry.energy
    }));

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }
  };

  const triggerCrisis = (category) => {
    setSelectedCrisisCategory(category);
    setIsCrisisModalOpen(true);
  };

  const openSafeSpace = () => {
    setIsSafeSpaceOpen(true);
  };

  const closeSafeSpace = () => {
    setIsSafeSpaceOpen(false);
  };

  const saveFutureMeMessage = (msg) => {
    setFutureMeMessage(msg);
  };

  return (
    <RecoveryContext.Provider value={{
      userState,
      setUserState,
      checkInLogs,
      addCheckIn,
      emergencyContacts,
      guides,
      riskAssessment,
      isCrisisModalOpen,
      setIsCrisisModalOpen,
      selectedCrisisCategory,
      setSelectedCrisisCategory,
      triggerCrisis,
      isCheckInOpen,
      setIsCheckInOpen,
      isEducationOpen,
      setIsEducationOpen,
      isSosOpen,
      setIsSosOpen,
      isSafeSpaceOpen,
      openSafeSpace,
      closeSafeSpace,
      futureMeMessage,
      saveFutureMeMessage,
      toggleMissionComplete
    }}>
      {children}
    </RecoveryContext.Provider>
  );
}

export function useRecovery() {
  return useContext(RecoveryContext);
}
