import './form.js';
import {renderPicturesMiniature} from './photo.js';
import {fetchData} from './api.js';
import {showAlert} from './util.js';

fetchData(
  'https://23.javascript.pages.academy/kekstagram/data',
  'GET',
  (picturesData) => {
    renderPicturesMiniature(picturesData);
  },
  (onFail) => showAlert(onFail),
);
