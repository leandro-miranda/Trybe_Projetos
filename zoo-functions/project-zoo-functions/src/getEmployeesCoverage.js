const data = require('../data/zoo_data');
const { employees } = require('../data/zoo_data');
const { species } = require('../data/zoo_data');

function getPerson(contributorData) {
  const person = employees
    .find(({ id, firstName, lastName }) => id === contributorData.id
      || firstName === contributorData.name
      || lastName === contributorData.name);
  return person;
}

function getSpecies(contributorData) {
  const specieAnimal = getPerson(contributorData).responsibleFor;
  return species.filter(({ id }) => specieAnimal.includes(id));
}

function collaboratingPersonData(object) {
  const specie = getSpecies(object);
  const obj = {
    id: getPerson(object).id,
    fullName: `${getPerson(object).firstName} ${getPerson(object).lastName}`,
    species: specie.map((element) => element.name),
    locations: specie.map((element) => element.location),
  };
  return obj;
}

function getEmployeesCoverage(object) {
  if (object === undefined) {
    return employees.map((element) => collaboratingPersonData(element));
  }
  if (!getPerson(object)) {
    throw new Error('Informações inválidas');
  }
  return collaboratingPersonData(object);
}

module.exports = getEmployeesCoverage;
