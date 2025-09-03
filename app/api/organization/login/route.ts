import { NextRequest, NextResponse } from 'next/server'
import { MainDatabaseService } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId, email, password } = body

    if (!accountId || !email || !password) {
      return NextResponse.json(
        { error: 'Account ID, email, and password are required' },
        { status: 400 }
      )
    }

    // Find organization by admin credentials
    const organization = await MainDatabaseService.getOrganizationByAdminCredentials(
      accountId,
      email,
      password
    )

    if (!organization) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if license is active
    if (organization.licenseStatus !== 'active') {
      return NextResponse.json(
        { error: `Organization license is ${organization.licenseStatus}. Please contact the administrator.` },
        { status: 403 }
      )
    }

    // Return organization data (without sensitive information)
    const { adminPassword, ...safeOrganization } = organization
    
    return NextResponse.json({
      success: true,
      organization: safeOrganization
    })

  } catch (error) {
    console.error('Error during organization login:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
