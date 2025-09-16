'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Edit3, 
  Image, 
  FileText, 
  DollarSign, 
  Users, 
  BarChart3, 
  Settings,
  Eye,
  Save,
  RefreshCw,
  Upload,
  Palette,
  Globe
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ContentSection {
  id: string
  name: string
  description: string
  lastModified: string
  status: 'published' | 'draft' | 'pending'
  type: 'page' | 'component' | 'media' | 'data'
  icon: any
}

const contentSections: ContentSection[] = [
  {
    id: 'homepage',
    name: 'Homepage',
    description: 'Hero section, features, testimonials, and all homepage content',
    lastModified: '2 hours ago',
    status: 'published',
    type: 'page',
    icon: Globe
  },
  {
    id: 'products',
    name: 'Products & Services',
    description: 'Product catalog, pricing, bundles, and service descriptions',
    lastModified: '1 day ago',
    status: 'published',
    type: 'page',
    icon: FileText
  },
  {
    id: 'pricing',
    name: 'Pricing & Plans',
    description: 'Pricing tables, plan features, and promotional offers',
    lastModified: '3 days ago',
    status: 'draft',
    type: 'page',
    icon: DollarSign
  },
  {
    id: 'about',
    name: 'About & Company',
    description: 'Company information, team details, and mission statement',
    lastModified: '1 week ago',
    status: 'published',
    type: 'page',
    icon: Users
  },
  {
    id: 'media',
    name: 'Media Library',
    description: 'Images, videos, icons, and other media assets',
    lastModified: '5 hours ago',
    status: 'published',
    type: 'media',
    icon: Image
  },
  {
    id: 'components',
    name: 'Shared Components',
    description: 'Header, footer, navigation, and reusable components',
    lastModified: '2 days ago',
    status: 'published',
    type: 'component',
    icon: Settings
  },
  {
    id: 'testimonials',
    name: 'Testimonials & Reviews',
    description: 'Customer testimonials, reviews, and success stories',
    lastModified: '4 days ago',
    status: 'published',
    type: 'data',
    icon: BarChart3
  },
  {
    id: 'blog',
    name: 'Blog & News',
    description: 'Blog posts, news articles, and company updates',
    lastModified: '6 hours ago',
    status: 'draft',
    type: 'page',
    icon: Edit3
  }
]

const quickStats = [
  { label: 'Total Pages', value: '12', change: '+2 this month', icon: Globe },
  { label: 'Media Files', value: '147', change: '+23 this week', icon: Image },
  { label: 'Draft Changes', value: '5', change: '3 pending review', icon: Edit3 },
  { label: 'Last Backup', value: '2h ago', change: 'Auto-backup enabled', icon: RefreshCw }
]

export default function AdminCMSPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      // Check if user is admin
      if (parsedUser.role !== 'admin' && parsedUser.role !== undefined) {
        router.push('/workspace/dashboard')
        return
      }
    } else {
      router.push('/admin')
      return
    }
  }, [router])

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published': return 'default'
      case 'draft': return 'secondary'
      case 'pending': return 'destructive'
      default: return 'outline'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return Globe
      case 'component': return Settings
      case 'media': return Image
      case 'data': return BarChart3
      default: return FileText
    }
  }

  const handleSectionEdit = (sectionId: string) => {
    router.push(`/admin/cms/${sectionId}`)
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Content Management System
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Manage all website content, images, and data
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Preview Site
              </Button>
              <Button className="flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Publish All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </p>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {stat.label}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {stat.change}
                          </p>
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                          <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Content Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentSections.map((section) => {
                const IconComponent = section.icon
                return (
                  <Card key={section.id} className="group hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                            <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{section.name}</CardTitle>
                            <Badge variant={getStatusBadgeVariant(section.status)} className="text-xs mt-1">
                              {section.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {section.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Modified {section.lastModified}
                        </span>
                        <Button 
                          size="sm" 
                          onClick={() => handleSectionEdit(section.id)}
                          className="group-hover:scale-105 transition-transform"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Manage all website pages and their content sections.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contentSections.filter(s => s.type === 'page').map((page) => {
                    const IconComponent = page.icon
                    return (
                      <div key={page.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                            <div>
                              <h3 className="font-medium">{page.name}</h3>
                              <p className="text-sm text-gray-500">{page.description}</p>
                            </div>
                          </div>
                          <Button size="sm" onClick={() => handleSectionEdit(page.id)}>
                            Edit
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Upload Media Files
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Drag and drop files or click to browse
                  </p>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CMS Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Auto-backup</h3>
                      <p className="text-sm text-gray-600">Automatically backup content changes</p>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Preview Mode</h3>
                      <p className="text-sm text-gray-600">Show draft changes on live site</p>
                    </div>
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
