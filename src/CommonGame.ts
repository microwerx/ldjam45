
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

    constructor(public xor: LibXOR,
        readonly numCols = 4,
        readonly numRows = 4) {
        this.MaxStars = numCols << 1;
        this.MaxPlanetoids = numCols << 2;
    }

    init() {
        this.reset();
    }

    reset() {
        this.gobjs = [];
        for (let i = 0; i < PlayerCount; i++) {
            this.gobjs.push(new GravityObject(1, 1, 1, this.xor, this.gobjs));
        }

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
        // update player physics
        for (let i = PlayerIndex; i <= PlayerMaxIndex; i++) {
            this.gobjs[i].update(this.xor.dt);
        }

        // update physics locations
        let starIndex = 0;
        let planetoidIndex = 0;
        for (let j = 0; j < this.numRows; j++) {
            for (let i = 0; i < this.numCols; i++) {
                switch (this.cells[j][i]) {
                    case NOTHING:
                        break;
                    case STAR:
                        this.gobjs[StarIndex + starIndex].x.reset(i * SpaceBetweenStars, j * SpaceBetweenStars, 0);
                        starIndex++;
                        break;
                    case PLANETOID:
                        this.gobjs[PlanetoidCount + planetoidIndex].x.reset(i * SpaceBetweenStars, j * SpaceBetweenStars, 0);
                        planetoidIndex++;
                        break;
                    default:
                        break;
                }
            }
        }

        for (let i = 0; i < this.MaxStars; i++) {
            if (i >= starIndex) {
                this.gobjs[i].active = false;
                continue;
            }

            let star = this.gobjs[i];
            star.active = true;
            star.update(this.xor.dt);
        }

        for (let i = 0; i < this.MaxPlanetoids; i++) {
            if (i >= planetoidIndex) {
                this.gobjs[i].active = false;
                continue;
            }

            let planetoid = this.gobjs[i];
            planetoid.active = true;
            planetoid.resetForces();

            // allow planetoids to interact with stars
            for (let j = 0; j < starIndex; j++) {
                let star = this.gobjs[j];
                planetoid.calcInteractionForce(star);
            }

            // allow planetoids to interact with other planetoids
            for (let j = 0; j < planetoidIndex; j++) {
                if (j == i) continue;
                let otherPlanetoid = this.gobjs[j];
                planetoid.calcInteractionForce(otherPlanetoid);
            }

            planetoid.update(this.xor.dt);
        }
    }
}
