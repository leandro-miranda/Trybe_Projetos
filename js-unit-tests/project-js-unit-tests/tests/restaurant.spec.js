const createMenu = require('../src/restaurant');
 
/*
  Você é responsável por escrever o código do sistema de pedidos de um restaurante através do qual será possível
  cadastrar um menu. Dado que um menu foi cadastrado, o sistema deve disponibilizar um objeto que permite:

  - Ler o menu cadastrado;
  - Fazer pedidos;
  - Verificar o que foi pedido;
  - Somar o valor da conta.

  A estrutura deste código e deste objeto já está definida e você precisa implementá-la.
  Abaixo você verá uma série de testes e passos que irão guiar você e, que devem NECESSARIAMENTE ser realizados em ordem para o bom desenvolvimento do sistema.

  Desenvolvimento:
  - Uma função: 
    createMenu()
  - Recebe um parâmetro que é um objeto, o menu:
    Exemplo: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }.

  A função createMenu() então, retornará um novo objeto. Este novo objeto contém algumas chaves e ao acessar cada uma delas temos os seguintes retornos:

  - Uma chave `fetchMenu` retornando o menu, que nada mais é que o objeto passado como parâmetro para createMenu()

    Exemplo:
    const meuRestaurante = createMenu({
      food: {'coxinha': 3.90, 'sanduiche', 9.90},
      drinks: {'agua': 3.90, 'cerveja': 6.90}
    });

    meuRestaurante.fetchMenu() // Retorno: Menu acima

  - Uma chave `consumption` armazenando um array de strings. Cada string é a chave de um pedido.
    Exemplo: ['coxinha', 'cerveja']

  - Uma chave `order` armazenando uma função. Essa função recebe uma string como parâmetro e essa string deve ser adicionada à lista armazenada em `consumption`.

  - Uma chave `pay` que, quando chamada, invoca uma função. Essa função faz a soma do preço de todos os pedidos, retornando essa soma de preços com acréscimo de 10%.

  Comportamento:
    const meuRestaurante = createMenu({ food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} })

    meuRestaurante.fetchMenu() // Retorno: { food: {'coxinha': 3.9, 'sopa': 9.9}, drink: {'agua': 3.9, 'cerveja': 6.9} }

    meuRestaurante.order('coxinha') // Retorno: undefined

    meuRestaurante.consumption // Retorno: ['coxinha']

    meuRestaurante.pay() // Retorno: 4.29

  IMPORTANTE: FAÇA OS TESTES E PASSOS DE ACORDO COM A SEQUÊNCIA INDICADA NO README DO PROJETO!

*/
describe('10 - Implemente os casos de teste e a função `createMenu`', () => {
  describe('Verifica se a função `createMenu` tem o comportamento esperado', () => {
    const objetoRetornado = createMenu({ food: {}, drink: {} });
    const arrayItems = objetoRetornado.fetchMenu();
    const obj = {
      food: { 'coxinha': 3.9, 'sopa': 9.9 },
      drink: { 'agua': 3.9, 'cerveja': 6.9 }
    };

    it('TESTE 1: Verifique se função `createMenu()` retorna um objeto que possui a chave`fetchMenu`, a qual tem como valor uma função', () => {
      expect(typeof objetoRetornado).toEqual('object');
      expect(typeof objetoRetornado.fetchMenu).toEqual('function');
      expect(typeof objetoRetornado.order).toEqual('function');
      expect(typeof objetoRetornado.pay).toEqual('function');
    });

    it(`TESTE 2: Verifique se 'objetoRetornado.fetchMenu()' retorna um objeto cujas chaves são somente 'food' e 'drink'`, () => {
      expect(typeof arrayItems).toEqual('object');
      const keyMenus = Object.keys(arrayItems);
      let checkKeys = false;
      if (keyMenus[0] === ('food') && keyMenus[1] === ('drink')) {
        checkKeys = true;
      }
      expect(checkKeys).toEqual(true);
    });

    it(`TESTE 3: Verifique se o menu passado pra função createMenu() é idêntico ao menu recuperado pela função 'objetoRetornado.fetchMenu()'`, () => {
      expect({ food: {}, drink: {} }).toEqual(arrayItems);
    });

    it(`TESTE 4: Verifique se 'objetoRetornado.consumption', após a criação do menu, retorna um array vazio.`, () => {
      const objRetornado = createMenu(obj);
      expect(objRetornado.consumption).toEqual([]);
    });

    it(`
    TESTE 5: Verifique se, ao chamar uma função associada à chave 'order' no objeto retornado,
    passando uma string como parâmetro (como 'objetoRetornado.order('coxinha')'), tal string é adicionada
    ao array retornado em 'objetoRetornado.consumption'.`, () => {
      const objetoRetornado = createMenu(obj);
      objetoRetornado.order("coxinha");
      expect(objetoRetornado.consumption).toEqual(['coxinha']);
    });

    it(`TESTE 6: Verifique se, ao adicionar três pedidos, dentre bebidas e comidas, o array 'objetoRetornado.consumption' contém os itens pedidos.`, () => {
      const objetoRetornado = createMenu(obj)
      objetoRetornado.order("coxinha");
      objetoRetornado.order("agua");
      objetoRetornado.order("sopa");
      objetoRetornado.order("sashimi");
      expect(objetoRetornado.consumption).toEqual(["coxinha", "agua", "sopa", "sashimi"]);
    });

    it(`TESTE 7: Verifique se a função 'order' aceita que pedidos repetidos sejam acrescidos a 'consumption'.`, () => {
      const objetoRetornado = createMenu(obj);
      objetoRetornado.order('coxinha');
      objetoRetornado.order('agua');
      objetoRetornado.order('coxinha');
      expect(objetoRetornado.consumption).toEqual(['coxinha', 'agua', 'coxinha']);
    });

    it(`TESTE 8: Verifique se, ao chamar 'objetoRetornado.pay()', retorna-se a soma dos preços de tudo que foi pedido, conforme registrado em 'objetoRetornado.consumption'`, () => {
      const objetoRetornado = createMenu(obj);
      objetoRetornado.order('coxinha');
      objetoRetornado.order('agua');
      objetoRetornado.order('coxinha');
      expect(objetoRetornado.pay()).toEqual(12.87);
    });
  });
});
