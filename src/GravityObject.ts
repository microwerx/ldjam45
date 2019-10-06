/// <reference path="../../LibXOR/LibXOR.d.ts" />

class GravityObject {
    active = false;
    x = Vector3.make(0, 0, 0);
    v = Vector3.make(0, 0, 0);
    a = Vector3.make(0, 0, 0);
    private thrust_ = Vector3.make(0, 0, 0);
    life = 1.0;
    angle = 0;
    drag_ = 0.0;
    type = 0;

    /**
     * constructor()
     * @param gravitydir positive means pull, negative means push
     * @param mass mass in kilograms of this object
     */
    constructor(
        readonly gravitydir = -1,
        public mass = 1,
        public radius = 1,
        public xor: LibXOR,
        public activeObjects: GravityObject[]
    ) {

    }

    get sink(): boolean { return this.gravitydir > 0; }
    get vent(): boolean { return this.gravitydir < 0; }

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
        this.a.accum(this.thrust_, 1.0);
        this.a.accum(this.v, -this.drag_);
        const MaxAccel = 50;
        this.a = this.a.clamp(-MaxAccel, MaxAccel);
    }

    /**
     * applyForces calculates new position and velocity
     */
    applyForces() {
        const dt = 0.001;
        let v_before = this.v.clone();
        this.v.accum(this.a, dt);
        let v_after = this.v.clone();
        this.v = (v_after.add(v_before)).scale(0.5);
        const MaxVelocity = 7;
        this.v.clamp(-MaxVelocity, MaxVelocity);
        this.x.accum(this.v.scale(0.5), dt);
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
        this.life = 1;
        this.angle = 0;
        this.x.reset();
        this.v.reset();
        this.a.reset();
        this.thrust_.reset();
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
    calcInteractionForce(gobj: GravityObject, radiusFactor: number = 2) {
        if (!gobj.active) return;
        const G_a = 6.6740831e-11;
        const p = 2;

        let r = this.distanceBetweenCenters(gobj);
        let maxdist = SpaceBetweenStars * radiusFactor;
        if (r > maxdist) return;
        let x = gobj.dirTo(this);
        let massRatio = this.mass * gobj.mass;
        let a = this.gravitydir * G_a * massRatio / Math.pow(Math.max(r, 2.0), p);
        this.a.accum(x, a);
    }

    /**
     * Returns true if objects are close enough
     * @param gobj the other object to interact with
     */
    canCalcInteraction(gobj: GravityObject): boolean {
        if (!gobj.active) return false;
        let r = this.distanceBetweenCenters(gobj);
        let maxdist = SpaceBetweenStars * 2.0;
        if (r > maxdist) return false;
        return true;
    }

    /**
     * 
     * @param x horizontal force applied to the object
     * @param y vertical force applied to the object
     */
    thrust(x: number, y: number) {
        this.thrust_.reset(x, y, 0);
    }

    drag(x: number) {
        this.drag_ = GTE.clamp(x, 0.0, 0.1);
    }

    /**
     * Returns the burn factor from this object to the next.
     * This only works from big objects to small objects.
     * Burn factor goes from 0 to 100
     * @param gobj 
     */
    burn(gobj: GravityObject): number {
        return GTE.clamp(this.distanceBetween(gobj) * -5, 0, 100);
    }
}