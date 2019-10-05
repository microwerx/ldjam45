
class State {
    constructor(public name: string,
        public alt: string = "NONE",
        public delayTime: number = 0,
        public queueSound: number = 0,
        public queueMusic: number = 0) {
    }
}
