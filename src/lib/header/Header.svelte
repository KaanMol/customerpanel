<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import Menu from '../../assets/icons/menu.svelte';
	// import logo from './svelte-logo.svg';
	import { fly } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let visible = false;
	let innerWidth = 0;
	let buttons = [
		{
			title: 'Dashboard',
			icon: 'dashboard',
			path: '/dashboard',
			showInNav: true
		},
		{
			title: 'Invoices',
			icon: 'payments',
			path: '/invoices',
			showInNav: true
		},
		{
			title: 'Domains',
			icon: 'dns',
			path: '/domain',
			showInNav: false
		}
	];

	function onNavigate(path: string) {
		return async () => {
			visible = false;
			await goto(path);
		};
	}
</script>

<svelte:window bind:innerWidth />

<nav>
	<div class="logo" />
	<!-- <img src={logo} alt="SvelteKit" /> -->
	<!-- <div class="background">d</div> -->
	{#each buttons.filter((button) => button.showInNav) as button}
		<button class="menubutton" on:click={onNavigate(button.path)}>{button.title}</button>
	{/each}

	<!-- <button on:click={() => goto('/invoices')}>Invoices</button> -->
	<button class="menubutton" on:click={() => (visible = true)}>Menu</button>

	<input type="text" />
</nav>

{#if visible || innerWidth > 1200}
	<div class="menu" transition:fly={{ x: -1300, duration: 1000, opacity: 1 }}>
		<!-- <img src={logo} alt="SvelteKit" /> -->
		<button class="menu-close" on:click={() => (visible = false)}>Close this crap</button>
		{#each buttons as button}
			<button
				class="menu-item"
				class:active={$page.url.pathname.includes(button.path)}
				on:click={onNavigate(button.path)}
			>
				<span class="material-icons">{button.icon}</span>
				<span class="menu-item-title">{button.title}</span>
			</button>
		{/each}
	</div>
{/if}

<style lang="scss">
	.logo {
		background-image: var(--logo-png);
		width: 100%; /* or any custom size */
		height: 100%;
		background-size: contain;
		background-repeat: no-repeat;
	}
	@import '../../colors.scss';

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
		height: 70px;
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
		display: flex;
		flex-direction: column;
		grid-template-rows: auto;

		.menu-item {
			display: grid;
			grid-template-columns: min-content min-content;
			column-gap: 8px;
			align-items: center;
			text-align: left;
			border-radius: 12px;
			padding: 10px;
			margin: 8px 16px;
			line-height: 0.5px;
			vertical-align: bottom;
			background: #161618;
			border: none;
			font-weight: bold;
			font-size: 14px;
			color: var(--color);

			&.active {
				background: var(--primary-color);
				color: var(--opposite-color);
			}

			.menu-item.title {
				margin-top: 2px;
			}
		}

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

		@include for-tablet-portrait-up() {
			width: 50%;
		}

		@include for-tablet-landscape-up() {
			width: 30%;
		}

		@include for-desktop-up() {
			padding-top: 20px;
			width: 100%;
			position: unset;
			z-index: unset;
			top: unset;
			left: unset;
			backdrop-filter: unset;

			.menu-close {
				display: none;
			}
			// width: 250px;
		}
	}
	nav {
		display: grid;
		justify-items: center;
		grid-template-columns: 1fr 1fr 1fr;
		backdrop-filter: blur(20px) saturate(180%);
		background-color: rgba(22, 22, 24, 0.7);
		color: var(--color);
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
