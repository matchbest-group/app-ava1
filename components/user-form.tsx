'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'
import { TeamUser } from '@/lib/types'

interface UserFormData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string // For Pingora integration
  displayName: string // For Pingora integration
  role: 'admin' | 'user' | 'employee' | 'Account Owner' | 'Super Admin' | 'Manager' | 'Create Only' | 'Read Only' // Extended for CRM
  department: string
  position: string
}

interface UserFormProps {
  onSubmit: (data: UserFormData & { organizationId: string }) => void
  onCancel: () => void
  currentUserCount: number
  userLimit: string
  organizations?: Array<{ id: string; name: string }>
}

const roles = [
  // Standard roles
  { value: 'admin', label: 'Admin', description: 'Full access to all features' },
  { value: 'user', label: 'User', description: 'Standard user access' },
  { value: 'employee', label: 'Employee', description: 'Limited access' },
  // CRM-specific roles
  { value: 'Account Owner', label: 'Account Owner', description: 'Complete control over the account' },
  { value: 'Super Admin', label: 'Super Admin', description: 'Super administrative privileges' },
  { value: 'Manager', label: 'Manager', description: 'Management level access' },
  { value: 'Create Only', label: 'Create Only', description: 'Can only create records' },
  { value: 'Read Only', label: 'Read Only', description: 'View-only access' }
]

const departments = [
  'Engineering',
  'Sales',
  'Marketing',
  'HR',
  'Finance',
  'Operations',
  'Customer Support',
  'Product',
  'Design',
  'Other'
]

export function UserForm({ onSubmit, onCancel, currentUserCount, userLimit, organizations = [] }: UserFormProps) {
  console.log('UserForm rendered with props:', { currentUserCount, userLimit, organizations })
  
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    displayName: '',
    role: 'user',
    department: '',
    position: ''
  })

  // Auto-select the first/only organization available
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>(
    organizations.length > 0 ? organizations[0].id : ''
  )
  const [errors, setErrors] = useState<Partial<UserFormData & { organizationId: string }>>({})

  // Auto-select organization when organizations are loaded
  useEffect(() => {
    if (organizations.length > 0 && !selectedOrganizationId) {
      console.log('Auto-selecting organization:', organizations[0])
      setSelectedOrganizationId(organizations[0].id)
    }
  }, [organizations, selectedOrganizationId])

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Auto-fill display name when first or last name changes
      if (field === 'firstName' || field === 'lastName') {
        const firstName = field === 'firstName' ? value : prev.firstName
        const lastName = field === 'lastName' ? value : prev.lastName
        if (firstName && lastName) {
          newData.displayName = `${firstName} ${lastName}`
        }
      }
      
      // Auto-fill username from email prefix if username is empty
      if (field === 'email' && !prev.username) {
        const emailPrefix = value.split('@')[0]
        if (emailPrefix) {
          newData.username = emailPrefix.replace(/[^a-zA-Z0-9_]/g, '') // Remove special chars except underscore
        }
      }
      
      return newData
    })
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData & { organizationId: string }> = {}

    // Organization validation - should be auto-selected
    if (!selectedOrganizationId && organizations.length === 0) {
      newErrors.organizationId = 'No organization available'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required' as any
    } else if (formData.username.includes(' ')) {
      newErrors.username = 'Username cannot contain spaces' as any
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters' as any
    }

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required' as any
    }

    if (!formData.role) {
      newErrors.role = 'Role is required' as any
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with data:', { ...formData, organizationId: selectedOrganizationId })
    console.log('Form validation result:', validateForm())
    
    if (validateForm()) {
      console.log('Calling onSubmit with data:', { ...formData, organizationId: selectedOrganizationId })
      onSubmit({ ...formData, organizationId: selectedOrganizationId })
    } else {
      console.log('Form validation failed, errors:', errors)
    }
  }

  const getUserLimitNumber = (limit: string) => {
    const parts = limit.split('-')
    return parseInt(parts[parts.length - 1])
  }

  const maxUsers = getUserLimitNumber(userLimit)
  const canCreateUser = currentUserCount < maxUsers

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[80vh] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Add New User</CardTitle>
              <CardDescription>
                Create a new team member for your organization
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 relative">
          {!canCreateUser && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                You have reached your user limit ({currentUserCount}/{maxUsers}). 
                Please upgrade your plan to add more users.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Organization Auto-Selected (Hidden) */}
            {organizations.length > 0 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-600">
                  <strong>Organization:</strong> {organizations.find(org => org.id === selectedOrganizationId)?.name || 'Auto-selected'}
                </p>
              </div>
            )}
            
            {organizations.length === 0 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-600">No organizations available. Please create an organization first.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className={errors.firstName ? 'border-red-500' : ''}
                  disabled={!canCreateUser}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className={errors.lastName ? 'border-red-500' : ''}
                  disabled={!canCreateUser}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter username (no spaces)"
                className={errors.username ? 'border-red-500' : ''}
                disabled={!canCreateUser}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
              <p className="text-xs text-gray-500">Used for Pingora system login (no spaces, minimum 3 characters)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name *</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                placeholder="Enter display name"
                className={errors.displayName ? 'border-red-500' : ''}
                disabled={!canCreateUser}
              />
              {errors.displayName && <p className="text-sm text-red-500">{errors.displayName}</p>}
              <p className="text-xs text-gray-500">Full name as it will appear in the system</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
                className={errors.email ? 'border-red-500' : ''}
                disabled={!canCreateUser}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter password"
                className={errors.password ? 'border-red-500' : ''}
                disabled={!canCreateUser}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className={errors.role ? 'border-red-500' : ''} disabled={!canCreateUser}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{role.label}</span>
                        <span className="text-xs text-gray-500">{role.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger className={errors.department ? 'border-red-500' : ''} disabled={!canCreateUser}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                placeholder="Enter position"
                className={errors.position ? 'border-red-500' : ''}
                disabled={!canCreateUser}
              />
              {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
            </div>

          </form>
        </CardContent>
        <div className="flex-shrink-0 border-t bg-white p-4">
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!canCreateUser}
              onClick={(e) => {
                console.log('Create User button clicked in form')
                console.log('Form data:', formData)
                console.log('Selected organization:', selectedOrganizationId)
                handleSubmit(e as any)
              }}
            >
              Create User
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
