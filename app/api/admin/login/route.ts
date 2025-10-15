import { NextRequest, NextResponse } from 'next/server'
import { getMainDb } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    console.log(`🔐 Admin login attempt for: ${email}`)

    // Check admin credentials in database
    try {
      const db = await getMainDb()
      const adminCollection = db.collection('admin_users')
      
      const adminUser = await adminCollection.findOne({
        email: email,
        password: password, // In production, use hashed passwords
        isActive: true
      })

      if (!adminUser) {
        console.log(`❌ Failed admin login attempt for: ${email}`)
        return NextResponse.json(
          { error: 'Invalid admin credentials' },
          { status: 401 }
        )
      }

      console.log(`✅ Successful admin login for: ${email}`)

      // Update last login timestamp
      await adminCollection.updateOne(
        { email: email },
        { 
          $set: { 
            lastLoginAt: new Date().toISOString(),
            lastLoginIP: request.ip || 'unknown'
          } 
        }
      )

      return NextResponse.json({
        success: true,
        message: 'Admin login successful',
        user: {
          email: adminUser.email,
          name: adminUser.name,
          role: adminUser.role,
          permissions: adminUser.permissions || ['admin_access', 'user_management', 'system_management']
        }
      })

    } catch (error) {
      console.error('Database error during admin login:', error)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error during admin login:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}

// Logout endpoint
export async function DELETE(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'Admin logged out successfully'
    })
  } catch (error) {
    console.error('Error during admin logout:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
