"use client"

import Image from "next/image"

export function ProductOverview() {
  return (
    <section className="py-20 px-6 sm:px-8 lg:px-12 text-center max-w-7xl mx-auto">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl font-semibold mb-4">
        A full-fledged <span className="text-[#4B6CEB]">AI Suite.</span>
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
        From customer support to billing, CRM, and team collaboration — everything you need to grow, powered by AI.
      </p>

      {/* Product Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* AVACX Box */}
        <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center text-left shadow-lg border border-green-300">
          <div className="mb-3">
            <Image src="/logo3.png" alt="AVACX Logo" width={120} height={60} />
          </div>
          <h3 className="font-semibold text-base mb-2">Reimagine Customer Experience</h3>
          <ul className="list-disc list-inside text-xs mb-4 space-y-1">
            <li>AI-powered customer experience platform</li>
            <li>Omni-channel support with chat, email, and voice</li>
            <li>Smart insights to improve customer satisfaction</li>
          </ul>
          <button className="mt-auto px-6 py-2 border border-green-600 rounded-full text-green-600 text-xs hover:bg-green-600 hover:text-white transition w-max">
            Explore AVA CX
          </button>
        </div>

        {/* AVAPingora Box */}
        <div className="bg-pink-100 rounded-xl p-6 flex flex-col items-center text-left shadow-lg border border-pink-300">
          <div className="mb-3">
            <Image src="/logo4.png" alt="AVAPingora Logo" width={120} height={60} />
          </div>
          <h3 className="font-semibold text-base mb-2">Your Digital Office, Reinvented</h3>
          <ul className="list-disc list-inside text-xs mb-4 space-y-1">
            <li>Real-time messaging with media and threaded chats.</li>
            <li>AI meeting notes with instant summaries and actions.</li>
            <li>Effortless file sharing with sync and version control.</li>
          </ul>
          <button className="mt-auto px-6 py-2 border border-pink-600 rounded-full text-pink-600 text-xs hover:bg-pink-600 hover:text-white transition w-max">
            Explore AVA Pingora
          </button>
        </div>

        {/* AVAFlow Box */}
        <div className="bg-blue-100 rounded-xl p-6 flex flex-col items-center text-left shadow-lg border border-blue-300">
          <div className="mb-3">
            <Image src="/logo2.png" alt="AVAFlow Logo" width={120} height={60} />
          </div>
          <h3 className="font-semibold text-base mb-2">AI That Closes Deals Faster</h3>
          <ul className="list-disc list-inside text-xs mb-4 space-y-1">
            <li>Unified customer view with complete sales visibility.</li>
            <li>Intelligent lead scoring to focus on the hottest deals.</li>
            <li>Automated follow-ups so no lead slips away.</li>
            <li>Clear sales pipelines for faster decision-making.</li>
          </ul>
          <button className="mt-auto px-6 py-2 border border-blue-600 rounded-full text-blue-600 text-xs hover:bg-blue-600 hover:text-white transition w-max">
            Explore AVA Flow
          </button>
        </div>

        {/* AVASmartBill Box */}
        <div className="bg-yellow-100 rounded-xl p-6 flex flex-col items-center text-left shadow-lg border border-yellow-300">
          <div className="mb-3">
            <Image src="/logo1.png" alt="AVASmartBill Logo" width={120} height={60} />
          </div>
          <h3 className="font-semibold text-base mb-2">Smarter Billing, Faster Growth</h3>
          <ul className="list-disc list-inside text-xs mb-4 space-y-1">
            <li>Hybrid billing models for any business type.</li>
            <li>Automated invoicing to reduce errors and delays.</li>
            <li>AI-driven revenue optimization with churn prevention.</li>
            <li>Global payments made easy and fully compliant.</li>
          </ul>
          <button className="mt-auto px-6 py-2 border border-yellow-600 rounded-full text-yellow-600 text-xs hover:bg-yellow-600 hover:text-white transition w-max">
            Explore AVA Smartbill
          </button>
        </div>
      </div>
    </section>
  )
}
