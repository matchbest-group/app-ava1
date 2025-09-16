'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  TextEditor, 
  PriceEditor, 
  ListEditor, 
  SectionEditor 
} from '@/components/admin/content-editors'
import { Save, ArrowLeft, RefreshCw, Eye, Plus, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular: boolean
}

interface PricingContent {
  title: string
  subtitle: string
  plans: PricingPlan[]
}

export default function PricingEditor() {
  const router = useRouter()
  const { toast } = useToast()
  const [content, setContent] = useState<PricingContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/cms/content?section=pricing')
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

  const getDefaultContent = (): PricingContent => ({
    title: "Choose Your Plan",
    subtitle: "Simple, transparent pricing that scales with your business",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$29",
        period: "per month",
        description: "Perfect for small teams getting started",
        features: [
          "Up to 5 team members",
          "Basic analytics",
          "Email support",
          "1GB storage"
        ],
        popular: false
      },
      {
        id: "professional",
        name: "Professional", 
        price: "$99",
        period: "per month",
        description: "For growing businesses with advanced needs",
        features: [
          "Up to 50 team members",
          "Advanced analytics",
          "Priority support",
          "10GB storage",
          "API access"
        ],
        popular: true
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "$299",
        period: "per month", 
        description: "For large organizations with custom requirements",
        features: [
          "Unlimited team members",
          "Custom analytics",
          "24/7 phone support",
          "Unlimited storage",
          "API access",
          "Custom integrations"
        ],
        popular: false
      }
    ]
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
          section: 'pricing',
          data: content
        })
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Pricing content saved successfully!",
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
      if (pathArray[i].includes('[') && pathArray[i].includes(']')) {
        const arrayName = pathArray[i].split('[')[0]
        const arrayIndex = parseInt(pathArray[i].split('[')[1].split(']')[0])
        current = current[arrayName][arrayIndex]
      } else {
        current = current[pathArray[i]]
      }
    }
    
    const lastKey = pathArray[pathArray.length - 1]
    if (lastKey.includes('[') && lastKey.includes(']')) {
      const arrayName = lastKey.split('[')[0]
      const arrayIndex = parseInt(lastKey.split('[')[1].split(']')[0])
      current[arrayName][arrayIndex] = value
    } else {
      current[lastKey] = value
    }
    
    setContent(newContent)
  }

  const addPlan = () => {
    if (!content) return
    
    const newPlan: PricingPlan = {
      id: `plan-${Date.now()}`,
      name: "New Plan",
      price: "$0",
      period: "per month",
      description: "Add description here...",
      features: ["Feature 1", "Feature 2"],
      popular: false
    }
    
    setContent({
      ...content,
      plans: [...content.plans, newPlan]
    })
  }

  const removePlan = (index: number) => {
    if (!content) return
    
    setContent({
      ...content,
      plans: content.plans.filter((_, i) => i !== index)
    })
  }

  const togglePopular = (index: number) => {
    if (!content) return
    
    const newPlans = content.plans.map((plan, i) => ({
      ...plan,
      popular: i === index ? !plan.popular : false // Only one plan can be popular
    }))
    
    setContent({
      ...content,
      plans: newPlans
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
                  Pricing Editor
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Edit pricing plans and features
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
        <Tabs defaultValue="header" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="header">Section Header</TabsTrigger>
            <TabsTrigger value="plans">Pricing Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="header">
            <SectionEditor title="Pricing Section Header" isVisible={true}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TextEditor
                  label="Section Title"
                  value={content.title}
                  onChange={(value) => updateContent('title', value)}
                  placeholder="Enter section title"
                />
                
                <TextEditor
                  label="Section Subtitle"
                  value={content.subtitle}
                  onChange={(value) => updateContent('subtitle', value)}
                  multiline
                  placeholder="Enter section description"
                />
              </div>
            </SectionEditor>
          </TabsContent>

          <TabsContent value="plans">
            <SectionEditor title="Pricing Plans" isVisible={true}>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Pricing Plans</h3>
                  <Button onClick={addPlan}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Plan
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {content.plans.map((plan, index) => (
                    <Card key={plan.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <Badge variant={plan.popular ? "default" : "outline"}>
                              {plan.popular ? "Popular" : `Plan ${index + 1}`}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => togglePopular(index)}
                              className="text-xs"
                            >
                              {plan.popular ? "Remove Popular" : "Make Popular"}
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removePlan(index)}
                            className="text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <TextEditor
                          label="Plan Name"
                          value={plan.name}
                          onChange={(value) => updateContent(`plans[${index}].name`, value)}
                          placeholder="Plan name"
                        />
                        
                        <div className="grid grid-cols-2 gap-3">
                          <PriceEditor
                            label="Price"
                            value={plan.price}
                            onChange={(value) => updateContent(`plans[${index}].price`, value)}
                            currency="$"
                          />
                          
                          <TextEditor
                            label="Billing Period"
                            value={plan.period}
                            onChange={(value) => updateContent(`plans[${index}].period`, value)}
                            placeholder="per month"
                          />
                        </div>
                        
                        <TextEditor
                          label="Description"
                          value={plan.description}
                          onChange={(value) => updateContent(`plans[${index}].description`, value)}
                          multiline
                          placeholder="Plan description"
                        />
                        
                        <ListEditor
                          label="Features"
                          items={plan.features}
                          onChange={(items) => updateContent(`plans[${index}].features`, items)}
                          placeholder="Add a feature"
                        />
                      </CardContent>
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
