
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

function handleButtonClick(button) {
    console.log(`Clicked`);
}

function game() {


    let numOfRounds = 1;
    let userScore = 0;
    let computerScore = 0;
    for(let roundNo=1; roundNo<=numOfRounds; roundNo++) {
        ({ userScore, computerScore } = playOneRound(roundNo, userScore, computerScore));
    }
    console.log(`Final scores, your score = ${userScore}, computer score = ${computerScore}`);
}

function playOneRound(roundNo, userScore, computerScore) {
    let playerIntChoice = parseInt(prompt("Enter 1 for rock, 2 for paper and 3 for scissors."));
    let playerOneSelection = CHOICES[playerIntChoice - 1];
    console.log(`For round #${roundNo}`);
    console.log(`You selected ${playerOneSelection}`);
    let computerSelection = getComputerChoice();
    console.log(`Computer selected ${computerSelection}`);
    let roundScore = playRound(playerOneSelection, computerSelection);
    if (roundScore > 0) {
        userScore++;
        console.log(`You won.`);
    }
    else if (roundScore < 0) {
        computerScore++;
        console.log(`Computer won.`);
    }
    else {
        console.log(`We have a tie.`);
    }
    console.log(`After round #${roundNo}, your score = ${userScore}, computer score = ${computerScore}`);
    return { userScore, computerScore };
}

function handleClick(buttonClicked) {
    let playerSelection = '';
    for(let i=0; i<CHOICES.length; i++) {
        let name = CHOICES[i]["name"];
        let symbol = CHOICES[i]["symbol"];
        if(buttonClicked.toUpperCase() === name.toUpperCase()) {
            playerSelection = name;
            playerChoiceSymbol.textContent = symbol;
        }
    }
    let computerChoice = getComputerChoice();
    computerChoiceSymbol.textContent = CHOICES[computerChoice]["symbol"];
    let computerSelection = CHOICES[computerChoice]["name"];
    let playerSelectionCamelCase = playerSelection.toUpperCase();
    let computerSelectionUpperCase = computerSelection.toUpperCase();
    let roundScore = playRound(playerSelection, computerSelection);
    if (roundScore > 0) {
        gameHeadingText.textContent = `You WON!`;
        gameSubHeadingText.textContent = `${playerSelectionCamelCase} beats ${computerSelectionUpperCase}`;
        playerScore++;
        playerScoreText.textContent = playerScore;
    }
    else if (roundScore < 0) {
        gameHeadingText.textContent = `You LOST!`;
        gameSubHeadingText.textContent = `${playerSelectionCamelCase} is beated by ${computerSelectionUpperCase}`;
        computerScore++;
        computerScoreText.textContent = computerScore;
    }
    else {
        gameHeadingText.textContent = `It's a TIE!`;
        gameSubHeadingText.textContent = `${playerSelectionCamelCase} ties with ${computerSelectionUpperCase}`;
    }
    
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

startGame();
