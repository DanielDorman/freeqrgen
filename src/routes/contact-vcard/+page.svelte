<script lang="ts">
  let fullName = "";
  let phone = "";
  let email = "";
  let qrstring = "BEGIN:VCARD\nVERSION:3.0\n{fullName}\nTEL:{phone}\nEMAIL:{email}\nEND:VCARD";

  function formatToPhone(input: string): string {
    const digits = input.replace(/\D/g, "").substring(0, 10);
    const areaCode = digits.substring(0, 3);
    const prefix = digits.substring(3, 6);
    const suffix = digits.substring(6, 10);

    if (digits.length > 6) {
      phone = `(${areaCode}) ${prefix}-${suffix}`;
    } else if (digits.length > 3) {
      phone = `(${areaCode}) ${prefix}`;
    } else if (digits.length > 0) {
      phone = `(${areaCode}`;
    } else {
      phone = "";
    }
    return phone;
  }
</script>

<div class="p-6 bg-white rounded-2xl shadow-md space-y-6 w-full max-w-lg min-w-lg">
  <h2 class="text-2xl font-bold text-gray-800 text-center">
    Contact Information (vCard)
  </h2>
  

  <div class="space-y-4">
    <div>
      <label
        for="fullName"
        class="block mb-1 text-sm font-medium text-gray-700"
      >
        Full Name
      </label>
      <input
        type="text"
        id="fullName"
        bind:value={fullName}
        placeholder="e.g. John Doe"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autocomplete="name"
      />
    </div>

    <div>
      <label for="phone" class="block mb-1 text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        bind:value={phone}
        placeholder="e.g. (123) 456-7890"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autocomplete="tel"
        maxlength="14"
      />
    </div>

    <div>
      <label for="email" class="block mb-1 text-sm font-medium text-gray-700">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        bind:value={email}
        placeholder="e.g. john@example.com"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autocomplete="email"
      />
    </div>

    <div class="flex justify-end">
      <a
        href={`/style-code?string=${encodeURIComponent(qrstring)}&return-url=${encodeURIComponent(window.location.pathname)}`}
        class="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transform hover:scale-105 transition-transform duration-200"
      >
        Generate
      </a>
    </div>
  </div>
</div>