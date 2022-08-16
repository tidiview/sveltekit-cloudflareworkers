import { error } from '@sveltejs/kit';

    const valid_langs = new Set(['fr', 'ja', 'en']);

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params, fetch }) {
        
	const lang = params.lang;
        
	if (!valid_langs.has(lang)) {
		console.log(`invalid lang parameter ${lang}`);
		return {
			status: 404,
			error: 'Not found'
		};
	}
	
	// /${lang}.json
	// /ja.json
	const url1 = '/' + lang + '.json';
	const res1 = await fetch(url1);

	if (!res1.ok) throw error(500, `Could not load ${url1}`);

	const data1 = await res1.json();
	
	// /home.json
	const url2 = '/home.json';
	const res2 = await fetch(url2);

	if (!res2.ok)
		throw error(500, `Could not load ${url2}`);

	const data2 = await res2.json();

	// home.[lang].json
	// home.ja.json
	const url3 = '/home.' + data1.params.lang + '.json';
	const res3 = await fetch(url3);

	if (!res3.ok) throw error(500, `Could not load ${url3}`);

	const data3 = await res3.json();
 
	return {
		data1: data1,
		data2: data2,
		data3: data3
	};

}
