<script context="module">
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {
		const section = 'docs';
        const lang = page.params.lang;
        if ( !valid_langs.has(lang)) {
			console.log(`invalid parameter or lang: ${lang}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// ${page.path}
		// /docs/ja
		const url = `/docs/` + lang + `.json`;
		const res = await fetch(url);
		
		if (!res.ok)
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		
		const data = await res.json();
		
		// docs/route-tree.docs.ja.json
		const url2 = `/docs/route-tree.docs.` + lang  + `.json`;
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
				section: 'docs',
				data2
			}
		};

	}
</script>

<script>

    export let data;
    export let section = 'section';
    export let lang = data.params.lang;
	export let data2;
</script>

from [section] / [lang] / index.svelte,<br/>
this is: <br/>
<pre>{section}   /   {lang}<br/></pre>
<pre>[section]   /   [lang]<br/></pre>
<br/>
with:
<pre>[section]: {section}</pre>
<pre>[lang]: {lang}</pre>

<ol>
	{#each data2 as data2}
	<li>
		<a href="{data2['url']}" rel="bookmark">{data2['name']}</a>
	</li>
	{#if data2['children']}
		<ul>
			{#each data2['children'] as children}
			<li>
				<a href="{children['url']}" rel="bookmark">{children['name']}</a>
			</li>
			{#if children['children']}
			<ul>
				{#each children['children'] as children2}
				<li>
					<a href="{children2['url']}">{children2['name']}</a>
				</li>
				{#if children2['children']}
					<ul>
					{#each children2['children'] as children3}
						<li>
							<a href="{children3['url']}">{children3['name']}</a>
						</li>
					{/each}
					</ul>
				{/if}
				{/each}
			</ul>
			{/if}
			{/each}
		</ul>
	{/if}
	{/each}
</ol>