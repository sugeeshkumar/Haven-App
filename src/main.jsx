import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { AuthProvider } from './context/AuthContext';
import { RecoveryProvider } from './context/RecoveryContext';
import { VoiceProvider } from './context/VoiceContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RecoveryProvider>
        <VoiceProvider>
          <App />
        </VoiceProvider>
      </RecoveryProvider>
    </AuthProvider>
  </React.StrictMode>
);
