import { fetchEventDetails } from './discoveryapi';
import ticket from '../images/ticket.svg';
import { processEventData, loadExistingValues } from './searchbar';

const contentWrapper = document.querySelector('.content-wrapper');

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};
const closeModal = () => {
  refs.modal.classList.add('is-hidden');
  document.body.classList.remove("stop-scroll");
};

const initModal = () => {
  const openModal = async e => {
    e.preventDefault();
    const target = e.target.closest('.item-card');
    if (target.classList.contains('item-card')) {
      const currentId = target.getAttribute('data-id');

      refs.modal.classList.remove('is-hidden');
      document.body.classList.add("stop-scroll");
      const details = await fetchEventDetails(currentId);
      populateEventDetails(details);
    }
  };

  refs.openModalBtn.addEventListener('click', openModal);
  refs.closeModalBtn.addEventListener('click', closeModal);
};

const doMore = (e) => {
  const query = e.target.getAttribute("data-query");
  console.log(query);
  localStorage.setItem('query', query);
  localStorage.setItem('page', 1);
  loadExistingValues();
  processEventData();
  closeModal();
}

const populateEventDetails = detail => {
  const priceRange =
    detail.priceRanges && detail.priceRanges.length
      ? `${detail.priceRanges[0].type} ${detail.priceRanges[0].min}–${detail.priceRanges[0].max} ${detail.priceRanges[0].currency}`
      : 'Price not available';
  const markup = `
      <div class="circle-image">
        <img src="${detail.images[2].url}" alt="${
    detail.name
  }" loading="lazy" width="132"/>
      </div>
      <div class="two-column">
        <div class="portfolio-image">
        <img src="${detail.images[2].url}" alt="${
    detail.name
  }" loading="lazy" width="427"/>
        </div>
        <div class="portfolio-text">
          <div class="detail-holder">
            <h4 class="subtitle">info</h4>
            <p class="detail-text">${
              detail.info ? detail.info : 'No description found'
            } </p>
          </div>
          <div class="detail-holder">
            <h4 class="subtitle">when</h4>
            <p class="detail-text">${detail.dates.start.localDate}
              <br />${
                detail.dates.start.localTime ? detail.dates.start.localTime : ''
              } (${detail.dates.timezone ? detail.dates.timezone : ''})</span>
            </p>
            </div>
          <div class="detail-holder">
            <h4 class="subtitle">where</h4>
            <p class="detail-text">${
              detail.dates.timezone ? detail.dates.timezone : ''
            }
              <br />${detail._embedded.venues[0].name}
            </p>
          </div>
        </div>
      </div>
      <div class="bottom-part">
        <h4 class="subtitle">who</h4>
        <p class="detail-text">${detail._embedded.attractions[0].name}</p>
        <h4 class="subtitle">prices</h4>
        <p class="detail-text">
            <span><img src="${ticket}" alt="barcode"></span>${priceRange}</p>
        <a href="${
          detail.url
        }" class="buy-tickets" target="_blank" rel="nofollow noopener noreferrer">buy tickets</a>
      </div>
      <div class="button-holder">
        <button type="button" class="more-button" data-query="${detail._embedded.attractions[0].name}">more from this author</button>
      </div>
    </div>`;
  contentWrapper.innerHTML = markup;
  const moreButton = document.querySelector(".more-button");
  moreButton.addEventListener("click", doMore)
};

export { initModal, populateEventDetails };
