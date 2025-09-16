import { NextRequest, NextResponse } from 'next/server'
import { WorkspaceDatabaseService } from '@/lib/database'
import { FallbackDatabaseService } from '@/lib/fallback-database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, email, password } = body

    console.log('=== DEBUG LOGIN ===')
    console.log('Organization ID:', organizationId)
    console.log('Email:', email)
    console.log('Password:', password)

    // Try MongoDB first
    let mongoUser = null
    let mongoError = null
    try {
      console.log('Trying MongoDB...')
      mongoUser = await WorkspaceDatabaseService.getWorkspaceUser(organizationId, email, password)
      console.log('MongoDB result:', mongoUser)
    } catch (error) {
      mongoError = error
      console.log('MongoDB error:', error)
    }

    // Try fallback
    let fallbackUser = null
    let fallbackError = null
    try {
      console.log('Trying fallback...')
      fallbackUser = await FallbackDatabaseService.getWorkspaceUser(organizationId, email, password)
      console.log('Fallback result:', fallbackUser)
    } catch (error) {
      fallbackError = error
      console.log('Fallback error:', error)
    }

    return NextResponse.json({
      success: true,
      debug: {
        mongoUser,
        mongoError: mongoError?.message,
        fallbackUser,
        fallbackError: fallbackError?.message,
        organizationId,
        email
      }
    })

  } catch (error) {
    console.error('Debug login error:', error)
    return NextResponse.json(
      { error: 'Debug failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
