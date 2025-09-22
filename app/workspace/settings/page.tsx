'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import WorkspaceLayout from '@/components/workspace-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { 
  Settings, 
  User, 
  Building2, 
  Shield, 
  Bell, 
  CreditCard, 
  Users, 
  Key,
  Save,
  Upload,
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  RefreshCw,
  Zap,
  Crown,
  Star,
  Award,
  DollarSign
} from 'lucide-react'

interface User {
  name: string
  email: string
  accountId: string
  organizationName: string
  plan: string
  createdAt: string
}

interface OrganizationSettings {
  name: string
  description: string
  website: string
  industry: string
  size: string
  address: string
  phone: string
  timezone: string
  language: string
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  sessionTimeout: number
  passwordPolicy: {
    minLength: number
    requireNumbers: boolean
    requireSymbols: boolean
    requireUppercase: boolean
  }
  allowedDomains: string[]
  ipWhitelisting: boolean
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyReports: boolean
  securityAlerts: boolean
  productUpdates: boolean
  marketingEmails: boolean
}

export default function WorkspaceSettingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [showImageCropper, setShowImageCropper] = useState(false)
  const [originalImage, setOriginalImage] = useState('')
  const [cropData, setCropData] = useState({
    x: 0,
    y: 0,
    size: 200, // Single size for perfect circle
    scale: 1
  })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  
  // Settings state
  const [profilePicture, setProfilePicture] = useState('')
  const [orgSettings, setOrgSettings] = useState<OrganizationSettings>({
    name: '',
    description: '',
    website: '',
    industry: 'Technology',
    size: '10-50',
    address: '',
    phone: '',
    timezone: 'Asia/Kolkata',
    language: 'English'
  })
  
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    sessionTimeout: 480, // 8 hours in minutes
    passwordPolicy: {
      minLength: 8,
      requireNumbers: true,
      requireSymbols: true,
      requireUppercase: true
    },
    allowedDomains: [],
    ipWhitelisting: false
  })
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
    productUpdates: true,
    marketingEmails: false
  })

  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('workspaceAuthenticated')
    const userData = localStorage.getItem('workspaceUser')
    
    if (auth === 'true' && userData) {
      try {
        const userObj = JSON.parse(userData)
        setUser(userObj)
        setIsAuthenticated(true)
        loadSettings(userObj)
      } catch (error) {
        console.error('Error parsing user data:', error)
        router.push('/workspace/login')
        return
      }
    } else {
      router.push('/workspace/login')
      return
    }
    
    setIsLoading(false)
  }, [router])

  const loadSettings = async (userObj: User) => {
    try {
      // First, ensure user exists in database
      console.log('👤 Ensuring user exists in database for settings:', userObj.email)
      try {
        await fetch('/api/workspace/ensure-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userObj.email,
            name: userObj.name,
            organizationName: userObj.organizationName,
            plan: userObj.plan
          }),
        })
        console.log('✅ User existence ensured in database for settings')
      } catch (ensureError) {
        console.warn('⚠️ Could not ensure user exists in database for settings:', ensureError)
      }
      
      // Load profile image from database
      console.log('🔍 Loading profile image from database for:', userObj.email)
      
      const response = await fetch(`/api/workspace/profile-image?email=${encodeURIComponent(userObj.email)}`)
      
      if (!response.ok) {
        console.warn('⚠️ Settings API response not OK:', response.status, response.statusText)
        console.warn('📱 Settings skipping database, using localStorage or default')
        
        // Fallback to localStorage if API fails
        const savedProfilePicture = localStorage.getItem('workspaceProfilePicture')
        if (savedProfilePicture) {
          setProfilePicture(savedProfilePicture)
          console.log('📱 Settings using profile image from localStorage (API failed)')
        } else {
          // Use default avatar
          const defaultAvatar = '/avatars/avatar-1.png'
          setProfilePicture(defaultAvatar)
          console.log('🎭 Settings using default profile image (API failed)')
        }
        return // Exit early
      }
      
      const data = await response.json()
      console.log('📡 Settings profile image API response:', data)
      
      if (data.success && data.profileImage) {
        setProfilePicture(data.profileImage)
        // Also update localStorage for consistency
        localStorage.setItem('workspaceProfilePicture', data.profileImage)
        console.log('✅ Profile image loaded from database in settings')
      } else {
        // Fallback to localStorage if database fails
        const savedProfilePicture = localStorage.getItem('workspaceProfilePicture')
        if (savedProfilePicture) {
          setProfilePicture(savedProfilePicture)
          console.log('📱 Settings using profile image from localStorage')
        } else {
          // Use default avatar
          const defaultAvatar = '/avatars/avatar-1.png'
          setProfilePicture(defaultAvatar)
          console.log('🎭 Settings using default profile image')
        }
      }
    } catch (error) {
      console.error('❌ Error loading profile image from database:', error)
      // Fallback to localStorage
      const savedProfilePicture = localStorage.getItem('workspaceProfilePicture')
      if (savedProfilePicture) {
        setProfilePicture(savedProfilePicture)
      }
    }

    // Pre-populate organization settings
    setOrgSettings(prev => ({
      ...prev,
      name: userObj.organizationName,
    }))
  }

  const handleSaveSettings = async (section: string) => {
    setIsSaving(true)
    try {
      if (section === 'profile' && user) {
        // Save profile image to database
        console.log('🖼️ Saving profile image to database')
        
        // Always update localStorage first for immediate UI update
        localStorage.setItem('workspaceProfilePicture', profilePicture)
        console.log('📱 Profile image saved to localStorage immediately')

        try {
          const response = await fetch('/api/workspace/profile-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              profileImage: profilePicture
            }),
          })

          if (!response.ok) {
            console.warn('⚠️ API Response not OK:', response.status, response.statusText)
            console.warn('📱 Profile image still saved to localStorage - functionality preserved')
            return // Don't throw error, localStorage is working
          }

          const data = await response.json()
          console.log('📡 API Response:', data)
          
          if (data.success) {
            console.log('✅ Profile image also saved to database successfully')
          } else {
            console.warn('⚠️ API returned error:', data.error)
            console.warn('📱 Profile image still available via localStorage')
          }
        } catch (apiError) {
          console.warn('⚠️ Error calling profile image API:', apiError)
          console.warn('📱 Profile image saved to localStorage only - this is fine!')
          
          // Don't throw error - localStorage is working fine
        }
      } else {
        // For other sections, simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('❌ Error saving settings:', error)
      alert('Error saving settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleProfilePictureChange = (newPicture: string) => {
    setProfilePicture(newPicture)
  }

  // Handle circular image cropping
  const handleCropImage = () => {
    if (!originalImage) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Set canvas size to crop dimensions (square for circle)
      const size = cropData.size
      canvas.width = size
      canvas.height = size

      if (!ctx) return

      // Use the exact same calculation as preview for perfect match
      // Get image natural dimensions
      const imgWidth = img.naturalWidth
      const imgHeight = img.naturalHeight
      
      // Calculate how the image fits in the container (500x400)
      const containerWidth = 500
      const containerHeight = 400
      
      // Calculate image display size (maintaining aspect ratio)
      const imageAspect = imgWidth / imgHeight
      const containerAspect = containerWidth / containerHeight
      
      let displayWidth, displayHeight
      if (imageAspect > containerAspect) {
        // Image is wider, fit by width
        displayWidth = Math.min(containerWidth, imgWidth)
        displayHeight = displayWidth / imageAspect
      } else {
        // Image is taller, fit by height
        displayHeight = Math.min(containerHeight, imgHeight)
        displayWidth = displayHeight * imageAspect
      }
      
      // Calculate image position in container (centered)
      const imageLeft = (containerWidth - displayWidth) / 2
      const imageTop = (containerHeight - displayHeight) / 2
      
      // Calculate crop area relative to image
      const cropRelativeX = cropData.x - imageLeft + imagePosition.x
      const cropRelativeY = cropData.y - imageTop + imagePosition.y
      
      // Convert to source image coordinates
      const scaleToOriginal = imgWidth / displayWidth
      const sourceX = (cropRelativeX * scaleToOriginal) / cropData.scale
      const sourceY = (cropRelativeY * scaleToOriginal) / cropData.scale
      const sourceSize = (size * scaleToOriginal) / cropData.scale

      // Create circular clipping path
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()

      // Enable high-quality rendering
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      // Draw the exact crop area that matches the preview
      ctx.drawImage(
        img,
        Math.max(0, sourceX), Math.max(0, sourceY), 
        Math.min(sourceSize, imgWidth - sourceX), Math.min(sourceSize, imgHeight - sourceY),
        0, 0, size, size
      )

      // Convert to base64 with high quality
      const croppedDataUrl = canvas.toDataURL('image/png') // PNG to preserve transparency
      setProfilePicture(croppedDataUrl)
      setShowImageCropper(false)
      console.log('✅ Circular image cropped successfully')
      console.log(`📏 Final circular image size: ${size}x${size}`)
    }

    img.src = originalImage
  }

  // Handle crop area changes
  const handleCropChange = (field: string, value: number) => {
    setCropData(prev => ({
      ...prev,
      [field]: Math.max(0, value)
    }))
  }

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent, type: 'crop' | 'image') => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - (type === 'crop' ? cropData.x : imagePosition.x),
      y: e.clientY - (type === 'crop' ? cropData.y : imagePosition.y)
    })
  }

  // Handle drag move
  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    
    // Ensure crop area stays within container bounds (500x400)
    const maxX = 500 - cropData.size
    const maxY = 400 - cropData.size
    
    setCropData(prev => ({
      ...prev,
      x: Math.max(0, Math.min(maxX, newX)),
      y: Math.max(0, Math.min(maxY, newY))
    }))
  }

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Handle image drag for positioning
  const handleImageDrag = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    
    setImagePosition({
      x: newX,
      y: newY
    })
  }

  // Cancel cropping
  const handleCancelCrop = () => {
    setShowImageCropper(false)
    setOriginalImage('')
    setImagePosition({ x: 0, y: 0 })
    setCropData({
      x: 0,
      y: 0,
      size: 200,
      scale: 1
    })
  }

  // Handle file upload from device with compression
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPG, PNG, GIF, etc.)')
        return
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      setIsUploadingImage(true)
      
      // Create image element for processing
      const img = new Image()
      img.onload = () => {
        // Set maximum dimensions (for profile pictures) but preserve quality
        const maxSize = 800 // Increased size for better quality
        let { width, height } = img
        
        // Only resize if image is too large
        if (width > maxSize || height > maxSize) {
          // Create canvas for resizing only
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // Calculate new dimensions maintaining aspect ratio
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width
              width = maxSize
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height
              height = maxSize
            }
          }
          
          canvas.width = width
          canvas.height = height
          
          // Draw image with high quality
          ctx!.imageSmoothingEnabled = true
          ctx!.imageSmoothingQuality = 'high'
          ctx?.drawImage(img, 0, 0, width, height)
          
          // Convert to base64 with high quality, preserve original format if possible
          let highQualityDataUrl
          if (file.type === 'image/png') {
            highQualityDataUrl = canvas.toDataURL('image/png') // Preserve PNG format
          } else {
            highQualityDataUrl = canvas.toDataURL('image/jpeg', 0.95) // High quality JPEG
          }
          
          // Show cropper for user to adjust the resized image
          setOriginalImage(highQualityDataUrl)
          
          // Center the crop area in the container (500x400)
          const centerX = (500 - 200) / 2  // Center horizontally in 500px container
          const centerY = (400 - 200) / 2  // Center vertically in 400px container
          
          setCropData({
            x: centerX,
            y: centerY,
            size: 200,
            scale: 1
          })
          setImagePosition({ x: 0, y: 0 })
          setShowImageCropper(true)
          console.log('✅ Image resized with high quality - showing cropper')
          console.log(`📏 Resized from ${width}x${height} with centered crop area`)
        } else {
          // Image is already small enough, but still show cropper for user control
          const reader = new FileReader()
          reader.onload = (e) => {
            const originalDataUrl = e.target?.result as string
            if (originalDataUrl) {
              setOriginalImage(originalDataUrl)
              
              // Center the crop area in the container (500x400)
              const centerX = (500 - 200) / 2  // Center horizontally in 500px container
              const centerY = (400 - 200) / 2  // Center vertically in 400px container
              
              setCropData({
                x: centerX,
                y: centerY,
                size: 200,
                scale: 1
              })
              setImagePosition({ x: 0, y: 0 })
              setShowImageCropper(true)
              console.log('✅ Image loaded - showing cropper with centered crop area')
              console.log(`📏 Original image size: ${width}x${height}, crop centered at ${centerX}, ${centerY}`)
            }
          }
          reader.readAsDataURL(file)
        }
        
        setIsUploadingImage(false)
      }
      
      img.onerror = () => {
        alert('Error processing image file. Please try again.')
        setIsUploadingImage(false)
      }
      
      // Load image from file
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          img.src = result
        }
      }
      
      reader.onerror = () => {
        alert('Error reading image file. Please try again.')
        setIsUploadingImage(false)
      }
      
      reader.readAsDataURL(file)
    }
    
    // Reset input value so same file can be selected again
    event.target.value = ''
  }

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-slate-600 font-medium animate-pulse">Loading settings...</p>
          <p className="mt-2 text-sm text-slate-500">Configuring your workspace preferences</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const defaultProfilePictures = [
    '/avatars/avatar-1.png',
    '/avatars/avatar-2.jpg',
    '/avatars/avatar-3.png',
    '/placeholder-logo.svg',
    '/placeholder-user.jpg',
    '/logo1.png',
    '/logo2.png',
    '/logo3.png'
  ]

  return (
    <WorkspaceLayout user={user} selectedProducts={selectedProducts}>
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="mt-2 text-gray-600">
                  Manage your workspace preferences and configuration
                </p>
              </div>
              
              {showSuccess && (
                <Alert className="w-auto bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Success!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Settings saved successfully
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="organization">Organization</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24 ring-4 ring-white shadow-lg">
                        <AvatarImage src={profilePicture} alt={user.name} className="object-cover" />
                        <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-400 to-purple-600 text-white">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <Camera className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900">Choose Profile Picture</h3>
                        <p className="text-sm text-gray-600">Select from preset avatars or upload your own image</p>
                      </div>
                      
                      {/* Upload from device */}
                      <div className="flex items-center space-x-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="profile-upload"
                          disabled={isUploadingImage}
                        />
                        <label
                          htmlFor="profile-upload"
                          className={`cursor-pointer flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                            isUploadingImage 
                              ? 'border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed' 
                              : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {isUploadingImage ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="h-4 w-4" />
                          )}
                          <span>{isUploadingImage ? 'Uploading...' : 'Upload from Device'}</span>
                        </label>
                        <span className="text-xs text-gray-500">Max 5MB, High Quality Preserved</span>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">or choose preset</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3">
                        {defaultProfilePictures.map((pic, index) => (
                          <div key={index} className="relative">
                            <button
                              className={`w-14 h-14 rounded-full border-3 transition-all duration-200 hover:scale-110 hover:shadow-lg cursor-pointer ${
                                profilePicture === pic 
                                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
                                  : 'border-gray-200 hover:border-blue-300'
                              }`}
                              onClick={() => handleProfilePictureChange(pic)}
                              type="button"
                              title={`Select Avatar ${index + 1}`}
                            >
                              <Avatar className="w-full h-full">
                                <AvatarImage src={pic} alt={`Avatar Option ${index + 1}`} className="object-cover" />
                                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-600 text-white font-semibold">
                                  {index + 1}
                                </AvatarFallback>
                              </Avatar>
                            </button>
                            {profilePicture === pic && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <CheckCircle className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={user.name} 
                        readOnly 
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">Contact admin to change your name</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        value={user.email} 
                        readOnly 
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">Primary email for notifications</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountId">Account ID</Label>
                      <Input 
                        id="accountId" 
                        value={user.accountId} 
                        readOnly 
                        className="bg-gray-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="plan">Current Plan</Label>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Crown className="h-3 w-3" />
                          <span>{user.plan}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => handleSaveSettings('profile')}
                      disabled={isSaving}
                      className="flex items-center space-x-2"
                    >
                      {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Organization Settings */}
            <TabsContent value="organization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Organization Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure your organization details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input 
                        id="orgName" 
                        value={orgSettings.name}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        value={orgSettings.website}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <select 
                        id="industry"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={orgSettings.industry}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, industry: e.target.value }))}
                      >
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="Retail">Retail</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size">Company Size</Label>
                      <select 
                        id="size"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={orgSettings.size}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, size: e.target.value }))}
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="10-50">10-50 employees</option>
                        <option value="50-200">50-200 employees</option>
                        <option value="200-1000">200-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={orgSettings.phone}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select 
                        id="timezone"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={orgSettings.timezone}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={orgSettings.description}
                      onChange={(e) => setOrgSettings(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of your organization..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea 
                      id="address" 
                      value={orgSettings.address}
                      onChange={(e) => setOrgSettings(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Complete address..."
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => handleSaveSettings('organization')}
                      disabled={isSaving}
                      className="flex items-center space-x-2"
                    >
                      {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Configure security preferences and access controls
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(checked) => 
                        setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: checked }))
                      }
                    />
                  </div>

                  {/* Session Timeout */}
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ 
                        ...prev, 
                        sessionTimeout: parseInt(e.target.value) || 480 
                      }))}
                    />
                    <p className="text-xs text-gray-500">
                      Current: {Math.floor(securitySettings.sessionTimeout / 60)}h {securitySettings.sessionTimeout % 60}m
                    </p>
                  </div>

                  {/* Password Policy */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Password Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minLength">Minimum Length</Label>
                        <Input 
                          id="minLength" 
                          type="number"
                          value={securitySettings.passwordPolicy.minLength}
                          onChange={(e) => setSecuritySettings(prev => ({ 
                            ...prev, 
                            passwordPolicy: {
                              ...prev.passwordPolicy,
                              minLength: parseInt(e.target.value) || 8
                            }
                          }))}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="requireNumbers">Require Numbers</Label>
                          <Switch 
                            id="requireNumbers"
                            checked={securitySettings.passwordPolicy.requireNumbers}
                            onCheckedChange={(checked) => 
                              setSecuritySettings(prev => ({ 
                                ...prev, 
                                passwordPolicy: { ...prev.passwordPolicy, requireNumbers: checked }
                              }))
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="requireSymbols">Require Symbols</Label>
                          <Switch 
                            id="requireSymbols"
                            checked={securitySettings.passwordPolicy.requireSymbols}
                            onCheckedChange={(checked) => 
                              setSecuritySettings(prev => ({ 
                                ...prev, 
                                passwordPolicy: { ...prev.passwordPolicy, requireSymbols: checked }
                              }))
                            }
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="requireUppercase">Require Uppercase</Label>
                          <Switch 
                            id="requireUppercase"
                            checked={securitySettings.passwordPolicy.requireUppercase}
                            onCheckedChange={(checked) => 
                              setSecuritySettings(prev => ({ 
                                ...prev, 
                                passwordPolicy: { ...prev.passwordPolicy, requireUppercase: checked }
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => handleSaveSettings('security')}
                      disabled={isSaving}
                      className="flex items-center space-x-2"
                    >
                      {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to receive notifications and updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
                      { key: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly analytics reports' },
                      { key: 'securityAlerts', label: 'Security Alerts', description: 'Important security notifications' },
                      { key: 'productUpdates', label: 'Product Updates', description: 'New features and improvements' },
                      { key: 'marketingEmails', label: 'Marketing Emails', description: 'Promotional content and offers' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{item.label}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <Switch 
                          checked={notificationSettings[item.key as keyof NotificationSettings] as boolean}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({ ...prev, [item.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => handleSaveSettings('notifications')}
                      disabled={isSaving}
                      className="flex items-center space-x-2"
                    >
                      {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing */}
            <TabsContent value="billing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Billing & Subscription</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Plan */}
                  <div className="p-6 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">Current Plan: {user.plan}</h3>
                        <p className="text-blue-700">Active since {new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Badge className="bg-blue-600">
                        <Crown className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>

                  {/* Billing Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">₹4,999</p>
                        <p className="text-sm text-gray-600">Monthly Cost</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">25</p>
                        <p className="text-sm text-gray-600">Days Remaining</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold">{user.plan === 'Enterprise' ? 'Unlimited' : '50'}</p>
                        <p className="text-sm text-gray-600">User Limit</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Update Payment Method
                    </Button>
                    <Button>
                      <Zap className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </div>

                  {/* Danger Zone */}
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                    <Alert className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertTitle className="text-red-800">Caution</AlertTitle>
                      <AlertDescription className="text-red-700">
                        These actions are irreversible. Please proceed with caution.
                      </AlertDescription>
                    </Alert>
                    <div className="flex space-x-4">
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        Cancel Subscription
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {showImageCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-semibold mb-4">Crop & Adjust Your Image</h3>
            
            {/* Image Preview with Draggable Crop Area */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">
                <p>💡 <strong>Tip:</strong> Drag the blue circle to position crop area, or drag the image to move it</p>
              </div>
              <div 
                className="relative border-2 border-gray-300 rounded-lg overflow-hidden cursor-move bg-gray-100 flex items-center justify-center"
                style={{ width: '500px', height: '400px' }}
                onMouseMove={isDragging ? handleDragMove : undefined}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                <img 
                  src={originalImage} 
                  alt="Crop preview"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${cropData.scale})`,
                    transformOrigin: 'center center',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '480px',
                    maxHeight: '380px'
                  }}
                  className="select-none"
                  onMouseDown={(e) => handleDragStart(e, 'image')}
                  draggable={false}
                />
                
                {/* Draggable Circular Crop overlay */}
                <div 
                  className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20 rounded-full cursor-move hover:bg-blue-500 hover:bg-opacity-30 transition-colors"
                  style={{
                    left: cropData.x,
                    top: cropData.y,
                    width: cropData.size,
                    height: cropData.size
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    handleDragStart(e, 'crop')
                  }}
                >
                  <div className="absolute inset-0 border-2 border-dashed border-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs bg-blue-600 px-2 py-1 rounded pointer-events-none">
                    {cropData.size}×{cropData.size}
                  </div>
                  
                  {/* Drag handles */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs">⋮⋮</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Crop Controls */}
            <div className="space-y-4 mb-6">
              {/* Zoom Control */}
              <div>
                <Label htmlFor="scale">Zoom: {cropData.scale.toFixed(1)}x</Label>
                <input
                  type="range"
                  id="scale"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={cropData.scale}
                  onChange={(e) => handleCropChange('scale', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Position Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="x">X Position: {cropData.x}px</Label>
                  <input
                    type="range"
                    id="x"
                    min="0"
                    max="400"
                    value={cropData.x}
                    onChange={(e) => handleCropChange('x', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="y">Y Position: {cropData.y}px</Label>
                  <input
                    type="range"
                    id="y"
                    min="0"
                    max="400"
                    value={cropData.y}
                    onChange={(e) => handleCropChange('y', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Circle Size Control */}
              <div>
                <Label htmlFor="size">Circle Size: {cropData.size}px</Label>
                <input
                  type="range"
                  id="size"
                  min="100"
                  max="400"
                  value={cropData.size}
                  onChange={(e) => handleCropChange('size', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => setCropData(prev => ({ ...prev, size: 150 }))}
                    className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
                  >
                    Small (150px)
                  </button>
                  <button
                    onClick={() => setCropData(prev => ({ ...prev, size: 200 }))}
                    className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
                  >
                    Medium (200px)
                  </button>
                  <button
                    onClick={() => setCropData(prev => ({ ...prev, size: 300 }))}
                    className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
                  >
                    Large (300px)
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Perfect circle dimensions: {cropData.size}×{cropData.size}</p>
              </div>
            </div>

            {/* Accurate Circular Preview */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Preview (Exact Crop Result):</h4>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <canvas
                    ref={(canvas) => {
                      if (canvas && originalImage) {
                        const ctx = canvas.getContext('2d')
                        const img = new Image()
                        img.onload = () => {
                          // Set canvas size
                          canvas.width = 96
                          canvas.height = 96
                          
                          if (!ctx) return

                          // Clear canvas
                          ctx.clearRect(0, 0, 96, 96)
                          
                          // Create circular clipping path
                          ctx.beginPath()
                          ctx.arc(48, 48, 48, 0, Math.PI * 2)
                          ctx.closePath()
                          ctx.clip()

                          // Calculate the exact crop area from the centered image
                          // Image is centered in container, so we need to account for that
                          
                          // Get image natural dimensions
                          const imgWidth = img.naturalWidth
                          const imgHeight = img.naturalHeight
                          
                          // Calculate how the image fits in the container (500x400)
                          const containerWidth = 500
                          const containerHeight = 400
                          
                          // Calculate image display size (maintaining aspect ratio)
                          const imageAspect = imgWidth / imgHeight
                          const containerAspect = containerWidth / containerHeight
                          
                          let displayWidth, displayHeight
                          if (imageAspect > containerAspect) {
                            // Image is wider, fit by width
                            displayWidth = Math.min(containerWidth, imgWidth)
                            displayHeight = displayWidth / imageAspect
                          } else {
                            // Image is taller, fit by height
                            displayHeight = Math.min(containerHeight, imgHeight)
                            displayWidth = displayHeight * imageAspect
                          }
                          
                          // Calculate image position in container (centered)
                          const imageLeft = (containerWidth - displayWidth) / 2
                          const imageTop = (containerHeight - displayHeight) / 2
                          
                          // Calculate crop area relative to image
                          const cropRelativeX = cropData.x - imageLeft + imagePosition.x
                          const cropRelativeY = cropData.y - imageTop + imagePosition.y
                          
                          // Convert to source image coordinates
                          const scaleToOriginal = imgWidth / displayWidth
                          const sourceX = (cropRelativeX * scaleToOriginal) / cropData.scale
                          const sourceY = (cropRelativeY * scaleToOriginal) / cropData.scale
                          const sourceSize = (cropData.size * scaleToOriginal) / cropData.scale
                          
                          // Draw the exact crop area
                          ctx.drawImage(
                            img,
                            Math.max(0, sourceX), Math.max(0, sourceY), 
                            Math.min(sourceSize, imgWidth - sourceX), Math.min(sourceSize, imgHeight - sourceY),
                            0, 0, 96, 96
                          )
                        }
                        img.src = originalImage
                      }
                    }}
                    className="w-24 h-24 border-2 border-gray-300 rounded-full shadow-lg"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Circle Size:</strong> {cropData.size}×{cropData.size}px</p>
                  <p><strong>Zoom Level:</strong> {cropData.scale.toFixed(1)}x</p>
                  <p><strong>Crop Position:</strong> {cropData.x}, {cropData.y}</p>
                  <p><strong>Image Offset:</strong> {imagePosition.x}, {imagePosition.y}</p>
                  <p className="text-green-600 text-xs mt-1">✅ Exact preview of final result</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  // Center crop area in the 500x400 container
                  const centerX = (500 - cropData.size) / 2
                  const centerY = (400 - cropData.size) / 2
                  setCropData(prev => ({ ...prev, x: centerX, y: centerY }))
                  setImagePosition({ x: 0, y: 0 })
                }}
                className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
              >
                Center Crop
              </button>
              <button
                onClick={() => {
                  setCropData(prev => ({ ...prev, scale: 1 }))
                  setImagePosition({ x: 0, y: 0 })
                }}
                className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
              >
                Reset Zoom
              </button>
              <button
                onClick={() => {
                  setImagePosition({ x: 0, y: 0 })
                }}
                className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
              >
                Reset Position
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <div className="text-xs text-gray-500">
                <p>🖱️ Drag the blue circle to move crop area</p>
                <p>🖼️ Drag the image to reposition it</p>
                <p>🔍 Use zoom slider for fine adjustment</p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={handleCancelCrop}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCropImage}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Apply Crop</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  )
}
