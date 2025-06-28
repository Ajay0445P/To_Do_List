let list = [];
let listHTML = '';
let input = "";
list = JSON.parse(localStorage.getItem('list')) || [];
renderList();
loadTheme();
function add() {
  let inputElement = document.querySelector(".js-input");
  input = inputElement.value;
  list.push(
    {
      name: input,
      completed: false
    }
  );
  localStorage.setItem('list', JSON.stringify(list));
  renderList();
  inputElement.value = "";
}
function renderList(filter = "All") {
  list = JSON.parse(localStorage.getItem('list')) || [];
  listHTML = "";

  for (let i = 0; i < list.length; i++) {
    const todoObject = list[i];

    if (
      filter === "Complete" && !todoObject.completed ||
      filter === "Incomplete" && todoObject.completed
    ) continue;

    const checked = todoObject.completed ? "checked" : "";
    const cutClass = todoObject.completed ? "cut" : "";

    const html = `
      <div class="word ${cutClass}">
        <input class="js-change" type="checkbox" onchange="changebtn(this)" ${checked}>
        ${todoObject.name}
        <button class="delete" onclick="delete_list(${i})">
          <img src="images/trash.png" id="add-note-icon">
        </button>
      </div>`;
    listHTML += html;
  }

  document.querySelector(".js-show-list").innerHTML = listHTML;
}
function dark_light() {
  const body = document.querySelector("body");
  const isDark = body.classList.contains("js-body-dark");

  if (isDark) {
    body.classList.remove('js-body-dark');
    document.querySelector(".js-input").classList.remove('js-input-dark');
    document.querySelector(".search-btn").innerHTML = `<img class="search-icon" src = "images/magnifying-glass.png">`;
    document.querySelector(".dark-mode-btn").innerHTML = `<img src="images/moon.png" id="dark-mode-icon">`;
    document.querySelector("h2").style.color = "black";

    localStorage.setItem("theme", "light");
  } else {
    body.classList.add('js-body-dark');
    document.querySelector(".js-input").classList.add('js-input-dark');
    document.querySelector(".search-btn").innerHTML = `<img class="search-icon" src = "images/search_white.png">`;
    document.querySelector(".dark-mode-btn").innerHTML = `<img src="images/sun.png" id="dark-mode-icon">`;
    document.querySelector("h2").style.color = "white";

    localStorage.setItem("theme", "dark");
  }
}

function loadTheme() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.querySelector("body").classList.add('js-body-dark');
    document.querySelector(".js-input").classList.add('js-input-dark');
    document.querySelector(".search-btn").innerHTML = `<img class="search-icon" src = "images/search_white.png">`;
    document.querySelector(".dark-mode-btn").innerHTML = `<img src="images/sun.png" id="dark-mode-icon">`;
    document.querySelector("h2").style.color = "white";
  }
}

function delete_list(index) {
  list.splice(index, 1);
  localStorage.setItem('list', JSON.stringify(list));
  renderList();
}
function clearall() {
  localStorage.removeItem('list');
  list = [];
  renderList();
}

function changebtn(checkbox) {
  const parentDiv = checkbox.closest(".word");
  const index = Array.from(document.querySelectorAll('.js-change')).indexOf(checkbox);

  if (checkbox.checked) {
    parentDiv.classList.add("cut");
    list[index].completed = true;
  } else {
    parentDiv.classList.remove("cut");
    list[index].completed = false;
  }

  localStorage.setItem('list', JSON.stringify(list));
}

function opentab() {
  document.querySelector(".js-tab").classList.remove("hidden");
}
function closetab() {
  document.querySelector(".js-tab").classList.add("hidden");
}
document.querySelector(".tab").addEventListener("click", function (e) {
  if (e.target.classList.contains("tab")) {
    closetab();
  }
});
function sort() {
  const filterValue = document.getElementById("options").value;
  renderList(filterValue);
}