// Game array
const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

// Initialize the current player number
let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

// Player data
const players = [
    {
        name: "",
        symbol: "X"
    },
    {
        name: "",
        symbol: "O"
    },
]

// Backdrop and modal elements
const backdropOverlayElement = document.getElementById("backdrop");
const editPlayerModalElement = document.getElementById("config-overlay");
const formElement = document.querySelector("form");
const errorOutputElement = document.getElementById("config-errors");

// Edit player button
const editPlayer1BtnElement = document.querySelector(".block-1 button");
const editPlayer2BtnElement = document.querySelector(".block-2 button");
// Cancel edit player modal button
const cancelConfigBtnElement = document.getElementById("cancel-config");
// Start game button element
const startGameBtn = document.getElementById("start-game-btn");

// Game element
const gameAreaElement = document.getElementById("active-game");
const gameOverElement = document.getElementById("game-over");
const winnerNameElement = document.getElementById("winner-name")
const gameBoardElements = document.querySelectorAll("#tic-tac-toe li");
const activePlayerNameElement = document.getElementById("active-player-name");


// Open edit player section
editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);
cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropOverlayElement.addEventListener("click", closePlayerConfig);
formElement.addEventListener("submit", savePlayerConfig);
// Start game button
startGameBtn.addEventListener("click",startNewGame);

// Game board
for (const gameBoardElement of gameBoardElements) {
    gameBoardElement.addEventListener("click", selectGameField);
}
