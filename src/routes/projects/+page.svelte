<script lang="ts">
	import Starfield from '#lib/components/Starfield.svelte';

	// ── Edit your stuff here ────────────────────────────────────
	const NAME = 'PinguSurMars_';
	type Project = { name: string; desc: string; href?: string };

	const PROJECTS: Project[] = [
		{ name: 'pingusurmars.xyz', desc: 'you', href: '/' },
		{ name: 'discord bot', desc: 'does bot things, badly' },
		{ name: '???', desc: 'this space is yours' }
	];
	const GITHUB = 'https://github.com/pingusurmars';
</script>

<svelte:head>
	<title>projects — {NAME}</title>
	<meta name="description" content="Projects by {NAME}" />
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
				<h1 class="font-display text-5xl leading-none italic text-starlight sm:text-6xl">projects</h1>

				<div class="mt-8 border-t border-white/[0.06]">
					{#each PROJECTS as p (p.name)}
						{#if p.href}
							<a
								href={p.href}
								target={p.href.startsWith('http') ? '_blank' : undefined}
								rel={p.href.startsWith('http') ? 'noreferrer' : undefined}
								class="group flex items-baseline justify-between gap-4 border-b border-white/[0.05] py-3 font-mono text-sm text-dusk transition-colors hover:text-starlight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dusk/50"
							>
								<span
									class="text-starlight/90 underline decoration-dusk/0 decoration-2 underline-offset-4 transition-colors group-hover:decoration-dusk/50"
								>
									{p.name}
								</span>
								<span class="text-xs text-dusk/70">{p.desc}</span>
							</a>
						{:else}
							<div
								class="flex items-baseline justify-between gap-4 border-b border-white/[0.05] py-3 font-mono text-sm text-dusk"
							>
								<span class="text-starlight/90">{p.name}</span>
								<span class="text-xs text-dusk/70">{p.desc}</span>
							</div>
						{/if}
					{/each}

					<!-- Everything else lives on GitHub -->
					<a
						href={GITHUB}
						target="_blank"
						rel="noreferrer"
						class="group flex items-baseline justify-between gap-4 border-b border-white/[0.05] py-3 font-mono text-sm text-dusk transition-colors hover:text-starlight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dusk/50"
					>
						<span
							class="text-starlight/90 underline decoration-dusk/0 decoration-2 underline-offset-4 transition-colors group-hover:decoration-dusk/50"
						>
							github
						</span>
						<span class="text-xs text-dusk/70">
							<span class="sr-only">(opens in a new tab)</span>
							<span aria-hidden="true">↗</span>
						</span>
					</a>
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
