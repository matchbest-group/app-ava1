import { NextRequest, NextResponse } from 'next/server'
import { MainDatabaseService, WorkspaceDatabaseService } from '@/lib/database'
import { FallbackDatabaseService } from '@/lib/fallback-database'

export async function GET() {
  try {
    let organizations = []
    let workspaceUsers = []
    let source = ''

    // Try MongoDB first
    try {
      organizations = await MainDatabaseService.getAllOrganizations()
      workspaceUsers = await WorkspaceDatabaseService.getAllWorkspaceUsers()
      source = 'MongoDB'
    } catch (error) {
      console.log('MongoDB failed, using fallback database')
      organizations = await FallbackDatabaseService.getAllOrganizations()
      workspaceUsers = await FallbackDatabaseService.getAllWorkspaceUsers()
      source = 'localStorage'
    }

    return NextResponse.json({
      source,
      organizations: organizations.map(org => ({
        id: org.id,
        name: org.name,
        adminEmail: org.adminEmail,
        adminPassword: org.adminPassword,
        licenseStatus: org.licenseStatus
      })),
      workspaceUsers: workspaceUsers.map(user => ({
        accountId: user.accountId,
        email: user.email,
        password: user.password,
        organizationName: user.organizationName,
        plan: user.plan
      }))
    })
  } catch (error) {
    console.error('Error fetching credentials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch credentials' },
      { status: 500 }
    )
  }
}
