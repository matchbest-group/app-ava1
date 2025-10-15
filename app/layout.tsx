import type React from "react"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { VoiceBotProvider } from "@/components/voice-bot-context"
import { GlobalVoiceBot } from "@/components/global-voice-bot"
import { StructuredData } from "@/components/structured-data"
import "./globals.css"
import "../styles/smooth-scroll.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://avaone.com'), // Replace with your actual domain
  title: {
    default: "Avaone Suite - Enterprise Workspace & AI Solutions",
    template: "%s | Avaone Suite"
  },
  description: "Comprehensive enterprise workspace platform with AI-powered solutions, multi-tenant management, voice bot integration, and advanced product suite including AVA CX, AVA Pingora, AVA Flow, and AVA SmartBill.",
  keywords: [
    "enterprise workspace",
    "AI solutions",
    "voice bot",
    "multi-tenant platform",
    "business management",
    "workflow automation",
    "customer experience",
    "billing system",
    "team collaboration",
    "organization management",
    "SaaS platform",
    "enterprise software"
  ],
  authors: [{ name: "Avaone Team" }],
  creator: "Avaone Suite",
  publisher: "Avaone Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://avaone.com',
    title: 'Avaone Suite - Enterprise Workspace & AI Solutions',
    description: 'Comprehensive enterprise workspace platform with AI-powered solutions, multi-tenant management, and advanced product suite.',
    siteName: 'Avaone Suite',
    images: [
      {
        url: '/og-image.png', // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Avaone Suite - Enterprise Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avaone Suite - Enterprise Workspace & AI Solutions',
    description: 'Comprehensive enterprise workspace platform with AI-powered solutions and advanced product suite.',
    creator: '@avaone',
    images: ['/twitter-image.png'], // Add your Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'g-mrMWOwq5XzRGo2RN6tCToMUZZg1F49R3XkqdY9nZs',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans"  style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <StructuredData />
        <VoiceBotProvider>
          {children}
          <Toaster />
          <GlobalVoiceBot />
        </VoiceBotProvider>
      </body>
    </html>
  )
}

