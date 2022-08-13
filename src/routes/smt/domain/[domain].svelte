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
			<div class="row name">
				<span>Name</span>
				<input title="name" bind:value={record.name} />
			</div>

			<div class="row type">
				<span>Type</span>
				<input bind:value={record.type} />
			</div>

			<div class="row ttl">
				<span>TTL</span>
				<input bind:value={record.ttl} />
			</div>

			<div class="row value">
				<span>Value</span>
				<input bind:value={record.value} />
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	input {
		box-sizing: border-box;
		width: 100%;
		background: rgba(255, 255, 255, 0.1);
		border: none;
		outline: 0;
		color: white;
		padding: 10px 15px;
		border-radius: 8px;
	}

	.records {
		/* background: ; */
		margin-bottom: 15px;
		padding: 15px;
	}

	.record {
		color: white;
		background: #161618;
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: 1fr 1fr;
		gap: 15px;
		margin-bottom: 15px;
		padding: 15px;
		border-radius: 12px;

		& > div {
			box-sizing: border-box;
			width: 100%;
			span {
				font-weight: bold;
				margin-bottom: 5px;
				opacity: 0.7;
			}
		}

		.row {
			display: grid;
			grid-template-rows: auto;
			grid-column: 1 / 3;

			&.ttl {
				grid-column: 2;
			}

			&.type {
				grid-column: 1;
			}
		}
	}
</style>
