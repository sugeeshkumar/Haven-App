import React, { createContext, useContext, useState } from 'react';
import { voiceEngine } from '../services/voiceEngine';
import { generateVoiceResponse } from '../services/gemini';

const VoiceContext = createContext();

export function VoiceProvider({ children }) {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', text: "Hello Velan. I am Haven, your voice companion. Tap the mic anytime you want to speak." }
  ]);

  const openVoiceOverlay = () => {
    setIsVoiceOpen(true);
  };

  const closeVoiceOverlay = () => {
    voiceEngine.stopListening();
    voiceEngine.stopSpeaking();
    setIsListening(false);
    setIsSpeaking(false);
    setIsVoiceOpen(false);
  };

  const startVoiceInput = () => {
    setTranscript('');
    voiceEngine.stopSpeaking();

    const success = voiceEngine.startListening(
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          handleUserTranscript(text);
        }
      },
      () => {
        setIsListening(false);
      },
      (err) => {
        console.warn('Voice error:', err);
        setIsListening(false);
      }
    );

    if (success) {
      setIsListening(true);
    }
  };

  const stopVoiceInput = () => {
    voiceEngine.stopListening();
    setIsListening(false);
  };

  const handleUserTranscript = async (userText) => {
    if (!userText.trim()) return;

    // Add user message
    const userMsg = { id: `u_${Date.now()}`, role: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const updatedMessages = [...messages, userMsg];
      // Call Gemini for response with history
      const aiReply = await generateVoiceResponse(userText, updatedMessages);
      const aiMsg = { id: `a_${Date.now()}`, role: 'assistant', text: aiReply };
      setMessages(prev => [...prev, aiMsg]);
      setIsProcessing(false);

      // Speak response out loud
      voiceEngine.speak(
        aiReply,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    } catch (e) {
      setIsProcessing(false);
      const fallback = "I'm right here with you. Let's take a slow breath together.";
      setMessages(prev => [...prev, { id: `a_${Date.now()}`, role: 'assistant', text: fallback }]);
      voiceEngine.speak(fallback, () => setIsSpeaking(true), () => setIsSpeaking(false));
    }
  };

  return (
    <VoiceContext.Provider value={{
      isVoiceOpen,
      openVoiceOverlay,
      closeVoiceOverlay,
      isListening,
      isSpeaking,
      isProcessing,
      transcript,
      messages,
      startVoiceInput,
      stopVoiceInput,
      handleUserTranscript
    }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  return useContext(VoiceContext);
}
