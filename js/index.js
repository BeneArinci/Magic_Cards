const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
const cards = [];

// function created to take out the responsibility to remove buttons from other functions
function removeButton(buttonId) {
  const btn = document.getElementById(buttonId);
  btn.remove();
}

// function for formatting cards. Used both for cardsWrapper and selectedCardsWrapper
function formatCardsVisualisation(specificWrapper) {
  const cardsToStyle = [...specificWrapper.children];
  cardsToStyle.forEach((card, i) => {
    const positionFromLeft = i * 30;
    card.style.left = `${positionFromLeft}px`;
  });
}

// setting up the initial conditions for starting a new game without reloading the page
function playAgain() {
  removeButton('play-again');
  selectedCardsWrapper.innerHTML = '';
  cardsWrapper.innerHTML = '';
  cards.splice(0, cards.length);
  createCards(); /* eslint-disable-line */
}

// creating Play Again button + add event listener for click on it
function createPlayAgainBtn() {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-lg', 'btn-secondary');
  button.setAttribute('id', 'play-again');
  button.style.margin = '5px';
  button.innerHTML = 'Start Again';
  btnWrapper.appendChild(button);
  button.addEventListener('click', () => playAgain());
}

// adding animation to the cards inside the selectedCardsWrapper
// used only when the magic is done
function addCardsAnimation() {
  const selectedCards = [...selectedCardsWrapper.children];
  selectedCards.forEach((card) => {
    card.classList.add('magic');
  });
}

// function created to take out the responsibility of checking for card value from performTheMagic
function getCardValue(card) {
  return card.getAttribute('data-value');
}

// main function that performs all the actions related to clicking on magic button
function performTheMagic(card) {
  const cardValue = getCardValue(card);
  const deck = [...cardsWrapper.children];
  deck.forEach((notSelectedCard) => {
    if (getCardValue(notSelectedCard) === cardValue) {
      selectedCardsWrapper.appendChild(notSelectedCard);
    }
  });
  formatCardsVisualisation(selectedCardsWrapper);
  addCardsAnimation();
  createPlayAgainBtn();
}

// creating the magicButton only after checking that it doesn't exist yet
function createMagicButton(selectedCard) {
  const magicBtn = document.getElementById('magic-btn');
  const selectedCards = [...selectedCardsWrapper.children];
  if (magicBtn === null && selectedCards.length === 1) {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-lg', 'btn-secondary', 'magic');
    button.setAttribute('id', 'magic-btn');
    button.style.margin = '5px';
    button.innerHTML = 'Magic';
    btnWrapper.appendChild(button);
    button.addEventListener('click', () => {
      performTheMagic(selectedCard);
      removeButton('magic-btn');
    });
  }
}

// attaching the clicked-on card to selectedCardsWrapper
function selectCard(card) {
  const selectedCards = [...selectedCardsWrapper.children];
  if (selectedCards.length === 0) {
    selectedCardsWrapper.appendChild(card);
    formatCardsVisualisation(selectedCardsWrapper);
  }
}

// adding eventlistener to each card in the deck
function listenForCardsClick() {
  const deck = [...cardsWrapper.children];
  deck.forEach((singleCard) => {
    singleCard.addEventListener('click', () => {
      selectCard(singleCard);
      createMagicButton(singleCard);
    });
  });
}

// Taking off the responsibility of populating cardsWrappre from creteCards function
function populateCardsWrapper() {
  cards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardsWrapper.append(cardElement);
  });
  formatCardsVisualisation(cardsWrapper);
  listenForCardsClick();
}

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  for (let x = 0; x < suits.length; x += 1) {
    for (let i = 1; i <= 13; i += 1) {
      const cardObject = {
        value: i,
        suit: suits[x],
      };
      cards.push(cardObject);
    }
  }
  // For each dataObject, create a new card and append it to the DOM
  populateCardsWrapper();
}

// Function to clear out the initial button and create new buttons to play the game.
function createInitialButtons() {
  removeButton('start-game');
  const buttons = [
    { name: 'shuffle-btn', innerHTML: 'Shuffle' },
    { name: 'flip-btn', innerHTML: 'Flip cards' },
  ];
  buttons.forEach((btn) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-lg', 'btn-secondary');
    button.setAttribute('id', `${btn.name}`);
    button.style.margin = '5px';
    button.innerHTML = `${btn.innerHTML}`;
    btnWrapper.appendChild(button);
  });
}

// adding hidden class to cardsWrapper when clicking on flip button
function flipCards() {
  if (cardsWrapper.classList.contains('hidden')) {
    cardsWrapper.classList.remove('hidden');
  } else { cardsWrapper.classList.add('hidden'); }
}

// rendering cardsWrapper children in a different/random order + reformatting
function shuffleCards() {
  const deck = [...cardsWrapper.children];
  for (let i = deck.length; i >= 0; i -= 1) {
    cardsWrapper.appendChild(deck[Math.random() * i | 0]); /* eslint no-bitwise: [2, { allow: ["|"] }] */
  }
  formatCardsVisualisation(cardsWrapper);
}

// creating event listeners for initial buttons
function listenForInitialButtonsClick() {
  const btnFlip = document.getElementById('flip-btn');
  btnFlip.addEventListener('click', flipCards);
  const btnShuffle = document.getElementById('shuffle-btn');
  btnShuffle.addEventListener('click', shuffleCards);
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createInitialButtons();
  createCards();
  listenForInitialButtonsClick();
}

document.getElementById('start-game').addEventListener('click', () => {
  startGame();
});
