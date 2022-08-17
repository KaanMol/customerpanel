<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import Menu from '../../assets/icons/menu.svelte';
	// import logo from './svelte-logo.svg';
	import { fly } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import logo from '../logo-white.png';

	let visible = false;
	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<nav>
	<img src={logo} alt="SvelteKit" />
	<!-- <div class="background">d</div> -->
	<button on:click={() => goto('/dashboard')}>Dashboard</button>
	<button on:click={() => goto('/invoices')}>Invoices</button>
	<button class="menubutton" on:click={() => (visible = true)}>Menu</button>
</nav>

{#if visible || innerWidth > 1200}
	<div class="menu" transition:fly={{ x: -1300, duration: 1000, opacity: 1 }}>
		<img src={logo} alt="SvelteKit" />

		<h1>hi from menu!</h1>
		<button on:click={() => (visible = false)}>Close this crap</button>
		<button
			on:click={async () => {
				await goto('/domain');
				visible = false;
			}}>Domains</button
		>
	</div>
{/if}

<style lang="scss">
	@mixin for-phone-only {
		@media (max-width: 599px) {
			@content;
		}
	}
	@mixin for-tablet-portrait-up {
		@media (min-width: 600px) {
			@content;
		}
	}
	@mixin for-tablet-landscape-up {
		@media (min-width: 900px) {
			@content;
		}
	}
	@mixin for-desktop-up {
		@media (min-width: 1200px) {
			@content;
		}
	}
	@mixin for-big-desktop-up {
		@media (min-width: 1800px) {
			@content;
		}
	}
	nav {
		.menubutton {
			@include for-desktop-up() {
				display: none;
			}
		}
		img {
			height: 50px;
			justify-self: baseline;
			margin-left: 20px;
			display: none;

			@include for-desktop-up() {
				display: unset;
			}
		}
	}
	.menu {
		img {
			height: 50px;
			@include for-desktop-up() {
				display: none;
			}
		}
	}

	h1 {
		color: white;
	}

	.menu {
		z-index: 900;
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(22, 22, 24, 0.7);
		backdrop-filter: blur(20px) saturate(180%);

		@include for-desktop-up() {
			position: unset;
			z-index: unset;
			top: unset;
			left: unset;
			// width: 250px;
		}
	}
	nav {
		display: grid;
		justify-items: center;
		grid-template-columns: 1fr 1fr 1fr;
		backdrop-filter: blur(20px) saturate(180%);
		background-color: rgba(22, 22, 24, 0.7);
		color: #fff;
		width: 100%;
		z-index: 900;
		align-items: center;

		button {
			background: none;
			outline: 0;
			border: none;
			color: white;
			justify-self: center;
			height: 70px;
		}
	}
	nav > span {
		justify-self: center;
	}
</style>
