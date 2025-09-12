'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Building2, LogOut, Users, Calendar, UserPlus } from 'lucide-react'
import { OrganizationForm } from '@/components/organization-form'
import { SuccessNotification } from '@/components/success-notification'
import { useAuth } from '@/hooks/use-auth'
import { useLicenseCheck } from '@/hooks/use-license-check'
import { UserForm } from '@/components/user-form'

interface Organization {
  id: string
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
  createdAt: string
}

interface WorkspaceUser {
  accountId: string
  email: string
  password: string
  organizationName: string
  plan: string
  createdAt: string
}

export default function AdminDashboardPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [workspaceUsers, setWorkspaceUsers] = useState<WorkspaceUser[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastCreatedOrg, setLastCreatedOrg] = useState<{ id: string; name: string } | null>(null)
  const [lastCreatedUser, setLastCreatedUser] = useState<{ accountId: string; email: string } | null>(null)
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>('')
  const { isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()
  
  // Check for expired licenses
  useLicenseCheck()

  useEffect(() => {
    // Fetch organizations from MongoDB
    const fetchOrganizations = async () => {
      try {
        console.log('Fetching organizations...')
        const response = await fetch('/api/organizations')
        console.log('Organizations response status:', response.status)
        
        if (response.ok) {
          const orgs = await response.json()
          console.log('Organizations fetched successfully:', orgs)
          setOrganizations(orgs)
        } else {
          const errorText = await response.text()
          console.error('Failed to fetch organizations:', response.status, errorText)
        }
      } catch (error) {
        console.error('Error fetching organizations:', error)
      }
    }

    // Fetch workspace users from MongoDB
    const fetchWorkspaceUsers = async () => {
      try {
        console.log('Fetching workspace users...')
        const response = await fetch('/api/workspace-users')
        console.log('Workspace users response status:', response.status)
        
        if (response.ok) {
          const users = await response.json()
          console.log('Workspace users fetched successfully:', users)
          setWorkspaceUsers(users)
        } else {
          const errorText = await response.text()
          console.error('Failed to fetch workspace users:', response.status, errorText)
        }
      } catch (error) {
        console.error('Error fetching workspace users:', error)
      }
    }

    fetchOrganizations()
    fetchWorkspaceUsers()
  }, [])

  const handleLogout = () => {
    logout()
  }

  const handleAddOrganization = async (newOrg: Omit<Organization, 'id' | 'createdAt' | 'licenseStatus'>) => {
    try {
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrg),
      })

      if (response.ok) {
        const org = await response.json()
        setOrganizations(prev => [...prev, org])
        setShowForm(false)
        
        // Show success notification
        setLastCreatedOrg({ id: org.id, name: org.name })
        setShowSuccess(true)
      } else {
        console.error('Failed to create organization')
      }
    } catch (error) {
      console.error('Error creating organization:', error)
    }
  }

  const handleAddUser = async (newUser: any) => {
    try {
      console.log('🚀 handleAddUser called with data:', newUser)
      console.log('🏢 Available organizations:', organizations.length)
      
      // Get the selected organization from the form data
      const selectedOrg = organizations.find(org => org.id === newUser.organizationId)
      if (!selectedOrg) {
        console.error('No organization selected or organization not found:', newUser.organizationId)
        alert('Please select a valid organization')
        return
      }

      console.log('Selected organization:', selectedOrg)

      // Prepare user data for organization user creation
      const userData = {
        ...newUser,
        organizationId: selectedOrg.id,
        organizationName: selectedOrg.name
      }

      console.log('Sending user data to API:', userData)

      console.log('📡 Sending API request to:', `/api/organization/${selectedOrg.name}/users`)
      console.log('📦 Request payload:', userData)

      const response = await fetch(`/api/organization/${selectedOrg.name}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      console.log('📡 API Response status:', response.status)
      console.log('📡 API Response headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok) {
        const user = await response.json()
        console.log('User created successfully:', user)
        
        // Refresh the workspace users list
        const fetchWorkspaceUsers = async () => {
          try {
            const response = await fetch('/api/workspace-users')
            if (response.ok) {
              const users = await response.json()
              setWorkspaceUsers(users)
            }
          } catch (error) {
            console.error('Error fetching workspace users:', error)
          }
        }
        await fetchWorkspaceUsers()
        
        setShowUserForm(false)
        
        // Show success notification
        setLastCreatedUser({ accountId: user.accountId || user._id, email: user.email })
        setShowSuccess(true)
        
        alert('User created successfully!')
      } else {
        let errorData
        try {
          errorData = await response.json()
        } catch (e) {
          errorData = { error: await response.text() }
        }
        console.error('❌ Failed to create organization user:', errorData)
        alert(`Failed to create user: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('❌ Error creating organization user:', error)
      alert(`Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    return `ORG_${timestamp}_${randomStr}`.toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Organizations</p>
                  <p className="text-2xl font-bold text-gray-900">{organizations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Organizations</p>
                  <p className="text-2xl font-bold text-gray-900">{organizations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {organizations.filter(org => {
                      const created = new Date(org.createdAt)
                      const now = new Date()
                      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Organizations</h2>
          <div className="flex space-x-3">
            <Button 
              onClick={() => {
                console.log('Add User button clicked')
                console.log('Organizations available:', organizations)
                if (organizations.length === 0) {
                  alert('Please create an organization first before adding users.')
                  return
                }
                console.log('Setting showUserForm to true')
                setShowUserForm(true)
              }}
              disabled={organizations.length === 0}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Organization
            </Button>
          </div>
        </div>

                 {/* Organizations List */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {organizations.map((org) => (
             <Card key={org.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(`/admin/organization/${org.id}`)}>
              <CardHeader>
                                 <div className="flex justify-between items-start">
                   <div>
                     <CardTitle className="text-lg">{org.name}</CardTitle>
                     <CardDescription>{org.industry}</CardDescription>
                   </div>
                   <div className="flex flex-col items-end space-y-1">
                                           <Badge 
                        variant={
                          (org.licenseStatus || 'active') === 'active' ? 'default' :
                          (org.licenseStatus || 'active') === 'suspended' ? 'destructive' :
                          (org.licenseStatus || 'active') === 'paused' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {(org.licenseStatus || 'active').toUpperCase()}
                      </Badge>
                     <Badge variant="secondary" className="text-xs">
                       {org.id}
                     </Badge>
                   </div>
                 </div>
              </CardHeader>
                             <CardContent>
                 <div className="space-y-2 text-sm">
                   <p><strong>Account ID:</strong> <span className="font-mono text-blue-600">{org.id}</span></p>
                   <p><strong>Email:</strong> {org.email}</p>
                   <p><strong>Phone:</strong> {org.phone}</p>
                   <p><strong>Employees:</strong> {org.employeeCount}</p>
                   <p><strong>Founded:</strong> {org.foundedYear}</p>
                   <p className="text-gray-600 text-xs">
                     Created: {new Date(org.createdAt).toLocaleDateString()}
                   </p>
                 </div>
               </CardContent>
            </Card>
          ))}
        </div>

        {organizations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations yet</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first organization.</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Organization
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

              {/* Organization Form Modal */}
        {showForm && (
          <OrganizationForm 
            onSubmit={handleAddOrganization}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* User Form Modal */}
        {showUserForm && (
          <div>
            <UserForm 
              onSubmit={handleAddUser}
              onCancel={() => {
                console.log('UserForm cancelled')
                setShowUserForm(false)
              }}
              currentUserCount={workspaceUsers.length}
              userLimit="1-100"
              organizations={organizations}
            />
            {/* Debug info */}
            <div style={{display: 'none'}}>
              <pre>Debug: Organizations count: {organizations.length}</pre>
              <pre>Debug: Organizations: {JSON.stringify(organizations, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {showSuccess && lastCreatedOrg && (
          <SuccessNotification
            organizationId={lastCreatedOrg.id}
            organizationName={lastCreatedOrg.name}
            onClose={() => setShowSuccess(false)}
          />
        )}

        {/* User Success Notification */}
        {showSuccess && lastCreatedUser && (
          <SuccessNotification
            organizationId={lastCreatedUser.accountId}
            organizationName={lastCreatedUser.email}
            onClose={() => setShowSuccess(false)}
          />
        )}
    </div>
  )
}
