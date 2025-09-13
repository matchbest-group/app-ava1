import { NextRequest, NextResponse } from 'next/server'
import { OrganizationDatabaseService, PingoraDatabaseService, CrmDatabaseService } from '@/lib/database'
import { OrganizationUser, PingoraUser, CrmUser } from '@/lib/types'

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
    console.log('Organization user creation API called with:', { orgName: params.orgName, body })
    
    // Generate unique account ID
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    const accountId = `USER_${timestamp}_${randomStr}`.toUpperCase()
    
    // Create user in main organization database
    const userData: Omit<OrganizationUser, '_id' | 'createdAt' | 'updatedAt'> & { accountId: string } = {
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
    
    console.log('Creating user in organization database with data:', userData)
    const user = await OrganizationDatabaseService.createOrganizationUser(params.orgName, userData)
    console.log('User created in organization database:', user)
    
    // Create user in Pingora database
    try {
      const pingoraUserData: Omit<PingoraUser, '_id' | 'createdAt' | 'updatedAt'> = {
        username: body.username || body.email.split('@')[0], // Use provided username or email prefix as fallback
        password: body.password, // Will be hashed if bcrypt is available
        email: body.email,
        displayName: body.displayName || `${body.firstName} ${body.lastName}`, // Use provided displayName or construct from names
        role: body.role === 'admin' ? 'admin' : 'user' // Map admin role, default to user
      }
      
      console.log('Creating user in Pingora database with data:', pingoraUserData)
      const pingoraUser = await PingoraDatabaseService.createPingoraUser(pingoraUserData)
      console.log('User created in Pingora database:', pingoraUser ? 'Success' : 'Failed')
    } catch (pingoraError) {
      console.error('Error creating user in Pingora database:', pingoraError)
      // Continue execution even if Pingora fails
    }
    
    // Create user in CRM database
    try {
      // CRM-specific roles or map organization roles to CRM roles (all lowercase)
      const crmRoleMapping: { [key: string]: CrmUser['role'] } = {
        'admin': 'super admin',
        'user': 'employee', 
        'employee': 'employee',
        // Direct CRM roles (converted to lowercase)
        'Account Owner': 'account owner',
        'Super Admin': 'super admin',
        'Manager': 'manager',
        'Create Only': 'create only',
        'Read Only': 'read only'
      }
      
      const crmUserData: Omit<CrmUser, '_id' | 'createdAt' | 'updatedAt'> = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        role: crmRoleMapping[body.role] || 'employee',
        enabled: true
      }
      
      console.log('Creating user in CRM database with data:', crmUserData)
      const crmUser = await CrmDatabaseService.createCrmUser(crmUserData)
      console.log('User created in CRM database:', crmUser ? 'Success' : 'Failed')
    } catch (crmError) {
      console.error('Error creating user in CRM database:', crmError)
      // Continue execution even if CRM fails
    }
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating organization user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
