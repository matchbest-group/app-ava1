import type React from "react"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { VoiceBotProvider } from "@/components/voice-bot-context"
import { GlobalVoiceBot } from "@/components/global-voice-bot"
import "./globals.css"
import "../styles/smooth-scroll.css"

export const metadata: Metadata = {
  title: "Ava Workspace - Enterprise Solutions",
  description: "Comprehensive workspace platform with enterprise-grade solutions, team management, and product suite",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans"  style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <VoiceBotProvider>
          {children}
          <Toaster />
          <GlobalVoiceBot />
        </VoiceBotProvider>
      </body>
    </html>
  )
}

