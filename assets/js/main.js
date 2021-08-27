// ---------------------fetching data---------------------
var pokemon_type;
var pokemons = [];
const limit = 40;
var offset = 0;

const base_api = "https://pokeapi.co/api/v2/";
const type_api = base_api + "type";
const pokemon_api = `${base_api}pokemon?limit=${limit}&offset=${offset}`;

// get all pokemon type
function getPokemonType() {
  fetch(type_api)
    .then((response) => response.json())
    .then((data) => (pokemon_type = data.results))
    // .then(() => console.log(pokemon_type))
    .then(() => createTypeBtn());
}
getPokemonType();
// get pokemon

// results = {
//   0: {
//     name:"venusaur",
//     url:"https://pokeapi.co/api/v2/pokemon/3/"
//   },
// }

function getPokemon() {
  let raw_data;
  fetch(pokemon_api)
    .then((response) => response.json())
    .then((data) => (raw_data = data.results))
    // .then(() => console.log(pokemons))
    .then(() => {
      raw_data.forEach((item) => {
        fetch(item.url)
          .then((response) => response.json())
          .then((data) =>
            createPokemonCard(
              data.name,
              data.sprites.front_default,
              data.types[0].type.name
            )
          );
      });
    });
}
getPokemon();

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
const template_type_btn = document.querySelector("#template-type-btn");
const template_pokemon_card = document.querySelector("#template-pokemon-card");

const search_container = document.querySelector(".search");
const pokemon_container = document.querySelector("#pokemon-container");

function createTypeBtn() {
  createBtn("all");
  pokemon_type.forEach((item) => createBtn(item.name));
}

function createBtn(name) {
  let content = template_type_btn.content.querySelector(".btn");
  let clone = document.importNode(content, true);

  clone.textContent += name;
  clone.classList.add(name);
  search_container.appendChild(clone);
}

function createPokemonCard(name, img, type) {
  let content = template_pokemon_card.content.querySelector(".pokemon");
  let clone = document.importNode(content, true);

  clone.querySelector("p").textContent = name;
  clone.querySelector("img").src = img;
  clone.classList.add(type);
  pokemon_container.appendChild(clone);
}
