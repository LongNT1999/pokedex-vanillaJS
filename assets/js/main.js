const template_type_btn = document.querySelector("#template-type-btn");
const template_pokemon_card = document.querySelector("#template-pokemon-card");

const search_container = document.querySelector(".search");
const pokemon_container = document.querySelector("#pokemon-container");

var pokemon_type;
var pokemons = [];
const limit = 10; // quantity of pokemon per page
var offset = 0;
var total = 0;
const limit_page_btn = 4; // quantity of paginate btn
var current_page = 1;
var total_page = 0;

const base_api = "https://pokeapi.co/api/v2/";

const page_btn = document.querySelectorAll(".pagination .btn-page");
const pagination = document.querySelector(".pagination");
const first = document.querySelector("#first-page");
const prev = document.querySelector("#prev-page");
const next = document.querySelector("#next-page");
const last = document.querySelector("#last-page");
const pagi_btn = {
  first: '<a id="first-page" class="btn normal">First</a>',
  prev: '<a id="prev-page" class="btn normal">&lt;</a>',
  next: '<a id="next-page" class="btn normal">&gt;</a>',
  last: '<a id="last-page" class="btn normal">Last</a>',
  btn_nornal: '<a class="btn normal btn-page"></a>',
  btn_active: '<a class="btn fire btn-page"></a>',
};
const btn_class_normal = "normal";
const btn_class_active = "fire";

let pagi_btn_list = [];
for (let index = 0; index < limit_page_btn; index++) {
  pagi_btn_list.push(pagination.querySelector(`a:nth-child(${index + 3})`));
}

const root = document.querySelector(":root");
const collapse_sidebar = document.querySelector("#collapse_sidebar");
const toggle_sidebar = document.querySelector("#toggle_sidebar");
const sidebar = document.querySelector(".sidebar");
const icon = {
  left: '<i class="fas fa-caret-left fa-2x"></i>',
  right: '<i class="fas fa-caret-right fa-2x"></i>',
};

// ---------------------fetching data---------------------
// get all pokemon type
function getPokemonType() {
  let type_api = base_api + "type";

  fetch(type_api)
    .then((response) => response.json())
    .then((data) => (pokemon_type = data.results))
    // .then(() => console.log(pokemon_type))
    .then(() => createTypeBtn())
    .catch((error) => console.error(error));
}
getPokemonType();

// get pokemon

// results = {
//   0: {
//     name:"venusaur",
//     url:"https://pokeapi.co/api/v2/pokemon/3/"
//   },
// }

function getPokemon(offset) {
  let pokemon_api = `${base_api}pokemon?limit=${limit}&offset=${offset}`;

  fetch(pokemon_api)
    .then((response) => response.json())
    .then((data) => ((pokemons = data.results), (total = data.count)))
    .then(() => setTotalPage())
    // .then(() => console.log(total_page))
    .then(() => {
      pokemon_container.innerHTML = "";
      pokemons.forEach((item) => {
        fetch(item.url)
          .then((response) => response.json())
          .then((data) =>
            createPokemonCard(
              data.name,
              data.sprites.front_default,
              data.types[0].type.name
            )
          )
          .catch((error) => console.error(error));
      });
    })
    .catch((error) => console.error(error));
}

// first load
getPokemon(0);

function setTotalPage() {
  total_page = Math.round(total / limit) - 1;
}

// ---------------------paginate---------------------
first.addEventListener("click", (e) => {
  e.preventDefault();
  offset = 0;
  getPokemon(offset);

  resetPagination(1);
});

last.addEventListener("click", (e) => {
  e.preventDefault();
  offset = total - 1;
  getPokemon(offset);

  resetPagination(total_page);
});

next.addEventListener("click", (e) => {
  e.preventDefault();
  if (offset + limit < total) {
    offset += limit;
    getPokemon(offset);

    resetPagination(current_page + 1);
  }
});

prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (offset - limit >= 0) {
    offset -= limit;
    getPokemon(offset);

    resetPagination(current_page - 1);
  }
});

page_btn.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    resetPagination(item.innerText);

    offset = (item.innerText - 1) * limit;
    getPokemon(offset);
  });
});

// ---------------------DOM events---------------------
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
  toggle_sidebar.classList.toggle("fa-times");
  sidebar.classList.toggle('active');
});

// ---------------------render function---------------------
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

// change normal to fire for active btn
function resetPagination(new_page) {
  let begin = pagi_btn_list[0].innerText;
  let end = pagi_btn_list[limit_page_btn -1].innerText;

  if (new_page > begin && new_page < end) {
    for (let index = 0; index < limit_page_btn - 1; index++) {
      pagi_btn_list[index].innerText = pagi_btn_list[index + 1].innerText;
    }
    pagi_btn_list[limit_page_btn - 1].innerText =
      parseInt(pagi_btn_list[limit_page_btn - 1].innerText) + 1;
      
  } else if (new_page <= begin) {
    
  } else if (new_page >= end) {
    
  }

  pagi_btn_list.forEach((item) => console.log(item.innerText));
  // console.log(pagi_btn_list);

  // pagi_btn_list[current_page - 1].classList.remove(btn_class_active);
  // pagi_btn_list[current_page - 1].classList.add(btn_class_normal);

  current_page = new_page;
  // pagi_btn_list[current_page - 1].classList.add(btn_class_active);


  console.log("current page: " + current_page);
}
