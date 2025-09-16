"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQs } from "@/components/FAQs"
import { GetInTouch } from "@/components/getintouch"

export default function AVACXPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:min-h-[80vh] mb-20">
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
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-16">
              <span className="text-green-600">AI</span> Agent that <br />
              Assists, <span className="text-green-600">Answers</span> <br />
              &amp; Resolves
            </h1>
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

        {/* Subtitle and buttons centered full width */}
        <div className="w-full flex flex-col items-center space-y-4 mt-8 lg:mt-0 lg:absolute lg:bottom-16 lg:left-0 lg:right-0">
          <p className="text-xl sm:text-2xl text-gray-700 font-medium max-w-1xl mb-8">
            AI-driven customer support that's affordable, scalable, and multilingual.
            <br />
            Designed to grow with your business and deliver exceptional customer experiences.
          </p>
          <div className="flex justify-center space-x-10 w-full max-w-md">
            <Link
              href="#"
              className="px-10 py-4 border border-green-600 text-green-600 rounded-md text-lg font-semibold hover:bg-green-50 transition"
            >
              Watch Demo
            </Link>
            <Link
              href="https://matchbest-crm.vercel.app/"
              className="px-10 py-4 bg-green-600 text-white rounded-md text-lg font-semibold hover:bg-green-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* New Section: Why Choose AVA CX */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Why Choose AVA <span className="text-green-600">CX</span>?
        </h2>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avacx/icon2.png"
              alt="24/7 AI Support"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              24/7 AI Support
            </h3>
            <p className="text-sm text-gray-600">
              Always-on customer service that ensures no query is ever missed, no matter the time zone or channel.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avacx/icon3.png"
              alt="Seamless CRM Integration"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Seamless CRM Integration
            </h3>
            <p className="text-sm text-gray-600">
              Instantly syncs with your existing CRM and tools, giving your team a unified and hassle-free workflow.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avacx/icon4.png"
              alt="Multi-Channel Engagement"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Multi-Channel Engagement
            </h3>
            <p className="text-sm text-gray-600">
              Always-on customer service that ensures no query is ever missed, no matter the time zone or channel.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avacx/icon5.png"
              alt="Smart Conversations"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Smart Conversations
            </h3>
            <p className="text-sm text-gray-600">
              AI that continuously learns from interactions, providing faster, more accurate, and personalized responses over time.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avacx/icon6.png"
              alt="Data-Driven Insights"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Data-Driven Insights
            </h3>
            <p className="text-sm text-gray-600">
              Get analytics on customer queries, satisfaction, and trends.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
            <Image
              src="/avacx/icon7.png"
              alt="Scalable & Reliable"
              width={40}
              height={40}
              className=""
            />
            <h3 className="font-bold text-lg">
              Scalable &amp; Reliable
            </h3>
            <p className="text-sm text-gray-600">
              Easily scale as your business grows without losing quality.
            </p>
          </div>
        </div>

        {/* Call to action box */}
        <div className="container mx-auto bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-10 text-center shadow-md">
          <h3 className="text-2xl font-extrabold mb-4">
            Smarter Customer Experience with AVA CX
          </h3>
          <p className="text-gray-700 mb-6">
            AVA CX helps you engage customers across channels, provide instant AI-powered support, and unlock data-driven insights — all in one place.
          </p>
          <button className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition">
            See How It Works
          </button>
        </div>
      </section>

      {/* New Section: See AVA CX in Action */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          See AVA <span className="text-green-600">CX</span> in Action
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Watch how AVA CX transforms customer interactions with real-time AI, automation, and multi-channel support.
        </p>
        <div className="mx-auto max-w-5xl rounded-lg overflow-hidden shadow-lg">
          <video
            src="/video1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
            aria-label="AVA CX demo video"
          />
        </div>
      </section>

      {/* New Section: AI-Powered Voice Support */}
      <section className="w-full bg-[#02022A] text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side text and buttons */}
          <div className="flex-1 max-w-lg space-y-8">
            <h2 className="text-3xl font-extrabold">
              <span className="text-green-500">AI-Powered</span> Voice Support at a <br />
              Fraction of Human Cost
            </h2>
            <p className="text-gray-300 max-w-md">
              Handle customer calls 24/7 with an intelligent voice agent that delivers instant, accurate responses. Reduce support costs, improve response times, and scale effortlessly — without adding headcount.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <button className="border border-green-500 rounded-md py-3 font-semibold hover:bg-green-600 transition">
                Always-On Support
              </button>
              <button className="border border-green-500 rounded-md py-3 font-semibold hover:bg-green-600 transition">
                AI-Driven Accuracy
              </button>
              <button className="border border-green-500 rounded-md py-3 font-semibold hover:bg-green-600 transition">
                Cost-Efficient
              </button>
              <button className="border border-green-500 rounded-md py-3 font-semibold hover:bg-green-600 transition">
                Seamless Integration
              </button>
            </div>
          </div>

          {/* Right side image */}
          <div className="flex-1 max-w-md">
            <img
              src="/avacx/image.png"
              alt="AI Voice Support"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-3xl font-extrabold text-white mb-8 text-center">
            Flexible <span className="text-green-500">Pricing</span>
          </h3>
          <table className="w-full text-white text-left border-collapse">
            <thead>
              <tr className="border-b border-green-500">
                <th className="py-3 px-4">Monthly Calls</th>
                <th className="py-3 px-4">AVA CX Price</th>
                <th className="py-3 px-4">Human Agent Cost</th>
                <th className="py-3 px-4">Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-green-700">
                <td className="py-3 px-4">100 Calls</td>
                <td className="py-3 px-4">$37</td>
                <td className="py-3 px-4">$100</td>
                <td className="py-3 px-4 text-green-500">$67</td>
              </tr>
              <tr className="border-b border-green-700">
                <td className="py-3 px-4">500 Calls</td>
                <td className="py-3 px-4">$180</td>
                <td className="py-3 px-4">$500</td>
                <td className="py-3 px-4 text-green-500">$320</td>
              </tr>
              <tr className="border-b border-green-700">
                <td className="py-3 px-4">1000 Calls</td>
                <td className="py-3 px-4">$353</td>
                <td className="py-3 px-4">$1000</td>
                <td className="py-3 px-4 text-green-500">$647</td>
              </tr>
              <tr>
                <td className="py-3 px-4">2000+ Calls</td>
                <td className="py-3 px-4">$692</td>
                <td className="py-3 px-4">$2000</td>
                <td className="py-3 px-4 text-green-500">$1308</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <FAQs />
      <GetInTouch />
      <Footer />
    </main>
  )
}