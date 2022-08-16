<script lang="ts">
	import DnsRecordCreate from '$lib/dns/DnsRecordCreate.svelte';
	import { recordsStore } from '$lib/../store/records';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import axios from 'axios';

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

	async function updateRecords() {
		await axios.post(`/api/${$page.params.domain}/records`, $recordsStore);
	}

	function addRecord() {
		$recordsStore = [
			...$recordsStore,
			{
				name: '',
				value: '',
				ttl: 3600,
				type: ''
			}
		];
	}
</script>

<!-- <DnsRecordCreate /> -->
<div class="page">
	<div class="title">
		<button on:click={() => goto('./')}>Back</button>
		{$page.params.domain}
	</div>

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

				<div class="row remove">
					<button>Remove Record</button>
				</div>
			</div>
		{/each}

		<div class="record">
			<button class="row add-record" on:click={updateRecords}>Apply Changes</button>
			<button class="row new-record" on:click={addRecord}>Add record</button>
		</div>
	</div>
</div>

<style lang="scss">
	.new-record {
		grid-column: span auto / -1;
	}

	.add-record {
		grid-column: span auto / -1;
	}

	@media (min-width: 800px) {
		.page {
			display: grid;
			grid-template-columns: 15% 1fr 15%;
			.records {
				border-radius: 12px;
				grid-column: 2;
			}
		}
	}
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

		@media (min-width: 650px) {
			display: grid;
			grid-template-columns: 15% 1fr 15%;

			.record {
				grid-column: 2;
			}
		}

		@media (min-width: 800px) {
			grid-template-columns: auto;
			background: #161618;
			& > .record {
				margin-bottom: 0;
				background: none;
				border-radius: 0;
				grid-template-columns: 2fr 1fr 1fr 2fr;
				.row {
					grid-column: unset;
					&.ttl {
						grid-column: unset;
					}
					&.type {
						grid-column: unset;
					}
				}
			}
		}
	}
</style>
