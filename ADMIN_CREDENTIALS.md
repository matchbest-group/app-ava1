# 🔐 Admin Login Credentials (MongoDB-Based)

## Admin Portal Access

To access the admin portal at `/admin/login`, use any of these credentials:

### Primary Admin
- **Email**: `admin@avaone.com`
- **Password**: `AvaOne@2024!`
- **Role**: System Administrator

### Super Admin
- **Email**: `superadmin@avaone.com`
- **Password**: `SuperAva@2024!`
- **Role**: Super Administrator

### Development Admin
- **Email**: `dev@avaone.com`
- **Password**: `DevAva@2024!`
- **Role**: Developer

## 🌟 Features

### ✅ Simple MongoDB Authentication
- Direct database authentication (no JWT complexity)
- Session tracking in localStorage
- Auto-logout after 24 hours
- Protected admin routes

### ✅ Database Management
- Admin users stored in `main database > admin_users collection`
- Automatic admin user creation on first login attempt
- Login activity tracking (lastLoginAt, lastLoginIP)
- Role-based permissions system

### ✅ Beautiful UI
- Gradient backgrounds with animations
- Modern glass-morphism design
- Responsive layout
- Interactive elements with hover effects

### ✅ Complete Admin Dashboard
- **Multi-Database Management** - Service connectivity testing
- **Cross-Service Authentication** - Test user login across services
- **User Management** - Add/view/edit users in service databases
- **System Monitoring** - Real-time status indicators

## 🚀 Access Flow

1. Visit: `http://localhost:3000/admin/login`
2. Admin users are automatically created in database on first visit
3. Enter credentials from above
4. Simple session stored in localStorage
5. Access secure admin dashboard

## 🗄️ Database Structure

### Admin Users Collection (`admin_users`)
```javascript
{
  _id: ObjectId,
  email: "admin@avaone.com",
  password: "AvaOne@2024!", // Plain text (should be hashed in production)
  name: "System Administrator",
  role: "admin",
  permissions: ["admin_access", "user_management", "system_management"],
  isActive: true,
  createdAt: "2024-01-01T00:00:00.000Z",
  lastLoginAt: "2024-01-01T10:30:00.000Z",
  lastLoginIP: "192.168.1.1"
}
```

## 🔒 Security Features

- Database-based credential verification
- Login activity tracking
- Session expiration (24 hours)
- Role-based access control
- Admin route protection

## 🛠️ Technical Implementation

### Authentication Flow
1. **Setup**: Admin users created automatically via `/api/admin/setup`
2. **Login**: Credentials verified against `admin_users` collection
3. **Session**: User data stored in localStorage with timestamp
4. **Verification**: Session validity checked on each page load
5. **Logout**: localStorage cleared

### API Endpoints
- `POST /api/admin/setup` - Creates default admin users
- `POST /api/admin/login` - Authenticates admin users
- `DELETE /api/admin/login` - Logout endpoint

---

**⚠️ Production Security**: 
- Hash passwords with bcrypt
- Use environment variables for credentials
- Implement proper session management
- Add rate limiting for login attempts
