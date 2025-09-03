// This script will show what's in localStorage
// Run this in browser console

console.log('=== CHECKING LOCALSTORAGE ===');

// Check organizations
const organizations = localStorage.getItem('organizations');
if (organizations) {
  console.log('\n=== ORGANIZATIONS ===');
  const orgs = JSON.parse(organizations);
  orgs.forEach(org => {
    console.log(`ID: ${org.id}`);
    console.log(`Name: ${org.name}`);
    console.log(`Admin Email: ${org.adminEmail}`);
    console.log(`Admin Password: ${org.adminPassword}`);
    console.log(`License Status: ${org.licenseStatus}`);
    console.log('---');
  });
} else {
  console.log('No organizations found in localStorage');
}

// Check workspace users
const workspaceUsers = localStorage.getItem('workspace_users');
if (workspaceUsers) {
  console.log('\n=== WORKSPACE USERS ===');
  const users = JSON.parse(workspaceUsers);
  users.forEach(user => {
    console.log(`Account ID: ${user.accountId}`);
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${user.password}`);
    console.log(`Organization: ${user.organizationName}`);
    console.log(`Plan: ${user.plan}`);
    console.log('---');
  });
} else {
  console.log('No workspace users found in localStorage');
}

// Check all localStorage keys
console.log('\n=== ALL LOCALSTORAGE KEYS ===');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`Key: ${key}`);
  try {
    const value = localStorage.getItem(key);
    if (value && value.startsWith('[') || value.startsWith('{')) {
      console.log(`Value: ${value.substring(0, 200)}...`);
    } else {
      console.log(`Value: ${value}`);
    }
  } catch (e) {
    console.log(`Value: [Error reading value]`);
  }
  console.log('---');
}
