"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Custom hook for individual element animations
function useElementAnimation(delay = 0) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [delay])

  return { elementRef, isVisible }
}

// Loading Button Component
function LoadingButton({ 
  href, 
  children, 
  className, 
  loadingText = "Loading..." 
}: { 
  href: string; 
  children: React.ReactNode; 
  className: string; 
  loadingText?: string;
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      router.push(href)
    }, 800)
  }

  return (
    <button 
      onClick={handleClick}
      disabled={isLoading}
      className={`${className} ${isLoading ? 'cursor-not-allowed opacity-75' : 'hover:scale-105 hover:shadow-xl'} relative overflow-hidden transition-all duration-300`}
    >
      <div className={`flex items-center justify-center transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">{loadingText}</span>
          </div>
        </div>
      )}
    </button>
  )
}

export function ProductOverview() {
  // Individual element animations
  const titleAnimation = useElementAnimation(0)
  const subtitleAnimation = useElementAnimation(200)
  const card1Animation = useElementAnimation(400)
  const card2Animation = useElementAnimation(600)
  const card3Animation = useElementAnimation(800)
  const card4Animation = useElementAnimation(1000)

  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 text-center max-w-7xl mx-auto overflow-x-hidden">
      {/* Heading - Slides in from top */}
      <div 
        ref={titleAnimation.elementRef}
        className={`transition-all duration-1000 ease-out ${
          titleAnimation.isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-10 scale-95'
        }`}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
          A full-fledged <span className="text-[#4B6CEB]">AI Suite.</span>
        </h2>
      </div>

      {/* Subtitle - Fades in from bottom */}
      <div 
        ref={subtitleAnimation.elementRef}
        className={`transition-all duration-1000 ease-out ${
          subtitleAnimation.isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-base sm:text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
          From customer support to billing, CRM, and team collaboration —
          everything you need to grow, powered by AI.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* AVACX Card - Slides in from LEFT */}
        <div 
          ref={card1Animation.elementRef}
          className={`bg-green-50 border border-green-200 rounded-2xl p-8 flex flex-col shadow-md transition-all duration-1000 ease-out ${
            card1Animation.isVisible 
              ? 'opacity-100 translate-x-0 rotate-0 scale-100' 
              : 'opacity-0 -translate-x-20 -rotate-3 scale-95'
          }`}
        >
          <Image src="/logo3.png" alt="AVACX" width={240} height={80} className="mb-8 mx-auto" />
          <h3 className="font-semibold text-3xl mb-6">Reimagine Customer Experience</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8 text-lg">
            <li>AI-powered customer experience platform</li>
            <li>Omni-channel support with chat, email, and voice</li>
            <li>Smart insights to improve customer satisfaction</li>
          </ul>
          <LoadingButton 
            href="/products/ava-cx"
            className="mt-auto py-4 px-6 border border-green-500 rounded-full text-green-600 font-semibold text-lg w-full group relative overflow-hidden"
            loadingText="Loading AVA CX..."
          >
            {/* Color loading background */}
            <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>
            <span className="relative flex items-center justify-center group-hover:scale-110 group-hover:text-white transition-all duration-300 z-10">
              Explore AVA CX
            </span>
          </LoadingButton>
        </div>

        {/* AVAPingora Card - Slides in from RIGHT */}
        <div 
          ref={card2Animation.elementRef}
          className={`bg-pink-50 border border-pink-200 rounded-2xl p-8 flex flex-col shadow-md transition-all duration-1000 ease-out ${
            card2Animation.isVisible 
              ? 'opacity-100 translate-x-0 rotate-0 scale-100' 
              : 'opacity-0 translate-x-20 rotate-3 scale-95'
          }`}
        >
          <Image src="/logo4.png" alt="AVAPingora" width={240} height={80} className="mb-8 mx-auto" />
          <h3 className="font-semibold text-3xl mb-6">Your Digital Office, Reinvented</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8 text-lg">
            <li>Real-time messaging with media and threaded chats</li>
            <li>AI meeting notes with instant summaries and actions</li>
            <li>Effortless file sharing with sync and version control</li>
          </ul>
          <LoadingButton 
            href="/products/ava-pingora"
            className="mt-auto py-4 px-6 border border-pink-500 rounded-full text-pink-600 font-semibold text-lg w-full group relative overflow-hidden"
            loadingText="Loading Pingora..."
          >
            {/* Color loading background */}
            <div className="absolute inset-0 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>
            <span className="relative flex items-center justify-center group-hover:scale-110 group-hover:text-white transition-all duration-300 z-10">
              Explore AVA Pingora
            </span>
          </LoadingButton>
        </div>

        {/* AVAFlow Card - Slides in from BOTTOM LEFT */}
        <div 
          ref={card3Animation.elementRef}
          className={`bg-blue-50 border border-blue-200 rounded-2xl p-8 flex flex-col shadow-md transition-all duration-1000 ease-out ${
            card3Animation.isVisible 
              ? 'opacity-100 translate-x-0 translate-y-0 rotate-0 scale-100' 
              : 'opacity-0 -translate-x-16 translate-y-16 -rotate-2 scale-90'
          }`}
        >
          <Image src="/logo2.png" alt="AVAFlow" width={240} height={80} className="mb-8 mx-auto" />
          <h3 className="font-semibold text-3xl mb-6">AI That Closes Deals Faster</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8 text-lg">
            <li>Unified customer view with complete sales visibility</li>
            <li>Intelligent lead scoring to focus on the hottest deals</li>
            <li>Automated follow-ups so no lead slips away</li>
            <li>Clear sales pipelines for faster decision-making</li>
          </ul>
          <LoadingButton 
            href="/products/ava-flow"
            className="mt-auto py-4 px-6 border border-blue-500 rounded-full text-blue-600 font-semibold text-lg w-full group relative overflow-hidden"
            loadingText="Loading Flow..."
          >
            {/* Color loading background */}
            <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>
            <span className="relative flex items-center justify-center group-hover:scale-110 group-hover:text-white transition-all duration-300 z-10">
              Explore AVA Flow
            </span>
          </LoadingButton>
        </div>

        {/* AVASmartBill Card - Slides in from BOTTOM RIGHT */}
        <div 
          ref={card4Animation.elementRef}
          className={`bg-yellow-50 border border-yellow-200 rounded-2xl p-8 flex flex-col shadow-md transition-all duration-1000 ease-out ${
            card4Animation.isVisible 
              ? 'opacity-100 translate-x-0 translate-y-0 rotate-0 scale-100' 
              : 'opacity-0 translate-x-16 translate-y-16 rotate-2 scale-90'
          }`}
        >
          <Image src="/logo1.png" alt="AVASmartBill" width={240} height={80} className="mb-8 mx-auto" />
          <h3 className="font-semibold text-3xl mb-6">Smarter Billing, Faster Growth</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8 text-lg">
            <li>Hybrid billing models for any business type</li>
            <li>Automated invoicing to reduce errors and delays</li>
            <li>AI-driven revenue optimization with churn prevention</li>
            <li>Global payments made easy and fully compliant</li>
          </ul>
          <LoadingButton 
            href="/products/ava-smartbill"
            className="mt-auto py-4 px-6 border border-yellow-500 rounded-full text-yellow-600 font-semibold text-lg w-full group relative overflow-hidden"
            loadingText="Loading Smartbill..."
          >
            {/* Color loading background */}
            <div className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full"></div>
            <span className="relative flex items-center justify-center group-hover:scale-110 group-hover:text-white transition-all duration-300 z-10">
              Explore AVA Smartbill
            </span>
          </LoadingButton>
        </div>
      </div>
    </section>
  );
}
