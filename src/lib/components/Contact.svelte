<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data/portfolio';

	let section: HTMLElement;
	let visible = $state(false);
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let errors = $state<{ name?: string; email?: string; message?: string }>({});

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { visible = true; observer.disconnect(); } },
			{ threshold: 0.1 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});

	function validate(): boolean {
		const e: typeof errors = {};
		if (!name.trim()) e.name = 'Name is required';
		if (!email.trim()) e.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
		if (!message.trim()) e.message = 'Message is required';
		else if (message.trim().length < 10) e.message = 'At least 10 characters';
		errors = e;
		return Object.keys(e).length === 0;
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!validate()) return;
		status = 'sending';
		await new Promise((r) => setTimeout(r, 1500));
		status = 'success';
		name = ''; email = ''; message = '';
	}

	const contactItems = [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
			label: 'Email', value: profile.email, href: `mailto:${profile.email}`
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 5.94 5.94l.85-.85a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.92z"/></svg>`,
			label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
			label: 'GitHub', value: 'github.com/rukuboy1997', href: profile.github
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
			label: 'LinkedIn', value: 'linkedin.com/in/rukuboy1997', href: profile.linkedin
		}
	];
</script>

<section id="contact" bind:this={section} class="section-wrap py-20 sm:py-28 overflow-x-hidden" class:reveal={visible}>
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="section-label font-mono text-xs mb-3">06 — Contact</div>
		<h2 class="section-title text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
			Let's <span class="accent-text">Build Together</span>
		</h2>
		<p class="section-sub text-sm sm:text-base mb-10 sm:mb-14 max-w-xl">
			Open to full-time roles, freelance projects, and technical collaborations. Remote-first, globally available.
		</p>

		<div class="grid lg:grid-cols-5 gap-8 sm:gap-12">
			<!-- Contact info -->
			<div class="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
				{#each contactItems as item}
					<a href={item.href} target="_blank" rel="noopener noreferrer" class="contact-card rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 group">
						<div class="contact-icon flex-shrink-0">{@html item.icon}</div>
						<div class="min-w-0">
							<div class="contact-label text-xs font-mono uppercase tracking-wider mb-0.5">{item.label}</div>
							<div class="contact-value text-xs sm:text-sm font-medium truncate">{item.value}</div>
						</div>
						<svg class="arrow ml-auto opacity-0 group-hover:opacity-100 flex-shrink-0 hidden sm:block" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
						</svg>
					</a>
				{/each}

				<div class="availability-card rounded-xl p-4 sm:p-5 sm:col-span-2 lg:col-span-1">
					<div class="flex items-center gap-2 mb-2">
						<span class="avail-dot"></span>
						<span class="text-sm font-semibold">Available for Work</span>
					</div>
					<p class="text-xs" style="color: var(--color-text-muted)">
						Open to Full Stack, Backend, and AI Engineering roles — remote or on-site.
					</p>
				</div>
			</div>

			<!-- Contact form -->
			<div class="lg:col-span-3">
				{#if status === 'success'}
					<div class="success-card rounded-2xl p-8 sm:p-10 text-center">
						<div class="success-icon mx-auto mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-accent)">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
						</div>
						<h3 class="text-lg sm:text-xl font-bold mb-2">Message Sent!</h3>
						<p class="text-sm" style="color: var(--color-text-muted)">Thanks for reaching out. I'll get back to you soon.</p>
						<button onclick={() => (status = 'idle')} class="send-btn mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold">
							Send Another
						</button>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="contact-form rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5" novalidate>
						<div class="grid sm:grid-cols-2 gap-4 sm:gap-5">
							<div class="field">
								<label for="name" class="field-label">Name</label>
								<input id="name" type="text" bind:value={name}
									class="field-input rounded-xl {errors.name ? 'field-error' : ''}"
									placeholder="Your name"
									aria-describedby={errors.name ? 'name-error' : undefined}/>
								{#if errors.name}<p id="name-error" class="error-msg text-xs mt-1" role="alert">{errors.name}</p>{/if}
							</div>
							<div class="field">
								<label for="email" class="field-label">Email</label>
								<input id="email" type="email" bind:value={email}
									class="field-input rounded-xl {errors.email ? 'field-error' : ''}"
									placeholder="your@email.com"
									aria-describedby={errors.email ? 'email-error' : undefined}/>
								{#if errors.email}<p id="email-error" class="error-msg text-xs mt-1" role="alert">{errors.email}</p>{/if}
							</div>
						</div>
						<div class="field">
							<label for="message" class="field-label">Message</label>
							<textarea id="message" bind:value={message}
								class="field-input rounded-xl resize-none {errors.message ? 'field-error' : ''}"
								placeholder="Tell me about your project..."
								rows="5"
								aria-describedby={errors.message ? 'message-error' : undefined}></textarea>
							{#if errors.message}<p id="message-error" class="error-msg text-xs mt-1" role="alert">{errors.message}</p>{/if}
						</div>
						<button type="submit" class="send-btn w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm" disabled={status === 'sending'}>
							{#if status === 'sending'}
								<span class="inline-flex items-center gap-2">
									<svg class="spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M21 12a9 9 0 1 1-6.219-8.56"/>
									</svg>
									Sending...
								</span>
							{:else}
								Send Message
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.section-label { color: var(--color-accent); letter-spacing: 0.12em; text-transform: uppercase; }
	.section-title { color: var(--color-text); }
	.accent-text { color: var(--color-accent); }
	.section-sub { color: var(--color-text-muted); }

	.contact-card {
		background: var(--color-surface); border: 1px solid var(--color-border);
		color: var(--color-text); transition: all 0.25s;
		text-decoration: none;
	}
	.contact-card:hover { border-color: var(--color-accent); transform: translateX(3px); }
	.contact-icon { color: var(--color-accent); }
	.contact-label { color: var(--color-text-faint); }
	.contact-value { color: var(--color-text); }
	.arrow { color: var(--color-accent); transition: opacity 0.2s, transform 0.2s; }
	.contact-card:hover .arrow { transform: translateX(3px); }

	.availability-card {
		background: rgba(99, 232, 199, 0.06);
		border: 1px solid rgba(99, 232, 199, 0.2);
	}
	.avail-dot {
		width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
		background: var(--color-accent);
		animation: pulse-glow 2s ease-in-out infinite;
	}
	@keyframes pulse-glow {
		0%, 100% { box-shadow: 0 0 0 0 rgba(99, 232, 199, 0.4); }
		50% { box-shadow: 0 0 0 5px rgba(99, 232, 199, 0); }
	}

	.contact-form { background: var(--color-surface); border: 1px solid var(--color-border); }
	.field-label { display: block; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.45rem; color: var(--color-text-muted); }
	.field-input {
		width: 100%; padding: 0.7rem 0.9rem;
		background: var(--color-surface-2); border: 1px solid var(--color-border);
		color: var(--color-text); font-size: 0.875rem;
		transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit;
	}
	.field-input:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--color-accent-glow); }
	.field-input::placeholder { color: var(--color-text-faint); }
	.field-error { border-color: #ff7b72 !important; }
	.error-msg { color: #ff7b72; }

	.send-btn {
		background: var(--color-accent); color: var(--color-bg);
		border: none; cursor: pointer; font-family: inherit;
		transition: opacity 0.2s, transform 0.1s;
	}
	.send-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
	.send-btn:disabled { opacity: 0.6; cursor: not-allowed; }

	.spin { animation: spin 1s linear infinite; }
	@keyframes spin { to { transform: rotate(360deg); } }

	.success-card { background: var(--color-surface); border: 1px solid rgba(99, 232, 199, 0.25); }
	.success-icon {
		width: 60px; height: 60px; border-radius: 50%;
		background: rgba(99, 232, 199, 0.1);
		display: flex; align-items: center; justify-content: center;
	}

	.section-wrap { opacity: 0; transform: translateY(32px); }
	.reveal { animation: sectionReveal 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
	@keyframes sectionReveal { to { opacity: 1; transform: translateY(0); } }
</style>
