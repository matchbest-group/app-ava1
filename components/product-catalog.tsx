"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  ArrowRight,
  BarChart3,
  Shield,
  MessageSquare,
  Users,
  Database,
  Cloud,
  Zap,
  Settings,
} from "lucide-react"

const allProducts = [
  {
    id: 1,
    name: "Analytics Pro",
    description: "Real-time business intelligence dashboard with advanced reporting capabilities",
    category: "Business Intelligence",
    price: 49,
    rating: 4.9,
    reviews: 1247,
    image: "/images/dashboard-1.png",
    features: ["Real-time dashboards", "Custom reports", "Data visualization", "API integration"],
    icon: BarChart3,
  },
  {
    id: 2,
    name: "Data Insights",
    description: "AI-powered data analysis platform for predictive analytics",
    category: "Business Intelligence",
    price: 79,
    rating: 4.8,
    reviews: 892,
    image: "/ai-data-analysis-interface-with-machine-learning-v.png",
    features: ["Machine learning", "Predictive analytics", "Data mining", "Automated insights"],
    icon: BarChart3,
  },
  {
    id: 3,
    name: "SecureVault",
    description: "Advanced data encryption and secure storage solution",
    category: "Security & Compliance",
    price: 39,
    rating: 4.9,
    reviews: 2156,
    image: "/cybersecurity-dashboard-with-encryption-and-protec.png",
    features: ["End-to-end encryption", "Secure storage", "Access controls", "Audit logs"],
    icon: Shield,
  },
  {
    id: 4,
    name: "Compliance Manager",
    description: "Automated compliance monitoring and reporting system",
    category: "Security & Compliance",
    price: 59,
    rating: 4.7,
    reviews: 743,
    image: "/compliance-management-interface-with-audit-trails-.png",
    features: ["Compliance tracking", "Automated reports", "Risk assessment", "Policy management"],
    icon: Shield,
  },
  {
    id: 5,
    name: "TeamChat Pro",
    description: "Enterprise messaging platform with advanced collaboration tools",
    category: "Communication",
    price: 29,
    rating: 4.8,
    reviews: 3421,
    image: "/modern-team-chat-interface-with-video-calls-and-fi.png",
    features: ["Team messaging", "File sharing", "Integration hub", "Mobile apps"],
    icon: MessageSquare,
  },
  {
    id: 6,
    name: "Video Conference",
    description: "HD video conferencing solution with screen sharing",
    category: "Communication",
    price: 19,
    rating: 4.6,
    reviews: 1876,
    image: "/professional-video-conference-call-with-multiple-p.png",
    features: ["HD video calls", "Screen sharing", "Recording", "Virtual backgrounds"],
    icon: MessageSquare,
  },
  {
    id: 7,
    name: "Project Manager",
    description: "Comprehensive project management and task tracking platform",
    category: "Productivity",
    price: 35,
    rating: 4.7,
    reviews: 1543,
    image: "/project-management-dashboard.png",
    features: ["Task management", "Gantt charts", "Team collaboration", "Time tracking"],
    icon: Settings,
  },
  {
    id: 8,
    name: "Cloud Storage Pro",
    description: "Enterprise-grade cloud storage with advanced sync capabilities",
    category: "Storage",
    price: 25,
    rating: 4.8,
    reviews: 2987,
    image: "/cloud-storage-interface.png",
    features: ["Unlimited storage", "File sync", "Version control", "Team sharing"],
    icon: Cloud,
  },
  {
    id: 9,
    name: "Database Manager",
    description: "Advanced database management and optimization tools",
    category: "Development",
    price: 69,
    rating: 4.6,
    reviews: 654,
    image: "/database-management-interface.png",
    features: ["Query optimization", "Performance monitoring", "Backup automation", "Schema design"],
    icon: Database,
  },
  {
    id: 10,
    name: "API Gateway",
    description: "Scalable API management and monitoring platform",
    category: "Development",
    price: 89,
    rating: 4.9,
    reviews: 432,
    image: "/api-management-dashboard.png",
    features: ["API routing", "Rate limiting", "Analytics", "Security policies"],
    icon: Zap,
  },
  {
    id: 11,
    name: "HR Management",
    description: "Complete human resources management system",
    category: "Human Resources",
    price: 45,
    rating: 4.5,
    reviews: 876,
    image: "/hr-management-dashboard.png",
    features: ["Employee records", "Payroll management", "Performance tracking", "Recruitment"],
    icon: Users,
  },
  {
    id: 12,
    name: "Customer Support",
    description: "Advanced customer support and ticketing system",
    category: "Customer Service",
    price: 55,
    rating: 4.7,
    reviews: 1234,
    image: "/customer-support-dashboard.png",
    features: ["Ticket management", "Live chat", "Knowledge base", "Customer analytics"],
    icon: MessageSquare,
  },
]

const categories = [
  "All Categories",
  "Business Intelligence",
  "Security & Compliance",
  "Communication",
  "Productivity",
  "Storage",
  "Development",
  "Human Resources",
  "Customer Service",
]

const sortOptions = [
  { value: "name", label: "Name A-Z" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" },
]

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesRating = product.rating >= minRating

      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, priceRange, minRating, sortBy])

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">Product Catalog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our comprehensive suite of professional tools designed to streamline your business operations.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex border border-border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {allProducts.length} products
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Minimum Rating</h3>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={minRating === rating}
                          onCheckedChange={() => setMinRating(rating)}
                        />
                        <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                          {rating > 0 ? (
                            <>
                              <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                              {rating}+ Stars
                            </>
                          ) : (
                            "All Ratings"
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <product.icon className="h-5 w-5 text-primary" />
                          <CardTitle className="font-heading font-bold text-lg">{product.name}</CardTitle>
                        </div>
                        <Badge variant="secondary">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {product.rating}
                        </Badge>
                      </div>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-heading font-bold text-2xl text-primary">${product.price}</span>
                            <span className="text-muted-foreground ml-1">/month</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{product.reviews} reviews</div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {product.features.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                        <Link href={`/products/${product.id}`}>
                          <Button className="w-full group/btn">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-48 h-32 overflow-hidden rounded-lg flex-shrink-0">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <product.icon className="h-5 w-5 text-primary" />
                                <h3 className="font-heading font-bold text-xl">{product.name}</h3>
                                <Badge variant="secondary">
                                  <Star className="w-3 h-3 mr-1 fill-current" />
                                  {product.rating}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{product.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {product.features.map((feature, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <div>
                                <span className="font-heading font-bold text-2xl text-primary">${product.price}</span>
                                <span className="text-muted-foreground ml-1">/month</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{product.reviews} reviews</div>
                              <Link href={`/products/${product.id}`}>
                                <Button className="group/btn">
                                  Learn More
                                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All Categories")
                    setPriceRange([0, 100])
                    setMinRating(0)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
