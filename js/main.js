// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRandomNumber(min, max) {
  return (max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : null;
}
getRandomNumber(0, 100);

// Функция для проверки максимальной длины строки.
// Из ТЗ: "Максимальная длина одного хэш-тега 20 символов, включая решётку".

const LINE_TEXT = 'Текст строки для проверки';
const MAX_LENGTH = 20;

function checkStringLength(line, maxLength) {
  return line.length <= maxLength;
}
checkStringLength(LINE_TEXT, MAX_LENGTH);

// Генерация данных

const DESCRIPTION_PHOTO_COUNT = 25;

const MIN_URL_NUMBER = 1;
const MAX_URL_NUMBER = 25;

const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;

const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

const DESCRIPTIONS = [
  'Фотография серого кота',
  'Фотография белого кота',
  'Фотография рыжего кота',
  'Фотография черного кота',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const MESSAGES = [
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createDescriptionPhoto = (elem, index) => ({
  id: index + 1,
  url: `photos/${  getRandomNumber(MIN_URL_NUMBER, MAX_URL_NUMBER)  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
  comments: [
    {
      id: index + 1,
      avatar: `img/avatar${  getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)  }.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    },
  ],
});


const customPhoto = new Array(DESCRIPTION_PHOTO_COUNT).fill(null).map(createDescriptionPhoto);
