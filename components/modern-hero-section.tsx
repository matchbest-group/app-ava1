"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star, Users, Zap, BarChart3, MessageSquare, DollarSign, Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export function ModernHeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('sales')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Helper function to get correct product page URLs
  const getProductPageUrl = (section: string) => {
    switch (section) {
      case 'sales':
        return '/products/ava-flow' // Using ava-flow as CRM/sales management
      case 'collaboration':
        return '/products/ava-pingora'
      case 'finance':
        return '/products/ava-smartbill'
      case 'cx':
        return '/products/ava-cx'
      default:
        return '/products'
    }
  }

  const departments = [
        {
      id: 'cx',
      head:'AVA CX',
      name: '(Customer Experience)',
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'AI-Powered Customer Support',
      description: 'Intelligent chatbot and customer service tools for 24/7 support and enhanced customer satisfaction.',
      features: ['AI Chatbot', '24/7 Support', 'Ticket Management', 'Customer Analytics'],
      color: 'from-orange-500 to-orange-600',
      screenshot: 'chatbot-interface'
    },
        {
      id: 'collaboration',
      head:'AVA Pingora',
      name: '(Collaboration)',
      icon: <Users className="w-5 h-5" />,
      title: 'Team Collaboration Hub',
      description: 'Advanced team collaboration tools with Pingora integration for seamless communication and project management.',
      features: ['Real-time Chat', 'Project Management', 'File Sharing', 'Team Analytics'],
      color: 'from-purple-500 to-purple-600',
      screenshot: 'pingora-interface'
    },
    {
      id: 'sales',
      head:'AVA Flow',
      name: '(Sales)',
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'CRM & Sales Management',
      description: 'Complete customer relationship management with sales pipeline, lead tracking, and automated workflows.',
      features: ['Lead Management', 'Pipeline Tracking', 'Sales Analytics', 'Customer Data'],
      color: 'from-blue-500 to-blue-600',
      screenshot: 'crm-dashboard'
    },

    {
      id: 'finance',
      head:'AVA SmartBill',
      name: '(Finance)',
      icon: <DollarSign className="w-5 h-5" />,
      title: 'Smart Billing & Finance',
      description: 'Automated billing system with financial analytics, invoice management, and payment processing.',
      features: ['Smart Billing', 'Invoice Generation', 'Payment Processing', 'Financial Reports'],
      color: 'from-green-500 to-green-600',
      screenshot: 'billing-system'
    },
  ]

  const activeDepartment = departments.find(dept => dept.id === activeSection) || departments[0]

  const renderDepartmentScreenshot = (deptId: string) => {
    switch (deptId) {
      case 'sales':
        return (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* CRM Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-12 flex items-center px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-white font-semibold">AVA CRM Dashboard</span>
              </div>
            </div>
            
            <div className="p-6">
              {/* CRM Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">245</div>
                  <div className="text-xs text-blue-500">Active Leads</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">$89K</div>
                  <div className="text-xs text-green-500">Pipeline Value</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">23%</div>
                  <div className="text-xs text-purple-500">Conversion Rate</div>
                </div>
              </div>
              
              {/* Sales Pipeline */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Sales Pipeline</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Qualified Leads</span>
                    <div className="w-24 h-2 bg-blue-200 rounded-full">
                      <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Proposals</span>
                    <div className="w-24 h-2 bg-green-200 rounded-full">
                      <div className="w-12 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Closing</span>
                    <div className="w-24 h-2 bg-purple-200 rounded-full">
                      <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'collaboration':
        return (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Pingora Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-12 flex items-center px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-white font-semibold">AVA Pingora - Team Hub</span>
              </div>
            </div>
            
            <div className="p-6">
              {/* Team Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-xs text-purple-500">Active Projects</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600">24</div>
                  <div className="text-xs text-indigo-500">Team Members</div>
                </div>
              </div>
              
              {/* Project Activity */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">Project Alpha completed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">New team member added</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-xs text-gray-600">Meeting scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'finance':
        return (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Billing Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-12 flex items-center px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-white font-semibold">AVA SmartBill Dashboard</span>
              </div>
            </div>
            
            <div className="p-6">
              {/* Financial Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">$45.2K</div>
                  <div className="text-xs text-green-500">Monthly Revenue</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-xs text-blue-500">Invoices Sent</div>
                </div>
              </div>
              
              {/* Invoice Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Invoice Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Paid</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-green-200 rounded-full">
                        <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-green-600">87%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Pending</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-yellow-200 rounded-full">
                        <div className="w-3 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-yellow-600">13%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'cx':
        return (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Chatbot Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-12 flex items-center px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-white font-semibold">AVA CX Chatbot Dashboard</span>
              </div>
            </div>
            
            <div className="p-6">
              {/* Support Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">1,247</div>
                  <div className="text-xs text-orange-500">Conversations</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">96%</div>
                  <div className="text-xs text-green-500">Satisfaction</div>
                </div>
              </div>
              
              {/* Chat Interface Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Live Chat Preview</h4>
                <div className="space-y-2">
                  <div className="bg-blue-100 p-2 rounded-lg text-xs">
                    <span className="text-blue-700">Bot: How can I help you today?</span>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg text-xs text-right">
                    <span className="text-gray-700">User: I need help with billing</span>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg text-xs">
                    <span className="text-blue-700">Bot: I'll connect you with our billing team...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0">
        {/* Subtle animated orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-300/10 to-cyan-300/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-10">
        {/* Hero Header */}
        <div className="text-center mb-16 relative">
          {/* Badge with animation */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-3 shadow-lg mb-8 hover:shadow-xl transition-all duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Live • 60,000+ businesses online</span>
          </div>

          {/* Beautiful star rating */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
              <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
              <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
              <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
              <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
              <span className="text-base text-gray-700 ml-3 font-medium">4.8/5 from 12,000+ reviews</span>
            </div>
          </div>

          {/* Stunning main headline */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-gray-900">The Operating System</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              for Business
            </span>
          </h1>

          {/* Compelling subtitle */}
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10 font-light">
            Run your entire business on one platform. Over <span className="font-semibold text-gray-800">60,000+ businesses worldwide</span> trust AVA One to manage their sales, marketing, support, finance, and operations seamlessly.
          </p>

          {/* Stunning CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/pricing">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                Get Started Free
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 px-10 py-5 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white"
            >
              <Play className="mr-3 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators with beautiful icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime SLA</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900">60,000+</div>
              <div className="text-sm text-gray-600">Businesses</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold text-gray-900">15 Min</div>
              <div className="text-sm text-gray-600">Setup Time</div>
            </div>
          </div>
        </div>

        {/* Beautiful Department Tabs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore by Department</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveSection(dept.id)}
                className={`group relative flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeSection === dept.id
                    ? 'bg-gradient-to-r bg-white text-gray shadow-xl'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className={`p-2 rounded-lg flex items-center justify-center -mt-4`}>
                  {dept.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{dept.head}</span>
                  <span className="text-sm text-gray-600">{dept.name}</span>
                </div>
                {activeSection === dept.id && (
                  <div className="absolute inset-0 rounded-xl"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Department Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-lg px-4 py-2">
              {activeDepartment.icon}
              <span className="text-sm font-medium">{activeDepartment.name}</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {activeDepartment.title}
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              {activeDepartment.description}
            </p>

            {/* Features List */}
            <div className="space-y-3">
              {activeDepartment.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Department CTA */}
            <div className="flex gap-4 pt-4">
              <Link href={getProductPageUrl(activeSection)}>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                <div className="font-semibold text-gray-900">60,000+</div>
                <div>Businesses</div>
              </div>
              <div className="text-sm text-gray-500">
                <div className="font-semibold text-gray-900">99.5%</div>
                <div>Uptime SLA</div>
              </div>
              <div className="text-sm text-gray-500">
                <div className="font-semibold text-gray-900">15 Min</div>
                <div>Setup Time</div>
              </div>
            </div>
          </div>

          {/* Right Content - Department Screenshot */}
          <div className={`relative ${isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-full'}`}>
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              {/* Beautiful glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-60"></div>
              
              {/* Main screenshot container */}
              <div className="relative">
                {renderDepartmentScreenshot(activeSection)}
              </div>

              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-white rounded-full p-3 shadow-xl border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">Live</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-medium">AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful bottom transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,120 L1440,120 L1440,0 C1440,0 1140,80 720,40 C360,10 0,0 0,0 L0,120 Z"></path>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
      </div>
    </section>
  )
}
