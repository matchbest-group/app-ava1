'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import WorkspaceLayout from '@/components/workspace-layout'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts'
import {
  MessageSquare, Users, Clock, TrendingUp, ThumbsUp, Brain,
  Target, AlertCircle, Zap, Activity, Calendar,
  Download, RefreshCw, Filter, Search, MoreVertical,
  Smile, Frown, Meh, CheckCircle, XCircle, Star, ArrowUp, ArrowDown,
  HelpCircle, BarChart3, PieChart as PieChartIcon, TrendingDown,
  Globe, Smartphone, Monitor, Tablet
} from 'lucide-react'

interface ConversationAnalytics {
  conversationId: string
  websiteId: string
  sessionDuration: number
  messageCount: number
  userMessages: number
  aiMessages: number
  startTime: string
  endTime: string
  userIntent: string
  topicsDiscussed: string[]
  sentimentAnalysis: {
    overall: string
    score: number
  }
  issueResolved: boolean
  resolutionType: string
  userSatisfaction: string
  frequentQuestions: string[]
  technicalIssues: string[]
  featureRequests: string[]
  commonKeywords: string[]
  conversationQuality: {
    coherence: number
    helpfulness: number
    completeness: number
  }
  businessMetrics: {
    leadGenerated: boolean
    demoRequested: boolean
    supportTicketCreated: boolean
    planInquiry?: string
  }
  metadata: {
    userAgent: string
    deviceType: string
    location: string
    referrer: string
  }
}

interface AnalyticsEntry {
  id: string
  source: string
  timestamp: string
  analytics: ConversationAnalytics
  version: string
  processedAt: string
}

const COLORS = {
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#F59E0B',
  warning: '#EF4444',
  info: '#8B5CF6',
  success: '#059669',
  neutral: '#6B7280',
  light: '#F3F4F6',
  gradient: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']
}

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic'

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [user, setUser] = useState<any>(null)
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('workspaceUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Failed to parse user data:', error)
      }
    }
    
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/workspace/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate FAQ data from analytics
  const frequentQuestions = analytics.reduce((acc, entry) => {
    entry.analytics.frequentQuestions.forEach(question => {
      acc[question] = (acc[question] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const topFAQs = Object.entries(frequentQuestions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([question, count]) => ({
      question,
      count,
      percentage: ((count / analytics.length) * 100).toFixed(1),
      category: "General" // You can categorize based on question content if needed
    }))

  // Calculate topics data for radial chart
  const topicsData = analytics.reduce((acc, entry) => {
    entry.analytics.topicsDiscussed.forEach(topic => {
      acc[topic] = (acc[topic] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const topTopicsForRadial = Object.entries(topicsData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([topic, count]) => ({
      name: topic,
      value: count,
      fill: COLORS.gradient[Object.keys(topicsData).indexOf(topic) % COLORS.gradient.length]
    }))

  const deviceData = analytics.reduce((acc, entry) => {
    const device = entry.analytics.metadata.deviceType
    acc[device] = (acc[device] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const deviceChartData = Object.entries(deviceData).map(([device, count]) => ({
    name: device.charAt(0).toUpperCase() + device.slice(1),
    value: count,
    percentage: ((count / analytics.length) * 100).toFixed(1)
  }))

  const businessMetrics = {
    leadsGenerated: analytics.filter(entry => entry.analytics.businessMetrics.leadGenerated).length,
    demosRequested: analytics.filter(entry => entry.analytics.businessMetrics.demoRequested).length,
    supportTickets: analytics.filter(entry => entry.analytics.businessMetrics.supportTicketCreated).length,
    planInquiries: analytics.reduce((acc, entry) => {
      const plan = entry.analytics.businessMetrics.planInquiry
      if (plan) acc[plan] = (acc[plan] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  }

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'desktop': return <Monitor className="w-4 h-4" />
      case 'mobile': return <Smartphone className="w-4 h-4" />
      case 'tablet': return <Tablet className="w-4 h-4" />
      default: return <Globe className="w-4 h-4" />
    }
  }
  const overviewMetrics = {
    totalConversations: analytics.length,
    totalMessages: analytics.reduce((sum, entry) => sum + entry.analytics.messageCount, 0),
    avgSessionDuration: analytics.length > 0
      ? analytics.reduce((sum, entry) => sum + (entry.analytics.sessionDuration || 0), 0) / analytics.length
      : 0,
    resolutionRate: analytics.length > 0
      ? (analytics.filter(entry => entry.analytics.issueResolved).length / analytics.length) * 100
      : 0,
    avgSatisfaction: analytics.length > 0
      ? analytics.reduce((sum, entry) => {
        const satisfaction = entry.analytics.userSatisfaction
        if (satisfaction === 'high') return sum + 5
        if (satisfaction === 'medium') return sum + 3
        if (satisfaction === 'low') return sum + 1
        return sum
      }, 0) / analytics.length
      : 0,
    leadGeneration: analytics.filter(entry => entry.analytics.businessMetrics.leadGenerated).length
  }

  // Prepare chart data
  const dailyConversations = analytics.reduce((acc, entry) => {
    const date = new Date(entry.timestamp).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const conversationData = Object.entries(dailyConversations).map(([date, count]) => ({
    date,
    conversations: count
  })).slice(-7)

  const sentimentData = analytics.reduce((acc, entry) => {
    const sentiment = entry.analytics.sentimentAnalysis.overall
    acc[sentiment] = (acc[sentiment] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sentimentChartData = Object.entries(sentimentData).map(([sentiment, count]) => ({
    name: sentiment.charAt(0).toUpperCase() + sentiment.slice(1),
    value: count,
    percentage: ((count / analytics.length) * 100).toFixed(1)
  }))

  const topTopics = Object.entries(topicsData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([topic, count]) => ({ topic, count }))

  const qualityData = analytics.map(entry => ({
    conversation: entry.id.slice(-8),
    coherence: entry.analytics.conversationQuality.coherence,
    helpfulness: entry.analytics.conversationQuality.helpfulness,
    completeness: entry.analytics.conversationQuality.completeness
  })).slice(-10)

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return <Smile className="w-4 h-4 text-green-600" />
      case 'negative': return <Frown className="w-4 h-4 text-red-600" />
      default: return <Meh className="w-4 h-4 text-yellow-600" />
    }
  }

  const getSatisfactionColor = (satisfaction: string) => {
    switch (satisfaction) {
      case 'high': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading || !user) {
    return (
      <WorkspaceLayout user={user} selectedProducts={selectedProducts}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>Loading analytics...</span>
          </div>
        </div>
      </WorkspaceLayout>
    )
  }

  return (
    <WorkspaceLayout user={user} selectedProducts={selectedProducts}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1400px] mx-auto p-6 space-y-6">
          {/* Clean Professional Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-600">Live Analytics</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600 text-base max-w-2xl">
                  Comprehensive insights and performance metrics for chatbot interactions
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={loadAnalytics}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
          {/* Professional KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewMetrics.totalConversations}</p>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs font-medium">+12%</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Total Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewMetrics.totalMessages}</p>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs font-medium">+8%</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Users className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                    <p className="text-2xl font-bold text-gray-900">{Math.round(overviewMetrics.avgSessionDuration)}s</p>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingDown className="w-3 h-3" />
                      <span className="text-xs font-medium">-5%</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewMetrics.resolutionRate.toFixed(1)}%</p>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs font-medium">+3%</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewMetrics.avgSatisfaction.toFixed(1)}/5</p>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs font-medium">+0.3</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Star className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">Lead Generation</p>
                    <p className="text-2xl font-bold text-gray-900">{overviewMetrics.leadGeneration}</p>
                    <div className="flex items-center space-x-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs font-medium">+22%</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Target className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
                <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-white/10 rounded-full"></div>
              </CardContent>
            </Card>
          </div>

          {/* Professional Charts Section */}
          <Tabs defaultValue="conversations" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-auto grid-cols-6 bg-white border border-gray-200">
                <TabsTrigger value="conversations" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
                  Conversations
                </TabsTrigger>
                <TabsTrigger value="sentiment" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
                  Sentiment
                </TabsTrigger>
                <TabsTrigger value="topics" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
                  Topics
                </TabsTrigger>
                <TabsTrigger value="quality" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
                  Quality
                </TabsTrigger>
                <TabsTrigger value="faq" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
                  FAQ Analysis
                </TabsTrigger>
                <TabsTrigger value="details" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">
                  Details
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Live Data</span>
              </div>
            </div>

            <TabsContent value="conversations" className="space-y-6">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Daily Conversations</CardTitle>
                      <CardDescription className="text-gray-600">Conversation volume trends over the last 7 days</CardDescription>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={conversationData}>
                      <defs>
                        <linearGradient id="conversationGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                      <YAxis stroke="#6B7280" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          color: '#374151',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="conversations"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fill="url(#conversationGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sentiment">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment Distribution</CardTitle>
                    <CardDescription>Overall sentiment analysis of conversations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={sentimentChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sentimentChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS.gradient[index % COLORS.gradient.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment Breakdown</CardTitle>
                    <CardDescription>Detailed sentiment analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sentimentChartData.map((item, index) => (
                        <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-3">
                            {getSentimentIcon(item.name)}
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{item.value} conversations</div>
                            <div className="text-sm text-gray-600">{item.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="topics">
              <Card>
                <CardHeader>
                  <CardTitle>Most Discussed Topics</CardTitle>
                  <CardDescription>Top topics from user conversations</CardDescription>
                </CardHeader>
                <CardContent>
                  {topTopics.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={topTopics} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="topic" type="category" width={120} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            color: '#374151',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="count" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No topic data available</p>
                      <p className="text-sm">Topics will appear as conversations are analyzed.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quality">
              <Card>
                <CardHeader>
                  <CardTitle>Conversation Quality Metrics</CardTitle>
                  <CardDescription>Quality scores for recent conversations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={qualityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="conversation" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="coherence" fill="#3B82F6" name="Coherence" />
                      <Bar dataKey="helpfulness" fill="#10B981" name="Helpfulness" />
                      <Bar dataKey="completeness" fill="#F59E0B" name="Completeness" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* FAQ Analytics Card */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-900">Most Asked Questions</CardTitle>
                        <CardDescription className="text-gray-600">Top frequently asked questions by users</CardDescription>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <HelpCircle className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {topFAQs.length > 0 ? topFAQs.map((faq, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-all">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                {faq.category}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${Math.max((faq.count / Math.max(...topFAQs.map(f => f.count))) * 100, 10)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-600 min-w-[3rem]">{faq.count}</span>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8 text-gray-500">
                          <HelpCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p>No FAQ data available yet.</p>
                          <p className="text-sm">Questions will appear as users interact with the chatbot.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Categories Card */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-900">Question Categories</CardTitle>
                        <CardDescription className="text-gray-600">Distribution of question types</CardDescription>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={topTopicsForRadial}>
                        <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            color: '#374151',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </RadialBarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 space-y-3">
                      {topTopicsForRadial.length > 0 ? topTopicsForRadial.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: topic.fill }}
                            ></div>
                            <span className="font-medium text-gray-800">{topic.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">{topic.value}</div>
                            <div className="text-sm text-gray-600">
                              {((topic.value / analytics.length) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-4 text-gray-500">
                          <p>No topic data available yet.</p>
                          <p className="text-sm">Topics will appear as conversations are analyzed.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Resolution Stats */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold">✅ FAQ Resolution Performance</CardTitle>
                      <CardDescription className="text-green-100">How effectively common questions are being resolved</CardDescription>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                      <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                      <div className="text-sm font-medium text-green-800">Resolution Rate</div>
                      <div className="text-xs text-green-600 mt-1">+2.1% vs last week</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                      <div className="text-3xl font-bold text-blue-600 mb-2">1.8s</div>
                      <div className="text-sm font-medium text-blue-800">Avg Response Time</div>
                      <div className="text-xs text-blue-600 mt-1">-0.3s improvement</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                      <div className="text-3xl font-bold text-purple-600 mb-2">4.7/5</div>
                      <div className="text-sm font-medium text-purple-800">User Satisfaction</div>
                      <div className="text-xs text-purple-600 mt-1">+0.2 rating increase</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl">
                      <div className="text-3xl font-bold text-orange-600 mb-2">87%</div>
                      <div className="text-sm font-medium text-orange-800">First Contact Resolution</div>
                      <div className="text-xs text-orange-600 mt-1">+5% improvement</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Conversations</CardTitle>
                  <CardDescription>Detailed view of recent chatbot interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.slice(0, 10).map((entry) => (
                      <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {/* <Badge variant="outline">{entry.analytics.websiteId}</Badge> */}
                            <span className="text-sm text-gray-600">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getSentimentIcon(entry.analytics.sentimentAnalysis.overall)}
                            <Badge className={getSatisfactionColor(entry.analytics.userSatisfaction)}>
                              {entry.analytics.userSatisfaction} satisfaction
                            </Badge>
                            {entry.analytics.issueResolved ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Messages:</span>
                            <span className="ml-2 font-medium">{entry.analytics.messageCount}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Duration:</span>
                            <span className="ml-2 font-medium">{entry.analytics.sessionDuration || 0}s</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Intent:</span>
                            <span className="ml-2 font-medium">{entry.analytics.userIntent}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Device:</span>
                            <span className="ml-2 font-medium">{entry.analytics.metadata.deviceType}</span>
                          </div>
                        </div>

                        {entry.analytics.topicsDiscussed.length > 0 && (
                          <div>
                            <span className="text-sm text-gray-600">Topics: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {entry.analytics.topicsDiscussed.slice(0, 5).map((topic, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </WorkspaceLayout>
  )
}
