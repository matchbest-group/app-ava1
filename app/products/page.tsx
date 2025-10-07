import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SimpleProductCatalog } from "@/components/simple-product-catalog"
// import { FeaturedBundles } from "@/components/featured-bundles"
import { FAQs } from "@/components/FAQs"
import { Blogs } from "@/components/blogs"

export const metadata: Metadata = {
  title: "Products - Enterprise AI Solutions",
  description: "Explore Avaone Suite's comprehensive product portfolio: AVA CX for customer experience, AVA Pingora for global communication, AVA Flow for workflow automation, and AVA SmartBill for intelligent billing.",
  keywords: [
    "enterprise products",
    "AI solutions",
    "customer experience platform",
    "communication platform", 
    "workflow automation",
    "billing system",
    "business software",
    "SaaS products"
  ],
  openGraph: {
    title: "Products - Enterprise AI Solutions | Avaone Suite",
    description: "Explore our comprehensive product portfolio including AVA CX, AVA Pingora, AVA Flow, and AVA SmartBill for complete enterprise solutions.",
    url: "https://avaone.com/products",
    images: [
      {
        url: "/products-og-image.png",
        width: 1200,
        height: 630,
        alt: "Avaone Suite Products",
      },
    ],
  },
  twitter: {
    title: "Products - Enterprise AI Solutions | Avaone Suite",
    description: "Explore our comprehensive product portfolio for complete enterprise solutions.",
  },
}

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