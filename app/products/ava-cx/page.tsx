import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe,
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react"
import { motion } from "framer-motion"

export default function AvaCXPage() {
  const features = [
    {
      icon: Users,
      title: "Customer Insights",
      description: "Deep analytics into customer behavior, preferences, and journey mapping for better engagement strategies."
    },
    {
      icon: MessageSquare,
      title: "Omnichannel Support", 
      description: "Unified communication across email, chat, social media, and phone for seamless customer experience."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live dashboards showing customer satisfaction scores, response times, and engagement metrics."
    },
    {
      icon: Zap,
      title: "AI-Powered Automation",
      description: "Intelligent chatbots and automated responses that learn from interactions to improve over time."
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security ensuring all customer data is protected with advanced encryption."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Multi-language support and localized experiences for customers worldwide."
    }
  ]

  const benefits = [
    "Reduce customer response time by 75%",
    "Increase customer satisfaction scores by 40%", 
    "Lower support costs by 60%",
    "Improve first-contact resolution by 85%",
    "Scale support operations efficiently",
    "Gain actionable customer insights"
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechCorp Industries",
      role: "VP Customer Success",
      content: "AVA CX transformed our customer support. We've seen a 50% improvement in satisfaction scores and our team is more efficient than ever.",
      rating: 5
    },
    {
      name: "Michael Chen",  
      company: "Global Retail Solutions",
      role: "Head of Customer Experience",
      content: "The AI-powered insights have been game-changing. We now proactively address issues before customers even report them.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
              <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
                <Users className="w-4 h-4 mr-2" />
                Customer Experience Platform
              </Badge>
              
              <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Transform Your Customer Experience with
                <span className="text-blue-600 block mt-2">AVA CX</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Deliver exceptional customer experiences at every touchpoint with our AI-powered 
                customer experience platform. Streamline support, gain insights, and delight your customers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  Watch Demo
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
                src="/customer-support-dashboard.png"
                alt="AVA CX Dashboard"
                className="rounded-2xl shadow-2xl border border-slate-200"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">Live Support Active</span>
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
              Everything You Need for Perfect Customer Experience
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform combines AI intelligence, real-time analytics, 
              and seamless integrations to revolutionize how you serve your customers.
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
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
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
                Measurable Results That Drive Growth
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Join thousands of companies who have transformed their customer experience 
                and achieved remarkable improvements in satisfaction and efficiency.
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
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                  <div className="text-sm text-slate-600">Faster Response Time</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">40%</div>
                  <div className="text-sm text-slate-600">Higher Satisfaction</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">60%</div>
                  <div className="text-sm text-slate-600">Cost Reduction</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
                  <div className="text-sm text-slate-600">First-Contact Resolution</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers are saying about AVA CX
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
                      <div className="text-blue-600 font-medium">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Customer Experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of companies using AVA CX to deliver exceptional customer experiences. 
              Start your free trial today and see the difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
