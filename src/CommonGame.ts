

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

    }

    update() {
        this.states.update(this.xor.t1);
    }
}
