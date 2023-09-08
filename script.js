
function isPlayerOneWinner(playerOneSelection, playerTwoSelection) {
    if((playerOneSelection.toLowerCase() === "rock") && (playerTwoSelection.toLowerCase() === "scissors")) {
        return true;
    }
    if((playerOneSelection.toLowerCase() === "paper") && (playerTwoSelection.toLowerCase() === "rock")) {
        return true;
    }
    if((playerOneSelection.toLowerCase() === "scissors") && (playerTwoSelection.toLowerCase() === "paper")) {
        return true;
    }
    return false;
}

function playRound(playerSelection, computerSelection) {
    let areEqual = playerSelection.toUpperCase() === computerSelection.toUpperCase();
    if(areEqual) {
        return 0;
    }
    if(isPlayerOneWinner(playerSelection, computerSelection)) {
        return 1;
    }
    return -1;

}

function getComputerChoice() {
    let valueFromComp = Math.floor(Math.random()*3);
    return valueFromComp;
}

function handleClick(buttonClicked) {
    let playerWon = (playerScore === totalNumOfGames);
    let computerWon = (computerScore === totalNumOfGames);
    if(isGameOver(playerWon, computerWon)) {
        resetGame();
        return;
    }

    let playerSelection = updatePlayerSelectionSymbol(buttonClicked);
    let computerSelection = updateComputerSelectionSymbol();
    
    let playerSelectionCamelCase = playerSelection.toUpperCase();
    let computerSelectionUpperCase = computerSelection.toUpperCase();

    let roundScore = playRound(playerSelection, computerSelection);
    updateTextAfterARound(roundScore, playerSelectionCamelCase, computerSelectionUpperCase);
    playerWon = (playerScore === totalNumOfGames);
    computerWon = (computerScore === totalNumOfGames);
    if(isGameOver(playerWon, computerWon)) {
        updateEndGameText(playerWon, computerWon);
    }
    
}


function updateEndGameText(playerWon, computerWon) {
    if (playerWon) {
        updateTextAfterPlayerWinsTheGame();
    }
    if (computerWon) {
        updateTextAfterPlayerLosesTheGame();
    }
}

function updateTextAfterPlayerLosesTheGame() {
    gameHeadingText.textContent = `You LOST the game !!!`;
    gameSubHeadingText.textContent = '';
}

function updateTextAfterPlayerWinsTheGame() {
    gameHeadingText.textContent = `You WON the game !!!`;
    gameSubHeadingText.textContent = '';
}

function updateTextAfterARound(roundScore, playerSelectionCamelCase, computerSelectionUpperCase) {
    if (roundScore > 0) {
        updateTextWhenPlayerWins(playerSelectionCamelCase, computerSelectionUpperCase);
    }
    else if (roundScore < 0) {
        updateTextWhenPlayerLoses(playerSelectionCamelCase, computerSelectionUpperCase);
    }
    else {
        updateTextWhenThereIsATie(playerSelectionCamelCase, computerSelectionUpperCase);
    }
}

function updateTextWhenThereIsATie(playerSelectionCamelCase, computerSelectionUpperCase) {
    gameHeadingText.textContent = `It's a TIE!`;
    gameSubHeadingText.textContent = `${playerSelectionCamelCase} ties with ${computerSelectionUpperCase}`;
}

function updateTextWhenPlayerLoses(playerSelectionCamelCase, computerSelectionUpperCase) {
    gameHeadingText.textContent = `You LOST!`;
    gameSubHeadingText.textContent = `${playerSelectionCamelCase} is beated by ${computerSelectionUpperCase}`;
    computerScore++;
    computerScoreText.textContent = computerScore;
}

function updateTextWhenPlayerWins(playerSelectionCamelCase, computerSelectionUpperCase) {
    gameHeadingText.textContent = `You WON!`;
    gameSubHeadingText.textContent = `${playerSelectionCamelCase} beats ${computerSelectionUpperCase}`;
    playerScore++;
    playerScoreText.textContent = playerScore;
}

function updateComputerSelectionSymbol() {
    let computerChoice = getComputerChoice();
    let computerSelection = CHOICES[computerChoice]["name"];
    computerChoiceSymbol.textContent = CHOICES[computerChoice]["symbol"];
    return computerSelection;
}

function updatePlayerSelectionSymbol(buttonClicked) {
    let playerSelection = '';
    for (let i = 0; i < CHOICES.length; i++) {
        let name = CHOICES[i]["name"];
        let symbol = CHOICES[i]["symbol"];
        if (buttonClicked.toUpperCase() === name.toUpperCase()) {
            playerSelection = name;
            playerChoiceSymbol.textContent = symbol;
        }
    }
    return playerSelection;
}

function resetGame() {
    gameHeadingText.textContent = `Choose your weapon`;
    gameSubHeadingText.textContent = 'First to score 5 points wins the game';
    playerScore = 0;
    computerScore = 0;
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
    playerChoiceSymbol.textContent = '❔';
    computerChoiceSymbol.textContent = '❔';
}

function isGameOver(playerWon, computerWon) {
    return playerWon || computerWon;
}

function startGame() {
    rockButton.addEventListener('click', () => handleClick('rock'));
    paperButton.addEventListener('click', () => handleClick('paper'));
    scissorsButton.addEventListener('click', () => handleClick('scissors'));
}



const CHOICES = [
    {"symbol": "✊🏻", "name": "rock"}, 
    {"symbol": "✋🏻", "name": "paper"},
    {"symbol": "✌️", "name": "scissors"}
];

const rockButton = document.querySelector("#rock-button");
const paperButton = document.querySelector("#paper-button");
const scissorsButton = document.querySelector("#scissors-button");

const playerChoiceSymbol = document.querySelector("#player-choice");
const computerChoiceSymbol = document.querySelector("#computer-choice");

const gameHeadingText = document.querySelector(".game-heading");
const gameSubHeadingText = document.querySelector(".game-sub-heading");

const playerScoreText = document.querySelector("#player-score");
const computerScoreText = document.querySelector("#computer-score");

let playerScore = 0;
let computerScore = 0;
let totalNumOfGames = 5;
startGame();
