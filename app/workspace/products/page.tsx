'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ExternalLink, 
  Settings, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  Users,
  Shield,
  UserPlus,
  UserMinus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  Activity,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Info,
  DollarSign,
  Clock,
  Zap,
  Database,
  Globe,
  Server,
  BarChart3,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react'
import WorkspaceLayout from '@/components/workspace-layout'
import { AVAILABLE_PRODUCTS } from '@/lib/products'

interface WorkspaceUser {
  accountId: string
  email: string
  password: string
  organizationName: string
  plan: string
  createdAt: string
}

interface ProductAccess {
  productId: string
  userId: string
  userEmail: string
  userName: string
  role: 'admin' | 'user' | 'viewer'
  permissions: string[]
  grantedAt: string
  grantedBy: string
  status: 'active' | 'suspended' | 'pending'
}

interface ProductUsage {
  productId: string
  totalUsers: number
  activeUsers: number
  lastActivity: string
  apiCalls: number
  storageUsed: number
  monthlyLimit: number
  usagePercentage: number
}

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic'

export default function WorkspaceProductsPage() {
  const [user, setUser] = useState<WorkspaceUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [productAccess, setProductAccess] = useState<ProductAccess[]>([])
  const [productUsage, setProductUsage] = useState<ProductUsage[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [showUserManagement, setShowUserManagement] = useState(false)
  const [teamMembers, setTeamMembers] = useState<any[]>([])
  const [isLoadingTeamMembers, setIsLoadingTeamMembers] = useState(false)
  const router = useRouter()

  // Function to fetch team members from database
  const fetchTeamMembers = async (organizationName: string) => {
    setIsLoadingTeamMembers(true)
    try {
      const response = await fetch(`/api/team-members?organization=${encodeURIComponent(organizationName)}`)
      if (response.ok) {
        const users = await response.json()
        setTeamMembers(users)
      } else {
        console.error('Failed to fetch team members')
        // Fallback to empty array if database fails
        setTeamMembers([])
      }
    } catch (error) {
      console.error('Error fetching team members:', error)
      // Fallback to empty array if database fails
      setTeamMembers([])
    } finally {
      setIsLoadingTeamMembers(false)
    }
  }

  // Initialize real product data
  const realProductsData = [
    {
      ...AVAILABLE_PRODUCTS[0],
      category: 'Customer Support',
      features: ['AI-Powered Chat', '24/7 Support', 'Multi-language', 'Analytics Dashboard'],
      requirements: ['Internet Connection', 'Modern Browser'],
      uptime: '99.9%',
      lastUpdate: '2024-09-15'
    },
    {
      ...AVAILABLE_PRODUCTS[1],
      category: 'Sales & Marketing',
      features: ['Contact Management', 'Sales Pipeline', 'Email Integration', 'Reporting'],
      requirements: ['CRM Integration', 'Email Account'],
      uptime: '99.8%',
      lastUpdate: '2024-09-14'
    },
    {
      ...AVAILABLE_PRODUCTS[2],
      category: 'Analytics',
      features: ['Advanced Analytics', 'Real-time Data', 'Custom Reports', 'API Access'],
      requirements: ['Data Sources', 'API Keys'],
      uptime: '99.7%',
      lastUpdate: '2024-09-13'
    },
    {
      ...AVAILABLE_PRODUCTS[3],
      category: 'Finance',
      features: ['Automated Billing', 'Payment Processing', 'Tax Management', 'Invoicing'],
      requirements: ['Payment Gateway', 'Bank Account'],
      uptime: '99.9%',
      lastUpdate: '2024-09-12'
    }
  ]

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('workspaceAuthenticated')
    const userData = localStorage.getItem('workspaceUser')
    
    if (auth === 'true' && userData) {
      const userObj = JSON.parse(userData)
      setUser(userObj)
      setIsAuthenticated(true)
      
      // Load selected products from localStorage or default to all
      const savedProducts = localStorage.getItem('selectedProducts')
      if (savedProducts) {
        setSelectedProducts(JSON.parse(savedProducts))
      } else {
        setSelectedProducts(AVAILABLE_PRODUCTS.map(p => p.id))
      }

      // Initialize mock data for product usage
      setProductUsage([
        {
          productId: 'ava-cx-chatbot',
          totalUsers: 24,
          activeUsers: 18,
          lastActivity: '2 minutes ago',
          apiCalls: 15847,
          storageUsed: 2.4,
          monthlyLimit: 50000,
          usagePercentage: 31.7
        },
        {
          productId: 'ava-crm',
          totalUsers: 31,
          activeUsers: 24,
          lastActivity: '5 minutes ago',
          apiCalls: 8934,
          storageUsed: 4.2,
          monthlyLimit: 25000,
          usagePercentage: 35.7
        },
        {
          productId: 'ava-pingora',
          totalUsers: 12,
          activeUsers: 9,
          lastActivity: '1 hour ago',
          apiCalls: 5623,
          storageUsed: 1.8,
          monthlyLimit: 15000,
          usagePercentage: 37.5
        },
        {
          productId: 'ava-billing',
          totalUsers: 8,
          activeUsers: 6,
          lastActivity: '3 hours ago',
          apiCalls: 3456,
          storageUsed: 1.2,
          monthlyLimit: 10000,
          usagePercentage: 34.6
        }
      ])

      // Initialize mock product access data
      setProductAccess([
        {
          productId: 'ava-cx-chatbot',
          userId: '1',
          userEmail: 'john.smith@company.com',
          userName: 'John Smith',
          role: 'admin',
          permissions: ['read', 'write', 'manage', 'analytics'],
          grantedAt: '2024-01-15',
          grantedBy: 'system',
          status: 'active'
        },
        {
          productId: 'ava-crm',
          userId: '2',
          userEmail: 'sarah.johnson@company.com',
          userName: 'Sarah Johnson',
          role: 'user',
          permissions: ['read', 'write'],
          grantedAt: '2024-02-20',
          grantedBy: 'admin',
          status: 'active'
        }
      ])

      // Fetch team members from database (non-blocking)
      fetchTeamMembers(userObj.organizationName)
      
      // Set loading to false immediately since core authentication is done
      setIsLoading(false)
    } else {
      router.push('/workspace/login')
      return
    }
  }, [router])

  const handleProductToggle = (productId: string) => {
    const newSelectedProducts = selectedProducts.includes(productId)
      ? selectedProducts.filter(id => id !== productId)
      : [...selectedProducts, productId]
    
    setSelectedProducts(newSelectedProducts)
    localStorage.setItem('selectedProducts', JSON.stringify(newSelectedProducts))
  }

  const getProductUsageById = (productId: string) => {
    return productUsage.find(usage => usage.productId === productId)
  }

  const getProductAccessCount = (productId: string) => {
    return productAccess.filter(access => access.productId === productId && access.status === 'active').length
  }

  const handleUserPermissionChange = (productId: string, userId: string, newRole: string) => {
    setProductAccess(prev => 
      prev.map(access => 
        access.productId === productId && access.userId === userId 
          ? { ...access, role: newRole as 'admin' | 'user' | 'viewer' }
          : access
      )
    )
  }

  const filteredProducts = realProductsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && selectedProducts.includes(product.id)) ||
                         (filterStatus === 'inactive' && !selectedProducts.includes(product.id))
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-slate-600 font-medium animate-pulse">Loading workspace...</p>
          <p className="mt-2 text-sm text-slate-500">Setting up products and team members</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <WorkspaceLayout user={user} selectedProducts={AVAILABLE_PRODUCTS.filter(p => selectedProducts.includes(p.id))}>
      <div className="max-w-7xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
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
                Product Management Center
              </h1>
              <p className="text-slate-600 text-lg">
                Manage your organization's product subscriptions, user access, and monitor usage analytics.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Products</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{realProductsData.length}</p>
                  <p className="text-sm text-slate-500 mt-1">Available solutions</p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Active Products</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{selectedProducts.length}</p>
                  <p className="text-sm text-green-600 mt-1">Currently enabled</p>
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Users</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{teamMembers.length}</p>
                  <p className="text-sm text-purple-600 mt-1">Team members</p>
                </div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Team Members</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{teamMembers.length}</p>
                  <p className="text-sm text-purple-600 mt-1">Active users</p>
                </div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="inactive">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setSelectedProducts([])}
              size="sm"
            >
              Disable All
            </Button>
            <Button 
              onClick={() => setSelectedProducts(realProductsData.map(p => p.id))}
              size="sm"
            >
              Enable All
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => {
                const isActive = selectedProducts.includes(product.id)
                const usage = getProductUsageById(product.id)
                const accessCount = getProductAccessCount(product.id)
                
                return (
                  <Card key={product.id} 
                    className={`transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      isActive ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-white' : 'hover:shadow-lg'
                    } animate-in slide-in-from-bottom-4`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-14 h-14 ${product.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                            {product.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={isActive ? "default" : "secondary"}>
                                {isActive ? 'Active' : 'Inactive'}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={isActive}
                          onCheckedChange={() => handleProductToggle(product.id)}
                        />
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <CardDescription className="text-slate-600 leading-relaxed">
                        {product.description}
                      </CardDescription>

                      {/* Product Features */}
                      <div>
                        <p className="text-sm font-medium text-slate-700 mb-2">Key Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {product.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Usage Stats */}
                      {isActive && usage && (
                        <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Active Users</span>
                            <span className="font-medium">{usage.activeUsers}/{usage.totalUsers}</span>
                          </div>
                          <Progress value={(usage.activeUsers / usage.totalUsers) * 100} className="h-2" />
                          <p className="text-xs text-slate-500">Last activity: {usage.lastActivity}</p>
                        </div>
                      )}

                      {/* Product Status and Actions */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          <p className="text-sm font-medium text-green-600">✓ Available</p>
                          <p className="text-xs text-slate-500">Uptime: {product.uptime}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(product)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center space-x-3">
                                  <div className={`w-10 h-10 ${product.color} rounded-lg flex items-center justify-center text-lg`}>
                                    {product.icon}
                                  </div>
                                  <span>{product.name} Details</span>
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div>
                                  <h4 className="font-semibold mb-2">Description</h4>
                                  <p className="text-slate-600">{product.description}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Features</h4>
                                    <ul className="space-y-1 text-sm text-slate-600">
                                      {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center">
                                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold mb-2">Requirements</h4>
                                    <ul className="space-y-1 text-sm text-slate-600">
                                      {product.requirements.map((req, idx) => (
                                        <li key={idx} className="flex items-center">
                                          <Info className="w-4 h-4 text-blue-500 mr-2" />
                                          {req}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>Status:</span>
                                    <span className="text-green-600 font-medium">✓ Active</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Uptime:</span>
                                    <span className="text-green-600">{product.uptime}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span>Last Updated:</span>
                                    <span>{product.lastUpdate}</span>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(product.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Team Members & Product Access
                </CardTitle>
                <CardDescription>
                  Manage which team members have access to which products and their permission levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                {teamMembers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">No team members found</p>
                    <p className="text-sm text-slate-500">
                      Team members will appear here once they are added to your organization
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {teamMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-slate-600">{member.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary">{member.role}</Badge>
                              <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                                {member.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right text-sm text-slate-500">
                          <p>Joined: {member.joinedAt}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-3">Product Access:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {realProductsData.map((product) => {
                            const access = productAccess.find(a => a.productId === product.id && a.userId === member.id)
                            const hasAccess = selectedProducts.includes(product.id) && access
                            
                            return (
                              <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 ${product.color} rounded-lg flex items-center justify-center text-sm`}>
                                    {product.icon}
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{product.name}</p>
                                    <p className="text-xs text-slate-500">{product.category}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  {hasAccess ? (
                                    <Select 
                                      value={access?.role || 'viewer'} 
                                      onValueChange={(value) => handleUserPermissionChange(product.id, member.id, value)}
                                    >
                                      <SelectTrigger className="w-24 h-8 text-xs">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="viewer">Viewer</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <Badge variant="outline" className="text-xs">
                                      No Access
                                    </Badge>
                                  )}
                                  
                                  <Button variant="ghost" size="sm">
                                    {hasAccess ? <Lock className="w-4 h-4 text-green-600" /> : <Unlock className="w-4 h-4 text-slate-400" />}
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedProducts.map((productId) => {
                const product = realProductsData.find(p => p.id === productId)
                const usage = getProductUsageById(productId)
                
                if (!product || !usage) return null
                
                return (
                  <Card key={productId} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${product.color} rounded-lg flex items-center justify-center text-lg`}>
                          {product.icon}
                        </div>
                        <span>{product.name} Analytics</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{usage.activeUsers}</div>
                          <div className="text-sm text-slate-600">Active Users</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{usage.apiCalls.toLocaleString()}</div>
                          <div className="text-sm text-slate-600">API Calls</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Monthly Usage</span>
                          <span>{usage.usagePercentage}%</span>
                        </div>
                        <Progress value={usage.usagePercentage} className="h-3" />
                        <p className="text-xs text-slate-500">
                          {usage.apiCalls.toLocaleString()} of {usage.monthlyLimit.toLocaleString()} calls used
                        </p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Storage Used:</span>
                          <span>{usage.storageUsed} GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Activity:</span>
                          <span className="text-green-600">{usage.lastActivity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </WorkspaceLayout>
  )
}
