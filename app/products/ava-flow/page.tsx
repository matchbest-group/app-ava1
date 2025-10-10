"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQs } from "@/components/FAQs"
import { GetInTouch } from "@/components/getintouch"

export default function AVAflowPage() {
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
              src="/logo2.png"
              alt="AVA Flow Logo"
              width={180}
              height={50}
              className="sm:w-[220px] sm:h-[60px]"
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6 lg:mb-5">
            <span className="text-blue-600">AVA</span> Flow – AI CRM that Accelerates<br />
             <span className="text-blue-600">Growth</span>

          </h1>
        </div>

        {/* Right side image */}
        <div className="flex-1 w-full max-w-md flex justify-center order-1 lg:order-2">
          <Image
            src="/avaflow/icon1.png"
            alt="AVA Flow Icon"
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
          AI-powered CRM designed to simplify sales, automate follow-ups, and maximize conversions —
          <br className="hidden sm:block" />
          all without complexity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 w-full max-w-md px-4">
          <Link
            href="#"
            className="px-6 sm:px-10 py-3 sm:py-4 border border-blue-600 text-blue-600 rounded-md text-base sm:text-lg font-semibold hover:bg-blue-50 transition text-center"
          >
            Watch Demo
          </Link>
          <Link
            href="/pricing"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-blue-600 text-white rounded-md text-base sm:text-lg font-semibold hover:bg-blue-700 transition text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
      </div>

      {/* New Section: Why Choose AVA Flow */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Why Choose AVA <span className="text-blue-600">Flow</span>?
        </h2>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avaflow/icon2.png"
              alt="Unified View"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Unified View
            </h3>
            <p className="text-sm text-gray-600">
              Get a 360° view of every lead and customer across all your channels in one dashboard.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avaflow/icon3.png"
              alt="Auto Follow-ups"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Auto Follow-ups
            </h3>
            <p className="text-sm text-gray-600">
              Never miss a lead — AVA Flow automatically schedules smart reminders and sends follow-ups at the right time.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avaflow/icon4.png"
              alt="Smart Scoring"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Smart Scoring
            </h3>
            <p className="text-sm text-gray-600">
              AI identifies your hottest deals by analyzing lead engagement and purchase intent.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avaflow/icon5.png"
              alt="Clean Pipelines"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Clean Pipelines
            </h3>
            <p className="text-sm text-gray-600">
              Crystal-clear visibility into every stage of your sales funnel for faster deal closures.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avaflow/icon6.png"
              alt="AI Nudges"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              AI Nudges
            </h3>
            <p className="text-sm text-gray-600">
              Intelligent prompts help sales teams take the right action at the right moment.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avaflow/icon7.png"
              alt="Scalable & Reliable"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Scalable &amp; Reliable
            </h3>
            <p className="text-sm text-gray-600">
              Enterprise-grade security and performance designed to grow with your business.
            </p>
          </div>
        </div>

        {/* Call to action box */}
        <div className="container mx-auto bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-10 text-center shadow-md">
          <h3 className="text-2xl font-extrabold mb-4">
            Smarter Sales Management with AVA Flow
          </h3>
          <p className="text-gray-700 mb-6">
            AVA Flow helps your sales teams close deals faster with intelligent automation, AI-driven insights, and a streamlined CRM built for growth.
          </p>
          <button className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition">
            See How It Works
          </button>
        </div>
      </section>

      {/* New Section: See AVA Flow in Action */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-7 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          See AVA <span className="text-blue-600">Flow</span> in Action
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Watch how AVA Flow automates sales processes, boosts conversions, and gives you crystal-clear visibility into your pipeline.
        </p>
        <div className="mx-auto max-w-5xl rounded-lg overflow-hidden shadow-lg">
          <video
            src="/video2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
            aria-label="AVA Flow demo video"
          />
        </div>
      </section>
      <FAQs />
      <GetInTouch />
      <Footer />
    </main>
  )
}
