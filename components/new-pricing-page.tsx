"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Users, MessageSquare, BarChart3, CreditCard, ChevronDown, ChevronUp } from "lucide-react"
import { PricingContactForm } from "./pricing-contact-form"

// Individual Pricing Card Component
function PricingCard({ tier, index, billingCycle, currentProduct, onChoosePlan, isSelected, onSelect }: {
  tier: { name: string; description: string; popular: boolean };
  index: number;
  billingCycle: "monthly" | "yearly";
  currentProduct: any;
  onChoosePlan: (planName: string, price: string, billingCycle: string) => void;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)
  
  const plan = currentProduct.plans[index]
  if (!plan) return null

  const productSections = [
    { name: "AI CX Agent", features: plan.features[2]?.items || ["3 features"] },
    { name: "AVA Flow CRM", features: plan.features[3]?.items || ["3 features"] },
    { name: "AVA SmartBill", features: plan.features[4]?.items || ["3 features"] },
    { name: "AVA Pingora", features: plan.features[5]?.items || ["4 features"] }
  ]

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
        isSelected
          ? "bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-cyan-400 shadow-2xl"
          : "bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 hover:scale-105 hover:border-cyan-400/50"
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-cyan-400 text-slate-900 px-4 py-1 font-bold rounded-full shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            Selected
          </Badge>
        </div>
      )}
      {tier.popular && !isSelected && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
          <Badge className="bg-cyan-400 text-slate-900 px-4 py-1 font-bold rounded-full shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-2 pt-2">
        <CardTitle className="font-bold text-lg text-white mb-1">
          {tier.name}
        </CardTitle>
        <CardDescription className="text-slate-200 mb-2 text-sm">
          {tier.description}
        </CardDescription>

        <div className="space-y-1">
          <div className="font-bold text-2xl text-cyan-400">
            {billingCycle === "yearly"
              ? `$${(plan.price * 12).toLocaleString()}`
              : plan.priceText
            }
          </div>
          <div className="text-xs text-slate-300">
            per user/{billingCycle === "yearly" ? "year" : "month"}
          </div>
          <div className="flex items-center justify-center text-xs text-slate-300">
            <Users className="w-3 h-3 mr-1" />
            {plan.minUsers}
          </div>
        </div>
      </CardHeader>

      <CardContent className="">
        {/* AI Conversations Section */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold mb-2 text-sm">
            <Check className="w-3 h-3" />
            <span>AI Conversations</span>
          </div>
          <div className="pl-5 space-y-1 text-xs text-slate-300">
            {plan.features[0]?.items.map((item: string, idx: number) => (
              <div key={idx}>{item}</div>
            ))}
          </div>
          <div className="pl-5 mt-1 text-xs text-slate-400">
            <div className="font-medium text-slate-300 mb-1 text-xs">Additional costs:</div>
            {plan.features[1]?.items.map((item: string, idx: number) => (
              <div key={idx}>{item}</div>
            ))}
          </div>
        </div>

        {/* Product Sections with Dropdowns */}
        <div className="space-y-2">
          {productSections.map((product, prodIndex) => (
            <div key={product.name} className="border border-slate-400 rounded-lg">
              <button
                onClick={() => setExpandedProduct(expandedProduct === product.name ? null : product.name)}
                className="w-full flex items-center justify-between p-2 text-left hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Check className="w-3 h-3 text-cyan-400" />
                  <span className="text-white font-medium text-sm">{product.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-xs">
                    {Array.isArray(product.features) ? `${product.features.length} features` : product.features}
                  </span>
                  {expandedProduct === product.name ? (
                    <ChevronUp className="w-3 h-3 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              </button>

              {expandedProduct === product.name && (
                <div className="px-2 pb-2 border-t border-slate-700">
                  <div className="pt-2 space-y-1">
                    {Array.isArray(product.features) ? (
                      product.features.map((feature: string, idx: number) => (
                        <div key={idx} className="text-xs text-slate-300 flex items-center space-x-2">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-300">{product.features}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={() => onChoosePlan(
            tier.name,
            billingCycle === "yearly" ? `₹${Math.round(plan.price * 10)}` : plan.priceText,
            billingCycle
          )}
          className={`w-full mt-6 py-2 font-semibold rounded-lg transition-all duration-300 text-sm ${
            isSelected
              ? "bg-cyan-400 text-slate-900 hover:bg-cyan-300"
              : "bg-slate-700 text-white hover:bg-slate-600 border border-slate-600"
          }`}
          size="sm"
        >
          Choose {tier.name}
        </Button>
      </CardContent>
    </Card>
  )
}

// Product-specific pricing data
const productPricing = {
  "ava-cx": {
    name: "AVA CX",
    icon: MessageSquare,
    description: "AI-powered customer experience platform",
    plans: [
      {
        name: "Basic",
        description: "Perfect for small teams getting started",
        price: 53,
        priceText: "$53",
        period: "per user/month",
        minUsers: "Min 3 users",
        popular: false,
        features: [
          { category: "AI Conversations", items: [
            "Web/App/Insta: 1,000",
            "WhatsApp: 0"
          ]},
          { category: "Additional costs", items: [
            "Web/App/Insta: $0.12/conversation",
            "WhatsApp: $0.40/conversation"
          ]},
          { category: "AI CX Agent", items: [
            "Gen-AI Chatbot plugin (1 Web & 1 Mobile App)",
            "Core ticketing via chatbot",
            "Multilingual support"
          ]},
          { category: "AVA Flow CRM", items: [
            "Dashboards & reports",
            "Workflows",
            "Cadences & forecasting"
          ]},
          { category: "AVA SmartBill", items: [
            "Quotes & GST invoices",
            "Automated reminders",
            "Workflows & reports",
            "6 Month history"
          ]},
          { category: "AVA Pingora", items: [
            "Video & Audio Calls",
            "Chats/Groups",
            "Group meetings"
          ]}
        ]
      },
      {
        name: "Pro",
        description: "Most popular choice for growing businesses",
        price: 91,
        priceText: "$91",
        period: "per user/month",
        minUsers: "Min 5 users",
        popular: true,
        features: [
          { category: "AI Conversations", items: [
            "Web/App/Insta: 1,500",
            "WhatsApp: 500"
          ]},
          { category: "Additional costs", items: [
            "Web/App/Insta: $0.12/conversation",
            "WhatsApp: $0.40/conversation"
          ]},
          { category: "AI CX Agent", items: [
            "Everything in Basic +",
            "WhatsApp, Instagram DM's (1 each)",
            "Advanced workflows",
            "Role-based permissions"
          ]},
          { category: "AVA Flow CRM", items: [
            "Everything in Basic + Blueprint, CPQ",
            "Inventory mgmt, webhooks",
            "Assignment rules",
            "Google Ads integration"
          ]},
          { category: "AVA SmartBill", items: [
            "Everything in Basic + Subscription billing",
            "Hosted pages, dunning mgmt",
            "Cart reminders, timesheet billing"
          ]},
          { category: "AVA Pingora", items: [
            "Everything in Basic +",
            "Basic AI summaries",
            "SSO & admin controls",
            "Unlimited history"
          ]}
        ]
      },
      {
        name: "Advanced",
        description: "Advanced features for scaling teams",
        price: 134,
        priceText: "$134",
        period: "per user/month",
        minUsers: "Min 10 users",
        popular: false,
        features: [
          { category: "AI Conversations", items: [
            "Web/App/Insta: 4,000",
            "WhatsApp: 1,000"
          ]},
          { category: "Additional costs", items: [
            "Web/App/Insta: $0.12/conversation",
            "WhatsApp: $0.40/conversation"
          ]},
          { category: "AI CX Agent", items: [
            "AI Assist (advanced bot for human agents)",
            "Audit logs & analytics"
          ]},
          { category: "AVA Flow CRM", items: [
            "Pro + AI-driven insights",
            "Territory mgmt",
            "Journey orchestration",
            "Multi-user portals"
          ]},
          { category: "AVA SmartBill", items: [
            "Pro + Advanced billing",
            "Cohort charts, rev. recognition",
            "Advanced analytics & reporting"
          ]},
          { category: "AVA Pingora", items: [
            "Pro + Advanced AI (workflow gen, search, recaps, file summaries)",
            "SCIM & stronger controls"
          ]}
        ]
      },
      {
        name: "Enterprise",
        description: "Full-scale solution for large organizations",
        price: 156,
        priceText: "$156",
        period: "per user/month",
        minUsers: "Min 25 users",
        popular: false,
        features: [
          { category: "AI Conversations", items: [
            "Web/App/Insta: 8,000",
            "WhatsApp: 2,000"
          ]},
          { category: "Additional costs", items: [
            "Web/App/Insta: $0.12/conversation",
            "WhatsApp: $0.40/conversation"
          ]},
          { category: "AI CX Agent", items: [
            "Social listening",
            "Multi-DM accounts (Instagram/WhatsApp)",
            "SLA mgmt & surveys"
          ]},
          { category: "AVA Flow CRM", items: [
            "Advanced + AIML insights",
            "Customization",
            "Augmented analytics & insights",
            "Advanced admin & org insights"
          ]},
          { category: "AVA SmartBill", items: [
            "Advanced + BI dashboards",
            "Dedicated account manager",
            "Personalized onboarding",
            "Enterprise workflows"
          ]},
          { category: "AVA Pingora", items: [
            "Enterprise AI & search",
            "Compliance (HIPAA, DLP, E2EE, GMM)",
            "Enterprise admin",
            "Dedicated support"
          ]}
        ]
      }
    ]
  },
  "ava-flow": {
    name: "AVA Flow",
    icon: BarChart3,
    description: "AI-powered CRM and sales automation",
    plans: [
      {
        name: "Basic",
        description: "Essential CRM for small teams",
        price: 1299,
        priceText: "₹1,299",
        period: "per user/month",
        minUsers: "Min 3 users",
        popular: false,
        features: [
          { category: "Lead Management", items: [
            "Up to 1,000 leads",
            "Basic lead scoring"
          ]},
          { category: "Sales Pipeline", items: [
            "3 custom pipelines",
            "Basic reporting"
          ]},
          { category: "Integrations", items: ["5 integrations"] },
          { category: "Support", items: ["Email support"] }
        ]
      },
      {
        name: "Pro",
        description: "Advanced CRM with AI insights",
        price: 2499,
        priceText: "₹2,499",
        period: "per user/month",
        minUsers: "Min 5 users",
        popular: true,
        features: [
          { category: "Lead Management", items: [
            "Up to 5,000 leads",
            "AI lead scoring"
          ]},
          { category: "Sales Pipeline", items: [
            "Unlimited pipelines",
            "Advanced reporting"
          ]},
          { category: "Integrations", items: ["15 integrations"] },
          { category: "Support", items: ["Priority support"] }
        ]
      },
      {
        name: "Advanced",
        description: "Complete sales automation suite",
        price: 3999,
        priceText: "₹3,999",
        period: "per user/month",
        minUsers: "Min 10 users",
        popular: false,
        features: [
          { category: "Lead Management", items: [
            "Up to 15,000 leads",
            "Advanced AI insights"
          ]},
          { category: "Sales Pipeline", items: [
            "Custom workflows",
            "Real-time analytics"
          ]},
          { category: "Integrations", items: ["Unlimited integrations"] },
          { category: "Support", items: ["24/7 support"] }
        ]
      },
      {
        name: "Enterprise",
        description: "Enterprise-grade CRM solution",
        price: 5999,
        priceText: "₹5,999",
        period: "per user/month",
        minUsers: "Min 25 users",
        popular: false,
        features: [
          { category: "Lead Management", items: [
            "Unlimited leads",
            "Custom AI models"
          ]},
          { category: "Sales Pipeline", items: [
            "Advanced automation",
            "Custom dashboards"
          ]},
          { category: "Integrations", items: ["Custom integrations"] },
          { category: "Support", items: ["Dedicated manager"] }
        ]
      }
    ]
  },
  "ava-smartbill": {
    name: "AVA SmartBill",
    icon: CreditCard,
    description: "Intelligent billing and revenue management",
    plans: [
      {
        name: "Basic",
        description: "Simple billing for startups",
        price: 999,
        priceText: "₹999",
        period: "per user/month",
        minUsers: "Min 3 users",
        popular: false,
        features: [
          { category: "Billing", items: [
            "Up to 100 invoices/month",
            "Basic templates"
          ]},
          { category: "Payments", items: [
            "2 payment gateways",
            "Basic reporting"
          ]},
          { category: "Automation", items: ["Basic automation"] },
          { category: "Support", items: ["Email support"] }
        ]
      },
      {
        name: "Pro",
        description: "Advanced billing with AI optimization",
        price: 1999,
        priceText: "₹1,999",
        period: "per user/month",
        minUsers: "Min 5 users",
        popular: true,
        features: [
          { category: "Billing", items: [
            "Up to 500 invoices/month",
            "Custom templates"
          ]},
          { category: "Payments", items: [
            "5 payment gateways",
            "Advanced reporting"
          ]},
          { category: "Automation", items: ["AI-powered automation"] },
          { category: "Support", items: ["Priority support"] }
        ]
      },
      {
        name: "Advanced",
        description: "Complete billing automation",
        price: 3499,
        priceText: "₹3,499",
        period: "per user/month",
        minUsers: "Min 10 users",
        popular: false,
        features: [
          { category: "Billing", items: [
            "Up to 2,000 invoices/month",
            "Dynamic pricing"
          ]},
          { category: "Payments", items: [
            "Unlimited gateways",
            "Real-time analytics"
          ]},
          { category: "Automation", items: ["Full automation suite"] },
          { category: "Support", items: ["24/7 support"] }
        ]
      },
      {
        name: "Enterprise",
        description: "Enterprise billing platform",
        price: 4999,
        priceText: "₹4,999",
        period: "per user/month",
        minUsers: "Min 25 users",
        popular: false,
        features: [
          { category: "Billing", items: [
            "Unlimited invoices",
            "Custom billing logic"
          ]},
          { category: "Payments", items: [
            "Custom integrations",
            "Advanced compliance"
          ]},
          { category: "Automation", items: ["Custom workflows"] },
          { category: "Support", items: ["Dedicated manager"] }
        ]
      }
    ]
  },
  "ava-pingora": {
    name: "AVA Pingora",
    icon: Users,
    description: "Team collaboration and communication platform",
    plans: [
      {
        name: "Basic",
        description: "Essential team communication",
        price: 799,
        priceText: "₹799",
        period: "per user/month",
        minUsers: "Min 3 users",
        popular: false,
        features: [
          { category: "Messaging", items: [
            "Unlimited messages",
            "File sharing up to 10GB"
          ]},
          { category: "Meetings", items: [
            "Up to 5 participants",
            "Basic recording"
          ]},
          { category: "Collaboration", items: ["Basic workspace"] },
          { category: "Support", items: ["Email support"] }
        ]
      },
      {
        name: "Pro",
        description: "Advanced team collaboration",
        price: 1499,
        priceText: "₹1,499",
        period: "per user/month",
        minUsers: "Min 5 users",
        popular: true,
        features: [
          { category: "Messaging", items: [
            "Unlimited messages",
            "File sharing up to 100GB"
          ]},
          { category: "Meetings", items: [
            "Up to 25 participants",
            "HD recording with AI notes"
          ]},
          { category: "Collaboration", items: ["Advanced workspace"] },
          { category: "Support", items: ["Priority support"] }
        ]
      },
      {
        name: "Advanced",
        description: "Complete collaboration suite",
        price: 2299,
        priceText: "₹2,299",
        period: "per user/month",
        minUsers: "Min 10 users",
        popular: false,
        features: [
          { category: "Messaging", items: [
            "Unlimited messages",
            "Unlimited file sharing"
          ]},
          { category: "Meetings", items: [
            "Up to 100 participants",
            "Advanced AI features"
          ]},
          { category: "Collaboration", items: ["Custom workflows"] },
          { category: "Support", items: ["24/7 support"] }
        ]
      },
      {
        name: "Enterprise",
        description: "Enterprise communication platform",
        price: 3499,
        priceText: "₹3,499",
        period: "per user/month",
        minUsers: "Min 25 users",
        popular: false,
        features: [
          { category: "Messaging", items: [
            "Unlimited everything",
            "Advanced security"
          ]},
          { category: "Meetings", items: [
            "Unlimited participants",
            "Custom AI models"
          ]},
          { category: "Collaboration", items: ["Enterprise features"] },
          { category: "Support", items: ["Dedicated manager"] }
        ]
      }
    ]
  }
}

export function NewPricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [selectedPlanData, setSelectedPlanData] = useState<{
    name: string;
    price: string;
    billingCycle: string;
  } | null>(null)
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(1) // Pro card (index 1) is initially selected

  // Default to AVA CX pricing
  const currentProduct = productPricing["ava-cx"]

  const handleChoosePlan = (planName: string, price: string, cycle: string) => {
    setSelectedPlanData({
      name: planName,
      price: price,
      billingCycle: cycle
    })
    setIsContactFormOpen(true)
  }

  const handleCardSelect = (index: number) => {
    setSelectedCardIndex(index)
  }

  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 left-1/4 w-32 h-32 bg-white/5 rounded-2xl rotate-45"></div>
        <div className="absolute top-1/3 -right-10 w-24 h-24 bg-white/5 rounded-2xl rotate-12"></div>
        <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-white/5 rounded-xl rotate-45"></div>
      </div>

      {/* Left Side Decorative Elements */}
      <div className="absolute left-0 top-0 h-full w-64 overflow-hidden">
        {/* Large curved shape */}
        <div className="absolute -left-32 top-20 w-96 h-96 bg-blue-500/10 rounded-full"></div>
        <div className="absolute -left-20 top-40 w-64 h-64 bg-white/5 rounded-full"></div>
        <div className="absolute -left-16 top-60 w-48 h-48 bg-cyan-400/10 rounded-full"></div>
        
        {/* Layered rounded rectangles */}
        <div className="absolute -left-8 top-32 w-32 h-48 bg-white/5 rounded-3xl rotate-12"></div>
        <div className="absolute -left-12 top-52 w-28 h-40 bg-blue-400/10 rounded-2xl rotate-6"></div>
        <div className="absolute -left-6 top-72 w-24 h-32 bg-white/8 rounded-xl rotate-12"></div>
        
        {/* Bottom curved elements */}
        <div className="absolute -left-24 bottom-32 w-72 h-72 bg-purple-500/8 rounded-full"></div>
        <div className="absolute -left-16 bottom-20 w-48 h-48 bg-white/6 rounded-full"></div>
        <div className="absolute -left-8 bottom-40 w-32 h-64 bg-cyan-400/8 rounded-3xl rotate-12"></div>
      </div>

      {/* Right Side Decorative Elements */}
      <div className="absolute right-0 top-0 h-full w-64 overflow-hidden">
        {/* Large curved shape */}
        <div className="absolute -right-32 top-20 w-96 h-96 bg-blue-500/10 rounded-full"></div>
        <div className="absolute -right-20 top-40 w-64 h-64 bg-white/5 rounded-full"></div>
        <div className="absolute -right-16 top-60 w-48 h-48 bg-cyan-400/10 rounded-full"></div>
        
        {/* Layered rounded rectangles */}
        <div className="absolute -right-8 top-32 w-32 h-48 bg-white/5 rounded-3xl -rotate-12"></div>
        <div className="absolute -right-12 top-52 w-28 h-40 bg-blue-400/10 rounded-2xl -rotate-6"></div>
        <div className="absolute -right-6 top-72 w-24 h-32 bg-white/8 rounded-xl -rotate-12"></div>
        
        {/* Bottom curved elements */}
        <div className="absolute -right-24 bottom-32 w-72 h-72 bg-purple-500/8 rounded-full"></div>
        <div className="absolute -right-16 bottom-20 w-48 h-48 bg-white/6 rounded-full"></div>
        <div className="absolute -right-8 bottom-40 w-32 h-64 bg-cyan-400/8 rounded-3xl -rotate-12"></div>
      </div>

      {/* Additional Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side floating shapes */}
        <div className="absolute left-10 top-1/4 w-16 h-16 bg-white/10 rounded-2xl rotate-45 animate-pulse"></div>
        <div className="absolute left-20 top-3/4 w-12 h-12 bg-cyan-400/15 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute left-32 top-1/2 w-8 h-8 bg-white/12 rounded-lg rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Right side floating shapes */}
        <div className="absolute right-10 top-1/3 w-16 h-16 bg-white/10 rounded-2xl -rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute right-20 top-2/3 w-12 h-12 bg-cyan-400/15 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute right-32 top-1/2 w-8 h-8 bg-white/12 rounded-lg -rotate-12 animate-pulse" style={{animationDelay: '2.5s'}}></div>
      </div>

      {/* Large Side Panels - Similar to Image */}
      <div className="absolute left-0 top-0 h-full w-48 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none">
        <div className="absolute left-0 top-1/4 w-32 h-64 bg-white/3 rounded-r-3xl"></div>
        <div className="absolute left-0 top-1/2 w-24 h-48 bg-blue-400/5 rounded-r-2xl"></div>
        <div className="absolute left-0 bottom-1/4 w-36 h-56 bg-white/4 rounded-r-3xl"></div>
      </div>
      
      <div className="absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none">
        <div className="absolute right-0 top-1/4 w-32 h-64 bg-white/3 rounded-l-3xl"></div>
        <div className="absolute right-0 top-1/2 w-24 h-48 bg-blue-400/5 rounded-l-2xl"></div>
        <div className="absolute right-0 bottom-1/4 w-36 h-56 bg-white/4 rounded-l-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-bold text-4xl lg:text-5xl text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            Choose a plan that fits your business needs and budget. No hidden fees, no surprises—just straightforward pricing for powerful business solutions.
          </p>


          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-white hover:text-blue-100"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === "yearly"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-white hover:text-blue-100"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-1">
          {[
            { name: "Basic", description: "Perfect for small teams getting started", popular: false },
            { name: "Pro", description: "Most popular choice for growing businesses", popular: true },
            { name: "Advanced", description: "Advanced features for scaling teams", popular: false },
            { name: "Enterprise", description: "Full-scale solution for large organizations", popular: false }
          ].map((tier, index) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              index={index}
              billingCycle={billingCycle}
              currentProduct={currentProduct}
              onChoosePlan={handleChoosePlan}
              isSelected={selectedCardIndex === index}
              onSelect={() => handleCardSelect(index)}
            />
          ))}
        </div>

        {/* Enterprise Plan */}
        <div className="mt-16 text-center">
          <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <h3 className="font-bold text-2xl text-gray-800 mb-4">
              Need More Features?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our sales team for enterprise pricing and custom solutions tailored to your organization's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
                onClick={() => window.open('tel:+918585858585', '_self')}
              >
                Contact Sales
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full px-8"
                onClick={() => window.location.href = '/enterprise'}
              >
                View Enterprise
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <PricingContactForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        selectedPlan={selectedPlanData}
      />
    </section>
  )
}
