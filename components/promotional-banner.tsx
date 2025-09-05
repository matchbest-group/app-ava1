"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface PromoBannerContent {
  isVisible: boolean
  text: string
  backgroundColor: string
  textColor: string
  link?: string
}

export function PromotionalBanner() {
  const [bannerContent, setBannerContent] = useState<PromoBannerContent>({
    isVisible: false,
    text: "🎉 Limited Time Offer: Get 50% OFF on all Premium Plans! Use code SAVE50",
    backgroundColor: "#6366f1",
    textColor: "#ffffff",
    link: "/pricing"
  })
  
  const [isVisible, setIsVisible] = useState(true)
  const [isClosed, setIsClosed] = useState(false)

  // Load banner content from API
  useEffect(() => {
    const loadBannerContent = async () => {
      try {
        const response = await fetch('/api/website-content')
        if (response.ok) {
          const data = await response.json()
          if (data.promoBanner) {
            setBannerContent(data.promoBanner)
          }
        }
      } catch (error) {
        console.error('Failed to load banner content:', error)
      }
    }
    loadBannerContent()
  }, [])

  // Don't render if banner is disabled from admin or user closed it
  if (!bannerContent.isVisible || isClosed) {
    return null
  }

  const handleClose = () => {
    setIsClosed(true)
  }

  const handleClick = () => {
    if (bannerContent.link) {
      window.location.href = bannerContent.link
    }
  }

  return (
    <div 
      className="relative h-12 flex items-center justify-center overflow-hidden cursor-pointer"
      style={{ 
        backgroundColor: bannerContent.backgroundColor,
        color: bannerContent.textColor
      }}
      onClick={handleClick}
    >
      {/* Scrolling text */}
      <div className="flex items-center justify-center w-full">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium px-4">
            {bannerContent.text}
          </span>
          <span className="text-sm font-medium px-4">
            {bannerContent.text}
          </span>
          <span className="text-sm font-medium px-4">
            {bannerContent.text}
          </span>
          <span className="text-sm font-medium px-4">
            {bannerContent.text}
          </span>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClose()
        }}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Close banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
