import './form.js';
import {renderPicturesMiniature} from './photo.js';
import {fetchData} from './api.js';
import {errorMessage} from './util.js';
import {addImageFilters} from './filter.js';

const URL_GET = 'https://23.javascript.pages.academy/kekstagram/data';
const GET = 'GET';

// Получение данных с сервера;
fetchData(
  URL_GET,
  GET,
  (pictures) => {
    renderPicturesMiniature(pictures);
    addImageFilters(pictures);
  },
  (onFail) => errorMessage(onFail),
);
