// Отрисовка окна с полноразмерным изображением.

import {listPictures} from './photo.js';

const scrollingBlock = document.querySelector('body');
const previewBlock = document.querySelector('.big-picture');
const previewPicture = previewBlock.querySelector('.big-picture__img').querySelector('img');
const pictureLikes = previewBlock.querySelector('.likes-count');
const pictureCommentsCount = previewBlock.querySelector('.comments-count');
const buttonClosePreview = previewBlock.querySelector('.big-picture__cancel');

const previewBlockCommentsCount = previewBlock.querySelector('.social__comment-count');
const newUploadedComments = previewBlock.querySelector('.comments-loader');

const KEY_CODE_ESC = 27;

listPictures.addEventListener('click', (evt) => {
  const pictureClick = evt.target;
  const nodeClick = evt.target.parentNode;
  if (pictureClick.className === 'picture__img') {
    previewBlock.classList.remove('hidden');
    scrollingBlock.classList.add('modal-open');
    previewPicture.src = nodeClick.querySelector('.picture__img').src;
    pictureLikes.textContent = nodeClick.querySelector('.picture__likes').textContent;
    pictureCommentsCount.textContent = nodeClick.querySelector('.picture__comments').textContent;
    previewBlockCommentsCount.classList.add('hidden');
    newUploadedComments.classList.add('hidden');
  }
});

// Закрытие окна с полноразмерным изображением.

buttonClosePreview.addEventListener ('click',  () => {
  previewBlock.classList.add('hidden');
  scrollingBlock.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === KEY_CODE_ESC) {
    previewBlock.classList.add('hidden');
    scrollingBlock.classList.remove('modal-open');
  }
});
