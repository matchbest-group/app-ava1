import { Organization, OrganizationAdmin, OrganizationUser, WorkspaceUser } from './types'

// Fallback database service using localStorage
export class FallbackDatabaseService {
  // Organizations
  static async getAllOrganizations(): Promise<Organization[]> {
    try {
      const data = localStorage.getItem('organizations')
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading organizations from localStorage:', error)
      return []
    }
  }

  static async createOrganization(orgData: Omit<Organization, '_id' | 'createdAt' | 'updatedAt'>): Promise<Organization> {
    try {
      const organizations = await this.getAllOrganizations()
      const now = new Date().toISOString()
      const organization: Organization = {
        ...orgData,
        createdAt: now,
        updatedAt: now
      }
      
      organizations.push(organization)
      localStorage.setItem('organizations', JSON.stringify(organizations))
      return organization
    } catch (error) {
      console.error('Error creating organization:', error)
      throw error
    }
  }

  static async getOrganizationById(id: string): Promise<Organization | null> {
    try {
      const organizations = await this.getAllOrganizations()
      return organizations.find(org => org.id === id) || null
    } catch (error) {
      console.error('Error getting organization by ID:', error)
      return null
    }
  }

  static async updateOrganization(id: string, updateData: Partial<Organization>): Promise<boolean> {
    try {
      const organizations = await this.getAllOrganizations()
      const index = organizations.findIndex(org => org.id === id)
      if (index === -1) return false
      
      organizations[index] = {
        ...organizations[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      }
      
      localStorage.setItem('organizations', JSON.stringify(organizations))
      return true
    } catch (error) {
      console.error('Error updating organization:', error)
      return false
    }
  }

  static async deleteOrganization(id: string): Promise<boolean> {
    try {
      const organizations = await this.getAllOrganizations()
      const filtered = organizations.filter(org => org.id !== id)
      localStorage.setItem('organizations', JSON.stringify(filtered))
      return true
    } catch (error) {
      console.error('Error deleting organization:', error)
      return false
    }
  }

  static async getOrganizationByAdminCredentials(accountId: string, email: string, password: string): Promise<Organization | null> {
    try {
      const organizations = await this.getAllOrganizations()
      return organizations.find(org => 
        org.id === accountId && 
        org.adminEmail === email && 
        org.adminPassword === password
      ) || null
    } catch (error) {
      console.error('Error getting organization by credentials:', error)
      return null
    }
  }

  // Workspace Users
  static async getAllWorkspaceUsers(): Promise<WorkspaceUser[]> {
    try {
      const data = localStorage.getItem('workspace_users')
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading workspace users from localStorage:', error)
      return []
    }
  }

  static async createWorkspaceUser(userData: Omit<WorkspaceUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<WorkspaceUser> {
    try {
      const users = await this.getAllWorkspaceUsers()
      const now = new Date().toISOString()
      const user: WorkspaceUser = {
        ...userData,
        createdAt: now,
        updatedAt: now
      }
      
      users.push(user)
      localStorage.setItem('workspace_users', JSON.stringify(users))
      return user
    } catch (error) {
      console.error('Error creating workspace user:', error)
      throw error
    }
  }

  static async getWorkspaceUser(organizationId: string, email: string, password: string): Promise<WorkspaceUser | null> {
    try {
      // First, check if the organization ID exists in any organization
      const organizations = await this.getAllOrganizations()
      const organization = organizations.find(org => org.id === organizationId)
      
      if (!organization) {
        console.log(`Organization ID ${organizationId} not found in any organization (fallback)`)
        return null
      }

      console.log(`Found organization: ${organization.name} for Organization ID: ${organizationId} (fallback)`)
      
      // Get organization users from localStorage
      const orgUsersKey = `org_users_${organization.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
      const orgUsersData = localStorage.getItem(orgUsersKey)
      const orgUsers: OrganizationUser[] = orgUsersData ? JSON.parse(orgUsersData) : []
      
      // Find user with matching credentials in the organization's user collection
      // Based on the actual database structure
      const user = orgUsers.find(u => 
        u.organizationId === organizationId && 
        u.email === email && 
        u.password === password &&
        u.isActive === true
      )
      
      if (!user) {
        console.log(`User credentials not found in organization ${organization.name} (fallback)`)
        return null
      }

      console.log(`User authenticated successfully in organization: ${organization.name} (fallback)`)
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
      console.error('Error in getWorkspaceUser (fallback):', error)
      return null
    }
  }
}
