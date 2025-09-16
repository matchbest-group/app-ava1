'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Edit3, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Image as ImageIcon,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react'

interface TextEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  placeholder?: string
}

export function TextEditor({ label, value, onChange, multiline = false, placeholder }: TextEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const handleSave = () => {
    onChange(tempValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempValue(value)
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <div className="group p-3 border rounded-lg hover:border-blue-300 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {multiline ? (
            <div className="whitespace-pre-wrap">{value || placeholder}</div>
          ) : (
            <div className="truncate">{value || placeholder}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 border-2 border-blue-300 rounded-lg bg-blue-50/50 dark:bg-blue-900/10">
      <Label className="text-sm font-medium mb-2 block">{label}</Label>
      {multiline ? (
        <Textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="mb-3"
        />
      ) : (
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder={placeholder}
          className="mb-3"
        />
      )}
      <div className="flex space-x-2">
        <Button size="sm" onClick={handleSave}>
          <Save className="w-3 h-3 mr-1" />
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          <X className="w-3 h-3 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  )
}

interface PriceEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
  currency?: string
}

export function PriceEditor({ label, value, onChange, currency = '$' }: PriceEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value.replace(currency, ''))

  const handleSave = () => {
    onChange(`${currency}${tempValue}`)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempValue(value.replace(currency, ''))
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <div className="group p-3 border rounded-lg hover:border-green-300 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-lg font-semibold text-green-600 dark:text-green-400">
          {value}
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 border-2 border-green-300 rounded-lg bg-green-50/50 dark:bg-green-900/10">
      <Label className="text-sm font-medium mb-2 block">{label}</Label>
      <div className="flex items-center mb-3">
        <span className="text-lg font-semibold mr-2">{currency}</span>
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder="0.00"
          className="flex-1"
          type="number"
        />
      </div>
      <div className="flex space-x-2">
        <Button size="sm" onClick={handleSave}>
          <Save className="w-3 h-3 mr-1" />
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          <X className="w-3 h-3 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  )
}

interface ImageEditorProps {
  label: string
  value: string
  onChange: (value: string) => void
  alt?: string
  onAltChange?: (alt: string) => void
}

export function ImageEditor({ label, value, onChange, alt, onAltChange }: ImageEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const [tempAlt, setTempAlt] = useState(alt || '')

  const handleSave = () => {
    onChange(tempValue)
    if (onAltChange) onAltChange(tempAlt)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempValue(value)
    setTempAlt(alt || '')
    setIsEditing(false)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await fetch('/api/cms/upload', {
          method: 'POST',
          body: formData
        })
        
        if (response.ok) {
          const result = await response.json()
          setTempValue(result.url)
        } else {
          // Fallback to data URL for preview
          const reader = new FileReader()
          reader.onload = (e) => {
            setTempValue(e.target?.result as string)
          }
          reader.readAsDataURL(file)
        }
      } catch (error) {
        // Fallback to data URL for preview
        const reader = new FileReader()
        reader.onload = (e) => {
          setTempValue(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  if (!isEditing) {
    return (
      <div className="group p-3 border rounded-lg hover:border-purple-300 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-3">
          {value ? (
            <img 
              src={value} 
              alt={alt} 
              className="w-16 h-16 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <div className="text-sm font-medium truncate max-w-32">{value || 'No image'}</div>
            {alt && <div className="text-xs text-gray-500">{alt}</div>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 border-2 border-purple-300 rounded-lg bg-purple-50/50 dark:bg-purple-900/10">
      <Label className="text-sm font-medium mb-3 block">{label}</Label>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          {tempValue ? (
            <img 
              src={tempValue} 
              alt={tempAlt} 
              className="w-20 h-20 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
          
          <div className="flex-1">
            <Input
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              placeholder="Image URL"
              className="mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              <Upload className="w-3 h-3 mr-1" />
              Upload
            </Button>
          </div>
        </div>
        
        {onAltChange && (
          <Input
            value={tempAlt}
            onChange={(e) => setTempAlt(e.target.value)}
            placeholder="Alt text (for accessibility)"
          />
        )}
        
        <div className="flex space-x-2">
          <Button size="sm" onClick={handleSave}>
            <Save className="w-3 h-3 mr-1" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="w-3 h-3 mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

interface ListEditorProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}

export function ListEditor({ label, items, onChange, placeholder }: ListEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempItems, setTempItems] = useState([...items])

  const handleSave = () => {
    onChange(tempItems.filter(item => item.trim() !== ''))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempItems([...items])
    setIsEditing(false)
  }

  const addItem = () => {
    setTempItems([...tempItems, ''])
  }

  const removeItem = (index: number) => {
    setTempItems(tempItems.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, value: string) => {
    const newItems = [...tempItems]
    newItems[index] = value
    setTempItems(newItems)
  }

  if (!isEditing) {
    return (
      <div className="group p-3 border rounded-lg hover:border-orange-300 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-1">
          {items.length > 0 ? items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="text-sm">{item}</span>
            </div>
          )) : (
            <div className="text-sm text-gray-500">{placeholder}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 border-2 border-orange-300 rounded-lg bg-orange-50/50 dark:bg-orange-900/10">
      <Label className="text-sm font-medium mb-3 block">{label}</Label>
      
      <div className="space-y-2 mb-3">
        {tempItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
        
        <Button
          size="sm"
          variant="outline"
          onClick={addItem}
          className="w-full"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Item
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <Button size="sm" onClick={handleSave}>
          <Save className="w-3 h-3 mr-1" />
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          <X className="w-3 h-3 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  )
}

interface SectionEditorProps {
  title: string
  children: React.ReactNode
  isVisible?: boolean
  onToggleVisibility?: (visible: boolean) => void
}

export function SectionEditor({ title, children, isVisible = true, onToggleVisibility }: SectionEditorProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={isVisible ? "default" : "secondary"}>
              {isVisible ? "Visible" : "Hidden"}
            </Badge>
            {onToggleVisibility && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onToggleVisibility(!isVisible)}
              >
                {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={isVisible ? '' : 'opacity-50 pointer-events-none'}>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
