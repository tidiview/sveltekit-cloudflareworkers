<script context="module">
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
        
		const lang = page.params.lang;
		var paramsString = page.query;
		var searchParams = new URLSearchParams(paramsString);
		const queryPage = searchParams.get('page');
		console.log(queryPage);
        
		if (!valid_langs.has(lang)) {
			console.log(`invalid lang parameter ${lang}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// /${params.lang}
		// /ja
		const url1 = `${lang}.json`;
		const res = await fetch(url1);
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
    export let lang = data.params.lang;
	console.log(data);
</script>

this is: <br/>
<pre>{lang}<br/></pre>
<pre>[lang]<br/></pre>
<br/>
with:
<pre>[lang]: {lang}</pre>