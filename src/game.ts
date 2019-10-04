/// <reference path="../../LibXOR/LibXOR.d.ts" />
/// <reference path="./htmlutils.ts" />

class App {
    xor = new LibXOR("project");
    theta = 0;

    euroKeys = 0;
    xmoveKeys = [["KeyA", "KeyD"], ["KeyQ", "KeyD"]];
    zmoveKeys = [["KeyW", "KeyS"], ["KeyZ", "KeyS"]];
    zturnKeys = [["KeyQ", "KeyE"], ["KeyA", "KeyE"]];
    ymoveKeys = [["KeyC", "KeyZ"], ["KeyC", "KeyW"]];
    yturnKeys = [["ArrowLeft", "ArrowRight"], ["ArrowLeft", "ArrowRight"]];
    xturnKeys = [["ArrowUp", "ArrowDown"], ["ArrowUp", "ArrowDown"]];

    p1x = 0;
    p2x = 0;
    p1y = 0;
    p2y = 0;
    ENTERbutton = 0;
    BACKbutton = 0;
    SPACEbutton = 0;
    TABbutton = 0;

    pauseGame = false;

    constructor() {      
        setIdToHtml("desc", "<p>This is a test of the LibXOR retro console.</p>");

        let self = this;
        let controls = document.getElementById('controls');
        if (controls) {
            createButtonRow(controls, "bReset", "Reset", () => {
                self.reset();
            });
            createButtonRow(controls, "bZSDF", "ZSDF/WASD", () => { self.euroKeys = 1 - self.euroKeys; });
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
    getAxis(keysToCheck: string[][]) {
        let neg = this.xor.input.checkKeys([keysToCheck[this.euroKeys][0]]);
        let pos = this.xor.input.checkKeys([keysToCheck[this.euroKeys][1]]);
        return pos - neg;
    }

    /**
     * playMusic(index)
     * @param {number} index Which slot to start playing
     */
    playMusic(index: number) {
        this.xor.sound.jukebox.play(index | 0);
    }

    playSfx(index: number) {
        this.xor.sound.sampler.playSample(index & 0xF, false, 0);
    }

    /**
     * init()
     */
    init() {
        hflog.logElement = "log";
        this.xor.graphics.setVideoMode(1.5 * 384, 384);
        this.xor.input.init();

        this.xor.renderconfigs.load('default', 'shaders/basic.vert', 'shaders/gbuffer.frag');

        let bbox = new GTE.BoundingBox();
        bbox.add(Vector3.make(-1.0, -1.0, -1.0));
        bbox.add(Vector3.make(1.0, 1.0, 1.0));
        this.xor.meshes.load('cornellbox', 'models/cornellbox_orig.obj', bbox, null);

        this.xor.graphics.init();
        this.reset();

        this.xor.sound.init();
        this.xor.sound.jukebox.add(0, "music/noise.mp3", false);
        this.xor.sound.jukebox.add(1, "music/maintheme.mp3", false);
        this.xor.sound.jukebox.add(2, "music/adventuretheme.mp3", false);
        this.xor.sound.jukebox.add(3, "music/arcadetheme.mp3", false);
        this.xor.sound.sampler.loadSample(0, "sounds/BassDrum1.wav");
        this.xor.sound.sampler.loadSample(1, "sounds/BassDrum2.wav");
    }

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

    start() {
        this.mainloop();
    }

    update(dt: number) {
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
            } else {
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

    updateControls() {
        let xor = this.xor;
        xor.graphics.setOffset(getRangeValue("SOffsetX"), getRangeValue("SOffsetY"));
        xor.graphics.setZoom(getRangeValue("SZoomX"), getRangeValue("SZoomY"));
    }

    render() {
        let xor = this.xor;
        xor.graphics.clear(XOR.Color.BLUE, XOR.Color.WHITE, 5);

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

    }

    mainloop() {
        let self = this;
        window.requestAnimationFrame((t) => {
            self.xor.startFrame(t);
            self.xor.input.poll();
            self.xor.sound.update();
            self.update(self.xor.dt);
            self.render();
            self.mainloop();
        });
    }
}

let app = new App();
app.init();
app.start();