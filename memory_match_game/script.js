const gameBoard = document.querySelector('.game-board');
const moveCounter = document.getElementById('move-counter');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart-btn');

let cards = [];
let flippedCards = [];
let moves = 0;
let timer = 0;
let interval;

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function initializeGame() {
    gameBoard.innerHTML = '';
    cards = [...cardValues, ...cardValues]; 
    cards.sort(() => Math.random() - 0.5);

    cards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = '?';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    flippedCards = [];
    moves = 0;
    moveCounter.textContent = moves;
    timer = 0;
    timerDisplay.textContent = timer;
    clearInterval(interval);
    interval = setInterval(updateTimer, 1000);
}
function flipCard(event) {
    const clickedCard = event.target;

    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return; 
    }

    clickedCard.classList.add('flipped');
    clickedCard.innerHTML = clickedCard.dataset.value;
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    moves++;
    moveCounter.textContent = moves;

    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerHTML = '?';
            secondCard.innerHTML = '?';
        }, 1000);
    }

    flippedCards = [];
    if (document.querySelectorAll('.matched').length === cards.length) {
        clearInterval(interval);
        alert(`You win! Total moves: ${moves}`);
    }
}

function updateTimer() {
    timer++;
    timerDisplay.textContent = timer;
}

restartButton.addEventListener('click', initializeGame);

initializeGame();
