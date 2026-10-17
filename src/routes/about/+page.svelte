<script lang="ts">
	import Starfield from '#lib/components/Starfield.svelte';

	// ── Edit your info here ─────────────────────────────────────
	const NAME = 'PinguSurMars_';
	const PARAGRAPHS = [
		'French idiot, evidently. I build small things for the internet — mostly with Svelte, sometimes with bots attached.',
		'This is the new place. The old one is still around if you are feeling nostalgic.'
	];
	const CURRENT = [
		{ label: 'building', value: 'this website' },
		{ label: 'tinkering', value: 'discord bots' },
		{ label: 'avoiding', value: 'sleep' }
	];
</script>

<svelte:head>
	<title>about — {NAME}</title>
	<meta name="description" content="About {NAME}" />
</svelte:head>

<div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-void text-starlight">
	<!-- Void fading into dark blue -->
	<div class="absolute inset-0 bg-gradient-to-b from-void via-[#070e22] to-[#0d1c3d]"></div>

	<!-- Stars -->
	<Starfield />

	<!-- Faint horizon glow -->
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-horizon/20 to-transparent"
		aria-hidden="true"
	></div>

	<!-- Instrument panel -->
	<main class="relative z-10 w-full max-w-3xl px-4">
		<section
			class="overflow-hidden rounded-xl border border-white/[0.07] bg-deep/75 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
		>
			<div class="p-8 sm:p-10">
				<h1 class="font-display text-5xl leading-none italic text-starlight sm:text-6xl">about</h1>

				{#each PARAGRAPHS as p}
					<p class="mt-5 max-w-[52ch] font-mono text-[13px] leading-[1.8] text-dusk">{p}</p>
				{/each}

				<div class="mt-8 border-t border-white/[0.06]">
					{#each CURRENT as c (c.label)}
						<div
							class="flex items-baseline justify-between gap-4 border-b border-white/[0.05] py-3 font-mono text-sm"
						>
							<span class="text-starlight/90">{c.label}</span>
							<span class="text-xs text-dusk/70">{c.value}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Footer strip -->
			<footer
				class="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/[0.06] px-8 py-4 font-mono text-[11px] text-dusk/80 sm:px-10"
			>
				<a
					href="/"
					class="underline decoration-dusk/0 underline-offset-4 transition-colors hover:text-starlight hover:decoration-dusk/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dusk/50"
				>
					← home
				</a>
				<span>pingusurmars.xyz</span>
			</footer>
		</section>
	</main>
</div>
