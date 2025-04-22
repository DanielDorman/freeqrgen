import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vercel from 'vite-plugin-vercel';

export default defineConfig({
	plugins: [vercel(), sveltekit(), tailwindcss()]
});
