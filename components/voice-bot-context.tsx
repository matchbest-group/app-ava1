"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface VoiceBotContextType {
  isVoiceBotOpen: boolean
  isCallingAgent: boolean
  isHeaderTriggered: boolean
  showInstruction: boolean
  setIsVoiceBotOpen: (open: boolean) => void
  setIsCallingAgent: (calling: boolean) => void
  setIsHeaderTriggered: (triggered: boolean) => void
  setShowInstruction: (show: boolean) => void
  handleTalkToAVA: () => void
  handleVoiceActivation: () => void
  handleVoiceBotToggle: () => void
  handleCallingStateChange: (isCalling: boolean) => void
}

const VoiceBotContext = createContext<VoiceBotContextType | undefined>(undefined)

export function VoiceBotProvider({ children }: { children: ReactNode }) {
  // Initialize state - will be hydrated from localStorage on client
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false)
  const [isCallingAgent, setIsCallingAgent] = useState(false)
  const [isHeaderTriggered, setIsHeaderTriggered] = useState(false)
  const [showInstruction, setShowInstruction] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate state from localStorage on client side (maintain state during navigation)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Restore voice bot state to maintain continuity during navigation
      const savedVoiceBotOpen = localStorage.getItem('ava_voice_bot_open') === 'true'
      const savedCallingAgent = localStorage.getItem('ava_voice_bot_calling') === 'true'
      const manuallyClosed = localStorage.getItem('ava_voice_bot_manually_closed') === 'true'
      
      // Only keep closed if manually closed, otherwise restore previous state
      if (manuallyClosed) {
        console.log("🔴 Voice bot was manually closed - keeping closed")
        setIsVoiceBotOpen(false)
        localStorage.removeItem('ava_voice_bot_manually_closed') // Clear for next session
      } else {
        console.log("🔄 Restoring voice bot state during navigation:", savedVoiceBotOpen)
        setIsVoiceBotOpen(savedVoiceBotOpen)
      }
      
      setIsCallingAgent(savedCallingAgent)
      setIsHydrated(true)
    }
  }, [])

  // Persist state to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('ava_voice_bot_open', isVoiceBotOpen.toString())
    }
  }, [isVoiceBotOpen, isHydrated])

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('ava_voice_bot_calling', isCallingAgent.toString())
    }
  }, [isCallingAgent, isHydrated])

  // Manage instruction tooltip (removed auto-open functionality)
  useEffect(() => {
    // Only run this effect once when component mounts and is hydrated
    if (!isHydrated) return

    // Show instruction tooltip briefly to guide users to click the voice bot
    const timer = setTimeout(() => {
      if (!isVoiceBotOpen) {
        setShowInstruction(true)
      }
    }, 1000) // Show after 1 second

    // Hide instruction after 4 seconds
    const hideTimer = setTimeout(() => {
      setShowInstruction(false)
    }, 5000) // Hide after 5 seconds total

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [isHydrated]) // Only depend on hydration, not isVoiceBotOpen to avoid loops

  const handleTalkToAVA = () => {
    console.log("=== Global Talk to AVA button clicked! ===")
    console.log("Setting global states:", {
      isHeaderTriggered: true,
      isVoiceBotOpen: true,
      isCallingAgent: true
    })
    setIsHeaderTriggered(true)
    setIsVoiceBotOpen(true)
    setIsCallingAgent(true)
    setShowInstruction(false) // Hide instruction when activated
  }

  const handleVoiceActivation = () => {
    console.log("=== Global Voice activation triggered by 'Hi AVA'! ===")
    console.log("Setting global states:", {
      isHeaderTriggered: false,
      isVoiceBotOpen: true,
      isCallingAgent: true
    })
    setIsHeaderTriggered(false) // Voice activation, not header triggered
    setIsVoiceBotOpen(true)
    setIsCallingAgent(true)
    setShowInstruction(false) // Hide instruction when activated
  }

  const handleVoiceBotToggle = () => {
    console.log("=== Global Voice bot toggle ===", { currentState: isVoiceBotOpen })
    
    // If closing the voice bot, mark as manually closed
    if (isVoiceBotOpen) {
      console.log("🔴 User manually closing voice bot via toggle")
      if (typeof window !== 'undefined') {
        localStorage.setItem('ava_voice_bot_manually_closed', 'true')
      }
    }
    
    setIsVoiceBotOpen(!isVoiceBotOpen)
    if (!isVoiceBotOpen) {
      setIsHeaderTriggered(false)
    }
  }

  const handleCallingStateChange = (isCalling: boolean) => {
    console.log("=== Global Calling state change ===", { isCalling })
    setIsCallingAgent(isCalling)
  }

  // Log state changes for debugging
  useEffect(() => {
    console.log("Global voice bot state changed:", {
      isVoiceBotOpen,
      isCallingAgent,
      isHeaderTriggered,
      showInstruction
    })
  }, [isVoiceBotOpen, isCallingAgent, isHeaderTriggered, showInstruction])

  const value: VoiceBotContextType = {
    isVoiceBotOpen,
    isCallingAgent,
    isHeaderTriggered,
    showInstruction,
    setIsVoiceBotOpen,
    setIsCallingAgent,
    setIsHeaderTriggered,
    setShowInstruction,
    handleTalkToAVA,
    handleVoiceActivation,
    handleVoiceBotToggle,
    handleCallingStateChange
  }

  return (
    <VoiceBotContext.Provider value={value}>
      {children}
    </VoiceBotContext.Provider>
  )
}

export function useVoiceBot() {
  const context = useContext(VoiceBotContext)
  if (context === undefined) {
    throw new Error('useVoiceBot must be used within a VoiceBotProvider')
  }
  return context
}
