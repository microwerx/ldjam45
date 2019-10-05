/// <reference path="../../LibXOR/LibXOR.d.ts"/>

/**
 * randbetween returns a random number between a and b
 * @param a the minimum random number
 * @param b the maximum random number
 */
function randbetween(a: number, b: number): number {
    return Math.random() * (b - a) + a;
}

/**
 * randbetweeni returns a random integer between a and b
 * @param a the minimum random number
 * @param b the maximum random number
 */
function randbetweeni(a: number, b: number): number {
    return Math.floor(Math.random() * (b - a) + a + 0.5) | 0;
}

/**
 * randvector3 returns a unit vector pointing in a random direction
 */
function randvector3(): Vector3 {
    return Vector3.makeUnit(Math.random() - 0.5, Math.random() - 0.5, 0); //Math.random() - 0.5);
}

/**
 * clamp 3 returns a vector which is v clamped between minValue & maxValue
 * @param v 
 * @param minValue 
 * @param maxValue 
 */
function clamp3(v: Vector3, minValue: number, maxValue: number): Vector3 {
    return Vector3.make(
        GTE.clamp(v.x, minValue, maxValue),
        GTE.clamp(v.y, minValue, maxValue),
        GTE.clamp(v.z, minValue, maxValue)
    );
}

/**
 * accum calculates a += b * scale and returns a
 * @param a 
 * @param b 
 * @param bscale 
 */
function accum(a: Vector3, b: Vector3, bscale: number): Vector3 {
    a.x += b.x * bscale;
    a.y += b.y * bscale;
    a.z += b.z * bscale;
    return a;
}