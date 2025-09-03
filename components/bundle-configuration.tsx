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
} from "lucide-react"

// Product data for bundle configuration
const availableProducts = [
  {
    id: 1,
    name: "Analytics Pro",
    description: "Real-time business intelligence dashboard",
    category: "Business Intelligence",
    price: 49,
    rating: 4.9,
    popular: true,
    image: "/images/dashboard-1.png",
  },
  {
    id: 2,
    name: "Data Insights",
    description: "AI-powered data analysis platform",
    category: "Business Intelligence",
    price: 79,
    rating: 4.8,
    popular: false,
    image: "/ai-data-analysis-interface-with-machine-learning-v.png",
  },
  {
    id: 3,
    name: "SecureVault",
    description: "Advanced data encryption and storage",
    category: "Security & Compliance",
    price: 39,
    rating: 4.9,
    popular: true,
    image: "/cybersecurity-dashboard-with-encryption-and-protec.png",
  },
  {
    id: 4,
    name: "Compliance Manager",
    description: "Automated compliance monitoring",
    category: "Security & Compliance",
    price: 59,
    rating: 4.7,
    popular: false,
    image: "/compliance-management-interface-with-audit-trails-.png",
  },
  {
    id: 5,
    name: "TeamChat Pro",
    description: "Enterprise messaging platform",
    category: "Communication",
    price: 29,
    rating: 4.8,
    popular: true,
    image: "/modern-team-chat-interface-with-video-calls-and-fi.png",
  },
  {
    id: 6,
    name: "Video Conference",
    description: "HD video conferencing solution",
    category: "Communication",
    price: 19,
    rating: 4.6,
    popular: false,
    image: "/professional-video-conference-call-with-multiple-p.png",
  },
  {
    id: 7,
    name: "Project Manager",
    description: "Project management and task tracking",
    category: "Productivity",
    price: 35,
    rating: 4.7,
    popular: false,
    image: "/project-management-dashboard.png",
  },
  {
    id: 8,
    name: "Cloud Storage Pro",
    description: "Enterprise-grade cloud storage",
    category: "Storage",
    price: 25,
    rating: 4.8,
    popular: false,
    image: "/cloud-storage-interface.png",
  },
]

const predefinedBundles = [
  {
    id: 1,
    name: "Startup Essentials",
    description: "Perfect for growing businesses",
    originalPrice: 157,
    bundlePrice: 99,
    savings: 37,
    popular: false,
    icon: Zap,
    productIds: [1, 5, 3],
    features: ["Up to 10 users", "Basic integrations", "Email support", "Monthly reports"],
    category: "Starter",
  },
  {
    id: 2,
    name: "Professional Suite",
    description: "Complete solution for established teams",
    originalPrice: 267,
    bundlePrice: 179,
    savings: 33,
    popular: true,
    icon: Package,
    productIds: [1, 2, 5, 6, 3, 4],
    features: ["Up to 50 users", "Advanced integrations", "Priority support", "Custom reports", "API access"],
    category: "Professional",
  },
  {
    id: 3,
    name: "Enterprise Complete",
    description: "Full-scale enterprise solution",
    originalPrice: 399,
    bundlePrice: 299,
    savings: 25,
    popular: false,
    icon: Sparkles,
    productIds: [1, 2, 3, 4, 5, 6, 7, 8],
    features: [
      "Unlimited users",
      "Custom integrations",
      "24/7 phone support",
      "White-label options",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    category: "Enterprise",
  },
]

export function BundleConfiguration() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [userCount, setUserCount] = useState([10])
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [comparedBundles, setComparedBundles] = useState<number[]>([])

  // Calculate custom bundle pricing
  const customBundleCalculation = useMemo(() => {
    const selectedProductsData = availableProducts.filter((p) => selectedProducts.includes(p.id))
    const totalPrice = selectedProductsData.reduce((sum, product) => sum + product.price, 0)

    // Apply volume discounts
    let discount = 0
    if (selectedProducts.length >= 6)
      discount = 0.25 // 25% off for 6+ products
    else if (selectedProducts.length >= 4)
      discount = 0.2 // 20% off for 4+ products
    else if (selectedProducts.length >= 2) discount = 0.15 // 15% off for 2+ products

    // Apply user count multiplier
    const userMultiplier = userCount[0] <= 10 ? 1 : userCount[0] <= 50 ? 1.5 : 2

    const discountedPrice = totalPrice * (1 - discount)
    const finalPrice = discountedPrice * userMultiplier
    const savings = totalPrice * userMultiplier - finalPrice

    return {
      products: selectedProductsData,
      originalPrice: totalPrice * userMultiplier,
      discountedPrice: finalPrice,
      discount: discount * 100,
      savings,
      userMultiplier,
    }
  }, [selectedProducts, userCount])

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const selectPredefinedBundle = (bundleId: number) => {
    const bundle = predefinedBundles.find((b) => b.id === bundleId)
    if (bundle) {
      setSelectedProducts(bundle.productIds)
      setSelectedBundle(bundleId)
    }
  }

  const toggleBundleComparison = (bundleId: number) => {
    setComparedBundles((prev) =>
      prev.includes(bundleId) ? prev.filter((id) => id !== bundleId) : prev.length < 3 ? [...prev, bundleId] : prev,
    )
  }

  return (
    <section className="py-8 bg-background">
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
