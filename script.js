function GameBoard(){
    let board = [];
    for(let i = 0; i < 3; i++){
        board.push(new Array(3).fill(null))
    }

    const getBoard = function(){
        return board;
    }

    const displayBoard = function(){
        for(let i = 0; i < board.length; i++){
            console.log(board[i].map(cell => (cell === null ? '-' : cell)).join(' '));
        }
    }

    const setCell = function( row, col, value){
        if(row >= 0 && row < 3 && col >= 0 && col< 3){
            board[row][col] = value;
            return true;
        }else{
            console.error('Occupied cell cooordinate');
            return false;
        }
    }

    const resetBoard = function (){
        for(let i = 0; i < 3; i++){
            board[i].fill(null)
        }
    }

    return{getBoard, displayBoard, setCell, resetBoard}
}

function TicTacToe(){
    let gameBoard = GameBoard();
    let currentPlayer = 'X';
    let moves = 0;
    const winningCombos = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    const checkWin = function(){
        for(let combo of winningCombos) {
            const [a, b, c] = combo;
            if(gameBoard.getBoard()[a[0]][a[1]] &&
               gameBoard.getBoard()[a[0]][a[1]] === gameBoard.getBoard()[b[0]][b[1]] &&
               gameBoard.getBoard()[a[0]][a[1]] === gameBoard.getBoard()[c[0]][c[1]]) {
               return gameBoard.getBoard()[a[0]][a[1]]; 
            }
        }
        return null;
    }

    function makeMove(row, col) {
        if(gameBoard.setCell(row, col, currentPlayer)) {
            moves++;
            let winner = checkWin();
            if(winner) {
                console.log(`Player ${winner} wins!`);
                gameBoard.displayBoard();
                return true;
            }else if (moves === 9) {
                console.log('The game is a draw.');
                return true;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            return false;
        }
        return false;
    }

    function computerMove() {
        let emptyCells = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard.getBoard()[i][j] === null) {
                    emptyCells.push([i, j]);
                }
            }
        }
        if (emptyCells.length > 0) {
            let[row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            makeMove(row, col);
        }
    }

    function playerMove(row, col) {
        if (makeMove(row, col)) return;
        setTimeout(computerMove, 500);
    }

    return {
        gameBoard: gameBoard,
        playerMove: playerMove,
        currentPlayer: function() {
            return currentPlayer;
        },
        resetGame: function() {
            gameBoard.resetBoard();
            currentPlayer = 'X';
            moves = 0;
        }
    };
}

let game = TicTacToe();

game.playerMove(0, 0);
game.gameBoard.displayBoard()