/// <reference path="../../LibXOR/LibXOR.d.ts" />
/// <reference path="./htmlutils.ts" />
/// <reference path="./Game.ts" />

class ButtonDetector {
    private pressed_ = false;
    private cur_ = false;
    private last_ = false;

    constructor() {

    }

    get pressed(): boolean {
        let ret = this.pressed_;
        this.pressed_ = false;
        return ret;
    }

    set pressed(val: boolean) {
        this.last_ = this.cur_;
        this.cur_ = val;
        if (this.cur_ && !this.last_) {
            this.pressed_ = true;
        }
    }
}

class App {
    xor = new LibXOR("project");
    game = new Game(this, this.xor);

    theta = 0;
    levelRequested = 7;
    userDrag = 0;
    startPressed = false;
    musicStarted = false;

    euroKeys = 0;
    xmoveKeys = [
        ["KeyA", "KeyD"],
        ["KeyQ", "KeyD"]
    ];
    zmoveKeys = [
        ["KeyS", "KeyW"],
        ["KeyS", "KeyZ"]
    ];
    zturnKeys = [
        ["KeyQ", "KeyE"],
        ["KeyA", "KeyE"]
    ];
    ymoveKeys = [
        ["KeyC", "KeyZ"],
        ["KeyC", "KeyW"]
    ];
    yturnKeys = [
        ["ArrowLeft", "ArrowRight"],
        ["ArrowLeft", "ArrowRight"]
    ];
    xturnKeys = [
        ["ArrowUp", "ArrowDown"],
        ["ArrowUp", "ArrowDown"]
    ];

    p1x = 0;
    p2x = 0;
    p1y = 0;
    p2y = 0;

    ENTERbutton = 0;
    ESCAPEbutton = 0;
    SPACEbutton = 0;
    TABbutton = 0;

    newENTERbutton = new ButtonDetector();
    newESCAPEbutton = new ButtonDetector();
    newSPACEbutton = new ButtonDetector();
    newTABbutton = new ButtonDetector();

    pauseGame = false;

    constructor() {
        // setIdToHtml("desc", "<p>This is a test of the LibXOR retro console.</p>");

        let self = this;
        let controls = document.getElementById('controls');
        if (controls) {
            createButtonRow(controls, "bStartGame", "Start Game", () => {
                self.startPressed = true;
                self.reset();
            });
            createButtonRow(controls, "bZSDF", "ZSDF/WASD", () => {
                self.euroKeys = 1 - self.euroKeys;
                if (self.euroKeys) {
                    setDivRowValue("bZSDF", "ZQSD");
                } else {
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
        // this.xor.sound.sampler.loadSample(SOUND_EXO, "sounds/starbattle-exo.wav");
        // this.xor.sound.sampler.loadSample(SOUND_ENDO, "sounds/starbattle-endo.wav");

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
    update(dt: number) {
        const loaded = this.xor.renderconfigs.loaded && this.xor.sound.sampler.loaded && this.xor.fluxions.scenegraph.loaded;
        if (!loaded) {
            this.help(); return;
        }
        if (!this.startPressed && !this.musicStarted) {
            this.xor.sound.jukebox.play(MUSIC_STARBATTLE1);
            this.musicStarted = true;
        }

        let xor = this.xor;
        xor.input.poll();
        this.updateControls();

        if (!this.startPressed) {
            if (xor.input.checkKeys(["Enter"])) {
                this.startPressed = true;
                this.reset();
                return;
            }
        }

        this.ESCAPEbutton = xor.input.checkKeys(["Escape"]);
        this.SPACEbutton = xor.input.checkKeys([" ", "Space"]);
        this.ENTERbutton = xor.input.checkKeys(["Enter"]);
        this.TABbutton = xor.input.checkKeys(["Tab"]);

        this.newSPACEbutton.pressed = this.SPACEbutton > 0.0;
        this.newESCAPEbutton.pressed = this.ESCAPEbutton > 0.0;
        this.newENTERbutton.pressed = this.ENTERbutton > 0.0;
        this.newTABbutton.pressed = this.TABbutton > 0.0;

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

        this.help();
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

    helpDiv = document.getElementById('help');
    /**
     * help() displays realtime help to the user.
     */
    help() {
        if (!this.helpDiv) return;
        let h = this.helpDiv;
        const exomode = this.game.mode == EXOMODE;
        const endomode = this.game.mode == ENDOMODE;
        const numstars = this.game.common.creationStarsCollected;
        const numgold = this.game.common.gold;
        const numhealth = this.game.common.gobjs[PlayerIndex].life;

        if (!this.xor.renderconfigs.loaded) {
            h.innerHTML = "Loading Renderconfigs";
            return;
        } else if (!this.xor.sound.sampler.loaded) {
            h.innerHTML = "Loading Sounds";
            return;
        } else if (!this.xor.fluxions.scenegraph.loaded) {
            h.innerHTML = "Loading Graphics";
            return;
        }

        let help = "<h2>Help/Tutorial</h2>";
        if (!this.startPressed) {
            help += "<p>Press Start Button</p>";
        } else {
            help += "<div style='text-align: left; font-size: 1.5em;'>";
            if (exomode) {
                help += "<p>You are in EXO mode. Please press SPACE to switch to ENDO mode.<p>"
            } else {
                help += "<p>You are in ENDO mode. Please press SPACE to switch to EXO mode.</p>"
            }

            if (exomode && numstars > 0) {
                help += "<p>Use the WASD keys to move the cursor on the grid. Green means you can create a star. Red means you cannot create a star in that location.</p>"
            }

            if (numstars > 0) {
                help += "<p>You have a creation star! Wwitch to EXO mode to create a new star system.</p>";
            } else {
                help += "<p>You have no WHITE creation stars. Wwitch to ENDO mode to move around and find one.</p>"
            }

            if (numgold < 10) {
                help += "<p>You can collect gold from the orbiting planetoids. When a planetoid has been exhausted, it will be destroyed.</p>";
            }

            if (numhealth < 1) {
                help += "<p style='color: red'>Warning! Do not hit the stars, they will destroy you!</p>";
            }
            help += "</div>";
        }

        h.innerHTML = help;
    }

    /**
     * render() draws the screen
     */
    render() {
        const loaded = this.xor.renderconfigs.loaded && this.xor.sound.sampler.loaded && this.xor.fluxions.scenegraph.loaded;
        if (!loaded) return;

        let xor = this.xor;
        let gl = <WebGL2RenderingContext>xor.graphics.gl;
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