<script lang="ts">
	import { onMount } from 'svelte';
	import { skills } from '$lib/data/portfolio';

	let section: HTMLElement;
	let visible = $state(false);
	let activeCategory = $state(0);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { visible = true; observer.disconnect(); } },
			{ threshold: 0.1 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});
</script>

<section id="skills" bind:this={section} class="section-wrap py-20 sm:py-28 overflow-x-hidden" class:reveal={visible}>
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="section-label font-mono text-xs mb-3">02 — Skills</div>
		<h2 class="section-title text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
			Technical <span class="accent-text">Toolkit</span>
		</h2>
		<p class="section-sub text-sm sm:text-base mb-8 sm:mb-12 max-w-xl">
			A broad stack built through years of shipping production software across web, mobile, AI, and blockchain.
		</p>

		<!-- Scrollable tabs on mobile -->
		<div class="tabs-wrapper mb-8 sm:mb-10">
			<div class="tabs flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
				{#each skills as category, i}
					<button
						class="tab-btn font-mono text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-lg flex-shrink-0 {activeCategory === i ? 'tab-active' : ''}"
						onclick={() => (activeCategory = i)}
					>
						{category.category}
					</button>
				{/each}
			</div>
		</div>

		{#key activeCategory}
			<div class="skills-grid grid gap-3 sm:gap-4 animate-in">
				{#each skills[activeCategory].items as skill, i}
					<div class="skill-card rounded-xl p-4 sm:p-5" style="animation-delay: {i * 0.07}s">
						<div class="flex items-center justify-between mb-3">
							<span class="skill-name text-xs sm:text-sm font-semibold">{skill.name}</span>
							<span class="skill-pct font-mono text-xs">{skill.level}%</span>
						</div>
						<div class="bar-track rounded-full overflow-hidden">
							<div
								class="bar-fill rounded-full"
								style="width: {visible ? skill.level : 0}%; transition: width {0.8 + i * 0.1}s cubic-bezier(0.22, 1, 0.36, 1) {0.1 + i * 0.07}s"
							></div>
						</div>
					</div>
				{/each}
			</div>
		{/key}

		<div class="tech-cloud mt-10 sm:mt-14">
			<h3 class="tech-cloud-title font-mono text-xs mb-4 sm:mb-6 uppercase tracking-widest">Also familiar with</h3>
			<div class="flex flex-wrap gap-2">
				{#each ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code', 'Neon DB', 'Drizzle ORM', 'Zod', 'Prisma', 'REST', 'GraphQL', 'WebSockets', 'JWT', 'OAuth2', 'Expo', 'TailwindCSS', 'GSAP', 'Three.js', 'Framer Motion'] as tech}
					<span class="tech-tag font-mono text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg">{tech}</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.section-label { color: var(--color-accent); letter-spacing: 0.12em; text-transform: uppercase; }
	.section-title { color: var(--color-text); }
	.accent-text { color: var(--color-accent); }
	.section-sub { color: var(--color-text-muted); }

	.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
	.hide-scrollbar::-webkit-scrollbar { display: none; }

	.tab-btn {
		background: var(--color-surface); border: 1px solid var(--color-border);
		color: var(--color-text-muted); cursor: pointer; transition: all 0.2s;
		white-space: nowrap;
	}
	.tab-btn:hover { color: var(--color-text); border-color: var(--color-accent); }
	.tab-active { background: var(--color-accent) !important; color: var(--color-bg) !important; border-color: var(--color-accent) !important; font-weight: 700; }

	.skills-grid { grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr)); }

	.skill-card {
		background: var(--color-surface); border: 1px solid var(--color-border);
		animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
		transition: border-color 0.2s, transform 0.2s;
	}
	.skill-card:hover { border-color: var(--color-accent); transform: translateY(-2px); }
	@keyframes cardIn {
		from { opacity: 0; transform: translateY(16px); }
		to   { opacity: 1; transform: translateY(0); }
	}
	.animate-in { animation: fadeIn 0.3s ease; }
	@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

	.skill-name { color: var(--color-text); }
	.skill-pct { color: var(--color-accent); }
	.bar-track { background: var(--color-surface-2); height: 6px; }
	.bar-fill { height: 100%; background: linear-gradient(90deg, var(--color-accent), var(--color-accent-2)); }

	.tech-cloud-title { color: var(--color-text-faint); }
	.tech-tag {
		background: var(--color-surface); border: 1px solid var(--color-border);
		color: var(--color-text-muted); transition: all 0.2s;
	}
	.tech-tag:hover { border-color: var(--color-accent); color: var(--color-accent); }

	.section-wrap { opacity: 0; transform: translateY(32px); }
	.reveal { animation: sectionReveal 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
	@keyframes sectionReveal { to { opacity: 1; transform: translateY(0); } }
</style>
