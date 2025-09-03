"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Zap, Package, Sparkles, ArrowRight, HelpCircle } from "lucide-react"

const pricingPlans = {
  individual: [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      monthlyPrice: 29,
      annualPrice: 290,
      popular: false,
      features: [
        { name: "Up to 3 projects", included: true },
        { name: "5GB storage", included: true },
        { name: "Basic analytics", included: true },
        { name: "Email support", included: true },
        { name: "API access", included: false },
        { name: "Advanced integrations", included: false },
        { name: "Priority support", included: false },
        { name: "Custom branding", included: false },
      ],
      cta: "Start Free Trial",
      icon: Zap,
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and teams",
      monthlyPrice: 79,
      annualPrice: 790,
      popular: true,
      features: [
        { name: "Unlimited projects", included: true },
        { name: "100GB storage", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true },
        { name: "Advanced integrations", included: true },
        { name: "Custom branding", included: false },
        { name: "Dedicated manager", included: false },
      ],
      cta: "Start Free Trial",
      icon: Package,
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      monthlyPrice: 199,
      annualPrice: 1990,
      popular: false,
      features: [
        { name: "Unlimited everything", included: true },
        { name: "Unlimited storage", included: true },
        { name: "Custom analytics", included: true },
        { name: "24/7 phone support", included: true },
        { name: "Full API access", included: true },
        { name: "Custom integrations", included: true },
        { name: "White-label options", included: true },
        { name: "Dedicated manager", included: true },
      ],
      cta: "Contact Sales",
      icon: Sparkles,
    },
  ],
  team: [
    {
      name: "Team Starter",
      description: "For small teams up to 10 members",
      monthlyPrice: 99,
      annualPrice: 990,
      popular: false,
      teamSize: "Up to 10 members",
      features: [
        { name: "Team collaboration tools", included: true },
        { name: "Shared workspaces", included: true },
        { name: "Team analytics", included: true },
        { name: "Email support", included: true },
        { name: "Advanced permissions", included: false },
        { name: "Custom workflows", included: false },
      ],
      cta: "Start Team Trial",
      icon: Zap,
    },
    {
      name: "Team Professional",
      description: "For growing teams up to 50 members",
      monthlyPrice: 299,
      annualPrice: 2990,
      popular: true,
      teamSize: "Up to 50 members",
      features: [
        { name: "Everything in Team Starter", included: true },
        { name: "Advanced permissions", included: true },
        { name: "Custom workflows", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced integrations", included: true },
        { name: "Custom reporting", included: true },
      ],
      cta: "Start Team Trial",
      icon: Package,
    },
    {
      name: "Team Enterprise",
      description: "For large teams with unlimited members",
      monthlyPrice: 599,
      annualPrice: 5990,
      popular: false,
      teamSize: "Unlimited members",
      features: [
        { name: "Everything in Team Professional", included: true },
        { name: "Enterprise security", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated support", included: true },
        { name: "SLA guarantee", included: true },
        { name: "On-premise deployment", included: true },
      ],
      cta: "Contact Sales",
      icon: Sparkles,
    },
  ],
}

export function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelect = (planName: string, price: number) => {
    setSelectedPlan(planName)
    // This would typically add to cart or redirect to checkout
    console.log(`Selected plan: ${planName} at $${price}/${billingCycle}`)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your needs. All plans include a 14-day free trial with no credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
            />
            <span className={`text-sm ${billingCycle === "annual" ? "text-foreground" : "text-muted-foreground"}`}>
              Annual
            </span>
            {billingCycle === "annual" && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        <Tabs defaultValue="individual" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="individual">
            <div className="grid lg:grid-cols-3 gap-8">
              {pricingPlans.individual.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    plan.popular ? "border-primary shadow-lg scale-105" : "border-border hover:border-primary/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  <CardHeader className={plan.popular ? "pt-12" : ""}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <plan.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-heading font-bold text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-heading font-black text-4xl text-primary">
                          ${billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                        </span>
                        <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      </div>
                      {billingCycle === "annual" && (
                        <div className="text-sm text-muted-foreground">
                          ${Math.round(plan.annualPrice / 12)}/month billed annually
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                      onClick={() =>
                        handlePlanSelect(plan.name, billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice)
                      }
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="grid lg:grid-cols-3 gap-8">
              {pricingPlans.team.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    plan.popular ? "border-primary shadow-lg scale-105" : "border-border hover:border-primary/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}

                  <CardHeader className={plan.popular ? "pt-12" : ""}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <plan.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-heading font-bold text-xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-heading font-black text-4xl text-primary">
                          ${billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                        </span>
                        <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      </div>
                      <div className="text-sm text-primary font-medium">{plan.teamSize}</div>
                      {billingCycle === "annual" && (
                        <div className="text-sm text-muted-foreground">
                          ${Math.round(plan.annualPrice / 12)}/month billed annually
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                      onClick={() =>
                        handlePlanSelect(plan.name, billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice)
                      }
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="font-heading font-bold text-3xl text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all plans come with a 14-day free trial. No credit card required to start.",
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 30-day money-back guarantee for all paid plans.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span>{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of satisfied customers who trust our platform for their business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Start Free Trial</Button>
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
