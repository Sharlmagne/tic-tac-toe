function resetGameStatus() {
   activePlayer = 0;
   currentRound = 0; 
   gameIsOver = false;
   // gameOverElement.firstElementChild.innerHTML = 
    gameOverElement.style.display = "none";
    gameAreaElement.style.display = "none";
    
    let index = 0;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++) {
            const gameBoardElement = gameBoardElements[index];
            gameData[i][j] = 0;
            gameBoardElement.textContent = "";
            gameBoardElement.classList.remove("disabled");
            index++;
        }
    }
}

function startNewGame() {
    // Check if names are entered for both players
    if (players[0].name && players[1].name) {
        resetGameStatus();
        activePlayerNameElement.textContent = players[activePlayer].name;
        gameAreaElement.style.display = "block";
    } else {
        alert("Please set custom player name for both players!")
    }
    // activePlayerNameElement.textContent = players[activePlayer].name;
    // gameAreaElement.style.display = "block";
    
}
function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    }else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    
    if (gameIsOver) {
        return;
    }
    const selectedField = event.target;
    // Get the select tile position
    const selectedColumn = selectedField.dataset.col - 1;
    const selectedRow = selectedField.dataset.row - 1;
    
    // Disable selected tile
    if (gameData[selectedRow][selectedColumn] > 0) {
        return;
    }
    selectedField.classList.add("disabled");
    
    // Add player symbol to tile
    selectedField.textContent = players[activePlayer].symbol;
    
    // Update the game board
    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    
    // Get the winner's id
    const winnerId = checkForGameOver();
    if (winnerId !== 0) {
        endGame(winnerId);
        return;
    }
    
    currentRound++;
    switchPlayer();
}

function checkForGameOver(){
    
    for (let i = 0; i < 3; i++) {
        // Check for row equality
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]
        ) {
            return gameData[i][0];
        }
        
        // Check for column equality
        if (
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[1][i] === gameData[2][i]
        ) {
            return gameData[0][i];
        }
    }
    // Check for diagonal equality: top left to bottom right
    if (
            gameData[0][0] > 0 &&
            gameData[0][0] === gameData[1][1] &&
            gameData[1][1] === gameData[2][2]
        ) {
            return gameData[0][0];
        }
    // Check for diagonal equality: bottom left to top right
    if (
            gameData[2][0] > 0 &&
            gameData[2][0] === gameData[1][1] &&
            gameData[1][1] === gameData[0][2]
        ) {
            return gameData[2][0];
        }
    
    // Check for draw
    if (currentRound === 9) {
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    if (winnerId > 0) {
        winnerNameElement.textContent = players[winnerId - 1].name
    } else {
        gameOverElement.firstElementChild.textContent = "It's a draw!"
    }
    gameIsOver = true;
    gameOverElement.style.display = "block";
}