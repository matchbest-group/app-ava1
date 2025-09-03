"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Play, Star, Users, Zap } from "lucide-react"

const heroSlides = [
  {
    title: "Enterprise Solutions That Scale",
    subtitle: "Powerful tools for modern businesses",
    description:
      "Transform your workflow with our comprehensive suite of professional-grade applications designed for enterprise success.",
    cta: "Explore Products",
    image: "/modern-office-workspace-with-multiple-screens-show.png",
  },
  {
    title: "Bundle & Save Up to 40%",
    subtitle: "Complete productivity suites",
    description:
      "Get more value with our carefully curated product bundles. Everything you need to run your business efficiently.",
    cta: "View Bundles",
    image: "/professional-team-collaborating-with-various-softw.png",
  },
  {
    title: "Trusted by 10,000+ Companies",
    subtitle: "Industry-leading reliability",
    description:
      "Join thousands of successful businesses who trust our platform for their critical operations and growth.",
    cta: "See Case Studies",
    image: "/diverse-business-professionals-using-technology-in.png",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Star className="w-4 h-4 mr-2" />
                {currentHero.subtitle}
              </div>
              <h1 className="font-heading font-black text-4xl lg:text-6xl text-foreground leading-tight text-balance">
                {currentHero.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg text-pretty">{currentHero.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                {currentHero.cta}
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
                src={currentHero.image || "/placeholder.svg"}
                alt={currentHero.title}
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
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
