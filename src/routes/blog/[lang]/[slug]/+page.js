import { error } from '@sveltejs/kit';

const valid_langs = new Set(['fr', 'ja', 'en']);
	const valid_slug = new Set(['phedre', 'priscus', 'diotime', 'marivaux', 'ihoujin', 'rousi', 'psyche', 'onnadaigaku', 'fontenelle', 'benalla', 'roiyarukakumei', 'la-marseillaise', 'robespierre', 'rimbaud', 'iohane', 'bokusi', 'kakumei', 'syusigaku', 'iehamotomoto', 'louis-xiv']);
	
	/** @type {import('@sveltejs/kit').PageLoad} */
	export async function load({ url, params, fetch }) {

  const lang = params.lang;
  const slug = params.slug;
  var paramsString = url.searchParams;
  var searchParams = new URLSearchParams(paramsString);
  const queryPage = searchParams.get('page');

  if (!valid_langs.has(lang) || !valid_slug.has(slug)) {
    console.log(`invalid parameter or lang: ${lang} or slug: ${slug}`);
    throw error(404, 'Not found');
  }
  // console.log(page.path);

  // /${params.section}/${params.lang}/${params.slug}.json
  // /blog/ja/rousi
  const url1 = '/blog/' + slug + '.json';
  const res = await fetch(url1);

  if (!res.ok) throw error(500, `Could not load ${url1}`);

  const data = await res.json()
  // docs/vasari.json
  const url2 = '/blog/' + slug + '/' + slug + '.json';
  const res2 = await fetch(url2);

  if (!res2.ok) throw error(500, `Could not load ${url2}`);

  const data2 = await res2.json();

  // docs/vasari.ja.json or docs/vasari2.ja.json
  const url3 = queryPage ? '/blog/' + slug + '/' + slug + queryPage + '.' + lang + '.json' : '/blog/' + slug + '/' + slug + '.' + lang + '.json';
  const res3 = await fetch(url3);

  if (!res3.ok) throw error(500, `Could not load ${url3}`);

  const pageNumber = queryPage;
  const data3 = await res3.json();

  // docs/breadcrumb.ja.json breadcrumb
  const url4 = '/blog/breadcrumb.' + lang + '.json';
  const res4 = await fetch(url4);

  if (!res4.ok) throw error(500, `Could not load ${url4}`);
  const data4 = await res4.json();
  return {
    fallthrough: true,
      data,
      data2,
      data3,
      data4
  };
}
