"use client"

import { useState } from "react"

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How much does AVA AI cost?",
      answer: (
        <>
          Unlike other tools where AI is a paid add-on, AVA AI is free for Doc Makers. Editors also receive a free trial of AVA AI.If you’d like to learn more about pricing and usage, visit{" "}
          <a href="https://help.example.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            this help article
          </a>.
        </>
      ),
    },
    {
      question: "What models does AVA AI leverage?",
      answer: "Details about the models AVA AI uses will be provided here.",
    },
    {
      question: "How does AVA AI use my data?",
      answer: "Information on data usage and privacy policies will be provided here.",
    },
    {
      question: "How can I learn more about using AVA AI for work?",
      answer: "Resources and tutorials for using AVA AI effectively will be provided here.",
    },
    {
      question: "Was there a AVA AI Beta?",
      answer: "Information about the AVA AI Beta program will be provided here.",
    },
  ]

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">FAQs</h2>
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
            {openIndex === index && (
              <div id={`faq-answer-${index}`} className="mt-2 text-gray-700 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
