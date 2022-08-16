<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import Menu from '../../assets/icons/menu.svelte';
	import logo from './svelte-logo.svg';
	import { fly } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let visible = false;
</script>

<!-- <header> -->
<!-- <div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div> -->

<nav>
	<!-- <div class="background">d</div> -->
	<button on:click={() => goto('/dashboard')}>Dashboard</button>
	<button on:click={() => goto('/invoices')}>Invoices</button>
	<button on:click={() => (visible = true)}>Menu</button>
</nav>

{#if visible}
	<div class="menu">
		<h1>hi from menu!</h1>
		<button on:click={() => (visible = false)}>Close this crap</button>
		<button
			on:click={async () => {
				await goto('/smt/domain');
				visible = false;
			}}>Domains</button
		>
		<!-- <input type="checkbox" bind:checked={visible} /> -->
	</div>
	<!-- <div class="menu" transition:swoop>
		<label>
			<input type="checkbox" bind:checked={visible} />
			visible
		</label>
	</div> -->
{/if}

<!-- <div class="corner"> -->
<!-- TODO put something else here? github link? -->
<!-- </div> -->

<!-- </header> -->
<style lang="scss">
	h1 {
		color: white;
	}

	.menu {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(22, 22, 24, 0.7);
		backdrop-filter: blur(8px);
	}
	nav {
		display: grid;
		justify-items: center;
		grid-template-columns: 1fr 1fr 1fr;
		backdrop-filter: blur(8px);
		background-color: rgba(22, 22, 24, 0.7);
		color: #fff;
		width: 100%;
		z-index: 900;
		/* padding: 10px; */
		/* display: grid;
		grid-template-columns: 50px 1fr; */
		align-items: center;

		button {
			background: none;
			outline: 0;
			border: none;
			color: white;
			justify-self: center;
			height: 70px;
		}

		// div.background {
		// 	position: absolute;
		// 	top: 0;
		// 	z-index: -1;
		// 	left: 0;
		//
		// 	filter: blur(4px);
		// 	min-width: 100%;
		// 	min-height: 100%;
		// 	display: block;
		// }
	}
	nav > span {
		justify-self: center;
	}
</style>
