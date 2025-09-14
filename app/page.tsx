'use client'

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductOverview } from "@/components/product-overview"
import { FeaturedBundles } from "@/components/featured-bundles"
// import { BusinessIntelligenceSection } from "@/components/business-intelligence-section"
// import { DynamicPricingSection } from "@/components/dynamic-pricing-section"
// import { DynamicContactSection } from "@/components/dynamic-contact-section"
import { Footer } from "@/components/footer"
import { FAQs } from "@/components/FAQs"
import { GetInTouch } from "@/components/getintouch"
import { Blogs } from "@/components/blogs"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductOverview />
      <FeaturedBundles />
      <FAQs />
      <GetInTouch />
      <Blogs />

      {/* Business Intelligence Section */}
      {/* <BusinessIntelligenceSection /> */}

      {/* Dynamic Pricing Section */}
      {/* <DynamicPricingSection /> */}

      {/* Dynamic Contact Section */}
      {/* <DynamicContactSection /> */}

      <Footer />
    </main>
  )
}
