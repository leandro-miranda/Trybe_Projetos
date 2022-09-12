const { species } = require('../data/zoo_data');
// console.log(data);

// o map retorna um array, caso não tenha nada ele retorna um array vazio,
// e o find vai verificar se o id é === element, caso seja ele da um push pra,
// dentro do array
function getSpeciesByIds(...ids) {
  const arrayId = ids;
  return arrayId.map((element) => species.find(({ id }) => id === element));
}

module.exports = getSpeciesByIds;
