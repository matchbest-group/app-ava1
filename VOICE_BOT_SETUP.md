# 🎤 Voice Bot Setup Guide

## Step 1: Eleven Labs Voice ID Setup

### 🔗 Account Creation
1. Visit https://elevenlabs.io
2. Click "Sign Up" (free tier available)
3. Verify your email address
4. Complete profile setup

### 🎙️ Getting Voice ID

#### Method 1: Dashboard (Recommended)
1. Login to Eleven Labs dashboard
2. Go to "Voices" section
3. Browse "Voice Library" 
4. Select a female voice (recommended voices):
   - **Rachel** (Professional) - `21m00Tcm4TlvDq8ikWAM`
   - **Domi** (Friendly) - `AZnzlk1XvdvUeBnXmlld`
   - **Bella** (Warm) - `EXAVITQu4vr4xnSDxMaL`
5. Click on voice card
6. Copy the Voice ID (long string like `21m00Tcm4TlvDq8ikWAM`)

#### Method 2: API Call
```javascript
fetch('https://api.elevenlabs.io/v1/voices', {
  headers: {
    'xi-api-key': 'your_api_key_here'
  }
})
.then(res => res.json())
.then(data => {
  console.log('Available voices:', data.voices)
  // Look for female voices in the response
})
```

### 🔑 API Key Setup
1. In Eleven Labs dashboard
2. Go to "Profile" → "API Keys"
3. Click "Create API Key"
4. Copy the generated key
5. Add to your `.env.local`

## Step 2: Gemini API Setup

### 🧠 Google AI Studio
1. Visit https://aistudio.google.com
2. Sign in with Google account
3. Go to "Get API Key"
4. Create new API key
5. Copy the key

## Step 3: Environment Configuration

Create/update your `.env.local` file:

```env
# Voice Bot Configuration
GEMINI_API_KEY=your_gemini_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# Email Configuration (already set)
FROM_EMAIL=avaone@matchbestsoftware.ae
PRICING_INQUIRY_EMAIL=pavan.satpute1@matchbest.ai
```

## Step 4: Recommended Voice IDs

### 👩 Female Voices (Free Tier Available)
```javascript
const recommendedVoices = {
  // Professional & Clear
  "Rachel": "21m00Tcm4TlvDq8ikWAM",
  
  // Friendly & Conversational  
  "Domi": "AZnzlk1XvdvUeBnXmlld",
  
  // Warm & Engaging
  "Bella": "EXAVITQu4vr4xnSDxMaL",
  
  // Young & Energetic
  "Elli": "MF3mGyEYCl7XYWbV9V6O"
}
```

### 🎯 Recommended: Rachel
- **Voice ID**: `21m00Tcm4TlvDq8ikWAM`
- **Style**: Professional, clear, business-appropriate
- **Quality**: High clarity, perfect pronunciation
- **Free Tier**: 10,000 characters/month

## Step 5: Testing

### 🧪 Test Voice Bot
1. Open your website
2. Look for floating voice bot button (bottom-right)
3. Click to open voice interface
4. Try commands:
   - "Show me pricing"
   - "Tell me about AVA CX"
   - "Go to products"

### 🔍 Troubleshooting

#### If Voice ID doesn't work:
1. Check if voice is available in your region
2. Verify API key permissions
3. Try different voice ID from the list

#### If TTS fails:
- Browser fallback TTS will activate automatically
- Check browser console for detailed error messages

## Step 6: Fallback System

### 🛡️ Built-in Fallbacks
- **No Gemini API**: Uses pattern matching for navigation
- **No Eleven Labs**: Uses browser Speech Synthesis API
- **No Speech Recognition**: Quick action buttons available

### 🎯 Current Status
✅ Voice bot UI is ready and functional
✅ Fallback responses work without API keys
✅ Navigation commands work
✅ Browser TTS fallback available

The system works even without API keys - just with reduced functionality!

## 🚀 Production Ready Features

- ✅ Error handling for all API failures
- ✅ Graceful fallbacks to browser APIs
- ✅ Professional UI with animations
- ✅ Mobile responsive design
- ✅ Accessibility features

Your voice bot is ready to use! Just add the API keys when available for enhanced functionality.
