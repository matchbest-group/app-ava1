'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { 
  ExternalLink, 
  CheckCircle, 
  Star,
  Zap,
  Shield,
  Globe
} from "lucide-react"

const partners = [
  {
    name: "Microsoft Azure",
    logo: "/logo1.png",
    category: "Cloud Infrastructure",
    description: "Enterprise-grade cloud computing and AI services",
    status: "Premium Partner",
    integration: "Deep Integration"
  },
  {
    name: "Salesforce",
    logo: "/logo2.png",
    category: "CRM",
    description: "Customer relationship management and sales automation",
    status: "Technology Partner",
    integration: "Native Integration"
  },
  {
    name: "Google Cloud",
    logo: "/logo3.png",
    category: "Cloud & AI",
    description: "Advanced AI and machine learning capabilities",
    status: "Certified Partner",
    integration: "API Integration"
  },
  {
    name: "AWS",
    logo: "/logo4.png",
    category: "Cloud Services",
    description: "Scalable cloud infrastructure and services",
    status: "Select Partner",
    integration: "Full Integration"
  },
  {
    name: "Slack",
    logo: "/placeholder-logo.png",
    category: "Communication",
    description: "Team communication and collaboration tools",
    status: "App Partner",
    integration: "Webhook Integration"
  },
  {
    name: "HubSpot",
    logo: "/placeholder-logo.png",
    category: "Marketing",
    description: "Inbound marketing and sales platform",
    status: "Solution Partner",
    integration: "Bi-directional Sync"
  }
]

const integrations = [
  { name: "Zapier", connections: "5000+ Apps", type: "Automation" },
  { name: "REST API", connections: "Unlimited", type: "Custom" },
  { name: "Webhooks", connections: "Real-time", type: "Events" },
  { name: "SDKs", connections: "Multiple Languages", type: "Development" },
  { name: "Single Sign-On", connections: "SAML/OAuth", type: "Security" },
  { name: "Database Connectors", connections: "20+ Databases", type: "Data" }
]

const certifications = [
  { name: "SOC 2 Type II", icon: Shield, color: "text-green-600" },
  { name: "ISO 27001", icon: Shield, color: "text-blue-600" },
  { name: "GDPR Compliant", icon: Globe, color: "text-purple-600" },
  { name: "AWS Well-Architected", icon: Star, color: "text-orange-600" }
]

export function PartnersIntegrationsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Partners Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Partners & Integrations
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Seamlessly integrate with your favorite tools and platforms through our extensive partner ecosystem
          </p>
        </div>

        {/* Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                
                <div className="space-y-2 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {partner.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {partner.category}
                  </Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {partner.description}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{partner.status}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    <Zap className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">{partner.integration}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full group/button">
                  View Integration
                  <ExternalLink className="w-3 h-3 ml-2 group-hover/button:translate-x-0.5 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Methods */}
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Integration Methods
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {integration.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {integration.connections}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {integration.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Security & Compliance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon
                return (
                  <div key={index} className="flex items-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
                    <IconComponent className={`w-8 h-8 ${cert.color} mr-3`} />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {cert.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Need a Custom Integration?
            </h3>
            <p className="text-blue-100 mb-6">
              Our team of experts can build custom integrations tailored to your specific needs. 
              Connect any system or platform with our flexible API architecture.
            </p>
            <Button variant="secondary" className="group">
              Contact Integration Team
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
