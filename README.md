# Admin Panel - Organization Management System

This is a comprehensive admin panel for managing multiple organizations. The system allows administrators to create, view, and manage organization details with unique account IDs.

## Features

### 🔐 Authentication
- **Password Protection**: Secure login with password `t8u4pg47`
- **Session Management**: Persistent authentication using localStorage
- **Route Protection**: Protected admin routes with automatic redirects

### 🏢 Organization Management
- **Create Organizations**: Add new organizations with comprehensive details
- **Unique Account IDs**: Automatically generated unique identifiers for each organization
- **Organization Details**: Store and manage:
  - Organization name
  - Email address
  - Phone number
  - Physical address
  - Industry classification
  - Employee count
  - Founded year
  - Website URL
  - Description

### 📊 Dashboard Features
- **Statistics Overview**: View total organizations, active organizations, and monthly additions
- **Organization Cards**: Display all organizations in an organized card layout
- **Real-time Updates**: Immediate updates when adding new organizations
- **Success Notifications**: Visual feedback when organizations are created

### 🎨 User Interface
- **Modern Design**: Clean, professional interface using Tailwind CSS
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Interactive Elements**: Hover effects, loading states, and smooth animations
- **Form Validation**: Comprehensive input validation with error messages

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-showcase
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Access the admin panel**
   - Open [http://localhost:3000](http://localhost:3000)
   - You'll be redirected to the login page
   - Use password: `t8u4pg47`

## Usage

### Login
1. Navigate to the admin panel
2. Enter the password: `t8u4pg47`
3. Click "Sign In"

### Adding Organizations
1. Click "Add Organization" button
2. Fill in the required fields:
   - **Organization Name** (required)
   - **Email** (required, must be valid format)
   - **Phone Number** (required)
   - **Address** (required)
   - **Industry** (required, select from dropdown)
   - **Employee Count** (required, select from dropdown)
   - **Founded Year** (required, between 1800 and current year)
   - **Website** (optional)
   - **Description** (optional)
3. Click "Create Organization"
4. A unique account ID will be generated automatically
5. Success notification will appear with the new organization details

### Viewing Organizations
- All organizations are displayed on the dashboard
- Each organization card shows:
  - Organization name and industry
  - Unique account ID
  - Contact information
  - Employee count and founded year
  - Creation date

### Logout
- Click the "Logout" button in the top-right corner
- You'll be redirected to the login page

## Technical Details

### Architecture
- **Frontend**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom components
- **State Management**: React hooks and localStorage
- **Authentication**: Client-side password verification
- **Data Storage**: Browser localStorage (for demo purposes)

### File Structure
```
app/
├── admin/
│   ├── login/page.tsx          # Login page
│   └── dashboard/page.tsx      # Main dashboard
├── page.tsx                    # Redirects to admin login
components/
├── organization-form.tsx       # Organization creation form
├── success-notification.tsx    # Success notification component
└── ui/                        # Reusable UI components
hooks/
└── use-auth.ts               # Authentication hook
```

### Key Components

#### `OrganizationForm`
- Comprehensive form for organization creation
- Real-time validation
- Error handling and user feedback
- Modal overlay design

#### `SuccessNotification`
- Toast-style notification
- Auto-dismiss after 5 seconds
- Shows organization ID and name
- Smooth animations

#### `useAuth` Hook
- Manages authentication state
- Provides login/logout functions
- Handles route protection
- Persistent session management

## Security Considerations

⚠️ **Important Notes**:
- This is a demo implementation using client-side authentication
- Password is hardcoded for demonstration purposes
- Data is stored in localStorage (not suitable for production)
- For production use, implement:
  - Server-side authentication
  - Secure password hashing
  - Database storage
  - HTTPS encryption
  - Session management
  - Rate limiting

## Customization

### Changing the Password
Edit the password in:
- `app/admin/login/page.tsx` (line with password check)
- `hooks/use-auth.ts` (login function)

### Adding New Fields
1. Update the `Organization` interface in `app/admin/dashboard/page.tsx`
2. Add form fields in `components/organization-form.tsx`
3. Update the form validation logic
4. Modify the organization card display

### Styling
- All styling uses Tailwind CSS classes
- Custom components are in `components/ui/`
- Theme can be customized in `tailwind.config.js`

## Support

For questions or issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure you're using the correct password
4. Clear localStorage if experiencing authentication issues

## License

This project is for demonstration purposes. Please implement proper security measures for production use.
