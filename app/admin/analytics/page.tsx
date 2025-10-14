"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  BarChart3, 
  Database, 
  Users, 
  Server,
  HardDrive,
  Activity,
  TrendingUp,
  PieChart,
  Building2,
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  FileText,
  Layers,
  Zap,
  Globe,
  Eye
} from "lucide-react"

interface CollectionData {
  name: string
  documentCount: number
  indexes: number
  sizeBytes: number
  sampleDocuments?: number
}

interface ServiceData {
  connected: boolean
  databaseName?: string
  collections: CollectionData[]
  totalCollections: number
  totalDocuments: number
  totalSizeBytes: number
  error?: string
}

interface OrganizationAnalytics {
  organizationId: string
  organizationName: string
  createdAt: string
  services: {
    [serviceName: string]: ServiceData
  }
  totalClusters: number
  totalDatabases: number
  totalCollections: number
  totalDocuments: number
  totalSizeBytes: number
}

interface SystemAnalytics {
  organizations: OrganizationAnalytics[]
  summary: {
    totalOrganizations: number
    totalClusters: number
    totalDatabases: number
    totalCollections: number
    totalDocuments: number
    totalSizeBytes: number
    serviceBreakdown: {
      [serviceName: string]: {
        connectedOrgs: number
        totalDatabases: number
        totalCollections: number
        totalDocuments: number
      }
    }
  }
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<SystemAnalytics | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedOrg, setSelectedOrg] = useState<OrganizationAnalytics | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    setLoading(true)
    setMessage("Loading analytics data...")
    
    try {
      const response = await fetch('/api/admin/analytics')
      const data = await response.json()
      
      if (data.success) {
        setAnalyticsData(data.data)
        setMessage(`Analytics loaded for ${data.data.summary.totalOrganizations} organizations`)
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error loading analytics:', error)
      setMessage('Failed to load analytics data')
    }
    
    setLoading(false)
  }

  const getOrgDetails = async (orgId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: orgId })
      })
      
      const data = await response.json()
      if (data.success) {
        setSelectedOrg(data.data)
      }
    } catch (error) {
      console.error('Error getting org details:', error)
    }
    setLoading(false)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredOrganizations = analyticsData?.organizations.filter(org => 
    org.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 mb-8">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Organization Analytics
                </h1>
                <p className="text-gray-600 mt-2">
                  Comprehensive analysis of clusters, databases, collections, and resources
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  📊 Data synchronized with Admin Dashboard organizations
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={loadAnalytics}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Refresh Data
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-8">
        {message && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Activity className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">{message}</AlertDescription>
          </Alert>
        )}

        {analyticsData && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-200">
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl font-medium transition-all duration-200"
              >
                <TrendingUp className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="organizations" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-xl font-medium transition-all duration-200"
              >
                <Building2 className="h-4 w-4" />
                Organizations
              </TabsTrigger>
              <TabsTrigger 
                value="services" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-medium transition-all duration-200"
              >
                <Server className="h-4 w-4" />
                Services
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-xl font-medium transition-all duration-200"
              >
                <Eye className="h-4 w-4" />
                Details
              </TabsTrigger>
            </TabsList>

            {/* System Overview */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Organizations</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.summary.totalOrganizations}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Server className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Service Clusters</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.summary.totalClusters}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Database className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Databases</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.summary.totalDatabases}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <Layers className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Collections</p>
                        <p className="text-3xl font-bold text-gray-900">{analyticsData.summary.totalCollections}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Document Statistics</h3>
                        <p className="text-sm text-gray-600">Total documents across all services</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                        <span className="font-medium text-gray-900">Total Documents</span>
                        <Badge className="bg-blue-100 text-blue-800 text-lg px-3 py-1">
                          {analyticsData.summary.totalDocuments.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                        <span className="font-medium text-gray-900">Total Storage Size</span>
                        <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                          {formatBytes(analyticsData.summary.totalSizeBytes)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <PieChart className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Service Breakdown</h3>
                        <p className="text-sm text-gray-600">Distribution across services</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {Object.entries(analyticsData.summary.serviceBreakdown).map(([service, data]) => (
                        <div key={service} className="p-4 border border-gray-200 rounded-xl bg-white">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold capitalize text-gray-900">{service}</span>
                            <Badge className={
                              service === 'billing' ? 'bg-blue-100 text-blue-800' :
                              service === 'crm' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }>
                              {data.connectedOrgs} orgs
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">DBs: </span>
                              <span className="font-medium">{data.totalDatabases}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Collections: </span>
                              <span className="font-medium">{data.totalCollections}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Docs: </span>
                              <span className="font-medium">{data.totalDocuments}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Organizations Tab */}
            <TabsContent value="organizations">
              <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm mb-6">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Organization Search</h3>
                      <p className="text-sm text-gray-600">Find and analyze specific organizations</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search organizations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOrganizations.map((org) => (
                  <Card key={org.organizationId} className="border-0 shadow-xl bg-white/60 backdrop-blur-sm hover:scale-[1.02] transition-all duration-200">
                    <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate">{org.organizationName}</h3>
                          <p className="text-xs text-gray-500">Created: {new Date(org.createdAt).toLocaleDateString()}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <Database className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                            <p className="text-sm text-gray-600">Databases</p>
                            <p className="text-xl font-bold text-blue-800">{org.totalDatabases}</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <Layers className="h-5 w-5 text-green-600 mx-auto mb-1" />
                            <p className="text-sm text-gray-600">Collections</p>
                            <p className="text-xl font-bold text-green-800">{org.totalCollections}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">Service Status</h4>
                          {Object.entries(org.services).map(([service, data]) => (
                            <div key={service} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <span className="capitalize text-sm font-medium">{service}</span>
                              {data.connected ? (
                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Connected
                                </Badge>
                              ) : (
                                <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Failed
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={() => getOrgDetails(org.organizationId)}
                          className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries(analyticsData.summary.serviceBreakdown).map(([service, data]) => (
                  <Card key={service} className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
                    <CardHeader className={`border-b border-gray-100 ${
                      service === 'billing' ? 'bg-gradient-to-r from-blue-50 to-cyan-50' :
                      service === 'crm' ? 'bg-gradient-to-r from-green-50 to-emerald-50' :
                      'bg-gradient-to-r from-purple-50 to-pink-50'
                    }`}>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          service === 'billing' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          service === 'crm' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}>
                          {service === 'billing' ? <HardDrive className="h-5 w-5 text-white" /> :
                           service === 'crm' ? <Users className="h-5 w-5 text-white" /> :
                           <Globe className="h-5 w-5 text-white" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 capitalize">{service} Service</h3>
                          <p className="text-sm text-gray-600">Service analytics and metrics</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <Building2 className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                            <p className="text-sm text-gray-600">Connected Orgs</p>
                            <p className="text-2xl font-bold text-gray-800">{data.connectedOrgs}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <Database className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                            <p className="text-sm text-gray-600">Databases</p>
                            <p className="text-2xl font-bold text-gray-800">{data.totalDatabases}</p>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Collections</span>
                            <Badge className="bg-gray-100 text-gray-800">{data.totalCollections}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Documents</span>
                            <Badge className="bg-gray-100 text-gray-800">{data.totalDocuments.toLocaleString()}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Organization Details Tab */}
            <TabsContent value="details">
              {selectedOrg ? (
                <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
                  <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <Eye className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{selectedOrg.organizationName} - Detailed Analysis</h3>
                        <p className="text-sm text-gray-600">Complete breakdown of databases and collections</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {Object.entries(selectedOrg.services).map(([service, data]) => (
                        <div key={service} className="border border-gray-200 rounded-xl p-6 bg-white">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold capitalize text-gray-900">{service} Service</h4>
                            {data.connected ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Connected
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <XCircle className="h-4 w-4 mr-1" />
                                {data.error || 'Failed'}
                              </Badge>
                            )}
                          </div>
                          
                          {data.connected && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                  <p className="text-sm text-gray-600">Database Name</p>
                                  <p className="font-medium text-blue-800">{data.databaseName}</p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                  <p className="text-sm text-gray-600">Collections</p>
                                  <p className="font-medium text-green-800">{data.totalCollections}</p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                  <p className="text-sm text-gray-600">Documents</p>
                                  <p className="font-medium text-purple-800">{data.totalDocuments.toLocaleString()}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="font-medium text-gray-900 mb-3">Collections Detail</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {data.collections.map((collection) => (
                                    <div key={collection.name} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                                      <p className="font-medium text-gray-900 mb-2">{collection.name}</p>
                                      <div className="text-xs text-gray-600 space-y-1">
                                        <div className="flex justify-between">
                                          <span>Documents:</span>
                                          <span className="font-medium">{collection.documentCount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Indexes:</span>
                                          <span className="font-medium">{collection.indexes}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>Size:</span>
                                          <span className="font-medium">{formatBytes(collection.sizeBytes)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Organization</h3>
                    <p className="text-gray-600 mb-6">
                      Choose an organization from the Organizations tab to view detailed analytics
                    </p>
                    <Button
                      onClick={() => document.querySelector('[data-state="inactive"][value="organizations"]')?.click()}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      Browse Organizations
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}

        {!analyticsData && !loading && (
          <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Load Analytics Data</h3>
              <p className="text-gray-600 mb-6">
                Click the refresh button to load comprehensive analytics about your organizations
              </p>
              <Button
                onClick={loadAnalytics}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Zap className="h-4 w-4 mr-2" />
                Load Analytics
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
