'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestLoginPage() {
  const [organizationId, setOrganizationId] = useState('ORG_MF18BYUL_QL1Y1T')
  const [email, setEmail] = useState('aayushh.mishra2003@gmail.com')
  const [password, setPassword] = useState('password123')
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/debug-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId, email, password })
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' })
    }
    setIsLoading(false)
  }

  const setupTestData = () => {
    // Create test organization
    const testOrg = {
      id: 'ORG_MF18BYUL_QL1Y1T',
      name: 'Matchbest',
      email: 'admin@matchbest.com',
      plan: 'standard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('organizations', JSON.stringify([testOrg]))

    // Create test user
    const testUser = {
      _id: 'user_1',
      organizationId: 'ORG_MF18BYUL_QL1Y1T',
      email: 'aayushh.mishra2003@gmail.com',
      password: 'password123',
      firstName: 'Aayush',
      lastName: 'Mishra',
      role: 'admin',
      organizationName: 'Matchbest',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem('org_users_matchbest', JSON.stringify([testUser]))

    alert('Test data created in localStorage!')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Login Debug Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Organization ID</label>
                <Input
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                  placeholder="Organization ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button onClick={testLogin} disabled={isLoading}>
                {isLoading ? 'Testing...' : 'Test Login'}
              </Button>
              <Button onClick={setupTestData} variant="outline">
                Setup Test Data
              </Button>
            </div>

            {result && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Debug Result:</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
