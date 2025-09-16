'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  TextEditor, 
  ImageEditor, 
  ListEditor, 
  SectionEditor 
} from '@/components/admin/content-editors'
import { Save, ArrowLeft, RefreshCw, Eye } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface HomepageContent {
  hero: {
    title: string
    subtitle: string
    ctaText: string
    backgroundImage: string
    features: string[]
  }
  stats: {
    users: string
    countries: string
    uptime: string
    awards: string
  }
  testimonials: Array<{
    name: string
    position: string
    content: string
    rating: number
    avatar: string
  }>
  features: {
    title: string
    subtitle: string
    categories: Array<{
      name: string
      icon: string
      items: Array<{
        name: string
        description: string
      }>
    }>
  }
}

export default function HomepageEditor() {
  const router = useRouter()
  const { toast } = useToast()
  const [content, setContent] = useState<HomepageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/cms/content?section=homepage')
      if (response.ok) {
        const data = await response.json()
        setContent(data.data || getDefaultContent())
      } else {
        setContent(getDefaultContent())
      }
    } catch (error) {
      console.error('Error loading content:', error)
      setContent(getDefaultContent())
      toast({
        title: "Error",
        description: "Failed to load content. Using defaults.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const getDefaultContent = (): HomepageContent => ({
    hero: {
      title: "Transform Your Business with AI-Powered Solutions",
      subtitle: "Streamline operations, boost productivity, and drive growth with our comprehensive business automation platform",
      ctaText: "Start Free Trial",
      backgroundImage: "/bg1.jpg",
      features: [
        "AI-Powered Analytics",
        "Real-time Collaboration", 
        "Enterprise Security",
        "24/7 Support"
      ]
    },
    stats: {
      users: "500K+",
      countries: "150+", 
      uptime: "99.9%",
      awards: "50+"
    },
    testimonials: [
      {
        name: "Sarah Johnson",
        position: "CEO, TechStartup Inc.",
        content: "This platform has transformed our business operations. The AI-driven insights have helped us increase efficiency by 40% in just 3 months.",
        rating: 5,
        avatar: "/placeholder-logo.png"
      }
    ],
    features: {
      title: "Everything You Need to Succeed",
      subtitle: "Comprehensive suite of tools and features designed to accelerate your business growth",
      categories: [
        {
          name: "Core Features",
          icon: "rocket",
          items: [
            {
              name: "AI-Powered Analytics",
              description: "Advanced machine learning algorithms provide deep business insights"
            },
            {
              name: "Real-time Dashboard", 
              description: "Monitor your business metrics with live updates and customizable views"
            }
          ]
        }
      ]
    }
  })

  const saveContent = async () => {
    if (!content) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/cms/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          section: 'homepage',
          data: content
        })
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Homepage content saved successfully!",
          variant: "default"
        })
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to save content. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (path: string, value: any) => {
    if (!content) return
    
    const pathArray = path.split('.')
    const newContent = { ...content }
    let current: any = newContent
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]]
    }
    
    current[pathArray[pathArray.length - 1]] = value
    setContent(newContent)
  }

  const addTestimonial = () => {
    if (!content) return
    
    const newTestimonial = {
      name: "New Customer",
      position: "Job Title, Company",
      content: "Add testimonial content here...",
      rating: 5,
      avatar: "/placeholder-logo.png"
    }
    
    setContent({
      ...content,
      testimonials: [...content.testimonials, newTestimonial]
    })
  }

  const removeTestimonial = (index: number) => {
    if (!content) return
    
    setContent({
      ...content,
      testimonials: content.testimonials.filter((_, i) => i !== index)
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!content) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/admin/cms')}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to CMS
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Homepage Editor
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Edit homepage content, hero section, and features
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={loadContent}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={saveContent} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="hero" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <SectionEditor title="Hero Section" isVisible={true}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <TextEditor
                    label="Main Title"
                    value={content.hero.title}
                    onChange={(value) => updateContent('hero.title', value)}
                    placeholder="Enter main headline"
                  />
                  
                  <TextEditor
                    label="Subtitle"
                    value={content.hero.subtitle}
                    onChange={(value) => updateContent('hero.subtitle', value)}
                    multiline
                    placeholder="Enter subtitle description"
                  />
                  
                  <TextEditor
                    label="CTA Button Text"
                    value={content.hero.ctaText}
                    onChange={(value) => updateContent('hero.ctaText', value)}
                    placeholder="Call to action text"
                  />
                </div>
                
                <div className="space-y-6">
                  <ImageEditor
                    label="Background Image"
                    value={content.hero.backgroundImage}
                    onChange={(value) => updateContent('hero.backgroundImage', value)}
                    alt="Hero background"
                  />
                  
                  <ListEditor
                    label="Key Features"
                    items={content.hero.features}
                    onChange={(items) => updateContent('hero.features', items)}
                    placeholder="Add a feature"
                  />
                </div>
              </div>
            </SectionEditor>
          </TabsContent>

          <TabsContent value="stats">
            <SectionEditor title="Statistics Section" isVisible={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <TextEditor
                  label="Active Users"
                  value={content.stats.users}
                  onChange={(value) => updateContent('stats.users', value)}
                  placeholder="500K+"
                />
                
                <TextEditor
                  label="Countries"
                  value={content.stats.countries}
                  onChange={(value) => updateContent('stats.countries', value)}
                  placeholder="150+"
                />
                
                <TextEditor
                  label="Uptime"
                  value={content.stats.uptime}
                  onChange={(value) => updateContent('stats.uptime', value)}
                  placeholder="99.9%"
                />
                
                <TextEditor
                  label="Awards"
                  value={content.stats.awards}
                  onChange={(value) => updateContent('stats.awards', value)}
                  placeholder="50+"
                />
              </div>
            </SectionEditor>
          </TabsContent>

          <TabsContent value="testimonials">
            <SectionEditor title="Customer Testimonials" isVisible={true}>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Testimonials</h3>
                  <Button onClick={addTestimonial}>
                    Add Testimonial
                  </Button>
                </div>
                
                {content.testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline">Testimonial {index + 1}</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTestimonial(index)}
                        className="text-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextEditor
                        label="Customer Name"
                        value={testimonial.name}
                        onChange={(value) => updateContent(`testimonials.${index}.name`, value)}
                        placeholder="Customer name"
                      />
                      
                      <TextEditor
                        label="Position & Company"
                        value={testimonial.position}
                        onChange={(value) => updateContent(`testimonials.${index}.position`, value)}
                        placeholder="CEO, Company Name"
                      />
                      
                      <div className="md:col-span-2">
                        <TextEditor
                          label="Testimonial Content"
                          value={testimonial.content}
                          onChange={(value) => updateContent(`testimonials.${index}.content`, value)}
                          multiline
                          placeholder="Customer testimonial..."
                        />
                      </div>
                      
                      <ImageEditor
                        label="Avatar"
                        value={testimonial.avatar}
                        onChange={(value) => updateContent(`testimonials.${index}.avatar`, value)}
                        alt={testimonial.name}
                      />
                      
                      <TextEditor
                        label="Rating (1-5)"
                        value={testimonial.rating.toString()}
                        onChange={(value) => updateContent(`testimonials.${index}.rating`, parseInt(value) || 5)}
                        placeholder="5"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </SectionEditor>
          </TabsContent>

          <TabsContent value="features">
            <SectionEditor title="Features Section" isVisible={true}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TextEditor
                    label="Section Title"
                    value={content.features.title}
                    onChange={(value) => updateContent('features.title', value)}
                    placeholder="Features section title"
                  />
                  
                  <TextEditor
                    label="Section Subtitle"
                    value={content.features.subtitle}
                    onChange={(value) => updateContent('features.subtitle', value)}
                    multiline
                    placeholder="Features section description"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Feature Categories</h3>
                  {content.features.categories.map((category, categoryIndex) => (
                    <Card key={categoryIndex} className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline">Category {categoryIndex + 1}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <TextEditor
                            label="Category Name"
                            value={category.name}
                            onChange={(value) => updateContent(`features.categories.${categoryIndex}.name`, value)}
                            placeholder="Category name"
                          />
                          
                          <TextEditor
                            label="Icon Name"
                            value={category.icon}
                            onChange={(value) => updateContent(`features.categories.${categoryIndex}.icon`, value)}
                            placeholder="rocket"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Features in this category:</h4>
                          {category.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 border rounded">
                              <TextEditor
                                label="Feature Name"
                                value={item.name}
                                onChange={(value) => updateContent(`features.categories.${categoryIndex}.items.${itemIndex}.name`, value)}
                                placeholder="Feature name"
                              />
                              
                              <TextEditor
                                label="Feature Description"
                                value={item.description}
                                onChange={(value) => updateContent(`features.categories.${categoryIndex}.items.${itemIndex}.description`, value)}
                                multiline
                                placeholder="Feature description"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </SectionEditor>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
