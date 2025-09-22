'use client'

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductOverview } from "@/components/product-overview"
// import { FeaturedBundles } from "@/components/featured-bundles"
import { DynamicContactSection } from "@/components/dynamic-contact-section"
import { Footer } from "@/components/footer"
import { FAQs } from "@/components/FAQs"
import { GetInTouch } from "@/components/getintouch"
import { Blogs } from "@/components/blogs"
import { PromotionalBanner } from "@/components/promotional-banner"
import { EventsNewsSection } from "@/components/events-news-section"
import { FuturisticBackground } from "@/components/futuristic-background"
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
  const productAnimation = useScrollAnimation(0.1)
  const bundlesAnimation = useScrollAnimation(0.1)
  const eventsAnimation = useScrollAnimation(0.1)
  const contactAnimation = useScrollAnimation(0.1)
  const dynamicContactAnimation = useScrollAnimation(0.1)
  const blogsAnimation = useScrollAnimation(0.1)
  const faqAnimation = useScrollAnimation(0.1)

  useEffect(() => {
    // Smooth scroll setup
    document.documentElement.style.scrollBehavior = 'smooth'

    // Add CSS for smooth scrolling
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
      
      /* Smooth scrolling for all browsers */
      @supports (scroll-behavior: smooth) {
        html, body {
          scroll-behavior: smooth;
        }
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
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Futuristic Animated Background */}
      <FuturisticBackground />
      
      <Header />

      {/* Hero Section */}
      <section
        ref={heroAnimation.elementRef}
        className={`scroll-animate ${
          heroAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <HeroSection />
      </section>

      {/* Product Overview */}
      <section
        ref={productAnimation.elementRef}
        className={`scroll-animate ${
          productAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <ProductOverview />
      </section>

      {/* Featured Bundles */}
      <section
        ref={bundlesAnimation.elementRef}
        className={`scroll-animate ${
          bundlesAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        {/* <FeaturedBundles /> */}
      </section>

      {/* Events & News */}
      <section
        ref={eventsAnimation.elementRef}
        className={`scroll-animate ${
          eventsAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <EventsNewsSection />
      </section>

      {/* Get In Touch */}
      <section
        ref={contactAnimation.elementRef}
        className={`scroll-animate ${
          contactAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <GetInTouch />
      </section>

      {/* Dynamic Contact Section */}
      <section
        ref={dynamicContactAnimation.elementRef}
        className={`scroll-animate scroll-animate-delayed ${
          dynamicContactAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <DynamicContactSection />
      </section>

      {/* Blogs Section */}
      <section
        ref={blogsAnimation.elementRef}
        className={`scroll-animate scroll-animate-delayed-more ${
          blogsAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <Blogs />
      </section>

      {/* FAQ Section */}
      <section
        ref={faqAnimation.elementRef}
        className={`scroll-animate ${
          faqAnimation.isVisible ? 'visible' : ''
        } relative z-10`}
      >
        <FAQs />
      </section>

      <Footer />
    </main>
  )
}
