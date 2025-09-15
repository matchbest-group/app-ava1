"use client";

import Image from "next/image";

export function ProductOverview() {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-16 text-center max-w-7xl mx-auto overflow-x-hidden">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
        A full-fledged <span className="text-[#4B6CEB]">AI Suite.</span>
      </h2>
      <p className="text-base sm:text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
        From customer support to billing, CRM, and team collaboration —
        everything you need to grow, powered by AI.
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* AVACX */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 flex flex-col shadow-md">
          <Image src="/logo3.png" alt="AVACX" width={240} height={80} className="mb-8 mx-auto" />
          <h3 className="font-semibold text-3xl mb-6">Reimagine Customer Experience</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8 text-lg">
            <li>AI-powered customer experience platform</li>
            <li>Omni-channel support with chat, email, and voice</li>
            <li>Smart insights to improve customer satisfaction</li>
          </ul>
          <button className="mt-auto py-4 px-6 border border-green-500 rounded-full text-green-600 font-semibold hover:bg-green-500 hover:text-white transition text-lg">
            Explore AVA CX
          </button>
        </div>

        {/* AVAPingora */}
        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-8 flex flex-col shadow-md">
          <Image src="/logo4.png" alt="AVAPingora" width={240} height={80} className="mb-8 mx-auto" />
          <h3 className="font-semibold text-3xl mb-6">Your Digital Office, Reinvented</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8 text-lg">
            <li>Real-time messaging with media and threaded chats</li>
            <li>AI meeting notes with instant summaries and actions</li>
            <li>Effortless file sharing with sync and version control</li>
          </ul>
          <button className="mt-auto py-4 px-6 border border-pink-500 rounded-full text-pink-600 font-semibold hover:bg-pink-500 hover:text-white transition text-lg">
            Explore AVA Pingora
          </button>
        </div>

        {/* AVAFlow */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 flex flex-col shadow-md">
          <Image src="/logo2.png" alt="AVAFlow" width={240} height={80} className="mb-8 mx-auto" />
          <h3 className="font-semibold text-3xl mb-6">AI That Closes Deals Faster</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8 text-lg">
            <li>Unified customer view with complete sales visibility</li>
            <li>Intelligent lead scoring to focus on the hottest deals</li>
            <li>Automated follow-ups so no lead slips away</li>
            <li>Clear sales pipelines for faster decision-making</li>
          </ul>
          <button className="mt-auto py-4 px-6 border border-blue-500 rounded-full text-blue-600 font-semibold hover:bg-blue-500 hover:text-white transition text-lg">
            Explore AVA Flow
          </button>
        </div>

        {/* AVASmartBill */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 flex flex-col shadow-md">
          <Image src="/logo1.png" alt="AVASmartBill" width={240} height={80} className="mb-8 mx-auto" />
          <h3 className="font-semibold text-3xl mb-6">Smarter Billing, Faster Growth</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-8 text-lg">
            <li>Hybrid billing models for any business type</li>
            <li>Automated invoicing to reduce errors and delays</li>
            <li>AI-driven revenue optimization with churn prevention</li>
            <li>Global payments made easy and fully compliant</li>
          </ul>
          <button className="mt-auto py-4 px-6 border border-yellow-500 rounded-full text-yellow-600 font-semibold hover:bg-yellow-500 hover:text-white transition text-lg">
            Explore AVA Smartbill
          </button>
        </div>
      </div>
    </section>
  );
}
