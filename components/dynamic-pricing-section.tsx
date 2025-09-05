"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Star, ArrowRight } from "lucide-react"

interface PricingPlan {
  name: string
  price: string
  features: string[]
  popular: boolean
}

interface PricingContent {
  title: string
  subtitle: string
  plans: PricingPlan[]
}

export function DynamicPricingSection() {
  const [pricingContent, setPricingContent] = useState<PricingContent>({
    title: "Choose Your Plan",
    subtitle: "Select the perfect plan for your business needs",
    plans: [
      {
        name: "Starter",
        price: "$29/month",
        features: ["Basic Analytics", "5 Users", "Email Support"],
        popular: false
      },
      {
        name: "Professional", 
        price: "$99/month",
        features: ["Advanced Analytics", "25 Users", "Priority Support", "Custom Reports"],
        popular: true
      },
      {
        name: "Enterprise",
        price: "$299/month", 
        features: ["Full Analytics Suite", "Unlimited Users", "24/7 Support", "Custom Integration"],
        popular: false
      }
    ]
  })

  const [isAnnual, setIsAnnual] = useState(false)

  // Load content from API
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/website-content')
        if (response.ok) {
          const data = await response.json()
          setPricingContent(data.pricing)
        }
      } catch (error) {
        console.error('Failed to load pricing content:', error)
      }
    }
    loadContent()
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {pricingContent.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {pricingContent.subtitle}
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Annual
            </span>
            <Badge variant="secondary" className="ml-2">
              Save 20%
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingContent.plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {plan.price.includes('$') 
                      ? plan.price.split('/')[0] 
                      : plan.price
                    }
                  </span>
                  {plan.price.includes('/') && (
                    <span className="text-muted-foreground">
                      /{isAnnual ? 'year' : plan.price.split('/')[1]}
                    </span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'variant-outline'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include 14-day free trial. No credit card required.
          </p>
          <Button variant="ghost" className="text-primary">
            Compare all features →
          </Button>
        </div>
      </div>
    </section>
  )
}
