// const nav_menu = document.querySelector('.nav-menu');
// const nav_link = document.querySelectorAll('.nav-menu a');
// const nav_hamburger = document.querySelector('.nav-hamburger');
// const icon = {
//   false: `<i class="fas fa-times"></i>`,
//   true: `<i class="fas fa-bars"></i>`,
// };
// var is_click = 1;

// nav_link.forEach((item) => {
//   item.addEventListener('click', function (e) {
//     removeActiveClass();
//     e.target.className = "active";

//     toggleMenu();
//   });
// });

// function removeActiveClass() {
//   nav_link.forEach((item) => {
//     item.classList.remove('active');
//   });
// }

// nav_hamburger.addEventListener('click', function () {
//   toggleMenu();
// });

// function toggleMenu() {
//   is_click = !is_click;
//   nav_hamburger.innerHTML = icon[is_click];
//   nav_menu.classList.toggle('active');
// }

// ---------------------fetching data---------------------
const base_api = "https://pokeapi.co/api/v2/";
const type_api = base_api + "type";

var pokemon_type = [];

const search_container = document.querySelector(".search");

// get all pokemon type
async function getPokemonType() {
  const response = await fetch(type_api)
    .then((response) => response.json())
    .then((data) => (pokemon_type = data.results))
    // .then(() => console.log(pokemon_type))
    .then(() => createTypeBtn());
}

getPokemonType();

// ---------------------handle events---------------------
const root = document.querySelector(":root");
const collapse_sidebar = document.querySelector("#collapse_sidebar");
const toggle_sidebar = document.querySelector("#toggle_sidebar");
const sidebar = document.querySelector(".sidebar");
const icon = {
  left: '<i class="fas fa-caret-left fa-2x"></i>',
  right: '<i class="fas fa-caret-right fa-2x"></i>',
};

collapse_sidebar.addEventListener("click", (e) => {
  if (sidebar.className.search("small") == -1) {
    sidebar.classList.add("small");
    root.style.setProperty("--sidebar-width", "60px");

    changeIcon(e, icon.right);
  } else {
    sidebar.classList.remove("small");
    root.style.setProperty("--sidebar-width", "240px");

    changeIcon(e, icon.left);
  }
});

function changeIcon(e, ele) {
  if (e.target.innerHTML != "") {
    e.target.innerHTML = ele;
  } else {
    e.target.outerHTML = ele;
  }
}

toggle_sidebar.addEventListener("click", () => {
  if (sidebar.style.left == "0%") {
    sidebar.style.left = "-100%";
  } else {
    sidebar.style.left = "0%";
  }
});

// ---------------------render function---------------------

function createTypeBtn() {
  createBtn("all");
  for (const item of pokemon_type) {
    createBtn(item.name);
  }
}

function createBtn(name) {
  var button = document.createElement("a");
  var button_content = document.createTextNode(name);
  button.appendChild(button_content);
  button.classList.add("btn");
  button.classList.add(name);
  search_container.appendChild(button);
}