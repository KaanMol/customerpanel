<script lang="ts">
	import { each } from 'svelte/internal';
	import { goto } from '$app/navigation';

	type Domain = {
		name: string;
		extension: string;
		records: {
			type: string;
			value: string;
			ttl: number;
		};
	};

	export let domains: Domain[];
</script>

<div class="page">
	<div class="title">Domains</div>
	<div class="domains">
		{#each domains as domain}
			<div class="domain" on:click={() => goto(`/smt/domain/${domain.name}.${domain.extension}`)}>
				{domain.name}.{domain.extension}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.title {
		grid-column: 2;
	}
	.page {
		margin-top: 15px;
		display: grid;
		grid-template-columns: 15px 1fr 15px;
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
