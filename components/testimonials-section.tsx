'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO, TechStartup Inc.",
    company: "TechStartup Inc.",
    content: "This platform has transformed our business operations. The AI-driven insights have helped us increase efficiency by 40% in just 3 months.",
    rating: 5,
    avatar: "/placeholder-logo.png"
  },
  {
    name: "Michael Chen",
    position: "CTO, DataCorp Solutions",
    company: "DataCorp Solutions",
    content: "The integration capabilities are outstanding. We've streamlined all our processes and reduced manual work significantly.",
    rating: 5,
    avatar: "/placeholder-logo.png"
  },
  {
    name: "Emily Davis",
    position: "Operations Manager, GrowthCo",
    company: "GrowthCo",
    content: "Excellent customer support and powerful analytics. The ROI we've seen is impressive - definitely worth the investment.",
    rating: 5,
    avatar: "/placeholder-logo.png"
  },
  {
    name: "David Wilson",
    position: "Director of IT, InnovateTech",
    company: "InnovateTech",
    content: "The security features and compliance tools give us peace of mind. Our team loves the intuitive interface.",
    rating: 5,
    avatar: "/placeholder-logo.png"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their business with our solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="absolute top-4 right-4 text-blue-600 dark:text-blue-400">
                  <Quote className="w-8 h-8" />
                </div>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.position}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4.9/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">2,500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">99.9%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
