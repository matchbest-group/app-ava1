// Test script to verify all three database connections work
import { getPingoraDb, getCrmDb, getMainDb, getOrganizationDb } from './lib/mongodb.js'

async function testConnections() {
  console.log('🔄 Testing database connections...\n')

  try {
    // Test Ava One main database
    console.log('1. Testing Ava One main database...')
    const mainDb = await getMainDb()
    console.log('✅ Ava One main database connected:', mainDb.databaseName)
  } catch (error) {
    console.log('❌ Ava One main database failed:', error.message)
  }

  try {
    // Test Pingora database
    console.log('\n2. Testing Pingora database...')
    const pingoraDb = await getPingoraDb()
    if (pingoraDb) {
      console.log('✅ Pingora database connected:', pingoraDb.databaseName)
      
      // Test collection access
      const collections = await pingoraDb.listCollections().toArray()
      console.log('📁 Pingora collections:', collections.map(c => c.name).join(', ') || 'No collections yet')
    } else {
      console.log('❌ Pingora database connection failed')
    }
  } catch (error) {
    console.log('❌ Pingora database failed:', error.message)
  }

  try {
    // Test CRM database
    console.log('\n3. Testing CRM database...')
    const crmDb = await getCrmDb()
    if (crmDb) {
      console.log('✅ CRM database connected:', crmDb.databaseName)
      
      // Test collection access
      const collections = await crmDb.listCollections().toArray()
      console.log('📁 CRM collections:', collections.map(c => c.name).join(', ') || 'No collections yet')
    } else {
      console.log('❌ CRM database connection failed')
    }
  } catch (error) {
    console.log('❌ CRM database failed:', error.message)
  }

  try {
    // Test organization database (example)
    console.log('\n4. Testing organization database (example with "testorg")...')
    const orgDb = await getOrganizationDb('testorg')
    console.log('✅ Organization database connected:', orgDb.databaseName)
  } catch (error) {
    console.log('❌ Organization database failed:', error.message)
  }

  console.log('\n🏁 Database connection test completed!')
}

testConnections().catch(console.error)
