import { fetchEvents } from "./discoveryapi";
import { countries } from "../data/countries"; 

import Notiflix from 'notiflix';



const form = document.querySelector(".search-form")
const itemGallery = document.querySelector(".item-gallery");
const dropdownList = document.querySelector(".dropdown-list");

const populateCountriesDropdown = () => {
    const markup = countries.map(country => {
        return `<option value="${country.code}">${country.name}</option>`
    })
    .join("");
    dropdownList.innerHTML = markup;
}

const populateEventGallery = (events) => {
    const markup = events.map(
    event => `<div class="item-card">
        <a href="${event.images[0].url}" target="_blank">
            <img src="${event.images[0].url}" alt="${event.name}" loading="lazy" width="300"/>
        </a>
        <div class="item-info">
            <p class="item-title">
               ${event.name}
            </p>
            <p class="item-date">
               ${event.dates.start.localDate}
            </p>
            <p class="item-location">
               ${event._embedded.venues[0].name}
            </p>
        </div>
    </div>`)
    .join("");
  itemGallery.innerHTML = markup;
};


populateCountriesDropdown();

const processEventData = async (country = "") => {
    const eventsObject = await fetchEvents("", country);
    if (eventsObject && eventsObject._embedded && eventsObject._embedded.events.length > 0) { 
        populateEventGallery(eventsObject._embedded.events);
    } else {
        itemGallery.innerHTML = "";
        Notiflix.Notify.failure(
            'Sorry, there are no results.'
        )
    }
}

processEventData();

const onCountryChange = async () => {
    const selectedCountry = dropdownList.value;
    // console.log(dropdownList.value);
    await processEventData(selectedCountry);
}



// form.addEventListener('search', onSearch);
dropdownList.addEventListener("change", onCountryChange);