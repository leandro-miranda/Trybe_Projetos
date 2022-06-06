const { prices } = require('../data/zoo_data');

function countEntrants(entrants) {
  const senior = entrants.filter(({ age }) => age >= 50).length;

  const adult = entrants.filter(({ age }) => age >= 18 && age <= 49)
    .length;

  const child = entrants.filter(({ age }) => age >= 5 && age <= 17)
    .length;

  const ageGroup = { child, adult, senior };
  return ageGroup;
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  const calculate = countEntrants(entrants);

  return (calculate.child * prices.child)
    + (calculate.adult * prices.adult)
    + (calculate.senior * prices.senior);
}

module.exports = { calculateEntry, countEntrants };
