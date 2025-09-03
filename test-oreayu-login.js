// Test script for oreayu organization login
// Based on the MongoDB Compass screenshot showing the actual database structure

console.log('=== Oreayu Organization Login Test ===\n')

// Test data based on the actual database structure shown in MongoDB Compass
const testCases = [
  {
    organizationId: 'ORG_MF18GGDI_V0YCDA', // From the actual DB
    email: 'aayushh.mishra2003@gmail.com', // From the actual DB
    password: 't8u4pg47', // From the actual DB
    description: 'Valid admin user in oreayu organization'
  },
  {
    organizationId: 'ORG_MF18GGDI_V0YCDA',
    email: 'aayushh.mishra2003@gmail.com',
    password: 'wrongpassword',
    description: 'Valid organization ID and email but wrong password'
  },
  {
    organizationId: 'INVALID_ORG_ID',
    email: 'aayushh.mishra2003@gmail.com',
    password: 't8u4pg47',
    description: 'Invalid organization ID'
  },
  {
    organizationId: 'ORG_MF18GGDI_V0YCDA',
    email: 'wrong@email.com',
    password: 't8u4pg47',
    description: 'Valid organization ID but wrong email'
  }
]

async function testOreayuLogin() {
  console.log('Testing login with actual database credentials...\n')
  
  for (const testCase of testCases) {
    console.log(`🧪 Testing: ${testCase.description}`)
    console.log(`   Organization ID: ${testCase.organizationId}`)
    console.log(`   Email: ${testCase.email}`)
    console.log(`   Password: ${testCase.password}`)
    
    try {
      const response = await fetch('/api/workspace/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: testCase.organizationId, // API expects accountId
          email: testCase.email,
          password: testCase.password
        }),
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        console.log('   ✅ Login successful!')
        console.log(`   Organization: ${data.user.organizationName}`)
        console.log(`   User ID: ${data.user._id}`)
        console.log(`   Email: ${data.user.email}`)
      } else {
        console.log('   ❌ Login failed!')
        console.log(`   Error: ${data.error}`)
      }
    } catch (error) {
      console.log('   ❌ Request failed!')
      console.log(`   Error: ${error.message}`)
    }
    
    console.log('   ---\n')
  }
}

// Database structure explanation
console.log('=== Database Structure Analysis ===\n')

console.log('Based on MongoDB Compass screenshot:')
console.log('Database: org_oreayu')
console.log('Collection: users')
console.log('Document structure:')
console.log('{')
console.log('  _id: ObjectId("68b5b1e0b5575a92ce47329c")')
console.log('  email: "aayushh.mishra2003@gmail.com"')
console.log('  password: "t8u4pg47"')
console.log('  organizationId: "ORG_MF18GGDI_V0YCDA"')
console.log('  organizationName: "oreayu"')
console.log('  role: "admin"')
console.log('  isActive: true')
console.log('  createdAt: "2025-09-01T14:46:56.017Z"')
console.log('  updatedAt: "2025-09-01T14:46:56.017Z"')
console.log('}\n')

console.log('=== Login Flow for Oreayu ===\n')

console.log('1. User enters Organization ID: ORG_MF18GGDI_V0YCDA')
console.log('2. User enters Email: aayushh.mishra2003@gmail.com')
console.log('3. User enters Password: t8u4pg47')
console.log('4. System validates Organization ID in main database')
console.log('5. System connects to org_oreayu database')
console.log('6. System checks user credentials in users collection')
console.log('7. If valid, user is logged in as admin\n')

console.log('=== Expected Results ===\n')

console.log('✅ Valid credentials should login successfully')
console.log('❌ Invalid organization ID should fail')
console.log('❌ Wrong email should fail')
console.log('❌ Wrong password should fail\n')

// Run the test
testOreayuLogin()
