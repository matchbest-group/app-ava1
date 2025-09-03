import { Header } from "@/components/header"
import { BundleConfiguration } from "@/components/bundle-configuration"
import { Footer } from "@/components/footer"

export default function BundlesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BundleConfiguration />
      <Footer />
    </main>
  )
}
