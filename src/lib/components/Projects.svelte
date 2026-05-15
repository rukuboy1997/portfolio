<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/data/portfolio';

	let section: HTMLElement;
	let visible = $state(false);
	let activeFilter = $state('All');
	let selectedProject = $state<(typeof projects)[0] | null>(null);

	const filters = ['All', 'AI', 'Blockchain', 'FullStack'];

	const filtered = $derived(
		activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)
	);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { visible = true; observer.disconnect(); } },
			{ threshold: 0.1 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});

	function openModal(project: (typeof projects)[0]) {
		selectedProject = project;
		document.body.style.overflow = 'hidden';
	}
	function closeModal() {
		selectedProject = null;
		document.body.style.overflow = '';
	}
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeModal();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<section id="projects" bind:this={section} class="section-wrap py-20 sm:py-28 overflow-x-hidden" class:reveal={visible}>
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="section-label font-mono text-xs mb-3">03 — Projects</div>
		<h2 class="section-title text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
			Things I've <span class="accent-text">Shipped</span>
		</h2>
		<p class="section-sub text-sm sm:text-base mb-8 sm:mb-10 max-w-xl">
			Production-deployed applications across AI, blockchain, fintech, and developer tooling.
		</p>

		<!-- Scrollable filter row on mobile -->
		<div class="filters-wrapper mb-8 sm:mb-10">
			<div class="filters flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
				{#each filters as filter}
					<button
						class="filter-btn font-mono text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-lg flex-shrink-0 {activeFilter === filter ? 'filter-active' : ''}"
						onclick={() => (activeFilter = filter)}
					>
						{filter}
						<span class="filter-count ml-1.5">
							{filter === 'All' ? projects.length : projects.filter(p => p.category === filter).length}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<div class="projects-grid grid gap-4 sm:gap-5">
			{#each filtered as project, i (project.id)}
				<article
					class="project-card rounded-2xl overflow-hidden cursor-pointer group"
					style="animation-delay: {i * 0.08}s; --project-color: {project.color}"
					onclick={() => openModal(project)}
					onkeydown={(e) => e.key === 'Enter' && openModal(project)}
					role="button"
					tabindex="0"
					aria-label="View {project.title} details"
				>
					<div class="card-header relative h-28 sm:h-36 flex items-end p-4 sm:p-5"
						style="background: linear-gradient(135deg, color-mix(in srgb, {project.color} 12%, var(--color-surface)), var(--color-surface))">
						<div class="project-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							style="background: radial-gradient(ellipse at 50% 100%, color-mix(in srgb, {project.color} 20%, transparent), transparent 70%)"></div>
						{#if project.featured}
							<span class="featured-badge font-mono text-xs px-2 py-0.5 rounded-md absolute top-3 right-3">Featured</span>
						{/if}
						<h3 class="project-name text-base sm:text-xl font-bold relative z-10">{project.title}</h3>
					</div>

					<div class="card-body p-4 sm:p-5">
						<p class="project-desc text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">{project.description}</p>
						<div class="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
							{#each project.tags.slice(0, 4) as tag}
								<span class="tag font-mono text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">{tag}</span>
							{/each}
							{#if project.tags.length > 4}
								<span class="tag font-mono text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">+{project.tags.length - 4}</span>
							{/if}
						</div>
						<div class="flex items-center gap-2 sm:gap-3 flex-wrap">
							<a href={project.live} target="_blank" rel="noopener noreferrer"
								class="link-btn text-xs font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
								onclick={(e) => e.stopPropagation()}>
								<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
									<polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
								</svg>
								Live Demo
							</a>
							<a href={project.github} target="_blank" rel="noopener noreferrer"
								class="ghost-link-btn text-xs font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
								onclick={(e) => e.stopPropagation()}>
								<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
								</svg>
								Source
							</a>
							<span class="ml-auto text-xs expand-hint hidden sm:inline">Click to expand &rarr;</span>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

{#if selectedProject}
	<div
		class="modal-overlay fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Enter' && closeModal()}
		role="dialog"
		aria-modal="true"
		aria-label="{selectedProject.title} details"
		tabindex="-1"
	>
		<div
			class="modal-card w-full sm:max-w-2xl sm:w-full max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="document"
			tabindex="0"
		>
			<!-- Mobile drag handle -->
			<div class="sm:hidden flex justify-center pt-3 pb-1">
				<div class="w-10 h-1 rounded-full" style="background: var(--color-border)"></div>
			</div>

			<div class="modal-header relative p-6 sm:p-8 pb-5 sm:pb-6"
				style="background: linear-gradient(135deg, color-mix(in srgb, {selectedProject.color} 15%, var(--color-surface-2)), var(--color-surface-2))">
				<button onclick={closeModal} class="close-btn absolute top-4 right-4 p-2 rounded-lg" aria-label="Close modal">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
					</svg>
				</button>
				{#if selectedProject.featured}
					<span class="featured-badge font-mono text-xs px-2.5 py-1 rounded-md inline-block mb-3">Featured Project</span>
				{/if}
				<h2 class="text-2xl sm:text-3xl font-black mb-1">{selectedProject.title}</h2>
				<span class="font-mono text-xs px-2.5 py-1 rounded-md inline-block" style="background: rgba(99,232,199,0.1); color: var(--color-accent)">{selectedProject.category}</span>
			</div>

			<div class="modal-body p-6 sm:p-8">
				<p class="text-sm sm:text-base leading-relaxed mb-6" style="color: var(--color-text-muted)">{selectedProject.description}</p>
				<h4 class="font-mono text-xs uppercase tracking-wider mb-3" style="color: var(--color-text-faint)">Technologies Used</h4>
				<div class="flex flex-wrap gap-2 mb-6 sm:mb-8">
					{#each selectedProject.tags as tag}
						<span class="tag font-mono text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg">{tag}</span>
					{/each}
				</div>
				<div class="flex flex-col sm:flex-row gap-3">
					<a href={selectedProject.live} target="_blank" rel="noopener noreferrer"
						class="link-btn flex-1 text-sm font-semibold inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
							<polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
						</svg>
						View Live Demo
					</a>
					<a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
						class="ghost-link-btn text-sm font-semibold inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl">
						<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
						</svg>
						GitHub
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.section-label { color: var(--color-accent); letter-spacing: 0.12em; text-transform: uppercase; }
	.section-title { color: var(--color-text); }
	.accent-text { color: var(--color-accent); }
	.section-sub { color: var(--color-text-muted); }

	.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
	.hide-scrollbar::-webkit-scrollbar { display: none; }

	.filter-btn {
		background: var(--color-surface); border: 1px solid var(--color-border);
		color: var(--color-text-muted); cursor: pointer; transition: all 0.2s;
	}
	.filter-btn:hover { color: var(--color-text); border-color: var(--color-accent); }
	.filter-active { background: var(--color-accent) !important; color: var(--color-bg) !important; border-color: var(--color-accent) !important; font-weight: 700; }
	.filter-count { opacity: 0.7; }

	.projects-grid { grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); }

	.project-card {
		background: var(--color-surface); border: 1px solid var(--color-border);
		transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
		animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
	}
	.project-card:hover {
		border-color: var(--project-color, var(--color-accent));
		transform: translateY(-4px);
		box-shadow: 0 12px 40px rgba(0,0,0,0.2);
	}
	@keyframes cardIn {
		from { opacity: 0; transform: translateY(20px); }
		to   { opacity: 1; transform: translateY(0); }
	}
	.line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

	.featured-badge {
		background: rgba(99, 232, 199, 0.15); color: var(--color-accent);
		border: 1px solid rgba(99, 232, 199, 0.3);
	}
	.project-name { color: var(--color-text); }
	.project-desc { color: var(--color-text-muted); }
	.tag { background: var(--color-surface-2); border: 1px solid var(--color-border); color: var(--color-text-muted); }
	.link-btn { background: var(--color-accent); color: var(--color-bg); font-weight: 700; transition: opacity 0.2s; }
	.link-btn:hover { opacity: 0.85; }
	.ghost-link-btn {
		background: var(--color-surface-2); border: 1px solid var(--color-border);
		color: var(--color-text-muted); transition: all 0.2s;
	}
	.ghost-link-btn:hover { border-color: var(--color-accent); color: var(--color-text); }
	.expand-hint { color: var(--color-text-faint); opacity: 0; transition: opacity 0.2s; }
	.project-card:hover .expand-hint { opacity: 1; }

	.modal-overlay {
		background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px);
		animation: fadeIn 0.2s ease;
	}
	.modal-card {
		background: var(--color-surface); border: 1px solid var(--color-border);
		animation: modalIn 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}
	@media (max-width: 640px) {
		.modal-card { animation: modalSlideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
		@keyframes modalSlideUp {
			from { opacity: 0; transform: translateY(100%); }
			to   { opacity: 1; transform: translateY(0); }
		}
	}
	@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
	@keyframes modalIn {
		from { opacity: 0; transform: scale(0.95) translateY(20px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}
	.close-btn { background: var(--color-surface-2); border: 1px solid var(--color-border); color: var(--color-text-muted); cursor: pointer; transition: all 0.2s; }
	.close-btn:hover { color: var(--color-text); border-color: var(--color-accent); }

	.section-wrap { opacity: 0; transform: translateY(32px); }
	.reveal { animation: sectionReveal 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
	@keyframes sectionReveal { to { opacity: 1; transform: translateY(0); } }
</style>
