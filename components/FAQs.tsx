"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What is AVA One?",
      answer:
        "AVA One is an AI-powered business suite that combines customer support, CRM, billing, and collaboration into one platform. Built for SMEs, it helps reduce costs, simplify operations, and scale efficiently without juggling multiple tools.",
    },
    {
      question: "Who is AVA One designed for?",
      answer:
        "AVA One is built for small and medium businesses (SMEs) with under 500 employees that want enterprise-grade technology at an affordable cost. It's ideal for startups, e-commerce, SaaS companies, and growing businesses.",
    },
    {
      question: "How does AVA CX Agent improve customer support?",
      answer:
        "AVA CX Agent delivers 24/7 AI-powered support across WhatsApp, email, web, and social channels. It reduces support costs by automating repetitive queries while improving customer satisfaction with instant responses.",
    },
    {
      question: "What makes AVA Flow CRM different from other CRMs?",
      answer:
        "AVA Flow CRM is AI-driven and SME-focused. It automates lead scoring, follow-ups, and deal tracking while staying lightweight and easy to deploy. Unlike complex enterprise CRMs, it's affordable and designed for fast adoption.",
    },
    {
      question: "Can AVA One handle billing and subscriptions?",
      answer:
        "Yes. AVA SmartBill automates billing, invoicing, and subscription management. It includes smart retry logic for payments, churn detection, and flexible pricing plans, helping SMEs manage revenue without errors or extra workload.",
    },
    {
      question: "How does AVA Pingora help teams collaborate?",
      answer:
        "AVA Pingora is an AI-powered workspace that enables real-time messaging, file sharing, task alignment, and smart AI summaries. It ensures teams stay connected, whether working remotely or on-site, boosting productivity.",
    },
    {
      question: "Why should SMEs choose AVA One over multiple SaaS tools?",
      answer:
        "With AVA One, businesses avoid paying for separate CX, CRM, billing, and collaboration tools. Instead, they get one integrated AI-driven suite that's cost-optimized, scalable, and easier to manage.",
    },
    {
      question: "Is AVA One easy to set up and integrate?",
      answer:
        "Yes. AVA One offers plug-and-play deployment with integrations for CRM, Google Sheets, Shopify, and other tools SMEs already use. It requires minimal IT support, making onboarding simple.",
    },
    {
      question: "How is AVA One priced?",
      answer:
        "AVA One follows a SaaS subscription model, charged per user per month. Plans are offered in Basic, Pro, Advanced, and Enterprise tiers, depending on your business size and feature needs.",
    },
    {
      question: "How does AVA One help SMEs save costs?",
      answer:
        "AVA One reduces SaaS spending by replacing 4–5 separate tools (CRM, CX, billing, collaboration) with a single AI-driven suite. SMEs typically save up to 40–60% in software costs while gaining AI automation to boost productivity.",
    },
    {
      question: "What is the minimum number of users required?",
      answer:
        "Basic: 3 users minimum\n\nPro: 5 users minimum\n\nAdvanced: 10 users minimum\n\nEnterprise: 25 users minimum",
    },
    {
      question: "Can I mix and match products (CX, CRM, Billing, Pingora)?",
      answer:
        "Yes. Each module can be purchased separately or bundled together as AVA One Suite for better value.",
    },
    {
      question: "Do all plans include AI features?",
      answer:
        "Yes, every plan includes AI-driven automation. Higher tiers (Pro, Advanced, Enterprise) unlock advanced AI like multi-channel chatbots, AI insights, and predictive analytics.",
    },
    {
      question: "Is billing monthly or annually?",
      answer:
        "Pricing is available in monthly and semi-annual billing cycles. Semi-annual plans offer better savings.",
    },
  ]

  return (
    <section className="max-w-6xl mx-auto p-6 mt-10 pb-4">
      <h2 className="text-5xl font-semibold mb-4 border-b border-gray-300 pb-2">FAQs</h2>
      <div className="divide-y divide-gray-300">
        {faqs.map((faq, index) => (
          <div key={index} className="py-4">
            <button
              className="w-full text-left flex justify-between items-center font-medium text-lg focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              {faq.question}
              <span className="ml-2 text-2xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  className="mt-2 text-gray-700 text-sm"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
