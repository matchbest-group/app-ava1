"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mic, 
  MicOff, 
  Bot, 
  Minimize2, 
  Maximize2,
  Zap,
  Sparkles,
  Brain,
  Activity,
  Phone
} from "lucide-react"
import { useRouter } from "next/navigation"
import MeetingForm from "./meeting-form"
import { useHybridVoiceInput } from "./hybrid-voice-input"

interface VoiceBotProps {
  isOpen: boolean
  onToggle: () => void
  isHeaderTriggered?: boolean
  onCallingStateChange?: (isCalling: boolean) => void
  onMicrophonePermissionGranted?: () => void
}

interface Message {
  id: string
  type: "user" | "bot"
  text: string
  timestamp: Date
  isPlaying?: boolean
}

export function VoiceBot({ isOpen, onToggle, isHeaderTriggered = false, onCallingStateChange, onMicrophonePermissionGranted }: VoiceBotProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [salesData, setSalesData] = useState({ name: '', email: '', phone: '', company: '', requirements: '' })
  const [currentField, setCurrentField] = useState('')
  const [taskStack, setTaskStack] = useState<any[]>([])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [isExecutingTasks, setIsExecutingTasks] = useState(false)
  
  // Meeting form state
  const [isMeetingFormOpen, setIsMeetingFormOpen] = useState(false)
  const [meetingFormData, setMeetingFormData] = useState<any>({})
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isConnectedRef = useRef(false)
  const isSpeakingRef = useRef(false)
  const router = useRouter()

  // Helper function to find topic elements on the page
  const findTopicElement = (topic: string): HTMLElement | null => {
    const searchTerms = topic.toLowerCase().split(' ')
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', // Headings
      '[class*="title"]', '[class*="heading"]', // Elements with title/heading in class
      '[id*="' + searchTerms[0] + '"]', // IDs containing the topic
      '[class*="' + searchTerms[0] + '"]' // Classes containing the topic
    ]
    
    // Try to find exact matches first
    for (const term of searchTerms) {
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector)
        for (const element of elements) {
          const text = element.textContent?.toLowerCase() || ''
          if (text.includes(term) || element.id.toLowerCase().includes(term) || 
              element.className.toLowerCase().includes(term)) {
            return element as HTMLElement
          }
        }
      }
    }
    
    // Try to find partial matches
    for (const term of searchTerms) {
      const allElements = document.querySelectorAll('*')
      for (const element of allElements) {
        const text = element.textContent?.toLowerCase() || ''
        if (text.includes(term) && text.length < 200) { // Avoid very long text blocks
          return element as HTMLElement
        }
      }
    }
    
    return null
  }

  // Voice input handler (defined before hook)
  const handleVoiceInputCallback = useCallback(async (transcript: string) => {
    // Filter out background noise and non-speech
    const cleanTranscript = transcript.trim()
    
    // Ignore background noise, audio events, and very short inputs
    if (!cleanTranscript || 
        cleanTranscript.length < 3 ||
        cleanTranscript.includes('(') ||
        cleanTranscript.includes('background') ||
        cleanTranscript.includes('hums') ||
        cleanTranscript.includes('clacking') ||
        cleanTranscript.includes('traffic noise') ||
        cleanTranscript.includes('people talking') ||
        cleanTranscript.includes('기계음') ||
        cleanTranscript === 'Good.' ||
        cleanTranscript === 'हां आ गया।' ||
        cleanTranscript === 'Jason action info' ||
        cleanTranscript.startsWith('4,000।') ||
        cleanTranscript.match(/^[.,!?]+$/)) {
      console.log('Ignoring background noise or invalid input:', transcript)
      return
    }

    console.log('Processing valid voice input:', cleanTranscript)
    
    // PRIORITY: Check for meeting intent FIRST
    const meetingKeywords = ['meeting', 'schedule', 'appointment', 'मीटिंग', 'अपॉइंटमेंट', 'बैठक', 'समय', 'schedule करना', 'book', 'call schedule', 'call book', 'मीटिंग करना', 'बैठक करना']
    const hasMeetingIntent = meetingKeywords.some(keyword => 
      cleanTranscript.toLowerCase().includes(keyword.toLowerCase())
    )
    
    console.log('🔍 Meeting Detection Debug:', {
      transcript: cleanTranscript,
      hasMeetingIntent,
      currentField,
      matchedKeywords: meetingKeywords.filter(keyword => 
        cleanTranscript.toLowerCase().includes(keyword.toLowerCase())
      )
    })

    // Check for sales intent SECOND (but exclude if meeting intent detected)
    const salesKeywords = ['sales', 'बिक्री', 'सेल्स', 'talk to sales', 'contact sales', 'बात करना', 'demo', 'quote', 'pricing inquiry', 'sales team']
    const hasSalesIntent = !hasMeetingIntent && salesKeywords.some(keyword => 
      cleanTranscript.toLowerCase().includes(keyword.toLowerCase())
    )

    if (hasMeetingIntent && !currentField) {
      console.log("📅 MEETING INTENT DETECTED - Opening meeting form and starting data collection")
      
      // Detect user's language
      const hasHindi = /[अ-ह]/.test(cleanTranscript) || 
                       cleanTranscript.toLowerCase().includes('मैं') || 
                       cleanTranscript.toLowerCase().includes('हूं') ||
                       cleanTranscript.toLowerCase().includes('है') ||
                       cleanTranscript.toLowerCase().includes('चाहिए') ||
                       cleanTranscript.toLowerCase().includes('करना') ||
                       cleanTranscript.toLowerCase().includes('मीटिंग') ||
                       cleanTranscript.toLowerCase().includes('बैठक') ||
                       cleanTranscript.toLowerCase().includes('समय')
      
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user", 
        text: cleanTranscript,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, userMessage])
      
      // Open meeting form immediately
      setIsMeetingFormOpen(true)
      setMeetingFormData({}) // Reset form data
      
      // Start meeting scheduling process with language-appropriate message
      const meetingText = hasHindi 
        ? "Perfect! मैंने आपके लिए meeting form open कर दिया है। इसमें अपना data fill करके send कर दीजिए। आप चाहें तो voice से भी बता सकते हैं - मैं automatically detect करके form में fill कर दूंगी। बताइए!"
        : "Perfect! I've opened the meeting form for you. Please fill in your data and send it. You can also tell me via voice - I'll automatically detect and fill all fields. Go ahead!"
      
      const meetingStartMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: meetingText,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, meetingStartMessage])
      setCurrentField('meeting_name')
      setIsProcessing(false)
      
      // Convert to speech
      if (audioEnabled) {
        setTimeout(() => convertToSpeech(meetingStartMessage.text), 300)
      }
      
      return // Don't process anything else
    }
    
    if (hasSalesIntent && !currentField) {
      console.log("🎯 SALES INTENT DETECTED - Starting automatic sales data collection process")
      
      // Detect user's language
      const hasHindi = /[अ-ह]/.test(cleanTranscript) || 
                       cleanTranscript.toLowerCase().includes('मैं') || 
                       cleanTranscript.toLowerCase().includes('हूं') ||
                       cleanTranscript.toLowerCase().includes('है') ||
                       cleanTranscript.toLowerCase().includes('चाहिए') ||
                       cleanTranscript.toLowerCase().includes('करना') ||
                       cleanTranscript.toLowerCase().includes('बिक्री') ||
                       cleanTranscript.toLowerCase().includes('सेल्स') ||
                       cleanTranscript.toLowerCase().includes('बात')
      
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user", 
        text: cleanTranscript,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, userMessage])
      
      // Start sales process immediately with language-appropriate message
      const salesText = hasHindi 
        ? "Perfect! मैं आपको sales team से connect कर देती हूं। इसके लिए मुझे आपकी कुछ basic details चाहिए। चलिए शुरू करते हैं - आपका नाम क्या है?"
        : "Perfect! I'll connect you with our sales team. For this, I need some basic details from you. Let's start - what's your name?"
      
      const salesStartMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: salesText,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, salesStartMessage])
      setCurrentField('name')
      setIsProcessing(false)
      
      // Convert to speech
      if (audioEnabled) {
        setTimeout(() => convertToSpeech(salesStartMessage.text), 300)
      }
      
      return // Don't process anything else
    }
    
    // Add comprehensive logging for debugging
    console.log("🔍 VOICE INPUT DEBUG:", {
      transcript: cleanTranscript,
      currentField,
      isMeetingFormOpen,
      hasCurrentField: !!currentField,
      hasMeetingForm: !!isMeetingFormOpen
    })
    
    // PRIORITY CHECK: If we're in data collection mode OR meeting form is open, handle it FIRST before any API calls
    if (currentField || isMeetingFormOpen) {
      console.log("🔒 DATA COLLECTION MODE ACTIVE - Bypassing API call, handling directly", {
        currentField,
        isMeetingFormOpen,
        transcript: cleanTranscript
      })
      
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        text: cleanTranscript,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, userMessage])
      
      // SMART DETECTION: If meeting form is open, detect any field automatically
      if (isMeetingFormOpen && cleanTranscript.toLowerCase().includes('my ')) {
        console.log("🧠 SMART DETECTION MODE - Meeting form is open with 'my' trigger detected", {
          isMeetingFormOpen,
          currentField,
          transcript: cleanTranscript
        })
        
        // Advanced multi-field detection patterns
        const emailRegex = /([^\s@]+@[^\s@]+\.[^\s@]+)/g
        const phoneRegex = /(?:\+?[\d\s\-\(\)]{10,}|\d{10,})/g
        const dateRegex = /(?:tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december))/gi
        const timeRegex = /(?:\d{1,2}:\d{2}(?:\s*(?:am|pm))?|\d{1,2}\s*(?:am|pm))/gi
        const companyKeywords = ['company', 'corporation', 'corp', 'inc', 'ltd', 'llc', 'pvt', 'private', 'limited', 'tech', 'technologies', 'solutions', 'systems', 'services', 'software', 'digital', 'enterprises']
        
        // Multi-field extraction patterns
        const namePattern = /(?:my\s+name\s+is\s+|i\s+am\s+|मेरा\s+नाम\s+|मैं\s+)([a-zA-Z\s]+?)(?=\s*(?:,|and|my|email|phone|company|\.|$))/gi
        const emailPattern = /(?:my\s+email\s+is\s+|email\s+is\s+|मेरा\s+email\s+)([^\s@]+@[^\s@]+\.[^\s@]+)/gi
        const phonePattern = /(?:my\s+phone\s+is\s+|phone\s+is\s+|my\s+number\s+is\s+|मेरा\s+phone\s+|मेरा\s+number\s+)([+\d\s\-\(\)]{10,})/gi
        const companyPattern = /(?:my\s+company\s+is\s+|company\s+is\s+|i\s+work\s+at\s+|मेरी\s+company\s+|मैं\s+काम\s+करता\s+हूं\s+)([a-zA-Z0-9\s\.]+?)(?=\s*(?:,|and|my|email|phone|\.|$))/gi
        const datePattern = /(?:date\s+is\s+|meeting\s+date\s+|preferred\s+date\s+|मीटिंग\s+date\s+)([a-zA-Z0-9\s\/\-]+?)(?=\s*(?:,|and|my|time|\.|$))/gi
        const timePattern = /(?:time\s+is\s+|meeting\s+time\s+|preferred\s+time\s+|मीटिंग\s+time\s+)([0-9:\s\w]+?)(?=\s*(?:,|and|my|\.|$))/gi
        
        // Extract all possible fields from the transcript
        const extractedData: any = {}
        let detectedFields: string[] = []
        
        // Extract name
        const nameMatch = namePattern.exec(cleanTranscript)
        if (nameMatch && nameMatch[1]) {
          extractedData.name = nameMatch[1].trim()
          detectedFields.push('name')
          console.log("🔍 Extracted NAME:", extractedData.name)
        }
        
        // Extract email
        const emailMatch = emailPattern.exec(cleanTranscript)
        if (emailMatch && emailMatch[1]) {
          extractedData.email = emailMatch[1].trim()
          detectedFields.push('email')
          console.log("🔍 Extracted EMAIL:", extractedData.email)
        }
        
        // Extract phone
        const phoneMatch = phonePattern.exec(cleanTranscript)
        if (phoneMatch && phoneMatch[1]) {
          extractedData.phone = phoneMatch[1].trim()
          detectedFields.push('phone')
          console.log("🔍 Extracted PHONE:", extractedData.phone)
        }
        
        // Extract company
        const companyMatch = companyPattern.exec(cleanTranscript)
        if (companyMatch && companyMatch[1]) {
          extractedData.company = companyMatch[1].trim()
          detectedFields.push('company')
          console.log("🔍 Extracted COMPANY:", extractedData.company)
        }
        
        // Extract date
        const dateMatch = datePattern.exec(cleanTranscript)
        if (dateMatch && dateMatch[1]) {
          extractedData.preferredDate = dateMatch[1].trim()
          detectedFields.push('date')
          console.log("🔍 Extracted DATE:", extractedData.preferredDate)
        }
        
        // Extract time
        const timeMatch = timePattern.exec(cleanTranscript)
        if (timeMatch && timeMatch[1]) {
          extractedData.preferredTime = timeMatch[1].trim()
          detectedFields.push('time')
          console.log("🔍 Extracted TIME:", extractedData.preferredTime)
        }
        
        // If multiple fields detected, fill them all at once
        if (detectedFields.length > 1) {
          console.log("🎯 MULTI-FIELD DETECTION - Found", detectedFields.length, "fields:", detectedFields)
          
          // Update meeting form data with all extracted fields
          setMeetingFormData((prev: any) => ({
            ...prev,
            ...extractedData
          }))
          
          // Create summary message
          const fieldsList = detectedFields.map(field => {
            switch(field) {
              case 'name': return `Name: ${extractedData.name}`
              case 'email': return `Email: ${extractedData.email}`
              case 'phone': return `Phone: ${extractedData.phone}`
              case 'company': return `Company: ${extractedData.company}`
              case 'date': return `Date: ${extractedData.preferredDate}`
              case 'time': return `Time: ${extractedData.preferredTime}`
              default: return ''
            }
          }).filter(Boolean).join(', ')
          
          const multiFieldMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Excellent! मैंने multiple fields detect किए हैं और form में fill कर दिया है: ${fieldsList}. ${detectedFields.length < 6 ? 'बाकी missing fields बताइए।' : 'सभी details complete हैं!'}`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, multiFieldMessage])
          
          // Set next field based on what's missing
          const allFields = ['name', 'email', 'phone', 'company', 'date', 'time']
          const missingFields = allFields.filter(field => !detectedFields.includes(field))
          
          if (missingFields.length > 0) {
            const nextField = `meeting_${missingFields[0] === 'date' ? 'date' : missingFields[0] === 'time' ? 'time' : missingFields[0]}`
            setCurrentField(nextField)
            console.log("Next field to collect:", nextField)
          } else {
            // All basic fields collected, move to meeting type
            setCurrentField('meeting_type')
          }
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(multiFieldMessage.text), 300)
          }
          return
        }
        
        // Fallback to single field detection if no multi-field pattern found
        const singleEmailMatch = emailRegex.exec(cleanTranscript)
        const singlePhoneMatch = phoneRegex.exec(cleanTranscript)
        const singleDateMatch = dateRegex.exec(cleanTranscript)
        const singleTimeMatch = timeRegex.exec(cleanTranscript)
        const isCompanyName = companyKeywords.some(keyword => 
          cleanTranscript.toLowerCase().includes(keyword.toLowerCase())
        ) || cleanTranscript.includes('.')  // Domain-like company names
        
        // Detect field type and set appropriate currentField
        if (singleEmailMatch) {
          console.log("🔍 Detected EMAIL:", singleEmailMatch[0])
          setCurrentField('meeting_email')
          setMeetingFormData((prev: any) => ({ ...prev, email: singleEmailMatch[0] }))
          
          const detectedMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Perfect! मैंने आपका email ${singleEmailMatch[0]} form में fill कर दिया है। अब आपका phone number बताइए।`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, detectedMessage])
          setCurrentField('meeting_phone')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(detectedMessage.text), 300)
          }
          return
        } else if (singlePhoneMatch) {
          console.log("🔍 Detected PHONE:", singlePhoneMatch[0])
          setCurrentField('meeting_phone')
          setMeetingFormData((prev: any) => ({ ...prev, phone: singlePhoneMatch[0] }))
          
          const detectedMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Great! आपका phone number ${singlePhoneMatch[0]} form में add हो गया। अब आपकी company का नाम बताइए।`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, detectedMessage])
          setCurrentField('meeting_company')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(detectedMessage.text), 300)
          }
          return
        } else if (singleDateMatch) {
          console.log("🔍 Detected DATE:", singleDateMatch[0])
          setCurrentField('meeting_date')
          setMeetingFormData((prev: any) => ({ ...prev, preferredDate: singleDateMatch[0] }))
          
          const detectedMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Excellent! Date ${singleDateMatch[0]} form में set हो गई। अब preferred time बताइए।`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, detectedMessage])
          setCurrentField('meeting_time')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(detectedMessage.text), 300)
          }
          return
        } else if (singleTimeMatch) {
          console.log("🔍 Detected TIME:", singleTimeMatch[0])
          setCurrentField('meeting_time')
          setMeetingFormData((prev: any) => ({ ...prev, preferredTime: singleTimeMatch[0] }))
          
          const detectedMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Perfect! Time ${singleTimeMatch[0]} भी set हो गया। यह meeting किस बारे में है? (demo, consultation, support)`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, detectedMessage])
          setCurrentField('meeting_type')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(detectedMessage.text), 300)
          }
          return
        } else if (isCompanyName) {
          console.log("🔍 Detected COMPANY:", cleanTranscript)
          setCurrentField('meeting_company')
          setMeetingFormData((prev: any) => ({ ...prev, company: cleanTranscript }))
          
          const detectedMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Excellent! Company "${cleanTranscript}" form में add हो गई। अब preferred meeting date बताइए।`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, detectedMessage])
          setCurrentField('meeting_date')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(detectedMessage.text), 300)
          }
          return
        } else if (cleanTranscript.toLowerCase().includes('demo') || 
                   cleanTranscript.toLowerCase().includes('consultation') || 
                   cleanTranscript.toLowerCase().includes('support') ||
                   cleanTranscript.toLowerCase().includes('meeting') ||
                   cleanTranscript.toLowerCase().includes('discussion')) {
          console.log("🔍 Detected MEETING TYPE:", cleanTranscript)
          setCurrentField('meeting_type')
          setMeetingFormData((prev: any) => ({ ...prev, meetingType: cleanTranscript }))
          
          const detectedMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Great! Meeting type "${cleanTranscript}" form में add हो गया। अब meeting का agenda या purpose detail में बताइए।`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, detectedMessage])
          setCurrentField('meeting_agenda')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(detectedMessage.text), 300)
          }
          return
        } else {
          // Default to name if no specific pattern detected
          console.log("🔍 Detected NAME (default):", cleanTranscript)
          setCurrentField('meeting_name')
          setMeetingFormData((prev: any) => ({ ...prev, name: cleanTranscript }))
          
          const detectedMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Perfect! आपका name ${cleanTranscript} form में fill हो गया। अब आपका email address बताइए।`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, detectedMessage])
          setCurrentField('meeting_email')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(detectedMessage.text), 300)
          }
          return
        }
      }

      // Handle meeting data collection immediately
      if (currentField && currentField.startsWith('meeting_')) {
        console.log("📅 MEETING MODE ACTIVE - Processing only meeting data collection")
        
        // Meeting data collection with local state management
        let meetingData = {
          name: '',
          email: '',
          phone: '',
          company: '',
          preferredDate: '',
          preferredTime: '',
          meetingType: '',
          agenda: ''
        }

        if (currentField === 'meeting_name') {
          meetingData.name = cleanTranscript
          console.log("✅ Meeting Name collected:", meetingData.name)
          
          // Auto-fill form
          setMeetingFormData((prev: any) => ({
            ...prev,
            name: cleanTranscript
          }))
          
          const nextMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: "Great! Form में आपका name fill हो गया। अब मुझे आपका email address बताइए।",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, nextMessage])
          setCurrentField('meeting_email')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(nextMessage.text), 300)
          }
          return
        } else if (currentField === 'meeting_email') {
          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(cleanTranscript)) {
            const errorMessage: Message = {
              id: (Date.now() + 1).toString(),
              type: "bot",
              text: "Please provide a valid email address.",
              timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
            
            if (audioEnabled) {
              setTimeout(() => convertToSpeech(errorMessage.text), 300)
            }
            return
          }
          
          meetingData.email = cleanTranscript
          console.log("✅ Meeting Email collected:", meetingData.email)
          
          // Auto-fill form
          setMeetingFormData((prev: any) => ({
            ...prev,
            email: cleanTranscript
          }))
          
          const nextMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: "Perfect! Email भी form में add हो गया। अब आपका phone number बताइए।",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, nextMessage])
          setCurrentField('meeting_phone')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(nextMessage.text), 300)
          }
          return
        } else if (currentField === 'meeting_phone') {
          meetingData.phone = cleanTranscript
          console.log("✅ Meeting Phone collected:", meetingData.phone)
          
          // Auto-fill form
          setMeetingFormData((prev: any) => ({
            ...prev,
            phone: cleanTranscript
          }))
          
          const nextMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: "Great! Phone number भी add हो गया। आपकी company का नाम क्या है?",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, nextMessage])
          setCurrentField('meeting_company')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(nextMessage.text), 300)
          }
          return
        } else if (currentField === 'meeting_company') {
          meetingData.company = cleanTranscript
          console.log("✅ Meeting Company collected:", meetingData.company)
          
          // Auto-fill form
          setMeetingFormData((prev: any) => ({
            ...prev,
            company: cleanTranscript
          }))
          
          const nextMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: "Excellent! Company name भी form में add हो गया। आप कौन सा date prefer करते हैं meeting के लिए?",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, nextMessage])
          setCurrentField('meeting_date')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(nextMessage.text), 300)
          }
          return
        } else if (currentField === 'meeting_date') {
          meetingData.preferredDate = cleanTranscript
          console.log("✅ Meeting Date collected:", meetingData.preferredDate)
          
          // Auto-fill form
          setMeetingFormData((prev: any) => ({
            ...prev,
            preferredDate: cleanTranscript
          }))
          
          const nextMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: "Perfect! Date भी set हो गई। कौन सा time prefer करेंगे?",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, nextMessage])
          setCurrentField('meeting_time')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(nextMessage.text), 300)
          }
          return
        } else if (currentField === 'meeting_time') {
          meetingData.preferredTime = cleanTranscript
          console.log("✅ Meeting Time collected:", meetingData.preferredTime)
          
          // Auto-fill form
          setMeetingFormData((prev: any) => ({
            ...prev,
            preferredTime: cleanTranscript
          }))
          
          const nextMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: "Great! Time भी set हो गया। यह meeting किस बारे में है? (demo, consultation, support)",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, nextMessage])
          setCurrentField('meeting_type')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(nextMessage.text), 300)
          }
          return
        } else if (currentField === 'meeting_type') {
          meetingData.meetingType = cleanTranscript
          console.log("✅ Meeting Type collected:", meetingData.meetingType)
          
          // Auto-fill form
          setMeetingFormData((prev: any) => ({
            ...prev,
            meetingType: cleanTranscript
          }))
          
          const nextMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: "Finally, meeting का agenda या purpose क्या है? Detail में बताइए।",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, nextMessage])
          setCurrentField('meeting_agenda')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(nextMessage.text), 300)
          }
          return
        } else if (currentField === 'meeting_agenda') {
          meetingData.agenda = cleanTranscript
          console.log("✅ Meeting Agenda collected:", meetingData.agenda)
          
          // Auto-fill form completely
          setMeetingFormData((prev: any) => ({
            ...prev,
            agenda: cleanTranscript
          }))
          
          // All meeting data collected, show summary and auto-submit form
          const summaryMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Perfect! सभी details form में fill हो गई हैं। मैं automatically submit कर रही हूं। आपकी meeting request send हो गई है!`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, summaryMessage])
          
          // Auto-submit the form after a short delay
          setTimeout(async () => {
            console.log("🤖 Auto-submitting meeting form with collected data")
            
            // Submit meeting data to API
            try {
              const meetingSubmissionData = {
                name: meetingFormData.name || '',
                email: meetingFormData.email || '',
                phone: meetingFormData.phone || '',
                company: meetingFormData.company || '',
                preferredDate: meetingFormData.preferredDate || '',
                preferredTime: meetingFormData.preferredTime || '',
                meetingType: meetingFormData.meetingType || '',
                agenda: cleanTranscript,
                source: "Voice Assistant"
              }
              
              const response = await fetch('/api/send-meeting-request', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(meetingSubmissionData)
              })
              
              if (response.ok) {
                console.log("✅ Meeting request submitted successfully")
                const successMessage: Message = {
                  id: (Date.now() + 10).toString(),
                  type: "bot",
                  text: "Perfect! आपकी meeting request successfully submit हो गई है! हमारी team आपको 24 hours में contact करेगी।",
                  timestamp: new Date()
                }
                setMessages(prev => [...prev, successMessage])
                
                if (audioEnabled) {
                  setTimeout(() => convertToSpeech(successMessage.text), 300)
                }
              } else {
                console.error("❌ Meeting request submission failed")
                const errorMessage: Message = {
                  id: (Date.now() + 11).toString(),
                  type: "bot",
                  text: "Sorry, meeting request submit करने में problem हुई है। Please try again या direct contact करें।",
                  timestamp: new Date()
                }
                setMessages(prev => [...prev, errorMessage])
                
                if (audioEnabled) {
                  setTimeout(() => convertToSpeech(errorMessage.text), 300)
                }
              }
            } catch (error) {
              console.error("❌ Error submitting meeting request:", error)
            }
          }, 1000)
          
          setCurrentField('')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(summaryMessage.text), 300)
          }
          return
        }
        
        return // Exit here for any meeting mode processing
      }
      
      // SMART DETECTION: If in sales mode but no specific field, detect automatically
      if (currentField === 'name' && !salesData.name) {
        console.log("🧠 SMART SALES DETECTION - Detecting field type for sales form")
        
        // Smart field detection for sales form
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /(?:\+?[\d\s\-\(\)]{10,}|\d{10,})/
        
        // If user directly provides email or phone, detect and fill
        if (emailRegex.test(cleanTranscript)) {
          console.log("🔍 Detected SALES EMAIL:", cleanTranscript)
          setSalesData(prev => ({ ...prev, email: cleanTranscript }))
          
          const detectedMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Perfect! मैंने आपका email ${cleanTranscript} collect कर लिया है। अब आपका name बताइए।`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, detectedMessage])
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(detectedMessage.text), 300)
          }
          return
        } else if (phoneRegex.test(cleanTranscript)) {
          console.log("🔍 Detected SALES PHONE:", cleanTranscript)
          setSalesData(prev => ({ ...prev, phone: cleanTranscript }))
          
          const detectedMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `Great! आपका phone number ${cleanTranscript} collect हो गया। अब आपका name बताइए।`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, detectedMessage])
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(detectedMessage.text), 300)
          }
          return
        }
      }

      // Handle sales data collection immediately 
      if (currentField && currentField !== 'confirm') {
        console.log("🔄 Processing sales data collection for field:", currentField, "with transcript:", cleanTranscript)
        const newSalesData = { ...salesData }
        
        // Update the current field with user's response
        if (currentField === 'name') {
          newSalesData.name = cleanTranscript
          console.log("✅ Name collected:", newSalesData.name)
        } else if (currentField === 'email') {
          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(cleanTranscript)) {
            const errorMessage: Message = {
              id: (Date.now() + 9).toString(),
              type: "bot",
              text: "Please provide a valid email address. For example: john@company.com",
              timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
            
            if (audioEnabled) {
              setTimeout(() => convertToSpeech(errorMessage.text), 300)
            }
            return
          }
          newSalesData.email = cleanTranscript
          console.log("✅ Email collected:", newSalesData.email)
        } else if (currentField === 'phone') {
          // Basic phone validation
          const phoneRegex = /\d{10,}/
          if (!phoneRegex.test(cleanTranscript.replace(/\D/g, ''))) {
            const errorMessage: Message = {
              id: (Date.now() + 10).toString(),
              type: "bot",
              text: "Please provide a valid phone number with at least 10 digits. For example: +1234567890 or 1234567890",
              timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
            
            if (audioEnabled) {
              setTimeout(() => convertToSpeech(errorMessage.text), 300)
            }
            return
          }
          newSalesData.phone = cleanTranscript
          console.log("✅ Phone collected:", newSalesData.phone)
        } else if (currentField === 'company') {
          newSalesData.company = cleanTranscript
          console.log("✅ Company collected:", newSalesData.company)
        } else if (currentField === 'requirements') {
          newSalesData.requirements = cleanTranscript
          console.log("✅ Requirements collected:", newSalesData.requirements)
        }
        
        setSalesData(newSalesData)
        
        // Move to next field or confirm
        const fields = ['name', 'email', 'phone', 'company', 'requirements']
        const currentIndex = fields.indexOf(currentField)
        if (currentIndex < fields.length - 1) {
          const nextField = fields[currentIndex + 1]
          setCurrentField(nextField)
          
          let nextQuestion = ""
          if (nextField === 'email') nextQuestion = "Thank you! Ab aapka email address bataiye - sales team aapko email per contact karegi."
          else if (nextField === 'phone') nextQuestion = "Great! Aapka phone number kya hai? Sales team call karegi aapko."
          else if (nextField === 'company') nextQuestion = "Perfect! Aap kis company mein kaam karte hain?"
          else if (nextField === 'requirements') nextQuestion = "Excellent! Ab bataiye ki aapko kya chahiye - konse products ya services ke baare mein jaanna hai?"
          
          const nextBotMessage: Message = {
            id: (Date.now() + 3).toString(),
            type: "bot",
            text: nextQuestion,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, nextBotMessage])
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(nextQuestion), 300)
          }
        } else {
          // All data collected, show confirmation
          const confirmBotMessage: Message = {
            id: (Date.now() + 4).toString(),
            type: "bot",
            text: `Perfect! Main ne aapki saari details collect kar li hain: Name: ${newSalesData.name}, Email: ${newSalesData.email}, Phone: ${newSalesData.phone}, Company: ${newSalesData.company}, Requirements: ${newSalesData.requirements}. Kya main ye information sales team ko send kar dun? Bolo "YES" ya "हाँ"`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, confirmBotMessage])
          setCurrentField('confirm')
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(confirmBotMessage.text), 300)
          }
        }
        return // Exit here, don't process anything else
      }
    }

    // Handle confirmation responses for sales data
    if (currentField === 'confirm' && cleanTranscript) {
      console.log("🔄 Processing confirmation response:", cleanTranscript)
      const newSalesData = { ...salesData }
      
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        text: cleanTranscript,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, userMessage])
      
      // Check for start over
      if (cleanTranscript.toLowerCase().includes('start over') || 
          cleanTranscript.toLowerCase().includes('restart') ||
          cleanTranscript.toLowerCase().includes('begin again') ||
          cleanTranscript.toLowerCase().includes('फिर से शुरू')) {
        
        setSalesData({ name: '', email: '', phone: '', company: '', requirements: '' })
        setCurrentField('name')
        
        const restartMessage: Message = {
          id: (Date.now() + 7).toString(),
          type: "bot",
          text: "No problem! Let's start over. What's your full name?",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, restartMessage])
        
        if (audioEnabled) {
          setTimeout(() => convertToSpeech(restartMessage.text), 300)
        }
        return
      }
      
      if (cleanTranscript.toLowerCase().includes('yes') || 
          cleanTranscript.toLowerCase().includes('confirm') ||
          cleanTranscript.toLowerCase().includes('send') ||
          cleanTranscript.toLowerCase().includes('ok') ||
          cleanTranscript.toLowerCase().includes('हां') ||
          cleanTranscript.toLowerCase().includes('ठीक है')) {
        
        // Send the data to sales team
        console.log("✅ User confirmed, sending sales data:", newSalesData)
        
        // Show sending message
        const sendingMessage: Message = {
          id: (Date.now() + 11).toString(),
          type: "bot",
          text: "Sending your information to our sales team...",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, sendingMessage])
        
        if (audioEnabled) {
          setTimeout(() => convertToSpeech("Sending your information to our sales team"), 300)
        }
        
        try {
          const response = await fetch("/api/send-pricing-inquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: newSalesData.name,
              email: newSalesData.email,
              phone: newSalesData.phone,
              company: newSalesData.company,
              requirements: newSalesData.requirements,
              source: "Voice Assistant",
              timestamp: new Date().toISOString()
            })
          })
          
          if (response.ok) {
            const result = await response.json()
            console.log("Email sent successfully:", result)
            
            const successMessage: Message = {
              id: (Date.now() + 12).toString(),
              type: "bot",
              text: `Perfect! ✅ Main ne aapki saari details sales team ko successfully send kar di hain! Hamare sales team 24 hours mein aapko ${newSalesData.email} per contact karegi personalized solutions ke saath. Thank you for choosing AVA Suite! Kya aur kuch help chahiye?`,
              timestamp: new Date()
            }
            setMessages(prev => [...prev, successMessage])
            
            if (audioEnabled) {
              setTimeout(() => convertToSpeech("Perfect! Main ne aapki saari details sales team ko successfully send kar di hain! Hamare sales team 24 hours mein aapko contact karegi personalized solutions ke saath. Thank you for choosing AVA Suite!"), 300)
            }
            
            // Reset form
            setSalesData({ name: '', email: '', phone: '', company: '', requirements: '' })
            setCurrentField('')
            return
          } else {
            const errorData = await response.json()
            console.error("Email sending failed:", errorData)
            
            const errorMessage: Message = {
              id: (Date.now() + 13).toString(),
              type: "bot",
              text: "I'm sorry, there was an issue sending your information. Please try again or you can contact our sales team directly. Would you like to try again?",
              timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
            
            if (audioEnabled) {
              setTimeout(() => convertToSpeech("I'm sorry, there was an issue sending your information. Please try again or contact our sales team directly."), 300)
            }
            return
          }
        } catch (error) {
          console.error("Error sending sales inquiry:", error)
          
          const errorMessage: Message = {
            id: (Date.now() + 14).toString(),
            type: "bot",
            text: "I'm sorry, there was a technical issue. Please try again or contact our sales team directly. Would you like to try again?",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, errorMessage])
          
          if (audioEnabled) {
            setTimeout(() => convertToSpeech("I'm sorry, there was a technical issue. Please try again or contact our sales team directly."), 300)
          }
          return
        }
      } else {
        // User declined, ask what they want to change
        const declineMessage: Message = {
          id: (Date.now() + 6).toString(),
          type: "bot",
          text: "No problem! What would you like to change or would you prefer to start over? You can say 'start over' or tell me which field you'd like to modify (name, email, phone, company, or requirements).",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, declineMessage])
        
        if (audioEnabled) {
          setTimeout(() => convertToSpeech(declineMessage.text), 300)
        }
        return
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: cleanTranscript,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)

    try {
      console.log("Processing voice input:", transcript)
      
      // Send to AI agent
      const response = await fetch("/api/voice-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: cleanTranscript,
          currentPath: window.location.pathname
        })
      })

      const data = await response.json()
      console.log("Voice Agent Response:", data)
      
      // Clean the reply text - remove JSON formatting if present
      let cleanReply = data.reply || "I'm here to help you!"
      
      // Remove JSON markdown formatting
      if (cleanReply.includes('```json') || cleanReply.includes('```')) {
        // Extract just the reply text from JSON
        try {
          const jsonMatch = cleanReply.match(/\{[\s\S]*"reply":\s*"([^"]*)"[\s\S]*\}/);
          if (jsonMatch && jsonMatch[1]) {
            cleanReply = jsonMatch[1];
          } else {
            // If JSON parsing fails, remove all markdown and JSON formatting
            cleanReply = cleanReply
              .replace(/```json/g, '')
              .replace(/```/g, '')
              .replace(/\{[\s\S]*?"reply":\s*"/g, '')
              .replace(/"[\s\S]*?\}/g, '')
              .replace(/^\s*\{[\s\S]*\}\s*$/g, '')
              .trim();
          }
        } catch (error) {
          console.log("Error parsing JSON reply, using fallback")
          cleanReply = "I'm here to help you with navigation and product information!"
        }
      }
      
      console.log("Clean reply:", cleanReply)
      
      // Add bot response first
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: cleanReply,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      
      // Handle navigation tasks IMMEDIATELY after response
      if (data.action === "navigate" && data.path) {
        console.log("Attempting navigation to:", data.path)
        console.log("🔄 Voice bot will remain active during navigation")
        
        try {
          router.push(data.path)
          console.log("Router.push called for:", data.path)
          
          // Keep voice bot connected during navigation
          console.log("🎯 Maintaining voice bot connection during page transition")
          
        } catch (error) {
          console.error("Router.push failed:", error)
        }
        
        setTimeout(() => {
          if (window.location.pathname !== data.path) {
            console.log("Router navigation didn't work, using window.location")
            window.location.href = data.path
          }
        }, 100)
        
        if (typeof window !== "undefined") {
          window.location.href = data.path
        }
        
        // Handle scroll to specific section (like contact form)
        if (data.scroll_to) {
          console.log("Scrolling to section:", data.scroll_to)
          setTimeout(() => {
            const targetElement = document.querySelector(`#${data.scroll_to}`) || 
                                document.querySelector(`[data-section="${data.scroll_to}"]`) ||
                                document.querySelector(`.${data.scroll_to}`) ||
                                document.querySelector(`[class*="${data.scroll_to}"]`)
            
            if (targetElement) {
              console.log("Found target element, scrolling to:", targetElement)
              targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
              })
              
              // Add highlight effect
              const htmlElement = targetElement as HTMLElement
              htmlElement.style.transition = 'all 0.3s ease'
              htmlElement.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
              htmlElement.style.borderRadius = '8px'
              htmlElement.style.padding = '10px'
              
              // Remove highlight after 3 seconds
              setTimeout(() => {
                htmlElement.style.backgroundColor = ''
                htmlElement.style.padding = ''
              }, 3000)
            } else {
              console.log("Target element not found, trying alternative selectors")
              // Try to find contact form or similar elements
              const contactSelectors = [
                '[id*="contact"]',
                '[class*="contact"]',
                'form',
                '[data-contact]',
                '.contact-section',
                '#contact-section'
              ]
              
              for (const selector of contactSelectors) {
                const element = document.querySelector(selector)
                if (element) {
                  console.log("Found contact element with selector:", selector)
                  element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'nearest'
                  })
                  break
                }
              }
            }
          }, 1500) // Wait for page to load before scrolling
        }
      }
      
      // Handle task stack creation
      if (data.action === "create_task_stack" && data.tasks) {
        console.log("Creating task stack:", data.tasks)
        setTaskStack(data.tasks)
        setCurrentTaskIndex(0)
        setIsExecutingTasks(true)
        
        // Start executing first task after confirmation
        setTimeout(() => {
          executeNextTask(data.tasks, 0)
        }, 2000)
      }

      // Handle task execution
      if (data.action === "execute_next_task") {
        console.log("Executing next task in stack")
        if (data.remaining_tasks && data.remaining_tasks.length > 0) {
          setTimeout(() => {
            executeNextTask(data.remaining_tasks, currentTaskIndex + 1)
          }, 1000)
        } else {
          setIsExecutingTasks(false)
          setTaskStack([])
          setCurrentTaskIndex(0)
          
          const completionMessage: Message = {
            id: (Date.now() + 19).toString(),
            type: "bot",
            text: "All done! Is there anything else I can help you with?",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, completionMessage])
          
          // Convert to speech
          if (audioEnabled) {
            setTimeout(() => convertToSpeech("All done! Is there anything else I can help you with?"), 300)
          }
        }
      }

      // Handle close command
      if (data.action === "close") {
        console.log("Voice bot close command received")
        
        // Stop any ongoing speech synthesis immediately
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          speechSynthesis.cancel()
          console.log("Speech synthesis stopped on close command")
        }
        
        setTimeout(() => {
          disconnectCall()
          onToggle() // Close the voice bot
        }, 2000) // Wait 2 seconds after saying goodbye
      }

      // Handle page explanation with scrolling
      if (data.action === "explain_page" && data.scroll) {
        console.log("Starting page explanation with auto-scroll")
        
        // Check if there's a specific topic to focus on
        const topic = data.topic || ''
        console.log("Looking for topic:", topic)
        
        if (topic) {
          // Try to find the specific topic section
          const topicElement = findTopicElement(topic)
          if (topicElement) {
            console.log("Found topic element, scrolling to it:", topicElement)
            // Fast scroll to the specific topic
            topicElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center',
              inline: 'nearest'
            })
            
            // Add a highlight effect
            const htmlTopicElement = topicElement as HTMLElement
            htmlTopicElement.style.transition = 'background-color 0.3s ease'
            htmlTopicElement.style.backgroundColor = 'rgba(147, 51, 234, 0.1)' // Purple highlight
            htmlTopicElement.style.borderRadius = '8px'
            htmlTopicElement.style.padding = '8px'
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
              htmlTopicElement.style.backgroundColor = ''
              htmlTopicElement.style.borderRadius = ''
              htmlTopicElement.style.padding = ''
            }, 3000)
            
            return // Don't do full page scroll
          }
        }
        
        // If no specific topic found, do limited scrolling
        const scrollDuration = 6000 // Reduced to 6 seconds
        const scrollInterval = 150 // Slower interval
        const scrollStep = window.innerHeight / (scrollDuration / scrollInterval * 2) // Smaller steps
        
        let currentScrollPosition = window.pageYOffset
        const maxScroll = Math.min(
          currentScrollPosition + (window.innerHeight * 2), // Only scroll 2 screen heights
          document.documentElement.scrollHeight - window.innerHeight
        )
        
        const scrollTimer = setInterval(() => {
          currentScrollPosition += scrollStep
          
          if (currentScrollPosition >= maxScroll) {
            clearInterval(scrollTimer)
            console.log("Limited page explanation scroll completed")
          } else {
            // Smooth scroll down
            window.scrollTo({ top: currentScrollPosition, behavior: 'smooth' })
          }
        }, scrollInterval)
        
        // Clear scroll timer
        setTimeout(() => {
          clearInterval(scrollTimer)
        }, scrollDuration + 1000)
      }

      // Handle form filling
      if (data.action === "fill_form") {
        console.log("AI Agent filling form automatically")
        // This would integrate with form elements on the page
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "I can help you fill out any form on our website. Just tell me what information you'd like to submit and I'll handle it for you!",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      // Handle email sending
      if (data.action === "send_email") {
        console.log("AI Agent handling email request")
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "I can send emails to our team for you! Whether it's sales, support, or general inquiries, I'll make sure your message reaches the right department.",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      // Handle content search
      if (data.action === "search_content") {
        console.log("AI Agent searching website content")
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "I'm searching our website for relevant information about your query. I can find specific products, features, pricing details, or any content you need!",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      // Handle product comparisons
      if (data.action === "compare_products") {
        console.log("AI Agent providing product comparison")
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "I can provide detailed comparisons between our products and plans. Let me analyze the differences and help you choose the best solution for your needs!",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      // Handle quote creation
      if (data.action === "create_quote") {
        console.log("AI Agent creating custom quote")
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "I can create personalized quotes based on your specific requirements. I'll analyze your needs and provide accurate pricing with all relevant features included!",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      // Handle technical support
      if (data.action === "technical_support") {
        console.log("AI Agent providing technical support")
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "I'm your technical support agent! I can help troubleshoot issues, provide technical documentation, guide you through setup processes, or escalate complex issues to our technical team.",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      // Handle tutorials
      if (data.action === "provide_tutorial") {
        console.log("AI Agent providing tutorial")
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "I can provide comprehensive tutorials and step-by-step guides! I'll walk you through any process, from basic navigation to advanced feature usage.",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      // Handle recommendations
      if (data.action === "provide_recommendations") {
        console.log("AI Agent providing recommendations")
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "I can analyze your requirements and provide personalized recommendations! Based on your business needs, I'll suggest the optimal AVA Suite configuration for maximum value.",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      // Handle account management
      if (data.action === "account_management") {
        console.log("AI Agent handling account management")
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          text: "I can handle all your account management needs! From initial setup to ongoing maintenance, billing updates, and subscription changes - I'm your complete account assistant.",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }

      // Handle customer support with navigation
      if (data.action === "customer_support") {
        console.log("AI Agent providing customer support:", data.type)
        
        // Navigate to the appropriate page if specified
        if (data.navigate_to) {
          console.log("Navigating to support page:", data.navigate_to)
          
          setTimeout(() => {
            try {
              router.push(data.navigate_to)
              console.log("Router.push called for support page:", data.navigate_to)
            } catch (error) {
              console.error("Router.push failed:", error)
              if (typeof window !== "undefined") {
                window.location.href = data.navigate_to
              }
            }
          }, 1000) // Wait 1 second after voice response
        }
        
        // Add a follow-up message for better customer support experience
        setTimeout(() => {
          const followUpMessage: Message = {
            id: (Date.now() + 10).toString(),
            type: "bot",
            text: "Support team 24/7 available hai. Aap form fill kar sakte hain ya direct call kar sakte hain. Koi bhi problem ho, hum immediately help karenge!",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, followUpMessage])
          
          // Convert follow-up to speech
          if (audioEnabled) {
            setTimeout(() => {
              convertToSpeech("Support team 24/7 available hai. Aap form fill kar sakte hain ya direct call kar sakte hain. Koi bhi problem ho, hum immediately help karenge!")
            }, 500)
          }
        }, 3000) // Wait 3 seconds before follow-up
      }

      // Handle demo booking with autofill
      if (data.action === "demo_booking") {
        console.log("AI Agent booking demo with autofill:", data.autofill_data)
        
        // Navigate to homepage first
        if (data.path) {
          try {
            router.push(data.path)
            console.log("Router.push called for demo booking:", data.path)
          } catch (error) {
            console.error("Router.push failed:", error)
            if (typeof window !== "undefined") {
              window.location.href = data.path
            }
          }
        }
        
        // Handle scroll to contact form and autofill
        if (data.scroll_to && data.autofill_data) {
          console.log("Scrolling to contact form and auto-filling demo data")
          setTimeout(() => {
            // Find contact form elements
            const contactSelectors = [
              '#contact',
              '[id*="contact"]',
              '[class*="contact"]',
              'form',
              '[data-contact]',
              '.contact-section',
              '#contact-section'
            ]
            
            let targetElement = null
            for (const selector of contactSelectors) {
              targetElement = document.querySelector(selector)
              if (targetElement) {
                console.log("Found contact element for demo booking:", selector)
                break
              }
            }
            
            if (targetElement) {
              // Scroll to the form
              targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
              })
              
              // Add highlight effect
              const htmlTargetElement = targetElement as HTMLElement
              htmlTargetElement.style.transition = 'all 0.3s ease'
              htmlTargetElement.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'
              htmlTargetElement.style.borderRadius = '8px'
              htmlTargetElement.style.padding = '10px'
              htmlTargetElement.style.border = '2px solid rgba(34, 197, 94, 0.3)'
              
              // Auto-fill form fields
              setTimeout(() => {
                console.log("Auto-filling demo form with data:", data.autofill_data)
                
                // Find and fill subject field
                const subjectSelectors = [
                  'input[name*="subject"]',
                  'input[placeholder*="subject"]',
                  'input[id*="subject"]',
                  'select[name*="inquiry"]',
                  'select[name*="type"]'
                ]
                
                for (const selector of subjectSelectors) {
                  const field = targetElement.querySelector(selector) || document.querySelector(selector)
                  if (field) {
                    const htmlField = field as HTMLInputElement | HTMLSelectElement
                    if (htmlField.tagName === 'SELECT') {
                      // For select dropdowns, try to find demo option
                      const selectField = htmlField as HTMLSelectElement
                      const options = selectField.querySelectorAll('option')
                      for (const option of options) {
                        const htmlOption = option as HTMLOptionElement
                        if (htmlOption.textContent?.toLowerCase().includes('demo') || 
                            htmlOption.value.toLowerCase().includes('demo')) {
                          selectField.value = htmlOption.value
                          selectField.dispatchEvent(new Event('change', { bubbles: true }))
                          break
                        }
                      }
                    } else {
                      const inputField = htmlField as HTMLInputElement
                      inputField.value = data.autofill_data.subject
                      inputField.dispatchEvent(new Event('input', { bubbles: true }))
                    }
                    console.log("Filled subject field:", field)
                    break
                  }
                }
                
                // Find and fill message/description field
                const messageSelectors = [
                  'textarea[name*="message"]',
                  'textarea[placeholder*="message"]',
                  'textarea[id*="message"]',
                  'textarea[name*="description"]',
                  'textarea[name*="details"]',
                  'textarea'
                ]
                
                for (const selector of messageSelectors) {
                  const field = targetElement.querySelector(selector) || document.querySelector(selector)
                  if (field) {
                    const textareaField = field as HTMLTextAreaElement
                    textareaField.value = data.autofill_data.message
                    textareaField.dispatchEvent(new Event('input', { bubbles: true }))
                    console.log("Filled message field:", field)
                    break
                  }
                }
                
                // Add a success message
                const successMessage: Message = {
                  id: (Date.now() + 15).toString(),
                  type: "bot",
                  text: "Demo form automatically fill ho gaya hai! Bas aap apna name, email aur phone number add kar dijiye, phir submit kar dijiye. Team aapko 24 hours mein contact karegi!",
                  timestamp: new Date()
                }
                setMessages(prev => [...prev, successMessage])
                
                // Convert to speech
                if (audioEnabled) {
                  setTimeout(() => {
                    convertToSpeech("Demo form automatically fill ho gaya hai! Bas aap apna name, email aur phone number add kar dijiye, phir submit kar dijiye. Team aapko 24 hours mein contact karegi!")
                  }, 500)
                }
                
              }, 1000) // Wait 1 second after scroll
              
              // Remove highlight after 5 seconds
              setTimeout(() => {
                htmlTargetElement.style.backgroundColor = ''
                htmlTargetElement.style.padding = ''
                htmlTargetElement.style.border = ''
              }, 5000)
            }
          }, 1500) // Wait for page to load before scrolling and filling
        }
      }

      // Handle sales data collection
      if (data.action === "collect_data") {
        console.log("Starting sales data collection for field:", data.field)
        setCurrentField(data.field)
        
        // Reset sales data when starting fresh
        if (data.field === 'name') {
          setSalesData({ name: '', email: '', phone: '', company: '', requirements: '' })
        }
        
        console.log("Current field set to:", data.field)
      }

      // Handle sales data submission
      if (data.action === "send_sales" && data.data) {
        console.log("Sending sales data:", data.data)
        try {
          const response = await fetch("/api/send-pricing-inquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.data.name,
              email: data.data.email,
              phone: data.data.phone,
              company: data.data.company,
              requirements: data.data.requirements,
              source: "Voice Assistant"
            })
          })
          
          if (response.ok) {
            const botMessage: Message = {
              id: (Date.now() + 2).toString(),
              type: "bot",
              text: "Perfect! I've sent your details to our sales team. They'll contact you within 24 hours. Is there anything else I can help you with?",
              timestamp: new Date()
            }
            setMessages(prev => [...prev, botMessage])
            setSalesData({ name: '', email: '', phone: '', company: '', requirements: '' })
            setCurrentField('')
          }
        } catch (error) {
          console.error("Error sending sales inquiry:", error)
        }
      }
        
      // Convert to speech if audio enabled (using clean reply)  
      if (audioEnabled && cleanReply && cleanReply.trim() && cleanReply.length > 3) {
        console.log("Starting TTS for:", cleanReply.substring(0, 50) + "...")
        setTimeout(() => {
          convertToSpeech(cleanReply).then(() => {
            console.log("TTS completed. Voice bot should continue listening...")
          }).catch((error) => {
            console.warn("TTS failed, continuing without audio:", error.message)
          })
        }, 300)
      } else {
        console.log("Skipping TTS - invalid or empty reply:", cleanReply)
      }
      
    } catch (error) {
      console.error("Error processing voice input:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }, [router, audioEnabled])

  // Hybrid voice input hook
  const { isListening, startListening, stopListening } = useHybridVoiceInput({
    onTranscript: handleVoiceInputCallback,
    onListeningChange: (listening) => {
      console.log("Voice bot listening state changed:", listening)
      console.log("Voice bot current state:", { isOpen, isConnected, isHydrated })
    },
    isConnected: isConnected,
    onMicrophonePermissionGranted: onMicrophonePermissionGranted
  })

  // Hydrate state from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('ava_voice_bot_messages')
      const savedConnected = localStorage.getItem('ava_voice_bot_connected') === 'true'
      const manuallyClosed = localStorage.getItem('ava_voice_bot_manually_closed') === 'true'
      
      try {
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages))
        }
      } catch {
        setMessages([])
      }
      
      // Only restore connection if bot is open and not manually closed
      if (isOpen && savedConnected && !manuallyClosed) {
        console.log("🔄 Restoring voice bot connection after navigation")
        setIsConnected(true)
        
        // Maintain calling state to show connected status
        if (onCallingStateChange) {
          onCallingStateChange(true)
          console.log("📞 Restored calling state to maintain connection UI")
        }
        
        // Also start listening after a short delay to resume voice interaction
        setTimeout(() => {
          console.log("🎤 Auto-resuming voice listening after navigation")
          if (typeof startListening === 'function') {
            startListening()
          }
        }, 1500)
      }
      
      // Clear manual close flag for new sessions
      if (manuallyClosed) {
        localStorage.removeItem('ava_voice_bot_manually_closed')
      }
      
      setIsHydrated(true)
    }
  }, [])

  // Keep refs in sync with state and persist to localStorage (only after hydration)
  useEffect(() => {
    isConnectedRef.current = isConnected
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('ava_voice_bot_connected', isConnected.toString())
    }
    console.log("Connection state updated:", isConnected)
  }, [isConnected, isHydrated])

  useEffect(() => {
    isSpeakingRef.current = isSpeaking
    console.log("Speaking state updated:", isSpeaking)
  }, [isSpeaking])

  // Persist messages to localStorage (only after hydration)
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('ava_voice_bot_messages', JSON.stringify(messages))
    }
  }, [messages, isHydrated])

  // Auto-start listening when triggered from header or auto-opened
  useEffect(() => {
    console.log("Voice bot effect triggered:", { isOpen, isHeaderTriggered, isConnected, isHydrated })
    if (isOpen && isHeaderTriggered && !isConnected && isHydrated) {
      console.log("Auto-starting voice bot from header trigger or auto-open")
      console.log("🎯 Establishing persistent voice bot connection")
      // Show "calling agent" state
      onCallingStateChange?.(true)
      
      // Connect and start listening after a short delay
      setTimeout(() => {
        console.log("Setting connected state to true - PERSISTENT CONNECTION")
        setIsConnected(true)
        setTimeout(() => {
          console.log("Starting hybrid voice input from header trigger")
          startListening()
        }, 500)
      }, 1000)
    }
  }, [isOpen, isHeaderTriggered, isConnected, isHydrated, startListening])

  // Auto-start listening when opened without header trigger (voice activation)
  useEffect(() => {
    if (isOpen && !isHeaderTriggered && !isConnected) {
      console.log("Auto-starting voice bot from voice activation")
      // Connect and start listening immediately for voice activation
      setIsConnected(true)
      setTimeout(() => {
        console.log("Starting hybrid voice input from voice activation")
        startListening()
      }, 500)
    }
  }, [isOpen, isHeaderTriggered, isConnected, startListening])

  // Resume listening when bot is reopened if it was previously connected
  useEffect(() => {
    if (isOpen && isConnected && !isHeaderTriggered && isHydrated) {
      console.log("Resuming voice bot listening after page navigation")
      console.log("🎯 Voice bot staying active - user did not manually close")
      setTimeout(() => {
        startListening()
      }, 1000)
    }
  }, [isOpen, isConnected, isHeaderTriggered, startListening, isHydrated])

  // Task execution function
  const executeNextTask = useCallback(async (tasks: any[], taskIndex: number) => {
    if (taskIndex >= tasks.length) {
      console.log("All tasks completed!")
      setIsExecutingTasks(false)
      return
    }

    const currentTask = tasks[taskIndex]
    const remainingTasks = tasks.slice(taskIndex + 1)
    
    console.log(`Executing task ${taskIndex + 1} of ${tasks.length}:`, currentTask)
    
    // Only show task progress for multi-task scenarios, not individual task details
    if (tasks.length > 1) {
      const taskMessage: Message = {
        id: (Date.now() + 5).toString(),
        type: "bot",
        text: `Task ${taskIndex + 1} of ${tasks.length}`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, taskMessage])
    }

    // Execute the task based on its type
    setTimeout(async () => {
      try {
        if (currentTask.type === "navigate") {
          console.log("Executing navigation task:", currentTask.path)
          
          // Show navigation message
          const navMessage: Message = {
            id: (Date.now() + 15).toString(),
            type: "bot",
            text: `Taking you to ${currentTask.path === '/pricing' ? 'pricing page' : currentTask.path === '/products' ? 'products page' : currentTask.path === '/contacts' ? 'contact page' : 'the requested page'}`,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, navMessage])
          
          // Convert to speech
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(navMessage.text), 300)
          }
          
          // Navigate after a short delay
          setTimeout(() => {
            router.push(currentTask.path)
            
            setTimeout(() => {
              if (remainingTasks.length > 0) {
                executeNextTask(tasks, taskIndex + 1)
              }
            }, 1000)
          }, 1500)
          
        } else if (currentTask.type === "explain_page") {
          console.log("Executing page explanation task")
          
          // Show explanation message
          const topic = currentTask.topic || ''
          const explainMessage: Message = {
            id: (Date.now() + 16).toString(),
            type: "bot",
            text: topic ? `Showing you the ${topic} section` : "Showing you the page content",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, explainMessage])
          
          // Convert to speech
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(explainMessage.text), 300)
          }
          
          // Check if there's a specific topic to focus on
          console.log("Looking for topic in task:", topic)
          
          if (topic) {
            // Try to find the specific topic section
            const topicElement = findTopicElement(topic)
            if (topicElement) {
              console.log("Found topic element in task, scrolling to it:", topicElement)
              // Fast scroll to the specific topic
              topicElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
              })
              
              // Add a highlight effect
              const htmlTaskTopicElement = topicElement as HTMLElement
              htmlTaskTopicElement.style.transition = 'background-color 0.3s ease'
              htmlTaskTopicElement.style.backgroundColor = 'rgba(147, 51, 234, 0.1)' // Purple highlight
              htmlTaskTopicElement.style.borderRadius = '8px'
              htmlTaskTopicElement.style.padding = '8px'
              
              // Remove highlight after 3 seconds and move to next task
              setTimeout(() => {
                htmlTaskTopicElement.style.backgroundColor = ''
                htmlTaskTopicElement.style.borderRadius = ''
                htmlTaskTopicElement.style.padding = ''
                
                // Move to next task
                if (remainingTasks.length > 0) {
                  executeNextTask(tasks, taskIndex + 1)
                }
              }, 3000)
              
              return // Don't do full page scroll
            }
          }
          
          // If no specific topic found, do limited scrolling
          const scrollDuration = 4000 // Shorter for task stack
          const scrollInterval = 150
          const scrollStep = window.innerHeight / (scrollDuration / scrollInterval * 2)
          
          let currentScrollPosition = window.pageYOffset
          const maxScroll = Math.min(
            currentScrollPosition + (window.innerHeight * 1.5), // Only scroll 1.5 screen heights
            document.documentElement.scrollHeight - window.innerHeight
          )
          
          const scrollTimer = setInterval(() => {
            currentScrollPosition += scrollStep
            
            if (currentScrollPosition >= maxScroll) {
              clearInterval(scrollTimer)
              
              // Move to next task
              if (remainingTasks.length > 0) {
                setTimeout(() => {
                  executeNextTask(tasks, taskIndex + 1)
                }, 1000)
              }
            } else {
              window.scrollTo({ top: currentScrollPosition, behavior: 'smooth' })
            }
          }, scrollInterval)
          
        } else if (currentTask.type === "collect_data") {
          console.log("Executing data collection task")
          setCurrentField(currentTask.field || 'name')
          
          const dataMessage: Message = {
            id: (Date.now() + 17).toString(),
            type: "bot",
            text: "Let me collect your information to connect you with our sales team. What's your full name?",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, dataMessage])
          
          // Convert to speech
          if (audioEnabled) {
            setTimeout(() => convertToSpeech(dataMessage.text), 300)
          }
          
        } else {
          // Generic task execution
          console.log("Executing generic task:", currentTask.task)
          
          const taskCompleteMessage: Message = {
            id: (Date.now() + 18).toString(),
            type: "bot",
            text: "Task completed",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, taskCompleteMessage])
          
          // Move to next task
          if (remainingTasks.length > 0) {
            setTimeout(() => {
              executeNextTask(tasks, taskIndex + 1)
            }, 1500)
          }
        }
        
      } catch (error) {
        console.error("Error executing task:", error)
        
        // Continue with next task even if current fails
        if (remainingTasks.length > 0) {
          setTimeout(() => {
            executeNextTask(tasks, taskIndex + 1)
          }, 1000)
        }
      }
    }, 1000)
    
  }, [router, setMessages])

  // Add welcome message when voice bot auto-opens
  useEffect(() => {
    if (isOpen && isHeaderTriggered && isConnected && isHydrated && messages.length === 0) {
      console.log("Adding welcome message for auto-opened voice bot")
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: "bot", 
        text: "Hi! I'm AVA, your voice assistant. I can help you navigate, explain pages, connect with sales, or answer questions. What can I do for you?",
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
      
      // Speak welcome message
      if (audioEnabled) {
        setTimeout(() => {
          convertToSpeech(welcomeMessage.text).catch((error) => {
            console.warn("Welcome message TTS failed:", error.message)
          })
        }, 2000)
      }
    }
  }, [isOpen, isHeaderTriggered, isConnected, isHydrated, messages.length, audioEnabled])

  // Cleanup effect - stop TTS when component unmounts or voice bot closes
  useEffect(() => {
    return () => {
      // Stop all speech synthesis when component unmounts
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        speechSynthesis.cancel()
        console.log("Speech synthesis stopped on component unmount")
      }
      
      // Stop audio if playing
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  const convertToSpeech = async (text: string): Promise<void> => {
    return new Promise(async (resolve) => {
      // IMPORTANT: Stop listening when bot starts speaking - declare at function scope
      const wasListening = isListening
      if (wasListening) {
        console.log('🔇 Stopping listening - Bot is about to speak')
        stopListening()
      }

      try {
        console.log('🔊 TTS Request - Audio Enabled:', audioEnabled, 'Text:', text.substring(0, 50) + '...')
        
        // Check if audio is disabled
        if (!audioEnabled) {
          console.log('🔇 TTS skipped - Audio disabled by user')
          setIsSpeaking(false)
          resolve()
          return
        }
        
        // Validate input text
        if (!text || !text.trim() || text.length > 5000) {
          console.log('❌ Invalid text for TTS:', text?.length || 0, 'characters')
          setIsSpeaking(false)
          resolve()
          return
        }

        // Helper function for resuming listening
        const resumeListeningIfNeeded = () => {
          if (wasListening && isConnected) {
            console.log('🎤 Resuming listening - Bot finished speaking')
            setTimeout(() => {
              startListening()
            }, 500) // Small delay to ensure clean transition
          }
        }

        // Stop any currently playing audio to prevent overlap
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
        
        // Stop browser speech synthesis if active
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          speechSynthesis.cancel()
        }
        
        setIsSpeaking(true)
        console.log('🎵 Converting to speech with Cartesia (preferred):', text.substring(0, 100) + '...')
        
        try {
          // Try Cartesia TTS API first (high quality)
          console.log('🔄 Calling Cartesia TTS API...')
          const response = await fetch('/api/text-to-speech', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
          })

          console.log('📡 Cartesia TTS Response status:', response.status)
          
          if (response.ok) {
            const data = await response.json()
            console.log('📦 Cartesia TTS Response data:', { success: data.success, hasAudioData: !!data.audioData, size: data.size })
            
            if (data.success && data.audioData) {
              console.log('✅ Cartesia TTS successful, playing high-quality audio:', data.size, 'bytes')
              
              try {
                // Convert base64 to blob and play
                const audioBytes = atob(data.audioData)
                const audioArray = new Uint8Array(audioBytes.length)
                for (let i = 0; i < audioBytes.length; i++) {
                  audioArray[i] = audioBytes.charCodeAt(i)
                }
                
                const audioBlob = new Blob([audioArray], { type: data.contentType || 'audio/mpeg' })
                const audioUrl = URL.createObjectURL(audioBlob)
                
                console.log('🎵 Audio blob created, size:', audioBlob.size, 'type:', audioBlob.type)
                
                if (audioRef.current) {
                  audioRef.current.src = audioUrl
                  audioRef.current.onended = () => {
                    console.log('✅ Cartesia TTS playback completed successfully')
                    setIsSpeaking(false)
                    URL.revokeObjectURL(audioUrl)
                    
                    // Force resume listening after TTS completes
                    console.log('🎤 Force resuming listening after Cartesia TTS completion')
                    if (isConnected && typeof startListening === 'function') {
                      setTimeout(() => {
                        startListening()
                        console.log('🎤 Voice bot listening resumed after TTS')
                      }, 500)
                    }
                    
                    resumeListeningIfNeeded()
                    resolve()
                  }
                  audioRef.current.onerror = (error) => {
                    console.error('❌ Audio playback error:', error)
                    setIsSpeaking(false)
                    URL.revokeObjectURL(audioUrl)
                    fallbackToBrowserTTS(text, resolve, () => {
                      if (wasListening && isConnected) {
                        console.log('🎤 Resuming listening - Error fallback TTS finished')
                        setTimeout(() => {
                          startListening()
                        }, 500)
                      }
                    })
                  }
                  
                  console.log('▶️ Starting Cartesia audio playback...')
                  try {
                    // Set volume and ensure audio is ready
                    audioRef.current.volume = 0.9
                    audioRef.current.preload = 'auto'
                    
                    const playPromise = audioRef.current.play()
                    if (playPromise !== undefined) {
                      await playPromise
                      console.log('🎶 Cartesia audio playing successfully!')
                      return // Successfully using Cartesia TTS
                    } else {
                      console.log('🎶 Cartesia audio started (no promise)')
                      return // Successfully using Cartesia TTS
                    }
                  } catch (playError: any) {
                    console.error('❌ Audio play() failed:', playError?.name, playError?.message)
                    
                    // If it's a user interaction error, still try to play but log it
                    if (playError?.name === 'NotAllowedError') {
                      console.warn('⚠️ User interaction required for audio playback, falling back to browser TTS')
                    }
                    
                    URL.revokeObjectURL(audioUrl)
                    throw playError
                  }
                } else {
                  console.error('❌ audioRef.current is null')
                  URL.revokeObjectURL(audioUrl)
                  throw new Error('Audio element not available')
                }
              } catch (audioProcessError) {
                console.error('❌ Audio processing error:', audioProcessError)
                throw audioProcessError
              }
            } else {
              console.warn('⚠️ Cartesia TTS response missing success/audioData')
              throw new Error('Invalid Cartesia response')
            }
          } else {
            const errorText = await response.text()
            console.error('❌ Cartesia TTS API failed:', response.status, errorText)
            throw new Error(`Cartesia API failed: ${response.status}`)
          }
        } catch (apiError) {
          console.error('❌ Cartesia TTS API error:', apiError)
          
          // Only fallback to browser TTS if it's a critical error (not temporary)
          const errorMessage = (apiError as any)?.message || String(apiError)
          const isTemporaryError = errorMessage.includes('credit limit') || 
                                   errorMessage.includes('rate limit') ||
                                   errorMessage.includes('network')
          
          if (isTemporaryError) {
            console.log('⚠️ Temporary Cartesia error - retrying in 2 seconds...')
            setTimeout(() => {
              convertToSpeech(text).catch(() => {
                console.log('🔄 Retry failed, using browser TTS as final fallback')
                fallbackToBrowserTTS(text, resolve, () => {
                  if (wasListening && isConnected) {
                    console.log('🎤 Resuming listening - Final fallback TTS finished')
                    setTimeout(() => startListening(), 500)
                  }
                })
              })
            }, 2000)
            return
          }
          
          console.log('⚠️ Critical Cartesia error - falling back to browser TTS')
        }
        
        // Fallback to browser TTS (only for critical errors)
        fallbackToBrowserTTS(text, resolve, () => {
          if (wasListening && isConnected) {
            console.log('🎤 Resuming listening - Fallback TTS finished')
            setTimeout(() => {
              startListening()
            }, 500)
          }
        })

      } catch (error) {
        console.warn("TTS conversion failed:", error)
        fallbackToBrowserTTS(text, resolve, () => {
          if (wasListening && isConnected) {
            console.log('🎤 Resuming listening - Error fallback TTS finished')
            setTimeout(() => {
              startListening()
            }, 500)
          }
        })
      }
    })
  }

  const fallbackToBrowserTTS = (text: string, resolve: () => void, resumeCallback?: () => void) => {
    console.log("Using browser TTS fallback")
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Cancel any existing speech first
      speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 0.9
      
      // Try to use the best available female voice
      const voices = speechSynthesis.getVoices()
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('eva') ||
        voice.name.toLowerCase().includes('aria') ||
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman')
      ) || voices.find(voice => voice.name.toLowerCase().includes('female'))
      
      if (femaleVoice) {
        utterance.voice = femaleVoice
        console.log('Using browser female voice:', femaleVoice.name)
      }
      
      utterance.onstart = () => {
        console.log('Browser TTS started')
      }
      
      utterance.onend = () => {
        console.log('Browser TTS completed')
        setIsSpeaking(false)
        resumeCallback?.() // Resume listening if callback provided
        resolve()
      }
      
      utterance.onerror = (event) => {
        console.warn('Browser TTS error:', event.error)
        setIsSpeaking(false)
        resumeCallback?.() // Resume listening even on error
        resolve()
      }
      
      // Additional check before speaking
      if (!speechSynthesis.speaking) {
        speechSynthesis.speak(utterance)
      } else {
        console.log('Speech synthesis already speaking, cancelling and retrying...')
        speechSynthesis.cancel()
        setTimeout(() => {
          speechSynthesis.speak(utterance)
        }, 100)
      }
    } else {
      console.log('Browser TTS not available')
      setIsSpeaking(false)
      resolve()
    }
  }

  // startListening and stopListening are now provided by useHybridVoiceInput hook

  const stopSpeaking = () => {
    console.log("🛑 Stopping all speech synthesis...")
    
    // Stop Cartesia TTS audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsSpeaking(false)
    }
    
    // Stop browser speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.cancel()
      console.log("✅ Browser speech synthesis cancelled")
    }
    
    setIsSpeaking(false)
  }

  // Cleanup effect to stop all speech when component unmounts
  useEffect(() => {
    return () => {
      console.log("🧹 Voice bot cleanup - stopping all speech synthesis")
      
      // Stop Cartesia TTS audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      
      // Stop browser speech synthesis
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        speechSynthesis.cancel()
      }
    }
  }, [])

  const disconnectCall = () => {
    console.log("=== Disconnecting voice bot call ===")
    console.log("🔴 User manually disconnecting voice bot")
    setIsConnected(false)
    stopListening()
    stopSpeaking()
    
    // Stop all speech synthesis immediately
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.cancel()
      console.log("All speech synthesis stopped")
    }
    
    // Clear localStorage to prevent auto-restart
    if (typeof window !== 'undefined') {
      localStorage.setItem('ava_voice_bot_manually_closed', 'true')
      console.log("🎯 Marked as manually closed - won't auto-restart")
    }
    
    onCallingStateChange?.(false)
    
    // Clear persistence and close voice bot when user manually disconnects
    if (typeof window !== 'undefined') {
      localStorage.setItem('ava_voice_bot_connected', 'false')
      localStorage.setItem('ava_voice_bot_open', 'false')
    }
    
    // Close the voice bot completely
    onToggle()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Audio element for TTS playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
      
      {/* Voice Bot Modal - New Compact UI */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0
        }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        className="fixed top-4 right-4 z-50 w-72 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
      >
        {/* Compact Header - Matching Image */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="text-white font-medium text-sm">
                {isConnected ? "Calling assistant" : "Disconnected"}
              </h3>
              <p className="text-gray-400 text-xs">
                {isListening ? "Listening..." : 
                 isProcessing ? "Processing..." :
                 isSpeaking ? "Speaking..." : 
                 isConnected ? "Connected" : "Click to connect"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Purple Voice Icon - Similar to image */}
            <button
              onClick={() => {
                console.log("Purple voice icon clicked!", { isConnected })
                if (isConnected) {
                  disconnectCall()
                } else {
                  // Connect and start listening
                  console.log("Connecting voice bot...")
                  setIsConnected(true)
                  setTimeout(() => {
                    console.log("Starting hybrid voice input from icon click")
                    startListening()
                  }, 500)
                }
              }}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isConnected 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <Bot className={`w-5 h-5 ${isConnected ? "text-white" : "text-gray-400"}`} />
              {(isListening || isProcessing || isSpeaking) && (
                <div className="absolute w-10 h-10 bg-purple-400 rounded-full animate-ping opacity-30"></div>
              )}
            </button>
            
            {/* Audio Toggle Button */}
            <button
              onClick={() => {
                console.log("🎤 Mic button clicked - starting voice input")
                if (!isListening) {
                  startListening()
                } else {
                  stopListening()
                }
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isListening 
                  ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 animate-pulse" 
                  : "bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30"
              }`}
              title={isListening ? "Stop Listening" : "Start Voice Input"}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-red-400" />
              ) : (
                <Mic className="w-4 h-4 text-purple-400" />
              )}
            </button>

            {/* Disconnect Button */}
            <button
              onClick={isConnected ? disconnectCall : () => {}}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isConnected 
                  ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/30" 
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              title={isConnected ? "End Call" : "Not Connected"}
            >
              {isConnected ? (
                <Phone className="w-4 h-4 text-red-400 rotate-[135deg]" />
              ) : (
                <div className="w-4 h-4 border-2 border-gray-500 rounded-full opacity-50" />
              )}
            </button>
          </div>
        </div>

        {/* Simple Status Indicator - Matching compact design */}
        {isConnected && (
          <div className="px-4 pb-4">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              {isListening && (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Listening...</span>
                </>
              )}
              {isProcessing && (
                <>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Processing...</span>
                </>
              )}
              {isSpeaking && (
                <>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Speaking...</span>
                </>
              )}
              {!isListening && !isProcessing && !isSpeaking && (
                <>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Ready</span>
                </>
              )}
            </div>
            
            {/* Audio Status and Controls */}
            <div className="mt-2 flex items-center justify-center space-x-2">
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`px-2 py-1 rounded text-xs border transition-colors ${
                  audioEnabled 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                }`}
                title="Toggle Audio Output"
              >
                Audio: {audioEnabled ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => {
                  console.log("🎵 Testing audio playback...")
                  convertToSpeech("Testing Cartesia TTS - यह एक test audio है").then(() => {
                    console.log("✅ Audio test completed successfully")
                  }).catch((error) => {
                    console.error("❌ Audio test failed:", error)
                  })
                }}
                disabled={isSpeaking}
                className={`px-2 py-1 rounded text-xs border transition-colors ${
                  isSpeaking 
                    ? 'bg-gray-500/20 text-gray-500 border-gray-500/30 cursor-not-allowed'
                    : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/30'
                }`}
                title={isSpeaking ? "Audio is playing..." : "Test Audio"}
              >
                {isSpeaking ? "Playing..." : "Test"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Meeting Form Modal */}
      <MeetingForm
        isOpen={isMeetingFormOpen}
        onClose={() => setIsMeetingFormOpen(false)}
        autoFillData={meetingFormData}
        onSubmit={(data) => {
          console.log("📤 Meeting form submitted:", data)
          setIsMeetingFormOpen(false)
          setMeetingFormData({})
        }}
      />
    </>
  )
}


