import './form.js';
import {renderPicturesMiniature} from './photo.js';
import {renderPicturesPreview} from './preview.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData(
  (picturesData) => {
    renderPicturesMiniature(picturesData);
    renderPicturesPreview(picturesData);
  },
  (onFail) => showAlert(onFail),
);
/*
sendRequest(
  'https://23.javascript.pages.academy/kekstagram/data',
  'GET',
  (picturesData) => {
    renderPicturesMiniature(picturesData);
    renderPicturesPreview(picturesData);
  },
  (onFail) => showAlert(onFail),
);
*/
