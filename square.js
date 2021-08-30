class square {
	constructor(i, j, squareSize) {
		this.i = i; // i * squareSize is the pixel X location of the square
		this.j = j;
		this.squareSize = squareSize;
		this.hasMine = false;
		this.isClicked = false;
		this.isHidden = true;
		this.borderMines = 0;
	}

	clicked(board, px, py) {
		// check if the mouse click was inside the square
		const bx = this.i * this.squareSize;
		const by = this.j * this.squareSize;
		if (
			px > bx - this.squareSize &&
			px < bx + this.squareSize &&
			py > by - this.squareSize &&
			py < by + this.squareSize
		) {
			if (!this.isHidden || this.isClicked) return true; //return if Square is already reveled

			this.isClicked = true;
			this.isHidden = false;
			if (!this.hasMine) this.updateBorderingSquares(board, this.i, this.j);
			return true;
		}
		return false;
	}

	show() {
		stroke(100);
		let x = this.i * this.squareSize;
		let y = this.j * this.squareSize;
		if (this.isHidden) {
			fill('black');
			rect(x, y, this.squareSize - 1, this.squareSize - 1);
			return;
		}

		if (this.isClicked) {
			fill('white');
			rect(x, y, squareSize - 1, squareSize - 1);
			if (this.hasMine) {
				fill('red')
				noStroke();
				triangle(x, y + this.squareSize / 2, x + this.squareSize, y + this.squareSize / 2, x + this.squareSize / 2, y + this.squareSize);
				triangle(x, y + this.squareSize / 2, x + this.squareSize / 2, y, x + this.squareSize, y + this.squareSize / 2);
			}
		} else if (!this.isHidden) {
			fill('grey');
			rect(x, y, this.squareSize - 1, this.squareSize - 1);
			textAlign(CENTER);
			fill('red');
			text(this.borderMines, x + this.squareSize / 2, y + this.squareSize / 2);
		}
	}
	updateBorderingSquares(board, i, j) {
		let rowLimit = board.length - 1;
		let columnLimit = board[0].length - 1;

		for (let l = max(0, this.i - 1); l <= min(this.i + 1, rowLimit); l++) {
			for (let m = max(0, this.j - 1); m <= min(this.j + 1, columnLimit); m++) {
				if (l !== this.i || m !== this.j) {
					if (board[l][m].isHidden == true && board[l][m].hasMine == false) {
						board[l][m].isHidden = false;

						if (board[l][m].borderMines == 0) {
							board[l][m].isClicked = true; // Simulate a click, and update bordering squares
							board[l][m].updateBorderingSquares(board, i, j);
							console.log(l, m);
						}
					}
				}
			}
		}
	}

	addMine(board) {
		this.hasMine = true;

		let rowLimit = board.length - 1;
		let columnLimit = board[0].length - 1;

		for (let l = max(0, this.i - 1); l <= min(this.i + 1, rowLimit); l++) {
			for (let m = max(0, this.j - 1); m <= min(this.j + 1, columnLimit); m++) {
				if (l !== this.i || m !== this.j) {
					board[l][m].borderMines = board[l][m].borderMines + 1;
					console.log(board[l][m].borderMines, l, m);
				}
			}
		}
	}
}

