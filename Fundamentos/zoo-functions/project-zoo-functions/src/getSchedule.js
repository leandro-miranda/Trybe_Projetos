const data = require('../data/zoo_data');
const { species } = require('../data/zoo_data');
const { hours } = require('../data/zoo_data');

const arrayHours = Object.entries(hours);

function animalsWeek(animal) {
  return species.find((specie) => specie.name === animal).availability;
}

function availableTimes() {
  const obj = {};
  arrayHours.forEach((day) => {
    const { open, close } = day[1];
    Object.assign(obj, { // usado para copiar os valores de todas a propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto destino.
      [day[0]]: {
        officeHour: `Open from ${open}am until ${close}pm`,
        exhibition: species
          .filter(({ availability }) => availability
            .includes(day[0]))
          .map(({ name }) => name),
      },
    });
  });
  obj.Monday = { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' };
  return obj;
}

function dayOfTheWeek(day) {
  return { [day]: availableTimes()[day] };
}

function getSchedule(scheduleTarget) {
  const returnDay = (Object.keys(availableTimes()).includes(scheduleTarget));
  const animalDay = species.map(({ name }) => name).includes(scheduleTarget);

  if (returnDay) return dayOfTheWeek(scheduleTarget);
  if (animalDay) return animalsWeek(scheduleTarget);

  return availableTimes();
}
module.exports = getSchedule;
