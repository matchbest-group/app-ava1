import { MongoClient, Db } from 'mongodb'

if (!process.env.MONGODB_URI) {
  console.warn('MongoDB URI not found. Using fallback for development.')
  console.log('Available env variables:', Object.keys(process.env).filter(key => key.includes('MONGO')))
} else {
  console.log('MongoDB URI found:', process.env.MONGODB_URI ? 'SET' : 'NOT SET')
}

// Temporary hardcoded URI for testing - directly using the URI since env loading is having issues
const uri = 'mongodb+srv://avaone_matchbest:t8u4pg47@cluster0.y6exufq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const pingoraUri = 'mongodb+srv://aayushhmishra2003:t8u4pg47@cluster0.jroy3k9.mongodb.net/matchbest_new?retryWrites=true&w=majority&appName=Cluster0';
const crmUri = 'mongodb+srv://prathammatchbest:RJzRDv3ttJ5ihNsq@matchbest.6d8mq44.mongodb.net/?retryWrites=true&w=majority&appName=matchbest';

// Set RESEND_API_KEY if not already set
if (!process.env.RESEND_API_KEY) {
  process.env.RESEND_API_KEY = 're_LcuLk8Qz_JgHWm5tnSXk6VcdkdSADBC22';
  console.log('📁 Set RESEND_API_KEY directly');
}

console.log('Environment variables status:')
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'LOADED' : 'NOT LOADED')
console.log('MONGODB_URI_PINGORA:', process.env.MONGODB_URI_PINGORA ? 'LOADED' : 'NOT LOADED')
console.log('MONGODB_URI_CRM:', process.env.MONGODB_URI_CRM ? 'LOADED' : 'NOT LOADED')
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'LOADED' : 'NOT LOADED')
const options = {}

// Ensure we have a valid URI before proceeding
if (!uri) {
  throw new Error('MONGODB_URI environment variable is required')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

let pingoraClient: MongoClient | null = null
let pingoraClientPromise: Promise<MongoClient> | null = null

let crmClient: MongoClient | null = null
let crmClientPromise: Promise<MongoClient> | null = null

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
    _pingoraClientPromise?: Promise<MongoClient> | null
    _crmClientPromise?: Promise<MongoClient> | null
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise

  // Only create Pingora connection if URI is provided
  if (pingoraUri && !globalWithMongo._pingoraClientPromise) {
    try {
      pingoraClient = new MongoClient(pingoraUri, options)
      globalWithMongo._pingoraClientPromise = pingoraClient.connect()
      console.log('Pingora MongoDB connection created successfully')
    } catch (error) {
      console.warn('Failed to create Pingora MongoDB connection:', error)
      globalWithMongo._pingoraClientPromise = null
    }
  }
  pingoraClientPromise = globalWithMongo._pingoraClientPromise || null

  // Only create CRM connection if URI is provided
  if (crmUri && !globalWithMongo._crmClientPromise) {
    try {
      crmClient = new MongoClient(crmUri, options)
      globalWithMongo._crmClientPromise = crmClient.connect()
      console.log('CRM MongoDB connection created successfully')
    } catch (error) {
      console.warn('Failed to create CRM MongoDB connection:', error)
      globalWithMongo._crmClientPromise = null
    }
  }
  crmClientPromise = globalWithMongo._crmClientPromise || null
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()

  // Only create Pingora connection if URI is provided
  if (pingoraUri) {
    try {
      pingoraClient = new MongoClient(pingoraUri, options)
      pingoraClientPromise = pingoraClient.connect()
    } catch (error) {
      console.warn('Failed to create Pingora MongoDB connection:', error)
    }
  }

  // Only create CRM connection if URI is provided
  if (crmUri) {
    try {
      crmClient = new MongoClient(crmUri, options)
      crmClientPromise = crmClient.connect()
    } catch (error) {
      console.warn('Failed to create CRM MongoDB connection:', error)
    }
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { clientPromise, pingoraClientPromise, crmClientPromise }
export default clientPromise

// Function to get organization-specific database
export async function getOrganizationDb(orgName: string): Promise<Db> {
  const client = await clientPromise
  const dbName = `org_${orgName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
  return client.db(dbName)
}

// Function to get main database
export async function getMainDb(): Promise<Db> {
  const client = await clientPromise
  return client.db(process.env.MONGODB_DB_NAME || 'company_management')
}

// Function to get Pingora database
export async function getPingoraDb(): Promise<Db | null> {
  if (!pingoraClientPromise) {
    console.warn('Pingora MongoDB connection not available')
    return null
  }
  try {
    const client = await pingoraClientPromise
    return client.db(process.env.PINGORA_DB_NAME || 'matchbest_new')
  } catch (error) {
    console.error('Error connecting to Pingora database:', error)
    return null
  }
}

// Function to get CRM database
export async function getCrmDb(): Promise<Db | null> {
  if (!crmClientPromise) {
    console.warn('CRM MongoDB connection not available')
    return null
  }
  try {
    const client = await crmClientPromise
    return client.db(process.env.CRM_DB_NAME || 'test')
  } catch (error) {
    console.error('Error connecting to CRM database:', error)
    return null
  }
}
