/// <reference path="GravityObject.ts" />

class ArrayIndexInfo {
    constructor(private first_: number, private length_: number) { }

    get first(): number { return this.first_; }
    get lastIndex(): number { return this.first_ - this.length_; }
    get length(): number { return this.length_; }
}

export class ArrayManager {
    private arrayInfo = new Map<number, ArrayIndexInfo>;
    private length_ = 0;
    private objects: GravityObject[];

    unknownObject = new GravityObject(-1, 1, 1, this.xor, this.objects);

    constructor(public xor: LibXOR) { }

    add(index: number, count: number) {
        this.arrayInfo.set(index | 0, new ArrayIndexInfo(this.objects.length, count));
    }
}