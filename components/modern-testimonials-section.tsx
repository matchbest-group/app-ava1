"use client"

import { useState, useEffect } from "react"
import { Star, Quote, ArrowLeft, ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
  metrics: {
    label: string
    value: string
    change: string
  }
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow Solutions",
    content: "AVA One transformed our entire operation. We've seen a 150% increase in efficiency and our team productivity has never been higher. The AI automation features alone saved us 40 hours per week.",
    avatar: "/avatars/avatar.jpeg",
    rating: 5,
    metrics: {
      label: "Efficiency Increase",
      value: "150%",
      change: "+40 hrs/week saved"
    }
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Operations Director",
    company: "Global Dynamics",
    content: "The integration capabilities are phenomenal. We connected all our existing tools seamlessly and now have a unified view of our business. ROI was positive within the first month.",
    avatar: "/avatars/avatar-2.jpg",
    rating: 5,
    metrics: {
      label: "ROI Timeline",
      value: "1 Month",
      change: "Positive from day 1"
    }
  },
  {
    id: 3,
    name: "Emma Thompson",
    role: "VP of Engineering",
    company: "Innovation Labs",
    content: "The scalability is incredible. We went from 50 to 500 users without any performance issues. The AI insights help us make data-driven decisions that have increased our revenue by 300%.",
    avatar: "/avatars/somu.jpeg",
    rating: 5,
    metrics: {
      label: "Revenue Growth",
      value: "300%",
      change: "50 to 500 users"
    }
  }
]

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <div className={`transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'}`}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <div className="relative">
            <Quote className="absolute -top-6 -left-2 w-12 h-12 text-orange-200" />
            <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 leading-relaxed pl-8">
              "{testimonial.content}"
            </blockquote>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-yellow-400">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{testimonial.name}</div>
              <div className="text-gray-600">{testimonial.role} at {testimonial.company}</div>
            </div>
          </div>
        </div>

        {/* Right Content - Metrics Card */}
        <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border-2 border-blue-100 shadow-xl">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {testimonial.metrics.value}
                  </div>
                <div className="text-lg font-semibold text-gray-700 mt-2">
                  {testimonial.metrics.label}
                </div>
                <div className="text-green-600 font-medium mt-1">
                  {testimonial.metrics.change}
                </div>
              </div>
              
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">150+</div>
                  <div className="text-sm text-gray-600">Integrations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Star className="w-8 h-8 text-white fill-current" />
          </div>
          
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ModernTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center -mt-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-blue-500 fill-current" />
            <span className="text-blue-700 font-semibold">Success Stories</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Customer success stories
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-3">
            See how businesses like yours have transformed their operations and achieved remarkable results with AVA One.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="relative min-h-[500px]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center -mt-10 justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full p-0 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full p-0 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
            >
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
            <div className="flex -space-x-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-12 h-12 rounded-full overflow-hidden border-4 border-white bg-gradient-to-br from-orange-400 to-yellow-400">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                +10K
              </div>
            </div>
            
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900">Join 10,000+ happy customers</div>
              <div className="text-gray-600">Start your transformation today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
