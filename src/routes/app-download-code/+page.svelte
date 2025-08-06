<script lang="ts">
  let platform = "Google Play";
  let appId = "";
  import { handleGenerateQR } from "$lib/stores/navigation";

  // Reactive statement to update qrstring whenever platform or appId changes
  $: qrstring = platform === "Google Play"
    ? appId
      ? `https://play.google.com/store/apps/details?id=${appId}`
      : ""
    : platform === "Apple App Store" && appId
    ? `https://apps.apple.com/app/id${appId}`
    : "";

  function handleGenerate() {
    handleGenerateQR(qrstring);
  }
</script>

<div class="p-6 bg-white rounded-2xl shadow-md space-y-6 w-full max-w-lg min-w-lg">
  <h2 class="text-2xl font-bold text-gray-800 text-center">
    App Download Link
  </h2>

  <div class="space-y-4">
    <div>
      <label
        for="platform"
        class="block mb-1 text-sm font-medium text-gray-700"
      >
        Platform
      </label>
      <select
        id="platform"
        bind:value={platform}
        class="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>Google Play</option>
        <option>Apple App Store</option>
      </select>
    </div>

    <div>
      <label for="appid" class="block mb-1 text-sm font-medium text-gray-700">
        App ID
      </label>
      <input
        type="text"
        id="appid"
        bind:value={appId}
        placeholder="e.g. com.example.myapp (Google) or 1234567890 (Apple)"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="mt-4">
      <label for="app-download-link" class="block mb-1 text-sm font-medium text-gray-700">App Download Link</label>
      <input
        type="text"
        id="app-download-link"
        value={qrstring}
        readonly
        class="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700"
      />
    </div>
    <div class="mt-4 flex justify-between">
      <div class="flex justify-end w-full">
        <button
          type="button"
          onclick={handleGenerate}
          class="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transform hover:scale-105 transition-transform duration-200"
          aria-disabled={!qrstring}
          tabindex={!qrstring ? -1 : 0}
          style={!qrstring ? 'pointer-events: none; opacity: 0.5;' : ''}
        >
          Generate
        </button>
      </div>
    </div>
  </div>
</div>