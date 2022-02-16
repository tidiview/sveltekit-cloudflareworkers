<script context="module">
    const valid_sections = new Set(['blog', 'docs', 'profile']);
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
        const section = 'profile';
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
		const url = `/profile/` + lang + `.json`;
		const res = await fetch(url);
		
		if (!res.ok)
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};

		const data = await res.json();

		// profile/home.ja.json
		const url2 = `/profile/home.` + lang  + `.json`;
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
				section: 'profile',
				data2
			}
		};

	}
</script>

<script>

    export let data;
    export let section = data.params.section;
    export let lang = data.params.lang;
	export let data2;
		let articleBody = data2.articleBody;
	console.log(data2)
</script>

from [section] / [lang] / index.svelte,<br/>
this is: <br/>
<pre>{section}   /   {lang}<br/></pre>
<pre>[section]   /   [lang]<br/></pre>
<br/>
with:
<pre>[section]: {section}</pre>
<pre>[lang]: {lang}</pre>

{@html articleBody}