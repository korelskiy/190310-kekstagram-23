const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      onFail('Не удалось получить данные с сервера! Попробуйте обновить страницу.');
    })
    .then((response) => response.json())
    .then((picturesData) => {
      onSuccess(picturesData);
    })
    .catch(() => {
      onFail('Не удалось получить данные с сервера! Попробуйте обновить страницу.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

// Вот тут я не знаю как отрефакторить код так, чтобы была одна функция запроса и отправки данных на сервер
/*
const sendRequest = (url, method, onSuccess, onFail, body) => {
  fetch(
    url,
    {
      method: method,
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
*/
export {getData, sendData};
