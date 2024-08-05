import Notiflix from 'notiflix';
import axios from 'axios';

const modal = document.getElementById('event-modal');
const modalContent = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-button');

const API_KEY = 'JFfDy34LrJl7VVgBTc7jqnnTRHXCQbbZ'; // Add your API key
const API_URL = 'https://app.ticketmaster.com/discovery/v2/'; // Add the base URL

async function showEventDetails(eventId) {
    const url = `${API_URL}events/${eventId}.json?apikey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const event = response.data;
        modalContent.innerHTML = `
            <div>
                <img class="event-logo" src="${event.images[0]?.url || 'default-image.jpg'}" alt="${event.name}">
            </div>
            <ul>
                <li>
                    <img class="main-image" src="${event.images[2]?.url || 'default-image.jpg'}" alt="${event.name}">
                </li>
                <li>
                    <h4>WHO</h4>
                    <p>${event.name}</p>
                    <h4>WHEN</h4>
                    <p>Date: ${event.dates.start.localDate}</p>
                    <h4>WHERE</h4>
                    <p>Venue: ${event._embedded.venues[0]?.name || 'Unknown venue'}</p>
                    <h4>PRICES</h4>
                    <p>${event.info || ''}</p>
                    <p>${event.priceRanges[0]?.type} ${event.priceRanges[0]?.min}-${event.priceRanges[0]?.max} ${event.priceRanges[0]?.currency}</p>
                    <button class="buy-tickets" href="${event.url}" target="_blank">Buy Tickets</button>
                </li>
            </ul>
        `;
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching event details:', error);
        Notiflix.Notify.Failure('Error fetching event details');
    }
}

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

export { showEventDetails };
