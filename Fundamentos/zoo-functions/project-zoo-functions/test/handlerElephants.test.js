const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  const nameArray = ['Ilana', 'Orval', 'Bea', 'Jefferson'];
  const availabilityArray = ['Friday', 'Saturday', 'Sunday', 'Tuesday'];
  describe('Verifica se não passar argumento a função retorna undefined', () => {
    expect(handlerElephants()).toEqual(undefined);
  });

  it('Verifica se passado argumento para count retorna um número inteiro', () => {
    expect(handlerElephants('count')).toEqual(4);
  });

  it('Verifica se passada uma string que não contempla uma funcionalidade retorna null', () => {
    expect(handlerElephants('elephants')).toEqual(null);
  });

  it('Verifica se passado um objeto vazio retorna mensagem de erro', () => {
    expect(handlerElephants({})).toEqual('Parâmetro inválido, é necessário uma string');
  });

  it('Verifica se passado o argumento para names retorna um array de nomes', () => {
    expect(handlerElephants('names')).toEqual(nameArray);
  });

  it('Verifica se passado averageAge retorna um número proximo a 10.5', () => {
    expect(handlerElephants('averageAge')).toEqual(10.5);
  });

  it('Verifica se o argumento location retorna NW', () => {
    expect(handlerElephants('location')).toEqual('NW');
  });

  it('Verifica se o argumento popularity retorna número igual ou maior que 5', () => {
    expect(handlerElephants('popularity')).toEqual(5);
  });

  it('Verifica se o argumento availability retorna um array sem Monday', () => {
    expect(handlerElephants('availability')).toEqual(availabilityArray);
  });
});
