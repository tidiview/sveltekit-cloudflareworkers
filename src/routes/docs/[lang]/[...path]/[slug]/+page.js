import { error } from '@sveltejs/kit';
import { existingUrlArray } from '$lib/existingUrlArray.js';

export const prerender = false;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ url, params, fetch }) {
	
    const lang = params.lang;
    const path = params.path;
    const slug = params.slug;
    var paramsString = url.searchParams;
    var searchParams = new URLSearchParams(paramsString);
    const queryPage = searchParams.get('page');
    const pageUrl = '/docs/' + lang + '/' + path + '/' + slug;

    if ( !existingUrlArray.has(pageUrl) ) {
      console.log(`invalid parameter lang: ${lang} or path: ${path} or slug: ${slug}`);
      throw error(404, 'Not found');
    }
	
	// /section/lang/path/slug.json
	// docs/ja/paris/louvre/la-joconde/vasari.json
	const url1 = '/docs/' + lang + '/'  + path + '/'  + slug + '.json';
	const res1 = await fetch(url1);

	if (!res1.ok) throw error(500, `Could not load ${url1}`);

	const data1 = await res1.json();
	// console.log('data1 from page.js: ', data1)

	// docs/vasari.json
	const url2 = '/docs/' + data1.params.slug + '/' + data1.params.slug + '.json';
	const res2 = await fetch(url2);

	if (!res2.ok) throw error(500, `Could not load ${url2}`);

	const data2 = await res2.json();
	// console.log('data2 from page.js: ', data2)

	// docs/vasari.ja.json or docs/vasari2.ja.json
	const url3 = queryPage ? '/docs/' + data1.params.slug + '/' + data1.params.slug + queryPage + '.' + data1.params.lang + '.json' : '/docs/' + data1.params.slug + '/' + data1.params.slug + '.' + data1.params.lang + '.json';
	const res3 = await fetch(url3);

	if (!res3.ok) throw error(500, `Could not load ${url3}`);

    const pageNumber = queryPage;
	const data3 = await res3.json();
	// console.log('data3 from page.js: ', data3)

	// docs/breadcrumb.ja.json breadcrumb
	const url4 = '/docs/breadcrumb.' + data1.params.lang + '.json';
	const res4 = await fetch(url4);

	if (!res4.ok)
	throw error(500, `Could not load ${url4}`);
	const data4 = await res4.json();
	// console.log('data4 from page.js: ', data4)

	return {
		data1: data1,
		data2: data2,
		data3: data3,
        pageNumber: pageNumber,
        data4: data4
	};
}
