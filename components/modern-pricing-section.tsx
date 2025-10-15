"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Zap, Crown, Rocket, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

interface PricingTier {
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  popular?: boolean
  enterprise?: boolean
  features: string[]
  icon: React.ReactNode
  color: string
  buttonColor: string
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    price: {
      monthly: 29,
      yearly: 290
    },
    features: [
      "Up to 5 team members",
      "Basic AI automation",
      "Standard integrations",
      "Email support",
      "Mobile app access",
      "Basic reporting"
    ],
    icon: <Zap className="w-6 h-6 text-white" />,
    color: "from-blue-500 to-blue-600",
    buttonColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    name: "Professional",
    description: "Most popular for growing businesses",
    price: {
      monthly: 79,
      yearly: 790
    },
    popular: true,
    features: [
      "Up to 25 team members",
      "Advanced AI automation",
      "All integrations included",
      "Priority support",
      "Advanced analytics",
      "Custom workflows",
      "API access",
      "White-label options"
    ],
    icon: <Crown className="w-6 h-6 text-white" />,
    color: "from-blue-500 to-indigo-500",
    buttonColor: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
  },
  {
    name: "Enterprise",
    description: "Unlimited power for large organizations",
    price: {
      monthly: 199,
      yearly: 1990
    },
    enterprise: true,
    features: [
      "Unlimited team members",
      "Enterprise AI suite",
      "Custom integrations",
      "24/7 phone support",
      "Advanced security",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom training"
    ],
    icon: <Rocket className="w-6 h-6 text-white" />,
    color: "from-purple-500 to-purple-600",
    buttonColor: "bg-purple-600 hover:bg-purple-700"
  }
]

export function ModernPricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="pt-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-blue-500 fill-current" />
            <span className="text-blue-700 font-semibold">Unbeatable Value</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple, transparent pricing
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Choose the perfect plan for your business. All plans include our core features with no hidden costs.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-2xl p-2 mb-8 shadow-lg border border-gray-200">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isYearly
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                isYearly
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative group ${
                tier.popular
                  ? 'lg:scale-110 lg:-mt-8 z-10'
                  : ''
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
                </div>
              )}

              <div className={`bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                tier.popular
                  ? 'border-blue-200 shadow-blue-100/50'
                  : 'border-gray-100 hover:border-blue-200'
              }`}>
                
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    {tier.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600">{tier.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-gray-900">
                      ${isYearly ? tier.price.yearly : tier.price.monthly}
                    </span>
                    <span className="text-gray-600">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  
                  {isYearly && (
                    <div className="text-green-600 font-semibold mt-2">
                      Save ${(tier.price.monthly * 12) - tier.price.yearly}/year
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="text-center">
                  {tier.enterprise ? (
                    <Link href="/contacts">
                      <Button 
                        size="lg" 
                        className={`w-full ${tier.buttonColor} text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        Contact Sales
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/pricing">
                      <Button 
                        size="lg" 
                        className={`w-full ${tier.buttonColor} text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        Start Free Trial
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  )}
                  
                  <p className="text-sm text-gray-500 mt-4">
                    {tier.enterprise ? 'Custom pricing available' : '14-day free trial • No credit card required'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Choose AVA One. Accelerate business growth.
              </h3>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                All plans include our core AI features, integrations, and support. Upgrade or downgrade anytime.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Enterprise-Grade</h4>
                  <p className="text-white/80">Bank-level security and 99.9% uptime guarantee</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Lightning Fast</h4>
                  <p className="text-white/80">Built for speed with global CDN and edge computing</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Always Improving</h4>
                  <p className="text-white/80">Regular updates and new features every month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
