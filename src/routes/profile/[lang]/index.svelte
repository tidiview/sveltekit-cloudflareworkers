<script context="module">
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {

        const lang = page.params.lang;

        if (!valid_langs.has(lang)) {
			console.log(`invalid parameter lang: ${lang}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// /profile/${lang}
		// /profile/ja
		const url1 = `/profile/` + lang + `.json`;
		const res = await fetch(url1);
		
		if (!res.ok)
			return {
				status: res.status,
				error: new Error(`Could not load ${url1}`)
			};

		const data = await res.json();
		
		// /profile/home.json
		const url2 = '/profile/home.json';
		const res2 = await fetch(url2);

		if (!res2.ok)
			return {
				status: res2.status,
				error: new Error(`Could not load ${url2}`)
			}

		const data2 = await res2.json();

		// /profile/home.ja.json
		const url3 = `/profile/home.` + data.params.lang  + `.json`;
		const res3 = await fetch(url3);

		if (!res3.ok)
			return {
				status: res3.status,
				error: new Error(`Could not load ${url3}`)
			}

		const data3 = await res3.json();

		// /profile/breadcrumb.ja.json breadcrumb || no path, no pageNumber
		const url4 = '/profile/breadcrumb.' + data.params.lang + '.json';
		const res4 = await fetch(url4);

		if (!res4.ok) return {
			status: res4.status,
			error: new Error(`Could not load ${url4}`)
		}
		const data4 = await res4.json();

		return {
			props: {
				data,
				data2,
				data3,
				data4
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
		const url = '/profile/' + lang; // no path, no slug
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
	const sectionTitle = data4.profileTitle;
	// urls
	const rootUrl = '/' + lang;
	const sectionUrl = '/profile/' + lang;

	let BreadcrumbTypePageArray = ['ContactPage', 'ProfilePage']
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
  	const otherLangNameAndUrlArray = [];
  	const languageNameObject = {fr: {ja: 'japonais', en: 'anglais'}, ja: {fr: 'フランス語', en: '英語'}, en: {fr: 'french', ja: 'japanese'} };
	for (let i of ['fr', 'ja', 'en']) {
		let langUrlPrefix = '<link rel="';
		let langUrlMiddle = '" href="';
		let langUrlLink = '/profile/' + i;
		let langUrlHreflang = '" hreflang="' + i + '" />';
		const langUrlAlternate = langUrlPrefix + 'alternate' + langUrlMiddle + langUrlLink + langUrlHreflang;
		if ( lang === i) {
		let langUrlCanonical = langUrlPrefix + 'canonical' + langUrlMiddle + langUrlLink + langUrlHreflang;
		langUrlArrayString = langUrlArrayString + langUrlCanonical;
		}
		else {
		langUrlArrayRelated.push(langUrlLink);
      	otherLangNameAndUrlArray.push({ url: langUrlLink, name: languageNameObject[lang][i] });
		};
		langUrlArrayString = langUrlArrayString + langUrlAlternate;
	}
	// no itemPageSchema
</script>

<svelte:head>
  <title>{title} | francois-vidit.com</title>
	<meta name="keywords" content="{keywords}" />

	<meta name="description" content="{description}" property="og:description" />
	<meta property="og:title" content="{title}" />
	<meta property="og:site_name" content="francois-vidit.com" />
	<meta property="og:url" content="/profile/{lang}" />

	<meta name="image" content="{imageUrl}" property="og:image" /> 
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

from [section] / [lang] / index.svelte,<br/>
this is: <br/>
<pre>section   /   {lang}<br/></pre>
<pre>section   /   [lang]<br/></pre>
<br/>
with:
<pre>section: section</pre>
<pre>[lang]: {lang}</pre>

<nav aria-label="breadcrumb">
	<ul aria-label="lang">
	  {#each otherLangNameAndUrlArray as { url, name } }
		  <li><a href={url}>{name}</a></li>
	  {/each}
	</ul>
  </nav>

{@html body}