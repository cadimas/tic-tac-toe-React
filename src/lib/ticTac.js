export let doSth = () => {
  console.log("ouw may god");
};

export let checkWin = (board, player) => {
  if (
    (board[0].value === player &&
      board[1].value === player &&
      board[2].value === player) ||
    (board[3].value === player &&
      board[4].value === player &&
      board[5].value === player) ||
    (board[6].value === player &&
      board[7].value === player &&
      board[8].value === player) ||
    (board[0].value === player &&
      board[3].value === player &&
      board[6].value === player) ||
    (board[1].value === player &&
      board[4].value === player &&
      board[7].value === player) ||
    (board[2].value === player &&
      board[5].value === player &&
      board[8].value === player) ||
    (board[0].value === player &&
      board[4].value === player &&
      board[8].value === player) ||
    (board[2].value === player &&
      board[4].value === player &&
      board[6].value === player)
  ) {
    return true;
  } else {
    return false;
  }
};

export let makeAvailSpots = board => {
  return board.filter(el => el.value === "");
};

//ref:https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
// Returns best possible move from index 0 to 8
export function minimax(board, player) {
  let availSpots = makeAvailSpots(board);
  let player1 = "x";
  let ai = "o";

  // checks for the terminal states such as win, lose, and tie
  //and returning a value accordingly
  if (checkWin(board, ai)) {
    return { score: 10 };
  } else if (checkWin(board, player1)) {
    return { score: -10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  //stores moves object after function is finished recursevely
  let moves = [];

  //iterates through available spots in current board
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = availSpots[i].id;
    board[move.index].value = player;

    if (player === ai) {
      let result = minimax(board, player1);
      move.score = result.score;
    } else {
      let result = minimax(board, ai);
      move.score = result.score;
    }

    //resets the move corresponding index to empty
    board[move.index].value = "";

    //pushes move object to moves array
    moves.push(move);
  } // end of for

  let bestMove;

  if (player === ai) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    // else loop over the moves and choose the move with the lowest score
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  // return the chosen move (object) from the moves array
  return moves[bestMove];
} //end of minimax funtion
