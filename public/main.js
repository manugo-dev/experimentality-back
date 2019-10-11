/* eslint-disable  */
const server = 'https://experimentality-back.herokuapp.com';

const generateQuote = async () => {
  const response = await axios({
    method: 'GET',
    url: `${server}/api/v1/generate-changing-life-quote`,
    params: {
      id: this.id,
    },
    data: {},
  }).catch(error => {
    throw new Error(error);
  });
  return response.data;
};

const getAllQuotes = async id => {
  const response = await axios({
    method: 'GET',
    url: `${server}/api/v1/all`,
    data: {},
  }).catch(error => {
    throw new Error(error);
  });
  return response.data;
};

const getQuote = async reference => {
  const response = await axios({
    method: 'GET',
    url: `${server}/api/v1/quote/${reference}`,
  }).catch(error => {
    toastr.error(error);
    throw new Error(error);
  });
  toastr.success('Quote obtained');
  return response.data;
};

const removeQuote = async reference => {
  if (!bearerToken) {
    toastr.error('Not authenticated');
    return;
  }
  axios({
    method: 'DELETE',
    url: `${server}/api/v1/remove-quote/${reference}`,
    headers: {
      Authorization: `bearer ${bearerToken}`,
    },
  })
    .then(data => {
      toastr.success(`Removed: ${data}`);
    })
    .catch(error => {
      toastr.error(error);
      throw new Error(error);
    });
};

const renderQuote = async data => {
  document.querySelector('.quote__id').innerText = `ID: ${data.id}`;
  document.querySelector('.quote__text').innerText = data.quote;
  document.querySelector('.quote__image').src = data.image;
};

const generateNewQuote = async () => {
  generateQuote().then(data => {
    renderQuote(data);
  });
};

const renderIdQuote = async id => {
  getQuote(id).then(data => {
    renderQuote(data);
  });
};

const toggleDiv = className =>
  document.querySelector(className).classList.toggle('showDiv');

this.window.onload = () => {
  generateQuote().then(data => {
    renderQuote(data);
    toggleDiv('.content__quote');
  });
};
