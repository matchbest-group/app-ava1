"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { 
  Building2, 
  Database, 
  Users, 
  Plus,
  Search,
  Eye,
  BarChart3,
  CheckCircle,
  XCircle,
  Layers,
  HardDrive,
  Activity,
  RefreshCw,
  TrendingUp,
  Server
} from "lucide-react"

interface Organization {
  _id: string
  id: string
  name: string
  adminEmail: string
  createdAt: string
  status: 'active' | 'inactive'
}

interface OrganizationWithAnalytics extends Organization {
  analytics?: {
    totalDatabases: number
    totalCollections: number
    totalDocuments: number
    totalSizeBytes: number
    services: {
      [key: string]: {
        connected: boolean
        collections: number
        documents: number
      }
    }
  }
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<OrganizationWithAnalytics[]>([])
  const [loading, setLoading] = useState(false)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    loadOrganizations()
  }, [])

  const loadOrganizations = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/organizations')
      
      if (response.ok) {
        const data = await response.json()
        console.log('Organizations loaded:', data)
        
        // Handle both array response and object response formats
        const orgsArray = Array.isArray(data) ? data : (data.organizations || data.data || [])
        setOrganizations(orgsArray)
        setMessage(`Loaded ${orgsArray.length} organizations from dashboard source`)
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.error || 'Failed to load organizations'}`)
      }
    } catch (error) {
      console.error('Error loading organizations:', error)
      setMessage('Failed to load organizations - network error')
    }
    setLoading(false)
  }

  const loadAnalyticsForAll = async () => {
    setAnalyticsLoading(true)
    setMessage("Loading analytics for all organizations...")
    
    try {
      const response = await fetch('/api/admin/analytics')
      const data = await response.json()
      
      if (data.success) {
        // Merge analytics data with organizations
        const orgMap = new Map(organizations.map(org => [org.id, org]))
        
        const enrichedOrgs = data.data.organizations.map((analyticsOrg: any) => {
          const baseOrg = orgMap.get(analyticsOrg.organizationId)
          if (baseOrg) {
            return {
              ...baseOrg,
              analytics: {
                totalDatabases: analyticsOrg.totalDatabases,
                totalCollections: analyticsOrg.totalCollections,
                totalDocuments: analyticsOrg.totalDocuments,
                totalSizeBytes: analyticsOrg.totalSizeBytes,
                services: Object.fromEntries(
                  Object.entries(analyticsOrg.services).map(([service, data]: [string, any]) => [
                    service,
                    {
                      connected: data.connected,
                      collections: data.totalCollections || 0,
                      documents: data.totalDocuments || 0
                    }
                  ])
                )
              }
            }
          }
          return baseOrg
        }).filter(Boolean)
        
        setOrganizations(enrichedOrgs)
        setMessage(`Analytics loaded for ${enrichedOrgs.length} organizations`)
      } else {
        setMessage(`Analytics error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error loading analytics:', error)
      setMessage('Failed to load analytics')
    }
    setAnalyticsLoading(false)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 mb-8">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Organizations Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage organizations with detailed analytics and resource tracking
                </p>
                <p className="text-sm text-green-600 mt-1">
                  🔄 Synchronized with Admin Dashboard data source
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={loadAnalyticsForAll}
                disabled={analyticsLoading}
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
              >
                {analyticsLoading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading Analytics...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Load Analytics
                  </div>
                )}
              </Button>
              <Button
                onClick={() => router.push('/admin/organization/create')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Organization
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

        {/* Search and Filters */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm mb-6">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Search className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Search & Filter Organizations</h3>
                <p className="text-sm text-gray-600">Find organizations by name or admin email</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by organization name or admin email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <Button
                onClick={loadOrganizations}
                disabled={loading}
                className="h-12 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Organizations Grid */}
        {filteredOrganizations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrganizations.map((org) => (
              <Card key={org.id} className="border-0 shadow-xl bg-white/60 backdrop-blur-sm hover:scale-[1.02] transition-all duration-200">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">{org.name}</h3>
                        <p className="text-xs text-gray-500">{org.adminEmail}</p>
                      </div>
                    </div>
                    <Badge className={org.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {org.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Basic Info */}
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">Created</p>
                      <p className="text-sm font-medium text-blue-800">
                        {new Date(org.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Analytics Data */}
                    {org.analytics ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">Resource Analytics</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-purple-50 rounded-lg border border-purple-200 text-center">
                            <Database className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                            <p className="text-xs text-gray-600">Databases</p>
                            <p className="text-lg font-bold text-purple-800">{org.analytics.totalDatabases}</p>
                          </div>
                          <div className="p-2 bg-green-50 rounded-lg border border-green-200 text-center">
                            <Layers className="h-4 w-4 text-green-600 mx-auto mb-1" />
                            <p className="text-xs text-gray-600">Collections</p>
                            <p className="text-lg font-bold text-green-800">{org.analytics.totalCollections}</p>
                          </div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-gray-700">Documents</span>
                            <Badge className="bg-gray-100 text-gray-800 text-xs">
                              {org.analytics.totalDocuments.toLocaleString()}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-gray-700">Storage Size</span>
                            <Badge className="bg-gray-100 text-gray-800 text-xs">
                              {formatBytes(org.analytics.totalSizeBytes)}
                            </Badge>
                          </div>
                        </div>

                        {/* Service Status */}
                        <div>
                          <p className="text-xs font-medium text-gray-700 mb-2">Service Status</p>
                          <div className="grid grid-cols-3 gap-1">
                            {Object.entries(org.analytics.services).map(([service, data]) => (
                              <div key={service} className="text-center p-2 bg-white rounded border">
                                <p className="text-xs capitalize font-medium">{service}</p>
                                {data.connected ? (
                                  <CheckCircle className="h-3 w-3 text-green-600 mx-auto mt-1" />
                                ) : (
                                  <XCircle className="h-3 w-3 text-red-600 mx-auto mt-1" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <BarChart3 className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-sm text-yellow-800">Analytics not loaded</p>
                        <p className="text-xs text-yellow-600">Click "Load Analytics" to view data</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => router.push(`/admin/organization/${org.id}`)}
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        onClick={() => router.push(`/admin/analytics?org=${org.id}`)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-blue-200 hover:bg-blue-50"
                      >
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : loading ? (
          <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <RefreshCw className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Organizations</h3>
              <p className="text-gray-600">Please wait while we fetch the data...</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No Organizations Found' : 'No Organizations Yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? `No organizations match "${searchTerm}". Try a different search term.`
                  : 'Get started by creating your first organization.'
                }
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => router.push('/admin/organization/create')}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Organization
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
