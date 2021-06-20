// Отрисовка окна с полноразмерным изображением;

import {listPictures} from './photo.js';
import {customPhotos} from './data.js';
import {isEscEvent, isEnterEvent} from './util.js';

const body = document.querySelector('body');
const previewBlock = document.querySelector('.big-picture');
const previewPicture = previewBlock.querySelector('.big-picture__img').querySelector('img');
const pictureLikes = previewBlock.querySelector('.likes-count');
const pictureCommentsCount = previewBlock.querySelector('.comments-count');
const pictureDescription = previewBlock.querySelector('.social__caption');
const pictureListComments = previewBlock.querySelector('.social__comments');
const buttonClosePreview = previewBlock.querySelector('.big-picture__cancel');
const previewBlockCommentsCount = previewBlock.querySelector('.social__comment-count');
const newUploadedComments = previewBlock.querySelector('.comments-loader');
const pictures = document.querySelectorAll('.picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

// Обработчик события при нажатии клавиши Esc;
const onPreviewEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    previewBlock.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

// Функция открытия окна с полноразмерным изображением;
function openPreviewBlock () {
  previewBlock.classList.remove('hidden');
  body.classList.add('modal-open');
  previewBlockCommentsCount.classList.add('hidden'); // скрываем временно!
  newUploadedComments.classList.add('hidden'); // скрываем временно!
  document.addEventListener('keydown', onPreviewEscKeydown);
}

// Функция закрытия окна с полноразмерным изображением;
function closePreviewBlock () {
  previewBlock.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPreviewEscKeydown);
}

// Закрытие окна при нажатии клавиши Enter;
buttonClosePreview.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closePreviewBlock();
  }
});

// Закрытие окна при клике на кнопку "Close";
buttonClosePreview.addEventListener ('click', () => {
  closePreviewBlock();
});

// Генерация комментариев к фотографии;
const renderComments = (comments) => {
  for (let index = 0; index <= comments.length-1; index++) {
    const {avatar, name, message} = comments[index];
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt =  name;
    commentElement.querySelector('.social__text').textContent = message;
    pictureListComments.appendChild(commentElement);
  }
};


// Обработка события нажатия на миниатюру и заполнение данными;
listPictures.addEventListener('click', (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (pictureElement) {
    openPreviewBlock();
    const index = Array.from(pictures).findIndex((elem) => elem === pictureElement);
    const photoInfo = customPhotos[index];
    const {url, likes, comments, description} = photoInfo;
    previewPicture.src = url;
    pictureLikes.textContent = likes;
    pictureCommentsCount.textContent = comments.length;
    pictureDescription.textContent = description;
    pictureListComments.innerHTML = '';
    renderComments(comments);
  }
});
