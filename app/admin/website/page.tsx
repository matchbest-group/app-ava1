'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Upload, Save, Eye, Settings, ArrowRight } from 'lucide-react'

interface WebsiteContent {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
    ctaText: string
  }
  businessIntelligence: {
    title: string
    description: string
    features: string[]
    image: string
  }
  pricing: {
    title: string
    subtitle: string
    plans: Array<{
      name: string
      price: string
      features: string[]
      popular: boolean
    }>
  }
  contact: {
    title: string
    subtitle: string
    email: string
    phone: string
    address: string
  }
  promoBanner: {
    isVisible: boolean
    text: string
    backgroundColor: string
    textColor: string
    link?: string
  }
}

export default function AdminWebsitePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<WebsiteContent>({
    hero: {
      title: 'Welcome to AVA One',
      subtitle: 'Empowering businesses with cutting-edge solutions',
      backgroundImage: '/hero-bg.jpg',
      ctaText: 'Get Started'
    },
    businessIntelligence: {
      title: 'Business Intelligence',
      description: 'Transform your data into actionable insights',
      features: [
        'Real-time Analytics',
        'Custom Dashboards',
        'Data Visualization',
        'Predictive Analytics'
      ],
      image: '/bi-dashboard.png'
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Select the perfect plan for your business needs',
      plans: [
        {
          name: 'Starter',
          price: '$29/month',
          features: ['Basic Analytics', '5 Users', 'Email Support'],
          popular: false
        },
        {
          name: 'Professional',
          price: '$99/month',
          features: ['Advanced Analytics', '25 Users', 'Priority Support', 'Custom Reports'],
          popular: true
        },
        {
          name: 'Enterprise',
          price: '$299/month',
          features: ['Full Analytics Suite', 'Unlimited Users', '24/7 Support', 'Custom Integration'],
          popular: false
        }
      ]
    },
    contact: {
      title: 'Get in Touch',
      subtitle: 'Ready to transform your business? Contact us today!',
      email: 'contact@avaone.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business St, Tech City, TC 12345'
    },
    promoBanner: {
      isVisible: true,
      text: '🎉 Limited Time Offer: Get 50% OFF on all Premium Plans! Use code SAVE50',
      backgroundColor: '#6366f1',
      textColor: '#ffffff',
      link: '/pricing'
    }
  })

  // Load content from API
  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/website-content')
      if (response.ok) {
        const data = await response.json()
        // Ensure promoBanner exists in loaded data
        const contentWithBanner = {
          ...data,
          promoBanner: data.promoBanner || {
            isVisible: true,
            text: '🎉 Limited Time Offer: Get 50% OFF on all Premium Plans! Use code SAVE50',
            backgroundColor: '#6366f1',
            textColor: '#ffffff',
            link: '/pricing'
          }
        }
        setContent(contentWithBanner)
      }
    } catch (error) {
      console.error('Failed to load content:', error)
    }
  }

  const saveContent = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/website-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Website content updated successfully!'
        })
      } else {
        throw new Error('Failed to save content')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save content. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File, section: string, field: string) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('section', section)
    formData.append('field', field)

    try {
      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const { url } = await response.json()
        setContent(prev => ({
          ...prev,
          [section]: {
            ...prev[section as keyof WebsiteContent],
            [field]: url
          }
        }))
        
        toast({
          title: 'Success',
          description: 'Image uploaded successfully!'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload image.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Website Content Management</h1>
          <p className="text-gray-600">Manage your website content dynamically</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open('/', '_blank')}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={saveContent} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="business">Business Intelligence</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="banner">Promo Banner</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Manage the main hero banner on your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title">Main Title</Label>
                <Input
                  id="hero-title"
                  value={content.hero.title}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value }
                  }))}
                  placeholder="Enter main title"
                />
              </div>
              
              <div>
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={content.hero.subtitle}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value }
                  }))}
                  placeholder="Enter subtitle"
                />
              </div>

              <div>
                <Label htmlFor="hero-cta">Call to Action Text</Label>
                <Input
                  id="hero-cta"
                  value={content.hero.ctaText}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, ctaText: e.target.value }
                  }))}
                  placeholder="Enter CTA text"
                />
              </div>

              <div>
                <Label htmlFor="hero-bg">Background Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="hero-bg"
                    value={content.hero.backgroundImage}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, backgroundImage: e.target.value }
                    }))}
                    placeholder="Image URL or upload new"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('hero-upload')?.click()}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <input
                    id="hero-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, 'hero', 'backgroundImage')
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Intelligence Section</CardTitle>
              <CardDescription>Manage the Business Intelligence panel content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bi-title">Title</Label>
                <Input
                  id="bi-title"
                  value={content.businessIntelligence.title}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    businessIntelligence: { ...prev.businessIntelligence, title: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="bi-description">Description</Label>
                <Textarea
                  id="bi-description"
                  value={content.businessIntelligence.description}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    businessIntelligence: { ...prev.businessIntelligence, description: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label>Features</Label>
                {content.businessIntelligence.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...content.businessIntelligence.features]
                        newFeatures[index] = e.target.value
                        setContent(prev => ({
                          ...prev,
                          businessIntelligence: { ...prev.businessIntelligence, features: newFeatures }
                        }))
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newFeatures = content.businessIntelligence.features.filter((_, i) => i !== index)
                        setContent(prev => ({
                          ...prev,
                          businessIntelligence: { ...prev.businessIntelligence, features: newFeatures }
                        }))
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => setContent(prev => ({
                    ...prev,
                    businessIntelligence: {
                      ...prev.businessIntelligence,
                      features: [...prev.businessIntelligence.features, '']
                    }
                  }))}
                >
                  Add Feature
                </Button>
              </div>

              <div>
                <Label htmlFor="bi-image">Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="bi-image"
                    value={content.businessIntelligence.image}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      businessIntelligence: { ...prev.businessIntelligence, image: e.target.value }
                    }))}
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('bi-upload')?.click()}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <input
                    id="bi-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, 'businessIntelligence', 'image')
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Section</CardTitle>
              <CardDescription>Manage pricing plans and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="pricing-title">Title</Label>
                <Input
                  id="pricing-title"
                  value={content.pricing.title}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing, title: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="pricing-subtitle">Subtitle</Label>
                <Input
                  id="pricing-subtitle"
                  value={content.pricing.subtitle}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    pricing: { ...prev.pricing, subtitle: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label>Pricing Plans</Label>
                {content.pricing.plans.map((plan, index) => (
                  <Card key={index} className="mt-4 p-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Plan Name"
                        value={plan.name}
                        onChange={(e) => {
                          const newPlans = [...content.pricing.plans]
                          newPlans[index] = { ...plan, name: e.target.value }
                          setContent(prev => ({
                            ...prev,
                            pricing: { ...prev.pricing, plans: newPlans }
                          }))
                        }}
                      />
                      <Input
                        placeholder="Price"
                        value={plan.price}
                        onChange={(e) => {
                          const newPlans = [...content.pricing.plans]
                          newPlans[index] = { ...plan, price: e.target.value }
                          setContent(prev => ({
                            ...prev,
                            pricing: { ...prev.pricing, plans: newPlans }
                          }))
                        }}
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={plan.popular}
                          onChange={(e) => {
                            const newPlans = [...content.pricing.plans]
                            newPlans[index] = { ...plan, popular: e.target.checked }
                            setContent(prev => ({
                              ...prev,
                              pricing: { ...prev.pricing, plans: newPlans }
                            }))
                          }}
                        />
                        <Label>Popular Plan</Label>
                      </div>
                      <div>
                        <Label>Features</Label>
                        {plan.features.map((feature, featureIndex) => (
                          <Input
                            key={featureIndex}
                            className="mt-1"
                            value={feature}
                            onChange={(e) => {
                              const newPlans = [...content.pricing.plans]
                              const newFeatures = [...plan.features]
                              newFeatures[featureIndex] = e.target.value
                              newPlans[index] = { ...plan, features: newFeatures }
                              setContent(prev => ({
                                ...prev,
                                pricing: { ...prev.pricing, plans: newPlans }
                              }))
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Section</CardTitle>
              <CardDescription>Manage contact information and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact-title">Title</Label>
                <Input
                  id="contact-title"
                  value={content.contact.title}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, title: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="contact-subtitle">Subtitle</Label>
                <Textarea
                  id="contact-subtitle"
                  value={content.contact.subtitle}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, subtitle: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={content.contact.email}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, email: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  value={content.contact.phone}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, phone: e.target.value }
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="contact-address">Address</Label>
                <Textarea
                  id="contact-address"
                  value={content.contact.address}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, address: e.target.value }
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banner">
          <Card>
            <CardHeader>
              <CardTitle>Promotional Banner</CardTitle>
              <CardDescription>Manage the promotional banner that appears below the header</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="banner-visible"
                  checked={content.promoBanner?.isVisible || false}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    promoBanner: { ...prev.promoBanner, isVisible: e.target.checked }
                  }))}
                />
                <Label htmlFor="banner-visible">Show promotional banner</Label>
              </div>

              <div>
                <Label htmlFor="banner-text">Banner Text</Label>
                <Textarea
                  id="banner-text"
                  value={content.promoBanner?.text || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    promoBanner: { ...prev.promoBanner, text: e.target.value }
                  }))}
                  placeholder="Enter promotional text..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="banner-bg-color">Background Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="banner-bg-color"
                      type="color"
                      value={content.promoBanner?.backgroundColor || '#6366f1'}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        promoBanner: { ...prev.promoBanner, backgroundColor: e.target.value }
                      }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={content.promoBanner?.backgroundColor || '#6366f1'}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        promoBanner: { ...prev.promoBanner, backgroundColor: e.target.value }
                      }))}
                      placeholder="#6366f1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="banner-text-color">Text Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="banner-text-color"
                      type="color"
                      value={content.promoBanner?.textColor || '#ffffff'}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        promoBanner: { ...prev.promoBanner, textColor: e.target.value }
                      }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={content.promoBanner?.textColor || '#ffffff'}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        promoBanner: { ...prev.promoBanner, textColor: e.target.value }
                      }))}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="banner-link">Link (Optional)</Label>
                <Input
                  id="banner-link"
                  value={content.promoBanner?.link || ''}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    promoBanner: { ...prev.promoBanner, link: e.target.value }
                  }))}
                  placeholder="/pricing"
                />
              </div>

              {/* Preview */}
              <div>
                <Label>Preview</Label>
                <div 
                  className="mt-2 h-12 flex items-center justify-center rounded border relative overflow-hidden"
                  style={{ 
                    backgroundColor: content.promoBanner?.backgroundColor || '#6366f1',
                    color: content.promoBanner?.textColor || '#ffffff'
                  }}
                >
                  <div className="animate-marquee whitespace-nowrap">
                    <span className="text-sm font-medium px-4">
                      {content.promoBanner?.text || 'Promotional text will appear here'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Leads Management</CardTitle>
              <CardDescription>View and manage contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Leads are now managed in a dedicated section for better organization.
                </p>
                <Button 
                  onClick={() => window.open('/admin/leads', '_blank')}
                  className="group"
                >
                  Go to Leads Management
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
