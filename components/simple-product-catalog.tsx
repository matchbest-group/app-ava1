"use client"

import Image from "next/image"
import { Button } from "./ui/button"

export function SimpleProductCatalog() {
  return (
    <>
      {/* Hero section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="space-y-6 text-left">
            <h1 className="text-5xl sm:text-6xl font-semibold leading-snug mb-6">
              Discover the
              <br />
              Power of{" "}
              <span className="text-[#4B6CEB]">AVA</span> Suite
            </h1>
            <p className="text-lg sm:text-xl text-black mb-6 max-w-2xl">
              One AI-powered ecosystem — AVA CX, AVA Flow, AVA Pingora, and AVA Smart Bill — built to transform the way your business works.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline">Explore Products</Button>
              <Button>Contact Us</Button>
            </div>
          </div>

          {/* Right side image */}
          <div className="flex justify-center">
            <Image
              src="/side1.png"
              alt="Product Visual"
              width={500}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* section 1 - Image on Right */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side logo and text */}
          <div className="space-y-6">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo3.png"
                alt="AVA CX Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
            <h2 className="text-4xl font-bold leading-tight max-w-md text-green-900">
              Your <span className="text-green-400">AI-Powered</span> Customer Support Agent
            </h2>
            <ul className="space-y-6 max-w-md text-gray-900">
              <li>
                <strong>Seamless Integration:</strong><br />
                Works effortlessly with your CRM & tools.
              </li>
              <li>
                <strong>Always Available:</strong><br />
                24/7 multilingual support across channels.
              </li>
              <li>
                <strong>Smarter Conversations:</strong><br />
                AI that learns, improves, and reduces support load.
              </li>
              <li>
                <strong>Instant Insights:</strong><br />
                Track customer interactions with AI-driven analytics.
              </li>
            </ul>
          </div>

          {/* Right side image */}
          <div className="flex justify-center">
            <Image
              src="/rec/image1.png"
              alt="Product Visual"
              width={600}
              height={400}
              className="object-contain rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* section 3 - Image on Left */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side image */}
          <div className="flex justify-center">
            <Image
              src="/rec/image3.png"
              alt="Product Visual"
              width={600}
              height={400}
              className="object-contain rounded-3xl shadow-lg"
            />
          </div>

          {/* Right side logo and text */}
          <div className="space-y-6">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo4.png"
                alt="AVA pingora Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
            <h2 className="text-4xl font-bold leading-tight max-w-md text-pink-900">
              Your <span className="text-pink-400">Intelligent Business</span> Communication Hub
            </h2>
            <ul className="space-y-6 max-w-md text-gray-900">
              <li>
                <strong>Unified Connectivity:</strong><br />
                Integrate chats, emails, and calls in one powerful dashboard.
              </li>
              <li>
                <strong>Always Responsive:</strong><br />
                AI ensures instant replies and smart follow-ups.
              </li>
              <li>
                <strong>Smarter Interactions:</strong><br />
                Understands context to improve customer relationships.
              </li>
              <li>
                <strong>Data-Driven Growth:</strong><br />
                Gain actionable insights with communication analytics.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* section 4 - Image on Right */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side logo and text */}
          <div className="space-y-6">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo2.png"
                alt="AVA flow Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
            <h2 className="text-4xl font-bold leading-tight max-w-md text-blue-900">
              Your <span className="text-blue-400">AI-Driven</span> Workflow Automation Platform
            </h2>
            <ul className="space-y-6 max-w-md text-gray-900">
              <li>
                <strong>Seamless Integration:</strong><br />
                Connect your tools, automate repetitive tasks, and save time.
              </li>
              <li>
                <strong>Always Efficient:</strong><br />
                AI ensures smooth process execution with no downtime.
              </li>
              <li>
                <strong>Smarter Workflows:</strong><br />
                Optimize operations through intelligent task routing.
              </li>
              <li>
                <strong>Instant Visibility:</strong><br />
                Track team performance with real-time automation insights.
              </li>
            </ul>
          </div>

          {/* Right side image */}
          <div className="flex justify-center">
            <Image
              src="/rec/image4.png"
              alt="Product Visual"
              width={600}
              height={400}
              className="object-contain rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* section 2 - AVA SmartBill - Image on Left */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side image */}
          <div className="flex justify-center">
            <Image
              src="/rec/image2.png"
              alt="Product Visual"
              width={600}
              height={400}
              className="object-contain rounded-3xl shadow-lg"
            />
          </div>

          {/* Right side logo and text */}
          <div className="space-y-6">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo1.png"
                alt="AVA smart bill Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
            <h2 className="text-4xl font-bold leading-tight max-w-md text-yellow-900">
              Your <span className="text-yellow-400">AI-Powered</span> Billing & Invoicing Assistant
            </h2>
            <ul className="space-y-6 max-w-md text-gray-900">
              <li>
                <strong>Seamless Management:</strong><br />
                Automate billing, invoicing, and payment tracking with ease.
              </li>
              <li>
                <strong>Always Accurate:</strong><br />
                Smart validation ensures zero manual errors.
              </li>
              <li>
                <strong>Faster Operations:</strong><br />
                Generate, send, and reconcile bills in seconds.
              </li>
              <li>
                <strong>Real-Time Insights:</strong><br />
                Monitor cash flow and performance with AI-driven analytics.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
