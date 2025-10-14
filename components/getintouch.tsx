"use client"

import { useState } from "react"
import {
  EnvelopeClosedIcon, // keep for consistency if you want
} from "@radix-ui/react-icons"
import { Phone, MapPin, Mail, Loader2, CheckCircle, AlertCircle, Instagram, Linkedin, Facebook } from "lucide-react"

// Custom styles for bubble animations
const bubbleAnimationStyles = `
  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0px) scale(1);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-20px) scale(1.1);
      opacity: 0.9;
    }
  }

  @keyframes bounce-slow-delayed {
    0%, 100% {
      transform: translateY(0px) scale(0.9);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-15px) scale(1.05);
      opacity: 0.8;
    }
  }

  @keyframes bounce-slow-delayed-2 {
    0%, 100% {
      transform: translateY(0px) scale(1.1);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-25px) scale(0.95);
      opacity: 1;
    }
  }

  .animate-bounce-slow {
    animation: bounce-slow 4s ease-in-out infinite;
  }

  .animate-bounce-slow-delayed {
    animation: bounce-slow-delayed 5s ease-in-out infinite;
    animation-delay: 1s;
  }

  .animate-bounce-slow-delayed-2 {
    animation: bounce-slow-delayed-2 6s ease-in-out infinite;
    animation-delay: 2s;
  }
`

export function GetInTouch() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    tool: "AVA CX",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const tools = ["AVA CX", "AVA SmartBill", "AVA Flow", "AVA Pingora"]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleToolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, tool: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/send-contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            tool: "AVA CX",
            message: "",
          })
          setSubmitStatus("idle")
        }, 3000)
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
    <>
      <style jsx>{bubbleAnimationStyles}</style>
      <section className="container mx-auto p-6 mt-20 -mb-10">
      {/* Heading */}
      <h2 className="text-6xl font-bold mb-2 text-center">
        Get in <span className="text-[#4B6CEB]">Touch</span>
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Have questions or need support? Our team is here to help you anytime.
      </p>

      {/* Wrapper */}
      <div className="flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden">
        {/* Left gradient card */}
        <div
          className="md:w-1/2 p-8 text-white flex flex-col justify-between relative overflow-hidden bg-cover bg-center backdrop-blur-sm"
          style={{
            backgroundImage: "url('/bg1.webp')",
          }}
        >
          {/* Decorative Ellipses */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Ellipse 2: 269x269 - Color #86E3F0 (Light Blue) - Bottom Layer */}
            <div
              className="absolute -bottom-12 -right-12 rounded-full opacity-80 backdrop-blur-sm"
              style={{
                width: '230px',
                height: '230px',
                backgroundColor: '#86E3F0',
              }}
            ></div>

            {/* Ellipse 1: 138x138 - Color #BFFFF48F (Light Greenish) - Top Layer */}
            <div
              className="absolute rounded-full opacity-70 z-10 backdrop-blur-sm"
              style={{
                width: '138px',
                height: '138px',
                backgroundColor: '#BFFFF48F',
                bottom: '60px',
                right: '65px',  // Center horizontally on larger ellipse
              }}
            ></div>
          </div>

          {/* Animated Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Bubble 1 */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/20 rounded-full animate-bounce-slow"></div>

            {/* Bubble 2 */}
            <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/15 rounded-full animate-bounce-slow-delayed"></div>

            {/* Bubble 3 */}
            <div className="absolute bottom-1/3 left-1/2 w-10 h-10 bg-white/10 rounded-full animate-bounce-slow-delayed-2"></div>

            {/* Bubble 4 */}
            <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/25 rounded-full animate-bounce-slow"></div>

            {/* Bubble 5 */}
            <div className="absolute bottom-1/4 right-1/3 w-7 h-7 bg-white/20 rounded-full animate-bounce-slow-delayed"></div>

            {/* Bubble 6 */}
            <div className="absolute top-2/3 left-1/3 w-5 h-5 bg-white/15 rounded-full animate-bounce-slow-delayed-2"></div>
          </div>
          <div>
            <h3 className="text-[3rem] font-bold mb-6 drop-shadow-lg">Contact <span className="text-blue-500">Information</span> </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 drop-shadow-md text-blue rounded-full" />
                <span className="drop-shadow-md">contact@matchbestsoftware.com</span>
              </li>
            </ul>
          </div>

          {/* Socials - All in one row */}
          <div className="flex space-x-6 mt-8">
            <a
              href="https://www.facebook.com/profile.php?id=61581973103795"
              aria-label="Facebook"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 inline-flex items-center justify-center"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/matchbest.software?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              aria-label="Instagram"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 inline-flex items-center justify-center"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/matchbestsoftwarepvtltd/"
              aria-label="LinkedIn"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 inline-flex items-center justify-center"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right form */} 
        <form onSubmit={handleSubmit} className="md:w-1/2 bg-white p-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border-b border-gray-300 focus:outline-none focus:border-[#4B6CEB] py-2"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border-b border-gray-300 focus:outline-none focus:border-[#4B6CEB] py-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border-b border-gray-300 focus:outline-none focus:border-[#4B6CEB] py-2"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border-b border-gray-300 focus:outline-none focus:border-[#4B6CEB] py-2"
            />
          </div>

          <fieldset className="mb-4">
            <legend className="mb-2 font-semibold">Looking for a tool?</legend>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool) => (
                <label
                  key={tool}
                  className="inline-flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name="tool"
                    value={tool}
                    checked={formData.tool === tool}
                    onChange={handleToolChange}
                    className="form-radio text-[#4B6CEB]"
                  />
                  <span>{tool}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-[#4B6CEB] py-2 resize-none mb-4"
            rows={4}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : submitStatus === "success" ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Sent!</span>
              </>
            ) : submitStatus === "error" ? (
              <>
                <AlertCircle className="w-4 h-4" />
                <span>Try Again</span>
              </>
            ) : (
              "Send Message"
            )}
          </button>

          {/* Success/Error Messages */}
          {submitStatus === "success" && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Thank you for your message!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                We'll get back to you within 24 hours.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Something went wrong</span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                Please try again or contact us directly.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
    </>
  )
}
