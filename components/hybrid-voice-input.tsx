"use client"

import { useRef, useState, useCallback } from 'react'

interface HybridVoiceInputProps {
  onTranscript: (text: string) => void
  onListeningChange?: (isListening: boolean) => void
  isConnected: boolean
  onMicrophonePermissionGranted?: () => void
}

export function useHybridVoiceInput({ onTranscript, onListeningChange, isConnected, onMicrophonePermissionGranted }: HybridVoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const isConnectedRef = useRef(false)

  // Keep connected state in sync
  isConnectedRef.current = isConnected

  // Initialize browser speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    console.log("🎤 Initializing browser speech recognition...")
    
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true  // Keep listening continuously
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"
        
        // Increase timeout to reduce "no-speech" errors
        if ('maxAlternatives' in recognitionRef.current) {
          recognitionRef.current.maxAlternatives = 1
        }
        
        recognitionRef.current.onstart = () => {
          console.log("✅ Browser speech recognition started successfully")
          setIsListening(true)
          if (onListeningChange && typeof onListeningChange === 'function') {
            onListeningChange(true)
          }
          // Call the microphone permission granted callback
          if (onMicrophonePermissionGranted && typeof onMicrophonePermissionGranted === 'function') {
            console.log("🎤 Microphone permission granted - notifying parent component")
            onMicrophonePermissionGranted()
          }
        }
        
        recognitionRef.current.onresult = (event) => {
          try {
            console.log("🎙️ Speech recognition result event:", {
              resultsLength: event.results?.length,
              hasResults: !!event.results,
              isFinal: event.results?.[0]?.isFinal
            })
            
            if (event.results && event.results.length > 0 && event.results[0].length > 0) {
              const transcript = event.results[0][0].transcript
              if (transcript && transcript.trim().length > 0) {
                console.log("✅ Browser STT result:", transcript)
                try {
                  if (typeof onTranscript === 'function') {
                    onTranscript(transcript)
                  } else {
                    console.error("❌ onTranscript is not a function:", typeof onTranscript)
                  }
                } catch (transcriptError) {
                  console.error("❌ Error calling onTranscript:", transcriptError)
                }
              } else {
                console.log("ℹ️ Empty transcript received, ignoring...")
              }
            } else {
              console.log("ℹ️ No valid results in speech recognition event")
            }
          } catch (error) {
            console.error("❌ Error processing speech recognition result:", error)
            console.error("❌ Event details:", {
              hasResults: !!event.results,
              resultsLength: event.results?.length,
              eventType: event.type
            })
          }
        }
        
        recognitionRef.current.onerror = (event) => {
          console.log("🚨 Speech recognition error event:", {
            error: event.error,
            type: event.type,
            timestamp: new Date().toISOString()
          })
          
          // Handle specific errors with appropriate logging levels
          if (event.error === 'no-speech') {
            console.log("⚠️ No speech detected - this is normal, will restart automatically...")
            // Don't set listening to false for no-speech, let it continue
            return
          } else if (event.error === 'aborted') {
            console.log("ℹ️ Speech recognition aborted - this is normal when stopping")
            setIsListening(false)
            if (onListeningChange && typeof onListeningChange === 'function') {
              onListeningChange(false)
            }
            return
          } else if (event.error === 'not-allowed') {
            console.error("❌ Microphone permission denied! Please allow microphone access in browser settings.")
          } else if (event.error === 'network') {
            console.error("❌ Network error in speech recognition")
          } else {
            console.error("❌ Browser speech recognition error:", event.error)
            console.error("❌ Error details:", {
              error: event.error,
              message: event.message || 'No message',
              type: event.type || 'No type'
            })
          }
          
          setIsListening(false)
          if (onListeningChange && typeof onListeningChange === 'function') {
            onListeningChange(false)
          }
          
          // For any errors except 'aborted' and 'no-speech', restart the listening process
          if (event.error !== 'aborted' && event.error !== 'no-speech' && isConnectedRef.current) {
            console.log("🔄 Restarting browser STT after error:", event.error)
            setTimeout(() => {
              if (isConnectedRef.current) {
                startListening()
              }
            }, 2000) // Increased delay to 2 seconds
          }
        }
        
        recognitionRef.current.onend = () => {
          console.log("🔚 Browser speech recognition ended")
          setIsListening(false)
          if (onListeningChange && typeof onListeningChange === 'function') {
            onListeningChange(false)
          }
          
          // Auto-restart if still connected
          if (isConnectedRef.current) {
            setTimeout(() => {
              if (isConnectedRef.current) {
                console.log("🔄 Auto-restarting browser STT...")
                startListening()
              }
            }, 1000)
          }
        }
      }
      console.log("✅ Browser speech recognition initialized successfully")
      return true
    } else {
      console.error("❌ Browser speech recognition not supported")
      return false
    }
  }, [onTranscript, onListeningChange, onMicrophonePermissionGranted])

  // Media recorder not used - using browser STT only
  const initializeMediaRecorder = useCallback(async () => {
    console.log("Media recorder not needed - using browser STT only")
    return false // Always return false to disable media recorder
  }, [])

  // Cartesia recording disabled - using browser STT only
  const startCartesiaRecording = useCallback(async (): Promise<boolean> => {
    console.log("Cartesia STT disabled - using browser STT only")
    return false // Always return false to disable Cartesia STT
  }, [])

  // Start listening (browser STT only - free, reliable, and preferred)
  const startListening = useCallback(async () => {
    console.log("Starting voice input - using browser STT only (free and reliable)...")
    
    // Use browser speech recognition only
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        console.log("Using browser STT (primary and preferred)")
        return
      } catch (error) {
        console.log("Browser speech recognition failed:", error)
      }
    } else {
      // Initialize if not done yet
      const initialized = initializeSpeechRecognition()
      if (initialized && recognitionRef.current) {
        try {
          (recognitionRef.current as any)?.start()
          console.log("Using browser STT after initialization")
          return
        } catch (error) {
          console.log("Browser speech recognition failed after init:", error)
        }
      }
    }
    
    console.log("Browser STT failed - no fallback configured (using browser STT only)")
  }, [initializeSpeechRecognition])

  // Stop listening (browser STT only)
  const stopListening = useCallback(() => {
    console.log("Stopping browser voice input...")
    
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    // MediaRecorder completely disabled - no need to stop it
    console.log("MediaRecorder disabled - using browser STT only")
    
    setIsListening(false)
    setIsRecording(false)
    if (onListeningChange && typeof onListeningChange === 'function') {
      onListeningChange(false)
    }
  }, [onListeningChange])

  return {
    isListening: isListening || isRecording,
    startListening,
    stopListening,
    initializeSpeechRecognition
  }
}
