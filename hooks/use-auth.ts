'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('adminAuthenticated')
      setIsAuthenticated(auth === 'true')
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = (password: string) => {
    if (password === 't8u4pg47') {
      localStorage.setItem('adminAuthenticated', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('adminAuthenticated')
    setIsAuthenticated(false)
    router.push('/admin/login')
  }

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login')
      return false
    }
    return true
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    requireAuth
  }
}
