<script context='module'>
	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = false;

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
        var paramsString = page.query;
        var searchParams = new URLSearchParams(paramsString);
        const queryPage = searchParams.get('page');

        if (!valid_langs.has(lang) || !valid_sections.has(section) || !valid_path.has(path) || !valid_slug.has(slug)) {
			console.log(`invalid parameter: or section: ${section} or lang: ${lang} or path: ${path} or slug: ${slug}`);
			return {
				status: 404,
				error: 'Not found'
			};
		}
		
		// /section/lang/path/slug.json
		// docs/ja/paris/louvre/la-joconde/vasari.json
		const url1 = '/' + section + '/' + lang + '/'  + path + '/'  + slug + '.json';
		const res = await fetch(url1);

		if (!res.ok)
			return {
				status: res.status,
				error: new Error(`Could not load ${url1}`)
			};

		const data = await res.json()

		// docs/vasari.json
		const url2 = '/' + data.params.section + '/' + data.params.slug + '/' + data.params.slug + '.json';
		const res2 = await fetch(url2);

		if (!res2.ok)
			return {
				status: res2.status,
				error: new Error(`Could not load ${url2}`)
			}

		const data2 = await res2.json();

		// docs/vasari.ja.json or docs/vasari2.ja.json
		const url3 = queryPage ? '/' + data.params.section + '/' + data.params.slug + '/' + data.params.slug + queryPage + '.' + data.params.lang + '.json' : '/' + data.params.section + '/' + data.params.slug + '/' + data.params.slug + '.' + data.params.lang + '.json';
		const res3 = await fetch(url3);

		if (!res3.ok)
		return {
			status: res3.status,
			error: new Error(`Could not load ${url3}`)
		}

    const pageNumber = queryPage;
		const data3 = await res3.json();

		// docs/breadcrumb.ja.json breadcrumb
		const url4 = '/' + data.params.section + '/breadcrumb.' + data.params.lang + '.json';
		const res4 = await fetch(url4);

		if (!res4.ok)
		return {
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
        pageNumber,
        data4
			}
		};
	}
</script>

<script>
	export let data;
    const params = data.params;
	  const section = params.section;
    const lang = params.lang;
    const path = params.path;
    const pathLevelDepth = path.split('/').length;
    const slug = params.slug;
	export let data2;
	const commonFrontmatter = data2.commonFrontmatter;
    const totalPageNumber = Number(commonFrontmatter.totalPageNumber);
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
    function formatToDateIso(someDate) {
      const dateDay = String(someDate.split('-')[0]);
      const dateMonth = String(someDate.split('-')[1]);
      const dateYear = String(someDate.split('-')[2].split(',')[0]);
      const dateHour = String(someDate.split(':')[0].split(' ')[1]);
      const dateMinute = String(someDate.split(':')[1].split(',')[0]);
      const timezoneOffset = '+01:00';
      // String such as 2019-01-11T12:37:00+01:00
      const dateISO = dateYear + '-' + dateMonth + '-' + dateDay + 'T' + dateHour + ':' + dateMinute + ':00' + timezoneOffset;
      return dateISO;
    };    
    const modified = frontmatter.modified;
    const url = '/' + section  + '/' + lang + '/' + path + '/' + slug;
	const metadata = frontmatter.metadata;
		const description = metadata.description;const descriptionLength = description.length;
    	const keywords = metadata.keywords;
    	const imageTitle = metadata.imageTitle;
    	const imageLegend = metadata.imageLegend;const imageLegendLength = imageLegend.length;
    const significantLinks = frontmatter.significantLinks;
    const specialty = frontmatter.specialty;
    const body = data3.articleBody; let bodyLength = body.length;
  
  export let pageNumber;
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
    const paginationPreviousPageUrl = pagination[0] === 0 ? url : url + '?page=' + pagination[0]; console.log(paginationPreviousPageUrl);
    const paginationCurrentPageUrl = pagination[1] === 0 ? url : url + '?page=' + pagination[1]; console.log(paginationCurrentPageUrl);
    const paginationNextPageUrl = pagination[2] === 0 ? null : url + '?page=' + pagination[2]; console.log(paginationNextPageUrl);
    const wordNext = {fr: 'suivant', ja: '次', en: 'next'};
    const wordPrevious = {fr: 'précédent', ja: '前', en: 'previous'};
    
  export let data4;
  const rootTitle = data4.rootTitle;
  const rootUrl = '/' + lang;
  const sectionTitle = data4.docsTitle;
  const sectionUrl = '/docs/' + lang;
  const pathLevelOneTitle = data4.pathLevelOneTitle[path.split('/')[0]];
  const pathLevelOneUrl = '/' + section + '/' + lang + '/' + path.split('/')[0];
  const pathLevelTwoTitle = data4.pathLevelTwoTitle[path.split('/')[1]];
  const pathLevelTwoUrl = '/' + section + '/' + lang + '/' + path.split('/')[0] + '/' + path.split('/')[1];
  const pathLevelThreeTitle = data4.pathLevelThreeTitle[path.split('/')[2]];
  const pathLevelThreeUrl = '/' + section + '/' + lang + '/' + path.split('/');[0] + '/' + path.split('/')[1] + '/' + path.split('/')[2];

  const langUrlArrayLink = [];
  const langUrlArrayRelated = [];
  for (let i of ['fr', 'ja', 'en']) {
    let langUrlPrefix = '<link rel="';
    let langUrlMiddle = '" href="';
    let langUrlLink = '/' + section + '/' + i + '/' + path + '/' + slug;
    let langUrlHreflang = '" hreflang="' + i + '" />';
    const langUrlAlternate = langUrlPrefix + 'alternate' + langUrlMiddle + langUrlLink + langUrlHreflang;
    if ( lang === i) {
      langUrlCanonical = langUrlPrefix + 'canonical' + langUrlMiddle + langUrlLink + langUrlHreflang;
      langUrlArrayLink.push(langUrlCanonical);
    }
    else {
      langUrlArrayRelated.push(langUrlLink);
    };
    langUrlArrayLink.push(langUrlAlternate);
  }
  const pageSchema = `<script type="application/ld+json">` + JSON.stringify([{ "@context": "http://schema.org", "@type": ["WebPageElement", itemPage], "url": url, "description": description, "relatedLink": langUrlArrayRelated, "significantLink": significantLinks, "specialty": specialty, "datePublished": formatToDateIso(date), "dateModified": formatToDateIso(modified), "mainEntityOfPage": { "@type": "ItemPage", url }, "headline": title, "author": { "@type": "Person", "name": "François VIDIT", "url": "/profile/" + lang }, "image": {	"@type": "ImageObject", "url": imageUrl, "name": imageFileName,	"width": imageWidth,	"height": imageHeight }, 	"publisher": { "@type": "Organization", "name": "francois-vidit.com", "logo": { "@type": "ImageObject", "url": "/francois-vidit-com_600x60.png"}}}, { "@context": "http://schema.org", "@type": "BreadcrumbList", "itemListElement": [{		"@type": "ListItem", "position": 1, "item": { "@id": rootUrl, "@type": "CollectionPage", "name": rootTitle } }, { "@type": "ListItem", "position": 2, "item": { "@id": sectionUrl, "@type": "CollectionPage", "name": sectionTitle } }, { "@type": "ListItem", "position": 3, "item": {  "@id": pathLevelOneUrl, "@type": "CollectionPage", "name": pathLevelOneTitle } }, { "@type": "ListItem",   "position": 4, "item": { "@id": pathLevelTwoUrl, "@type": "CollectionPage",	"name": pathLevelTwoTitle }	}, { "@type": "ListItem", "position": 5, "item": { "@id": pathLevelThreeUrl, "@type": "CollectionPage", "name": pathLevelThreeTitle } }, { "@type": "ListItem", "position": 6, "item": { "@type": "ItemPage", "name": title }	}]}]) + `<\/script>`;
</script>

<svelte:head>
  <title>{title} | francois-vidit.com</title>
	<meta name="keywords" content="{keywords}" />

	<meta name="description" content="{description}" property="og:description" />
	<meta property="og:title" content="{title}" />
	<meta property="og:site_name" content="francois-vidit.com" />
	<meta property="og:url" content="{url}" />
	<meta property="og:type" content="article" />

	<meta name="image" content="{imageUrl}" property="og:image" /> 
	<meta content="{imageWidth}" property="og:image:width" /> 
	<meta content="{imageHeight}" property="og:image:height" /> 
	<meta content="{imageTitle}" property="og:image:title" />
	<meta content="{imageLegend}" property="og:image:alt" /> 
	<meta content="image/jpeg" property="og:image:type" />

	<meta content="{twitterCard}" property="twitter:card" />
	<meta content="@bf7afa37fa94ja" property="twitter:site:id" />

    <meta name="google" content="notranslate" />

  {@html langUrlArrayLink}
  {@html pageSchema}
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
<pre>[html body]: see below [bodyLength]: {bodyLength}</pre>

<nav aria-label="breadcrumb">
  <ul class="breadcrumb">
    {#each [ {name: rootTitle, url: rootUrl}, {name: sectionTitle, url: sectionUrl}, {name: pathLevelOneTitle, url: pathLevelOneUrl}, {name: pathLevelTwoTitle, url: pathLevelTwoUrl}, {name: pathLevelThreeTitle, url: pathLevelThreeUrl} ] as { name, url }, i}
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
      {#if pagination[0] >= 3 }<li class="gap">…</li>{/if}
      {/if}
      <li><a href={paginationPreviousPageUrl} rel="preload previous">{wordPrevious[lang]} &laquo; {pagination[0]}</a></li>
      {/if}
      <li><a href={paginationCurrentPageUrl}>{pagination[1]}</a></li>
      {#if pagination[2] !== 0 }
      <li><a href={paginationNextPageUrl} rel="preload next">{pagination[2]} &raquo; {wordNext[lang]}</li>
      {#if pagination[2] <= totalPageNumber - 2}<li class="gap">…</li>{/if}
      {#if pagination[2] <= totalPageNumber - 1}<li class="gap"><a href={url + '?page=' + totalPageNumber}>{totalPageNumber}</a></li>{/if}
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

  :global(ul.breadcrumb) {
    list-style: none;
  }

  :global(ul.breadcrumb li) {
    display: inline;
  }

  :global(ul.breadcrumb li+li:before) {
    content: ">";
    padding: 10px; 
  }
</style>