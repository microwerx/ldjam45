/// <reference path="./CommonGame.ts" />

class ExoSystemGame {
    col = 0;
    row = 0;
    placeable = 0;

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
        this.col = GTE.clamp(this.col + dcol, 0, this.common.numCols);
        this.row = GTE.clamp(this.row + drow, 0, this.common.numRows);
        this.placeable = this.common.placeable(this.col, this.row) ? 1 : 0;
    }

    placeStar() {
        if (this.common.creationStarsCollected <= 0) {
            this.common.sfx(SOUND_NOP);
        };
        this.common.setStar(this.col, this.row);
        this.common.sfx(SOUND_CREATE_STAR);
        for (let i = 0; i < 2; i++) {
            let x = randbetween(-1, 1);
            let y = randbetween(-1, 1);
            this.common.createPlanetoid(this.col + x, this.row + y);
        }
    }
}