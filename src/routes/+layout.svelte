<script lang="ts">
	import type { LayoutProps } from './$types';
	import '@fontsource/fira-mono/400.css';
	import '@fontsource/fira-mono/500.css';
	import './layout.css';

	let { children }: LayoutProps = $props();
</script>

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
