"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCartComponent } from "@/components/shopping-cart"
import { 
  Menu, 
  X, 
  LogIn, 
  ChevronDown, 
  Workflow, 
  Globe, 
  Receipt,
  Calculator,
  Users
} from "lucide-react"
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

const productDropdownItems = [
  {
    name: "AVA CX",
    description: "Customer Experience Platform",
    href: "/products/ava-cx",
    icon: Users,
    color: "text-green-500"
  },
  {
    name: "AVA Pingora",
    description: "Global Communication Platform", 
    href: "/products/ava-pingora",
    icon: Globe,
    color: "text-pink-500"
  },
  {
    name: "AVA Flow",
    description: "Workflow Automation Suite",
    href: "/products/ava-flow", 
    icon: Workflow,
    color: "text-blue-600"
  },
  {
    name: "AVA SmartBill",
    description: "Intelligent Billing System",
    href: "/products/ava-smartbill",
    icon: Receipt,
    color: "text-orange-500"
  }
]

export function Header() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contacts" }, 
    { name: "Custom Bundle", href: "/custom-bundle" },
    { name: "Workspace", href: "/workspace/login" },
  ]

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-slate-200/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/logo.png"
                alt="AVA Suite Logo"
                className="h-10 md:h-12 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            
            {/* Home */}
            <Link
              href="/"
              className={`relative text-sm font-semibold transition-all duration-300 hover:text-primary group ${
                pathname === "/" ? "text-primary" : "text-slate-700"
              }`}
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsProductDropdownOpen(true)}
                onMouseLeave={() => setIsProductDropdownOpen(false)}
                className="flex items-center space-x-1 text-sm font-semibold text-slate-700 hover:text-primary transition-all duration-300 group"
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                  isProductDropdownOpen ? 'rotate-180' : ''
                }`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </button>

              <AnimatePresence>
                {isProductDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsProductDropdownOpen(true)}
                    onMouseLeave={() => setIsProductDropdownOpen(false)}
                    className="absolute top-full left-0 w-80 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-6 z-50"
                  >
                    <div className="space-y-4">
                      {/* Main Products Link */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <Link
                          href="/products"
                          className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300 border-b border-slate-100"
                          onClick={() => setIsProductDropdownOpen(false)}
                        >
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                            <Calculator className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                              All Products
                            </h3>
                            <p className="text-sm text-slate-600 mt-1">
                              Explore our complete suite
                            </p>
                          </div>
                        </Link>
                      </motion.div>

                      {/* Individual Product Links */}
                      {productDropdownItems.map((product, index) => (
                        <motion.div
                          key={product.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + 1) * 0.1 }}
                        >
                          <Link
                            href={product.href}
                            className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-slate-50/50 transition-all duration-300"
                            onClick={() => setIsProductDropdownOpen(false)}
                          >
                            <div className="p-2 rounded-lg bg-slate-100 group-hover:scale-110 transition-transform duration-300">
                              <product.icon className={`w-5 h-5 ${product.color}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-sm text-slate-600 mt-1">
                                {product.description}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="border-t border-slate-200/50 mt-4 pt-4">
                      <Link
                        href="/bundles"
                        className="flex items-center justify-between w-full p-3 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300 group"
                      >
                        <div className="flex items-center space-x-3">
                          <Calculator className="w-5 h-5 text-primary" />
                          <div>
                            <h3 className="font-semibold text-slate-900">Custom Bundle Builder</h3>
                            <p className="text-sm text-slate-600">Create your perfect solution</p>
                          </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-primary rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Nav Links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-semibold transition-all duration-300 hover:text-primary group ${
                  pathname === link.href ? "text-primary" : "text-slate-700"
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Shopping Cart */}
            <ShoppingCartComponent
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />

            {/* Login Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center space-x-2 bg-transparent border-slate-300 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="space-y-4">
                
                {/* Home */}
                <Link
                  href="/"
                  className="block py-2 text-slate-700 hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>

                {/* Products */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 py-2">Products</h3>
                  <div className="pl-4 space-y-2">
                    {productDropdownItems.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="flex items-center space-x-3 py-2 text-slate-700 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <product.icon className={`w-4 h-4 ${product.color}`} />
                        <span>{product.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Links */}
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-slate-700 hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Login */}
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent border-slate-300 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
