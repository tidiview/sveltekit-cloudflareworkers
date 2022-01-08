<script context='module'>
    const valid_sections = new Set(['blog', 'docs', 'profile']);
    const valid_langs = new Set(['fr', 'ja', 'en']);
	const valid_path = new Set(['paris', 'paris/louvre', 'paris/louvre/la-joconde', 'paris/vendome', 'versailles', 'versailles/palais', 'versailles/jardins', 'versailles/trianon', 'versailles/marly', 'reims', 'chateaux-de-la-loire', 'chateaux-de-la-loire/chenonceau', 'chateaux-de-la-loire/cheverny', 'mont-saint-michel', 'mont-saint-michel/arch-michel', 'bruges', 'bruges/hopital-saint-jean']);
	const valid_slug = new Set(['louvre', 'la-joconde', 'vasari', 'gautier', 'vendome', 'place', 'palais', 'hercule', 'jardins', 'latone', 'phaeton', 'trianon', 'arachnee', 'tiresias', 'iris', 'flore', 'marly', 'pierre-denis-martin', 'remes', 'saint-remi', 'chenonceau', 'diane', 'cheverny', 'adonis', 'perseus', 'arch-michel', 'nom', 'apocalypse', 'autre-docs', 'legende-doree', 'hopital-saint-jean', 'saint-jean', 'sainte-ursule', 'martin']);
	
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		
        const section = page.params.section;
        const lang = page.params.lang;
		const path = page.params.path;
        const slug = page.params.slug;
        if (!valid_langs.has(lang) || !valid_sections.has(section) || !valid_path.has(path) || !valid_slug.has(slug)) {
			console.log(`invalid parameter: or section: ${section} or lang: ${lang} or path: ${path} or slug: ${slug}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// /api/${params.section}/${params.lang}/${params.path}/${params.slug}
		// docs/ja/paris/louvre/la-joconde/vasari
		const url = `/api${page.path}`;
		const res = await fetch(url);
		const data = await res.json()

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
    export let path = data.params.path;
    export let slug = data.params.slug;
	console.log(data);
</script>

from [section] / [lang] / [...path] / [slug].svelte,<br/>
this is: <br/>
<pre>{section}   /   {lang}    {#if path}/   {path}   {/if}/   {slug}<br/></pre>
<pre>[section]   /   [lang]    {#if path}/   [...path]   {/if}/   [slug]<br/></pre>
<br/>
with:
<pre>[section]: {section}</pre>
<pre>[lang]: {lang}</pre>
{#if path}<pre>[...path]: {path}</pre>{/if}
<pre>[slug]: {slug}</pre>