const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // Teste se productDetails é uma função.
    const object = productDetails('Alcool gel', 'Máscara');
    // Teste se o retorno da função é um array.
    expect(typeof object).toEqual('object');
    // Teste se o array retornado pela função contém dois itens dentro.
    const items = object.length;
    expect(items).toEqual(2);
    // Teste se os dois itens dentro do array retornado pela função são objetos.
    const objetcOne = object[0];
    const objectTwo = object[1];
    expect(typeof objetcOne).toEqual('object');
    expect(typeof objectTwo).toEqual('object');
    // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.
    let check = false;
    if (objetcOne !== object[1]) {
      check = true;
    }
    expect(check).toEqual(true);
    // Teste se os dois productIds terminam com 123.
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object - 1a parte tirada do site
    const valueProductIdOne = objetcOne.details.productId;
    const valueProductIdTwo = objectTwo.details.productId;
    // https://pt.stackoverflow.com/questions/3021/como-posso-checar-se-uma-string-contém-outra-em-javascript - 2a parte tirada desse site
    const resultOne = valueProductIdOne.indexOf('123') > -1;
    const resultTwo = valueProductIdTwo.indexOf('123') > -1;
    let checkCondition = false;
    if (resultOne === true && resultTwo === true) {
      checkCondition = true;
    }
    expect(checkCondition).toEqual(true);
  });
});
