import './form.js';
import {renderPicturesMiniature} from './photo.js';
import {fetchData} from './api.js';
import {showAlert} from './util.js';
import {addImageFilters} from './filter.js';

// Получение данных с сервера;
fetchData(
  'https://23.javascript.pages.academy/kekstagram/data',
  'GET',
  (pictures) => {
    renderPicturesMiniature(pictures);
    addImageFilters(pictures);
  },
  (onFail) => showAlert(onFail),
);
