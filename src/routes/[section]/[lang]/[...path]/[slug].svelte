<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, params }) {
		// /api/${params.section}/${params.lang}/${params.path}/${params.slug}
		const url = `/api/docs/ja/paris/louvre/la-joconde/vasari`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					data : await res.json()
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
	export let section = data.params.section;
    export let lang = data.params.lang;
    export let path = data.params.path;
    export let slug = data.params.slug;
	// console.log(data);
</script>

this is: <br/>
<pre>"{section}" / "{lang}" / "{path}" / "{slug}"<br/></pre>
<br/>
with:
<pre>section: "{section}"</pre>
<pre>lang: "{lang}"</pre>
<pre>path: "{path}"</pre>
<pre>slug: "{slug}"</pre>