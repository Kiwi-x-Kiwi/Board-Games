//Global Variables
let turn = 0;
let pass = 0;
let game = "gomoku";
let size = 9;
let gobanState = [];

function createGoban(size = 9) {

  let gobanText = "";
  let goban = document.querySelector("#goban");

  emptyGoban();

  switch (size) {
    case 8: {
      gobanText += createRow("othello-top");
      for (i = 0; i < 6; i++) {
        gobanText += createRow("othello");
      }
      gobanText += createRow("othello-bottom");

      gobanState = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
      ];
      break;
    }
    case 9: {
      gobanText += createRow("top");
      for (i = 0; i < 7; i++) {
        if (i == 1 || i == 5) {
          gobanText += createRow("two-hoshi")
        } else if (i == 3) {
          gobanText += createRow("middle")
        } else {
          gobanText += createRow();
        }
      }
      gobanText += createRow("bottom");

      gobanState = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];

      break;
    }
  }


  goban.innerHTML += gobanText;

  // console.log(gobanText);
  let intersections = document.querySelectorAll("#goban > img");
  for (let i = 0; i < intersections.length; i++) {
    intersections[i].onclick = placePiece;
    intersections[i].setAttribute("alt", `${i}`);
    intersections[i].setAttribute("alt", `${i}`);

    if(size == 8){
      intersections[i].style.width = "12.5%"
    }
  }


}

function emptyGoban() {
  document.querySelector("#goban").innerHTML = "";

  turn = 0;
  pass = 0;
}

function createRow(rowType) {
  let row = "";
  const cornerUl = `<img src="./css/corner-ul.png"></img>`
  const cornerUr = `<img src="./css/corner-ur.png"></img>`
  const cornerBl = `<img src="./css/corner-bl.png"></img>`
  const cornerBr = `<img src="./css/corner-br.png"></img>`
  const borderTop = `<img src="./css/border-top.png"></img>`
  const borderRight = `<img src="./css/border-right.png"></img>`
  const borderBottom = `<img src="./css/border-bottom.png"></img>`
  const borderLeft = `<img src="./css/border-left.png"></img>`
  const middle = `<img src="./css/middle.png"></img>`
  const hoshi = `<img src="./css/hoshi.png"></img>`

  if (rowType == "top") {
    row += cornerUl + borderTop.repeat(7) + cornerUr;
  } else if (rowType == "bottom") {
    row += cornerBl + borderBottom.repeat(7) + cornerBr;
  } else if (rowType == "two-hoshi") {
    row += borderLeft + middle.repeat(1) + hoshi + middle.repeat(3) + hoshi + middle + borderRight;
  } else if (rowType == "middle") {
    row += borderLeft + middle.repeat(3) + hoshi + middle.repeat(3) + borderRight;
  } else if (rowType == "othello-top") {
    row += cornerUl + borderTop.repeat(6) + cornerUr;
  } else if (rowType == "othello") {
    row += borderLeft + middle.repeat(6) + borderRight;
  } else if (rowType == "othello-bottom") {
    row += cornerBl + borderBottom.repeat(6) + cornerBr;
  } else {
    row += borderLeft + middle.repeat(7) + borderRight;
  }

  return row;
}

function changeGame() {
  if (document.querySelector("select[name=games]").value == "othello") {
    document.querySelector("select[name=board-size]").innerHTML = '<option value="8">8 x 8</option>';

    createGoban(8);
  }
  else {
    document.querySelector("select[name=board-size]").innerHTML =
      `<option value="9">9 x 9</option>
      <option value="13">13 x 13</option>
      <option value="19">19 x 19</option>`;

    createGoban(9);
  }
}

function checkHorizontal(row, col) {
  let checkValue = gobanState[row][col];
  let streak = -1;
  const leftBound = col - 4 >= 0 ? col - 4 : 0;
  const rightBound = col + 4 <= 8 ? col + 4 : 8;


  for (let i = col; i >= leftBound; i--) {
    if (gobanState[row][i] == checkValue) {
      streak++;
    } else {
      break;
    }
  }
  for (let i = col; i <= rightBound; i++) {
    if (gobanState[row][i] == checkValue) {
      streak++;
    } else {
      break;
    }
  }

  return streak > 4;
}

function checkVertical(row, col) {
  let checkValue = gobanState[row][col];
  let streak = -1;
  const topBound = row - 4 >= 0 ? row - 4 : 0;
  const bottomBound = row + 4 <= 8 ? row + 4 : 8;


  for (let i = row; i >= topBound; i--) {
    if (gobanState[i][col] == checkValue) {
      streak++;
    } else {
      break;
    }
  }
  for (let i = row; i <= bottomBound; i++) {
    if (gobanState[i][col] == checkValue) {
      streak++;
    } else {
      break;
    }
  }

  return streak > 4;
}

function checkDiagonal(row, col) {
  let checkValue = gobanState[row][col];
  let streak = -1;

  for (let i = 0; i < 5; i++) {
    if (row - i < 0 || col - i < 0) {
      break;
    } else if (gobanState[row - i][col - i] !== checkValue) {
      break;
    }
    streak++;
  }

  for (let i = 0; i < 5; i++) {
    if (row + i > 8 || col + i > 8) {
      break;
    } else if (gobanState[row + i][col + i] !== checkValue) {
      break;
    }
    streak++;
  }

  if (streak > 4) {
    return true;
  }

  streak = -1;

  for (let i = 0; i < 5; i++) {
    if (row + i > 8 || col - i < 0) {
      break;
    } else if (gobanState[row + i][col - i] !== checkValue) {
      break;
    }
    streak++;
  }

  for (let i = 0; i < 5; i++) {
    if (row - i < 0 || col + i > 8) {
      break;
    } else if (gobanState[row - i][col + i] !== checkValue) {
      break;
    }
    streak++;
  }

  return streak > 4;
}

function checkBoard(row, col) {
  let message = "";

  if (gobanState[row][col] == 1) {
    message += "Black has won the game!"
  } else {
    message += "White has won the game!"
  }

  if (checkHorizontal(row, col) || checkVertical(row, col) || checkDiagonal(row, col)) {
    window.confirm(message);
  }
}

function placePiece(e) {
  const intersection = e.target;
  const filepath = "file:///C:/Users/qiwei/Desktop/Code/IronHack/module-1/self-directed-project/Board-Games/";
  const isBlack = (turn % 2 == 0);
  const position = Number(intersection.alt);
  const row = Math.floor(position / 9);
  const col = position % 9;

  const cornerUl = `${filepath}css/corner-ul.png`
  const cornerUr = `${filepath}css/corner-ur.png`
  const cornerBl = `${filepath}css/corner-bl.png`
  const cornerBr = `${filepath}css/corner-br.png`
  const borderTop = `${filepath}css/border-top.png`
  const borderRight = `${filepath}css/border-right.png`
  const borderBottom = `${filepath}css/border-bottom.png`
  const borderLeft = `${filepath}css/border-left.png`
  const middle = `${filepath}css/middle.png`
  const hoshi = `${filepath}css/hoshi.png`

  if (isBlack) {
    switch (intersection.src) {
      case cornerUl:
        intersection.setAttribute("src", "./css/corner-ul-b.png");
        break;
      case borderTop:
        intersection.setAttribute("src", `./css/border-top-b.png`);
        break;
      case cornerUr:
        intersection.setAttribute("src", "./css/corner-ur-b.png");
        break;
      case borderLeft:
        intersection.setAttribute("src", `./css/border-left-b.png`);
        break;
      case middle:
        intersection.setAttribute("src", `./css/middle-b.png`);
        break;
      case borderRight:
        intersection.setAttribute("src", `./css/border-right-b.png`);
        break;
      case cornerBl:
        intersection.setAttribute("src", `./css/corner-bl-b.png`);
        break;
      case borderBottom:
        intersection.setAttribute("src", `./css/border-bottom-b.png`);
        break;
      case cornerBr:
        intersection.setAttribute("src", `./css/corner-br-b.png`);
        break;
      case hoshi:
        intersection.setAttribute("src", `./css/middle-b.png`);
        break;
      default:
        return;
    }
  } else {
    switch (intersection.src) {
      case cornerUl:
        intersection.setAttribute("src", "./css/corner-ul-w.png");
        break;
      case borderTop:
        intersection.setAttribute("src", `./css/border-top-w.png`);
        break;
      case cornerUr:
        intersection.setAttribute("src", "./css/corner-ur-w.png");
        break;
      case borderLeft:
        intersection.setAttribute("src", `./css/border-left-w.png`);
        break;
      case middle:
        intersection.setAttribute("src", `./css/middle-w.png`);
        break;
      case borderRight:
        intersection.setAttribute("src", `./css/border-right-w.png`);
        break;
      case cornerBl:
        intersection.setAttribute("src", `./css/corner-bl-w.png`);
        break;
      case borderBottom:
        intersection.setAttribute("src", `./css/border-bottom-w.png`);
        break;
      case cornerBr:
        intersection.setAttribute("src", `./css/corner-br-w.png`);
        break;
      case hoshi:
        intersection.setAttribute("src", `./css/middle-w.png`);
        break;
      default:
        return;
    }
  }

  gobanState[row][col] = isBlack ? 1 : -1;
  turn++;
  pass = 0;

  checkBoard(row, col);
}

function passTurn() {
  turn++;
  pass++;
}

window.onload = function () {
  createGoban();

  document.querySelector("#pass").onclick = passTurn;
  document.querySelector("#restart").onclick = changeGame;

  document.querySelector("select[name=games]").onchange = changeGame;
}

