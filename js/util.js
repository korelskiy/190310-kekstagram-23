const ALERT_SHOW_TIME = 5000;

// Функция сообщения с ошибкой на 5 секунд;
// Пока оставил так, как показывали в демке
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandomNumber(min, max) {
  return (max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : null;
}
getRandomNumber(0, 100);

// Функция, возвращающая случайный номер элемента из переданного массива.

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

// Функция для проверки максимальной длины строки.
// Из ТЗ: "Максимальная длина одного хэш-тега 20 символов, включая решётку".

const LINE_TEXT = 'Текст строки для проверки';
const MAX_LENGTH = 20;

function checkStringLength(line, maxLength) {
  return line.length <= maxLength;
}
checkStringLength(LINE_TEXT, MAX_LENGTH);

// Событие нажатия клавиши Esc
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Функция  устранения дребезга
function debounce (callback, timeoutDelay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, timeoutDelay);
  };
}


export {getRandomNumber, getRandomArrayElement, isEscEvent, showAlert, debounce};

