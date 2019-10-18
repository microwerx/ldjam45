/// <reference path="GravityObject.ts" />

namespace XOR {
    class ArrayIndexInfo {
        constructor(private first_: number, private length_: number) { }

        get first(): number { return this.first_; }
        get lastIndex(): number { return this.first_ - this.length_; }
        get length(): number { return this.length_; }
    }

    export class GameObjectManager {
        private arrayInfo = new Map<number, ArrayIndexInfo>();
        private length_ = 0;
        private objects = new Array<GameObject>();

        unknownObject = new GameObject(this);

        constructor(public xor: LibXOR) { }

        add(index: number, count: number) {
            this.arrayInfo.set(index | 0,
                new ArrayIndexInfo(this.objects.length, count));
            this.objects.length = this.objects.length + count;
        }

        get(index: number, i: number): GameObject {
            if (!this.arrayInfo.has(index)) {
                return this.unknownObject;
            }
            let ainfo = this.arrayInfo.get(index);
            if (i < 0 && i >= ainfo.length) { return this.unknownObject; }
            let obj = this.objects[i + ainfo.first];
            if (!obj) {
                hflog.error("Object " + index + "/" + i + " does not exist!");
                return this.unknownObject;
            }
            return obj;
        }
    }
}