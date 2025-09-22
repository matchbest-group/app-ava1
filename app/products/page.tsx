import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SimpleProductCatalog } from "@/components/simple-product-catalog"
// import { FeaturedBundles } from "@/components/featured-bundles"
import { FAQs } from "@/components/FAQs"
import { Blogs } from "@/components/blogs"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SimpleProductCatalog />
      {/* <FeaturedBundles /> */}
      <FAQs />
      <Blogs />
      <Footer />
    </main>
  )
}