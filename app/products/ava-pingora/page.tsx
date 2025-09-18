"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQs } from "@/components/FAQs"
import { GetInTouch } from "@/components/getintouch"

export default function AVAPingoraPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 lg:min-h-[80vh] mb-20">
        {/* Left side */}
        <div className="flex-1 w-full max-w-lg flex flex-col justify-center order-2 lg:order-1">
          {/* Top left logo */}
          <div className="mb-6 lg:mb-10">
            <Image
              src="/logo4.png"
              alt="AVA Pingora Logo"
              width={180}
              height={50}
              className="sm:w-[220px] sm:h-[60px]"
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-8 lg:mb-16">
            <span className="text-pink-600">Connect</span> <br />
            Collaborate & Grow <span className="text-pink-600">Seamlessly</span> <br />

          </h1>
        </div>

        {/* Right side image */}
        <div className="flex-1 w-full max-w-md flex justify-center order-1 lg:order-2">
          <Image
            src="/avapingora/icon1.png"
            alt="AVA Pingora Icon"
            width={300}
            height={300}
            className="sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px]"
            priority
          />
        </div>
      </div>

      {/* Subtitle and buttons centered full width */}
      <div className="w-full flex flex-col items-center space-y-4 mt-8 lg:mt-0 lg:absolute lg:bottom-16 lg:left-0 lg:right-0">
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-medium max-w-4xl text-center mb-8 px-4">
          An AI-powered digital office that unifies communication, boosts collaboration, and scales
          <br className="hidden sm:block" />
          effortlessly — designed for the modern workplace.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 w-full max-w-md px-4">
          <Link
            href="#"
            className="px-6 sm:px-10 py-3 sm:py-4 border border-pink-600 text-pink-600 rounded-md text-base sm:text-lg font-semibold hover:bg-pink-50 transition text-center"
          >
            Watch Demo
          </Link>
          <Link
            href="https://pingora.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-10 py-3 sm:py-4 bg-pink-600 text-white rounded-md text-base sm:text-lg font-semibold hover:bg-pink-700 transition text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
      </div>

      {/* New Section: Why Choose AVA Pingora */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 className="text-4xl font-extrabold text-center mb-12">
      Why Choose AVA <span className="text-pink-600">Pingora</span>?
    </h2>

    {/* Features grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {/* Feature 1 */ }
      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
        <Image
          src="/avapingora/icon2.png"
          alt="Real-Time Messaging"
          width={40}
          height={40}
          className=""
        />
        <div className="text-center">
          <h3 className="font-bold text-lg mb-1">Real-Time Messaging</h3>
          <p className="text-sm text-gray-600">
            Instant communication with threaded chats, media sharing, and notifications that keep teams connected.
          </p>
        </div>
      </div>

      {/* Feature 2 */ }
      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
        <Image
          src="/avapingora/icon3.png"
          alt="File Sharing & Sync"
          width={40}
          height={40}
          className=""
        />
        <div className="text-center">
          <h3 className="font-bold text-lg mb-1">File Sharing & Sync</h3>
          <p className="text-sm text-gray-600">
            Effortless collaboration on documents with version control and cloud sync across devices.
          </p>
        </div>
      </div>

      {/* Feature 3 */ }
      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
        <Image
          src="/avapingora/icon4.png"
          alt="Attendance Tracking"
          width={40}
          height={40}
          className=""
        />
        <div className="text-center">
          <h3 className="font-bold text-lg mb-1">Attendance Tracking</h3>
          <p className="text-sm text-gray-600">
            Smart attendance and productivity analytics for hybrid and remote teams.
          </p>
        </div>
      </div>

      {/* Feature 4 */ }
      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
        <Image
          src="/avapingora/icon5.png"
          alt="AI Meeting Notes"
          width={40}
          height={40}
          className=""
        />
        <div className="text-center">
          <h3 className="font-bold text-lg mb-1">AI Meeting Notes</h3>
          <p className="text-sm text-gray-600">
            Automatic transcription and summarization of every meeting, so your team never misses key points.
          </p>
        </div>
      </div>

      {/* Feature 5 */ }
      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
        <Image
          src="/avapingora/icon6.png"
          alt="Seamless Integration"
          width={40}
          height={40}
          className=""
        />
        <div className="text-center">
          <h3 className="font-bold text-lg mb-1">Seamless Integration</h3>
          <p className="text-sm text-gray-600">
            Works perfectly with AVA Flow & AVA CX, creating a unified digital ecosystem for your business.
          </p>
        </div>
      </div>

      {/* Feature 6 */ }
      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4 shadow-sm">
        <Image
          src="/avapingora/icon7.png"
          alt="Enterprise Security"
          width={40}
          height={40}
          className=""
        />
        <div className="text-center">
          <h3 className="font-bold text-lg mb-1">Enterprise Security</h3>
          <p className="text-sm text-gray-600">
            Bank-grade encryption and compliance ensure your data stays safe at every level.
          </p>
        </div>
      </div>
    </div>

    {/* Call to action box */}
    <div className="container mx-auto bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg p-10 text-center shadow-md">
      <h3 className="text-2xl font-extrabold mb-4">
        Smarter Workspaces with AVA Pingora
      </h3>
      <p className="text-gray-700 mb-6">
        AVA Pingora empowers your teams to collaborate smarter, communicate faster, and work more productively — all in one secure AI-powered workspace.
      </p>
      <button className="px-6 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition">
        See How It Works
      </button>
    </div>
    </section>

    {/* New Section: See AVA Pingora in Action */}
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-4xl font-extrabold mb-4">
        See AVA <span className="text-pink-600">Pingora</span> in Action
      </h2>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
        Watch how AVA Pingora transforms your digital office with real-time chat, AI-driven meeting notes, and seamless collaboration tools.
      </p>
      <div className="mx-auto max-w-5xl rounded-lg overflow-hidden shadow-lg">
        <video
          src="/video3.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
          aria-label="AVA Pingora demo video"
        />
      </div>
    </section>
    <FAQs />
    <GetInTouch />
    <Footer />
    </main>
  )
}