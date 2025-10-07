import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://avaone.com' // Replace with your actual domain
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/products/',
          '/services/',
          '/pricing',
          '/bundles',
          '/custom-bundle',
          '/contacts',
          '/about',
          '/workspace/login',
          '/organization/login'
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/workspace/dashboard/',
          '/workspace/analytics/',
          '/workspace/reports/',
          '/workspace/settings/',
          '/workspace/team/',
          '/workspace/products/',
          '/organization/dashboard/',
          '/test-login',
          '/test-users',
          '/checkout/success',
          '/checkout/cancel'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/products/',
          '/services/',
          '/pricing',
          '/bundles',
          '/contacts'
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/workspace/',
          '/organization/',
          '/test-*'
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
