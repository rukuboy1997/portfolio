<script lang="ts">
        import { theme } from '$lib/stores/theme';
        import { onMount } from 'svelte';

        let scrolled = $state(false);
        let menuOpen = $state(false);
        let currentSection = $state('hero');

        const links = [
                { href: '#about', label: 'About' },
                { href: '#skills', label: 'Skills' },
                { href: '#projects', label: 'Projects' },
                { href: '#terminal', label: 'Terminal' },
                { href: '#contact', label: 'Contact' }
        ];

        onMount(() => {
                const handleScroll = () => {
                        scrolled = window.scrollY > 40;
                        const sections = ['hero', 'about', 'skills', 'projects', 'terminal', 'contact'];
                        for (const id of sections.reverse()) {
                                const el = document.getElementById(id);
                                if (el && window.scrollY >= el.offsetTop - 120) {
                                        currentSection = id;
                                        break;
                                }
                        }
                };
                window.addEventListener('scroll', handleScroll, { passive: true });
                return () => window.removeEventListener('scroll', handleScroll);
        });

        function closeMenu() {
                menuOpen = false;
        }
</script>

<nav
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
                ? 'nav-scrolled'
                : 'nav-transparent'}"
        aria-label="Main navigation"
>
        <div class="max-w-6xl mx-auto px-4 sm:px-6 min-h-[72px] flex items-center justify-between">
                <a href="#hero" class="logo-mark font-mono text-sm font-bold tracking-widest" onclick={closeMenu}>
                        <span class="accent-text">&lt;</span>Rukuboy1997<span class="accent-text">/&gt;</span>
                </a>

                <ul class="hidden md:flex items-center gap-8" role="list">
                        {#each links as link}
                                <li>
                                        <a
                                                href={link.href}
                                                class="nav-link text-sm font-medium {currentSection === link.href.slice(1)
                                                        ? 'nav-active'
                                                        : ''}"
                                        >
                                                {link.label}
                                        </a>
                                </li>
                        {/each}
                </ul>

                <div class="flex items-center gap-3">
                        <button
                                onclick={() => theme.toggle()}
                                class="theme-btn p-2 rounded-lg"
                                aria-label="Toggle theme"
                        >
                                {#if $theme === 'dark'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                                        </svg>
                                {:else}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                        </svg>
                                {/if}
                        </button>

                        <a
                                href="mailto:farouksaffas@gmail.com"
                                class="hidden md:inline-flex hire-btn text-sm font-semibold px-4 py-2 rounded-lg"
                        >
                                Hire Me
                        </a>

                        <button
                                class="md:hidden p-2 rounded-lg theme-btn"
                                onclick={() => (menuOpen = !menuOpen)}
                                aria-label="Toggle menu"
                                aria-expanded={menuOpen}
                        >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        {#if menuOpen}
                                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                        {:else}
                                                <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                                        {/if}
                                </svg>
                        </button>
                </div>
        </div>

        {#if menuOpen}
                <div class="md:hidden mobile-menu px-2 pb-3">
                        <ul class="flex flex-col gap-1 px-6 pb-4" role="list">
                                {#each links as link}
                                        <li>
                                                <a href={link.href} class="mobile-nav-link block py-2 text-sm font-medium" onclick={closeMenu}>
                                                        {link.label}
                                                </a>
                                        </li>
                                {/each}
                                <li class="pt-2">
                                        <a href="mailto:farouksaffas@gmail.com" class="hire-btn inline-flex text-sm font-semibold px-4 py-2 rounded-lg">
                                                Hire Me
                                        </a>
                                </li>
                        </ul>
                </div>
        {/if}
</nav>

<style>
        .nav-scrolled {
                background: rgba(10, 14, 26, 0.92);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid var(--color-border);
        }
        .light .nav-scrolled {
                background: rgba(240, 244, 248, 0.92);
        }
        .nav-transparent {
                background: transparent;
        }
        .accent-text { color: var(--color-accent); }
        .logo-mark { color: var(--color-text); transition: color 0.2s; }
        .logo-mark:hover { color: var(--color-accent); }
        .nav-link {
                color: var(--color-text-muted);
                transition: color 0.2s;
                position: relative;
                padding-bottom: 2px;
        }
        .nav-link::after {
                content: '';
                position: absolute;
                bottom: -2px; left: 0;
                width: 0; height: 1.5px;
                background: var(--color-accent);
                transition: width 0.25s;
        }
        .nav-link:hover, .nav-active {
                color: var(--color-text);
        }
        .nav-link:hover::after, .nav-active::after {
                width: 100%;
        }
        .theme-btn {
                color: var(--color-text-muted);
                background: transparent;
                border: 1px solid transparent;
                cursor: pointer;
                transition: all 0.2s;
        }
        .theme-btn:hover {
                color: var(--color-accent);
                border-color: var(--color-border);
                background: var(--color-surface);
        }
        .hire-btn {
                background: var(--color-accent);
                color: var(--color-bg);
                border: none;
                cursor: pointer;
                transition: opacity 0.2s, transform 0.1s;
        }
        .hire-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .mobile-menu {
                background: var(--color-bg-2);
                border-bottom: 1px solid var(--color-border);
        }
        .mobile-nav-link {
                color: var(--color-text-muted);
                transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: var(--color-accent); }
</style>
