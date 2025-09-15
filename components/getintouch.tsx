"use client"

import { useState } from "react"
import {
  EnvelopeClosedIcon, // keep for consistency if you want
} from "@radix-ui/react-icons"
import { Phone, MapPin, Mail } from "lucide-react"

export function GetInTouch() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    tool: "AVA CX",
    message: "",
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message sent!")
  }

  return (
    <section className="container mx-auto p-6">
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
          className="md:w-1/2 p-8 text-white flex flex-col justify-between"
          style={{
            background:
              "linear-gradient(135deg, #4B6CEB 0%, #982ACC 50%, #FF6EC7 100%)",
          }}
        >
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+91 8585858585</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>contact@avasuit.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>132 Las Vegas, United States</span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex space-x-4 mt-8">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-gray-200 transition"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 00-8.38 4.482A13.94 13.94 0 011.671 3.149a4.916 4.916 0 001.523 6.574 4.9 4.9 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.918 4.918 0 004.59 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.209c9.056 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-gray-200 transition"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-gray-200 transition"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V24h-5v-7.5c0-1.8 0-4.1-2.5-4.1-2.5 0-2.9 2-2.9 4v7.6h-5V8z" />
              </svg>
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
            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-900 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
