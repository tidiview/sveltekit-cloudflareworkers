import { error } from '@sveltejs/kit';

const valid_langs = new Set(['fr', 'ja', 'en']);

/** @type {import('./$types').Load} */
export async function load({ params, fetch }) {

	const lang = params.lang;

	if (!valid_langs.has(lang)) {
		console.log(`invalid lang parameter ${lang}`);
		throw error(404, 'Not found');
	}
	
	// ${params.lang}
	// /ja
	const url1 = '/' + lang + '.json';
	const res = await fetch(url1);
	const data = await res.json();

	if (res.ok) {
		return {
			data
		};
	}

	throw error(500, `Could not load ${url1}`);

}
