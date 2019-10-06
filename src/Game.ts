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

let EndoCenter = Vector3.make(0, 0, -10);
let ExoCenter = Vector3.make(0, 0, -100);

class Game {
    common = new CommonGame(this.xor);
    exogame = new ExoSystemGame(this.xor, this.common);
    endogame = new EndoSystemGame(this.xor, this.common);
    mode = ENDOMODE;

    level = 5;

    cameraPosition = Vector3.make();
    exoGridFade = 0;
    exoGrid!: FxIndexedGeometryMesh;

    bbox = new GTE.BoundingBox();

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

        this.level = 5;
        this.common.resize(this.level, this.level);

        this.createLevel();
        this.createGrid();

        let t = (this.level + 2) * 0.5 * SpaceBetweenStars;
        this.common.gobjs[PlayerIndex].x.reset(-t * 1.2, 0.0, 0.0);
        this.bbox.reset();
        let p = t * 1.5;
        this.bbox.add(Vector3.make(p, p, 0));
        this.bbox.add(Vector3.make(-p, -p, 0));

        ExoCenter.reset(0, 0, -2.5 * this.level * SpaceBetweenStars);

        this.common.resetPositions();
    }

    createLevel() {
        let numStars = randbetweeni(this.common.numCols, this.common.numCols << 1);
        for (let i = 0; i < this.common.numCols * 2; i++) {
            let col = randbetweeni(0, this.level);
            let row = randbetweeni(0, this.level);
            let result = this.common.setStar(col, row);
            if (result) {
                this.common.createStar(numStars, col, row);
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

        let numCreationStars = randbetweeni(1, this.common.MaxCreationStars);
        for (let i = 0; i < numCreationStars; i++) {
            let col = randbetween(0, this.level);
            let row = randbetween(0, this.level);
            this.common.createCreationStar(col, row);
        }
    }

    createGrid() {
        let gl = <WebGL2RenderingContext>this.xor.graphics.gl;
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
        } else if (this.common.states.topName == "EXO") {
            this.exogame.update();
            this.mode = EXOMODE;
        } else if (this.common.states.topName == "HELP") {
            this.mode = HELPMODE;
        }

        let state = this.common.states;
        let xor = this.xor;
        let app = this.app;

        if (this.mode == ENDOMODE) {
            let player = this.common.gobjs[PlayerIndex];
            EndoCenter.reset(-player.x.x, -player.x.y, -50);
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
            g.x.clamp3(
                this.bbox.minBounds,
                this.bbox.maxBounds);
        }

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
            let player = this.common.gobjs[PlayerIndex];
            player.thrust(this.app.p1x, this.app.p1y);
            this.endogame.update();
        }

        if (this.mode == EXOMODE) {
            this.exogame.update();
        }
    }

    render() {
        let xor = this.xor;
        let gl = <WebGL2RenderingContext>this.xor.graphics.gl;

        let rc = this.xor.renderconfigs.use('default');
        if (rc) {
            let projMatrix = Matrix4.makePerspectiveY(45.0, 1.5, 1.0, 10 + Math.abs(ExoCenter.z));
            let cameraMatrix = Matrix4.makeTranslation3(this.cameraPosition);
            rc.uniformMatrix4f('ProjectionMatrix', projMatrix);
            rc.uniformMatrix4f('CameraMatrix', cameraMatrix);

            let wm = Matrix4.makeIdentity();
            rc.uniformMatrix4f("WorldMatrix", wm);
            rc.uniform3f("Kd", Vector3.make(0, this.exoGridFade, 0));
            this.xor.meshes.render('exoGrid', rc);

            if (this.mode == ENDOMODE) {
                this.renderSystem(rc);
            } else if (this.mode == EXOMODE) {
                this.renderSystem(rc);
            }
            rc.restore();
        }

        this.updateOverlay();
        this.uploadOverlay();
        this.renderOverlay();
    }

    renderSystem(rc: FxRenderConfig) {
        rc.uniform3f("Kd", Vector3.make(1, 0, 1));
        let player = this.common.gobjs[PlayerIndex];
        this.renderPlayer(player, rc);

        for (let i = 0; i < CreationStarCount; i++) {
            let star = this.common.gobjs[CreationStarIndex + i];
            if (!star.active) continue;
            this.renderExtraStar(star, rc);
            if (player.canCalcInteraction(star)) {
                this.xor.meshes.render('circle', rc);
            }
        }

        for (let i = 0; i < StarCount; i++) {
            let star = this.common.gobjs[StarIndex + i];
            if (!star.active) continue;
            this.renderStar(star, rc);
            if (player.canCalcInteraction(star)) {
                this.xor.meshes.render('circle', rc);
            }
        }

        rc.uniform3f("Kd", Vector3.make(0.4, 0.2, 0));
        for (let i = 0; i < PlanetoidCount; i++) {
            let planetoid = this.common.gobjs[PlanetoidIndex + i];
            if (!planetoid)
                continue;
            if (!planetoid.active) continue;
            this.renderPlanetoid(planetoid, rc);
            if (player.canCalcInteraction(planetoid)) {
                this.xor.meshes.render('circle', rc);
            }
        }
    }

    renderPlayer(gobj: GravityObject, rc: FxRenderConfig) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('cube', rc);
    }

    renderExtraStar(gobj: GravityObject, rc: FxRenderConfig) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        if (gobj.sink) rc.uniform3f("Kd", Vector3.make(0.5, 1, 0.5));
        if (gobj.vent) rc.uniform3f("Kd", Vector3.make(0, 0.5 * Math.sin(this.xor.t1), 0));
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('geosphere', rc);
    }

    renderStar(gobj: GravityObject, rc: FxRenderConfig) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        if (gobj.sink) rc.uniform3f("Kd", Vector3.make(1, 1, 0));
        if (gobj.vent) rc.uniform3f("Kd", Vector3.make(0, 0, 1));
        rc.uniformMatrix4f("WorldMatrix", wm);
        this.xor.meshes.render('geosphere', rc);
    }

    renderPlanetoid(gobj: GravityObject, rc: FxRenderConfig) {
        let wm = Matrix4.makeTranslation3(gobj.x);
        wm.scale(gobj.radius, gobj.radius, gobj.radius);
        rc.uniformMatrix4f("WorldMatrix", wm);
        if (gobj.sink) rc.uniform3f("Kd", Vector3.make(0, 1, 1));
        if (gobj.vent) rc.uniform3f("Kd", Vector3.make(1, 0, 0));
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