// Preparazione
// Recupero gli elementi
const grid = document.getElementById("grid");
const playButton = document.getElementById("play-button");
const form = document.querySelector("form");
const levelSelect = document.getElementById("select-level");
const scoreElement = document.getElementById("score");
let score = 0;
let bombs = [];
const totalBombs = 16;
let totalCells;

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

// Funzione CORE per lo svoglimento del gioco
const startGame = (event) => {
  // Preparazione
  // Blocco l'invio del form
  event.preventDefault();
  score = 0;
  scoreElement.innerText = score;
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
  totalCells = rows * cols;

  // Genero le bombe
  bombs = getRandomNumbers(totalCells, totalBombs);
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

// Funzione per reagire al click di una cella
const onCellClick = (event) => {
  const cellNumber = parseInt(event.target.innerText);

  if (event.target.classList.contains("clicked")) return;

  if (bombs.includes(cellNumber)) {
    bombs.forEach((bombNumber) => {
      const bombCell = grid.querySelector(`.cell:nth-child(${bombNumber})`);

      if (bombCell) {
        bombCell.classList.add("bomb");
      }
    });

    event.target.innerText = "";
    setTimeout(() => {
      alert(
        `Hai cliccato su una bomba! Fine del gioco. 
        Hai totalizzato ${score} punti. 
        Clicca su 'Ricomincia' per una nuova partita!`
      );
    }, 500);

    grid.querySelectorAll(".cell").forEach((cell) => {
      cell.removeEventListener("click", onCellClick);
    });
  } else {
    event.target.classList.add("clicked");
    score++;
    scoreElement.innerText = score;

    const cellsToWin = totalCells - totalBombs;
    setTimeout(() => {
      if (score === cellsToWin) {
        alert(`Complimenti, hai vinto! 
            Hai totalizzato ${score} punti. 
            Clicca su 'Ricomincia' per una nuova partita!`);
        grid.querySelectorAll(".cell").forEach((cell) => {
          cell.removeEventListener("click", onCellClick);
        });
      }
    }, 500);
  }
};
// Elaborazione
form.addEventListener("submit", startGame);
