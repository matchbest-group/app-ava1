import { NextRequest, NextResponse } from 'next/server'

// Gemini removed - using direct fallback responses only

// Cache for common responses to reduce API calls
const responseCache = new Map<string, any>()
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes - increased to save more API calls

// Common responses with language detection
const getCommonResponse = (message: string) => {
  const lowerMessage = message.toLowerCase()
  const hasHindi = /[अ-ह]/.test(message) || 
                   lowerMessage.includes('मैं') || 
                   lowerMessage.includes('हूं') ||
                   lowerMessage.includes('है') ||
                   lowerMessage.includes('नमस्ते') ||
                   lowerMessage.includes('धन्यवाद') ||
                   lowerMessage.includes('अलविदा')
  
  if (lowerMessage === 'hi' || lowerMessage === 'hello' || lowerMessage === 'नमस्ते' || lowerMessage === 'हैलो') {
    return { 
      action: "inform", 
      reply: hasHindi 
        ? "नमस्ते! मैं AVA हूं, आपकी voice assistant। आज मैं आपकी कैसे help कर सकती हूं?"
        : "Hi! I'm AVA, your voice assistant. How can I help you today?" 
    }
  }
  
  if (lowerMessage === 'thank you' || lowerMessage === 'thanks' || lowerMessage === 'धन्यवाद' || lowerMessage === 'शुक्रिया') {
    return { 
      action: "inform", 
      reply: hasHindi 
        ? "आपका स्वागत है! क्या कोई और चीज़ है जिसमें मैं आपकी help कर सकती हूं?"
        : "You're welcome! Is there anything else I can help you with?" 
    }
  }
  
  if (lowerMessage === 'bye' || lowerMessage === 'goodbye' || lowerMessage === 'अलविदा' || lowerMessage === 'बाय') {
    return { 
      action: "close", 
      reply: hasHindi 
        ? "अलविदा! आपका दिन शुभ हो!"
        : "Goodbye! Have a great day!" 
    }
  }
  
  return null
}

// Old common responses object (keeping for reference)
const COMMON_RESPONSES: { [key: string]: any } = {
  'hi': { action: "inform", reply: "Hi! I'm AVA, your voice assistant. How can I help you today?" },
  'hello': { action: "inform", reply: "Hello! I'm AVA, your voice assistant. What can I do for you?" },
  'thank you': { action: "inform", reply: "You're welcome! Is there anything else I can help you with?" },
  'thanks': { action: "inform", reply: "You're welcome! Is there anything else I can help you with?" },
  'bye': { action: "close", reply: "Goodbye! Have a great day!" },
  'goodbye': { action: "close", reply: "Goodbye! Have a great day!" },
  'help': { action: "inform", reply: "I can help you navigate the website, explain products, connect with sales, or answer questions. What would you like to do?" },
  'what can you do': { action: "inform", reply: "I can help you navigate the website, explain products, connect with sales, or answer questions. What would you like to do?" },
  'who are you': { action: "inform", reply: "I'm AVA, your AI voice assistant for AVA Suite. I can help you with navigation, product information, and connecting with our sales team." },
  'i am here to help': { action: "inform", reply: "I'm here to help! You can ask me about our products, pricing, or connect with sales. What would you like to do?" },
  'i want to buy': { action: "collect_data", field: "name", reply: "Perfect! I'll connect you with our sales team. Let me collect your complete details to send to them. What's your full name?" },
  'i need to buy': { action: "collect_data", field: "name", reply: "Great! I'll help you connect with sales. Let me collect all your details to send to our team. What's your full name?" },
  'sales': { action: "collect_data", field: "name", reply: "I'll connect you with our sales team right now! Let me collect your complete information to send to them. What's your full name?" },
  'sales team': { action: "collect_data", field: "name", reply: "Perfect! I'll connect you with sales immediately. Let me get your details to send to our team. What's your full name?" },
  'connect with sales': { action: "collect_data", field: "name", reply: "I'll connect you with our sales team! Let me collect your information to send to them. What's your full name?" },
  'talk to sales': { action: "collect_data", field: "name", reply: "I'll connect you with sales right now! Let me get your details first. What's your full name?" },
  'speak to sales': { action: "collect_data", field: "name", reply: "I'll connect you with our sales team! Let me collect your information. What's your full name?" },
  'sales connect': { action: "collect_data", field: "name", reply: "I'll connect you with sales! Let me get your complete details to send to them. What's your full name?" },
  'show me pricing': { action: "navigate", path: "/pricing", reply: "Let me take you to our pricing page where you can see all our plans." },
  'show me products': { action: "navigate", path: "/products", reply: "Let me show you our product catalog." },
  'explain pricing': { action: "explain_page", reply: "Let me explain our pricing plans for you.", scroll: true, topic: "pricing" },
  'explain products': { action: "explain_page", reply: "Let me explain our products for you.", scroll: true, topic: "products" },
  'contact sales': { action: "navigate", path: "/", reply: "I'd be happy to connect you with our sales team! Let me open the contact form on our homepage for you.", scroll_to: "contact" },
  'talk to sales': { action: "navigate", path: "/", reply: "I'll connect you with our sales team! Opening the contact form on our homepage.", scroll_to: "contact" },
  'speak to sales': { action: "navigate", path: "/", reply: "Let me open the contact form for you to connect with our sales team.", scroll_to: "contact" },
  
  // Hindi Sales Commands
  'mujhe sales se connect karo': { action: "collect_data", field: "name", reply: "Main aapko sales team se connect karati hun! Pehle aapki details collect karti hun. Aapka pura naam kya hai?" },
  'sales se baat karani hai': { action: "collect_data", field: "name", reply: "Sales team se baat karane ke liye main aapki details collect karti hun. Aapka full name kya hai?" },
  'sales team se connect karo': { action: "collect_data", field: "name", reply: "Sales team se connect kar rahi hun! Aapki complete details chahiye. Aapka naam kya hai?" },
  'mujhe kharidna hai': { action: "collect_data", field: "name", reply: "Perfect! Main aapko sales team se connect karati hun. Aapki details collect karti hun. Aapka pura naam?" },
  'main kharidna chahta hun': { action: "collect_data", field: "name", reply: "Bahut accha! Sales team se connect kar rahi hun. Pehle aapka naam bataiye?" },
  'sales': { action: "collect_data", field: "name", reply: "Sales team se connect kar rahi hun! Aapki complete information chahiye. Aapka full name kya hai?" },
  'kharidna hai': { action: "collect_data", field: "name", reply: "Main aapko sales se connect karati hun! Aapki details collect karti hun. Naam bataiye?" },
  'buy karna hai': { action: "collect_data", field: "name", reply: "Sales team se connect kar rahi hun! Aapka complete data chahiye. Naam kya hai?" },
  
  // Hindi Commands
  'mujhe pricing page dikhao': { action: "navigate", path: "/pricing", reply: "Main aapko pricing page dikhati hun jahan aap hamare saare plans dekh sakte hain." },
  'mujhe pricing dikhao': { action: "navigate", path: "/pricing", reply: "Main aapko pricing page dikhati hun jahan aap hamare saare plans dekh sakte hain." },
  'pricing page dikhao': { action: "navigate", path: "/pricing", reply: "Main aapko pricing page dikhati hun jahan aap hamare saare plans dekh sakte hain." },
  'pricing dikhao': { action: "navigate", path: "/pricing", reply: "Main aapko pricing page dikhati hun jahan aap hamare saare plans dekh sakte hain." },
  'price dikhao': { action: "navigate", path: "/pricing", reply: "Main aapko pricing page dikhati hun jahan aap hamare saare plans dekh sakte hain." },
  'keemat dikhao': { action: "navigate", path: "/pricing", reply: "Main aapko pricing page dikhati hun jahan aap hamare saare plans dekh sakte hain." },
  
  'mujhe signup kara do': { action: "navigate", path: "/contacts", reply: "Main aapko signup form dikhati hun. Yahan aap apni details fill kar sakte hain." },
  'signup kara do': { action: "navigate", path: "/contacts", reply: "Main aapko signup form dikhati hun. Yahan aap apni details fill kar sakte hain." },
  'mujhe signup form dikhao': { action: "navigate", path: "/contacts", reply: "Main aapko signup form dikhati hun. Yahan aap apni details fill kar sakte hain." },
  'signup form dikhao': { action: "navigate", path: "/contacts", reply: "Main aapko signup form dikhati hun. Yahan aap apni details fill kar sakte hain." },
  'mujhe register kara do': { action: "navigate", path: "/contacts", reply: "Main aapko signup form dikhati hun. Yahan aap apni details fill kar sakte hain." },
  'register kara do': { action: "navigate", path: "/contacts", reply: "Main aapko signup form dikhati hun. Yahan aap apni details fill kar sakte hain." },
  'mujhe form dikhao': { action: "navigate", path: "/contacts", reply: "Main aapko contact form dikhati hun. Yahan aap apni details fill kar sakte hain." },
  'contact form dikhao': { action: "navigate", path: "/contacts", reply: "Main aapko contact form dikhati hun. Yahan aap apni details fill kar sakte hain." },
  
  // Customer Support & FAQ Commands
  'mujhe refund process batao': { 
    action: "customer_support", 
    type: "refund_process",
    reply: "Refund process ke liye: Pehle aapko support team se contact karna hoga. Main aapko contact page dikhati hun jahan aap refund request submit kar sakte hain. Refund usually 5-7 business days mein process hota hai.",
    navigate_to: "/contacts"
  },
  'refund process batao': { 
    action: "customer_support", 
    type: "refund_process",
    reply: "Refund ke liye aapko support team se contact karna hoga. Main aapko contact form dikhati hun. Refund request submit karne ke baad 5-7 business days mein amount refund ho jayega.",
    navigate_to: "/contacts"
  },
  'refund kaise kare': { 
    action: "customer_support", 
    type: "refund_process",
    reply: "Refund process simple hai: Contact form fill kariye, refund reason batayiye, aur order details provide kariye. Humari team 24 hours mein respond karegi.",
    navigate_to: "/contacts"
  },
  
  'billing problem hai': { 
    action: "customer_support", 
    type: "billing_support",
    reply: "Billing issues ke liye main aapko support team se connect kar deti hun. Aap apni billing details aur problem specify kar sakte hain. Humari team immediately help karegi.",
    navigate_to: "/contacts"
  },
  'payment issue hai': { 
    action: "customer_support", 
    type: "payment_support",
    reply: "Payment issues ke liye support team se contact kariye. Main aapko contact form dikhati hun jahan aap payment details aur problem describe kar sakte hain.",
    navigate_to: "/contacts"
  },
  
  'technical support chahiye': { 
    action: "customer_support", 
    type: "technical_support",
    reply: "Technical support ke liye main aapko support team se connect kar deti hun. Aap apni technical problem detail mein batayiye, humari expert team help karegi.",
    navigate_to: "/contacts"
  },
  'technical problem hai': { 
    action: "customer_support", 
    type: "technical_support",
    reply: "Technical issues ke liye support team available hai. Main aapko contact form dikhati hun jahan aap problem details share kar sakte hain.",
    navigate_to: "/contacts"
  },
  
  'account access nahi ho raha': { 
    action: "customer_support", 
    type: "account_support",
    reply: "Account access issues ke liye support team se contact kariye. Password reset ya account recovery ke liye main aapko contact form dikhati hun.",
    navigate_to: "/contacts"
  },
  'password reset karna hai': { 
    action: "customer_support", 
    type: "password_reset",
    reply: "Password reset ke liye support team se contact kariye. Main aapko contact form dikhati hun jahan aap account details provide kar sakte hain.",
    navigate_to: "/contacts"
  },
  
  'subscription cancel karna hai': { 
    action: "customer_support", 
    type: "subscription_cancel",
    reply: "Subscription cancellation ke liye support team se contact kariye. Main aapko contact form dikhati hun jahan aap cancellation reason bata sakte hain.",
    navigate_to: "/contacts"
  },
  'plan change karna hai': { 
    action: "customer_support", 
    type: "plan_change",
    reply: "Plan change ke liye pehle pricing page dekhiye, phir support team se contact kariye. Main aapko pricing page dikhati hun.",
    navigate_to: "/pricing"
  },
  
  'support chahiye': { 
    action: "customer_support", 
    type: "general_support",
    reply: "Main aapki help ke liye yahan hun! Koi bhi problem ho - billing, technical, account, ya refund - support team 24/7 available hai. Main aapko contact form dikhati hun.",
    navigate_to: "/contacts"
  },
  'help chahiye': { 
    action: "customer_support", 
    type: "general_support",
    reply: "Bilkul! Main aapki help kar sakti hun. Kya problem hai - technical issue, billing, refund, ya kuch aur? Support team immediately help karegi.",
    navigate_to: "/contacts"
  },
  
  // Internal Tools & SaaS Dashboard Navigation (Tech Clients)
  'admin dashboard dikhao': { action: "navigate", path: "/admin/dashboard", reply: "Admin dashboard open kar raha hun. Yahan aap complete system control kar sakte hain." },
  'admin panel dikhao': { action: "navigate", path: "/admin/dashboard", reply: "Admin panel open kar raha hun. Full administrative access available hai." },
  'mujhe admin dashboard dikhao': { action: "navigate", path: "/admin/dashboard", reply: "Admin dashboard open kar raha hun jahan aap complete system manage kar sakte hain." },
  
  'workspace dashboard dikhao': { action: "navigate", path: "/workspace/dashboard", reply: "Workspace dashboard open kar raha hun. Yahan aap team collaboration aur projects manage kar sakte hain." },
  'workspace dikhao': { action: "navigate", path: "/workspace/dashboard", reply: "Workspace dashboard open kar raha hun. Team management aur project tracking ke liye." },
  'mujhe workspace dikhao': { action: "navigate", path: "/workspace/dashboard", reply: "Workspace dashboard open kar raha hun jahan aap team aur projects handle kar sakte hain." },
  
  'analytics dashboard dikhao': { action: "navigate", path: "/workspace/analytics", reply: "Analytics dashboard open kar raha hun. Real-time data aur insights ke liye." },
  'analytics dikhao': { action: "navigate", path: "/workspace/analytics", reply: "Analytics dashboard open kar raha hun jahan aap performance metrics dekh sakte hain." },
  'mujhe analytics dikhao': { action: "navigate", path: "/workspace/analytics", reply: "Analytics dashboard open kar raha hun. Complete data insights available hain." },
  
  'leads dashboard dikhao': { action: "navigate", path: "/admin/leads", reply: "Leads dashboard open kar raha hun. Customer leads aur sales pipeline ke liye." },
  'leads dikhao': { action: "navigate", path: "/admin/leads", reply: "Leads management dashboard open kar raha hun. Sales tracking ke liye." },
  'mujhe leads dikhao': { action: "navigate", path: "/admin/leads", reply: "Leads dashboard open kar raha hun jahan aap customer leads track kar sakte hain." },
  
  'cms dashboard dikhao': { action: "navigate", path: "/admin/cms", reply: "CMS dashboard open kar raha hun. Content management ke liye complete control." },
  'cms dikhao': { action: "navigate", path: "/admin/cms", reply: "Content Management System open kar raha hun. Website content edit kar sakte hain." },
  'content management dikhao': { action: "navigate", path: "/admin/cms", reply: "CMS dashboard open kar raha hun jahan aap website content manage kar sakte hain." },
  
  'team dashboard dikhao': { action: "navigate", path: "/workspace/team", reply: "Team dashboard open kar raha hun. Team members aur collaboration ke liye." },
  'team management dikhao': { action: "navigate", path: "/workspace/team", reply: "Team management dashboard open kar raha hun. Staff coordination ke liye." },
  'mujhe team dikhao': { action: "navigate", path: "/workspace/team", reply: "Team dashboard open kar raha hun jahan aap team members manage kar sakte hain." },
  
  'organization dashboard dikhao': { action: "navigate", path: "/organization/dashboard", reply: "Organization dashboard open kar raha hun. Complete org management ke liye." },
  'org dashboard dikhao': { action: "navigate", path: "/organization/dashboard", reply: "Organization management dashboard open kar raha hun." },
  'mujhe organization dikhao': { action: "navigate", path: "/organization/dashboard", reply: "Organization dashboard open kar raha hun. Company-wide management ke liye." },
  
  // Quick Access Commands for Tech Users
  'database check karo': { action: "navigate", path: "/api/debug", reply: "Database debugging tools open kar raha hun. System health check ke liye." },
  'system health check karo': { action: "navigate", path: "/api/health", reply: "System health monitoring open kar raha hun. Complete system status ke liye." },
  'api testing dikhao': { action: "navigate", path: "/api/debug", reply: "API testing tools open kar raha hun. Backend debugging ke liye." },
  
  // Advanced SaaS Commands
  'user management dikhao': { action: "navigate", path: "/admin/organization", reply: "User management panel open kar raha hun. Complete user control ke liye." },
  'billing dashboard dikhao': { action: "navigate", path: "/admin/dashboard", reply: "Billing dashboard open kar raha hun. Revenue aur subscriptions ke liye." },
  'website management dikhao': { action: "navigate", path: "/admin/website", reply: "Website management panel open kar raha hun. Site configuration ke liye." },
  
  // Developer Tools
  'debug mode dikhao': { action: "navigate", path: "/api/debug", reply: "Debug mode activate kar raha hun. Development tools access ke liye." },
  'test environment dikhao': { action: "navigate", path: "/test-login", reply: "Test environment open kar raha hun. Development testing ke liye." },
  'api documentation dikhao': { action: "inform", reply: "API documentation ke liye /api endpoints available hain. Technical documentation access kar sakte hain." },
  
  // English Commands for International Tech Clients
  'show admin dashboard': { action: "navigate", path: "/admin/dashboard", reply: "Opening admin dashboard. Complete system administrative control available." },
  'open admin panel': { action: "navigate", path: "/admin/dashboard", reply: "Opening admin panel. Full administrative access enabled." },
  'show workspace dashboard': { action: "navigate", path: "/workspace/dashboard", reply: "Opening workspace dashboard. Team collaboration and project management tools." },
  'open workspace': { action: "navigate", path: "/workspace/dashboard", reply: "Opening workspace. Team management and project tracking available." },
  'show analytics dashboard': { action: "navigate", path: "/workspace/analytics", reply: "Opening analytics dashboard. Real-time data and performance insights." },
  'open analytics': { action: "navigate", path: "/workspace/analytics", reply: "Opening analytics. Complete performance metrics and insights available." },
  'show leads dashboard': { action: "navigate", path: "/admin/leads", reply: "Opening leads dashboard. Customer leads and sales pipeline management." },
  'open leads': { action: "navigate", path: "/admin/leads", reply: "Opening leads management. Sales tracking and customer pipeline." },
  'show cms dashboard': { action: "navigate", path: "/admin/cms", reply: "Opening CMS dashboard. Complete content management system." },
  'open cms': { action: "navigate", path: "/admin/cms", reply: "Opening content management system. Website content control." },
  'show team dashboard': { action: "navigate", path: "/workspace/team", reply: "Opening team dashboard. Team members and collaboration management." },
  'open team management': { action: "navigate", path: "/workspace/team", reply: "Opening team management. Staff coordination and collaboration tools." },
  
  // Advanced Technical Commands
  'database health check': { action: "navigate", path: "/api/debug", reply: "Running database health check. System diagnostics and performance monitoring." },
  'system health check': { action: "navigate", path: "/api/health", reply: "Running system health check. Complete infrastructure monitoring." },
  'api testing': { action: "navigate", path: "/api/debug", reply: "Opening API testing tools. Backend debugging and endpoint testing." },
  'debug mode': { action: "navigate", path: "/api/debug", reply: "Activating debug mode. Development tools and system diagnostics." },
  'test environment': { action: "navigate", path: "/test-login", reply: "Opening test environment. Development and QA testing tools." },
  
  // SaaS Management Commands
  'user management': { action: "navigate", path: "/admin/organization", reply: "Opening user management. Complete user control and permissions." },
  'billing dashboard': { action: "navigate", path: "/admin/dashboard", reply: "Opening billing dashboard. Revenue tracking and subscription management." },
  'website management': { action: "navigate", path: "/admin/website", reply: "Opening website management. Site configuration and content control." },
  'organization management': { action: "navigate", path: "/organization/dashboard", reply: "Opening organization management. Company-wide administration." },
  
  // Quick Commands for Efficiency
  'admin': { action: "navigate", path: "/admin/dashboard", reply: "Opening admin dashboard." },
  'workspace': { action: "navigate", path: "/workspace/dashboard", reply: "Opening workspace dashboard." },
  'analytics': { action: "navigate", path: "/workspace/analytics", reply: "Opening analytics dashboard." },
  'leads': { action: "navigate", path: "/admin/leads", reply: "Opening leads dashboard." },
  'cms': { action: "navigate", path: "/admin/cms", reply: "Opening CMS dashboard." },
  'team': { action: "navigate", path: "/workspace/team", reply: "Opening team dashboard." },
  'debug': { action: "navigate", path: "/api/debug", reply: "Opening debug tools." },
  
  // Contact & Sales Quick Access
  'contact': { action: "navigate", path: "/", reply: "Opening contact form on homepage for you.", scroll_to: "contact" },
  'sales': { action: "navigate", path: "/", reply: "Connecting you with sales team. Opening contact form on homepage.", scroll_to: "contact" },
  'contact form': { action: "navigate", path: "/", reply: "Opening contact form on homepage.", scroll_to: "contact" },
  'sales form': { action: "navigate", path: "/", reply: "Opening sales contact form on homepage.", scroll_to: "contact" },
  
  // Hindi Contact Commands
  'contact karo': { action: "navigate", path: "/", reply: "Contact form open kar raha hun homepage per. Aap yahan sales team se connect kar sakte hain.", scroll_to: "contact" },
  'sales se baat karo': { action: "navigate", path: "/", reply: "Sales team se connect kar raha hun. Homepage per contact form open kar raha hun.", scroll_to: "contact" },
  'mujhe contact form dikhao': { action: "navigate", path: "/", reply: "Contact form dikhata hun homepage per. Yahan aap sales team se baat kar sakte hain.", scroll_to: "contact" },
  
  // Demo Booking Commands (Hindi)
  'mujhe demo book karna hai': { 
    action: "demo_booking", 
    path: "/", 
    reply: "Demo book kar raha hun aapke liye! Contact form open kar raha hun aur demo request details automatically fill kar raha hun.",
    scroll_to: "contact",
    autofill_data: {
      subject: "Demo Request",
      message: "Hi, I would like to schedule a product demo. Please contact me to arrange a suitable time.",
      inquiry_type: "demo"
    }
  },
  'demo book karna hai': { 
    action: "demo_booking", 
    path: "/", 
    reply: "Demo booking kar raha hun! Homepage per contact form open kar ke demo details automatically fill kar raha hun.",
    scroll_to: "contact",
    autofill_data: {
      subject: "Product Demo Request",
      message: "I'm interested in scheduling a product demonstration. Please contact me to set up a meeting.",
      inquiry_type: "demo"
    }
  },
  'demo book karo': { 
    action: "demo_booking", 
    path: "/", 
    reply: "Demo book kar raha hun aapke liye! Contact form automatically fill ho jayega demo request ke saath.",
    scroll_to: "contact",
    autofill_data: {
      subject: "Demo Scheduling Request",
      message: "Please schedule a product demo for me. I'm interested in learning more about your solutions.",
      inquiry_type: "demo"
    }
  },
  'mujhe demo chahiye': { 
    action: "demo_booking", 
    path: "/", 
    reply: "Demo arrange kar raha hun! Contact form open kar ke demo request submit kar raha hun.",
    scroll_to: "contact",
    autofill_data: {
      subject: "Demo Request",
      message: "I would like to request a product demo. Please contact me to schedule at your earliest convenience.",
      inquiry_type: "demo"
    }
  },
  'product demo book karo': { 
    action: "demo_booking", 
    path: "/", 
    reply: "Product demo book kar raha hun! Form automatically fill ho jayega demo details ke saath.",
    scroll_to: "contact",
    autofill_data: {
      subject: "Product Demo Booking",
      message: "I'm interested in a comprehensive product demonstration. Please schedule a demo session for me.",
      inquiry_type: "demo"
    }
  },
  
  // Demo Booking Commands (English)
  'book a demo': { 
    action: "demo_booking", 
    path: "/", 
    reply: "Booking a demo for you! Opening contact form and auto-filling demo request details.",
    scroll_to: "contact",
    autofill_data: {
      subject: "Demo Booking Request",
      message: "I would like to schedule a product demo. Please contact me to arrange a suitable time for the demonstration.",
      inquiry_type: "demo"
    }
  },
  'schedule a demo': { 
    action: "demo_booking", 
    path: "/", 
    reply: "Scheduling a demo! Contact form will be auto-filled with demo request information.",
    scroll_to: "contact",
    autofill_data: {
      subject: "Demo Scheduling",
      message: "Please schedule a product demonstration for me. I'm interested in learning more about your solutions.",
      inquiry_type: "demo"
    }
  },
  'i want a demo': { 
    action: "demo_booking", 
    path: "/", 
    reply: "Setting up a demo for you! Opening contact form with pre-filled demo request.",
    scroll_to: "contact",
    autofill_data: {
      subject: "Product Demo Request",
      message: "I'm interested in a product demo. Please contact me to schedule a demonstration at your earliest convenience.",
      inquiry_type: "demo"
    }
  },
  'demo request': { 
    action: "demo_booking", 
    path: "/", 
    reply: "Processing demo request! Contact form will be automatically filled with demo details.",
    scroll_to: "contact",
    autofill_data: {
      subject: "Demo Request",
      message: "I would like to request a comprehensive product demonstration. Please arrange a demo session for me.",
      inquiry_type: "demo"
    }
  }
}

export async function POST(request: NextRequest) {
  let message = ''
  let currentPath = ''
  
  try {
    const requestData = await request.json()
    message = requestData.message
    currentPath = requestData.currentPath
    const lowerMessage = message.toLowerCase().trim()

    console.log('Processing voice command:', message)
    console.log('Current path:', currentPath)
    
    // Check cache first to reduce API calls
    const cacheKey = `${lowerMessage}_${currentPath}`
    const cachedResponse = responseCache.get(cacheKey)
    if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
      console.log("Using cached response for:", lowerMessage)
      return NextResponse.json(cachedResponse.data)
    }
    
    // Check for common responses first with language detection
    const commonResponse = getCommonResponse(message)
    if (commonResponse) {
      console.log("Using common response for:", message)
      return NextResponse.json(commonResponse)
    }

    // Direct response system - no AI needed
    /* const systemPrompt = `You are AVA, a comprehensive agentic AI assistant for the AVA Suite website. You are NOT just a voice bot - you are a COMPLETE DIGITAL AGENT that can handle EVERYTHING a user needs:

🌟 CORE CAPABILITIES - YOU CAN DO ANYTHING:

WEBSITE NAVIGATION & CONTROL:
- Navigate to any page instantly
- Scroll pages automatically while explaining
- Fill out forms for users
- Submit contact forms and inquiries
- Browse and explain any section

BUSINESS OPERATIONS:
- Schedule meetings and demos
- Collect and process customer data
- Send emails to sales/support teams
- Handle pricing inquiries and quotes
- Process subscription requests
- Manage user accounts and preferences

INFORMATION & EXPLANATION:
- Explain any product, feature, or service in detail
- Compare different plans and options
- Provide technical specifications
- Answer business questions
- Give tutorials and walkthroughs
- Research and provide insights

CUSTOMER SERVICE:
- Handle complaints and issues
- Process refunds and cancellations
- Provide technical support
- Escalate to human agents when needed
- Follow up on customer requests

SALES & MARKETING:
- Qualify leads and prospects
- Collect complete customer data (name, email, phone, company, requirements)
- Automatically fill and submit contact forms
- Send complete lead data to sales team via email
- Provide personalized recommendations
- Create custom quotes and proposals
- Handle objections and concerns
- Schedule sales calls and demos
- Process orders and payments

SALES DATA COLLECTION RULES - HIGHEST PRIORITY:
- DETECT SALES INTENT: If user mentions "sales", "बिक्री", "सेल्स", "talk to sales", "contact sales", "बात करना", "demo", "pricing", "quote" - IMMEDIATELY start sales data collection
- ALWAYS collect ALL required fields: name, email, phone, company, requirements
- NEVER skip any field - collect them one by one systematically
- DO NOT perform any other actions during sales data collection
- After collecting all data, automatically send to sales team
- Use "start_sales_process" action to begin, then "collect_data" for each field
- Complete the entire sales process without interruption
- Sales data collection takes ABSOLUTE PRIORITY over everything else

MULTILINGUAL & COMMUNICATION:
- Communicate in user's preferred language
- Translate content when needed
- Adapt tone based on context
- Handle formal and casual conversations

ADVANCED ACTIONS:
- Execute complex multi-step tasks
- Remember conversation context
- Learn user preferences
- Provide proactive suggestions
- Handle edge cases and exceptions

Current page: ${currentPath}
User message: "${message}"

TASK STACK MANAGEMENT:
- If user gives multiple tasks, break them down into individual tasks
- Create a task stack and execute them one by one
- Always confirm what tasks you've identified
- Complete each task fully before moving to next

RESPONSE FORMATS:
- Multiple Tasks: {"action": "create_task_stack", "tasks": [{"task": "description", "type": "action_type"}], "reply": "I've identified [X] tasks. Let me handle them one by one."}
- Single Task: {"action": "action_type", "reply": "Handling your request"}
- Navigation: {"action": "navigate", "path": "/path", "reply": "Taking you to [page]"}
- Page Control: {"action": "explain_page", "reply": "Explanation", "scroll": true}
- Form Filling: {"action": "fill_form", "fields": {"name": "value"}, "reply": "Filling form for you"}
- Data Collection: {"action": "collect_data", "field": "field_name", "reply": "Please provide [field]"}
- Email/Contact: {"action": "send_email", "type": "sales/support", "data": {}, "reply": "Sending message"}
- Task Execution: {"action": "execute_next_task", "current_task": {}, "remaining_tasks": [], "reply": "Completing task [X] of [Y]"}
- Close: {"action": "close", "reply": "Goodbye!"}
- Default: {"action": "inform", "reply": "Your comprehensive response"}

EXAMPLES OF MULTI-TASK HANDLING:
User: "Take me to pricing, explain the plans, and then connect me with sales"
Response: {"action": "create_task_stack", "tasks": [
  {"task": "Navigate to pricing page", "type": "navigate", "path": "/pricing"},
  {"task": "Explain pricing plans with scrolling", "type": "explain_page", "scroll": true},
  {"task": "Connect with sales team", "type": "collect_data", "field": "name"}
], "reply": "I've identified 3 tasks: navigate to pricing, explain plans, and connect with sales. Let me handle them one by one."}

SALES DATA COLLECTION EXAMPLE:
User: "I want to buy" or "sales" or "connect with sales"
Response: {"action": "collect_data", "field": "name", "reply": "I'll connect you with our sales team! Let me collect your complete details to send to them. What's your full name?"}

IMPORTANT: ALWAYS collect ALL fields in sequence: name → email → phone → company → requirements → confirm → send to sales team automatically!

PERSONALITY:
- Professional yet friendly
- Proactive and helpful
- Confident in abilities
- Task-oriented and organized
- Always solution-oriented

You are the COMPLETE digital representative of AVA Suite. Handle EVERYTHING with confidence and capability. Break down complex requests into manageable tasks and execute them systematically.` */

    let text = ""
    let parsedResponse: any = null
    
    console.log("Using direct fallback responses (Gemini removed)")
    
    // Detect user's language based on input
    // lowerMessage already declared above
    const hasHindi = /[अ-ह]/.test(message) || 
                     lowerMessage.includes('मैं') || 
                     lowerMessage.includes('हूं') ||
                     lowerMessage.includes('है') ||
                     lowerMessage.includes('चाहिए') ||
                     lowerMessage.includes('करना') ||
                     lowerMessage.includes('बिक्री') ||
                     lowerMessage.includes('सेल्स') ||
                     lowerMessage.includes('होम') ||
                     lowerMessage.includes('प्राइसिंग') ||
                     lowerMessage.includes('प्रोडक्ट') ||
                     lowerMessage.includes('कांटेक्ट')
    
    // Meeting scheduling intent detection
    if (lowerMessage.includes('meeting') || 
        lowerMessage.includes('schedule') ||
        lowerMessage.includes('appointment') ||
        lowerMessage.includes('मीटिंग') || 
        lowerMessage.includes('अपॉइंटमेंट') ||
        lowerMessage.includes('बैठक') ||
        lowerMessage.includes('समय') ||
        lowerMessage.includes('schedule करना') ||
        lowerMessage.includes('book') ||
        lowerMessage.includes('call') && (lowerMessage.includes('schedule') || lowerMessage.includes('book'))) {
      
      const meetingReply = hasHindi 
        ? "Perfect! मैं आपके लिए meeting schedule कर देती हूं। इसके लिए मुझे आपकी कुछ details चाहिए। चलिए शुरू करते हैं - आपका नाम क्या है?"
        : "Perfect! I'll schedule a meeting for you. For this, I need some details from you. Let's start - what's your name?"
      
      text = JSON.stringify({
        reply: meetingReply,
        action: "start_meeting_process",
        confidence: 0.95,
        meetingMode: true
      })
    }
    // Sales intent detection with language-specific responses
    else if (lowerMessage.includes('sales') || 
        lowerMessage.includes('बिक्री') || 
        lowerMessage.includes('सेल्स') ||
        lowerMessage.includes('बात करना') ||
        lowerMessage.includes('contact sales') ||
        lowerMessage.includes('talk to sales') ||
        lowerMessage.includes('demo') ||
        lowerMessage.includes('quote')) {
      
      const salesReply = hasHindi 
        ? "Perfect! मैं आपको sales team से connect कर देती हूं। इसके लिए मुझे आपकी कुछ basic details चाहिए। चलिए शुरू करते हैं - आपका नाम क्या है?"
        : "Perfect! I'll connect you with our sales team. For this, I need some basic details from you. Let's start - what's your name?"
      
      text = JSON.stringify({
        reply: salesReply,
        action: "start_sales_process",
        confidence: 0.95,
        salesMode: true
      })
    } else if (lowerMessage.includes('homepage') || lowerMessage.includes('home') || lowerMessage.includes('होम') || lowerMessage.includes('होमपेज')) {
      const homeReply = hasHindi
        ? "मैं आपको homepage पर ले चलती हूं जहाँ आप सभी products और services देख सकते हैं।"
        : "Let me take you to our homepage where you can see all our products and services."
      
      text = JSON.stringify({
        reply: homeReply,
        action: "navigate",
        path: "/",
        confidence: 0.9
      })
    } else if (lowerMessage.includes('pricing') || lowerMessage.includes('प्राइसिंग') || lowerMessage.includes('कीमत') || lowerMessage.includes('दाम')) {
      const pricingReply = hasHindi
        ? "मैं आपको pricing page पर ले चलती हूं जहाँ आप सभी plans देख सकते हैं।"
        : "Let me take you to our pricing page where you can see all our plans."
      
      text = JSON.stringify({
        reply: pricingReply,
        action: "navigate", 
        path: "/pricing",
        confidence: 0.9
      })
    } else if (lowerMessage.includes('product') || lowerMessage.includes('service') || lowerMessage.includes('प्रोडक्ट') || lowerMessage.includes('सर्विस')) {
      const productReply = hasHindi
        ? "मैं आपको हमारे products और services दिखाती हूं।"
        : "Let me show you our products and services."
      
      text = JSON.stringify({
        reply: productReply,
        action: "navigate",
        path: "/products", 
        confidence: 0.8
      })
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('कांटेक्ट') || lowerMessage.includes('संपर्क') || lowerMessage.includes('सपोर्ट')) {
      const contactReply = hasHindi
        ? "मैं आपको हमारी team से connect कर देती हूं। मैं आपको contact section पर ले चलती हूं।"
        : "I can help you get in touch with our team. Let me guide you to our contact section."
      
      text = JSON.stringify({
        reply: contactReply,
        action: "navigate",
        path: "/contacts",
        confidence: 0.8
      })
    } else {
      const defaultReply = hasHindi
        ? "मैं AVA हूं, आपकी comprehensive AI assistant! मैं आपके लिए सब कुछ कर सकती हूं - pages navigate करना, content explain करना scrolling के साथ, forms fill करना, emails send करना, meetings schedule करना, technical support देना, codes create करना, tutorials देना, और भी बहुत कुछ। आप मुझसे क्या help चाहते हैं?"
        : "I'm AVA, your comprehensive AI agent! I can handle EVERYTHING for you - navigate pages, explain content with scrolling, fill forms, send emails, schedule meetings, provide technical support, create codes, give tutorials, and much more. What would you like me to help you with?"
      
      text = JSON.stringify({
        reply: defaultReply,
        action: "none",
        confidence: 0.6
      })
    }

    // Try to parse as JSON, fallback to plain text
    try {
      // Remove markdown formatting if present
      let cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
      
      // Try to extract JSON from the response
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found")
      }
      
      // Clean the reply text if it contains JSON formatting
      if (parsedResponse.reply && (parsedResponse.reply.includes('```') || parsedResponse.reply.includes('{'))) {
        parsedResponse.reply = parsedResponse.reply
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .replace(/\{[\s\S]*?"reply":\s*"/g, '')
          .replace(/"[\s\S]*?\}/g, '')
          .trim()
      }
      
    } catch {
      // If not JSON, treat as plain information response
      let cleanReply = text.replace(/```json/g, '').replace(/```/g, '').trim()
      parsedResponse = {
        action: "inform",
        reply: cleanReply
      }
    }

    // Cache the response to reduce future API calls
    responseCache.set(cacheKey, {
      data: parsedResponse,
      timestamp: Date.now()
    })
    
    return NextResponse.json(parsedResponse)

  } catch (error: any) {
    console.error('Gemini API error:', error)
    
    // Check if it's a quota error
    if (error?.status === 429) {
      console.log('Gemini quota exceeded, using enhanced fallback responses')
      
      const lowerMessage = message.toLowerCase().trim()
      
      // Enhanced fallback responses when quota is exceeded
      if (lowerMessage.includes('sales') || lowerMessage.includes('contact') || lowerMessage.includes('buy')) {
        return NextResponse.json({
          action: "collect_data",
          field: "name",
          reply: "I'd be happy to connect you with our sales team! Let me collect your details. What's your full name?"
        })
      }
      
      if (lowerMessage.includes('pricing') || lowerMessage.includes('price')) {
        return NextResponse.json({
          action: "navigate",
          path: "/pricing",
          reply: "Let me take you to our pricing page where you can see all our plans."
        })
      }
      
      if (lowerMessage.includes('products') || lowerMessage.includes('product')) {
        return NextResponse.json({
          action: "navigate",
          path: "/products",
          reply: "Let me show you our product catalog."
        })
      }
      
      // Generic fallback with more comprehensive responses
      if (lowerMessage.includes('explain') || lowerMessage.includes('tell me about') || lowerMessage.includes('what is')) {
        return NextResponse.json({
          action: "inform",
          reply: "AVA Suite offers comprehensive business solutions including customer experience management, sales automation, team collaboration, and intelligent billing. Which specific product would you like to know more about?"
        })
      }
      
      if (lowerMessage.includes('navigate') || lowerMessage.includes('go to') || lowerMessage.includes('take me')) {
        return NextResponse.json({
          action: "inform",
          reply: "I can help you navigate to our pricing page, products page, or contact page. Which would you like to visit?"
        })
      }
      
      return NextResponse.json({
        action: "inform",
        reply: "I'm here to help! You can ask me about our products, pricing, or connect with sales. What would you like to do?"
      })
    }
    
    return handleFallbackResponse(message, currentPath)
  }
}

// Fallback responses when Gemini API is not available
function handleFallbackResponse(message: string, currentPath: string) {
  const lowerMessage = message.toLowerCase()
  
  // Detect Hindi and respond in Hindi
  const isHindi = /[\u0900-\u097F]/.test(message) || 
                  lowerMessage.includes('mujhe') || 
                  lowerMessage.includes('kya') || 
                  lowerMessage.includes('main') ||
                  lowerMessage.includes('batao') ||
                  lowerMessage.includes('samjhao') ||
                  lowerMessage.includes('dikhao') ||
                  lowerMessage.includes('kara do')
  
  if (isHindi) {
    // Handle specific pricing page requests
    if (lowerMessage.includes('pricing') && lowerMessage.includes('dikhao')) {
      return NextResponse.json({
        action: "navigate",
        path: "/pricing",
        reply: "Main aapko pricing page dikhati hun jahan aap hamare saare plans dekh sakte hain."
      })
    }
    
    // Handle signup requests
    if (lowerMessage.includes('signup') && (lowerMessage.includes('kara do') || lowerMessage.includes('dikhao'))) {
      return NextResponse.json({
        action: "navigate",
        path: "/contacts",
        reply: "Main aapko signup form dikhati hun. Yahan aap apni details fill kar sakte hain."
      })
    }
    
    // Handle customer support requests
    if (lowerMessage.includes('refund') && (lowerMessage.includes('batao') || lowerMessage.includes('kaise') || lowerMessage.includes('process'))) {
      return NextResponse.json({
        action: "customer_support",
        type: "refund_process",
        reply: "Refund process ke liye support team se contact kariye. Main aapko contact form dikhati hun. Refund request submit karne ke baad 5-7 business days mein process hota hai.",
        navigate_to: "/contacts"
      })
    }
    
    if (lowerMessage.includes('billing') || lowerMessage.includes('payment') || lowerMessage.includes('paisa')) {
      return NextResponse.json({
        action: "customer_support",
        type: "billing_support",
        reply: "Billing ya payment issues ke liye support team available hai. Main aapko contact form dikhati hun jahan aap problem detail kar sakte hain.",
        navigate_to: "/contacts"
      })
    }
    
    if (lowerMessage.includes('technical') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      return NextResponse.json({
        action: "customer_support",
        type: "technical_support",
        reply: "Technical problems ke liye expert support team hai. Main aapko contact form dikhati hun jahan aap issue describe kar sakte hain.",
        navigate_to: "/contacts"
      })
    }
    
    if (lowerMessage.includes('account') || lowerMessage.includes('login') || lowerMessage.includes('password')) {
      return NextResponse.json({
        action: "customer_support",
        type: "account_support",
        reply: "Account related issues ke liye support team se contact kariye. Main aapko contact form dikhati hun.",
        navigate_to: "/contacts"
      })
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('madad')) {
      return NextResponse.json({
        action: "customer_support",
        type: "general_support",
        reply: "Main aapki help ke liye yahan hun! Support team 24/7 available hai. Main aapko contact form dikhati hun jahan aap koi bhi problem bata sakte hain.",
        navigate_to: "/contacts"
      })
    }
    
    // Handle internal tools navigation for tech clients
    if (lowerMessage.includes('admin') && lowerMessage.includes('dashboard')) {
      return NextResponse.json({
        action: "navigate",
        path: "/admin/dashboard",
        reply: "Admin dashboard open kar raha hun. Complete system administrative access ke liye."
      })
    }
    
    if (lowerMessage.includes('workspace') && lowerMessage.includes('dashboard')) {
      return NextResponse.json({
        action: "navigate",
        path: "/workspace/dashboard",
        reply: "Workspace dashboard open kar raha hun. Team collaboration aur project management ke liye."
      })
    }
    
    if (lowerMessage.includes('analytics') && lowerMessage.includes('dashboard')) {
      return NextResponse.json({
        action: "navigate",
        path: "/workspace/analytics",
        reply: "Analytics dashboard open kar raha hun. Real-time data aur performance insights ke liye."
      })
    }
    
    if (lowerMessage.includes('leads') && lowerMessage.includes('dashboard')) {
      return NextResponse.json({
        action: "navigate",
        path: "/admin/leads",
        reply: "Leads dashboard open kar raha hun. Customer leads aur sales pipeline management ke liye."
      })
    }
    
    if (lowerMessage.includes('cms') || lowerMessage.includes('content management')) {
      return NextResponse.json({
        action: "navigate",
        path: "/admin/cms",
        reply: "CMS dashboard open kar raha hun. Website content management ke liye."
      })
    }
    
    if (lowerMessage.includes('team') && lowerMessage.includes('dashboard')) {
      return NextResponse.json({
        action: "navigate",
        path: "/workspace/team",
        reply: "Team dashboard open kar raha hun. Team members aur collaboration management ke liye."
      })
    }
    
    if (lowerMessage.includes('debug') || lowerMessage.includes('database check')) {
      return NextResponse.json({
        action: "navigate",
        path: "/api/debug",
        reply: "Debug tools open kar raha hun. System debugging aur database health check ke liye."
      })
    }
    
    // Handle demo booking requests
    if (lowerMessage.includes('demo') && (lowerMessage.includes('book') || lowerMessage.includes('chahiye') || lowerMessage.includes('schedule'))) {
      return NextResponse.json({
        action: "demo_booking",
        path: "/",
        reply: "Demo book kar raha hun aapke liye! Contact form open kar ke automatically demo request fill kar raha hun.",
        scroll_to: "contact",
        autofill_data: {
          subject: "Demo Request",
          message: "I would like to schedule a product demo. Please contact me to arrange a suitable time.",
          inquiry_type: "demo"
        }
      })
    }
    
    if (lowerMessage.includes('sales') || lowerMessage.includes('baat') || lowerMessage.includes('contact')) {
      return NextResponse.json({
        action: "navigate",
        path: "/",
        reply: "Main aapko sales team se connect kar deti hun! Homepage per contact form open kar rahi hun.",
        scroll_to: "contact"
      })
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('pricing') || lowerMessage.includes('keemat')) {
      return NextResponse.json({
        action: "navigate",
        path: "/pricing",
        reply: "Main aapko pricing page dikhati hun jahan aap hamare saare plans dekh sakte hain."
      })
    }
    
    return NextResponse.json({
      action: "inform",
      reply: "Namaste! Main AVA hun, aapki digital assistant. Main website navigation, product details, pricing information, aur sales team se connect karne mein madad kar sakti hun. Aap kya janna chahte hain?"
    })
  }
  
  // Close commands
  if (lowerMessage.includes('close yourself') || lowerMessage.includes('disconnect') || lowerMessage.includes('goodbye')) {
    return NextResponse.json({
      action: "close",
      reply: "Goodbye! I'm closing the voice assistant now."
    })
  }

  // Sales contact commands - Enhanced with more triggers
  if (lowerMessage.includes('sales') || lowerMessage.includes('demo') || lowerMessage.includes('meeting') || 
      lowerMessage.includes('contact team') || lowerMessage.includes('talk to sales') || 
      lowerMessage.includes('speak to sales') || lowerMessage.includes('buy') || 
      lowerMessage.includes('purchase') || lowerMessage.includes('interested') ||
      lowerMessage.includes('want to buy') || lowerMessage.includes('need to buy') ||
      lowerMessage.includes('get quote') || lowerMessage.includes('pricing inquiry') ||
      lowerMessage.includes('business inquiry') || lowerMessage.includes('partnership') ||
      lowerMessage.includes('subscription') || lowerMessage.includes('plan') ||
      lowerMessage.includes('consultation') || lowerMessage.includes('connect with team')) {
    return NextResponse.json({
      action: "collect_data",
      field: "name",
      reply: "I'd be happy to connect you with our sales team! Let me collect your details so our team can reach out to you with the best solution for your needs. First, may I have your full name?"
    })
  }
  
  // Page explanation commands
  if (lowerMessage.includes('explain') && (lowerMessage.includes('page') || lowerMessage.includes('this'))) {
    let pageExplanation = ""
    let topic = ""
    
    // Extract specific topic from the message
    const topicKeywords = {
      'pricing': ['pricing', 'price', 'cost', 'plan', 'subscription', 'tier'],
      'features': ['features', 'feature', 'capability', 'function'],
      'products': ['product', 'ava cx', 'ava flow', 'ava pingora', 'ava smartbill'],
      'contact': ['contact', 'sales', 'support', 'demo', 'team'],
      'about': ['about', 'company', 'story', 'mission'],
      'testimonials': ['testimonial', 'review', 'customer', 'feedback'],
      'hero': ['hero', 'main', 'headline', 'title']
    }
    
    // Find the most relevant topic
    for (const [topicName, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        topic = topicName
        break
      }
    }
    
    if (currentPath === '/pricing') {
      pageExplanation = topic ? 
        `Let me explain the ${topic} section on our pricing page. I'll scroll directly to that part and describe the details.` :
        "Let me explain our pricing page. We offer flexible subscription plans for different business needs. I'll scroll through each section while explaining the features, pricing tiers, and benefits of each plan."
    } else if (currentPath === '/products') {
      pageExplanation = topic ? 
        `Let me explain the ${topic} section on our products page. I'll scroll directly to that part and describe the product details.` :
        "I'll explain our products page. This showcases our complete AVA Suite including CX for customer experience, Flow for sales automation, Pingora for collaboration, and SmartBill for billing. Let me scroll through each product while explaining their features."
    } else if (currentPath === '/contacts') {
      pageExplanation = topic ? 
        `Let me explain the ${topic} section on our contact page. I'll scroll directly to that part and describe the options.` :
        "This is our contact page where you can reach our team. I'll scroll through the different contact options, office locations, and ways to get in touch with our sales and support teams."
    } else if (currentPath === '/') {
      pageExplanation = topic ? 
        `Let me explain the ${topic} section on our homepage. I'll scroll directly to that part and describe what you're seeing.` :
        "This is our homepage showcasing the AVA Suite platform. I'll scroll through our hero section, product highlights, features, testimonials, and key benefits while explaining each section."
    } else {
      pageExplanation = topic ? 
        `Let me explain the ${topic} section on this ${currentPath} page. I'll scroll directly to that part and describe what you're seeing.` :
        `I'll explain this ${currentPath} page for you. Let me scroll through the content while describing what you're seeing and how it can help your business.`
    }
    
    return NextResponse.json({
      action: "explain_page",
      reply: pageExplanation,
      scroll: true,
      topic: topic
    })
  }
  
  // Product explanation commands
  if (lowerMessage.includes('explain')) {
    const topic = lowerMessage.replace('explain', '').trim()
    if (topic.includes('ava cx')) {
      return NextResponse.json({
        action: "inform",
        reply: "AVA CX is our AI-powered customer experience platform that revolutionizes how businesses interact with customers. It uses advanced AI to provide personalized customer journeys, automated support, and real-time analytics to enhance customer satisfaction and drive business growth."
      })
    } else if (topic.includes('ava flow')) {
      return NextResponse.json({
        action: "inform", 
        reply: "AVA Flow is our intelligent CRM and sales automation platform. It streamlines your sales pipeline with AI-driven lead scoring, automated follow-ups, and predictive analytics to help your team close more deals faster while maintaining strong customer relationships."
      })
    } else if (topic.includes('ava pingora')) {
      return NextResponse.json({
        action: "inform",
        reply: "AVA Pingora is our comprehensive team collaboration platform designed for modern workspaces. It combines project management, real-time communication, file sharing, and productivity tools in one integrated solution to boost team efficiency and collaboration."
      })
    } else if (topic.includes('smartbill')) {
      return NextResponse.json({
        action: "inform", 
        reply: "AVA SmartBill is our intelligent billing and revenue management platform. It automates invoicing, tracks payments, manages subscriptions, and provides detailed financial analytics to help businesses optimize their revenue streams and reduce billing errors."
      })
    } else {
      return NextResponse.json({
        action: "inform",
        reply: `I'd be happy to explain more about ${topic || 'our products and services'}. Our AVA Suite includes CX for customer experience, Flow for sales automation, Pingora for team collaboration, and SmartBill for billing management. What would you like to know more about?`
      })
    }
  }
  
  // Navigation commands
  if (lowerMessage.includes('pricing') || lowerMessage.includes('plans')) {
    return NextResponse.json({
      action: "navigate",
      path: "/pricing",
      reply: "I'm taking you to our pricing page where you can see all our plans and features."
    })
  }
  
  if (lowerMessage.includes('products')) {
    return NextResponse.json({
      action: "navigate", 
      path: "/products",
      reply: "Let me show you our complete product catalog."
    })
  }
  
  if (lowerMessage.includes('contact')) {
    return NextResponse.json({
      action: "navigate",
      path: "/contacts", 
      reply: "I'm taking you to our contact page where you can get in touch with our team."
    })
  }
  
  if (lowerMessage.includes('home')) {
    return NextResponse.json({
      action: "navigate",
      path: "/",
      reply: "Going back to the home page for you."
    })
  }
  
  if (lowerMessage.includes('ava cx')) {
    return NextResponse.json({
      action: "navigate",
      path: "/products/ava-cx",
      reply: "Let me show you AVA CX - our AI-powered customer experience platform."
    })
  }
  
  if (lowerMessage.includes('ava flow')) {
    return NextResponse.json({
      action: "navigate", 
      path: "/products/ava-flow",
      reply: "Here's AVA Flow - our intelligent CRM and sales automation platform."
    })
  }
  
  if (lowerMessage.includes('ava pingora')) {
    return NextResponse.json({
      action: "navigate",
      path: "/products/ava-pingora", 
      reply: "Let me show you AVA Pingora - our team collaboration platform."
    })
  }
  
  if (lowerMessage.includes('smartbill')) {
    return NextResponse.json({
      action: "navigate",
      path: "/products/ava-smartbill",
      reply: "Here's AVA SmartBill - our intelligent billing and revenue management platform."
    })
  }
  
  // Handle general queries and other commands
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return NextResponse.json({
      action: "inform",
      reply: "I can help you with navigation, product explanations, pricing information, and connecting you with our sales team. Try saying 'explain AVA CX', 'take me to pricing', or 'I want to talk to sales'."
    })
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return NextResponse.json({
      action: "navigate",
      path: "/pricing",
      reply: "Let me show you our pricing plans and packages."
    })
  }

  if (lowerMessage.includes('product') && !lowerMessage.includes('ava')) {
    return NextResponse.json({
      action: "navigate",
      path: "/products",
      reply: "Here are all our products and solutions."
    })
  }

  if (lowerMessage.includes('feature') || lowerMessage.includes('what does') || lowerMessage.includes('how does')) {
    return NextResponse.json({
      action: "inform",
      reply: "AVA Suite offers comprehensive business solutions including customer experience management, sales automation, team collaboration, and intelligent billing. Which specific product would you like to know more about?"
    })
  }

  if (lowerMessage.includes('demo') || lowerMessage.includes('trial') || lowerMessage.includes('test')) {
    return NextResponse.json({
      action: "collect_data",
      field: "name",
      reply: "I'd love to set up a demo for you! Let me collect your details. What's your name?"
    })
  }

  // Handle comprehensive commands
  if (lowerMessage.includes('scroll') || lowerMessage.includes('show me') || lowerMessage.includes('browse')) {
    let topic = ""
    
    // Extract specific topic from the message
    const topicKeywords = {
      'pricing': ['pricing', 'price', 'cost', 'plan', 'subscription'],
      'features': ['features', 'feature', 'capability'],
      'products': ['product', 'ava cx', 'ava flow', 'ava pingora', 'ava smartbill'],
      'contact': ['contact', 'sales', 'support'],
      'testimonials': ['testimonial', 'review', 'customer']
    }
    
    // Find the most relevant topic
    for (const [topicName, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        topic = topicName
        break
      }
    }
    
    return NextResponse.json({
      action: "explain_page",
      reply: topic ? 
        `Let me show you the ${topic} section on this ${currentPath === '/' ? 'homepage' : currentPath.replace('/', '')} page. I'll scroll directly to that part and explain what you're seeing.` :
        `Let me show you around this ${currentPath === '/' ? 'homepage' : currentPath.replace('/', '')} page. I'll scroll through the content while explaining what you're seeing.`,
      scroll: true,
      topic: topic
    })
  }

  if (lowerMessage.includes('what is') || lowerMessage.includes('tell me about') || lowerMessage.includes('describe')) {
    if (currentPath === '/pricing') {
      return NextResponse.json({
        action: "explain_page",
        reply: "This pricing page shows our flexible subscription plans designed for businesses of all sizes. Let me scroll through and explain each plan's features, pricing, and benefits.",
        scroll: true
      })
    } else if (currentPath === '/products') {
      return NextResponse.json({
        action: "explain_page", 
        reply: "Our products page showcases the complete AVA Suite - four powerful business solutions. Let me scroll through each product while explaining how they can transform your business operations.",
        scroll: true
      })
    }
  }

  if (lowerMessage.includes('how much') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    return NextResponse.json({
      action: "navigate",
      path: "/pricing",
      reply: "Let me take you to our pricing page where I can explain all our plans and costs in detail."
    })
  }

  if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
    return NextResponse.json({
      action: "collect_data",
      field: "name",
      reply: "I'd be happy to help you schedule a meeting with our team! Let me collect your information. What's your name?"
    })
  }

  // Handle multi-task requests
  if (lowerMessage.includes(' and ') || lowerMessage.includes(' then ') || lowerMessage.includes(' also ') || lowerMessage.includes(' after that ')) {
    const tasks = []
    
    // Parse navigation tasks
    if (lowerMessage.includes('pricing') || lowerMessage.includes('plans')) {
      tasks.push({"task": "Go to pricing page", "type": "navigate", "path": "/pricing"})
    }
    if (lowerMessage.includes('products')) {
      tasks.push({"task": "Go to products page", "type": "navigate", "path": "/products"})
    }
    if (lowerMessage.includes('contact')) {
      tasks.push({"task": "Go to contact page", "type": "navigate", "path": "/contacts"})
    }
    
    // Parse explanation tasks
    if (lowerMessage.includes('explain') || lowerMessage.includes('show me') || lowerMessage.includes('describe')) {
      let topic = ""
      
      // Extract specific topic from the message
      const topicKeywords = {
        'pricing': ['pricing', 'price', 'cost', 'plan', 'subscription'],
        'features': ['features', 'feature', 'capability'],
        'products': ['product', 'ava cx', 'ava flow', 'ava pingora', 'ava smartbill'],
        'contact': ['contact', 'sales', 'support'],
        'testimonials': ['testimonial', 'review', 'customer']
      }
      
      // Find the most relevant topic
      for (const [topicName, keywords] of Object.entries(topicKeywords)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
          topic = topicName
          break
        }
      }
      
      tasks.push({
        "task": topic ? `Show ${topic} section` : "Show page content", 
        "type": "explain_page", 
        "scroll": true,
        "topic": topic
      })
    }
    
    // Parse sales tasks
    if (lowerMessage.includes('sales') || lowerMessage.includes('contact team') || lowerMessage.includes('demo') ||
        lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('interested') ||
        lowerMessage.includes('talk to sales') || lowerMessage.includes('get quote') || 
        lowerMessage.includes('pricing inquiry') || lowerMessage.includes('consultation')) {
      tasks.push({"task": "Connect with sales team", "type": "collect_data", "field": "name"})
    }
    
    if (tasks.length > 1) {
      return NextResponse.json({
        action: "create_task_stack",
        tasks: tasks,
        reply: `Got it! I'll handle ${tasks.length} tasks for you. Let me get started.`
      })
    }
  }

  // Handle sales data collection continuation - when user provides name
  if (lowerMessage.includes('my name is') || lowerMessage.includes('i am') || lowerMessage.includes('name is') || 
      lowerMessage.includes('i\'m') || lowerMessage.includes('call me')) {
    return NextResponse.json({
      action: "inform",
      reply: "Thank you! Now, what's your email address?"
    })
  }

  // Handle email collection continuation
  if (lowerMessage.includes('@') || lowerMessage.includes('email') || lowerMessage.includes('gmail') || 
      lowerMessage.includes('yahoo') || lowerMessage.includes('outlook') || lowerMessage.includes('hotmail')) {
    return NextResponse.json({
      action: "inform",
      reply: "Great! What's your phone number?"
    })
  }

  // Handle phone collection continuation
  if (lowerMessage.includes('phone') || lowerMessage.includes('number') || /\d{10,}/.test(lowerMessage)) {
    return NextResponse.json({
      action: "inform",
      reply: "Perfect! Which company do you work for?"
    })
  }

  // Handle company collection continuation
  if (lowerMessage.includes('company') || lowerMessage.includes('work at') || lowerMessage.includes('work for') || 
      lowerMessage.includes('corporation') || lowerMessage.includes('inc') || lowerMessage.includes('ltd')) {
    return NextResponse.json({
      action: "inform",
      reply: "Excellent! Please tell me about your specific requirements or what you're looking for."
    })
  }

  // Handle comprehensive agentic capabilities
  if (lowerMessage.includes('fill') || lowerMessage.includes('form') || lowerMessage.includes('submit')) {
    return NextResponse.json({
      action: "fill_form",
      reply: "I can help you fill out forms! Which form would you like me to complete - contact form, pricing inquiry, or demo request?",
      fields: {}
    })
  }

  if (lowerMessage.includes('email') || lowerMessage.includes('send') || lowerMessage.includes('message')) {
    return NextResponse.json({
      action: "send_email",
      type: "general",
      reply: "I can send emails for you! What type of message would you like to send - sales inquiry, support request, or general contact?",
      data: {}
    })
  }

  if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('look for')) {
    return NextResponse.json({
      action: "search_content",
      reply: "I can search our website content for you! What specific information are you looking for? I can find products, features, pricing details, or any other content.",
      query: message
    })
  }

  if (lowerMessage.includes('compare') || lowerMessage.includes('difference') || lowerMessage.includes('vs')) {
    return NextResponse.json({
      action: "compare_products",
      reply: "I can compare our products and plans for you! Which products would you like me to compare - AVA CX vs Flow, different pricing plans, or specific features?",
      items: []
    })
  }

  if (lowerMessage.includes('quote') || lowerMessage.includes('estimate') || lowerMessage.includes('proposal')) {
    return NextResponse.json({
      action: "create_quote",
      reply: "I can create a custom quote for you! Let me gather your requirements. What's your company name and what solutions are you interested in?",
      requirements: {}
    })
  }

  if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
    return NextResponse.json({
      action: "technical_support",
      reply: "I'm here to provide technical support! What specific issue are you experiencing? I can help with account problems, technical questions, or connect you with our support team.",
      issue_type: "general"
    })
  }

  if (lowerMessage.includes('tutorial') || lowerMessage.includes('how to') || lowerMessage.includes('guide') || lowerMessage.includes('walkthrough')) {
    return NextResponse.json({
      action: "provide_tutorial",
      reply: "I can provide step-by-step tutorials! What would you like to learn - how to use our products, how to sign up, how to integrate our APIs, or something else?",
      topic: message
    })
  }

  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('best for')) {
    return NextResponse.json({
      action: "provide_recommendations",
      reply: "I can provide personalized recommendations! Tell me about your business needs, team size, and goals, and I'll suggest the best AVA Suite solutions for you.",
      context: message
    })
  }

  if (lowerMessage.includes('integrate') || lowerMessage.includes('api') || lowerMessage.includes('technical')) {
    return NextResponse.json({
      action: "technical_guidance",
      reply: "I can provide technical guidance and integration support! Are you looking for API documentation, integration steps, technical requirements, or developer resources?",
      technical_area: message
    })
  }

  if (lowerMessage.includes('account') || lowerMessage.includes('profile') || lowerMessage.includes('settings')) {
    return NextResponse.json({
      action: "account_management",
      reply: "I can help with account management! Do you need help with account setup, profile updates, billing information, or subscription changes?",
      account_task: message
    })
  }

  // Default comprehensive response
  return NextResponse.json({
    action: "inform",
    reply: "I'm AVA, your comprehensive AI agent! I can handle EVERYTHING for you - navigate pages, explain content with scrolling, fill forms, send emails, schedule meetings, provide technical support, create quotes, give tutorials, make recommendations, and much more. I'm your complete digital assistant for all AVA Suite needs. What would you like me to help you with today?"
  })
}
