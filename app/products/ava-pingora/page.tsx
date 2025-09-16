import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  MessageSquare, 
  Video, 
  Shield, 
  Zap, 
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Phone,
  Mail,
  Smartphone
} from "lucide-react"
import { motion } from "framer-motion"

export default function AvaPingoraPage() {
  const features = [
    {
      icon: Globe,
      title: "Global Connectivity",
      description: "Connect teams across continents with ultra-low latency communication infrastructure worldwide."
    },
    {
      icon: MessageSquare,
      title: "Unified Messaging",
      description: "Seamless chat, voice, and video communication in one integrated platform with real-time sync."
    },
    {
      icon: Video,
      title: "HD Video Conferencing",
      description: "Crystal-clear video calls with screen sharing, recording, and collaboration tools for teams of any size."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption, advanced security protocols, and compliance with global data protection standards."
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Optimized network protocols ensuring instant message delivery and lag-free communication."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Advanced collaboration features including file sharing, whiteboarding, and project management integration."
    }
  ]

  const stats = [
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "150+", label: "Countries Served" },
    { value: "<50ms", label: "Average Latency" },
    { value: "10M+", label: "Active Users" }
  ]

  const benefits = [
    "Reduce communication costs by 60%",
    "Improve team productivity by 45%",
    "Enable 24/7 global collaboration",
    "Integrate with 500+ business tools",
    "Scale from 2 to 10,000+ users instantly",
    "Ensure 99.9% communication uptime"
  ]

  const testimonials = [
    {
      name: "Elena Rodriguez",
      company: "GlobalTech Solutions", 
      role: "CTO",
      content: "AVA Pingora has revolutionized how our distributed team communicates. The quality is exceptional and the global reach is unmatched.",
      rating: 5
    },
    {
      name: "David Kim",
      company: "International Consulting Group",
      role: "VP Operations", 
      content: "We've been able to reduce our communication costs significantly while improving collaboration across our 30+ offices worldwide.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
              <Badge className="mb-6 bg-green-100 text-green-700 border-green-200">
                <Globe className="w-4 h-4 mr-2" />
                Global Communication Platform
              </Badge>
              
              <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Connect Your World with
                <span className="text-green-600 block mt-2">AVA Pingora</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Break down communication barriers with our global communication platform. 
                Enable seamless collaboration across time zones, languages, and continents.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  Schedule Demo
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
                src="/modern-team-chat-interface-with-video-calls-and-fi.png"
                alt="AVA Pingora Interface"
                className="rounded-2xl shadow-2xl border border-slate-200"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">Global Network Active</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Communication Without Boundaries
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From instant messaging to enterprise video conferencing, 
              AVA Pingora delivers seamless communication experiences globally.
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
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-green-600" />
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

      {/* Communication Channels Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              All Communication Channels Unified
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              One platform for all your communication needs - from quick messages to enterprise-wide announcements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Instant Messaging</h3>
              <p className="text-slate-600 leading-relaxed">
                Real-time chat with rich media support, emoji reactions, and threaded conversations 
                to keep your team connected and engaged.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Video Conferencing</h3>
              <p className="text-slate-600 leading-relaxed">
                HD video calls with up to 1000 participants, screen sharing, recording, 
                and virtual backgrounds for professional meetings.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Voice Calls</h3>
              <p className="text-slate-600 leading-relaxed">
                Crystal-clear voice communication with international calling, 
                voicemail transcription, and call recording capabilities.
              </p>
            </motion.div>
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
                Transform Global Team Collaboration
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Companies using AVA Pingora report significant improvements in team productivity, 
                communication efficiency, and global collaboration effectiveness.
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
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-slate-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Global Reach</h3>
                  <p className="text-slate-600">Connect teams across all continents</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">North America</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Europe</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Asia-Pacific</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Latin America</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Middle East & Africa</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
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
              Trusted by Global Teams
            </h2>
            <p className="text-xl text-slate-600">
              See how organizations worldwide are transforming their communication
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
                      <div className="text-green-600 font-medium">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Connect Your Global Team?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join millions of users worldwide who trust AVA Pingora for their communication needs. 
              Start connecting better today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-slate-50">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
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
