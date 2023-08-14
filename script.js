let playerScore = 0
let computerScore = 0
let roundWinner = ""

const scoreInfo = document.getElementById("score-info")
const scoreMessage = document.getElementById("score-message")
const playerScoreShow = document.getElementById("player-score")
const computerScoreShow = document.getElementById("computer-score")
const playerChoice = document.getElementById("player-choice")
const computerChoice = document.getElementById("computer-choice")
const rockBtn = document.getElementById("rock-button")
const paperBtn = document.getElementById("paper-button")
const scissorsBtn = document.getElementById("scissors-button")
const endgameModal = document.getElementById("endgame-modal")
const endgameMsg = document.getElementById('endgame-message')
const overlay = document.getElementById("overlay")
const restartBtn = document.getElementById("restart-button")


rockBtn.addEventListener('click', function () {
    handleClick('ROCK')
})
scissorsBtn.addEventListener('click', function () {
    handleClick('SCISSORS')
})
paperBtn.addEventListener('click', function () {
    handleClick('PAPER')
})
restartBtn.addEventListener('click', function () {
    restartGame()
})
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
    if (isGameOver()) {
        openEndgameModal()
        return
    }

    const computerSelection = getComputerChoice()
    playRound(playerSelection, computerSelection)
    updateChoices(playerSelection, computerSelection)
    updateScore()

    if (isGameOver()) {
        openEndgameModal()
        setFinalMessage()
    }
}

function isGameOver() {
    return playerScore === 5 || computerScore === 5
}
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        roundWinner = 'tie'
    }
    if (
        (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
        (playerSelection === 'PAPER' && computerSelection === 'ROCK')
    ) {
        playerScore++
        roundWinner = 'player'
    }
    if (
        (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
        (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
        (computerSelection === 'PAPER' && playerSelection === 'ROCK')
    ) {
        computerScore++
        roundWinner = 'computer'
    }
    updateScoreMessage(roundWinner, playerSelection, computerSelection)
}




function getComputerChoice() {
    choices = ['ROCK', 'PAPER', 'SCISSORS']
    choice = Math.floor(Math.random() * 3)

    return choices[choice]
}

function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
        case 'ROCK':
            playerChoice.textContent = '🪨'
            break
        case 'PAPER':
            playerChoice.textContent = '📄'
            break
        case 'SCISSORS':
            playerChoice.textContent = '✂️'
            break
    }

    switch (computerSelection) {
        case 'ROCK':
            computerChoice.textContent = '🪨'
            break
        case 'PAPER':
            computerChoice.textContent = '📄'
            break
        case 'SCISSORS':
            computerChoice.textContent = '✂️'
            break
    }
}

function updateScore() {
    if (roundWinner === 'tie') {
        scoreInfo.textContent = "It's a tie!"
    } else if (roundWinner === 'player') {
        scoreInfo.textContent = 'You won!'
    } else if (roundWinner === 'computer') {
        scoreInfo.textContent = 'You lost!'
    }

    playerScoreShow.textContent = `Player: ${playerScore}`
    computerScoreShow.textContent = `Computer: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === 'player') {
        scoreMessage.textContent = `${capitalizeFirstLetter(
            playerSelection
        )} beats ${computerSelection.toLowerCase()}`
    } else if (winner === 'computer') {
        scoreMessage.textContent = `${capitalizeFirstLetter(
            playerSelection
        )} is beaten by ${computerSelection.toLowerCase()}`
    } else {
        scoreMessage.textContent = `${capitalizeFirstLetter(
            playerSelection
        )} ties with ${computerSelection.toLowerCase()}`
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
}

function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}

function setFinalMessage() {
    return playerScore > computerScore
        ? (endgameMsg.textContent = 'You won!')
        : (endgameMsg.textContent = 'You lost...')
}

function restartGame() {
    playerScore = 0
    computerScore = 0
    scoreInfo.textContent = 'Beat the computer!'
    scoreMessage.textContent = 'First to score 5 points wins.'
    playerScoreShow.textContent = 'Player: 0'
    computerScoreShow.textContent = 'Computer: 0'
    playerChoice.textContent = '❔'
    computerChoice.textContent = '❔'
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}

