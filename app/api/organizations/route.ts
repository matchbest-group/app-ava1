import { NextRequest, NextResponse } from 'next/server'
import { MainDatabaseService, OrganizationDatabaseService } from '@/lib/database'
import { FallbackDatabaseService } from '@/lib/fallback-database'
import { Organization } from '@/lib/types'

// GET - Get all organizations
export async function GET() {
  try {
    let organizations
    try {
      organizations = await MainDatabaseService.getAllOrganizations()
    } catch (error) {
      console.log('MongoDB failed, using fallback database')
      organizations = await FallbackDatabaseService.getAllOrganizations()
    }
    return NextResponse.json(organizations)
  } catch (error) {
    console.error('Error fetching organizations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    )
  }
}

// POST - Create new organization
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate unique organization ID
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    const orgId = `ORG_${timestamp}_${randomStr}`.toUpperCase()
    
    const organizationData: Omit<Organization, '_id' | 'createdAt' | 'updatedAt'> = {
      id: orgId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      industry: body.industry,
      employeeCount: body.employeeCount,
      foundedYear: body.foundedYear,
      website: body.website,
      description: body.description,
      adminEmail: body.adminEmail,
      adminPassword: body.adminPassword,
      licenseStatus: 'active',
      licenseExpiry: body.licenseExpiry
    }
    
    let organization
    try {
      organization = await MainDatabaseService.createOrganization(organizationData)
      
      // Create organization admin in the organization-specific database
      try {
        await OrganizationDatabaseService.createOrganizationAdmin(organization.name, {
          email: organization.adminEmail,
          password: organization.adminPassword,
          organizationId: organization.id,
          organizationName: organization.name,
          role: 'admin',
          isActive: true
        })
      } catch (error) {
        console.error('Error creating organization admin:', error)
      }
    } catch (error) {
      console.log('MongoDB failed, using fallback database')
      organization = await FallbackDatabaseService.createOrganization(organizationData)
    }
    
    return NextResponse.json(organization, { status: 201 })
  } catch (error) {
    console.error('Error creating organization:', error)
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    )
  }
}
