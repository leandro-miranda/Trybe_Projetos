const inputText = document.getElementById('text-input');
const memeText = document.getElementById('meme-text');
const memeImage = document.getElementById('meme-image');
const imageInput = document.getElementById('meme-insert');
const containerImage = document.getElementById('meme-image-container');
const memesSection = document.querySelector('.memes');
const fire = document.getElementById('fire');
const water = document.getElementById('water');
const earth = document.getElementById('earth');

function inputTextMeme() {
  inputText.addEventListener('keyup', () => {
    memeText.innerText = inputText.value;
  });
}
inputTextMeme();

// https://developer.mozilla.org/pt-BR/docs/Web/API/URL/createObjectURL
function inputMemeImage() {
  imageInput.addEventListener('change', (event) => {
    memeImage.src = URL.createObjectURL(event.target.files[0]);
  });
}
inputTextMeme();

memesSection.addEventListener('click', (event) => {
  const image = event.target.src;
  memeImage.src = image;
});

fire.addEventListener('click', () => {
  containerImage.style.borderColor = 'red';
  containerImage.style.borderStyle = 'dashed';
  containerImage.style.borderWidth = '3px';
});

water.addEventListener('click', () => {
  containerImage.style.borderColor = 'blue';
  containerImage.style.borderStyle = 'double';
  containerImage.style.borderWidth = '5px';
});

earth.addEventListener('click', () => {
  containerImage.style.borderColor = 'green';
  containerImage.style.borderStyle = 'groove';
  containerImage.style.borderWidth = '6px';
});
