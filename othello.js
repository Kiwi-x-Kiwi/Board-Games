let didFlip = false;

// Changes the src path of an img element that needs to be changed
function flipPiece(row, col, checkValue) {
  let currentEnding, newEnding;

  // Selects the corresponding child on the goban
  let toFlip = document.querySelector(`#goban > img:nth-child(${row * size + col + 1})`);

  if (checkValue == 1) {
    currentEnding = "-w.png";
    newEnding = "-b.png";
  } else {
    currentEnding = "-b.png";
    newEnding = "-w.png";
  }

  // Changes src path
  toFlip.outerHTML = toFlip.outerHTML.replace(currentEnding, newEnding);
  gobanState[row][col] = checkValue;

  didFlip = true;
}

// Checks horizontally to see if any pieces will be flipped
function checkHorizontal(row, col, checkValue) {
  let i = 1;

  // Moves to the left until a 0 element, an element of the same value
  // or the edge of the 2D array is reached.
  while ((col - i > 0) && gobanState[row][col - i] != checkValue && gobanState[row][col - i] != 0) {
    i++;
  }

  // If the reached element is of the same value as checkValue, all
  // elements traversed will be flipped
  if ((col - i >= 0) && gobanState[row][col - i] == checkValue) {
    for (i = i - 1; i > 0; i--) {
      flipPiece(row, (col - i), checkValue);
    }
  }

  i = 1;
  // Moves to the right until a 0 element, an element of the same value
  // or the edge of the 2D array is reached.
  while ((col + i < size) && gobanState[row][col + i] != checkValue && gobanState[row][col + i] != 0) {
    i++;
  }

  // If the reached element is of the same value as checkValue, all
  // elements traversed will be flipped
  if ((col + i < size) && gobanState[row][col + i] == checkValue) {
    for (i = i - 1; i > 0; i--) {
      flipPiece(row, (col + i), checkValue);
    }
  }
}
// Checks vertically to see if any pieces will be flipped
function checkVertical(row, col, checkValue) {
  let i = 1;

  // Moves up until a 0 element, an element of the same value or the 
  // edge of the 2D array is reached.
  while ((row - i > 0) && gobanState[row - i][col] != checkValue && gobanState[row - i][col] != 0) {
    i++;
  }

  // If the reached element is of the same value as checkValue, all
  // elements traversed will be flipped
  if ((row - i >= 0) && gobanState[row - i][col] == checkValue) {
    for (i = i - 1; i > 0; i--) {
      flipPiece((row - i), col, checkValue);
    }
  }

  i = 1;
  // Moves down until a 0 element, an element of the same value or the 
  // edge of the 2D array is reached.
  while ((row + i < size) && gobanState[row + i][col] != checkValue && gobanState[row + i][col] != 0) {
    i++;
  }

  // If the reached element is of the same value as checkValue, all
  // elements traversed will be flipped
  if ((row + i < size) && gobanState[row + i][col] == checkValue) {
    for (i = i - 1; i > 0; i--) {
      flipPiece((row + i), col, checkValue);
    }
  }
}

// Checks diagonally to see if any pieces will be flipped
function checkDiagonal(row, col, checkValue) {
  let i, j;
  i = j = 1;

  // Checks upper-left to see if any pieces will be flipped
  console.log("UL");
  while ((row - i > 0) && (col - j > 0) && gobanState[row - i][col - j] != checkValue && gobanState[row - i][col - j] != 0){
    i++;
    j++;
  }

  if ((row - i >= 0) && (col - j >= 0) && gobanState[row - i][col - j] == checkValue) {
    j = j - 1;
    for (i = i - 1; i > 0; i--) {
      flipPiece((row - i), (col - j), checkValue);
      j--;
    }
  }

  i = j = 1;
  // Checks lower-right to see if any pieces will be flipped
  console.log("LR");
  while ((row + i < size) && (col + j < size) && gobanState[row + i][col + j] != checkValue && gobanState[row + i][col + j] != 0) {
    i++;
    j++;
  }

  if ((row + i < size) && (col + j < size) && gobanState[row + i][col + j] == checkValue) {
    j = j - 1;
    for (i = i - 1; i > 0; i--) {
      flipPiece((row + i), (col + j), checkValue);
      j--;
    }
  }

  i = j = 1;
  // Checks upper-right to see if any pieces will be flipped
  console.log("UR");
  while ((row - i > 0) && (col + j < size) && gobanState[row - i][col + j] != checkValue && gobanState[row - i][col + j] != 0) {
    i++;
    j++;
  }

  if ((row - i >= 0) && (col + j < size) && gobanState[row - i][col + j] == checkValue) {
    j = j - 1;
    for (i = i - 1; i > 0; i--) {
      flipPiece((row - i), (col + j), checkValue);
      j--;
    }
  }

  i = j = 1;
  // Checks lower-left to see if any pieces will be flipped
  console.log("LL");
  while ((row + i < size) && (col - j > 0) && gobanState[row + i][col - j] != checkValue && gobanState[row + i][col - j] != 0) {
    i++;
    j++;
  }

  if ((row + i < size) && (col - j >= 0) && gobanState[row + i][col - j] == checkValue) {
    j = j - 1;
    for (i = i - 1; i > 0; i--) {
      flipPiece((row + i), (col - j), checkValue);
      j--;
    }
  }
}

// Check to see if move is valid (i.e. flips any pieces) return boolean
function playOthello(row, col) {
  // Each board is initialized with 4 pieces already present
  if (turn > 3) {
    didFlip = false;
    checkValue = (turn % 2 == 0) ? 1 : -1;
    console.log(`row: ${row}, col: ${col}`)

    // Checks to see if placing the piece flips any pieces in any
    // direction
    checkHorizontal(row, col, checkValue);
    checkVertical(row, col, checkValue);
    checkDiagonal(row, col, checkValue);
    return didFlip;
  } else {
    return true;
  }
}