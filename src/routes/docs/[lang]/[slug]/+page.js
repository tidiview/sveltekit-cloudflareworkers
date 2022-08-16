import { error } from '@sveltejs/kit';
import { existingUrlArray } from '$lib/existingUrlArray.js';

	/** @type {import('@sveltejs/kit').PageLoad} */
	export async function load({ params , fetch }) {

  const lang = params.lang;
  const slug = params.slug;
  const pageUrl = '/docs/' + lang + '/' + slug;

  if ( !existingUrlArray.has(pageUrl)) {
    console.log(`invalid parameter lang: ${lang} or slug: ${slug}`);
    throw error(404, 'Not found');
  }

  // /docs/${params.lang}/${params.slug}.json
  // /docs/ja/versailles.json
  const url1 = '/docs/' + lang + '/' + slug + '.json';
  const res1 = await fetch(url1);

  if (!res1.ok) throw error(500, `Could not load ${url1}`);

  const data1 = await res1.json()

  // docs/vasari/vasari.json || static folder
  const url2 = '/docs/' + data1.params.slug + '/' + data1.params.slug + '.json';
  const res2 = await fetch(url2);

  if (!res2.ok) throw error(500, `Could not load ${url2}`);

  const data2 = await res2.json();

  // docs/vasari/vasari.ja.json
  const url3 = '/docs/' + data1.params.slug + '/' + data1.params.slug + '.' + data1.params.lang + '.json';
  const res3 = await fetch(url3);

  if (!res3.ok) throw error(500, `Could not load ${url3}`);

  const data3 = await res3.json();

  // docs/breadcrumb.ja.json breadcrumb || no path, no pageNumber
  const url4 = '/docs/breadcrumb.' + data1.params.lang + '.json';
  const res4 = await fetch(url4);

  if (!res4.ok) throw error(500, `Could not load ${url4}`);
  const data4 = await res4.json();

  return {
    data1: data1,
    data2: data2,
    data3: data3,
    data: data4
  };
}
