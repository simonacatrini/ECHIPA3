// // import { processEventData} from '../js/searchbar'
// import { HITSPERPAGE, PAGES_UPPER_LIMIT } from '../js/discoveryapi';

// const pagesContainer = document.querySelector('.pages');

// const generatePagination = (currentPage, totalCount) => {
//   const maxPages = Math.ceil(totalCount / HITSPERPAGE);
//   const highestPage = Math.min(maxPages, PAGES_UPPER_LIMIT);

//   let pages = [];
//  if (highestPage <= 8) {
//     pages = [1, 2, 3, 4, 5, 6, 7, 8];
//  } else if (currentPage > 3 && currentPage < highestPage - 2) {
//     pages = [1];
//     if (currentPage > 4) {
//       pages.push('...');
//     }
//     pages.push(
//       ...[
//         currentPage - 2,
//         currentPage - 1,
//         currentPage,
//         currentPage * 1 + 1,
//         currentPage * 1 + 2,
//         '...',
//         highestPage,
//       ]
//     );
//   } else if (currentPage >= highestPage - 2) {
//     pages = [1];
//     if (currentPage > 4) {
//       pages.push('...');
//     }
//     pages.push(...[currentPage - 2, currentPage - 1, currentPage]);
//     if (currentPage != highestPage - 1 ) {
//       pages.push(highestPage-1);
//     }
//     if (currentPage != highestPage) {
//       pages.push(highestPage);
//     }
//   } else {
//     pages = [1, 2, 3, 4, '...', highestPage];
//   }

//   let markup = '';
//   for (let i = 0; i < pages.length; i++) {
//     markup += `<li data-page="${pages[i]}" class="page ${
//       pages[i] == currentPage ? 'active' : ''
//     }">${pages[i]}</li>`;
//   }
//   //   console.log(markup);
//   pagesContainer.innerHTML = markup;
// };

// export { generatePagination };


import { HITSPERPAGE, PAGES_UPPER_LIMIT } from '../js/discoveryapi';
const pagesContainer = document.querySelector('.pages');
const generatePagination = (currentPage, totalCount) => {
  currentPage=Number(currentPage)
  const maxPages = Math.ceil(totalCount / HITSPERPAGE);
  const highestPage = Math.min(maxPages, PAGES_UPPER_LIMIT);
  let pages = [];
  if (highestPage <= 8) {
    // Dacă sunt mai puțin de 8 pagini, le afișăm pe toate
    pages = Array.from({ length: highestPage }, (_, i) => i + 1);
  } else {
    if (currentPage <= 4) {
      // Dacă suntem pe o pagină între 1 și 4, afișăm primele 5 pagini
      pages = [1, 2, 3, 4, 5, '...', highestPage];
    } else if (currentPage >= highestPage - 3) {
      // Dacă suntem pe una dintre ultimele 4 pagini
      pages = [1, '...', highestPage - 4, highestPage - 3, highestPage - 2, highestPage - 1, highestPage];
    } else {
      // Dacă suntem în mijlocul paginilor
      pages = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        highestPage
      ];
    }
  }
  let markup = '';
  for (let i = 0; i < pages.length; i++) {
    markup += `<li data-page="${pages[i]}" class="page ${
      pages[i] == currentPage ? 'active' : ''
    }">${pages[i]}</li>`;
  }
  pagesContainer.innerHTML = markup;
};
export { generatePagination };