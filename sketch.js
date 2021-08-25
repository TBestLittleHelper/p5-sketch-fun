let numMines;
let boardHeight;
let boardWidth;
let board;
let squareSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 16 * 16 and 40 mines is approximatley an intermediate difficulty
  boardWidth = 15;
  boardHeight = 15;
  numMines = 40;
  squareSize = Math.floor(Math.min(width,height) / Math.max(boardWidth,boardHeight));


  board = new Array(boardWidth);
  for (let i = 0; i < boardWidth; i++) {
    board[i] = new Array ();
    for (let j = 0; j < boardHeight; j++) {
      let s = new square(i,j,squareSize);
      board[i][j] = s;
    }
  }
  init();
}

function draw() {
  background(0);
  for (let i = 0; i < board.length; i++){
    for (let j = 0; j < board[i].length; j++){
      rect(i * squareSize, j * squareSize, squareSize - 1, squareSize - 1);
      board[i][j].show();
    }
  }
}


function init() {
  let minesLeft = numMines;
  for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 14; j++) {
      if (minesLeft > 0) {
        minesLeft = minesLeft - 1;
        board[i][j].hasMine = true;
      }
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].clicked(mouseX, mouseY)) return;
    }
  }
}
