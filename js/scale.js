// Редактирование масштаба изображения;

import {photoPreview} from './form.js';

const scaleValue = document.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MAX_SCALE_VALUE = '100%';
const MIN_SCALE_VALUE = '25%';


// Функция уменьшить масштаб изображения;
const zoomOut = () => {
  if (scaleValue.value !== MIN_SCALE_VALUE) {
    let currentValue = parseInt(scaleValue.value, 10);
    currentValue -= SCALE_STEP;
    scaleValue.value = `${currentValue}%`;
    photoPreview.style.transform = `scale(${currentValue / 100})`;
  }
};

// Функция увеличить масштаб изображения;
const zoomIn = () => {
  if (scaleValue.value !== MAX_SCALE_VALUE) {
    let currentValue = parseInt(scaleValue.value, 10);
    currentValue += SCALE_STEP;
    scaleValue.value = `${currentValue}%`;
    photoPreview.style.transform = `scale(${currentValue / 100})`;
  }
};

export {zoomOut, zoomIn, scaleValue, MAX_SCALE_VALUE};
