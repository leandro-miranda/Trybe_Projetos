const createButton = document.getElementById('criar-carta');
const letterText = document.getElementById('carta-texto');
const generatedLetter = document.getElementById('carta-gerada');
const accountantLetter = document.getElementById('carta-contador');

function allRandomClasses() {
  const allClasses = [
    'newspaper',
    'magazine1',
    'magazine2',
    'medium',
    'big',
    'reallybig',
    'rotateleft',
    'rotateright',
    'skewleft',
    'skewright',
  ];
  const randomClasses = Math.floor(Math.random() * allClasses.length, 0);
  return allClasses[randomClasses];
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
        spanClass.classList.add(allRandomClasses());
        generatedLetter.appendChild(spanClass);
      }
      //letterText.value = '';
    }
  });
}
letter();

function random(event) {
  event.target.className = '';
  event.target.classList.add(allRandomClasses());
}
