import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

const baseURL = __IS_DEV__ ? 'http://localhost:8000' : '';

export const $api = axios.create({
  baseURL,
  headers: {
    authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY), // если авторизованы в LS что-то есть, иначе - нет и соответственно сервер этот запрос не пропустит
  },
});
