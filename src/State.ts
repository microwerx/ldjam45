
class State {
    constructor(public name: string,
        public alt: string = "NONE",
        public delayTime: number = 0,
        public queueSound: string = "",
        public queueMusic: string = "") {
    }
}
