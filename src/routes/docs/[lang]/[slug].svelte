<script context='module'>
  import { existingUrlArray } from '$lib/existingUrlArray.js';
	
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch }) {

    const lang = page.params.lang;
    const slug = page.params.slug;

    if (!existingUrlArray.has(page.path)) {
      console.log(`invalid parameter lang: ${lang} or slug: ${slug}`);
      return {
        status: 404,
        error: 'Not found'
      };
    }
  
    // /${params.section}/${params.lang}/${params.slug}.json
    // /docs/ja/versailles.json
    const url1 = '/docs/' + lang + '/' + slug + '.json';
    const res = await fetch(url1);

    if (!res.ok) return {
      status: res.status,
      error: new Error(`Could not load ${url1}`)
    };

    const data = await res.json()

    // docs/vasari/vasari.json || static folder
    const url2 = '/docs/' + data.params.slug + '/' + data.params.slug + '.json';
    const res2 = await fetch(url2);

    if (!res2.ok) return {
      status: res2.status,
      error: new Error(`Could not load ${url2}`)
    }

    const data2 = await res2.json();

    // docs/vasari/vasari.ja.json
    const url3 = '/docs/' + data.params.slug + '/' + data.params.slug + '.' + data.params.lang + '.json';
    const res3 = await fetch(url3);

    if (!res3.ok) return {
      status: res3.status,
      error: new Error(`Could not load ${url3}`)
    }

    const data3 = await res3.json();

    // docs/breadcrumb.ja.json breadcrumb || no path, no pageNumber
    const url4 = '/docs/breadcrumb.' + data.params.lang + '.json';
    const res4 = await fetch(url4);

    if (!res4.ok) return {
      status: res4.status,
      error: new Error(`Could not load ${url4}`)
    }
    const data4 = await res4.json();

    return {
      fallthrough: true,
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
	  // no path;
    const lang = params.lang;
    // no pathLength
    //no pathLevelDepth
    const slug = params.slug;
	export let data2;
	let commonFrontmatter = data2.commonFrontmatter;
    const itemPage = commonFrontmatter.itemPage;
	const commonMetadata = commonFrontmatter.metadata;
		const imageFileName = commonMetadata.imageFileName;
      const imageUrl = '/' + slug + '/' + imageFileName;
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
    const url = '/docs/' + lang + '/' + slug; // no path
	const metadata = frontmatter.metadata;
		const description = metadata.description; const descriptionLength = description.length;
    const keywords = metadata.keywords;
    const imageTitle = metadata.imageTitle;
    const imageLegend = metadata.imageLegend; const imageLegendLength = imageLegend.length;
    const significantLinks = frontmatter.significantLinks;
    const specialty = frontmatter.specialty;
    const body = data3.articleBody; let bodyLength = body.length;

  export let data4;
  // titles
  const rootTitle = data4.rootTitle;
  const sectionTitle = data4.docsTitle;
  const pathLevelOneTitle = menu;
  // urls
  const rootUrl = '/' + lang;
  const sectionUrl = '/docs/' + lang;
  const pathLevelOneUrl = '/docs/' + lang + '/' + slug;

  let BreadcrumbTypePageArray = ['ContactPage', 'CollectionPage', 'CollectionPage']
  const breadcrumbArray = [ {name: rootTitle, url: rootUrl}, {name: sectionTitle, url: sectionUrl}, {name: pathLevelOneTitle, url: pathLevelOneUrl} ];

  const breadcrumbSchemaStartString = `<script type="application/ld+json">{ "@context": "http://schema.org", "@type": "BreadcrumbList", "itemListElement": [ `;
  let breadcrumbSchemaIterationString = '';
  for (let i = 0 ; i <= 2; i++) {
    breadcrumbSchemaIterationString += `{ "@type": "ListItem", "position": ` + Number(i+1) + ` , "item": { "@id": "` + breadcrumbArray[i]["url"] + `", "@type": "` + BreadcrumbTypePageArray[i] + `", "name": "` + breadcrumbArray[i]["name"] + `"} }, `
    // if last iteration
    if (i === 2) {
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
    let langUrlLink = '/docs/' + i + '/' + slug;
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

  // no itemPageSchema
</script>

<svelte:head>
  <title>{title} | francois-vidit.com</title>
	<meta name="keywords" content="{keywords}" />

	<meta name="description" content="{description}" property="og:description" />
	<meta property="og:title" content="{title}" />
	<meta property="og:site_name" content="francois-vidit.com" />
	<meta property="og:url" content="/docs/{lang}/{slug}" />

	<meta name="image" content="/{slug}/{imageFileName}" property="og:image" /> 
	<meta content="{imageWidth}" property="og:image:width" /> 
	<meta content="{imageHeight}" property="og:image:height" /> 
	<meta content="{imageTitle}" property="og:image:title" />
	<meta content="{imageLegend}" property="og:image:alt" /> 
	<meta content="image/jpeg" property="og:image:type" />

	<meta content="{twitterCard}" property="twitter:card" />
	<meta content="@bf7afa37fa94ja" property="twitter:site:id" />

    <meta name="google" content="notranslate" />

    {@html langUrlArrayString}
    <!-- no itemPageSchema -->
    {@html breadcrumbSchema}
</svelte:head>

from docs / [lang] / [slug].svelte,<br/>
this is: <br/>
<pre>docs   /   {lang}    /   {slug}<br/></pre>
<pre>docs   /   [lang]    /   [slug]<br/></pre>
<br/>
with params
<pre>docs: docs<br/>[lang]: {lang}<br/>[slug]: {slug}</pre>

with commonFrontmatter:
<pre>[itemPage]: {itemPage}<br/>[imageFileName]: {imageFileName} [imageWidth]: {imageWidth} [imageHeight]: {imageHeight} [imageType]: {imageType}<br/>[twitterCard]: {twitterCard}<br/>[sitemapChangefreq]: {sitemapChangefreq}<br/>[sitemapPriority]: {sitemapPriority}</pre>

with frontmatter:
<pre>[title]: {title}<br/>[length]: {titleLength}<br/>[menu]: {menu}</pre>
<pre>[created]: {created}<br/>[date]: {date}<br/>[modified]: {modified}</pre>
<pre>[description]: {description}<br/>[length]: {descriptionLength}<br/>[keywords]: {keywords}</pre>
<pre>[imageTitle]: {imageTitle}<br/>[imageLegend]: {imageLegend}<br/>[imageLegendLength]: {imageLegendLength}</pre>
<pre>[significantLinks]: {significantLinks}<br/>[specialty]: {specialty}</pre>

and articleBody:
<pre>[html body]: see below [bodyLength]: {bodyLength}</pre>

<nav aria-label="breadcrumb">
  <ul class="breadcrumb">
    {#each breadcrumbArray as { name, url }, i}
      {#if i <= 2}
        <li><a href={url}>{name}</a></li>
      {/if}
    {/each}
  </ul>
</nav>

{@html body}

<style>
	:global(.conversation) {
    margin-block-end: 1em;
    margin-block-start: 1em;
    margin-inline-end: 16px;
    margin-inline-start: 16px;
  }

  :global(.conversation:last-child) {
    margin-block-end: 1em;
  }

  :global(ol.doc li[value]::marker) {
    display: list-item;
  }

  :global(ol.doc li[value]) {
    list-style-type:decimal;
  }

  :global(ol.doc li) {
    list-style-type:none;
  }

  :global(ol.doc li p, ol.doc li p.conversation) {
    margin-block-start: 0px;
    margin-block-end: 0px;
  }

  :global(ol.doc-special li::marker) {
    content: none;
  }
  
  :global(ol.doc-special li[data-id]::marker) {
    content: attr(data-id) ". ";
  }

  :global(ol.doc-three-rows) {
    padding-inline-start: 0px;
  }

  :global(ol.doc-three-rows li) {
    margin-top: 1em;
    margin-block-end: 1em;
    margin-block-start: 1em;
    margin-inline-start: 163px;
  }

  :global(ol.doc-three-rows li[data-id]::before) {
    content: attr(data-id) ". ";
    position: absolute;
    left: 1em;
    padding-top: 2px;
    padding-bottom: 2px;
  }

  :global(ol.doc-three-rows li[data-name]::marker) {
    content: attr(data-name);
    width: 100px;
    font-variant-numeric: normal;
  }

  :global(ol.doc-three-rows li::marker) {
    content: none;
  }

  :global(ol.year li p:first-child) {
    text-indent: -44px;
    margin-top: 1em;
    margin-block-end: 1em;
    margin-block-start: 1em;
  }

  :global(ol.year li) {
    list-style-type: none;
  }

  :global(span.year-width) {
    width: 44px;
  }

  :global(.puce) {
    display: list-item;
    list-style-type: disc;
    margin-top: 1em;
    margin-block-end: 1em;
    margin-block-start: 1em;
    margin-inline-start: 40px;   
  }

  :global(p.puce::marker) {
    display: list-item;
  }

  :global(p.puce:last-child) {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-block-end: 1em;
  }

  :global(p.puce:first-child) {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-block-end: 1em;
  }

  :global(.no-puce) {
    margin-top: 1em;
    margin-block-end: 1em;
    margin-block-start: 1em;
    margin-inline-start: 40px;
  }

  :global(p.no-puce:last-child) {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-block-end: 1em;
  }

  :global(p.no-puce:first-child) {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-block-end: 1em;
  }
  
  :global(p.single-li) {
    display: list-item;
    list-style-type: none;
    margin-top: 1em;
    margin-block-end: 1em;
    margin-block-start: 0px;
    margin-inline-start: 40px;
  }
  
  :global(p.single-li::marker) {
    content: attr(data-id) ". "
  }


  :global(h4.note) {
    display: list-item;
    counter-increment: h4;
    margin-top: 1em;
    margin-block-end: 0em;
    margin-block-start: 0em;
    margin-inline-start: 30px;
    padding-inline-start: 10px;

  }

  :global(h4::marker) {
    display: list-item;
    content: counter(h4);
  }

  :global(h3) {
    counter-reset: h4;
  }

  :global(address) {
    display: inline;
  }

  :global(.top-space) {
    margin-top: 1em;
  }

  :global(ul.breadcrumb, ul.pagination) {
    list-style: none;
  }

  :global(ul.breadcrumb li, ul.pagination li) {
    display: inline;
  }

  :global(ul.breadcrumb li+li:before) {
    content: ">";
    padding: 10px; 
  }

  :global(ul.pagination li) {
    text-align: center;
    padding: 4px 5px;
  }

  :global(ul.pagination li+li:before) {
    content: " ";
  }

  :global(ul.pagination li a) {
    border: 1px solid #444;
    padding: 10px;
  }
</style>