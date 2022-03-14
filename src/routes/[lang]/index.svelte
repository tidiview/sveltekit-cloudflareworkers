<script context="module">
    const valid_langs = new Set(['fr', 'ja', 'en']);

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch }) {
        
		const lang = params.lang;
        
		/* if (!valid_langs.has(lang)) {
			console.log(`invalid lang parameter ${lang}`);
			return {
				status: 404,
				error: 'Not found'
			};
		} */
		
		// /${lang}.json
		// /ja.json
		const url1 = lang + '.json';
		const res1 = await fetch(url1);

		if (!res1.ok) return {
			status: res1.status,
			error: new Error(`Could not load ${url1}`)
		};

		const data = await res1.json();
		
		// /home.json
		const url2 = '/home.json';
		const res2 = await fetch(url2);

		if (!res2.ok)
			return {
				status: res2.status,
				error: new Error(`Could not load ${url2}`)
			}

		const data2 = await res2.json();

		// home.[lang].json
		// home.ja.json
		const url3 = '/home.' + data.params.lang + '.json';
		const res3 = await fetch(url3);

		if (!res3.ok) return {
			status: res3.status,
			error: new Error(`Could not load ${url3}`)
		}

		const data3 = await res3.json();
 
		return {
			props: {
				data,
				data2,
				data3
			}
		};

	}
</script>

<script>
	// import { formatToDateIso } from '$lib/dateIso';
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
			imageType === 'jpg' ? 'jpeg' : 'jpg';
    	const twitterCard = commonMetadata.twitterCard;
	const sitemap = commonFrontmatter.sitemap;
		// const sitemapChangefreq = sitemap.changefreq;
		// const sitemapPriority = sitemap.priority;
	export let data3;
		const frontmatter = data3.frontmatter;
		const title = frontmatter.title; // const titleLength = title.length;
		// const menu = frontmatter.menu;
		// const created = frontmatter.created;
		const date = frontmatter.date;
		// formatToDateIso(date);
		// const modified = frontmatter.modified;
		const url = '/' + lang; // no path, no slug
		const metadata = frontmatter.metadata;
			const description = metadata.description; // const descriptionLength = description.length;
		const keywords = metadata.keywords;
		const imageTitle = metadata.imageTitle;
		const imageLegend = metadata.imageLegend; // const imageLegendLength = imageLegend.length;
		// const significantLinks = frontmatter.significantLinks;
		// const specialty = frontmatter.specialty;
		const body = data3.articleBody;
	// titles
	const rootTitleLang = {fr: "Accueil", ja: "ホーム", en: "Home"}
	const rootTitle = rootTitleLang[lang];
	// urls
	const rootUrl = '/' + lang;

	const breadcrumbArray = [ {name: rootTitle, url: rootUrl} ];

	const breadcrumbSchema = '<script type="application/ld+json">{ "@context": "http://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1 , "item": { "@id": "' + breadcrumbArray[0]["url"] + '", "@type": "ContactPage", "name": "' + breadcrumbArray[0]["name"] + '"} }]} <\/script>';
	

	// hreflang links
	let langUrlArrayString = '';
	const langUrlArrayRelated = [];
	for (let i of ['fr', 'ja', 'en']) {
		let langUrlPrefix = '<link rel="';
		let langUrlMiddle = '" href="';
		let langUrlLink = '/' + i;
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
	}
</script>

<svelte:head>
  <title>{title} | francois-vidit.com</title>
	<meta name="keywords" content="{keywords}" />

	<meta name="description" content="{description}" property="og:description" />
	<meta property="og:title" content="{title}" />
	<meta property="og:site_name" content="francois-vidit.com" />
	<meta property="og:url" content="/{lang}" />

	<meta name="image" content="{imageUrl}" property="og:image" /> 
	<meta content="{imageWidth}" property="og:image:width" /> 
	<meta content="{imageHeight}" property="og:image:height" /> 
	<meta content="{imageTitle}" property="og:image:title" />
	<meta content="{imageLegend}" property="og:image:alt" /> 
	<meta content="image/{imageType}" property="og:image:type" />

	<meta content="{twitterCard}" property="twitter:card" />
	<meta content="@bf7afa37fa94ja" property="twitter:site:id" />

    <meta name="google" content="notranslate" />

    {@html langUrlArrayString}
    {@html breadcrumbSchema}
</svelte:head>

this is: <br/>
<pre>{lang}<br/></pre>
<pre>[lang]<br/></pre>
<br/>
with:
<pre>[lang]: {lang}</pre>

{@html body}