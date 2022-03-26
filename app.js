let tableau = document.getElementById("tableau");
let colors = document.getElementById("colors");
let submit = document
  .getElementById("submit")
  .addEventListener("click", ajouterCouleur);
let newColor = document.getElementById("newColor");
let colorsPalette = ["#FF0000", "#00FF00", "#FF00FF", "#0000FF"];
let cases = [];
let selectedColor = undefined;

// ajouter une couleur a la palette
function ajouterCouleur() {
  if (newColor.value !== "") {
    const regex = /^#[0-9a-f]{3,6}$/i;
    if (newColor.value.match(regex)) {
      colorsPalette.push(newColor.value);
      createColors();
    } else {
      alert("le format entré ne correspond pas au format Héxadécimal");
    }
  } else {
    alert("vous devez entrer une couleur");
  }
}

// creer les éléments HTML des couleurs
function createColors() {
  colors.innerText = "";
  for (let i of colorsPalette) {
    let div = document.createElement("div");
    div.classList.add("colors");
    div.dataset.color = i;
    div.style.backgroundColor = i;
    div.addEventListener("click", newSelectedColor);
    colors.appendChild(div);
  }
}

// garder en mémoire la couleur sélectionnée
function newSelectedColor(e) {
  selectedColor = e.target.dataset.color;
  console.log(selectedColor);
}

// vérifie qu'une couleur soit sélectionné, change la couleur, puis display
function changeColor(e) {
  if (selectedColor == undefined) {
    alert("Sélectionnez une couleur dans la palette ci-dessus");
  } else {
    cases[e.target.dataset.col][e.target.dataset.row] = selectedColor;
    createDivs();
  }
}

// créer les cases, size = taille d'un coté du tableau, base = couleur de base du tableau
let sizeTableau = document.getElementById("sizeTableau");
sizeTableau.addEventListener("input", (e) => {
  tableau.style.gridTemplateColumns = `repeat(${sizeTableau.value}, 20px)`;
  tableau.style.gridTemplateRows = `repeat(${sizeTableau.value}, 20px)`;
  createCases();
  createDivs();
});

function createCases() {
  cases = [];
  for (let i = 0; i < sizeTableau.value * sizeTableau.value; i++) {
    let newTab = [];
    for (let j = 0; j < 10; j++) {
      newTab.push("#FFFFFF");
    }
    cases.push(newTab);
  }
}

// vide le tableau et créer les divs
function createDivs() {
    tableau.innerText = ""
  let col = 0;
  for (let i of cases) {
    let row = 0;
    for (let j of i) {
      let div = document.createElement("div");
      div.dataset.col = col;
      div.dataset.row = row;
      div.addEventListener("click", changeColor);
      div.style.backgroundColor = j;
      tableau.appendChild(div);
      row++;
    }
    col++;
  }
}

function init() {
  createColors();
  createCases();
  createDivs();
}

init();
