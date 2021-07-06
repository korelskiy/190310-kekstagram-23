// Редактирование масштаба изображения;

const photoPreview = document.querySelector('.img-upload__preview').querySelector('img');
const scaleControl = document.querySelector('.scale__control--value');
const buttonZoomIn = document.querySelector('.scale__control--bigger');

const SCALE_STEP = 25;
const MAX_SCALE_VALUE = '100%';
const MIN_SCALE_VALUE = '25%';

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

export {onZoomImage, scaleControl, MAX_SCALE_VALUE};
