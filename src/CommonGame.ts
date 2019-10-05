

class CommonGame {
    gobjs: GravityObject[] = [];
    gold = 0;
    states = new StateMachine(this.xor);

    constructor(public xor: LibXOR) {

    }

    init() {
        this.reset();
    }

    reset() {
        this.gobjs = [];
        this.gobjs.push(new GravityObject(1, 1, 1, this.xor, this.gobjs));
    }

    update() {
        this.states.update(this.xor.t1);
        for (let gobj of this.gobjs) {
            gobj.update(this.xor.dt);
        }
    }
}
