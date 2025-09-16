import { NextRequest, NextResponse } from 'next/server'
import { OrganizationDatabaseService } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const { organizationName } = await request.json()
    
    if (!organizationName) {
      return NextResponse.json(
        { error: 'Organization name is required' },
        { status: 400 }
      )
    }

    console.log('Adding sample users to organization:', organizationName)
    
    // Sample users data
    const sampleUsers = [
      {
        email: 'admin@company.com',
        password: 'admin123',
        organizationId: 'org-sample-1',
        organizationName: organizationName,
        role: 'admin' as const,
        isActive: true,
        firstName: 'Admin',
        lastName: 'User',
        department: 'Management',
        position: 'System Administrator'
      },
      {
        email: 'john.smith@company.com',
        password: 'user123',
        organizationId: 'org-sample-1',
        organizationName: organizationName,
        role: 'employee' as const,
        isActive: true,
        firstName: 'John',
        lastName: 'Smith',
        department: 'Engineering',
        position: 'Senior Developer'
      },
      {
        email: 'sarah.johnson@company.com',
        password: 'user123',
        organizationId: 'org-sample-1',
        organizationName: organizationName,
        role: 'employee' as const,
        isActive: true,
        firstName: 'Sarah',
        lastName: 'Johnson',
        department: 'Marketing',
        position: 'Marketing Analyst'
      },
      {
        email: 'mike.chen@company.com',
        password: 'user123',
        organizationId: 'org-sample-1',
        organizationName: organizationName,
        role: 'user' as const,
        isActive: true,
        firstName: 'Mike',
        lastName: 'Chen',
        department: 'Sales',
        position: 'Sales Representative'
      },
      {
        email: 'emily.davis@company.com',
        password: 'user123',
        organizationId: 'org-sample-1',
        organizationName: organizationName,
        role: 'user' as const,
        isActive: false,
        firstName: 'Emily',
        lastName: 'Davis',
        department: 'Support',
        position: 'Customer Support'
      }
    ]
    
    const results = []
    
    // Add each user
    for (const userData of sampleUsers) {
      try {
        if (userData.role === 'admin') {
          const adminUser = await OrganizationDatabaseService.createOrganizationAdmin(organizationName, userData)
          results.push({ success: true, email: adminUser.email, type: 'admin' })
        } else {
          const regularUser = await OrganizationDatabaseService.createOrganizationUser(organizationName, userData)
          results.push({ success: true, email: regularUser.email, type: userData.role })
        }
      } catch (error) {
        results.push({ success: false, email: userData.email, error: 'User might already exist' })
      }
    }
    
    return NextResponse.json({ 
      message: 'Sample users creation completed', 
      results,
      organizationName 
    })
    
  } catch (error) {
    console.error('Error adding sample users:', error)
    return NextResponse.json(
      { error: 'Failed to add sample users' },
      { status: 500 }
    )
  }
}
