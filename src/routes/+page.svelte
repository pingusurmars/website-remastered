<script lang="ts">
	// ── Edit your info here ─────────────────────────────────────
	const NAME = 'PinguSurMars';
	const TAGLINE = '@pingusurmars';
	const BIO =
		'French dev tinkering with Svelte, bots & silly web experiments. I build small things for fun and share them here.';
	const AVATAR_TEXT = '🐧';

	type Social = { label: string; href: string; icon: string };

	const SOCIALS: Social[] = [
		{
			label: 'GitHub',
			href: 'https://github.com/',
			icon: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z'
		},
		{
			label: 'X',
			href: 'https://x.com/',
			icon: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z'
		},
		{
			label: 'Discord',
			href: 'https://discord.com/',
			icon: 'M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.8 13.8 0 0 0-.64 1.28 18.3 18.3 0 0 0-5.5 0 13.8 13.8 0 0 0-.64-1.28c-1.71.29-3.37.8-4.93 1.51A20.3 20.3 0 0 0 .1 18.06a19.9 19.9 0 0 0 6.07 3.03c.49-.66.93-1.37 1.3-2.1a12.9 12.9 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.2 14.2 0 0 0 12.16 0c.16.13.33.26.5.38-.65.38-1.34.72-2.05.98.37.73.81 1.44 1.3 2.1a19.8 19.8 0 0 0 6.07-3.03 20.3 20.3 0 0 0-3.58-13.69ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.95-2.42 2.16-2.42 2.18 1.09 2.16 2.42c0 1.34-.95 2.42-2.16 2.42Zm7.96 0c-1.18 0-2.16-1.08-2.16-2.42s.95-2.42 2.16-2.42 2.18 1.09 2.16 2.42c0 1.34-.95 2.42-2.16 2.42Z'
		},
		{
			label: 'YouTube',
			href: 'https://youtube.com/',
			icon: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z'
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
	<title>{NAME} — Links</title>
	<meta name="description" content="{NAME} — {BIO}" />
</svelte:head>

<div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050a1a] text-blue-100">
	<!-- Near-black fading to dark blue -->
	<div class="absolute inset-0 bg-gradient-to-b from-[#04081a] via-[#071130] to-[#0c1c44]"></div>

	<!-- Stars -->
	<canvas bind:this={canvas} class="absolute inset-0" aria-hidden="true"></canvas>

	<!-- Card -->
	<main class="relative z-10 w-full max-w-3xl px-4">
		<div
			class="card-enter rounded-3xl border border-blue-500/15 bg-blue-950/60 p-8 shadow-[0_20px_80px_-20px_rgba(0,0,0,1)] backdrop-blur-xl sm:p-10"
		>
			<!-- Header row: avatar + identity side by side -->
			<div class="flex items-center gap-5">
				<div
					class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-900/70 text-3xl sm:h-20 sm:w-20 sm:text-4xl"
				>
					<span aria-hidden="true">{AVATAR_TEXT}</span>
				</div>

				<div class="min-w-0">
					<h1 class="text-2xl font-bold tracking-tight text-blue-50 sm:text-3xl">{NAME}</h1>
					<p class="mt-0.5 text-sm font-medium text-blue-300/80">{TAGLINE}</p>
					<p class="mt-2 max-w-xl text-[15px] leading-relaxed text-blue-200/80">{BIO}</p>
				</div>
			</div>

			<!-- Social links in a single row -->
			<div class="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
				{#each SOCIALS as s (s.label)}
					<a
						href={s.href}
						target="_blank"
						rel="noreferrer"
						class="group flex items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-900/50 px-4 py-3 text-sm font-semibold text-blue-100 transition hover:-translate-y-0.5 hover:border-blue-400/50 hover:bg-blue-800/70 hover:text-white"
					>
						<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 opacity-80" aria-hidden="true">
							<path d={s.icon} />
						</svg>
						{s.label}
					</a>
				{/each}
			</div>

			<!-- Status row -->
			<div class="mt-6 flex items-center gap-2 text-xs text-blue-300/70">
				<span class="relative flex h-2 w-2">
					<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60"></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-blue-300"></span>
				</span>
				Open for fun projects
			</div>
		</div>

		<p class="mt-5 text-center text-xs text-blue-400/40">© {new Date().getFullYear()} {NAME}</p>
	</main>
</div>

<style>
	.card-enter {
		animation: rise 0.7s cubic-bezier(0.2, 0.7, 0.3, 1) both;
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(14px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
