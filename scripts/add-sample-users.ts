// Script to add sample users to organization database
import { OrganizationDatabaseService } from '../lib/database'

async function addSampleUsers() {
  try {
    const organizationName = 'TestOrganization' // Change this to match your organization
    
    console.log('Adding sample users to organization:', organizationName)
    
    // Sample users data
    const sampleUsers = [
      {
        email: 'admin@company.com',
        password: 'admin123',
        organizationId: 'org-test-1',
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
        organizationId: 'org-test-1',
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
        organizationId: 'org-test-1',
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
        organizationId: 'org-test-1',
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
        organizationId: 'org-test-1',
        organizationName: organizationName,
        role: 'user' as const,
        isActive: false, // Inactive user for testing
        firstName: 'Emily',
        lastName: 'Davis',
        department: 'Support',
        position: 'Customer Support'
      }
    ]
    
    // Add each user
    for (const userData of sampleUsers) {
      try {
        if (userData.role === 'admin') {
          const adminUser = await OrganizationDatabaseService.createOrganizationAdmin(organizationName, userData)
          console.log('✓ Added admin user:', adminUser.email)
        } else {
          const regularUser = await OrganizationDatabaseService.createOrganizationUser(organizationName, userData)
          console.log('✓ Added user:', regularUser.email)
        }
      } catch (error) {
        console.log('- User already exists or error:', userData.email, error)
      }
    }
    
    console.log('✅ Sample users added successfully!')
    
    // Verify by fetching all users
    const allUsers = await OrganizationDatabaseService.getAllOrganizationUsers(organizationName)
    console.log('\n📋 Current users in organization:')
    allUsers.forEach((user: any) => {
      console.log(`  - ${user.email} (${user.role}) - ${user.isActive ? 'Active' : 'Inactive'}`)
    })
    
  } catch (error) {
    console.error('❌ Error adding sample users:', error)
  }
}

// Run the function
addSampleUsers()
