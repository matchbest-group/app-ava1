'use client'

import { Header } from "@/components/header"
import { ModernHeroSection } from "@/components/modern-hero-section"
import { ModernStatsSection } from "@/components/modern-stats-section"
import { ModernFeaturesSection } from "@/components/modern-features-section"
import { ModernTestimonialsSection } from "@/components/modern-testimonials-section"
import { ModernPricingSection } from "@/components/modern-pricing-section"
import { Footer } from "@/components/footer"
import { useState, useEffect, useRef } from 'react'

// Custom hook for scroll-triggered animations
function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold, rootMargin: '0px 0px -100px 0px' }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold])

  return { elementRef, isVisible }
}

export default function HomePage() {
  // Animation refs for each section
  const heroAnimation = useScrollAnimation(0.1)
  const statsAnimation = useScrollAnimation(0.1)
  const featuresAnimation = useScrollAnimation(0.1)
  const testimonialsAnimation = useScrollAnimation(0.1)
  const pricingAnimation = useScrollAnimation(0.1)

  useEffect(() => {
    // Smooth scroll setup
    document.documentElement.style.scrollBehavior = 'smooth'

    // Add CSS for smooth scrolling and modern animations
    const style = document.createElement('style')
    style.textContent = `
      * {
        scroll-behavior: smooth;
      }
      
      html {
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      body {
        scroll-behavior: smooth;
        overscroll-behavior: none;
      }
      
      /* Enhanced scroll animations */
      .scroll-animate {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateY(20px);
        opacity: 0;
      }
      
      .scroll-animate.visible {
        transform: translateY(0);
        opacity: 1;
      }
      
      .scroll-animate-delayed {
        transition-delay: 0.2s;
      }
      
      .scroll-animate-delayed-more {
        transition-delay: 0.4s;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Header />

      {/* Modern Hero Section */}
      <section
        ref={heroAnimation.elementRef}
        className={`scroll-animate ${
          heroAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <ModernHeroSection />
      </section>

      {/* Stats Section */}
      <section
        ref={statsAnimation.elementRef}
        className={`scroll-animate ${
          statsAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <ModernStatsSection />
      </section>

      {/* Features Section */}
      <section
        ref={featuresAnimation.elementRef}
        className={`scroll-animate ${
          featuresAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <ModernFeaturesSection />
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsAnimation.elementRef}
        className={`scroll-animate ${
          testimonialsAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <ModernTestimonialsSection />
      </section>

      {/* Pricing Section */}
      <section
        ref={pricingAnimation.elementRef}
        className={`scroll-animate ${
          pricingAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <ModernPricingSection />
      </section>

      <Footer />
    </main>
  )
}
