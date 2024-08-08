import { fetchEvents } from './discoveryapi';
import { countries } from '../data/countries';
import { generatePagination } from './pagination';
import { initModal } from './modal';

import Notiflix from 'notiflix';
import pin from '../images/vector.svg';

const form = document.querySelector('.search-form');
const itemGallery = document.querySelector('.item-gallery');
const dropdownList = document.querySelector('.dropdown-list');
const pagesList = document.querySelector('.pages');

const populateCountriesDropdown = () => {
  const markup = countries
    .map(country => {
      return `<option value="${country.code}" class="option-style">${country.name}</option>`;
    })
    .join('');
  dropdownList.innerHTML = markup;
};

const populateEventGallery = events => {
  const markup = events
    .map(
      event => `<div class="item-card" data-id="${event.id}">
            <div class="image-wrapper">
                <img src="${event.images[0].url}" alt="${event.name}" loading="lazy" width="267"/>
            </div>
        <div class="item-info">
            <p class="item-title">
               ${event.name}
            </p>
            <p class="item-date">
               ${event.dates.start.localDate}
            </p>
            <p class="item-location">
               <span> 
                 <img src="${pin}" />
                ${event._embedded.venues[0].name ? event._embedded.venues[0].name : event.dates.timezone}
               </span>
            </p>
        </div>
    </div>`
    )
    .join('');
  itemGallery.innerHTML = markup;
};

const processEventData = async () => {
  const query = localStorage.getItem('query') || '';
  const country = localStorage.getItem('country') || '';
  const page = localStorage.getItem('page') || 1;

  const eventsObject = await fetchEvents(query, country, page);

  if (
    eventsObject &&
    eventsObject.data &&
    eventsObject.data._embedded &&
    eventsObject.data._embedded.events.length > 0
  ) {
    populateEventGallery(eventsObject.data._embedded.events);
    generatePagination(page, eventsObject.totalCount);
  } else {
    itemGallery.innerHTML = '';
    Notiflix.Notify.failure('Sorry, there are no results.');
  }
};

const onCountryChange = async () => {
  const selectedCountry = dropdownList.value;
  localStorage.setItem('country', selectedCountry);
  localStorage.setItem('page', 1);
  await processEventData();
};

const onPageChange = e => {
  e.preventDefault();
  const selectedValue = e.target.getAttribute('data-page');
  if (isNaN(selectedValue)) {
    return;
  }
  localStorage.setItem('page', selectedValue);
  processEventData();
};

const onSearch = (e) => {
    const userInput = e.target.value;
    localStorage.setItem('query', userInput);
    localStorage.setItem('page', 1);
    processEventData();
}

form.addEventListener('change', onSearch);
form.addEventListener("submit", (e) => e.preventDefault());
pagesList.addEventListener('click', onPageChange);
dropdownList.addEventListener('change', onCountryChange);

export {
  populateCountriesDropdown,
  populateEventGallery,
  processEventData,
  onCountryChange,
};
