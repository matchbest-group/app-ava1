import { NextRequest, NextResponse } from 'next/server'
import { createDefaultAdminUsers } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Setting up admin users in database...')
    
    await createDefaultAdminUsers()
    
    return NextResponse.json({
      success: true,
      message: 'Admin users setup completed successfully',
      credentials: [
        { email: 'admin@avaone.com', password: 'AvaOne@2024!', role: 'admin' },
        { email: 'superadmin@avaone.com', password: 'SuperAva@2024!', role: 'superadmin' },
        { email: 'dev@avaone.com', password: 'DevAva@2024!', role: 'developer' }
      ]
    })

  } catch (error) {
    console.error('Error setting up admin users:', error)
    return NextResponse.json(
      { error: 'Failed to setup admin users' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      message: 'Admin setup endpoint - use POST to setup admin users',
      availableCredentials: [
        'admin@avaone.com',
        'superadmin@avaone.com', 
        'dev@avaone.com'
      ]
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Setup info failed' },
      { status: 500 }
    )
  }
}
