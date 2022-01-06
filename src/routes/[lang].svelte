<script context="module">
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
        const lang = page.params.lang === 'fr' ? 'fr' : page.params.lang === 'ja' ? 'ja' : page.params.lang === 'en' ? 'en' : null;
        
		console.log(page.params.lang, lang)

        if (!valid_langs.has(lang)) {
			console.log(`invalid lang parameter ${lang}`);
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
    export let lang = data.params.lang;
	console.log(data);
</script>

this is: <br/>
<pre>{lang}<br/></pre>
<pre>[lang]<br/></pre>
<br/>
with:
<pre>[lang]: {lang}</pre>