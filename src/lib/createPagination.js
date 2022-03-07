export function createPagination(pageNumber, totalPageNumber, url) {
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
  paginationPreviousPageUrl = pagination[0] === 0 ? null : pagination[0] === 1 ? url : url + '?page=' + pagination[0];
  paginationNextPageUrl = pagination[2] === 0 ? null : url + '?page=' + pagination[2];
  wordNext = {fr: 'suivant', ja: '次', en: 'next'};
  wordPrevious = {fr: 'précédent', ja: '前', en: 'previous'};
  prevNextUrlLink = paginationPreviousPageUrl !== null && paginationNextPageUrl !== null ? '<link rel="prev" href="' + paginationPreviousPageUrl + '"><link rel="next" href="' + paginationNextPageUrl + '">' : paginationPreviousPageUrl === null ? '<link rel="next" href="' + paginationNextPageUrl + '">' : '<link rel="prev" href="' + paginationPreviousPageUrl + '">';
  return pagination, paginationPreviousPageUrl, paginationNextPageUrl, prevNextUrlLink, wordNext, wordPrevious; 
};