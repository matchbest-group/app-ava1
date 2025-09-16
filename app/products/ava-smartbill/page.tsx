import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Receipt, 
  DollarSign, 
  BarChart3, 
  Zap, 
  Shield, 
  CreditCard,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Clock,
  RefreshCw
} from "lucide-react"
import { motion } from "framer-motion"

export default function AvaSmartBillPage() {
  const features = [
    {
      icon: Receipt,
      title: "Smart Invoice Generation",
      description: "AI-powered invoice creation with automatic data entry, customizable templates, and multi-currency support."
    },
    {
      icon: DollarSign,
      title: "Automated Payment Processing",
      description: "Seamless payment collection with multiple payment gateways, recurring billing, and instant payment notifications."
    },
    {
      icon: BarChart3,
      title: "Financial Analytics",
      description: "Real-time financial insights, cash flow forecasting, and comprehensive reporting for better decision making."
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Automate billing workflows from quote to payment with smart approval processes and payment reminders."
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description: "SOX, PCI DSS compliant with advanced encryption, audit trails, and role-based access controls."
    },
    {
      icon: CreditCard,
      title: "Multi-Payment Options",
      description: "Accept payments via credit cards, bank transfers, digital wallets, and cryptocurrency with global coverage."
    }
  ]

  const benefits = [
    "Reduce invoice processing time by 75%",
    "Improve payment collection rate by 50%",
    "Cut billing errors by 95%",
    "Decrease accounting costs by 40%",
    "Accelerate cash flow by 30 days",
    "Automate 90% of billing tasks"
  ]

  const pricingTiers = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses",
      features: [
        "Up to 100 invoices/month",
        "Basic payment processing",
        "Email support",
        "Standard templates"
      ]
    },
    {
      name: "Professional", 
      price: "$79",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Up to 1,000 invoices/month", 
        "Advanced automation",
        "Priority support",
        "Custom templates",
        "Financial reporting"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month", 
      description: "For large organizations",
      features: [
        "Unlimited invoices",
        "Full workflow automation",
        "24/7 dedicated support",
        "White-label options",
        "Advanced analytics",
        "API access"
      ]
    }
  ]

  const testimonials = [
    {
      name: "Jennifer Walsh",
      company: "TechStart Solutions",
      role: "CFO",
      content: "AVA SmartBill has completely transformed our billing process. We've cut our month-end closing time in half and our cash flow has never been better.",
      rating: 5
    },
    {
      name: "Marcus Thompson",
      company: "Global Manufacturing Inc",
      role: "Finance Director",
      content: "The automation features are incredible. What used to take our team days now happens automatically. The ROI was immediate.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-orange-100 text-orange-700 border-orange-200">
                <Receipt className="w-4 h-4 mr-2" />
                Intelligent Billing System
              </Badge>
              
              <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Smart Billing Made Simple with
                <span className="text-orange-600 block mt-2">AVA SmartBill</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Revolutionize your billing process with AI-powered automation. 
                From invoicing to payment collection, manage your entire financial workflow effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                  View Pricing
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/database-management-interface.png"
                alt="AVA SmartBill Dashboard"
                className="rounded-2xl shadow-2xl border border-slate-200"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">Real-time Processing</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Complete Billing Automation Platform
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From invoice creation to payment processing and financial reporting, 
              AVA SmartBill handles every aspect of your billing workflow intelligently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200">
                  <CardHeader>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-slate-900">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Measurable Financial Impact
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Companies using AVA SmartBill see immediate improvements in billing efficiency, 
                payment collection, and overall financial performance.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border">
                  <div className="flex items-center mb-3">
                    <Clock className="w-6 h-6 text-orange-600 mr-2" />
                    <div className="text-2xl font-bold text-orange-600">75%</div>
                  </div>
                  <div className="text-sm text-slate-600">Faster Processing</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                    <div className="text-2xl font-bold text-green-600">50%</div>
                  </div>
                  <div className="text-sm text-slate-600">Better Collection</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-blue-600 mr-2" />
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                  </div>
                  <div className="text-sm text-slate-600">Error Reduction</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border">
                  <div className="flex items-center mb-3">
                    <RefreshCw className="w-6 h-6 text-purple-600 mr-2" />
                    <div className="text-2xl font-bold text-purple-600">90%</div>
                  </div>
                  <div className="text-sm text-slate-600">Task Automation</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs. All plans include our core features 
              with no hidden fees or long-term contracts.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`h-full hover:shadow-lg transition-all duration-300 relative ${
                  tier.popular ? 'border-orange-500 shadow-lg' : 'border-slate-200'
                }`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-slate-900 mb-2">{tier.name}</CardTitle>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                      <span className="text-slate-600 ml-1">{tier.period}</span>
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        tier.popular 
                          ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                      }`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trusted by Finance Teams Worldwide
            </h2>
            <p className="text-xl text-slate-600">
              See how businesses are transforming their billing processes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full border-slate-200">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-slate-700 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-slate-600">{testimonial.role}</div>
                      <div className="text-orange-600 font-medium">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Revolutionize Your Billing?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses automating their billing processes with AVA SmartBill. 
              Start your free trial today and see the difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-slate-50">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
