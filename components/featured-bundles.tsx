"use client"

import { useState } from "react"

export function FeaturedBundles() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const plans = [
    {
      name: "Basic",
      price: 49,
      features: [
        { label: "Basic support and updates", enabled: true },
        { label: "Access to core features", enabled: true },
        { label: "Limited customization", enabled: false },
        { label: "Community access", enabled: false },
        { label: "Monthly reports", enabled: false },
      ],
      buttonText: "Choose Basic",
      highlight: false,
    },
    {
      name: "Pro",
      price: 99,
      features: [
        { label: "Priority support and updates", enabled: true },
        { label: "Access to all features", enabled: true },
        { label: "Advanced customization", enabled: true },
        { label: "Community access", enabled: true },
        { label: "Weekly reports", enabled: false },
      ],
      buttonText: "Choose Pro",
      highlight: false,
    },
    {
      name: "Advanced",
      price: 199,
      features: [
        { label: "24/7 support and updates", enabled: true },
        { label: "Access to all features", enabled: true },
        { label: "Full customization", enabled: true },
        { label: "Community access", enabled: true },
        { label: "Daily reports", enabled: true },
      ],
      buttonText: "Choose Advanced",
      highlight: true,
      badgeText: "Most Popular",
    },
    {
      name: "Enterprise",
      price: 499,
      features: [
        { label: "Dedicated support and updates", enabled: true },
        { label: "Access to all features", enabled: true },
        { label: "Full customization and integrations", enabled: true },
        { label: "Community access", enabled: true },
        { label: "Custom reports", enabled: true },
      ],
      buttonText: "Contact Sales",
      highlight: false,
    },
  ]

  return (
    <section
      className="py-20 text-center"
      style={{
        backgroundImage: "url('/bg1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-semibold mb-4">
          Simple, Transparent <span className="text-[#4B6CEB]">Pricing</span>.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          Choose the plan that fits your business. No hidden fees, cancel anytime.
        </p>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[2.5rem] p-12 sm:p-16 min-h-[400px] shadow-md flex flex-col text-left ${
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
          "Every plan comes with AI at its core — automate, optimize, and scale smarter."
        </blockquote>
      </div>
    </section>
  )
}
