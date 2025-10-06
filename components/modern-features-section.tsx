"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Smartphone,
  Cloud,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react"
import Link from "next/link"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  color: string
  delay?: number
}

function FeatureCard({ icon, title, description, features, color, delay = 0 }: FeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div 
      ref={ref}
      className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${color}`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}

export function ModernFeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-7 h-7 text-white" />,
      title: "AI-Powered Automation",
      description: "Intelligent workflows that learn and adapt to your business needs, reducing manual work by up to 80%.",
      features: [
        "Smart process automation",
        "Predictive analytics",
        "Natural language processing",
        "Machine learning insights"
      ],
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="w-7 h-7 text-white" />,
      title: "Lightning Performance",
      description: "Built for speed and scale, handling millions of operations with sub-second response times.",
      features: [
        "Real-time data processing",
        "Global CDN deployment",
        "Auto-scaling infrastructure",
        "99.9% uptime guarantee"
      ],
      color: "bg-gradient-to-br from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-7 h-7 text-white" />,
      title: "Enterprise Security",
      description: "Bank-level security with advanced encryption, compliance, and access controls.",
      features: [
        "End-to-end encryption",
        "SOC 2 Type II compliance",
        "Multi-factor authentication",
        "Advanced threat detection"
      ],
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      icon: <Users className="w-7 h-7 text-white" />,
      title: "Team Collaboration",
      description: "Seamless collaboration tools that keep your team connected and productive.",
      features: [
        "Real-time collaboration",
        "Role-based permissions",
        "Integrated communication",
        "Project management tools"
      ],
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      icon: <BarChart3 className="w-7 h-7 text-white" />,
      title: "Advanced Analytics",
      description: "Deep insights and reporting that help you make data-driven decisions.",
      features: [
        "Custom dashboards",
        "Real-time metrics",
        "Predictive modeling",
        "Export capabilities"
      ],
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600"
    },
    {
      icon: <MessageSquare className="w-7 h-7 text-white" />,
      title: "Smart Communication",
      description: "AI-powered communication tools that understand context and intent.",
      features: [
        "Intelligent chatbots",
        "Voice recognition",
        "Multi-language support",
        "Sentiment analysis"
      ],
      color: "bg-gradient-to-br from-pink-500 to-pink-600"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-blue-700 font-semibold">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            All your teams. Better together as one.
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Define and automate your business processes, then create intuitive apps for your teams, 
            customers, and partners — all in one powerful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/products">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white border-2 border-gray-200 hover:border-blue-300 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Products
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="flex -space-x-4">
                  <Smartphone className="w-8 h-8 text-white/80" />
                  <Cloud className="w-8 h-8 text-white/80" />
                  <BarChart3 className="w-8 h-8 text-white/80" />
                </div>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to transform your business?
              </h3>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of companies already using AVA One to streamline their operations and boost productivity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contacts">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
