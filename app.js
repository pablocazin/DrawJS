let tableau = document.getElementById("tableau");
let colors1 = document.getElementById("colors1");
let colors2 = document.getElementById("colors2");
let submit = document
  .getElementById("submit")
  .addEventListener("click", ajouterCouleur);
let newColor = document.getElementById("newColor");
let colorsPalette = [
  "#e4cab5",
  "#383a3a",
  "#3c7b7f",
  "#075171",
  "#4c6588",
  "#844d6c",
  "#634870",
  "#878a5d",
  "#659962",
  "#ea6d30",
  "#db1640",
  "#ef8668",
  "#dfcdcb",
  "#612655",
];
let cases = [];
let selectedColor = undefined;
let etat = "mouseup";
window.addEventListener("mousedown", () => {
  etat = "mousedown";
});
window.addEventListener("mouseup", () => {
  etat = "mouseup";
});

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
  colors1.innerText = "";
  colors2.innerText = "";
  let count = 0;
  for (let i of colorsPalette) {
    let div = document.createElement("div");
    div.classList.add("colors");
    div.dataset.color = i;
    div.style.backgroundColor = i;
    div.addEventListener("click", newSelectedColor);
    if (count < 10) {
      colors1.appendChild(div);
    } else if (count < 20) {
      colors2.appendChild(div);
    }
    count++;
  }
}

// garder en mémoire la couleur sélectionnée
function newSelectedColor(e) {
  selectedColor = e.target.dataset.color;
}

// vérifie qu'une couleur soit sélectionné, change la couleur, puis display
function changeColor(e) {
  if (selectedColor == undefined) {
    alert("Sélectionnez une couleur dans la palette ci-dessus");
  } else {
    if (etat === "mousedown") {
      cases[e.target.dataset.col][e.target.dataset.row] = selectedColor;
      let calc =
        parseInt(e.target.dataset.col) * sizeTableau.value +
        (parseInt(e.target.dataset.row) + 1);
      let div = document.querySelector(`#tableau div:nth-child(${calc})`);
      div.style.backgroundColor = selectedColor;
    }
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
  for (let i = 0; i < sizeTableau.value; i++) {
    let newTab = [];
    for (let j = 0; j < sizeTableau.value; j++) {
      newTab.push("#FFFFFF");
    }
    cases.push(newTab);
  }
}

// vide le tableau et créer les divs
function createDivs() {
  tableau.innerText = "";
  let col = 0;
  for (let i of cases) {
    let row = 0;
    for (let j of i) {
      let div = document.createElement("div");
      div.dataset.col = col;
      div.dataset.row = row;
      div.addEventListener("mouseover", changeColor);
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
