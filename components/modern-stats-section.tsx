"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowUpRight, Users, Building, Trophy, TrendingUp } from "lucide-react"

interface CounterProps {
  end: number
  duration: number
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ end, duration, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (startTime === undefined) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(end * easeOutCubic))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isVisible])

  return (
    <div ref={ref} className="text-4xl lg:text-6xl font-bold">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  )
}

export function ModernStatsSection() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 -mb-5 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 -mt-10 mb-5 py-3">
            <Trophy className="w-5 h-5 text-blue-500" />
            <span className="text-blue-700 font-semibold">Our Impact</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by businesses worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From startups to Fortune 500 companies, organizations rely on AVA One to streamline their operations and drive growth.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stat 1 */}
          <div className="group relative">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <AnimatedCounter end={60000} duration={2000} suffix="+" />
              <div className="text-blue-600 font-semibold mt-2">Active Users</div>
              <div className="text-blue-500 text-sm mt-1">Across 50+ countries</div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="group relative">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <AnimatedCounter end={45} duration={2000} suffix="+" />
              <div className="text-green-600 font-semibold mt-2">Enterprise Clients</div>
              <div className="text-green-500 text-sm mt-1">Fortune 500 companies</div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="group relative">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <AnimatedCounter end={1000} duration={2000} suffix="%" />
              <div className="text-purple-600 font-semibold mt-2">ROI Increase</div>
              <div className="text-purple-500 text-sm mt-1">Average client improvement</div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="group relative">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-indigo-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <AnimatedCounter end={46000} duration={2000} />
              <div className="text-indigo-600 font-semibold mt-2">Hours Saved</div>
              <div className="text-indigo-500 text-sm mt-1">Through automation</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">$2.4M+</div>
              <div className="text-sm text-gray-600">Cost Savings</div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">150+</div>
              <div className="text-sm text-gray-600">Integrations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
