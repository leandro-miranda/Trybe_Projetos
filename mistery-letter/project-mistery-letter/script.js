const createButton = document.getElementById('criar-carta');
const letterText = document.getElementById('carta-texto');
const generatedLetter = document.getElementById('carta-gerada');
const accountantLetter = document.getElementById('carta-contador');

function allRandomClasses(spanClass) {
  const shapeClass = ['newspaper', 'magazine1', 'magazine2'];
  const sizeClass = ['medium', 'big', 'reallybig'];
  const rotationClass = ['rotateleft', 'rotateright'];
  const slopeClass = ['skewleft', 'skewright'];

  spanClass.classList.add(shapeClass[randomNumber(shapeClass.length)]);
  spanClass.classList.add(sizeClass[randomNumber(sizeClass.length)]);
  spanClass.classList.add(rotationClass[randomNumber(rotationClass.length)]);
  spanClass.classList.add(slopeClass[randomNumber(slopeClass.length)]);
}

function randomNumber(number) {
  return Math.floor(Math.random() * number, 0);
}

function letter() {
  createButton.addEventListener('click', () => {
    generatedLetter.innerHTML = '';
    if (
      letterText.value === '' ||
      letterText.value === ' ' ||
      letterText.value === null
    ) {
      generatedLetter.innerText = 'Por favor, digite o conteúdo da carta.';
    } else {
      const string = letterText.value.split(' ');
      accountantLetter.innerText = `${string.length}`;
      for (let i = 0; i < string.length; i += 1) {
        const spanClass = document.createElement('span');
        spanClass.innerHTML = `${string[i]}`;
        spanClass.addEventListener('click', random);
        allRandomClasses(spanClass);
        generatedLetter.appendChild(spanClass);
      }
    }
  });
}
letter();

function random(event) {
  event.target.className = '';
  allRandomClasses(event.target);
}
