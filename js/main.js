import './form.js';
import {renderPicturesMiniature} from './photo.js';
import {fetchData} from './api.js';
import {errorMessage} from './util.js';
import {addImageFilters} from './filter.js';

const urlResource = 'https://23.javascript.pages.academy/kekstagram/data';
const queryMethod = 'GET';

// Получение данных с сервера;
fetchData(
  urlResource,
  queryMethod,
  (pictures) => {
    renderPicturesMiniature(pictures);
    addImageFilters(pictures);
  },
  (onFail) => errorMessage(onFail),
);
