import { Header } from "@/components/header"
import { Footer } from "@/components/footer" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Workflow, 
  Zap, 
  Timer, 
  GitBranch, 
  Shield, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  Play
} from "lucide-react"
import { motion } from "framer-motion"

export default function AvaFlowPage() {
  const features = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description: "Drag-and-drop interface to create complex automation workflows without writing a single line of code."
    },
    {
      icon: Zap,
      title: "Smart Triggers",
      description: "AI-powered triggers that automatically start workflows based on events, conditions, or schedules."
    },
    {
      icon: Timer,
      title: "Real-time Processing", 
      description: "Lightning-fast workflow execution with real-time monitoring and instant notifications."
    },
    {
      icon: GitBranch,
      title: "Conditional Logic",
      description: "Advanced branching and decision trees to handle complex business logic and scenarios."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access controls and comprehensive audit trails."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Detailed insights into workflow performance, bottlenecks, and optimization opportunities."
    }
  ]

  const benefits = [
    "Reduce manual tasks by 80%",
    "Improve process efficiency by 65%",
    "Cut operational costs by 45%", 
    "Eliminate human errors by 95%",
    "Accelerate time-to-market by 50%",
    "Scale operations seamlessly"
  ]

  const useCases = [
    {
      title: "Customer Onboarding",
      description: "Automate the entire customer onboarding process from registration to account activation.",
      icon: "👥"
    },
    {
      title: "Invoice Processing", 
      description: "Streamline invoice approval workflows with automated routing and notifications.",
      icon: "📄"
    },
    {
      title: "Lead Management",
      description: "Automatically qualify, route, and nurture leads based on predefined criteria.",
      icon: "🎯"
    },
    {
      title: "Employee Onboarding",
      description: "Create seamless employee onboarding experiences with automated task assignments.",
      icon: "🏢"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
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
              <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-200">
                <Workflow className="w-4 h-4 mr-2" />
                Workflow Automation Suite
              </Badge>
              
              <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Automate Everything with
                <span className="text-purple-600 block mt-2">AVA Flow</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Transform your business processes with intelligent workflow automation. 
                Build, deploy, and manage workflows that adapt to your business needs without coding.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  <Play className="mr-2 w-5 h-5" />
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
                src="/api-management-dashboard.png"
                alt="AVA Flow Dashboard"
                className="rounded-2xl shadow-2xl border border-slate-200"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">24/7 Automation</span>
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
              Powerful Workflow Automation Made Simple
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From simple task automation to complex business processes, 
              AVA Flow provides all the tools you need to streamline operations.
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
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-purple-600" />
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

      {/* Use Cases Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Transform Any Business Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Whether you're in sales, HR, finance, or operations, AVA Flow adapts to your unique workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{useCase.icon}</div>
                      <CardTitle className="text-slate-900">{useCase.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Measurable Impact on Your Business
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Companies using AVA Flow see immediate improvements in efficiency, 
                cost reduction, and employee satisfaction.
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
                  <div className="text-3xl font-bold text-purple-600 mb-2">80%</div>
                  <div className="text-sm text-slate-600">Fewer Manual Tasks</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border">
                  <div className="text-3xl font-bold text-green-600 mb-2">65%</div>
                  <div className="text-sm text-slate-600">More Efficient</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border">
                  <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
                  <div className="text-sm text-slate-600">Cost Savings</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border">
                  <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                  <div className="text-sm text-slate-600">Error Reduction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Automate Your Workflows?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses automating their processes with AVA Flow. 
              Start your transformation today with a free trial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-50">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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
