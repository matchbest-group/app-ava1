# 🌟 Avaone Suite Multi-Database System Documentation

## 📋 Overview

The Avaone Suite implements a comprehensive multi-database architecture where each organization gets its own dedicated databases across multiple services (Billing, CRM, Pingora). This system ensures complete data isolation, scalability, and service-specific functionality.

## 🏗️ Architecture

### Database Structure
```
Organization: "TechCorp"
├── Main Database (organizations collection)
├── Billing Service Database: "billing_techcorp"
│   ├── user_techcorp (collection)
│   ├── invoices
│   ├── payments
│   ├── subscriptions
│   └── billing_config
├── CRM Service Database: "crm_techcorp"
│   ├── user_techcorp (collection)
│   ├── contacts
│   ├── leads
│   ├── deals
│   └── crm_config
└── Pingora Service Database: "pingora_techcorp"
    ├── user_techcorp (collection)
    ├── teams
    ├── projects
    ├── tasks
    └── pingora_config
```

### Database Naming Convention
- **Service Databases**: `{service}_{sanitized_company_name}`
- **User Collections**: `user_{sanitized_company_name}`
- **Company Name Sanitization**: Lowercase + replace non-alphanumeric with underscores

## 🚀 System Features

### 1. Automatic Database Creation
When a new organization is created:
- ✅ Main database entry is created
- ✅ Service-specific databases are created for Billing, CRM, and Pingora
- ✅ Collections are automatically initialized with proper structure
- ✅ Admin credentials are added to each service database

### 2. Cross-Service Authentication
Users can login with:
- **Organization ID** + **Email** + **Password**
- System automatically searches across all service databases
- Returns authentication status for each service

### 3. Service-Specific User Management
- Users can be added to specific services only
- Role-based permissions per service
- Centralized user management through admin panel

## 🔧 Implementation Details

### Key Files
1. **`lib/multi-database.ts`** - Core multi-database service
2. **`app/api/organizations/route.ts`** - Organization creation with multi-DB
3. **`app/api/workspace/login/route.ts`** - Enhanced authentication
4. **`app/api/admin/manage-service-users/route.ts`** - User management API
5. **`app/admin/multi-database/page.tsx`** - Admin dashboard

### Service URIs
```typescript
const SERVICE_URIS = {
  billing: 'mongodb+srv://Raina_Jangid:DXKVbcg1v3PPKUJl@billing-avaone-cluster.yu4avlo.mongodb.net/',
  crm: 'mongodb+srv://prathammatchbest:RJzRDv3ttJ5ihNsq@matchbest.6d8mq44.mongodb.net/',
  pingora: 'mongodb+srv://aayushhmishra2003:t8u4pg47@cluster0.jroy3k9.mongodb.net/'
}
```

## 📊 Database Schema

### User Collection Schema (`user_{company_name}`)
```typescript
{
  _id: ObjectId,
  organizationId: string,        // Links to main org
  organizationName: string,      // Original org name
  email: string,                 // User email (unique per org)
  password: string,              // User password
  role: 'admin' | 'user' | 'manager',
  permissions: string[],         // Service-specific permissions
  isActive: boolean,             // Account status
  serviceType: 'billing' | 'crm' | 'pingora',
  createdAt: string,
  updatedAt: string,
  createdBy?: string             // Who created this user
}
```

### Service-Specific Collections

#### Billing Service
- `invoices` - Invoice records
- `payments` - Payment transactions
- `subscriptions` - Subscription data
- `billing_config` - Service configuration

#### CRM Service
- `contacts` - Customer contacts
- `leads` - Sales leads
- `deals` - Deal pipeline
- `activities` - Activity logs

#### Pingora Service
- `teams` - Team management
- `projects` - Project data
- `tasks` - Task management
- `communications` - Message history

## 🔐 Authentication Flow

### 1. Organization Creation
```mermaid
sequenceDiagram
    participant Admin as Admin Panel
    participant API as Organization API
    participant MainDB as Main Database
    participant MultiDB as Multi-Database Service
    participant Services as Service Databases
    
    Admin->>API: Create Organization
    API->>MainDB: Save Organization
    API->>MultiDB: Create Service Databases
    MultiDB->>Services: Create Billing DB
    MultiDB->>Services: Create CRM DB
    MultiDB->>Services: Create Pingora DB
    MultiDB->>Services: Add Admin Users
    Services-->>API: Database Creation Results
    API-->>Admin: Organization Created
```

### 2. User Authentication
```mermaid
sequenceDiagram
    participant User as User
    participant API as Login API
    participant MainDB as Main Database
    participant MultiDB as Multi-Database Service
    participant Services as Service Databases
    
    User->>API: Login (OrgID + Email + Password)
    API->>MultiDB: Cross-Service Auth
    MultiDB->>MainDB: Get Organization Name
    MultiDB->>Services: Check Billing DB
    MultiDB->>Services: Check CRM DB
    MultiDB->>Services: Check Pingora DB
    Services-->>MultiDB: Authentication Results
    MultiDB-->>API: Authenticated Services
    API-->>User: Login Success + Service Access
```

## 🛠️ API Endpoints

### 1. Organization Management
```http
POST /api/organizations
# Creates organization + all service databases

GET /api/organizations
# Lists all organizations

PUT /api/organizations/{id}
# Updates organization

DELETE /api/organizations/{id}
# Deletes organization + all service databases
```

### 2. Authentication
```http
POST /api/workspace/login
Body: {
  "accountId": "org_123",
  "email": "user@company.com",
  "password": "password123"
}
Response: {
  "success": true,
  "user": { ... },
  "authenticatedServices": ["billing", "crm", "pingora"],
  "loginMethod": "cross_service_auth"
}
```

### 3. User Management
```http
POST /api/admin/manage-service-users
# Add user to service databases

GET /api/admin/manage-service-users?organizationName=TechCorp
# Get users from service databases

PUT /api/admin/manage-service-users
# Update user in service databases

DELETE /api/admin/manage-service-users?organizationName=TechCorp&email=user@company.com
# Delete user from service databases
```

### 4. Multi-Database Testing
```http
GET /api/admin/multi-database-test
# Test service connectivity

POST /api/admin/multi-database-test
# Test cross-service authentication
```

## 🎯 Usage Examples

### 1. Create Organization with Multi-Database Setup
```typescript
const orgData = {
  id: "org_techcorp_001",
  name: "TechCorp Solutions",
  adminEmail: "admin@techcorp.com",
  adminPassword: "secure123",
  // ... other org data
}

const response = await fetch('/api/organizations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orgData)
})

// Results in:
// 1. Main database: organizations collection entry
// 2. billing_techcorp_solutions database with user_techcorp_solutions collection
// 3. crm_techcorp_solutions database with user_techcorp_solutions collection
// 4. pingora_techcorp_solutions database with user_techcorp_solutions collection
```

### 2. User Login with Cross-Service Authentication
```typescript
const loginData = {
  accountId: "org_techcorp_001",
  email: "admin@techcorp.com",
  password: "secure123"
}

const response = await fetch('/api/workspace/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(loginData)
})

// System checks user_techcorp_solutions collection in:
// - billing_techcorp_solutions database
// - crm_techcorp_solutions database  
// - pingora_techcorp_solutions database
// Returns which services the user is authenticated for
```

### 3. Add User to Specific Services
```typescript
const userData = {
  organizationId: "org_techcorp_001",
  organizationName: "TechCorp Solutions",
  email: "manager@techcorp.com",
  password: "manager123",
  role: "manager",
  services: ["billing", "crm"] // Only add to billing and CRM
}

const response = await fetch('/api/admin/manage-service-users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData)
})

// User will be added to:
// - user_techcorp_solutions in billing_techcorp_solutions
// - user_techcorp_solutions in crm_techcorp_solutions
// But NOT to pingora_techcorp_solutions
```

## 🔍 Admin Dashboard Features

### Multi-Database Management Panel (`/admin/multi-database`)

#### 1. Connectivity Testing
- Test connections to all service clusters
- Real-time status indicators
- Service-specific connection health

#### 2. Authentication Testing
- Test cross-service authentication
- Verify user credentials across services
- View authenticated service details

#### 3. User Management
- Add users to specific services
- View users in service databases
- Role and permission management
- Bulk user operations

## 🚨 Security Considerations

### 1. Password Storage
- **Current**: Plain text passwords (needs encryption)
- **Recommended**: Hash passwords with bcrypt/scrypt

### 2. Database Credentials
- **Current**: Hardcoded in service URIs
- **Recommended**: Environment variables

### 3. Access Control
- Service-specific permissions
- Role-based access control
- Organization data isolation

## 📈 Performance Optimization

### 1. Connection Pooling
- Reuse database connections
- Service-specific connection pools
- Connection health monitoring

### 2. Caching Strategy
- Cache organization mappings
- Service authentication results
- User permission caching

### 3. Query Optimization
- Index on user collections
- Efficient cross-service queries
- Batch operations for user management

## 🔄 Migration Path

### Phase 1: Current Implementation ✅
- Multi-database creation
- Cross-service authentication
- User management APIs
- Admin dashboard

### Phase 2: Security Enhancements 🚧
- Password encryption
- Environment-based configuration
- JWT token authentication
- API rate limiting

### Phase 3: Performance Optimization 📋
- Connection pooling optimization
- Caching layer implementation
- Query performance tuning
- Real-time monitoring

### Phase 4: Advanced Features 📋
- Database backup automation
- Service health monitoring
- Automated scaling
- Audit logging

## 🛡️ Backup and Recovery

### Recommendation
```bash
# Create backup scripts for each service
mongodump --uri "mongodb+srv://..." --db "billing_company" --out backup/
mongodump --uri "mongodb+srv://..." --db "crm_company" --out backup/
mongodump --uri "mongodb+srv://..." --db "pingora_company" --out backup/

# Automated backup scheduling
crontab -e
0 2 * * * /path/to/backup-script.sh
```

## 📞 Support and Troubleshooting

### Common Issues

1. **Service Connection Failed**
   - Check MongoDB Atlas connectivity
   - Verify credentials and network access
   - Use connectivity test in admin dashboard

2. **Authentication Failed**
   - Verify organization ID exists
   - Check user exists in service databases
   - Use authentication test tool

3. **User Creation Failed**
   - Ensure organization exists
   - Check service database connectivity
   - Verify collection naming convention

### Monitoring Endpoints
- `/api/admin/multi-database-test` - Service health check
- Admin dashboard - Real-time system status
- Console logs - Detailed operation tracking

## 📚 Related Documentation
- [Avaone Suite Architecture Documentation](./AVAONE_SUITE_ARCHITECTURE_DOCUMENTATION.md)
- [Database Schema Documentation](./lib/types.ts)
- [API Routes Documentation](./app/api/README.md)

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Maintainer**: Avaone Development Team
