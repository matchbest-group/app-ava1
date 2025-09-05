"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactContent {
  title: string
  subtitle: string
  email: string
  phone: string
  address: string
}

export function DynamicContactSection() {
  const { toast } = useToast()
  const [contactContent, setContactContent] = useState<ContactContent>({
    title: "Get in Touch",
    subtitle: "Ready to transform your business? Contact us today!",
    email: "contact@avaone.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, Tech City, TC 12345"
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  // Load content from API
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/website-content')
        if (response.ok) {
          const data = await response.json()
          setContactContent(data.contact)
        }
      } catch (error) {
        console.error('Failed to load contact content:', error)
      }
    }
    loadContent()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        // Show success toast
        toast({
          title: "Message Sent! ✅",
          description: result.message || 'Thank you for your message! We will get back to you soon.',
        })
        // Reset form
        setFormData({ name: "", email: "", company: "", message: "" })
      } else {
        // Show error toast
        toast({
          title: "Error ❌",
          description: result.error || 'Failed to submit form. Please try again.',
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Error ❌",
        description: 'Failed to submit form. Please try again.',
        variant: "destructive"
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {contactContent.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {contactContent.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">{contactContent.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">{contactContent.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-muted-foreground">{contactContent.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Response Time</h4>
                <p className="text-sm text-muted-foreground">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project or inquiry..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full group">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
