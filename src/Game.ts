/// <reference path="./GravityObject.ts" />
/// <reference path="./CommonGame.ts" />
/// <reference path="./ExoSystemGame.ts" />
/// <reference path="./EndoSystemGame.ts" />

class Game {
    gobjs: GravityObject[] = [];
    common = new CommonGame();
    exogame = new ExoSystemGame(this.common);
    endogame = new EndoSystemGame(this.common);

    constructor() {

    }
}