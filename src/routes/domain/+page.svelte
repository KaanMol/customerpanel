<script lang="ts">
	import { each } from 'svelte/internal';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	type Domain = {
		name: string;
		extension: string;
		records: {
			type: string;
			value: string;
			ttl: number;
		};
	};

	export let data: PageData;
</script>

<div class="page">
	<div class="title">Domains</div>
	<div class="domains">
		{#each data.domains as domain}
			<div class="domain" on:click={() => goto(`/domain/${domain.name}.${domain.extension}`)}>
				{domain.name}.{domain.extension}
			</div>
		{/each}
	</div>
</div>

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
	.title {
		grid-column: 2;
	}
	.page {
		margin-top: 15px;
		display: grid;
		grid-template-columns: 15px 1fr 15px;

		@include for-tablet-portrait-up() {
			grid-template-columns: 15% 1fr 15%;
		}
	}
	.domains {
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		grid-column: 2;

		.domain {
			padding: 25px 20px;
			&:not(:last-child) {
				border-bottom: solid 1px #212124;
			}
		}
	}
</style>
