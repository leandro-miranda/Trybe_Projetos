const URL = 'https://economia.awesomeapi.com.br/json/all';

async function getApi() {
  const response = await fetch(URL);
  const result = await response.json();
  delete result.USDT;
  return result;
}

export default getApi;
