"use client"

import { useState } from 'react'
import { VoiceBot } from './voice-bot'
import { VoiceActivation } from './voice-activation'
import { useVoiceBot } from './voice-bot-context'

export function GlobalVoiceBot() {
  const {
    isVoiceBotOpen,
    isHeaderTriggered,
    handleVoiceBotToggle,
    handleCallingStateChange,
    handleVoiceActivation
  } = useVoiceBot()
  
  const [microphonePermissionGranted, setMicrophonePermissionGranted] = useState(false)

  return (
    <>
      {/* Voice Bot - Global instance */}
      <VoiceBot 
        isOpen={isVoiceBotOpen}
        onToggle={handleVoiceBotToggle}
        isHeaderTriggered={isHeaderTriggered}
        onCallingStateChange={handleCallingStateChange}
        onMicrophonePermissionGranted={() => setMicrophonePermissionGranted(true)}
      />
      
      {/* Voice Activation - Global background listening */}
      <VoiceActivation 
        onActivate={handleVoiceActivation}
        isVoiceBotActive={isVoiceBotOpen}
        shouldStartListening={microphonePermissionGranted}
      />
    </>
  )
}
