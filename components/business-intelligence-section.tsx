"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3, PieChart, LineChart, ArrowRight } from "lucide-react"

interface BusinessIntelligenceContent {
  title: string
  description: string
  features: string[]
  image: string
}

export function BusinessIntelligenceSection() {
  const [biContent, setBiContent] = useState<BusinessIntelligenceContent>({
    title: "Business Intelligence",
    description: "Transform your data into actionable insights",
    features: [
      "Real-time Analytics",
      "Custom Dashboards",
      "Data Visualization",
      "Predictive Analytics"
    ],
    image: "/api-management-dashboard.png"
  })

  // Load content from API
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/website-content')
        if (response.ok) {
          const data = await response.json()
          setBiContent(data.businessIntelligence)
        }
      } catch (error) {
        console.error('Failed to load BI content:', error)
      }
    }
    loadContent()
  }, [])

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics Platform
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {biContent.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {biContent.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="grid gap-6">
              {biContent.features.map((feature, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {index === 0 && <BarChart3 className="w-6 h-6 text-primary" />}
                        {index === 1 && <PieChart className="w-6 h-6 text-primary" />}
                        {index === 2 && <LineChart className="w-6 h-6 text-primary" />}
                        {index === 3 && <TrendingUp className="w-6 h-6 text-primary" />}
                        {index > 3 && <BarChart3 className="w-6 h-6 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{feature}</h3>
                        <p className="text-sm text-muted-foreground">
                          {index === 0 && "Monitor your business metrics in real-time with live dashboards"}
                          {index === 1 && "Create personalized dashboards tailored to your needs"}
                          {index === 2 && "Transform complex data into easy-to-understand visuals"}
                          {index === 3 && "Forecast trends and make data-driven decisions"}
                          {index > 3 && "Advanced analytics capabilities for your business"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Explore Analytics
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden shadow-2xl">
              <img
                src={biContent.image}
                alt={biContent.title}
                className="w-full h-[500px] object-cover"
              />
            </Card>

            {/* Floating stats cards */}
            <Card className="absolute -top-6 -left-6 p-4 shadow-lg bg-background border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium">Revenue Growth</p>
                  <p className="text-xl font-bold text-green-600">+24.5%</p>
                </div>
              </div>
            </Card>

            <Card className="absolute -bottom-6 -right-6 p-4 shadow-lg bg-background border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium">Active Users</p>
                  <p className="text-xl font-bold text-blue-600">12.4K</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
