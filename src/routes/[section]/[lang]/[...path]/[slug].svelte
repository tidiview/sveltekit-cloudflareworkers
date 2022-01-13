<script context='module'>
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;

    const valid_sections = new Set(['docs']);
    const valid_langs = new Set(['fr', 'ja', 'en']);
	const valid_path = new Set(['paris', 'paris/louvre', 'paris/louvre/la-joconde', 'paris/place-vendome', 'versailles', 'versailles/palais', 'versailles/jardins', 'versailles/trianon', 'versailles/marly', 'reims', 'chateaux-de-la-loire', 'chateaux-de-la-loire/chenonceau', 'chateaux-de-la-loire/cheverny', 'mont-saint-michel', 'mont-saint-michel/arch-michel', 'bruges', 'bruges/hopital-saint-jean']);
	const valid_slug = new Set(['louvre', 'la-joconde', 'vasari', 'gautier', 'place-vendome', 'palais', 'hercule', 'jardins', 'latone', 'phaeton', 'trianon', 'arachnee', 'tiresias', 'iris', 'flore', 'marly', 'pierre-denis-martin', 'remes', 'saint-remi', 'chenonceau', 'diane', 'cheverny', 'adonis', 'perseus', 'arch-michel', 'nom', 'apocalypse', 'autre-docs', 'legende-doree', 'hopital-saint-jean', 'saint-jean', 'sainte-ursule', 'martin']);
	
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
		
		// /${params.section}/${params.lang}/${params.path}/${params.slug}.json
		// docs/ja/paris/louvre/la-joconde/vasari
		const url = `${page.path}.json`;
		const res = await fetch(url);

		if (!res.ok)
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};

		const data = await res.json()
		// docs/vasari.json
		const url2 = `/` + data.params.section + `/` + data.params.slug + `/` + data.params.slug + `.json`;
		const res2 = await fetch(url2);

		if (!res2.ok)
			return {
				status: res2.status,
				error: new Error(`Could not load ${url2}`)
			}

		const data2 = await res2.json();
		// docs/vasari.ja.json
		const url3 = `/` + data.params.section + `/` + data.params.slug + `/` + data.params.slug + `.` + data.params.lang + `.json`;
		const res3 = await fetch(url3);

		if (!res3.ok)
		return {
			status: res3.status,
			error: new Error(`Could not load ${url3}`)
		}

		const data3 = await res3.json();
		return {
			fallthrough: true,
			props: {
				data,
				data2,
				data3
			}
		};
	}
</script>

<script>
	export let data;
    let params = data.params;
	let section = params.section;
    let lang = params.lang;
    let path = params.path;
    let slug = params.slug;
	export let data2;
	let commonFrontmatter = data2.commonFrontmatter;
    let itemPage = commonFrontmatter.itemPage;
	let commonMetadata = commonFrontmatter.metadata;
		let imageFileName = commonMetadata.imageFileName;
			let imageWidth = Number(imageFileName.split('_')[1].split('x')[0]);
			let imageHeight = Number(imageFileName.split('_')[1].split('x')[1].split('.')[0]);
			let imageType = imageFileName.split('.')[1];
    	let twitterCard = commonMetadata.twitterCard;
	let sitemap = commonFrontmatter.sitemap;
		let sitemapChangefreq = sitemap.changefreq;
		let sitemapPriority = sitemap.priority;
    export let data3;
	let frontmatter = data3.frontmatter
    let title = frontmatter.title;let titleLength = title.length;
    let menu = frontmatter.menu;
    let created = frontmatter.created;
    let date = frontmatter.date;
    let modified = frontmatter.modified;
	let metadata = frontmatter.metadata;
		let description = metadata.description;let descriptionLength = description.length;
    	let keywords = metadata.keywords;
    	let imageTitle = metadata.imageTitle;
    	let imageLegend = metadata.imageLegend;let imageLegendLength = imageLegend.length;
    let significantLinks = frontmatter.significantLinks;
    let specialty = frontmatter.specialty;
    let body = data3.articleBody; let bodyLength = body.length;
	let body2 = data3.articleBody2; let body2Length; if (body2) {body2Length = body2.length};
	let body3 = data3.articleBody3; let body3Length; if (body3) {body3Length =  body3.length};
	let body4 = data3.articleBody4; let body4Length; if (body4) {body4Length = body4.length};
	console.log(data, data2, data3);
</script>

<svelte:head>
	<meta name="keywords" content="{keywords}" />

	<meta name="description" content="{description}" property="og:description" />
	<meta property="og:title" content="{title}" />
	<meta property="og:site_name" content="francois-vidit.com" />
	<meta property="og:url" content="/{section}/{lang}/{path}/{slug}" />
	<meta property="og:type" content="article" />

	<meta name="image" content="https://francois-vidit.com/{section}/{lang}/{path}/{slug}/{imageFileName}" property="og:image" /> 
	<meta content="{imageWidth}" property="og:image:width" /> 
	<meta content="{imageHeight}" property="og:image:height" /> 
	<meta content="{imageTitle}" property="og:image:title" />
	<meta content="{imageLegend}" property="og:image:alt" /> 
	<meta content="image/jpeg" property="og:image:type" />

	<meta content="{twitterCard}" property="twitter:card" />
	<meta content="@bf7afa37fa94ja" property="twitter:site:id" />

    <meta name="google" content="notranslate" />

    <link rel="preload" as="image" href="https://francois-vidit.com/{path}/{lang}/{path}/{slug}/{imageFileName}" crossorigin>

	{#each ['fr', 'ja', 'en'] as i}
		{#if lang === i}
		<link rel="canonical" href="https://francois-vidit.com/{section}/{i}/{path}/{slug}" hreflang="{i}" />
		{/if}
		<link rel="alternate" href="https://francois-vidit.com/{section}/{i}/{path}/{slug}" hreflang="{i}" />
    {/each}
</svelte:head>

from [section] / [lang] / [...path] / [slug].svelte,<br/>

this is: <br/>
<pre>{section}   /   {lang}    {#if path}/   {path}   {/if}/   {slug}<br/>
[section]   /   [lang]    {#if path}/   [...path]   {/if}/   [slug]</pre>
<br/>

with params
<pre>[section]: {section}<br/>[lang]: {lang}<br/>{#if path}[...path]: {path}<br/>{/if}[slug]: {slug}</pre>

with commonFrontmatter:
<pre>[itemPage]: {itemPage}<br/>[imageFileName]: {imageFileName} [imageWidth]: {imageWidth} [imageHeight]: {imageHeight} [imageType]: {imageType}<br/>[twitterCard]: {twitterCard}<br/>[sitemapChangefreq]: {sitemapChangefreq}<br/>[sitemapPriority]: {sitemapPriority}</pre>

with frontmatter:
<pre>[title]: {title}<br/>[length]: {titleLength}<br/>[menu]: {menu}</pre>
<pre>[created]: {created}<br/>[date]: {date}<br/>[modified]: {modified}</pre>
<pre>[description]: {description}<br/>[length]: {descriptionLength}<br/>[keywords]: {keywords}</pre>
<pre>[imageTitle]: {imageTitle}<br/>[imageLegend]: {imageLegend}<br/>[imageLegendLength]: {imageLegendLength}</pre>
<pre>[significantLinks]: {significantLinks}<br/>[specialty]: {specialty}</pre>

and articleBody:
<pre>[html body]: see below [bodyLength]: {bodyLength}{#if body2} [2]: {body2Length}{/if}{#if body3} [3]: {body3Length}{/if}{#if body4} [4]: {body4Length}{/if}</pre>
{@html body + body2 + body3 + body4}