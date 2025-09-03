# Oreayu Organization Login Guide

## Database Structure
Based on your MongoDB Compass screenshot, here's the actual database structure:

**Database:** `org_oreayu`  
**Collection:** `users`  
**Organization ID:** `ORG_MF18GGDI_V0YCDA`

## Test Credentials
Use these credentials to test the workspace login:

```
Organization ID: ORG_MF18GGDI_V0YCDA
Email: aayushh.mishra2003@gmail.com
Password: t8u4pg47
```

## How to Test

### 1. Go to Workspace Login Page
Navigate to: `/workspace/login`

### 2. Enter Credentials
- **Organization ID:** `ORG_MF18GGDI_V0YCDA`
- **Email:** `aayushh.mishra2003@gmail.com`
- **Password:** `t8u4pg47`

### 3. Click Login
The system will:
1. Check if `ORG_MF18GGDI_V0YCDA` exists in main database
2. Connect to `org_oreayu` database
3. Validate user credentials in `users` collection
4. Login successful if credentials match

## Expected Results

### ✅ Successful Login
- User will be redirected to `/workspace/dashboard`
- Session data will be stored in localStorage
- User role: `admin`

### ❌ Failed Login Scenarios
- **Wrong Organization ID:** "Invalid credentials"
- **Wrong Email:** "Invalid credentials"
- **Wrong Password:** "Invalid credentials"

## Database Validation Process

```
1. Main Database Check:
   - Database: company_management
   - Collection: organizations
   - Query: { id: "ORG_MF18GGDI_V0YCDA" }

2. Organization Database Check:
   - Database: org_oreayu
   - Collection: users
   - Query: {
       organizationId: "ORG_MF18GGDI_V0YCDA",
       email: "aayushh.mishra2003@gmail.com",
       password: "t8u4pg47",
       isActive: true
     }
```

## Troubleshooting

### If Login Fails:
1. Check if organization exists in main database
2. Verify user document exists in `org_oreayu.users`
3. Ensure `isActive: true`
4. Check console logs for detailed error messages

### Console Logs to Look For:
```
✅ Found organization: oreayu for Organization ID: ORG_MF18GGDI_V0YCDA
✅ User authenticated successfully in organization: oreayu
✅ User role: admin
```

## API Endpoint
**POST** `/api/workspace/login`

**Request Body:**
```json
{
  "accountId": "ORG_MF18GGDI_V0YCDA",
  "email": "aayushh.mishra2003@gmail.com",
  "password": "t8u4pg47"
}
```

**Success Response:**
```json
{
  "success": true,
  "user": {
    "_id": "68b5b1e0b5575a92ce47329c",
    "accountId": "ORG_MF18GGDI_V0YCDA",
    "email": "aayushh.mishra2003@gmail.com",
    "organizationName": "oreayu",
    "plan": "standard",
    "createdAt": "2025-09-01T14:46:56.017Z",
    "updatedAt": "2025-09-01T14:46:56.017Z"
  }
}
```
