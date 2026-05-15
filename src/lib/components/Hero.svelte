<script lang="ts">
	import { onMount } from 'svelte';
	import { profile } from '$lib/data/portfolio';

	let canvas: HTMLCanvasElement;
	let mounted = $state(false);
	let titleIndex = $state(0);

	const titles = [
		'Full Stack Engineer',
		'AI Developer',
		'Blockchain Builder',
		'API Architect',
		'React Native Dev'
	];

	onMount(() => {
		mounted = true;
		startTypingCycle();
		initParticles();
	});

	function startTypingCycle() {
		setInterval(() => {
			titleIndex = (titleIndex + 1) % titles.length;
		}, 2800);
	}

	function initParticles() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d')!;
		let W = (canvas.width = window.innerWidth);
		let H = (canvas.height = window.innerHeight);
		const isDark = () => !document.documentElement.classList.contains('light');
		const isMobile = () => window.innerWidth < 768;

		type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
		const getCount = () => (isMobile() ? 40 : 80);
		let particles: Particle[] = Array.from({ length: getCount() }, () => ({
			x: Math.random() * W, y: Math.random() * H,
			vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
			r: Math.random() * 1.8 + 0.5, alpha: Math.random() * 0.5 + 0.15
		}));

		let mouse = { x: W / 2, y: H / 2 };
		const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
		window.addEventListener('mousemove', onMove);

		const resize = () => {
			W = canvas.width = window.innerWidth;
			H = canvas.height = window.innerHeight;
			particles = Array.from({ length: getCount() }, () => ({
				x: Math.random() * W, y: Math.random() * H,
				vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
				r: Math.random() * 1.8 + 0.5, alpha: Math.random() * 0.5 + 0.15
			}));
		};
		window.addEventListener('resize', resize);

		const accentDark = '#63e8c7';
		const accentLight = '#0d7cf2';

		function draw() {
			ctx.clearRect(0, 0, W, H);
			const accent = isDark() ? accentDark : accentLight;
			const linkDist = isMobile() ? 90 : 140;

			particles.forEach((p, i) => {
				p.x += p.vx; p.y += p.vy;
				if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
				if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

				if (!isMobile()) {
					const dx = mouse.x - p.x, dy = mouse.y - p.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 120) { p.vx += (dx / dist) * 0.015; p.vy += (dy / dist) * 0.015; }
				}
				p.vx *= 0.98; p.vy *= 0.98;

				ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = accent; ctx.globalAlpha = p.alpha; ctx.fill();

				particles.slice(i + 1).forEach((q) => {
					const ex = p.x - q.x, ey = p.y - q.y;
					const d = Math.sqrt(ex * ex + ey * ey);
					if (d < linkDist) {
						ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
						ctx.strokeStyle = accent; ctx.globalAlpha = (1 - d / linkDist) * 0.18;
						ctx.lineWidth = 0.8; ctx.stroke();
					}
				});
			});
			ctx.globalAlpha = 1;
			requestAnimationFrame(draw);
		}

		draw();
		return () => {
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', onMove);
		};
	}
</script>

<section id="hero" class="hero-section relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
	<canvas bind:this={canvas} class="absolute inset-0 pointer-events-none w-full h-full"></canvas>
	<div class="radial-glow absolute inset-0 pointer-events-none"></div>

	<div class="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center" class:visible={mounted}>
		<div class="badge font-mono text-xs mb-5 sm:mb-6 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full">
			<span class="pulse-dot"></span>
			Available for opportunities
		</div>

		<h1 class="hero-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 sm:mb-4 leading-none">
			{profile.name}
		</h1>

		<div class="hero-title-wrap h-10 sm:h-12 flex items-center justify-center mb-5 sm:mb-6 overflow-hidden">
			{#key titleIndex}
				<p class="hero-title font-mono text-base sm:text-xl md:text-2xl slide-in">
					<span class="accent-text">&gt;</span>
					<span class="title-text">{titles[titleIndex]}</span>
					<span class="cursor-blink">_</span>
				</p>
			{/key}
		</div>

		<p class="hero-desc text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
			Building scalable web applications, AI-powered systems, and blockchain solutions.
			Based in <span class="accent-text font-medium">Abuja, Nigeria</span> — working globally.
		</p>

		<div class="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
			<a href="#projects" class="cta-primary w-full xs:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-sm transition-all text-center">
				View Projects
			</a>
			<a href="#contact" class="cta-secondary w-full xs:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl font-semibold text-sm transition-all text-center">
				Get In Touch
			</a>
			<a
				href="https://github.com/rukuboy1997"
				target="_blank"
				rel="noopener noreferrer"
				class="cta-ghost w-full xs:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-sm transition-all inline-flex items-center justify-center gap-2"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
				</svg>
				GitHub
			</a>
		</div>

		<div class="flex items-center justify-center gap-5 sm:gap-6">
			<a href="{profile.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
			</a>
			<a href="mailto:{profile.email}" class="social-link" aria-label="Email">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
					<polyline points="22,6 12,13 2,6"/>
				</svg>
			</a>
			<a href="tel:{profile.phone}" class="social-link" aria-label="Phone">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.69a16 16 0 0 0 5.94 5.94l.85-.85a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.92z"/>
				</svg>
			</a>
		</div>
	</div>

	<a href="#about" class="scroll-indicator absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" aria-label="Scroll down">
		<span class="text-xs font-mono" style="color: var(--color-text-faint)">scroll</span>
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="bounce-arrow" style="color: var(--color-text-faint)">
			<polyline points="6 9 12 15 18 9"/>
		</svg>
	</a>
</section>

<style>
	.hero-section { background: var(--color-bg); }
	.radial-glow { background: radial-gradient(ellipse 80% 60% at 50% 50%, var(--color-accent-glow) 0%, transparent 70%); }

	.badge {
		background: rgba(99, 232, 199, 0.1);
		border: 1px solid rgba(99, 232, 199, 0.25);
		color: var(--color-accent);
		letter-spacing: 0.08em;
	}
	.light .badge { background: rgba(13, 124, 242, 0.08); border-color: rgba(13, 124, 242, 0.2); }

	.pulse-dot {
		width: 6px; height: 6px; border-radius: 50%;
		background: var(--color-accent);
		flex-shrink: 0;
		animation: pulse-glow 2s ease-in-out infinite;
	}
	@keyframes pulse-glow {
		0%, 100% { opacity: 1; } 50% { opacity: 0.6; }
	}

	.hero-name {
		color: var(--color-text);
		background: linear-gradient(135deg, var(--color-text) 40%, var(--color-accent) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1.05;
		word-break: break-word;
	}

	.hero-title { color: var(--color-text-muted); white-space: nowrap; }
	.accent-text { color: var(--color-accent); }
	.hero-desc { color: var(--color-text-muted); }
	.title-text { margin-left: 0.4em; }

	.cursor-blink { color: var(--color-accent); animation: blink 1s step-end infinite; }
	@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

	.slide-in { animation: slideInUp 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
	@keyframes slideInUp {
		from { opacity: 0; transform: translateY(12px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	/* xs breakpoint helper — for phones wider than 380px */
	@media (min-width: 380px) {
		.xs\:flex-row { flex-direction: row; }
		.xs\:w-auto { width: auto; }
	}

	.cta-primary {
		background: var(--color-accent);
		color: var(--color-bg);
		font-weight: 700;
		box-shadow: 0 0 24px var(--color-accent-glow);
	}
	.cta-primary:hover { transform: translateY(-2px); box-shadow: 0 0 36px var(--color-accent-glow); opacity: 1; }
	.cta-secondary {
		background: transparent; color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.cta-secondary:hover { border-color: var(--color-accent); color: var(--color-accent); transform: translateY(-2px); }
	.cta-ghost { color: var(--color-text-muted); }
	.cta-ghost:hover { color: var(--color-text); transform: translateY(-2px); }

	.social-link { color: var(--color-text-faint); transition: color 0.2s, transform 0.2s; }
	.social-link:hover { color: var(--color-accent); transform: translateY(-2px); }

	.scroll-indicator { color: var(--color-text-faint); text-decoration: none; animation: fadeInUp 1s 1s both; }
	.bounce-arrow { animation: bounce 2s ease-in-out infinite; }
	@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateX(-50%) translateY(10px); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	.visible > * { animation: heroReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }
	.visible > *:nth-child(1) { animation-delay: 0.1s; }
	.visible > *:nth-child(2) { animation-delay: 0.2s; }
	.visible > *:nth-child(3) { animation-delay: 0.3s; }
	.visible > *:nth-child(4) { animation-delay: 0.4s; }
	.visible > *:nth-child(5) { animation-delay: 0.5s; }
	.visible > *:nth-child(6) { animation-delay: 0.6s; }
	@keyframes heroReveal {
		from { opacity: 0; transform: translateY(24px); }
		to   { opacity: 1; transform: translateY(0); }
	}
</style>
