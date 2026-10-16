<script lang="ts">
	// ── Edit your info here ─────────────────────────────────────
	const NAME = 'PinguSurMars_';
	const WORDMARK = 'PinguSurMars_';
	const TAGLINE = '@pingusurmars';
	const BIO =
		'French idiot tinkering with Svelte, bots & random tech. I might share some of the stuff I build here.';
	const DOMAIN = 'pingusurmars.xyz';

	type Page = { label: string; href: string; desc: string; icon: string };

	// Lucide-style stroke icons (inner SVG markup)
	const PAGES: Page[] = [
		{
			label: 'about',
			href: '/about',
			desc: 'who I am',
			icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
		},
		{
			label: 'projects',
			href: '/projects',
			desc: 'stuff I make',
			icon: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'
		},
		{
			label: 'old website',
			href: 'https://old.pingusurmars.xyz',
			desc: '',
			icon: '<path d="M15.5 10 13 7.5 15.5 5"/><path d="M15.861 14A14.5 14.5 0 0 1 12 22a14.48 14.48 0 0 1 0-20 10 10 0 1 0 9.888 11.5"/><path d="M19.5 5 22 7.5 19.5 10"/><path d="M2 12h8.5"/>'
		}
	];

	type Social = { label: string; href: string; icon: string };

	// Simple Icons brand marks (inner SVG markup)
	const SOCIALS: Social[] = [
		{
			label: 'github',
			href: 'https://github.com/',
			icon: '<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>'
		},
		{
			label: 'x',
			href: 'https://x.com/',
			icon: '<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"/>'
		},
		{
			label: 'discord',
			href: 'https://discord.com/',
			icon: '<path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.8 13.8 0 0 0-.64 1.28 18.3 18.3 0 0 0-5.5 0 13.8 13.8 0 0 0-.64-1.28c-1.71.29-3.37.8-4.93 1.51A20.3 20.3 0 0 0 .1 18.06a19.9 19.9 0 0 0 6.07 3.03c.49-.66.93-1.37 1.3-2.1a12.9 12.9 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.2 14.2 0 0 0 12.16 0c.16.13.33.26.5.38-.65.38-1.34.72-2.05.98.37.73.81 1.44 1.3 2.1a19.8 19.8 0 0 0 6.07-3.03 20.3 20.3 0 0 0-3.58-13.69ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.95-2.42 2.16-2.42 2.18 1.09 2.16 2.42c0 1.34-.95 2.42-2.16 2.42Zm7.96 0c-1.18 0-2.16-1.08-2.16-2.42s.95-2.42 2.16-2.42 2.18 1.09 2.16 2.42c0 1.34-.95 2.42-2.16 2.42Z"/>'
		},
		{
			label: 'youtube',
			href: 'https://youtube.com/',
			icon: '<path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z"/>'
		}
	];

	// ── Starry background ───────────────────────────────────────
	let canvas = $state<HTMLCanvasElement | undefined>(undefined);

	$effect(() => {
		if (!canvas) return;
		const el = canvas;
		const ctx = el.getContext('2d');
		if (!ctx) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		type Star = {
			x: number;
			y: number;
			r: number;
			base: number;
			speed: number;
			phase: number;
		};
		type Meteor = { x: number; y: number; vx: number; vy: number; life: number; max: number };

		let stars: Star[] = [];
		let meteors: Meteor[] = [];
		let w = 0;
		let h = 0;
		let raf = 0;
		let nextMeteor = performance.now() + 2500;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = window.innerWidth;
			h = window.innerHeight;
			el.width = Math.floor(w * dpr);
			el.height = Math.floor(h * dpr);
			el.style.width = `${w}px`;
			el.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const count = Math.min(320, Math.floor((w * h) / 5500));
			stars = Array.from({ length: count }, () => ({
				x: Math.random() * w,
				y: Math.random() * h,
				r: Math.random() * 1.4 + 0.3,
				base: Math.random() * 0.55 + 0.35,
				speed: Math.random() * 1.6 + 0.4,
				phase: Math.random() * Math.PI * 2
			}));
		};

		const draw = (t: number) => {
			ctx.clearRect(0, 0, w, h);

			for (const s of stars) {
				const tw = reduced ? 1 : 0.6 + 0.4 * Math.sin(s.phase + (t / 1000) * s.speed);
				ctx.globalAlpha = Math.max(0, s.base * tw);
				ctx.fillStyle = '#ffffff';
				ctx.beginPath();
				ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;

			// Occasional shooting star
			if (!reduced && t > nextMeteor) {
				nextMeteor = t + 3500 + Math.random() * 5000;
				const sx = Math.random() * w * 0.7 + w * 0.2;
				meteors.push({ x: sx, y: Math.random() * h * 0.3, vx: -7, vy: 3.5, life: 0, max: 60 });
			}
			meteors = meteors.filter((m) => m.life < m.max);
			for (const m of meteors) {
				m.x += m.vx;
				m.y += m.vy;
				m.life++;
				const fade = 1 - m.life / m.max;
				const grad = ctx.createLinearGradient(m.x, m.y, m.x + 70, m.y - 35);
				grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
				grad.addColorStop(1, 'rgba(255,255,255,0)');
				ctx.strokeStyle = grad;
				ctx.lineWidth = 1.6;
				ctx.beginPath();
				ctx.moveTo(m.x, m.y);
				ctx.lineTo(m.x + 70, m.y - 35);
				ctx.stroke();
			}

			raf = requestAnimationFrame(draw);
		};

		resize();
		if (reduced) {
			draw(0);
			cancelAnimationFrame(raf);
		} else {
			raf = requestAnimationFrame(draw);
		}

		window.addEventListener('resize', resize);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<svelte:head>
	<title>{NAME} — links</title>
	<meta name="description" content="{NAME} — {BIO}" />
</svelte:head>

<div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-void text-starlight">
	<!-- Void fading into dark blue -->
	<div class="absolute inset-0 bg-gradient-to-b from-void via-[#070e22] to-[#0d1c3d]"></div>

	<!-- Stars -->
	<canvas bind:this={canvas} class="absolute inset-0" aria-hidden="true"></canvas>

	<!-- Faint horizon glow -->
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-horizon/20 to-transparent"
		aria-hidden="true"
	></div>

	<!-- Instrument panel -->
	<main class="relative z-10 w-full max-w-4xl px-4">
		<section
			class="overflow-hidden rounded-xl border border-white/[0.07] bg-deep/75 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
		>
			<div class="grid gap-8 p-8 sm:p-10 md:grid-cols-[minmax(0,1.5fr)_1px_minmax(0,1fr)] md:gap-x-10">
				<!-- Identity -->
				<div class="min-w-0">
					<p class="font-mono text-xs text-dusk">{TAGLINE}</p>
					<h1 class="mt-4 font-display text-5xl leading-none italic text-starlight sm:text-6xl">
						{WORDMARK}
					</h1>
					<p class="mt-6 max-w-[46ch] font-mono text-[13px] leading-[1.8] text-dusk">{BIO}</p>
				</div>

				<div class="hidden bg-white/[0.07] md:block" aria-hidden="true"></div>

				<!-- Pages -->
				<nav aria-label="Pages" class="-my-1 flex flex-col justify-center">
					{#each PAGES as p (p.label)}
						<a
							href={p.href}
							target={p.href.startsWith('http') ? '_blank' : undefined}
							rel={p.href.startsWith('http') ? 'noreferrer' : undefined}
							class="group flex items-baseline justify-between gap-4 border-b border-white/[0.05] py-3 font-mono text-sm text-dusk transition-colors last:border-b-0 hover:text-starlight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dusk/50"
						>
							<span
								class="flex items-center gap-2.5 text-starlight/90 underline decoration-dusk/0 decoration-2 underline-offset-4 transition-colors group-hover:decoration-dusk/50"
							>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="h-4 w-4 shrink-0 text-dusk/70"
									aria-hidden="true"
								>
									{@html p.icon}
								</svg>
								{p.label}
							</span>
							<span class="text-xs text-dusk/70">{p.desc}</span>
						</a>
					{/each}
				</nav>
			</div>

			<!-- Footer strip -->
			<footer
				class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/[0.06] px-8 py-4 font-mono text-[11px] text-dusk/80 sm:px-10"
			>
				<span class="flex items-center gap-2">
					<span class="h-1.5 w-1.5 rounded-full bg-mars"></span>
					open for fun projects
				</span>
				<span>{DOMAIN}</span>
			</footer>
		</section>

		<!-- Socials: equal-width buttons filling the row, like taskbar apps -->
		<nav
			aria-label="Social links"
			class="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-4"
		>
			{#each SOCIALS as s (s.label)}
				<a
					href={s.href}
					target="_blank"
					rel="noreferrer"
					class="flex min-w-0 items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-deep/50 px-3 py-2.5 font-mono text-xs text-dusk backdrop-blur-sm transition-colors hover:border-white/[0.14] hover:bg-deep/80 hover:text-starlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusk/50"
				>
					<svg
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-3.5 w-3.5 shrink-0 opacity-80"
						aria-hidden="true"
					>
						{@html s.icon}
					</svg>
					<span class="truncate">{s.label}</span>
				</a>
			{/each}
		</nav>
	</main>
</div>
