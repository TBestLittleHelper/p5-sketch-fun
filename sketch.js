let numMines;
let boardHeight;
let boardWidth;
let board;
let squareSize;
let playing;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 16 * 16 and 40 mines is approximatley an intermediate difficulty
  boardWidth = 15;
  boardHeight = 15;
  numMines = 140;
  squareSize = Math.floor(Math.min(width, height) / Math.max(boardWidth, boardHeight));
  playing = true;


  board = new Array(boardWidth);
  for (let i = 0; i < boardWidth; i++) {
    board[i] = new Array ();
    for (let j = 0; j < boardHeight; j++) {
      let s = new square(i,j,squareSize);
      board[i][j] = s;
    }
  }
  init(board);
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

function init(board) {
  // Place mines randomly, by using a random i and j
  let minesLeft = numMines;
  while (minesLeft > 0) {
    const i = Math.round(random(0,boardWidth-1));
    const j = Math.round(random(0, boardHeight-1));
    if (!board[i][j].hasMine) {
      minesLeft = minesLeft - 1;
      console.log(minesLeft);

      // Add mines to square, and increment neighbors mine counters;
      board[i][j].addMine(board);
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // If we clicked an unclicked square
      if (board[i][j].clicked(mouseX, mouseY)) {
        // Check if it's a mine.
        if (board[i][j].hasMine) {
          playing = false; // TODO add game over
        }
        return;
      };
    }
  }
}

// TODO
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
