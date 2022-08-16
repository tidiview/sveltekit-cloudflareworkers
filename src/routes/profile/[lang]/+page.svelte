<script>
	/** @type {import('./$types').PageData} */
	import { formatToDateIso } from '$lib/dateIso';
    export let data;
	const data1 = data.data1
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
    	const twitterCard = commonMetadata.twitterCard;
	const sitemap = commonFrontmatter.sitemap;
		const sitemapChangefreq = sitemap.changefreq;
		const sitemapPriority = sitemap.priority;
	const data3 = data.data3;
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

	const data4 = data.data4;
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

<!-- from [section] / [lang] / index.svelte,<br/>
this is: <br/>
<pre>section   /   {lang}<br/></pre>
<pre>section   /   [lang]<br/></pre>
<br/>
with:
<pre>section: section</pre>
<pre>[lang]: {lang}</pre> -->

<nav aria-label="breadcrumb">
	<ul aria-label="lang">
	  {#each otherLangNameAndUrlArray as { url, name } }
		  <li><a href={url}>{name}</a></li>
	  {/each}
	</ul>
  </nav>

{@html body}