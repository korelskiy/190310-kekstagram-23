// Генерация данных
import {getRandomNumber, getRandomArrayElement} from './util.js';

const DESCRIPTION_PHOTO_COUNT = 26;

const MIN_URL_NUMBER = 1;
const MAX_URL_NUMBER = 25;

const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;

const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 15;


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

const createCommentsPhoto = (elem, index) => ({
  id: index + 1,
  avatar: `img/avatar-${getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (elem, index) => ({
  id: index + 1,
  url: `photos/${getRandomNumber(MIN_URL_NUMBER, MAX_URL_NUMBER)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
  comments: new Array(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS)).fill(null).map(createCommentsPhoto),
});

const customPhotos = new Array(DESCRIPTION_PHOTO_COUNT).fill(null).map(createPhoto);

export {customPhotos};
