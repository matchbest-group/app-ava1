'use client'

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductOverview } from "@/components/product-overview"
// import { FeaturedBundles } from "@/components/featured-bundles"
import { BusinessIntelligenceSection } from "@/components/business-intelligence-section"
import { DynamicPricingSection } from "@/components/dynamic-pricing-section"
import { DynamicContactSection } from "@/components/dynamic-contact-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { 
  Users, 
  Zap, 
  Shield, 
  Globe,
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  BarChart3,
  Lock,
  Clock,
  Headphones,
  Rocket,
  Target,
  Lightbulb,
  Cpu,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Server,
  Code,
  Palette,
  Layers,
  ArrowRight,
  Play,
  Download,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export default function HomePage() {
  const statsAnimation = useScrollAnimation({ threshold: 0.2 })
  const featuresAnimation = useScrollAnimation({ threshold: 0.1 })
  const benefitsAnimation = useScrollAnimation({ threshold: 0.1 })
  const techAnimation = useScrollAnimation({ threshold: 0.1 })
  const testimonialsAnimation = useScrollAnimation({ threshold: 0.1 })
  const pricingAnimation = useScrollAnimation({ threshold: 0.1 })
  const ctaAnimation = useScrollAnimation({ threshold: 0.1 })
  const contactAnimation = useScrollAnimation({ threshold: 0.1 })

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Real-time collaboration tools for seamless team communication and project management."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Performance",
      description: "Optimized for speed with advanced caching and CDN distribution worldwide."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and multi-factor authentication."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Accessibility",
      description: "Access your workspace from anywhere with our cloud-based platform."
    }
  ]

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Increased Productivity",
      description: "Streamline workflows and boost team efficiency by 40%"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Better Analytics",
      description: "Comprehensive insights and reporting for data-driven decisions"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Savings",
      description: "Automate repetitive tasks and save 15+ hours per week"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support and technical assistance"
    }
  ]

  const technologies = [
    { name: "React & Next.js", icon: <Code className="w-6 h-6" />, color: "from-blue-500 to-cyan-500" },
    { name: "Node.js & Express", icon: <Server className="w-6 h-6" />, color: "from-green-500 to-emerald-500" },
    { name: "MongoDB & Redis", icon: <Database className="w-6 h-6" />, color: "from-purple-500 to-pink-500" },
    { name: "AWS & Cloudflare", icon: <Cloud className="w-6 h-6" />, color: "from-orange-500 to-red-500" },
    { name: "Docker & Kubernetes", icon: <Layers className="w-6 h-6" />, color: "from-indigo-500 to-blue-500" },
    { name: "TypeScript & ESLint", icon: <Palette className="w-6 h-6" />, color: "from-teal-500 to-cyan-500" }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechCorp",
      company: "TechCorp Inc.",
      content: "Ava Workspace transformed our development process. The team collaboration features are incredible!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLab",
      content: "The analytics and reporting capabilities have given us insights we never had before.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "DevOps Engineer",
      company: "CloudScale",
      content: "Security and performance are top-notch. Our deployment process is now 3x faster.",
      rating: 5,
      avatar: "ER"
    }
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 10 team members",
        "Basic analytics",
        "Email support",
        "5GB storage",
        "Core integrations"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 50 team members",
        "Advanced analytics",
        "Priority support",
        "25GB storage",
        "All integrations",
        "Custom branding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "For large organizations",
      features: [
        "Unlimited team members",
        "Enterprise analytics",
        "24/7 phone support",
        "Unlimited storage",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee"
      ],
      popular: false
    }
  ]

  const stats = [
    { number: "10K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Organizations", icon: <Globe className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="w-6 h-6" /> },
    { number: "24/7", label: "Support", icon: <Headphones className="w-6 h-6" /> }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductOverview />
      {/* <FeaturedBundles /> */}
      
      {/* Business Intelligence Section */}
      <BusinessIntelligenceSection />
      
      {/* Dynamic Pricing Section */}
      <DynamicPricingSection />
      
      {/* Dynamic Contact Section */}
      <DynamicContactSection />
      
      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={statsAnimation.elementRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              statsAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Thousands of Teams
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the growing community of organizations that trust Ava Workspace for their business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-700 delay-${index * 100} ${
                  statsAnimation.isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={featuresAnimation.elementRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              featuresAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Ava Workspace?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for modern businesses that demand excellence, security, and performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-2 ${
                  featuresAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={benefitsAnimation.elementRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              benefitsAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Measurable Business Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See real results with our data-driven approach to business optimization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`text-center p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-700 delay-${index * 100} ${
                  benefitsAnimation.isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={techAnimation.elementRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              techAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform leverages cutting-edge technologies to deliver exceptional performance and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className={`text-center group transition-all duration-700 delay-${index * 100} ${
                  techAnimation.isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {tech.icon}
                </div>
                <p className="text-sm font-medium text-foreground">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={testimonialsAnimation.elementRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              testimonialsAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what industry leaders have to say about Ava Workspace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all duration-700 delay-${index * 200} ${
                  testimonialsAnimation.isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div 
            ref={pricingAnimation.elementRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              pricingAnimation.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your team size and business needs. No hidden fees, no surprises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-xl transition-all duration-700 delay-${index * 200} hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-purple-500' : ''
                } ${
                  pricingAnimation.isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={ctaAnimation.elementRef}
            className={`transition-all duration-1000 ${
              ctaAnimation.isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of organizations already using Ava Workspace to streamline their operations and boost productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            ref={contactAnimation.elementRef}
            className={`transition-all duration-1000 ${
              contactAnimation.isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions? Our team is here to help you get started with Ava Workspace.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                { icon: <Mail className="w-6 h-6" />, title: "Email Support", info: "support@avaworkspace.com" },
                { icon: <Phone className="w-6 h-6" />, title: "Phone Support", info: "+1 (555) 123-4567" },
                { icon: <MapPin className="w-6 h-6" />, title: "Office", info: "San Francisco, CA" }
              ].map((contact, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-700 delay-${index * 100} ${
                    contactAnimation.isVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-10 scale-95'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                    {contact.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{contact.title}</h3>
                  <p className="text-muted-foreground">{contact.info}</p>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
              Contact Sales Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
