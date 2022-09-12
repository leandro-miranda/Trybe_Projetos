require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('3 - Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('4 - Com o argumento "MLB1615760527", a função fetch é chamada', async () => {
    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalled;
  });

  it('5 - Com o argumeno "MLB1615760527", a função fetch deve chamar o endpoint correto', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('6 - Deve retornar um objeto com as propriedades esperadas', async () => {
    const response = await fetchItem('MLB1615760527');

    expect(response).toEqual(item);
  });

  it('7 - Ao chamar a função sem argumento, retorna um error', async () => {
    const response = await fetchItem();

    expect(response).toEqual(new Error('You must provide an url'));
  })
});
