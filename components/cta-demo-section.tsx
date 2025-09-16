'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Play, 
  CheckCircle, 
  ArrowRight, 
  Calendar,
  Users,
  Zap,
  Shield,
  BarChart3,
  Clock,
  Mail,
  Phone
} from "lucide-react"

const quickDemoFeatures = [
  { icon: BarChart3, title: "Real-time Analytics", description: "See live data insights" },
  { icon: Users, title: "Team Collaboration", description: "Multi-user workspaces" },
  { icon: Zap, title: "Automation Tools", description: "AI-powered workflows" },
  { icon: Shield, title: "Enterprise Security", description: "Bank-level protection" }
]

const ctaOptions = [
  {
    type: "primary",
    title: "Start Free Trial",
    description: "14-day free trial, no credit card required",
    buttonText: "Get Started Now",
    icon: Zap,
    color: "bg-gradient-to-r from-blue-600 to-purple-600"
  },
  {
    type: "secondary",
    title: "Schedule Demo",
    description: "30-minute personalized walkthrough",
    buttonText: "Book Demo",
    icon: Calendar,
    color: "bg-gradient-to-r from-green-600 to-teal-600"
  },
  {
    type: "tertiary",
    title: "Talk to Sales",
    description: "Custom enterprise solutions",
    buttonText: "Contact Sales",
    icon: Phone,
    color: "bg-gradient-to-r from-orange-600 to-red-600"
  }
]

export function CTADemoSection() {
  const [email, setEmail] = useState("")
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const handleQuickStart = () => {
    if (email) {
      // Handle email signup logic here
      console.log("Quick start with email:", email)
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-white/10 text-white border-white/20">
            <Zap className="w-4 h-4 mr-2" />
            Ready to Get Started?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Business Today
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Join thousands of companies already using our platform to streamline operations, 
            boost productivity, and drive growth.
          </p>

          {/* Quick Email Signup */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
              <Button 
                onClick={handleQuickStart}
                className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
              >
                Quick Start
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-sm text-slate-400 mt-2">
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>

        {/* Demo Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">See It In Action</h3>
            <p className="text-slate-300 mb-6">
              Watch our 3-minute product demo to see how easy it is to get started 
              and the powerful features that will transform your workflow.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickDemoFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-white/10 rounded-lg p-2 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{feature.title}</h4>
                      <p className="text-sm text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
                  {!isVideoPlaying ? (
                    <Button
                      onClick={() => setIsVideoPlaying(true)}
                      size="lg"
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
                    >
                      <Play className="w-8 h-8 mr-2" />
                      Watch Demo
                    </Button>
                  ) : (
                    <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto mb-2"></div>
                        <p className="text-sm text-slate-300">Loading demo...</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ctaOptions.map((option, index) => {
            const IconComponent = option.icon
            return (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className={`${option.color} p-6 text-center text-white`}>
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                    <p className="text-sm opacity-90 mb-6">{option.description}</p>
                    <Button 
                      variant="secondary" 
                      className="w-full bg-white text-gray-900 hover:bg-gray-100"
                    >
                      {option.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-slate-300">SOC 2 Certified</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300">Enterprise Security</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-slate-300">99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5 text-orange-400" />
              <span className="text-slate-300">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
