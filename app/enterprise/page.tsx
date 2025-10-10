"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Users, MessageSquare, BarChart3, CreditCard, ChevronDown, ChevronUp, Phone, Mail, Calendar, Building2, Shield, Zap, Globe, HeadphonesIcon } from "lucide-react"
import { PricingContactForm } from "@/components/pricing-contact-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function EnterprisePage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  const enterpriseFeatures = [
    {
      icon: Building2,
      title: "Custom Solutions",
      description: "Tailored enterprise solutions designed specifically for your organization's unique requirements and workflows."
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Enterprise-grade security with SOC2 compliance, data encryption, and comprehensive audit trails."
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for scale with 99.9% uptime SLA, dedicated infrastructure, and global CDN distribution."
    },
    {
      icon: Globe,
      title: "Global Support",
      description: "24/7 global support with dedicated account managers and implementation specialists."
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Advanced user management, role-based permissions, and comprehensive admin controls."
    },
    {
      icon: HeadphonesIcon,
      title: "Priority Support",
      description: "Direct access to senior support engineers and priority response times for critical issues."
    }
  ]

  const enterprisePlans = [
    {
      name: "Enterprise Pro",
      description: "For large organizations with advanced needs",
      minUsers: "50+ users",
      startingPrice: "Custom Pricing",
      features: [
        "Everything in Advanced plans",
        "Custom integrations & workflows",
        "Dedicated account manager",
        "Priority 24/7 support",
        "Advanced analytics & reporting",
        "Custom training programs"
      ]
    },
    {
      name: "Enterprise Elite",
      description: "Complete enterprise solution with full customization",
      minUsers: "100+ users",
      startingPrice: "Custom Pricing",
      features: [
        "Everything in Enterprise Pro",
        "White-label solutions",
        "Custom AI model training",
        "On-premise deployment options",
        "Advanced compliance features",
        "Personalized onboarding"
      ]
    }
  ]

  return (
    <>
      <Header />
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-green-300/25 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-green-500 text-white px-4 py-2 mb-6 text-sm font-semibold shadow-lg">
            <Star className="w-4 h-4 mr-2" />
            Enterprise Solutions
          </Badge>

          <h1 className="font-bold text-4xl lg:text-6xl text-slate-800 mb-6">
            Enterprise-Grade
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600"> Business Solutions</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-12">
            Unlock the full potential of our platform with enterprise solutions designed for large organizations.
            Get custom pricing, dedicated support, and advanced features tailored to your business needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {enterpriseFeatures.map((feature, index) => (
            <Card key={index} className="bg-white/80 border-green-200 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transition-all duration-300 shadow-md">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-slate-800 text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl lg:text-4xl text-slate-800 mb-4">
              Enterprise Plans
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Choose the enterprise plan that best fits your organization's size and requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {enterprisePlans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden ${index === 1 ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 shadow-lg' : 'bg-white/80 border-green-200 shadow-md'} backdrop-blur-sm hover:shadow-xl transition-all duration-300`}>
                {index === 1 && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-green-500 text-white px-4 py-2 font-bold shadow-lg border-2 border-green-300">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4 mt-2">
                  <CardTitle className="text-2xl text-slate-800 mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-slate-600 mb-4">
                    {plan.description}
                  </CardDescription>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {plan.startingPrice}
                    </div>
                    <div className="text-slate-600 text-sm">
                      <Users className="w-4 h-4 inline mr-1" />
                      {plan.minUsers}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <h3 className="font-bold text-2xl text-slate-800 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-slate-600 mb-8 text-lg">
                Contact our enterprise sales team to discuss your requirements and get a custom quote tailored to your organization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('tel:+918585858585', '_self')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call +91 8585858585
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsContactFormOpen(true)}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-green-200">
                <p className="text-slate-600 text-sm">
                  Need more information? Schedule a consultation with our enterprise specialists
                </p>
                <Button
                  variant="ghost"
                  className="text-green-600 hover:text-green-700 hover:bg-green-50 mt-2 transition-all duration-300"
                  onClick={() => window.open('tel:+918585858585', '_self')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book a Demo Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Form Modal */}
      <PricingContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        selectedPlan={{
          name: "Enterprise",
          price: "Custom Pricing",
          billingCycle: "annual"
        }}
      />
    </section>
    <Footer />
    </>
  )
}
