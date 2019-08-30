function gomokuHorizontal(row, col, checkValue) {
  let streak = 0;
  const leftBound = col - 4 >= 0 ? col - 4 : 0;
  const rightBound = col + 4 < size ? col + 4 : size - 1;

  for (let i = col - 1; i >= leftBound; i--) {
    if (gobanState[row][i] == checkValue) {
      streak++;
    } else {
      break;
    }
  }
  for (let i = col + 1; i <= rightBound; i++) {
    if (gobanState[row][i] == checkValue) {
      streak++;
    } else {
      break;
    }
  }

  return streak >= 4 ? true : false;
}

function gomokuVertical(row, col, checkValue) {
  let streak = 0;
  const topBound = row - 4 >= 0 ? row - 4 : 0;
  const bottomBound = row + 4 < size ? row + 4 : size - 1;

  for (let i = row - 1; i >= topBound; i--) {
    if (gobanState[i][col] == checkValue) {
      streak++;
    } else {
      break;
    }
  }
  for (let i = row + 1; i <= bottomBound; i++) {
    if (gobanState[i][col] == checkValue) {
      streak++;
    } else {
      break;
    }
  }

  return streak >= 4 ? true : false;
}

function gomokuDiagonal(row, col, checkValue) {
  let streak = 0;

  for (let i = 1; i < 5; i++) {
    if (row - i < 0 || col - i < 0) {
      break;
    } else if (gobanState[row - i][col - i] !== checkValue) {
      break;
    }
    streak++;
  }

  for (let i = 1; i < 5; i++) {
    if (row + i >= size || col + i >= size) {
      break;
    } else if (gobanState[row + i][col + i] !== checkValue) {
      break;
    }
    streak++;
  }

  if (streak >= 4) {
    return true;
  }

  streak = 0;

  for (let i = 1; i < 5; i++) {
    if (row + i >= size || col - i < 0) {
      break;
    } else if (gobanState[row + i][col - i] !== checkValue) {
      break;
    }
    streak++;
  }

  for (let i = 1; i < 5; i++) {
    if (row - i < 0 || col + i >= size) {
      break;
    } else if (gobanState[row - i][col + i] !== checkValue) {
      break;
    }
    streak++;
  }

  return streak >= 4 ? true : false;
}

function playGomoku(row, col) {
  if (gobanState[row][col] !== 0) {
    return false;
  }

  let checkValue = (turn % 2 == 0) ? 1 : -1;
  if (gomokuHorizontal(row, col, checkValue) || gomokuVertical(row, col, checkValue) || gomokuDiagonal(row, col, checkValue)) {
    const message = `Player ${turn % 2 + 1} has won the game!`
    window.confirm(message);
  }

  return true;
}