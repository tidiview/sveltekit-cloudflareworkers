<script context="module">
	export const prerender = true;
</script>

<script>
	import Counter from '$lib/Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome-280.webp 280w, svelte-welcome-380.webp 380w, svelte-welcome-480.webp 480w, svelte-welcome-640.webp 640w, svelte-welcome-840.webp 840w, svelte-welcome-1280.webp 1280w, svelte-welcome-1600.webp 1600w, svelte-welcome-1920.webp 1920w" type="image/webp" />
				<source srcset="svelte-welcome-280.png 280w, svelte-welcome-380.png 380w, svelte-welcome-480.png 480w, svelte-welcome-640.png 640w, svelte-welcome-840.png 840w, svelte-welcome-1280.png 1280w, svelte-welcome-1600.png 1600w, svelte-welcome-1920.png 1920w" type="image/png" />
				<img src="svelte-welcome.png" alt="Welcome" width="2048" height="495" />
			</picture>
		</div>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/index.svelte</strong>
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
		aspect-ratio: auto 2048 / 495;
	}
</style>
