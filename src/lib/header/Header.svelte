<script lang="ts">
	import { page } from '$app/stores';
	import Menu from '../../assets/icons/menu.svelte';
	import logo from './svelte-logo.svg';
</script>

<!-- <header> -->
<!-- <div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div> -->

<nav>
	<!-- <Menu /> -->
	<span>i</span>
	Domains
</nav>

<!-- <div class="corner"> -->
<!-- TODO put something else here? github link? -->
<!-- </div> -->

<!-- </header> -->
<style>
	nav {
		background-color: #161618;
		color: #fff;
		/* padding: 10px; */
		display: grid;
		grid-template-columns: 50px 1fr;
		height: 50px;
		align-items: center;
	}
	nav > span {
		justify-self: center;
	}
</style>
