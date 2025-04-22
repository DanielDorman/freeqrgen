<script lang="ts">
  import { onMount } from "svelte";
  import QRCodeStyling from "qr-code-styling";
  import { Download, Check } from "lucide-svelte";
  import type { QROptions, DotType } from "$lib/types";
  import { page } from "$app/stores";

  // Inputs as variables
  let size: number = 200;
  let dotType: DotType = "rounded";
  let dotColor: string = "#000000";
  let dotGradientType: string = "";
  let dotGradientStart: string = "#000000";
  let dotGradientEnd: string = "#3333ff";
  let dotGradientRotation: number = 0;

  let cornerSquareType: string = "square";
  let cornerSquareColor: string = "#000000";
  let cornerDotType: string = "dot";
  let cornerDotColor: string = "#000000";

  let backgroundColor: string = "#ffffff";
  let backgroundGradientType: string = "";
  let backgroundGradientStart: string = "#ffffff";
  let backgroundGradientEnd: string = "#e0e0e0";
  let backgroundGradientRotation: number = 0;

  let qrCodeData: any = null;
  let showCheck = false;
  // Get QR string from URL
  const qrString = $page.url.searchParams.get("string") || "";

  if (!qrString) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }
  
  //doesn't work kinda shit.
  // if (window.location.origin !== "https://freeqrgen.app") {
  //   if (typeof window !== "undefined") {
  //     window.location.href = "/";
  //   }
  // }
  // if(window.location.origin === "http://localhost:5173") {
  //   if (typeof window !== "undefined") {
  //     window.location.href = "/";
  //   }
  // }

  // Helper to build QROptions object from variables
  function buildQROptions(Xreal: number, Yreal: number): QROptions {
    const dotsGradient = dotGradientType
      ? {
          type: dotGradientType as "linear" | "radial",
          rotation:
            dotGradientType === "linear" ? dotGradientRotation : undefined,
          colorStops: [
            { offset: 0, color: dotGradientStart },
            { offset: 1, color: dotGradientEnd },
          ],
        }
      : undefined;

    const backgroundGradient = backgroundGradientType
      ? {
          type: backgroundGradientType as "linear" | "radial",
          rotation:
            backgroundGradientType === "linear"
              ? backgroundGradientRotation
              : undefined,
          colorStops: [
            { offset: 0, color: backgroundGradientStart },
            { offset: 1, color: backgroundGradientEnd },
          ],
        }
      : undefined;

    return {
      // use fixed size for preview because we are rending an actual image which screws up the DOM.
      width: Xreal !== 0 ? Xreal : 200,
      height: Yreal !== 0 ? Yreal : 200,
      data: qrString,
      type: "svg",
      image: "",
      margin: 0,
      qrOptions: {
        mode: "Byte",
        errorCorrectionLevel: "M",
      },
      imageOptions: {
        hideBackgroundDots: false,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: "anonymous",
      },
      dotsOptions: {
        color: dotColor,
        type: dotType,
        gradient: dotsGradient,
      },
      backgroundOptions: {
        color: backgroundColor,
        gradient: backgroundGradient,
      },
      cornersSquareOptions: {
        color: cornerSquareColor,
        type: cornerSquareType as "dot" | "square" | "extra-rounded",
        gradient: undefined,
      },
      cornersDotOptions: {
        color: cornerDotColor,
        type: cornerDotType as "dot" | "square",
        gradient: undefined,
      },
    };
  }

  function clearCanvas() {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      canvas.innerHTML = "";
    }
  }

  function generate() {
    try {
      clearCanvas();
      const options: QROptions = buildQROptions(0, 0);
      qrCodeData = new QRCodeStyling(options);
      qrCodeData.append(document.getElementById("canvas") || undefined);
    } catch (err) {
      console.error(err);
    }
  }

  async function downloadQR() {
    const options: QROptions = buildQROptions(size, size);
    qrCodeData = new QRCodeStyling(options);
    if (qrCodeData) {
      qrCodeData.download();
    }
  }

  
  onMount(() => {
    generate();
  });

 

  $: [
    size,
    dotType,
    dotColor,
    dotGradientType,
    dotGradientStart,
    dotGradientEnd,
    dotGradientRotation,
    cornerSquareType,
    cornerSquareColor,
    cornerDotType,
    cornerDotColor,
    backgroundColor,
    backgroundGradientType,
    backgroundGradientStart,
    backgroundGradientEnd,
    backgroundGradientRotation,
  ], generate();
</script>

<div class="flex flex-col items-center md:flex-row justify-center w-full mx-auto mb-8">
  <div class="flex flex-col items-center w-full space-y-4 mb-6">
    <div class="flex flex-col items-center space-y-4">
      <div
        id="canvas"
        class="p-4 shadow-lg animate-fade-in flex items-center justify-center bg-white"
      ></div>
      <div class="flex flex-col items-center space-y-2 w-full mt-6">
        <label for="size-slider" class="text-sm font-medium text-gray-700 mb-1">
          QR Code Size: <span class="font-semibold text-blue-700">{size}px</span
          >
        </label>
        <input
          id="size-slider"
          type="range"
          min="100"
          max="500"
          step="10"
          bind:value={size}
          class="w-64 accent-blue-600"
        />
      </div>
      <button
        on:click={async () => {
          await downloadQR();
          showCheck = true;
          setTimeout(() => (showCheck = false), 1500);
        }}
        class="plausible-event-name=qr_code_downloadinline-flex items-center px-5 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-transform duration-200 font-semibold"
      >
        {#if showCheck}
          <Check class="w-5 h-5 mr-2 text-white" />
        {:else}
          <Download class="w-5 h-5 mr-2" />
          Download
        {/if}
      </button>
    </div>
  </div>

  <!-- QR Styling Options Controls -->
  <form class="mb-6 bg-white/80 border border-gray-200 rounded-2xl shadow p-4">
    <div class="flex flex-col md:flex-row md:gap-8 gap-6 w-full">
      <!-- Dot Style --> 
      <div class="flex-1 min-w-[180px]">
        <label
          for="dot-style-label"
          class="block mb-2 text-sm font-semibold text-gray-700"
          >Dot Style</label
        >
        <div
          id="dot-style-label"
          role="radiogroup"
          class="flex flex-wrap gap-2"
        >
          {#each [{ label: "Dots", value: "dots" }, { label: "Rounded", value: "rounded" }, { label: "Classy", value: "classy" }, { label: "Classy Rounded", value: "classy-rounded" }, { label: "Square", value: "square" }, { label: "Extra Rounded", value: "extra-rounded" }] as dot}
            <label
              class="inline-flex items-center cursor-pointer px-3 py-1.5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-blue-50 transition-colors
                {dotType === dot.value
                ? 'ring-2 ring-blue-400 border-blue-400 bg-blue-100 font-semibold'
                : ''}"
              style="min-width: 120px; justify-content: center;"
            >
              <input
                id="dot-type-{dot.value}"
                type="radio"
                name="dotType"
                value={dot.value}
                checked={dotType === dot.value}
                on:change={() => {
                  dotType = dot.value as DotType;
                }}
                class="form-radio accent-blue-600 mr-2"
                style="accent-color: #2563eb;"
              />
              <span>{dot.label}</span>
            </label>
          {/each}
        </div>
      </div>

      <!-- Dot Color -->
      <div class="flex-1 min-w-[180px]">
        <label
          for="dot-color-input"
          class="block mb-2 text-sm font-semibold text-gray-700"
          >Dot Color</label
        >
        <input
          id="dot-color-input"
          type="color"
          bind:value={dotColor}
          on:input={(e) => {
            dotColor = (e.target as HTMLInputElement).value;
          }}
          class="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer shadow"
        />
      </div>

      <!-- Dot Gradient -->
      <div class="flex-1 min-w-[220px]">
        <label
          for="dot-gradient-input"
          class="block mb-2 text-sm font-semibold text-gray-700"
          >Dot Gradient</label
        >
        <div class="relative">
          <select
            id="dot-gradient-input"
            bind:value={dotGradientType}
            on:change={(e) => {
              dotGradientType = (e.target as HTMLSelectElement).value;
            }}
            class="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none shadow"
            style="min-width: 140px;"
          >
            <option value="">None</option>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
          <span
            class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            ▼
          </span>
        </div>
        {#if dotGradientType}
          <div class="flex flex-col gap-2 mt-2">
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Start</span>
              <input
                type="color"
                bind:value={dotGradientStart}
                class="w-8 h-8 border rounded"
              />
              <span class="text-xs text-gray-500">End</span>
              <input
                type="color"
                bind:value={dotGradientEnd}
                class="w-8 h-8 border rounded"
              />
            </div>
            {#if dotGradientType === "linear"}
              <div class="flex items-center gap-2">
                <label
                  for="dot-gradient-rotation-input"
                  class="text-xs text-gray-500">Rotation</label
                >
                <input
                  id="dot-gradient-rotation-input"
                  type="number"
                  min="0"
                  max="360"
                  step="1"
                  bind:value={dotGradientRotation}
                  class="w-16 px-2 py-1 border rounded"
                />
                <span class="text-xs text-gray-500">deg</span>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>

    <div class="flex flex-col md:flex-row md:gap-8 gap-6 w-full mt-8">
      <!-- Corner Square Type -->
      <div class="flex-1 min-w-[180px]">
        <label
          for="corner-square-style-label"
          class="block mb-2 text-sm font-semibold text-gray-700"
          >Corner Square Style</label
        >
        <div
          id="corner-square-style-label"
          role="radiogroup"
          class="flex flex-wrap gap-2"
        >
          {#each [{ label: "Dot", value: "dot" }, { label: "Square", value: "square" }, { label: "Extra Rounded", value: "extra-rounded" }] as corner}
            <label
              class="inline-flex items-center cursor-pointer px-3 py-1.5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-blue-50 transition-colors
              {cornerSquareType === corner.value
                ? 'ring-2 ring-blue-400 border-blue-400 bg-blue-100 font-semibold'
                : ''}"
            >
              <input
                id="corner-square-type-{corner.value}"
                type="radio"
                name="cornerSquareType"
                value={corner.value}
                checked={cornerSquareType === corner.value}
                on:change={() => {
                  cornerSquareType = corner.value;
                }}
                class="form-radio accent-blue-600 mr-2"
                style="accent-color: #2563eb;"
              />
              <span>{corner.label}</span>
            </label>
          {/each}
        </div>
      </div>

      <!-- Corner Square Color -->
      <div class="flex-1 min-w-[180px]">
        <label
          for="corner-square-color-input"
          class="block mb-2 text-sm font-semibold text-gray-700"
          >Corner Square Color</label
        >
        <input
          id="corner-square-color-input"
          type="color"
          bind:value={cornerSquareColor}
          class="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer shadow"
        />
      </div>

      <!-- Corner Dot Type -->
      <div class="flex-1 min-w-[180px]">
        <label
          for="corner-dot-style-label"
          class="block mb-2 text-sm font-semibold text-gray-700"
          >Corner Dot Style</label
        >
        <div
          id="corner-dot-style-label"
          role="radiogroup"
          class="flex flex-wrap gap-2"
        >
          {#each [{ label: "Dot", value: "dot" }, { label: "Square", value: "square" }] as cornerDot}
            <label
              class="inline-flex items-center cursor-pointer px-3 py-1.5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-blue-50 transition-colors
              {cornerDotType === cornerDot.value
                ? 'ring-2 ring-blue-400 border-blue-400 bg-blue-100 font-semibold'
                : ''}"
            >
              <input
                id="corner-dot-type-{cornerDot.value}"
                type="radio"
                name="cornerDotType"
                value={cornerDot.value}
                checked={cornerDotType === cornerDot.value}
                on:change={() => {
                  cornerDotType = cornerDot.value;
                }}
                class="form-radio accent-blue-600 mr-2"
                style="accent-color: #2563eb;"
              />
              <span>{cornerDot.label}</span>
            </label>
          {/each}
        </div>
      </div>

      <!-- Corner Dot Color -->
      <div class="flex-1 min-w-[180px]">
        <label
          for="corner-dot-color-input"
          class="block mb-2 text-sm font-semibold text-gray-700"
          >Corner Dot Color</label
        >
        <input
          id="corner-dot-color-input"
          type="color"
          bind:value={cornerDotColor}
          class="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer shadow"
        />
      </div>
    </div>

    <div class="flex flex-col md:flex-row md:gap-8 gap-6 w-full mt-8">
      <!-- Background Color -->
      <div class="flex-1 min-w-[180px]">
        <label
          for="background-color-input"
          class="block mb-2 text-sm font-semibold text-gray-700"
          >Background Color</label
        >
        <input
          id="background-color-input"
          type="color"
          bind:value={backgroundColor}
          class="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer shadow"
        />
      </div>

      <!-- Background Gradient -->
      <div class="flex-1 min-w-[220px]">
        <label
          for="background-gradient-input"
          class="block mb-2 text-sm font-semibold text-gray-700"
          >Background Gradient</label
        >
        <div class="relative">
          <select
            id="background-gradient-input"
            bind:value={backgroundGradientType}
            class="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none shadow"
            style="min-width: 140px;"
          >
            <option value="">None</option>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
          <span
            class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            ▼
          </span>
        </div>
        {#if backgroundGradientType}
          <div class="flex flex-col gap-2 mt-2">
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Start</span>
              <input
                type="color"
                bind:value={backgroundGradientStart}
                class="w-8 h-8 border rounded"
              />
              <span class="text-xs text-gray-500">End</span>
              <input
                type="color"
                bind:value={backgroundGradientEnd}
                class="w-8 h-8 border rounded"
              />
            </div>
            {#if backgroundGradientType === "linear"}
              <div class="flex items-center gap-2">
                <label
                  for="background-gradient-rotation-input"
                  class="text-xs text-gray-500">Rotation</label
                >
                <input
                  id="background-gradient-rotation-input"
                  type="number"
                  min="0"
                  max="360"
                  step="1"
                  bind:value={backgroundGradientRotation}
                  class="w-16 px-2 py-1 border rounded"
                />
                <span class="text-xs text-gray-500">deg</span>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </form>
</div>
