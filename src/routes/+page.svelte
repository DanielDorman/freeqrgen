<script lang="ts">
  import {
    Contact,
    Wifi,
    Download,
    Instagram,
  } from "lucide-svelte";

 let qrstring = ""

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && qrstring.trim() !== "") {
      window.location.href = `/style-code?string=${encodeURIComponent(qrstring)}`;
    }
  }

</script>



<div
  class="flex flex-col items-center justify-center p-4 space-y-4 transition-all duration-700 ease-out animate-fade-in"
>
 
    <input
      type="text"
      placeholder="Enter your link."
      bind:value={qrstring}
      on:keydown={handleKeydown}
      class="p-2 border rounded w-full max-w-md animate-fade-in"
    />

  <div class="flex flex-col items-center space-y-4">
    <a
      class="px-4 py-2 bg-green-600 text-white rounded shadow inline-flex items-center justify-center transition-transform duration-200
        {qrstring.trim() ? 'hover:bg-green-700 transform hover:scale-105' : 'opacity-50 pointer-events-none cursor-not-allowed'}"
      role="button"
      tabindex={qrstring.trim() ? 0 : -1}
      href={qrstring.trim() ? `/style-code?string=${encodeURIComponent(qrstring)}` : undefined}
      aria-disabled={!qrstring.trim()}
      style={!qrstring.trim() ? 'pointer-events: none; opacity: 0.5;' : ''}
    >
      Generate
    </a>
  </div>
    <div class="mt-8 animate-fade-in">
      <h2 class="text-xl font-semibold">Try One of Our Builders</h2>
      <div class="grid grid-cols-2 gap-4 max-w-md mt-4">
        <a
          href="/contact-vcard"
          class="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transform hover:scale-105 transition-transform duration-200"
        >
          <Contact size={20} /> <span>vCard</span>
        </a>

        <a
          href="/wifi"
          class="flex items-center justify-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transform hover:scale-105 transition-transform duration-200"
        >
          <Wifi size={20} /> <span>Wi-Fi</span>
        </a>

        <a
          href="/app-download-code"
          class="flex items-center justify-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transform hover:scale-105 transition-transform duration-200"
        >
          <Download size={20} /> <span>App Download</span>
        </a>

        <a
          href="/social-media"
          class="flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transform hover:scale-105 transition-transform duration-200"
        >
          <Instagram size={20} /> <span>Social Media</span>
        </a>
      </div>
    </div>
</div>

<style>
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out both;
  }
</style>
