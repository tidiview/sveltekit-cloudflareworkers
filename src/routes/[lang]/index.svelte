<script context="module">
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
        
		const lang = page.params.lang;
        
		if (!valid_langs.has(lang)) {
			console.log(`invalid lang parameter ${lang}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// /${params.lang}.json
		// /ja.json
		const url1 = `${lang}.json`;
		const res = await fetch(url1);

		if (!res.ok) {
			return {
			status: res.status,
			error: new Error(`Could not load ${url1}`)
			};
		}

		const data = await res.json();

		// home.[lang].json
		// home.ja.json
		const url2 = `/home.` + data.params.lang + `.json`;
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
				data2
			}
		};

	}
</script>

<script>
    export let data;
    export let lang = data.params.lang;
    export let data2;
    export let articleBody = data2.articleBody;
	console.log(articleBody)
</script>

this is: <br/>
<pre>{lang}<br/></pre>
<pre>[lang]<br/></pre>
<br/>
with:
<pre>[lang]: {lang}</pre>

{@html articleBody}