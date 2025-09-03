'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X } from 'lucide-react'
import ProductSelection from './product-selection'

interface OrganizationFormData {
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
  licenseExpiry: string
  selectedProducts: string[]
  userLimit: string // Added user limit field
}

interface OrganizationFormProps {
  onSubmit: (data: OrganizationFormData) => void
  onCancel: () => void
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Consulting',
  'Marketing',
  'Transportation',
  'Energy',
  'Food & Beverage',
  'Entertainment',
  'Non-profit',
  'Other'
]

const employeeCounts = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5000+'
]

const userLimits = [
  { value: '1-100', label: '1-100 Users', description: 'Small team' },
  { value: '101-500', label: '101-500 Users', description: 'Medium organization' },
  { value: '501-1000', label: '501-1000 Users', description: 'Large enterprise' }
]

export function OrganizationForm({ onSubmit, onCancel }: OrganizationFormProps) {
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    industry: '',
    employeeCount: '',
    foundedYear: '',
    website: '',
    description: '',
    adminEmail: '',
    adminPassword: '',
    licenseExpiry: '',
    selectedProducts: ['ava-cx-chatbot', 'ava-crm', 'ava-pingora', 'ava-billing'], // Default all products selected
    userLimit: '1-100' // Default user limit
  })

  const [errors, setErrors] = useState<Partial<OrganizationFormData>>({})

  const handleInputChange = (field: keyof OrganizationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleProductToggle = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(productId)
        ? prev.selectedProducts.filter(id => id !== productId)
        : [...prev.selectedProducts, productId]
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<OrganizationFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Organization name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required'
    }

    if (!formData.employeeCount) {
      newErrors.employeeCount = 'Employee count is required'
    }

    if (!formData.foundedYear) {
      newErrors.foundedYear = 'Founded year is required'
    } else {
      const year = parseInt(formData.foundedYear)
      const currentYear = new Date().getFullYear()
      if (year < 1800 || year > currentYear) {
        newErrors.foundedYear = `Founded year must be between 1800 and ${currentYear}`
      }
    }

    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = 'Admin email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Please enter a valid admin email address'
    }

    if (!formData.adminPassword.trim()) {
      newErrors.adminPassword = 'Admin password is required'
    } else if (formData.adminPassword.length < 6) {
      newErrors.adminPassword = 'Admin password must be at least 6 characters'
    }

    if (!formData.licenseExpiry) {
      newErrors.licenseExpiry = 'License expiry date is required'
    } else {
      const expiryDate = new Date(formData.licenseExpiry)
      const today = new Date()
      if (expiryDate <= today) {
        newErrors.licenseExpiry = 'License expiry date must be in the future'
      }
    }

    if (!formData.userLimit) {
      newErrors.userLimit = 'User limit is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Add New Organization</CardTitle>
              <CardDescription>
                Enter the organization details below
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter organization name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-sm text-red-500">{errors.industry}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeCount">Employee Count *</Label>
                <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange('employeeCount', value)}>
                  <SelectTrigger className={errors.employeeCount ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select employee count" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeCounts.map((count) => (
                      <SelectItem key={count} value={count}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.employeeCount && <p className="text-sm text-red-500">{errors.employeeCount}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year *</Label>
                <Input
                  id="foundedYear"
                  type="number"
                  value={formData.foundedYear}
                  onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                  placeholder="e.g., 2020"
                  min="1800"
                  max={new Date().getFullYear()}
                  className={errors.foundedYear ? 'border-red-500' : ''}
                />
                {errors.foundedYear && <p className="text-sm text-red-500">{errors.foundedYear}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter full address"
                rows={3}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

                         <div className="space-y-2">
               <Label htmlFor="description">Description</Label>
               <Textarea
                 id="description"
                 value={formData.description}
                 onChange={(e) => handleInputChange('description', e.target.value)}
                 placeholder="Enter organization description"
                 rows={4}
               />
             </div>

             <div className="border-t pt-6">
               <h3 className="text-lg font-semibold mb-4">Admin Credentials</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="adminEmail">Admin Email *</Label>
                   <Input
                     id="adminEmail"
                     type="email"
                     value={formData.adminEmail}
                     onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                     placeholder="Enter admin email"
                     className={errors.adminEmail ? 'border-red-500' : ''}
                   />
                   {errors.adminEmail && <p className="text-sm text-red-500">{errors.adminEmail}</p>}
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="adminPassword">Admin Password *</Label>
                   <Input
                     id="adminPassword"
                     type="password"
                     value={formData.adminPassword}
                     onChange={(e) => handleInputChange('adminPassword', e.target.value)}
                     placeholder="Enter admin password"
                     className={errors.adminPassword ? 'border-red-500' : ''}
                   />
                   {errors.adminPassword && <p className="text-sm text-red-500">{errors.adminPassword}</p>}
                 </div>
               </div>
             </div>

             <div className="border-t pt-6">
               <h3 className="text-lg font-semibold mb-4">License Information</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label htmlFor="licenseExpiry">License Expiry Date *</Label>
                   <Input
                     id="licenseExpiry"
                     type="date"
                     value={formData.licenseExpiry}
                     onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                     min={new Date().toISOString().split('T')[0]}
                     className={errors.licenseExpiry ? 'border-red-500' : ''}
                   />
                   {errors.licenseExpiry && <p className="text-sm text-red-500">{errors.licenseExpiry}</p>}
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="userLimit">User Limit *</Label>
                   <Select value={formData.userLimit} onValueChange={(value) => handleInputChange('userLimit', value)}>
                     <SelectTrigger className={errors.userLimit ? 'border-red-500' : ''}>
                       <SelectValue placeholder="Select user limit" />
                     </SelectTrigger>
                     <SelectContent>
                       {userLimits.map((limit) => (
                         <SelectItem key={limit.value} value={limit.value}>
                           <div className="flex flex-col">
                             <span className="font-medium">{limit.label}</span>
                             <span className="text-xs text-gray-500">{limit.description}</span>
                           </div>
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                   {errors.userLimit && <p className="text-sm text-red-500">{errors.userLimit}</p>}
                   <p className="text-xs text-gray-500">
                     This determines how many users the admin can create in the organization.
                   </p>
                 </div>
               </div>
             </div>

             <div className="border-t pt-6">
               <h3 className="text-lg font-semibold mb-4">Product Selection</h3>
               <p className="text-sm text-gray-600 mb-4">
                 Choose which products your organization will have access to. All products are selected by default.
               </p>
               <ProductSelection
                 selectedProducts={formData.selectedProducts}
                 onProductToggle={handleProductToggle}
               />
             </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Create Organization
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
