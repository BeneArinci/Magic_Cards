const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
const cards = [];

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  for (let x = 0; x < suits.length; x += 1) {
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
  populateCardsWrapper();
}

function populateCardsWrapper() {
  cards.forEach((card, i) => {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardsWrapper.append(cardElement);
  });
  formatCardsVisualisation(cardsWrapper);
  listenForCardsClick();
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  const buttons = [
    {name: 'shuffle-btn', innerHTML: 'Shuffle'}, 
    {name: 'flip-btn', innerHTML: 'Show/Hide'}
  ];
  buttons.forEach((btn) => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-lg', 'btn-secondary');
    button.setAttribute('id', `${btn.name}`);
    button.style.margin = '5px';
    button.innerHTML = `${btn.innerHTML}`;
    btnWrapper.appendChild(button);
  })
}

function removeBtn(buttonId) {
  Btn = document.getElementById(buttonId);
  Btn.remove();
}

function listenForCardsClick() {
  deck = [...cardsWrapper.children]
  deck.forEach((singleCard) => {
    singleCard.addEventListener('click', function() {
      selectCard(singleCard);
      addMagicBtn(singleCard);
    });
  })   
}

function selectCard(card) {
  const selectedCards = [...selectedCardsWrapper.children]
  if (selectedCards.length === 0) {
    const positionFromLeft = 0;
    card.style.left = `${positionFromLeft}px`;
    selectedCardsWrapper.appendChild(card);
    removeBtn('shuffle-btn');
  }
}

function addMagicBtn(selectedCard) {
  const magicBtn = document.getElementById('magic-btn');
  const selectedCards = [...selectedCardsWrapper.children];
  if (magicBtn === null && selectedCards.length === 1) {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-lg', 'btn-secondary', 'magic');
    button.setAttribute('id', `magic-btn`);
    button.style.margin = '5px';
    button.innerHTML = `Magic`;
    btnWrapper.appendChild(button); 
    button.addEventListener('click', () => {
      performTheMagic(selectedCard);
      removeBtn('magic-btn');
    });
  }
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
    button.setAttribute('id', `play-again`);
    button.style.margin = '5px';
    button.innerHTML = `Start Again`;
    btnWrapper.appendChild(button); 
    button.addEventListener('click', () => playAgain());
}

function performTheMagic(card) {
  const cardValue = getCardValue(card);
  const deck = [...cardsWrapper.children];
  deck.forEach((notSelectedCard) => {
    if(getCardValue(notSelectedCard) === cardValue) {
      //console.log(notSelectedCard.classList)
      selectedCardsWrapper.appendChild(notSelectedCard)
      // console.log(selectedCardsWrapper)
    }
  })
  formatCardsVisualisation(selectedCardsWrapper);
  addCardsAnimation();
  addPlayAgainBtn();
}

function addCardsAnimation() {
  const selectedCards = [...selectedCardsWrapper.children];
  selectedCards.forEach((card) => {
    card.classList.add('magic');
    console.log(card.classList);
  })
}

function formatCardsVisualisation(specificWrapper) {
  cardsToStyle = [...specificWrapper.children]
  cardsToStyle.forEach((card, i) => {
    const positionFromLeft = i*30;
    card.style.left = `${positionFromLeft}px`;
  });
}

function getCardValue(card) {
  return card.classList.value.split('-').pop();
}

function flipCards() {
  if (cardsWrapper.classList.contains('hidden')) {
    cardsWrapper.classList.remove('hidden');
  } else { cardsWrapper.classList.add('hidden');};
}

function shuffleCards() {
  cardsWrapper.innerHTML = '';
  shuffle(cards);
  populateCardsWrapper(cards);
}

function shuffle(cards) {
  cards.sort(() => Math.random() - 0.5);
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

document.getElementById('start-game').addEventListener('click', () => {
  startGame();
  removeBtn('start-game');
});

