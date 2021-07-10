//Наложение эффектов на изображение.

const photoPreview = document.querySelector('.img-upload__preview').querySelector('img');
const sliderBlock = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__slider');
const valueEffect = document.querySelector('.effect-level__value');

const filters = {
  chrome: {
    minRangeSlider: 0,
    maxRangeSlider: 1,
    stepSlider: 0.1,
    startSlider: 1,
    filter: 'grayscale',
  },
  sepia: {
    minRangeSlider: 0,
    maxRangeSlider: 1,
    stepSlider: 0.1,
    startSlider: 1,
    filter: 'sepia',
  },
  marvin: {
    minRangeSlider: 0,
    maxRangeSlider: 100,
    stepSlider: 1,
    startSlider: 100,
    filter: 'invert',
  },
  phobos: {
    minRangeSlider: 0,
    maxRangeSlider: 3,
    stepSlider: 0.1,
    startSlider: 3,
    filter: 'blur',
  },
  heat: {
    minRangeSlider: 1,
    maxRangeSlider: 3,
    stepSlider: 0.1,
    startSlider: 3,
    filter: 'brightness',
  },
  none: {
    minRangeSlider: 0,
    maxRangeSlider: 1,
    stepSlider: 0.1,
    startSlider: 1,
    filter: '',
  },

};

const getEffectLevel = (name, value) => {
  switch (name) {
    case 'chrome':
      return `${filters[name].filter}(${value})`;
    case 'sepia':
      return  `${filters[name].filter}(${value})`;
    case 'marvin':
      return  `${filters[name].filter}(${value}%)`;
    case 'phobos':
      return  `${filters[name].filter}(${value}px)`;
    case 'heat':
      return `${filters[name].filter}(${value})`;
    case 'none':
      return 'none';
  }
};

// Подключаем слайдер на страницу формы;
noUiSlider.create(effectLevel, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const updateSliderSettings = (nameFilter) => {
  effectLevel.noUiSlider.updateOptions({
    range: {
      min: nameFilter.minRangeSlider,
      max: nameFilter.maxRangeSlider,
    },
    step: nameFilter.stepSlider,
    start: nameFilter.startSlider,
  });
};

const applyFilterToImage = (filterName) => {
  const effectClass = `effects__preview--${filterName}`;
  photoPreview.className = '';
  photoPreview.classList.add(effectClass);
  sliderBlock.classList.toggle('hidden', filterName === 'none');
};

const onFilterClick = (evt) => {
  const effectName = evt.target.value;
  applyFilterToImage(effectName);
  updateSliderSettings(filters[effectName]);
  effectLevel.noUiSlider.on('update', (value, handle) => {
    const valueSlider = value[handle];
    valueEffect.value = valueSlider;
    photoPreview.style.filter = getEffectLevel(effectName, valueSlider);
  });
};

export {onFilterClick};
