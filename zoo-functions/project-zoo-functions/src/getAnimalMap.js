const data = require('../data/zoo_data');
const { species } = require('../data/zoo_data');

// function getSpeciesAll() {
//   const specie = species.reduce((acc, { name, location }) => ({
//     ...acc,
//     [location]: [...(acc[location] || []), name],
//   }), {});
//   return specie;
// }
// // console.log(getSpeciesAll());

// function speciesResidents(specieNames, specieSorted, speciesex) {
//   const nameResidents = (includeNames, sorted, sex) => {
//     if (sex && sorted) {
//       return species
//         .filter(({ sex: speciesSex }) => sex === speciesSex)
//         .map(({ name }) => name).sorte();
//     }
//     if (sorted) return species.map(({ name }) => name).sort();
//     if (sex) {
//       return includeNames
//         .filter(({ sex: speciesSex }) => sex === speciesSex)
//         .map(({ name }) => name);
//     }
//     return includeNames.map(({ name }) => name);
//   };
//   return nameResidents;
// }
// // console.log(speciesResidents());
function getAnimalMap(options) {
  // seu código aqui
}

module.exports = getAnimalMap;
