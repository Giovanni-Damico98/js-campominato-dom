/**
 * Verifica se una parola è palindroma.
 *
 * Questa funzione prende una parola, la converte in minuscolo,
 * rimuove gli spazi bianchi esterni, e verifica se la parola è
 * identica se letta al contrario.
 *
 * @param {string} word - La parola da verificare.
 * @returns {boolean} `true` se la parola è palindroma, altrimenti `false`.
 */
function isPalindroma(word) {
  // Pulizia dei dati
  word = word.trim().toLowerCase();
  // Capovolgo la parola
  const reversedWord = word.split("").reverse().join("");
  // Controllo se la parola capovolta è uguale alla parola non capovolta
  return reversedWord === word;
}

/**
 * Genera un numero intero casuale tra due valori specificati.
 *
 * @param {number} [min=1] - Il valore minimo del range (incluso).
 * @param {number} [max=100] - Il valore massimo del range (incluso o escluso a seconda di `isMaxIncluded`).
 * @param {boolean} [isMaxIncluded=true] - Indica se il valore massimo (`max`) è incluso nel range.
 * @returns {number|null} - Un numero intero casuale tra `min` e `max` (incluso o escluso), `NaN` se i parametri non sono numeri, o `null` se `min` è maggiore o uguale a `max`.
 */
function getRandomNumber(min = 1, max = 100, isMaxIncluded = true) {
  if (isNaN(min) || isNaN(max)) {
    console.error("Min e Max devono essere numeri");
    return NaN;
  }

  if (min >= max) {
    console.error(`Errore nei parametri: ${min} è superiore o uguale a ${max}`);
    return null;
  }

  if (isMaxIncluded) max++;
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Verifica se un numero è pari.
 *
 * @param {number} number - Il numero da verificare.
 * @returns {boolean} - Restituisce `true` se il numero è pari, altrimenti `false`.
 */
function isPari(number) {
  return number % 2 === 0;
}

/**
 * Verifica se il valore fornito è un numero.
 *
 * Questa funzione utilizza la funzione `isNaN` per determinare se il valore
 * fornito può essere convertito in un numero. Restituisce `true` se il valore
 * è un numero, altrimenti `false`.
 *
 * @param {*} value - Il valore da verificare.
 * @returns {boolean} - `true` se il valore è un numero, altrimenti `false`.
 */
function isNumber(value) {
  return !isNaN(value);
}

/**
 * Genera un array di numeri casuali unici all'interno di un intervallo specificato.
 *
 * @param {number} max - Il valore massimo (incluso) che un numero generato può avere.
 * @param {number} totalNumbers - Il numero totale di numeri casuali unici da generare.
 * @returns {number[]} Un array contenente i numeri casuali generati.
 *
 * @example
 * // Genera 5 numeri casuali tra 1 e 10
 * const numeriCasuali = getRandomNumbers(10, 5);
 * console.log(numeriCasuali); // Può restituire: [3, 7, 1, 9, 5]
 */
const getRandomNumbers = (max, totalNumbers) => {
  const numbers = [];
  while (numbers.length < totalNumbers) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    numbers.push(randomNumber);
    if (!numbers.includes(randomNumber)) numbers.push(randomNumber);
  }
  return numbers;
};
