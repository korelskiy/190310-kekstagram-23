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

export {getRandomNumber, getRandomArrayElement};
