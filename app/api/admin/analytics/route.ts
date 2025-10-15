import { NextRequest, NextResponse } from 'next/server'
import { getServiceDbByOrgId, getServiceDb } from '@/lib/multi-database'

interface OrganizationAnalytics {
  organizationId: string
  organizationName: string
  createdAt: string
  services: {
    [serviceName: string]: {
      connected: boolean
      databaseName?: string
      collections: {
        name: string
        documentCount: number
        indexes: number
        sizeBytes: number
      }[]
      totalCollections: number
      totalDocuments: number
      totalSizeBytes: number
      error?: string
    }
  }
  totalClusters: number
  totalDatabases: number
  totalCollections: number
  totalDocuments: number
  totalSizeBytes: number
}

interface SystemAnalytics {
  organizations: OrganizationAnalytics[]
  summary: {
    totalOrganizations: number
    totalClusters: number
    totalDatabases: number
    totalCollections: number
    totalDocuments: number
    totalSizeBytes: number
    serviceBreakdown: {
      [serviceName: string]: {
        connectedOrgs: number
        totalDatabases: number
        totalCollections: number
        totalDocuments: number
      }
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Gathering organization analytics...')
    
    // Get all organizations from the same source as dashboard
    let organizations
    try {
      // Use the same method as dashboard - fetch from /api/organizations internally
      const { MainDatabaseService } = await import('@/lib/database')
      organizations = await MainDatabaseService.getAllOrganizations()
      console.log(`📊 Found ${organizations.length} organizations from MainDatabaseService`)
    } catch (error) {
      console.error('Failed to fetch from MainDatabaseService, trying fallback:', error)
      const { FallbackDatabaseService } = await import('@/lib/fallback-database')
      organizations = await FallbackDatabaseService.getAllOrganizations()
      console.log(`📊 Found ${organizations.length} organizations from FallbackDatabaseService`)
    }

    if (!organizations || organizations.length === 0) {
      console.log('⚠️ No organizations found in database')
      return NextResponse.json({
        success: true,
        data: {
          organizations: [],
          summary: {
            totalOrganizations: 0,
            totalClusters: 3,
            totalDatabases: 0,
            totalCollections: 0,
            totalDocuments: 0,
            totalSizeBytes: 0,
            serviceBreakdown: {
              billing: { connectedOrgs: 0, totalDatabases: 0, totalCollections: 0, totalDocuments: 0 },
              crm: { connectedOrgs: 0, totalDatabases: 0, totalCollections: 0, totalDocuments: 0 },
              pingora: { connectedOrgs: 0, totalDatabases: 0, totalCollections: 0, totalDocuments: 0 }
            }
          }
        },
        message: 'No organizations found in database'
      })
    }

    const organizationAnalytics: OrganizationAnalytics[] = []
    const serviceNames = ['billing', 'crm', 'pingora'] as const
    
    // Analyze each organization
    for (const org of organizations) {
      console.log(`🔍 Analyzing organization: ${org.name}`)
      
      const orgAnalytics: OrganizationAnalytics = {
        organizationId: org.id,
        organizationName: org.name,
        createdAt: org.createdAt,
        services: {},
        totalClusters: 3, // We have 3 service clusters (billing, crm, pingora)
        totalDatabases: 0,
        totalCollections: 0,
        totalDocuments: 0,
        totalSizeBytes: 0
      }

      // Check each service database for this organization using ORG ID
      for (const serviceName of serviceNames) {
        try {
          // Use new method with org ID for precise database lookup
          const serviceDb = await getServiceDbByOrgId(serviceName, org.id, org.name)
          
          if (!serviceDb) {
            orgAnalytics.services[serviceName] = {
              connected: false,
              collections: [],
              totalCollections: 0,
              totalDocuments: 0,
              totalSizeBytes: 0,
              error: 'Connection failed'
            }
            continue
          }

          const sanitizedCompanyName = org.name.toLowerCase().replace(/[^a-z0-9]/g, '_')
          // NEW Database naming with ORG ID
          const databaseName = `${serviceName}_${org.id}_${sanitizedCompanyName}`
          console.log(`📊 Analyzing database: ${databaseName}`)

          // Get all collections in this database
          const collections = await serviceDb.listCollections().toArray()
          const collectionAnalytics = []
          let totalDocuments = 0
          let totalSizeBytes = 0

          for (const collectionInfo of collections) {
            const collectionName = collectionInfo.name
            const collection = serviceDb.collection(collectionName)

            try {
              // Get document count
              const documentCount = await collection.countDocuments()
              
              // Get collection stats
              let collectionSize = 0
              let indexCount = 0
              
              try {
                const stats = await serviceDb.command({ collStats: collectionName })
                collectionSize = stats.size || 0
                indexCount = stats.nindexes || 0
              } catch (statsError) {
                // Stats command might fail for some collections, use defaults
                indexCount = 1 // At least _id index
              }

              collectionAnalytics.push({
                name: collectionName,
                documentCount,
                indexes: indexCount,
                sizeBytes: collectionSize
              })

              totalDocuments += documentCount
              totalSizeBytes += collectionSize

            } catch (collectionError) {
              console.error(`Error analyzing collection ${collectionName}:`, collectionError)
              collectionAnalytics.push({
                name: collectionName,
                documentCount: 0,
                indexes: 0,
                sizeBytes: 0
              })
            }
          }

          orgAnalytics.services[serviceName] = {
            connected: true,
            databaseName,
            collections: collectionAnalytics,
            totalCollections: collections.length,
            totalDocuments,
            totalSizeBytes
          }

          // Add to organization totals
          orgAnalytics.totalDatabases += 1
          orgAnalytics.totalCollections += collections.length
          orgAnalytics.totalDocuments += totalDocuments
          orgAnalytics.totalSizeBytes += totalSizeBytes

        } catch (serviceError) {
          console.error(`Error analyzing ${serviceName} for ${org.name}:`, serviceError)
          orgAnalytics.services[serviceName] = {
            connected: false,
            collections: [],
            totalCollections: 0,
            totalDocuments: 0,
            totalSizeBytes: 0,
            error: serviceError instanceof Error ? serviceError.message : 'Unknown error'
          }
        }
      }

      organizationAnalytics.push(orgAnalytics)
    }

    // Calculate system-wide summary
    const summary = {
      totalOrganizations: organizations.length,
      totalClusters: 3, // We have 3 clusters (billing, crm, pingora)
      totalDatabases: organizationAnalytics.reduce((sum, org) => sum + org.totalDatabases, 0),
      totalCollections: organizationAnalytics.reduce((sum, org) => sum + org.totalCollections, 0),
      totalDocuments: organizationAnalytics.reduce((sum, org) => sum + org.totalDocuments, 0),
      totalSizeBytes: organizationAnalytics.reduce((sum, org) => sum + org.totalSizeBytes, 0),
      serviceBreakdown: {} as any
    }

    // Calculate service breakdown
    for (const serviceName of serviceNames) {
      let connectedOrgs = 0
      let totalDatabases = 0
      let totalCollections = 0
      let totalDocuments = 0

      for (const org of organizationAnalytics) {
        const serviceData = org.services[serviceName]
        if (serviceData && serviceData.connected) {
          connectedOrgs += 1
          totalDatabases += 1
          totalCollections += serviceData.totalCollections
          totalDocuments += serviceData.totalDocuments
        }
      }

      summary.serviceBreakdown[serviceName] = {
        connectedOrgs,
        totalDatabases,
        totalCollections,
        totalDocuments
      }
    }

    const analyticsData: SystemAnalytics = {
      organizations: organizationAnalytics,
      summary
    }

    console.log('✅ Analytics gathering completed')

    return NextResponse.json({
      success: true,
      data: analyticsData,
      message: `Analytics collected for ${organizations.length} organizations`
    })

  } catch (error) {
    console.error('❌ Error gathering analytics:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to gather analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Get analytics for a specific organization
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId } = body

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      )
    }

    console.log(`🔍 Getting detailed analytics for organization: ${organizationId}`)

    // Get organization from the same source as dashboard
    let organization
    try {
      const { MainDatabaseService } = await import('@/lib/database')
      organization = await MainDatabaseService.getOrganizationById(organizationId)
      console.log(`📊 Found organization via MainDatabaseService: ${organization?.name}`)
    } catch (error) {
      console.error('Failed to fetch from MainDatabaseService, trying fallback:', error)
      const { FallbackDatabaseService } = await import('@/lib/fallback-database')
      organization = await FallbackDatabaseService.getOrganizationById(organizationId)
      console.log(`📊 Found organization via FallbackDatabaseService: ${organization?.name}`)
    }

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found in database' },
        { status: 404 }
      )
    }

    // Get detailed analytics for this organization (reuse the logic from GET)
    const serviceNames = ['billing', 'crm', 'pingora'] as const
    const orgAnalytics: OrganizationAnalytics = {
      organizationId: organization.id,
      organizationName: organization.name,
      createdAt: organization.createdAt,
      services: {},
      totalClusters: 3,
      totalDatabases: 0,
      totalCollections: 0,
      totalDocuments: 0,
      totalSizeBytes: 0
    }

    // Detailed analysis for each service using ORG ID
    for (const serviceName of serviceNames) {
      try {
        // Use new method with org ID for precise database lookup
        const serviceDb = await getServiceDbByOrgId(serviceName, organization.id, organization.name)
        
        if (!serviceDb) {
          orgAnalytics.services[serviceName] = {
            connected: false,
            collections: [],
            totalCollections: 0,
            totalDocuments: 0,
            totalSizeBytes: 0,
            error: 'Connection failed'
          }
          continue
        }

        const sanitizedCompanyName = organization.name.toLowerCase().replace(/[^a-z0-9]/g, '_')
        // NEW Database naming with ORG ID
        const databaseName = `${serviceName}_${organization.id}_${sanitizedCompanyName}`
        console.log(`📊 Detailed analysis of database: ${databaseName}`)

        // Get detailed collection information
        const collections = await serviceDb.listCollections().toArray()
        const collectionAnalytics = []
        let totalDocuments = 0
        let totalSizeBytes = 0

        for (const collectionInfo of collections) {
          const collectionName = collectionInfo.name
          const collection = serviceDb.collection(collectionName)

          try {
            const documentCount = await collection.countDocuments()
            
            let collectionSize = 0
            let indexCount = 0
            
            try {
              const stats = await serviceDb.command({ collStats: collectionName })
              collectionSize = stats.size || 0
              indexCount = stats.nindexes || 0
            } catch (statsError) {
              indexCount = 1
            }

            // Get sample documents for analysis
            const sampleDocs = await collection.find({}).limit(5).toArray()

            collectionAnalytics.push({
              name: collectionName,
              documentCount,
              indexes: indexCount,
              sizeBytes: collectionSize,
              sampleDocuments: sampleDocs.length
            })

            totalDocuments += documentCount
            totalSizeBytes += collectionSize

          } catch (collectionError) {
            console.error(`Error analyzing collection ${collectionName}:`, collectionError)
            collectionAnalytics.push({
              name: collectionName,
              documentCount: 0,
              indexes: 0,
              sizeBytes: 0,
              sampleDocuments: 0
            })
          }
        }

        orgAnalytics.services[serviceName] = {
          connected: true,
          databaseName,
          collections: collectionAnalytics,
          totalCollections: collections.length,
          totalDocuments,
          totalSizeBytes
        }

        orgAnalytics.totalDatabases += 1
        orgAnalytics.totalCollections += collections.length
        orgAnalytics.totalDocuments += totalDocuments
        orgAnalytics.totalSizeBytes += totalSizeBytes

      } catch (serviceError) {
        console.error(`Error analyzing ${serviceName} for ${organization.name}:`, serviceError)
        orgAnalytics.services[serviceName] = {
          connected: false,
          collections: [],
          totalCollections: 0,
          totalDocuments: 0,
          totalSizeBytes: 0,
          error: serviceError instanceof Error ? serviceError.message : 'Unknown error'
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: orgAnalytics,
      message: `Detailed analytics for ${organization.name}`
    })

  } catch (error) {
    console.error('❌ Error getting organization analytics:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to get organization analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
