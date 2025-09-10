"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Play, Star, Users, Zap } from "lucide-react"

interface HeroContent {
  title: string
  subtitle: string
  backgroundImage: string
  ctaText: string
}

export function HeroSection() {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Welcome to AVA One",
    subtitle: "Empowering businesses with cutting-edge solutions",
    backgroundImage: "/modern-office-workspace-with-multiple-screens-show.png",
    ctaText: "Get Started"
  })

  const [currentSlide, setCurrentSlide] = useState(0)

  // Load content from API
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/website-content')
        if (response.ok) {
          const data = await response.json()
          setHeroContent(data.hero)
        }
      } catch (error) {
        console.error('Failed to load hero content:', error)
      }
    }
    loadContent()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                New Platform
              </div>
              <h1 className="font-heading font-black text-4xl lg:text-6xl text-foreground leading-tight text-balance">
                {heroContent.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg text-pretty">{heroContent.subtitle}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                {heroContent.ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group bg-transparent">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="font-heading font-bold text-2xl text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-2xl text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-2xl text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-2xl">
              <img
                src={heroContent.backgroundImage || "/placeholder.svg"}
                alt={heroContent.title}
                className="w-full h-[400px] object-cover transition-all duration-500"
              />
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg animate-bounce">
              <Zap className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground p-3 rounded-full shadow-lg animate-pulse">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {[0, 1, 2].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-primary" : "bg-muted-foreground/30"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
