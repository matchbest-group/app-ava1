import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Package, Sparkles, Zap } from "lucide-react"

const bundles = [
  {
    name: "Startup Essentials",
    description: "Perfect for growing businesses",
    originalPrice: 157,
    bundlePrice: 99,
    savings: 37,
    popular: false,
    icon: Zap,
    products: ["Analytics Pro", "TeamChat Pro", "SecureVault", "Basic Support"],
    features: ["Up to 10 users", "Basic integrations", "Email support", "Monthly reports"],
  },
  {
    name: "Professional Suite",
    description: "Complete solution for established teams",
    originalPrice: 267,
    bundlePrice: 179,
    savings: 33,
    popular: true,
    icon: Package,
    products: [
      "Analytics Pro",
      "Data Insights",
      "TeamChat Pro",
      "Video Conference",
      "SecureVault",
      "Compliance Manager",
    ],
    features: ["Up to 50 users", "Advanced integrations", "Priority support", "Custom reports", "API access"],
  },
  {
    name: "Enterprise Complete",
    description: "Full-scale enterprise solution",
    originalPrice: 399,
    bundlePrice: 299,
    savings: 25,
    popular: false,
    icon: Sparkles,
    products: ["All Professional Suite products", "Advanced Analytics", "Custom Integrations", "Dedicated Support"],
    features: [
      "Unlimited users",
      "Custom integrations",
      "24/7 phone support",
      "White-label options",
      "SLA guarantee",
      "Dedicated account manager",
    ],
  },
]

export function FeaturedBundles() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">Save More with Bundles</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get everything you need in one comprehensive package. Our bundles offer significant savings and seamless
            integration.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {bundles.map((bundle, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                bundle.popular ? "border-primary shadow-lg scale-105" : "border-border hover:border-primary/50"
              }`}
            >
              {bundle.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <CardHeader className={bundle.popular ? "pt-12" : ""}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <bundle.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-heading font-bold text-xl">{bundle.name}</CardTitle>
                    <CardDescription>{bundle.description}</CardDescription>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-heading font-black text-3xl text-primary">${bundle.bundlePrice}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground line-through">${bundle.originalPrice}/month</span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Save {bundle.savings}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Included Products */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Included Products:</h4>
                  <div className="space-y-2">
                    {bundle.products.map((product, productIndex) => (
                      <div key={productIndex} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{product}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Features:</h4>
                  <div className="space-y-2">
                    {bundle.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" variant={bundle.popular ? "default" : "outline"} size="lg">
                  {bundle.popular ? "Get Started" : "Choose Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Bundle CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Need a Custom Solution?</h3>
              <p className="text-muted-foreground mb-6">
                Our team can create a tailored bundle that perfectly fits your organization's unique requirements.
              </p>
              <Button size="lg">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
