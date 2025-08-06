<script>
  let { children } = $props();
  import "../app.css";
  import { ArrowLeft, Home } from "lucide-svelte";
  import { navigationState, handleBackNavigation } from "$lib/stores/navigation";

  // Get navigation state from store
  const navigationData = $derived($navigationState);
  const isRootPath = $derived(navigationData.isRootPath);
  const canGoBack = $derived(navigationData.canGoBack);
</script>

<div class="min-h-screen flex flex-col" style="max-height: 100vh;">
  <main class="flex-1 flex flex-col items-center justify-center px-2">
    <h1 class="text-3xl font-bold text-center mb-6 animate-fade-in w-full">
      <a href="/">
        Free QR Code Generator
      </a>
    </h1>
    <div class="w-fit bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-8 animate-fade-in backdrop-blur-sm">
      {@render children()}
    </div>
  <div class="flex flex-row flex-wrap gap-3 mb-4">
    <button
      type="button"
      class="flex items-center space-x-2 px-3 py-1.5 rounded shadow transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      class:bg-red-600={!isRootPath}
      class:text-white={!isRootPath}
      class:hover:bg-red-700={!isRootPath}
      class:bg-gray-400={isRootPath}
      class:text-gray-600={isRootPath}
      disabled={isRootPath}
      onclick={handleBackNavigation}
    >
      <ArrowLeft class="w-5 h-5 mr-2" />
      <span>Back</span>
    </button>
    <a
      href="/"
      class="flex items-center space-x-2 px-3 py-1.5 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 transition-colors duration-200"
      aria-label="Home"
      style="width: fit-content;"
    >
      <Home class="w-5 h-5 mr-2" />
      <span>Home</span>
    </a>
  </div>
  </main>

  <footer class="py-6 border-t text-center text-sm text-gray-500" style="max-height: 80px;">
    <div class="space-x-4">
      <a
        href="/privacy-policy"
        class="hover:underline hover:text-gray-700 transition-colors"
      >
        Privacy Policy
      </a>
      <span>|</span>
      <a
        href="/terms-of-service"
        class="hover:underline hover:text-gray-700 transition-colors"
      >
        Terms of Service
      </a>
    </div>
  </footer>
</div>
