import { Product } from './types'

export const AVAILABLE_PRODUCTS: Product[] = [
  {
    id: 'ava-cx-chatbot',
    name: 'Ava CX Chatbot',
    description: 'Intelligent customer service chatbot with AI-powered responses',
    url: 'https://chat-bot-match-best.vercel.app/?websiteId=suha',
    icon: '🤖',
    color: 'bg-blue-500',
    enabled: true
  },
  {
    id: 'ava-crm',
    name: 'Ava CRM',
    description: 'Comprehensive customer relationship management system',
    url: 'https://matchbest-crm.vercel.app/',
    icon: '👥',
    color: 'bg-green-500',
    enabled: true
  },
  {
    id: 'ava-pingora',
    name: 'Ava Pingora',
    description: 'Advanced analytics and business intelligence platform',
    url: 'https://pingora.ai',
    icon: '📊',
    color: 'bg-purple-500',
    enabled: true
  },
  {
    id: 'ava-billing',
    name: 'Ava Billing',
    description: 'Automated billing and payment processing system',
    url: 'https://master.d398n21nztipdq.amplifyapp.com/',
    icon: '💰',
    color: 'bg-orange-500',
    enabled: true
  }
]

export const getProductById = (id: string): Product | undefined => {
  return AVAILABLE_PRODUCTS.find(product => product.id === id)
}

export const getProductsByIds = (ids: string[]): Product[] => {
  return AVAILABLE_PRODUCTS.filter(product => ids.includes(product.id))
}

export const getEnabledProducts = (): Product[] => {
  return AVAILABLE_PRODUCTS.filter(product => product.enabled)
}
