import { NextRequest, NextResponse } from 'next/server'
import { WorkspaceDatabaseService } from '@/lib/database'
import { FallbackDatabaseService } from '@/lib/fallback-database'
import { WorkspaceUser } from '@/lib/types'

// GET - Get all workspace users
export async function GET() {
  try {
    let users
    try {
      users = await WorkspaceDatabaseService.getAllWorkspaceUsers()
    } catch (error) {
      console.log('MongoDB failed, using fallback database')
      users = await FallbackDatabaseService.getAllWorkspaceUsers()
    }
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching workspace users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workspace users' },
      { status: 500 }
    )
  }
}

// POST - Create new workspace user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate unique account ID
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    const accountId = `USER_${timestamp}_${randomStr}`.toUpperCase()
    
    const userData: Omit<WorkspaceUser, '_id' | 'createdAt' | 'updatedAt'> = {
      accountId,
      email: body.email,
      password: body.password,
      organizationName: body.organizationName,
      plan: body.plan
    }
    
    let user
    try {
      user = await WorkspaceDatabaseService.createWorkspaceUser(userData)
    } catch (error) {
      console.log('MongoDB failed, using fallback database')
      user = await FallbackDatabaseService.createWorkspaceUser(userData)
    }
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating workspace user:', error)
    return NextResponse.json(
      { error: 'Failed to create workspace user' },
      { status: 500 }
    )
  }
}
