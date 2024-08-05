// import { processEventData} from '../js/searchbar'
import { HITSPERPAGE } from '../js/discoveryapi';

const paginationNumbers = document.getElementById('pagination-numbers');
const pagesContainer = document.querySelector('.pages');

const generatePagination = (currentPage, totalCount) => {
  const maxPages = Math.ceil(totalCount / HITSPERPAGE);
  let pages = [];
  if (maxPages >= 15)
    pages = [
      1,
      2,
      3,
      '...',
      Math.ceil(maxPages / 2),
      Math.ceil(maxPages / 2) + 1,
      '...',
      maxPages - 2,
      maxPages - 1,
      maxPages,
    ];
  else if (maxPages >= 8)
    pages = [
      1,
      2,
      3,
      '...',
      Math.ceil(maxPages / 2),
      '...',
      maxPages - 1,
      maxPages,
    ];
  else if (maxPages > 5) pages = [1, 2, 3, '...', maxPages];
  else pages = new Array(maxPages).fill(0).map((_, i) => ++i);

  let markup = '';
  for (let i = 0; i < pages.length; i++) {
    markup += `<li data-page="${pages[i]}" class="page ${pages[i] == currentPage ? 'active' : ''}">${
      pages[i]
    }</li>`;
  }
  console.log(markup);
  pagesContainer.innerHTML = markup;
};

export { generatePagination };
