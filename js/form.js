import {isEscEvent, isEnterEvent} from './util.js';

const form = document.querySelector('.img-upload__form');
const buttonUpload = document.querySelector('#upload-file');
const formUpload = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const buttonCloseForm = formUpload.querySelector('.img-upload__cancel');
const hashtagPhoto = formUpload.querySelector('.text__hashtags');
const descriptionPhoto = formUpload.querySelector('.text__description');
const photoPreview = formUpload.querySelector('.img-upload__preview').querySelector('img');

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

// Правила валидации хэштегов;
const showHashtagError = (hashtag) => {
  const re = RegExp('^#[A-Za-zА-Яа-я0-9]{1,19}$');
  for (let index = 0; index < hashtag.length; index++) {
    if (hashtag[index].indexOf('#') !== 0) {
      return 'Хэштег должен начинаться с символа "#"';
    } else if (hashtag[index].length === 1) {
      return 'Хэштег не может состоять только из одной решетки';
    } else if (hashtag[index].length > MAX_HASHTAG_LENGTH) {
      return `Хэштег ${hashtag[index]}превышает максимальную длинну на ${hashtag[index].length - MAX_HASHTAG_LENGTH} символов`;
    } else if (hashtag.length > MAX_HASHTAG_COUNT) {
      return 'Нельзя указывать больше пяти хэштегов к фотографии';
    } else if (hashtag[index].indexOf('#', 1) > 0) {
      return 'Хэштеги должны разделяться пробелом';
    } else if (hashtag.indexOf(hashtag[index], index + 1) > 0) {
      return 'Хэштеги не должны повторяться';
    } else if (!re.test(hashtag[index])) {
      return 'Хэштег не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.';
    }
  }
  return '';
};

// Функция проверки на валидность хэштега;
const setTagValidation = () => {
  const tagsArray = hashtagPhoto.value.toLowerCase().split(/[\s]+/).filter((hashtag) => hashtag.length > 0);
  hashtagPhoto.setCustomValidity(showHashtagError(tagsArray));
  hashtagPhoto.style.border = showHashtagError(tagsArray) ? '5px solid red' : '';
};

// Обработчик события при нажатии клавиши Esc;
const onFormEscKeydown = (evt) => {
  if (document.activeElement !== hashtagPhoto && document.activeElement !== descriptionPhoto
  ) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      formUpload.classList.add('hidden');
      body.classList.remove('modal-open');
      form.reset();
    }
  }
};

// Загрузка выбранного изображения в Preview;
const loadPhotoPreview = () => {
  const file = buttonUpload.files[0];
  photoPreview.file = file;
  const reader = new FileReader();
  reader.onload = (function(aImg) { return function(evt) { aImg.src = evt.target.result; }; })(photoPreview);
  reader.readAsDataURL(file);
};

// Функция открытия формы с загруженным изображением;
const openForm = () => {
  formUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  hashtagPhoto.addEventListener('input', setTagValidation);
  loadPhotoPreview();
};

// Функция закрытия формы с загруженным изображением;
const closeForm = () => {
  formUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  hashtagPhoto.removeEventListener('input', setTagValidation);
  form.reset();
};

// Закрытие окна при нажатии клавиши Enter;
buttonCloseForm.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeForm();
  }
});

// Закрытие окна при клике на кнопку "Close";
buttonCloseForm.addEventListener('click', () => {
  closeForm();
});

buttonUpload.addEventListener('change', () => {
  openForm();
});