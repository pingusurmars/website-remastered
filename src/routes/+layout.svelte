<script lang="ts">
	import type { LayoutProps } from './$types';
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
