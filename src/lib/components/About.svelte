<script lang="ts">
        import { onMount } from 'svelte';
        import { profile, experience, education } from '$lib/data/portfolio';

        let section: HTMLElement;
        let visible = $state(false);

        onMount(() => {
                const observer = new IntersectionObserver(
                        ([entry]) => { if (entry.isIntersecting) { visible = true; observer.disconnect(); } },
                        { threshold: 0.1 }
                );
                observer.observe(section);
                return () => observer.disconnect();
        });
</script>

<section
	id="about"
	bind:this={section}
	class="section-wrap py-20 sm:py-28 overflow-x-hidden"
	class:reveal={visible}
>
	<div class="max-w-5xl mx-auto px-5 sm:px-6">

		<!-- Label -->
		<div class="section-label font-mono text-xs mb-4">01 — About</div>

		<!-- Title -->
		<h2
			class="section-title text-3xl sm:text-4xl md:text-5xl font-black mb-12 sm:mb-16 leading-tight"
		>
			Building at the intersection<br class="hidden sm:block" />
			of <span class="accent-text">code</span> and <span class="accent-text">intelligence</span>
		</h2>

		<!-- Grid -->
		<div class="grid lg:grid-cols-5 gap-12 lg:gap-14">

			<!-- LEFT -->
			<div class="lg:col-span-3 space-y-8">

				<p class="about-text text-base sm:text-lg leading-relaxed max-w-2xl">
					I'm a <strong>Full Stack Software Engineer and AI Developer</strong> with a deep passion for building
					production-grade web applications and intelligent systems. With experience spanning React,
					Node.js, PostgreSQL, and LLM integrations, I bring ideas from whiteboard to deployed product.
				</p>

				<p class="about-text text-sm sm:text-base leading-relaxed max-w-2xl"
					style="color: var(--color-text-muted)"
				>
					My journey has taken me through mobile development with React Native, blockchain engineering
					with Sui/Move smart contracts, and AI automation platforms — giving me a uniquely broad
					perspective on full-stack engineering.
				</p>

				<!-- STATS -->
				<div class="stats-row grid grid-cols-3 gap-4 pt-2 max-w-xl">
					<div class="stat-card rounded-xl p-4 sm:p-5 text-center">
						<div class="stat-num font-mono font-bold text-2xl sm:text-3xl">6+</div>
						<div class="stat-label text-xs mt-1">Live Projects</div>
					</div>

					<div class="stat-card rounded-xl p-4 sm:p-5 text-center">
						<div class="stat-num font-mono font-bold text-2xl sm:text-3xl">5+</div>
						<div class="stat-label text-xs mt-1">Years Exp.</div>
					</div>

					<div class="stat-card rounded-xl p-4 sm:p-5 text-center">
						<div class="stat-num font-mono font-bold text-2xl sm:text-3xl">4</div>
						<div class="stat-label text-xs mt-1">Credentials</div>
					</div>
				</div>
			</div>

			<!-- RIGHT -->
			<div class="lg:col-span-2 space-y-10">

				<!-- EXPERIENCE -->
				<div class="timeline">
					<h3 class="timeline-title text-xs sm:text-sm font-semibold mb-5 font-mono uppercase tracking-wider">
						Experience
					</h3>

					{#each experience as job, i}
						<div class="timeline-item" style="animation-delay: {0.1 + i * 0.1}s">
							<div class="timeline-dot"></div>

							<div class="timeline-content">
								<div class="flex items-start justify-between gap-3 flex-wrap">
									<span class="font-semibold text-sm leading-snug">
										{job.role}
									</span>

									<span class="period-badge font-mono text-xs whitespace-nowrap">
										{job.period}
									</span>
								</div>

								<div class="text-xs mt-1" style="color: var(--color-text-faint)">
									{job.type}
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- EDUCATION -->
				<div class="edu-block rounded-xl p-5">
					<h3
						class="text-xs sm:text-sm font-semibold mb-5 font-mono uppercase tracking-wider"
						style="color: var(--color-text-muted)"
					>
						Education
					</h3>

					<div class="space-y-4">
						{#each education as edu}
							<div class="edu-item pb-3">
								<div class="text-sm font-medium leading-tight">
									{edu.degree}
								</div>

								<div class="text-xs mt-1 flex items-start justify-between gap-2 flex-wrap">
									<span style="color: var(--color-text-faint)">
										{edu.institution}
									</span>

									<span class="period-badge font-mono text-xs">
										{edu.period}
									</span>
								</div>
							</div>
						{/each}
					</div>
				</div>

			</div>
		</div>
	</div>
</section>

<style>
        .section-title { color: var(--color-text); }
        .accent-text { color: var(--color-accent); }

        .stat-num { color: var(--color-accent); }
        .stat-label { color: var(--color-text-faint); text-transform: uppercase; letter-spacing: 0.06em; }
        .timeline::before {
                content: ''; position: absolute; left: 0; top: 28px; bottom: 0;
                width: 1px; background: var(--color-border);
        }
        .timeline-title { color: var(--color-text-muted); }
        .timeline-item { position: relative; padding-left: 1.25rem; padding-bottom: 1.25rem; }
        .timeline-dot {
                position: absolute; left: -0.35rem; top: 0.35rem;
                width: 8px; height: 8px; border-radius: 50%;
                background: var(--color-accent); box-shadow: 0 0 8px var(--color-accent);
        }
        .period-badge {
                background: rgba(99, 232, 199, 0.1); color: var(--color-accent);
                border: 1px solid var(--color-border);
                padding: 0.1rem 0.4rem; border-radius: 999px; flex-shrink: 0;
        }
        .light .period-badge { background: rgba(13, 124, 242, 0.08); }

        .edu-block { background: var(--color-surface); border: 1px solid var(--color-border); }
        .edu-item { padding-bottom: 0.75rem; border-bottom: 1px solid var(--color-border); }
        .edu-item:last-child { border-bottom: none; padding-bottom: 0; }
.section-wrap {
	opacity: 0;
	transform: translateY(28px);
}

.section-label {
	color: var(--color-accent);
	letter-spacing: 0.14em;
	text-transform: uppercase;
}

.about-text {
	color: var(--color-text);
}

.stat-card {
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	transition: transform 0.2s ease, border-color 0.2s ease;
}

.stat-card:hover {
	transform: translateY(-2px);
	border-color: var(--color-accent);
}

.timeline {
	padding-left: 1.25rem;
}
        .reveal { animation: sectionReveal 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        @keyframes sectionReveal { to { opacity: 1; transform: translateY(0); } }
</style>        
