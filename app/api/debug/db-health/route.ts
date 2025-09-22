import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing database connection...')
    
    const { db } = await connectToDatabase()
    console.log('✅ Database connection successful')
    
    // Test basic database operations
    const collections = await db.listCollections().toArray()
    console.log('📚 Available collections:', collections.map(c => c.name))
    
    // Check if workspace_users collection exists
    const workspaceUsersExists = collections.some(c => c.name === 'workspace_users')
    
    // Get count of workspace users
    let userCount = 0
    if (workspaceUsersExists) {
      userCount = await db.collection('workspace_users').countDocuments()
    }
    
    console.log('👥 Workspace users count:', userCount)
    
    return NextResponse.json({
      success: true,
      message: 'Database connection healthy',
      details: {
        connected: true,
        collections: collections.map(c => c.name),
        workspaceUsersExists,
        userCount,
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('❌ Database health check failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: {
        connected: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
    }, { status: 500 })
  }
}
