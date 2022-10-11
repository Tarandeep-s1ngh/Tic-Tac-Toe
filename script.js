const X_CLASS = "x";
const O_CLASS = "o";
const WIN_CONDITIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const cells = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".board");
const winningMsgTextElement = document.querySelector("[data-result-text]");
const resultMsgElement = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");
const turnTitle = document.getElementById("turn-title");

let oTurn;

const startGame = () => {
    oTurn = false;
    turnTitle.innerText = "X's Turn";
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", cellClickHandler)
        cell.addEventListener("click", cellClickHandler, {once: true})
    })
    setBoarHoverClass();
    resultMsgElement.classList.remove("show");
}

const placeMark = (currentCell, currentClass) => {
    currentCell.classList.add(currentClass);
}

const checkWin = (currentClass) => {
    return WIN_CONDITIONS.some(condition => {
        return condition.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}

const checkDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

const endGame = (isDraw) => {
    if(isDraw) {
        winningMsgTextElement.innerText = "Draw!";
    } else {
        winningMsgTextElement.innerText = oTurn ? "O Wins!" : "X Wins!";
    }
    resultMsgElement.classList.add("show");
}

const changeTurns = () => {
    oTurn = !oTurn;
    oTurn ? 
    turnTitle.innerText = "O's Turn" : 
    turnTitle.innerText = "X's Turn";
}

const setBoarHoverClass = () => {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    oTurn ? board.classList.add(O_CLASS) : board.classList.add(X_CLASS);
}

const cellClickHandler = (e) => {
    const currentCell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(currentCell, currentClass);
    if(checkWin(currentClass)) {
        endGame(false);
    } else if(checkDraw()) {
        endGame(true);
    } else {
        changeTurns();
        setBoarHoverClass();
    }
}

restartBtn.addEventListener("click", startGame);

startGame();



