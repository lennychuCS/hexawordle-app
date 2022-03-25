<script>
	let name = 'Eden';
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>This is a test!</p>

</main>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #f01bbb;
		text-transform: capitalize;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>