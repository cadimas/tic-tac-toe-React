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
  return board.filter(el => el.value === "empty");
};
