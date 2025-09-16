"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Calculator,
  Users, 
  Workflow, 
  Globe, 
  Receipt,
  Plus,
  Minus,
  Check,
  Star,
  Zap,
  Shield,
  BarChart3,
  Clock,
  Database,
  MessageSquare,
  ArrowRight,
  ShoppingCart,
  Sparkles
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const availableProducts = [
  {
    id: "ava-cx",
    name: "AVA CX",
    description: "Customer Experience Platform",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    basePrice: 99,
    features: [
      "Omnichannel Support",
      "AI-Powered Chatbots",
      "Customer Analytics",
      "Real-time Monitoring",
      "Advanced Reporting"
    ],
    addOns: [
      { name: "Premium Analytics", price: 29, description: "Advanced customer insights" },
      { name: "Multi-language Support", price: 19, description: "Support for 25+ languages" },
      { name: "Custom Integrations", price: 49, description: "Custom API integrations" }
    ]
  },
  {
    id: "ava-flow",
    name: "AVA Flow",
    description: "Workflow Automation Suite", 
    icon: Workflow,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    basePrice: 149,
    features: [
      "Visual Workflow Builder",
      "Process Automation",
      "Task Management",
      "Team Collaboration",
      "Performance Analytics"
    ],
    addOns: [
      { name: "Advanced Triggers", price: 39, description: "Complex automation rules" },
      { name: "API Connectors", price: 59, description: "Connect to 500+ apps" },
      { name: "White-label Solution", price: 99, description: "Brand customization" }
    ]
  },
  {
    id: "ava-pingora",
    name: "AVA Pingora",
    description: "Global Communication Platform",
    icon: Globe,
    color: "text-green-500", 
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    basePrice: 79,
    features: [
      "Global Messaging",
      "Video Conferencing",
      "File Sharing",
      "Real-time Translation",
      "Security Compliance"
    ],
    addOns: [
      { name: "HD Video Calling", price: 25, description: "4K video quality" },
      { name: "Advanced Security", price: 35, description: "End-to-end encryption" },
      { name: "Storage Expansion", price: 15, description: "Additional 100GB storage" }
    ]
  },
  {
    id: "ava-smartbill",
    name: "AVA SmartBill",
    description: "Intelligent Billing System",
    icon: Receipt,
    color: "text-orange-500",
    bgColor: "bg-orange-50", 
    borderColor: "border-orange-200",
    basePrice: 89,
    features: [
      "Automated Invoicing",
      "Payment Processing",
      "Financial Reporting",
      "Tax Compliance",
      "Multi-currency Support"
    ],
    addOns: [
      { name: "Advanced Reports", price: 29, description: "Custom financial reports" },
      { name: "Payment Gateway", price: 19, description: "Multiple payment options" },
      { name: "Audit Trail", price: 39, description: "Complete transaction history" }
    ]
  }
]

export default function CustomBundlePage() {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [selectedAddOns, setSelectedAddOns] = useState<Map<string, number>>(new Map())
  const [teamSize, setTeamSize] = useState([10])
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [showCalculator, setShowCalculator] = useState(true)

  const toggleProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
      // Remove all add-ons for this product
      const newAddOns = new Map(selectedAddOns)
      const product = availableProducts.find(p => p.id === productId)
      if (product) {
        product.addOns.forEach(addon => {
          newAddOns.delete(`${productId}-${addon.name}`)
        })
      }
      setSelectedAddOns(newAddOns)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
  }

  const toggleAddOn = (productId: string, addOnName: string) => {
    if (!selectedProducts.has(productId)) return
    
    const key = `${productId}-${addOnName}`
    const newAddOns = new Map(selectedAddOns)
    if (newAddOns.has(key)) {
      newAddOns.delete(key)
    } else {
      const product = availableProducts.find(p => p.id === productId)
      const addOn = product?.addOns.find(a => a.name === addOnName)
      if (addOn) {
        newAddOns.set(key, addOn.price)
      }
    }
    setSelectedAddOns(newAddOns)
  }

  const calculateTotal = () => {
    let total = 0
    
    // Base product prices
    selectedProducts.forEach(productId => {
      const product = availableProducts.find(p => p.id === productId)
      if (product) {
        total += product.basePrice
      }
    })
    
    // Add-on prices
    selectedAddOns.forEach(price => {
      total += price
    })
    
    // Team size multiplier (for products that scale with team size)
    const teamMultiplier = teamSize[0] / 10
    total *= teamMultiplier
    
    // Billing cycle discount
    if (billingCycle === "yearly") {
      total *= 0.8 // 20% discount for yearly
    }
    
    return total
  }

  const calculateSavings = () => {
    if (billingCycle === "yearly") {
      const monthlyTotal = calculateTotal() / 0.8
      return monthlyTotal * 12 - calculateTotal() * 12
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 border-0">
              <Calculator className="w-4 h-4 mr-2" />
              Custom Bundle Builder
            </Badge>
            
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Build Your Perfect
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                Business Solution
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Mix and match our powerful products to create a customized solution that fits your exact needs. 
              Get real-time pricing and see instant savings with our smart bundle calculator.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Product Selection */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Choose Your Products</h2>
              
              <div className="grid gap-6">
                {availableProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className={`relative overflow-hidden border-2 transition-all duration-300 ${
                      selectedProducts.has(product.id) 
                        ? `${product.borderColor} shadow-lg ring-2 ring-offset-2 ring-opacity-50` 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl ${product.bgColor}`}>
                              <product.icon className={`w-6 h-6 ${product.color}`} />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-slate-900">{product.name}</CardTitle>
                              <CardDescription className="text-slate-600">
                                {product.description}
                              </CardDescription>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-slate-900">
                                ${product.basePrice}
                              </div>
                              <div className="text-sm text-slate-500">per month</div>
                              {selectedProducts.has(product.id) && (
                                <span className="inline-flex items-center text-green-600 text-xs font-medium mt-1">
                                  <Check className="w-3 h-3 mr-1" />
                                  Selected
                                </span>
                              )}
                            </div>
                            <Switch
                              checked={selectedProducts.has(product.id)}
                              onCheckedChange={() => toggleProduct(product.id)}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Core Features */}
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Core Features</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {product.features.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm text-slate-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Add-ons */}
                        <AnimatePresence>
                          {selectedProducts.has(product.id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t pt-4"
                            >
                              <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                                Premium Add-ons
                              </h4>
                              <div className="space-y-3">
                                {product.addOns.map((addOn) => (
                                  <div
                                    key={addOn.name}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                                      selectedAddOns.has(`${product.id}-${addOn.name}`)
                                        ? 'border-blue-200 bg-blue-50'
                                        : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                  >
                                    <div className="flex-1">
                                      <div className="font-medium text-slate-900">{addOn.name}</div>
                                      <div className="text-sm text-slate-600">{addOn.description}</div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                      <span className="font-semibold text-slate-900">+${addOn.price}</span>
                                      <Switch
                                        checked={selectedAddOns.has(`${product.id}-${addOn.name}`)}
                                        onCheckedChange={() => toggleAddOn(product.id, addOn.name)}
                                        className="data-[state=checked]:bg-blue-600"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                      
                      {/* Selected indicator now inline near price; removed floating badge to avoid overlap */}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Calculator Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-8 h-fit"
          >
            <Card className="rounded-xl overflow-hidden border border-slate-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-t-xl">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <CardTitle>Bundle Calculator</CardTitle>
                </div>
                <CardDescription className="text-blue-100/90">
                  Configure your custom solution
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6 bg-white">
                {/* Team Size Slider */}
                <div>
                  <label className="text-sm font-semibold text-slate-900 mb-3 block">
                    Team Size: {teamSize[0]} users
                  </label>
                  <Slider
                    value={teamSize}
                    onValueChange={setTeamSize}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 user</span>
                    <span>100+ users</span>
                  </div>
                </div>

                <Separator />

                {/* Billing Cycle */}
                <div>
                  <label className="text-sm font-semibold text-slate-900 mb-3 block">
                    Billing Cycle
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={billingCycle === "monthly" ? "default" : "outline"}
                      onClick={() => setBillingCycle("monthly")}
                      className="w-full"
                    >
                      Monthly
                    </Button>
                    <Button
                      variant={billingCycle === "yearly" ? "default" : "outline"}
                      onClick={() => setBillingCycle("yearly")}
                      className="w-full relative"
                    >
                      Yearly
                      <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1">
                        -20%
                      </Badge>
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Selected Products Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Selected Products</h4>
                  {selectedProducts.size === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No products selected</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {Array.from(selectedProducts).map(productId => {
                        const product = availableProducts.find(p => p.id === productId)
                        if (!product) return null
                        return (
                          <div key={productId} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <product.icon className={`w-4 h-4 ${product.color}`} />
                              <span className="text-sm font-medium">{product.name}</span>
                            </div>
                            <span className="text-sm font-semibold">${product.basePrice}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Pricing Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Subtotal</span>
                    <span className="font-semibold">${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  {billingCycle === "yearly" && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="text-sm">Yearly Savings</span>
                      <span className="font-semibold">-${calculateSavings().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-xl font-bold text-slate-900 pt-4 border-t">
                    <span>Total</span>
                    <div className="text-right">
                      <div className="text-2xl">${(calculateTotal() * (billingCycle === "yearly" ? 12 : 1)).toFixed(2)}</div>
                      <div className="text-xs font-normal text-slate-500">
                        per {billingCycle === "yearly" ? "year" : "month"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <Button 
                    className="w-full h-11 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md"
                    disabled={selectedProducts.size === 0}
                  >
                    Add to Cart
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full h-11 rounded-lg"
                    disabled={selectedProducts.size === 0}
                  >
                    Get Quote
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="bg-slate-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    Trusted by <span className="font-semibold">10,000+</span> businesses worldwide
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
