import { NextResponse } from 'next/server'
import { getMainDb } from '@/lib/mongodb'

export async function GET() {
  try {
    console.log('Health check: Testing MongoDB connection...')
    const db = await getMainDb()
    await db.admin().ping()
    console.log('Health check: MongoDB connection successful')
    return NextResponse.json({ 
      status: 'ok', 
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check: Database connection failed:', error)
    return NextResponse.json(
      { 
        status: 'error', 
        database: 'disconnected', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
