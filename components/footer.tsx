"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 rounded-t-3xl shadow-inner mt-20 pt-12 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Left (Logo/About) + Right (Links) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* Left: Logo + About */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="AVAONE Logo"
                width={140}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
              Empowering businesses with AI-driven solutions for customer
              support, sales, billing, and team collaboration.
            </p>
          </div>

          {/* Right: 4 Link Sections */}
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Solutions */}
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-4 text-base">Solutions</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/products" className="hover:text-[#4B6CEB] transition">All Products</Link></li>
                <li><Link href="/bundles" className="hover:text-[#4B6CEB] transition">Bundled Offers</Link></li>
                <li><Link href="/pricing" className="hover:text-[#4B6CEB] transition">Pricing Plans</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-4 text-base">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/enterprise" className="hover:text-[#4B6CEB] transition">Enterprise</Link></li>
                <li><Link href="/support" className="hover:text-[#4B6CEB] transition">Documentation</Link></li>
              </ul>
            </div>

            {/* Access */}
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-4 text-base">Access</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/organization/login" className="hover:text-[#4B6CEB] transition">Organization Login</Link></li>
                <li><Link href="/workspace/login" className="hover:text-[#4B6CEB] transition">Workspace Login</Link></li>
                <li><Link href="#" className="hover:text-[#4B6CEB] transition">Sign In</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-4 text-base">Contact Us</h4>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#4B6CEB]" />
                  <span>+91 8585858585</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#4B6CEB]" />
                  <span>contact@avasuit.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#4B6CEB]" />
                  <span>132 Las Vegas, United States</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 w-full px-4">
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#060426] py-12 px-6 sm:px-10 text-center shadow-2xl">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide mb-6">
            Grow Your Business with AI
          </h3>
          <a href="/contacts">
            <button className="px-8 py-3 bg-[#4B6CEB] text-white rounded-full text-sm sm:text-base font-medium hover:bg-[#3653cb] transition">
              Get Started
            </button>
          </a>
        </div>

        {/* All rights reserved */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} AVAONE. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
