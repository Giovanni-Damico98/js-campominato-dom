// Preparazione
// Recupero gli elementi
const grid = document.getElementById("grid");
const playButton = document.getElementById("play-button");
const form = document.querySelector("form");
const levelSelect = document.getElementById("select-level");
const scoreElement = document.getElementById("score");
let score = 0;

// Funzioni
// Funzione per la creazione di una cella
const createCell = (cellNumber) => {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.innerText = cellNumber;
  return cell;
};

// Funzione per generare tot numeri random
const getRandomNumbers = (max, totalNumbers) => {
  const numbers = [];
  while (numbers.length < totalNumbers) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    if (!numbers.includes(randomNumber)) numbers.push(randomNumber);
  }
  return numbers;
};

// Funzione per reagire al click di una cella
const onCellClick = (event) => {
  console.log(event.target.innerText);
  // Se contiene già clicked esci
  if (event.target.classList.contains("clicked")) return;

  //   Aggiungo classe per colorare la cella
  event.target.classList.add("clicked");
  score++;
  scoreElement.innerText = score;
};

// Funzione CORE per lo svoglimento del gioco
const startGame = (event) => {
  // Preparazione
  // Blocco l'invio del form
  event.preventDefault();
  // Svuoto la griglia
  grid.innerHTML = "";
  // Cambio il testo del bottone gioca
  playButton.innerText = "Ricomincia";
  //Prendo il valore dalla tendina
  const level = levelSelect.value;
  // Aggiungo la classe alla griglia rimuovendo quella precedente
  grid.classList.remove("hard", "normal", "easy");
  grid.classList.add(level);

  let rows;
  let cols;
  const totalBombs = 16;
  // Decido quante colonne e righe generare
  switch (level) {
    case "hard":
      rows = 7;
      cols = 7;
      break;
    case "normal":
      rows = 9;
      cols = 9;
      break;
    case "easy":
      rows = 10;
      cols = 10;
  }
  // Calcolo totale delle celle
  const totalCells = rows * cols;
  // Genero le bombe
  const bombs = getRandomNumbers(totalCells, totalBombs);
  console.log(bombs);
  //   Genero le celle in base al livello scelto
  for (let i = 1; i <= totalCells; i++) {
    // Creo una cella
    const cell = createCell(i);
    // Verifico se ho cliccato una bomba

    // Al click >
    cell.addEventListener("click", onCellClick);

    // La inserisco nella griglia
    grid.appendChild(cell);
  }
};

// Elaborazione
form.addEventListener("submit", startGame);
