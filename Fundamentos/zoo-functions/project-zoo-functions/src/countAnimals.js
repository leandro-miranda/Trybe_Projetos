const { species } = require('../data/zoo_data');

function animals() {
  const obj = {};
  species.forEach(({ name, residents }) => {
    obj[name] = residents.length;
  });
  return obj;
}

function specieAnimal(animal) {
  const dataAnimal = species.find(({ name }) =>
    name === animal.specie).residents;
  if (animal.sex) {
    return dataAnimal.filter((resident) => animal.sex === resident.sex).length;
  }
  return dataAnimal.length;
}

function countAnimals(animal) {
  if (!animal) {
    return animals();
  }
  return specieAnimal(animal);
}

module.exports = countAnimals;
