class square {
	constructor(i, j, squareSize) {
		this.i = i; // i * squareSize is the pixel X location of the square
		this.j = j;
		this.squareSize = squareSize;
		this.hasMine = false;
		this.isClicked = false;
		this.borderMines = 0;
	}

	clicked(px, py) {
		// check if the mouse click was inside the square
		const bx = this.i * this.squareSize;
		const by = this.j * this.squareSize;
		if (
			px > bx - this.squareSize &&
			px < bx + this.squareSize &&
			py > by - this.squareSize &&
			py < by + this.squareSize
		) {
			this.isClicked = true;
			updateBorderingSquares();
			return true;
		}
		return false;
	}

	show() {
		stroke(100);
		if (this.isClicked) {
			fill('black');
			rect(this.i * squareSize, this.j * squareSize, squareSize - 1, squareSize - 1);
			if (this.hasMine) {
				fill('red')
				noStroke();
				let x = this.i * this.squareSize;
				let y = this.j * this.squareSize;
				triangle(x, y + this.squareSize / 2, x + this.squareSize, y + this.squareSize / 2, x + this.squareSize / 2, y + this.squareSize);
				triangle(x, y + this.squareSize / 2, x + this.squareSize / 2, y, x + this.squareSize, y + this.squareSize / 2);
			}
		} else {
			fill('white');
			rect(this.i * squareSize, this.j * squareSize, squareSize - 1, squareSize - 1);
		}
	}





	//updateBorderingSquares(i, j) {
	//	// TODO, if we have a mine, "click" all squares
	//	for (let l = max(0, i - 1); l <= min(i + 1, squareSize); l++){
	//		for (let m = max(0, j - 1); j <= min(j + 1, squareSize); j++) {
	//			if (l !== i || m !== j) {
	//				console.log(board[i][j].hasMine, i, j);
	//			}
	//		}
	//	}
	//}

	addMine(board){
		this.hasMine = true;

		let rowLimit = board.length - 1;
		let columnLimit = board[0].length - 1;

		for (let l = max(0, this.i - 1); l <= min(this.i + 1, rowLimit); l++){
			for (let m = max(0, this.j - 1); m <= min(this.j + 1, columnLimit); m++) {
				if (l !== this.i || m !== this.j) {
					board[l][m].borderMines = board[l][m].borderMines + 1;
					console.log(board[l][m].borderMines, l, m);
				}
			}
		}
	}

}

