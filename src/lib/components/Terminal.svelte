<script lang="ts">
	import { onMount } from 'svelte';
	import { terminalCommands } from '$lib/data/portfolio';

	let section: HTMLElement;
	let visible = $state(false);
	let terminalOpen = $state(false);
	let input = $state('');
	let history = $state<{ type: 'input' | 'output' | 'error'; content: string }[]>([
		{ type: 'output', content: `Welcome to <span class="cmd-accent">rukuboy1997.dev</span> terminal v1.0.0\nType <span class="cmd-accent">help</span> to see available commands.` }
	]);
	let terminalEl: HTMLDivElement;
	let inputEl: HTMLInputElement;
	let cmdHistory: string[] = [];
	let historyIdx = $state(-1);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { visible = true; observer.disconnect(); } },
			{ threshold: 0.1 }
		);
		observer.observe(section);
		return () => observer.disconnect();
	});

	function handleCommand(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (historyIdx < cmdHistory.length - 1) {
				historyIdx++;
				input = cmdHistory[cmdHistory.length - 1 - historyIdx];
			}
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIdx > 0) { historyIdx--; input = cmdHistory[cmdHistory.length - 1 - historyIdx]; }
			else { historyIdx = -1; input = ''; }
			return;
		}
		if (e.key !== 'Enter') return;

		const cmd = input.trim().toLowerCase();
		history = [...history, { type: 'input', content: cmd }];
		historyIdx = -1;

		if (cmd) {
			cmdHistory.push(cmd);
			if (cmd === 'clear') {
				history = [{ type: 'output', content: 'Terminal cleared.' }];
			} else if (cmd === 'exit') {
				terminalOpen = false;
			} else if (terminalCommands[cmd]) {
				history = [...history, { type: 'output', content: terminalCommands[cmd] }];
			} else {
				history = [...history, { type: 'error', content: `Command not found: <span class="cmd-accent">${escapeHtml(cmd)}</span>\nType <span class="cmd-accent">help</span> for available commands.` }];
			}
		}

		input = '';
		setTimeout(() => { if (terminalEl) terminalEl.scrollTop = terminalEl.scrollHeight; }, 10);
	}

	function escapeHtml(str: string) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function openTerminal() {
		terminalOpen = true;
		setTimeout(() => inputEl?.focus(), 50);
	}

	function runQuickCmd(cmd: string) {
		if (!terminalOpen) openTerminal();
		setTimeout(() => {
			input = cmd;
			handleCommand({ key: 'Enter' } as KeyboardEvent);
		}, 120);
	}
</script>

<section id="terminal" bind:this={section} class="section-wrap py-20 sm:py-28 overflow-x-hidden" class:reveal={visible}>
	<div class="max-w-6xl mx-auto px-4 sm:px-6">
		<div class="section-label font-mono text-xs mb-3">04 — Interactive</div>
		<h2 class="section-title text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
			Developer <span class="accent-text">Terminal</span>
		</h2>
		<p class="section-sub text-sm sm:text-base mb-8 sm:mb-10 max-w-xl">
			Prefer the command line? Explore my portfolio the way engineers do — through a terminal interface.
		</p>

		<div class="terminal-window rounded-2xl overflow-hidden">
			<div class="terminal-titlebar flex items-center gap-2 px-4 sm:px-5 py-3">
				<button class="traffic-light bg-red-400" onclick={() => (terminalOpen = false)} aria-label="Close"></button>
				<button class="traffic-light bg-yellow-400" aria-label="Minimize"></button>
				<button class="traffic-light bg-green-400" onclick={openTerminal} aria-label="Maximize"></button>
				<span class="font-mono text-xs ml-3 sm:ml-4 truncate" style="color: var(--color-text-faint)">
					rukuboy1997@portfolio:~$
				</span>
			</div>

			{#if !terminalOpen}
				<div class="terminal-preview p-8 sm:p-10 flex flex-col items-center justify-center gap-4 sm:gap-5 text-center">
					<div class="terminal-icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--color-accent)">
							<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
						</svg>
					</div>
					<p class="font-mono text-xs sm:text-sm" style="color: var(--color-text-muted)">Interactive CLI — explore my portfolio with commands</p>
					<button onclick={openTerminal} class="open-terminal-btn font-mono text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl">
						Launch Terminal
					</button>
				</div>
			{:else}
				<div
					bind:this={terminalEl}
					class="terminal-body p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-y-auto"
					style="height: min(340px, 60vh)"
					role="log"
					aria-label="Terminal output"
					aria-live="polite"
				>
					{#each history as line}
						{#if line.type === 'input'}
							<div class="terminal-line input-line mb-2">
								<span class="prompt">$</span>
								<span class="ml-2 cmd-text">{line.content}</span>
							</div>
						{:else if line.type === 'error'}
							<div class="terminal-line error-line mb-4 whitespace-pre-wrap">{@html line.content}</div>
						{:else}
							<div class="terminal-line output-line mb-4 whitespace-pre-wrap">{@html line.content}</div>
						{/if}
					{/each}

					<div class="input-row flex items-center gap-2">
						<span class="prompt">$</span>
						<input
							bind:this={inputEl}
							bind:value={input}
							onkeydown={handleCommand}
							class="terminal-input flex-1 bg-transparent outline-none min-w-0"
							type="text"
							autocomplete="off"
							autocorrect="off"
							autocapitalize="off"
							spellcheck="false"
							aria-label="Terminal input"
							placeholder="type a command..."
						/>
					</div>
				</div>
			{/if}
		</div>

		<div class="cmd-hints mt-4 sm:mt-6 flex flex-wrap gap-2">
			{#each ['help', 'about', 'skills', 'projects', 'contact', 'clear'] as cmd}
				<button class="cmd-hint font-mono text-xs px-3 py-1.5 rounded-lg" onclick={() => runQuickCmd(cmd)}>
					{cmd}
				</button>
			{/each}
		</div>
	</div>
</section>

<style>
	.section-label { color: var(--color-accent); letter-spacing: 0.12em; text-transform: uppercase; }
	.section-title { color: var(--color-text); }
	.accent-text { color: var(--color-accent); }
	.section-sub { color: var(--color-text-muted); }

	.terminal-window {
		background: #0d1117; border: 1px solid var(--color-border);
		box-shadow: 0 20px 60px rgba(0,0,0,0.4);
	}
	.light .terminal-window { background: #1a1a2e; }
	.terminal-titlebar { background: #161b22; border-bottom: 1px solid rgba(255,255,255,0.05); }

	.traffic-light { width: 10px; height: 10px; border-radius: 50%; border: none; cursor: pointer; transition: opacity 0.2s; flex-shrink: 0; }
	@media (min-width: 640px) { .traffic-light { width: 12px; height: 12px; } }
	.traffic-light:hover { opacity: 0.75; }

	.terminal-preview { min-height: 200px; }
	.terminal-icon {
		width: 68px; height: 68px; border-radius: 18px;
		background: rgba(99, 232, 199, 0.08); border: 1px solid rgba(99, 232, 199, 0.2);
		display: flex; align-items: center; justify-content: center;
	}
	.open-terminal-btn {
		background: var(--color-accent); color: #0d1117;
		font-weight: 700; border: none; cursor: pointer;
		transition: opacity 0.2s, transform 0.2s;
	}
	.open-terminal-btn:hover { opacity: 0.9; transform: translateY(-1px); }

	.terminal-body { color: #c9d1d9; line-height: 1.7; }
	.prompt { color: #63e8c7; user-select: none; flex-shrink: 0; }
	.cmd-text { color: #e6edf3; }
	.output-line { color: #8b949e; }
	.error-line { color: #ff7b72; }
	.terminal-input { color: #e6edf3; caret-color: #63e8c7; }
	.terminal-input::placeholder { color: #4a6274; }

	:global(.cmd-accent) { color: #63e8c7; }

	.cmd-hint {
		background: var(--color-surface); border: 1px solid var(--color-border);
		color: var(--color-text-muted); cursor: pointer; transition: all 0.2s;
	}
	.cmd-hint:hover { border-color: var(--color-accent); color: var(--color-accent); }

	.section-wrap { opacity: 0; transform: translateY(32px); }
	.reveal { animation: sectionReveal 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
	@keyframes sectionReveal { to { opacity: 1; transform: translateY(0); } }
</style>
