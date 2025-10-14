import { NextRequest, NextResponse } from 'next/server'
import { getServiceDbByOrgId, getServiceDb } from '@/lib/multi-database'

// Add user to service-specific databases
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      organizationId, 
      organizationName, 
      email, 
      password, 
      role = 'user',
      services = ['billing', 'crm', 'pingora'],
      permissions = []
    } = body

    if (!organizationId || !organizationName || !email || !password) {
      return NextResponse.json(
        { error: 'Organization ID, organization name, email, and password are required' },
        { status: 400 }
      )
    }

    console.log(`👤 Adding user ${email} to service databases for organization: ${organizationName} (ID: ${organizationId})`)

    const sanitizedCompanyName = organizationName.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const results: { [key: string]: { success: boolean; error?: string } } = {}

    // Add user to each requested service database using ORG ID
    for (const serviceName of services as ('billing' | 'crm' | 'pingora')[]) {
      try {
        // Use new method with org ID for precise database lookup
        const db = await getServiceDbByOrgId(serviceName, organizationId, organizationName)
        if (!db) {
          results[serviceName] = { 
            success: false, 
            error: `Failed to connect to ${serviceName} service for org ${organizationId}` 
          }
          continue
        }

        console.log(`📝 Adding user to database: ${serviceName}_${organizationId}_${sanitizedCompanyName}`);

        const userCollection = db.collection(`user_${sanitizedCompanyName}`)
        
        // Check if user already exists
        const existingUser = await userCollection.findOne({
          organizationId: organizationId,
          email: email
        })

        if (existingUser) {
          results[serviceName] = { 
            success: false, 
            error: `User already exists in ${serviceName} service` 
          }
          continue
        }

        // Set default permissions based on service and role
        let servicePermissions = permissions
        if (servicePermissions.length === 0) {
          switch (serviceName) {
            case 'billing':
              servicePermissions = role === 'admin' 
                ? ['billing_read', 'billing_write', 'billing_admin', 'user_management']
                : ['billing_read']
              break
            case 'crm':
              servicePermissions = role === 'admin' 
                ? ['crm_read', 'crm_write', 'crm_admin', 'lead_management', 'user_management']
                : ['crm_read', 'lead_read']
              break
            case 'pingora':
              servicePermissions = role === 'admin' 
                ? ['pingora_read', 'pingora_write', 'pingora_admin', 'team_management', 'user_management']
                : ['pingora_read']
              break
          }
        }

        // Insert user
        await userCollection.insertOne({
          organizationId: organizationId,
          organizationName: organizationName,
          email: email,
          password: password,
          role: role,
          permissions: servicePermissions,
          isActive: true,
          serviceType: serviceName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'admin_panel'
        })

        results[serviceName] = { success: true }
        console.log(`✅ User ${email} added to ${serviceName.toUpperCase()} service`)

      } catch (error) {
        console.error(`❌ Error adding user to ${serviceName.toUpperCase()}:`, error)
        results[serviceName] = { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }
    }

    const successCount = Object.values(results).filter(r => r.success).length
    const totalServices = services.length

    return NextResponse.json({
      success: successCount > 0,
      results,
      summary: {
        successCount,
        totalServices,
        addedToServices: Object.keys(results).filter(service => results[service].success)
      },
      message: `User ${email} added to ${successCount}/${totalServices} services`
    })

  } catch (error) {
    console.error('Error adding user to service databases:', error)
    return NextResponse.json(
      { error: 'Failed to add user to service databases' },
      { status: 500 }
    )
  }
}

// Get users from service-specific databases
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const organizationName = url.searchParams.get('organizationName')
    const serviceName = url.searchParams.get('service') as 'billing' | 'crm' | 'pingora' | null

    if (!organizationName) {
      return NextResponse.json(
        { error: 'Organization name is required' },
        { status: 400 }
      )
    }

    console.log(`👥 Getting users for organization: ${organizationName}`)

    // Need to get organizationId to use new database naming
    // For now, let's try to extract it from the query or use fallback method
    const sanitizedCompanyName = organizationName.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const results: { [key: string]: any[] } = {}

    const servicesToQuery = serviceName ? [serviceName] : ['billing', 'crm', 'pingora'] as const

    for (const service of servicesToQuery) {
      try {
        // First try to get organization ID from main database
        let db
        try {
          // Try to find organization by name to get ID
          const { MainDatabaseService } = await import('@/lib/database')
          const organizations = await MainDatabaseService.getAllOrganizations()
          const org = organizations.find((o: any) => o.name === organizationName)
          
          if (org) {
            console.log(`🔍 Found org ID ${org.id} for ${organizationName}`)
            db = await getServiceDbByOrgId(service, org.id, organizationName)
          } else {
            // Fallback to old method for backward compatibility
            console.log(`⚠️ Org ID not found, using fallback method for ${organizationName}`)
            db = await getServiceDb(service, organizationName)
          }
        } catch (error) {
          console.error(`Error getting org ID for ${organizationName}:`, error)
          // Fallback to old method
          db = await getServiceDb(service, organizationName)
        }
        
        if (!db) {
          results[service] = []
          continue
        }

        const userCollection = db.collection(`user_${sanitizedCompanyName}`)
        const users = await userCollection.find({}, { 
          projection: { password: 0 } // Exclude passwords from response
        }).toArray()

        results[service] = users
        console.log(`📊 Found ${users.length} users in ${service.toUpperCase()} service`)

      } catch (error) {
        console.error(`❌ Error getting users from ${service.toUpperCase()}:`, error)
        results[service] = []
      }
    }

    return NextResponse.json({
      success: true,
      organizationName,
      users: results,
      message: `Retrieved users for organization: ${organizationName}`
    })

  } catch (error) {
    console.error('Error getting users from service databases:', error)
    return NextResponse.json(
      { error: 'Failed to get users from service databases' },
      { status: 500 }
    )
  }
}

// Update user in service-specific databases
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      organizationName, 
      email, 
      updates,
      services = ['billing', 'crm', 'pingora']
    } = body

    if (!organizationName || !email || !updates) {
      return NextResponse.json(
        { error: 'Organization name, email, and updates are required' },
        { status: 400 }
      )
    }

    console.log(`✏️ Updating user ${email} in service databases for organization: ${organizationName}`)

    const sanitizedCompanyName = organizationName.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const results: { [key: string]: { success: boolean; error?: string } } = {}

    // Update user in each service database using ORG ID
    for (const serviceName of services as ('billing' | 'crm' | 'pingora')[]) {
      try {
        // Try to get organization ID for precise database lookup  
        let db
        try {
          const { MainDatabaseService } = await import('@/lib/database')
          const organizations = await MainDatabaseService.getAllOrganizations()
          const org = organizations.find((o: any) => o.name === organizationName)
          
          if (org) {
            console.log(`🔍 Found org ID ${org.id} for ${organizationName}`)
            db = await getServiceDbByOrgId(serviceName, org.id, organizationName)
          } else {
            console.log(`⚠️ Org ID not found, using fallback method for ${organizationName}`)
            db = await getServiceDb(serviceName, organizationName)
          }
        } catch (error) {
          console.error(`Error getting org ID for ${organizationName}:`, error)
          db = await getServiceDb(serviceName, organizationName)
        }
        
        if (!db) {
          results[serviceName] = { 
            success: false, 
            error: `Failed to connect to ${serviceName} service` 
          }
          continue
        }

        const userCollection = db.collection(`user_${sanitizedCompanyName}`)
        
        const updateResult = await userCollection.updateOne(
          { email: email },
          { 
            $set: { 
              ...updates, 
              updatedAt: new Date().toISOString(),
              updatedBy: 'admin_panel'
            } 
          }
        )

        if (updateResult.modifiedCount > 0) {
          results[serviceName] = { success: true }
          console.log(`✅ User ${email} updated in ${serviceName.toUpperCase()} service`)
        } else {
          results[serviceName] = { 
            success: false, 
            error: `User not found in ${serviceName} service` 
          }
        }

      } catch (error) {
        console.error(`❌ Error updating user in ${serviceName.toUpperCase()}:`, error)
        results[serviceName] = { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }
    }

    const successCount = Object.values(results).filter(r => r.success).length
    const totalServices = services.length

    return NextResponse.json({
      success: successCount > 0,
      results,
      summary: {
        successCount,
        totalServices,
        updatedInServices: Object.keys(results).filter(service => results[service].success)
      },
      message: `User ${email} updated in ${successCount}/${totalServices} services`
    })

  } catch (error) {
    console.error('Error updating user in service databases:', error)
    return NextResponse.json(
      { error: 'Failed to update user in service databases' },
      { status: 500 }
    )
  }
}

// Delete user from service-specific databases
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const organizationName = url.searchParams.get('organizationName')
    const email = url.searchParams.get('email')
    const servicesParam = url.searchParams.get('services')
    const services = servicesParam ? servicesParam.split(',') : ['billing', 'crm', 'pingora']

    if (!organizationName || !email) {
      return NextResponse.json(
        { error: 'Organization name and email are required' },
        { status: 400 }
      )
    }

    console.log(`🗑️ Deleting user ${email} from service databases for organization: ${organizationName}`)

    const sanitizedCompanyName = organizationName.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const results: { [key: string]: { success: boolean; error?: string } } = {}

    // Delete user from each service database using ORG ID
    for (const serviceName of services as ('billing' | 'crm' | 'pingora')[]) {
      try {
        // Try to get organization ID for precise database lookup
        let db
        try {
          const { MainDatabaseService } = await import('@/lib/database')
          const organizations = await MainDatabaseService.getAllOrganizations()
          const org = organizations.find((o: any) => o.name === organizationName)
          
          if (org) {
            console.log(`🔍 Found org ID ${org.id} for ${organizationName}`)
            db = await getServiceDbByOrgId(serviceName, org.id, organizationName)
          } else {
            console.log(`⚠️ Org ID not found, using fallback method for ${organizationName}`)
            db = await getServiceDb(serviceName, organizationName)
          }
        } catch (error) {
          console.error(`Error getting org ID for ${organizationName}:`, error)
          db = await getServiceDb(serviceName, organizationName)
        }
        
        if (!db) {
          results[serviceName] = { 
            success: false, 
            error: `Failed to connect to ${serviceName} service` 
          }
          continue
        }

        const userCollection = db.collection(`user_${sanitizedCompanyName}`)
        
        const deleteResult = await userCollection.deleteOne({ email: email })

        if (deleteResult.deletedCount > 0) {
          results[serviceName] = { success: true }
          console.log(`✅ User ${email} deleted from ${serviceName.toUpperCase()} service`)
        } else {
          results[serviceName] = { 
            success: false, 
            error: `User not found in ${serviceName} service` 
          }
        }

      } catch (error) {
        console.error(`❌ Error deleting user from ${serviceName.toUpperCase()}:`, error)
        results[serviceName] = { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }
    }

    const successCount = Object.values(results).filter(r => r.success).length
    const totalServices = services.length

    return NextResponse.json({
      success: successCount > 0,
      results,
      summary: {
        successCount,
        totalServices,
        deletedFromServices: Object.keys(results).filter(service => results[service].success)
      },
      message: `User ${email} deleted from ${successCount}/${totalServices} services`
    })

  } catch (error) {
    console.error('Error deleting user from service databases:', error)
    return NextResponse.json(
      { error: 'Failed to delete user from service databases' },
      { status: 500 }
    )
  }
}
