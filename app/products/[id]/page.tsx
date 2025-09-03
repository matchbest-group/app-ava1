import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

// This would typically come from a database or API
const allProducts = [
  {
    id: 1,
    name: "Analytics Pro",
    description: "Real-time business intelligence dashboard with advanced reporting capabilities",
    longDescription:
      "Transform your business data into actionable insights with Analytics Pro. Our comprehensive business intelligence platform provides real-time dashboards, advanced analytics, and custom reporting tools that help you make data-driven decisions with confidence.",
    category: "Business Intelligence",
    price: 49,
    rating: 4.9,
    reviews: 1247,
    image: "/images/dashboard-1.png",
    gallery: [
      "/images/dashboard-1.png",
      "/ai-data-analysis-interface-with-machine-learning-v.png",
      "/placeholder.svg?key=analytics1",
      "/placeholder.svg?key=analytics2",
    ],
    features: [
      "Real-time dashboards",
      "Custom reports",
      "Data visualization",
      "API integration",
      "Advanced analytics",
      "Export capabilities",
    ],
    detailedFeatures: [
      {
        title: "Real-time Dashboards",
        description:
          "Monitor your business metrics in real-time with customizable dashboards that update automatically.",
        icon: "📊",
      },
      {
        title: "Custom Reports",
        description: "Create detailed reports with drag-and-drop functionality and automated scheduling.",
        icon: "📈",
      },
      {
        title: "Data Visualization",
        description: "Transform complex data into clear, interactive charts and graphs.",
        icon: "📉",
      },
      {
        title: "API Integration",
        description: "Connect with over 100+ data sources and third-party applications seamlessly.",
        icon: "🔗",
      },
    ],
    plans: [
      {
        name: "Starter",
        price: 29,
        description: "Perfect for small teams",
        features: ["Up to 5 dashboards", "Basic reports", "Email support", "5GB storage"],
      },
      {
        name: "Professional",
        price: 49,
        description: "Most popular plan",
        features: ["Unlimited dashboards", "Advanced reports", "Priority support", "50GB storage", "API access"],
        popular: true,
      },
      {
        name: "Enterprise",
        price: 99,
        description: "For large organizations",
        features: [
          "Everything in Pro",
          "Custom integrations",
          "Dedicated support",
          "Unlimited storage",
          "SLA guarantee",
        ],
      },
    ],
    specifications: {
      "Data Sources": "100+ integrations",
      Users: "Unlimited",
      Storage: "Up to 1TB",
      "API Calls": "10,000/month",
      Support: "24/7 Priority",
      Uptime: "99.9% SLA",
    },
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Data Analyst at TechCorp",
        content:
          "Analytics Pro has revolutionized how we handle our business intelligence. The real-time dashboards are incredibly intuitive.",
        rating: 5,
      },
      {
        name: "Michael Chen",
        role: "CEO at StartupXYZ",
        content:
          "The custom reporting features saved us hours of manual work. Highly recommended for any growing business.",
        rating: 5,
      },
    ],
  },
  {
    id: 2,
    name: "Data Insights",
    description: "AI-powered data analysis platform for predictive analytics",
    longDescription:
      "Harness the power of artificial intelligence to unlock hidden patterns in your data. Data Insights uses advanced machine learning algorithms to provide predictive analytics, automated insights, and intelligent recommendations that drive business growth.",
    category: "Business Intelligence",
    price: 79,
    rating: 4.8,
    reviews: 892,
    image: "/ai-data-analysis-interface-with-machine-learning-v.png",
    gallery: [
      "/ai-data-analysis-interface-with-machine-learning-v.png",
      "/images/dashboard-1.png",
      "/placeholder.svg?key=ai1",
      "/placeholder.svg?key=ai2",
    ],
    features: [
      "Machine learning",
      "Predictive analytics",
      "Data mining",
      "Automated insights",
      "Pattern recognition",
      "Forecasting",
    ],
    detailedFeatures: [
      {
        title: "Machine Learning",
        description: "Advanced ML algorithms that learn from your data to provide intelligent insights.",
        icon: "🤖",
      },
      {
        title: "Predictive Analytics",
        description: "Forecast future trends and outcomes with high accuracy using historical data.",
        icon: "🔮",
      },
      {
        title: "Data Mining",
        description: "Discover hidden patterns and relationships in large datasets automatically.",
        icon: "⛏️",
      },
      {
        title: "Automated Insights",
        description: "Get actionable recommendations delivered automatically to your inbox.",
        icon: "💡",
      },
    ],
    plans: [
      {
        name: "Basic",
        price: 59,
        description: "For small datasets",
        features: ["Basic ML models", "Monthly reports", "Email support", "10GB data processing"],
      },
      {
        name: "Professional",
        price: 79,
        description: "Most comprehensive",
        features: [
          "Advanced ML models",
          "Real-time insights",
          "Priority support",
          "100GB data processing",
          "Custom models",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: 149,
        description: "For large enterprises",
        features: [
          "Everything in Pro",
          "Dedicated ML engineer",
          "Custom algorithms",
          "Unlimited processing",
          "On-premise deployment",
        ],
      },
    ],
    specifications: {
      "ML Models": "50+ pre-built models",
      "Data Processing": "Up to 1TB/month",
      Accuracy: "95%+ prediction accuracy",
      Integration: "REST API & SDKs",
      Deployment: "Cloud & On-premise",
      "Training Time": "< 30 minutes",
    },
    testimonials: [
      {
        name: "Dr. Emily Rodriguez",
        role: "Chief Data Scientist at FinanceFlow",
        content:
          "The predictive accuracy of Data Insights is remarkable. It's helped us reduce forecasting errors by 40%.",
        rating: 5,
      },
      {
        name: "James Wilson",
        role: "Analytics Manager at RetailMax",
        content:
          "The automated insights feature has transformed our decision-making process. We're now proactive instead of reactive.",
        rating: 4,
      },
    ],
  },
  // Add more products as needed...
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = allProducts.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </main>
  )
}

export function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }))
}
