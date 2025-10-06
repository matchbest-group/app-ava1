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

// Get database connection for a specific service
export async function getServiceDb(serviceName: 'billing' | 'crm' | 'pingora', orgName: string): Promise<Db | null> {
  try {
    if (!serviceClientPromises[serviceName]) {
      console.error(`${serviceName.toUpperCase()} service connection not available`)
      return null
    }

    const client = await serviceClientPromises[serviceName]
    const dbName = `${serviceName}_${orgName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
    
    console.log(`📊 Connecting to ${serviceName.toUpperCase()} database: ${dbName}`)
    return client.db(dbName)
  } catch (error) {
    console.error(`Error connecting to ${serviceName.toUpperCase()} database:`, error)
    return null
  }
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

// Create organization databases across all services
export class MultiDatabaseService {
  // Create organization databases in all services
  static async createOrganizationDatabases(orgData: {
    id: string
    name: string
    adminEmail: string
  }): Promise<{
    success: boolean
    results: { [key: string]: { success: boolean; error?: string } }
  }> {
    console.log(`🚀 Creating organization databases for: ${orgData.name} (${orgData.id})`)
    
    const results: { [key: string]: { success: boolean; error?: string } } = {}
    let overallSuccess = true

    // Create databases for each service
    for (const serviceName of ['billing', 'crm', 'pingora'] as const) {
      try {
        console.log(`📊 Creating ${serviceName.toUpperCase()} database for ${orgData.name}...`)
        
        const db = await getServiceDb(serviceName, orgData.name)
        if (!db) {
          results[serviceName] = { 
            success: false, 
            error: `Failed to connect to ${serviceName} service` 
          }
          overallSuccess = false
          continue
        }

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
        console.log(`✅ ${serviceName.toUpperCase()} database created successfully`)

        // Create service-specific collections and initial data
        await this.createServiceSpecificCollections(db, serviceName, orgData)
        
        results[serviceName] = { success: true }
        
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

  // Create service-specific collections
  private static async createServiceSpecificCollections(
    db: Db, 
    serviceName: 'billing' | 'crm' | 'pingora', 
    orgData: { id: string; name: string; adminEmail: string }
  ): Promise<void> {
    try {
      switch (serviceName) {
        case 'billing':
          // Create billing-specific collections
          await db.createCollection('invoices')
          await db.createCollection('payments')
          await db.createCollection('subscriptions')
          await db.createCollection('billing_users')
          
          // Insert default billing admin
          const billingUsersCollection = db.collection('billing_users')
          await billingUsersCollection.insertOne({
            organizationId: orgData.id,
            organizationName: orgData.name,
            email: orgData.adminEmail,
            role: 'admin',
            permissions: ['billing_read', 'billing_write', 'billing_admin'],
            isActive: true,
            createdAt: new Date().toISOString()
          })
          console.log(`💰 BILLING collections and admin user created for ${orgData.name}`)
          break

        case 'crm':
          // Create CRM-specific collections
          await db.createCollection('contacts')
          await db.createCollection('leads')
          await db.createCollection('deals')
          await db.createCollection('activities')
          await db.createCollection('crm_users')
          
          // Insert default CRM admin
          const crmUsersCollection = db.collection('crm_users')
          await crmUsersCollection.insertOne({
            organizationId: orgData.id,
            organizationName: orgData.name,
            email: orgData.adminEmail,
            role: 'admin',
            permissions: ['crm_read', 'crm_write', 'crm_admin'],
            isActive: true,
            createdAt: new Date().toISOString()
          })
          console.log(`🤝 CRM collections and admin user created for ${orgData.name}`)
          break

        case 'pingora':
          // Create Pingora-specific collections
          await db.createCollection('teams')
          await db.createCollection('projects')
          await db.createCollection('tasks')
          await db.createCollection('messages')
          await db.createCollection('pingora_users')
          
          // Insert default Pingora admin
          const pingoraUsersCollection = db.collection('pingora_users')
          await pingoraUsersCollection.insertOne({
            organizationId: orgData.id,
            organizationName: orgData.name,
            email: orgData.adminEmail,
            role: 'admin',
            permissions: ['pingora_read', 'pingora_write', 'pingora_admin'],
            isActive: true,
            createdAt: new Date().toISOString()
          })
          console.log(`🎯 PINGORA collections and admin user created for ${orgData.name}`)
          break
      }
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
