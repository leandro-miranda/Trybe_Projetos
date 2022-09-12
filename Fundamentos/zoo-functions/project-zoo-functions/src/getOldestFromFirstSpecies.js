const data = require('../data/zoo_data');
const { employees } = require('../data/zoo_data');
const { species } = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const firstAnimal = employees
    .find((element) => element.id === id).responsibleFor[0];

  const residentsAnimal = species
    .find((element) => element.id === firstAnimal).residents;

  const oldestAnimalData = residentsAnimal.sort((a, b) => b.age - a.age);

  return Object.values(oldestAnimalData[0]);
}

module.exports = getOldestFromFirstSpecies;
