/// <reference path="./GravityObject.ts" />
/// <reference path="./CommonGame.ts" />
/// <reference path="./ExoSystemGame.ts" />
/// <reference path="./EndoSystemGame.ts" />
/// <reference path="./StateMachine.ts" />

class Game {
    common = new CommonGame(this.xor);
    exogame = new ExoSystemGame(this.common);
    endogame = new EndoSystemGame(this.common);

    constructor(public xor: LibXOR) {

    }

    init() {
        this.reset();
        this.common.init();
        this.endogame.init();
        this.exogame.init();
    }

    reset() {
        this.common.states.push("HELP", "", 0);
    }

    update() {
        this.common.update();
        if (this.common.states.topName == "ENDO") {
            this.endogame.update();
        } else if (this.common.states.topName == "EXO") {
            this.exogame.update();
        } else if (this.common.states.topName == "HELP") {

        }
    }
}