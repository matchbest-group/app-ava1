import { Header } from "@/components/header"
import { PricingPage } from "@/components/pricing-page"
import { Footer } from "@/components/footer"

export default function Pricing() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <PricingPage />
      <Footer />
    </main>
  )
}
