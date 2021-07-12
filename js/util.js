// Вспомогательные функции.

const ALERT_SHOW_TIME = 5000;

// Функция сообщения с ошибкой на 5 секунд;
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

// Функция, возвращающая случайное целое число из переданного диапазона включительно;
const getRandomNumber = (min, max) => (max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : null;

// Событие нажатия клавиши Esc;
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Функция устранения дребезга;
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, isEscEvent, showAlert, debounce};

