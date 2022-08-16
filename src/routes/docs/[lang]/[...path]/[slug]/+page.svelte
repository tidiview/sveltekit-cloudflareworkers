<script>
  import { formatToDateIso } from '$lib/dateIso';
  /** @type {import('./$types').PageData} */
  export let data;
  // console.log('data from page.svelte: ', JSON.stringify(data));
	const data1 = data.data1;
    const params = data1.params;
    const lang = params.lang;
    const path = params.path;
    const pathLevelDepth = path.split('/').length; // console.log(pathLevelDepth);
    const slug = params.slug;
	const data2 = data.data2;
	const commonFrontmatter = data2.commonFrontmatter;
    const totalPageNumber = commonFrontmatter.totalPageNumber;
    const itemPage = commonFrontmatter.itemPage;
	const commonMetadata = commonFrontmatter.metadata;
		const imageFileName = commonMetadata.imageFileName;
      const imageUrl = '/' + slug + '/' + imageFileName;
			const imageWidth = imageFileName.split('_')[1].split('x')[0];
			const imageHeight = imageFileName.split('_')[1].split('x')[1].split('.')[0];
			const imageType = imageFileName.split('.')[1];
    	const twitterCard = commonMetadata.twitterCard;
	const sitemap = commonFrontmatter.sitemap;
		const sitemapChangefreq = sitemap.changefreq;
		const sitemapPriority = sitemap.priority;
  const data3 = data.data3;
	const frontmatter = data3.frontmatter;
    let title = frontmatter.title;const titleLength = title.length;
    const menu = frontmatter.menu;
    const created = frontmatter.created;
    const date = frontmatter.date;
    const modified = frontmatter.modified;
    const url = '/docs/' + lang + '/' + path + '/' + slug;
	const metadata = frontmatter.metadata;
		const description = metadata.description;const descriptionLength = description.length;
    const keywords = metadata.keywords;
    const imageTitle = metadata.imageTitle;
    const imageLegend = metadata.imageLegend;const imageLegendLength = imageLegend.length;
    const significantLinks = frontmatter.significantLinks;
    const specialty = frontmatter.specialty;
    const body = data3.articleBody; let bodyLength = body.length;
  
  const pageNumber = data.pageNumber; // console.log(pageNumber, totalPageNumber)
    let pagination = [], paginationPreviousPageUrl, paginationNextPageUrl, prevNextUrlLink, wordNext, wordPrevious, urlWithQueryPageIfNecessary = url; // console.log(url, urlWithQueryPageIfNecessary)
    function createPagination(pageNumber, totalPageNumber, url) {
        if ( pageNumber == undefined ) {
          pagination = [0, 1, 2]; urlWithQueryPageIfNecessary = url; title = title;
        }
        else if ( Number(pageNumber) === Number(totalPageNumber) ) {
          pagination = [Number(totalPageNumber) - 1, Number(totalPageNumber), 0]; urlWithQueryPageIfNecessary = url + '?page=' + pageNumber; title = title + ' - ' + pageNumber;

        }
        else {
          pagination = [Number(pageNumber) - 1, Number(pageNumber), Number(pageNumber) + 1]; urlWithQueryPageIfNecessary = url + '?page=' + pageNumber; title = title + ' - ' + pageNumber;
        }
      paginationPreviousPageUrl = pagination[0] === 0 ? null : pagination[0] === 1 ? url : url + '?page=' + pagination[0];
      paginationNextPageUrl = pagination[2] === 0 ? null : url + '?page=' + pagination[2];
      wordNext = {fr: 'suivant', ja: '次', en: 'next'};
      wordPrevious = {fr: 'précédent', ja: '前', en: 'previous'};
      prevNextUrlLink = paginationPreviousPageUrl !== null && paginationNextPageUrl !== null ? '<link rel="prev" href="' + paginationPreviousPageUrl + '"><link rel="next" href="' + paginationNextPageUrl + '">' : paginationPreviousPageUrl === null ? '<link rel="next" href="' + paginationNextPageUrl + '">' : '<link rel="prev" href="' + paginationPreviousPageUrl + '">';
      return { pagination, paginationPreviousPageUrl, paginationNextPageUrl, prevNextUrlLink, wordNext, wordPrevious, urlWithQueryPageIfNecessary, title };
    };

    if ( totalPageNumber !== undefined ) {createPagination(pageNumber, totalPageNumber, url); };

  const data4 = data.data4;
  // titles
  const rootTitle = data4.rootTitle;
  const sectionTitle = data4.docsTitle;
  const pathLevelOneTitle = data4.pathLevelOneTitle[path.split('/')[0]];
  const pathLevelTwoTitle = pathLevelDepth === 1 ? menu : data4.pathLevelTwoTitle[path.split('/')[1]];
  const pathLevelThreeTitle = pathLevelDepth === 2 ? menu : data4.pathLevelThreeTitle[path.split('/')[2]];
  // urls
  const rootUrl = '/' + lang;
  const sectionUrl = '/docs/' + lang;
  const pathLevelOneUrl = sectionUrl + '/' + path.split('/')[0];
  const pathLevelTwoUrl = pathLevelDepth === 1 ? pathLevelOneUrl + '/' + slug : pathLevelOneUrl + '/' + path.split('/')[1];
  const pathLevelThreeUrl = pathLevelDepth === 2 ? pathLevelTwoUrl + '/' + slug : pathLevelTwoUrl + '/' + path.split('/')[2];
  
  let BreadcrumbTypePageArray = ['ContactPage']
  for(let i = 0; i <= pathLevelDepth; i++) { BreadcrumbTypePageArray.push('CollectionPage') };
  let BreadcrumbTypePageArrayLastOccurence = 'CollectionPage';
  if (itemPage === 'Article') {BreadcrumbTypePageArrayLastOccurence = 'ItemPage'};
  BreadcrumbTypePageArray.push(BreadcrumbTypePageArrayLastOccurence);

  const breadcrumbArray = [ {url: rootUrl, name: rootTitle}, {url: sectionUrl, name: sectionTitle}, {url: pathLevelOneUrl, name: pathLevelOneTitle}, {url: pathLevelTwoUrl, name: pathLevelTwoTitle}, {url: pathLevelThreeUrl, name: pathLevelThreeTitle} ].slice(0, Number(pathLevelDepth + 3));
 
  // console.log(pageNumber, pagination, paginationPreviousPageUrl, paginationNextPageUrl, prevNextUrlLink, wordNext, wordPrevious, breadcrumbArray)

  const breadcrumbSchemaStartString = `<script type="application/ld+json">{ "@context": "http://schema.org", "@type": "BreadcrumbList", "itemListElement": [ `;
  let breadcrumbSchemaIterationString = '';
  for (let i = 0 ; i <= breadcrumbArray.length - 1; i++) {
    breadcrumbSchemaIterationString += `{ "@type": "ListItem", "position": ` + Number(i+1) + ` , "item": { "@id": "` + breadcrumbArray[i]["url"] + `", "@type": "` + BreadcrumbTypePageArray[i] + `", "name": "` + breadcrumbArray[i]["name"] + `"} }, `
    // if last iteration
    if (i === breadcrumbArray.length - 1) {
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
    let langUrlLink = pageNumber ? '/docs/' + i + '/' + path + '/' + slug +  '?page=' + pageNumber : '/docs/' + i + '/' + path + '/' + slug;
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
  }; // console.log(langUrlArrayString)
  let itemPageSchema;
    if( itemPage === 'Article') {
      itemPageSchema = `<script type="application/ld+json">` + JSON.stringify({ "@context": "http://schema.org", "@type": itemPage, "url": urlWithQueryPageIfNecessary, "description": description, "relatedLink": langUrlArrayRelated, "significantLink": significantLinks, "specialty": specialty, "datePublished": formatToDateIso(date), "dateModified": formatToDateIso(modified), "mainEntityOfPage": { "@type": "ItemPage", "url": urlWithQueryPageIfNecessary }, "headline": title, "author": { "@type": "Person", "name": "François VIDIT", "url": "/profile/" + lang }, "image": {	"@type": "ImageObject", "url": imageUrl, "name": imageFileName,	"width": imageWidth,	"height": imageHeight }, 	"publisher": { "@type": "Organization", "name": "francois-vidit.com", "logo": { "@type": "ImageObject", "url": "/francois-vidit-com_600x60.png"}}}) + `<\/script>`;
    };
</script>

<svelte:head>
  <title>{title} | francois-vidit.com</title>
	<meta name="keywords" content="{keywords}" />

	<meta name="description" content="{description}" property="og:description" />
	<meta property="og:title" content="{title}" />
	<meta property="og:site_name" content="francois-vidit.com" />
	<meta property="og:url" content="{url}" />
	{#if itemPageSchema} <meta property="og:type" content="article" /> {/if}

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
  {#if totalPageNumber} {@html prevNextUrlLink} {/if}
  {#if itemPageSchema} {@html itemPageSchema} {/if}
  {@html breadcrumbSchema}
</svelte:head>



<!-- from docs / [lang] / [...path] / [slug].svelte,<br/>
this is: <br/>
<pre>'docs'   /   {lang}    {#if path}/   {path}   {/if}/   {slug}<br/>
docs   /   [lang]    {#if path}/   [...path]   {/if}/   [slug]</pre>
<br/>

with params
<pre>'docs': 'docs'<br/>[lang]: {lang}<br/>{#if path}[...path]: {path}<br/>{/if}[slug]: {slug}</pre>

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
    {#each breadcrumbArray as { url, name }, i}
      {#if i < pathLevelDepth + 2}
        <li><a href={url}>{name}</a></li>
      {/if}
    {/each}
  </ul>
  <ul aria-label="lang">
    {#each otherLangNameAndUrlArray as { url, name } }
        <li><a href={url}>{name}</a></li>
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