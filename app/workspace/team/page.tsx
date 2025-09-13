'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  User,
  UserCheck,
  UserX,
  Building,
  Mail,
  Calendar
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import WorkspaceLayout from '@/components/workspace-layout'
import { UserForm } from '@/components/user-form'
import { TeamUser } from '@/lib/types'

interface WorkspaceUser {
  accountId: string
  email: string
  password: string
  organizationName: string
  plan: string
  createdAt: string
}

export default function WorkspaceTeamPage() {
  const [user, setUser] = useState<WorkspaceUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [teamUsers, setTeamUsers] = useState<TeamUser[]>([])
  const [showUserForm, setShowUserForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const router = useRouter()

  // Mock user limit - in real app this would come from organization data
  const userLimit = '1-100'

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('workspaceAuthenticated')
    const userData = localStorage.getItem('workspaceUser')
    
    if (auth === 'true' && userData) {
      const userObj = JSON.parse(userData)
      setUser(userObj)
      setIsAuthenticated(true)
      
      // Load existing team users from database
      const loadTeamUsers = async () => {
        try {
          const response = await fetch(`/api/team-users?organizationName=${encodeURIComponent(userObj.organizationName)}`)
          if (response.ok) {
            const users = await response.json()
            console.log('Loaded team users from database:', users)
            
            // Convert to TeamUser format
            const teamUsers: TeamUser[] = users.map((user: any) => ({
              _id: user._id,
              email: user.email,
              password: user.password,
              firstName: user.firstName || user.email.split('@')[0],
              lastName: user.lastName || 'User',
              role: user.role,
              department: user.department || 'General',
              position: user.position || 'Team Member',
              organizationId: user.organizationId,
              organizationName: user.organizationName,
              isActive: user.isActive,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            }))
            
            setTeamUsers(teamUsers)
          } else {
            console.error('Failed to load team users, using admin-only mode')
            // Fallback to admin user only
            const adminUser: TeamUser = {
              _id: 'admin-1',
              email: userObj.email,
              password: userObj.password,
              firstName: userObj.email.split('@')[0],
              lastName: 'Admin',
              role: 'admin',
              department: 'Administration',
              position: 'System Administrator',
              organizationId: userObj.accountId,
              organizationName: userObj.organizationName,
              isActive: true,
              createdAt: userObj.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
            setTeamUsers([adminUser])
          }
        } catch (error) {
          console.error('Error loading team users:', error)
          // Fallback to admin user only
          const adminUser: TeamUser = {
            _id: 'admin-1',
            email: userObj.email,
            password: userObj.password,
            firstName: userObj.email.split('@')[0],
            lastName: 'Admin',
            role: 'admin',
            department: 'Administration',
            position: 'System Administrator',
            organizationId: userObj.accountId,
            organizationName: userObj.organizationName,
            isActive: true,
            createdAt: userObj.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          setTeamUsers([adminUser])
        }
      }
      
      loadTeamUsers()
      setSelectedProducts([])
    } else {
      router.push('/workspace/login')
      return
    }
    
    setIsLoading(false)
  }, [router])

  const handleCreateUser = async (userData: any) => {
    try {
      console.log('Creating team user with data:', userData)
      
      // Sync to CRM first
      const crmResponse = await fetch('/api/sync-to-crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          role: userData.role || 'user'
        })
      })

      const crmResult = await crmResponse.json()
      
      if (!crmResult.success) {
        console.warn('CRM sync failed:', crmResult.error)
        // Continue with local user creation even if CRM sync fails
      } else {
        console.log('User successfully synced to CRM')
      }
      
      // Prepare user data for API
      const userPayload = {
        ...userData,
        organizationId: user?.accountId || '',
        organizationName: user?.organizationName || '',
      }
      
      console.log('Sending user data to team API:', userPayload)

      const response = await fetch('/api/team-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPayload),
      })

      if (response.ok) {
        const newUser = await response.json()
        console.log('Team user created successfully:', newUser)
        
        // Convert to TeamUser format for display
        const teamUser: TeamUser = {
          _id: newUser._id,
          email: newUser.email,
          password: newUser.password,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
          department: newUser.department || 'General',
          position: newUser.position || 'Team Member',
          organizationId: newUser.organizationId,
          organizationName: newUser.organizationName,
          isActive: newUser.isActive,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        }
        
        setTeamUsers(prev => [...prev, teamUser])
        setShowUserForm(false)
        alert('User created successfully in all databases!')
      } else {
        const errorData = await response.json()
        console.error('Failed to create team user:', errorData)
        alert(`Failed to create user: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error creating team user:', error)
      alert(`Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleDeleteUser = (userId: string) => {
    // Don't allow deleting the admin user
    if (userId === 'admin-1') {
      return
    }
    setTeamUsers(prev => prev.filter(user => user._id !== userId))
  }

  const handleToggleUserStatus = (userId: string) => {
    // Don't allow deactivating the admin user
    if (userId === 'admin-1') {
      return
    }
    setTeamUsers(prev => prev.map(user => 
      user._id === userId ? { ...user, isActive: !user.isActive } : user
    ))
  }

  const getUserLimitNumber = (limit: string) => {
    const parts = limit.split('-')
    return parseInt(parts[parts.length - 1])
  }

  const maxUsers = getUserLimitNumber(userLimit)
  const currentUserCount = teamUsers.length
  const canCreateUser = currentUserCount < maxUsers

  const filteredUsers = teamUsers.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && user.isActive) ||
                         (statusFilter === 'inactive' && !user.isActive)
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4 text-red-500" />
      case 'user':
        return <User className="w-4 h-4 text-blue-500" />
      case 'employee':
        return <UserCheck className="w-4 h-4 text-green-500" />
      default:
        return <User className="w-4 h-4 text-gray-500" />
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive'
      case 'user':
        return 'default'
      case 'employee':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <WorkspaceLayout user={user} selectedProducts={selectedProducts}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Team Management
          </h1>
          <p className="text-gray-600">
            Manage your organization's team members and their access.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Total Users</p>
                  <p className="text-xl font-bold text-gray-900">{currentUserCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Active Users</p>
                  <p className="text-xl font-bold text-gray-900">
                    {teamUsers.filter(u => u.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Admins</p>
                  <p className="text-xl font-bold text-gray-900">
                    {teamUsers.filter(u => u.role === 'admin').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">User Limit</p>
                  <p className="text-xl font-bold text-gray-900">{maxUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="employee">Employee</option>
              </select>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <Button 
              onClick={() => setShowUserForm(true)}
              disabled={!canCreateUser}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </Button>
          </div>
        </div>

        {/* User Limit Warning */}
        {!canCreateUser && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <UserX className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-sm text-yellow-800">
                You have reached your user limit ({currentUserCount}/{maxUsers}). 
                Please upgrade your plan to add more users.
              </p>
            </div>
          </div>
        )}

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage your organization's team members and their permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No users found matching your criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-3 font-medium text-gray-900">User</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-900">Role</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-900 hidden md:table-cell">Department</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-900 hidden sm:table-cell">Status</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-900 hidden lg:table-cell">Joined</th>
                      <th className="text-right py-3 px-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((teamUser) => (
                      <tr key={teamUser._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-medium text-gray-700">
                                {teamUser.firstName.charAt(0)}{teamUser.lastName.charAt(0)}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">
                                {teamUser.firstName} {teamUser.lastName}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{teamUser.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center space-x-2">
                            {getRoleIcon(teamUser.role)}
                            <Badge variant={getRoleBadgeVariant(teamUser.role)} className="text-xs">
                              {teamUser.role}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-3 hidden md:table-cell">
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate">{teamUser.department}</p>
                            <p className="text-xs text-gray-500 truncate">{teamUser.position}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3 hidden sm:table-cell">
                          <Badge variant={teamUser.isActive ? "default" : "secondary"} className="text-xs">
                            {teamUser.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 hidden lg:table-cell">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {new Date(teamUser.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                {teamUser._id !== 'admin-1' && (
                                  <>
                                    <DropdownMenuItem onClick={() => handleToggleUserStatus(teamUser._id!)}>
                                      {teamUser.isActive ? (
                                        <>
                                          <UserX className="w-4 h-4 mr-2" />
                                          Deactivate
                                        </>
                                      ) : (
                                        <>
                                          <UserCheck className="w-4 h-4 mr-2" />
                                          Activate
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleDeleteUser(teamUser._id!)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {teamUser._id === 'admin-1' && (
                                  <DropdownMenuItem disabled className="text-gray-400">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Admin User (Protected)
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* User Creation Form */}
      {showUserForm && (
        <UserForm
          onSubmit={handleCreateUser}
          onCancel={() => setShowUserForm(false)}
          currentUserCount={currentUserCount}
          userLimit={userLimit}
          organizations={user ? [{ id: user.accountId, name: user.organizationName }] : []}
        />
      )}
    </WorkspaceLayout>
  )
}
