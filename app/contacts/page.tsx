import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GetInTouch} from "@/components/getintouch"

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <GetInTouch />
      <Footer />
    </main>
  )
}
