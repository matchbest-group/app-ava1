import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, BarChart3, MessageSquare, ArrowRight, Star } from "lucide-react"

const productCategories = [
  {
    title: "Business Intelligence",
    description: "Advanced analytics and reporting tools",
    icon: BarChart3,
    products: [
      {
        name: "Analytics Pro",
        description: "Real-time business intelligence dashboard",
        price: "$49/month",
        rating: 4.9,
        image: "/images/dashboard-1.png",
      },
      {
        name: "Data Insights",
        description: "AI-powered data analysis platform",
        price: "$79/month",
        rating: 4.8,
        image: "/ai-data-analysis-interface-with-machine-learning-v.png",
      },
    ],
  },
  {
    title: "Security & Compliance",
    description: "Enterprise-grade security solutions",
    icon: Shield,
    products: [
      {
        name: "SecureVault",
        description: "Advanced data encryption and storage",
        price: "$39/month",
        rating: 4.9,
        image: "/cybersecurity-dashboard-with-encryption-and-protec.png",
      },
      {
        name: "Compliance Manager",
        description: "Automated compliance monitoring",
        price: "$59/month",
        rating: 4.7,
        image: "/compliance-management-interface-with-audit-trails-.png",
      },
    ],
  },
  {
    title: "Communication",
    description: "Team collaboration and messaging",
    icon: MessageSquare,
    products: [
      {
        name: "TeamChat Pro",
        description: "Enterprise messaging platform",
        price: "$29/month",
        rating: 4.8,
        image: "/modern-team-chat-interface-with-video-calls-and-fi.png",
      },
      {
        name: "Video Conference",
        description: "HD video conferencing solution",
        price: "$19/month",
        rating: 4.6,
        image: "/professional-video-conference-call-with-multiple-p.png",
      },
    ],
  },
]

export function ProductOverview() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Comprehensive Product Suite
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our range of professional tools designed to streamline your business operations and drive growth.
          </p>
        </div>

        <div className="space-y-16">
          {productCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              {/* Category Header */}
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-2xl text-foreground">{category.title}</h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {category.products.map((product, productIndex) => (
                  <Card
                    key={productIndex}
                    className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur"
                  >
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="font-heading font-bold text-xl">{product.name}</CardTitle>
                          <CardDescription className="mt-2">{product.description}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="ml-2">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {product.rating}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-heading font-bold text-2xl text-primary">{product.price}</span>
                          <span className="text-muted-foreground ml-1">per user</span>
                        </div>
                        <Button className="group/btn">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="group bg-transparent">
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
