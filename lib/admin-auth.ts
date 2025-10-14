import { getMainDb } from './mongodb'

export interface AdminUser {
  email: string
  name: string
  role: string
  permissions: string[]
  lastLoginAt: string
}

export async function verifyAdminSession(email: string): Promise<AdminUser | null> {
  try {
    if (!email) {
      return null
    }

    const db = await getMainDb()
    const adminCollection = db.collection('admin_users')
    
    const adminUser = await adminCollection.findOne({
      email: email,
      isActive: true
    })

    if (!adminUser) {
      return null
    }

    // Check if session is not too old (24 hours)
    if (adminUser.lastLoginAt) {
      const lastLogin = new Date(adminUser.lastLoginAt)
      const now = new Date()
      const hoursSinceLogin = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60)
      
      if (hoursSinceLogin > 24) {
        return null // Session expired
      }
    }

    return {
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
      permissions: adminUser.permissions || [],
      lastLoginAt: adminUser.lastLoginAt
    }

  } catch (error) {
    console.error('Error verifying admin session:', error)
    return null
  }
}

export async function createDefaultAdminUsers() {
  try {
    const db = await getMainDb()
    const adminCollection = db.collection('admin_users')
    
    // Check if admin users already exist
    const existingAdmin = await adminCollection.findOne({ email: 'admin@avaone.com' })
    
    if (!existingAdmin) {
      // Create default admin users
      const defaultAdmins = [
        {
          email: 'admin@avaone.com',
          password: 'AvaOne@2024!',
          name: 'System Administrator',
          role: 'admin',
          permissions: ['admin_access', 'user_management', 'system_management', 'database_management'],
          isActive: true,
          createdAt: new Date().toISOString(),
          lastLoginAt: null,
          lastLoginIP: null
        },
        {
          email: 'superadmin@avaone.com',
          password: 'SuperAva@2024!',
          name: 'Super Administrator',
          role: 'superadmin',
          permissions: ['admin_access', 'user_management', 'system_management', 'database_management', 'super_admin'],
          isActive: true,
          createdAt: new Date().toISOString(),
          lastLoginAt: null,
          lastLoginIP: null
        },
        {
          email: 'dev@avaone.com',
          password: 'DevAva@2024!',
          name: 'Development Admin',
          role: 'developer',
          permissions: ['admin_access', 'system_management', 'database_management'],
          isActive: true,
          createdAt: new Date().toISOString(),
          lastLoginAt: null,
          lastLoginIP: null
        }
      ]

      await adminCollection.insertMany(defaultAdmins)
      console.log('✅ Default admin users created in database')
    }

  } catch (error) {
    console.error('Error creating default admin users:', error)
  }
}
