const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
const cards = [];

function removeBtn(buttonId) {
  const btn = document.getElementById(buttonId);
  btn.remove();
}

function selectCard(card) {
  const selectedCards = [...selectedCardsWrapper.children];
  if (selectedCards.length === 0) {
    const positionFromLeft = 0;
    card.style.left = `${positionFromLeft}px`;
    selectedCardsWrapper.appendChild(card);
    removeBtn('shuffle-btn');
  }
}

function formatCardsVisualisation(specificWrapper) {
  const cardsToStyle = [...specificWrapper.children];
  cardsToStyle.forEach((card, i) => {
    const positionFromLeft = i * 30;
    card.style.left = `${positionFromLeft}px`;
  });
}

function addCardsAnimation() {
  const selectedCards = [...selectedCardsWrapper.children];
  selectedCards.forEach((card) => {
    card.classList.add('magic');
  });
}

function getCardValue(card) {
  return card.classList.value.split('-').pop();
}

function performTheMagic(card) {
  const cardValue = getCardValue(card);
  const deck = [...cardsWrapper.children];
  deck.forEach((notSelectedCard) => {
    if (getCardValue(notSelectedCard) === cardValue) {
      // console.log(notSelectedCard.classList)
      selectedCardsWrapper.appendChild(notSelectedCard);
      // console.log(selectedCardsWrapper)
    }
  });
  formatCardsVisualisation(selectedCardsWrapper);
  addCardsAnimation();
  addPlayAgainBtn(); /* eslint-disable-line */
}

function addMagicBtn(selectedCard) {
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
      removeBtn('magic-btn');
    });
  }
}

function listenForCardsClick() {
  const deck = [...cardsWrapper.children];
  deck.forEach((singleCard) => {
    singleCard.addEventListener('click', () => {
      selectCard(singleCard);
      addMagicBtn(singleCard);
    });
  });
}

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
function createButtons() {
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

function flipCards() {
  if (cardsWrapper.classList.contains('hidden')) {
    cardsWrapper.classList.remove('hidden');
  } else { cardsWrapper.classList.add('hidden'); }
}

function shuffle(cardsToShuffle) {
  cardsToShuffle.sort(() => Math.random() - 0.5);
}

function shuffleCards() {
  cardsWrapper.innerHTML = '';
  shuffle(cards);
  populateCardsWrapper(cards);
}

function listenForBtnsClick() {
  const btnFlip = document.getElementById('flip-btn');
  btnFlip.addEventListener('click', flipCards);
  const btnShuffle = document.getElementById('shuffle-btn');
  btnShuffle.addEventListener('click', shuffleCards);
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
  listenForBtnsClick();
}

function playAgain() {
  removeBtn('play-again');
  removeBtn('flip-btn');
  selectedCardsWrapper.innerHTML = '';
  cardsWrapper.innerHTML = '';
  cards.splice(0, cards.length);
  startGame();
}

function addPlayAgainBtn() {
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-lg', 'btn-secondary');
  button.setAttribute('id', 'play-again');
  button.style.margin = '5px';
  button.innerHTML = 'Start Again';
  btnWrapper.appendChild(button);
  button.addEventListener('click', () => playAgain());
}

document.getElementById('start-game').addEventListener('click', () => {
  startGame();
  removeBtn('start-game');
});
