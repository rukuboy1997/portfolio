<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<a href="#main" class="skip-nav">Skip to main content</a>
<Nav />
<main id="main">
	{@render children()}
</main>
<Footer />
