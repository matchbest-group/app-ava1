import { NextRequest, NextResponse } from 'next/server'
import { WorkspaceDatabaseService } from '@/lib/database'
import { FallbackDatabaseService } from '@/lib/fallback-database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId: organizationId, email, password } = body

    if (!organizationId || !email || !password) {
      return NextResponse.json(
        { error: 'Organization ID, email, and password are required' },
        { status: 400 }
      )
    }

    console.log(`Login attempt for Organization ID: ${organizationId}, Email: ${email}`)

    // Find workspace user by credentials with organization ID validation
    let user
    try {
      user = await WorkspaceDatabaseService.getWorkspaceUser(
        organizationId,
        email,
        password
      )
    } catch (error) {
      console.error('MongoDB error during login:', error)
      console.log('MongoDB failed, using fallback database')
      user = await FallbackDatabaseService.getWorkspaceUser(
        organizationId,
        email,
        password
      )
    }

    if (!user) {
      console.log(`Login failed for Organization ID: ${organizationId}, Email: ${email}`)
      return NextResponse.json(
        { error: 'Invalid credentials. Please check your Organization ID, Email, and Password.' },
        { status: 401 }
      )
    }

    console.log(`Login successful for Organization ID: ${organizationId}, Email: ${email}, Organization: ${user.organizationName}`)

    // Return user data (without sensitive information)
    const { password: userPassword, ...safeUser } = user
    
    return NextResponse.json({
      success: true,
      user: safeUser
    })

  } catch (error) {
    console.error('Error during workspace login:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
