import { MongoClient, Db } from 'mongodb'

if (!process.env.MONGODB_URI) {
  console.warn('MongoDB URI not found. Using fallback for development.')
}

const uri = process.env.MONGODB_URI;
const options = {}

// Ensure we have a valid URI before proceeding
if (!uri) {
  throw new Error('MONGODB_URI environment variable is required')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
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
