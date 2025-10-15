import { NextRequest, NextResponse } from 'next/server'
import { MultiDatabaseService } from '@/lib/multi-database'

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing multi-database connectivity...')
    
    const connectivityResults = await MultiDatabaseService.testConnectivity()
    
    return NextResponse.json({
      success: true,
      connectivity: connectivityResults,
      message: 'Multi-database connectivity test completed'
    })
  } catch (error) {
    console.error('Error testing multi-database connectivity:', error)
    return NextResponse.json(
      { error: 'Failed to test connectivity' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, email, password } = body

    if (!organizationId || !email || !password) {
      return NextResponse.json(
        { error: 'Organization ID, email, and password are required for authentication test' },
        { status: 400 }
      )
    }

    console.log('🧪 Testing cross-service authentication...')
    
    const authResult = await MultiDatabaseService.authenticateUserAcrossServices(
      organizationId,
      email,
      password
    )
    
    return NextResponse.json({
      success: authResult.success,
      authResult,
      message: authResult.success 
        ? 'Cross-service authentication successful' 
        : 'Cross-service authentication failed'
    })
  } catch (error) {
    console.error('Error testing cross-service authentication:', error)
    return NextResponse.json(
      { error: 'Failed to test authentication' },
      { status: 500 }
    )
  }
}
