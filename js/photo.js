// Просмотр загруженных изображений.

import {renderPicturePreview} from './preview.js';

const listPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция очистки миниатурных изображений;
const removeListPictures = () => {
  const listPicturesAll = document.querySelectorAll('.picture');
  for (let index = 0; index < listPicturesAll.length; index++) {
    listPicturesAll[index].remove();
  }
};

// Функция отрисовки миниатурных изображений;
const renderPicturesMiniature = (picturesData) => {
  const picturesListFragment = document.createDocumentFragment();
  picturesData.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesListFragment.appendChild(pictureElement);
  });
  removeListPictures();
  listPictures.appendChild(picturesListFragment);
  listPictures.addEventListener('click', (evt) => renderPicturePreview(evt, picturesData));
};

export {renderPicturesMiniature};
