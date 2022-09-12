const random = document.getElementById('rgb-color');
const colorsBall = document.getElementsByClassName('ball');
const answer = document.getElementById('answer');
const selectingBall = document.querySelector('#balls');
const reset = document.getElementById('reset-game');
const scoreBoard = document.getElementById('score');

function colorsRandom() {
  const colors = Math.floor(Math.random() * 6, 0);
  for (let i = 0; i < 6; i += 1) {
    const color1 = parseInt(Math.random() * 255, 0);
    const color2 = parseInt(Math.random() * 255, 0);
    const color3 = parseInt(Math.random() * 255, 0);
    if (colors === i) {
      random.innerHTML = `rgb(${color1}, ${color2}, ${color3})`;
      colorsBall[
        i
      ].style.backgroundColor = `rgb(${color1}, ${color2}, ${color3})`;
    } else {
      colorsBall[
        i
      ].style.backgroundColor = `rgb(${color1}, ${color2}, ${color3})`;
    }
  }
}
colorsRandom();

window.onload = function colorAnswer() {
  answer.innerHTML = 'Escolha uma cor';
};

function checkTheColor() {
  scoreBoard.innerHTML = 0;
  let score = 0;
  selectingBall.addEventListener('click', (event) => {
    if (event.target.style.backgroundColor === random.innerHTML) {
      answer.innerHTML = 'Acertou!';
      score += 3;
      scoreBoard.innerHTML = score;
    } else {
      answer.innerHTML = 'Errou! Tente novamente!';
    }
  });
}
checkTheColor();

function restart() {
  reset.addEventListener('click', () => {
    colorsRandom();
    answer.innerHTML = 'Escolha uma cor';
  });
}
restart();
