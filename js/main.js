// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function intNumber(min, max) {
  if (max > min) {
    const NUMBER = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('Результат: целое число из диапазона от ' + min + ' до ' + max + ' равно: ' + NUMBER);
    return NUMBER;
  }
  console.log('Значение «до» меньше, чем значение «от», или равное ему!');
}
intNumber(0, 100);

// Функция для проверки максимальной длины строки.
// Из ТЗ: "Максимальная длина одного хэш-тега 20 символов, включая решётку".

let line = 'Текст строки для проверки';
const MAX_LENGTH = 20;

function getStringLength(line, MAX_LENGTH) {
  let lenLine = line.length;
  if (lenLine > MAX_LENGTH) {
    console.log('Длина строки превышает максимально допустимое значение: ' + MAX_LENGTH);
    return false;
  }
  console.log('Длина строки составляет: ' + lenLine);
  return true;
}
getStringLength(line, MAX_LENGTH);

