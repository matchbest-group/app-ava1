import { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AVA One - Admin Panel',
  description: 'Admin panel for managing AVA One website content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">AVA 1 Admin</h1>
          </div>
          <nav className="mt-6">
            <div className="px-6 py-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Management
              </h3>
            </div>
            <div className="mt-2 space-y-1">
              <a
                href="/admin/website"
                className="group flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Website Content
              </a>
              <a
                href="/admin/leads"
                className="group flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Leads Management
              </a>
              <a
                href="/admin/dashboard"
                className="group flex items-center px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Dashboard
              </a>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
