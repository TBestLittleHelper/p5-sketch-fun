class square {
	constructor(i, j, squareSize) {
		this.i = i;
		this.j = j;
		this.squareSize = squareSize;
		this.hasMine = false;
		this.isClicked = false;
	}


	clicked(px, py) {
		let d = dist(px, py, this.i * this.squareSize, this.j * this.squareSize);
		console.log(d);
		if (d < this.squareSize) {
			this.isClicked = true;
			return true;
		}
		return false;
	}

	show() {
		if (this.isClicked) {
			fill('black');
			if (this.hasMine) fill('red')
		}
		else (fill('white'));

		stroke(100);
		rect(this.i * squareSize, this.j * squareSize, squareSize - 1, squareSize - 1);

	}
}
