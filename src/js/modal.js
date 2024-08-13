import { fetchEventDetails } from './discoveryapi';
import ticket from '../images/ticket.svg';


const contentWrapper = document.querySelector('.content-wrapper');

const initModal = () => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  const closeModal = () => {
    refs.modal.classList.add('is-hidden');
  };

  const openModal = async e => {
    e.preventDefault();
    const target = e.target.closest('.item-card');
    if (target.classList.contains('item-card')) {
      const currentId = target.getAttribute('data-id');

      refs.modal.classList.remove('is-hidden');
      const details = await fetchEventDetails(currentId);
      populateEventDetails(details);
    }
  };

  refs.openModalBtn.addEventListener('click', openModal);
  refs.closeModalBtn.addEventListener('click', closeModal);
};

const populateEventDetails = detail => {
  const priceRange =
    detail.priceRanges && detail.priceRanges.length
      ? `${detail.priceRanges[0].type} ${detail.priceRanges[0].min}–${detail.priceRanges[0].max} ${detail.priceRanges[0].currency}`
      : 'Price not available';

  const authorName = detail._embedded.attractions[0].name;

  const markup = `
    <div class="circle-image">
      <img src="${detail.images[2].url}" alt="${detail.name}" loading="lazy" width="132"/>
    </div>
    <div class="two-column">
      <div class="portfolio-image">
        <img src="${detail.images[2].url}" alt="${detail.name}" loading="lazy" width="427"/>
      </div>
      <div class="portfolio-text">
        <div class="detail-holder">
          <h4 class="subtitle">info</h4>
          <p class="detail-text">${detail.info ? detail.info : 'No description found'} </p>
        </div>
        <div class="detail-holder">
          <h4 class="subtitle">when</h4>
          <p class="detail-text">${detail.dates.start.localDate}
            <br />${detail.dates.start.localTime ? detail.dates.start.localTime : ''} (${detail.dates.timezone ? detail.dates.timezone : ''})</span>
          </p>
        </div>
        <div class="detail-holder">
          <h4 class="subtitle">where</h4>
          <p class="detail-text">${detail.dates.timezone ? detail.dates.timezone : ''}<br />${detail._embedded.venues[0].name}</p>
        </div>
      </div>
    </div>
    <div class="bottom-part">
      <h4 class="subtitle">who</h4>
      <p class="detail-text">${authorName}</p>
      <h4 class="subtitle">prices</h4>
      <p class="detail-text">
        <span><img src="${ticket}"></span>${priceRange}</p>
      <a href="${detail.url}" class="buy-tickets" target="_blank" rel="nofollow noopener noreferrer">buy tickets</a>
    </div>
    <div class="button-holder">
      <button type="button" class="more-button" id="more-from-author">more from this author</button>
    </div>
  </div>`;

  contentWrapper.innerHTML = markup;

  // Adăugare event listener pentru butonul "more from this author"
  document.getElementById('more-from-author').addEventListener('click', () => {
    localStorage.setItem('query', authorName);
    localStorage.setItem('page', 1);
    window.location.href = '/'; // Redirecționează către pagina principală
  });
};

let opts = {
  lines: 13,
  length: 28,
  width: 14,
  radius: 42,
  scale: 1,
  corners: 1,
  color: '#dc56c5',
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  className: 'spinner',
  top: '50%',
  left: '50%',
  shadow: false,
  hwaccel: false,
  position: 'absolute',
 }

  // target = document.getElementById('spinner'),
  // spinner = new Spinner(opts).spin(target);
  

  function showModalSpinner() {
    var target = document.getElementById('spinner');
    var spinner = new Spinner(opts).spin(target);

    var modal = document.getElementById('loadingModal');
    modal.style.display = 'flex';
}

// Function to hide the modal and stop the spinner
function hideModalSpinner() {
    var modal = document.getElementById('loadingModal');
    modal.style.display = 'none';

    // Stop the spinner
    var target = document.getElementById('spinner');
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
}

// Example: Show the modal when the page loads and hide it after 3 seconds
window.onload = function() {
    showModalSpinner();

    // Simulate loading process
    setTimeout(hideModalSpinner, 3000); // Hide the spinner after 3 seconds
};

 



export { initModal, populateEventDetails };
