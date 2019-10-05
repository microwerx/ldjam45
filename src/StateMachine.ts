/// <reference path="./State.ts" />

class StateMachine {
    states: State[] = [];
    private _t1: number;

    constructor(public XOR: LibXOR) {
        this._t1 = 0;
    }

    clear() {
        this.states = [];
    }

    update(tInSeconds: number) {
        this._t1 = tInSeconds;

        let topTime = this.topTime;
        if (topTime > 0 && topTime < tInSeconds) {
            this.pop();
            this.XOR.Sounds.playSound(this.topSound);
        }
    }

    push(name: string, alt: string, delayTime: number) {
        if (delayTime > 0) delayTime += this._t1;
        this.states.push(new State(name, alt, delayTime));
    }

    pushwithsound(name: string, alt: string, delayTime: number, sound: string, music: string) {
        if (delayTime > 0) delayTime += this._t1;
        this.states.push(new State(name, alt, delayTime, sound, music));
        this.push(name, "PAUSE", 0.01);
    }

    pop() {
        if (this.states.length)
            this.states.pop();
    }

    get topName(): string {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].name;
        }
        return "NONE";
    }

    get topAlt(): string {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].alt;
        }
        return "NONE";
    }

    get topTime(): number {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].delayTime;
        }
        return -1;
    }

    get topSound(): string {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].queueSound;
        }
        return "NONE";
    }

    get topMusic(): string {
        let l = this.states.length;
        if (l > 0) {
            return this.states[l - 1].queueMusic;
        }
        return "NONE";
    }
}