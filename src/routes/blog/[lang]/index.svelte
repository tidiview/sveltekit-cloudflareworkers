<script context="module">
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url, params, fetch }) {
        const lang = params.lang;
        if ( !valid_langs.has(lang)) {
			console.log(`invalid parameter lang: ${lang}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// ${page.path}
		// /blog/ja
		const url1 = `/blog/` + lang + `.json`;
		const res = await fetch(url1);
		
		if (!res.ok)
			return {
				status: res.status,
				error: new Error(`Could not load ${url1}`)
			};
		
		const data = await res.json();
		
		// blog/route-tree.blog.ja.json
		const url2 = `/blog/route-tree.blog.` + lang  + `.json`;
		const res2 = await fetch(url2);

		if (!res2.ok)
			return {
				status: res2.status,
				error: new Error(`Could not load ${url2}`)
			}

		const data2 = await res2.json();

		return {
			props: {
				data,
				section: 'blog',
				data2
			}
		};

	}
</script>

<script>
    export let data;
    export let section;
    export let lang = data.params.lang;
</script>

from [section] / [lang] / index.svelte,<br/>
this is: <br/>
<pre>{section}   /   {lang}<br/></pre>
<pre>[section]   /   [lang]<br/></pre>
<br/>
with:
<pre>[section]: {section}</pre>
<pre>[lang]: {lang}</pre>

prout blog