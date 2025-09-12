import { getMainDb, getOrganizationDb, getPingoraDb, getCrmDb, clientPromise } from './mongodb'
import { Organization, OrganizationAdmin, OrganizationUser, WorkspaceUser, PingoraUser, CrmUser } from './types'

// Main Database Operations (Organizations)
export class MainDatabaseService {
  // Create new organization
  static async createOrganization(orgData: Omit<Organization, '_id' | 'createdAt' | 'updatedAt'>): Promise<Organization> {
    const db = await getMainDb()
    const collection = db.collection('organizations')
    
    const now = new Date().toISOString()
    const organization: Organization = {
      ...orgData,
      createdAt: now,
      updatedAt: now
    }
    
    const result = await collection.insertOne(organization as any)
    organization._id = result.insertedId.toString()
    
    return organization
  }

  // Get all organizations
  static async getAllOrganizations(): Promise<Organization[]> {
    const db = await getMainDb()
    const collection = db.collection('organizations')
    return await collection.find({}).toArray() as any as Organization[]
  }

  // Get organization by ID
  static async getOrganizationById(id: string): Promise<Organization | null> {
    const db = await getMainDb()
    const collection = db.collection('organizations')
    return await collection.findOne({ id }) as Organization | null
  }

  // Update organization
  static async updateOrganization(id: string, updateData: Partial<Organization>): Promise<boolean> {
    const db = await getMainDb()
    const collection = db.collection('organizations')
    
    const result = await collection.updateOne(
      { id },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date().toISOString() 
        } 
      }
    )
    
    return result.modifiedCount > 0
  }

  // Delete organization
  static async deleteOrganization(id: string): Promise<boolean> {
    const db = await getMainDb()
    const collection = db.collection('organizations')
    
    // First get the organization to know its name
    const organization = await collection.findOne({ id })
    if (!organization) {
      return false
    }
    
    // Delete from main database
    const result = await collection.deleteOne({ id })
    
    // Delete organization-specific database
    try {
      const client = await clientPromise
      const orgDbName = `org_${organization.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
      await client.db(orgDbName).dropDatabase()
      console.log(`Deleted organization database: ${orgDbName}`)
    } catch (error) {
      console.error('Error deleting organization database:', error)
    }
    
    return result.deletedCount > 0
  }

  // Get organization by admin credentials
  static async getOrganizationByAdminCredentials(accountId: string, email: string, password: string): Promise<Organization | null> {
    const db = await getMainDb()
    const collection = db.collection('organizations')
    
    return await collection.findOne({
      id: accountId,
      adminEmail: email,
      adminPassword: password
    }) as Organization | null
  }
}

// Organization Database Operations (Users within each organization)
export class OrganizationDatabaseService {
  // Create organization admin
  static async createOrganizationAdmin(orgName: string, adminData: Omit<OrganizationAdmin, '_id' | 'createdAt' | 'updatedAt'>): Promise<OrganizationAdmin> {
    const db = await getOrganizationDb(orgName)
    const collection = db.collection('users')
    
    const now = new Date().toISOString()
    const admin: OrganizationAdmin = {
      ...adminData,
      createdAt: now,
      updatedAt: now
    }
    
    const result = await collection.insertOne(admin as any)
    admin._id = result.insertedId.toString()
    
    return admin
  }

  // Create organization user/employee
  static async createOrganizationUser(orgName: string, userData: Omit<OrganizationUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<OrganizationUser> {
    console.log('Creating organization user in database:', { orgName, userData })
    
    const db = await getOrganizationDb(orgName)
    console.log('Got organization database:', db.databaseName)
    
    const collection = db.collection('users')
    console.log('Got users collection')
    
    const now = new Date().toISOString()
    const user: OrganizationUser = {
      ...userData,
      createdAt: now,
      updatedAt: now
    }
    
    console.log('Inserting user document:', user)
    const result = await collection.insertOne(user as any)
    user._id = result.insertedId.toString()
    
    console.log('User inserted successfully with ID:', user._id)
    return user
  }

  // Get organization admin
  static async getOrganizationAdmin(orgName: string, email: string, password: string): Promise<OrganizationAdmin | null> {
    const db = await getOrganizationDb(orgName)
    const collection = db.collection('users')
    
    return await collection.findOne({
      email,
      password,
      role: 'admin',
      isActive: true
    }) as OrganizationAdmin | null
  }

  // Get organization user by credentials
  static async getOrganizationUser(orgName: string, accountId: string, email: string, password: string): Promise<OrganizationUser | null> {
    const db = await getOrganizationDb(orgName)
    const collection = db.collection('users')
    
    return await collection.findOne({
      accountId,
      email,
      password,
      role: { $in: ['user', 'employee'] },
      isActive: true
    }) as OrganizationUser | null
  }

  // Get all users in organization
  static async getAllOrganizationUsers(orgName: string): Promise<(OrganizationAdmin | OrganizationUser)[]> {
    const db = await getOrganizationDb(orgName)
    const collection = db.collection('users')
    
    return await collection.find({ isActive: true }).toArray() as any as (OrganizationAdmin | OrganizationUser)[]
  }

  // Update organization user
  static async updateOrganizationUser(orgName: string, accountId: string, updateData: Partial<OrganizationUser>): Promise<boolean> {
    const db = await getOrganizationDb(orgName)
    const collection = db.collection('users')
    
    const result = await collection.updateOne(
      { accountId },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date().toISOString() 
        } 
      }
    )
    
    return result.modifiedCount > 0
  }

  // Delete organization user
  static async deleteOrganizationUser(orgName: string, accountId: string): Promise<boolean> {
    const db = await getOrganizationDb(orgName)
    const collection = db.collection('users')
    
    const result = await collection.updateOne(
      { accountId },
      { $set: { isActive: false, updatedAt: new Date().toISOString() } }
    )
    
    return result.modifiedCount > 0
  }
}

// Workspace Database Operations (for workspace login)
export class WorkspaceDatabaseService {
  // Create workspace user
  static async createWorkspaceUser(userData: Omit<WorkspaceUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<WorkspaceUser> {
    const db = await getMainDb()
    const collection = db.collection('workspace_users')
    
    const now = new Date().toISOString()
    const user: WorkspaceUser = {
      ...userData,
      createdAt: now,
      updatedAt: now
    }
    
    const result = await collection.insertOne(user as any)
    user._id = result.insertedId.toString()
    
    return user
  }

  // Get workspace user by credentials with organization ID validation
  static async getWorkspaceUser(organizationId: string, email: string, password: string): Promise<WorkspaceUser | null> {
    try {
      // First, check if the organization ID exists in main database
      const mainDb = await getMainDb()
      const organizationsCollection = mainDb.collection('organizations')
      
      // Find organization by organization ID
      const organization = await organizationsCollection.findOne({ id: organizationId }) as Organization | null
      
      if (!organization) {
        console.log(`Organization ID ${organizationId} not found in any organization`)
        return null
      }

      console.log(`Found organization: ${organization.name} for Organization ID: ${organizationId}`)
      
      // Now check user credentials in the organization-specific database
      const orgDb = await getOrganizationDb(organization.name)
      const usersCollection = orgDb.collection('users')
      
      // Find user with matching credentials in the organization's user collection
      // Based on the actual database structure shown in MongoDB Compass
      const user = await usersCollection.findOne({
        organizationId: organizationId, // Use organizationId field as shown in the DB
        email: email,
        password: password,
        isActive: true
      }) as OrganizationUser | null
      
      if (!user) {
        console.log(`User credentials not found in organization ${organization.name}`)
        return null
      }

      console.log(`User authenticated successfully in organization: ${organization.name}`)
      console.log(`User role: ${user.role}`)
      
      // Convert OrganizationUser to WorkspaceUser format for consistency
      const workspaceUser: WorkspaceUser = {
        _id: user._id,
        accountId: user.organizationId, // Use organizationId as accountId
        email: user.email,
        password: user.password,
        organizationName: user.organizationName,
        plan: 'standard', // Default plan, can be enhanced later
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
      
      return workspaceUser
      
    } catch (error) {
      console.error('Error in getWorkspaceUser:', error)
      return null
    }
  }

  // Get all workspace users
  static async getAllWorkspaceUsers(): Promise<WorkspaceUser[]> {
    const db = await getMainDb()
    const collection = db.collection('workspace_users')
    
    return await collection.find({}).toArray() as any as WorkspaceUser[]
  }
}

// Pingora Database Operations
export class PingoraDatabaseService {
  // Create Pingora user
  static async createPingoraUser(userData: Omit<PingoraUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<PingoraUser | null> {
    const db = await getPingoraDb()
    if (!db) {
      console.warn('Pingora database not available, skipping user creation')
      return null
    }
    
    const collection = db.collection('users')
    
    const now = new Date().toISOString()
    const user: PingoraUser = {
      ...userData,
      role: userData.role || 'user', // Default to 'user' if not specified
      displayName: userData.displayName || userData.username, // Default to username if not specified
      createdAt: now,
      updatedAt: now
    }
    
    const result = await collection.insertOne(user as any)
    user._id = result.insertedId.toString()
    
    return user
  }

  // Get Pingora user by credentials
  static async getPingoraUser(username: string, password: string): Promise<PingoraUser | null> {
    const db = await getPingoraDb()
    if (!db) {
      console.warn('Pingora database not available')
      return null
    }
    
    const collection = db.collection('users')
    
    return await collection.findOne({
      username,
      password
    }) as PingoraUser | null
  }

  // Get all Pingora users
  static async getAllPingoraUsers(): Promise<PingoraUser[]> {
    const db = await getPingoraDb()
    if (!db) {
      console.warn('Pingora database not available')
      return []
    }
    
    const collection = db.collection('users')
    
    return await collection.find({}).toArray() as any as PingoraUser[]
  }
}

// CRM Database Operations
export class CrmDatabaseService {
  // Create CRM user
  static async createCrmUser(userData: Omit<CrmUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<CrmUser | null> {
    const db = await getCrmDb()
    if (!db) {
      console.warn('CRM database not available, skipping user creation')
      return null
    }
    
    const collection = db.collection('admins') // Using 'admins' collection as specified
    
    const now = new Date().toISOString()
    const user: CrmUser = {
      ...userData,
      createdAt: now,
      updatedAt: now
    }
    
    const result = await collection.insertOne(user as any)
    user._id = result.insertedId.toString()
    
    return user
  }

  // Get CRM user by credentials
  static async getCrmUser(email: string, password: string): Promise<CrmUser | null> {
    const db = await getCrmDb()
    if (!db) {
      console.warn('CRM database not available')
      return null
    }
    
    const collection = db.collection('admins') // Using 'admins' collection as specified
    
    return await collection.findOne({
      email,
      password
    }) as CrmUser | null
  }

  // Get all CRM users
  static async getAllCrmUsers(): Promise<CrmUser[]> {
    const db = await getCrmDb()
    if (!db) {
      console.warn('CRM database not available')
      return []
    }
    
    const collection = db.collection('admins') // Using 'admins' collection as specified
    
    return await collection.find({}).toArray() as any as CrmUser[]
  }
}
