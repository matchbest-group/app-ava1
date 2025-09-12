// Product interface
export interface Product {
  id: string
  name: string
  description: string
  url: string
  icon: string
  color: string
  enabled: boolean
}

// Main Organization (stored in main database)
export interface Organization {
  _id?: string
  id: string // Unique organization ID
  name: string
  email: string
  phone: string
  address: string
  industry: string
  employeeCount: string
  foundedYear: string
  website: string
  description: string
  adminEmail: string
  adminPassword: string
  licenseStatus: 'active' | 'suspended' | 'paused' | 'expired'
  licenseExpiry: string
  selectedProducts: string[] // Array of product IDs
  userLimit: string // User limit for the organization
  createdAt: string
  updatedAt: string
}

// Organization Admin (stored in organization-specific database)
export interface OrganizationAdmin {
  _id?: string
  email: string
  password: string
  organizationId: string
  organizationName: string
  role: 'admin'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Organization User/Employee (stored in organization-specific database)
export interface OrganizationUser {
  _id?: string
  accountId?: string // Optional account ID for compatibility
  email: string
  password: string
  organizationId: string // This matches the actual DB structure
  organizationName: string
  role: 'admin' | 'user' | 'employee' // Updated to include admin role
  isActive: boolean
  createdAt: string
  updatedAt: string
  // Optional fields that might exist
  firstName?: string
  lastName?: string
  department?: string
  position?: string
}

// Workspace User (for workspace login - created by admin)
export interface WorkspaceUser {
  _id?: string
  accountId: string
  email: string
  password: string
  organizationName: string
  plan: string
  createdAt: string
  updatedAt: string
}

// New interface for team users
export interface TeamUser {
  _id?: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'admin' | 'user' | 'employee'
  department?: string
  position?: string
  organizationId: string
  organizationName: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Pingora User Schema
export interface PingoraUser {
  _id?: string
  username: string // Unique identifier, no spaces (required)
  password: string // Will be auto-hashed with bcrypt (required)
  email: string // Valid email format (required)
  displayName?: string // Full name for display, defaults to username (optional)
  role?: 'user' | 'admin' | 'hr' // Defaults to "user" (optional)
  createdAt: string
  updatedAt: string
}

// CRM User Schema (based on the form image)
export interface CrmUser {
  _id?: string
  firstName: string // Required
  lastName: string // Required
  email: string // Required
  password: string // Required
  role: 'Account Owner' | 'Super Admin' | 'Manager' | 'Employee' | 'Create Only' | 'Read Only' // Required
  createdAt: string
  updatedAt: string
}