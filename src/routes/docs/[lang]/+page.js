import { error } from '@sveltejs/kit';

    const valid_langs = new Set(['fr', 'ja', 'en']);

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params, fetch }) {

        const lang = params.lang;

        if ( !valid_langs.has(lang)) {
		console.log(`invalid parameter lang: ${lang}`);
		throw error(404, 'Not found');
	}
	
	// /docs/${lang}
	// /docs/ja
	const url1 = '/docs/' + lang + '.json';
	const res1 = await fetch(url1);
	
	if (!res1.ok) throw error(500, `Could not load ${url1}`);
	
	const data1 = await res1.json();
	
	// /docs/home.json
	const url2 = '/docs/home.json';
	const res2 = await fetch(url2);

	if (!res2.ok)
		throw error(500, `Could not load ${url2}`);

	const data2 = await res2.json();

	// /docs/home.ja.json
	const url3 = '/docs/home.' + data1.params.lang + '.json';
	const res3 = await fetch(url3);

	if (!res3.ok) throw error(500, `Could not load ${url3}`);

	const data3 = await res3.json();

	// /docs/breadcrumb.ja.json breadcrumb || no path, no pageNumber
	const url4 = '/docs/breadcrumb.' + data1.params.lang + '.json';
	const res4 = await fetch(url4);

	if (!res4.ok) throw error(500, `Could not load ${url4}`);
	const data4 = await res4.json();

	// .docs/route-tree.ja.json route-tree || no path, no pageNumber
	const url5 = '/docs/route-tree.docs.' + data1.params.lang + '.json';
	const res5 = await fetch(url5);

	if (!res5.ok) throw error(500, `Could not load ${url5}`);
	const data5 = await res5.json();

	return {
		data1: data1,
		data2: data2,
		data3: data3,
		data4: data4,
		data5: data5
	};

}
