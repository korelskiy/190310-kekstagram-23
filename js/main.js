import './form.js';
import {renderPicturesMiniature} from './photo.js';
import {fetchData} from './api.js';
import {showAlert} from './util.js';
import {onImagesFiltersButtonClick} from './filter.js';

const ImagesFilters = document.querySelector('.img-filters');
const form = ImagesFilters.querySelector('.img-filters__form');

// Получение данных с сервера;
fetchData(
  'https://23.javascript.pages.academy/kekstagram/data',
  'GET',
  (picturesData) => {
    renderPicturesMiniature(picturesData);
    ImagesFilters.classList.remove('img-filters--inactive');
    form.addEventListener('click', (evt) => onImagesFiltersButtonClick(evt, picturesData));
  },
  (onFail) => showAlert(onFail),
);
