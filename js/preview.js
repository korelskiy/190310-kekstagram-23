// Отрисовка окна с полноразмерным изображением.

import {isEscEvent} from './util.js';

const body = document.querySelector('body');
const previewBlock = document.querySelector('.big-picture');
const previewPicture = previewBlock.querySelector('.big-picture__img').querySelector('img');
const pictureLikes = previewBlock.querySelector('.likes-count');
const pictureCommentsCount = previewBlock.querySelector('.comments-count');
const pictureDescription = previewBlock.querySelector('.social__caption');
const pictureListComments = previewBlock.querySelector('.social__comments');
const buttonClosePreview = previewBlock.querySelector('.big-picture__cancel');
const previewBlockCommentsCount = previewBlock.querySelector('.social__comment-count');
const buttonUploadedComments = previewBlock.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
let lastShownIndex = 0;

const COMMENT_STEP = 5;

// Обработчик события при нажатии клавиши Esc;
const onPreviewEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    previewBlock.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPreviewEscKeydown);
  }
};

// Обработка события отображения комментариев;
const onShowCommentsButtonClick = () => {
  const comments = pictureListComments.children;
  const commentsCount = pictureListComments.children.length;
  const nextIndex = (commentsCount > lastShownIndex + COMMENT_STEP) ? lastShownIndex + COMMENT_STEP : commentsCount;
  for (let index = lastShownIndex; index <= nextIndex - 1; index++) {
    comments[index].classList.remove('hidden');
  }
  buttonUploadedComments.classList.toggle('hidden', commentsCount === nextIndex);
  previewBlockCommentsCount.firstChild.textContent = `${nextIndex} из `;
  lastShownIndex = nextIndex;
};

// Функция открытия окна с полноразмерным изображением;
const openPreviewBlock = () => {
  previewBlock.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPreviewEscKeydown);
  buttonUploadedComments.addEventListener('click', onShowCommentsButtonClick);
};

// Функция закрытия окна с полноразмерным изображением;
const closePreviewBlock = () => {
  previewBlock.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPreviewEscKeydown);
  buttonUploadedComments.removeEventListener('click', onShowCommentsButtonClick);
};

// Закрытие окна при клике на кнопку "Close";
buttonClosePreview.addEventListener('click', () => {
  closePreviewBlock();
});

// Генерация комментариев к фотографии;
const renderComments = (comments) => {
  for (let index = 0; index <= comments.length-1; index++) {
    const {avatar, name, message} = comments[index];
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentElement.classList.add('hidden');
    pictureListComments.appendChild(commentElement);
  }
};

// Обработчик события при выборе миниатюрного изображения;
const renderPicturePreview = (evt, pictures) => {
  const pictureElement = evt.target.closest('.picture');
  const renderedImages = document.querySelectorAll('.picture');
  if (pictureElement) {
    openPreviewBlock();
    const index = Array.from(renderedImages).findIndex((elem) => elem === pictureElement);
    const photoInfo = pictures[index];
    const {url, likes, comments, description} = photoInfo;
    previewPicture.src = url;
    pictureLikes.textContent = likes;
    pictureCommentsCount.textContent = comments.length;
    pictureDescription.textContent = description;
    pictureListComments.innerHTML = '';
    renderComments(comments);
    lastShownIndex = 0;
    onShowCommentsButtonClick();
  }
};

export {renderPicturePreview};
