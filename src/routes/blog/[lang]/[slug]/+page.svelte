<script>
  import { formatToDateIso } from '$lib/dateIso';
  /** @type {import('./$types').PageData} */
	export let data;
    const params = data.params;
    const lang = params.lang;
    const path = params.path;
    const pathLevelDepth = path == undefined ? 0 : path.split('/').length;
    const slug = params.slug;
	export let data2;
	let commonFrontmatter = data2.commonFrontmatter;
    const totalPageNumber = commonFrontmatter.totalPageNumber;
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
    const title = frontmatter.title;const titleLength = title.length;
    const menu = frontmatter.menu;
    const created = frontmatter.created;
    const date = frontmatter.date;
    const modified = frontmatter.modified;
    const url = '/blog/' + lang + '/' + slug;
	const metadata = frontmatter.metadata;
		const description = metadata.description;const descriptionLength = description.length;
    const keywords = metadata.keywords;
    const imageTitle = metadata.imageTitle;
    const imageLegend = metadata.imageLegend;const imageLegendLength = imageLegend.length;
    const significantLinks = frontmatter.significantLinks;
    const specialty = frontmatter.specialty;
    const body = data3.articleBody; let bodyLength = body.length;
  
 export let pageNumber; // console.log(pageNumber)
    let pagination = [];
    if ( totalPageNumber !== undefined ) {
      if ( pageNumber == undefined ) {
        pagination = [0, 1, 2];
      }
      else if ( Number(pageNumber) === Number(totalPageNumber) ) {
        pagination = [Number(totalPageNumber) - 1, Number(totalPageNumber), 0];

      }
      else {
        pagination = [Number(pageNumber) - 1, Number(pageNumber), Number(pageNumber) + 1]
      }
    };
    const paginationPreviousPageUrl = pagination[0] === 0 ? null : pagination[0] === 1 ? url : url + '?page=' + pagination[0];
    const paginationNextPageUrl = pagination[2] === 0 ? null : url + '?page=' + pagination[2];
    const wordNext = {fr: 'suivant', ja: '次', en: 'next'};
    const wordPrevious = {fr: 'précédent', ja: '前', en: 'previous'};
    const prevNextUrlLink = paginationPreviousPageUrl !== null && paginationNextPageUrl !== null ? '<link rel="prev" href="' + paginationPreviousPageUrl + '"><link rel="next" href="' + paginationNextPageUrl + '">' : paginationPreviousPageUrl === null ? '<link rel="next" href="' + paginationNextPageUrl + '">' : '<link rel="prev" href="' + paginationPreviousPageUrl + '">';

  export let data4;
  let rootTitle = data4.rootTitle;
  let rootUrl = '/' + lang;
  let sectionTitle = data4.docsTitle;
  let sectionUrl = '/blog/' + lang;
  let pathLevelOneTitle = data4.pathLevelOneTitle[slug];
  let pathLevelOneUrl = '/blog/' + lang + '/' + slug;
  const breadrumbArray = [ {name: rootTitle, url: rootUrl}, {name: sectionTitle, url: sectionUrl}, {name: pathLevelOneTitle, url: pathLevelOneUrl} ];

  let langUrlArrayString = '';
  const langUrlArrayRelated = [];
  for (let i of ['fr', 'ja', 'en']) {
    let langUrlPrefix = '<link rel="';
    let langUrlMiddle = '" href="';
    let langUrlLink = pageNumber ? path ? '/blog/' + i + '/' + path + '/' + slug +  '?page=' + pageNumber : '/blog/' + i + '/' + slug +  '?page=' + pageNumber : path ? '/blog/' + i + '/' + path + '/' + slug : '/blog/' + i + '/' + slug;
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
  const pageSchema = `<script type="application/ld+json">` + JSON.stringify([{ "@context": "http://schema.org", "@type": itemPage, "url": url, "description": description, "relatedLink": langUrlArrayRelated, "significantLink": significantLinks, "specialty": specialty, "datePublished": formatToDateIso(date), "dateModified": formatToDateIso(modified), "mainEntityOfPage": { "@type": "ItemPage", url }, "headline": title, "author": { "@type": "Person", "name": "François VIDIT", "url": "/profile/" + lang }, "image": {	"@type": "ImageObject", "url": imageUrl, "name": imageFileName,	"width": imageWidth,	"height": imageHeight }, 	"publisher": { "@type": "Organization", "name": "francois-vidit.com", "logo": { "@type": "ImageObject", "url": "/francois-vidit-com_600x60.png"}}}, { "@context": "http://schema.org", "@type": "BreadcrumbList", "itemListElement": [{		"@type": "ListItem", "position": 1, "item": { "@id": rootUrl, "@type": "CollectionPage", "name": rootTitle } }, { "@type": "ListItem", "position": 2, "item": { "@id": sectionUrl, "@type": "CollectionPage", "name": sectionTitle } }, { "@type": "ListItem", "position": 3, "item": {  "@id": pathLevelOneUrl, "@type": "CollectionPage", "name": pathLevelOneTitle }	}]}]) + `<\/script>`;
</script>

<svelte:head>
  <title>{title} | francois-vidit.com</title>
	<meta name="keywords" content="{keywords}" />

	<meta name="description" content="{description}" property="og:description" />
	<meta property="og:title" content="{title}" />
	<meta property="og:site_name" content="francois-vidit.com" />
	<meta property="og:url" content="/blog/{lang}/{slug}" />
	<meta property="og:type" content="article" />

	<meta name="image" content="/{slug}/{imageFileName}" property="og:image" /> 
	<meta content="{imageWidth}" property="og:image:width" /> 
	<meta content="{imageHeight}" property="og:image:height" /> 
	<meta content="{imageTitle}" property="og:image:title" />
	<meta content="{imageLegend}" property="og:image:alt" /> 
	<meta content="image/jpeg" property="og:image:type" />

	<meta content="{twitterCard}" property="twitter:card" />
	<meta content="@bf7afa37fa94ja" property="twitter:site:id" />

    <meta name="google" content="notranslate" />

	<!-- {#each ['fr', 'ja', 'en'] as i}
		{#if lang === i}
		<link rel="canonical" href="https://francois-vidit.com/{section}/{i}/{slug}" hreflang="{i}" />
		{/if}
		<link rel="alternate" href="https://francois-vidit.com/{section}/{i}/{slug}" hreflang="{i}" />
    {/each} -->

    {@html langUrlArrayString}
    {@html prevNextUrlLink}
</svelte:head>

<!-- from blog / [lang] / [slug].svelte,<br/>
this is: <br/>
<pre>blog   /   {lang}    /   {slug}<br/></pre>
<pre>section   /   [lang]    /   [slug]<br/></pre>
<br/>
with params
<pre>section: blog<br/>[lang]: {lang}<br/>[slug]: {slug}</pre>

with commonFrontmatter:
<pre>[itemPage]: {itemPage}<br/>[imageFileName]: {imageFileName} [imageWidth]: {imageWidth} [imageHeight]: {imageHeight} [imageType]: {imageType}<br/>[twitterCard]: {twitterCard}<br/>[sitemapChangefreq]: {sitemapChangefreq}<br/>[sitemapPriority]: {sitemapPriority}</pre>

with frontmatter:
<pre>[title]: {title}<br/>[length]: {titleLength}<br/>[menu]: {menu}</pre>
<pre>[created]: {created}<br/>[date]: {date}<br/>[modified]: {modified}</pre>
<pre>[description]: {description}<br/>[length]: {descriptionLength}<br/>[keywords]: {keywords}</pre>
<pre>[imageTitle]: {imageTitle}<br/>[imageLegend]: {imageLegend}<br/>[imageLegendLength]: {imageLegendLength}</pre>
<pre>[significantLinks]: {significantLinks}<br/>[specialty]: {specialty}</pre>

and articleBody:
<pre>[html body]: see below [bodyLength]: {bodyLength}</pre> -->

<nav aria-label="breadcrumb">
  <ul class="breadcrumb">
    {#each breadrumbArray as { name, url }, i}
      {#if i < pathLevelDepth + 2}
        <li><a href={url}>{name}</a></li>
      {/if}
    {/each}
  </ul>
</nav>

{#if totalPageNumber !== undefined }
  <nav aria-label="pagination">
    <ul class="pagination">
      {#if pagination[0] !== 0 }
      {#if pagination[0] >= 2 }
      <li><a href={url}>1</a></li>
      {#if pagination[0] >= 3 }<li>…</li>{/if}
      {/if}
      <li><a href={paginationPreviousPageUrl} rel="preload previous">&laquo; {wordPrevious[lang]}</a></li>
      <li><a href={paginationPreviousPageUrl}>{pagination[0]}</a></li>
      {/if}
      <li> {pagination[1]}</li>
      {#if pagination[2] !== 0 }
      <li><a href={paginationNextPageUrl} rel="preload next">{pagination[2]}</li>
        <li><a href={paginationNextPageUrl}>{wordNext[lang]} &raquo;</li>
      {#if pagination[2] <= totalPageNumber - 2}<li>…</li>{/if}
      {#if pagination[2] <= totalPageNumber - 1}<li><a href={url + '?page=' + totalPageNumber}>{totalPageNumber}</a></li>{/if}
    {/if}
    </ul>
  </nav>
{/if}

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