<script lang="ts">
  let ssid = "";
  let password = "";
  let security = "WPA"; // Default to WPA
  let hidden = false;

  // Escape special characters for SSID and password
  function escape(str: string) {
    return str.replace(/([\\;"',:])/g, "\\$1");
  }

  // Generate the Wi-Fi QR string in the correct format
  $: qrstring = (() => {
    let s = `WIFI:T:${security};S:${escape(ssid)};`;
    if (security !== "nopass") s += `P:${escape(password)};`;
    if (hidden) s += "H:true;";
    s += ";";
    return s;
  })();
</script>

<div
  class="p-6 bg-white rounded-2xl shadow-md space-y-6 max-w-lg min-w-lg"
>
  <h2 class="text-2xl font-bold text-gray-800 text-center">
    Wi-Fi Information
  </h2>

  <div class="space-y-4">
    <div>
      <label for="ssid" class="block mb-1 text-sm font-medium text-gray-700">
        Network Name (SSID)
      </label>
      <input
        type="text"
        id="ssid"
        bind:value={ssid}
        placeholder="e.g. MyNetwork"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autocomplete="off"
      />
    </div>

    <div>
      <label
        for="password"
        class="block mb-1 text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <input
        type="text"
        id="password"
        bind:value={password}
        placeholder="e.g. supersecure123"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autocomplete="off"
        disabled={security === "nopass"}
      />
    </div>

    <div>
      <label
        for="security"
        class="block mb-1 text-sm font-medium text-gray-700"
      >
        Security Type
      </label>
      <select
        id="security"
        bind:value={security}
        class="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="WPA">WPA/WPA2</option>
        <option value="WEP">WEP</option>
        <option value="nopass">None</option>
      </select>
    </div>

    <div class="flex items-center space-x-2">
      <input
        type="checkbox"
        id="hidden"
        bind:checked={hidden}
        class="rounded border-gray-300 focus:ring-blue-500"
      />
      <label for="hidden" class="text-sm font-medium text-gray-700">
        Hidden Network
      </label>
    </div>

    <div class="flex justify-end pt-2">
      <a
        href={`/style-code?string=${encodeURIComponent(qrstring)}&return-url=${encodeURIComponent(window.location.pathname)}`}
        class="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transform hover:scale-105 transition-transform duration-200"
        aria-disabled={!ssid}
        tabindex={!ssid ? -1 : 0}
        style={!ssid ? 'pointer-events: none; opacity: 0.5;' : ''}
      >
        Generate
      </a>
    </div>
  </div>
</div>