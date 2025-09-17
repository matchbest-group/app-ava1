import { Header } from "@/components/header"
import { NewPricingPage } from "@/components/new-pricing-page"
import { Footer } from "@/components/footer"

export default function Pricing() {
  return (
    <main className="min-h-screen">
      <Header />
      <NewPricingPage />
      <Footer />
    </main>
  )
}
