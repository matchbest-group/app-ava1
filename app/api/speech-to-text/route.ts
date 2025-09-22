import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      )
    }

    // Get Cartesia API key from environment
    const cartesiaApiKey = process.env.CARTESIA_API_KEY || 'sk_car_in1XdaK8asYbww5qyGBpaf'
    if (!cartesiaApiKey) {
      console.error('Cartesia API key not configured')
      return NextResponse.json(
        { error: 'STT service configuration error - API key missing' },
        { status: 500 }
      )
    }
    
    console.log('Processing STT request with Cartesia API...')
    console.log('Audio file:', audioFile.name, audioFile.size, 'bytes', audioFile.type)

    // Convert audio to text using Cartesia STT API
    const sttFormData = new FormData()
    sttFormData.append('file', audioFile, 'recording.wav')
    sttFormData.append('model', 'ink-whisper')
    sttFormData.append('language', 'en')
    sttFormData.append('timestamp_granularities', 'word')
    sttFormData.append('encoding', 'pcm_s16le')
    sttFormData.append('sample_rate', '16000')
    
    console.log('FormData entries for Cartesia:')
    for (const [key, value] of sttFormData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File(${value.name}, ${value.size} bytes)` : value)
    }

    const response = await fetch(
      'https://api.cartesia.ai/stt/transcribe',
      {
        method: 'POST',
        headers: {
          'Cartesia-Version': '2025-04-16',
          'Authorization': `Bearer ${cartesiaApiKey}`,
        },
        body: sttFormData,
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Cartesia STT API error:', response.status, response.statusText, errorText)
      return NextResponse.json(
        { error: 'Failed to convert speech to text' },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Cartesia STT Result:', result)
    
    return NextResponse.json({
      text: result.text || '',
      transcript: result.text || '',
      confidence: result.confidence || 1.0,
      language_code: result.language || 'en',
      words: result.words || []
    })

  } catch (error: any) {
    console.error('Cartesia STT API error:', error.message)
    
    return NextResponse.json(
      { error: 'STT service error: ' + error.message },
      { status: 500 }
    )
  }
}
