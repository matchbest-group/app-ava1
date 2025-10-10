import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
