"use client"
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileText, 
  Settings,
  Globe,
  Database,
  LogOut,
  Shield,
  Sparkles,
  Activity
} from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: Activity,
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    name: 'Organizations',
    href: '/admin/organization',
    icon: Building2,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Multi-Database',
    href: '/admin/multi-database',
    icon: Database,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Auth Demo',
    href: '/admin/demo',
    icon: Shield,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    name: 'Leads',
    href: '/admin/leads',
    icon: Users,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    name: 'Website',
    href: '/admin/website',
    icon: Globe,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'CMS',
    href: '/admin/cms',
    icon: FileText,
    gradient: 'from-teal-500 to-cyan-500'
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [adminUser, setAdminUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = async () => {
    try {
      // Check if we're on the login page
      if (pathname === '/admin/login') {
        setLoading(false)
        return
      }

      // Check local storage for admin auth
      const adminAuth = localStorage.getItem('adminAuth')
      if (!adminAuth) {
        router.push('/admin/login')
        return
      }

      const authData = JSON.parse(adminAuth)
      const loginTime = new Date(authData.timestamp)
      const now = new Date()
      const hoursSinceLogin = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)

      // Session expires after 24 hours
      if (hoursSinceLogin > 24) {
        localStorage.removeItem('adminAuth')
        router.push('/admin/login')
        return
      }

      setIsAuthenticated(true)
      setAdminUser(authData)
    } catch (error) {
      console.error('Authentication check failed:', error)
      router.push('/admin/login')
    }

    setLoading(false)
  }

  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch('/api/admin/login', { method: 'DELETE' })
      
      // Clear local storage
      localStorage.removeItem('adminAuth')
      
      // Redirect to login
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Force redirect even if API fails
      localStorage.removeItem('adminAuth')
      router.push('/admin/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // If on login page, just render children
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Sidebar */}
      <div className="w-72 bg-white/95 backdrop-blur-sm shadow-xl border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <p className="text-xs text-gray-500">Avaone Suite</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {adminUser?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {adminUser?.email}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg transform scale-[1.02]'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-[1.01]'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                <span className="font-medium">{item.name}</span>
                {isActive && <Sparkles className="h-4 w-4 ml-auto animate-pulse" />}
              </Link>
            )
          })}
        </nav>

        {/* System Status */}
        <div className="mt-6 mx-4 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">System Status</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-700">All Services Online</span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
