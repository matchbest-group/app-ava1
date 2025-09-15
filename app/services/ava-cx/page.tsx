"use client"

import Image from "next/image"
import Link from "next/link"

export default function AVACXPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:min-h-[80vh]">
        {/* Left side */}
        <div className="flex-1 w-full max-w-lg flex flex-col justify-center">
          {/* Top left logo */}
          <div className="mb-10">
            <Image
              src="/logo3.png"
              alt="AVA CX Logo"
              width={220}
              height={60}
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-8">
            <span className="text-green-600">AI</span> Agent that <br />
            Assists, <span className="text-green-600">Answers</span> <br />
            &amp; Resolves
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-lg mb-10 max-w-md">
            AI-driven customer support that's affordable, scalable, and multilingual. 
            Designed to grow with your business and deliver exceptional customer experiences.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Link
              href="#"
              className="px-6 py-3 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition"
            >
              Watch Demo
            </Link>
            <Link
              href="#"
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Right side image */}
        <div className="flex-1 w-full max-w-md flex justify-center">
          <Image
            src="/avacx/icon1.png"
            alt="AVACX Icon"
            width={400}
            height={400}
            priority
          />
        </div>
      </div>
    </main>
  )
}
