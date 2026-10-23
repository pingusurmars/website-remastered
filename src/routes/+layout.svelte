<script lang="ts">
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import '@fontsource/fira-mono/400.css';
	import '@fontsource/fira-mono/500.css';
	import './layout.css';
	import Starfield from '#lib/components/Starfield.svelte';
	import favicon16 from '#lib/images/favicon-16x16.png';
	import favicon32 from '#lib/images/favicon-32x32.png';
	import favicon from '#lib/images/favicon.ico';
	import appleicon from '#lib/images/apple-touch-icon.png';
	import manifest from '#lib/site.webmanifest';

	let { children }: LayoutProps = $props();

	// Page switch: outgoing content fades out, incoming content fades in
	// while rising a touch. Skipped entirely for reduced-motion users.
	const pageOut = () => ({
		duration: prefersReducedMotion.current ? 0 : 200,
		easing: cubicOut
	});
	const pageIn = () => ({
		y: prefersReducedMotion.current ? 0 : 12,
		duration: prefersReducedMotion.current ? 0 : 320,
		delay: prefersReducedMotion.current ? 0 : 80,
		easing: cubicOut
	});

	// ── Konami code ────────────────────────────────────────────
	const KONAMI = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'b',
		'a'
	];
	let konamiIndex = 0;

	const onKonamiKey = (e: KeyboardEvent) => {
		// letters match case-insensitively so B/A work with shift held
		const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
		if (key === KONAMI[konamiIndex]) {
			konamiIndex += 1;
			if (konamiIndex === KONAMI.length) {
				konamiIndex = 0;
				window.open('https://mswp.pingusurmars.xyz', '_blank', 'noopener');
			}
		} else {
			// start over, unless this key is the first key of a new attempt
			konamiIndex = key === KONAMI[0] ? 1 : 0;
		}
	};
</script>

<svelte:window onkeydown={onKonamiKey} />

<svelte:head>
	<link href={favicon} rel="icon" />
	<link href={appleicon} rel="apple-touch-icon" sizes="180x180" />
	<link href={favicon32} rel="icon" sizes="32x32" type="image/png" />
	<link href={favicon16} rel="icon" sizes="16x16" type="image/png" />
	<link href={manifest} rel="manifest" />
	<script
		async
		src="https://schlongittyballifuck.pingusurmars.xyz/js/pa-peddCbasgqhQsv_I2kVmm.js"
	></script>
	<script>
		((window.plausible =
			window.plausible ||
			function () {
				(plausible.q = plausible.q || []).push(arguments);
			}),
			(plausible.init =
				plausible.init ||
				function (i) {
					plausible.o = i || {};
				}));
		plausible.init({ endpoint: 'https://schlongittyballifuck.pingusurmars.xyz/api/event' });
	</script>
</svelte:head>
<div class="relative grid min-h-screen place-items-center overflow-hidden bg-void text-starlight">
	<!-- Void fading into dark blue -->
	<div class="absolute inset-0 bg-gradient-to-b from-void via-[#070e22] to-[#0d1c3d]"></div>

	<!-- Stars -->
	<Starfield />

	<!-- Faint horizon glow -->
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-horizon/20 to-transparent"
		aria-hidden="true"
	></div>

	{#key page.url.pathname}
		<!-- Stacked in the same grid cell so outgoing + incoming overlap cleanly -->
		<div
			class="col-start-1 row-start-1 flex w-full justify-center"
			in:fly={pageIn()}
			out:fade={pageOut()}
		>
			{@render children()}
		</div>
	{/key}
</div>
