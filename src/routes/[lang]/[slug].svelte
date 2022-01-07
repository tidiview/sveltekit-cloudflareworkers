<script context='module'>
    const valid_langs = new Set(['fr', 'ja', 'en']);
	const valid_slug = new Set(['c-u', 'crypto', 'form', 'error', 'organisation']);
	
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
        const lang = page.params.lang;
        const slug = page.params.slug;
        if (!valid_langs.has(lang) || !valid_slug.has(slug)) {
			console.log(`invalid parameter section: ${section} or lang: ${lang} or slug: ${slug}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// /api/${params.lang}/${params.slug}
		// /ja/c-u
		const url = `/api${page.path}`;
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
    export let lang = data.params.lang;
    export let slug = data.params.slug;
	console.log(data);
</script>

from [lang] / [slug].svelte,<br/>
this is: <br/>
<pre>{lang}    /   {slug}<br/></pre>
<pre>[lang]    /   [slug]<br/></pre>
<br/>
with:
<pre>[lang]: {lang}</pre>
<pre>[slug]: {slug}</pre>