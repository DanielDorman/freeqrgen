<script lang="ts">
  let platform = "Instagram";
  let username = "";

  const baseUrls: Record<string, string> = {
    Instagram: "https://instagram.com/",
    Facebook: "https://facebook.com/",
    Twitter: "https://twitter.com/",
    LinkedIn: "https://linkedin.com/in/",
    TikTok: "https://tiktok.com/@",
    YouTube: "https://youtube.com/",
  };

  // Reactive statement to update qrstring whenever platform or username changes
  $: qrstring = username ? `${baseUrls[platform] || ""}${username}` : "";
</script>

<div class="p-6 bg-white rounded-2xl shadow-md space-y-6 w-full max-w-lg min-w-lg">
  <h2 class="text-2xl font-bold text-gray-800 text-center">
    Social Media Profile
  </h2>

  <div class="space-y-4">
    <div>
      <label for="platform" class="block mb-1 text-sm font-medium text-gray-700">
        Platform
      </label>
      <select
        id="platform"
        bind:value={platform}
        class="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>Instagram</option>
        <option>Facebook</option>
        <option>Twitter</option>
        <option>LinkedIn</option>
        <option>TikTok</option>
        <option>YouTube</option>
      </select>
    </div>

    <div>
      <label for="username" class="block mb-1 text-sm font-medium text-gray-700">
        Username or Profile ID
      </label>
      <input
        type="text"
        id="username"
        bind:value={username}
        placeholder="e.g. exampleuser"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex justify-between pt-2">
      <a
        href={`/style-code?string=${encodeURIComponent(qrstring)}&return-url=${encodeURIComponent(window.location.pathname)}`}
        class="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transform hover:scale-105 transition-transform duration-200"
        aria-disabled={!qrstring}
        tabindex={!qrstring ? -1 : 0}
        style={!qrstring ? 'pointer-events: none; opacity: 0.5;' : ''}
      >
        Generate
      </a>
    </div>
  </div>
</div>