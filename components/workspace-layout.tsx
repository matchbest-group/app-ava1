'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Briefcase, 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  Users, 
  BarChart3, 
  FileText,
  Menu,
  X,
  ExternalLink,
  Shield,
  Lock,
  Edit3
} from 'lucide-react'
import { isAdmin, canManageTeam, canManageProducts, hasPermission, PERMISSIONS, getRoleDisplayName, getRoleBadgeVariant } from '@/lib/permissions'
import { VoiceBot } from '@/components/voice-bot'
import { VoiceBotProvider } from '@/components/voice-bot-context'

interface WorkspaceLayoutProps {
  children: React.ReactNode
  user: any
  selectedProducts: any[]
}

export default function WorkspaceLayout({ children, user, selectedProducts }: WorkspaceLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profilePicture, setProfilePicture] = useState<string>('')
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Load profile picture from database
  useEffect(() => {
    const loadProfilePicture = async () => {
      if (!user?.email) {
        console.log('⚠️ No user email available for profile picture loading')
        return
      }
      
      // First, ensure user exists in database
      console.log('👤 Ensuring user exists in database:', user.email)
      try {
        await fetch('/api/workspace/ensure-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            organizationName: user.organizationName,
            plan: user.plan
          }),
        })
        console.log('✅ User existence ensured in database')
      } catch (ensureError) {
        console.warn('⚠️ Could not ensure user exists in database:', ensureError)
      }
      
      console.log('🔍 Loading profile image from database for workspace layout:', user.email)
      
      try {
        const response = await fetch(`/api/workspace/profile-image?email=${encodeURIComponent(user.email)}`)
        
        if (!response.ok) {
          console.warn('⚠️ API response not OK:', response.status, response.statusText)
          console.warn('📱 Skipping database, will use localStorage or default')
          
          // Don't throw error, just handle gracefully
          const savedProfilePicture = localStorage.getItem('workspaceProfilePicture')
          if (savedProfilePicture) {
            setProfilePicture(savedProfilePicture)
            console.log('📱 Using profile image from localStorage (API failed)')
          } else {
            console.log('📷 Using default avatar (API failed, no localStorage)')
            setProfilePicture('/avatars/avatar-1.png')
          }
          return // Exit early, don't try to parse response
        }
        
        const data = await response.json()
        console.log('📡 Profile image API response:', data)
        
        if (data.success && data.profileImage) {
          setProfilePicture(data.profileImage)
          // Also update localStorage for consistency
          localStorage.setItem('workspaceProfilePicture', data.profileImage)
          console.log('✅ Profile image loaded in workspace layout from database')
        } else {
          console.warn('⚠️ No profile image in database response, checking localStorage...')
          // Fallback to localStorage
          const savedProfilePicture = localStorage.getItem('workspaceProfilePicture')
          if (savedProfilePicture) {
            setProfilePicture(savedProfilePicture)
            console.log('📱 Using profile image from localStorage in layout')
          } else {
            console.log('📷 No profile image found anywhere, using default')
            setProfilePicture('/avatars/avatar-1.png')
          }
        }
      } catch (error) {
        console.error('❌ Error loading profile image in workspace layout:', error)
        // Fallback to localStorage
        const savedProfilePicture = localStorage.getItem('workspaceProfilePicture')
        if (savedProfilePicture) {
          setProfilePicture(savedProfilePicture)
          console.log('📱 Fallback: Using profile image from localStorage')
        } else {
          console.log('📷 Fallback: Using default avatar')
          setProfilePicture('/avatars/avatar-1.png')
        }
      }
    }

    loadProfilePicture()
  }, [user?.email])

  const handleLogout = () => {
    localStorage.removeItem('workspaceAuthenticated')
    localStorage.removeItem('workspaceUser')
    localStorage.removeItem('currentOrganization')
    localStorage.removeItem('workspaceProfilePicture') // Clear profile picture on logout
    console.log('🔴 Logout: Cleared all workspace data including profile picture')
    router.push('/workspace/login')
  }

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      href: '/workspace/dashboard',
      current: pathname === '/workspace/dashboard',
      permission: null, // Always accessible
      description: 'Overview and metrics'
    },
    {
      name: 'Products',
      icon: Briefcase,
      href: '/workspace/products',
      current: pathname === '/workspace/products',
      permission: PERMISSIONS.PRODUCTS_VIEW,
      adminOnly: false,
      description: 'Manage product access'
    },
    {
      name: 'Team',
      icon: Users,
      href: '/workspace/team',
      current: pathname === '/workspace/team',
      permission: PERMISSIONS.TEAM_VIEW,
      adminOnly: true, // Only admins can manage team
      description: 'Team management (Admin only)'
    },
    {
      name: 'Analytics',
      icon: BarChart3,
      href: '/workspace/analytics',
      current: pathname === '/workspace/analytics',
      permission: PERMISSIONS.ANALYTICS_VIEW,
      adminOnly: false,
      description: 'View analytics and insights'
    },
    {
      name: 'Reports',
      icon: FileText,
      href: '/workspace/reports',
      current: pathname === '/workspace/reports',
      permission: PERMISSIONS.REPORTS_VIEW,
      adminOnly: false,
      description: 'Generate and view reports'
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/workspace/settings',
      current: pathname === '/workspace/settings',
      permission: PERMISSIONS.SETTINGS_MANAGE,
      adminOnly: true, // Only admins can access settings
      description: 'System settings (Admin only)'
    }
  ]

  // Filter navigation items based on user permissions
  const filteredNavigationItems = navigationItems.filter(item => {
    // Dashboard is always accessible
    if (!item.permission) return true
    
    // If user is not loaded yet, show basic items only
    if (!user) return !item.adminOnly
    
    // Check admin-only items
    if (item.adminOnly && !isAdmin(user)) return false
    
    // Check specific permissions
    return hasPermission(user, item.permission)
  })

  const getPageTitle = () => {
    const currentItem = filteredNavigationItems.find(item => item.current)
    return currentItem ? currentItem.name : 'Dashboard'
  }

  return (
    <VoiceBotProvider>
      <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-semibold text-gray-900 truncate">Workspace</h1>
                <p className="text-xs text-gray-500 truncate">{user?.organizationName}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info with role */}
          <div className="px-4 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Avatar className="w-10 h-10">
                  {profilePicture ? (
                    <AvatarImage src={profilePicture} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-blue-500 text-white">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Welcome back
                  </p>
                  {isAdmin(user) && (
                    <div title="Administrator">
                      <Shield className="w-3 h-3 text-red-500" />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {user?.role && (
                    <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                      {getRoleDisplayName(user.role)}
                    </Badge>
                  )}
                  <p className="text-xs text-gray-500 truncate">{user?.organizationName || 'Loading...'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {filteredNavigationItems.map((item) => (
              <div key={item.name} className="relative">
                <a
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={item.description}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate flex-1">{item.name}</span>
                  {item.adminOnly && (
                    <div title="Admin Only">
                      <Lock className="w-3 h-3 text-gray-400 ml-2 flex-shrink-0" />
                    </div>
                  )}
                </a>
              </div>
            ))}
            
            {/* Show restricted items for non-admin users */}
            {!isAdmin(user) && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Restricted Access
                </p>
                {navigationItems.filter(item => item.adminOnly && !hasPermission(user, item.permission || '')).map((item) => (
                  <div key={`restricted-${item.name}`} className="flex items-center px-3 py-2 text-sm text-gray-400 cursor-not-allowed">
                    <item.icon className="w-5 h-5 mr-3 flex-shrink-0 opacity-50" />
                    <span className="truncate flex-1 opacity-50">{item.name}</span>
                    <Lock className="w-3 h-3 ml-2 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </nav>

          {/* Selected Products */}
          {selectedProducts.length > 0 && (
            <div className="px-4 py-4 border-t border-gray-200 flex-shrink-0">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Your Products
              </h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-3 h-3 rounded-full ${product.color} mr-3 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                    </div>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User info and logout */}
          <div className="px-4 py-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                  <AvatarImage src={profilePicture} alt={user?.organizationName} className="object-cover" />
                  <AvatarFallback className="text-sm font-medium bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {user?.organizationName?.substring(0, 2).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.organizationName || user?.email}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {user?.plan} Plan
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-sm">
                  {selectedProducts.length} Products Active
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Voice Bot */}
      <VoiceBot 
        isOpen={isVoiceBotOpen} 
        onToggle={() => setIsVoiceBotOpen(!isVoiceBotOpen)}
        isHeaderTriggered={true}
      />
    </div>
    </VoiceBotProvider>
  )
}
