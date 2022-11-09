function openPlayerConfig(event) {
    editedPlayer = +event.target.dataset.playerid;
    backdropOverlayElement.style.display = "block";
    editPlayerModalElement.style.display = "block";
}

function closePlayerConfig() {
    backdropOverlayElement.style.display = "none";
    editPlayerModalElement.style.display = "none";
    formElement.firstElementChild.classList.remove("error");
    errorOutputElement.textContent = "";
    formElement.elements["player-name"].value = "";
}

function savePlayerConfig(event) {
    // Override default form functions in the browser
    event.preventDefault();
    // Create an object with all the form fields
    const formData = new FormData(event.target);
    // Get the data from form object using the name of the field
    const enteredPlayerName = formData.get("player-name").trim();
    
    // Check if the name is empty
    if (!enteredPlayerName) {
        event.target.firstElementChild.classList.add("error");
        errorOutputElement.textContent = "Please enter a valid name!";
        return;
    }
    // Dynamically update the player names
    const updatedPlayerDataElement = document.getElementById("player-" + editedPlayer + "-data");
    updatedPlayerDataElement.children[1].textContent = enteredPlayerName;
    
    // Update players data
    players[editedPlayer - 1].name = enteredPlayerName;
    
    // Close the modal
    closePlayerConfig();
}