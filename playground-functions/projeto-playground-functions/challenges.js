// Desafio 1
function compareTrue(value1, value2) {
  if (value1 > 0 && value2 > 0) {
    return true;
  }
  return false;
}
//console.log(compareTrue(2, -5));

// Desafio 2
function calcArea(base, height) {
  let area = (base * height) / 2;
  return area;
}
console.log(calcArea(51, 1));

// Desafio 3
function splitSentence(string) {
  return string.split(" ", 3);
}

//console.log(splitSentence('go Trybe'.split(' ', 3)));
//console.log(splitSentence('vamo que vamo'.split(' ', 3)));
//console.log(splitSentence('foguete'.split(' ', 3)));

// Desafio 4
function concatName(array) {
  return `${array[array.length - 1]}, ${array[0]}`;
}

//console.log(concatName(["Lucas", "Cassiano", "Ferraz", "Paolillo"]));
//console.log(concatName(['foguete', 'não', 'tem', 'ré']));
//console.log(concatName(['captain', 'my', 'captain']));

// Desafio 5
function footballPoints(wins, ties) {
  let pontos = wins * 3 + ties;

  return pontos;
}
//console.log(footballPoints(14, 8));
//console.log(footballPoints(1, 2));
//console.log(footballPoints(0, 0));

// Desafio 6
function highestCount(numbers) {
  let maior = numbers[0];
  let resultado = 1;
  for (let i = 1; i < numbers.length; i += 1) {
    if (numbers[i] === maior) {
      resultado += 1;
    } else if (numbers[i] > maior) {
      maior = numbers[i];
      resultado = 1;
    }
  }
  return resultado;
}
//console.log(highestCount([9, 1, 2, 3, 9, 5, 7]));
//console.log(highestCount([0, 4, 4, 4, 9, 2, 1]));
//console.log(highestCount([0, 0, 0]));

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  // pesquisado no site https://www.w3schools.com
  let distancia1 = Math.abs(cat1 - mouse);
  let distancia2 = Math.abs(cat2 - mouse);

  if (distancia1 === distancia2) {
    return "os gatos trombam e o rato foge";
  }
  if (distancia1 > distancia2) {
    return "cat2";
  }
  return "cat1";
}

// Desafio 8
function fizzBuzz(numbers) {
  let result = [];
  for (let i = 0; i < numbers.length; i += 1) {
    if (numbers[i] % 3 == 0 && numbers[i] % 5 == 0) {
      result.push("fizzBuzz");
    } else if (numbers[i] % 5 == 0) {
      result.push("buzz");
    } else if (numbers[i] % 3 == 0) {
      result.push("fizz");
    } else {
      result.push("bug!");
    }
  }
  return result;
}
//console.log(fizzBuzz([2, 15, 7, 9, 45]));

// Desafio 9
function encode(text1) {
  // pesquisado no site: https://developer.mozilla.org/pt-BR/
  text1 = text1.replace(/a/gi, "1");
  text1 = text1.replace(/e/gi, "2");
  text1 = text1.replace(/i/gi, "3");
  text1 = text1.replace(/o/gi, "4");
  text1 = text1.replace(/u/gi, "5");

  return text1;
}

function decode(text2) {
  text2 = text2.replace(/1/gi, "a");
  text2 = text2.replace(/2/gi, "e");
  text2 = text2.replace(/3/gi, "i");
  text2 = text2.replace(/4/gi, "o");
  text2 = text2.replace(/5/gi, "u");

  return text2;
}

// Desafio 10
function techList(array, name) {
  if (array.length === 0) {
    return "Vazio!";
  }
  let arraytech = [];
  let list = array.sort();

  for (let i = 0; i < array.length; i += 1) {
    arraytech.push({
      tech: list[i],
      name,
    });
  }
  return arraytech;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
