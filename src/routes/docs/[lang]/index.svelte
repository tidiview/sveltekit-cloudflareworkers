<script context="module">
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {

        const lang = params.lang;

        if ( !valid_langs.has(lang)) {
			console.log(`invalid parameter lang: ${lang}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// /docs/${lang}
		// /docs/ja
		const url1 = '/docs/' + lang + '.json';
		const res1 = await fetch(url1);
		
		if (!res1.ok) return {
			status: res1.status,
			error: new Error(`Could not load ${url1}`)
		};
		
		const data = await res1.json();
		
		// /docs/home.json
		const url2 = '/docs/home.json';
		const res2 = await fetch(url2);

		if (!res2.ok)
			return {
				status: res2.status,
				error: new Error(`Could not load ${url2}`)
			}

		const data2 = await res2.json();

		// /docs/home.ja.json
		const url3 = '/docs/home.' + data.params.lang + '.json';
		const res3 = await fetch(url3);

		if (!res3.ok) return {
			status: res3.status,
			error: new Error(`Could not load ${url3}`)
		}

		const data3 = await res3.json();

		// /docs/breadcrumb.ja.json breadcrumb || no path, no pageNumber
		const url4 = '/docs/breadcrumb.' + data.params.lang + '.json';
		const res4 = await fetch(url4);

		if (!res4.ok) return {
			status: res4.status,
			error: new Error(`Could not load ${url4}`)
		}
		const data4 = await res4.json();

		// .docs/route-tree.ja.json route-tree || no path, no pageNumber
		const url5 = '/docs/route-tree.docs.' + data.params.lang + '.json';
		const res5 = await fetch(url5);

		if (!res5.ok) return {
		status: res5.status,
		error: new Error(`Could not load ${url5}`)
		}
		const data5 = await res5.json();

		return {
			props: {
				data,
				data2,
				data3,
				data4,
				data5
			}
		};

	}
</script>

<script>
	import { formatToDateIso } from '$lib/dateIso';
    export let data;
    	const params = data.params;
    	const lang = params.lang;
	export let data2;
	let commonFrontmatter = data2.commonFrontmatter;
    // no itemPage
	const commonMetadata = commonFrontmatter.metadata;
		const imageFileName = commonMetadata.imageFileName;
      	const imageUrl = '/' + imageFileName;
			const imageWidth = Number(imageFileName.split('_')[1].split('x')[0]);
			const imageHeight = Number(imageFileName.split('_')[1].split('x')[1].split('.')[0]);
			const imageType = imageFileName.split('.')[1];
    	const twitterCard = commonMetadata.twitterCard;
	const sitemap = commonFrontmatter.sitemap;
		const sitemapChangefreq = sitemap.changefreq;
		const sitemapPriority = sitemap.priority;
	export let data3;
		const frontmatter = data3.frontmatter;
		const title = frontmatter.title; const titleLength = title.length;
		const menu = frontmatter.menu;
		const created = frontmatter.created;
		const date = frontmatter.date;
		formatToDateIso(date);
		const modified = frontmatter.modified;
		const url = '/docs/' + lang; // no path, no slug
		const metadata = frontmatter.metadata;
			const description = metadata.description; const descriptionLength = description.length;
		const keywords = metadata.keywords;
		const imageTitle = metadata.imageTitle;
		const imageLegend = metadata.imageLegend; const imageLegendLength = imageLegend.length;
		const significantLinks = frontmatter.significantLinks;
		const specialty = frontmatter.specialty;
		const body = data3.articleBody;

	export let data4;
	// titles
	const rootTitle = data4.rootTitle;
	const sectionTitle = data4.docsTitle;
	// urls
	const rootUrl = '/' + lang;
	const sectionUrl = '/docs/' + lang;

	let BreadcrumbTypePageArray = ['ContactPage', 'CollectionPage']
	const breadcrumbArray = [ {name: rootTitle, url: rootUrl}, {name: sectionTitle, url: sectionUrl} ];

	const breadcrumbSchemaStartString = `<script type="application/ld+json">{ "@context": "http://schema.org", "@type": "BreadcrumbList", "itemListElement": [ `;
	let breadcrumbSchemaIterationString = '';
	for (let i = 0 ; i <= 1; i++) {
		breadcrumbSchemaIterationString += `{ "@type": "ListItem", "position": ` + Number(i+1) + ` , "item": { "@id": "` + breadcrumbArray[i]["url"] + `", "@type": "` + BreadcrumbTypePageArray[i] + `", "name": "` + breadcrumbArray[i]["name"] + `"} }, `
		// if last iteration
		if (i === 1) {
		breadcrumbSchemaIterationString = breadcrumbSchemaIterationString.slice(0, -2);
		}
	};
	const breadcrumbSchemaEndString = `]} <\/script>`;
	const breadcrumbSchema = breadcrumbSchemaStartString + breadcrumbSchemaIterationString + breadcrumbSchemaEndString;

	// hreflang links
	let langUrlArrayString = '';
	const langUrlArrayRelated = [];
	for (let i of ['fr', 'ja', 'en']) {
		let langUrlPrefix = '<link rel="';
		let langUrlMiddle = '" href="';
		let langUrlLink = '/docs/' + i;
		let langUrlHreflang = '" hreflang="' + i + '" />';
		const langUrlAlternate = langUrlPrefix + 'alternate' + langUrlMiddle + langUrlLink + langUrlHreflang;
		if ( lang === i) {
		let langUrlCanonical = langUrlPrefix + 'canonical' + langUrlMiddle + langUrlLink + langUrlHreflang;
		langUrlArrayString = langUrlArrayString + langUrlCanonical;
		}
		else {
		langUrlArrayRelated.push(langUrlLink);
		};
		langUrlArrayString = langUrlArrayString + langUrlAlternate;
	};

	// no itemPageSchema
	export let data5;
</script>

<svelte:head>
  <title>{title} | francois-vidit.com</title>
	<meta name="keywords" content="{keywords}" />

	<meta name="description" content="{description}" property="og:description" />
	<meta property="og:title" content="{title}" />
	<meta property="og:site_name" content="francois-vidit.com" />
	<meta property="og:url" content="/docs/{lang}" />

	<meta name="image" content="/{imageFileName}" property="og:image" /> 
	<meta content="{imageWidth}" property="og:image:width" /> 
	<meta content="{imageHeight}" property="og:image:height" /> 
	<meta content="{imageTitle}" property="og:image:title" />
	<meta content="{imageLegend}" property="og:image:alt" /> 
	<meta content="image/jpeg" property="og:image:type" />

	<meta content="{twitterCard}" property="twitter:card" />
	<meta content="@bf7afa37fa94ja" property="twitter:site:id" />

    <meta name="google" content="notranslate" />

    {@html langUrlArrayString}
    {@html breadcrumbSchema}
</svelte:head>

<!-- from docs / [lang] / index.svelte,<br/>
this is: <br/>
<pre>docs   /   {lang}<br/></pre>
<pre>docs   /   [lang]<br/></pre>
<br/>
with:
<pre>docs: docs</pre>
<pre>[lang]: {lang}</pre> -->

<ol>
	{#each data5 as data5}
	<li>
		<a href="{data5['url']}" rel="bookmark">{data5['name']}</a>
	</li>
	{#if data5['children']}
		<ul>
			{#each data5['children'] as children}
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