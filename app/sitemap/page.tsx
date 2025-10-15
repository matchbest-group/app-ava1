import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Package, 
  DollarSign, 
  Phone, 
  Users, 
  Settings, 
  BarChart3, 
  Shield,
  Globe,
  Workflow,
  Receipt,
  Bot,
  Building2,
  UserCheck,
  FileText,
  Heart
} from "lucide-react"

export const metadata: Metadata = {
  title: "Sitemap - All Pages",
  description: "Complete sitemap of Avaone Suite website showing all available pages, products, services, and features.",
  robots: {
    index: true,
    follow: true,
  },
}

const sitemapSections = [
  {
    title: "🏠 Main Pages",
    icon: Home,
    color: "bg-blue-100 text-blue-800",
    pages: [
      { name: "Homepage", url: "/", description: "Main landing page with overview of all services" },
      { name: "About Us", url: "/about", description: "Company information and mission" },
      { name: "Contact", url: "/contacts", description: "Get in touch with our team" },
    ]
  },
  {
    title: "📦 Products",
    icon: Package,
    color: "bg-green-100 text-green-800",
    pages: [
      { name: "All Products", url: "/products", description: "Complete product catalog and overview" },
      { name: "AVA CX", url: "/products/ava-cx", description: "Customer Experience Platform" },
      { name: "AVA Pingora", url: "/products/ava-pingora", description: "Global Communication Platform" },
      { name: "AVA Flow", url: "/products/ava-flow", description: "Workflow Automation Suite" },
      { name: "AVA SmartBill", url: "/products/ava-smartbill", description: "Intelligent Billing System" },
      { name: "AVA HumanTL", url: "/products/ava-humantl", description: "Human Resources Platform" },
    ]
  },
  {
    title: "⚙️ Services",
    icon: Settings,
    color: "bg-purple-100 text-purple-800",
    pages: [
      { name: "AVA CX Service", url: "/services/ava-cx", description: "Customer Experience Service Details" },
      { name: "AVA Pingora Service", url: "/services/ava-pingora", description: "Communication Service Details" },
      { name: "AVA Flow Service", url: "/services/ava-flow", description: "Workflow Automation Service" },
      { name: "AVA SmartBill Service", url: "/services/ava-smartbill", description: "Billing Service Details" },
      { name: "Service Pricing", url: "/services/pricing", description: "Service-specific pricing plans" },
    ]
  },
  {
    title: "💰 Pricing & Sales",
    icon: DollarSign,
    color: "bg-yellow-100 text-yellow-800",
    pages: [
      { name: "Pricing Plans", url: "/pricing", description: "All pricing tiers and features" },
      { name: "Product Bundles", url: "/bundles", description: "Bundled product packages" },
      { name: "Custom Bundle", url: "/custom-bundle", description: "Create your own product bundle" },
      { name: "Checkout", url: "/checkout", description: "Purchase and payment processing" },
    ]
  },
  {
    title: "🔐 Authentication",
    icon: Shield,
    color: "bg-red-100 text-red-800",
    pages: [
      { name: "Workspace Login", url: "/workspace/login", description: "Employee workspace access" },
      { name: "Organization Login", url: "/organization/login", description: "Organization admin access" },
      { name: "Admin Login", url: "/admin/login", description: "System administrator access" },
    ]
  },
  {
    title: "💼 Workspace Dashboard",
    icon: BarChart3,
    color: "bg-indigo-100 text-indigo-800",
    pages: [
      { name: "Dashboard", url: "/workspace/dashboard", description: "Main workspace overview" },
      { name: "Products Access", url: "/workspace/products", description: "Licensed product access" },
      { name: "Team Management", url: "/workspace/team", description: "Team collaboration tools" },
      { name: "Analytics", url: "/workspace/analytics", description: "Usage analytics and reports" },
      { name: "Reports", url: "/workspace/reports", description: "Detailed reporting dashboard" },
      { name: "Settings", url: "/workspace/settings", description: "Profile and account settings" },
    ]
  },
  {
    title: "🏢 Organization Management",
    icon: Building2,
    color: "bg-orange-100 text-orange-800",
    pages: [
      { name: "Organization Dashboard", url: "/organization/dashboard/[id]", description: "Organization-specific management" },
    ]
  },
  {
    title: "👨‍💼 Admin Portal",
    icon: UserCheck,
    color: "bg-gray-100 text-gray-800",
    pages: [
      { name: "Admin Dashboard", url: "/admin/dashboard", description: "System administration overview" },
      { name: "Organization Management", url: "/admin/organization/[id]", description: "Manage organizations" },
      { name: "Lead Management", url: "/admin/leads", description: "Customer leads and prospects" },
      { name: "Multi-Database Status", url: "/admin/multi-database", description: "Database health monitoring" },
      { name: "CMS Dashboard", url: "/admin/cms", description: "Content management system" },
      { name: "Homepage Editor", url: "/admin/cms/homepage", description: "Edit homepage content" },
      { name: "Pricing Editor", url: "/admin/cms/pricing", description: "Manage pricing content" },
      { name: "Website Management", url: "/admin/website", description: "Global website settings" },
    ]
  },
  {
    title: "🤖 AI & Voice Features",
    icon: Bot,
    color: "bg-cyan-100 text-cyan-800",
    pages: [
      { name: "Voice Bot Integration", url: "#voice-bot", description: "AI-powered voice assistant (available on all pages)" },
      { name: "Speech Recognition", url: "#speech", description: "Speech-to-text functionality" },
      { name: "AI Responses", url: "#ai-responses", description: "Intelligent AI-generated responses" },
    ]
  }
]

const quickLinks = [
  { name: "API Documentation", url: "/api", icon: Globe },
  { name: "XML Sitemap", url: "/sitemap.xml", icon: FileText },
  { name: "Robots.txt", url: "/robots.txt", icon: Bot },
  { name: "Health Check", url: "/api/health", icon: Heart },
]

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📍 Website Sitemap
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete navigation guide to all pages, features, and sections available on Avaone Suite platform.
            Find exactly what you're looking for with our comprehensive site structure.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">80+</div>
              <div className="text-sm text-gray-600">Total Pages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-sm text-gray-600">API Endpoints</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">4</div>
              <div className="text-sm text-gray-600">User Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Quick Links
            </CardTitle>
            <CardDescription>
              Direct access to important technical pages and resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  target={link.url.startsWith('/api') || link.url.endsWith('.xml') || link.url.endsWith('.txt') ? '_blank' : undefined}
                >
                  <link.icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Sitemap Sections */}
        <div className="space-y-8">
          {sitemapSections.map((section) => (
            <Card key={section.title} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${section.color}`}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  {section.title}
                  <Badge variant="secondary" className="ml-auto">
                    {section.pages.length} pages
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {section.pages.map((page) => (
                    <Link
                      key={page.url}
                      href={page.url}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {page.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {page.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {page.url}
                        </code>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Bot className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                🤖 AI Voice Assistant Available Everywhere
              </h3>
              <p className="text-blue-800 text-sm">
                Our AI-powered voice bot "AVA" is available on every page. Just say <strong>"Hi AVA"</strong> or 
                click the "Talk to AVA" button to get instant help, navigate the site, or learn about our features.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Last updated: {new Date().toLocaleDateString()} | 
            <Link href="/sitemap.xml" className="ml-2 text-blue-600 hover:underline">
              XML Sitemap
            </Link> | 
            <Link href="/robots.txt" className="ml-2 text-blue-600 hover:underline">
              Robots.txt
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
