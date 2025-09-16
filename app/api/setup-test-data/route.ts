import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // This will be run on the server side, so we can't access localStorage directly
    // Instead, we'll return instructions for the user
    return NextResponse.json({
      message: 'Please run this in browser console to setup test data',
      instructions: [
        '1. Open browser console (F12)',
        '2. Go to http://localhost:3005/workspace/login',
        '3. Run the following code in console:',
        '',
        '// Create test organization',
        'const testOrg = {',
        '  id: "ORG_MF18BYUL_QL1Y1T",',
        '  name: "Matchbest",',
        '  email: "admin@matchbest.com",',
        '  plan: "standard",',
        '  createdAt: new Date().toISOString(),',
        '  updatedAt: new Date().toISOString()',
        '};',
        'localStorage.setItem("organizations", JSON.stringify([testOrg]));',
        '',
        '// Create test user',
        'const testUser = {',
        '  _id: "user_1",',
        '  organizationId: "ORG_MF18BYUL_QL1Y1T",',
        '  email: "aayushh.mishra2003@gmail.com",',
        '  password: "password123",',
        '  firstName: "Aayush",',
        '  lastName: "Mishra",',
        '  role: "admin",',
        '  organizationName: "Matchbest",',
        '  isActive: true,',
        '  createdAt: new Date().toISOString(),',
        '  updatedAt: new Date().toISOString()',
        '};',
        'localStorage.setItem("org_users_matchbest", JSON.stringify([testUser]));',
        '',
        'console.log("Test data created successfully!");',
        '',
        '4. Try logging in with:',
        '   Organization ID: ORG_MF18BYUL_QL1Y1T',
        '   Email: aayushh.mishra2003@gmail.com',
        '   Password: password123'
      ]
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to setup test data' }, { status: 500 })
  }
}
