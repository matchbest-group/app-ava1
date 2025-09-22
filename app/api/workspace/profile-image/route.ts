import { NextRequest, NextResponse } from 'next/server'
import { getMainDb } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { email, profileImage } = await request.json()

    if (!email || !profileImage) {
      console.log('❌ Missing required fields:', { email: !!email, profileImage: !!profileImage })
      return NextResponse.json(
        { success: false, error: 'Email and profile image are required' },
        { status: 400 }
      )
    }

    console.log('🖼️ Updating profile image for user:', email)
    console.log('📸 Profile image length:', profileImage.length, 'characters')
    console.log('📸 Profile image type:', profileImage.substring(0, 50) + '...')

    // Check if profileImage is too large (increased limit for high quality images)
    if (profileImage.length > 3 * 1024 * 1024) { // 3MB limit for base64 (higher for quality preservation)
      console.log('❌ Profile image too large:', profileImage.length, 'characters')
      return NextResponse.json(
        { success: false, error: 'Profile image is too large. Please use a smaller image or lower resolution.' },
        { status: 413 }
      )
    }

    let db
    try {
      db = await getMainDb()
      console.log('✅ Database connection established')
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError)
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      )
    }
    
    // First, try to update the user's profile image
    const result = await db.collection('workspace_users').updateOne(
      { email: email },
      { 
        $set: { 
          profileImage: profileImage,
          updatedAt: new Date()
        }
      }
    )

    console.log('📊 Database update result:', {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      acknowledged: result.acknowledged
    })

    if (result.matchedCount === 0) {
      console.log('⚠️ User not found in workspace_users, checking if user exists elsewhere...')
      
      // Try to find user in any collection or create a basic profile
      try {
        const insertResult = await db.collection('workspace_users').insertOne({
          email: email,
          profileImage: profileImage,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        
        console.log('✅ Created new user profile:', insertResult.insertedId)
      } catch (insertError) {
        console.error('❌ Failed to create user profile:', insertError)
        return NextResponse.json(
          { success: false, error: 'User not found and could not create profile' },
          { status: 404 }
        )
      }
    }

    console.log('✅ Profile image updated successfully in database')

    return NextResponse.json({
      success: true,
      message: 'Profile image updated successfully',
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    })

  } catch (error) {
    console.error('❌ Error updating profile image:', error)
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack available')
    return NextResponse.json(
      { success: false, error: `Database error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      console.log('❌ GET: Missing email parameter')
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('🔍 Fetching profile image for user:', email)

    let db
    try {
      db = await getMainDb()
      console.log('✅ Database connection established for GET')
    } catch (dbError) {
      console.error('❌ Database connection failed for GET:', dbError)
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      )
    }
    
    // Get the user's profile image from the database
    const user = await db.collection('workspace_users').findOne(
      { email: email },
      { projection: { profileImage: 1, name: 1, email: 1 } }
    )

    console.log('📊 Database query result:', {
      userFound: !!user,
      hasProfileImage: !!(user?.profileImage),
      email: user?.email,
      profileImageLength: user?.profileImage ? user.profileImage.length : 0
    })

    if (!user) {
      console.log('❌ User not found in database:', email)
      return NextResponse.json(
        { success: false, error: 'User not found in database' },
        { status: 404 }
      )
    }

    console.log('✅ Profile image retrieved successfully for:', email)

    return NextResponse.json({
      success: true,
      profileImage: user.profileImage || '/avatars/avatar-1.png', // Default fallback
      userName: user.name || 'User'
    })

  } catch (error) {
    console.error('❌ Error fetching profile image:', error)
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack available')
    return NextResponse.json(
      { success: false, error: `Failed to fetch profile image: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
