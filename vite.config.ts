import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		port,
		strictPort: !!rawPort,
		host: '0.0.0.0',
		allowedHosts: true
	},
	preview: {
		port,
		host: '0.0.0.0',
		allowedHosts: true
	}
});
