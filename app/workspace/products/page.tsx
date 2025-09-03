'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { 
  ExternalLink, 
  Settings, 
  CheckCircle, 
  XCircle,
  ArrowLeft
} from 'lucide-react'
import WorkspaceLayout from '@/components/workspace-layout'
import { AVAILABLE_PRODUCTS, Product } from '@/lib/products'

interface WorkspaceUser {
  accountId: string
  email: string
  password: string
  organizationName: string
  plan: string
  createdAt: string
}

export default function WorkspaceProductsPage() {
  const [user, setUser] = useState<WorkspaceUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('workspaceAuthenticated')
    const userData = localStorage.getItem('workspaceUser')
    
    if (auth === 'true' && userData) {
      const userObj = JSON.parse(userData)
      setUser(userObj)
      setIsAuthenticated(true)
      
      // For now, set all products as selected (default behavior)
      setSelectedProducts(AVAILABLE_PRODUCTS.map(p => p.id))
    } else {
      router.push('/workspace/login')
      return
    }
    
    setIsLoading(false)
  }, [router])

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getProductStatus = (productId: string) => {
    return selectedProducts.includes(productId) ? 'active' : 'inactive'
  }

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <WorkspaceLayout user={user} selectedProducts={AVAILABLE_PRODUCTS.filter(p => selectedProducts.includes(p.id))}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/workspace/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Management
          </h1>
          <p className="text-gray-600">
            Manage your organization's product subscriptions and access.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{AVAILABLE_PRODUCTS.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Products</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedProducts.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive Products</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {AVAILABLE_PRODUCTS.length - selectedProducts.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setSelectedProducts([])}
                size="sm"
              >
                Disable All
              </Button>
              <Button 
                onClick={() => setSelectedProducts(AVAILABLE_PRODUCTS.map(p => p.id))}
                size="sm"
              >
                Enable All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AVAILABLE_PRODUCTS.map((product) => {
              const isActive = selectedProducts.includes(product.id)
              
              return (
                <Card key={product.id} className={`transition-all duration-200 hover:shadow-lg ${
                  isActive ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${product.color} rounded-lg flex items-center justify-center text-2xl`}>
                          {product.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <Badge 
                            variant={isActive ? "default" : "secondary"}
                            className="mt-1"
                          >
                            {isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                      <Switch
                        checked={isActive}
                        onCheckedChange={() => handleProductToggle(product.id)}
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 mb-4">
                      {product.description}
                    </CardDescription>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${product.color}`} />
                        <span className="text-sm text-gray-500">
                          {isActive ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(product.url, '_blank')}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Product Summary */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Summary</h3>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Active Products</h4>
                  <div className="space-y-2">
                    {selectedProducts.map((productId) => {
                      const product = AVAILABLE_PRODUCTS.find(p => p.id === productId)
                      return product ? (
                        <div key={productId} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${product.color}`} />
                          <span className="text-sm text-gray-600">{product.name}</span>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Product URLs</h4>
                  <div className="space-y-2">
                    {selectedProducts.map((productId) => {
                      const product = AVAILABLE_PRODUCTS.find(p => p.id === productId)
                      return product ? (
                        <div key={productId} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{product.name}</span>
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Visit →
                          </a>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WorkspaceLayout>
  )
}
