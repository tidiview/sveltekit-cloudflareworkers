<script context='module'>
    const valid_sections = new Set(['blog', 'docs']);
    const valid_langs = new Set(['fr', 'ja', 'en']);
	const valid_slug = new Set(['bokusi', 'robespierre', 'rousi', 'iohane', 'rimbaud', 'syusigaku', 'iehamotomoto', 'ihoujin', 'roiyarukakumei', 'onnadaigaku', 'psyche', 'la-marseillaise', 'kakumei', 'benalla', 'diotime', 'priscus', 'fontenelle', 'marivaux', 'phedre', 'paris', 'versailles', 'reims', 'chateaux-de-la-loire', 'mont-saint-michel', 'bruges']);
	
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
        const section = page.params.section;
        const lang = page.params.lang;
        const slug = page.params.slug;
        if (!valid_langs.has(lang) || !valid_sections.has(section) || !valid_slug.has(slug)) {
			console.log(`invalid parameter section: ${section} or lang: ${lang} or slug: ${slug}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// /api/${params.section}/${params.lang}/${params.slug}
		// /bloog/ja/rousi
		const url = `${page.path}.json`;
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
    export let slug = data.params.slug;
	console.log(data);
</script>

from [section] / [lang] / [slug].svelte,<br/>
this is: <br/>
<pre>{section}   /   {lang}    /   {slug}<br/></pre>
<pre>[section]   /   [lang]    /   [slug]<br/></pre>
<br/>
with:
<pre>[section]: {section}</pre>
<pre>[lang]: {lang}</pre>
<pre>[slug]: {slug}</pre>