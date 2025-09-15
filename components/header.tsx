"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCartComponent } from "@/components/shopping-cart"
import { PromotionalBanner } from "@/components/promotional-banner"
import { Menu, X, LogIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const mockCartItems = [
  {
    id: 1,
    name: "Analytics Pro",
    description: "Real-time business intelligence dashboard",
    price: 49,
    quantity: 1,
    billingCycle: "monthly" as const,
    image: "/images/dashboard-1.png",
  },
  {
    id: 2,
    name: "SecureVault",
    description: "Advanced data encryption and storage",
    price: 39,
    quantity: 2,
    billingCycle: "monthly" as const,
    image: "/cybersecurity-dashboard-with-encryption-and-protec.png",
  },
]

export function Header() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((items) =>
      quantity === 0
        ? items.filter((item) => item.id !== id)
        : items.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const handleCheckout = () => {
    window.location.href = "/checkout"
  }

  const navLinks = [
    { name: "AVA CX", href: "/services/ava-cx" },
    { name: "AVA Flow", href: "/services/ava-flow" },
    { name: "AVA Pingora", href: "/services/ava-pingora" },
    { name: "AVA SmartBill", href: "/services/ava-smartbill" },
    { name: "Pricing", href: "/services/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      {/* Top Promo Banner */}
      <PromotionalBanner />

      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="AvaOne Logo"
                className="h-8 md:h-10 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ShoppingCartComponent
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
              />
              <Button asChild className="space-x-2">
                <Link href="/signin">
                  <LogIn className="h-4 w-4" />
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center md:hidden space-x-3">
              <ShoppingCartComponent
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
              />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Open mobile menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sliding Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white shadow-lg z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <img
                  src="/logo.png"
                  alt="AvaOne Logo"
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 flex flex-col p-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-gray-100 text-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Sign In Button (Mobile same as Desktop) */}
                <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full flex items-center justify-center space-x-2 mt-4">
                    <LogIn className="h-4 w-4" />
                    <span>Get Started</span>
                  </Button>
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
