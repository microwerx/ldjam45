
const PlayerCount = 1;
const CreationStarCount = 20;
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

const SOUND_PLAYER_DEAD = 0;
const SOUND_PLANETOID_DEAD = 1;
const SOUND_CREATIONSTAR_DEAD = 2;
const SOUND_PLAYER_MINING = 3;
const SOUND_PLAYER_DYING = 4;
const SOUND_EXO_CLICK = 5;
const SOUND_CREATE_STAR = 6;
const SOUND_NOP = 7;
const SOUND_EXO = 8;
const SOUND_ENDO = 9;

const SOUNDS: string[] = [
    "PLAYER_DEAD",
    "PLANETOID_DEAD",
    "CREATIONSTAR_DEAD",
    "PLAYER_MINING",
    "PLAYER_DYING",
    "EXO_CLICK",
    "SOUND_CREATE_STAR",
    "SOUND_NOP",
    "EXO",
    "ENDO"
];

const MUSIC_STARBATTLE1 = 0;
const MUSIC_STARBATTLE2 = 1;

class CommonGame {
    gobjs: GravityObject[] = [];

    gold = 0;
    MaxGold = 0;

    states = new StateMachine(this.xor);

    MaxStars: number = 0;
    MaxPlanetoids: number = 0;
    MaxCreationStars: number = 0;

    cells: number[][] = [];

    numStars = 0;
    numPlanetoids = 0;
    numCreationStars = 0;

    creationStarsCollected = 0;

    bbox = new GTE.BoundingBox();
    // minPoint = Vector3.make();
    // maxPoint = Vector3.make();

    constructor(
        public xor: LibXOR,
        public numCols = 4,
        public numRows = 4
    ) {
        this.MaxStars = numCols << 1;
        this.MaxPlanetoids = numCols << 2;
        this.MaxCreationStars = numCols * 2;
        this.MaxGold = this.MaxPlanetoids * 10;
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
        let minPoint = Vector3.make(
            -(this.numCols + 1) * 0.5 * SpaceBetweenStars,
            -(this.numRows + 1) * 0.5 * SpaceBetweenStars,
            0
        );
        let maxPoint = Vector3.make(
            (this.numCols + 1) * 0.5 * SpaceBetweenStars,
            (this.numRows + 1) * 0.5 * SpaceBetweenStars,
            0
        );
        this.bbox.add(minPoint);
        this.bbox.add(maxPoint);
    }

    reset() {
        this.cells = [];
        for (let j = 0; j <= this.numRows; j++) {
            let row: number[] = [];
            for (let i = 0; i <= this.numCols; i++) {
                row.push(0);
            }
            this.cells.push(row);
        }

        for (let i = 0; i < MaxGObjects; i++) {
            this.gobjs[i] = new GravityObject(1, 1, 1, this.xor, this.gobjs);
        }

        this.numStars = 0;
        this.numCreationStars = 0;
        this.numPlanetoids = 0;

        this.creationStarsCollected = 0;
    }

    placeable(col: number, row: number): boolean {
        if (col < 0 || col > this.numCols) return false;
        if (row < 0 || row > this.numRows) return false;
        if (this.getStar(col - 1, row) == STAR ||
            this.getStar(col + 0, row) == STAR ||
            this.getStar(col + 1, row) == STAR ||
            this.getStar(col - 1, row - 1) == STAR ||
            this.getStar(col + 0, row - 1) == STAR ||
            this.getStar(col + 1, row - 1) == STAR ||
            this.getStar(col - 1, row + 1) == STAR ||
            this.getStar(col + 0, row + 1) == STAR ||
            this.getStar(col + 1, row + 1) == STAR) return false;
        return true;
    }

    setStar(col: number, row: number): boolean {
        if (col < 0 || col > this.numCols) return false;
        if (row < 0 || row > this.numRows) return false;
        if (this.numStars >= this.MaxStars) return false;

        if (!this.placeable(col, row)) return false;
        if (this.getStar(col - 1, row) == STAR ||
            this.getStar(col + 0, row) == STAR ||
            this.getStar(col + 1, row) == STAR ||
            this.getStar(col - 1, row - 1) == STAR ||
            this.getStar(col + 0, row - 1) == STAR ||
            this.getStar(col + 1, row - 1) == STAR ||
            this.getStar(col - 1, row + 1) == STAR ||
            this.getStar(col + 0, row + 1) == STAR ||
            this.getStar(col + 1, row + 1) == STAR) return false;
        if (!this.createStar(col, row)) return false;
        this.cells[row][col] = STAR;
        return true;
    }

    getStar(col: number, row: number): number {
        if (col < 0 || col > this.numCols) return 0;
        if (row < 0 || row > this.numRows) return 0;
        return this.cells[row][col];
    }

    update() {
        ww
    }

    createStar(i: number, j: number) {
        if (this.numStars >= this.MaxStars) return false;
        let index = this.numStars;
        const tx = -this.numCols * 0.5 * SpaceBetweenStars;
        const ty = -this.numRows * 0.5 * SpaceBetweenStars;
        let star = this.gobjs[StarIndex + index];
        star.active = true;
        star.x.reset(
            tx + i * SpaceBetweenStars,
            ty + j * SpaceBetweenStars,
            0);
        let r = randbetween(MinStarRadius, MaxStarRadius);
        star.radius = r;
        star.mass = r * 1e12;
        this.numStars++;
        return true;
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
        let r = randbetween(MinPlanetoidRadius, MaxPlanetoidRadius);
        planetoid.radius = r;
        planetoid.mass = r * 1e9;
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

    sfx(sound: number) {
        if (this.xor.triggers.get(SOUNDS[sound]).tick(this.xor.t1)) {
            this.xor.sound.sampler.playSample(sound);
        }
    }
}
