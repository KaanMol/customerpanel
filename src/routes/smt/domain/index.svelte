<script lang="ts">
	import { each } from 'svelte/internal';

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

{#each domains as domain}
	<a href={`/smt/domain/${domain.name}.${domain.extension}`}>{domain.name}.{domain.extension}</a>
{/each}
