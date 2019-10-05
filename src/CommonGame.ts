
const PlayerCount = 1;
const ExtraStarCount = 2;
const MissileCount = PlayerCount * 10;
const StarCount = 20;
const PlanetoidCount = StarCount * 2;

const PlayerIndex = 0;
const PlayerMaxIndex = PlayerIndex + PlayerCount - 1;

const ExtraStarIndex = PlayerMaxIndex + 1;
const ExtraStarMaxIndex = ExtraStarIndex + ExtraStarCount;

const MissileIndex = ExtraStarMaxIndex + 1;
const MissileMaxIndex = MissileIndex + MissileCount - 1;

const StarIndex = MissileMaxIndex + 1;
const StarMaxIndex = MissileIndex + MissileCount - 1;

const PlanetoidIndex = StarMaxIndex + 1;
const PlanetoidMaxIndex = PlanetoidIndex + PlanetoidCount - 1;

const MaxGObjects = PlanetoidMaxIndex + 1;

const SpaceBetweenStars = 10.0;

const NOTHING = 0;
const STAR = 1;
const PLANETOID = 2;

class CommonGame {
    gobjs: GravityObject[] = [];
    gold = 0;
    states = new StateMachine(this.xor);
    MaxStars: number;
    MaxPlanetoids: number;
    cells: number[][] = [];
    numStars: number = 0;

    constructor(
        public xor: LibXOR,
        readonly numCols = 4,
        readonly numRows = 4
    ) {
        this.MaxStars = numCols << 1;
        this.MaxPlanetoids = numCols << 2;
        this.gobjs = [];
        for (let i = 0; i < PlayerCount; i++) {
            this.gobjs.push(new GravityObject(1, 1, 1, this.xor, this.gobjs));
        }
        for (let i = 0; i < MissileCount; i++) {
            this.gobjs.push(new GravityObject(1, 1, 1, this.xor, this.gobjs));
        }
        for (let i = 0; i < StarCount; i++) {
            this.gobjs.push(new GravityObject(1, 1, 1, this.xor, this.gobjs));
        }
        for (let i = 0; i < PlanetoidCount; i++) {
            this.gobjs.push(new GravityObject(1, 1, 1, this.xor, this.gobjs));
        }
    }

    init() {
        this.reset();
    }

    reset() {
        this.cells = [];
        for (let j = 0; j < this.numRows; j++) {
            let row: number[] = [];
            for (let i = 0; i < this.numCols; i++) {
                row.push(0);
            }
            this.cells.push(row);
        }
    }

    setStar(col: number, row: number) {
        if (col < 0 || col >= this.numCols) return false;
        if (row < 0 || row >= this.numRows) return false;
        if (this.getStar(col - 1, row) == STAR ||
            this.getStar(col + 0, row) == STAR ||
            this.getStar(col + 1, row) == STAR ||
            this.getStar(col - 1, row - 1) == STAR ||
            this.getStar(col + 0, row - 1) == STAR ||
            this.getStar(col + 1, row - 1) == STAR ||
            this.getStar(col - 1, row + 1) == STAR ||
            this.getStar(col + 0, row + 1) == STAR ||
            this.getStar(col + 1, row + 1) == STAR) return false;
        this.cells[row][col] = STAR;
        return true;
    }

    getStar(col: number, row: number): number {
        if (col < 0 || col >= this.numCols) return 0;
        if (row < 0 || row >= this.numRows) return 0;
        return this.cells[row][col];
    }

    update() {
    }
}
