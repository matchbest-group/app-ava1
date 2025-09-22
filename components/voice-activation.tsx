"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface VoiceActivationProps {
  onActivate: () => void
  isVoiceBotActive: boolean
  shouldStartListening?: boolean
}

export function VoiceActivation({ onActivate, isVoiceBotActive, shouldStartListening = false }: VoiceActivationProps) {
  const [isBackgroundListening, setIsBackgroundListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const isActiveRef = useRef(false)
  const isListeningRef = useRef(false)
  const isStartingRef = useRef(false)

  useEffect(() => {
    isActiveRef.current = isVoiceBotActive
  }, [isVoiceBotActive])

  // Helper function to safely start recognition
  const safeStartRecognition = useCallback(() => {
    if (!recognitionRef.current) return false
    if (isListeningRef.current || isStartingRef.current) {
      console.log("Recognition already running or starting, skipping...")
      return false
    }
    if (isActiveRef.current) {
      console.log("Voice bot is active, not starting background listening")
      return false
    }

    try {
      console.log("Starting background speech recognition...")
      isStartingRef.current = true
      recognitionRef.current.start()
      return true
    } catch (error) {
      console.error("Error starting background listening:", error)
      isStartingRef.current = false
      return false
    }
  }, [])

  useEffect(() => {
    // Initialize background speech recognition for "Hi AVA"
    console.log("Voice activation component mounted")
    console.log("Speech recognition support:", {
      hasSpeechRecognition: "SpeechRecognition" in window,
      hasWebkitSpeechRecognition: "webkitSpeechRecognition" in window,
      isSecureContext: window.isSecureContext,
      protocol: window.location.protocol
    })
    
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"
        
        recognitionRef.current.onstart = () => {
          console.log("Background listening started for 'Hi AVA'")
          setIsBackgroundListening(true)
          isListeningRef.current = true
          isStartingRef.current = false
        }
        
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()
          console.log("Background heard:", transcript)
          
          // Check for "Hi AVA" or similar variations
          if (transcript.includes('hi ava') || 
              transcript.includes('hey ava') || 
              transcript.includes('hello ava') ||
              transcript.includes('hi eva') ||
              transcript.includes('hey eva')) {
            console.log("AVA activation phrase detected!")
            
            // Stop background listening
            if (recognitionRef.current) {
              recognitionRef.current.stop()
            }
            
            // Activate voice bot
            onActivate()
          }
        }
        
        recognitionRef.current.onerror = (event) => {
          console.log("Background listening error:", event.error)
          setIsBackgroundListening(false)
          isListeningRef.current = false
          isStartingRef.current = false
          
          // Restart background listening after error (only if permission was granted and voice bot is not active)
          if (!isActiveRef.current && event.error !== 'aborted' && shouldStartListening) {
            setTimeout(() => {
              safeStartRecognition()
            }, 2000)
          }
        }
        
        recognitionRef.current.onend = () => {
          console.log("Background listening ended")
          setIsBackgroundListening(false)
          isListeningRef.current = false
          isStartingRef.current = false
          
          // Restart background listening if voice bot is not active and permission was granted
          if (!isActiveRef.current && shouldStartListening) {
            setTimeout(() => {
              safeStartRecognition()
            }, 1000)
          }
        }
        
        // Background listening setup ready - will only start when user grants permission
        console.log("Background listening initialized but not started - waiting for user permission")
        // Don't auto-start background listening - wait for user to click "Talk to AVA"
      }
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onActivate, safeStartRecognition])

  // Stop background listening when voice bot becomes active
  useEffect(() => {
    if (isVoiceBotActive && recognitionRef.current && isListeningRef.current) {
      console.log("Stopping background listening - voice bot is active")
      recognitionRef.current.stop()
      setIsBackgroundListening(false)
      isListeningRef.current = false
      isStartingRef.current = false
    } else if (!isVoiceBotActive && recognitionRef.current && !isListeningRef.current && !isStartingRef.current && shouldStartListening) {
      // Restart background listening when voice bot becomes inactive (only if permission was granted)
      console.log("Restarting background listening - voice bot is inactive and permission granted")
      setTimeout(() => {
        safeStartRecognition()
      }, 2000)
    }
  }, [isVoiceBotActive, safeStartRecognition, shouldStartListening])

  // Start background listening when permission is granted
  useEffect(() => {
    if (shouldStartListening && !isVoiceBotActive && !isListeningRef.current && recognitionRef.current) {
      console.log("User granted permission - starting background listening for 'Hi AVA'")
      setTimeout(() => {
        safeStartRecognition()
      }, 1000)
    }
  }, [shouldStartListening, isVoiceBotActive, safeStartRecognition])

  // Visual indicator (always visible for debugging)
  return (
    <div className="fixed bottom-4 left-4 z-30">
      <div className="bg-blue-600/10 backdrop-blur-sm border border-blue-500/20 rounded-lg px-3 py-1">
        <div className="flex items-center space-x-2 text-xs text-blue-400">
          <div className={`w-2 h-2 rounded-full ${isBackgroundListening ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          <span>
            {isBackgroundListening ? 'Say "Hi AVA" to activate' : shouldStartListening ? 'Background listening inactive' : 'Click "Talk to AVA" to enable'}
          </span>
        </div>
      </div>
    </div>
  )
}
