import {populateCountriesDropdown, processEventData} from './js/searchbar'
import { initModal } from './js/modal';

populateCountriesDropdown();
processEventData();
initModal(); 
window.onload = function() {
    localStorage.clear(); 
    
};
