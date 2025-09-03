'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, ExternalLink } from 'lucide-react'
import { AVAILABLE_PRODUCTS, Product } from '@/lib/products'

interface ProductSelectionProps {
  selectedProducts: string[]
  onProductToggle: (productId: string) => void
  disabled?: boolean
}

export default function ProductSelection({ 
  selectedProducts, 
  onProductToggle, 
  disabled = false 
}: ProductSelectionProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const handleProductClick = (productId: string) => {
    if (!disabled) {
      onProductToggle(productId)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Products
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the products that best suit your organization's needs. 
          You can always modify these selections later in your workspace settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {AVAILABLE_PRODUCTS.map((product) => {
          const isSelected = selectedProducts.includes(product.id)
          
          return (
            <Card
              key={product.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                  : 'hover:shadow-lg hover:border-gray-300'
              } ${disabled ? 'opacity-75 cursor-not-allowed' : ''}`}
              onClick={() => handleProductClick(product.id)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${product.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {product.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </CardTitle>
                      <Badge 
                        variant={isSelected ? "default" : "secondary"}
                        className="mt-1"
                      >
                        {isSelected ? 'Selected' : 'Available'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-4">
                  {product.description}
                </CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${product.color}`} />
                    <span className="text-sm text-gray-500">
                      {isSelected ? 'Included in your plan' : 'Click to select'}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(product.url, '_blank')
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>

              {/* Hover effect */}
              {hoveredProduct === product.id && !isSelected && !disabled && (
                <div className="absolute inset-0 bg-blue-50 bg-opacity-50 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">Click to select</span>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              Selected Products ({selectedProducts.length})
            </h4>
            <p className="text-gray-600">
              {selectedProducts.length === 0 
                ? 'No products selected yet' 
                : selectedProducts.length === AVAILABLE_PRODUCTS.length
                ? 'All products selected'
                : `${selectedProducts.length} of ${AVAILABLE_PRODUCTS.length} products selected`
              }
            </p>
          </div>
          
          {selectedProducts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((productId) => {
                const product = AVAILABLE_PRODUCTS.find(p => p.id === productId)
                return product ? (
                  <Badge key={productId} variant="default" className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${product.color}`} />
                    <span>{product.name}</span>
                  </Badge>
                ) : null
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
