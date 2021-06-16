// Просмотр загруженных изображений.
import {customPhotos} from './data.js';

const listPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesMiniature = customPhotos;
const picturesListFragment = document.createDocumentFragment();

picturesMiniature.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  picturesListFragment.appendChild(pictureElement);
});

listPictures.appendChild(picturesListFragment);


