import { NextRequest, NextResponse } from 'next/server'
import { WorkspaceDatabaseService } from '@/lib/database'
import { FallbackDatabaseService } from '@/lib/fallback-database'
import { MultiDatabaseService } from '@/lib/multi-database'

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

    console.log(`🔐 Enhanced login attempt for Organization ID: ${organizationId}, Email: ${email}`)

    // Try enhanced cross-service authentication first
    try {
      const crossServiceAuth = await MultiDatabaseService.authenticateUserAcrossServices(
        organizationId,
        email,
        password
      )

      if (crossServiceAuth.success) {
        console.log(`✅ Cross-service login successful for ${email} in organization: ${crossServiceAuth.organizationName}`)
        console.log(`🎯 Authenticated services: ${crossServiceAuth.authenticatedServices?.join(', ')}`)

        // Return user data (without sensitive information)
        const { password: userPassword, ...safeUser } = crossServiceAuth.user
        
        return NextResponse.json({
          success: true,
          user: {
            ...safeUser,
            organizationName: crossServiceAuth.organizationName,
            authenticatedServices: crossServiceAuth.authenticatedServices,
            loginMethod: 'cross_service_auth'
          }
        })
      }
    } catch (error) {
      console.error('❌ Cross-service authentication error:', error)
    }

    // Fallback to original authentication method
    console.log('🔄 Falling back to original authentication method...')
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
      console.log(`❌ Login failed for Organization ID: ${organizationId}, Email: ${email}`)
      return NextResponse.json(
        { error: 'Invalid credentials. Please check your Organization ID, Email, and Password.' },
        { status: 401 }
      )
    }

    console.log(`✅ Fallback login successful for Organization ID: ${organizationId}, Email: ${email}, Organization: ${user.organizationName}`)

    // Return user data (without sensitive information)
    const { password: userPassword, ...safeUser } = user
    
    return NextResponse.json({
      success: true,
      user: {
        ...safeUser,
        loginMethod: 'fallback_auth'
      }
    })

  } catch (error) {
    console.error('Error during workspace login:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
