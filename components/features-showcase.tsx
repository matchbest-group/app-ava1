'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Rocket, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Cloud,
  Lock,
  Smartphone,
  Headphones,
  Globe,
  Clock,
  Award
} from "lucide-react"

const features = [
  {
    category: "Core Features",
    icon: Rocket,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    items: [
      {
        name: "AI-Powered Analytics",
        description: "Advanced machine learning algorithms provide deep business insights"
      },
      {
        name: "Real-time Dashboard",
        description: "Monitor your business metrics with live updates and customizable views"
      },
      {
        name: "Automated Workflows",
        description: "Streamline operations with intelligent automation and process optimization"
      },
      {
        name: "Smart Reporting",
        description: "Generate comprehensive reports with AI-driven recommendations"
      }
    ]
  },
  {
    category: "Security & Compliance",
    icon: Shield,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    items: [
      {
        name: "Enterprise Security",
        description: "Bank-level encryption and multi-layer security protocols"
      },
      {
        name: "GDPR Compliance",
        description: "Full compliance with international data protection regulations"
      },
      {
        name: "SSO Integration",
        description: "Seamless single sign-on with your existing identity providers"
      },
      {
        name: "Audit Trails",
        description: "Complete audit logs for compliance and security monitoring"
      }
    ]
  },
  {
    category: "Performance",
    icon: Zap,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    items: [
      {
        name: "Lightning Fast",
        description: "Sub-second response times with global CDN and edge computing"
      },
      {
        name: "99.9% Uptime",
        description: "Reliable infrastructure with automatic failover and redundancy"
      },
      {
        name: "Scalable Architecture",
        description: "Handles millions of transactions without performance degradation"
      },
      {
        name: "Smart Caching",
        description: "Intelligent caching mechanisms for optimal performance"
      }
    ]
  },
  {
    category: "Collaboration",
    icon: Users,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    items: [
      {
        name: "Team Workspaces",
        description: "Organized spaces for different teams and projects"
      },
      {
        name: "Real-time Collaboration",
        description: "Work together simultaneously with live editing and comments"
      },
      {
        name: "Role-based Access",
        description: "Granular permissions and access control for team members"
      },
      {
        name: "Communication Tools",
        description: "Built-in chat, video calls, and notification system"
      }
    ]
  }
]

const additionalFeatures = [
  { icon: Cloud, name: "Cloud Integration", description: "Connect with 100+ cloud services" },
  { icon: Lock, name: "Data Encryption", description: "End-to-end encryption for all data" },
  { icon: Smartphone, name: "Mobile Apps", description: "Native iOS and Android applications" },
  { icon: Headphones, name: "24/7 Support", description: "Round-the-clock expert assistance" },
  { icon: Globe, name: "Multi-language", description: "Support for 25+ languages" },
  { icon: Clock, name: "Time Tracking", description: "Built-in time tracking and productivity tools" },
  { icon: Award, name: "Certification", description: "SOC2, ISO27001, and other certifications" },
  { icon: BarChart3, name: "Advanced Analytics", description: "Predictive analytics and forecasting" }
]

export function FeaturesShowcase() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Rocket className="w-4 h-4 mr-2" />
            Features & Capabilities
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive suite of tools and features designed to accelerate your business growth
          </p>
        </div>

        {/* Feature Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Button
                key={index}
                variant={activeCategory === index ? "default" : "outline"}
                onClick={() => setActiveCategory(index)}
                className="flex items-center space-x-2 px-6 py-3 rounded-full"
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.category}</span>
              </Button>
            )
          })}
        </div>

        {/* Active Category Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features[activeCategory].items.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${features[activeCategory].bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-6 h-6 ${features[activeCategory].color}`}>
                    {/* Feature icon placeholder */}
                    <div className="w-full h-full bg-current rounded opacity-80"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Additional Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
