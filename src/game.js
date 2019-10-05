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
/// <reference path="./htmlutils.ts" />
class App {
    constructor() {
        this.xor = new LibXOR("project");
        this.ovtex = null;
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
        this.BACKbutton = 0;
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
            createTextRow(controls, "SolarCode", "");
            createCheckRow(controls, "zasdKeys", false);
            createRangeRow(controls, "SOffsetX", 0, -8, 8);
            createRangeRow(controls, "SOffsetY", 0, -8, 8);
            createRangeRow(controls, "SZoomX", 1.0, 0.0, 4.0, 0.1);
            createRangeRow(controls, "SZoomY", 1.0, 0.0, 4.0, 0.1);
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
        this.ovcanvas = document.createElement("canvas");
        this.ovcanvas.width = 512; //this.xor.graphics.width;
        this.ovcanvas.height = 512; //this.xor.graphics.height;
        this.ovctx = this.ovcanvas.getContext("2d");
        this.xor.renderconfigs.load('default', 'shaders/basic.vert', 'shaders/gbuffer.frag');
        this.xor.renderconfigs.load('overlay', 'shaders/basic.vert', 'shaders/basic.frag');
        let bbox = new GTE.BoundingBox();
        bbox.add(Vector3.make(-1.0, -1.0, -1.0));
        bbox.add(Vector3.make(1.0, 1.0, 1.0));
        this.xor.meshes.load('cornellbox', 'models/cornellbox_orig.obj', bbox, null);
        this.xor.graphics.init();
        this.reset();
        this.ovcanvas.width = 512;
        this.ovcanvas.height = 512;
        let overlayRect = this.xor.meshes.create('overlay');
        overlayRect.rect(-1, -1, 1, 1);
        this.xor.sound.init();
        this.xor.sound.jukebox.add(0, "music/noise.mp3", false);
        this.xor.sound.jukebox.add(1, "music/maintheme.mp3", false);
        this.xor.sound.jukebox.add(2, "music/adventuretheme.mp3", false);
        this.xor.sound.jukebox.add(3, "music/arcadetheme.mp3", false);
        this.xor.sound.sampler.loadSample(0, "sounds/BassDrum1.wav");
        this.xor.sound.sampler.loadSample(1, "sounds/BassDrum2.wav");
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
        if (xor.input.checkKeys(["Escape"])) {
            if (xor.triggers.get("ESC").tick(xor.t1)) {
                this.pauseGame = !this.pauseGame;
                hflog.info(this.pauseGame ? "paused" : "not paused");
            }
        }
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
    }
    /**
     * updateControls()
     */
    updateControls() {
        let xor = this.xor;
        xor.graphics.setOffset(getRangeValue("SOffsetX"), getRangeValue("SOffsetY"));
        xor.graphics.setZoom(getRangeValue("SZoomX"), getRangeValue("SZoomY"));
    }
    /**
     * render() draws the screen
     */
    render() {
        let xor = this.xor;
        let gl = xor.graphics.gl;
        let mixColor = Math.floor(0.5 * (1.0 + Math.sin(xor.t1)) * 6 + 0.5);
        xor.graphics.clear(XOR.Color.BLUE, XOR.Color.BLACK, mixColor);
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
            xor.meshes.render('cornellbox', rc);
            rc.restore();
        }
        rc = xor.renderconfigs.use('overlay');
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
    /**
     * renderOverlay() renders graphics on top of the canvas
     */
    renderOverlay() {
        let gl = this.xor.graphics.gl;
        let gfx = this.ovctx;
        if (!this.ovtex) {
            this.ovtex = gl.createTexture();
        }
        if (!this.ovtex)
            return;
        gfx.clearRect(0, 0, 512, 512);
        gfx.font = "italic 64px biolinum";
        gfx.fillStyle = '#000000';
        gfx.fillText("the llama paradox", 0, 64);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.ovtex);
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.ovcanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        //gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
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
