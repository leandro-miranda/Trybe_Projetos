// Desafio 11
function generatePhoneNumber(arrayNumbers) {
  let counts = {};

  for (let i = 0; i < arrayNumbers.length; i += 1) {
    if (counts[arrayNumbers[i]]) {
      counts[arrayNumbers[i]] += 1;
    } else {
      counts[arrayNumbers[i]] = 1;
    }
  }
  for (let prop in counts) {
    if (counts[prop] >= 3) {
      return "não é possível gerar um número de telefone com esses valores";
    }
  }
  if (arrayNumbers.length !== 11) {
    return "Array com tamanho incorreto.";
  }
  for (let i = 0; i < arrayNumbers.length; i += 1) {
    if (arrayNumbers[i] < 0 || arrayNumbers[i] > 9) {
      return "não é possível gerar um número de telefone com esses valores";
    }
  }

  const prefix = arrayNumbers.slice(0, 2).join("");
  const firstNumbers = arrayNumbers.slice(2, 7).join("");
  const secondNumbers = arrayNumbers.slice(7).join("");
  return `(${prefix}) ${firstNumbers}-${secondNumbers}`;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (
    lineA > Math.abs(lineB - lineC) &&
    lineB > Math.abs(lineA - lineC) &&
    lineC > Math.abs(lineA - lineB)
  ) {
    return true;
  }
  return false;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (
    lineA > Math.abs(lineB - lineC) &&
    lineB > Math.abs(lineA - lineC) &&
    lineC > Math.abs(lineA - lineB)
  ) {
    return true;
  }
  return false;
}

// Desafio 13
function hydrate(drinks) {
  // material visto no site https://www.w3schools.com

  let regex = /\d+/g;
  let numbers = drinks.match(regex);
  let count = 0;

  for (let number of numbers) {
    count += parseInt(number);
  }
  if (count === 1) {
    return `${count} copo de água`;
  }
  return `${count} copos de água`;
}

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
