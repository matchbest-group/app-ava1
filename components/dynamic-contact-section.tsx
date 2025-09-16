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
    title: "",
    subtitle: "",
    email: "",
    phone: "",
    address: ""
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

  // Hide the entire contact section (as requested). If content is re-enabled via CMS,
  // this can be swapped back to render conditionally.
  return null
}
