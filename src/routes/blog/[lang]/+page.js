import { error } from '@sveltejs/kit';

    const valid_langs = new Set(['fr', 'ja', 'en']);

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ url, params, fetch }) {
        const lang = params.lang;
        if ( !valid_langs.has(lang)) {
		console.log(`invalid parameter lang: ${lang}`);
		throw error(404, 'Not found');
	}
	
	// ${page.path}
	// /blog/ja
	const url1 = `/blog/` + lang + `.json`;
	const res = await fetch(url1);
	
	if (!res.ok)
		throw error(500, `Could not load ${url1}`);
	
	const data = await res.json();
	
	// blog/route-tree.blog.ja.json
	const url2 = `/blog/route-tree.blog.` + lang  + `.json`;
	const res2 = await fetch(url2);

	if (!res2.ok)
		throw error(500, `Could not load ${url2}`);

	const data2 = await res2.json();

	return {
		data,
		section: 'blog',
		data2
	};

}
