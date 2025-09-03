# Workspace Login Flow with Organization ID Validation

## Overview

The workspace login system now implements a two-step validation process:

1. **Organization ID Validation**: First checks if the provided Organization ID exists in the main database
2. **User Credential Validation**: Then validates user credentials in the organization-specific database

## Database Architecture

### Main Database (`company_management`)
- **Collection**: `organizations`
- **Purpose**: Stores organization information and validates Organization IDs
- **Key Fields**: `id` (Organization ID), `name`, `adminEmail`, `adminPassword`, etc.

### Organization Databases (`org_[organization_name]`)
- **Collection**: `users`
- **Purpose**: Stores user accounts specific to each organization
- **Key Fields**: `accountId`, `email`, `password`, `organizationName`, `isActive`, etc.

## Login Flow Process

### Step 1: Organization ID Validation
```javascript
// Check if Organization ID exists in main database
const organization = await organizationsCollection.findOne({ id: organizationId })
if (!organization) {
  return null // Organization ID not found
}
```

### Step 2: Organization Database Connection
```javascript
// Connect to organization-specific database
const orgDb = await getOrganizationDb(organization.name)
const usersCollection = orgDb.collection('users')
```

### Step 3: User Credential Validation
```javascript
// Check user credentials in organization's user collection
const user = await usersCollection.findOne({
  accountId: organizationId,
  email: email,
  password: password,
  isActive: true
})
```

## API Endpoint

**POST** `/api/workspace/login`

### Request Body
```json
{
  "accountId": "ORG001",
  "email": "user@example.com",
  "password": "password123"
}
```

### Response (Success)
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "accountId": "ORG001",
    "email": "user@example.com",
    "organizationName": "Example Corp",
    "plan": "standard",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Response (Error)
```json
{
  "error": "Invalid credentials. Please check your Organization ID, Email, and Password."
}
```

## Security Benefits

1. **Multi-tenant Isolation**: Each organization has its own database
2. **Organization ID Validation**: Prevents unauthorized access attempts
3. **User Isolation**: Users can only access their organization's data
4. **Centralized Management**: Main database tracks all organizations

## Error Handling

The system provides detailed logging for debugging:

- Organization ID not found in any organization
- Organization found but user credentials invalid
- Successful authentication with organization details

## Fallback Support

If MongoDB is unavailable, the system falls back to localStorage-based authentication with the same validation logic.

## Usage Example

```javascript
// Frontend login request
const response = await fetch('/api/workspace/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    accountId: 'ORG001', // This is the Organization ID
    email: 'user@example.com',
    password: 'password123'
  })
})

const data = await response.json()
if (data.success) {
  // Store user session
  localStorage.setItem('workspaceUser', JSON.stringify(data.user))
  localStorage.setItem('workspaceAuthenticated', 'true')
  localStorage.setItem('currentOrganization', data.user.organizationName)
}
```

## Database Setup

### Creating an Organization
```javascript
// Main database
await MainDatabaseService.createOrganization({
  id: 'ORG001', // This is the Organization ID
  name: 'Example Corp',
  adminEmail: 'admin@example.com',
  adminPassword: 'admin123',
  // ... other fields
})
```

### Creating Organization Users
```javascript
// Organization-specific database
await OrganizationDatabaseService.createOrganizationUser('Example Corp', {
  accountId: 'ORG001', // Should match the Organization ID
  email: 'user@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  organizationId: 'ORG001',
  organizationName: 'Example Corp',
  role: 'user',
  isActive: true
})
```

## Testing

Use the provided test script (`test-login-flow.js`) to verify the login flow works correctly with various scenarios:

- Valid user credentials
- Invalid organization ID
- Valid organization ID but wrong credentials
- Inactive user accounts

## Validation Process

### Step 1: Organization ID Check
- Validates if the organization ID exists in the main database
- Determines which organization the user belongs to

### Step 2: Email & Password Check
- Validates user credentials in the organization-specific database
- Ensures user is active and has proper permissions

### Step 3: Authentication Success
- Returns user data with organization information
- Stores session data for the authenticated user
