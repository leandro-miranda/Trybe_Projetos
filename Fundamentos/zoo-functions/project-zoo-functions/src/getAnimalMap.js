const data = require('../data/zoo_data');
const { species } = require('../data/zoo_data');

function getSpeciesAll() {
  const speciesAll = {};
  species.forEach((specie) => {
    if (!speciesAll[specie.location]) speciesAll[specie.location] = [];
    speciesAll[specie.location].push(specie.name);
  });
  return speciesAll;
}

function returnSpeciesAll(sorted, sex) {
  const includ = {};
  species.forEach((specie) => {
    if (!includ[specie.location]) includ[specie.location] = [];
    let residents = [...specie.residents];
    if (sex) residents = residents.filter((specieSex) => specieSex.sex === sex);
    residents = residents.map((resident) => resident.name);
    if (sorted) residents.sort();

    includ[specie.location].push({ [specie.name]: residents });
  });
  return includ;
}

function getAnimalMap(options) {
  if (!options) return getSpeciesAll();
  const { includeNames, sorted, sex } = options;
  if (includeNames) return returnSpeciesAll(sorted, sex);
  return getSpeciesAll();
}

module.exports = getAnimalMap;
