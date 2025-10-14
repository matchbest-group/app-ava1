"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Database, 
  TestTube, 
  Users, 
  CheckCircle, 
  XCircle, 
  Info,
  Plus,
  Trash2,
  Edit,
  Eye,
  Server,
  Shield,
  Activity,
  Zap,
  Globe,
  Lock,
  UserPlus,
  Sparkles
} from "lucide-react"

interface ConnectivityResult {
  [key: string]: boolean
}

interface AuthResult {
  success: boolean
  user?: any
  organizationName?: string
  authenticatedServices?: string[]
  error?: string
}

interface UserData {
  _id: string
  organizationId: string
  organizationName: string
  email: string
  role: string
  permissions: string[]
  isActive: boolean
  serviceType: string
  createdAt: string
}

export default function MultiDatabasePage() {
  const [connectivity, setConnectivity] = useState<ConnectivityResult>({})
  const [authResult, setAuthResult] = useState<AuthResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Test form states
  const [testOrgId, setTestOrgId] = useState("")
  const [testEmail, setTestEmail] = useState("")
  const [testPassword, setTestPassword] = useState("")

  // User management states
  const [orgName, setOrgName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [newUserRole, setNewUserRole] = useState("user")
  const [selectedServices, setSelectedServices] = useState<string[]>(["billing", "crm", "pingora"])
  const [users, setUsers] = useState<{ [key: string]: UserData[] }>({})

  const testConnectivity = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/multi-database-test', {
        method: 'GET'
      })
      const data = await response.json()
      setConnectivity(data.connectivity || {})
      setMessage(data.message || "Connectivity test completed")
    } catch (error) {
      console.error('Error testing connectivity:', error)
      setMessage("Failed to test connectivity")
    }
    setLoading(false)
  }

  const testAuthentication = async () => {
    if (!testOrgId || !testEmail || !testPassword) {
      setMessage("Please fill all authentication test fields")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/multi-database-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: testOrgId,
          email: testEmail,
          password: testPassword
        })
      })
      const data = await response.json()
      setAuthResult(data.authResult)
      setMessage(data.message || "Authentication test completed")
    } catch (error) {
      console.error('Error testing authentication:', error)
      setMessage("Failed to test authentication")
    }
    setLoading(false)
  }

  const addUser = async () => {
    if (!testOrgId || !orgName || !newUserEmail || !newUserPassword) {
      setMessage("Please fill all required fields for user creation")
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/manage-service-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: testOrgId,
          organizationName: orgName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
          services: selectedServices
        })
      })
      const data = await response.json()
      setMessage(data.message || "User creation completed")
      
      if (data.success) {
        // Clear form
        setNewUserEmail("")
        setNewUserPassword("")
        setNewUserRole("user")
        // Refresh user list
        loadUsers()
      }
    } catch (error) {
      console.error('Error adding user:', error)
      setMessage("Failed to add user")
    }
    setLoading(false)
  }

  const loadUsers = async () => {
    if (!orgName) {
      setMessage("Please enter organization name to load users")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/manage-service-users?organizationName=${encodeURIComponent(orgName)}`)
      const data = await response.json()
      setUsers(data.users || {})
      setMessage(`Loaded users for organization: ${orgName}`)
    } catch (error) {
      console.error('Error loading users:', error)
      setMessage("Failed to load users")
    }
    setLoading(false)
  }

  useEffect(() => {
    testConnectivity()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 mb-8">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Database className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Multi-Database Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage service databases, connectivity, and user authentication across the platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl border border-green-200">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-8">
        {message && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">{message}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="connectivity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-200">
            <TabsTrigger 
              value="connectivity" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-xl font-medium transition-all duration-200"
            >
              <Server className="h-4 w-4" />
              Connectivity
            </TabsTrigger>
            <TabsTrigger 
              value="authentication" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl font-medium transition-all duration-200"
            >
              <Shield className="h-4 w-4" />
              Authentication
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-xl font-medium transition-all duration-200"
            >
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connectivity">
            <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Server className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Service Connectivity Test</h3>
                    <p className="text-sm text-gray-600">Monitor real-time connection status</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <Button 
                  onClick={testConnectivity} 
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Testing Connections...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Run Connectivity Test
                    </div>
                  )}
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(connectivity).map(([service, status]) => (
                    <div 
                      key={service} 
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                        status 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                          : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            status ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            <Database className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-bold text-gray-900 capitalize">{service}</span>
                        </div>
                        {status ? (
                          <Badge className="bg-green-100 text-green-800 border-green-300">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Online
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-300">
                            <XCircle className="h-3 w-3 mr-1" />
                            Offline
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-medium ${status ? 'text-green-700' : 'text-red-700'}`}>
                            {status ? 'Connected' : 'Connection Failed'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium text-gray-900">{service.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        <TabsContent value="authentication">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Cross-Service Authentication Test
              </CardTitle>
              <CardDescription>
                Test authentication across all service databases using Org ID + Email + Password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="testOrgId">Organization ID</Label>
                  <Input
                    id="testOrgId"
                    value={testOrgId}
                    onChange={(e) => setTestOrgId(e.target.value)}
                    placeholder="Enter organization ID"
                  />
                </div>
                <div>
                  <Label htmlFor="testEmail">Email</Label>
                  <Input
                    id="testEmail"
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <Label htmlFor="testPassword">Password</Label>
                  <Input
                    id="testPassword"
                    type="password"
                    value={testPassword}
                    onChange={(e) => setTestPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <Button onClick={testAuthentication} disabled={loading}>
                {loading ? "Testing..." : "Test Authentication"}
              </Button>

              {authResult && (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-semibold mb-2">Authentication Result:</h4>
                  {authResult.success ? (
                    <div className="space-y-2">
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Success
                      </Badge>
                      <p><strong>Organization:</strong> {authResult.organizationName}</p>
                      <p><strong>Authenticated Services:</strong> {authResult.authenticatedServices?.join(", ")}</p>
                      <details className="mt-2">
                        <summary className="cursor-pointer font-medium">User Details</summary>
                        <pre className="mt-2 p-2 bg-white border rounded text-xs overflow-auto">
                          {JSON.stringify(authResult.user, null, 2)}
                        </pre>
                      </details>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Badge variant="destructive">
                        <XCircle className="h-4 w-4 mr-1" />
                        Failed
                      </Badge>
                      <p className="text-red-600">{authResult.error}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add User to Service Databases
                </CardTitle>
                <CardDescription>
                  Create a new user in the service-specific databases (user_companyname collections)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input
                      id="orgName"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Enter organization name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newUserEmail">User Email</Label>
                    <Input
                      id="newUserEmail"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="Enter user email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newUserPassword">User Password</Label>
                    <Input
                      id="newUserPassword"
                      type="password"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      placeholder="Enter user password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newUserRole">Role</Label>
                    <select
                      id="newUserRole"
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Services to Add User To:</Label>
                  <div className="flex gap-2 mt-2">
                    {["billing", "crm", "pingora"].map((service) => (
                      <label key={service} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedServices([...selectedServices, service])
                            } else {
                              setSelectedServices(selectedServices.filter(s => s !== service))
                            }
                          }}
                        />
                        <span className="capitalize">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button onClick={addUser} disabled={loading}>
                  {loading ? "Adding User..." : "Add User"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  View Users in Service Databases
                </CardTitle>
                <CardDescription>
                  View all users in the service-specific databases for an organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={loadUsers} disabled={loading}>
                    {loading ? "Loading..." : "Load Users"}
                  </Button>
                </div>

                {Object.keys(users).length > 0 && (
                  <div className="space-y-4">
                    {Object.entries(users).map(([service, serviceUsers]) => (
                      <div key={service} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-3 capitalize">{service} Service Users ({serviceUsers.length})</h4>
                        {serviceUsers.length > 0 ? (
                          <div className="space-y-2">
                            {serviceUsers.map((user) => (
                              <div key={user._id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div>
                                  <span className="font-medium">{user.email}</span>
                                  <Badge variant="outline" className="ml-2">{user.role}</Badge>
                                  <span className="text-sm text-gray-500 ml-2">
                                    {user.isActive ? "Active" : "Inactive"}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Created: {new Date(user.createdAt).toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No users found in {service} service</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}