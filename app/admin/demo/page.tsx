"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Shield, 
  Database, 
  Users, 
  CheckCircle, 
  Info,
  Key,
  Clock,
  Activity,
  User,
  Settings
} from "lucide-react"

export default function AdminDemoPage() {
  const [adminData, setAdminData] = useState<any>(null)
  const [systemStatus, setSystemStatus] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = () => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth) {
      const data = JSON.parse(adminAuth)
      setAdminData(data)
    }
  }

  const setupAdminUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/setup', { method: 'POST' })
      const data = await response.json()
      setSystemStatus(data)
    } catch (error) {
      console.error('Setup error:', error)
    }
    setLoading(false)
  }

  const testConnectivity = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/multi-database-test')
      const data = await response.json()
      setSystemStatus({ ...systemStatus, connectivity: data.connectivity })
    } catch (error) {
      console.error('Connectivity test error:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Admin Authentication Demo
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Demonstrating simple MongoDB-based admin authentication without JWT complexity
          </p>
        </div>

        {/* Current Session Info */}
        {adminData && (
          <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Current Admin Session</h3>
                  <p className="text-sm text-gray-600">Active authentication details</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Email</span>
                  </div>
                  <p className="font-semibold text-gray-900">{adminData.email}</p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Role</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                    {adminData.role}
                  </Badge>
                </div>

                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Session Started</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(adminData.timestamp).toLocaleString()}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Status</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>

              {adminData.permissions && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {adminData.permissions.map((permission: string) => (
                      <Badge key={permission} variant="outline" className="border-gray-300">
                        {permission.replace(/_/g, ' ').toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* System Demo Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Setup Admin Users */}
          <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Setup Admin Users</h3>
                  <p className="text-sm text-gray-600">Create admin users in database</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                This will create default admin users in the MongoDB `admin_users` collection.
              </p>
              <Button 
                onClick={setupAdminUsers} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                {loading ? "Setting up..." : "Setup Admin Users"}
              </Button>
              
              {systemStatus.success && (
                <Alert className="mt-4 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {systemStatus.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Test Database Connectivity */}
          <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Test Connectivity</h3>
                  <p className="text-sm text-gray-600">Check service database connections</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Test connections to Billing, CRM, and Pingora service databases.
              </p>
              <Button 
                onClick={testConnectivity} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {loading ? "Testing..." : "Test Connectivity"}
              </Button>

              {systemStatus.connectivity && (
                <div className="mt-4 space-y-2">
                  {Object.entries(systemStatus.connectivity).map(([service, status]) => (
                    <div key={service} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="font-medium capitalize">{service}</span>
                      <Badge className={status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {status ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Authentication Flow Info */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Info className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Authentication Flow</h3>
                <p className="text-sm text-gray-600">How the simple MongoDB auth works</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Database Setup</h4>
                <p className="text-sm text-gray-600">
                  Admin users created in `admin_users` collection with credentials
                </p>
              </div>

              <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-xl">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Login Process</h4>
                <p className="text-sm text-gray-600">
                  Credentials verified against database, session stored in localStorage
                </p>
              </div>

              <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-xl">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Session Management</h4>
                <p className="text-sm text-gray-600">
                  Protected routes check localStorage for valid session (24h expiry)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Credentials */}
        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Key className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Available Admin Credentials</h3>
                <p className="text-sm text-gray-600">Use these to test login functionality</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-xl bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">System Admin</h4>
                <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> admin@avaone.com</p>
                <p className="text-sm text-gray-600"><strong>Password:</strong> AvaOne@2024!</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-xl bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">Super Admin</h4>
                <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> superadmin@avaone.com</p>
                <p className="text-sm text-gray-600"><strong>Password:</strong> SuperAva@2024!</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-xl bg-white">
                <h4 className="font-semibold text-gray-900 mb-2">Developer</h4>
                <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> dev@avaone.com</p>
                <p className="text-sm text-gray-600"><strong>Password:</strong> DevAva@2024!</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
