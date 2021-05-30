// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandomNumber(min, max) {
  if (max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return null;
}
getRandomNumber(0, 100);

// Функция для проверки максимальной длины строки.
// Из ТЗ: "Максимальная длина одного хэш-тега 20 символов, включая решётку".

const LINE_TEXT = 'Текст строки для проверки';
const MAX_LENGTH = 20;

function checkStringLength(line, maxLength) {
  return (line.length <= maxLength);
}
checkStringLength(LINE_TEXT, MAX_LENGTH);
