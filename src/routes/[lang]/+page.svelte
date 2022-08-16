<script>
	// import { formatToDateIso } from '$lib/dateIso';
	/** @type {import('./$types').PageData} */
    export let data;
		const data1 = data.data1;
    	const params = data1.params;
    	const lang = params.lang;
    const data2 = data.data2;
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
	const data3 = data.data3;
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

<!-- this is: <br/>
<pre>{lang}<br/></pre>
<pre>[lang]<br/></pre>
<br/>
with:
<pre>[lang]: {lang}</pre> -->

{@html body}