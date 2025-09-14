"use client"

import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 rounded-t-3xl shadow-inner mt-20 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Grid: logo left + quick links right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Logo + description (left) */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="AVAONE Logo"
                width={140}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
              Empowering businesses with AI-driven solutions for customer
              support, sales, billing, and team collaboration.
            </p>
          </div>

          {/* Spacer column */}
          <div></div>

          {/* Right side: two quick link columns */}
          <div className="grid grid-cols-2 gap-8">
            {/* Quick Links 1 */}
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {["Landing Page", "Popup Builder", "Web-design", "Content", "Integrations"].map(
                  (item) => (
                    <li key={item}>
                      <Link href="#" className="hover:text-[#4B6CEB] transition">
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Quick Links 2 */}
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {["Landing Page", "Popup Builder", "Web-design", "Content", "Integrations"].map(
                  (item) => (
                    <li key={item}>
                      <Link href="#" className="hover:text-[#4B6CEB] transition">
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section BELOW footer */}
      <div className="mt-16 w-full px-4">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#060426] py-12 px-6 sm:px-10 text-center shadow-2xl">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide mb-6">
            GROW YOUR BUSINESS WITH AI
          </h3>
          <a href="/contacts">
          <button className="px-8 py-3 bg-[#4B6CEB] text-white rounded-full text-sm sm:text-base font-medium hover:bg-[#3653cb] transition">
            Get started
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
