<script context="module">
    const valid_langs = new Set(['fr', 'ja', 'en']);
    const valid_sections = new Set(['blog', 'docs', 'profile']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
        const section = page.params.section === 'blog' ? 'blog' : page.params.section === 'docs' ? 'docs' :  page.params.section === 'profile' ? 'profile' : null;
        const lang = page.params.lang === 'fr' ? 'fr' : page.params.lang === 'ja' ? 'ja' : page.params.lang === 'en' ? 'en' : null;
        
		console.log(page.params.lang, lang, page.params.section, section, valid_sections)

        if (!valid_langs.has(lang) || !valid_sections.has(section)) {
			console.log(`invalid parameter lang: ${lang} or section: ${section}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// /api/${params.lang}
		// /ja
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
    export let section = data.params.section;
    export let lang = data.params.lang;
	console.log(data);
</script>

this is: <br/>
<pre>{section}   /   {lang}<br/></pre>
<pre>[section]   /   [lang]<br/></pre>
<br/>
with:
<pre>[section]: {section}</pre>
<pre>[lang]: {lang}</pre>