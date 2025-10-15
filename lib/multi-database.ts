import { MongoClient, Db } from 'mongodb'

// MongoDB URIs for different services
const SERVICE_URIS = {
  billing: 'mongodb+srv://Raina_Jangid:DXKVbcg1v3PPKUJl@billing-avaone-cluster.yu4avlo.mongodb.net/billing-system?retryWrites=true&w=majority&appName=Billing-Avaone-Cluster',
  crm: 'mongodb+srv://prathammatchbest:RJzRDv3ttJ5ihNsq@matchbest.6d8mq44.mongodb.net/?retryWrites=true&w=majority&appName=matchbest',
  pingora: 'mongodb+srv://aayushhmishra2003:t8u4pg47@cluster0.jroy3k9.mongodb.net/matchbest_new?retryWrites=true&w=majority&appName=Cluster0'
}

// Service client connections
let serviceClients: { [key: string]: MongoClient } = {}
let serviceClientPromises: { [key: string]: Promise<MongoClient> } = {}

// Initialize service connections
const initializeServiceConnections = () => {
  Object.entries(SERVICE_URIS).forEach(([serviceName, uri]) => {
    if (!serviceClientPromises[serviceName]) {
      try {
        const client = new MongoClient(uri, {})
        serviceClientPromises[serviceName] = client.connect()
        console.log(`✅ ${serviceName.toUpperCase()} MongoDB connection initialized`)
      } catch (error) {
        console.error(`❌ Failed to initialize ${serviceName.toUpperCase()} MongoDB connection:`, error)
      }
    }
  })
}

// Initialize connections
initializeServiceConnections()

// Get database connection for a specific service with org ID
export async function getServiceDb(serviceName: 'billing' | 'crm' | 'pingora', orgName: string, orgId?: string): Promise<Db | null> {
  try {
    if (!serviceClientPromises[serviceName]) {
      console.error(`${serviceName.toUpperCase()} service connection not available`)
      return null
    }

    const client = await serviceClientPromises[serviceName]
    
    // New naming convention: servicename_orgid_companyname
    const sanitizedCompanyName = orgName.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const dbName = orgId 
      ? `${serviceName}_${orgId}_${sanitizedCompanyName}`
      : `${serviceName}_${sanitizedCompanyName}` // Fallback for backward compatibility
    
    console.log(`📊 Connecting to ${serviceName.toUpperCase()} database: ${dbName}`)
    return client.db(dbName)
  } catch (error) {
    console.error(`Error connecting to ${serviceName.toUpperCase()} database:`, error)
    return null
  }
}

// Backward compatibility function
export async function getServiceDbByOrgName(serviceName: 'billing' | 'crm' | 'pingora', orgName: string): Promise<Db | null> {
  return getServiceDb(serviceName, orgName)
}

// New function to get database by org ID (preferred method)
export async function getServiceDbByOrgId(serviceName: 'billing' | 'crm' | 'pingora', orgId: string, orgName: string): Promise<Db | null> {
  return getServiceDb(serviceName, orgName, orgId)
}

// Organization info to store in each service database
export interface OrganizationInfo {
  organizationId: string
  organizationName: string
  createdAt: string
  serviceType: 'billing' | 'crm' | 'pingora'
  adminEmail: string
  status: 'active' | 'inactive'
}

// Enhanced Organization Database Creation System
export class MultiDatabaseService {
  // Create organization databases with proper structure across all services
  static async createOrganizationDatabases(orgData: {
    id: string
    name: string
    adminEmail: string
    adminPassword: string
  }): Promise<{
    success: boolean
    results: { [key: string]: { success: boolean; error?: string; databaseName?: string; collections?: string[] } }
  }> {
    console.log(`🚀 Creating organization databases for: ${orgData.name} (${orgData.id})`)
    
    const results: { [key: string]: { success: boolean; error?: string; databaseName?: string; collections?: string[] } } = {}
    let overallSuccess = true

    // Sanitize company name for database naming
    const sanitizedCompanyName = orgData.name.toLowerCase().replace(/[^a-z0-9]/g, '_')

    // Create databases for each service with NEW naming convention including org ID
    for (const serviceName of ['billing', 'crm', 'pingora'] as const) {
      try {
        console.log(`📊 Creating ${serviceName.toUpperCase()} database for ${orgData.name} (${orgData.id})...`)
        
        // Use new function with org ID
        const db = await getServiceDbByOrgId(serviceName, orgData.id, orgData.name)
        if (!db) {
          results[serviceName] = { 
            success: false, 
            error: `Failed to connect to ${serviceName} service` 
          }
          overallSuccess = false
          continue
        }

        // NEW Database naming: billing_orgid_companyname, crm_orgid_companyname, pingora_orgid_companyname
        const databaseName = `${serviceName}_${orgData.id}_${sanitizedCompanyName}`
        console.log(`🗄️ Enhanced Database name with Org ID: ${databaseName}`)

        // Create organization info collection
        const orgInfoCollection = db.collection('organization_info')
        
        const orgInfo: OrganizationInfo = {
          organizationId: orgData.id,
          organizationName: orgData.name,
          createdAt: new Date().toISOString(),
          serviceType: serviceName,
          adminEmail: orgData.adminEmail,
          status: 'active'
        }

        // Insert organization info
        await orgInfoCollection.insertOne(orgInfo)

        // Create service-specific collections and initial data with admin credentials
        const collections = await this.createServiceSpecificCollections(
          db, 
          serviceName, 
          orgData, 
          sanitizedCompanyName
        )
        
        results[serviceName] = { 
          success: true, 
          databaseName,
          collections
        }
        
        console.log(`✅ ${serviceName.toUpperCase()} database created successfully with collections: ${collections.join(', ')}`)
        
      } catch (error) {
        console.error(`❌ Error creating ${serviceName.toUpperCase()} database:`, error)
        results[serviceName] = { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
        overallSuccess = false
      }
    }

    console.log(`🎯 Organization databases creation completed. Overall success: ${overallSuccess}`)
    return { success: overallSuccess, results }
  }

  // Create service-specific collections with proper naming convention
  private static async createServiceSpecificCollections(
    db: Db, 
    serviceName: 'billing' | 'crm' | 'pingora', 
    orgData: { id: string; name: string; adminEmail: string; adminPassword: string },
    sanitizedCompanyName: string
  ): Promise<string[]> {
    const createdCollections: string[] = []
    
    try {
      switch (serviceName) {
        case 'billing':
          // Create billing-specific collections with company name
          const billingCollections = [
            'invoices',
            'payments',
            'subscriptions',
            `user_${sanitizedCompanyName}`, // user_companyname collection
            'billing_config'
          ]
          
          for (const collectionName of billingCollections) {
            await db.createCollection(collectionName)
            createdCollections.push(collectionName)
          }
          
          // Insert admin credentials in user_companyname collection
          const billingUsersCollection = db.collection(`user_${sanitizedCompanyName}`)
          await billingUsersCollection.insertOne({
            organizationId: orgData.id,
            organizationName: orgData.name,
            email: orgData.adminEmail,
            password: orgData.adminPassword, // Store admin password for login
            role: 'admin',
            permissions: ['billing_read', 'billing_write', 'billing_admin', 'user_management'],
            isActive: true,
            serviceType: 'billing',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          console.log(`💰 BILLING collections and admin user created in user_${sanitizedCompanyName}`)
          break

        case 'crm':
          // Create CRM-specific collections with company name
          const crmCollections = [
            'contacts',
            'leads',
            'deals',
            'activities',
            `user_${sanitizedCompanyName}`, // user_companyname collection
            'crm_config'
          ]
          
          for (const collectionName of crmCollections) {
            await db.createCollection(collectionName)
            createdCollections.push(collectionName)
          }
          
          // Insert admin credentials in user_companyname collection
          const crmUsersCollection = db.collection(`user_${sanitizedCompanyName}`)
          await crmUsersCollection.insertOne({
            organizationId: orgData.id,
            organizationName: orgData.name,
            email: orgData.adminEmail,
            password: orgData.adminPassword, // Store admin password for login
            role: 'admin',
            permissions: ['crm_read', 'crm_write', 'crm_admin', 'lead_management', 'user_management'],
            isActive: true,
            serviceType: 'crm',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
          console.log(`🤝 CRM collections and admin user created in user_${sanitizedCompanyName}`)
          break

        case 'pingora':
          // Create Pingora-specific collections with company name
          const pingoraCollections = [
            'activity_log',
            'attendance', 
            'calendar-events',
            'calendar_actions',
            'calendar_blocks',
            'calendar_bookings',
            'channels',
            'companies',
            'conversations',
            'directories',
            'feedback',
            'file_deletions',
            'files',
            'leaves',
            'licenses',
            'meetings',
            'mention_reads',
            'message_deletions',
            'messages',
            'notifications',
            'push-subscriptions',
            'scheduled_reminders',
            'status_changes',
            'task_comments',
            'tasks',
            'thread_reads',
            'user_preferences',
            'users',
            'workspaces',
            `user_${sanitizedCompanyName}`, // Admin credentials collection
            'pingora_config'
          ]
          
          for (const collectionName of pingoraCollections) {
            await db.createCollection(collectionName)
            createdCollections.push(collectionName)
          }
          
          // Insert admin credentials in user_companyname collection
          const pingoraUsersCollection = db.collection(`user_${sanitizedCompanyName}`)
          await pingoraUsersCollection.insertOne({
            organizationId: orgData.id,
            organizationName: orgData.name,
            email: orgData.adminEmail,
            password: orgData.adminPassword, // Store admin password for login
            role: 'admin',
            permissions: ['pingora_read', 'pingora_write', 'pingora_admin', 'team_management', 'user_management'],
            isActive: true,
            serviceType: 'pingora',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })

          // Also add admin credentials to the main 'users' collection for Pingora
          const mainUsersCollection = db.collection('users')
          await mainUsersCollection.insertOne({
            organizationId: orgData.id,
            organizationName: orgData.name,
            email: orgData.adminEmail,
            password: orgData.adminPassword,
            role: 'admin',
            permissions: ['pingora_read', 'pingora_write', 'pingora_admin', 'team_management', 'user_management'],
            isActive: true,
            serviceType: 'pingora',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isAdmin: true,
            canManageUsers: true,
            canManageTeams: true,
            canManageProjects: true
          })
          
          console.log(`🎯 PINGORA collections and admin user created in user_${sanitizedCompanyName} and users collection`)
          break
      }
      
      return createdCollections
    } catch (error) {
      console.error(`Error creating ${serviceName.toUpperCase()} specific collections:`, error)
      throw error
    }
  }

  // Get organization info from a specific service database
  static async getOrganizationInfo(serviceName: 'billing' | 'crm' | 'pingora', orgName: string): Promise<OrganizationInfo | null> {
    try {
      const db = await getServiceDb(serviceName, orgName)
      if (!db) return null

      const orgInfoCollection = db.collection('organization_info')
      return await orgInfoCollection.findOne({}) as OrganizationInfo | null
    } catch (error) {
      console.error(`Error fetching organization info from ${serviceName.toUpperCase()}:`, error)
      return null
    }
  }

  // Delete organization databases from all services
  static async deleteOrganizationDatabases(orgName: string): Promise<{
    success: boolean
    results: { [key: string]: { success: boolean; error?: string } }
  }> {
    console.log(`🗑️ Deleting organization databases for: ${orgName}`)
    
    const results: { [key: string]: { success: boolean; error?: string } } = {}
    let overallSuccess = true

    for (const serviceName of ['billing', 'crm', 'pingora'] as const) {
      try {
        if (!serviceClientPromises[serviceName]) {
          results[serviceName] = { 
            success: false, 
            error: `${serviceName} service connection not available` 
          }
          overallSuccess = false
          continue
        }

        const client = await serviceClientPromises[serviceName]
        const dbName = `${serviceName}_${orgName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
        
        await client.db(dbName).dropDatabase()
        console.log(`✅ ${serviceName.toUpperCase()} database deleted: ${dbName}`)
        
        results[serviceName] = { success: true }
        
      } catch (error) {
        console.error(`❌ Error deleting ${serviceName.toUpperCase()} database:`, error)
        results[serviceName] = { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
        overallSuccess = false
      }
    }

    return { success: overallSuccess, results }
  }

  // Authenticate user across all service databases using org id + email + password
  static async authenticateUserAcrossServices(
    organizationId: string, 
    email: string, 
    password: string
  ): Promise<{
    success: boolean
    user?: any
    organizationName?: string
    authenticatedServices?: string[]
    error?: string
  }> {
    console.log(`🔐 Authenticating user across services for Org ID: ${organizationId}, Email: ${email}`)
    
    try {
      // First, get organization name from main database
      const mainDb = await this.getMainDb()
      if (!mainDb) {
        return { success: false, error: 'Main database connection failed' }
      }
      
      const organization = await mainDb.collection('organizations').findOne({ id: organizationId })
      if (!organization) {
        return { success: false, error: 'Organization not found' }
      }
      
      const organizationName = organization.name
      const sanitizedCompanyName = organizationName.toLowerCase().replace(/[^a-z0-9]/g, '_')
      
      console.log(`🏢 Found organization: ${organizationName} (ID: ${organizationId})`)
      
      const authenticatedServices: string[] = []
      let authenticatedUser: any = null
      
      // Try to authenticate against each service database using ORG ID
      for (const serviceName of ['billing', 'crm', 'pingora'] as const) {
        try {
          // Use new method with org ID for precise database lookup
          const db = await getServiceDbByOrgId(serviceName, organizationId, organizationName)
          if (!db) {
            console.log(`⚠️ ${serviceName.toUpperCase()} service not available for org ${organizationId}`)
            continue
          }
          
          console.log(`🔍 Checking ${serviceName.toUpperCase()} database: ${serviceName}_${organizationId}_${sanitizedCompanyName}`)
          
          // Check user in user_companyname collection
          const userCollection = db.collection(`user_${sanitizedCompanyName}`)
          const user = await userCollection.findOne({
            organizationId: organizationId,
            email: email,
            password: password,
            isActive: true
          })
          
          if (user) {
            authenticatedServices.push(serviceName)
            if (!authenticatedUser) {
              authenticatedUser = user // Use first found user as base
            }
            console.log(`✅ User authenticated in ${serviceName.toUpperCase()} service`)
          }
          
        } catch (error) {
          console.error(`❌ Error authenticating in ${serviceName.toUpperCase()}:`, error)
        }
      }
      
      if (authenticatedServices.length > 0) {
        return {
          success: true,
          user: authenticatedUser,
          organizationName,
          authenticatedServices
        }
      } else {
        return {
          success: false,
          error: 'Invalid credentials - user not found in any service database'
        }
      }
      
    } catch (error) {
      console.error('❌ Error in cross-service authentication:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      }
    }
  }

  // Helper method to get main database connection
  private static async getMainDb() {
    try {
      // This should use the same main database connection as the rest of the app
      const { getMainDb } = await import('./mongodb')
      return await getMainDb()
    } catch (error) {
      console.error('Error getting main database:', error)
      return null
    }
  }

  // Test connectivity to all services
  static async testConnectivity(): Promise<{ [key: string]: boolean }> {
    console.log('🔍 Testing connectivity to all services...')
    
    const results: { [key: string]: boolean } = {}
    
    for (const serviceName of ['billing', 'crm', 'pingora'] as const) {
      try {
        if (!serviceClientPromises[serviceName]) {
          results[serviceName] = false
          continue
        }

        const client = await serviceClientPromises[serviceName]
        await client.db('test').command({ ping: 1 })
        results[serviceName] = true
        console.log(`✅ ${serviceName.toUpperCase()} service: Connected`)
        
      } catch (error) {
        results[serviceName] = false
        console.log(`❌ ${serviceName.toUpperCase()} service: Failed`)
      }
    }
    
    return results
  }
}
