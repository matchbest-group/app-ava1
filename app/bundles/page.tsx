// BUNDLES PAGE - TEMPORARILY DISABLED
// This page has been commented out along with the bundle configuration component
// To re-enable, uncomment the component in bundle-configuration.tsx and this page

import { redirect } from 'next/navigation'

export default function BundlesPage() {
  // Redirect to home page since bundles are disabled
  redirect('/')
}
