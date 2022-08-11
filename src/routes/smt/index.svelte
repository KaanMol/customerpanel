<script lang="ts">
	let test = 'hi';
	const log = () => {
		console.log(test);
	};
</script>

<h1>Hi!</h1>
<input bind:value={test} />
<button on:click={log}>hi</button>
