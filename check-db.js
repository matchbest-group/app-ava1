const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });

// Debug: Check environment variables
console.log('Environment variables loaded:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('MONGODB_DB_NAME:', process.env.MONGODB_DB_NAME);
console.log('ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? 'SET' : 'NOT SET');

async function checkCredentials() {
  // Use the MongoDB Atlas URI from environment
  const uri = process.env.MONGODB_URI;
  console.log('Using URI:', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials in log
  
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Check main database
    const mainDb = client.db('company_management');
    
    // Get organizations
    const organizations = await mainDb.collection('organizations').find({}).toArray();
    console.log('\n=== ORGANIZATIONS ===');
    if (organizations.length === 0) {
      console.log('No organizations found');
    } else {
      organizations.forEach(org => {
        console.log(`ID: ${org.id}`);
        console.log(`Name: ${org.name}`);
        console.log(`Admin Email: ${org.adminEmail}`);
        console.log(`Admin Password: ${org.adminPassword}`);
        console.log(`License Status: ${org.licenseStatus}`);
        console.log('---');
      });
    }

    // Get workspace users
    const workspaceUsers = await mainDb.collection('workspace_users').find({}).toArray();
    console.log('\n=== WORKSPACE USERS ===');
    if (workspaceUsers.length === 0) {
      console.log('No workspace users found');
    } else {
      workspaceUsers.forEach(user => {
        console.log(`Account ID: ${user.accountId}`);
        console.log(`Email: ${user.email}`);
        console.log(`Password: ${user.password}`);
        console.log(`Organization: ${user.organizationName}`);
        console.log(`Plan: ${user.plan}`);
        console.log('---');
      });
    }

    // Check organization-specific databases
    console.log('\n=== ORGANIZATION DATABASES ===');
    const dbList = await client.db().admin().listDatabases();
    const orgDbs = dbList.databases.filter(db => db.name.startsWith('org_'));
    
    if (orgDbs.length === 0) {
      console.log('No organization databases found');
    } else {
      for (const dbInfo of orgDbs) {
        console.log(`\nDatabase: ${dbInfo.name}`);
        const orgDb = client.db(dbInfo.name);
        const users = await orgDb.collection('users').find({}).toArray();
        if (users.length === 0) {
          console.log('  No users found in this database');
        } else {
          users.forEach(user => {
            console.log(`  Email: ${user.email}`);
            console.log(`  Password: ${user.password}`);
            console.log(`  Role: ${user.role}`);
            console.log(`  Active: ${user.isActive}`);
          });
        }
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\nMongoDB connection failed. Please check:');
      console.log('1. Your MongoDB Atlas URI in .env.local file');
      console.log('2. Network connectivity');
      console.log('3. IP whitelist in MongoDB Atlas');
    }
  } finally {
    await client.close();
  }
}

checkCredentials();
