import axios from "axios";
import {ifSomeProblemAlert} from './notiflix'

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29488809-58b059500460d672a67371786';

export async function fetchImages(q, page) {
  try {
      return await axios
      .get(BASE_URL, {
        params: {
          key: API_KEY,
          q,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page,
        }
    });
  } catch (error) {
    ifSomeProblemAlert(error);
  }
}