"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, Mail, User, Building, Phone } from "lucide-react"

interface PricingContactFormProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan?: {
    name: string
    price: string
    billingCycle: string
  } | null
}

export function PricingContactForm({ isOpen, onClose, selectedPlan }: PricingContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    teamSize: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/send-pricing-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedPlan: selectedPlan,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            teamSize: "",
            message: ""
          })
          onClose()
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Mail className="w-5 h-5 text-primary" />
            <span>Get Started with {selectedPlan?.name}</span>
          </DialogTitle>
          <DialogDescription>
            Fill out your details and we'll get back to you within 24 hours with next steps.
          </DialogDescription>
        </DialogHeader>

        {selectedPlan && (
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">Selected Plan</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedPlan.name} - {selectedPlan.price} per user/{selectedPlan.billingCycle}
                </p>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedPlan.name}
              </Badge>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>Full Name *</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>Email Address *</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span>Company Name *</span>
              </Label>
              <Input
                id="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>Phone Number</span>
              </Label>
              <Input
                id="phone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamSize">Team Size</Label>
            <Select value={formData.teamSize} onValueChange={(value) => handleInputChange("teamSize", value)}>
              <SelectTrigger disabled={isSubmitting}>
                <SelectValue placeholder="Select your team size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 users</SelectItem>
                <SelectItem value="6-15">6-15 users</SelectItem>
                <SelectItem value="16-50">16-50 users</SelectItem>
                <SelectItem value="51-100">51-100 users</SelectItem>
                <SelectItem value="100+">100+ users</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Requirements</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your specific needs, timeline, or any questions you have..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="sm:flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.company}
              className="sm:flex-1 relative"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : submitStatus === "success" ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Sent Successfully!</span>
                </div>
              ) : submitStatus === "error" ? (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Try Again</span>
                </div>
              ) : (
                "Send Inquiry"
              )}
            </Button>
          </div>

          {submitStatus === "success" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Thank you for your inquiry!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                We'll review your requirements and get back to you within 24 hours.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Something went wrong</span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                Please try again or contact us directly at support@avaflow.com
              </p>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
