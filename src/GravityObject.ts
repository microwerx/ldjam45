/// <reference path="../../LibXOR/LibXOR.d.ts" />

class GravityObject {
    position = Vector3.make(0, 0, 0);
    velocity = Vector3.make(0, 0, 0);
    accel = Vector3.make(0, 0, 0);
    life = 1.0;

    /**
     * constructor()
     * @param gravitydir positive means pull, negative means push
     * @param mass mass in kilograms of this object
     */
    constructor(
        readonly gravitydir = 1,
        readonly mass = 1,
        public xor: LibXOR
    ) {

    }

    update(dt: number) {

    }

    reset() {
        this.life = 1.0;
    }

    interact(gobj: GravityObject) {

    }

    thrust(x: number, y: number) {

    }

    /**
     * Returns the burn factor from this object to the next.
     * This only works from big objects to small objects.
     * Burn factor goes from 0 to 100
     * @param gobj 
     */
    burn(gobj: GravityObject): number {
        if (gobj.mass >= this.mass) return 0;
        return GTE.clamp(this.mass / gobj.mass, 0, 100);
    }
}