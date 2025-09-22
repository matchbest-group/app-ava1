'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import WorkspaceLayout from '@/components/workspace-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  Calendar,
  Download,
  Filter,
  Search,
  RefreshCw,
  FileText,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  DollarSign,
  Clock,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Eye,
  MessageSquare
} from 'lucide-react'

interface User {
  name: string
  email: string
  accountId: string
  organizationName: string
  plan: string
  createdAt: string
}

interface ReportData {
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
  totalRevenue: number
  monthlyGrowth: number
  productUsage: {
    name: string
    users: number
    percentage: number
    trend: 'up' | 'down'
  }[]
  activityData: {
    date: string
    users: number
    sessions: number
    revenue: number
  }[]
  userEngagement: {
    metric: string
    value: number
    change: number
    trend: 'up' | 'down'
  }[]
}

export default function WorkspaceReportsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('workspaceAuthenticated')
    const userData = localStorage.getItem('workspaceUser')
    
    if (auth === 'true' && userData) {
      try {
        const userObj = JSON.parse(userData)
        setUser(userObj)
        setIsAuthenticated(true)
        loadReportData(userObj.organizationName)
      } catch (error) {
        console.error('Error parsing user data:', error)
        router.push('/workspace/login')
        return
      }
    } else {
      router.push('/workspace/login')
      return
    }
    
    setIsLoading(false)
  }, [router])

  const loadReportData = async (organizationName: string) => {
    setIsRefreshing(true)
    try {
      // Simulate API call - in real app, this would fetch from backend
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate realistic mock data based on organization
      const mockData: ReportData = {
        totalUsers: 156,
        activeUsers: 89,
        newUsersThisMonth: 23,
        totalRevenue: 45780,
        monthlyGrowth: 12.5,
        productUsage: [
          { name: 'AVA CX', users: 67, percentage: 43, trend: 'up' },
          { name: 'AVA Flow', users: 54, percentage: 35, trend: 'up' },
          { name: 'AVA SmartBill', users: 34, percentage: 22, trend: 'down' },
          { name: 'AVA Pingora', users: 28, percentage: 18, trend: 'up' },
          { name: 'AVA HumanTL', users: 19, percentage: 12, trend: 'up' }
        ],
        activityData: [
          { date: '2024-01-01', users: 45, sessions: 123, revenue: 2340 },
          { date: '2024-01-02', users: 52, sessions: 145, revenue: 2890 },
          { date: '2024-01-03', users: 48, sessions: 134, revenue: 2670 },
          { date: '2024-01-04', users: 61, sessions: 167, revenue: 3120 },
          { date: '2024-01-05', users: 58, sessions: 156, revenue: 2980 },
          { date: '2024-01-06', users: 65, sessions: 178, revenue: 3450 },
          { date: '2024-01-07', users: 71, sessions: 189, revenue: 3780 }
        ],
        userEngagement: [
          { metric: 'Average Session Duration', value: 24.5, change: 8.2, trend: 'up' },
          { metric: 'Daily Active Users', value: 89, change: -3.1, trend: 'down' },
          { metric: 'Feature Adoption Rate', value: 76.8, change: 15.4, trend: 'up' },
          { metric: 'Customer Satisfaction', value: 4.6, change: 0.3, trend: 'up' }
        ]
      }
      
      setReportData(mockData)
    } catch (error) {
      console.error('Error loading report data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleRefreshData = () => {
    if (user) {
      loadReportData(user.organizationName)
    }
  }

  const handleExportReport = () => {
    // In real app, this would generate and download report
    alert('Report export functionality will be implemented soon!')
  }

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-slate-600 font-medium animate-pulse">Loading reports...</p>
          <p className="mt-2 text-sm text-slate-500">Generating analytics and insights</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user || !reportData) {
    return null
  }

  return (
    <WorkspaceLayout user={user} selectedProducts={selectedProducts}>
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="mt-2 text-gray-600">
                  Comprehensive insights into your workspace performance and user activity
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 3 months</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  onClick={handleRefreshData}
                  disabled={isRefreshing}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </Button>
                
                <Button onClick={handleExportReport} className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{reportData.totalUsers}</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{reportData.monthlyGrowth}%</span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-3xl font-bold text-gray-900">{reportData.activeUsers}</p>
                    <div className="flex items-center mt-2">
                      <Activity className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">
                        {Math.round((reportData.activeUsers / reportData.totalUsers) * 100)}% engagement
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New This Month</p>
                    <p className="text-3xl font-bold text-gray-900">{reportData.newUsersThisMonth}</p>
                    <div className="flex items-center mt-2">
                      <UserPlus className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-blue-600 font-medium">Growing steadily</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <UserPlus className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">₹{reportData.totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">+{reportData.monthlyGrowth}%</span>
                      <span className="text-sm text-gray-500 ml-1">growth</span>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Product Usage</TabsTrigger>
              <TabsTrigger value="engagement">User Engagement</TabsTrigger>
              <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product Usage Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5" />
                      <span>Product Usage Distribution</span>
                    </CardTitle>
                    <CardDescription>
                      Most popular products in your organization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reportData.productUsage.map((product, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full" style={{
                              backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                            }}></div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">{product.users} users</span>
                            {product.trend === 'up' ? (
                              <ArrowUpRight className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Recent Activity Trends</span>
                    </CardTitle>
                    <CardDescription>
                      Last 7 days user activity summary
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reportData.activityData.slice(-3).map((day, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{new Date(day.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">{day.users} active users</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">₹{day.revenue}</p>
                            <p className="text-sm text-gray-600">{day.sessions} sessions</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Usage Analytics</CardTitle>
                  <CardDescription>
                    Detailed breakdown of how each product is being used
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reportData.productUsage.map((product, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <Badge variant={product.trend === 'up' ? 'default' : 'secondary'}>
                            {product.trend === 'up' ? 'Growing' : 'Declining'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Active Users</p>
                            <p className="text-2xl font-bold">{product.users}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Adoption Rate</p>
                            <p className="text-2xl font-bold">{product.percentage}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Trend</p>
                            <div className="flex items-center space-x-2">
                              {product.trend === 'up' ? (
                                <TrendingUp className="h-6 w-6 text-green-500" />
                              ) : (
                                <TrendingDown className="h-6 w-6 text-red-500" />
                              )}
                              <span className={`font-bold ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {product.trend === 'up' ? '+' : '-'}{Math.floor(Math.random() * 15) + 5}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement Metrics</CardTitle>
                  <CardDescription>
                    Key performance indicators for user engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reportData.userEngagement.map((metric, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{metric.metric}</h3>
                          {metric.trend === 'up' ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-3xl font-bold mb-1">{metric.value}{metric.metric.includes('Duration') ? 'min' : metric.metric.includes('Satisfaction') ? '/5' : metric.metric.includes('Rate') ? '%' : ''}</p>
                        <p className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.trend === 'up' ? '+' : ''}{metric.change}% from last period
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                  <CardDescription>
                    Daily breakdown of user activity and revenue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.activityData.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{new Date(day.date).toLocaleDateString('en-IN', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</p>
                            <p className="text-sm text-gray-600">{day.sessions} total sessions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl text-green-600">₹{day.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{day.users} active users</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </WorkspaceLayout>
  )
}
