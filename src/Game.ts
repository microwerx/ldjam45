/// <reference path="./GravityObject.ts" />
/// <reference path="./CommonGame.ts" />
/// <reference path="./ExoSystemGame.ts" />
/// <reference path="./EndoSystemGame.ts" />
/// <reference path="./StateMachine.ts" />

class Game {
    gobjs: GravityObject[] = [];
    common = new CommonGame();
    exogame = new ExoSystemGame(this.common);
    endogame = new EndoSystemGame(this.common);

    states: StateMachine;

    constructor() {

    }

    update() {
        if (this.states..isEndo) {
            states.push(["ENDO", ""])
        }
    }
}