// Global Variables
let turn, pass, game, size; // game and size initializes to default index.html value;
turn = pass = 0;
let gobanState = [];

// Initializes a (size x size) 2D array with 0s.
function init2DArray(arrSize = size) {
  return Array(arrSize).fill().map(() => Array(arrSize).fill(0));
}

// Create all the rows
function createRows() {
  let rows = "";
  const imgPath = `<img src="./css/`

  rows += (imgPath + `corner-ul.png"></img>` + (imgPath + `border-top.png"></img>`).repeat(size - 2) + imgPath + `corner-ur.png"></img>`); // Top Row

  // All rows in the middle
  for (let i = 1; i < size - 1; i++) {
    let middleRow = ""
    if (game !== "othello") {
      if (size == 19) {
        if (i == 3 || i == 9 || i == 15) {
          middleRow = imgPath + `border-left.png"></img>` + (imgPath + `middle.png"></img>`).repeat(2) + (imgPath + `hoshi.png"></img>`) + (imgPath + `middle.png"></img>`).repeat(5) + (imgPath + `hoshi.png"></img>`) + (imgPath + `middle.png"></img>`).repeat(5) + (imgPath + `hoshi.png"></img>`) + (imgPath + `middle.png"></img>`).repeat(2) + imgPath + `border-right.png"></img>`;
        }
      }else if (size == 13){
        if(i == 3 || i  == 9){
          middleRow = imgPath + `border-left.png"></img>` + (imgPath + `middle.png"></img>`).repeat(2) + (imgPath + `hoshi.png"></img>`) + (imgPath + `middle.png"></img>`).repeat(5) + (imgPath + `hoshi.png"></img>`) + (imgPath + `middle.png"></img>`).repeat(2) + imgPath + `border-right.png"></img>`;
        }else if(i == 6){
          middleRow = imgPath + `border-left.png"></img>` + (imgPath + `middle.png"></img>`).repeat(5) + (imgPath + `hoshi.png"></img>`) + (imgPath + `middle.png"></img>`).repeat(5) + imgPath + `border-right.png"></img>`;
        }
      }else if(size == 9){
        if (i == 2 || i == 6) {
          middleRow = imgPath + `border-left.png"></img>` + (imgPath + `middle.png"></img>`) + (imgPath + `hoshi.png"></img>`) + (imgPath + `middle.png"></img>`).repeat(3) + (imgPath + `hoshi.png"></img>`) + (imgPath + `middle.png"></img>`) + imgPath + `border-right.png"></img>`;
        } else if (i == 4) {
          middleRow = imgPath + `border-left.png"></img>` + (imgPath + `middle.png"></img>`).repeat(3) + (imgPath + `hoshi.png"></img>`) + (imgPath + `middle.png"></img>`).repeat(3) + imgPath + `border-right.png"></img>`;
        }
      }
    }
    
    rows += middleRow == "" ? imgPath + `border-left.png"></img>` + (imgPath + `middle.png"></img>`).repeat(size - 2) + imgPath + `border-right.png"></img>`: middleRow;
  }

  rows += (imgPath + `corner-bl.png"></img>` + (imgPath + `border-bottom.png"></img>`).repeat(size - 2) + imgPath + `corner-br.png"></img>`); // Bottom Row
  return rows;
}

function setPiece(bool, intersection, row, col){
  if(bool){
    const imageEnding = (turn % 2 == 0) ? "-b.png" : "-w.png";
    intersection.src = intersection.src.replace(".png", imageEnding);
    gobanState[row][col] = (turn % 2 == 0) ? 1 : -1;
    nextTurn();
  }
}

// Check to see if a piece can be played on the goban
function play(e){
  const intersection = e.target;
  const index = Number(intersection.alt);
  const row = Math.floor(index / size);
  const col = index % size;
  
  switch(game){
    case "gomoku":
      setPiece(playGomoku(row, col), intersection, row, col);
      break;
    case "othello":
      setPiece(playOthello(row, col), intersection, row, col);
      break;
    case "go":
      setPiece(playGo(row, col), intersection, row, col);
      break;
  }
}

// Create a new goban
function createGoban() {
  // Create/reset board
  document.querySelector("#goban").innerHTML = createRows();
  turn = pass = 0;
  let width = "11%";
  gobanState = init2DArray();


  let intersections = document.querySelectorAll("#goban > img");


  // Size imgs according to size of game
  if (game == "othello") {
    width = "12.5%";
  } else if (size == 19) {
    width = "5.25%";
  } else if (size == 13) {
    width = "7.65%";
  } else {
    width = "11%";
  }

  // Enable onclick function for all img
  for (let i = 0; i < intersections.length; i++) {
    intersections[i].onclick = play;
    intersections[i].setAttribute("alt", `${i}`);
    intersections[i].style.width = width;
  }

  if (game == "othello") {
    document.querySelector("#goban > img:nth-child(28)").click();
    document.querySelector("#goban > img:nth-child(29)").click();
    document.querySelector("#goban > img:nth-child(37)").click();
    document.querySelector("#goban > img:nth-child(36)").click();
  }
}

//Increments turn and reset pass, change box emphasis
function nextTurn(){
  pass = 0;
  turn++;

  if(turn % 2 == 0){
    document.querySelector("#game-menu > div:nth-child(1)").style.borderColor = "#1477FF"
    document.querySelector("#game-menu > div:nth-child(2)").style.borderColor = "#383838"
  }else{
    document.querySelector("#game-menu > div:nth-child(2)").style.borderColor = "#1477FF"
    document.querySelector("#game-menu > div:nth-child(1)").style.borderColor = "#383838"
  }
}

// Increments turn and pass global variables
function passTurn() {
  pass++;
  nextTurn();
}

// Updates game variable and size dropdown menu and re-initalize game
function changeGame() {
  game = document.querySelector("select[name=games]").value;

  // Only one size available for othello game
  if (game == "othello") {
    document.querySelector("select[name=board-size]").innerHTML = '<option value="8">8 x 8</option>';
    size = 8;
  } else {
    document.querySelector("select[name=board-size]").innerHTML =
      `<option value="9">9 x 9</option>
      <option value="13">13 x 13</option>
      <option value="19">19 x 19</option>`;
    size = 9;
  }

  createGoban();
}

// Updates size variable and re-initalize game
function changeSize() {
  size = Number(document.querySelector("select[name=board-size]").value);
  createGoban();
}

window.onload = function () {
  game = document.querySelector("select[name=games]").value;
  size = Number(document.querySelector("select[name=board-size]").value);

  // Creates goban based on game and size value and initialize onclick event for each intersection
  createGoban();



  // Initializes onclick and onchange events for HTML elements
  document.querySelector("select[name=games]").onchange = changeGame;
  document.querySelector("select[name=board-size]").onchange = changeSize;
  document.querySelector("#pass").onclick = passTurn;
  document.querySelector("#restart").onclick = changeGame;
}
