var cell = document.querySelectorAll(".cell");
var resetbtn = document.getElementById("resetbtn");
var who = document.querySelector(".who");

let currentplayer = "X";
let gamestate = ['', '', '', '', '', '', '', '', ''];
let running = false;

const winningcond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function toggleHighlight(button) {
    document.querySelectorAll('.mode-button').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');

    if (button.textContent === "Computer") {
        startai();
    } else {
        startgame();
    }
}

function startai() {
    resetGame();
    cell.forEach(cell => cell.removeEventListener("click", cellclick)); // Remove any existing event listeners
    cell.forEach(cell => cell.addEventListener("click", cellclickai)); // Add AI event listeners
    running = true;
    who.textContent = `${currentplayer}'s Turn`;
}

function startgame() {
    resetGame(); 
    cell.forEach(cell => cell.removeEventListener("click", cellclickai)); // Remove AI listeners
    cell.forEach(cell => cell.addEventListener("click", cellclick)); // Add player event listeners
    running = true;
    who.textContent = `${currentplayer}'s Turn`;
   
}

function cellclickai() {
    const index = this.dataset.index;
    if (gamestate[index] !== "" || !running) {
        return;
    } else {
        gamestate[index] = currentplayer;
        cell[index].innerHTML = currentplayer;
        checkwinner();
        if (running) {
            currentplayer = "O";
            computermove();
        }
    }
}

function cellclick() {
    const index = this.dataset.index;
    if (gamestate[index] !== "" || !running) {
        return;
    } else {
        gamestate[index] = currentplayer;
        cell[index].innerHTML = currentplayer;
        checkwinner();
    }
}

function computermove() {
    if (!running) {
        return;
    }
    let availablecells = [];
    for (let i = 0; i < gamestate.length; i++) {
        if (gamestate[i] === "") {
            availablecells.push(i);
        }
    }
    if (availablecells.length === 0) {
        return;
    }

    const random = Math.floor(Math.random() * availablecells.length);
    const chosencell = availablecells[random];
    gamestate[chosencell] = currentplayer;
    cell[chosencell].textContent = currentplayer;
    checkwinner();

    if (running) {
        currentplayer = "X";
        who.textContent = `${currentplayer}'s Turn`;
    }
}

function checkwinner() {
    let iswon = false;
    for (let i = 0; i < winningcond.length; i++) {
        var cond = winningcond[i];
        var cell1 = gamestate[cond[0]];
        var cell2 = gamestate[cond[1]];
        var cell3 = gamestate[cond[2]];
        if (cell1 === "" || cell2 === "" || cell3 === "") {
            continue;
        } else if (cell1 === cell2 && cell2 === cell3) {
            iswon = true;
            break;
        }
    }

    if (iswon) {
        who.textContent = `${currentplayer}'s Won!`;
        running = false;
    } else if (!gamestate.includes("")) {
        who.textContent = `It's a Draw!`;
        running = false;
    } else {
        changeplayer();
    }
}

function changeplayer() {
    currentplayer = currentplayer === "X" ? "O" : "X";
    who.textContent = `${currentplayer}'s Turn`;
}

function resetGame() {
    gamestate = ['', '', '', '', '', '', '', '', ''];
    running = true;
    currentplayer = "X";
    who.textContent = `${currentplayer}'s Turn`;
    cell.forEach(cell => {
        cell.textContent = "";
    });
}

resetbtn.addEventListener("click", resetGame);
