import './form.js';
import {renderPicturesMiniature} from './photo.js';
import {fetchData} from './api.js';
import {showAlert} from './util.js';
import {addImageFilters} from './filter.js';

// Получение данных с сервера;
fetchData(
  'https://23.javascript.pages.academy/kekstagram/data',
  'GET',
  (picturesData) => {
    renderPicturesMiniature(picturesData);
    addImageFilters(picturesData);
  },
  (onFail) => showAlert(onFail),
);
