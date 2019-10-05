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
    common = new CommonGame(this.xor);
    exogame = new ExoSystemGame(this.xor, this.common);
    endogame = new EndoSystemGame(this.xor, this.common);
    mode = ENDOMODE;

    ovcanvas!: HTMLCanvasElement;
    ovctx!: CanvasRenderingContext2D;
    ovtex: WebGLTexture | null = null;

    gamePaused = false;

    constructor(
        public app: App,
        public xor: LibXOR) {

    }

    init() {
        this.ovcanvas = <HTMLCanvasElement>document.createElement("canvas");
        this.ovcanvas.width = CANVASWIDTH;
        this.ovcanvas.height = CANVASHEIGHT;
        this.ovctx = <CanvasRenderingContext2D>this.ovcanvas.getContext("2d");
        let overlayRect = this.xor.meshes.create('overlay');
        overlayRect.rect(-1, -1, 1, 1);

        this.reset();
        this.common.init();
        this.endogame.init();
        this.exogame.init();
    }

    reset() {
        if (this.mode == HELPMODE) this.common.states.push("HELP", "", 0);
        if (this.mode == ENDOMODE) this.common.states.push("ENDO", "", 0);
        if (this.mode == EXOMODE) this.common.states.push("EXO", "", 0);
    }

    update() {
        this.common.update();
        if (this.common.states.topName == "ENDO") {
            this.endogame.update();
            this.mode = ENDOMODE;
        } else if (this.common.states.topName == "EXO") {
            this.exogame.update();
            this.mode = EXOMODE;
        } else if (this.common.states.topName == "HELP") {
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
        } else if (state.topAlt != "PAUSE") {
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
        let gl = <WebGL2RenderingContext>this.xor.graphics.gl;

        if (this.mode == ENDOMODE) {
            // render player
            // render star systems
            // render planetoids
            let rc = this.xor.renderconfigs.use('default');
            if (rc) {

                for (let i = 0; i <= PlayerMaxIndex; i++) {
                    let player = this.common.gobjs[PlayerIndex + i];
                    if (!player.active) continue;
                    this.renderPlayer(player, rc);
                }

                for (let i = 0; i <= StarMaxIndex; i++) {
                    let star = this.common.gobjs[StarIndex + i];
                    if (!star.active) continue;
                    this.renderStar(star, rc);
                }

                for (let i = 0; i <= PlanetoidMaxIndex; i++) {
                    let planetoid = this.common.gobjs[PlanetoidIndex + i];
                    if (!planetoid.active) continue;
                    this.renderPlanetoid(planetoid, rc);
                }

                rc.restore();
            }
        } else if (this.mode == EXOMODE) {
            let rc = this.xor.renderconfigs.use('default');
            if (rc) {

                for (let i = 0; i <= PlayerMaxIndex; i++) {
                    let player = this.common.gobjs[PlayerIndex + i];
                    if (!player.active) continue;
                    this.renderPlayer(player, rc);
                }

                for (let i = 0; i <= StarMaxIndex; i++) {
                    let star = this.common.gobjs[StarIndex + i];
                    if (!star.active) continue;
                    this.renderStar(star, rc);
                }

                for (let i = 0; i <= PlanetoidMaxIndex; i++) {
                    let planetoid = this.common.gobjs[PlanetoidIndex + i];
                    if (!planetoid.active) continue;
                    this.renderPlanetoid(planetoid, rc);
                }

                rc.restore();
            }
        }

        this.updateOverlay();
        this.uploadOverlay();
        this.renderOverlay();
    }

    renderPlayer(gobj: GravityObject, rc: FxRenderConfig) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('cube', rc);
    }

    renderStar(gobj: GravityObject, rc: FxRenderConfig) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('geosphere', rc);
    }

    renderPlanetoid(gobj: GravityObject, rc: FxRenderConfig) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
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
        let gl = <WebGL2RenderingContext>this.xor.graphics.gl;
        if (!this.ovtex) {
            this.ovtex = gl.createTexture();
        }

        if (!this.ovtex) return;

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.ovtex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.ovcanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    renderOverlay() {
        let gl = <WebGL2RenderingContext>this.xor.graphics.gl;
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