import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = 'JFfDy34LrJl7VVgBTc7jqnnTRHXCQbbZ';
const URL = 'https://app.ticketmaster.com/discovery/v2/events';

const PAGES_UPPER_LIMIT = 60;
const HITSPERPAGE = 16;

const fetchEvents = async (query = "", country = undefined, page = 1) => {
  try {
    const response = await axios.get(`${URL}`, {
      params: {
        apikey: API_KEY,
        keyword: query,
        page,
        size: `${HITSPERPAGE}`,
        countryCode: country,
      },
    });
    return {data: response.data,
          totalCount: response.data.page.totalElements}
  } catch (error) {
    console.log('Error:', error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }
};

const fetchEventDetails = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`, {
      params: {
        apikey: API_KEY
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error:', error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }
}

export {fetchEvents, HITSPERPAGE, PAGES_UPPER_LIMIT, fetchEventDetails};