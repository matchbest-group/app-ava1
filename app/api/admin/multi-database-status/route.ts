import { NextRequest, NextResponse } from 'next/server'
import { MultiDatabaseService } from '@/lib/multi-database'
import { MainDatabaseService } from '@/lib/database'

export async function GET() {
  try {
    console.log('🔍 Checking multi-database status...')
    
    // Test connectivity to all services
    const connectivity = await MultiDatabaseService.testConnectivity()
    
    // Get all organizations
    const organizations = await MainDatabaseService.getAllOrganizations()
    
    // Check organization databases in each service
    const organizationStatus = []
    
    for (const org of organizations) {
      const orgStatus = {
        id: org.id,
        name: org.name,
        services: {} as { [key: string]: { exists: boolean; info?: any; error?: string } }
      }
      
      for (const serviceName of ['billing', 'crm', 'pingora'] as const) {
        try {
          const info = await MultiDatabaseService.getOrganizationInfo(serviceName, org.name)
          orgStatus.services[serviceName] = {
            exists: !!info,
            info: info || undefined
          }
        } catch (error) {
          orgStatus.services[serviceName] = {
            exists: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        }
      }
      
      organizationStatus.push(orgStatus)
    }
    
    return NextResponse.json({
      connectivity,
      organizationCount: organizations.length,
      organizationStatus,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error checking multi-database status:', error)
    return NextResponse.json(
      { error: 'Failed to check multi-database status' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, organizationId } = await request.json()
    
    if (action === 'test-connectivity') {
      const connectivity = await MultiDatabaseService.testConnectivity()
      return NextResponse.json({ connectivity })
    }
    
    if (action === 'recreate-databases' && organizationId) {
      // Get organization data
      const organization = await MainDatabaseService.getOrganizationById(organizationId)
      if (!organization) {
        return NextResponse.json(
          { error: 'Organization not found' },
          { status: 404 }
        )
      }
      
      // Recreate databases
      const result = await MultiDatabaseService.createOrganizationDatabases({
        id: organization.id,
        name: organization.name,
        adminEmail: organization.adminEmail
      })
      
      return NextResponse.json({ result })
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
    
  } catch (error) {
    console.error('Error in multi-database action:', error)
    return NextResponse.json(
      { error: 'Failed to perform action' },
      { status: 500 }
    )
  }
}
