import React, { createContext, useContext, useState } from 'react';
import { INITIAL_USER_PROFILE, INITIAL_CAREGIVER_PROFILE } from '../services/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 'patient' (Person in Recovery) or 'caregiver' (Family Member)
  const [role, setRole] = useState('patient');
  const [userProfile, setUserProfile] = useState(INITIAL_USER_PROFILE);
  const [caregiverProfile] = useState(INITIAL_CAREGIVER_PROFILE);

  const switchRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider value={{
      role,
      userProfile,
      setUserProfile,
      caregiverProfile,
      switchRole,
      isPatient: role === 'patient',
      isCaregiver: role === 'caregiver'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
