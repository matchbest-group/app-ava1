import { NextRequest, NextResponse } from 'next/server'
import { OrganizationDatabaseService } from '@/lib/database'
import { OrganizationUser } from '@/lib/types'

// GET - Get all users in organization
export async function GET(
  request: NextRequest,
  { params }: { params: { orgName: string } }
) {
  try {
    const users = await OrganizationDatabaseService.getAllOrganizationUsers(params.orgName)
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching organization users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Create new user in organization
export async function POST(
  request: NextRequest,
  { params }: { params: { orgName: string } }
) {
  try {
    const body = await request.json()
    
    // Generate unique account ID
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    const accountId = `USER_${timestamp}_${randomStr}`.toUpperCase()
    
    const userData: Omit<OrganizationUser, '_id' | 'createdAt' | 'updatedAt'> = {
      accountId,
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      organizationId: body.organizationId,
      organizationName: params.orgName,
      role: body.role || 'user',
      department: body.department,
      position: body.position,
      isActive: true
    }
    
    const user = await OrganizationDatabaseService.createOrganizationUser(params.orgName, userData)
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating organization user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
