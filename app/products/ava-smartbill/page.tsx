"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQs } from "@/components/FAQs"
import { GetInTouch } from "@/components/getintouch"

export default function AVASmartbillPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-[4rem] pb-4 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 lg:min-h-[80vh] mb-[4rem]">
        {/* Left side */}
        <div className="flex-1 w-full max-w-lg flex flex-col justify-center order-2 lg:order-1">
          {/* Top left logo */}
          <div className="mb-6 lg:mb-10">
            <Image
              src="/logo1.png"
              alt="AVA Smart Logo"
              width={180}
              height={50}
              className="sm:w-[220px] sm:h-[60px]"
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6 lg:mb-5">
            <span className="text-yellow-600">Bill</span>, Subscribe <br /> <span className="ms-[10rem]">&</span><br />
            Scale <span className="text-yellow-600">Seamlessly</span> <br />

          </h1>
        </div>

        {/* Right side image */}
        <div className="flex-1 w-full max-w-md flex justify-center order-1 lg:order-2">
          <Image
            src="/avasmart/icon1.png"
            alt="AVA SmartBill Icon"
            width={300}
            height={300}
            className="sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]"
            priority
          />
        </div>
      </div>

      {/* Subtitle and buttons centered full width */}
      <div className="w-full flex flex-col items-center space-y-4 mt-4 lg:mt-5 lg:absolute lg:bottom-10 lg:left-0 lg:right-0">
        <p className="text-md sm:text-md lg:text-md text-gray-700 font-medium max-w-4xl text-center px-4">
          A future-ready billing platform that blends flexibility, automation, and AI to power global
          <br className="hidden sm:block" />
          payments and revenue growth for modern businesses.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 w-full max-w-md px-4">
          <Link
            href="https://master.d398n21nztipdq.amplifyapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-10 py-3 sm:py-4 border border-yellow-600 text-yellow-600 rounded-md text-base sm:text-lg font-semibold hover:bg-yellow-50 transition text-center"
          >
            Watch Demo
          </Link>
          <Link
            href="/pricing"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-yellow-600 text-white rounded-md text-base sm:text-lg font-semibold hover:bg-yellow-700 transition text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
      </div>

      {/* New Section: Why Choose AVA SmartBill */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-4xl font-extrabold text-center mb-12">
        Why Choose AVA <span className="text-yellow-600">SmartBill</span>?
      </h2>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Feature 1 */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
          <Image
            src="/avasmart/icon2.png"
            alt="Flexible Billing Models"
            width={40}
            height={40}
            className=""
          />
          <div className="text-center">
            <h3 className="font-bold text-lg mb-1">Flexible Billing Models</h3>
            <p className="text-sm text-gray-600">
              Support hybrid billing structures — from one-time payments to subscriptions — tailored for your business.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
          <Image
            src="/avasmart/icon3.png"
            alt="Automated Invoicing"
            width={40}
            height={40}
            className=""
          />
          <div className="text-center">
            <h3 className="font-bold text-lg mb-1">Automated Invoicing</h3>
            <p className="text-sm text-gray-600">
              Generate error-free invoices instantly with AI-powered automation that saves time.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
          <Image
            src="/avasmart/icon4.png"
            alt="AI Revenue Optimization"
            width={40}
            height={40}
            className=""
          />
          <div className="text-center">
            <h3 className="font-bold text-lg mb-1">AI Revenue Optimization</h3>
            <p className="text-sm text-gray-600">
              Predict churn, retry failed payments smartly, and maximize revenue with AI-driven insights.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
          <Image
            src="/avasmart/icon5.png"
            alt="Global Payments"
            width={40}
            height={40}
            className=""
          />
          <div className="text-center">
            <h3 className="font-bold text-lg mb-1">Global Payments</h3>
            <p className="text-sm text-gray-600">
              Accept payments worldwide with built-in compliance and localized pricing strategies.
            </p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
          <Image
            src="/avasmart/icon6.png"
            alt="Smart Retry Logic"
            width={40}
            height={40}
            className=""
          />
          <div className="text-center">
            <h3 className="font-bold text-lg mb-1">Smart Retry Logic</h3>
            <p className="text-sm text-gray-600">
              Reduce failed transactions with intelligent retry cycles that improve customer retention.
            </p>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
          <Image
            src="/avasmart/icon7.png"
            alt="Scalable & Secure"
            width={40}
            height={40}
            className=""
          />
          <div className="text-center">
            <h3 className="font-bold text-lg mb-1">Scalable &amp; Secure</h3>
            <p className="text-sm text-gray-600">
              Enterprise-grade security and architecture that grows seamlessly with your business.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action box */}
      <div className="container mx-auto bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg p-10 text-center shadow-md">
        <h3 className="text-2xl font-extrabold mb-4">
          Smarter Billing with AVA SmartBill
        </h3>
        <p className="text-gray-700 mb-6">
          AVA SmartBill takes the complexity out of billing and revenue management. From automated invoicing to AI-driven optimization, it ensures your business collects faster, scales smarter, and grows globally.
        </p>
        <Link
          href="https://master.d398n21nztipdq.amplifyapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition inline-block"
        >
          See How It Works
        </Link>
      </div>
    </section>

    {/* New Section: See AVA SmartBill in Action */}
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-7 text-center">
      <h2 className="text-4xl font-extrabold mb-4">
        See AVA <span className="text-yellow-600">SmartBill</span> in Action
      </h2>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
        Watch how AVA SmartBill transforms billing with AI automation, intelligent retries, and global-ready payments — all in one platform.
      </p>
      <div className="mx-auto max-w-5xl rounded-lg overflow-hidden shadow-lg">
        <video
          src="/video4.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
          aria-label="AVA SmartBill demo video"
        />
      </div>
    </section>
    <FAQs />
    <GetInTouch />
    <Footer />
    </main>
  )
}
