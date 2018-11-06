document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector(".form");
  const items = document.querySelector(".items");
  init(form, items);
});


function formHandler(e) {
  e.preventDefault();
  addItem(this);
}

//fjarlaegum eda baetum inn item-done, eftir hvernig checkboxid er
function checkboxHandler() {
  if (this.checked) {
    this.parentNode.classList.add("item--done");
  } else {
    this.parentNode.classList.remove("item--done");
  }
}

function addItem(form) {
  let input = form.querySelector(".form__input");
  let text = form.firstElementChild.value;
  let items = form.previousElementSibling;
  
  //buum til oll element sem tharf
  let item = document.createElement("li");
  let itemCheckbox= document.createElement("input");
  let itemText = document.createElement("span");
  let itemButton = document.createElement("button");

  //baetum vid klosum, attributes, values osfrv
  item.classList.add("item");
  itemCheckbox.classList.add("item__checkbox");
  itemCheckbox.setAttribute("type","checkbox");
  itemText.classList.add("item__text");
  itemText.innerHTML = text;
  itemButton.classList.add("item__button");
  itemButton.innerHTML = "Eyða";

  // smellum thessu ollu saman 
  items.appendChild(item);
  item.appendChild(itemCheckbox);
  item.appendChild(itemText);
  item.appendChild(itemButton);
  
  // baetum vid event listeners fyrir nyja itemid 
  itemCheckbox.addEventListener("change", checkboxHandler);
  itemText.addEventListener("click", editItem);
  itemButton.addEventListener("click", deleteItem);

  // clear input
  input.value = "";
  
}

function editItem() {
  //buum til element
  let edit = document.createElement("input"); 
  edit.classList.add("item__text");

  //setjum span texta i input og skiptum ut
  edit.innerHTML = this.innerHTML;
  this.parentNode.replaceChild(edit, this);

  edit.value = this.innerHTML;//baetum textanum thegar breytt er i input
  edit.setSelectionRange(0, edit.value.length);
  edit.focus();// focus input box

  // baetum event listener
  edit.addEventListener("keypress", keypressItem);//ef ytt er a enter
  edit.addEventListener("blur", commitItem);//ef ytt er i burtu -- ath virkar ekki
}

function keypressItem(evt) {
  if (evt.which === 13) {
    commitItem.call(this);
  }
}

function commitItem() {
  let commit = document.createElement("span");
  commit.classList.add("item__text");
  commit.innerHTML = this.value;
  this.parentNode.replaceChild(commit, this);
  commit.addEventListener("click", editItem);
}

function deleteItem(e) {
  e.preventDefault();
  list = this.parentNode;
  list.parentNode.removeChild(list);//thvilikt meistaraverk
}

//skil ekki hvad a ad gera vid thetta og fann enga utskyringu
function el(type, classname, clickHandler) {

}

function init(form, items) {
  //skilgreinum hvada element vid erum ad fara nota
  let checkbox = items.querySelectorAll(".item__checkbox");
  let text = items.querySelectorAll(".item__text");
  let button = items.querySelectorAll(".item__button");

  //buum til nokkur event handlers
  form.addEventListener("submit", formHandler);
  for (let i = 0; i < items.children.length; i++) {
    checkbox[i].addEventListener("change", checkboxHandler);
    text[i].addEventListener("click", editItem);
    button[i].addEventListener("click", deleteItem);
  }
}
