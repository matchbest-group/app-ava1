import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'website-content.json')

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Default content structure
const defaultContent = {
  hero: {
    title: 'Welcome to AVA One',
    subtitle: 'Empowering businesses with cutting-edge solutions',
    backgroundImage: '/hero-bg.jpg',
    ctaText: 'Get Started'
  },
  businessIntelligence: {
    title: 'Business Intelligence',
    description: 'Transform your data into actionable insights',
    features: [
      'Real-time Analytics',
      'Custom Dashboards',
      'Data Visualization',
      'Predictive Analytics'
    ],
    image: '/bi-dashboard.png'
  },
  pricing: {
    title: 'Choose Your Plan',
    subtitle: 'Select the perfect plan for your business needs',
    plans: [
      {
        name: 'Starter',
        price: '$29/month',
        features: ['Basic Analytics', '5 Users', 'Email Support'],
        popular: false
      },
      {
        name: 'Professional',
        price: '$99/month',
        features: ['Advanced Analytics', '25 Users', 'Priority Support', 'Custom Reports'],
        popular: true
      },
      {
        name: 'Enterprise',
        price: '$299/month',
        features: ['Full Analytics Suite', 'Unlimited Users', '24/7 Support', 'Custom Integration'],
        popular: false
      }
    ]
  },
  contact: {
    title: 'Get in Touch',
    subtitle: 'Ready to transform your business? Contact us today!',
    email: 'contact@avaone.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, Tech City, TC 12345'
  },
  promoBanner: {
    isVisible: true,
    text: '🎉 Limited Time Offer: Get 50% OFF on all Premium Plans! Use code SAVE50',
    backgroundColor: '#6366f1',
    textColor: '#ffffff',
    link: '/pricing'
  }
}

// GET - Load website content
export async function GET() {
  try {
    ensureDataDirectory()
    
    if (fs.existsSync(CONTENT_FILE_PATH)) {
      const content = fs.readFileSync(CONTENT_FILE_PATH, 'utf8')
      return NextResponse.json(JSON.parse(content))
    } else {
      // Return default content if file doesn't exist
      return NextResponse.json(defaultContent)
    }
  } catch (error) {
    console.error('Error loading website content:', error)
    return NextResponse.json(
      { error: 'Failed to load website content' },
      { status: 500 }
    )
  }
}

// POST - Save website content
export async function POST(request: NextRequest) {
  try {
    const content = await request.json()
    
    ensureDataDirectory()
    
    // Validate content structure
    if (!content.hero || !content.businessIntelligence || !content.pricing || !content.contact || !content.promoBanner) {
      return NextResponse.json(
        { error: 'Invalid content structure' },
        { status: 400 }
      )
    }
    
    // Save content to file
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Website content saved successfully' 
    })
  } catch (error) {
    console.error('Error saving website content:', error)
    return NextResponse.json(
      { error: 'Failed to save website content' },
      { status: 500 }
    )
  }
}
