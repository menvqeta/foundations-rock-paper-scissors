const CHOICES = ["rock", "paper", "scissors"];

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
    return CHOICES[valueFromComp];
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

game();
