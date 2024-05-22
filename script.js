const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton')
let oTurn;
startGame();

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once : true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show');
}

restartButton.addEventListener('click', startGame)


function handleClick(event){
    const cell = event.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurn();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.textContent = "It's a tie"
    } else{
        winningMessageTextElement.textContent = `${oTurn ? "O's" : "X's"} Wins!!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(O_CLASS)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function switchTurn() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }    
}

function checkWin(currentClass) {
    return WINNING_COMBOS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}