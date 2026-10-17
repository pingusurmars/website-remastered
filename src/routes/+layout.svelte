<script lang="ts">
	import type { LayoutProps } from './$types';
	import '@fontsource/fira-mono/400.css';
	import '@fontsource/fira-mono/500.css';
	import './layout.css';
	import favicon16 from '#lib/images/favicon-16x16.png';
    import favicon32 from '#lib/images/favicon-32x32.png';
    import favicon from '#lib/images/favicon.ico';
    import appleicon from '#lib/images/apple-touch-icon.png';
    import manifest from '#lib/site.webmanifest';
	let { children }: LayoutProps = $props();
</script>
<svelte:head>
    <link href={favicon} rel="icon"/>
    <link href={appleicon} rel="apple-touch-icon" sizes="180x180">
    <link href={favicon32} rel="icon" sizes="32x32" type="image/png">
    <link href={favicon16} rel="icon" sizes="16x16" type="image/png">
    <link href={manifest} rel="manifest">
    <script async src="https://schlongittyballifuck.pingusurmars.xyz/js/pa-peddCbasgqhQsv_I2kVmm.js"></script>
    <script>window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}}; plausible.init({endpoint: "https://schlongittyballifuck.pingusurmars.xyz/api/event"})</script>
</svelte:head>
<div class="app">
	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		min-height: 100vh;
	}
</style>
