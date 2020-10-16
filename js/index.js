const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
const cards = [];

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  for (let x = 0; x < suits.length; x += 1){
    for (let i = 1; i <= 13; i += 1) {
      const cardObject = {
        value: i,
        suit: suits[x],
      };
      cards.push(cardObject);
      //console.log(cardObject)
    }
  }

  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i*30;
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
  });
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  const buttons = [
    {name: "shuffle-btn", innerHTML: "Shuffle"}, 
    {name: "show-hide-btn", innerHTML: "Show/Hide"}
  ];
  buttons.forEach((btn) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-lg', 'btn-secondary');
    button.setAttribute('id', `${btn.name}`)
    button.style.margin = '5px';
    button.innerHTML = `${btn.innerHTML}`;
    btnWrapper.appendChild(button);
  })
}

function removeStartBtn () {
  startBtn = document.getElementById('start-game');
  startBtn.remove();
}

function flipCards () {
  console.log('called')
    if (cardsWrapper.classList.contains('hidden')) {
      cardsWrapper.classList.remove('hidden')
    } else { cardsWrapper.classList.add('hidden') };
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  removeStartBtn ();
  createButtons();
  createCards();
  const btn = document.getElementById('show-hide-btn')
  btn.addEventListener('click', flipCards)
  //document.getElementById('shuffle-btn').addEventListener('click', flipCards());
}

document.getElementById('start-game').addEventListener('click', startGame);

