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
/// <reference path="../../LibXOR/LibXOR.d.ts" />
class GravityObject {
    /**
     * constructor()
     * @param gravitydir positive means pull, negative means push
     * @param mass mass in kilograms of this object
     */
    constructor(gravitydir = 1, mass = 1, radius = 1, xor, activeObjects) {
        this.gravitydir = gravitydir;
        this.mass = mass;
        this.radius = radius;
        this.xor = xor;
        this.activeObjects = activeObjects;
        this.x = Vector3.make(0, 0, 0);
        this.v = Vector3.make(0, 0, 0);
        this.a = Vector3.make(0, 0, 0);
        this.thrust_ = Vector3.make(0, 0, 0);
        this.life = 1.0;
        this.active = true;
    }
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
    }
    /**
     * applyForces calculates new position and velocity
     */
    applyForces() {
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
        this.life = 1.0;
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
    calcInteractionForce(gobj) {
    }
    /**
     *
     * @param x horizontal force applied to the object
     * @param y vertical force applied to the object
     */
    thrust(x, y) {
        this.thrust_.reset(x, y, 0);
    }
    /**
     * Returns the burn factor from this object to the next.
     * This only works from big objects to small objects.
     * Burn factor goes from 0 to 100
     * @param gobj
     */
    burn(gobj) {
        if (gobj.mass >= this.mass)
            return 0;
        return GTE.clamp(this.mass / gobj.mass, 0, 100);
    }
}
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
    constructor(xor, numCols = 4, numRows = 4) {
        this.xor = xor;
        this.numCols = numCols;
        this.numRows = numRows;
        this.gobjs = [];
        this.gold = 0;
        this.states = new StateMachine(this.xor);
        this.cells = [];
        this.numStars = 0;
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
            let row = [];
            for (let i = 0; i < this.numCols; i++) {
                row.push(0);
            }
            this.cells.push(row);
        }
    }
    setStar(col, row) {
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
}
/// <reference path="./CommonGame.ts" />
class ExoSystemGame {
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
        // update physics locations
        let starIndex = 0;
        let planetoidIndex = 0;
        for (let j = 0; j < this.common.numRows; j++) {
            for (let i = 0; i < this.common.numCols; i++) {
                switch (cells[j][i]) {
                    case NOTHING:
                        break;
                    case STAR:
                        gobjs[StarIndex + starIndex].x.reset(i * SpaceBetweenStars, j * SpaceBetweenStars, 0);
                        starIndex++;
                        break;
                    case PLANETOID:
                        gobjs[PlanetoidCount + planetoidIndex].x.reset(i * SpaceBetweenStars, j * SpaceBetweenStars, 0);
                        planetoidIndex++;
                        break;
                    default:
                        break;
                }
            }
        }
        // update star physics
        for (let i = 0; i < this.common.MaxStars; i++) {
            // disable non-existent stars
            if (i >= starIndex) {
                gobjs[i].active = false;
                continue;
            }
            let star = gobjs[i];
            star.active = true;
            star.resetForces();
            star.update(this.xor.dt);
        }
        // update planetoid physics
        for (let i = 0; i < this.common.MaxPlanetoids; i++) {
            // disable non-existent planetoids
            if (i >= planetoidIndex) {
                gobjs[i].active = false;
                continue;
            }
            let planetoid = gobjs[i];
            planetoid.active = true;
            planetoid.resetForces();
            // allow planetoids to interact with stars
            for (let j = 0; j < starIndex; j++) {
                let star = gobjs[StarIndex + j];
                planetoid.calcInteractionForce(star);
            }
            // allow planetoids to interact with other planetoids
            for (let j = 0; j < planetoidIndex; j++) {
                if (j == i)
                    continue;
                let otherPlanetoid = gobjs[PlanetoidIndex + j];
                planetoid.calcInteractionForce(otherPlanetoid);
            }
            planetoid.update(this.xor.dt);
        }
        // update player physics
        for (let i = PlayerIndex; i <= PlayerMaxIndex; i++) {
            let player = gobjs[i];
            player.active = true;
            player.resetForces();
            // TODO: allow player to interact with missiles and other players
            // allow player to interact with planetoids
            for (let j = 0; j < planetoidIndex; j++) {
                if (j == i)
                    continue;
                let planetoid = gobjs[PlanetoidIndex + j];
                player.calcInteractionForce(planetoid);
            }
            // allow player to interact with stars
            for (let j = 0; j < starIndex; j++) {
                if (j == i)
                    continue;
                let star = gobjs[StarIndex + j];
                player.calcInteractionForce(star);
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
class Game {
    constructor(app, xor) {
        this.app = app;
        this.xor = xor;
        this.common = new CommonGame(this.xor);
        this.exogame = new ExoSystemGame(this.xor, this.common);
        this.endogame = new EndoSystemGame(this.xor, this.common);
        this.mode = ENDOMODE;
        this.ovtex = null;
        this.gamePaused = false;
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
        if (this.mode == ENDOMODE) {
            let player = this.common.gobjs[GOBJ_PLAYER];
            player.thrust(this.app.p1x, this.app.p1y);
            player.x.accum(Vector3.make(this.app.p1x, this.app.p1y, 0), this.xor.dt);
            this.endogame.update();
        }
        if (this.mode == EXOMODE) {
        }
    }
    render() {
        let xor = this.xor;
        let gl = this.xor.graphics.gl;
        if (this.mode == ENDOMODE) {
            // render player
            // render star systems
            // render planetoids
            let rc = this.xor.renderconfigs.use('default');
            if (rc) {
                let player = this.common.gobjs[GOBJ_PLAYER];
                this.renderPlayer(player, rc);
                // for (let e of this.common.gobjs) {
                // }
                rc.restore();
            }
        }
        this.updateOverlay();
        this.uploadOverlay();
        this.renderOverlay();
    }
    renderPlayer(gobj, rc) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('cube', rc);
    }
    renderStar(gobj, rc) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        rc.uniformMatrix4f("WorldMatrix", wm);
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
        gfx.strokeText("STAR BATTLE", CANVASWIDTH >> 1, CANVASHEIGHT >> 2);
        if (this.gamePaused) {
            gfx.font = "32px linlibertine";
            gfx.fillStyle = '#FFFFFF';
            gfx.fillText("Game Paused", CANVASWIDTH >> 1, CANVASHEIGHT >> 1);
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
        this.xor = new LibXOR("project");
        this.game = new Game(this, this.xor);
        this.theta = 0;
        this.euroKeys = 0;
        this.xmoveKeys = [
            ["KeyA", "KeyD"],
            ["KeyQ", "KeyD"]
        ];
        this.zmoveKeys = [
            ["KeyW", "KeyS"],
            ["KeyZ", "KeyS"]
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
        setIdToHtml("desc", "<p>This is a test of the LibXOR retro console.</p>");
        let self = this;
        let controls = document.getElementById('controls');
        if (controls) {
            createButtonRow(controls, "bReset", "Reset", () => {
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
            createLabelRow(controls, "TOP", "");
            createLabelRow(controls, "ALT", "");
            createTextRow(controls, "SolarCode", "");
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
        this.xor.triggers.set("SPC", 0.033);
        this.xor.triggers.set("ENT", 0.033);
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
        this.xor.graphics.setVideoMode(1.5 * 384, 384);
        this.xor.input.init();
        let defaultrc = this.xor.renderconfigs.load('default', 'shaders/basic.vert', 'shaders/gbuffer.frag');
        this.xor.renderconfigs.load('overlay', 'shaders/basic.vert', 'shaders/basic.frag');
        defaultrc.useCullFace = true;
        let bbox = new GTE.BoundingBox();
        bbox.add(Vector3.make(-1.0, -1.0, -1.0));
        bbox.add(Vector3.make(1.0, 1.0, 1.0));
        this.xor.meshes.load('cornellbox', 'models/cornellbox_orig.obj', bbox, null);
        this.xor.meshes.load('square', 'models/square.obj', null, null);
        this.xor.meshes.load('cube', 'models/cube.obj', null, null);
        this.xor.meshes.load('geosphere', 'models/geosphere.obj', null, null);
        this.xor.graphics.init();
        this.reset();
        this.xor.sound.init();
        this.xor.sound.jukebox.add(0, "music/noise.mp3", false);
        this.xor.sound.jukebox.add(1, "music/maintheme.mp3", false);
        this.xor.sound.jukebox.add(2, "music/adventuretheme.mp3", false);
        this.xor.sound.jukebox.add(3, "music/arcadetheme.mp3", false);
        this.xor.sound.sampler.loadSample(0, "sounds/BassDrum1.wav");
        this.xor.sound.sampler.loadSample(1, "sounds/BassDrum2.wav");
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
        if (xor.input.checkKeys([" ", "Space"])) {
            this.reset();
        }
        this.ESCAPEbutton = xor.input.checkKeys(["Escape"]);
        this.SPACEbutton = xor.input.checkKeys([" ", "Space"]);
        this.ENTERbutton = xor.input.checkKeys(["Enter"]);
        this.TABbutton = xor.input.checkKeys(["Tab"]);
        if (xor.input.checkKeys(["Space"])) {
            if (xor.triggers.get("SPC").tick(xor.t1)) {
                hflog.info("pew!");
            }
        }
        this.p1x = this.getAxis(this.xmoveKeys);
        this.p1y = this.getAxis(this.zmoveKeys);
        this.p2x = this.getAxis(this.yturnKeys);
        this.p2y = this.getAxis(this.xturnKeys);
        xor.graphics.sprites[0].position.x += this.p1x * dt * 10;
        xor.graphics.sprites[0].position.y += this.p1y * dt * 10;
        xor.graphics.sprites[1].position.x += this.p2x * dt * 10;
        xor.graphics.sprites[1].position.y += this.p2y * dt * 10;
        for (let i = 0; i < 4; i++) {
            let spr = xor.graphics.sprites[2 + i];
            let gp = xor.input.gamepads.get(i);
            if (gp && gp.enabled) {
                spr.enabled = true;
                spr.position.x += gp.axe(0) * dt * 10;
                spr.position.y += gp.axe(1) * dt * 10;
            }
            else {
                spr.enabled = false;
            }
        }
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
        xor.graphics.setOffset(getRangeValue("SOffsetX"), getRangeValue("SOffsetY"));
        xor.graphics.setZoom(getRangeValue("SZoomX"), getRangeValue("SZoomY"));
        setDivRowValue("TOP", this.game.common.states.topName);
        setDivRowValue("ALT", this.game.common.states.topAlt);
    }
    /**
     * render() draws the screen
     */
    render() {
        let xor = this.xor;
        let gl = xor.graphics.gl;
        let mixColor = Math.floor(0.5 * (1.0 + Math.sin(xor.t1)) * 6 + 0.5);
        xor.graphics.clear(XOR.Color.BLUE, XOR.Color.BLACK, 6);
        if (!this.pauseGame) {
            xor.graphics.render();
        }
        let pmatrix = Matrix4.makePerspectiveY(45.0, 1.5, 1.0, 100.0);
        let cmatrix = Matrix4.makeOrbit(-90, 0, 5.0);
        let rc = xor.renderconfigs.use('default');
        if (rc) {
            rc.uniformMatrix4f('ProjectionMatrix', pmatrix);
            rc.uniformMatrix4f('CameraMatrix', cmatrix);
            rc.uniformMatrix4f('WorldMatrix', Matrix4.makeRotation(this.theta * 30, 0, 1, 0));
            rc.uniform3f('Kd', Vector3.make(1.0, 0.0, 0.0));
            if (mixColor < 3)
                xor.meshes.render('cornellbox', rc);
            else if (mixColor < 5)
                xor.meshes.render('square', rc);
            else
                xor.meshes.render('cube', rc);
            rc.restore();
        }
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
