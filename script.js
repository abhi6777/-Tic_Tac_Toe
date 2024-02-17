const cells = document.querySelectorAll(".cell");
const result = document.querySelector("#result");
const restartBtn = document.querySelector("#restart");
const winConditions = {
  // Row win conditions
  row1: [0, 1, 2],
  row2: [3, 4, 5],
  row3: [6, 7, 8],
  // Column win conditions
  col1: [0, 3, 6],
  col2: [1, 4, 7],
  col3: [2, 5, 8],
  // Diagonal win conditions
  diag1: [0, 4, 8],
  diag2: [2, 4, 6],
};

let GameBoard = ["", "", "", "", "", "", "", "", ""];

let players = {
  player1: "X",
  player2: "O",
  currentPlayer: "X",
};

const initializeGame = () => {
  cells.forEach((cell, index) => {
    cell.addEventListener(
      "click",
      () => {
        if(cell.textContent === "") {
          // update the board with current players symbol
          GameBoard[index] = players.currentPlayer;
          cell.textContent = players.currentPlayer;

          // check for winner
          const resultText = winner();
          if(resultText) {
            result.textContent = `${resultText} Wins!`;
            // Disable click on the buttons
            cells.forEach((cell) => {
              cell.removeEventListener("click");
            });
          } else if (GameBoard.every((cell) => cell !== "")) {
            // if there is tie
            result.textContent = "It's a tie!";
          } else {
            // switch player
            switchPlayer();
          }
        }
      }, {once: true}
    );
  });
};

initializeGame();

let switchPlayer = () => {
  players.currentPlayer = players.currentPlayer === "X" ? "O" : "X";
  result.textContent = `Player ${players.currentPlayer} Turn's`;
};

const winner = () => {
  for (let condition in winConditions) {
    // Get the cells corresponding to the current winning condition
    const [a, b, c] = winConditions[condition];
    // Check if all cells in the winning condition are marked with the same symbol
    if (
      GameBoard[a] !== "" &&
      GameBoard[a] === GameBoard[b] &&
      GameBoard[a] === GameBoard[c]
    ) {
      // Return the symbol of the winning player
      return GameBoard[a];
    }
  }
  // Check if all cells are filled (indicating a tie)
  if (GameBoard.every((cell) => cell !== "")) {
    return "Tie"; // Return "Tie" if all cells are filled and there's no winner
  }
  // Return null if there is no winner yet
  return null;
};

restartBtn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });

  result.textContent = `Player X's Turn!`;
  // reset the game board 
  GameBoard = ["", "", "", "", "", "", "", "", ""];
  // Reset currentPlayer to player1
  players.currentPlayer = players.player1;
  initializeGame();
});


// Change theme
let theme = document.querySelector("#theme");
theme.addEventListener("click", () => {
  document.body.classList.toggle("blackTheme");
  document.body.classList.toggle("whiteTheme");
});
