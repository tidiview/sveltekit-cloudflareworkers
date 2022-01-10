<script context="module">
    const valid_sections = new Set(['blog', 'docs', 'profile']);
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
        const section = page.params.section;
        const lang = page.params.lang;
        if (!valid_sections.has(section) || !valid_langs.has(lang)) {
			console.log(`invalid parameter section: ${section} or lang: ${lang}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// ${page.path}
		// /docs/ja
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
    export let section = data.params.section;
    export let lang = data.params.lang;
	console.log(data);
</script>

from [section] / [lang] / index.svelte,<br/>
this is: <br/>
<pre>{section}   /   {lang}<br/></pre>
<pre>[section]   /   [lang]<br/></pre>
<br/>
with:
<pre>[section]: {section}</pre>
<pre>[lang]: {lang}</pre>