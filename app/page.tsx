'use client'

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductOverview } from "@/components/product-overview"
import { FeaturedBundles } from "@/components/featured-bundles"
import { DynamicPricingSection } from "@/components/dynamic-pricing-section"
import { DynamicContactSection } from "@/components/dynamic-contact-section"
import { Footer } from "@/components/footer"
import { FAQs } from "@/components/FAQs"
import { GetInTouch } from "@/components/getintouch"
import { Blogs } from "@/components/blogs"
import { PromotionalBanner } from "@/components/promotional-banner"
import { TestimonialsSection } from "@/components/testimonials-section"
import { EventsNewsSection } from "@/components/events-news-section"
import { CTADemoSection } from "@/components/cta-demo-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Promotional Banner */}
      <PromotionalBanner />
      
      <HeroSection />
      
      <ProductOverview />
      <FeaturedBundles />
      
      {/* Customer Testimonials */}
      <TestimonialsSection />
      
      {/* Events and News */}
      <EventsNewsSection />
      
      {/* Final CTA and Demo */}
      <CTADemoSection />
      
      <GetInTouch />
      
      {/* Dynamic Contact Section */}
      <DynamicContactSection />
      
      <Blogs />
      
      <FAQs />

      <Footer />
    </main>
  )
}
