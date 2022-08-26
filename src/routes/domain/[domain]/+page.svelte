<script lang="ts">
	import DnsRecordCreate from '$lib/dns/DnsRecordCreate.svelte';
	import { recordsStore } from '$lib/../store/records';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { DnsRecordType } from '@prisma/client';
	import type { PageData } from './$types';

	type Record = {
		id?: number;
		name: string;
		type: string;
		value: string;
		ttl: number;
	};

	export let data: PageData;

	onMount(() => {
		console.log($recordsStore);
		recordsStore.update((val) => data.records);
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

	async function removeRecord(index: number, record: Record) {
		if (record.id !== undefined) {
			const result = await axios.delete(`/api/${$page.params.domain}/records`, {
				data: record
			});

			console.log(result);
		}

		$recordsStore.splice(index, 1);
		$recordsStore = $recordsStore;
	}
</script>

<!-- <DnsRecordCreate /> -->
<div class="page">
	<div class="title">
		<button on:click={() => goto('./')}>Back</button>
		{$page.params.domain}
	</div>

	<div class="records">
		{#each $recordsStore as record, i}
			<div class="record">
				<div class="row name">
					<span class="label">Name</span>
					<input title="name" bind:value={record.name} />
				</div>

				<div class="row type">
					<span class="label">Type</span>
					<select bind:value={record.type}>
						{#each Object.values(DnsRecordType) as recordType}
							<option value={recordType}>
								{recordType}
							</option>
						{/each}
					</select>
				</div>

				<div class="row ttl">
					<span class="label">TTL</span>
					<input bind:value={record.ttl} />
				</div>

				<div class="row value">
					<span class="label">Value</span>
					<input bind:value={record.value} />
				</div>

				<div class="row remove">
					<button on:click={() => removeRecord(i, record)}>
						<span class="icon material-icons">delete</span>
						<span class="text">Remove record</span>
					</button>
				</div>
			</div>
		{/each}
		<div class="record">
			<button class="new-record" on:click={addRecord}>
				<span class="icon material-icons">add</span>
				<span class="new-record-text">Add record</span>
			</button>
		</div>

		<div class="record">
			<button class="row add-record" on:click={updateRecords}>Apply Changes</button>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../../colors.scss';

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
	.page {
		@include for-tablet-portrait-up() {
			display: grid;
			grid-template-columns: 15% 1fr 15%;

			.title {
				grid-column: 2;
			}

			.records {
				border-radius: 12px;
				grid-column: 2;
			}
		}

		.records {
			margin-bottom: 15px;
			padding: 15px;

			.new-record {
				// box-sizing: content-box;
				// margin: 15px;
				grid-column: 1/-1;
				width: 100%;
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
					span.label {
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

					// &.new-record {
					// 	background: var(--secondary-color);
					// 	grid-column: span auto / -1;
					// }

					&.add-record {
						padding: 10px;
						border-radius: 12px;
						font-weight: bold;
						// letter-spacing: 1px;
						background: var(--primary-color);
						color: var(--opposite-color);
						grid-column: span auto / -1;
						justify-self: right;
					}

					button,
					select {
						border-radius: 8px;
						padding: 8px;
						color: #ff7f77;
						border: none;
						outline: 0;
						background: rgba(255, 255, 255, 0.1);
						display: flex;
						gap: 15px;
						justify-content: center;

						.text {
							align-self: center;
						}
					}

					select {
						font-weight: bold;
					}
				}
			}

			@include for-tablet-landscape-up() {
				grid-template-columns: auto;
				background: #161618;
				& > .record {
					margin-bottom: 0;
					background: none;
					border-radius: 0;
					grid-template-columns: 2fr 1fr 1fr 2fr min-content;

					.new-record {
						padding: 15px;
						border-radius: 12px;
						background: rgba(255, 255, 255, 0.1);
						width: 100%;
						display: flex;
						gap: 10px;
						justify-content: center;
						align-items: center;
						& .new-record-text {
							margin-top: 2px;
						}
					}

					.row {
						grid-column: unset;
						&.ttl {
							grid-column: unset;
						}
						&.type {
							grid-column: unset;
						}

						.text {
							display: none;
						}
					}
				}
			}
		}
	}
</style>
