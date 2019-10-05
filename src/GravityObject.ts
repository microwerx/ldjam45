/// <reference path="../../LibXOR/LibXOR.d.ts" />

class GravityObject {
    x = Vector3.make(0, 0, 0);
    v = Vector3.make(0, 0, 0);
    a = Vector3.make(0, 0, 0);
    private thrust_ = Vector3.make(0, 0, 0);
    life = 1.0;

    /**
     * constructor()
     * @param gravitydir positive means pull, negative means push
     * @param mass mass in kilograms of this object
     */
    constructor(
        readonly gravitydir = 1,
        readonly mass = 1,
        readonly radius = 1,
        public xor: LibXOR,
        public activeObjects: GravityObject[]
    ) {

    }

    /**
     * update calculates the forces and updates position & velocity
     * @param dt the time step in seconds and updates occur every 1ms
     */
    update(dt: number) {
        const steps = Math.floor(dt * 1000 + 0.5);
        // Calculate force
        for (let i = 0; i < steps; i++) {
            this.updateForces();
            this.applyForces();
        }
    }

    /**
     * resetForces initializes acceleration to 0
     */
    resetForces() {
        this.a.reset();
    }

    /**
     * updateForces calculates forces between interacting objects
     */
    updateForces() {
    }

    /**
     * applyForces calculates new position and velocity
     */
    applyForces() {

    }

    /**
     * boundObject
     */
    boundObject(bbox: GTE.BoundingBox) {
        this.x.clamp3(bbox.minBounds, bbox.maxBounds);
    }

    /**
     * reset initializes this object to its defaults
     */
    reset() {
        this.life = 1.0;
    }

    /**
     * dirTo returns a unit vector between this and gobj
     * @param gobj the other object to compare
     */
    dirTo(gobj: GravityObject): Vector3 {
        return this.x.sub(gobj.x).normalize();
    }

    /**
     * distanceBetween is the distance between the two spheres
     * @param gobj the other object to compare
     */
    distanceBetween(gobj: GravityObject): number {
        let totalRadius = this.radius + gobj.radius;
        return this.x.distance(gobj.x) - totalRadius;
    }

    /**
     * distanceBetweenCenters is the distance between the centers
     * of the two objects
     * @param gobj the other object to compare
     */
    distanceBetweenCenters(gobj: GravityObject): number {
        return this.x.distance(gobj.x);
    }

    /**
     * detectCollision detects if the signed distance is less than zero
     * @param gobj the other object to compare
     */
    detectCollision(gobj: GravityObject): boolean {
        if (gobj.distanceBetween(this) < 0)
            return true;
        return false;
    }

    /**
     * calcInteractionForce determines the force to apply between the two
     * objects
     * @param gobj the other object to interact with
     */
    calcInteractionForce(gobj: GravityObject) {

    }

    /**
     * 
     * @param x horizontal force applied to the object
     * @param y vertical force applied to the object
     */
    thrust(x: number, y: number) {
        this.thrust_.reset(x, y, 0);
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