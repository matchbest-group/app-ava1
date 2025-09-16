'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Plus, Check, AlertCircle } from 'lucide-react'

export default function TestUsersPage() {
  const [organizationName, setOrganizationName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const addSampleUsers = async () => {
    if (!organizationName.trim()) {
      alert('Please enter organization name')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/add-sample-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ organizationName: organizationName.trim() })
      })
      
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to add sample users')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Add Sample Users to Database
          </h1>
          <p className="text-slate-600">
            This is a test page to add sample users to your organization database
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Add Sample Users
            </CardTitle>
            <CardDescription>
              Enter your organization name to add 5 sample users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input 
                placeholder="Enter organization name..."
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>
            <Button 
              onClick={addSampleUsers} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Adding Users...
                </div>
              ) : (
                <div className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sample Users
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-600" />
                Results for: {results.organizationName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.results?.map((result: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {result.success ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      )}
                      <span className="font-medium">{result.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600 capitalize">{result.type}</span>
                      {result.success ? (
                        <span className="text-sm text-green-600">Added</span>
                      ) : (
                        <span className="text-sm text-orange-600">Already exists</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <p className="text-sm text-slate-500 mb-4">
            After adding users, go to Products page → User Management tab to see them
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.open('/workspace/login', '_blank')}
          >
            Go to Workspace Login
          </Button>
        </div>
      </div>
    </div>
  )
}
