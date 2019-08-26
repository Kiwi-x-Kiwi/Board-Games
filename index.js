function createGoban(){
  let goban = "";
  goban += createRow("top");
  for(i = 0; i < 7; i++){
    if(i == 1 || i == 5){
      goban += createRow("two-hoshi")
    }else if( i == 3){
      goban += createRow("middle")
    }else{
      goban += createRow();
    }
  }
  goban += createRow("bottom");

  document.querySelector("#goban").innerHTML += goban;

  let intersections = document.querySelectorAll("#goban > img");
  for (let i = 0; i < intersections.length; i++) {
    intersections[i].onclick = placePiece;
  }
}

function emptyGoban(){
  document.querySelector("#goban").innerHTML = "";
  createGoban();

  turn = 0;
  pass = 0;
}

function createRow(rowType){
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

  if(rowType == "top"){
    row += cornerUl + borderTop.repeat(7) + cornerUr;
  }else if(rowType == "bottom"){
    row += cornerBl + borderBottom.repeat(7) + cornerBr;
  }else if(rowType == "two-hoshi"){
    row += borderLeft + middle.repeat(1) + hoshi + middle.repeat(3) + hoshi + middle + borderRight;
  }else if(rowType == "middle"){
    row += borderLeft + middle.repeat(3) + hoshi + middle.repeat(3) + borderRight;
  }else{
    row += borderLeft + middle.repeat(7) + borderRight;
  }

  return row;
}

function placePiece(e){
  const intersection = e.target;

  const filepath = "file:///C:/Users/qiwei/Desktop/Code/IronHack/module-1/self-directed-project/"

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

  if(turn % 2 == 0){
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
  }else{
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

  turn++;
  pass = 0;
}

function passTurn(){
  turn++;
  pass++;
}

let turn = 0;
let pass = 0;

window.onload = function () {
  createGoban();

  document.querySelector("#pass").onclick = passTurn;
  document.querySelector("#restart").onclick = emptyGoban;
}

