import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, Settings } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">ProductSuite</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering businesses with professional-grade software solutions. Trusted by thousands of companies
              worldwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Products</h3>
            <div className="space-y-2">
              <Link
                href="/products/analytics"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Analytics Pro
              </Link>
              <Link
                href="/products/security"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                SecureVault
              </Link>
              <Link
                href="/products/communication"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                TeamChat Pro
              </Link>
              <Link
                href="/products/compliance"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Compliance Manager
              </Link>
              <Link href="/products" className="block text-sm text-primary hover:underline">
                View All Products →
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link
                href="/documentation"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Documentation
              </Link>
              <Link href="/api" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                API Reference
              </Link>
              <Link href="/status" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                System Status
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">Get the latest product updates and industry insights.</p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" />
              <Button className="w-full" size="sm">
                Subscribe
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@productsuite.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">© 2024 ProductSuite. All rights reserved.</div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
            <Link href="/admin/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Settings className="h-3 w-3 mr-1" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
