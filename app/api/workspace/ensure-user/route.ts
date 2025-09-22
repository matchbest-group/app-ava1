import { NextRequest, NextResponse } from 'next/server'
import { getMainDb } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { email, name, organizationName, plan } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('👤 Ensuring user exists in database:', email)

    let db
    try {
      db = await getMainDb()
      console.log('✅ Database connection established for user creation')
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError)
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Check if user already exists
    const existingUser = await db.collection('workspace_users').findOne({ email })
    
    if (existingUser) {
      console.log('✅ User already exists in database:', email)
      return NextResponse.json({
        success: true,
        message: 'User already exists',
        user: existingUser
      })
    }

    // Create new user entry
    const newUser = {
      email,
      name: name || 'User',
      organizationName: organizationName || 'Organization',
      plan: plan || 'Standard',
      profileImage: '/avatars/avatar-1.png', // Default avatar
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('workspace_users').insertOne(newUser)
    
    if (result.insertedId) {
      console.log('✅ New user created in database:', email, result.insertedId)
      return NextResponse.json({
        success: true,
        message: 'User created successfully',
        user: newUser,
        userId: result.insertedId
      })
    } else {
      throw new Error('Failed to insert user')
    }

  } catch (error) {
    console.error('❌ Error ensuring user exists:', error)
    return NextResponse.json(
      { success: false, error: `Failed to ensure user exists: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
