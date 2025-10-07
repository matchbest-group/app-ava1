'use client'

export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Avaone Suite",
    "alternateName": "Avaone Technologies",
    "url": "https://avaone.com",
    "logo": "https://avaone.com/logo.png",
    "description": "Comprehensive enterprise workspace platform with AI-powered solutions, multi-tenant management, voice bot integration, and advanced product suite.",
    "foundingDate": "2023",
    "industry": "Software Technology",
    "numberOfEmployees": "50-200",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://avaone.com/contacts"
    },
    "sameAs": [
      "https://linkedin.com/company/avaone",
      "https://twitter.com/avaone",
      "https://github.com/avaone"
    ]
  }

  const softwareApplicationData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Avaone Suite",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based",
    "url": "https://avaone.com",
    "description": "Enterprise workspace platform with AI solutions, multi-tenant management, and voice bot integration.",
    "softwareVersion": "2024.1",
    "datePublished": "2024-01-01",
    "author": {
      "@type": "Organization",
      "name": "Avaone Technologies"
    },
    "offers": {
      "@type": "Offer",
      "price": "Contact for pricing",
      "priceCurrency": "USD",
      "url": "https://avaone.com/pricing",
      "eligibleRegion": "Worldwide"
    },
    "screenshot": "https://avaone.com/screenshot.png",
    "featureList": [
      "AI-powered voice bot integration",
      "Multi-tenant organization management", 
      "Enterprise workspace solutions",
      "AVA CX - Customer Experience Platform",
      "AVA Pingora - Global Communication Platform",
      "AVA Flow - Workflow Automation Suite",
      "AVA SmartBill - Intelligent Billing System",
      "Real-time analytics and reporting",
      "Team collaboration tools",
      "Multi-database architecture"
    ]
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Avaone Suite",
    "url": "https://avaone.com",
    "description": "Enterprise workspace platform with AI-powered solutions and advanced product suite.",
    "publisher": {
      "@type": "Organization",
      "name": "Avaone Technologies"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://avaone.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  const productsData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "AVA CX",
      "description": "Customer Experience Platform for enterprise-grade customer service management",
      "url": "https://avaone.com/products/ava-cx",
      "brand": {
        "@type": "Brand",
        "name": "Avaone Suite"
      },
      "category": "Customer Experience Software"
    },
    {
      "@context": "https://schema.org", 
      "@type": "Product",
      "name": "AVA Pingora",
      "description": "Global Communication Platform for seamless team collaboration",
      "url": "https://avaone.com/products/ava-pingora",
      "brand": {
        "@type": "Brand", 
        "name": "Avaone Suite"
      },
      "category": "Communication Software"
    },
    {
      "@context": "https://schema.org",
      "@type": "Product", 
      "name": "AVA Flow",
      "description": "Workflow Automation Suite for business process optimization",
      "url": "https://avaone.com/products/ava-flow",
      "brand": {
        "@type": "Brand",
        "name": "Avaone Suite"
      },
      "category": "Workflow Automation Software"
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "AVA SmartBill", 
      "description": "Intelligent Billing System for automated invoice and payment management",
      "url": "https://avaone.com/products/ava-smartbill",
      "brand": {
        "@type": "Brand",
        "name": "Avaone Suite"
      },
      "category": "Billing Software"
    }
  ]

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://avaone.com"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Products",
        "item": "https://avaone.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Services", 
        "item": "https://avaone.com/services"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Pricing",
        "item": "https://avaone.com/pricing"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationData),
        }}
      />
      <script
        type="application/ld+json" 
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productsData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
    </>
  )
}
