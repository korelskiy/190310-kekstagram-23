// Просмотр загруженных изображений.

import {renderPicturesPreview} from './preview.js';


const listPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicturesMiniature = (picturesData) => {
  const picturesListFragment = document.createDocumentFragment();

  picturesData.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesListFragment.appendChild(pictureElement);
  });

  listPictures.appendChild(picturesListFragment);
  listPictures.addEventListener('click', (evt) => renderPicturesPreview(evt, picturesData));
};

export {renderPicturesMiniature};
