"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useVoiceBot } from "@/components/voice-bot-context"
import { 
  Menu, 
  X, 
  LogIn, 
  ChevronDown, 
  Workflow, 
  Globe, 
  Receipt,
  // Calculator,
  Users,
  Bot,
  Phone
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"


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

interface HeaderProps {
  // No props needed - using global context
}

export function Header({}: HeaderProps = {}) {
  // Use global voice bot context
  const { 
    isVoiceBotOpen: isVoiceBotActive, 
    isCallingAgent, 
    showInstruction, 
    handleTalkToAVA 
  } = useVoiceBot()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Check if we're on pricing page for white header styling
  const isPricingPage = pathname === '/pricing'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contacts" },
    // { name: "Custom Bundle", href: "/custom-bundle" },
  ]

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isPricingPage
          ? isScrolled 
            ? 'bg-white/10 backdrop-blur-xl border-b border-white/20'
            : 'bg-transparent'
          : isScrolled 
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
                pathname === "/" 
                  ? "text-primary" 
                  : isPricingPage 
                    ? "text-white" 
                    : "text-slate-700"
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
                className={`flex items-center space-x-1 text-sm font-semibold transition-all duration-300 group ${
                  isPricingPage 
                    ? "text-white hover:text-blue-200" 
                    : "text-slate-700 hover:text-primary"
                }`}
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
                            <Users className="w-5 h-5 text-primary" />
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
                    
                    {/* Custom Bundle Builder - Commented Out */}
                    {/*
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
                    */}
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
                  pathname === link.href 
                    ? isPricingPage 
                      ? "text-white" 
                      : "text-primary"
                    : isPricingPage 
                      ? "text-white" 
                      : "text-slate-700"
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  pathname === link.href
                    ? isPricingPage
                      ? "w-full bg-white"
                      : "w-full bg-primary"
                    : "w-0 bg-primary group-hover:w-full"
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Talk to AVA Button with Instruction */}
            {(
              <div className="relative">
                <Button
                  onClick={() => {
                    console.log('Talk to AVA button clicked!', { handleTalkToAVA: !!handleTalkToAVA })
                    handleTalkToAVA()
                  }}
                  variant="outline"
                  size="sm"
                  className={`flex items-center space-x-2 bg-transparent transition-all duration-300 relative overflow-hidden group ${
                    isCallingAgent
                      ? "border-green-500 text-green-600 animate-pulse"
                      : isPricingPage
                      ? "border-white/30 text-white hover:text-white hover:border-white"
                      : "border-slate-300 hover:text-white hover:border-primary"
                  }`}
                  disabled={isCallingAgent}
                >
                  {/* Loading fill animation */}
                  <div className={`absolute inset-0 bg-gradient-to-r transition-transform duration-500 ease-out ${
                    isCallingAgent
                      ? "from-green-500 to-emerald-600 translate-x-0"
                      : "from-primary to-purple-600 transform -translate-x-full group-hover:translate-x-0"
                  }`}></div>
                  
                  {/* Button content */}
                  <div className="relative z-10 flex items-center space-x-2">
                    {isCallingAgent ? (
                      <>
                        <Phone className="w-4 h-4 transition-transform duration-300 animate-bounce" />
                        <span className="font-medium">Calling Agent...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-medium">Talk to AVA</span>
                      </>
                    )}
                  </div>
                </Button>
                
                {/* Instruction Tooltip */}
                {showInstruction && !isVoiceBotActive && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl text-white text-xs rounded-lg p-3 shadow-lg border border-gray-700/50 z-50">
                    <div className="flex items-start space-x-2">
                      <Bot className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-blue-400">Quick Start:</p>
                        <p className="text-gray-300 mt-1">
                          • Click "Talk to AVA" or<br/>
                          • Say "Hi AVA" anywhere
                        </p>
                      </div>
                    </div>
                    {/* Arrow pointer */}
                    <div className="absolute -top-1 right-6 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700/50"></div>
                  </div>
                )}
              </div>
            )}
            
            {/* Workspace Button */}
            <Link href="/workspace/login">
              <Button
                variant="outline"
                size="sm"
                className={`hidden md:flex items-center space-x-2 bg-transparent transition-all duration-300 relative overflow-hidden group ${
                  isPricingPage
                    ? "border-white/30 text-white hover:text-white hover:border-white"
                    : "border-slate-300 hover:text-white hover:border-primary"
                }`}
              >
                {/* Loading fill animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center space-x-2">
                  <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">Workspace</span>
                </div>
              </Button>
            </Link>

            {/* Mobile Talk to AVA Button */}
            {(
              <Button
                onClick={() => {
                  console.log('Mobile Talk to AVA button clicked!')
                  handleTalkToAVA()
                }}
                variant="outline"
                size="sm"
                className={`md:hidden flex items-center space-x-2 bg-transparent transition-all duration-300 relative overflow-hidden group ${
                  isCallingAgent
                    ? "border-green-500 text-green-600 animate-pulse"
                    : isPricingPage
                    ? "border-white/30 text-white hover:text-white hover:border-white"
                    : "border-slate-300 hover:text-white hover:border-primary"
                }`}
                disabled={isCallingAgent}
              >
                {/* Loading fill animation */}
                <div className={`absolute inset-0 bg-gradient-to-r transition-transform duration-500 ease-out ${
                  isCallingAgent
                    ? "from-green-500 to-emerald-600 translate-x-0"
                    : "from-primary to-purple-600 transform -translate-x-full group-hover:translate-x-0"
                }`}></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center space-x-1">
                  {isCallingAgent ? (
                    <>
                      <Phone className="w-4 h-4 transition-transform duration-300 animate-bounce" />
                      <span className="font-medium text-xs">Calling...</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium text-xs">AVA</span>
                    </>
                  )}
                </div>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden p-2 ${
                isPricingPage ? "text-white hover:text-blue-200" : ""
              }`}
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

                {/* Mobile Workspace */}
                <Link href="/workspace/login" className="block">
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent border-slate-300 hover:text-white hover:border-primary transition-all duration-300 relative overflow-hidden group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {/* Loading fill animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                    
                    {/* Button content */}
                    <div className="relative z-10 flex items-center justify-center space-x-2">
                      <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-medium">Workspace</span>
                    </div>
                  </Button>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
