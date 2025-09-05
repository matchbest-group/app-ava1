"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCartComponent } from "@/components/shopping-cart"
import { PromotionalBanner } from "@/components/promotional-banner"
import { Menu, X, User, Briefcase, Building2 } from "lucide-react"

// Mock cart data - in a real app this would come from state management
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState(mockCartItems)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((items) => items.filter((item) => item.id !== id))
    } else {
      setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const handleCheckout = () => {
    // Navigate to checkout
    window.location.href = "/checkout"
  }

  return (
    <>
      {/* Promotional Banner */}
      <PromotionalBanner />
      
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">AvaOne Suit</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className={`transition-colors ${
                isActive("/products") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Products
            </Link>
            <Link
              href="/bundles"
              className={`transition-colors ${
                isActive("/bundles") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Bundles
            </Link>
            <Link
              href="/pricing"
              className={`transition-colors ${
                isActive("/pricing") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/enterprise"
              className={`transition-colors ${
                isActive("/enterprise") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Enterprise
            </Link>
            <Link
              href="/support"
              className={`transition-colors ${
                isActive("/support") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Support
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ShoppingCartComponent
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
            <Link href="/organization/login">
              <Button variant="ghost" size="sm">
                <Building2 className="h-4 w-4 mr-2" />
                Organization
              </Button>
            </Link>
            <Link href="/workspace/login">
              <Button variant="ghost" size="sm">
                <Briefcase className="h-4 w-4 mr-2" />
                Workspace
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ShoppingCartComponent
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              <Link
                href="/products"
                className={`block px-3 py-2 transition-colors ${
                  isActive("/products") ? "text-primary font-medium" : "text-foreground hover:text-primary"
                }`}
              >
                Products
              </Link>
              <Link
                href="/bundles"
                className={`block px-3 py-2 transition-colors ${
                  isActive("/bundles") ? "text-primary font-medium" : "text-foreground hover:text-primary"
                }`}
              >
                Bundles
              </Link>
              <Link
                href="/pricing"
                className={`block px-3 py-2 transition-colors ${
                  isActive("/pricing") ? "text-primary font-medium" : "text-foreground hover:text-primary"
                }`}
              >
                Pricing
              </Link>
              <Link
                href="/enterprise"
                className={`block px-3 py-2 transition-colors ${
                  isActive("/enterprise") ? "text-primary font-medium" : "text-foreground hover:text-primary"
                }`}
              >
                Enterprise
              </Link>
              <Link
                href="/support"
                className={`block px-3 py-2 transition-colors ${
                  isActive("/support") ? "text-primary font-medium" : "text-foreground hover:text-primary"
                }`}
              >
                Support
              </Link>
              <Link
                href="/workspace/login"
                className="block px-3 py-2 transition-colors text-foreground hover:text-primary"
              >
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Workspace
                </div>
              </Link>
              <div className="flex items-center space-x-2 px-3 py-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  Sign In
                </Button>
                <Button size="sm" className="flex-1">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  )
}
