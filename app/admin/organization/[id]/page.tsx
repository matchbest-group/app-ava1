'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Building2, 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Globe, 
  Shield, 
  AlertTriangle,
  Play,
  Pause,
  StopCircle,
  Trash2,
  Edit,
  Copy
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

interface Organization {
  id: string
  name: string
  email: string
  phone: string
  address: string
  industry: string
  employeeCount: string
  foundedYear: string
  website: string
  description: string
  adminEmail: string
  adminPassword: string
  licenseStatus: 'active' | 'suspended' | 'paused' | 'expired'
  licenseExpiry: string
  createdAt: string
}

export default function OrganizationDetailPage() {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState<'success' | 'destructive'>('success')
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated, isLoading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin/login')
      return
    }

    const fetchOrganization = async () => {
      try {
        const orgId = params.id as string
        const response = await fetch(`/api/organizations/${orgId}`)
        
        if (response.ok) {
          const org = await response.json()
          setOrganization(org)
        } else {
          router.push('/admin/dashboard')
        }
      } catch (error) {
        console.error('Error fetching organization:', error)
        router.push('/admin/dashboard')
      }
      
      setIsLoading(false)
    }

    fetchOrganization()
  }, [params.id, router, isAuthenticated, authLoading])

  const handleLicenseAction = async (action: 'activate' | 'suspend' | 'pause') => {
    if (!organization) return

    try {
      const response = await fetch(`/api/organizations/${organization.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licenseStatus: action === 'activate' ? 'active' : action === 'suspend' ? 'suspended' : 'paused'
        }),
      })

      if (response.ok) {
        setOrganization(prev => prev ? { 
          ...prev, 
          licenseStatus: action === 'activate' ? 'active' : action === 'suspend' ? 'suspended' : 'paused' 
        } : null)
        
        setAlertMessage(`License ${action}d successfully`)
        setAlertType('success')
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
      } else {
        setAlertMessage('Failed to update license status')
        setAlertType('destructive')
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
      }
    } catch (error) {
      console.error('Error updating license:', error)
      setAlertMessage('Failed to update license status')
      setAlertType('destructive')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  const handleDeleteOrganization = async () => {
    if (!organization || !confirm('Are you sure you want to delete this organization? This action cannot be undone.')) return

    try {
      const response = await fetch(`/api/organizations/${organization.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        setAlertMessage('Failed to delete organization')
        setAlertType('destructive')
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
      }
    } catch (error) {
      console.error('Error deleting organization:', error)
      setAlertMessage('Failed to delete organization')
      setAlertType('destructive')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setAlertMessage('Copied to clipboard!')
    setAlertType('success')
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 2000)
  }

  const getLicenseStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const isLicenseExpired = () => {
    if (!organization) return false
    return new Date(organization.licenseExpiry) < new Date()
  }

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading organization details...</p>
        </div>
      </div>
    )
  }

  if (!organization) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/admin/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-3">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{organization.name}</h1>
                  <p className="text-sm text-gray-500">Organization Details</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant={
                  organization.licenseStatus === 'active' ? 'default' :
                  organization.licenseStatus === 'suspended' ? 'destructive' :
                  organization.licenseStatus === 'paused' ? 'secondary' : 'outline'
                }
              >
                {organization.licenseStatus.toUpperCase()}
              </Badge>
              <Badge variant="secondary">{organization.id}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert */}
        {showAlert && (
          <Alert className={`mb-6 ${alertType === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <AlertDescription className={alertType === 'success' ? 'text-green-800' : 'text-red-800'}>
              {alertMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* License Warning */}
        {isLicenseExpired() && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              License has expired on {new Date(organization.licenseExpiry).toLocaleDateString()}. Please renew the license.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{organization.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">{organization.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-600">{organization.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Website</p>
                      <p className="text-sm text-gray-600">{organization.website || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Employees</p>
                      <p className="text-sm text-gray-600">{organization.employeeCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Founded</p>
                      <p className="text-sm text-gray-600">{organization.foundedYear}</p>
                    </div>
                  </div>
                </div>
                {organization.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Description</p>
                    <p className="text-sm text-gray-600">{organization.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Admin Credentials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Admin Credentials
                </CardTitle>
                <CardDescription>
                  Organization admin login details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Admin Email</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                        {organization.adminEmail}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(organization.adminEmail)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Admin Password</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                        {organization.adminPassword}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(organization.adminPassword)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* License Management */}
            <Card>
              <CardHeader>
                <CardTitle>License Management</CardTitle>
                <CardDescription>
                  Manage organization license status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Current Status</p>
                  <Badge 
                    variant={
                      organization.licenseStatus === 'active' ? 'default' :
                      organization.licenseStatus === 'suspended' ? 'destructive' :
                      organization.licenseStatus === 'paused' ? 'secondary' : 'outline'
                    }
                  >
                    {organization.licenseStatus.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Expiry Date</p>
                  <p className="text-sm text-gray-600">
                    {new Date(organization.licenseExpiry).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    variant={organization.licenseStatus === 'active' ? 'outline' : 'default'}
                    onClick={() => handleLicenseAction('activate')}
                    disabled={organization.licenseStatus === 'active'}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Activate
                  </Button>
                  <Button
                    className="w-full"
                    variant={organization.licenseStatus === 'paused' ? 'outline' : 'secondary'}
                    onClick={() => handleLicenseAction('pause')}
                    disabled={organization.licenseStatus === 'paused'}
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    className="w-full"
                    variant={organization.licenseStatus === 'suspended' ? 'outline' : 'destructive'}
                    onClick={() => handleLicenseAction('suspend')}
                    disabled={organization.licenseStatus === 'suspended'}
                  >
                    <StopCircle className="h-4 w-4 mr-2" />
                    Suspend
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Organization
                </Button>
                <Button 
                  className="w-full" 
                  variant="destructive"
                  onClick={handleDeleteOrganization}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Organization
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Created</span>
                  <span className="text-sm font-medium">
                    {new Date(organization.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Industry</span>
                  <span className="text-sm font-medium">{organization.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Days Until Expiry</span>
                  <span className={`text-sm font-medium ${isLicenseExpired() ? 'text-red-600' : 'text-green-600'}`}>
                    {isLicenseExpired() 
                      ? 'Expired' 
                      : Math.ceil((new Date(organization.licenseExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
