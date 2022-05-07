const agreeLabel = document.getElementById('label-infos');
const agree = document.getElementById('agreement');
const submit = document.getElementById('submit-btn');
const counterDisplay = document.getElementById('counter');
const textarea = document.getElementsByClassName('textareaBox')[0];
const family = document.querySelectorAll('.family');
const house = document.querySelector('#house');
const subject = document.querySelectorAll('.subject');
const nota = document.querySelectorAll('.nota');
const main = document.querySelector('.container');
const form = document.querySelector('#evaluation-form');
const image = document.getElementById('trybewarts-forms-logo');

submit.disabled = true;

function disabled() {
  console.log(submit.disabled);

  if (submit.disabled === true) {
    submit.disabled = false;
  } else if (submit.disabled === false) {
    submit.disabled = true;
  }
}

function counter() {
  const textareaContent = textarea.value;
  const textareaContentLength = textareaContent.length;

  counterDisplay.innerHTML = 500 - textareaContentLength;
}

agree.addEventListener('click', disabled);
agreeLabel.addEventListener('click', disabled);
textarea.addEventListener('input', counter);

function valueInputs() {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const clickButton = document.getElementById('enter');

  clickButton.addEventListener('click', () => {
    if (
      emailInput.value === 'tryber@teste.com'
      && passwordInput.value === '123456'
    ) {
      alert('Olá, Tryber!');
    } else {
      alert('Email ou senha inválidos.');
    }
  });
}
valueInputs();

function removeSelected() {
  for (let index = 0; index < family.length; index += 1) {
    family[index].classList.remove('selectedFamily');
  }
}
function removeSelectedNota() {
  for (let index = 0; index < nota.length; index += 1) {
    nota[index].classList.remove('selectedNota');
  }
}

function selectFamilyHouse() {
  for (let index = 0; index < family.length; index += 1) {
    family[index].addEventListener('click', (event) => {
      removeSelected();
      event.target.classList.add('selectedFamily');
    });
  }
}
selectFamilyHouse();

function selectNotas() {
  for (let index = 0; index < nota.length; index += 1) {
    nota[index].addEventListener('click', (event) => {
      removeSelectedNota();
      event.target.classList.add('selectedNota');
    });
  }
}
selectNotas();

function selectSubjects() {
  for (let index = 0; index < subject.length; index += 1) {
    subject[index].addEventListener('click', (event) => {
      event.target.classList.toggle('selectedSubject');
    });
  }
  house.addEventListener('change', () => {
    console.log(house.options[house.selectedIndex].text);
  });
}
selectSubjects();

const fullName = document.getElementById('input-name');
const lastName = document.getElementById('input-lastname');
const email = document.getElementById('input-email');
const comentario = document.getElementById('textarea');
const emailText = document.createElement('h2');
const nomeText = document.createElement('h2');
const familiaText = document.createElement('h2');
const casaText = document.createElement('h2');
const notaText = document.createElement('h2');
const subjectText = document.createElement('h2');
const newForm = document.createElement('form');
const comentarioText = document.createElement('h2');

function formRemove() {
  form.remove();
  image.remove();
}

function subjectValue(subjects) {
  for (let index = 0; index < subjects.length; index += 1) {
    subjectText.innerHTML += `${subjects[index].value}, `;
  }
}

function newFormData() {
  newForm.append(nomeText);
  newForm.append(emailText);
  newForm.append(casaText);
  newForm.append(familiaText);
  newForm.append(subjectText);
  newForm.append(notaText);
  newForm.append(comentarioText);
}

function submitFunction() {
  const familia = document.querySelector('.selectedFamily');
  const notas = document.querySelector('.selectedNota');
  const subjects = document.querySelectorAll('.selectedSubject');
  const casa = house.options[house.selectedIndex].text;
  emailText.innerHTML = `Email: ${email.value}`;
  nomeText.innerHTML = `Nome: ${fullName.value} ${lastName.value}`;
  familiaText.innerHTML = `Família: ${familia.value}`;
  casaText.innerHTML = `Casa: ${casa}`;
  notaText.innerHTML = `Avaliação: ${notas.value}`;
  subjectText.innerHTML = 'Matérias: ';
  subjectValue(subjects);
  comentarioText.innerHTML = `Observações: ${comentario.value}`;
  formRemove();
  newForm.setAttribute('id', 'evaluation-form');
  main.appendChild(newForm);
  newFormData();
}
submit.addEventListener('click', submitFunction);
