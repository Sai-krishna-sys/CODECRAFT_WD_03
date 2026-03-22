const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsAiButton = document.getElementById('player-vs-ai');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let vsAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();

    if (gameActive && vsAI && currentPlayer === 'X') {
        setTimeout(makeAIMove, 500);
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        status.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        status.textContent = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `It's ${currentPlayer}'s turn`;
}

function makeAIMove() {
    let availableCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') {
            availableCells.push(index);
        }
    });

    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const aiMove = availableCells[randomIndex];
        gameState[aiMove] = 'O';
        cells[aiMove].textContent = 'O';
        checkResult();
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = false;
    status.textContent = 'Choose a game mode to start!';
    cells.forEach(cell => cell.textContent = '');
}

function startPlayerVsPlayer() {
    resetGame();
    gameActive = true;
    vsAI = false;
    status.textContent = `It's ${currentPlayer}'s turn`;
}

function startPlayerVsAI() {
    resetGame();
    gameActive = true;
    vsAI = true;
    status.textContent = `It's ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playerVsPlayerButton.addEventListener('click', startPlayerVsPlayer);
playerVsAiButton.addEventListener('click', startPlayerVsAI);