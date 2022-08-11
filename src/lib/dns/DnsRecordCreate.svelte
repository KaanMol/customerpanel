<script lang="ts">
	import { DnsRecordType } from '@prisma/client';
	import axios from 'axios';
	import { page } from '$app/stores';
	import { recordsStore } from '../../store/records';

	const types = Object.keys(DnsRecordType);

	const record = {
		name: '',
		type: '',
		value: '',
		ttl: 3600
	};
	async function createRecord() {
		const res = await axios.post(`/api/${$page.params.domain}/records`, record);

		recordsStore.update((val) => [...val, res.data]);

		record.name = '';
		record.type = '';
		record.value = '';
		record.ttl = 3600;
	}
</script>

<form class="content" on:submit|preventDefault={createRecord}>
	<label>Name</label>
	<input type="text" bind:value={record.name} required />

	<label>Type</label>
	<select bind:value={record.type} required>
		{#each types as type}
			<option value={type}>
				{type}
			</option>
		{/each}
	</select>

	<label>Value</label>
	<input type="text" bind:value={record.value} required />

	<input type="submit" />
</form>
