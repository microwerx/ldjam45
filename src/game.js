"use strict";
/* eslint-disable no-unused-vars */
/// <reference path="../../LibXOR/LibXOR.d.ts" />
// START HELPFUL HTML5 FUNCTIONS
/**
 * Creates a row div with a left and right column. It expects CSS class row, column, left, and right.
 * @param {string} leftContent
 * @param {string} rightContent
 */
function createRow(leftContent = "", rightContent = "") {
    let row = document.createElement('div');
    row.className = 'row';
    let left = document.createElement('div');
    left.className = 'column left';
    left.innerHTML = leftContent;
    let right = document.createElement('div');
    right.className = 'column right';
    right.innerHTML = rightContent;
    row.appendChild(left);
    row.appendChild(right);
    return row;
}
/**
 * createRangeRow creates a row with a range control
 * @param {HTMLElement} parent The element that should be appended to
 * @param {string} id The name of the range variable
 * @param {number} curValue The current value of the range
 * @param {number} minValue The minimum value of the range
 * @param {number} maxValue The maximum value of the range
 * @param {number} stepValue The step of the range control (default 1)
 * @returns {HTMLElement} The created HTMLElement div
 */
function createRangeRow(parent, id, curValue, minValue, maxValue, stepValue = 1, isvector = false) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column'>";
    if (!isvector) {
        rContent += "<input type='range' id='" + id + "' value='" + curValue + "' min='" + minValue + "' max='" + maxValue + "' step='" + stepValue + "' />";
        rContent += "</div><div class='column left'>";
        rContent += "<label id='" + id + "_value'>0</label>";
    }
    else {
        rContent += "<input type='range' id='" + id + "1' value='" + curValue + "' min='" + minValue + "' max='" + maxValue + "' step='" + stepValue + "' />";
        rContent += "<input type='range' id='" + id + "2' value='" + curValue + "' min='" + minValue + "' max='" + maxValue + "' step='" + stepValue + "' />";
        rContent += "<input type='range' id='" + id + "3' value='" + curValue + "' min='" + minValue + "' max='" + maxValue + "' step='" + stepValue + "' />";
    }
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}
/**
 * createRowButton adds a button to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} caption The caption of the button
 * @param {string} id The name of the button's id
 * @param {function} callback A callback function if this gets clicked
 */
function createButtonRow(parent, id, caption, callback) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right'>";
    rContent += "<button id='" + id + "'>" + caption + "</button>";
    rContent += "</div><div class='column left'>";
    rContent += "<label id='" + id + "_value'>0</label>";
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
    let b = document.getElementById(id);
    if (b) {
        b.onclick = callback;
    }
}
/**
 * createCheckButton adds a button to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} id The name of the button's id
 * @param {boolean} checked Is it checked or not
 */
function createCheckRow(parent, id, checked) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right'>";
    let c = checked ? " checked" : "";
    rContent += "<input type='checkbox' id='" + id + "' " + c + "/>";
    rContent += "</div><div class='column left'>";
    rContent += "<label id='" + id + "_value'>0</label>";
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}
/**
 * createTextRow adds a button to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} id The name of the button's id
 * @param {string} value The initial value of the string
 */
function createTextRow(parent, id, value) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right'>";
    rContent += "<input type='text' style='width: 8em' id='" + id + " value='" + value + "' />";
    rContent += "</div><div class='column left'>";
    rContent += "<label id='" + id + "_value'>" + value + "</label>";
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}
/**
 * createTextRow adds a button to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} id The name of the label's id
 * @param {string} value The initial value of the string
 */
function createLabelRow(parent, id, value) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right'>";
    rContent += "<label id='" + id + "_value'>" + value + "</label>";
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}
/**
 * createDivRow adds a row to the control list
 * @param {HTMLElement} parent The parent HTMLElement
 * @param {string} id The name of the row's id
 */
function createDivRow(parent, id) {
    let lContent = "<div class='column left'><label for='" + id + "'>" + id + "<label></div>";
    let rContent = "<div class='column right' id='" + id + "'>";
    rContent += "</div>";
    let row = createRow(lContent, rContent);
    row.id = "row" + id;
    row.className = "row";
    parent.appendChild(row);
}
/**
 * setDivRowContents
 * @param {string} id
 * @param {string} content
 */
function setDivRowContents(id, content) {
    let e = document.getElementById(id);
    if (!e)
        return;
    e.innerHTML = content;
}
function setDivRowButtonCaption(id, caption) {
    let e = document.getElementById(id);
    if (!e)
        return;
    e.innerHTML = caption;
}
/**
 * setDivRowValue
 * @param id the id of the input element
 * @param content the new value the control should have
 */
function setDivRowValue(id, content) {
    let e = document.getElementById(id);
    if (!e)
        return;
    e.value = content;
    let l = document.getElementById(id + "_value");
    if (l)
        l.innerHTML = e.value.toString();
}
/**
 * setDivLabelValue
 * @param id the id of the input element
 * @param content the new value the control should have
 */
function setDivLabelValue(id, content) {
    let l = document.getElementById(id + "_value");
    if (l)
        l.innerHTML = content;
}
/**
 * getRangeValue returns the number of a range control
 * @param {string} id
 * @returns the value of the range control or 0
 */
function getRangeValue(id) {
    let e = document.getElementById(id);
    if (!e)
        return 0;
    let l = document.getElementById(id + "_value");
    if (l)
        l.innerHTML = e.value.toString();
    return parseFloat(e.value) * 1.0;
}
/**
 * Returns if control is checked or not
 * @param {string} id
 * @returns {boolean}
 */
function getCheckValue(id) {
    let e = document.getElementById(id);
    if (!e)
        return false;
    let l = document.getElementById(id + "_value");
    if (l)
        l.innerHTML = e.value.toString();
    return e.checked;
}
/**
 * getRangeVector3
 * @param {string} id The id of the range controls ending with 1, 2, 3. Example: id="sky", we get "sky1", "sky2", etc.
 * @returns {Vector3} A Vector3 with the values from controls id1, id2, and id3.
 */
function getRangeVector3(id) {
    return Vector3.make(getRangeValue(id + "1"), getRangeValue(id + "2"), getRangeValue(id + "3"));
}
/**
 * setIdToHtml
 * @param {string} id
 * @param {string} html
 */
function setIdToHtml(id, html) {
    let el = document.getElementById(id);
    if (el) {
        el.innerHTML = html;
    }
}
// END HELPFUL HTML5 CODE
/// <reference path="../../LibXOR/LibXOR.d.ts"/>
/**
 * randbetween returns a random number between a and b
 * @param a the minimum random number
 * @param b the maximum random number
 */
function randbetween(a, b) {
    return Math.random() * (b - a) + a;
}
/**
 * randbetweeni returns a random integer between a and b
 * @param a the minimum random number
 * @param b the maximum random number
 */
function randbetweeni(a, b) {
    return Math.floor(Math.random() * (b - a) + a + 0.5) | 0;
}
/**
 * randvector3 returns a unit vector pointing in a random direction
 */
function randvector3() {
    return Vector3.makeUnit(Math.random() - 0.5, Math.random() - 0.5, 0); //Math.random() - 0.5);
}
/**
 * clamp 3 returns a vector which is v clamped between minValue & maxValue
 * @param v
 * @param minValue
 * @param maxValue
 */
function clamp3(v, minValue, maxValue) {
    return Vector3.make(GTE.clamp(v.x, minValue, maxValue), GTE.clamp(v.y, minValue, maxValue), GTE.clamp(v.z, minValue, maxValue));
}
/**
 * accum calculates a += b * scale and returns a
 * @param a
 * @param b
 * @param bscale
 */
function accum(a, b, bscale) {
    a.x += b.x * bscale;
    a.y += b.y * bscale;
    a.z += b.z * bscale;
    return a;
}
/// <reference path="../../LibXOR/LibXOR.d.ts" />
class GravityObject {
    /**
     * constructor()
     * @param gravitydir positive means pull, negative means push
     * @param mass mass in kilograms of this object
     */
    constructor(gravitydir = -1, mass = 1, radius = 1, xor, activeObjects) {
        this.gravitydir = gravitydir;
        this.mass = mass;
        this.radius = radius;
        this.xor = xor;
        this.activeObjects = activeObjects;
        this.active = false;
        this.x = Vector3.make(0, 0, 0);
        this.v = Vector3.make(0, 0, 0);
        this.a = Vector3.make(0, 0, 0);
        this.thrust_ = Vector3.make(0, 0, 0);
        this.life = 1.0;
        this.angle = 0;
        this.drag = 0.0;
        this.type = 0;
    }
    get sink() { return this.gravitydir > 0; }
    get vent() { return this.gravitydir < 0; }
    /**
     * update calculates the forces and updates position & velocity
     * @param dt the time step in seconds and updates occur every 1ms
     */
    update(dt) {
        const steps = Math.floor(dt * 1000 + 0.5);
        // Calculate force
        for (let i = 0; i < steps; i++) {
            this.updateForces();
            this.applyForces();
        }
    }
    /**
     * resetForces initializes acceleration to 0
     */
    resetForces() {
        this.a.reset();
    }
    /**
     * updateForces calculates forces between interacting objects
     */
    updateForces() {
        this.a.accum(this.thrust_, 1.0);
        this.a.accum(this.v, -this.drag);
        const MaxAccel = 50;
        this.a = this.a.clamp(-MaxAccel, MaxAccel);
    }
    /**
     * applyForces calculates new position and velocity
     */
    applyForces() {
        const dt = 0.001;
        let v_before = this.v.clone();
        this.v.accum(this.a, dt);
        let v_after = this.v.clone();
        this.v = (v_after.add(v_before)).scale(0.5);
        const MaxVelocity = 7;
        this.v.clamp(-MaxVelocity, MaxVelocity);
        this.x.accum(this.v.scale(0.5), dt);
    }
    /**
     * boundObject
     */
    boundObject(bbox) {
        this.x.clamp3(bbox.minBounds, bbox.maxBounds);
    }
    /**
     * reset initializes this object to its defaults
     */
    reset() {
        this.life = 1;
        this.angle = 0;
        this.x.reset();
        this.v.reset();
        this.a.reset();
        this.thrust_.reset();
    }
    /**
     * dirTo returns a unit vector between this and gobj
     * @param gobj the other object to compare
     */
    dirTo(gobj) {
        return this.x.sub(gobj.x).normalize();
    }
    /**
     * distanceBetween is the distance between the two spheres
     * @param gobj the other object to compare
     */
    distanceBetween(gobj) {
        let totalRadius = this.radius + gobj.radius;
        return this.x.distance(gobj.x) - totalRadius;
    }
    /**
     * distanceBetweenCenters is the distance between the centers
     * of the two objects
     * @param gobj the other object to compare
     */
    distanceBetweenCenters(gobj) {
        return this.x.distance(gobj.x);
    }
    /**
     * detectCollision detects if the signed distance is less than zero
     * @param gobj the other object to compare
     */
    detectCollision(gobj) {
        if (gobj.distanceBetween(this) < 0)
            return true;
        return false;
    }
    /**
     * calcInteractionForce determines the force to apply between the two
     * objects
     * @param gobj the other object to interact with
     */
    calcInteractionForce(gobj, radiusFactor = 2) {
        if (!gobj.active)
            return;
        const G_a = 6.6740831e-11;
        const p = 2;
        let r = this.distanceBetweenCenters(gobj);
        let maxdist = SpaceBetweenStars * radiusFactor;
        if (r > maxdist)
            return;
        let x = gobj.dirTo(this);
        let massRatio = this.mass * gobj.mass;
        let a = this.gravitydir * G_a * massRatio / Math.pow(Math.max(r, 2.0), p);
        this.a.accum(x, a);
    }
    /**
     * Returns true if objects are close enough
     * @param gobj the other object to interact with
     */
    canCalcInteraction(gobj) {
        if (!gobj.active)
            return false;
        let r = this.distanceBetweenCenters(gobj);
        let maxdist = SpaceBetweenStars * 2.0;
        if (r > maxdist)
            return false;
        return true;
    }
    /**
     *
     * @param x horizontal force applied to the object
     * @param y vertical force applied to the object
     */
    thrust(x, y) {
        this.thrust_.reset(x, y, 0);
    }
    drag(x) {
        this.drag = GTE.clamp(x, 0.0, 0.1);
    }
    /**
     * Returns the burn factor from this object to the next.
     * This only works from big objects to small objects.
     * Burn factor goes from 0 to 100
     * @param gobj
     */
    burn(gobj) {
        return GTE.clamp(this.distanceBetween(gobj) * -5, 0, 100);
    }
}
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
const SOUNDS = [
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
    // minPoint = Vector3.make();
    // maxPoint = Vector3.make();
    constructor(xor, numCols = 4, numRows = 4) {
        this.xor = xor;
        this.numCols = numCols;
        this.numRows = numRows;
        this.gobjs = [];
        this.gold = 0;
        this.MaxGold = 0;
        this.states = new StateMachine(this.xor);
        this.MaxStars = 0;
        this.MaxPlanetoids = 0;
        this.MaxCreationStars = 0;
        this.cells = [];
        this.numStars = 0;
        this.numPlanetoids = 0;
        this.numCreationStars = 0;
        this.creationStarsCollected = 0;
        this.bbox = new GTE.BoundingBox();
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
    resize(numCols, numRows) {
        this.numCols = numCols;
        this.numRows = numRows;
        this.reset();
        let minPoint = Vector3.make(-(this.numCols + 1) * 0.5 * SpaceBetweenStars, -(this.numRows + 1) * 0.5 * SpaceBetweenStars, 0);
        let maxPoint = Vector3.make((this.numCols + 1) * 0.5 * SpaceBetweenStars, (this.numRows + 1) * 0.5 * SpaceBetweenStars, 0);
        this.bbox.add(minPoint);
        this.bbox.add(maxPoint);
    }
    reset() {
        this.cells = [];
        for (let j = 0; j < this.numRows; j++) {
            let row = [];
            for (let i = 0; i < this.numCols; i++) {
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
    placeable(col, row) {
        if (col < 0 || col >= this.numCols)
            return false;
        if (row < 0 || row >= this.numRows)
            return false;
        if (this.getStar(col - 1, row) == STAR ||
            this.getStar(col + 0, row) == STAR ||
            this.getStar(col + 1, row) == STAR ||
            this.getStar(col - 1, row - 1) == STAR ||
            this.getStar(col + 0, row - 1) == STAR ||
            this.getStar(col + 1, row - 1) == STAR ||
            this.getStar(col - 1, row + 1) == STAR ||
            this.getStar(col + 0, row + 1) == STAR ||
            this.getStar(col + 1, row + 1) == STAR)
            return false;
        return true;
    }
    setStar(col, row) {
        if (col < 0 || col >= this.numCols)
            return false;
        if (row < 0 || row >= this.numRows)
            return false;
        if (this.numStars >= this.MaxStars)
            return false;
        if (!this.placeable(col, row))
            return false;
        if (this.getStar(col - 1, row) == STAR ||
            this.getStar(col + 0, row) == STAR ||
            this.getStar(col + 1, row) == STAR ||
            this.getStar(col - 1, row - 1) == STAR ||
            this.getStar(col + 0, row - 1) == STAR ||
            this.getStar(col + 1, row - 1) == STAR ||
            this.getStar(col - 1, row + 1) == STAR ||
            this.getStar(col + 0, row + 1) == STAR ||
            this.getStar(col + 1, row + 1) == STAR)
            return false;
        if (!this.createStar(col, row))
            return false;
        this.cells[row][col] = STAR;
        return true;
    }
    getStar(col, row) {
        if (col < 0 || col >= this.numCols)
            return 0;
        if (row < 0 || row >= this.numRows)
            return 0;
        return this.cells[row][col];
    }
    update() {
    }
    createStar(i, j) {
        if (this.numStars >= this.MaxStars)
            return false;
        let index = this.numStars;
        const tx = -this.numCols * 0.5 * SpaceBetweenStars;
        const ty = -this.numRows * 0.5 * SpaceBetweenStars;
        let star = this.gobjs[StarIndex + index];
        star.active = true;
        star.x.reset(tx + i * SpaceBetweenStars, ty + j * SpaceBetweenStars, 0);
        let r = randbetween(MinStarRadius, MaxStarRadius);
        star.radius = r;
        star.mass = r * 1e12;
        this.numStars++;
        return true;
    }
    createPlanetoid(i, j) {
        if (this.numPlanetoids >= this.MaxPlanetoids)
            return false;
        let index = this.numPlanetoids;
        const tx = -this.numCols * 0.5 * SpaceBetweenStars;
        const ty = -this.numRows * 0.5 * SpaceBetweenStars;
        let planetoid = this.gobjs[PlanetoidIndex + index];
        planetoid.active = true;
        planetoid.x.reset(tx + i * SpaceBetweenStars, ty + j * SpaceBetweenStars, 0);
        let r = randbetween(MinPlanetoidRadius, MaxPlanetoidRadius);
        planetoid.radius = r;
        planetoid.mass = r * 1e9;
        this.numPlanetoids++;
        return true;
    }
    createCreationStar(i, j) {
        if (this.numCreationStars >= this.MaxCreationStars)
            return false;
        let index = this.numCreationStars;
        const tx = -this.numCols * 0.5 * SpaceBetweenStars;
        const ty = -this.numRows * 0.5 * SpaceBetweenStars;
        let star = this.gobjs[CreationStarIndex + index];
        star.x.reset(tx + i * SpaceBetweenStars, ty + j * SpaceBetweenStars, 0);
        star.active = true;
        star.radius = 2.0;
        star.mass = 1e6;
        this.numCreationStars++;
        return true;
    }
    sfx(sound) {
        if (this.xor.triggers.get(SOUNDS[sound]).tick(this.xor.t1)) {
            this.xor.sound.sampler.playSample(sound);
        }
    }
}
/// <reference path="./CommonGame.ts" />
class ExoSystemGame {
    constructor(xor, common) {
        this.xor = xor;
        this.common = common;
        this.col = 0;
        this.row = 0;
        this.placeable = 0;
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
            return;
        }
        ;
        this.common.setStar(this.col, this.row);
        this.common.sfx(SOUND_CREATE_STAR);
        for (let i = 0; i < 2; i++) {
            let x = randbetween(-1, 1);
            let y = randbetween(-1, 1);
            this.common.createPlanetoid(this.col + x, this.row + y);
        }
        let x = randbetween(-1, 1);
        let y = randbetween(-1, 1);
        this.common.createCreationStar(this.col + x, this.row + y);
        this.common.creationStarsCollected--;
    }
}
/// <reference path="./CommonGame.ts" />
class EndoSystemGame {
    constructor(xor, common) {
        this.xor = xor;
        this.common = common;
    }
    init() {
        this.reset();
    }
    reset() {
    }
    update() {
        let gobjs = this.common.gobjs;
        let cells = this.common.cells;
        if (gobjs.length < MaxGObjects)
            return;
        // update star physics
        for (let i = 0; i < StarCount; i++) {
            let star = gobjs[StarIndex + i];
            // disable non-existent stars
            if (i >= this.common.numStars) {
                star.active = false;
                continue;
            }
            star.active = true;
            star.resetForces();
            star.update(this.xor.dt);
        }
        // update planetoid physics
        for (let i = 0; i < PlanetoidCount; i++) {
            let planetoid = gobjs[PlanetoidIndex + i];
            // disable non-existent planetoids
            if (i >= this.common.numPlanetoids) {
                planetoid.active = false;
                continue;
            }
            if (planetoid.life < 0)
                planetoid.active = false;
            if (!planetoid.active)
                continue;
            // planetoid.active = true;
            planetoid.resetForces();
            // allow planetoids to interact with stars
            for (let j = 0; j < this.common.numStars; j++) {
                let star = gobjs[StarIndex + j];
                planetoid.calcInteractionForce(star, 10.0);
            }
            // allow planetoids to interact with other planetoids
            for (let j = 0; j < this.common.numPlanetoids; j++) {
                if (j == i)
                    continue;
                let otherPlanetoid = gobjs[PlanetoidIndex + j];
                planetoid.calcInteractionForce(otherPlanetoid, 10.0);
            }
            // allow planetoids to interact with creation stars
            for (let j = 0; j < this.common.numCreationStars; j++) {
                if (j == i)
                    continue;
                let star = gobjs[CreationStarIndex + j];
                planetoid.calcInteractionForce(star, 10.0);
            }
            planetoid.update(this.xor.dt);
        }
        for (let i = 0; i < CreationStarCount; i++) {
            let creationStar = gobjs[CreationStarIndex + i];
            if (i >= this.common.numCreationStars) {
                creationStar.active = false;
                continue;
            }
            // TODO: CHANGE when creation stars can be obtained
            // if (!star.active) return;
            creationStar.resetForces();
            // allow creation star to interact with planetoids
            for (let j = 0; j < this.common.numPlanetoids; j++) {
                let planetoid = gobjs[PlanetoidIndex + j];
                creationStar.calcInteractionForce(planetoid);
            }
            // allow creation star to interact with stars
            for (let j = 0; j < this.common.numStars; j++) {
                let star = gobjs[StarIndex + j];
                creationStar.calcInteractionForce(star);
            }
            creationStar.update(this.xor.dt);
        }
        // update player physics
        for (let i = 0; i < PlayerCount; i++) {
            let player = gobjs[PlayerIndex + i];
            if (!player.active)
                continue;
            // player.active = true;
            player.resetForces();
            // TODO: allow player to interact with creation stars
            for (let j = 0; j < this.common.numCreationStars; j++) {
                let star = gobjs[CreationStarIndex + j];
                if (!star.active)
                    continue;
                player.calcInteractionForce(star);
                if (player.distanceBetween(star) < 0) {
                    star.active = false;
                    this.common.sfx(SOUND_CREATIONSTAR_DEAD);
                    this.common.creationStarsCollected++;
                }
            }
            // allow player to interact with planetoids
            for (let j = 0; j < this.common.numPlanetoids; j++) {
                let planetoid = gobjs[PlanetoidIndex + j];
                player.calcInteractionForce(planetoid);
                if (player.distanceBetween(planetoid) < 0) {
                    this.common.sfx(SOUND_PLAYER_MINING);
                    planetoid.life -= 0.1 * this.xor.dt;
                    this.common.gold += 0.1 * this.xor.dt;
                }
            }
            // allow player to interact with stars
            for (let j = 0; j < this.common.numStars; j++) {
                let star = gobjs[StarIndex + j];
                player.calcInteractionForce(star);
                if (player.distanceBetween(star) < 0) {
                    player.life -= player.burn(star) / 100.0 * this.xor.dt;
                    if (player.life < 0) {
                        this.common.sfx(SOUND_PLAYER_DEAD);
                        player.active = false;
                    }
                    else {
                        this.common.sfx(SOUND_PLAYER_DYING);
                    }
                }
            }
            player.update(this.xor.dt);
        }
    }
}
class State {
    constructor(name, alt = "NONE", delayTime = 0, queueSound = 0, queueMusic = 0) {
        this.name = name;
        this.alt = alt;
        this.delayTime = delayTime;
        this.queueSound = queueSound;
        this.queueMusic = queueMusic;
    }
}
/// <reference path="./State.ts" />
class StateMachine {
    constructor(xor) {
        this.xor = xor;
        this.states = [];
        this._t1 = 0;
    }
    clear() {
        this.states = [];
    }
    update(tInSeconds) {
        this._t1 = tInSeconds;
        let topTime = this.topTime;
        if (topTime > 0 && topTime < tInSeconds) {
            this.pop();
            this.xor.sound.sampler.playSample(this.topSound);
        }
    }
    push(name, alt, delayTime) {
        if (delayTime > 0)
            delayTime += this._t1;
        this.states.push(new State(name, alt, delayTime));
    }
    pushwithsound(name, alt, delayTime, sound, music) {
        if (delayTime > 0)
            delayTime += this._t1;
        this.states.push(new State(name, alt, delayTime, sound, music));
        this.push(name, "PAUSE", 0.01);
    }
    pop() {
        if (this.states.length)
            this.states.pop();
    }
    get topName() {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].name;
        }
        return "NONE";
    }
    get topAlt() {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].alt;
        }
        return "NONE";
    }
    get topTime() {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].delayTime;
        }
        return -1;
    }
    get topSound() {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].queueSound;
        }
        return -1;
    }
    get topMusic() {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].queueMusic;
        }
        return -1;
    }
}
/// <reference path="./App.ts" />
/// <reference path="./Math.ts" />
/// <reference path="./GravityObject.ts" />
/// <reference path="./CommonGame.ts" />
/// <reference path="./ExoSystemGame.ts" />
/// <reference path="./EndoSystemGame.ts" />
/// <reference path="./StateMachine.ts" />
const HELPMODE = 0;
const EXOMODE = 1;
const ENDOMODE = 2;
const PAUSEMODE = 3;
const CANVASWIDTH = 512;
const CANVASHEIGHT = 512;
const GOBJ_PLAYER = 0;
let EndoCenter = Vector3.make(0, 0, -100);
let ExoCenter = Vector3.make(0, 0, -100);
class Game {
    constructor(app, xor) {
        this.app = app;
        this.xor = xor;
        this.common = new CommonGame(this.xor);
        this.exogame = new ExoSystemGame(this.xor, this.common);
        this.endogame = new EndoSystemGame(this.xor, this.common);
        this.mode = EXOMODE;
        this.level = 5;
        this.cameraPosition = Vector3.make();
        this.exoGridFade = 0;
        this.bbox = new GTE.BoundingBox();
        this.ovtex = null;
        this.gamePaused = false;
        this.gameEnded = true;
        this.fadingTime = 0;
        this.fadingIn = true;
    }
    init() {
        this.ovcanvas = document.createElement("canvas");
        this.ovcanvas.width = CANVASWIDTH;
        this.ovcanvas.height = CANVASHEIGHT;
        this.ovctx = this.ovcanvas.getContext("2d");
        let overlayRect = this.xor.meshes.create('overlay');
        overlayRect.rect(-1, -1, 1, 1);
        this.reset();
        this.common.init();
        this.endogame.init();
        this.exogame.init();
    }
    reset() {
        if (this.mode == HELPMODE)
            this.common.states.push("HELP", "", 0);
        if (this.mode == ENDOMODE)
            this.common.states.push("ENDO", "", 0);
        if (this.mode == EXOMODE)
            this.common.states.push("EXO", "", 0);
        this.level = this.app.levelRequested;
        this.common.resize(this.level, this.level);
        this.fadingTime = this.xor.t1;
        this.fadingIn = false;
        this.gameEnded = false;
        this.createLevel();
        this.createGrid();
        let t = (this.level + 2) * 0.5 * SpaceBetweenStars;
        this.common.gobjs[PlayerIndex].x.reset(-t * 1.2, 0.0, 0.0);
        this.bbox.reset();
        let p = t * 1.5;
        this.bbox.add(Vector3.make(p, p, 0));
        this.bbox.add(Vector3.make(-p, -p, 0));
        ExoCenter.reset(0, 0, -2.5 * this.level * SpaceBetweenStars);
        this.xor.sound.jukebox.play(MUSIC_STARBATTLE2);
    }
    createLevel() {
        /*
        let numStars = randbetweeni(1, this.common.numCols);
        for (let i = 0; i < numStars; i++) {
            let col = randbetweeni(0, this.level);
            let row = randbetweeni(0, this.level);
            let result = false;
            let maxtries = 10;
            while (!result && maxtries > 0) {
                result = this.common.setStar(col, row);
                maxtries--;
            }
        }
        hflog.info(numStars.toFixed(0) + " stars created");

        let numPlanetoids = randbetweeni(numStars, numStars << 1);
        for (let i = 0; i < numPlanetoids; i++) {
            let col = randbetween(0, this.level);
            let row = randbetween(0, this.level);
            this.common.createPlanetoid(col, row);
        }
        hflog.info(numPlanetoids.toFixed(0) + " planetoids created");

        let maxStars = this.common.MaxStars - numStars;
        let numCreationStars = randbetweeni(1, maxStars);
        for (let i = 0; i < numCreationStars; i++) {
            let col = randbetween(0, this.level);
            let row = randbetween(0, this.level);
            this.common.createCreationStar(col, row);
        }
        */
        let col = randbetween(0, this.level);
        let row = randbetween(0, this.level);
        this.common.createCreationStar(col, row);
        for (let i = 0; i < PlayerCount; i++) {
            this.common.gobjs[PlayerIndex + i].active = true;
            this.common.gobjs[PlayerIndex + i].life = 1;
        }
    }
    createGrid() {
        let gl = this.xor.graphics.gl;
        let exoGrid = this.xor.meshes.create("exoGrid");
        exoGrid.reset();
        exoGrid.begin(gl.LINES);
        let t = (this.level + 2) * 0.5 * SpaceBetweenStars;
        for (let i = 0; i <= this.level + 2; i++) {
            exoGrid.color(0, 1, 0);
            exoGrid.vertex(i * SpaceBetweenStars - t, -t, 0);
            exoGrid.addIndex(-1);
            exoGrid.vertex(i * SpaceBetweenStars - t, t, 0);
            exoGrid.addIndex(-1);
            exoGrid.vertex(-t, i * SpaceBetweenStars - t, 0);
            exoGrid.addIndex(-1);
            exoGrid.vertex(t, i * SpaceBetweenStars - t, 0);
            exoGrid.addIndex(-1);
        }
        hflog.info('grid made: -' + t.toFixed(3) + " --> " + t.toFixed(3));
    }
    update() {
        this.common.update();
        if (this.common.states.topName == "ENDO") {
            this.endogame.update();
            this.mode = ENDOMODE;
        }
        else if (this.common.states.topName == "EXO") {
            this.exogame.update();
            this.mode = EXOMODE;
        }
        else if (this.common.states.topName == "HELP") {
            this.mode = HELPMODE;
        }
        let state = this.common.states;
        let xor = this.xor;
        let app = this.app;
        if (this.mode == ENDOMODE) {
            let player = this.common.gobjs[PlayerIndex];
            EndoCenter.reset(-player.x.x, -player.x.y, -75);
            let distance = EndoCenter.distance(this.cameraPosition);
            if (distance > 1) {
                let dirTo = this.cameraPosition.dirTo(EndoCenter);
                this.cameraPosition.accum(dirTo, this.xor.dt * distance);
            }
        }
        else if (this.mode == EXOMODE) {
            let distance = ExoCenter.distance(this.cameraPosition);
            if (distance > 1) {
                let dirTo = this.cameraPosition.dirTo(ExoCenter);
                this.cameraPosition.accum(dirTo, this.xor.dt * distance);
            }
            this.exoGridFade = GTE.clamp(10.0 - distance, 0.0, 10.0) / 10.0;
        }
        this.exoGridFade = 0.25 + 0.75 * GTE.clamp(Math.abs(this.cameraPosition.z), 0.0, 100.0) / 100.0;
        for (let g of this.common.gobjs) {
            g.x.clamp3(this.bbox.minBounds, this.bbox.maxBounds);
        }
        if (state.topAlt == "PAUSE") {
            if (app.ESCAPEbutton && xor.triggers.get("ESC").tick(xor.t1)) {
                state.pop();
                this.gamePaused = false;
            }
            return;
        }
        else if (state.topAlt != "PAUSE") {
            if (app.ESCAPEbutton && this.xor.triggers.get("ESC").tick(xor.t1)) {
                state.push(state.topName, "PAUSE", 0);
                this.gamePaused = true;
                return;
            }
        }
        let player = this.common.gobjs[PlayerIndex];
        if (this.xor.triggers.get("SPC").tick(this.xor.t1)) {
            if (this.app.SPACEbutton) {
                this.swapEndoExoMode();
                return;
            }
        }
        if (this.mode == ENDOMODE) {
            player.thrust(this.app.p1x, this.app.p1y);
            this.endogame.update();
        }
        if (this.mode == EXOMODE) {
            this.exogame.update();
            let b1 = this.xor.triggers.get("EXOLR").tick(this.xor.t1);
            let b2 = this.xor.triggers.get("EXOUD").tick(this.xor.t1);
            let b3 = this.app.ENTERbutton;
            let dx = b1 ? this.app.p1x : 0;
            let dy = b2 ? this.app.p1y : 0;
            if (dx || dy || b3) {
                this.common.sfx(SOUND_EXO_CLICK);
            }
            this.exogame.move(dx, dy);
            if (b3 && this.exogame.placeable) {
                this.exogame.placeStar();
            }
        }
        if (!this.fadingIn && player.life < 0) {
            this.fadingTime = this.xor.t1;
            this.fadingIn = true;
            this.gameEnded = true;
            this.xor.sound.jukebox.play(MUSIC_STARBATTLE1);
        }
    }
    swapEndoExoMode() {
        let endo = (this.common.states.topName == "ENDO") ? 1 : 0;
        endo = 1 - endo;
        this.common.states.clear();
        if (endo) {
            this.common.states.push("ENDO", "", 0);
            this.common.sfx(SOUND_ENDO);
        }
        else {
            this.common.states.push("EXO", "", 0);
            this.common.sfx(SOUND_EXO);
        }
    }
    render() {
        let xor = this.xor;
        let gl = this.xor.graphics.gl;
        let rc = this.xor.renderconfigs.use('default');
        if (rc) {
            let projMatrix = Matrix4.makePerspectiveY(45.0, CANVASWIDTH / CANVASHEIGHT, 1.0, 10 + Math.abs(ExoCenter.z));
            let cameraMatrix = Matrix4.makeTranslation3(this.cameraPosition);
            rc.uniformMatrix4f('ProjectionMatrix', projMatrix);
            rc.uniformMatrix4f('CameraMatrix', cameraMatrix);
            let wm = Matrix4.makeIdentity();
            rc.uniformMatrix4f("WorldMatrix", wm);
            rc.uniform3f("Kd", Vector3.make(0, this.exoGridFade, 0));
            this.xor.meshes.render('exoGrid', rc);
            if (this.mode == ENDOMODE) {
                this.renderSystem(rc);
            }
            else if (this.mode == EXOMODE) {
                this.renderSystem(rc);
                this.renderExo(rc);
            }
            rc.restore();
        }
        this.updateOverlay();
        this.uploadOverlay();
        this.renderOverlay();
    }
    renderSystem(rc) {
        rc.uniform3f("Kd", Vector3.make(1, 0, 1));
        let player = this.common.gobjs[PlayerIndex];
        this.renderPlayer(player, rc);
        for (let i = 0; i < CreationStarCount; i++) {
            let star = this.common.gobjs[CreationStarIndex + i];
            if (!star.active)
                continue;
            this.renderCreationStar(star, rc);
            if (player.canCalcInteraction(star)) {
                this.xor.meshes.render('circle', rc);
            }
        }
        for (let i = 0; i < StarCount; i++) {
            let star = this.common.gobjs[StarIndex + i];
            if (!star.active)
                continue;
            this.renderStar(star, rc);
            if (player.canCalcInteraction(star)) {
                this.xor.meshes.render('circle', rc);
            }
        }
        rc.uniform3f("Kd", Vector3.make(0.4, 0.2, 0));
        for (let i = 0; i < PlanetoidCount; i++) {
            let planetoid = this.common.gobjs[PlanetoidIndex + i];
            if (!planetoid.active)
                continue;
            this.renderPlanetoid(planetoid, rc);
            if (player.canCalcInteraction(planetoid)) {
                this.xor.meshes.render('circle', rc);
            }
        }
    }
    renderExo(rc) {
        let offcol = (this.common.numCols / 2);
        let offrow = (this.common.numRows / 2);
        let wm = Matrix4.makeTranslation((this.exogame.col - offcol) * SpaceBetweenStars, (this.exogame.row - offrow) * SpaceBetweenStars, 0);
        wm.scale(2, 2, 2);
        let s = Math.sin(this.xor.t1) * 0.25 + 0.75;
        if (!this.exogame.placeable)
            rc.uniform3f("Kd", Vector3.make(s, 0, 0));
        else
            rc.uniform3f("Kd", Vector3.make(0, s, 0));
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('circle', rc);
    }
    renderPlayer(gobj, rc) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('cube', rc);
    }
    renderCreationStar(gobj, rc) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        if (gobj.sink)
            rc.uniform3f("Kd", Vector3.make(1.0, 1.0, 1.0));
        if (gobj.vent)
            rc.uniform3f("Kd", Vector3.make(1.0 * Math.sin(this.xor.t1), 0));
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('geosphere', rc);
    }
    renderStar(gobj, rc) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        if (gobj.sink)
            rc.uniform3f("Kd", Vector3.make(1, 1, 0));
        if (gobj.vent)
            rc.uniform3f("Kd", Vector3.make(0, 0, 1));
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('geosphere', rc);
    }
    renderPlanetoid(gobj, rc) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        rc.uniformMatrix4f("WorldMatrix", wm);
        if (gobj.sink)
            rc.uniform3f("Kd", Vector3.make(0, 1, 1));
        if (gobj.vent)
            rc.uniform3f("Kd", Vector3.make(1, 0, 0));
        this.xor.meshes.render('geosphere', rc);
    }
    updateOverlay() {
        let gfx = this.ovctx;
        gfx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
        gfx.font = (CANVASHEIGHT / 6).toString() + "px linbiolinum";
        gfx.imageSmoothingEnabled = false;
        gfx.fillStyle = '#FFFFFF';
        gfx.strokeStyle = "#FF0000";
        gfx.textAlign = "center";
        let pt1 = this.xor.t1 - this.fadingTime;
        let fade = 0;
        if (this.xor.t1 < 5 || this.fadingIn) {
            let a = GTE.clamp(pt1, 0, 5) / 5;
            gfx.strokeStyle = this.xor.palette.getHtmlColor(Vector3.make(a, 0, 0));
            if (a > 0)
                gfx.strokeText("STAR BATTLE", CANVASWIDTH >> 1, CANVASHEIGHT >> 2);
            fade = a;
        }
        else {
            let a = GTE.clamp(5 - pt1, 0, 5) / 5;
            gfx.strokeStyle = this.xor.palette.getHtmlColor(Vector3.make(a, 0, 0));
            if (a > 0)
                gfx.strokeText("STAR BATTLE", CANVASWIDTH >> 1, CANVASHEIGHT >> 2);
            fade = a;
        }
        if (this.gamePaused) {
            gfx.font = "32px linlibertine";
            gfx.fillStyle = '#FFFFFF';
            gfx.fillText("Game Paused", CANVASWIDTH >> 1, CANVASHEIGHT >> 1);
        }
        let pal = this.xor.palette;
        if (!this.gameEnded) {
            gfx.font = "32px linlibertine";
            gfx.fillStyle = pal.getHtmlColor(pal.getColor(15));
            gfx.textAlign = "right";
            gfx.fillText("Creation Stars: " + this.common.creationStarsCollected, CANVASWIDTH, 32);
            gfx.textAlign = "left";
            gfx.fillStyle = pal.getHtmlColor(pal.getColor(14));
            let goldval = (this.common.gold * 100) | 0;
            gfx.fillText("Gold: " + goldval, 0, 32);
            let gold = this.common.gold / this.common.MaxGold;
            gfx.fillStyle = pal.getHtmlColor(pal.calcColor(14, 0, 4, 0, 0, 0));
            gfx.fillRect(0, CANVASHEIGHT - 10, CANVASWIDTH / 2, 10);
            gfx.fillStyle = pal.getHtmlColor(pal.getColor(14));
            gfx.fillRect(0, CANVASHEIGHT - 10, gold * CANVASWIDTH / 2, 10);
            let life = this.common.gobjs[PlayerIndex].life;
            gfx.fillStyle = pal.getHtmlColor(pal.calcColor(4, 0, 4, 0, 0, 0));
            gfx.fillRect(CANVASWIDTH / 2, CANVASHEIGHT - 10, CANVASWIDTH, 10);
            gfx.fillStyle = pal.getHtmlColor(pal.getColor(4));
            gfx.fillRect(CANVASWIDTH / 2, CANVASHEIGHT - 10, life * CANVASWIDTH / 2, 10);
        }
    }
    uploadOverlay() {
        let gl = this.xor.graphics.gl;
        if (!this.ovtex) {
            this.ovtex = gl.createTexture();
        }
        if (!this.ovtex)
            return;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.ovtex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.ovcanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    renderOverlay() {
        let gl = this.xor.graphics.gl;
        let rc = this.xor.renderconfigs.use('overlay');
        if (rc) {
            rc.useDepthTest = false;
            rc.useBlending = true;
            rc.blendSrcFactor = gl.ONE;
            rc.blendDstFactor = gl.ONE_MINUS_SRC_ALPHA;
            rc.uniformMatrix4f('ProjectionMatrix', Matrix4.makePerspectiveY(90, 1.0, 1.0, 100.0));
            rc.uniformMatrix4f('CameraMatrix', Matrix4.makeTranslation(0, 0, -1));
            rc.uniformMatrix4f('WorldMatrix', Matrix4.makeIdentity());
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.ovtex);
            rc.uniform1f('MapKdMix', 1.0);
            rc.uniform1i('MapKd', 0);
            this.xor.meshes.render('overlay', rc);
            rc.restore();
        }
    }
}
/// <reference path="../../LibXOR/LibXOR.d.ts" />
/// <reference path="./htmlutils.ts" />
/// <reference path="./Game.ts" />
class App {
    constructor() {
        // setIdToHtml("desc", "<p>This is a test of the LibXOR retro console.</p>");
        this.xor = new LibXOR("project");
        this.game = new Game(this, this.xor);
        this.theta = 0;
        this.levelRequested = 7;
        this.userDrag = 0;
        this.euroKeys = 0;
        this.xmoveKeys = [
            ["KeyA", "KeyD"],
            ["KeyQ", "KeyD"]
        ];
        this.zmoveKeys = [
            ["KeyS", "KeyW"],
            ["KeyS", "KeyZ"]
        ];
        this.zturnKeys = [
            ["KeyQ", "KeyE"],
            ["KeyA", "KeyE"]
        ];
        this.ymoveKeys = [
            ["KeyC", "KeyZ"],
            ["KeyC", "KeyW"]
        ];
        this.yturnKeys = [
            ["ArrowLeft", "ArrowRight"],
            ["ArrowLeft", "ArrowRight"]
        ];
        this.xturnKeys = [
            ["ArrowUp", "ArrowDown"],
            ["ArrowUp", "ArrowDown"]
        ];
        this.p1x = 0;
        this.p2x = 0;
        this.p1y = 0;
        this.p2y = 0;
        this.ENTERbutton = 0;
        this.ESCAPEbutton = 0;
        this.SPACEbutton = 0;
        this.TABbutton = 0;
        this.pauseGame = false;
        let self = this;
        let controls = document.getElementById('controls');
        if (controls) {
            createButtonRow(controls, "bStartGame", "Start Game", () => {
                self.reset();
            });
            createButtonRow(controls, "bZSDF", "ZSDF/WASD", () => {
                self.euroKeys = 1 - self.euroKeys;
                if (self.euroKeys) {
                    setDivRowValue("bZSDF", "ZQSD");
                }
                else {
                    setDivRowValue("bZSDF", "WASD");
                }
            });
            createButtonRow(controls, "ENDOEXO", "ENDO/EXO", () => {
                this.game.swapEndoExoMode();
            });
            // createLabelRow(controls, "TOP", "TOP");
            // createLabelRow(controls, "ALT", "ALT");
            // createTextRow(controls, "SolarCode", "");
            createRangeRow(controls, "Level", 7, 3, 10);
            createRangeRow(controls, "Drag", 1, 1, 10);
            // createRangeRow(controls, "SOffsetX", 0, -8, 8);
            // createRangeRow(controls, "SOffsetY", 0, -8, 8);
            // createRangeRow(controls, "SZoomX", 1.0, 0.0, 4.0, 0.1);
            // createRangeRow(controls, "SZoomY", 1.0, 0.0, 4.0, 0.1);
            createRangeRow(controls, "playTrack", 0, 0, 7);
            createRangeRow(controls, "sfxTrack", 0, 0, 15);
            createButtonRow(controls, "bPlayTrack", "Play Track", () => {
                self.playMusic(getRangeValue("playTrack"));
            });
            createButtonRow(controls, "bPlaySFX", "Play SFX", () => {
                self.playSfx(getRangeValue("sfxTrack"));
            });
        }
        this.xor.triggers.set("ESC", 60.0 / 120.0);
        this.xor.triggers.set("SPC", 0.15);
        this.xor.triggers.set("ENT", 0.033);
        this.xor.triggers.set("EXOLR", 0.2);
        this.xor.triggers.set("EXOUD", 0.2);
    }
    /**
     * getAxis(keysToCheck)
     * @param {string[]} keysToCheck a two element string array
     */
    getAxis(keysToCheck) {
        let neg = this.xor.input.checkKeys([keysToCheck[this.euroKeys][0]]);
        let pos = this.xor.input.checkKeys([keysToCheck[this.euroKeys][1]]);
        return pos - neg;
    }
    /**
     * playMusic(index)
     * @param {number} index Which slot to start playing
     */
    playMusic(index) {
        this.xor.sound.jukebox.play(index | 0);
    }
    playSfx(index) {
        this.xor.sound.sampler.playSample(index & 0xF, false, 0);
    }
    /**
     * init()
     */
    init() {
        hflog.logElement = "log";
        // this.xor.graphics.setVideoMode(1.5 * 384, 384);
        this.xor.graphics.setVideoMode(512, 512);
        this.xor.input.init();
        let defaultrc = this.xor.renderconfigs.load('default', 'shaders/basic.vert', 'shaders/basic.frag');
        this.xor.renderconfigs.load('overlay', 'shaders/basic.vert', 'shaders/basic.frag');
        defaultrc.useCullFace = true;
        let bbox = new GTE.BoundingBox();
        bbox.add(Vector3.make(-1.0, -1.0, -1.0));
        bbox.add(Vector3.make(1.0, 1.0, 1.0));
        this.xor.meshes.load('cornellbox', 'models/cornellbox_orig.obj', bbox, null);
        this.xor.meshes.load('square', 'models/square.obj', null, null);
        this.xor.meshes.load('cube', 'models/cube.obj', null, null);
        this.xor.meshes.load('geosphere', 'models/geosphere.obj', null, null);
        let circle = this.xor.meshes.create('circle');
        circle.strokeCircle(0, 0, 1.0, 32);
        this.xor.graphics.init();
        this.reset();
        this.xor.sound.init();
        this.xor.sound.jukebox.add(0, "music/starbattlemusic1.mp3", false);
        this.xor.sound.jukebox.add(1, "music/starbattlemusic2.mp3", false);
        this.xor.sound.sampler.loadSample(SOUND_PLAYER_DEAD, "sounds/starbattle-dead.wav");
        this.xor.sound.sampler.loadSample(SOUND_PLANETOID_DEAD, "sounds/starbattle-pdead.wav");
        this.xor.sound.sampler.loadSample(SOUND_CREATIONSTAR_DEAD, "sounds/starbattle-.wav");
        this.xor.sound.sampler.loadSample(SOUND_PLAYER_MINING, "sounds/starbattle-ok.wav");
        this.xor.sound.sampler.loadSample(SOUND_PLAYER_DYING, "sounds/starbattle-bad.wav");
        this.xor.sound.sampler.loadSample(SOUND_EXO_CLICK, "sounds/starbattle-click.wav");
        this.xor.sound.sampler.loadSample(SOUND_CREATE_STAR, "sounds/starbattle-star.wav");
        this.xor.sound.sampler.loadSample(SOUND_EXO, "sounds/starbattle-exo.wav");
        this.xor.sound.sampler.loadSample(SOUND_ENDO, "sounds/starbattle-endo.wav");
        this.xor.triggers.set("PLAYER_DEAD", 0.5);
        this.xor.triggers.set("PLAYER_MINING", 0.5);
        this.xor.triggers.set("PLANETOID_DEAD", 0.1);
        this.xor.triggers.set("CREATIONSTAR_DEAD", 0.1);
        this.xor.triggers.set("PLAYER_DYING", 0.5);
        this.xor.triggers.set("EXOCLICK", 0.1);
        this.xor.triggers.set("EXO", 0.5);
        this.xor.triggers.set("ENDO", 0.5);
        this.game = new Game(this, this.xor);
        this.game.init();
    }
    /**
     * reset()
     */
    reset() {
        let spr = this.xor.graphics.sprites[0];
        if (spr) {
            spr.enabled = true;
            spr.position.reset(50, 50, 0);
        }
        spr = this.xor.graphics.sprites[1];
        if (spr) {
            spr.enabled = true;
            spr.position.reset(58, 50, 0);
        }
        this.pauseGame = false;
        this.game.reset();
    }
    /**
     * start()
     */
    start() {
        this.mainloop();
    }
    /**
     * update(dt)
     * @param dt timeElapsedSinceLastFrame
     */
    update(dt) {
        let xor = this.xor;
        xor.input.poll();
        this.updateControls();
        this.ESCAPEbutton = xor.input.checkKeys(["Escape"]);
        this.SPACEbutton = xor.input.checkKeys([" ", "Space"]);
        this.ENTERbutton = xor.input.checkKeys(["Enter"]);
        this.TABbutton = xor.input.checkKeys(["Tab"]);
        this.p1x = this.getAxis(this.xmoveKeys);
        this.p1y = this.getAxis(this.zmoveKeys);
        this.p2x = this.getAxis(this.yturnKeys);
        this.p2y = this.getAxis(this.xturnKeys);
        // if (xor.input.touches[0].pressed) {
        //     let v = Vector3.makeUnit(
        //         xor.input.touches[0].dx,
        //         -xor.input.touches[0].dy,
        //         0);
        //     this.p1x = v.x;
        //     this.p1y = v.y;
        // }
        if (xor.input.mouseOver) {
            let w = xor.graphics.width;
            let h = xor.graphics.height;
            let x = xor.input.mouse.position.x;
            let y = xor.input.mouse.position.y;
        }
        this.theta += dt;
        this.game.update();
    }
    /**
     * updateControls()
     */
    updateControls() {
        let xor = this.xor;
        // xor.graphics.setOffset(getRangeValue("SOffsetX"), getRangeValue("SOffsetY"));
        // xor.graphics.setZoom(getRangeValue("SZoomX"), getRangeValue("SZoomY"));
        this.levelRequested = getRangeValue("Level");
        this.userDrag = getRangeValue("Drag");
        // setDivLabelValue("TOP", this.game.common.states.topName);
        // setDivLabelValue("ALT", this.game.common.states.topAlt);
        // setDivLabelValue("ALT", this.p1y.toString());
    }
    /**
     * render() draws the screen
     */
    render() {
        let xor = this.xor;
        let gl = xor.graphics.gl;
        let mixColor = Math.floor(0.5 * (1.0 + Math.sin(xor.t1)) * 6 + 0.5);
        xor.graphics.clear(XOR.Color.BLUE, XOR.Color.BLACK, 6);
        // if (!this.pauseGame) {
        //     xor.graphics.render();
        // }
        let pmatrix = Matrix4.makePerspectiveY(45.0, CANVASWIDTH / CANVASHEIGHT, 1.0, 100.0);
        let cmatrix = Matrix4.makeOrbit(-90, 0, 5.0);
        // let rc = xor.renderconfigs.use('default');
        // if (rc) {
        //     rc.uniformMatrix4f('ProjectionMatrix', pmatrix);
        //     rc.uniformMatrix4f('CameraMatrix', cmatrix);
        //     rc.uniformMatrix4f('WorldMatrix', Matrix4.makeRotation(this.theta * 30, 0, 1, 0));
        //     rc.uniform3f('Kd', Vector3.make(1.0, 0.0, 0.0));
        //     if (mixColor < 3)
        //         xor.meshes.render('cornellbox', rc);
        //     else if (mixColor < 5)
        //         xor.meshes.render('square', rc);
        //     else
        //         xor.meshes.render('cube', rc);
        //     rc.restore();
        // }
        this.game.render();
    }
    /**
     * renderOverlay() renders graphics on top of the canvas
     */
    renderOverlay() {
    }
    mainloop() {
        let self = this;
        window.requestAnimationFrame((t) => {
            self.xor.startFrame(t);
            self.xor.input.poll();
            self.xor.sound.update();
            self.update(self.xor.dt);
            self.render();
            self.renderOverlay();
            self.mainloop();
        });
    }
}
let app = new App();
app.init();
app.start();
//# sourceMappingURL=game.js.map