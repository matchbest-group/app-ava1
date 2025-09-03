import { Header } from "@/components/header"
import { ProductCatalog } from "@/components/product-catalog"
import { Footer } from "@/components/footer"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProductCatalog />
      <Footer />
    </main>
  )
}
