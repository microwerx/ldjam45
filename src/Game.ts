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

        if (this.mode == ENDOMODE) {
            let player = this.common.gobjs[GOBJ_PLAYER];
            player.thrust(this.app.p1x, this.app.p1y);
            player.x.accum(Vector3.make(this.app.p1x, this.app.p1y, 0), this.xor.dt);
            this.endogame.update();
        }

    }

    render() {
        let xor = this.xor;
        let gl = <WebGL2RenderingContext>this.xor.graphics.gl;

        if (this.mode == HELPMODE) {
            this.updateOverlay();
            this.uploadOverlay();
            this.renderOverlay();
        }

        if (this.mode == ENDOMODE) {
            // render player
            // render star systems
            // render planetoids
            let rc = this.xor.renderconfigs.use('default');
            if (rc) {
                let player = this.common.gobjs[GOBJ_PLAYER];
                let wm = Matrix4.makeTranslation3(player.x);
                rc.uniformMatrix4f("WorldMatrix", wm);
                xor.meshes.render('cube', rc);

                // for (let e of this.common.gobjs) {
                // }
                rc.restore();
            }
        }
    }

    updateOverlay() {
        let gfx = this.ovctx;
        gfx.clearRect(0, 0, 512, 512);
        gfx.font = "italic 64px biolinum";
        gfx.fillStyle = '#000000';
        gfx.fillText("STAR BATTLE", 0, 64);
    }

    uploadOverlay() {
        let gl = <WebGL2RenderingContext>this.xor.graphics.gl;
        if (!this.ovtex) {
            this.ovtex = gl.createTexture();
        }

        if (!this.ovtex) return;

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.ovtex);
        // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.ovcanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        //gl.generateMipmap(gl.TEXTURE_2D);
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