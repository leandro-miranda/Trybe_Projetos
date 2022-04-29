const buttonAddItem = document.getElementById('criar-tarefa');
const listItem = document.getElementById('lista-tarefas');
const input = document.getElementById('texto-tarefa');
const createButton = document.getElementById('apaga-tudo');
const removeFinished = document.getElementById('remover-finalizados');
const saveTasks = document.getElementById('salvar-tarefas');
const buttonRemove = document.getElementById('remover-selecionado');
const up = document.getElementById('mover-cima');
const down = document.getElementById('mover-baixo');

function buttonAdd() {
  buttonAddItem.addEventListener('click', () => {
    const list = document.createElement('li');
    listItem.appendChild(list);
    list.innerHTML = input.value;
    input.value = '';
  });
}
buttonAdd();

window.onload = function backgroundList() {
  let backgroundListColor = listItem.style.backgroundColor;
  backgroundListColor = 'white';
  sessionStorage.setItem('color', backgroundListColor);
};

function selectItem() {
  const list = document.getElementsByTagName('li');
  listItem.addEventListener('click', (event) => {
    const element = event;
    for (let i = 0; i < list.length; i += 1) {
      list[i].classList.remove('selecionado');
    }
    element.target.classList.add('selecionado');
  });
}
selectItem();

function doubleClick() {
  listItem.addEventListener('dblclick', (event) => {
    const element = event;
    element.target.classList.toggle('completed');
  }); // pesquisado no site https://www.w3schools.com/howto/howto_js_toggle_class.asp
}
doubleClick();

function createList() {
  createButton.addEventListener('click', () => {
    listItem.innerHTML = '';
  });
}
createList();

function toRemove() {
  removeFinished.addEventListener('click', () => {
    const listCompletd = document.querySelectorAll('.completed');
    for (let i = 0; i < listCompletd.length; i += 1) {
      listCompletd[i].remove();
    }
  });
}
toRemove();

window.onload = function saveTasksStorage() {
  saveTasks.addEventListener('click', () => {
    localStorage.setItem('tasks', listItem.innerHTML);
  });
  if (localStorage.tasks) {
    listItem.innerHTML = localStorage.tasks;
  }
};

function upButton() {
  const moveUpTasks = document.getElementsByTagName('li');
  up.addEventListener('click', () => {
    for (let i = 1; i < moveUpTasks.length; i += 1) {
      if (moveUpTasks[i].classList.contains('selecionado')) {
        listItem.insertBefore(moveUpTasks[i], moveUpTasks[i - 1]);
      }
    }
  });
}
upButton();

function downButton() {
  const moveDownTasks = document.getElementsByTagName('li');
  down.addEventListener('click', () => {
    for (let i = moveDownTasks.length - 1; i >= 0; i -= 1) {
      if (
        moveDownTasks[i].classList.contains('selecionado') &&
        i < moveDownTasks.length - 1
      ) {
        listItem.insertBefore(moveDownTasks[i].nextSibling, moveDownTasks[i]);
      }
    }
  });
}
downButton();
/* no item 13 usei a seguintes referências:
https://www.w3schools.com/jsref/jsref_includes.asp
https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
https://developer.mozilla.org/pt-BR/docs/Web/API/Node/nextSibling */

function removeSelected() {
  buttonRemove.addEventListener('click', () => {
    const removeItem = document.querySelector('.selecionado');
    removeItem.remove();
  });
}
removeSelected();
