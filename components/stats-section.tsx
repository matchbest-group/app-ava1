'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Award, 
  Clock, 
  Shield,
  Zap,
  Target,
  DollarSign,
  BarChart3
} from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "500K+",
    label: "Active Users",
    description: "Trusted by professionals worldwide",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20"
  },
  {
    icon: Globe,
    value: "150+",
    label: "Countries",
    description: "Global presence and support",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/20"
  },
  {
    icon: TrendingUp,
    value: "99.9%",
    label: "Uptime",
    description: "Reliable and always available",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/20"
  },
  {
    icon: Award,
    value: "50+",
    label: "Awards",
    description: "Industry recognition and excellence",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Support",
    description: "Round-the-clock assistance",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/20"
  },
  {
    icon: Shield,
    value: "100%",
    label: "Secure",
    description: "Enterprise-grade security",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/20"
  }
]

const achievements = [
  {
    year: "2024",
    title: "Market Leader",
    description: "Recognized as the leading business automation platform"
  },
  {
    year: "2023",
    title: "Innovation Award",
    description: "Best AI-Driven Business Intelligence Solution"
  },
  {
    year: "2022",
    title: "Customer Choice",
    description: "Highest customer satisfaction in the industry"
  }
]

export function StatsSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Main Stats */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <BarChart3 className="w-4 h-4 mr-2" />
            Our Impact
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Numbers That Speak For Themselves
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover why thousands of businesses trust us to power their growth and success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {stat.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {stat.description}
                    </p>
                  </div>

                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent dark:from-blue-900/20 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* ROI Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white mb-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Average ROI Our Clients Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="space-y-2">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <div className="text-4xl font-bold">300%</div>
                <div className="text-blue-100">Return on Investment</div>
              </div>
              <div className="space-y-2">
                <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <div className="text-4xl font-bold">60%</div>
                <div className="text-blue-100">Time Savings</div>
              </div>
              <div className="space-y-2">
                <Target className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <div className="text-4xl font-bold">85%</div>
                <div className="text-blue-100">Efficiency Improvement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Timeline */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Recent Achievements
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border-0 shadow-lg">
              <CardContent className="p-0">
                <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200">
                  {achievement.year}
                </Badge>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
