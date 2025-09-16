// Role-based access control utilities
export interface UserRole {
  role: 'admin' | 'user' | 'employee'
  permissions: string[]
}

export interface WorkspaceUser {
  accountId: string
  email: string
  password: string
  organizationName: string
  plan: string
  createdAt: string
  role?: 'admin' | 'user' | 'employee'
}

// Permission constants
export const PERMISSIONS = {
  // Team Management
  TEAM_CREATE: 'team.create',
  TEAM_EDIT: 'team.edit',
  TEAM_DELETE: 'team.delete',
  TEAM_VIEW: 'team.view',
  TEAM_MANAGE_ROLES: 'team.manage_roles',
  
  // Product Management
  PRODUCTS_VIEW: 'products.view',
  PRODUCTS_MANAGE: 'products.manage',
  PRODUCTS_ASSIGN: 'products.assign',
  
  // Analytics & Reports
  ANALYTICS_VIEW: 'analytics.view',
  REPORTS_VIEW: 'reports.view',
  
  // Settings
  SETTINGS_MANAGE: 'settings.manage',
  ORGANIZATION_MANAGE: 'organization.manage',
} as const

// Role definitions with permissions
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: [
    PERMISSIONS.TEAM_CREATE,
    PERMISSIONS.TEAM_EDIT,
    PERMISSIONS.TEAM_DELETE,
    PERMISSIONS.TEAM_VIEW,
    PERMISSIONS.TEAM_MANAGE_ROLES,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.PRODUCTS_MANAGE,
    PERMISSIONS.PRODUCTS_ASSIGN,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.SETTINGS_MANAGE,
    PERMISSIONS.ORGANIZATION_MANAGE,
  ],
  employee: [
    PERMISSIONS.TEAM_VIEW,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
  ],
  user: [
    PERMISSIONS.TEAM_VIEW,
    PERMISSIONS.PRODUCTS_VIEW,
  ]
}

// Check if user has specific permission
export const hasPermission = (user: WorkspaceUser | null, permission: string): boolean => {
  if (!user) {
    return false
  }
  
  if (!user.role) {
    // For backward compatibility, if no role is set, assume admin for existing users
    return true
  }
  
  const userPermissions = ROLE_PERMISSIONS[user.role] || []
  return userPermissions.includes(permission)
}

// Check if user is admin
export const isAdmin = (user: WorkspaceUser | null): boolean => {
  if (!user) {
    return false
  }
  
  return user.role === 'admin' || !user.role // Backward compatibility
}

// Check if user can manage team
export const canManageTeam = (user: WorkspaceUser | null): boolean => {
  return hasPermission(user, PERMISSIONS.TEAM_CREATE) || 
         hasPermission(user, PERMISSIONS.TEAM_EDIT) ||
         hasPermission(user, PERMISSIONS.TEAM_MANAGE_ROLES)
}

// Check if user can manage products
export const canManageProducts = (user: WorkspaceUser | null): boolean => {
  return hasPermission(user, PERMISSIONS.PRODUCTS_MANAGE) ||
         hasPermission(user, PERMISSIONS.PRODUCTS_ASSIGN)
}

// Get user role display name
export const getRoleDisplayName = (role?: string): string => {
  switch (role) {
    case 'admin':
      return 'Administrator'
    case 'employee':
      return 'Employee'
    case 'user':
      return 'User'
    default:
      return 'Administrator' // Backward compatibility
  }
}

// Get role badge variant for UI
export const getRoleBadgeVariant = (role?: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (role) {
    case 'admin':
      return 'destructive'
    case 'employee':
      return 'default'
    case 'user':
      return 'secondary'
    default:
      return 'destructive' // Backward compatibility
  }
}
