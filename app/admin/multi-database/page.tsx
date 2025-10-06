'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  Database, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Server, 
  Building2,
  AlertTriangle,
  Activity
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

interface ConnectivityStatus {
  billing: boolean
  crm: boolean
  pingora: boolean
}

interface OrganizationServiceInfo {
  exists: boolean
  info?: {
    organizationId: string
    organizationName: string
    createdAt: string
    serviceType: string
    adminEmail: string
    status: string
  }
  error?: string
}

interface OrganizationStatus {
  id: string
  name: string
  services: {
    billing: OrganizationServiceInfo
    crm: OrganizationServiceInfo
    pingora: OrganizationServiceInfo
  }
}

interface MultiDatabaseStatus {
  connectivity: ConnectivityStatus
  organizationCount: number
  organizationStatus: OrganizationStatus[]
  timestamp: string
}

export default function MultiDatabasePage() {
  const [status, setStatus] = useState<MultiDatabaseStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'destructive'>('success')
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin/login')
      return
    }

    fetchStatus()
  }, [isAuthenticated, authLoading, router])

  const fetchStatus = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/multi-database-status')
      
      if (response.ok) {
        const data = await response.json()
        setStatus(data)
      } else {
        showAlertMessage('Failed to fetch multi-database status', 'destructive')
      }
    } catch (error) {
      console.error('Error fetching status:', error)
      showAlertMessage('Error fetching multi-database status', 'destructive')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchStatus()
  }

  const handleTestConnectivity = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch('/api/admin/multi-database-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test-connectivity' })
      })
      
      if (response.ok) {
        const data = await response.json()
        showAlertMessage('Connectivity test completed', 'success')
        await fetchStatus()
      } else {
        showAlertMessage('Failed to test connectivity', 'destructive')
      }
    } catch (error) {
      showAlertMessage('Error testing connectivity', 'destructive')
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleRecreateDatabase = async (organizationId: string) => {
    try {
      const response = await fetch('/api/admin/multi-database-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'recreate-databases', organizationId })
      })
      
      if (response.ok) {
        const data = await response.json()
        showAlertMessage('Database recreation completed', 'success')
        await fetchStatus()
      } else {
        showAlertMessage('Failed to recreate databases', 'destructive')
      }
    } catch (error) {
      showAlertMessage('Error recreating databases', 'destructive')
    }
  }

  const showAlertMessage = (message: string, type: 'success' | 'destructive') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 5000)
  }

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'billing': return '💰'
      case 'crm': return '🤝'
      case 'pingora': return '🎯'
      default: return '📊'
    }
  }

  const getServiceColor = (serviceName: string) => {
    switch (serviceName) {
      case 'billing': return 'bg-green-500'
      case 'crm': return 'bg-blue-500'
      case 'pingora': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading multi-database status...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Multi-Database Status</h1>
              <p className="text-gray-600">Monitor organization databases across all services</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleTestConnectivity} disabled={isRefreshing}>
              <Activity className="h-4 w-4 mr-2" />
              Test Connectivity
            </Button>
            <Button onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Alert */}
        {showAlert && (
          <Alert className={`mb-6 ${alertType === 'destructive' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className={alertType === 'destructive' ? 'text-red-800' : 'text-green-800'}>
              {alertMessage}
            </AlertDescription>
          </Alert>
        )}

        {status && (
          <>
            {/* Service Connectivity Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Object.entries(status.connectivity).map(([serviceName, isConnected]) => (
                <Card key={serviceName}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getServiceColor(serviceName)}`}></div>
                        <span className="capitalize">{serviceName}</span>
                        <span className="text-lg">{getServiceIcon(serviceName)}</span>
                      </div>
                      {isConnected ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge 
                      variant={isConnected ? "default" : "destructive"}
                      className={isConnected ? "bg-green-100 text-green-800" : ""}
                    >
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Organizations Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Organizations Overview
                </CardTitle>
                <CardDescription>
                  {status.organizationCount} organizations • Last updated: {new Date(status.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {status.organizationStatus.map((org) => (
                    <Card key={org.id} className="border-l-4 border-blue-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{org.name}</CardTitle>
                        <CardDescription className="text-sm">ID: {org.id}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(org.services).map(([serviceName, serviceInfo]) => (
                            <div key={serviceName} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{getServiceIcon(serviceName)}</span>
                                <span className="text-sm font-medium capitalize">{serviceName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {serviceInfo.exists ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                      Active
                                    </Badge>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="h-4 w-4 text-red-500" />
                                    <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                      Missing
                                    </Badge>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {/* Recreate button if any service is missing */}
                          {Object.values(org.services).some(service => !service.exists) && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full mt-3"
                              onClick={() => handleRecreateDatabase(org.id)}
                            >
                              <Database className="h-4 w-4 mr-2" />
                              Recreate Missing Databases
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Service Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {['billing', 'crm', 'pingora'].map((serviceName) => (
                <Card key={serviceName}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getServiceColor(serviceName)}`}></div>
                      <span className="capitalize">{serviceName} Service</span>
                      <span>{getServiceIcon(serviceName)}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {status.organizationStatus.map((org) => {
                        const serviceInfo = org.services[serviceName as keyof typeof org.services]
                        return (
                          <div key={org.id} className="flex items-center justify-between text-sm">
                            <span className="truncate">{org.name}</span>
                            {serviceInfo.exists ? (
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
