
const PlayerCount = 1;
const CreationStarCount = 4;
const StarCount = 20;
const PlanetoidCount = StarCount * 2;

const PlayerIndex = 0;
const PlayerMaxIndex = PlayerIndex + PlayerCount - 1;

const CreationStarIndex = PlayerMaxIndex + 1;
const CreationStarMaxIndex = CreationStarIndex + CreationStarCount - 1;

const StarIndex = CreationStarMaxIndex + 1;
const StarMaxIndex = StarIndex + StarCount - 1;

const PlanetoidIndex = StarMaxIndex + 1;
const PlanetoidMaxIndex = PlanetoidIndex + PlanetoidCount - 1;

const MaxGObjects = PlanetoidMaxIndex + 1;

const SpaceBetweenStars = 10.0;
const MinStarRadius = 3.0;
const MaxStarRadius = 5.0;

const MinPlanetoidRadius = 1.5;
const MaxPlanetoidRadius = 2.5;

const NOTHING = 0;
const STAR = 1;
const PLANETOID = 2;

class CommonGame {
    gobjs: GravityObject[] = [];

    gold = 0;

    states = new StateMachine(this.xor);

    MaxStars: number = 0;
    MaxPlanetoids: number = 0;
    MaxCreationStars: number = 0;

    cells: number[][] = [];

    numStars = 0;
    numPlanetoids = 0;
    numCreationStars = 0;

    minPoint = Vector3.make();
    maxPoint = Vector3.make();

    constructor(
        public xor: LibXOR,
        public numCols = 4,
        public numRows = 4
    ) {
        this.MaxStars = numCols << 1;
        this.MaxPlanetoids = numCols << 2;
        this.MaxCreationStars = numCols >> 1;
        this.gobjs = [];
        for (let i = 0; i < PlayerCount; i++) {
            this.gobjs.push(new GravityObject(1, 1, 1, this.xor, this.gobjs));
        }
        for (let i = 0; i < CreationStarCount; i++) {
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

    setStar(col: number, row: number): boolean {
        if (col < 0 || col >= this.numCols) return false;
        if (row < 0 || row >= this.numRows) return false;
        if (this.numStars >= this.MaxStars) return false;

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
        this.numStars++;
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
                        // this.createStar(starIndex, i, j);
                        starIndex++;
                        break;
                    case PLANETOID:
                        // this.createPlanetoid(planetoidIndex, i, j);
                        planetoidIndex++;
                        break;
                    default:
                        break;
                }
            }
        }
        this.numStars = starIndex;
        this.numPlanetoids = planetoidIndex;
        hflog.info("planetary system configured");
    }

    createStar(starIndex: number, i: number, j: number) {
        const tx = -this.numCols * 0.5 * SpaceBetweenStars;
        const ty = -this.numRows * 0.5 * SpaceBetweenStars;
        let star = this.gobjs[StarIndex + starIndex];
        star.active = true;
        star.x.reset(
            tx + i * SpaceBetweenStars,
            ty + j * SpaceBetweenStars,
            0);
        if (star.radius <= 1) {
            let r = randbetween(MinStarRadius, MaxStarRadius);
            star.radius = r;
            star.mass = r * 1e12;
        }
    }

    createPlanetoid(i: number, j: number) {
        if (this.numPlanetoids >= this.MaxPlanetoids) return false;
        let index = this.numPlanetoids;
        const tx = -this.numCols * 0.5 * SpaceBetweenStars;
        const ty = -this.numRows * 0.5 * SpaceBetweenStars;
        let planetoid = this.gobjs[PlanetoidIndex + index];
        planetoid.active = true;
        planetoid.x.reset(
            tx + i * SpaceBetweenStars,
            ty + j * SpaceBetweenStars,
            0);
        if (planetoid.radius <= 1) {
            let r = randbetween(MinPlanetoidRadius, MaxPlanetoidRadius);
            planetoid.radius = r;
            planetoid.mass = r * 1e12;
        }
        this.numPlanetoids++;
        return true;
    }

    createCreationStar(i: number, j: number): boolean {
        if (this.numCreationStars >= this.MaxCreationStars) return false;
        let index = this.numCreationStars;
        const tx = -this.numCols * 0.5 * SpaceBetweenStars;
        const ty = -this.numRows * 0.5 * SpaceBetweenStars;
        let star = this.gobjs[CreationStarIndex + index];
        star.x.reset(
            tx + i * SpaceBetweenStars,
            ty + j * SpaceBetweenStars,
            0);
        star.active = true;
        star.radius = 2.0;
        star.mass = 1e6;
        this.numCreationStars++;
        return true;
    }
}
