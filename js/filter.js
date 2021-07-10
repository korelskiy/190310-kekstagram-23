// Фильтрация изображений от других пользователей.
import {getRandomNumber, debounce} from './util.js';
import {renderPicturesMiniature} from './photo.js';

const ImagesFilters = document.querySelector('.img-filters');
const ImagesFiltersButton = ImagesFilters.querySelectorAll('.img-filters__button');

const filterDefaultButton = ImagesFilters.querySelector('#filter-default');
const filterRandomButton = ImagesFilters.querySelector('#filter-random');
const filterDiscussedButton = ImagesFilters.querySelector('#filter-discussed');

const FILTER_RANDOM_IMAGE_COUNT = 10;
//const RERENDER_DELAY = 50000;


const setStyleButtonFilter = (evt) => {
  const buttonFilter = evt.target;
  for (let index = 0; index < ImagesFiltersButton.length; index++) {
    ImagesFiltersButton[index].classList.remove('img-filters__button--active');
  }
  buttonFilter.classList.add('img-filters__button--active');
};

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

const getDiscussedImages = (picturesData) => {
  const arrayDiscussedImages = picturesData.slice();
  arrayDiscussedImages.sort((second, first) => first.comments.length - second.comments.length);
  return arrayDiscussedImages;
};

const onImagesFiltersButtonClick = (evt, picturesData) => {
  const buttonFilter = evt.target;
  setStyleButtonFilter(evt);
  if (buttonFilter === filterDefaultButton) {
    renderPicturesMiniature(picturesData);
  }  if (buttonFilter === filterRandomButton) {
    renderPicturesMiniature(getRandomImages(picturesData));
  }  if (buttonFilter === filterDiscussedButton) {
    renderPicturesMiniature(getDiscussedImages(picturesData));
    /*
    renderPicturesMiniature(debounce(
      getDiscussedImages(picturesData),
      RERENDER_DELAY,
    ));
    */
  }
};

export {onImagesFiltersButtonClick};


