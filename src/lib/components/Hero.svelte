<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
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

	let titleInterval: any;
	let cleanupParticles: (() => void) | undefined;

	onMount(() => {
		mounted = true;

		// safer interval handling
		titleInterval = setInterval(() => {
			titleIndex = (titleIndex + 1) % titles.length;
		}, 2800);

		cleanupParticles = initParticles();
	});

	onDestroy(() => {
		clearInterval(titleInterval);
		if (cleanupParticles) cleanupParticles();
	});

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
			x: Math.random() * W,
			y: Math.random() * H,
			vx: (Math.random() - 0.5) * 0.4,
			vy: (Math.random() - 0.5) * 0.4,
			r: Math.random() * 1.8 + 0.5,
			alpha: Math.random() * 0.5 + 0.15
		}));

		let mouse = { x: W / 2, y: H / 2 };

		const onMove = (e: MouseEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};

		const resize = () => {
			W = canvas.width = window.innerWidth;
			H = canvas.height = window.innerHeight;

			particles = Array.from({ length: getCount() }, () => ({
				x: Math.random() * W,
				y: Math.random() * H,
				vx: (Math.random() - 0.5) * 0.4,
				vy: (Math.random() - 0.5) * 0.4,
				r: Math.random() * 1.8 + 0.5,
				alpha: Math.random() * 0.5 + 0.15
			}));
		};

		window.addEventListener('mousemove', onMove);
		window.addEventListener('resize', resize);

		const accentDark = '#63e8c7';
		const accentLight = '#0d7cf2';

		function draw() {
			ctx.clearRect(0, 0, W, H);

			const accent = isDark() ? accentDark : accentLight;
			const linkDist = isMobile() ? 90 : 140;

			particles.forEach((p, i) => {
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0) p.x = W;
				if (p.x > W) p.x = 0;
				if (p.y < 0) p.y = H;
				if (p.y > H) p.y = 0;

				if (!isMobile()) {
					const dx = mouse.x - p.x;
					const dy = mouse.y - p.y;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < 120) {
						p.vx += (dx / dist) * 0.015;
						p.vy += (dy / dist) * 0.015;
					}
				}

				p.vx *= 0.98;
				p.vy *= 0.98;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx.fillStyle = accent;
				ctx.globalAlpha = p.alpha;
				ctx.fill();

				particles.slice(i + 1).forEach((q) => {
					const dx = p.x - q.x;
					const dy = p.y - q.y;
					const d = Math.sqrt(dx * dx + dy * dy);

					if (d < linkDist) {
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(q.x, q.y);
						ctx.strokeStyle = accent;
						ctx.globalAlpha = (1 - d / linkDist) * 0.18;
						ctx.lineWidth = 0.8;
						ctx.stroke();
					}
				});
			});

			ctx.globalAlpha = 1;
			requestAnimationFrame(draw);
		}

		draw();

		return () => {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('resize', resize);
		};
	}
</script>

<section
	id="hero"
	class="hero-section relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4 sm:px-6"
>
	<canvas bind:this={canvas} class="absolute inset-0 pointer-events-none w-full h-full"></canvas>
	<div class="radial-glow absolute inset-0 pointer-events-none"></div>

	<div
		class="relative z-10 w-full max-w-5xl mx-auto text-center"
		class:visible={mounted}
	>

		<!-- Badge -->
		<div class="badge font-mono text-xs mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full">
			<span class="pulse-dot"></span>
			Available for opportunities
		</div>

		<!-- Name -->
		<h1
			class="hero-name text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-tight"
		>
			{profile.name}
		</h1>

		<!-- Title -->
		<div class="hero-title-wrap h-12 flex items-center justify-center mb-6 overflow-hidden">
			{#key titleIndex}
				<p class="hero-title font-mono text-base sm:text-xl md:text-2xl slide-in">
					<span class="accent-text">&gt;</span>
					<span class="title-text">{titles[titleIndex]}</span>
					<span class="cursor-blink">_</span>
				</p>
			{/key}
		</div>

		<!-- Description -->
		<p class="hero-desc text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
			Building scalable web applications, AI-powered systems, and blockchain solutions.
			Based in <span class="accent-text font-medium">Abuja, Nigeria</span> — working globally.
		</p>

		<!-- CTA -->
		<div
			class="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-4 mb-12 w-full max-w-3xl mx-auto"
		>
			<a href="#projects" class="cta-primary w-full sm:w-auto min-w-[180px] px-8 py-4 rounded-xl font-semibold text-sm text-center">
				View Projects
			</a>

			<a href="#contact" class="cta-secondary w-full sm:w-auto min-w-[180px] px-8 py-4 rounded-xl font-semibold text-sm text-center">
				Get In Touch
			</a>

			<a
				href="https://github.com/rukuboy1997"
				target="_blank"
				class="cta-ghost w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2"
			>
				GitHub
			</a>
		</div>

		<!-- Socials -->
		<div class="flex items-center justify-center gap-6">
			<a href="{profile.linkedin}" class="social-link" aria-label="LinkedIn">LinkedIn</a>
			<a href="mailto:{profile.email}" class="social-link">Email</a>
			<a href="tel:{profile.phone}" class="social-link">Phone</a>
		</div>
	</div>

	<!-- Scroll -->
	<a
		href="#about"
		class="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
	>
		<span class="text-xs font-mono" style="color: var(--color-text-faint)">scroll</span>
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="bounce-arrow">
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
