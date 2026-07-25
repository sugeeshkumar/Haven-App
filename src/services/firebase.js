/**
 * Firebase Client & Local Storage Mock Fallback Layer
 * Ensures Haven runs seamlessly with or without live Firebase environment keys.
 */

class MockAuthService {
  constructor() {
    this.currentUser = {
      uid: 'user_velan_42',
      displayName: 'Velan',
      email: 'velan.recovery@example.com',
      role: 'patient' // 'patient' or 'caregiver'
    };
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setRole(role) {
    this.currentUser.role = role;
  }
}

class MockFirestoreService {
  constructor() {
    this.storageKey = 'haven_recovery_state_v2';
  }

  saveState(state) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
  }

  loadState() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }
}

export const authService = new MockAuthService();
export const dbService = new MockFirestoreService();
