const { employees } = require('../data/zoo_data');

function isManager(id) {
  return employees.some((employee) => employee.managers.some((manager) => id === manager));
}

function getRelatedEmployees(managerId) {
  if (isManager(managerId)) {
    const managers = employees.filter((employee) => employee.managers.includes(managerId));
    return managers.map(({ firstName, lastName }) =>
      `${firstName} ${lastName}`);
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };
