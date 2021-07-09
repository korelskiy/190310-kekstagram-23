
import {isEscEvent} from './util.js';
import {onApplyFilter} from './effects.js';
import {fetchData} from './api.js';

const form = document.querySelector('.img-upload__form');
const buttonUpload = document.querySelector('#upload-file');
const formUpload = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const buttonCloseForm = formUpload.querySelector('.img-upload__cancel');
const HashtagPhotoAddHandler = formUpload.querySelector('.text__hashtags');
const descriptionPhoto = formUpload.querySelector('.text__description');
const photoPreview = document.querySelector('.img-upload__preview').querySelector('img');
const sliderBlock = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const buttonZoomIn = document.querySelector('.scale__control--bigger');

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = '100%';
const MIN_SCALE_VALUE = '25%';

// ------------------------------------------!!!!!!!!!!!!!!!!!!-------------------------------------------------------------
//Вот тут тоже какой-то огород получается у меня, много функций...Не знаю как правильно и красиво отрефакторить код

const messageObject = {
  success : document.querySelector('#success').content.querySelector('.success').cloneNode(true),
  error : document.querySelector('#error').content.querySelector('.error').cloneNode(true),
};

// Функция закрытия окна сообщения отправки формы
const closeMessageForm = () => {
  const closeButton = body.lastChild.querySelector('button');
  body.removeChild(body.lastChild);
  closeButton.removeEventListener('click', closeMessageForm);
};


// Обработчик события при нажатии клавиши Esc при сообщении об отправке формы;
const onMessageFormEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    const closeButton = body.lastChild.querySelector('button');
    body.removeChild(body.lastChild);
    closeButton.removeEventListener('click', closeMessageForm);
    document.removeEventListener('keydown', onMessageFormEscKeydown);
  }
};

/*
// Функция закрытия окна сообщения при клике вне поля сообщения
const clickOutsideFormMessage = (evt) => {
  if (evt.target.nodeName !== 'DIV') {
    const closeButton = body.lastChild.querySelector('button');
    body.removeChild(body.lastChild);
    closeButton.removeEventListener('click', closeMessageForm);
    document.removeEventListener('keydown', onMessageFormEscKeydown);
    document.removeEventListener('keydown', clickOutsideFormMessage);
  }
};
*/

// Функция открытия окна с сообщением об отпавки формы
const openMessageForm = (messageType) => {
  const messageNode = messageObject[messageType];
  body.appendChild(messageNode);
  const closeButton = messageNode.querySelector(`.${messageType}__button`);
  closeButton.addEventListener('click', closeMessageForm);
  document.addEventListener('keydown', onMessageFormEscKeydown);
};

// ------------------------------------------!!!!!!!!!!!!!!!!!!-------------------------------------------------------------

// Функция редактирования масштаба изображения;

const onZoomImage = (evt) => {
  const isZoomIn = evt.target === buttonZoomIn;
  const scaleValue = isZoomIn ? MAX_SCALE_VALUE : MIN_SCALE_VALUE;
  if (scaleControl.value !== scaleValue) {
    let currentValue = parseInt(scaleControl.value, 10);
    currentValue = isZoomIn ? currentValue + SCALE_STEP : currentValue - SCALE_STEP;
    scaleControl.value = `${currentValue}%`;
    photoPreview.style.transform = `scale(${currentValue / 100})`;
  }
};

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
  const tagsArray = HashtagPhotoAddHandler.value.toLowerCase().split(/[\s]+/).filter((hashtag) => hashtag.length > 0);
  HashtagPhotoAddHandler.setCustomValidity(showHashtagError(tagsArray));
  HashtagPhotoAddHandler.style.border = showHashtagError(tagsArray) ? '5px solid red' : '';
};

// Функция закрытия формы с загруженным изображением;
const closeForm = () => {
  formUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  photoPreview.style.transform = '';
  photoPreview.className = '';
  photoPreview.style.filter = 'none';
  form.reset();
};

//Функция отмены обработчика Esc;
const hasFocusedElements = () => document.activeElement === HashtagPhotoAddHandler || document.activeElement === descriptionPhoto;

// Обработчик события при нажатии клавиши Esc;
const onFormEscKeydown = (evt) => {
  if (isEscEvent(evt) && !hasFocusedElements()) {
    closeForm();
    document.removeEventListener('keydown', onFormEscKeydown);
    HashtagPhotoAddHandler.removeEventListener('input', setTagValidation);
    controlSmaller.removeEventListener('click', onZoomImage);
    controlBigger.removeEventListener('click', onZoomImage);
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

// Функция отправки данных с формы на сервер
const setPictureFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    fetchData(
      'https://23.javascript.pages.academy/kekstagram',
      'POST',
      () => {
        onSuccess();
        openMessageForm('success');
      },
      () => {
        closeForm();
        openMessageForm('error');
      },
      new FormData(evt.target),
    );
  });
};

// Функция открытия формы с загруженным изображением;
const openForm = () => {
  formUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  HashtagPhotoAddHandler.addEventListener('input', setTagValidation);
  scaleControl.value = MAX_SCALE_VALUE;
  sliderBlock.classList.add('hidden');
  controlSmaller.addEventListener('click', onZoomImage);
  controlBigger.addEventListener('click', onZoomImage);
  effectsList.addEventListener('change', onApplyFilter);
  loadPhotoPreview();
  setPictureFormSubmit(closeForm);
};

// Закрытие окна при клике на кнопку "Close";
buttonCloseForm.addEventListener('click', () => {
  closeForm();
  document.removeEventListener('keydown', onFormEscKeydown);
  HashtagPhotoAddHandler.removeEventListener('input', setTagValidation);
  controlSmaller.removeEventListener('click', onZoomImage);
  controlBigger.removeEventListener('click', onZoomImage);
  effectsList.removeEventListener('change', onApplyFilter);
});

buttonUpload.addEventListener('change', () => {
  openForm();
});
