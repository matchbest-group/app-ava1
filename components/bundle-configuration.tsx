"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Check,
  Package,
  Sparkles,
  Zap,
  Plus,
  Minus,
  ShoppingCart,
  Calculator,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  MessageSquare,
  Globe,
  Receipt,
  Workflow,
  Crown,
  Building,
  Rocket,
  Target,
  Shield,
  Headphones,
  BarChart3,
  Settings,
  Palette,
  Database,
  Cloud,
  Lock,
  Bell,
  Phone,
  Mail,
  CreditCard,
  FileText,
  PieChart,
  Activity,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

// AVA Product data for bundle configuration
const availableProducts = [
  {
    id: 1,
    name: "AVA CX",
    description: "AI-Powered Customer Experience Platform",
    longDescription: "Transform customer interactions with intelligent automation, real-time analytics, and personalized experiences across all touchpoints.",
    category: "Customer Experience",
    basePrice: 79,
    rating: 4.9,
    popular: true,
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    image: "/api-management-dashboard.png",
    features: [
      "360° Customer View",
      "AI-Powered Insights",
      "Omnichannel Support",
      "Real-time Analytics",
      "Automated Workflows",
      "Customer Journey Mapping"
    ],
    modules: [
      { name: "Basic CX Analytics", price: 0 },
      { name: "Advanced AI Insights", price: 20 },
      { name: "Omnichannel Integration", price: 30 },
      { name: "Predictive Analytics", price: 25 },
    ]
  },
  {
    id: 2,
    name: "AVA Humantl",
    description: "AI-Powered Customer Support Agent",
    longDescription: "24/7 intelligent customer support with natural language processing, multi-language support, and seamless human handoff.",
    category: "Customer Support",
    basePrice: 59,
    rating: 4.8,
    popular: true,
    icon: MessageSquare,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    image: "/customer-support-dashboard.png",
    features: [
      "Natural Language Processing",
      "Multi-language Support",
      "Smart Ticket Routing",
      "Sentiment Analysis",
      "Knowledge Base Integration",
      "Performance Analytics"
    ],
    modules: [
      { name: "Basic Chat Support", price: 0 },
      { name: "Advanced NLP", price: 15 },
      { name: "Multi-language Pack", price: 20 },
      { name: "Sentiment Analysis", price: 18 },
    ]
  },
  {
    id: 3,
    name: "AVA Pingora",
    description: "Global Communication Platform",
    longDescription: "Connect your team worldwide with enterprise-grade messaging, video conferencing, and collaboration tools.",
    category: "Communication",
    basePrice: 49,
    rating: 4.7,
    popular: false,
    icon: Globe,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    image: "/modern-team-chat-interface-with-video-calls-and-fi.png",
    features: [
      "Global Messaging",
      "HD Video Conferences",
      "File Sharing",
      "Screen Sharing",
      "Virtual Rooms",
      "Mobile Apps"
    ],
    modules: [
      { name: "Basic Messaging", price: 0 },
      { name: "Video Conferencing", price: 15 },
      { name: "Advanced Collaboration", price: 20 },
      { name: "Enterprise Security", price: 25 },
    ]
  },
  {
    id: 4,
    name: "AVA Flow",
    description: "Workflow Automation Suite",
    longDescription: "Streamline business processes with intelligent automation, custom workflows, and seamless integrations.",
    category: "Automation",
    basePrice: 69,
    rating: 4.8,
    popular: true,
    icon: Workflow,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    image: "/modern-office-workspace-with-multiple-screens-show.png",
    features: [
      "Drag & Drop Builder",
      "500+ Integrations",
      "Conditional Logic",
      "Real-time Monitoring",
      "Custom Triggers",
      "API Management"
    ],
    modules: [
      { name: "Basic Workflows", price: 0 },
      { name: "Advanced Automation", price: 25 },
      { name: "Enterprise Integrations", price: 30 },
      { name: "Custom API Access", price: 20 },
    ]
  },
  {
    id: 5,
    name: "AVA SmartBill",
    description: "Intelligent Billing System",
    longDescription: "Automated invoicing, payment processing, and financial analytics with AI-powered insights and fraud detection.",
    category: "Finance",
    basePrice: 89,
    rating: 4.9,
    popular: false,
    icon: Receipt,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    image: "/database-management-interface.png",
    features: [
      "Automated Invoicing",
      "Payment Processing",
      "Tax Calculations",
      "Financial Analytics",
      "Fraud Detection",
      "Multi-currency Support"
    ],
    modules: [
      { name: "Basic Billing", price: 0 },
      { name: "Advanced Analytics", price: 25 },
      { name: "Payment Gateway", price: 30 },
      { name: "Fraud Protection", price: 35 },
    ]
  }
]

const predefinedBundles = [
  {
    id: 1,
    name: "Startup Essential",
    description: "Perfect for growing startups and small teams",
    originalPrice: 188,
    bundlePrice: 149,
    savings: 21,
    popular: false,
    icon: Rocket,
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    productIds: [2, 3], // AVA Humantl + AVA Pingora
    teamSize: "1-10 users",
    features: [
      "AI Customer Support",
      "Team Communication",
      "Basic Analytics",
      "Email Support",
      "Mobile Apps",
      "Standard Integrations"
    ],
    category: "Starter",
    badge: "Best for Startups"
  },
  {
    id: 2,
    name: "Business Pro",
    description: "Complete solution for growing businesses",
    originalPrice: 277,
    bundlePrice: 219,
    savings: 21,
    popular: true,
    icon: Building,
    color: "text-emerald-600",
    bgGradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    productIds: [1, 2, 4], // AVA CX + AVA Humantl + AVA Flow
    teamSize: "10-50 users",
    features: [
      "Customer Experience Platform",
      "AI Support Agent",
      "Workflow Automation",
      "Advanced Analytics",
      "Priority Support",
      "Custom Integrations",
      "API Access"
    ],
    category: "Professional",
    badge: "Most Popular"
  },
  {
    id: 3,
    name: "Enterprise Complete",
    description: "Full-scale enterprise solution with all features",
    originalPrice: 345,
    bundlePrice: 299,
    savings: 13,
    popular: false,
    icon: Crown,
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    productIds: [1, 2, 3, 4, 5], // All AVA products
    teamSize: "50+ users",
    features: [
      "All AVA Products Included",
      "Advanced AI & Analytics",
      "Global Communication",
      "Complete Automation Suite",
      "Intelligent Billing",
      "24/7 Premium Support",
      "White-label Options",
      "SLA Guarantee",
      "Dedicated Account Manager",
      "Custom Development"
    ],
    category: "Enterprise",
    badge: "Complete Solution"
  },
  {
    id: 4,
    name: "Customer Focus",
    description: "Specialized bundle for customer experience excellence",
    originalPrice: 227,
    bundlePrice: 189,
    savings: 17,
    popular: false,
    icon: Target,
    color: "text-rose-600",
    bgGradient: "from-rose-50 to-red-50",
    borderColor: "border-rose-200",
    productIds: [1, 2, 3], // AVA CX + AVA Humantl + AVA Pingora
    teamSize: "Any size",
    features: [
      "Customer Experience Platform",
      "AI-Powered Support",
      "Global Communication",
      "Customer Journey Analytics",
      "Omnichannel Support",
      "Real-time Insights"
    ],
    category: "Specialized",
    badge: "Customer Focused"
  }
]

export function BundleConfiguration() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [selectedModules, setSelectedModules] = useState<{[key: number]: number[]}>({})
  const [userCount, setUserCount] = useState([25])
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [comparedBundles, setComparedBundles] = useState<number[]>([])

  // Calculate custom bundle pricing
  const customBundleCalculation = useMemo(() => {
    const selectedProductsData = availableProducts.filter((p) => selectedProducts.includes(p.id))
    
    let totalBasePrice = 0
    let totalModulePrice = 0
    
    selectedProductsData.forEach(product => {
      totalBasePrice += product.basePrice
      
      // Add module prices
      const productModules = selectedModules[product.id] || []
      productModules.forEach(moduleIndex => {
        if (product.modules[moduleIndex]) {
          totalModulePrice += product.modules[moduleIndex].price
        }
      })
    })

    // Apply volume discounts
    let discount = 0
    if (selectedProducts.length >= 4) discount = 0.25 // 25% off for 4+ products
    else if (selectedProducts.length >= 3) discount = 0.20 // 20% off for 3+ products  
    else if (selectedProducts.length >= 2) discount = 0.15 // 15% off for 2+ products

    // Apply user count multiplier (simplified)
    const userMultiplier = userCount[0] <= 10 ? 1 : userCount[0] <= 50 ? 1.3 : 1.8

    const totalPrice = (totalBasePrice + totalModulePrice) * userMultiplier
    const discountedPrice = totalPrice * (1 - discount)
    const annualDiscount = billingCycle === "annual" ? 0.2 : 0 // 20% annual discount
    const finalPrice = discountedPrice * (1 - annualDiscount)
    const totalSavings = totalPrice - finalPrice

    return {
      products: selectedProductsData,
      originalPrice: totalPrice,
      discountedPrice: finalPrice,
      volumeDiscount: discount * 100,
      annualDiscount: annualDiscount * 100,
      savings: totalSavings,
      userMultiplier,
      monthlyPrice: finalPrice / (billingCycle === "annual" ? 12 : 1),
    }
  }, [selectedProducts, selectedModules, userCount, billingCycle])

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) => {
      const newSelection = prev.includes(productId) 
        ? prev.filter((id) => id !== productId) 
        : [...prev, productId]
      
      // Clear modules for deselected products
      if (!newSelection.includes(productId)) {
        setSelectedModules(prevModules => {
          const newModules = { ...prevModules }
          delete newModules[productId]
          return newModules
        })
      }
      
      return newSelection
    })
  }

  const toggleModuleSelection = (productId: number, moduleIndex: number) => {
    setSelectedModules(prev => {
      const productModules = prev[productId] || []
      const newModules = productModules.includes(moduleIndex)
        ? productModules.filter(idx => idx !== moduleIndex)
        : [...productModules, moduleIndex]
      
      return {
        ...prev,
        [productId]: newModules
      }
    })
  }

  const selectBundle = (bundleId: number) => {
    const bundle = predefinedBundles.find(b => b.id === bundleId)
    if (bundle) {
      setSelectedBundle(bundleId)
      setSelectedProducts(bundle.productIds)
      setSelectedModules({}) // Reset modules for bundle selection
    }
  }

  const toggleCompareBundle = (bundleId: number) => {
    setComparedBundles(prev => 
      prev.includes(bundleId)
        ? prev.filter(id => id !== bundleId)
        : prev.length < 3 
          ? [...prev, bundleId]
          : prev
    )
  }

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-primary mr-3" />
            <h1 className="font-bold text-4xl lg:text-5xl text-slate-900">
              Bundle Builder
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Create the perfect AVA solution for your organization. Choose from our expertly crafted bundles or build your own custom package.
          </p>
        </motion.div>

        <Tabs defaultValue="bundles" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="bundles" className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>Pre-Built Bundles</span>
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Custom Builder</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Compare</span>
            </TabsTrigger>
          </TabsList>

          {/* Pre-Built Bundles */}
          <TabsContent value="bundles" className="space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {predefinedBundles.map((bundle, index) => (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`relative h-full border-2 ${bundle.popular ? 'border-primary shadow-2xl scale-105' : bundle.borderColor} hover:shadow-xl transition-all duration-300 group`}>
                    {bundle.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-white px-4 py-1 text-sm font-semibold">
                          {bundle.badge}
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className={`pb-4 bg-gradient-to-r ${bundle.bgGradient} rounded-t-lg`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-lg bg-white/80 ${bundle.color}`}>
                            <bundle.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold text-slate-900">
                              {bundle.name}
                            </CardTitle>
                            <Badge variant="outline" className="mt-1">
                              {bundle.teamSize}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-baseline space-x-1">
                            <span className="text-3xl font-bold text-slate-900">
                              ${bundle.bundlePrice}
                            </span>
                            <span className="text-sm text-slate-500">/month</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <span className="text-slate-400 line-through">${bundle.originalPrice}</span>
                            <Badge variant="destructive" className="text-xs">
                              {bundle.savings}% OFF
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-slate-600 mt-2">
                        {bundle.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6">
                      {/* Included Products */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                          <Package className="w-4 h-4 mr-2" />
                          Included Products
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {bundle.productIds.map(productId => {
                            const product = availableProducts.find(p => p.id === productId)
                            if (!product) return null
                            return (
                              <div key={productId} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50">
                                <product.icon className={`w-4 h-4 ${product.color}`} />
                                <span className="text-sm font-medium text-slate-700">{product.name}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          Key Features
                        </h4>
                        <div className="space-y-2">
                          {bundle.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-slate-600">{feature}</span>
                            </div>
                          ))}
                          {bundle.features.length > 4 && (
                            <div className="text-sm text-slate-500 italic">
                              +{bundle.features.length - 4} more features
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button 
                          onClick={() => selectBundle(bundle.id)}
                          className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                        >
                          Select & Customize
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleCompareBundle(bundle.id)}
                            className={comparedBundles.includes(bundle.id) ? 'bg-blue-50 border-blue-200' : ''}
                          >
                            {comparedBundles.includes(bundle.id) ? 'Remove' : 'Compare'}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Custom Builder */}
          <TabsContent value="custom" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Product Selection */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Palette className="w-5 h-5" />
                      <span>Choose Your Products</span>
                    </CardTitle>
                    <CardDescription>
                      Select the AVA products you need and customize with additional modules
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {availableProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: product.id * 0.1 }}
                      >
                        <Card className={`transition-all duration-300 ${
                          selectedProducts.includes(product.id) 
                            ? `border-2 ${product.borderColor} ${product.bgColor}` 
                            : 'border hover:shadow-md'
                        }`}>
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <Checkbox
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => toggleProductSelection(product.id)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${product.bgColor}`}>
                                      <product.icon className={`w-5 h-5 ${product.color}`} />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-slate-900">{product.name}</h3>
                                      <p className="text-sm text-slate-600">{product.description}</p>
                                      <div className="flex items-center space-x-2 mt-1">
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                          <span className="text-xs text-slate-500">{product.rating}</span>
                                        </div>
                                        {product.popular && (
                                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-slate-900">
                                      ${product.basePrice}
                                    </div>
                                    <div className="text-xs text-slate-500">per month</div>
                                  </div>
                                </div>

                                {/* Modules */}
                                {selectedProducts.includes(product.id) && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 pt-4 border-t border-slate-200"
                                  >
                                    <h4 className="font-medium text-slate-900 mb-3">Optional Modules</h4>
                                    <div className="space-y-2">
                                      {product.modules.map((module, moduleIndex) => (
                                        <div key={moduleIndex} className="flex items-center justify-between p-2 rounded border">
                                          <div className="flex items-center space-x-2">
                                            <Checkbox
                                              checked={(selectedModules[product.id] || []).includes(moduleIndex)}
                                              onCheckedChange={() => toggleModuleSelection(product.id, moduleIndex)}
                                            />
                                            <span className="text-sm text-slate-700">{module.name}</span>
                                          </div>
                                          <span className="text-sm font-medium text-slate-900">
                                            {module.price === 0 ? 'Free' : `+$${module.price}`}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Pricing Calculator */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calculator className="w-5 h-5" />
                      <span>Pricing Calculator</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* User Count */}
                    <div>
                      <label className="text-sm font-medium text-slate-900 mb-2 block">
                        Number of Users: {userCount[0]}
                      </label>
                      <Slider
                        value={userCount}
                        onValueChange={setUserCount}
                        max={200}
                        min={1}
                        step={5}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>1</span>
                        <span>200+</span>
                      </div>
                    </div>

                    {/* Billing Cycle */}
                    <div>
                      <label className="text-sm font-medium text-slate-900 mb-3 block">
                        Billing Cycle
                      </label>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">Annual (20% discount)</span>
                        <Switch
                          checked={billingCycle === "annual"}
                          onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
                        />
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    {selectedProducts.length > 0 && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${customBundleCalculation.originalPrice.toFixed(2)}</span>
                          </div>
                          {customBundleCalculation.volumeDiscount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Volume Discount ({customBundleCalculation.volumeDiscount}%)</span>
                              <span>-${(customBundleCalculation.originalPrice * customBundleCalculation.volumeDiscount / 100).toFixed(2)}</span>
                            </div>
                          )}
                          {customBundleCalculation.annualDiscount > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Annual Discount (20%)</span>
                              <span>-${(customBundleCalculation.originalPrice * 0.2).toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-900">Total</span>
                            <span className="text-2xl font-bold text-slate-900">
                              ${customBundleCalculation.discountedPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="text-center text-sm text-slate-500">
                            {billingCycle === "annual" ? "per year" : "per month"}
                          </div>
                          {billingCycle === "annual" && (
                            <div className="text-center text-sm text-green-600">
                              ${customBundleCalculation.monthlyPrice.toFixed(2)} per month
                            </div>
                          )}
                        </div>

                        {customBundleCalculation.savings > 0 && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="text-center">
                              <div className="text-sm text-green-600 font-medium">
                                You save ${customBundleCalculation.savings.toFixed(2)}
                              </div>
                              <div className="text-xs text-green-600">
                                compared to individual pricing
                              </div>
                            </div>
                          </div>
                        )}

                        <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-semibold py-3">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    )}

                    {selectedProducts.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Select products to see pricing</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Compare Bundles */}
          <TabsContent value="compare" className="space-y-8">
            {comparedBundles.length === 0 ? (
              <Card>
                <CardContent className="text-center py-16">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No bundles selected for comparison</h3>
                  <p className="text-slate-600 mb-6">Go back to the bundles tab and select up to 3 bundles to compare</p>
                  <Button variant="outline">
                    View All Bundles
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparedBundles.map(bundleId => {
                  const bundle = predefinedBundles.find(b => b.id === bundleId)
                  if (!bundle) return null
                  
                  return (
                    <Card key={bundle.id} className={`${bundle.popular ? 'border-primary shadow-lg' : ''}`}>
                      <CardHeader className={`bg-gradient-to-r ${bundle.bgGradient}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center space-x-2">
                              <bundle.icon className={`w-5 h-5 ${bundle.color}`} />
                              <span>{bundle.name}</span>
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {bundle.description}
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCompareBundle(bundle.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">
                            ${bundle.bundlePrice}/month
                          </div>
                          <div className="text-sm text-slate-500 line-through">
                            ${bundle.originalPrice}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-slate-900 mb-2">Features</h4>
                            <div className="space-y-1">
                              {bundle.features.slice(0, 5).map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <Check className="w-3 h-3 text-green-500" />
                                  <span className="text-sm text-slate-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button className="w-full">
                            Choose This Bundle
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

// AVA Product data for bundle configuration
const availableProducts = [
  {
    id: 1,
    name: "AVA CX",
    description: "AI-Powered Customer Experience Platform",
    longDescription: "Transform customer interactions with intelligent automation, real-time analytics, and personalized experiences across all touchpoints.",
    category: "Customer Experience",
    basePrice: 79,
    rating: 4.9,
    popular: true,
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    image: "/api-management-dashboard.png",
    features: [
      "360° Customer View",
      "AI-Powered Insights",
      "Omnichannel Support",
      "Real-time Analytics",
      "Automated Workflows",
      "Customer Journey Mapping"
    ],
    modules: [
      { name: "Basic CX Analytics", price: 0 },
      { name: "Advanced AI Insights", price: 20 },
      { name: "Omnichannel Integration", price: 30 },
      { name: "Predictive Analytics", price: 25 },
    ]
  },
  {
    id: 2,
    name: "AVA Humantl",
    description: "AI-Powered Customer Support Agent",
    longDescription: "24/7 intelligent customer support with natural language processing, multi-language support, and seamless human handoff.",
    category: "Customer Support",
    basePrice: 59,
    rating: 4.8,
    popular: true,
    icon: MessageSquare,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    image: "/customer-support-dashboard.png",
    features: [
      "Natural Language Processing",
      "Multi-language Support",
      "Smart Ticket Routing",
      "Sentiment Analysis",
      "Knowledge Base Integration",
      "Performance Analytics"
    ],
    modules: [
      { name: "Basic Chat Support", price: 0 },
      { name: "Advanced NLP", price: 15 },
      { name: "Multi-language Pack", price: 20 },
      { name: "Sentiment Analysis", price: 18 },
    ]
  },
  {
    id: 3,
    name: "AVA Pingora",
    description: "Global Communication Platform",
    longDescription: "Connect your team worldwide with enterprise-grade messaging, video conferencing, and collaboration tools.",
    category: "Communication",
    basePrice: 49,
    rating: 4.7,
    popular: false,
    icon: Globe,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    image: "/modern-team-chat-interface-with-video-calls-and-fi.png",
    features: [
      "Global Messaging",
      "HD Video Conferences",
      "File Sharing",
      "Screen Sharing",
      "Virtual Rooms",
      "Mobile Apps"
    ],
    modules: [
      { name: "Basic Messaging", price: 0 },
      { name: "Video Conferencing", price: 15 },
      { name: "Advanced Collaboration", price: 20 },
      { name: "Enterprise Security", price: 25 },
    ]
  },
  {
    id: 4,
    name: "AVA Flow",
    description: "Workflow Automation Suite",
    longDescription: "Streamline business processes with intelligent automation, custom workflows, and seamless integrations.",
    category: "Automation",
    basePrice: 69,
    rating: 4.8,
    popular: true,
    icon: Workflow,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    image: "/modern-office-workspace-with-multiple-screens-show.png",
    features: [
      "Drag & Drop Builder",
      "500+ Integrations",
      "Conditional Logic",
      "Real-time Monitoring",
      "Custom Triggers",
      "API Management"
    ],
    modules: [
      { name: "Basic Workflows", price: 0 },
      { name: "Advanced Automation", price: 25 },
      { name: "Enterprise Integrations", price: 30 },
      { name: "Custom API Access", price: 20 },
    ]
  },
  {
    id: 5,
    name: "AVA SmartBill",
    description: "Intelligent Billing System",
    longDescription: "Automated invoicing, payment processing, and financial analytics with AI-powered insights and fraud detection.",
    category: "Finance",
    basePrice: 89,
    rating: 4.9,
    popular: false,
    icon: Receipt,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    image: "/database-management-interface.png",
    features: [
      "Automated Invoicing",
      "Payment Processing",
      "Tax Calculations",
      "Financial Analytics",
      "Fraud Detection",
      "Multi-currency Support"
    ],
    modules: [
      { name: "Basic Billing", price: 0 },
      { name: "Advanced Analytics", price: 25 },
      { name: "Payment Gateway", price: 30 },
      { name: "Fraud Protection", price: 35 },
    ]
  }
]

const predefinedBundles = [
  {
    id: 1,
    name: "Startup Essential",
    description: "Perfect for growing startups and small teams",
    originalPrice: 188,
    bundlePrice: 149,
    savings: 21,
    popular: false,
    icon: Rocket,
    color: "text-blue-600",
    bgGradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    productIds: [2, 3], // AVA Humantl + AVA Pingora
    teamSize: "1-10 users",
    features: [
      "AI Customer Support",
      "Team Communication",
      "Basic Analytics",
      "Email Support",
      "Mobile Apps",
      "Standard Integrations"
    ],
    category: "Starter",
    badge: "Best for Startups"
  },
  {
    id: 2,
    name: "Business Pro",
    description: "Complete solution for growing businesses",
    originalPrice: 277,
    bundlePrice: 219,
    savings: 21,
    popular: true,
    icon: Building,
    color: "text-emerald-600",
    bgGradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    productIds: [1, 2, 4], // AVA CX + AVA Humantl + AVA Flow
    teamSize: "10-50 users",
    features: [
      "Customer Experience Platform",
      "AI Support Agent",
      "Workflow Automation",
      "Advanced Analytics",
      "Priority Support",
      "Custom Integrations",
      "API Access"
    ],
    category: "Professional",
    badge: "Most Popular"
  },
  {
    id: 3,
    name: "Enterprise Complete",
    description: "Full-scale enterprise solution with all features",
    originalPrice: 345,
    bundlePrice: 299,
    savings: 13,
    popular: false,
    icon: Crown,
    color: "text-purple-600",
    bgGradient: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    productIds: [1, 2, 3, 4, 5], // All AVA products
    teamSize: "50+ users",
    features: [
      "All AVA Products Included",
      "Advanced AI & Analytics",
      "Global Communication",
      "Complete Automation Suite",
      "Intelligent Billing",
      "24/7 Premium Support",
      "White-label Options",
      "SLA Guarantee",
      "Dedicated Account Manager",
      "Custom Development"
    ],
    category: "Enterprise",
    badge: "Complete Solution"
  },
  {
    id: 4,
    name: "Customer Focus",
    description: "Specialized bundle for customer experience excellence",
    originalPrice: 227,
    bundlePrice: 189,
    savings: 17,
    popular: false,
    icon: Target,
    color: "text-rose-600",
    bgGradient: "from-rose-50 to-red-50",
    borderColor: "border-rose-200",
    productIds: [1, 2, 3], // AVA CX + AVA Humantl + AVA Pingora
    teamSize: "Any size",
    features: [
      "Customer Experience Platform",
      "AI-Powered Support",
      "Global Communication",
      "Customer Journey Analytics",
      "Omnichannel Support",
      "Real-time Insights"
    ],
    category: "Specialized",
    badge: "Customer Focused"
  }
]

export function BundleConfiguration() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [selectedModules, setSelectedModules] = useState<{[key: number]: number[]}>({})
  const [userCount, setUserCount] = useState([25])
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [comparedBundles, setComparedBundles] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("bundles")

  // Calculate custom bundle pricing
  const customBundleCalculation = useMemo(() => {
    const selectedProductsData = availableProducts.filter((p) => selectedProducts.includes(p.id))
    
    let totalBasePrice = 0
    let totalModulePrice = 0
    
    selectedProductsData.forEach(product => {
      totalBasePrice += product.basePrice
      
      // Add module prices
      const productModules = selectedModules[product.id] || []
      productModules.forEach(moduleIndex => {
        if (product.modules[moduleIndex]) {
          totalModulePrice += product.modules[moduleIndex].price
        }
      })
    })

    // Apply volume discounts
    let discount = 0
    if (selectedProducts.length >= 4) discount = 0.25 // 25% off for 4+ products
    else if (selectedProducts.length >= 3) discount = 0.20 // 20% off for 3+ products  
    else if (selectedProducts.length >= 2) discount = 0.15 // 15% off for 2+ products

    // Apply user count multiplier (simplified)
    const userMultiplier = userCount[0] <= 10 ? 1 : userCount[0] <= 50 ? 1.3 : 1.8

    const totalPrice = (totalBasePrice + totalModulePrice) * userMultiplier
    const discountedPrice = totalPrice * (1 - discount)
    const annualDiscount = billingCycle === "annual" ? 0.2 : 0 // 20% annual discount
    const finalPrice = discountedPrice * (1 - annualDiscount)
    const totalSavings = totalPrice - finalPrice

    return {
      products: selectedProductsData,
      originalPrice: totalPrice,
      discountedPrice: finalPrice,
      volumeDiscount: discount * 100,
      annualDiscount: annualDiscount * 100,
      savings: totalSavings,
      userMultiplier,
      monthlyPrice: finalPrice / (billingCycle === "annual" ? 12 : 1),
    }
  }, [selectedProducts, selectedModules, userCount, billingCycle])

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) => {
      const newSelection = prev.includes(productId) 
        ? prev.filter((id) => id !== productId) 
        : [...prev, productId]
      
      // Clear modules for deselected products
      if (!newSelection.includes(productId)) {
        setSelectedModules(prevModules => {
          const newModules = { ...prevModules }
          delete newModules[productId]
          return newModules
        })
      }
      
      return newSelection
    })
  }

  const toggleModuleSelection = (productId: number, moduleIndex: number) => {
    setSelectedModules(prev => {
      const productModules = prev[productId] || []
      const newModules = productModules.includes(moduleIndex)
        ? productModules.filter(idx => idx !== moduleIndex)
        : [...productModules, moduleIndex]
      
      return {
        ...prev,
        [productId]: newModules
      }
    })
  }

  const selectBundle = (bundleId: number) => {
    const bundle = predefinedBundles.find(b => b.id === bundleId)
    if (bundle) {
      setSelectedBundle(bundleId)
      setSelectedProducts(bundle.productIds)
      setSelectedModules({}) // Reset modules for bundle selection
      setActiveTab("customize")
    }
  }

  const toggleCompareBundle = (bundleId: number) => {
    setComparedBundles(prev => 
      prev.includes(bundleId)
        ? prev.filter(id => id !== bundleId)
        : prev.length < 3 
          ? [...prev, bundleId]
          : prev
    )
  }

  return (
    <section className="pt-24 pb-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">Bundle Configuration</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Create the perfect bundle for your organization. Choose from our pre-configured packages or build your own
            custom solution.
          </p>
        </div>

        <Tabs defaultValue="predefined" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predefined">Pre-configured Bundles</TabsTrigger>
            <TabsTrigger value="custom">Custom Bundle Builder</TabsTrigger>
            <TabsTrigger value="compare">Compare Bundles</TabsTrigger>
          </TabsList>

          {/* Pre-configured Bundles */}
          <TabsContent value="predefined" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {predefinedBundles.map((bundle) => (
                <Card
                  key={bundle.id}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${
                    bundle.popular ? "border-primary shadow-lg scale-105" : "border-border hover:border-primary/50"
                  } ${selectedBundle === bundle.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => selectPredefinedBundle(bundle.id)}
                >
                  {bundle.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  <CardHeader className={bundle.popular ? "pt-12" : ""}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <bundle.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-heading font-bold text-xl">{bundle.name}</CardTitle>
                        <CardDescription>{bundle.description}</CardDescription>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-heading font-black text-3xl text-primary">${bundle.bundlePrice}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground line-through">
                          ${bundle.originalPrice}/month
                        </span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Save {bundle.savings}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Included Products */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Included Products:</h4>
                      <div className="space-y-2">
                        {bundle.productIds.map((productId) => {
                          const product = availableProducts.find((p) => p.id === productId)
                          return product ? (
                            <div key={productId} className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">{product.name}</span>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Features:</h4>
                      <div className="space-y-2">
                        {bundle.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1" variant={bundle.popular ? "default" : "outline"}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBundleComparison(bundle.id)
                        }}
                      >
                        {comparedBundles.includes(bundle.id) ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Custom Bundle Builder */}
          <TabsContent value="custom" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Product Selection */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading font-bold text-xl flex items-center">
                      <Package className="h-5 w-5 mr-2 text-primary" />
                      Select Products
                    </CardTitle>
                    <CardDescription>Choose the products you want to include in your custom bundle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {availableProducts.map((product) => (
                        <Card
                          key={product.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedProducts.includes(product.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => toggleProductSelection(product.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <Checkbox
                                checked={selectedProducts.includes(product.id)}
                                onChange={() => toggleProductSelection(product.id)}
                                className="mt-1"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="font-semibold text-sm">{product.name}</h3>
                                  {product.popular && (
                                    <Badge variant="secondary" className="text-xs">
                                      <Star className="w-3 h-3 mr-1 fill-current" />
                                      Popular
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-primary">${product.price}/mo</span>
                                  <Badge variant="outline" className="text-xs">
                                    {product.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Configuration Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading font-bold text-xl flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Bundle Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* User Count */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="font-semibold text-foreground">Number of Users</label>
                        <span className="text-primary font-bold">{userCount[0]} users</span>
                      </div>
                      <Slider
                        value={userCount}
                        onValueChange={setUserCount}
                        max={100}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1 user</span>
                        <span>100 users</span>
                      </div>
                    </div>

                    {/* Billing Cycle */}
                    <div>
                      <label className="font-semibold text-foreground mb-3 block">Billing Cycle</label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={billingCycle === "annual"}
                            onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
                          />
                          <span className="text-sm">Annual billing (Save 20%)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pricing Summary */}
              <div className="space-y-6">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="font-heading font-bold text-xl flex items-center">
                      <Calculator className="h-5 w-5 mr-2 text-primary" />
                      Bundle Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedProducts.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Select products to see pricing</p>
                      </div>
                    ) : (
                      <>
                        {/* Selected Products */}
                        <div>
                          <h4 className="font-semibold mb-2">Selected Products ({selectedProducts.length})</h4>
                          <div className="space-y-1">
                            {customBundleCalculation.products.map((product) => (
                              <div key={product.id} className="flex justify-between text-sm">
                                <span>{product.name}</span>
                                <span>${product.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Pricing Breakdown */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal ({userCount[0]} users)</span>
                            <span>${customBundleCalculation.originalPrice.toFixed(2)}</span>
                          </div>
                          {customBundleCalculation.discount > 0 && (
                            <div className="flex justify-between text-sm text-primary">
                              <span>Bundle Discount ({customBundleCalculation.discount}%)</span>
                              <span>-${customBundleCalculation.savings.toFixed(2)}</span>
                            </div>
                          )}
                          {billingCycle === "annual" && (
                            <div className="flex justify-between text-sm text-primary">
                              <span>Annual Discount (20%)</span>
                              <span>-${(customBundleCalculation.discountedPrice * 0.2).toFixed(2)}</span>
                            </div>
                          )}
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">Total</span>
                            <div className="text-right">
                              <div className="font-heading font-black text-2xl text-primary">
                                $
                                {(
                                  customBundleCalculation.discountedPrice * (billingCycle === "annual" ? 0.8 : 1)
                                ).toFixed(2)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                per {billingCycle === "annual" ? "year" : "month"}
                              </div>
                            </div>
                          </div>

                          {customBundleCalculation.savings > 0 && (
                            <div className="bg-primary/10 p-3 rounded-lg">
                              <div className="flex items-center space-x-2 text-primary">
                                <TrendingUp className="h-4 w-4" />
                                <span className="font-semibold text-sm">
                                  You save ${customBundleCalculation.savings.toFixed(2)}/month
                                </span>
                              </div>
                            </div>
                          )}

                          <Button className="w-full" size="lg">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add Custom Bundle to Cart
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Bundle Comparison */}
          <TabsContent value="compare" className="space-y-8">
            {comparedBundles.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    No bundles selected for comparison
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Go to the pre-configured bundles tab and click the + button to add bundles for comparison.
                  </p>
                  <Button onClick={() => document.querySelector('[value="predefined"]')?.click()}>
                    View Pre-configured Bundles
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-max">
                  {comparedBundles.map((bundleId) => {
                    const bundle = predefinedBundles.find((b) => b.id === bundleId)
                    if (!bundle) return null

                    return (
                      <Card key={bundle.id} className="w-80">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="font-heading font-bold text-lg">{bundle.name}</CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => toggleBundleComparison(bundle.id)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardDescription>{bundle.description}</CardDescription>
                          <div className="space-y-1">
                            <div className="font-heading font-black text-2xl text-primary">
                              ${bundle.bundlePrice}/month
                            </div>
                            <div className="text-sm text-muted-foreground line-through">
                              ${bundle.originalPrice}/month
                            </div>
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              Save {bundle.savings}%
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Products ({bundle.productIds.length})</h4>
                              <div className="space-y-1">
                                {bundle.productIds.map((productId) => {
                                  const product = availableProducts.find((p) => p.id === productId)
                                  return product ? (
                                    <div key={productId} className="flex items-center space-x-2">
                                      <Check className="h-3 w-3 text-primary" />
                                      <span className="text-xs">{product.name}</span>
                                    </div>
                                  ) : null
                                })}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Features</h4>
                              <div className="space-y-1">
                                {bundle.features.slice(0, 3).map((feature, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <Check className="h-3 w-3 text-primary" />
                                    <span className="text-xs">{feature}</span>
                                  </div>
                                ))}
                                {bundle.features.length > 3 && (
                                  <div className="text-xs text-muted-foreground">
                                    +{bundle.features.length - 3} more features
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button className="w-full">
                              Choose {bundle.name}
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
