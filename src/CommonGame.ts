
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
const MinStarRadius = 3.0;
const MaxStarRadius = 5.0;

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
    numStars = 0;
    numPlanetoids = 0;
    minPoint = Vector3.make();
    maxPoint = Vector3.make();

    constructor(
        public xor: LibXOR,
        public numCols = 4,
        public numRows = 4
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

        this.resize(numCols, numRows);
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

    resize(numCols: number, numRows: number) {
        this.numCols = numCols;
        this.numRows = numRows;
        this.reset();
        this.minPoint.reset(
            -(this.numCols + 1) * 0.5 * SpaceBetweenStars,
            -(this.numRows + 1) * 0.5 * SpaceBetweenStars,
            0
        );
        this.maxPoint.reset(
            (this.numCols + 1) * 0.5 * SpaceBetweenStars,
            (this.numRows + 1) * 0.5 * SpaceBetweenStars,
            0
        );
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

    resetPositions() {
        let gobjs = this.gobjs;
        let cells = this.cells;
        let starIndex = 0;
        let planetoidIndex = 0;
        const tx = -this.numCols * 0.5 * SpaceBetweenStars;
        const ty = -this.numRows * 0.5 * SpaceBetweenStars;
        for (let j = 0; j < this.numRows; j++) {
            for (let i = 0; i < this.numCols; i++) {
                switch (cells[j][i]) {
                    case NOTHING:
                        break;
                    case STAR:
                        gobjs[StarIndex + starIndex].x.reset(
                            tx + i * SpaceBetweenStars,
                            ty + j * SpaceBetweenStars,
                            0);
                        if (gobjs[StarIndex + starIndex].radius <= 1) {
                            gobjs[StarIndex + starIndex].radius = randbetween(MinStarRadius, MaxStarRadius);
                        }
                        starIndex++;
                        break;
                    case PLANETOID:
                        gobjs[PlanetoidCount + planetoidIndex].x.reset(
                            tx + i * SpaceBetweenStars,
                            ty + j * SpaceBetweenStars,
                            0);
                        planetoidIndex++;
                        break;
                    default:
                        break;
                }
            }
        }
        this.numStars = starIndex;
        this.numPlanetoids = planetoidIndex;
    }
}
