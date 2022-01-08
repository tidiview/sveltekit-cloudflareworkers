<script context="module">
    const valid_slugs = new Set(['c-u', 'crypto', 'form', 'error', 'organisation']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
        const slug = page.params.slug;
        if (!valid_slugs.has(slug)) {
			console.log(`invalid slug parameter ${slug}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// ${params.lang}
		// /ja
		const url = `${page.path}.json`;
		const res = await fetch(url);
		const data = await res.json();

		if (res.ok) {
			return {
				props: {
					data
				}
			};
		}
 
		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};

	}
</script>

<script>
    export let data;
    export let slug = data.params.slug;
	console.log(data);
</script>

this is: <br/>
<pre>{slug}<br/></pre>
<pre>[slug]<br/></pre>
<br/>
with:
<pre>[slug]: {slug}</pre>