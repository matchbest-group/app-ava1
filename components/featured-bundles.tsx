"use client"

import { useState } from "react"

export function FeaturedBundles() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      name: "Intro",
      price: 123,
      features: [
        { label: "Upload Video up to 720p Resolution", enabled: true },
        { label: "Attachment & Post Scheduling", enabled: false },
        { label: "Set your rates", enabled: false },
        { label: "Exclusive Deals", enabled: false },
        { label: "Advanced Statistics", enabled: false },
      ],
      buttonText: "Choose",
      highlight: false,
    },
    {
      name: "Base",
      price: 123,
      features: [
        { label: "Upload Video with HD Resolution", enabled: true },
        { label: "Attachment & Post Scheduling", enabled: true },
        { label: "Set your rates", enabled: false },
        { label: "Exclusive Deals", enabled: false },
        { label: "Advanced Statistics", enabled: false },
      ],
      buttonText: "Choose",
      highlight: false,
    },
    {
      name: "Pro",
      price: 123,
      features: [
        { label: "Upload Video with HD Resolution", enabled: true },
        { label: "Attachment & Post Scheduling", enabled: true },
        { label: "Set your rates", enabled: true },
        { label: "Exclusive Deals", enabled: true },
        { label: "Advanced Statistics", enabled: false },
      ],
      buttonText: "Try 1 month",
      highlight: true,
      badgeText: "Save $40",
    },
  ]

  return (
    <section
      className="py-20 px-6 sm:px-8 lg:px-12 text-center w-full"
      style={{
        backgroundImage: "url('/bg1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl font-semibold mb-4">
        Simple, Transparent <span className="text-[#4B6CEB]">Pricing</span>.
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
        Choose the plan that fits your business. No hidden fees, cancel anytime.
      </p>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-6 flex flex-col text-left ${
              plan.highlight ? "bg-[#1B1B4B] text-white" : "bg-white"
            }`}
          >
            {plan.highlight && plan.badgeText && (
              <div className="self-end mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-purple-600 text-white">
                {plan.badgeText}
              </div>
            )}
            <h3 className="font-semibold text-lg mb-3 uppercase">{plan.name}</h3>
            <ul className="space-y-1 text-sm">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className={`flex items-center ${
                  plan.highlight
                    ? feature.enabled
                      ? "text-white"
                      : "text-gray-400"
                    : feature.enabled
                    ? "text-black"
                    : "text-gray-400"
                  }`}
                >
                  <svg
                    className={`w-4 h-4 mr-2 flex-shrink-0 ${
                      feature.enabled ? "text-green-500" : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    {feature.enabled ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    )}
                  </svg>
                  {feature.label}
                </li>
              ))}
            </ul>

            {/* Pushes to bottom */}
            <div className="mt-auto">
              <div>
                <span
                  className={`font-bold text-2xl ${
                    plan.highlight ? "text-white" : "text-black"
                  }`}
                >
                  ${plan.price}
                </span>
                <span
                  className={`ml-1 ${
                    plan.highlight ? "text-white" : "text-gray-600"
                  }`}
                >
                  /month
                </span>
              </div>
              <button
                onClick={() => setSelectedPlan(plan.name)}
                className={`mt-6 w-full rounded-md py-2 font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-[#4B6CEB] text-white hover:bg-[#3a56c1]"
                    : "bg-[#E6E8FF] text-[#4B6CEB] hover:bg-[#c5c9f7]"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}

      <blockquote className="mt-16 bg-white max-w-3xl mx-auto rounded-lg p-6 text-lg font-semibold shadow-md">
        “Every plan comes with AI at its core — automate, optimize, and scale smarter.”
      </blockquote>
    </section>
  )
}
