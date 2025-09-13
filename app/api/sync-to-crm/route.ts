import { NextRequest, NextResponse } from 'next/server'

interface UserData {
  firstName: string
  lastName: string
  email: string
  password: string
  role?: string
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()
    
    // Validate required fields
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Sync to CRM
    const syncToCRM = async (userData: UserData) => {
      try {
        const response = await fetch('https://081b4d4ba317.ngrok-free.app/api/ava/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            role: userData.role || 'admin'
          })
        })
        
        const result = await response.json()
        console.log('CRM sync:', result.success ? 'SUCCESS' : 'FAILED')
        
        return result
      } catch (error) {
        console.log('CRM sync failed:', error)
        throw error
      }
    }

    // Call CRM sync
    const crmResult = await syncToCRM(userData)
    
    return NextResponse.json({
      success: true,
      message: 'User synced to CRM successfully',
      crmResponse: crmResult
    })

  } catch (error) {
    console.error('CRM sync error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to sync user to CRM',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}