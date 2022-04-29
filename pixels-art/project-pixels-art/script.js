// cores sortidas
function colors() {
  const color = Math.floor(Math.random() * 255);
  return color;
}

// criando 4 paletas de cores com id color-palette, 4 cores distintas, adicionando a classe color e definindo a borda
function div() {
  const array = ['black'];
  for (let i = 1; i < 4; i += 1) {
    array.push(`rgb(${colors()}, ${colors()}, ${colors()})`);
  }
  const divColor = document.createElement('div');
  divColor.id = 'color-palette';
  document.body.appendChild(divColor);
  for (let i = 0; i < 4; i += 1) {
    const divSon = document.createElement('div');
    divSon.className = 'color';
    divSon.style.border = '1px solid black';
    divSon.style.backgroundColor = array[i];
    divColor.appendChild(divSon);
  }
}
div();

//  Adicione à página um quadro de pixels, com 25 pixels, classe pixel e background-color branco
let box = 5;
function boxCreate() {
  const div2 = document.createElement('div');
  const sizeBox = 42 * box;
  div2.id = 'pixel-board';
  div2.style.width = `${sizeBox}px`;
  div2.style.height = `${sizeBox}px`;
  document.body.appendChild(div2);
  for (let i = 0; i < box ** 2; i += 1) {
    const div3 = document.createElement('div');
    div3.className = 'pixel';
    div3.style.backgroundColor = 'white';
    div2.appendChild(div3);
  }
}
boxCreate();

// adicionando a classe selected na cor BLACK
let childFirst = document.querySelector('.color');
childFirst.classList.add('selected');

// Clicar em uma das cores da paleta faz com que ela seja selecionada e utilizada para preencher os pixels no quadro.
function addRemoveSelected() {
  const boxColor = document.querySelectorAll('.color');
  for (let i = 0; i < boxColor.length; i += 1) {
    boxColor[i].addEventListener('click', function (event) {
      childFirst.classList.remove('selected');
      event.target.classList.add('selected');
      childFirst = event.target;
    });
  }
}
addRemoveSelected();

// Clicar em um pixel dentro do quadro após selecionar uma cor na paleta faz com que o pixel seja preenchido com a cor selecionada.
function selectBoxPixel() {
  const boxPixel = document.querySelectorAll('.pixel');
  for (let i = 0; i < boxPixel.length; i += 1) {
    boxPixel[i].addEventListener('click', function (event) {
      const selectedColor = childFirst.style.backgroundColor;
      const eventos = event.target;
      eventos.style.backgroundColor = selectedColor;
    });
  }
}
selectBoxPixel();

// Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos seus pixels com branco.
function createBotton() {
  const boxPixel = document.querySelectorAll('.pixel');
  const button = document.createElement('button');
  button.id = 'clear-board';
  button.innerText = 'Limpar';
  document.body.insertBefore(button, document.querySelector('#pixel-board')); // https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore

  button.addEventListener('click', function () {
    for (let i = 0; i < boxPixel.length; i += 1) {
      boxPixel[i].style.backgroundColor = 'white';
    }
  });
}
createBotton();

// Faça o quadro de pixels ter seu tamanho definido pela pessoa usuária e limite o tamanho mínimo e máximo do board.
const div4 = document.createElement('div');
div4.id = 'button-input';
document.body.insertBefore(div4, document.querySelector('#clear-board'));

const input1 = document.createElement('input');
input1.placeholder = 'Tamanho'; // https://www.w3schools.com/jsref/prop_text_placeholder.asp
input1.id = 'board-size';
input1.type = 'number';
input1.min = '1';
div4.appendChild(input1);

let button = document.createElement('button');
button.id = 'generate-board';
button.innerText = 'VQV';
div4.appendChild(button);

function input2() {
  button.addEventListener('click', function () {
    let inputNumber = input1.value;
    if (inputNumber === '') {
      alert('Board inválido!');
      return;
    }
    if (inputNumber < 5) {
      inputNumber = 5;
    }
    if (inputNumber >= 50) {
      inputNumber = 50;
    }
    box = inputNumber;
    document.body.removeChild(document.querySelector('#pixel-board'));
    boxCreate();
    selectBoxPixel();
  });
}
input2();
