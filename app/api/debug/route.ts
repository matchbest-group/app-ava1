import { NextResponse } from 'next/server'
import { FallbackDatabaseService } from '@/lib/fallback-database'

export async function GET() {
  try {
    console.log('=== DEBUG /api/debug ===')
    
    // Test fallback database
    const organizations = await FallbackDatabaseService.getAllOrganizations()
    const workspaceUsers = await FallbackDatabaseService.getAllWorkspaceUsers()
    
    console.log('📊 Fallback Database Status:')
    console.log(`  Organizations: ${organizations.length}`)
    console.log(`  Workspace Users: ${workspaceUsers.length}`)
    
    return NextResponse.json({
      status: 'success',
      fallbackDatabase: {
        organizations: organizations.length,
        workspaceUsers: workspaceUsers.length,
        sampleData: organizations.length > 0 || workspaceUsers.length > 0
      },
      message: 'Fallback database is working correctly'
    })
  } catch (error) {
    console.error('❌ Debug endpoint error:', error)
    return NextResponse.json(
      { 
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Fallback database has issues'
      },
      { status: 500 }
    )
  }
}
