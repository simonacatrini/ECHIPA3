import { fetchEvents } from './discoveryapi';
import { countries } from '../data/countries';
import { generatePagination } from './pagination';

import Notiflix from 'notiflix';
import pin from "../images/vector.svg"

const itemGallery = document.querySelector('.item-gallery');
const dropdownList = document.querySelector('.dropdown-list');
const pagesList = document.querySelector(".pages");

const populateCountriesDropdown = () => {
    const markup = countries
        .map(country => {
            return `<option value="${country.code}">${country.name}</option>`;
        })
        .join('');
    dropdownList.innerHTML = markup;
};

const populateEventGallery = events => {
    const markup = events
        .map(
            (event, index) => `<div class="item-card" style="animation-delay: ${index * 0.1}s;">
        <a href="${event.images[0].url}" target="_blank">
            <div class="image-wrapper">
                <img src="${event.images[0].url}" alt="${event.name}" loading="lazy" width="267"/>
            </div>
        </a>
        <div class="item-info">
            <p class="item-title">
               ${event.name}
            </p>
            <p class="item-date">
               ${event.dates.start.localDate}
            </p>
            <p class="item-location">
               <span> <img src="${pin}" />
               ${event._embedded.venues[0].name}</span>
            </p>
        </div>
    </div>`
        )
        .join('');
    itemGallery.innerHTML = markup;
};

const processEventData = async() => {
    const query = localStorage.getItem("query") || "";
    const country = localStorage.getItem("country") || "";
    const page = localStorage.getItem("page") || 1;

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

const onCountryChange = async() => {
    const selectedCountry = dropdownList.value;
    localStorage.setItem("country", selectedCountry);
    localStorage.setItem("page", 1);
    await processEventData();
};

const onPageChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.getAttribute("data-page");
    if (isNaN(selectedValue)) {
        return;
    }
    const currentPageElement = document.querySelector('.page.active');
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    e.target.classList.add('active');
    localStorage.setItem("page", selectedValue);
    processEventData();
}

pagesList.addEventListener('click', onPageChange);
dropdownList.addEventListener('change', onCountryChange);

export { populateCountriesDropdown, populateEventGallery, processEventData, onCountryChange };