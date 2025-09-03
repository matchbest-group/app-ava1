'use client'

import { useEffect } from 'react'

interface Organization {
  id: string
  name: string
  email: string
  phone: string
  address: string
  industry: string
  employeeCount: string
  foundedYear: string
  website: string
  description: string
  adminEmail: string
  adminPassword: string
  licenseStatus: 'active' | 'suspended' | 'paused' | 'expired'
  licenseExpiry: string
  createdAt: string
}

export function useLicenseCheck() {
  useEffect(() => {
    const checkLicenses = () => {
      const organizations = JSON.parse(localStorage.getItem('organizations') || '[]')
      let hasChanges = false

      const updatedOrgs = organizations.map((org: Organization) => {
        const expiryDate = new Date(org.licenseExpiry)
        const now = new Date()
        
        // If license has expired and is still marked as active, update it
        if (expiryDate < now && org.licenseStatus === 'active') {
          hasChanges = true
          return {
            ...org,
            licenseStatus: 'expired' as const
          }
        }
        
        return org
      })

      if (hasChanges) {
        localStorage.setItem('organizations', JSON.stringify(updatedOrgs))
        console.log('License status updated for expired licenses')
      }
    }

    // Check licenses immediately
    checkLicenses()

    // Check licenses every hour
    const interval = setInterval(checkLicenses, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])
}
