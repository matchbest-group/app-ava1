import { NextRequest, NextResponse } from 'next/server'
import { OrganizationDatabaseService } from '@/lib/database'
import { OrganizationAdmin, OrganizationUser } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationName = searchParams.get('organization')
    
    if (!organizationName) {
      return NextResponse.json(
        { error: 'Organization name is required' },
        { status: 400 }
      )
    }

    // Fetch all users from the organization database
    const users = await OrganizationDatabaseService.getAllOrganizationUsers(organizationName)
    
    // Transform users to match the frontend interface
    const transformedUsers = users.map((user: any, index: number) => {
      const firstName = user.firstName || user.email.split('@')[0].split('.')[0]
      const lastName = user.lastName || user.email.split('@')[0].split('.')[1] || ''
      const fullName = `${firstName} ${lastName}`.trim()
      
      // Generate consistent avatar based on user email
      const avatarSeed = user.email.split('@')[0]
      const avatarUrls = [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b2e7c24b?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
      ]
      const avatarIndex = avatarSeed.charCodeAt(0) % avatarUrls.length
      
      return {
        id: user._id || user.accountId || user.email,
        name: fullName || firstName || 'Unknown User',
        email: user.email,
        avatar: avatarUrls[avatarIndex],
        role: user.role === 'admin' ? 'Administrator' : 
              user.role === 'employee' ? 'Employee' : 'User',
        joinedAt: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-01',
        status: user.isActive ? 'active' : 'inactive',
        department: user.department || 'General',
        position: user.position || (user.role === 'admin' ? 'Administrator' : 'Team Member'),
        permissions: user.role === 'admin' ? ['all'] : ['read', 'write']
      }
    })

    return NextResponse.json(transformedUsers)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}
