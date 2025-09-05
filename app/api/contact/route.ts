import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const LEADS_FILE_PATH = path.join(process.cwd(), 'data', 'leads.json')

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// POST - Submit contact form and save as lead
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }
    
    ensureDataDirectory()
    
    // Create new lead object
    const newLead = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      company: formData.company || '',
      message: formData.message,
      status: 'new',
      createdAt: new Date().toISOString(),
      source: 'website_contact_form'
    }
    
    // Load existing leads
    let leads = []
    if (fs.existsSync(LEADS_FILE_PATH)) {
      leads = JSON.parse(fs.readFileSync(LEADS_FILE_PATH, 'utf8'))
    }
    
    // Add new lead
    leads.unshift(newLead) // Add to beginning of array (newest first)
    
    // Save leads
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.',
      leadId: newLead.id
    })
  } catch (error) {
    console.error('Error saving contact form:', error)
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    )
  }
}
