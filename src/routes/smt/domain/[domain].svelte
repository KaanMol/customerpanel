<script lang="ts">
	import DnsRecordCreate from '$lib/dns/DnsRecordCreate.svelte';
	import { recordsStore } from '$lib/../store/records';
	import { onMount } from 'svelte';

	type Record = {
		name: string;
		type: string;
		value: string;
		ttl: number;
	};

	export let records: Record[];

	onMount(() => {
		console.log($recordsStore);
		recordsStore.update((val) => records);
		console.log($recordsStore);
	});
</script>

<!-- <DnsRecordCreate /> -->
<div class="records">
	{#each $recordsStore as record}
		<div class="record">
			<p>Name</p>
			<input title="name" bind:value={record.name} />
			<p>Name</p>
			<input bind:value={record.type} />
			<p>Name</p>
			<input bind:value={record.value} />
			<p>Name</p>
			<input bind:value={record.ttl} />
		</div>
	{/each}
</div>

<style>
	.records {
		background: red;
	}

	.record {
		/* background: red; */
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
		margin-bottom: 15px;
	}

	.record > input {
		background: rgba(255, 255, 255, 0.1);
		border: none;
		outline: 0;
		color: white;
		padding: 10px 15px;
		border-radius: 8px;
		/* width: 100%; */
	}
</style>
