import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'dist/public',
			assets: 'dist/public',
			fallback: 'index.html',
			precompress: false,
			strict: false
		})
	}
};

export default config;
