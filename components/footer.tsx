"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 rounded-t-3xl shadow-inner mt-20 pt-12 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Left (Logo/About) + Right (Links) */}
        <div className="grid grid-cols-1 sm:grid-cols-12 md:grid-cols-12 gap-2 items-start">
          {/* Left: Logo + About */}
          <div className="sm:col-span-4 md:col-span-4">
            <div className="flex left-4 items-center mb-4">
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
          <div className="sm:col-span-8 md:col-span-8 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-4 sm:gap-8">
            {/* Solutions */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-gray-800 mb-4 text-base">Solutions</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/products" className="hover:text-[#4B6CEB] transition">All Products</Link></li>
                {/* <li><Link href="/bundles" className="hover:text-[#4B6CEB] transition">Bundled Offers</Link></li> */}
                <li><Link href="/pricing" className="hover:text-[#4B6CEB] transition">Pricing Plans</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-gray-800 mb-4 text-base">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/enterprise" className="hover:text-[#4B6CEB] transition">Enterprise</Link></li>
                <li><Link href="/support" className="hover:text-[#4B6CEB] transition">Documentation</Link></li>
                <li><Link href="/sitemap" className="hover:text-[#4B6CEB] transition">Sitemap</Link></li>
              </ul>
            </div>

            {/* Access */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-gray-800 mb-4 text-base">Access</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/organization/login" className="hover:text-[#4B6CEB] transition">Organization Login</Link></li>
                <li><Link href="/workspace/login" className="hover:text-[#4B6CEB] transition">Workspace Login</Link></li>
                <li><Link href="#" className="hover:text-[#4B6CEB] transition">Sign In</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-gray-800 mb-4 text-base">Contact Us</h4>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#4B6CEB]" />
                  <span>contact@matchbestsoftware.com</span>
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
