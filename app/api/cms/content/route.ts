import { NextRequest, NextResponse } from 'next/server'
import { getMainDb } from '@/lib/mongodb'

// Default website content structure
const defaultContent = {
  homepage: {
    hero: {
      title: "Transform Your Business with AI-Powered Solutions",
      subtitle: "Streamline operations, boost productivity, and drive growth with our comprehensive business automation platform",
      ctaText: "Start Free Trial",
      backgroundImage: "/bg1.jpg",
      features: [
        "AI-Powered Analytics",
        "Real-time Collaboration",
        "Enterprise Security",
        "24/7 Support"
      ]
    },
    stats: {
      users: "500K+",
      countries: "150+",
      uptime: "99.9%",
      awards: "50+"
    },
    testimonials: [
      {
        name: "Sarah Johnson",
        position: "CEO, TechStartup Inc.",
        content: "This platform has transformed our business operations. The AI-driven insights have helped us increase efficiency by 40% in just 3 months.",
        rating: 5,
        avatar: "/placeholder-logo.png"
      }
    ],
    features: {
      title: "Everything You Need to Succeed",
      subtitle: "Comprehensive suite of tools and features designed to accelerate your business growth",
      categories: [
        {
          name: "Core Features",
          icon: "rocket",
          items: [
            {
              name: "AI-Powered Analytics",
              description: "Advanced machine learning algorithms provide deep business insights"
            }
          ]
        }
      ]
    }
  },
  products: {
    title: "Our Products & Services",
    subtitle: "Comprehensive business solutions for every need",
    categories: [
      {
        id: "analytics",
        name: "Analytics & BI",
        description: "Advanced business intelligence and analytics tools",
        price: "$99/month",
        features: ["Real-time Dashboard", "Custom Reports", "Data Visualization", "API Integration"]
      }
    ]
  },
  pricing: {
    title: "Choose Your Plan",
    subtitle: "Simple, transparent pricing that scales with your business",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: "$29",
        period: "per month",
        description: "Perfect for small teams getting started",
        features: [
          "Up to 5 team members",
          "Basic analytics",
          "Email support",
          "1GB storage"
        ],
        popular: false
      },
      {
        id: "professional",
        name: "Professional",
        price: "$99",
        period: "per month",
        description: "For growing businesses with advanced needs",
        features: [
          "Up to 50 team members",
          "Advanced analytics",
          "Priority support",
          "10GB storage",
          "API access"
        ],
        popular: true
      }
    ]
  },
  about: {
    title: "About Our Company",
    subtitle: "We're on a mission to transform how businesses operate",
    mission: "To empower businesses worldwide with intelligent automation and data-driven insights",
    vision: "A world where every business can achieve its full potential through technology",
    team: [
      {
        name: "John Doe",
        position: "CEO & Founder",
        bio: "Tech entrepreneur with 15 years of experience",
        image: "/placeholder-logo.png"
      }
    ]
  },
  shared: {
    header: {
      logo: "/logo.png",
      companyName: "Your Company",
      navigation: [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contacts" }
      ]
    },
    footer: {
      companyName: "Your Company",
      description: "Transform your business with our AI-powered solutions",
      links: {
        product: [
          { name: "Features", href: "/features" },
          { name: "Pricing", href: "/pricing" },
          { name: "API", href: "/api" }
        ],
        company: [
          { name: "About", href: "/about" },
          { name: "Blog", href: "/blog" },
          { name: "Careers", href: "/careers" }
        ]
      },
      social: {
        twitter: "https://twitter.com/company",
        linkedin: "https://linkedin.com/company/company",
        github: "https://github.com/company"
      }
    }
  },
  media: {
    images: [
      { id: "hero-bg", url: "/bg1.jpg", alt: "Hero Background", category: "backgrounds" },
      { id: "logo", url: "/logo.png", alt: "Company Logo", category: "logos" }
    ],
    icons: [
      { id: "rocket", name: "rocket", category: "features" },
      { id: "shield", name: "shield", category: "security" }
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = await getMainDb()
    
    // Get section from query params
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')
    
    let content = await db.collection('website_content').findOne({ type: 'main' })
    
    if (!content) {
      // Initialize with default content
      const result = await db.collection('website_content').insertOne({
        type: 'main',
        content: defaultContent,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      // Fetch the newly created document
      content = await db.collection('website_content').findOne({ _id: result.insertedId })
    }
    
    if (section && content) {
      return NextResponse.json({
        success: true,
        data: content.content[section] || {}
      })
    }
    
    return NextResponse.json({
      success: true,
      data: content?.content || defaultContent
    })
    
  } catch (error) {
    console.error('Error fetching website content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const db = await getMainDb()
    const body = await request.json()
    const { section, data } = body
    
    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: 'Section and data are required' },
        { status: 400 }
      )
    }
    
    // Update specific section
    await db.collection('website_content').updateOne(
      { type: 'main' },
      {
        $set: {
          [`content.${section}`]: data,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    )
    
    // Create backup
    await db.collection('content_backups').insertOne({
      type: 'section_update',
      section,
      data,
      timestamp: new Date(),
      action: 'update'
    })
    
    return NextResponse.json({
      success: true,
      message: 'Content updated successfully'
    })
    
  } catch (error) {
    console.error('Error updating website content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getMainDb()
    const body = await request.json()
    const { action, data } = body
    
    switch (action) {
      case 'backup':
        // Create full backup
        const content = await db.collection('website_content').findOne({ type: 'main' })
        await db.collection('content_backups').insertOne({
          type: 'full_backup',
          content: content?.content || {},
          timestamp: new Date(),
          action: 'backup'
        })
        return NextResponse.json({ success: true, message: 'Backup created successfully' })
        
      case 'restore':
        // Restore from backup
        const { backupId } = data
        const backup = await db.collection('content_backups').findOne({ _id: backupId })
        if (backup) {
          await db.collection('website_content').updateOne(
            { type: 'main' },
            { $set: { content: backup.content, updatedAt: new Date() } },
            { upsert: true }
          )
          return NextResponse.json({ success: true, message: 'Content restored successfully' })
        }
        return NextResponse.json({ success: false, error: 'Backup not found' }, { status: 404 })
        
      case 'publish':
        // Mark all draft changes as published
        await db.collection('website_content').updateOne(
          { type: 'main' },
          { $set: { status: 'published', publishedAt: new Date() } }
        )
        return NextResponse.json({ success: true, message: 'Content published successfully' })
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
    
  } catch (error) {
    console.error('Error processing content action:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process action' },
      { status: 500 }
    )
  }
}
