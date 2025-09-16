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
  Calendar,
  ArrowLeft,
  Activity,
  Clock,
  TrendingUp,
  Award,
  Settings,
  Download,
  Upload,
  Eye,
  Star,
  MapPin,
  Phone,
  Briefcase
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs'
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
      <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-400 rounded-full animate-spin absolute top-2 left-2"></div>
          </div>
          <p className="mt-6 text-slate-600 font-medium animate-pulse">Loading team members...</p>
          <p className="mt-2 text-sm text-slate-500">Setting up your team management workspace</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <WorkspaceLayout user={user} selectedProducts={selectedProducts}>
      <div className="max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => router.push('/workspace/dashboard')}
                  className="flex items-center space-x-2 hover:bg-white/70 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </Button>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Team Management Center
              </h1>
              <p className="text-slate-600 text-lg">
                Manage your organization's team members, roles, and access permissions with comprehensive analytics.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Team</span>
              </Button>
              <Button 
                onClick={() => setShowUserForm(true)}
                disabled={!canCreateUser}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Members</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{currentUserCount}</p>
                  <p className="text-sm text-slate-500 mt-1">of {maxUsers} allowed</p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={(currentUserCount / maxUsers) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Active Members</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {teamUsers.filter(u => u.isActive).length}
                  </p>
                  <p className="text-sm text-green-600 mt-1">Currently online</p>
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Administrators</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {teamUsers.filter(u => u.role === 'admin').length}
                  </p>
                  <p className="text-sm text-red-600 mt-1">System access</p>
                </div>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Departments</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {new Set(teamUsers.map(u => u.department)).size}
                  </p>
                  <p className="text-sm text-purple-600 mt-1">Different teams</p>
                </div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search by name, email, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full lg:w-40 h-12">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-40 h-12">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* User Limit Warning - Enhanced */}
        {!canCreateUser && (
          <Card className="border-l-4 border-l-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserX className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">User Limit Reached</h3>
                  <p className="text-yellow-800 mb-3">
                    You have reached your user limit ({currentUserCount}/{maxUsers}). 
                    Upgrade your plan to add more team members and unlock advanced features.
                  </p>
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Team Members Section */}
        <Tabs defaultValue="grid" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full grid-cols-2 lg:w-fit">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                Showing {filteredUsers.length} of {teamUsers.length} members
              </span>
            </div>
          </div>

          <TabsContent value="grid" className="space-y-6">
            {filteredUsers.length === 0 ? (
              <Card>
                <CardContent className="p-12">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No team members found</h3>
                    <p className="text-slate-500 mb-6">
                      {teamUsers.length === 0 
                        ? "Start building your team by adding your first member."
                        : "Try adjusting your search or filter criteria."
                      }
                    </p>
                    {canCreateUser && (
                      <Button onClick={() => setShowUserForm(true)}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add First Team Member
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUsers.map((teamUser) => (
                  <Card key={teamUser._id} className="hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16 group-hover:scale-110 transition-transform">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${teamUser.firstName}${teamUser.lastName}`} />
                            <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {teamUser.firstName.charAt(0)}{teamUser.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900 truncate text-lg">
                              {teamUser.firstName} {teamUser.lastName}
                            </h3>
                            <p className="text-slate-600 truncate">{teamUser.email}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              {getRoleIcon(teamUser.role)}
                              <Badge variant={getRoleBadgeVariant(teamUser.role)} className="text-xs">
                                {teamUser.role}
                              </Badge>
                              <Badge variant={teamUser.isActive ? "default" : "secondary"} className="text-xs">
                                {teamUser.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
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
                                Protected User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-slate-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span>{teamUser.position}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Building className="w-4 h-4 mr-2" />
                          <span>{teamUser.department}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Joined {new Date(teamUser.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                          <span>Activity Level</span>
                          <span>{teamUser.isActive ? '85%' : '0%'}</span>
                        </div>
                        <Progress value={teamUser.isActive ? 85 : 0} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="table" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Team Members Directory
                </CardTitle>
                <CardDescription>
                  Comprehensive view of all team members with detailed information and management options.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500">No users found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-4 px-4 font-semibold text-slate-900">Member</th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-900">Role & Status</th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-900 hidden md:table-cell">Department</th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-900 hidden lg:table-cell">Joined Date</th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-900 hidden xl:table-cell">Activity</th>
                          <th className="text-right py-4 px-4 font-semibold text-slate-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((teamUser, index) => (
                          <tr key={teamUser._id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-4">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${teamUser.firstName}${teamUser.lastName}`} />
                                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                                    {teamUser.firstName.charAt(0)}{teamUser.lastName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-slate-900 truncate">
                                    {teamUser.firstName} {teamUser.lastName}
                                  </p>
                                  <p className="text-sm text-slate-500 truncate flex items-center">
                                    <Mail className="w-3 h-3 mr-1" />
                                    {teamUser.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  {getRoleIcon(teamUser.role)}
                                  <Badge variant={getRoleBadgeVariant(teamUser.role)} className="text-xs font-medium">
                                    {teamUser.role}
                                  </Badge>
                                </div>
                                <Badge variant={teamUser.isActive ? "default" : "secondary"} className="text-xs">
                                  {teamUser.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </div>
                            </td>
                            <td className="py-4 px-4 hidden md:table-cell">
                              <div>
                                <p className="font-medium text-slate-900 truncate">{teamUser.department}</p>
                                <p className="text-sm text-slate-500 truncate flex items-center mt-1">
                                  <Briefcase className="w-3 h-3 mr-1" />
                                  {teamUser.position}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-4 hidden lg:table-cell">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-600">
                                  {new Date(teamUser.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4 hidden xl:table-cell">
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${teamUser.isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                                <span className="text-sm text-slate-600">
                                  {teamUser.isActive ? 'Online' : 'Offline'}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex justify-end">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="hover:bg-slate-200">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="w-4 h-4 mr-2" />
                                      Edit User
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
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
                                      <DropdownMenuItem disabled className="text-slate-400">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Protected User
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
          </TabsContent>
        </Tabs>
      </div>

      {/* User Creation Form - Enhanced */}
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
