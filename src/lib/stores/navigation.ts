import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { derived } from 'svelte/store';
import { goto } from '$app/navigation';

// Store for navigation state
export const navigationStore = writable({
  isRootPath: false,
  canGoBack: false,
  currentQRString: '',
  returnPath: ''
});

// Derived store that updates based on current page
export const navigationState = derived(
  [page, navigationStore],
  ([$page, $navigationStore]) => {
    const isRootPath = $page.url.pathname === "/";
    
    // Check if we can go back (not root and has history)
    const canGoBack = browser && !isRootPath && history.length > 1;
    
    return {
      isRootPath,
      canGoBack,
      currentQRString: $navigationStore.currentQRString,
      returnPath: $navigationStore.returnPath
    };
  }
);

// Function to handle back navigation
export function handleBackNavigation() {
  if (!browser) return;
  
  // Check if there's a previous page in history
  if (history.length > 1) {
    // Get the previous page from history
    const previousPage = document.referrer;
    
    // Check if the previous page is within the freeqrgen.app domain
    if (previousPage && (previousPage.includes('freeqrgen.app') || previousPage.includes('localhost'))) {
      history.back();
    } else {
      // Redirect to home if previous page is not within our domain
      window.location.href = '/';
    }
  } else {
    // If no history, go to home
    window.location.href = '/';
  }
}

// Function to handle QR code generation navigation
export function handleGenerateQR(qrString: string, returnUrl: string | null = null) {
  if (!browser) return;
  
  // Get the current pathname if returnUrl is not provided
  const currentPath = returnUrl || window.location.pathname;
  
  // Update the store with current QR string and return path
  navigationStore.update(store => ({
    ...store,
    currentQRString: qrString,
    returnPath: currentPath
  }));
  
  // Navigate to style-code page with the QR string and return URL
  const styleCodeUrl = `/style-code?string=${encodeURIComponent(qrString)}&return-url=${encodeURIComponent(currentPath)}`;
  goto(styleCodeUrl);
} 