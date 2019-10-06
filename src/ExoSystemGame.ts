/// <reference path="./CommonGame.ts" />

class ExoSystemGame {
    col = 0;
    row = 0;

    constructor(
        public xor: LibXOR,
        public common: CommonGame) {

    }

    init() {
        this.reset();
    }

    reset() {

    }

    update() {
    }

    move(dx = 0, dy = 0) {
        let dcol = (dx < 0) ? -1 : (dx > 0) ? 1 : 0;
        let drow = (dy < 0) ? -1 : (dy > 0) ? 1 : 0;
        this.col = GTE.clamp(this.col + dcol, 0, this.common.numCols - 1);
        this.row = GTE.clamp(this.row + drow, 0, this.common.numRows - 1);
    }
}