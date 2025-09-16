'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Building2,
  Calendar, 
  Activity, 
  TrendingUp, 
  Users, 
  BarChart3,
  ExternalLink,
  ArrowRight,
  Shield,
  Clock,
  Database,
  Globe,
  Server,
  Zap,
  CheckCircle,
  AlertTriangle,
  PieChart,
  Download,
  Settings,
  Bell,
  FileText,
  CreditCard,
  Award,
  Search,
  Filter,
  RefreshCw,
  Eye,
  MessageSquare,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Trash2,
  Star,
  Target,
  Briefcase,
  DollarSign,
  TrendingDown,
  UserPlus,
  FileUp,
  Link,
  Share,
  Copy,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Heart,
  Bookmark,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react'
import WorkspaceLayout from '@/components/workspace-layout'
import { getProductsByIds, AVAILABLE_PRODUCTS } from '@/lib/products'

interface WorkspaceUser {
  accountId: string
  email: string
  password: string
  organizationName: string
  plan: string
  createdAt: string
}

export default function WorkspaceDashboardPage() {
  const [user, setUser] = useState<WorkspaceUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [profilePicture, setProfilePicture] = useState<string>('')
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', message: 'System backup completed successfully', time: '2 min ago', read: false },
    { id: 2, type: 'warning', message: 'Storage usage is at 85%', time: '1 hour ago', read: false },
    { id: 3, type: 'info', message: 'New team member invitation sent', time: '3 hours ago', read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [recentProjects] = useState([
    { id: 1, name: 'E-commerce Platform', status: 'Active', progress: 78, lastActivity: '2 hours ago' },
    { id: 2, name: 'Mobile App Development', status: 'In Progress', progress: 45, lastActivity: '5 hours ago' },
    { id: 3, name: 'Data Analytics Dashboard', status: 'Completed', progress: 100, lastActivity: '1 day ago' },
  ])
  const [tasks] = useState([
    { id: 1, title: 'Review quarterly reports', priority: 'High', dueDate: '2025-09-18', completed: false },
    { id: 2, title: 'Update team permissions', priority: 'Medium', dueDate: '2025-09-20', completed: false },
    { id: 3, title: 'Schedule client meeting', priority: 'Low', dueDate: '2025-09-22', completed: true },
  ])
  const router = useRouter()

  // Default profile pictures
  const defaultProfilePictures = [
    '/placeholder-logo.svg',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b2e7c24b?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  ]

  // Handle profile picture change
  const handleProfilePictureChange = (newPicture: string) => {
    setProfilePicture(newPicture)
    localStorage.setItem('workspaceProfilePicture', newPicture)
    setShowProfileDialog(false)
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        handleProfilePictureChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('workspaceAuthenticated')
    const userData = localStorage.getItem('workspaceUser')
    const savedProfilePicture = localStorage.getItem('workspaceProfilePicture')
    
    if (auth === 'true' && userData) {
      const userObj = JSON.parse(userData)
      setUser(userObj)
      setIsAuthenticated(true)
      
      // Load saved profile picture or use default
      if (savedProfilePicture) {
        setProfilePicture(savedProfilePicture)
      } else {
        setProfilePicture(defaultProfilePictures[0])
      }
      
      // For now, set all products as selected (default behavior)
      setSelectedProducts(AVAILABLE_PRODUCTS)
    } else {
      router.push('/workspace/login')
      return
    }
    
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-slate-600 font-medium animate-pulse">Loading your workspace...</p>
          <p className="mt-2 text-sm text-slate-500">Please wait while we prepare your dashboard</p>
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
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer group">
                    <Avatar className="h-16 w-16 border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow">
                      <AvatarImage src={profilePicture} alt={user.organizationName} className="object-cover" />
                      <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        {user.organizationName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Choose Profile Picture</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Default Pictures */}
                    <div>
                      <h3 className="font-medium text-slate-700 mb-3">Select from defaults</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {defaultProfilePictures.map((pic, index) => (
                          <div
                            key={index}
                            className={`relative cursor-pointer rounded-full overflow-hidden border-4 transition-all hover:scale-110 ${
                              profilePicture === pic ? 'border-blue-500 shadow-lg' : 'border-slate-200 hover:border-slate-300'
                            }`}
                            onClick={() => handleProfilePictureChange(pic)}
                          >
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={pic} alt={`Option ${index + 1}`} className="object-cover" />
                              <AvatarFallback className="bg-gradient-to-br from-slate-400 to-slate-600 text-white">
                                {index + 1}
                              </AvatarFallback>
                            </Avatar>
                            {profilePicture === pic && (
                              <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-blue-600" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Upload Custom Picture */}
                    <div className="pt-4 border-t">
                      <h3 className="font-medium text-slate-700 mb-3">Upload custom picture</h3>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">
                  Welcome back, {user.organizationName}
                </h1>
                <p className="text-slate-600 text-lg">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    <Shield className="w-4 h-4 mr-2" />
                    {user.plan} Plan
                  </Badge>
                  <Badge variant="default" className="text-sm px-3 py-1 bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Active
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64 bg-white/70 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="relative bg-white/70 backdrop-blur-sm hover:bg-white/90"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-4 h-4" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b hover:bg-slate-50 transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-green-500' : 
                              notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-900">{notification.message}</p>
                              <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Button variant="outline" className="bg-white/70 backdrop-blur-sm hover:bg-white/90">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Total Products</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">{selectedProducts.length}</p>
                  <p className="text-sm text-slate-500 mt-1">Active subscriptions</p>
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Revenue</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2 group-hover:text-green-600 transition-colors">$12,847</p>
                  <p className="text-sm text-slate-500 mt-1">This month</p>
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.5% from last month
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Active Users</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2 group-hover:text-purple-600 transition-colors">1,247</p>
                  <p className="text-sm text-slate-500 mt-1">Online now</p>
                </div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +23% from yesterday
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Conversion Rate</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2 group-hover:text-orange-600 transition-colors">3.2%</p>
                  <p className="text-sm text-slate-500 mt-1">This quarter</p>
                </div>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-red-600">
                <TrendingDown className="w-4 h-4 mr-1" />
                -2.1% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-fit bg-white/80 backdrop-blur-sm border shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Projects</TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Tasks</TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Products</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Analytics</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced System Performance */}
              <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-blue-600" />
                      System Performance
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Live
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Server className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">Server Load</span>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="relative">
                      <Progress value={45} className="h-3" />
                    </div>
                    <p className="text-xs text-slate-500">Optimal performance range</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Database className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">Database Usage</span>
                      </div>
                      <span className="text-sm font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-3" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">Network Traffic</span>
                      </div>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <Progress value={82} className="h-3" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Zap className="w-5 h-5 text-slate-600" />
                        <span className="font-medium">API Response Time</span>
                      </div>
                      <span className="text-sm font-medium">156ms</span>
                    </div>
                    <Progress value={25} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Quick Actions */}
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 group" variant="default">
                    <Plus className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform" />
                    New Project
                  </Button>
                  <Button className="w-full justify-start hover:bg-slate-50 transition-colors" variant="outline">
                    <UserPlus className="w-4 h-4 mr-3" />
                    Invite Team Member
                  </Button>
                  <Button className="w-full justify-start hover:bg-slate-50 transition-colors" variant="outline">
                    <FileText className="w-4 h-4 mr-3" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start hover:bg-slate-50 transition-colors" variant="outline">
                    <Settings className="w-4 h-4 mr-3" />
                    Workspace Settings
                  </Button>
                  <Button className="w-full justify-start hover:bg-slate-50 transition-colors" variant="outline">
                    <CreditCard className="w-4 h-4 mr-3" />
                    Billing & Usage
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Recent Projects</h2>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {recentProjects.map((project, index) => (
                <Card key={project.id} className={`hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 ${
                  project.status === 'Active' ? 'border-l-green-500' : 
                  project.status === 'In Progress' ? 'border-l-blue-500' : 'border-l-gray-500'
                } animate-in slide-in-from-bottom-4`}
                style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant={project.status === 'Active' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Last activity: {project.lastActivity}</span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Your Tasks</h2>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <div key={task.id} className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 hover:bg-slate-50 animate-in slide-in-from-left-2 ${
                      task.completed ? 'opacity-60' : ''
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        task.completed ? 'bg-green-500 border-green-500' : 'border-slate-300 hover:border-blue-500'
                      } transition-colors cursor-pointer`}>
                        {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      
                      <div className="flex-1">
                        <p className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant={
                            task.priority === 'High' ? 'destructive' :
                            task.priority === 'Medium' ? 'secondary' : 'outline'
                          } className="text-xs">
                            {task.priority}
                          </Badge>
                          <span className="text-sm text-slate-500 flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {task.dueDate}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {selectedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-white to-slate-50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-14 h-14 ${product.color} rounded-2xl flex items-center justify-center text-xl font-semibold text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                          {product.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">{product.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs mt-1 bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(product.url, '_blank')}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-50"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">99.9%</div>
                        <div className="text-xs text-slate-600">Uptime</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">Fast</div>
                        <div className="text-xs text-slate-600">Response</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm text-slate-500">Status: Online</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Last accessed</p>
                        <p className="text-sm font-medium text-slate-600">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 space-y-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200" 
                        onClick={() => window.open(product.url, '_blank')}
                      >
                        Launch Application
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Usage Statistics
                  </CardTitle>
                  <CardDescription>Your workspace activity over the past 30 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Calls</span>
                      <span className="text-2xl font-bold text-blue-600">12,847</span>
                    </div>
                    <Progress value={78} className="h-3" />
                    <p className="text-xs text-slate-500">78% of monthly limit</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Storage Used</span>
                      <span className="text-2xl font-bold text-green-600">2.4 GB</span>
                    </div>
                    <Progress value={48} className="h-3" />
                    <p className="text-xs text-slate-500">48% of 5GB limit</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Bandwidth</span>
                      <span className="text-2xl font-bold text-purple-600">156 GB</span>
                    </div>
                    <Progress value={31} className="h-3" />
                    <p className="text-xs text-slate-500">31% of monthly limit</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <div className="text-2xl font-bold text-blue-600">99.2%</div>
                      <div className="text-sm text-slate-600">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                      <div className="text-2xl font-bold text-green-600">142ms</div>
                      <div className="text-sm text-slate-600">Avg Response</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                      <div className="text-2xl font-bold text-purple-600">1,247</div>
                      <div className="text-sm text-slate-600">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                      <div className="text-2xl font-bold text-orange-600">0.01%</div>
                      <div className="text-sm text-slate-600">Error Rate</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" variant="default">
                      <Download className="w-4 h-4 mr-2" />
                      Download Full Report
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Share className="w-4 h-4 mr-2" />
                      Share Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-600" />
                  Recent Activity Feed
                </CardTitle>
                <CardDescription>Latest events and system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white rounded-r-lg hover:shadow-md transition-shadow">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">System Health Check Completed</p>
                      <p className="text-sm text-slate-600">All services are running normally with optimal performance</p>
                      <p className="text-xs text-slate-500 mt-2 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        2 hours ago
                      </p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">Success</Badge>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white rounded-r-lg hover:shadow-md transition-shadow">
                    <UserPlus className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">New Team Member Added</p>
                      <p className="text-sm text-slate-600">John Doe has been added to your workspace with admin privileges</p>
                      <p className="text-xs text-slate-500 mt-2 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        6 hours ago
                      </p>
                    </div>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">Team</Badge>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white rounded-r-lg hover:shadow-md transition-shadow">
                    <FileText className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Monthly Report Generated</p>
                      <p className="text-sm text-slate-600">Performance analytics report is ready for download</p>
                      <p className="text-xs text-slate-500 mt-2 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        1 day ago
                      </p>
                    </div>
                    <Badge variant="outline" className="text-purple-600 border-purple-200">Report</Badge>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white rounded-r-lg hover:shadow-md transition-shadow">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Storage Warning</p>
                      <p className="text-sm text-slate-600">You're approaching 80% of your storage limit. Consider upgrading your plan.</p>
                      <p className="text-xs text-slate-500 mt-2 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        2 days ago
                      </p>
                    </div>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-200">Warning</Badge>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white rounded-r-lg hover:shadow-md transition-shadow">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Security Certificate Renewed</p>
                      <p className="text-sm text-slate-600">SSL certificate has been automatically renewed and is valid for another year</p>
                      <p className="text-xs text-slate-500 mt-2 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        3 days ago
                      </p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-200">Security</Badge>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline" className="w-full hover:bg-slate-50 transition-colors">
                    <Clock className="w-4 h-4 mr-2" />
                    View Complete Activity Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Enhanced Bottom Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <PieChart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Resource Efficiency</p>
                  <p className="text-3xl font-bold text-slate-900">94.2%</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2.1% from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Security Score</p>
                  <p className="text-3xl font-bold text-slate-900">A+</p>
                  <p className="text-sm text-green-600">Excellent security posture</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Client Satisfaction</p>
                  <p className="text-3xl font-bold text-slate-900">4.9/5</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Based on 847 reviews
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WorkspaceLayout>
  )
}
