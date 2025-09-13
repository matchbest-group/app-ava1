import { NextRequest, NextResponse } from 'next/server'
import { OrganizationDatabaseService, PingoraDatabaseService, CrmDatabaseService } from '@/lib/database'
import { OrganizationUser, PingoraUser, CrmUser } from '@/lib/types'

// GET - Get all team users for an organization
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const organizationName = searchParams.get('organizationName')
    
    if (!organizationName) {
      return NextResponse.json(
        { error: 'Organization name is required' },
        { status: 400 }
      )
    }

    const users = await OrganizationDatabaseService.getAllOrganizationUsers(organizationName)
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching team users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team users' },
      { status: 500 }
    )
  }
}

// POST - Create new team user in all 3 databases
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Team user creation API called with:', body)
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.password || !body.organizationName) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, password, organizationName' },
        { status: 400 }
      )
    }

    // Generate unique account ID
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    const accountId = `USER_${timestamp}_${randomStr}`.toUpperCase()
    
    // 1. Create user in main organization database (AVA ONE)
    const userData: Omit<OrganizationUser, '_id' | 'createdAt' | 'updatedAt'> & { accountId: string } = {
      accountId,
      email: body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      organizationId: body.organizationId || 'DEFAULT_ORG',
      organizationName: body.organizationName,
      role: body.role || 'user',
      department: body.department || 'General',
      position: body.position || 'Team Member',
      isActive: true
    }
    
    console.log('Creating user in organization database with data:', userData)
    const user = await OrganizationDatabaseService.createOrganizationUser(body.organizationName, userData)
    console.log('User created in organization database:', user)
    
    // 2. Create user in Pingora database
    try {
      const pingoraUserData: Omit<PingoraUser, '_id' | 'createdAt' | 'updatedAt'> = {
        username: body.username || body.email.split('@')[0], // Use provided username or email prefix as fallback
        password: body.password, // Will be hashed if bcrypt is available
        email: body.email,
        displayName: body.displayName || `${body.firstName} ${body.lastName}`, // Use provided displayName or construct from names
        role: body.role === 'admin' ? 'admin' : 'user' // Map to Pingora roles
      }
      
      console.log('Creating user in Pingora database with data:', pingoraUserData)
      const pingoraUser = await PingoraDatabaseService.createPingoraUser(pingoraUserData)
      console.log('User created in Pingora database:', pingoraUser ? 'Success' : 'Failed')
    } catch (pingoraError) {
      console.error('Error creating user in Pingora database:', pingoraError)
      // Continue execution even if Pingora fails
    }
    
    // 3. Create user in CRM database
    try {
      // Map organization roles to CRM roles (all lowercase)
      const crmRoleMapping: { [key: string]: CrmUser['role'] } = {
        'admin': 'super admin',
        'user': 'employee',
        'employee': 'employee'
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
    console.error('Error creating team user:', error)
    return NextResponse.json(
      { error: 'Failed to create team user' },
      { status: 500 }
    )
  }
}
