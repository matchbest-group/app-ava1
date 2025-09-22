import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    console.log('TTS Request body length:', body.length)
    
    if (!body || body.trim() === '') {
      console.warn('Empty request body received')
      return NextResponse.json(
        { error: 'Empty request body' },
        { status: 400 }
      )
    }
    
    let text: string
    try {
      const parsedBody = JSON.parse(body)
      text = parsedBody.text
      console.log('TTS text:', text.substring(0, 100) + '...')
    } catch (parseError) {
      console.warn('Failed to parse JSON')
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      )
    }

    if (!text || text.length < 3) {
      console.warn('Invalid text for TTS')
      return NextResponse.json(
        { error: 'Text too short for TTS' },
        { status: 400 }
      )
    }

    // Get Cartesia API key from environment
    const cartesiaApiKey = process.env.CARTESIA_API_KEY || 'sk_car_in1XdaK8asYbww5qyGBpaf'
    if (!cartesiaApiKey) {
      console.error('Cartesia API key not configured')
      return NextResponse.json(
        { error: 'TTS service configuration error - API key missing' },
        { status: 500 }
      )
    }

    console.log('Using Cartesia TTS API for:', text.substring(0, 50) + '...')

    // Call Cartesia TTS API
    const cartesiaResponse = await fetch('https://api.cartesia.ai/tts/bytes', {
      method: 'POST',
      headers: {
        'Cartesia-Version': '2025-04-16',
        'Authorization': `Bearer ${cartesiaApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model_id: 'sonic-2',
        transcript: text,
        voice: {
          mode: 'id',
          id: '95d51f79-c397-46f9-b49a-23763d3eaa2d' // Hinglish Speaking Lady - Indian female voice
        },
        output_format: {
          container: 'mp3',
          bit_rate: 128000,
          sample_rate: 44100
        },
        language: 'en',
        speed: 'normal'
      })
    })

    if (!cartesiaResponse.ok) {
      const errorText = await cartesiaResponse.text()
      console.error('Cartesia TTS API error:', cartesiaResponse.status, errorText)
      return NextResponse.json(
        { error: 'TTS generation failed' },
        { status: 500 }
      )
    }

    // Get the audio data as buffer
    const audioBuffer = await cartesiaResponse.arrayBuffer()
    console.log('Cartesia TTS generated audio:', audioBuffer.byteLength, 'bytes')

    // Convert to base64 for JSON response
    const audioBase64 = Buffer.from(audioBuffer).toString('base64')

    return NextResponse.json({
      success: true,
      audioData: audioBase64,
      contentType: 'audio/mpeg',
      size: audioBuffer.byteLength
    })

  } catch (error: any) {
    console.error('TTS API error:', error.message)
    return NextResponse.json(
      { error: 'TTS service error: ' + error.message },
      { status: 500 }
    )
  }
}
