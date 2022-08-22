<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.scss';

	// function swoop() {
	// 	return {
	// 		duration: 1000,
	// 		easing: elasticOut,
	// 		css: (t, u) => `transform: scale(${t}) translateX(${u * 100}%)`
	// 	};
	// }
</script>

<Header />
<!-- <button on:click={() => appAuth.getSes?sion()}></button> -->
<!-- <Header /> -->
<main>
	<slot />
</main>

<!-- <label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>
{#if visible}
	<div class="menu" transition:swoop>
		<label>
			<input type="checkbox" bind:checked={visible} />
			visible
		</label>
	</div>
{/if} -->

<!-- <footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer> -->
<style>
	/* * {
		box-sizing: content-box;
		width: 100%;
	} */
	body {
		/* display: grid;
		grid-template-columns: 1fr min-content; */
	}

	nav {
		/* grid-column: 2; */
	}
	.menu {
		/* height: 100%;
		background: red;
		position: absolute;
		top: 0;
		width: 100%;
		color: white; */
	}

	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	} */
</style>
