// Фильтрация изображений от других пользователей.

import {getRandomNumber, debounce} from './util.js';
import {renderPicturesMiniature} from './photo.js';

const imagesFilters = document.querySelector('.img-filters');
const imagesFiltersButton = imagesFilters.querySelectorAll('.img-filters__button');
const filterDefaultButton = imagesFilters.querySelector('#filter-default');
const filterRandomButton = imagesFilters.querySelector('#filter-random');
const filterDiscussedButton = imagesFilters.querySelector('#filter-discussed');

const FILTER_RANDOM_IMAGE_COUNT = 10;
const RERENDER_DELAY = 500;

// Функция применения стиля на активную кнопку фильтра;
const setStyleButtonFilter = (evt) => {
  const buttonFilter = evt.target;
  for (let index = 0; index < imagesFiltersButton.length; index++) {
    imagesFiltersButton[index].classList.remove('img-filters__button--active');
  }
  buttonFilter.classList.add('img-filters__button--active');
};

// Функция получения массива случайных изображений;
const getRandomImages = (picturesData) => {
  const arrayIndexImages = [];
  const arrayRandomImages = [];
  while (arrayIndexImages.length < FILTER_RANDOM_IMAGE_COUNT) {
    const randomIndex = getRandomNumber(0, picturesData.length-1);
    if (arrayIndexImages.indexOf(randomIndex) === -1) {
      arrayIndexImages.push(randomIndex);
    }
  }
  for (const value of arrayIndexImages) {
    arrayRandomImages.push(picturesData[value]);
  }
  return arrayRandomImages;
};

// Функция получения обсуждаемых изображений;
const getDiscussedImages = (picturesData) => {
  const arrayDiscussedImages = picturesData.slice();
  arrayDiscussedImages.sort((second, first) => first.comments.length - second.comments.length);
  return arrayDiscussedImages;
};

// Функция визуализации изображений с устранением дребезга;
const renderPicturesDebounce = debounce(renderPicturesMiniature, RERENDER_DELAY);


// Обработчик события при выборе фильтра;
const onImagesFiltersButtonClick = (evt, picturesData) => {
  const buttonFilter = evt.target;
  setStyleButtonFilter(evt);
  if (buttonFilter === filterDefaultButton) {
    renderPicturesDebounce(picturesData);
  }  if (buttonFilter === filterRandomButton) {
    renderPicturesDebounce(getRandomImages(picturesData));
  }  if (buttonFilter === filterDiscussedButton) {
    renderPicturesDebounce(getDiscussedImages(picturesData));
  }
};

export {onImagesFiltersButtonClick};


